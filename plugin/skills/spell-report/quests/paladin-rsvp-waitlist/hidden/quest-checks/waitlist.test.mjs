import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.mjs';

const HOUR = 60 * 60 * 1000;
const T0 = Date.UTC(2026, 5, 1, 9, 0, 0);
const iso = (ms) => new Date(ms).toISOString();

function client() {
  const clock = { time: T0 };
  const app = createApp({ now: () => clock.time });
  const send = (method, url, body) => app.handle({ method, url, body: body === undefined ? undefined : JSON.stringify(body) });
  return { send, clock };
}

async function setup(send, capacity, names) {
  const payload = { title: 'Lantern walk' };
  if (capacity !== undefined) payload.capacity = capacity;
  const created = await send('POST', '/events', payload);
  assert.equal(created.status, 201);
  const event = created.body.event;
  const ids = {};
  for (const name of names) {
    const res = await send('POST', `/events/${event.id}/rsvps`, { name, email: `${name}@example.com` });
    assert.equal(res.status, 201);
    ids[name] = res.body.rsvp.id;
  }
  return { event, ids };
}

// "name:status" for every listed RSVP, plus "@expiry" while offered.
async function listed(send, eventId, query = '') {
  const res = await send('GET', `/events/${eventId}/rsvps${query}`);
  assert.equal(res.status, 200);
  return res.body.rsvps.map((rsvp) => `${rsvp.name}:${rsvp.status}${rsvp.status === 'offered' ? `@${rsvp.offerExpiresAt}` : ''}`);
}

async function counts(send, eventId) {
  const { status, body } = await send('GET', `/events/${eventId}`);
  assert.equal(status, 200);
  const { capacity, going, offered, waitlisted, rsvpCount } = body.event;
  return { capacity, going, offered, waitlisted, rsvpCount };
}

function assertError(res, status, code, field) {
  assert.equal(res.status, status);
  assert.equal(res.body.error.code, code);
  assert.equal(typeof res.body.error.message, 'string');
  if (field) assert.equal(res.body.error.field, field);
}

const cancel = (send, eventId, rsvpId) => send('DELETE', `/events/${eventId}/rsvps/${rsvpId}`);
const confirm = (send, eventId, rsvpId) => send('POST', `/events/${eventId}/rsvps/${rsvpId}/confirm`);

test('waitlist spec: part 1', async () => {
  const { send } = client();
  for (const capacity of [1, 10000]) {
    const res = await send('POST', '/events', { title: 'Walk', capacity });
    assert.equal(res.status, 201);
    assert.equal(res.body.event.capacity, capacity);
  }
  for (const body of [{ title: 'Walk' }, { title: 'Walk', capacity: null }]) {
    const res = await send('POST', '/events', body);
    assert.equal(res.status, 201);
    assert.equal(res.body.event.capacity, null);
  }
  for (const capacity of [0, -3, 2.5, 10001, '5', true, [], {}]) {
    assertError(await send('POST', '/events', { title: 'Walk', capacity }), 400, 'invalid_request', 'capacity');
  }
  const open = await setup(send, undefined, ['ada', 'bo', 'cy']);
  assert.deepEqual(await counts(send, open.event.id), { capacity: null, going: 3, offered: 0, waitlisted: 0, rsvpCount: 3 });
});

test('waitlist spec: part 2', async () => {
  const { send } = client();
  const { event } = await setup(send, 2, ['ada', 'bo', 'cy']);
  assert.deepEqual(await counts(send, event.id), { capacity: 2, going: 2, offered: 0, waitlisted: 1, rsvpCount: 3 });
  const extra = await send('POST', `/events/${event.id}/rsvps`, { name: 'di', email: 'di@example.com' });
  assert.equal(extra.body.rsvp.status, 'waitlisted');
  assert.equal(extra.body.rsvp.offerExpiresAt, null);
  assert.deepEqual(await listed(send, event.id), ['ada:going', 'bo:going', 'cy:waitlisted', 'di:waitlisted']);
});

