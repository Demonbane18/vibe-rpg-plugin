// Static reader for the new migration: no database, Node built-ins only.
import { readdirSync, readFileSync } from 'node:fs';

const APPLIED = new Set(['001_workspaces.sql', '002_access_helpers.sql']);

// Lowercase, drop comments and identifier quotes, keep dollar-quoted bodies, split on top-level semicolons.
export function statements(sql) {
  const out = [];
  let cur = '';
  for (let i = 0; i < sql.length;) {
    const c = sql[i], rest = sql.slice(i);
    if (rest.startsWith('--')) { const end = sql.indexOf('\n', i); i = end < 0 ? sql.length : end; cur += ' '; continue; }
    if (rest.startsWith('/*')) { const end = sql.indexOf('*/', i + 2); i = end < 0 ? sql.length : end + 2; cur += ' '; continue; }
    if (c === "'") {
      let j = i + 1;
      for (; j < sql.length; j++) { if (sql[j] === "'") { if (sql[j + 1] === "'") j++; else break; } }
      cur += sql.slice(i, j + 1).toLowerCase(); i = j + 1; continue;
    }
    if (c === '"') {
      const end = sql.indexOf('"', i + 1);
      cur += sql.slice(i + 1, end < 0 ? sql.length : end).toLowerCase().replace(/\s+/g, '_'); i = end < 0 ? sql.length : end + 1; continue;
    }
    const tag = /^\$[A-Za-z_]*\$/.exec(rest);
    if (tag) {
      const end = sql.indexOf(tag[0], i + tag[0].length);
      const body = sql.slice(i + tag[0].length, end < 0 ? sql.length : end);
      cur += ` $$ ${normalize(statements(body).join(' ; '))} $$ `; i = end < 0 ? sql.length : end + tag[0].length; continue;
    }
    if (c === ';') { out.push(cur); cur = ''; i++; continue; }
    cur += c.toLowerCase(); i++;
  }
  out.push(cur);
  return out.map(normalize).filter(Boolean);
}

export function normalize(s) {
  return s.replace(/\s+/g, ' ').replace(/\s*([(),=<>+*\/|-])\s*/g, '$1').replace(/\$\$\s*/g, '$$$$ ').trim();
}

const strip = (name) => name.replace(/^public\./, '');

export function balanced(s, open) {
  let depth = 0;
  for (let i = open; i < s.length; i++) {
    if (s[i] === '(') depth++;
    else if (s[i] === ')' && --depth === 0) return s.slice(open + 1, i);
  }
  return s.slice(open + 1);
}

export function splitTop(s) {
  const parts = [];
  let depth = 0, cur = '', quoted = false;
  for (const c of s) {
    if (c === "'") quoted = !quoted;
    if (!quoted && c === '(') depth++;
    if (!quoted && c === ')') depth--;
    if (!quoted && c === ',' && depth === 0) { parts.push(cur.trim()); cur = ''; continue; }
    cur += c;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

function clause(s, keyword) {
  const at = s.search(new RegExp(`(?:^|[ )])${keyword}\\(`));
  if (at < 0) return null;
  return balanced(s, s.indexOf('(', at + keyword.length));
}

function table(db, name) {
  return db.tables[name] ??= { columns: {}, checks: [], fks: [], keys: [], rls: false };
}

function addConstraint(db, t, def) {
  const body = def.replace(/^constraint \S+ /, '');
  const tab = table(db, t);
  if (body.startsWith('check(')) tab.checks.push(balanced(body, 5));
  const key = /^(?:primary key|unique)(?: nulls not distinct)?\(([^)]*)\)/.exec(body);
  if (key) tab.keys.push(key[1].split(',').map((c) => c.trim()));
  const fk = /^foreign key\(([^)]*)\)references ([\w.]+)(.*)$/.exec(body);
  if (fk) for (const col of fk[1].split(',')) tab.fks.push({ column: col.trim(), target: strip(fk[2]), rest: fk[3] });
}

function addColumn(db, t, def) {
  const m = /^(\w+) (.*)$/.exec(def);
  if (!m) return;
  const [, name, rest] = m;
  const tab = table(db, t);
  tab.columns[name] = { name, def: rest, notNull: /\bnot null\b|\bprimary key\b/.test(rest) };
  for (let at = rest.indexOf('check('); at >= 0; at = rest.indexOf('check(', at + 1)) tab.checks.push(`${name}: ${balanced(rest, at + 5)}`);
  if (/\bprimary key\b|\bunique\b/.test(rest)) tab.keys.push([name]);
  const ref = /references ([\w.]+)(.*)$/.exec(rest);
  if (ref) tab.fks.push({ column: name, target: strip(ref[1]), rest: ref[2] });
}

