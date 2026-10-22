import test from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { hrefs, land, nativeIntent, notFound, read, reachable, routesFor, sources, withImports, ws } from './router.mjs';

test('the app boots into file based navigation', () => {
  assert.equal(JSON.parse(read(join(ws, 'package.json'))).main, 'expo-router/entry');
  const config = JSON.parse(read(join(ws, 'app.json'))).expo;
  assert.ok(config.scheme === 'pantry' || config.scheme?.includes('pantry'));
  assert.ok(config.plugins?.some((p) => p === 'expo-router' || p[0] === 'expo-router'));
  for (const path of sources) assert.doesNotMatch(read(path), /\bcreate(?:NativeStack|BottomTab|Stack)Navigator\b|\bNavigationContainer\b|\bnavigation\s*\.\s*navigate\s*\(/);
});

test('navigation targets resolve to real screens', () => {
  const links = hrefs();
  assert.ok(links.length >= 3);
  for (const link of links) assert.ok(link.href === null || land(link.href), `No route for ${link.href}`);
  assert.ok(links.some((l) => land(l.href) === '/new'));
  for (const route of ['/', '/saved']) {
    const entry = routesFor(route)[0];
    assert.ok(entry);
    const owned = reachable(entry);
    assert.ok(links.some((l) => owned.has(l.path) && land(l.href) === '/recipes/:'));
  }
  assert.ok(notFound.some((entry) => {
    const owned = reachable(entry);
    return links.some((l) => owned.has(l.path) && land(l.href) === '/');
  }));
});

test('old recipe links reach their new address', () => {
  const old = routesFor('/recipe/:')[0];
  const source = old ? withImports(old) : nativeIntent ? read(nativeIntent) : '';
  assert.match(source, /Redirect|replace|redirectSystemPath/);
  assert.match(source, /\/recipes\//);
  assert.match(source, /useLocalSearchParams|useGlobalSearchParams|path/);
});

test('the modal still has its form and closes', () => {
  const route = routesFor('/new')[0];
  assert.ok(route);
  const source = withImports(route);
  assert.match(source, /TextInput/);
  assert.match(source, /Cancel/i);
  assert.match(source, /\.\s*(?:back|dismiss|goBack)\s*\(|dismissTo\s*\(/);
});
