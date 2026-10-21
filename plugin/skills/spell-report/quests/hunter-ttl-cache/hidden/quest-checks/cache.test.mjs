import test from 'node:test';
import assert from 'node:assert/strict';
import { TTLCache } from '../src/cache.mjs';

test('defaults mean three entries and one thousand milliseconds', () => {
  let time = 0;
  const cache = new TTLCache({ now: () => time });
  cache.set('a', 1).set('b', 2).set('c', 3).set('d', 4);
  assert.equal(cache.get('a'), undefined);
  assert.equal(cache.size, 3);
  time = 999;
  assert.equal(cache.get('b'), 2);
  time = 1000;
  assert.equal(cache.size, 0);
});

test('fresh values retain identity and set supports chaining', () => {
  const cache = new TTLCache({ now: () => 0 });
  const card = { parcel: 'Fogpost' };
  assert.equal(cache.set('card', card), cache);
  assert.equal(cache.get('card'), card);
  cache.set('null', null).set('false', false);
  assert.equal(cache.get('null'), null);
  assert.equal(cache.get('false'), false);
});

test('positive TTL stays live immediately before its deadline', () => {
  let time = 200;
  const cache = new TTLCache({ ttlMs: 35, now: () => time });
  cache.set('card', 'ink');
  time = 234;
  assert.equal(cache.get('card'), 'ink');
});

test('TTL expires exactly at the millisecond deadline', () => {
  let time = 200;
  const cache = new TTLCache({ ttlMs: 35, now: () => time });
  cache.set('card', 'ink');
  time = 235;
  assert.equal(cache.get('card'), undefined);
  assert.equal(cache.size, 0);
});

test('reads update recency without extending TTL', () => {
  let time = 0;
  const cache = new TTLCache({ ttlMs: 10, now: () => time });
  cache.set('card', 'ink');
  time = 9;
  assert.equal(cache.get('card'), 'ink');
  time = 10;
  assert.equal(cache.get('card'), undefined);
});

test('entries keep separate write deadlines', () => {
  let time = 0;
  const cache = new TTLCache({ ttlMs: 10, now: () => time });
  cache.set('first', 1);
  time = 4;
  cache.set('second', 2);
  time = 10;
  assert.equal(cache.size, 1);
  assert.equal(cache.get('first'), undefined);
  assert.equal(cache.get('second'), 2);
});

test('reading the oldest key changes the eviction victim', () => {
  const cache = new TTLCache({ maxSize: 2, now: () => 0 });
  cache.set('ash', 1).set('elm', 2);
  assert.equal(cache.get('ash'), 1);
  cache.set('fir', 3);
  assert.equal(cache.get('elm'), undefined);
  assert.equal(cache.get('ash'), 1);
  assert.equal(cache.get('fir'), 3);
});

test('overwriting a key makes it most recently used', () => {
  const cache = new TTLCache({ maxSize: 2, now: () => 0 });
  cache.set('ash', 1).set('elm', 2).set('ash', 10).set('fir', 3);
  assert.equal(cache.get('elm'), undefined);
  assert.equal(cache.get('ash'), 10);
  assert.equal(cache.get('fir'), 3);
});

test('repeated overwrites neither grow size nor evict neighbors', () => {
  const cache = new TTLCache({ maxSize: 2, now: () => 0 });
  cache.set('ash', 1).set('elm', 2);
  for (let value = 3; value < 8; value++) cache.set('ash', value);
  assert.equal(cache.size, 2);
  assert.equal(cache.get('ash'), 7);
  assert.equal(cache.get('elm'), 2);
});

test('overwriting refreshes the deadline from that write', () => {
  let time = 0;
  const cache = new TTLCache({ maxSize: 1, ttlMs: 10, now: () => time });
  cache.set('ash', 1);
  time = 6;
  cache.set('ash', 2);
  time = 10;
  assert.equal(cache.get('ash'), 2);
  assert.equal(cache.size, 1);
  time = 16;
  assert.equal(cache.get('ash'), undefined);
});

test('expired recent entries are removed before live LRU eviction', () => {
  let time = 0;
  const cache = new TTLCache({ maxSize: 2, ttlMs: 10, now: () => time });
  cache.set('old', 1);
  time = 5;
  cache.set('live', 2);
  assert.equal(cache.get('old'), 1);
  time = 10;
  cache.set('new', 3);
  assert.equal(cache.size, 2);
  assert.equal(cache.get('live'), 2);
  assert.equal(cache.get('new'), 3);
  assert.equal(cache.get('old'), undefined);
});

