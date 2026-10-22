import test from 'node:test';
import assert from 'node:assert/strict';
import { db, expand, ADMIN, MEMBER } from './sql.mjs';

const TABLES = ['expense_claims', 'expense_claim_comments'];
const policies = (table, ...cmds) => db.policies.filter((p) => p.table === table && !p.restrictive && (cmds.includes(p.cmd) || p.cmd === 'all'));
const uid = /auth\.uid\(\)/;

// Status can also be protected by a trigger or by column privileges instead of the policy itself.
function statusGuard(event) {
  for (const trigger of db.triggers) {
    if (!/ on (?:public\.)?expense_claims\b/.test(trigger) || !new RegExp(`\\b${event}\\b`).test(trigger.split(' on ')[0])) continue;
    const fn = /execute (?:function|procedure) ([\w.]+)\(/.exec(trigger)?.[1]?.replace(/^public\./, '');
    if (fn && /status/.test(db.functions[fn]?.body ?? '')) return true;
  }
  const revoked = db.grants.some((g) => new RegExp(`^revoke [\\w,]*\\b(?:${event}|all)\\b[\\w, ]*on (?:table )?(?:public\\.)?expense_claims\\b.*\\bauthenticated\\b`).test(g));
  const columns = db.grants.find((g) => new RegExp(`^grant .*\\b${event}\\(([^)]*)\\)\\s?on (?:table )?(?:public\\.)?expense_claims\\b`).test(g));
  return revoked && !!columns && !new RegExp(`\\b${event}\\(([^)]*)\\)`).exec(columns)[1].includes('status');
}

test('row security on new tables', () => {
  for (const t of TABLES) assert.ok(db.tables[t]?.rls, t);
});

test('policy roles and commands', () => {
  const mine = db.policies.filter((p) => TABLES.includes(p.table));
  assert.ok(mine.length > 0);
  for (const p of mine) {
    assert.notEqual(p.cmd, 'all', p.name);
    assert.deepEqual(p.roles, ['authenticated'], p.name);
  }
});

test('policy expressions', () => {
  for (const p of db.policies) {
    const text = `${p.using ?? ''} ${p.check ?? ''}`;
    const calls = text.match(/auth\.uid\(\)/g)?.length ?? 0;
    const wrapped = text.match(/\(select auth\.uid\(\)\)/g)?.length ?? 0;
    assert.equal(wrapped, calls, p.name);
  }
  const local = new Set(Object.keys(db.functions).map((n) => n.split('.').pop()));
  for (const s of db.statements) {
    for (const m of s.matchAll(/(\w+\.)?(is_workspace_(?:member|admin))\(/g)) {
      if (!local.has(m[2])) assert.equal(m[1], 'private.', s.slice(0, 60));
    }
  }
});

test('reading claims', () => {
  const read = policies('expense_claims', 'select');
  assert.ok(read.length > 0);
  const texts = read.map((p) => expand(p.using));
  for (const [i, text] of texts.entries()) assert.ok(/submitted_by/.test(text) || ADMIN.test(text), read[i].name);
  const all = texts.join(' ');
  assert.ok(/submitted_by/.test(all) && uid.test(all) && ADMIN.test(all));
});

test('submitting claims', () => {
  const insert = policies('expense_claims', 'insert');
  assert.ok(insert.length > 0);
  for (const p of insert) {
    const text = expand(p.check);
    assert.match(text, /submitted_by/, p.name);
    assert.match(text, uid, p.name);
    assert.match(text, MEMBER, p.name);
    assert.ok(/'pending'/.test(text) || statusGuard('insert'), p.name);
  }
});

test('changing claims', () => {
  const update = policies('expense_claims', 'update');
  assert.ok(update.length > 0);
  for (const p of update) {
    const using = expand(p.using);
    assert.ok(/submitted_by/.test(using) && uid.test(using) && /'pending'/.test(using), p.name);
    const check = expand(p.check ?? p.using);
    assert.ok(/'pending'/.test(check) || statusGuard('update'), p.name);
  }
  const remove = policies('expense_claims', 'delete');
  assert.ok(remove.length > 0);
  for (const p of remove) {
    const using = expand(p.using);
    assert.ok(/submitted_by/.test(using) && uid.test(using) && /'pending'/.test(using), p.name);
  }
});

test('comments', () => {
  const read = policies('expense_claim_comments', 'select');
  assert.ok(read.length > 0);
  for (const p of read) assert.match(expand(p.using), /expense_claims\b/, p.name);
  const insert = policies('expense_claim_comments', 'insert');
  assert.ok(insert.length > 0);
  for (const p of insert) {
    const text = expand(p.check);
    assert.ok(/author_id/.test(text) && uid.test(text) && /expense_claims\b/.test(text), p.name);
  }
  assert.equal(policies('expense_claim_comments', 'update').length, 0);
  const remove = policies('expense_claim_comments', 'delete');
  assert.ok(remove.length > 0);
  for (const p of remove) assert.match(expand(p.using), /author_id/, p.name);
});
