import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { loadPage, elements, attr, ancestors, text, clean, visible, targetSize } from './lib.mjs';

const dir = fileURLToPath(new URL('..', import.meta.url));
const { doc, styles } = loadPage(dir);
const all = elements(doc);
const nav = all.filter((el) => el.tag === 'nav' || attr(el, 'role') === 'navigation');
const targets = all.filter((el) => el.tag === 'button' || (el.tag === 'input' && ['submit', 'button', 'reset'].includes((attr(el, 'type') ?? '').toLowerCase()))
  || (el.tag === 'a' && nav.some((n) => ancestors(el).includes(n))));

test('target size', () => {
  assert.ok(targets.length >= 7, 'buttons and navigation links are present');
  for (const width of [320, 1280]) {
    const ctx = { width };
    for (const el of targets) {
      if (!visible(styles, el, ctx)) continue;
      const { w, h } = targetSize(styles, el, ctx);
      assert.ok(w >= 43.5 && h >= 43.5, `${el.tag} "${clean(text(el))}" at ${width}px`);
    }
  }
});
