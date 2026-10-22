// Static reader for TS/TSX source: a token tree with JSX elements, function frames and a few lookups.
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const PUNCT = ['>>>=', '...', '===', '!==', '**=', '<<=', '>>=', '>>>', '&&=', '||=', '??=', '=>', '==', '!=', '<=', '>=', '&&', '||', '??', '?.', '++', '--', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<', '>>', '**'];
const EXPR_KEYWORDS = new Set(['return', 'typeof', 'case', 'do', 'else', 'in', 'of', 'new', 'delete', 'void', 'throw', 'yield', 'await', 'instanceof', 'default', 'extends']);
const CLOSE = { '(': ')', '[': ']', '{': '}' };

export function parse(src) {
  let i = 0;
  const isId = (c) => /[A-Za-z0-9_$]/.test(c);
  const skipSpace = () => {
    for (;;) {
      if (/\s/.test(src[i] ?? '')) i++;
      else if (src.startsWith('//', i)) { while (i < src.length && src[i] !== '\n') i++; }
      else if (src.startsWith('/*', i)) { const end = src.indexOf('*/', i + 2); i = end < 0 ? src.length : end + 2; }
      else return;
    }
  };
  const exprPos = (items) => {
    const prev = items[items.length - 1];
    if (!prev) return true;
    if (prev.type === 'p') return !['++', '--'].includes(prev.v);
    if (prev.type === 'id') return EXPR_KEYWORDS.has(prev.v);
    return false;
  };
  const readString = (q) => {
    let out = '';
    i++;
    while (i < src.length && src[i] !== q) {
      if (src[i] === '\\') { out += src[i + 1]; i += 2; } else out += src[i++];
    }
    i++;
    return { type: 'str', v: out };
  };
  const readTemplate = () => {
    const node = { type: 'tpl', parts: [], v: '' };
    i++;
    while (i < src.length && src[i] !== '`') {
      if (src[i] === '\\') { node.v += src[i + 1]; i += 2; }
      else if (src.startsWith('${', i)) { i += 2; const g = group('{'); node.parts.push(g); node.v += '${}'; }
      else node.v += src[i++];
    }
    i++;
    for (const part of node.parts) part.parent = node;
    return node;
  };
  const readRegex = () => {
    let inClass = false;
    i++;
    while (i < src.length) {
      const c = src[i];
      if (c === '\\') { i += 2; continue; }
      if (c === '[') inClass = true; else if (c === ']') inClass = false;
      else if (c === '/' && !inClass) break;
      else if (c === '\n') break;
      i++;
    }
    i++;
    while (isId(src[i] ?? '')) i++;
    return { type: 'regex' };
  };
  const adopt = (parent, kids) => kids.forEach((kid, idx) => { kid.parent = parent; kid.idx = idx; });

  function jsx() {
    // at '<'
    i++;
    skipSpace();
    let name = '';
    while (i < src.length && /[A-Za-z0-9_$.:-]/.test(src[i])) name += src[i++];
    const node = { type: 'jsx', name, attrs: [], children: [] };
    skipSpace();
    if (src[i] === '<') { let depth = 0; do { if (src[i] === '<') depth++; else if (src[i] === '>') depth--; i++; } while (depth > 0 && i < src.length); }
    for (;;) {
      skipSpace();
      if (i >= src.length) return node;
      if (src.startsWith('/>', i)) { i += 2; return finish(node); }
      if (src[i] === '>') { i++; break; }
      if (src[i] === '{') { i++; const g = group('{'); node.attrs.push({ name: '...', value: g }); continue; }
      let attr = '';
      while (i < src.length && /[A-Za-z0-9_$:-]/.test(src[i])) attr += src[i++];
      if (!attr) { i++; continue; }
      skipSpace();
      let value = null;
      if (src[i] === '=') {
        i++;
        skipSpace();
        if (src[i] === '"' || src[i] === "'") value = readString(src[i]);
        else if (src[i] === '{') { i++; value = group('{'); }
        else if (src[i] === '<') value = jsx();
      }
      node.attrs.push({ name: attr, value });
    }
    if (!name) node.name = '';
    for (;;) {
      if (i >= src.length) return finish(node);
      if (src.startsWith('</', i)) {
        const end = src.indexOf('>', i);
        i = end < 0 ? src.length : end + 1;
        return finish(node);
      }
      if (src[i] === '<') { node.children.push(jsx()); continue; }
      if (src[i] === '{') { i++; node.children.push(group('{')); continue; }
      let text = '';
      while (i < src.length && src[i] !== '<' && src[i] !== '{') text += src[i++];
      if (text.trim()) node.children.push({ type: 'text', v: text.trim() });
    }
  }
  function finish(node) {
    for (const attr of node.attrs) if (attr.value) { attr.value.parent = node; attr.value.attr = attr.name; }
    for (const kid of node.children) kid.parent = node;
    return node;
  }

  function group(open) {
    const node = { type: 'group', open, items: [] };
    const close = CLOSE[open];
    const items = node.items;
    let mark = 0, nl = false;
    const tag = () => { if (items.length > mark) items[mark].nl = nl; };
    for (;;) {
      tag();
      const s = i;
      skipSpace();
      mark = items.length;
      nl = src.slice(s, i).includes('\n');
      if (i >= src.length) break;
      const c = src[i];
      if (c === close) { i++; break; }
      if (c === ')' || c === ']' || c === '}') { i++; if (open === 'root') continue; break; } // tolerate mismatches
      if (c === '(' || c === '[' || c === '{') { i++; items.push(group(c)); continue; }
      if (c === '"' || c === "'") { items.push(readString(c)); continue; }
      if (c === '`') { items.push(readTemplate()); continue; }
      if (c === '/' && exprPos(items)) { items.push(readRegex()); continue; }
      if (c === '<' && exprPos(items) && /[A-Za-z>]/.test(src[i + 1] ?? '')) { items.push(jsx()); continue; }
      if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(src[i + 1] ?? ''))) {
        let v = '';
        while (i < src.length && /[0-9A-Za-z_.]/.test(src[i])) v += src[i++];
        items.push({ type: 'num', v });
        continue;
      }
      if (isId(c) || c === '#') {
        let v = src[i++];
        while (i < src.length && isId(src[i])) v += src[i++];
        items.push({ type: 'id', v });
        continue;
      }
      const p = PUNCT.find((x) => src.startsWith(x, i)) ?? c;
      i += p.length;
      items.push({ type: 'p', v: p });
    }
    tag();
    adopt(node, items);
    return node;
  }

  const root = { type: 'group', open: 'root', items: [] };
  const top = group('root');
  root.items = top.items;
  adopt(root, root.items);
  return root;
}

