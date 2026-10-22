import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { loadPage, elements, attr, overflowAt } from './lib.mjs';

const dir = fileURLToPath(new URL('..', import.meta.url));
const { doc, styles } = loadPage(dir);

test('zoom allowed', () => {
  const meta = elements(doc).find((el) => el.tag === 'meta' && (attr(el, 'name') ?? '').toLowerCase() === 'viewport');
  assert.ok(meta, 'viewport meta');
  const content = (attr(meta, 'content') ?? '').toLowerCase().replace(/\s+/g, '');
  assert.match(content, /width=device-width/);
  assert.doesNotMatch(content, /user-scalable=(no|0)\b/);
  const max = /maximum-scale=([\d.]+)/.exec(content);
  assert.ok(!max || Number(max[1]) >= 2, 'maximum scale allows zoom');
});

test('no sideways scroll at 320px', () => {
  assert.deepEqual(overflowAt(styles, 320), []);
});

