import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { parseHTML, collectCSS, Styles, elements, attr, contrastFailures } from './lib.mjs';

const dir = fileURLToPath(new URL('..', import.meta.url));
const load = (unhide) => {
  const doc = parseHTML(readFileSync(new URL('../index.html', import.meta.url), 'utf8'));
  if (unhide) for (const el of elements(doc)) delete el.attrs.hidden;
  return { doc, styles: new Styles(doc, collectCSS(dir, doc)) };
};
const errorish = (el) => /error|alert|invalid/i.test(`${attr(el, 'id') ?? ''} ${attr(el, 'class') ?? ''}`) && !['input', 'select', 'textarea', 'form', 'fieldset'].includes(el.tag);

test('text contrast', () => {
  const found = [];
  for (const width of [1280, 320]) {
    const page = load(false);
    const r = contrastFailures(page.styles, page.doc, width);
    assert.ok(r.checked >= 20, 'page text present');
    found.push(...r.failures);
  }
  const failed = load(true);
  found.push(...contrastFailures(failed.styles, failed.doc, 1280, errorish).failures);
  assert.deepEqual([...new Set(found)], []);
});