export const isP = (n, v) => n?.type === 'p' && n.v === v;
export const isId = (n, v) => n?.type === 'id' && (v === undefined || n.v === v);
const isGroup = (n, open) => n?.type === 'group' && (open === undefined || n.open === open);

/** Every node under `node`, depth first, including JSX attribute values and children. */
export function* walk(node) {
  yield node;
  if (node.type === 'group') for (const kid of node.items) yield* walk(kid);
  else if (node.type === 'tpl') for (const part of node.parts) yield* walk(part);
  else if (node.type === 'jsx') {
    for (const attr of node.attrs) if (attr.value) yield* walk(attr.value);
    for (const kid of node.children) yield* walk(kid);
  }
}

export const elements = (node) => [...walk(node)].filter((n) => n.type === 'jsx');
export const ids = (node) => [...walk(node)].filter((n) => n.type === 'id').map((n) => n.v);
export const attr = (el, name) => el.attrs.find((a) => a.name === name);
export const baseName = (name) => name.split('.').pop();

/** Splits a list of items at top-level commas. */
export function splitArgs(items) {
  const parts = [[]];
  for (const item of items) {
    if (isP(item, ',')) parts.push([]);
    else parts[parts.length - 1].push(item);
  }
  return parts.filter((part) => part.length);
}

// ---- function frames ----

function nameBefore(items, k) {
  // items[k] is the token just before a function value. Returns { name, via, attr }.
  if (isP(items[k], '=')) {
    for (let j = k - 1; j >= 0; j--) {
      if (isId(items[j]) && ['const', 'let', 'var'].includes(items[j - 1]?.v)) return { name: items[j].v };
      if (isId(items[j]) && isP(items[j + 1], '=')) return { name: items[j].v };
      if (isP(items[j], ';')) break;
    }
    return {};
  }
  if (isP(items[k], ':') && isId(items[k - 1])) return { name: items[k - 1].v };
  return {};
}

function wrapperOf(containerGroup) {
  // The function value is the first argument of a call: memo(...), useCallback(...), etc.
  if (!isGroup(containerGroup, '(')) {
    if (containerGroup?.type === 'group' && containerGroup.open === '{' && containerGroup.parent?.type === 'jsx') return { attr: containerGroup.attr };
    return {};
  }
  const parent = containerGroup.parent;
  if (parent?.type !== 'group') return {};
  let prev = parent.items[containerGroup.idx - 1];
  if (prev?.type === 'p' && /^>+$/.test(prev.v)) { // generic call: memo<Props>(...)
    let j = containerGroup.idx - 1, depth = 0;
    for (; j >= 0; j--) {
      const t = parent.items[j];
      if (t.type === 'p' && /^>+$/.test(t.v)) depth += t.v.length;
      else if (isP(t, '<')) { depth--; if (!depth) break; }
    }
    prev = parent.items[j - 1];
  }
  if (isId(prev)) {
    const outer = nameBefore(parent.items, containerGroup.idx - 1 - (isP(parent.items[containerGroup.idx - 2], '.') ? 2 : 1));
    return { via: prev.v, name: outer.name, call: containerGroup };
  }
  return {};
}

