// Reads the Expo Router app/ tree: routes, layouts, headers and links.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { attr, attrItems, baseName, elements, ids, isId, isP, loadFile, parse, resolveImport as relativeImport, splitArgs, walk } from './rn.mjs';

export const ws = fileURLToPath(new URL('..', import.meta.url));
const SOURCE = /\.(tsx|ts|jsx|js)$/;

function list(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    if (name === 'node_modules' || name.startsWith('.')) return [];
    const path = join(dir, name);
    return statSync(path).isDirectory() ? list(path) : [path];
  });
}

export const appDir = [join(ws, 'app'), join(ws, 'src/app')].find((d) => existsSync(d) && statSync(d).isDirectory()) ?? join(ws, 'app');
export const sources = list(ws).filter((p) => SOURCE.test(p) && !p.endsWith('.d.ts') && !p.includes('quest-checks'));
export const read = (path) => readFileSync(path, 'utf8');
const parsed = new Map();
export const file = (path) => { if (!parsed.has(path)) parsed.set(path, loadFile(path)); return parsed.get(path); };

const rel = (path) => relative(appDir, path).split('\\').join('/');
const stem = (path) => rel(path).replace(SOURCE, '');
const isGroup = (seg) => /^\(.*\)$/.test(seg);
const appFiles = list(appDir).filter((p) => SOURCE.test(p) && !p.endsWith('.d.ts'));
const SPECIAL = /(^|\/)(\+html|\+native-intent|\+middleware)$/;

export const layouts = appFiles.filter((p) => /(^|\/)_layout$/.test(stem(p)));
export const notFound = appFiles.filter((p) => /(^|\/)\+not-found$/.test(stem(p)));
export const nativeIntent = appFiles.find((p) => stem(p) === '+native-intent');
export const routeFiles = appFiles.filter((p) => !layouts.includes(p) && !notFound.includes(p) && !SPECIAL.test(stem(p)) && !/\+api$/.test(stem(p)));

/** URL pattern for a route file: groups dropped, index dropped, [x] -> ':'. */
export function pattern(path) {
  const segs = stem(path).split('/').filter((s) => !isGroup(s));
  if (segs[segs.length - 1] === 'index') segs.pop();
  return '/' + segs.map((s) => (/^\[\.\.\..+\]$/.test(s) ? '*' : /^\[.+\]$/.test(s) ? ':' : s)).join('/');
}
export const paramName = (path) => stem(path).split('/').map((s) => /^\[(?:\.\.\.)?(.+)\]$/.exec(s)?.[1]).filter(Boolean).pop();
export const routesFor = (p) => routeFiles.filter((f) => pattern(f) === p);

/** The layout file governing a route file (nearest _layout in its folder or above), or null. */
export function layoutOf(path) {
  for (let dir = dirname(path); ; dir = dirname(dir)) {
    const found = layouts.find((l) => dirname(l) === dir);
    if (found && found !== path) return found;
    if (dir === appDir || !dir.startsWith(appDir)) return null;
  }
}
const parentLayout = (layout) => layoutOf(layout);

/** Screen name of `path` (a route file or a nested layout) as a child of `layout`. */
export function childName(layout, path) {
  const base = dirname(layout);
  const parts = relative(base, path).split('\\').join('/').replace(SOURCE, '').split('/');
  if (parts[parts.length - 1] === '_layout') parts.pop();
  for (let k = 1; k < parts.length; k++) {
    if (layouts.some((l) => dirname(l) === join(base, ...parts.slice(0, k)))) return parts.slice(0, k).join('/');
  }
  return parts.join('/');
}

/** Children names a layout can reference. */
export function childrenOf(layout) {
  const names = new Set();
  for (const f of [...routeFiles, ...notFound, ...layouts]) {
    if (f === layout || !f.startsWith(dirname(layout) + '/')) continue;
    const owner = f.endsWith(`_layout${f.slice(f.lastIndexOf('.'))}`) ? parentLayout(f) : layoutOf(f);
    if (owner === layout) names.add(childName(layout, f));
  }
  return names;
}