test('reading a stored undefined value still refreshes recency', () => {
  const cache = new TTLCache({ maxSize: 2, now: () => 0 });
  cache.set('ash', undefined).set('elm', 2);
  assert.equal(cache.get('ash'), undefined);
  cache.set('fir', 3);
  assert.equal(cache.delete('ash'), true);
  assert.equal(cache.get('elm'), undefined);
  assert.equal(cache.get('fir'), 3);
});

test('size inspection does not refresh recency or expiry', () => {
  let time = 0;
  const cache = new TTLCache({ maxSize: 2, ttlMs: 10, now: () => time });
  cache.set('ash', 1).set('elm', 2);
  time = 5;
  assert.equal(cache.size, 2);
  cache.set('fir', 3);
  assert.equal(cache.get('ash'), undefined);
  time = 10;
  assert.equal(cache.size, 1);
  assert.equal(cache.get('fir'), 3);
});

test('misses do not disturb live recency', () => {
  const cache = new TTLCache({ maxSize: 2, now: () => 0 });
  cache.set('ash', 1).set('elm', 2);
  assert.equal(cache.get('missing'), undefined);
  assert.equal(cache.delete('missing'), false);
  cache.set('fir', 3);
  assert.equal(cache.get('ash'), undefined);
  assert.equal(cache.get('elm'), 2);
});

test('zero TTL is immediately absent and never consumes capacity', () => {
  const cache = new TTLCache({ maxSize: 1, ttlMs: 0, now: () => 7 });
  assert.equal(cache.set('ash', 1).set('elm', 2), cache);
  assert.equal(cache.size, 0);
  assert.equal(cache.get('elm'), undefined);
  assert.equal(cache.delete('ash'), false);
});

test('delete distinguishes live keys from expired keys', () => {
  let time = 0;
  const cache = new TTLCache({ ttlMs: 10, now: () => time });
  cache.set('ash', 1).set('elm', 2);
  assert.equal(cache.delete('ash'), true);
  assert.equal(cache.delete('ash'), false);
  time = 10;
  assert.equal(cache.delete('elm'), false);
  assert.equal(cache.size, 0);
});

test('clear removes all entries and permits fresh use', () => {
  let time = 0;
  const cache = new TTLCache({ maxSize: 1, ttlMs: 5, now: () => time });
  cache.set('ash', 1);
  assert.equal(cache.clear(), undefined);
  assert.equal(cache.size, 0);
  time = 3;
  cache.set('elm', 2);
  assert.equal(cache.get('ash'), undefined);
  assert.equal(cache.get('elm'), 2);
  time = 8;
  assert.equal(cache.size, 0);
});

test('keys use Map identity including objects and NaN', () => {
  const cache = new TTLCache({ maxSize: 4, now: () => 0 });
  const first = { id: 'fern' };
  const second = { id: 'fern' };
  cache.set(first, 1).set(second, 2).set(NaN, 3).set(undefined, 4);
  assert.equal(cache.get(first), 1);
  assert.equal(cache.get(second), 2);
  assert.equal(cache.get(NaN), 3);
  assert.equal(cache.get(undefined), 4);
  assert.equal(cache.get({ id: 'fern' }), undefined);
});

test('constructor rejects invalid option values', () => {
  for (const maxSize of [0, -1, 1.5, Infinity, NaN, '2', Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => new TTLCache({ maxSize }), RangeError);
  }
  for (const ttlMs of [-1, Infinity, NaN, '10', null]) {
    assert.throws(() => new TTLCache({ ttlMs }), RangeError);
  }
  for (const now of [null, 0, 'clock', {}]) {
    assert.throws(() => new TTLCache({ now }), TypeError);
  }
});

test('cache instances are independent through a large time jump', () => {
  let time = 0;
  const first = new TTLCache({ ttlMs: 10, now: () => time });
  const second = new TTLCache({ ttlMs: 100, now: () => time });
  first.set('ash', 1);
  second.set('ash', 2);
  time = 50;
  assert.equal(first.size, 0);
  assert.equal(second.get('ash'), 2);
  first.clear();
  assert.equal(second.size, 1);
  time = 5000;
  assert.equal(second.size, 0);
});

test('fractional millisecond TTLs preserve the exact boundary', () => {
  let time = 1;
  const cache = new TTLCache({ ttlMs: 0.5, now: () => time });
  cache.set('ash', 1);
  time = 1.25;
  assert.equal(cache.get('ash'), 1);
  time = 1.5;
  assert.equal(cache.get('ash'), undefined);
});