function describeArrow(items, j, container) {
  let k = j - 1;
  if (isGroup(items[k], '(') || isId(items[k])) k--;
  else { while (k >= 0 && !isGroup(items[k], '(')) k--; k--; }
  if (isId(items[k], 'async')) k--;
  const params = items[k + 1]?.v === 'async' ? items[k + 2] : items[k + 1];
  const frame = { kind: 'arrow', params, arrowIndex: j, items, container };
  if (k >= 0) Object.assign(frame, nameBefore(items, k));
  else Object.assign(frame, wrapperOf(container));
  return frame;
}

function functionBody(g) {
  // `function Name(params) {` or method `name(params) {`, optionally with a return type.
  const parent = g.parent;
  if (parent?.type !== 'group') return null;
  const items = parent.items;
  let k = g.idx - 1;
  if (!isGroup(items[k], '(')) {
    let sawColon = false;
    while (k >= 0 && !isGroup(items[k], '(')) { if (isP(items[k], ':')) sawColon = true; if (isP(items[k], ';') || isP(items[k], '=') || isP(items[k], '=>')) return null; k--; }
    if (!sawColon) return null;
  }
  const params = items[k];
  if (!params) return null;
  const before = items[k - 1];
  if (isId(before, 'function')) return { kind: 'function', params, body: g, ...nameBefore(items, k - 2), ...(k - 2 < 0 ? wrapperOf(parent) : {}) };
  if (isId(before) && isId(items[k - 2], 'function')) {
    const frame = { kind: 'function', params, body: g, name: before.v };
    if (k - 3 < 0) Object.assign(frame, { ...wrapperOf(parent), name: before.v });
    return frame;
  }
  if (isId(before) && !['if', 'for', 'while', 'switch', 'catch', 'with', 'return'].includes(before.v)) return { kind: 'method', params, body: g, name: before.v };
  return null;
}

/** Function frames enclosing `node`, outermost first. */
export function frames(node) {
  const out = [];
  let cur = node;
  while (cur.parent) {
    const parent = cur.parent;
    if (parent.type === 'group') {
      const items = parent.items;
      for (let j = cur.idx - 1; j >= 0; j--) {
        const t = items[j];
        if (isP(t, ',') || isP(t, ';')) break;
        if (isP(t, '=>')) { out.unshift(describeArrow(items, j, parent)); break; }
      }
      if (parent.open === '{') { const f = functionBody(parent); if (f) out.unshift(f); }
    }
    cur = parent;
  }
  return out;
}

export const isComponentFrame = (f) => (f.name && /^[A-Z]/.test(f.name)) || ['memo', 'forwardRef'].includes(f.via);

/** Items making up an arrow's body (after =>), or the function body group. */
export function frameBody(f) {
  if (f.kind !== 'arrow') return [f.body];
  const out = [];
  for (let j = f.arrowIndex + 1; j < f.items.length; j++) {
    if (isP(f.items[j], ',') || isP(f.items[j], ';')) break;
    out.push(f.items[j]);
  }
  return out;
}

/** Last argument of a call group if it is an array: the deps list. */
export function depsOf(callGroup) {
  const args = splitArgs(callGroup.items);
  const last = args[args.length - 1];
  return last && last.length === 1 && isGroup(last[0], '[') ? ids(last[0]) : null;
}

// ---- declarations ----

