import test from 'node:test';
import assert from 'node:assert/strict';
import { elements, attr, has, visible, focusContrast } from './lib.mjs';
import { page } from './pricing.mjs';

const { doc, styles } = page;
const focusable = elements(doc).filter((el) => ((el.tag === 'a' && has(el, 'href')) || ['button', 'select', 'textarea', 'summary', 'input'].includes(el.tag)
  || (has(el, 'tabindex') && Number(attr(el, 'tabindex')) >= 0) || attr(el, 'role') === 'tab') && !has(el, 'disabled'));

for (const dark of [false, true]) {
  test(`focus is visible with enough contrast, ${dark ? 'dark' : 'light'} theme`, () => {
    assert.ok(focusable.length >= 12, 'interactive elements present');
    const bad = [];
    for (const width of [1280, 360]) for (const el of focusable) {
      if (!visible(styles, el, { width, dark })) continue;
      const ratio = focusContrast(styles, el, width, { dark });
      if (ratio < 3) bad.push(`${el.tag}${el.attrs.id ? `#${el.attrs.id}` : ''} at ${width}px: ${ratio === 0 ? 'none' : ratio.toFixed(2)}`);
    }
    assert.deepEqual([...new Set(bad)], []);
  });
}
