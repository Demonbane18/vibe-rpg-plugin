import test from 'node:test';
import assert from 'node:assert/strict';
import { elements, attr, has, visible, forcedSelectionCue, forcedFocusOk } from './lib.mjs';
import { page, all } from './pricing.mjs';

const { styles } = page;
const tabs = all.filter((el) => attr(el, 'role') === 'tab');

test('selected option in forced colours', () => {
  const sel = tabs.find((t) => attr(t, 'aria-selected') === 'true'), un = tabs.find((t) => attr(t, 'aria-selected') !== 'true');
  assert.ok(sel && un, 'switcher present');
  for (const width of [1280, 360]) assert.ok(forcedSelectionCue(styles, sel, un, { width }), `${width}px`);
});

test('focus in forced colours', () => {
  const focusable = elements(page.doc).filter((el) => ((el.tag === 'a' && has(el, 'href')) || el.tag === 'button' || attr(el, 'role') === 'tab'
    || (has(el, 'tabindex') && Number(attr(el, 'tabindex')) >= 0)) && !has(el, 'disabled'));
  assert.ok(focusable.length >= 12);
  const bad = focusable.filter((el) => visible(styles, el, { width: 1280 }) && !forcedFocusOk(styles, el, 1280)).map((el) => `${el.tag}${el.attrs.id ? `#${el.attrs.id}` : ''}`);
  assert.deepEqual(bad, []);
});
