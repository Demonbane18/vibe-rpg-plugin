import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, normalize } from 'node:path';
import { elements, attr, text, parseCSS } from './lib.mjs';
import { dir, all } from './pricing.mjs';

const tokens = new Set([...readFileSync(join(dir, 'tokens.css'), 'utf8').matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
const sources = [];
for (const el of all) {
  if (el.tag === 'style') sources.push(text(el));
  const href = attr(el, 'href');
  if (el.tag === 'link' && /stylesheet/i.test(attr(el, 'rel') ?? '') && href && !/(tokens|base)\.css$/.test(href) && !/^(?:[a-z]+:)?\/\//i.test(href)) {
    const path = join(dir, normalize(href.split(/[?#]/)[0]));
    if (existsSync(path)) sources.push(readFileSync(path, 'utf8'));
  }
}
const NAMED = /(^|[\s,(])(white|black|red|green|blue|gray|grey|silver|orange|yellow|navy|purple|teal|pink|maroon|olive|lime|aqua|fuchsia|gold|crimson|tomato|coral|indigo|violet|whitesmoke|ghostwhite|snow|ivory|beige|tan|brown)(?=$|[\s,)])/i;
const RAW = /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(/i;
const COLORISH = /color|background|border|outline|shadow|fill|stroke|decoration|caret|column-rule|^--/i;
const stripVars = (v) => { let out = v, prev; do { prev = out; out = out.replace(/var\([^()]*(\([^()]*\)[^()]*)*\)/g, 'var'); } while (out !== prev); return out.replace(/"[^"]*"|'[^']*'/g, ''); };

function check(name, value) {
  if (/^(font|font-family|content|quotes|grid-template-areas|animation|animation-name|transition|transition-property|will-change)$/i.test(name)) return;
  const v = stripVars(value);
  assert.doesNotMatch(v, RAW, 'colours come from tokens');
  if (COLORISH.test(name)) assert.doesNotMatch(v, NAMED, 'colours come from tokens');
}

test('colours come from tokens', () => {
  assert.ok(sources.join('').trim().length > 200, 'page has styles');
  const linked = all.filter((el) => el.tag === 'link' && /stylesheet/i.test(attr(el, 'rel') ?? '')).map((el) => attr(el, 'href') ?? '');
  assert.ok(linked.some((h) => /(^|\/)tokens\.css$/.test(h)) && linked.some((h) => /(^|\/)base\.css$/.test(h)), 'shared stylesheets are loaded');
  for (const css of sources) for (const rule of parseCSS(css)) for (const [name, value] of rule.decls) {
    assert.ok(!tokens.has(name), 'tokens are not redefined');
    check(name, value);
  }
  for (const el of all) {
    if (attr(el, 'style')) for (const decl of attr(el, 'style').split(';')) { const k = decl.indexOf(':'); if (k > 0) check(decl.slice(0, k).trim(), decl.slice(k + 1)); }
    for (const a of ['fill', 'stroke', 'color', 'bgcolor', 'stop-color']) if (attr(el, a)) assert.doesNotMatch(attr(el, a), RAW, 'colours come from tokens');
  }
});