export function parse(sql) {
  const db = { tables: {}, policies: [], indexes: [], functions: {}, grants: [], triggers: [], statements: statements(sql) };
  for (const s of db.statements) {
    let m;
    if ((m = /^create (?:unlogged )?table (?:if not exists )?([\w.]+)\(/.exec(s))) {
      const t = strip(m[1]);
      table(db, t);
      for (const def of splitTop(balanced(s, m[0].length - 1))) {
        if (/^(?:constraint|primary key|unique|check|foreign key|exclude)\b/.test(def)) addConstraint(db, t, def);
        else addColumn(db, t, def);
      }
    } else if ((m = /^alter table (?:if exists )?(?:only )?([\w.]+) (.*)$/.exec(s))) {
      const t = strip(m[1]);
      for (const action of splitTop(m[2])) {
        if (/^enable row level security/.test(action)) table(db, t).rls = true;
        else if (action.startsWith('add column ')) addColumn(db, t, action.slice(11).replace(/^if not exists /, ''));
        else if (action.startsWith('add ')) addConstraint(db, t, action.slice(4));
        else if ((m = /^alter column (\w+) set not null/.exec(action)) && table(db, t).columns[m[1]]) table(db, t).columns[m[1]].notNull = true;
      }
    } else if ((m = /^create policy (\S+) on ([\w.]+)(.*)$/.exec(s))) {
      const rest = m[3];
      db.policies.push({
        name: m[1], table: strip(m[2]),
        restrictive: / as restrictive/.test(rest),
        cmd: / for (all|select|insert|update|delete)\b/.exec(rest)?.[1] ?? 'all',
        roles: / to ([\w,]+(?: [\w,]+)*?)(?= using| with|$)/.exec(rest)?.[1].split(',').map((r) => r.trim()) ?? ['public'],
        using: clause(rest.replace(/with check\(/, 'with_check('), 'using'),
        check: clause(rest.replace(/with check\(/, 'with_check('), 'with_check'),
      });
    } else if ((m = /^create (?:unique )?index (?:concurrently )?(?:if not exists )?(?:\S+ )?on (?:only )?([\w.]+)(?: using \w+)?\(/.exec(s))) {
      const cols = splitTop(balanced(s, m[0].length - 1)).map((c) => /^\w+/.exec(c)?.[0] ?? '');
      const where = /\)\s?where (.*)$/.exec(s.slice(m[0].length - 1))?.[1] ?? '';
      db.indexes.push({ table: strip(m[1]), columns: cols, where });
      if (/^create unique/.test(s)) table(db, strip(m[1])).keys.push(cols);
    } else if ((m = /^create (?:or replace )?function ([\w.]+)\(/.exec(s))) {
      const args = balanced(s, m[0].length - 1);
      const rest = s.slice(m[0].length + args.length);
      db.functions[strip(m[1])] = { name: m[1], args: splitTop(args), rest, body: /\$\$(.*)\$\$/.exec(rest)?.[1] ?? '' };
    } else if (/^(?:grant|revoke) /.test(s)) db.grants.push(s);
    else if (/^create (?:or replace )?(?:constraint )?trigger /.test(s)) db.triggers.push(s);
  }
  return db;
}

export function newMigrationSql() {
  const files = readdirSync('migrations').filter((f) => f.endsWith('.sql') && !APPLIED.has(f)).sort();
  return files.map((f) => readFileSync(`migrations/${f}`, 'utf8')).join('\n;\n');
}

export const db = parse(newMigrationSql());

/** Policy text with the bodies of any functions defined in the new migration folded in. */
export function expand(text) {
  let out = text ?? '';
  for (const [name, fn] of Object.entries(db.functions)) {
    const short = name.split('.').pop();
    if (out.includes(`${short}(`)) out += ` ${fn.body}`;
  }
  return out;
}

export const ADMIN = /is_workspace_admin\(|workspace_members.*'admin'|'admin'.*workspace_members/;
export const MEMBER = /is_workspace_member\(|is_workspace_admin\(|workspace_members/;
