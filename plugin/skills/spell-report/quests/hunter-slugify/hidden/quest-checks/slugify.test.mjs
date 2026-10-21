import test from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from '../src/slugify.mjs';

test('trims whitespace and lowercases ASCII', () => {
  assert.equal(slugify('\n  SILVER Gate\t'), 'silver-gate');
});

test('removes decomposed and precomposed diacritics', () => {
  assert.equal(slugify('Crème A\u030aring'), 'creme-aring');
});

test('normalizes compatibility letters and ligatures', () => {
  assert.equal(slugify('ＦＯＧ ﬃeld ①'), 'fog-ffield-1');
});

test('removes combining marks beyond the basic accent block', () => {
  assert.equal(slugify('a\u1ab0b\u20d0c'), 'abc');
});

test('collapses all non-ASCII runs and strips edge separators', () => {
  assert.equal(slugify('/// Oak_+_9...Moon?!'), 'oak-9-moon');
});

test('does not transliterate unsupported scripts or letters', () => {
  assert.equal(slugify('雪 Ł Ø ß'), '');
});

test('empty and whitespace strings produce an empty slug', () => {
  assert.equal(slugify(''), '');
  assert.equal(slugify(' \n\t\u00a0'), '');
});

test('non-string inputs throw TypeError', () => {
  for (const value of [undefined, null, 17, false, {}, [], new String('fern')]) {
    assert.throws(() => slugify(value), TypeError);
  }
});

test('default and explicit undefined lengths are sixty', () => {
  assert.equal(slugify('Q'.repeat(61)), 'q'.repeat(60));
  assert.equal(slugify('Q'.repeat(61), { maxLength: undefined }), 'q'.repeat(60));
});

test('keeps the final complete word at the limit', () => {
  assert.equal(slugify('silver-fern-moon', { maxLength: 11 }), 'silver-fern');
  assert.equal(slugify('silver-fern', { maxLength: 11 }), 'silver-fern');
  assert.equal(slugify('silver-fern-moon', { maxLength: 10 }), 'silver');
});

test('falls back to cutting a long first word', () => {
  assert.equal(slugify('evergreen-fern', { maxLength: 4 }), 'ever');
  assert.equal(slugify('a-b-c', { maxLength: 1 }), 'a');
  assert.equal(slugify('a-b-c', { maxLength: 2 }), 'a');
});

test('invalid length options throw RangeError', () => {
  for (const maxLength of [0, -1, 2.5, NaN, Infinity, '4', null, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => slugify('moss', { maxLength }), RangeError);
  }
});
