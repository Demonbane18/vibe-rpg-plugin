import test from 'node:test';
import assert from 'node:assert/strict';
import { paginate } from '../src/paginate.mjs';

test('returns a short first page', () => {
  assert.deepEqual(paginate(['birch', 'fern'], 1, 4), ['birch', 'fern']);
});

test('returns the short final page', () => {
  assert.deepEqual(paginate(['a', 'b', 'c', 'd', 'e'], 2, 3), ['d', 'e']);
});

test('rejects invalid pagination arguments', () => {
  assert.throws(() => paginate('fern'), TypeError);
  assert.throws(() => paginate([], 0, 3), RangeError);
  assert.throws(() => paginate([], 1, 0), RangeError);
});