const NAV = /^(Stack|Tabs|NativeTabs|Drawer|Slot|JsStack)$/;
/** 'tabs' | 'native-tabs' | 'stack' | 'slot' | null */
export function kindOf(layout) {
  const names = elements(file(layout).root).map((el) => el.name);
  if (names.includes('NativeTabs')) return 'native-tabs';
  if (names.some((n) => n === 'Tabs' || /Tabs$/.test(n) && !n.includes('.'))) return 'tabs';
  if (names.some((n) => n === 'Stack' || n === 'JsStack' || /Stack$/.test(n) && !n.includes('.'))) return 'stack';
  if (names.includes('Slot')) return 'slot';
  return null;
}

/** Screen elements (Stack.Screen, Tabs.Screen, NativeTabs.Trigger) in a layout with their name. */
export function screens(layout) {
  return elements(file(layout).root).filter((el) => /\.(Screen|Trigger)$/.test(el.name) && attr(el, 'name')).map((el) => ({ el, name: literal(attrItems(attr(el, 'name'))) }));
}

const literal = (items) => (items.length === 1 && (items[0].type === 'str' || (items[0].type === 'tpl' && !items[0].parts.length)) ? items[0].v : null);

/** Value of `key` in any object inside `items`: 'true' | 'false' | string | 'unknown' | undefined. */
export function optionValue(items, key) {
  for (const it of items) for (const n of walk(it)) {
    if (!isId(n, key) || n.parent?.type !== 'group' || !isP(n.parent.items[n.idx + 1], ':')) continue;
    const v = n.parent.items[n.idx + 2];
    if (isId(v, 'true') || isId(v, 'false')) return v.v;
    if (v?.type === 'str') return v.v;
    return 'unknown';
  }
  return undefined;
}

/** Whether the navigator in `layout` shows a header for child `name`. */
export function showsHeader(layout, name) {
  const kind = kindOf(layout);
  if (kind !== 'stack' && kind !== 'tabs') return false;
  const own = screens(layout).find((s) => s.name === name);
  const per = own ? optionValue(attrItems(attr(own.el, 'options')), 'headerShown') : undefined;
  if (per === 'true' || per === 'false') return per === 'true';
  const nav = elements(file(layout).root).find((el) => (kind === 'stack' ? /^(Stack|JsStack)$|Stack$/ : /Tabs$/).test(el.name) && !el.name.includes('.'));
  const global = nav ? optionValue(attrItems(attr(nav, 'screenOptions')), 'headerShown') : undefined;
  return global !== 'false';
}

/** Navigator headers stacked above a route file. */
export function headerCount(path) {
  let count = 0, child = path;
  const selfHides = /headerShown\s*:\s*false/.test(read(path));
  for (let layout = layoutOf(path), first = true; layout; child = layout, layout = parentLayout(layout), first = false) {
    const shows = showsHeader(layout, childName(layout, child));
    if (shows && !(first && selfHides)) count++;
  }
  return count;
}

/** Resolve local TS path aliases without installing TypeScript. Tokenization also accepts JSONC. */
function resolveImport(source, spec) {
  if (spec.startsWith('.')) return relativeImport(source, spec);
  const configPath = join(ws, 'tsconfig.json');
  if (!existsSync(configPath)) return null;
  const config = parse(read(configPath)).items.find((n) => n.type === 'group' && n.open === '{');
  const property = (obj, key) => obj && splitArgs(obj.items).find((p) => p[0]?.v === key && isP(p[1], ':'))?.[2];
  const options = property(config, 'compilerOptions');
  const paths = property(options, 'paths');
  const baseUrl = property(options, 'baseUrl')?.v ?? '.';
  for (const mapping of paths ? splitArgs(paths.items) : []) {
    const pattern = mapping[0]?.v;
    if (typeof pattern !== 'string' || mapping[2]?.type !== 'group') continue;
    const star = pattern.indexOf('*');
    const before = star < 0 ? pattern : pattern.slice(0, star);
    const after = star < 0 ? '' : pattern.slice(star + 1);
    if (star < 0 ? spec !== pattern : !spec.startsWith(before) || !spec.endsWith(after)) continue;
    const captured = star < 0 ? '' : spec.slice(before.length, after ? -after.length : undefined);
    for (const target of mapping[2].items.filter((n) => n.type === 'str')) {
      const absolute = join(ws, baseUrl, target.v.replace('*', captured));
      if (!absolute.startsWith(ws)) continue;
      const found = relativeImport(source, './' + relative(dirname(source.path), absolute));
      if (found) return found;
    }
  }
  if (property(options, 'baseUrl')) {
    return relativeImport(source, './' + relative(dirname(source.path), join(ws, baseUrl, spec)));
  }
  return null;
}

