import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname } from 'node:path';
import { appDir, attr, attrItems, childName, childrenOf, elements, file, headerCount, kindOf, layoutOf, layouts, notFound, optionValue, pattern, routeFiles, routesFor, screens, withImports } from './router.mjs';

const required = ['/', '/recipes/:', '/saved', '/settings', '/new'];

test('every URL has one screen', () => {
  for (const p of required) assert.equal(routesFor(p).length, 1, p);
  for (const p of routeFiles) {
    assert.ok([...required, '/recipe/:'].includes(pattern(p)), 'Unexpected public URL');
    assert.match(file(p).src, /export\s+(?:default|\{[^}]*\bdefault\b)/);
  }
  assert.ok(notFound.length > 0);
});

test('recipe navigation stays inside its tab', () => {
  const home = routesFor('/')[0], detail = routesFor('/recipes/:')[0];
  assert.ok(home && detail);
  const stack = layoutOf(detail);
  assert.ok(stack && kindOf(stack) === 'stack');
  assert.equal(layoutOf(home), stack);
  const tabs = layoutOf(stack);
  assert.ok(tabs && ['tabs', 'native-tabs'].includes(kindOf(tabs)));
  for (const p of ['/saved', '/settings']) assert.ok(routesFor(p)[0]?.startsWith(dirname(tabs) + '/'));
  assert.ok(!routesFor('/new')[0]?.startsWith(dirname(tabs) + '/'));
});

test('new recipe opens over the tabs', () => {
  const route = routesFor('/new')[0];
  assert.ok(route);
  const layout = layoutOf(route);
  assert.ok(layout && kindOf(layout) === 'stack');
  const screen = screens(layout).find((s) => s.name === childName(layout, route));
  const nav = elements(file(layout).root).find((e) => e.name === 'Stack');
  const presentation = optionValue(attrItems(attr(screen?.el ?? { attrs: [] }, 'options')), 'presentation') ?? optionValue(attrItems(attr(nav ?? { attrs: [] }, 'screenOptions')), 'presentation');
  assert.ok(['modal', 'fullScreenModal', 'formSheet'].includes(presentation));
});

test('layouts refer to existing screens', () => {
  assert.ok(layouts.some((l) => dirname(l) === appDir));
  for (const l of layouts) for (const s of screens(l)) assert.ok(childrenOf(l).has(s.name), `${s.name} is not a child screen`);
});

test('each screen gets one header', () => {
  for (const p of required) {
    const route = routesFor(p)[0];
    assert.ok(route);
    assert.equal(headerCount(route), 1, p);
  }
});

test('details read the URL and show recipe content', () => {
  const route = routesFor('/recipes/:')[0];
  assert.ok(route);
  const source = withImports(route);
  assert.match(source, /useLocalSearchParams|useGlobalSearchParams/);
  assert.match(source, /findRecipe/);
  assert.match(source, /steps/);
  assert.match(source, /title/);
});

test('cold links retain their return destination', () => {
  const home = routesFor('/')[0], detail = routesFor('/recipes/:')[0], modal = routesFor('/new')[0];
  assert.ok(home && detail && modal);
  const detailLayout = layoutOf(detail), root = layoutOf(modal);
  for (const [layout, destination] of [[detailLayout, home], [root, home]]) {
    assert.ok(layout);
    const parsed = file(layout);
    const group = dirname(layout).split('/').at(-1)?.match(/^\(([^,)]+)\)$/)?.[1];
    const inferred = childrenOf(layout).has(group) ? group : undefined;
    const initial = optionValue(parsed.root.items, 'anchor') ?? optionValue(parsed.root.items, 'initialRouteName') ?? inferred;
    assert.equal(initial, childName(layout, destination));
  }
});
