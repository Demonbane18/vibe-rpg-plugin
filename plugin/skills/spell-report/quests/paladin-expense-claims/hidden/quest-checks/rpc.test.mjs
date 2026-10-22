import test from 'node:test';
import assert from 'node:assert/strict';
import { db, ADMIN } from './sql.mjs';

const fn = () => db.functions.decide_expense_claim;
const KNOWN = ['workspaces', 'workspace_members', 'expense_claims', 'expense_claim_comments'];

test('decision function', () => {
  const f = fn();
  assert.ok(f, 'decide_expense_claim is not created');
  assert.ok(!/^\w+\./.test(f.name) || f.name.startsWith('public.'));
  assert.equal(f.args.length, 2);
});

test('function privileges', () => {
  const f = fn();
  assert.match(f.rest, /security definer/);
  const path = /set search_path(?:=| to )([^$]*?)(?= as | language |$|\$\$)/.exec(f.rest);
  assert.ok(path);
  const value = path[1].trim();
  if (value === "''" || value === '""') {
    for (const m of f.body.matchAll(/\b(?:from|join|update|into)\s+(\w+)\b(?!\.)/g)) {
      assert.ok(!KNOWN.includes(m[1]), m[1]);
    }
  }
  if (!/private/.test(value)) assert.doesNotMatch(f.body, /(?<!private\.)is_workspace_(?:member|admin)\(/);
});

test('decision rules', () => {
  const body = fn().body;
  assert.match(body, /auth\.uid\(\)/);
  assert.match(body, ADMIN);
  assert.match(body, /submitted_by/);
  assert.match(body, /'pending'/);
  assert.match(body, /decided_by/);
  assert.match(body, /decided_at/);
});

test('exposure', () => {
  const revokes = db.grants.filter((g) => /^revoke (?:all|execute)\b.*\bon function .*decide_expense_claim\b/.test(g)).join(' ');
  assert.match(revokes, /\bfrom\b.*\bpublic\b/);
  assert.match(revokes, /\bfrom\b.*\banon\b/);
  for (const g of db.grants.filter((s) => s.startsWith('grant '))) {
    assert.doesNotMatch(g, /\bto\b.*\b(?:anon|public)\b/, g.slice(0, 80));
    assert.doesNotMatch(g, /^grant all\b/, g.slice(0, 80));
  }
});
