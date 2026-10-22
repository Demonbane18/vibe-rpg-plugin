import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, normalize } from 'node:path';
import { attr, text, parseCSS, splitTop } from './lib.mjs';
import { dir, all } from './pricing.mjs';

const sources = [];
for (const el of all) {
  if (el.tag === 'style') sources.push(text(el));
  const href = attr(el, 'href');
  if (el.tag === 'link' && /stylesheet/i.test(attr(el, 'rel') ?? '') && href && !/(tokens|base)\.css$/.test(href) && !/^(?:[a-z]+:)?\/\//i.test(href)) {
    const path = join(dir, normalize(href.split(/[?#]/)[0]));
    if (existsSync(path)) sources.push(readFileSync(path, 'utf8'));
  }
}
const SIDE = /^(margin|padding|border|scroll-margin|scroll-padding)-(left|right)(-.+)?$|^(left|right)$|^border-(top|bottom)-(left|right)-radius$/;
const mirror = (name) => name.replace(/left|right/, (s) => (s === 'left' ? 'right' : 'left'));
const FOUR = /^(margin|padding|inset|border-width|border-style|border-color|scroll-margin|scroll-padding)$/;

/**
 * Direction-dependent declarations in a rule: physical sides without a matching opposite side, left/right values.
 * `drawing` marks a rotated ::before/::after shape (a CSS checkmark or chevron), whose border sides draw the glyph.
 */
export function physical(decls, drawing = false) {
  const map = new Map(decls.map(([n, v]) => [n, v.trim()]));
  const out = [];
  for (const [name, value] of map) {
    if (drawing && name.startsWith('border')) continue;
    if (SIDE.test(name)) {
      const other = map.get(mirror(name));
      const centred = /^(left|right)$/.test(name) && value === '50%' && /translate/.test(map.get('transform') ?? map.get('translate') ?? '');
      if (other !== value && !centred) out.push(`${name}: ${value}`);
    } else if (/^(float|clear)$/.test(name) && /^(left|right)$/i.test(value)) out.push(`${name}: ${value}`);
    else if (name === 'text-align' && /^(left|right)$/i.test(value)) out.push(`${name}: ${value}`);
    else if (FOUR.test(name)) {
      const parts = splitTop(value, ' ');
      if (parts.length === 4 && parts[1] !== parts[3]) out.push(`${name}: ${value}`);
    } else if (name === 'border-radius') {
      const [h] = value.split('/'); const p = splitTop(h.trim(), ' ');
      if ((p.length === 2 && p[0] !== p[1]) || (p.length === 3 && p[0] !== p[1]) || (p.length === 4 && (p[0] !== p[1] || p[2] !== p[3]))) out.push(`${name}: ${value}`);
    }
  }
  return out;
}

test('layout mirrors for right-to-left', () => {
  assert.ok(sources.join('').trim().length > 200, 'page has styles');
  const bad = [];
  for (const css of sources) for (const rule of parseCSS(css)) {
    const drawing = rule.selectors.length > 0 && rule.selectors.every((s) => s.pseudoEl) && rule.decls.some(([n, v]) => n === 'rotate' || (n === 'transform' && /rotate/.test(v)));
    for (const p of physical(rule.decls, drawing)) bad.push(`${rule.selectors.map((s) => s.text).join(', ')} { ${p} }`);
  }
  for (const el of all) if (attr(el, 'style')) {
    const decls = attr(el, 'style').split(';').map((d) => { const k = d.indexOf(':'); return k > 0 ? [d.slice(0, k).trim().toLowerCase(), d.slice(k + 1).trim()] : null; }).filter(Boolean);
    bad.push(...physical(decls));
  }
  assert.deepEqual(bad, []);
});
