import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { loadPage, elements, scripts, stripJsComments, seconds, splitTop } from './lib.mjs';

const dir = fileURLToPath(new URL('..', import.meta.url));
const { doc, styles } = loadPage(dir);
const all = elements(doc);
const js = stripJsComments(scripts(dir, doc));

const animates = (cs) => {
  if (!cs['animation-name']) return false;
  const names = splitTop(cs['animation-name'], ',').map((s) => s.trim().toLowerCase());
  const durations = splitTop(cs['animation-duration'] ?? '0s', ',').map(seconds);
  return names.some((n, i) => n !== 'none' && (durations[i % durations.length] ?? 0) > 0.02);
};

test('css animation', () => {
  for (const width of [1280, 320]) {
    const ctx = { width, reducedMotion: true };
    for (const el of all) for (const pseudo of [null, 'before', 'after']) {
      assert.ok(!animates(styles.computed(el, ctx, pseudo)), `${el.tag}.${el.attrs.class ?? ''} at ${width}px`);
    }
  }
});

test('smooth scrolling', () => {
  for (const el of all) assert.notEqual(styles.computed(el, { width: 1280, reducedMotion: true })['scroll-behavior'], 'smooth');
  if (/smooth/.test(js)) assert.match(js, /prefers-reduced-motion/, 'script checks the setting');
});
