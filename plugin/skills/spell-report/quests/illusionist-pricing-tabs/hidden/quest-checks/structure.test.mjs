import test from 'node:test';
import assert from 'node:assert/strict';
import { elements, attr, has, ancestors, clean, text, visible, exposed, accessibleName } from './lib.mjs';
import { page, all, planCards, PLANS } from './pricing.mjs';

const { doc, styles } = page;
const ctx = { width: 1280 };
const role = (el) => attr(el, 'role');

test('outline', () => {
  assert.match(attr(all.find((el) => el.tag === 'html'), 'lang') ?? '', /^[a-z]{2,3}(-[a-z0-9]+)*$/i);
  const headings = all.filter((el) => /^h[1-6]$/.test(el.tag) && exposed(styles, el, ctx) && clean(text(el)));
  const h1 = headings.filter((h) => h.tag === 'h1' || attr(h, 'aria-level') === '1');
  assert.equal(h1.length, 1);
  assert.match(clean(text(h1[0])), /Pricing that grows with your team/i);
  const levels = headings.map((h) => Number(attr(h, 'aria-level') ?? h.tag[1]));
  for (let i = 1; i < levels.length; i++) assert.ok(levels[i] <= levels[i - 1] + 1);
});

test('landmarks', () => {
  const sectioning = (el) => ancestors(el).some((a) => ['article', 'aside', 'main', 'nav', 'section'].includes(a.tag) || ['main', 'article', 'region'].includes(role(a)));
  assert.equal(all.filter((el) => (el.tag === 'main' || role(el) === 'main') && visible(styles, el, ctx)).length, 1);
  assert.ok(all.some((el) => role(el) === 'banner' || (el.tag === 'header' && !sectioning(el) && !role(el))));
  assert.ok(all.some((el) => role(el) === 'contentinfo' || (el.tag === 'footer' && !sectioning(el) && !role(el))));
  const nav = all.find((el) => (el.tag === 'nav' || role(el) === 'navigation') && elements(el).some((a) => a.tag === 'a' && attr(a, 'href') === '/docs'));
  assert.ok(nav);
  const current = elements(nav).find((a) => a.tag === 'a' && attr(a, 'href') === '/pricing');
  assert.equal(attr(current, 'aria-current'), 'page');
});

test('plan cards', () => {
  const found = planCards();
  assert.ok(found, 'three plan cards with their names as headings');
  for (const { name, card } of found.cards) {
    const lists = elements(card).filter((el) => el.tag === 'ul' || el.tag === 'ol' || role(el) === 'list');
    assert.ok(lists.some((l) => elements(l).filter((li) => li.tag === 'li' || role(li) === 'listitem').length >= 3), `${name} features`);
    const cta = elements(card).find((el) => el.tag === 'a' && attr(el, 'href') === `/signup?plan=${name.toLowerCase()}`);
    assert.ok(cta, `${name} button`);
    assert.match(accessibleName(doc, cta), new RegExp(name, 'i'));
  }
  assert.match(clean(text(found.cards[1].card)), /Most popular/i);
  assert.match(clean(text(doc)), /Save 20%/i);
  assert.ok(all.some((el) => el.tag === 'a' && /^mailto:procurement\.team@fieldnoteworkspace\.example/i.test(attr(el, 'href') ?? '')), 'seats note');
});
