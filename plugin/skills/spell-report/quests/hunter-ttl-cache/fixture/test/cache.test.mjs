import test from 'node:test';
import assert from 'node:assert/strict';
import { TTLCache } from '../src/cache.mjs';

test('a new cache has no values', () => {
  const cache = new TTLCache({ now: () => 0 });
  assert.equal(cache.get('fern'), undefined);
  assert.equal(cache.size, 0);
});

test('stores and reads a fresh value', () => {
  const cache = new TTLCache({ now: () => 0 });
  assert.equal(cache.set('fern', 'green'), cache);
  assert.equal(cache.get('fern'), 'green');
  assert.equal(cache.size, 1);
});

test('capacity evicts the oldest untouched insertion', () => {
  const cache = new TTLCache({ maxSize: 2, now: () => 0 });
  cache.set('ash', 1).set('birch', 2).set('cedar', 3);
  assert.equal(cache.get('ash'), undefined);
  assert.equal(cache.get('birch'), 2);
  assert.equal(cache.get('cedar'), 3);
  assert.equal(cache.size, 2);
});

test('supports delete and clear', () => {
  const cache = new TTLCache({ now: () => 0 });
  cache.set('ash', 1).set('birch', 2);
  assert.equal(cache.delete('ash'), true);
  assert.equal(cache.delete('ash'), false);
  assert.equal(cache.size, 1);
  assert.equal(cache.clear(), undefined);
  assert.equal(cache.size, 0);
  assert.equal(cache.get('birch'), undefined);
});
