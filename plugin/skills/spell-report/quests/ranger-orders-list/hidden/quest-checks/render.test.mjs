import test from 'node:test';
import assert from 'node:assert/strict';
import { attr, attrItems, baseName, elements, isId, isP, uiFiles, walk } from './orders.mjs';
import { depsOf, frames, isComponentFrame } from './rn.mjs';

const MEMO_HOOKS = new Set(['useMemo', 'useState', 'useRef']);

test('rows reuse their formatters', () => {
  for (const file of uiFiles) {
    for (const n of walk(file.root)) {
      if (!isId(n, 'new') || !isId(n.parent.items[n.idx + 1], 'Intl')) continue;
      const chain = frames(n);
      const inner = chain[chain.length - 1];
      const component = chain.some(isComponentFrame);
      const cachedHelper = !component && /\b(?:get|has)\s*\(/.test(file.src) && /\bset\s*\(/.test(file.src);
      assert.ok(!inner || MEMO_HOOKS.has(inner.via) || cachedHelper, 'A formatter is built on every render.');
    }
  }
});

test('typing a search does not reorder every order', () => {
  const searchNames = new Set();
  for (const file of uiFiles) {
    for (const el of elements(file.root)) {
      if (baseName(el.name) !== 'TextInput') continue;
      const first = attrItems(attr(el, 'value')).find((t) => isId(t));
      if (first) searchNames.add(first.v);
    }
    for (const n of walk(file.root)) {
      if (isId(n) && /^use(Deferred|Debounced?)/.test(n.v) && isP(n.parent.items[n.idx - 1], '=')) {
        const target = n.parent.items[n.idx - 2];
        if (isId(target)) searchNames.add(target.v);
      }
    }
  }
  for (const file of uiFiles) {
    for (const n of walk(file.root)) {
      if (!isId(n) || n.parent.type !== 'group') continue;
      const call = n.parent.items[n.idx + 1];
      const isSort = call?.type === 'group' && call.open === '(' && (n.v === 'sortByNewest' || (['sort', 'toSorted'].includes(n.v) && isP(n.parent.items[n.idx - 1], '.')));
      if (!isSort) continue;
      const chain = frames(n);
      const inner = chain[chain.length - 1];
      if (!inner) continue;
      assert.ok(!isComponentFrame(inner), 'Orders are sorted on every render.');
      if (inner.via === 'useMemo') {
        const deps = depsOf(inner.call);
        assert.ok(deps && !deps.some((d) => searchNames.has(d)), 'Orders are sorted again on every keystroke.');
      }
    }
  }
});
