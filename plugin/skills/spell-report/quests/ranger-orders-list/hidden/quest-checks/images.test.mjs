import test from 'node:test';
import assert from 'node:assert/strict';
import { attr, attrItems, elements, ids, isId, isP, resolve, splitArgs, uiFiles, walk } from './orders.mjs';
import { declarations } from './rn.mjs';

/** Local names that refer to Image from react-native or expo-image. */
function imageNames(file) {
  const names = new Set();
  const items = file.root.items;
  for (let j = 0; j < items.length; j++) {
    if (!isId(items[j], 'import')) continue;
    let k = j + 1;
    while (k < items.length && !isId(items[k], 'from')) k++;
    if (!['react-native', 'expo-image'].includes(items[k + 1]?.v)) continue;
    for (const part of items.slice(j + 1, k)) {
      if (part.type !== 'group') continue;
      for (const spec of splitArgs(part.items)) if (isId(spec[0], 'Image')) names.add(spec[spec.length - 1].v);
    }
  }
  return names;
}

const objectKeys = (group) => splitArgs(group.items).map((p) => (isId(p[0]) || p[0]?.type === 'str' ? p[0].v : null)).filter(Boolean);

function styleObjects(file, node, items) {
  const out = [];
  for (let j = 0; j < items.length; j++) {
    const t = items[j];
    if (t.type === 'group' && t.open === '{') out.push({ keys: objectKeys(t), group: t });
    else if (t.type === 'group' && t.open === '[') out.push(...styleObjects(file, node, t.items));
    else if (isId(t) && isP(items[j + 1], '.') && isId(items[j + 2]) && !isP(items[j - 1], '.')) {
      const d = resolve(file, node, t.v) ?? declarations(file.root, t.v)[0];
      const create = d?.init?.find((x) => x.type === 'group' && x.open === '(');
      const obj = create?.items.find((x) => x.type === 'group' && x.open === '{');
      if (!obj) continue;
      const entry = splitArgs(obj.items).find((p) => (isId(p[0]) || p[0]?.type === 'str') && p[0].v === items[j + 2].v && isP(p[1], ':'));
      const value = entry?.[2];
      if (value?.type === 'group' && value.open === '{') out.push({ keys: objectKeys(value), group: value });
    }
  }
  return out;
}

function numberOf(file, items) {
  if (items.length === 1 && items[0].type === 'num') return Number(items[0].v);
  if (items.length === 1 && isId(items[0])) {
    const d = declarations(file.root, items[0].v).find((x) => x.scope === file.root);
    return d ? numberOf(file, d.init) : null;
  }
  if (items.length === 3 && isP(items[1], '*')) {
    const a = numberOf(file, [items[0]]), b = numberOf(file, [items[2]]);
    return a != null && b != null ? a * b : null;
  }
  return null;
}

const images = uiFiles.flatMap((file) => { const names = imageNames(file); return elements(file.root).filter((el) => names.has(el.name)).map((el) => ({ file, el })); });

function size(file, el) {
  const w = attr(el, 'width'), h = attr(el, 'height');
  if (w && h) return { width: numberOf(file, attrItems(w)) };
  const objects = styleObjects(file, el, attrItems(attr(el, 'style')));
  const keys = new Set(objects.flatMap((o) => o.keys));
  if (!(keys.has('width') && keys.has('height')) && !((keys.has('width') || keys.has('height')) && keys.has('aspectRatio'))) return null;
  for (const o of objects) {
    const entry = splitArgs(o.group.items).find((p) => isId(p[0], 'width') && isP(p[1], ':'));
    if (entry) return { width: numberOf(file, entry.slice(2)) };
  }
  return { width: null };
}

function cdnCalls(file, node, items, depth = 0) {
  const calls = [];
  for (const t of items) for (const n of walk(t)) {
    if (isId(n, 'cdnImage') && n.parent.items[n.idx + 1]?.type === 'group') calls.push(n.parent.items[n.idx + 1]);
    else if (isId(n) && depth < 3 && !isP(n.parent.items?.[n.idx - 1], '.')) {
      const d = resolve(file, node, n.v);
      if (d?.init?.length) calls.push(...cdnCalls(file, node, d.init, depth + 1));
    }
  }
  return calls;
}

test('thumbnails hold their size while loading', () => {
  assert.ok(images.length > 0, 'Rows show no thumbnail.');
  for (const { file, el } of images) assert.ok(size(file, el), 'A thumbnail has no fixed size.');
});

test('thumbnails download a copy sized for the screen', () => {
  const anyCdn = uiFiles.some((file) => [...walk(file.root)].some((n) => isId(n, 'cdnImage') && n.parent.items[n.idx + 1]?.type === 'group' && ids(n.parent.items[n.idx + 1]).includes('photoUrl')));
  for (const { file, el } of images) {
    const source = attrItems(attr(el, 'source') ?? attr(el, 'src'));
    assert.ok(source.length, 'A thumbnail has no source.');
    const calls = cdnCalls(file, el, source);
    const raw = source.flatMap((t) => [...walk(t)]).some((n) => isId(n, 'photoUrl'));
    assert.ok(calls.length || (!raw && anyCdn), 'A thumbnail downloads the original photo.');
    const width = size(file, el)?.width;
    for (const call of calls) {
      const px = numberOf(file, splitArgs(call.items)[1] ?? []);
      if (px != null && width != null) assert.ok(px >= 2 * width && px <= 3 * width, 'A thumbnail is requested at the wrong size.');
    }
  }
});