/** Route ownership follows local imports and re-exports, with cycle protection. */
export function reachable(path, seen = new Set()) {
  if (seen.has(path)) return seen;
  seen.add(path);
  const f = file(path);
  for (const n of walk(f.root)) {
    if (n.type !== 'str') continue;
    const prev = n.parent?.items?.[n.idx - 1];
    if (!isId(prev, 'from') && !isId(prev, 'import')) continue;
    const target = resolveImport(f, n.v);
    if (target && SOURCE.test(target)) reachable(target, seen);
  }
  return seen;
}

export function withImports(path) {
  return [...reachable(path)].map(read).join('\n');
}

const ROUTER_METHODS = new Set(['push', 'replace', 'navigate', 'dismissTo', 'prefetch']);

/** Every href-like target in the app's sources: { path, href } with href a string or null when unreadable. */
export function hrefs() {
  const out = [];
  for (const path of sources) {
    if (nativeIntent === path) continue;
    const f = file(path);
    const routers = new Set(['router']);
    for (const n of walk(f.root)) {
      if (isId(n, 'useRouter') && isP(n.parent.items[n.idx - 1], '=') && isId(n.parent.items[n.idx - 2])) routers.add(n.parent.items[n.idx - 2].v);
    }
    for (const el of elements(f.root)) {
      const a = attr(el, 'href');
      if (a && /^(Link|Redirect)$|\.Trigger$|Link$/.test(baseName(el.name))) out.push({ path, href: hrefValue(attrItems(a)) });
    }
    for (const n of walk(f.root)) {
      if (!isId(n) || !ROUTER_METHODS.has(n.v) || !isP(n.parent.items[n.idx - 1], '.') || !routers.has(n.parent.items[n.idx - 2]?.v)) continue;
      const call = n.parent.items[n.idx + 1];
      if (call?.type !== 'group' || call.open !== '(') continue;
      out.push({ path, href: hrefValue(splitArgs(call.items)[0] ?? []) });
    }
  }
  return out;
}

function hrefValue(items) {
  const t = items[0];
  if (items.length === 1 && t.type === 'str') return t.v;
  if (items.length === 1 && t.type === 'tpl') return t.v.replace(/\$\{\}/g, 'x');
  if (items.length === 1 && t.type === 'group' && t.open === '{') {
    const entry = splitArgs(t.items).find((p) => isId(p[0], 'pathname') && isP(p[1], ':'));
    return entry ? hrefValue(entry.slice(2)) : null;
  }
  if (items.length === 1 && t.type === 'jsx') return null;
  return null;
}

/** Route pattern an href lands on, or null. */
export function land(href) {
  if (typeof href !== 'string' || !href.startsWith('/')) return null;
  const segs = href.replace(/[?#].*$/, '').split('/').filter((s) => s && !isGroup(s));
  const candidates = [...new Set(routeFiles.map(pattern))];
  for (const p of candidates) {
    const ps = p.split('/').filter(Boolean);
    if (ps.length !== segs.length) continue;
    if (ps.every((s, k) => (s === ':' ? !isGroup(segs[k]) : s === segs[k] || (s === 'index' && segs[k] === 'index')))) return p;
  }
  if (segs.length === 0 && candidates.includes('/')) return '/';
  return null;
}

export { attr, attrItems, elements, ids, isId };