test('waitlist spec: part 3', async () => {
  const { send, clock } = client();
  const { event, ids } = await setup(send, 2, ['ada', 'bo', 'cy', 'di']);
  clock.time = T0 + 2 * HOUR;
  const res = await cancel(send, event.id, ids.ada);
  assert.equal(res.status, 200);
  const { id, eventId, name, email, status, offerExpiresAt } = res.body.rsvp;
  assert.deepEqual({ id, eventId, name, email, status, offerExpiresAt }, { id: ids.ada, eventId: event.id, name: 'ada', email: 'ada@example.com', status: 'cancelled', offerExpiresAt: null });
  assert.deepEqual(await listed(send, event.id), ['bo:going', `cy:offered@${iso(T0 + 26 * HOUR)}`, 'di:waitlisted']);
  assert.deepEqual(await counts(send, event.id), { capacity: 2, going: 1, offered: 1, waitlisted: 1, rsvpCount: 3 });
  clock.time = T0 + 20 * HOUR;
  const confirmed = await confirm(send, event.id, ids.cy);
  assert.equal(confirmed.status, 200);
  assert.equal(confirmed.body.rsvp.status, 'going');
  assert.equal(confirmed.body.rsvp.offerExpiresAt, null);
  clock.time = T0 + 100 * HOUR;
  assert.deepEqual(await listed(send, event.id), ['bo:going', 'cy:going', 'di:waitlisted']);
});

test('waitlist spec: part 4', async () => {
  const { send, clock } = client();
  const { event, ids } = await setup(send, 1, ['ada', 'bo', 'cy']);
  await cancel(send, event.id, ids.ada);
  clock.time = T0 + 24 * HOUR - 1;
  assert.deepEqual(await listed(send, event.id), [`bo:offered@${iso(T0 + 24 * HOUR)}`, 'cy:waitlisted']);
  clock.time = T0 + 24 * HOUR;
  assert.deepEqual(await listed(send, event.id), [`cy:offered@${iso(T0 + 48 * HOUR)}`]);
  assert.deepEqual(await counts(send, event.id), { capacity: 1, going: 0, offered: 1, waitlisted: 0, rsvpCount: 1 });
  assertError(await confirm(send, event.id, ids.bo), 409, 'conflict');
  assertError(await cancel(send, event.id, ids.bo), 404, 'not_found');
});

test('waitlist spec: part 5', async () => {
  const { send, clock } = client();
  const { event, ids } = await setup(send, 1, ['ada', 'bo', 'cy', 'di', 'eve']);
  clock.time = T0 + 5 * HOUR;
  await cancel(send, event.id, ids.ada);
  clock.time = T0 + 60 * HOUR;
  assert.deepEqual(await counts(send, event.id), { capacity: 1, going: 0, offered: 1, waitlisted: 1, rsvpCount: 2 });
  assert.deepEqual(await listed(send, event.id), [`di:offered@${iso(T0 + 77 * HOUR)}`, 'eve:waitlisted']);
  assert.equal((await confirm(send, event.id, ids.di)).status, 200);
  assert.deepEqual(await listed(send, event.id), ['di:going', 'eve:waitlisted']);
});

test('waitlist spec: part 6', async () => {
  const { send, clock } = client();
  const { event, ids } = await setup(send, 2, ['ada', 'bo', 'cy', 'di', 'eve', 'fay']);
  await cancel(send, event.id, ids.ada);
  clock.time = T0 + 10 * HOUR;
  await cancel(send, event.id, ids.bo);
  clock.time = T0 + 30 * HOUR;
  assert.deepEqual(await listed(send, event.id), [`di:offered@${iso(T0 + 34 * HOUR)}`, `eve:offered@${iso(T0 + 48 * HOUR)}`, 'fay:waitlisted']);
  clock.time = T0 + 40 * HOUR;
  assert.deepEqual(await listed(send, event.id, '?status=offered'), [`eve:offered@${iso(T0 + 48 * HOUR)}`, `fay:offered@${iso(T0 + 58 * HOUR)}`]);
  clock.time = T0 + 200 * HOUR;
  assert.deepEqual(await counts(send, event.id), { capacity: 2, going: 0, offered: 0, waitlisted: 0, rsvpCount: 0 });
  const late = await send('POST', `/events/${event.id}/rsvps`, { name: 'gus', email: 'gus@example.com' });
  assert.equal(late.body.rsvp.status, 'going');
});

