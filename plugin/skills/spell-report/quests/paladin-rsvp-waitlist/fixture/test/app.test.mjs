import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.mjs';

function client() {
  const app = createApp();
  return (method, url, body) => app.handle({ method, url, body: body === undefined ? undefined : JSON.stringify(body) });
}

test('creates and fetches an event', async () => {
  const send = client();
  const created = await send('POST', '/events', { title: '  Board games  ' });
  assert.equal(created.status, 201);
  assert.equal(created.body.event.title, 'Board games');
  assert.equal(created.body.event.rsvpCount, 0);
  const fetched = await send('GET', `/events/${created.body.event.id}`);
  assert.deepEqual(fetched, { status: 200, body: { event: created.body.event } });
});

test('unknown events and routes are 404', async () => {
  const send = client();
  assert.deepEqual(await send('GET', '/events/evt_404'), { status: 404, body: { error: { code: 'not_found', message: 'event not found' } } });
  assert.equal((await send('GET', '/nope')).status, 404);
});

test('RSVPs are stored and listed oldest first', async () => {
  const send = client();
  const { body: { event } } = await send('POST', '/events', { title: 'Picnic' });
  const first = await send('POST', `/events/${event.id}/rsvps`, { name: 'Ada', email: 'Ada@Example.com' });
  assert.equal(first.status, 201);
  assert.equal(first.body.rsvp.eventId, event.id);
  assert.equal(first.body.rsvp.name, 'Ada');
  assert.equal(first.body.rsvp.email, 'ada@example.com');
  await send('POST', `/events/${event.id}/rsvps`, { name: 'Bo', email: 'bo@example.com' });
  const list = await send('GET', `/events/${event.id}/rsvps`);
  assert.deepEqual(list.body.rsvps.map((rsvp) => rsvp.name), ['Ada', 'Bo']);
  assert.equal((await send('GET', `/events/${event.id}`)).body.event.rsvpCount, 2);
});

test('one RSVP per email, ignoring case', async () => {
  const send = client();
  const { body: { event } } = await send('POST', '/events', { title: 'Picnic' });
  await send('POST', `/events/${event.id}/rsvps`, { name: 'Ada', email: 'ada@example.com' });
  const again = await send('POST', `/events/${event.id}/rsvps`, { name: 'Ada L', email: 'ADA@example.com' });
  assert.equal(again.status, 409);
  assert.equal(again.body.error.code, 'conflict');
});

test('validation errors name the field', async () => {
  const send = client();
  const noTitle = await send('POST', '/events', { title: '   ' });
  assert.equal(noTitle.status, 400);
  assert.deepEqual(noTitle.body.error, { code: 'invalid_request', message: 'title is required', field: 'title' });
  const { body: { event } } = await send('POST', '/events', { title: 'Picnic' });
  const badEmail = await send('POST', `/events/${event.id}/rsvps`, { name: 'Ada', email: 'not-an-email' });
  assert.equal(badEmail.status, 400);
  assert.equal(badEmail.body.error.field, 'email');
});

test('bad JSON and wrong methods', async () => {
  const app = createApp();
  const bad = await app.handle({ method: 'POST', url: '/events', body: '{"title":' });
  assert.equal(bad.status, 400);
  assert.equal(bad.body.error.code, 'invalid_json');
  const wrong = await app.handle({ method: 'PUT', url: '/events' });
  assert.equal(wrong.status, 405);
  assert.equal(wrong.body.error.code, 'method_not_allowed');
});
