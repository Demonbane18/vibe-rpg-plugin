import test from 'node:test';
import assert from 'node:assert/strict';
import { elements, attr, has, ancestors, visible, overflowAt, columnCount, contentWidth, borderBoxWidth, targetSize, clean, text } from './lib.mjs';
import { page, all, planCards } from './pricing.mjs';

const { styles } = page;

test('viewport', () => {
  const meta = all.find((el) => el.tag === 'meta' && (attr(el, 'name') ?? '').toLowerCase() === 'viewport');
  const content = (attr(meta ?? { attrs: {} }, 'content') ?? '').toLowerCase().replace(/\s+/g, '');
  assert.match(content, /width=device-width/);
  assert.doesNotMatch(content, /user-scalable=(no|0)\b/);
  const max = /maximum-scale=([\d.]+)/.exec(content);
  assert.ok(!max || Number(max[1]) >= 2);
});

test('no sideways scroll', () => {
  for (const width of [320, 768, 1280]) assert.deepEqual(overflowAt(styles, width), [], `${width}px`);
});

test('plan columns', () => {
  const found = planCards();
  assert.ok(found, 'plan cards');
  assert.equal(columnCount(styles, found.container, { width: 360 }, 3), 1, 'phones');
  assert.equal(columnCount(styles, found.container, { width: 600 }, 3), 1, 'phones');
  assert.equal(columnCount(styles, found.container, { width: 1280 }, 3), 3, 'desktop');
  assert.equal(columnCount(styles, found.container, { width: 1024 }, 3), 3, 'desktop');
  for (const width of [1440, 1920]) {
    const box = borderBoxWidth(styles, found.container, { width }, contentWidth(styles, found.container.parent, { width }));
    assert.ok(box <= 1121, 'content width');
  }
});

test('target size', () => {
  const nav = all.filter((el) => el.tag === 'nav' || attr(el, 'role') === 'navigation');
  const targets = all.filter((el) => el.tag === 'button' || attr(el, 'role') === 'tab'
    || (el.tag === 'a' && (nav.some((n) => ancestors(el).includes(n)) || /^\/signup/.test(attr(el, 'href') ?? ''))));
  assert.ok(targets.length >= 9);
  const bad = [];
  for (const width of [360, 1280]) for (const el of targets) {
    if (!visible(styles, el, { width })) continue;
    const { w, h } = targetSize(styles, el, { width });
    if (w < 43.5 || h < 43.5) bad.push(`"${clean(text(el))}" ${Math.round(w)}x${Math.round(h)} at ${width}px`);
  }
  assert.deepEqual(bad, []);
});