test('waitlist spec: part 7', async () => {
  const { send, clock } = client();
  const { event, ids } = await setup(send, 1, ['ada', 'bo', 'cy']);
  clock.time = T0 + HOUR;
  await cancel(send, event.id, ids.ada);
  clock.time = T0 + 3 * HOUR;
  const res = await cancel(send, event.id, ids.bo);
  assert.equal(res.body.rsvp.status, 'cancelled');
  assert.deepEqual(await listed(send, event.id), [`cy:offered@${iso(T0 + 27 * HOUR)}`]);
  const waitlisted = await setup(send, 1, ['di', 'eve', 'fay']);
  await cancel(send, waitlisted.event.id, waitlisted.ids.eve);
  assert.deepEqual(await listed(send, waitlisted.event.id), ['di:going', 'fay:waitlisted']);
});

test('waitlist spec: part 8', async () => {
  const { send } = client();
  const first = await setup(send, 1, ['ada', 'bo']);
  const second = await setup(send, 1, ['cy', 'di']);
  for (const act of [cancel, confirm]) {
    assertError(await act(send, 'evt_missing', first.ids.ada), 404, 'not_found');
    assertError(await act(send, first.event.id, 'rsvp_missing'), 404, 'not_found');
    assertError(await act(send, second.event.id, first.ids.bo), 404, 'not_found');
  }
  assertError(await confirm(send, first.event.id, first.ids.ada), 409, 'conflict');
  assertError(await confirm(send, first.event.id, first.ids.bo), 409, 'conflict');
  assert.deepEqual(await listed(send, first.event.id), ['ada:going', 'bo:waitlisted']);
  assert.deepEqual(await listed(send, second.event.id), ['cy:going', 'di:waitlisted']);
  assert.equal((await cancel(send, first.event.id, first.ids.bo)).status, 200);
  assertError(await cancel(send, first.event.id, first.ids.bo), 404, 'not_found');
  assertError(await confirm(send, first.event.id, first.ids.bo), 409, 'conflict');
  assert.equal((await send('PUT', `/events/${first.event.id}/rsvps/${first.ids.ada}`)).status, 405);
  assert.equal((await send('GET', `/events/${first.event.id}/rsvps/${first.ids.ada}/confirm`)).status, 405);
});

test('waitlist spec: part 9', async () => {
  const { send, clock } = client();
  const { event, ids } = await setup(send, 1, ['ada', 'bo', 'cy']);
  for (const value of ['all', 'cancelled', 'expired']) {
    assertError(await send('GET', `/events/${event.id}/rsvps?status=${value}`), 400, 'invalid_request', 'status');
  }
  assertError(await send('GET', '/events/evt_missing/rsvps?status=going'), 404, 'not_found');
  assertError(await send('POST', `/events/${event.id}/rsvps`, { name: 'Bo', email: 'BO@example.com' }), 409, 'conflict');
  await cancel(send, event.id, ids.ada);
  assertError(await send('POST', `/events/${event.id}/rsvps`, { name: 'Bo', email: 'bo@example.com' }), 409, 'conflict');
  const back = await send('POST', `/events/${event.id}/rsvps`, { name: 'Ada', email: 'ADA@example.com' });
  assert.equal(back.status, 201);
  assert.notEqual(back.body.rsvp.id, ids.ada);
  assert.equal(back.body.rsvp.status, 'waitlisted');
  clock.time = T0 + 24 * HOUR;
  const again = await send('POST', `/events/${event.id}/rsvps`, { name: 'Bo', email: 'bo@example.com' });
  assert.equal(again.status, 201);
  assert.equal(again.body.rsvp.status, 'waitlisted');
  assert.deepEqual(await listed(send, event.id), [`cy:offered@${iso(T0 + 48 * HOUR)}`, 'Ada:waitlisted', 'Bo:waitlisted']);
});

const importRsvps = (send, eventId, rsvps) => send('POST', `/events/${eventId}/rsvps/import`, { rsvps });
const people = (...names) => names.map((name) => ({ name, email: `${name}@example.com` }));

