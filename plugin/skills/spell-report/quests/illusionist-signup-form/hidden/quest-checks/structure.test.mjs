import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { loadPage, elements, attr, has, ancestors, clean, text, visible, exposed } from './lib.mjs';

const dir = fileURLToPath(new URL('..', import.meta.url));
const { doc, styles } = loadPage(dir);
const all = elements(doc);
const ctx = { width: 1280 };
const shown = (el) => exposed(styles, el, ctx);

test('language', () => {
  const html = all.find((el) => el.tag === 'html');
  assert.match(attr(html, 'lang') ?? '', /^[a-z]{2,3}(-[a-z0-9]+)*$/i);
});

test('headings', () => {
  const headings = all.filter((el) => /^h[1-6]$/.test(el.tag) && shown(el) && clean(text(el)))
    .map((el) => Number(attr(el, 'aria-level') ?? el.tag[1]));
  assert.equal(headings.filter((l) => l === 1).length, 1, 'one main heading');
  for (let i = 1; i < headings.length; i++) assert.ok(headings[i] <= headings[i - 1] + 1, 'heading levels go down one at a time');
});

test('landmarks', () => {
  const role = (el) => attr(el, 'role');
  const sectioning = (el) => ancestors(el).some((a) => ['article', 'aside', 'main', 'nav', 'section'].includes(a.tag) || ['main', 'article', 'region'].includes(role(a)));
  const mains = all.filter((el) => (el.tag === 'main' || role(el) === 'main') && shown(el));
  assert.equal(mains.length, 1, 'one main landmark');
  assert.ok(all.some((el) => role(el) === 'banner' || (el.tag === 'header' && !sectioning(el) && !role(el))), 'header landmark');
  assert.ok(all.some((el) => role(el) === 'contentinfo' || (el.tag === 'footer' && !sectioning(el) && !role(el))), 'footer landmark');
  const navs = all.filter((el) => el.tag === 'nav' || role(el) === 'navigation');
  assert.ok(navs.some((n) => elements(n).some((a) => a.tag === 'a' && attr(a, 'href') === '/classes')), 'site navigation landmark');
  const form = all.find((el) => el.tag === 'form');
  assert.ok(ancestors(form).includes(mains[0]), 'form is main content');
});
