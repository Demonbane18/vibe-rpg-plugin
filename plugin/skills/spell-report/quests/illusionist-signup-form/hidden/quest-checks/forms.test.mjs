import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { loadPage, elements, attr, has, accessibleName, labelsFor, ancestors, byId, clean, text, scripts, stripJsComments } from './lib.mjs';

const dir = fileURLToPath(new URL('..', import.meta.url));
const { doc } = loadPage(dir);
const js = stripJsComments(scripts(dir, doc));
const all = elements(doc);
const form = all.find((el) => el.tag === 'form');
const type = (el) => (attr(el, 'type') ?? 'text').toLowerCase();
const fields = all.filter((el) => ['input', 'select', 'textarea'].includes(el.tag) && !['hidden', 'submit', 'button', 'reset', 'image'].includes(type(el)));
const named = (name) => fields.filter((el) => attr(el, 'name') === name);

test('field labels', () => {
  assert.ok(form, 'form exists');
  for (const el of fields) {
    const visibleLabel = labelsFor(doc, el).some((l) => clean(text(l))) || (attr(el, 'aria-labelledby') ?? '').split(/\s+/).some((id) => byId(doc, id) && clean(text(byId(doc, id))));
    assert.ok(visibleLabel, `${attr(el, 'name')} needs a visible label`);
  }
  const ids = all.map((el) => el.attrs.id).filter(Boolean);
  assert.equal(new Set(ids).size, ids.length, 'ids are unique');
  for (const l of all.filter((el) => el.tag === 'label' && has(el, 'for'))) assert.ok(byId(doc, attr(l, 'for')), `label for="${attr(l, 'for')}" points at an element`);
});

test('required fields', () => {
  const req = (el) => has(el, 'required') || attr(el, 'aria-required') === 'true' || ancestors(el).some((a) => attr(a, 'aria-required') === 'true');
  for (const name of ['fullName', 'email', 'postcode', 'password', 'terms']) assert.ok(named(name).every(req), name);
  assert.ok(named('course').some(req), 'course');
});

test('grouped choices', () => {
  const radios = fields.filter((el) => type(el) === 'radio');
  assert.ok(radios.length >= 3, 'class choices remain');
  for (const r of radios) {
    const group = ancestors(r).find((a) => a.tag === 'fieldset' || ['radiogroup', 'group'].includes(attr(a, 'role')));
    assert.ok(group, 'choice is inside a group');
    const name = group.tag === 'fieldset' && !has(group, 'aria-label') && !has(group, 'aria-labelledby')
      ? clean(text(group.children.find((c) => c.tag === 'legend') ?? { type: 'text', text: '' }))
      : accessibleName(doc, group);
    assert.ok(name, 'group is named by its question');
  }
});

test('button names', () => {
  for (const b of all.filter((el) => el.tag === 'button' || (el.tag === 'input' && ['submit', 'button'].includes(type(el))))) {
    assert.ok(accessibleName(doc, b).replace(/[\u00d7xX]/g, '').trim().length > 1, `button ${b.attrs.id ?? ''} has a name`);
  }
});

test('error association', () => {
  const jsSets = /aria-describedby|ariaDescribedBy|aria-errormessage|ariaErrorMessage/.test(js);
  for (const name of ['fullName', 'email', 'phone', 'postcode', 'password', 'course', 'terms']) {
    const els = named(name);
    assert.ok(els.length, `${name} field still exists`);
    const refs = (el) => [el, ...ancestors(el).filter((a) => a.tag === 'fieldset' || attr(a, 'role') === 'radiogroup' || attr(a, 'role') === 'group')]
      .flatMap((n) => `${attr(n, 'aria-describedby') ?? ''} ${attr(n, 'aria-errormessage') ?? ''}`.split(/\s+/)).filter(Boolean);
    const linked = els.every((el) => refs(el).some((id) => {
      const target = byId(doc, id);
      return target && (js.includes(id) || /err|alert|message|feedback|invalid/i.test(`${id} ${attr(target, 'class') ?? ''}`));
    }));
    assert.ok(linked || jsSets, `${name} error is tied to the field`);
  }
});

test('invalid state', () => {
  assert.ok(/aria-invalid|ariaInvalid/.test(js), 'script marks invalid fields');
});

test('failure is announced', () => {
  const live = all.some((el) => /^(alert|status)$/.test(attr(el, 'role') ?? '') || has(el, 'aria-live')) || /aria-live|['"](alert|status)['"]/.test(js);
  const focuses = /\.focus\(\s*(\{[^}]*\})?\s*\)/.test(js);
  assert.ok(live || focuses, 'failure reaches assistive tech');
});