test('waitlist spec: part 10', async () => {
  const { send } = client();
  const { event } = await setup(send, 3, ['ada']);
  const res = await importRsvps(send, event.id, [{ name: '  Bo  ', email: ' BO@Example.com ' }, ...people('cy', 'di', 'eve')]);
  assert.equal(res.status, 201);
  assert.deepEqual(res.body.rsvps.map((rsvp) => [rsvp.name, rsvp.email, rsvp.status, rsvp.eventId, rsvp.offerExpiresAt]), [
    ['Bo', 'bo@example.com', 'going', event.id, null],
    ['cy', 'cy@example.com', 'going', event.id, null],
    ['di', 'di@example.com', 'waitlisted', event.id, null],
    ['eve', 'eve@example.com', 'waitlisted', event.id, null],
  ]);
  assert.equal(new Set(res.body.rsvps.map((rsvp) => rsvp.id)).size, 4);
  assert.deepEqual(await listed(send, event.id), ['ada:going', 'Bo:going', 'cy:going', 'di:waitlisted', 'eve:waitlisted']);
  const open = await setup(send, undefined, []);
  const many = await importRsvps(send, open.event.id, Array.from({ length: 100 }, (_, i) => ({ name: `p${i}`, email: `p${i}@example.com` })));
  assert.equal(many.status, 201);
  assert.equal(many.body.rsvps.length, 100);
  assert.deepEqual(await counts(send, open.event.id), { capacity: null, going: 100, offered: 0, waitlisted: 0, rsvpCount: 100 });
});

test('waitlist spec: part 11', async () => {
  const { send } = client();
  const { event } = await setup(send, 2, ['ada']);
  const before = await listed(send, event.id);
  const attempts = [
    [people('bo', 'cy', 'di').concat([{ name: 'Bo again', email: 'Bo@Example.com' }]), 409, 'conflict', 'rsvps[3].email'],
    [people('bo', 'ada'), 409, 'conflict', 'rsvps[1].email'],
    [[...people('bo'), { name: 'cy', email: 'not-an-email' }], 400, 'invalid_request', 'rsvps[1].email'],
    [[...people('bo', 'cy'), { name: '   ', email: 'zed@example.com' }], 400, 'invalid_request', 'rsvps[2].name'],
  ];
  for (const [rsvps, status, code, field] of attempts) {
    assertError(await importRsvps(send, event.id, rsvps), status, code, field);
    assert.deepEqual(await listed(send, event.id), before);
  }
  for (const rsvps of [[], 'bo@example.com', null, Array.from({ length: 101 }, (_, i) => ({ name: `p${i}`, email: `p${i}@example.com` }))]) {
    assertError(await importRsvps(send, event.id, rsvps), 400, 'invalid_request', 'rsvps');
  }
  assertError(await send('POST', `/events/${event.id}/rsvps/import`, {}), 400, 'invalid_request', 'rsvps');
  assert.deepEqual(await counts(send, event.id), { capacity: 2, going: 1, offered: 0, waitlisted: 0, rsvpCount: 1 });
  assertError(await importRsvps(send, 'evt_missing', people('bo')), 404, 'not_found');
  assertError(await importRsvps(send, 'evt_missing', [{ name: 'bo', email: 'nope' }]), 400, 'invalid_request', 'rsvps[0].email');
  assert.equal((await importRsvps(send, event.id, people('bo', 'cy'))).status, 201);
  assert.deepEqual(await listed(send, event.id), ['ada:going', 'bo:going', 'cy:waitlisted']);
});

test('waitlist spec: part 12', async () => {
  const { send, clock } = client();
  const single = await setup(send, 1, ['ada', 'bo']);
  const batch = await setup(send, 1, ['cy', 'di']);
  await cancel(send, single.event.id, single.ids.ada);
  await cancel(send, batch.event.id, batch.ids.cy);
  clock.time = T0 + 30 * HOUR;
  const joined = await send('POST', `/events/${single.event.id}/rsvps`, { name: 'eve', email: 'eve@example.com' });
  assert.equal(joined.body.rsvp.status, 'going');
  const imported = await importRsvps(send, batch.event.id, people('fay', 'gus'));
  assert.deepEqual(imported.body.rsvps.map((rsvp) => rsvp.status), ['going', 'waitlisted']);
  assert.deepEqual(await listed(send, single.event.id), ['eve:going']);
  assert.deepEqual(await listed(send, batch.event.id), ['fay:going', 'gus:waitlisted']);
});

