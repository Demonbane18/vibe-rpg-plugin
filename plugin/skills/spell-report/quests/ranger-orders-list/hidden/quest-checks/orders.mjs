// Loads the Orders screen and the local files it imports, plus lookups shared by the checks.
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { asFunction, attr, attrItems, baseName, declarations, elements, frames, ids, isId, isP, loadFile, resolveImport, splitArgs, walk } from './rn.mjs';

export const ws = fileURLToPath(new URL('..', import.meta.url));
export const screen = loadFile(join(ws, 'src/screens/OrdersScreen.tsx'));

function importsOf(file) {
  const out = [];
  for (const t of file.root.items) {
    if (!isId(t, 'import') && !isId(t, 'export')) continue;
    let k = t.idx + 1;
    while (k < file.root.items.length && !isId(file.root.items[k], 'from') && !isP(file.root.items[k], ';') && !(isId(file.root.items[k], 'import') || isId(file.root.items[k], 'export'))) k++;
    const spec = isId(file.root.items[k], 'from') ? file.root.items[k + 1] : null;
    if (spec?.type === 'str') { const path = resolveImport(file, spec.v); if (path) out.push(path); }
  }
  return out;
}

/** The screen and every source file it reaches through relative imports. */
export const files = (() => {
  const seen = new Map([[screen.path, screen]]);
  const queue = [screen];
  while (queue.length) {
    const file = queue.shift();
    for (const path of importsOf(file)) {
      if (seen.has(path) || !/\.(tsx?|jsx?)$/.test(path)) continue;
      const next = loadFile(path);
      seen.set(path, next);
      queue.push(next);
    }
  }
  return [...seen.values()];
})();
export const uiFiles = files.filter((f) => !/src\/lib\//.test(f.path.slice(ws.length)));

const ancestors = (node) => { const out = []; for (let n = node; n; n = n.parent) out.push(n); return out; };

/** The declaration of `name` visible from `node` in `file`, nearest scope first. */
export function resolve(file, node, name) {
  const chain = ancestors(node);
  const decls = declarations(file.root, name).filter((d) => chain.includes(d.scope));
  decls.sort((a, b) => chain.indexOf(a.scope) - chain.indexOf(b.scope));
  return decls[0] ? { ...decls[0], file } : null;
}

const STABLE_HOOKS = new Set(['useCallback', 'useMemo', 'useRef', 'useEvent', 'useEffectEvent', 'useStableCallback', 'useLatestCallback']);

/** 'stable' | 'unstable' | 'unknown' for an identifier used at `node`. */
export function stability(file, node, name) {
  const d = resolve(file, node, name);
  if (!d) return 'unknown';
  if (d.scope === file.root || d.kind === 'import' || d.kind === 'default-import') return 'stable';
  if (d.kind === 'function' || d.kind === 'class') return 'unstable';
  const first = d.init[0];
  if (d.kind === 'destructure') {
    if (isId(first) && ['useState', 'useReducer'].includes(first.v)) return d.position === 1 ? 'stable' : 'unknown';
    return 'unknown';
  }
  if (isId(first) && STABLE_HOOKS.has(first.v)) return 'stable';
  if (isId(first, 'React') && isP(d.init[1], '.') && STABLE_HOOKS.has(d.init[2]?.v)) return 'stable';
  if (asFunction(d.init) || (d.init.length === 1 && d.init[0].type === 'group' && ['{', '['].includes(d.init[0].open))) return 'unstable';
  return 'unknown';
}

/** Problem description if a JSX attribute value makes a new function or object on each render, else null. */
export function freshValue(file, a) {
  const items = attrItems(a);
  if (!items.length || a.value.type !== 'group') return null;
  if (asFunction(items) && !(isId(items[0]) && items.length === 2)) return `${a.name} gets a new function on every render`;
  if (items.length === 1 && items[0].type === 'group' && items[0].open === '{') return `${a.name} gets a new object on every render`;
  if (items.length === 1 && items[0].type === 'group' && items[0].open === '[') return `${a.name} gets a new array on every render`;
  if (items.some((t, i) => isP(t, '.') && isId(items[i + 1], 'bind'))) return `${a.name} gets a new bound function on every render`;
  if (items.length === 1 && isId(items[0]) && stability(file, a.value, items[0].v) === 'unstable') return `${a.name} is recreated on every render`;
  return null;
}

export const LIST = new Set(['FlatList', 'FlashList', 'LegendList', 'SectionList', 'AnimatedFlashList', 'AnimatedFlatList', 'AnimatedLegendList']);

export function lists() {
  const out = [];
  for (const file of uiFiles) for (const el of elements(file.root)) {
    if (LIST.has(baseName(el.name)) && (attr(el, 'data') || attr(el, 'sections'))) out.push({ file, el });
  }
  return out;
}

/** Resolves an attribute (inline or by name) to { fn, decl, inline } with fn = { params, body }. */
export function attrFunction(file, a) {
  const items = attrItems(a);
  if (items.length === 1 && isId(items[0])) {
    const d = resolve(file, a.value, items[0].v);
    if (!d) return { fn: null, decl: null, inline: false };
    const fn = d.kind === 'function' ? { params: d.params, body: [d.body] } : asFunction(d.init);
    return { fn, decl: d, inline: false };
  }
  return { fn: asFunction(items), decl: null, inline: true };
}

const NATIVE = new Set(['View', 'Text', 'Pressable', 'TouchableOpacity', 'TouchableHighlight', 'Image', 'ScrollView', 'Fragment', '']);

/** Custom component elements rendered by a function body. */
export function customElements(fn) {
  return fn.body.flatMap((n) => elements(n)).filter((el) => /^[A-Z]/.test(baseName(el.name)) && !NATIVE.has(baseName(el.name)));
}

const isMemoCall = (items) => isId(items[0], 'memo') || (isId(items[0], 'React') && isP(items[1], '.') && isId(items[2], 'memo'));

function memoInFile(file, name, isDefault) {
  if (isDefault) {
    const items = file.root.items;
    for (let j = 0; j < items.length; j++) {
      if (isId(items[j], 'export') && isId(items[j + 1], 'default')) {
        const rest = items.slice(j + 2);
        if (isMemoCall(rest)) return true;
        if (isId(rest[0]) && !isId(rest[0], 'function')) return memoInFile(file, rest[0].v, false);
        return false;
      }
    }
    return false;
  }
  for (const d of declarations(file.root, name)) {
    if (d.kind === 'const' && isMemoCall(d.init)) return true;
    if (d.kind === 'class' && d.init.some((t) => isId(t, 'PureComponent'))) return true;
    if (d.kind === 'import' || d.kind === 'default-import') {
      const path = resolveImport(file, d.from);
      if (!path) return false;
      const other = files.find((f) => f.path === path) ?? loadFile(path);
      return d.kind === 'default-import' ? memoInFile(other, null, true) : memoInFile(other, d.imported, false);
    }
  }
  return false;
}

export const isMemoized = (file, name) => memoInFile(file, baseName(name), false);

/** The function and file of a component by name, following imports. */
export function componentFunction(file, name) {
  for (const d of declarations(file.root, name)) {
    if (d.kind === 'function') return { file, fn: { params: d.params, body: [d.body] } };
    if (d.kind === 'const') { const fn = asFunction(d.init); if (fn) return { file, fn }; }
    if (d.kind === 'import' || d.kind === 'default-import') {
      const path = resolveImport(file, d.from);
      if (!path) return null;
      const other = files.find((f) => f.path === path) ?? loadFile(path);
      if (d.kind === 'import') return componentFunction(other, d.imported);
      const items = other.root.items;
      for (let j = 0; j < items.length; j++) {
        if (isId(items[j], 'export') && isId(items[j + 1], 'default')) {
          const rest = items.slice(j + 2);
          const fn = asFunction(rest.filter((t) => !isP(t, ';')));
          if (fn) return { file: other, fn };
          if (isId(rest[0])) return componentFunction(other, rest[0].v);
        }
      }
    }
  }
  return null;
}

export { asFunction, attr, attrItems, baseName, elements, frames, ids, isId, isP, splitArgs, walk };
