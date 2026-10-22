import test from 'node:test';
import assert from 'node:assert/strict';
import { attr, attrFunction, baseName, customElements, elements, freshValue, isMemoized, lists, stability } from './orders.mjs';

const found = lists();

test('the list renders rows through one stable function', () => {
  assert.ok(found.length > 0, 'No list component found that takes the orders as data.');
  for (const { file, el } of found) {
    const render = attr(el, 'renderItem');
    assert.ok(render, 'The list has no row renderer.');
    const { fn, decl, inline } = attrFunction(file, render);
    assert.ok(fn, 'The row renderer could not be read.');
    assert.ok(!inline, 'The row renderer is recreated on every render of the screen.');
    assert.ok(decl && stability(file, render.value, render.value.items[0].v) === 'stable', 'The row renderer is recreated on every render of the screen.');
  }
});

test('a tap or keystroke re-renders only rows whose data changed', () => {
  for (const { file, el } of found) {
    const { fn } = attrFunction(file, attr(el, 'renderItem'));
    if (!fn) continue;
    const rows = customElements(fn);
    assert.ok(rows.length > 0, 'Rows are not rendered by a row component.');
    for (const row of rows) assert.ok(isMemoized(file, row.name), `${baseName(row.name)} re-renders whenever the list does.`);
    for (const e of fn.body.flatMap((n) => elements(n))) {
      for (const a of e.attrs) {
        if (a.name === 'key' || a.name === '...') continue;
        const problem = freshValue(file, a);
        assert.equal(problem, null, `In the row renderer, ${problem}.`);
      }
    }
  }
});
