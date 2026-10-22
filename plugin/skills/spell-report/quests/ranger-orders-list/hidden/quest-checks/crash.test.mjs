import test from 'node:test';
import assert from 'node:assert/strict';
import { isId, isP, uiFiles, walk } from './orders.mjs';

// Fields that can be '' or 0 for a real order.
const RISKY = new Set(['note', 'giftCount', 'itemCount', 'totalCents', 'customerName']);
const BOUNDARY = new Set(['&&', '||', '??', '?', ':', ',']);

/** Left operands of && inside `items` (and nested parentheses) that are bare references to a risky field. */
function leaks(items) {
  const out = [];
  let start = 0;
  items.forEach((t, j) => {
    if (t.type === 'group' && t.open === '(') out.push(...leaks(t.items));
    if (t.type === 'p' && BOUNDARY.has(t.v)) {
      if (t.v === '&&') {
        const operand = items.slice(start, j);
        const bare = operand.length > 0 && operand.every((x) => isId(x) || isP(x, '.') || isP(x, '?.'));
        if (bare && operand.some((x) => isId(x) && RISKY.has(x.v))) out.push(operand.map((x) => x.v).join(''));
        if (bare && isId(operand[operand.length - 1], 'length')) out.push(operand.map((x) => x.v).join(''));
      }
      start = j + 1;
    }
  });
  return out;
}

test('every order renders without a text crash', () => {
  for (const file of uiFiles) {
    for (const n of walk(file.root)) {
      if (n.type !== 'group' || n.open !== '{' || n.parent?.type !== 'jsx' || n.attr) continue;
      assert.deepEqual(leaks(n.items), [], 'A row can render a bare empty string or zero.');
    }
  }
});
