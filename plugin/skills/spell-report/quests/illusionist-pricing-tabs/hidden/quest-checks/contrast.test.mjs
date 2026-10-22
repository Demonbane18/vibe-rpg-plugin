import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseHTML, collectCSS, Styles, elements, attr, contrastFailures } from './lib.mjs';
import { dir } from './pricing.mjs';

function load(showAllPanels) {
  const doc = parseHTML(readFileSync(`${dir}/index.html`, 'utf8'));
  if (showAllPanels) for (const el of elements(doc)) if (attr(el, 'role') === 'tabpanel' || attr(el, 'data-period') !== null) delete el.attrs.hidden;
  return { doc, styles: new Styles(doc, collectCSS(dir, doc)) };
}

for (const dark of [false, true]) {
  test(`text contrast, ${dark ? 'dark' : 'light'} theme`, () => {
    const found = [];
    for (const [width, all] of [[1280, false], [360, false], [1280, true]]) {
      const { doc, styles } = load(all);
      const r = contrastFailures(styles, doc, width, () => false, { dark });
      if (r.checked < 20) found.push(`only ${r.checked} text elements at ${width}px`);
      found.push(...r.failures);
    }
    assert.deepEqual([...new Set(found)], []);
  });
}
