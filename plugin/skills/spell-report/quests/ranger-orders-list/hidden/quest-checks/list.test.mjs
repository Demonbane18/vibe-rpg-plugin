import test from 'node:test';
import assert from 'node:assert/strict';
import { attr, attrFunction, attrItems, baseName, elements, ids, isId, isP, lists, splitArgs, uiFiles, walk } from './orders.mjs';

const found = lists();

test('large order lists mount only what is on screen', () => {
  assert.ok(found.length > 0, 'No list component found that takes the orders as data.');
  for (const { el } of found) {
    for (let n = el.parent; n; n = n.parent) {
      assert.ok(!(n.type === 'jsx' && /ScrollView$/.test(baseName(n.name))), 'The orders list sits inside a ScrollView.');
    }
  }
  for (const file of uiFiles) {
    for (const n of walk(file.root)) {
      if (!isP(n, '.') || !isId(n.parent.items[n.idx + 1], 'map')) continue;
      const call = n.parent.items[n.idx + 2];
      assert.ok(!(call?.type === 'group' && elements(call).length), 'Orders are still rendered by mapping over an array.');
    }
  }
});

test('rows keep their identity when orders are added at the top', () => {
  for (const { file, el } of found) {
    const keyAttr = attr(el, 'keyExtractor');
    assert.ok(keyAttr, 'The list has no stable key for its rows.');
    const { fn } = attrFunction(file, keyAttr);
    assert.ok(fn, 'The list key function could not be read.');
    const params = fn.params?.type === 'group' ? splitArgs(fn.params.items) : [];
    const second = params[1]?.find((t) => isId(t))?.v;
    const used = fn.body.flatMap((n) => ids(n));
    assert.ok(used.includes('id'), 'Row keys do not come from the order id.');
    assert.ok(!used.includes('index') && !(second && used.includes(second)), 'Row keys depend on the position in the list.');
    const render = attr(el, 'renderItem');
    if (render) {
      const r = attrFunction(file, render).fn;
      const names = r ? r.body.flatMap((n) => ids(n)) : [];
      assert.ok(!names.includes('index'), 'Rows depend on their position in the list.');
    }
  }
  for (const file of uiFiles) {
    for (const e of elements(file.root)) {
      const key = attr(e, 'key');
      if (key) assert.ok(!attrItems(key).some((n) => [...walk(n)].some((t) => isId(t) && ['index', 'idx', 'i'].includes(t.v))), 'A React key uses the position in the list.');
    }
  }
});
