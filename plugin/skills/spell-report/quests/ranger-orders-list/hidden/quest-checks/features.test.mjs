import test from 'node:test';
import assert from 'node:assert/strict';
import { asFunction, attr, attrItems, baseName, elements, ids, isId, lists, resolve, screen, stability, uiFiles, walk } from './orders.mjs';
import { depsOf } from './rn.mjs';

const found = lists();
const allIds = new Set(uiFiles.flatMap((f) => ids(f.root)));
const calls = (name) => uiFiles.some((f) => [...walk(f.root)].some((n) => isId(n, name) && n.parent.items?.[n.idx + 1]?.type === 'group'));

test('search, refresh and the order count still work', () => {
  assert.ok(screen.root.items.some((t, j, items) => isId(t, 'export') && isId(items[j + 1], 'default')), 'The screen no longer has a default export.');
  const inputs = uiFiles.flatMap((f) => elements(f.root)).filter((el) => baseName(el.name) === 'TextInput');
  assert.ok(inputs.some((el) => attr(el, 'onChangeText') && attr(el, 'value')), 'The search field is gone.');
  assert.ok(calls('matchesQuery') && calls('fetchOrders'), 'Search or loading no longer uses src/lib/orders.ts.');
  assert.ok(found.some(({ el }) => attr(el, 'onRefresh') || attr(el, 'refreshControl')), 'Pull to refresh is gone.');
  const count = uiFiles.flatMap((f) => elements(f.root)).some((el) => baseName(el.name) === 'Text' && [...walk(el)].some((n) => (n.type === 'text' || n.type === 'str' || n.type === 'tpl') && /\borders?\b/i.test(n.v)) && [...walk(el)].some((n) => isId(n, 'length') || isId(n)));
  assert.ok(count, 'The order count is gone.');
});

test('the search field keeps focus while typing', () => {
  const inputs = uiFiles.flatMap((f) => elements(f.root)).filter((el) => baseName(el.name) === 'TextInput');
  const searchNames = new Set(inputs.flatMap((el) => attrItems(attr(el, 'value')).filter((t) => isId(t)).slice(0, 1).map((t) => t.v)));
  for (const { file, el } of found) {
    for (const name of ['ListHeaderComponent', 'ListEmptyComponent', 'ListFooterComponent']) {
      const a = attr(el, name);
      if (!a || a.value?.type !== 'group') continue;
      const items = attrItems(a);
      assert.ok(!asFunction(items) || (isId(items[0]) && items.length === 2), `${name} is a new component on every render.`);
      if (items.length !== 1 || !isId(items[0])) continue;
      assert.notEqual(stability(file, a.value, items[0].v), 'unstable', `${name} is a new component on every render.`);
      const d = resolve(file, a.value, items[0].v);
      if (isId(d?.init?.[0], 'useCallback')) assert.ok(!(depsOf(d.init[1]) ?? []).some((dep) => searchNames.has(dep)), `${name} is a new component on every keystroke.`);
    }
  }
});
test('rows still show every order field and expand on tap', () => {
  for (const field of ['customerName', 'placedAt', 'itemCount', 'giftCount', 'note', 'totalCents', 'photoUrl']) assert.ok(allIds.has(field), `Rows no longer show ${field}.`);
  const pressables = uiFiles.flatMap((f) => elements(f.root)).filter((el) => /^(Pressable|Touchable\w*)$/.test(baseName(el.name)) && attr(el, 'onPress'));
  assert.ok(pressables.length > 0, 'Rows no longer respond to taps.');
});
