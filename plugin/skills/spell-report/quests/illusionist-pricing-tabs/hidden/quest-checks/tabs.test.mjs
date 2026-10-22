import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { parseHTML, collectCSS, Styles, elements, attr, has, byId, accessibleName, text, visible, exposed, scripts, stripJsComments } from './lib.mjs';
import { createDom, Unsupported } from './dom.mjs';

const dir = fileURLToPath(new URL('..', import.meta.url));
const doc = parseHTML(readFileSync(new URL('../index.html', import.meta.url), 'utf8'));
const sheets = collectCSS(dir, doc);
const js = scripts(dir, doc);
const all = elements(doc);
const tablist = all.find((el) => attr(el, 'role') === 'tablist' && /monthly/i.test(text(el)));
const tabs = tablist ? elements(tablist).filter((el) => attr(el, 'role') === 'tab') : [];
const panelOf = (tab) => byId(doc, (attr(tab, 'aria-controls') ?? '').trim());
const isMonthly = (t) => /monthly/i.test(text(t));
const PRICES = { monthly: ['12', '29', '59'], yearly: ['10', '24', '49'] };

/** Prices a sighted or screen reader user currently gets. */
function shownPrices() {
  const styles = new Styles(doc, sheets), ctx = { width: 1280 };
  const parts = [];
  for (const el of all) if (visible(styles, el, ctx) || exposed(styles, el, ctx)) for (const c of el.children) if (c.type === 'text') parts.push(c.text);
  const t = parts.join(' ');
  const has = (p) => new RegExp(`\\$\\s*${p}(?![\\d.,])`).test(t);
  return { monthly: PRICES.monthly.filter(has).length, yearly: PRICES.yearly.filter(has).length };
}
function assertSelected(i, step) {
  const styles = new Styles(doc, sheets);
  tabs.forEach((t, j) => {
    assert.equal(attr(t, 'aria-selected') === 'true', i === j, `${step}: selection`);
    const ti = attr(t, 'tabindex');
    if (i === j) assert.ok(ti === null ? t.tag === 'button' || t.tag === 'a' : Number(ti) >= 0, `${step}: selected tab is in the tab order`);
    else assert.equal(ti?.trim(), '-1', `${step}: other tabs leave the tab order`);
  });
  const panel = panelOf(tabs[i]);
  assert.ok(visible(styles, panel, { width: 1280 }), `${step}: panel shown`);
  assert.ok((attr(panel, 'aria-labelledby') ?? '').split(/\s+/).includes(attr(tabs[i], 'id')) || attr(panel, 'aria-label'), `${step}: panel named by its tab`);
  for (const t of tabs) if (panelOf(t) !== panel) assert.ok(!visible(styles, panelOf(t), { width: 1280 }), `${step}: other panel hidden`);
  const shown = shownPrices(), want = isMonthly(tabs[i]) ? 'monthly' : 'yearly', other = want === 'monthly' ? 'yearly' : 'monthly';
  assert.equal(shown[want], 3, `${step}: prices for the period`);
  assert.equal(shown[other], 0, `${step}: no prices from the other period`);
}

test('tab markup', () => {
  assert.ok(tablist, 'tablist');
  assert.ok(accessibleName(doc, tablist), 'tablist name');
  assert.equal(tabs.length, 2, 'two tabs');
  assert.ok(tabs.some(isMonthly) && tabs.some((t) => /yearly/i.test(text(t))), 'monthly and yearly');
  for (const t of tabs) {
    assert.ok(t.tag === 'button' || has(t, 'tabindex'), 'tab is focusable');
    assert.ok(attr(t, 'id'), 'tab id');
    const p = panelOf(t);
    assert.ok(p && attr(p, 'role') === 'tabpanel', 'tab controls a panel');
  }
  const html = all.map((el) => el.children.filter((c) => c.type === 'text').map((c) => c.text).join(' ')).join(' ');
  for (const p of [...PRICES.monthly, ...PRICES.yearly]) assert.match(html, new RegExp(`\\$\\s*${p}(?![\\d.,])`), 'both periods are in the HTML');
});

test('keyboard and pointer', () => {
  assert.equal(tabs.length, 2);
  const dom = createDom(doc);
  try {
    dom.run(js);
  } catch (error) {
    if (error instanceof SyntaxError || error?.name === 'SyntaxError') throw error;
    if (!(error instanceof Unsupported) && !/is not a function|Cannot read prop|is not defined|is not a constructor/.test(String(error?.message))) throw error;
    // The script uses browser APIs this harness lacks: read it statically instead.
    const src = stripJsComments(js);
    for (const needle of [/keydown/, /ArrowRight|39/, /ArrowLeft|37/, /['"]Home['"]|36/, /['"]End['"]|35/, /aria-selected|ariaSelected/, /tabindex|tabIndex/, /\.focus\(/]) assert.match(src, needle);
    assertSelected(tabs.findIndex(isMonthly), 'on load');
    return;
  }
  assertSelected(tabs.findIndex(isMonthly), 'on load');
  const [first, second] = tabs.map(dom.wrap);
  const m = tabs.findIndex(isMonthly), y = 1 - m;
  const activate = (i, step) => { if (attr(tabs[i], 'aria-selected') !== 'true') dom.key(dom.active, 'Enter'); assertSelected(i, step); };
  const at = (i) => (i === 0 ? first : second);
  at(m).focus();
  dom.key(dom.active, m === 0 ? 'ArrowRight' : 'ArrowLeft');
  assert.equal(dom.active, at(y), 'arrow moves focus to the next tab');
  activate(y, 'arrow');
  dom.key(dom.active, y === 1 ? 'ArrowRight' : 'ArrowLeft');
  assert.equal(dom.active, at(m), 'arrow wraps around');
  activate(m, 'wrap');
  dom.key(dom.active, 'End');
  assert.equal(dom.active, second, 'End goes to the last tab');
  dom.key(dom.active, 'Home');
  assert.equal(dom.active, first, 'Home goes to the first tab');
  dom.key(dom.active, 'ArrowLeft');
  assert.equal(dom.active, second, 'ArrowLeft from the first tab wraps');
  dom.click(at(m));
  assertSelected(m, 'click');
  dom.click(at(y));
  assertSelected(y, 'click');
});
