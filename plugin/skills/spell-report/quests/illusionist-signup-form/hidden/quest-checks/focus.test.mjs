import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { loadPage, elements, attr, has, visible, focusContrast } from './lib.mjs';

const dir = fileURLToPath(new URL('..', import.meta.url));
const { doc, styles } = loadPage(dir);
const focusable = elements(doc).filter((el) => ((el.tag === 'a' && has(el, 'href')) || ['button', 'select', 'textarea', 'summary'].includes(el.tag)
  || (el.tag === 'input' && (attr(el, 'type') ?? '').toLowerCase() !== 'hidden') || (has(el, 'tabindex') && Number(attr(el, 'tabindex')) >= 0)) && !has(el, 'disabled'));

test('focus indicator', () => {
  assert.ok(focusable.length >= 10);
  const bad = [];
  for (const width of [1280, 320]) for (const el of focusable) {
    if (!visible(styles, el, { width })) continue;
    const ratio = focusContrast(styles, el, width);
    if (ratio < 3) bad.push(`${el.tag}${el.attrs.id ? `#${el.attrs.id}` : ''} at ${width}px: ${ratio === 0 ? 'none' : ratio.toFixed(2)}`);
  }
  assert.deepEqual(bad, []);
});
