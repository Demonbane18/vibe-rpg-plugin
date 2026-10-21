import test from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from '../src/slugify.mjs';

test('turns a place name into a slug', () => {
  assert.equal(slugify('Moss Gate'), 'moss-gate');
});