/** Declarations named `name` in a file: { init: items, scope: group, kind } */
export function declarations(root, name) {
  const out = [];
  for (const n of walk(root)) {
    if (n.type !== 'group') continue;
    const items = n.items;
    for (let j = 0; j < items.length; j++) {
      const t = items[j];
      if (isId(t, 'function') && isId(items[j + 1], name)) {
        const body = items.slice(j + 2).find((x) => isGroup(x, '{'));
        out.push({ kind: 'function', scope: n, index: j, params: items[j + 2], body, init: [t, ...items.slice(j + 1, j + 2), items[j + 2], body] });
      }
      if (isId(t, 'class') && isId(items[j + 1], name)) out.push({ kind: 'class', scope: n, index: j, init: items.slice(j, j + 6) });
      if (['const', 'let', 'var'].includes(t.v) && t.type === 'id') {
        // simple: const name = ...   or destructuring: const [a, b] = ... / const { a } = ...
        let k = j + 1;
        const target = items[k];
        const bound = isId(target) ? [target.v] : (isGroup(target) ? ids(target) : []);
        if (!bound.includes(name)) continue;
        while (k < items.length && !isP(items[k], '=')) k++;
        const init = [];
        for (let m = k + 1; m < items.length; m++) {
          const t2 = items[m];
          if (isP(t2, ';') || isP(t2, ',')) break;
          // automatic semicolon: a new line that starts with a word after a complete value ends the statement
          const prev = items[m - 1];
          if (m > k + 1 && t2.nl && (t2.type === 'id' || t2.type === 'jsx') && prev.type !== 'p' && !['as', 'satisfies', 'in', 'instanceof'].includes(t2.v)) break;
          init.push(t2);
        }
        out.push({ kind: isId(target) ? 'const' : 'destructure', scope: n, index: j, target, init, position: isGroup(target, '[') ? splitArgs(target.items).findIndex((p) => isId(p[0], name)) : -1 });
      }
      if (isId(t, 'import')) {
        // import X from '...'; import { X } from '...'; import { Y as X } from '...'
        let k = j + 1;
        const parts = [];
        while (k < items.length && !isId(items[k], 'from')) parts.push(items[k++]);
        const from = items[k + 1];
        if (from?.type !== 'str') continue;
        if (parts.some((p) => isId(p, name))) out.push({ kind: 'default-import', from: from.v, scope: n, index: j, init: [] });
        const named = parts.find((p) => isGroup(p, '{'));
        if (named) {
          for (const spec of splitArgs(named.items)) {
            const local = spec[spec.length - 1];
            if (isId(local, name)) out.push({ kind: 'import', from: from.v, imported: spec[0].v === 'type' ? spec[1]?.v : spec[0].v, scope: n, index: j, init: [] });
          }
        }
      }
    }
  }
  return out;
}

/** Resolves a value (items of an attribute or a declaration) to a function: { params, body: items } or null. */
export function asFunction(items) {
  if (!items?.length) return null;
  let list = items;
  // unwrap useCallback(fn, deps) / memo(fn)
  if (isId(list[0]) && isP(list[1], '<')) { // generic call: useCallback<Fn>(...)
    const close = list.findIndex((t, j) => j > 1 && isGroup(t, '(') && list[j - 1].type === 'p' && /^>+$/.test(list[j - 1].v));
    if (close > 0) list = [list[0], ...list.slice(close)];
  }
  if (isId(list[0]) && isGroup(list[1], '(') && list.length === 2) {
    const first = splitArgs(list[1].items)[0];
    const inner = first && asFunction(first);
    return inner ? { ...inner, via: list[0].v, call: list[1] } : null;
  }
  if (isId(list[0], 'React') && isP(list[1], '.') && isId(list[2]) && isGroup(list[3], '(')) return asFunction(list.slice(2));
  if (isId(list[0], 'async')) list = list.slice(1);
  const arrow = list.findIndex((t) => isP(t, '=>'));
  if (arrow === 1 || (arrow > 1 && isGroup(list[0], '(') && isP(list[1], ':'))) return { kind: 'arrow', params: list[0], body: list.slice(arrow + 1) };
  if (isId(list[0], 'function')) {
    const params = list.find((t) => isGroup(t, '('));
    const body = list.find((t) => isGroup(t, '{'));
    return { kind: 'function', params, body: [body] };
  }
  return null;
}

/** Value items of a JSX attribute: the contents of {...}, or [jsx]/[str]. */
export function attrItems(a) {
  if (!a?.value) return [];
  return a.value.type === 'group' ? a.value.items : [a.value];
}

// ---- files ----

export function loadFile(path) {
  const src = readFileSync(path, 'utf8');
  return { path, src, root: parse(src) };
}

/** Resolves a relative import from `file` to a path inside the workspace, or null. */
export function resolveImport(file, spec) {
  if (!spec.startsWith('.')) return null;
  const base = join(dirname(file.path), spec);
  for (const candidate of [base, ...['.tsx', '.ts', '.jsx', '.js'].map((ext) => base + ext), ...['.tsx', '.ts', '.jsx', '.js'].map((ext) => join(base, 'index' + ext))]) {
    if (existsSync(candidate) && !candidate.endsWith('/')) {
      try { readFileSync(candidate); return candidate; } catch { /* directory */ }
    }
  }
  return null;
}