test('waitlist spec: part 13', async () => {
  const { send, clock } = client();
  const names = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9', 'n10', 'n11', 'n12'];
  const { event, ids } = await setup(send, 7, names);
  assert.deepEqual(await listed(send, event.id), [...names.slice(0, 7).map((n) => `${n}:going`), ...names.slice(7).map((n) => `${n}:waitlisted`)]);
  clock.time = T0 + HOUR;
  await cancel(send, event.id, ids.n1);
  assert.deepEqual(await listed(send, event.id, '?status=offered'), [`n8:offered@${iso(T0 + 25 * HOUR)}`]);
  clock.time = T0 + 2 * HOUR;
  await cancel(send, event.id, ids.n2);
  assert.deepEqual(await listed(send, event.id, '?status=waitlisted'), ['n10:waitlisted', 'n11:waitlisted', 'n12:waitlisted']);
  assert.deepEqual(await listed(send, event.id, '?status=offered'), [`n8:offered@${iso(T0 + 25 * HOUR)}`, `n9:offered@${iso(T0 + 26 * HOUR)}`]);
});

test('waitlist spec: part 14', async () => {
  const { send, clock } = client();
  const { event } = await setup(send, 2, []);
  const joins = await Promise.all(['a1', 'a2', 'a3', 'a4', 'a5', 'a6'].map((name) => send('POST', `/events/${event.id}/rsvps`, { name, email: `${name}@example.com` })));
  assert.deepEqual(joins.map((res) => res.status), [201, 201, 201, 201, 201, 201]);
  assert.equal(joins.filter((res) => res.body.rsvp.status === 'going').length, 2);
  assert.deepEqual(await counts(send, event.id), { capacity: 2, going: 2, offered: 0, waitlisted: 4, rsvpCount: 6 });

  const same = await Promise.all(['dup@example.com', 'DUP@example.com', 'Dup@Example.com'].map((email) => send('POST', `/events/${event.id}/rsvps`, { name: 'Dup', email })));
  assert.deepEqual(same.map((res) => res.status).sort(), [201, 409, 409]);

  const going = joins.filter((res) => res.body.rsvp.status === 'going').map((res) => res.body.rsvp.id);
  const cancels = await Promise.all([...going, going[0]].map((id) => cancel(send, event.id, id)));
  assert.deepEqual(cancels.map((res) => res.status).sort(), [200, 200, 404]);
  assert.deepEqual(await counts(send, event.id), { capacity: 2, going: 0, offered: 2, waitlisted: 3, rsvpCount: 5 });

  clock.time = T0 + 24 * HOUR;
  const views = await Promise.all([
    send('GET', `/events/${event.id}`), send('GET', `/events/${event.id}/rsvps`), send('GET', `/events/${event.id}`),
    send('GET', `/events/${event.id}/rsvps?status=offered`), send('GET', `/events/${event.id}`),
  ]);
  assert.ok(views.every((res) => res.status === 200));
  assert.deepEqual(await counts(send, event.id), { capacity: 2, going: 0, offered: 2, waitlisted: 1, rsvpCount: 3 });

  const offered = (await send('GET', `/events/${event.id}/rsvps?status=offered`)).body.rsvps.map((rsvp) => rsvp.id);
  const race = await Promise.all([
    confirm(send, event.id, offered[0]),
    send('POST', `/events/${event.id}/rsvps`, { name: 'Late', email: 'late@example.com' }),
    importRsvps(send, event.id, people('b1', 'b2')),
    cancel(send, event.id, offered[1]),
  ]);
  assert.deepEqual(race.map((res) => res.status), [200, 201, 201, 200]);
  const after = await counts(send, event.id);
  assert.equal(after.going + after.offered, 2);
  assert.deepEqual(after, { capacity: 2, going: 1, offered: 1, waitlisted: 3, rsvpCount: 5 });
});
