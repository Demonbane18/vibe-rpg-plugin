import test from 'node:test';
import assert from 'node:assert/strict';
import { db } from './sql.mjs';

function leading(table) {
  const t = db.tables[table];
  return new Set([...(t?.keys ?? []).map((k) => k[0]), ...db.indexes.filter((i) => i.table === table).map((i) => i.columns[0])]);
}

test('lookup columns', () => {
  for (const table of ['expense_claims', 'expense_claim_comments']) {
    const t = db.tables[table];
    assert.ok(t, table);
    const covered = leading(table);
    for (const fk of t.fks) assert.ok(covered.has(fk.column), `${table}.${fk.column}`);
  }
});

test('admin queue', () => {
  const ok = db.indexes.some((i) => i.table === 'expense_claims'
    && i.columns.includes('workspace_id') && i.columns.includes('created_at')
    && (i.columns.includes('status') || /status/.test(i.where)));
  assert.ok(ok);
});
