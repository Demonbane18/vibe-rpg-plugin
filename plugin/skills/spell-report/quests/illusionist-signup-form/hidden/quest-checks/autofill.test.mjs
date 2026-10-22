import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { loadPage, elements, attr } from './lib.mjs';

const dir = fileURLToPath(new URL('..', import.meta.url));
const { doc } = loadPage(dir);
const all = elements(doc);
const field = (name) => all.find((el) => ['input', 'select', 'textarea'].includes(el.tag) && attr(el, 'name') === name);
const token = (el) => (attr(el, 'autocomplete') ?? '').trim().toLowerCase().split(/\s+/).filter((t) => !t.startsWith('section-') && !['shipping', 'billing', 'home', 'work', 'mobile', 'webauthn'].includes(t)).pop() ?? '';
const type = (el) => (attr(el, 'type') ?? 'text').toLowerCase();

test('field names kept', () => {
  for (const name of ['fullName', 'email', 'phone', 'postcode', 'password', 'course', 'level', 'terms']) assert.ok(field(name), `${name} kept`);
  const form = all.find((el) => el.tag === 'form');
  assert.equal(attr(form, 'action'), '/api/bookings');
});

test('input purposes', () => {
  const expect = { fullName: ['text', 'name'], email: ['email', 'email'], phone: ['tel', 'tel'], postcode: ['text', 'postal-code'], password: ['password', 'new-password'] };
  for (const [name, [t, ac]] of Object.entries(expect)) {
    const el = field(name);
    assert.equal(type(el), t, `${name} type`);
    assert.equal(token(el), ac, `${name} purpose`);
  }
});

test('form allows autofill', () => {
  const form = all.find((el) => el.tag === 'form');
  assert.notEqual((attr(form, 'autocomplete') ?? '').trim().toLowerCase(), 'off');
  for (const name of ['fullName', 'email', 'phone', 'postcode', 'password']) assert.notEqual(token(field(name)), 'off');
});
