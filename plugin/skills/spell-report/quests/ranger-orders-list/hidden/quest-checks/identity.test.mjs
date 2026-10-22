import test from 'node:test';
import assert from 'node:assert/strict';
import { attr, attrItems, attrFunction, customElements, elements, isId, isP, lists, uiFiles, walk } from './orders.mjs';
import { depsOf, frames, isComponentFrame } from './rn.mjs';

test('search leaves unchanged row data stable', () => {
  const objectProps = lists().some(({ file, el }) => {
    const fn = attrFunction(file, attr(el, 'renderItem')).fn;
    return fn && customElements(fn).some((row) => row.attrs.some((a) => attrItems(a).some((t) => isId(t, 'item')) && attrItems(a).length === 1));
  });
  if (!objectProps) return;
  const search = new Set(uiFiles.flatMap((f) => elements(f.root)).filter((e) => e.name === 'TextInput').flatMap((e) => attrItems(attr(e, 'value')).filter((t) => isId(t)).map((t) => t.v)));
  for (const file of uiFiles) for (const n of walk(file.root)) {
    if (!isId(n, 'map') || !isP(n.parent.items?.[n.idx - 1], '.')) continue;
    const call = n.parent.items[n.idx + 1];
    if (call?.type !== 'group' || ![...walk(call)].some((t) => isP(t, '...'))) continue;
    const chain = frames(n);
    const inner = chain.at(-1);
    assert.ok(!inner || !isComponentFrame(inner), 'Row data is copied on every screen render.');
    if (inner?.via === 'useMemo') assert.ok(!(depsOf(inner.call) ?? []).some((d) => search.has(d)), 'Typing copies unchanged row data.');
  }
});

test('totals retain each order currency', () => {
  assert.ok(uiFiles.some((f) => /currency\s*:\s*(?:\w+\.)?currency\b|currency\s*[,}]|\[\s*(?:\w+\.)?currency\s*\]|\.get\(\s*(?:\w+\.)?currency/.test(f.src)), 'Amounts lost their currency.');
});
