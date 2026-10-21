import test from 'node:test';
import assert from 'node:assert/strict';
import { paginate } from '../src/paginate.mjs';

test('includes every item on the first full page', () => {
  assert.deepEqual(paginate(['a', 'b', 'c', 'd', 'e'], 1, 3), ['a', 'b', 'c']);
});

test('includes every item on a middle page', () => {
  assert.deepEqual(paginate([1, 2, 3, 4, 5, 6, 7], 2, 3), [4, 5, 6]);
});

test('keeps the final element of an exactly full last page', () => {
  assert.deepEqual(paginate([1, 2, 3, 4, 5, 6], 2, 3), [4, 5, 6]);
});

test('single-item pages do not lose their entry', () => {
  assert.deepEqual(paginate(['ash', 'birch', 'elm'], 2, 1), ['birch']);
});

test('short final pages keep all remaining items', () => {
  assert.deepEqual(paginate([1, 2, 3, 4, 5], 2, 3), [4, 5]);
});

test('empty inputs and out-of-range pages return empty arrays', () => {
  assert.deepEqual(paginate([], 1, 5), []);
  assert.deepEqual(paginate([1, 2], 3, 2), []);
  assert.deepEqual(paginate([1], Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER), []);
});

test('default page and size select the first ten items', () => {
  const values = Array.from({ length: 12 }, (_, index) => index);
  assert.deepEqual(paginate(values), values.slice(0, 10));
  assert.deepEqual(paginate(values, undefined, undefined), values.slice(0, 10));
});

test('does not mutate input and returns a fresh array', () => {
  const values = Object.freeze(['ash', 'elm']);
  const result = paginate(values, 1, 5);
  assert.deepEqual(result, ['ash', 'elm']);
  assert.notEqual(result, values);
  result.push('fern');
  assert.equal(values.length, 2);
});

test('preserves object identity and falsy values', () => {
  const parcel = { label: 'Mirepost' };
  const values = [parcel, null, false, 0, ''];
  assert.deepEqual(paginate(values, 1, 5), values);
  assert.equal(paginate(values, 1, 5)[0], parcel);
});

test('invalid collections throw TypeError', () => {
  for (const value of [null, undefined, 'abc', {}, new Set([1])]) {
    assert.throws(() => paginate(value), TypeError);
  }
});

test('invalid page numbers throw RangeError', () => {
  for (const page of [0, -1, 1.5, NaN, Infinity, '1', null, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => paginate([], page, 3), RangeError);
  }
});

test('invalid page sizes throw RangeError', () => {
  for (const pageSize of [0, -1, 2.5, NaN, Infinity, '2', null, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => paginate([], 1, pageSize), RangeError);
  }
});
