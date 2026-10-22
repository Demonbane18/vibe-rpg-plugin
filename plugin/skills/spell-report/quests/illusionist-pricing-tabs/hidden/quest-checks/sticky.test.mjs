import test from 'node:test';
import assert from 'node:assert/strict';
import { elements, attr, has, ancestors, visible, stickyTop, blockHeight, targetSize, scripts, stripJsComments } from './lib.mjs';
import { page, all, dir } from './pricing.mjs';

const { doc, styles } = page;
const banner = all.find((el) => attr(el, 'role') === 'banner') ?? all.find((el) => el.tag === 'header' && !ancestors(el).some((a) => ['article', 'aside', 'main', 'nav', 'section'].includes(a.tag)));
const html = all.find((el) => el.tag === 'html');
const js = stripJsComments(scripts(dir, doc));

test('header stays at the top', () => {
  assert.ok(banner, 'site header');
  assert.ok(stickyTop(styles, banner, { width: 1280 }), 'pinned while scrolling');
});

test('focus is never hidden under the header', () => {
  if (/focusin/.test(js) && /scroll(By|To|IntoView)|scrollTop/.test(js)) return; // handled in script
  const bad = [];
  for (const width of [1280, 360]) {
    const pin = banner && stickyTop(styles, banner, { width });
    if (!pin) continue;
    const need = blockHeight(styles, pin, { width }) - 4;
    const pad = styles.px(html, { width }, 'scroll-padding-top', 800) ?? 0;
    for (const el of all) {
      if (!((el.tag === 'a' && has(el, 'href')) || el.tag === 'button' || attr(el, 'role') === 'tab' || (has(el, 'tabindex') && Number(attr(el, 'tabindex')) >= 0))) continue;
      if (el === pin || ancestors(el).includes(pin) || !visible(styles, el, { width })) continue;
      const margin = styles.px(el, { width, focus: el }, 'scroll-margin-top', 0) ?? 0;
      // WCAG 2.2 AA (2.4.11): the focused control must not be entirely hidden behind the pinned header
      const h = Math.min(targetSize(styles, el, { width }).h, blockHeight(styles, el, { width }) || Infinity);
      if (pad + margin + h <= need) bad.push(`${el.tag}${el.attrs.id ? `#${el.attrs.id}` : ''} at ${width}px: ${Math.round(pad + margin)} of ${Math.round(need)}px`);
    }
  }
  assert.deepEqual([...new Set(bad)].slice(0, 5), []);
});
