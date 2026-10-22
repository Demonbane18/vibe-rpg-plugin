import test from 'node:test';
import assert from 'node:assert/strict';
import { db } from './sql.mjs';

const claims = () => db.tables.expense_claims;
const comments = () => db.tables.expense_claim_comments;
const checksOn = (tab, col) => tab.checks.filter((c) => c.includes(col)).join(' | ');
const fk = (tab, col) => tab.fks.find((f) => f.column === col);

test('claims table', () => {
  const t = claims();
  assert.ok(t, 'expense_claims is not created');
  for (const col of ['workspace_id', 'submitted_by', 'amount_cents', 'currency', 'description', 'spent_on', 'status', 'decided_by', 'decided_at', 'created_at']) {
    assert.ok(t.columns[col], `missing column ${col}`);
  }
  for (const col of ['workspace_id', 'submitted_by', 'amount_cents', 'currency', 'description', 'spent_on', 'status', 'created_at']) {
    assert.ok(t.columns[col].notNull, `${col} accepts null`);
  }
  assert.match(t.columns.amount_cents.def, /^(?:integer|int|int4|int8|bigint)\b/);
  assert.match(t.columns.spent_on.def, /^date\b/);
  assert.match(t.columns.status.def, /default 'pending'/);
  assert.match(t.columns.currency.def, /default 'eur'/);
});

test('claim values', () => {
  const t = claims();
  assert.match(checksOn(t, 'amount_cents'), /amount_cents>0|amount_cents>=1|0<amount_cents/);
  const currency = checksOn(t, 'currency');
  const upper3 = /upper\(/.test(currency) && (/length\(currency\)=3|=3\b/.test(currency) || /^(?:char|character)\(3\)/.test(t.columns.currency.def));
  assert.ok(/\[a-z\]\{3\}|\[a-z\]\[a-z\]\[a-z\]/.test(currency) || upper3, 'currency');
  const description = checksOn(t, 'description');
  assert.match(description, /500/);
  assert.match(description, /length/);
  const status = checksOn(t, 'status');
  for (const value of ['pending', 'approved', 'rejected']) assert.match(status, new RegExp(`'${value}'`));
});

test('comments table', () => {
  const t = comments();
  assert.ok(t, 'expense_claim_comments is not created');
  for (const col of ['claim_id', 'author_id', 'body', 'created_at']) {
    assert.ok(t.columns[col], `missing column ${col}`);
    assert.ok(t.columns[col].notNull, `${col} accepts null`);
  }
  const body = checksOn(t, 'body');
  assert.match(body, /2000/);
  assert.match(body, /length/);
});

test('references', () => {
  const ws = fk(claims(), 'workspace_id');
  assert.ok(ws && ws.target === 'workspaces' && /on delete cascade/.test(ws.rest));
  const claim = fk(comments(), 'claim_id');
  assert.ok(claim && claim.target === 'expense_claims' && /on delete cascade/.test(claim.rest));
  for (const [t, col] of [[claims(), 'submitted_by'], [claims(), 'decided_by'], [comments(), 'author_id']]) {
    assert.equal(fk(t, col)?.target, 'auth.users', col);
  }
});

test('column types', () => {
  for (const t of [claims(), comments()]) {
    for (const col of Object.values(t.columns)) {
      assert.doesNotMatch(col.def, /^timestamp(?!tz| with time zone)/, col.name);
      assert.doesNotMatch(col.def, /^(?:real|float|double|money)/, col.name);
    }
  }
});
