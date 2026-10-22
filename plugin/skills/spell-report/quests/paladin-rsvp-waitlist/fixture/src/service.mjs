import { AppError, notFound } from './errors.mjs';

// Business rules. Knows nothing about HTTP; throws AppError for rule violations.
export function createService(store) {
  async function requireEvent(id) {
    const event = await store.findEvent(id);
    if (!event) throw notFound('event');
    return event;
  }

  async function presentEvent(event) {
    const rsvps = await store.listRsvps(event.id);
    return { id: event.id, title: event.title, rsvpCount: rsvps.length };
  }

  function presentRsvp(rsvp) {
    return { id: rsvp.id, eventId: rsvp.eventId, name: rsvp.name, email: rsvp.email };
  }

  return {
    async createEvent({ title }) {
      return presentEvent(await store.insertEvent({ title }));
    },

    async getEvent(id) {
      return presentEvent(await requireEvent(id));
    },

    async listRsvps(eventId) {
      await requireEvent(eventId);
      return (await store.listRsvps(eventId)).map(presentRsvp);
    },

    async addRsvp(eventId, { name, email }) {
      await requireEvent(eventId);
      const normalized = email.toLowerCase();
      if ((await store.listRsvps(eventId)).some((rsvp) => rsvp.email === normalized)) {
        throw new AppError(409, 'conflict', 'This email already has an RSVP for the event', 'email');
      }
      return presentRsvp(await store.insertRsvp({ eventId, name, email: normalized }));
    },
  };
}
