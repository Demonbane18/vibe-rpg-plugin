// Stands in for the database. Like a real one, every call is asynchronous, and records go in and come out as
// copies, so callers cannot change stored data by accident.
const roundTrip = () => new Promise((resolve) => setImmediate(resolve));

export function createStore() {
  let nextId = 1;
  const events = new Map();
  const rsvps = new Map();
  const copy = (record) => (record ? { ...record } : undefined);

  return {
    async insertEvent(data) {
      await roundTrip();
      const event = { ...data, id: `evt_${nextId++}` };
      events.set(event.id, event);
      return copy(event);
    },
    async findEvent(id) {
      await roundTrip();
      return copy(events.get(id));
    },
    async insertRsvp(data) {
      await roundTrip();
      const rsvp = { ...data, id: `rsvp_${nextId++}` };
      rsvps.set(rsvp.id, rsvp);
      return copy(rsvp);
    },
    // RSVPs for one event, oldest first (ids grow with every insert).
    async listRsvps(eventId) {
      await roundTrip();
      return [...rsvps.values()]
        .filter((rsvp) => rsvp.eventId === eventId)
        .sort((a, b) => a.id.localeCompare(b.id))
        .map(copy);
    },
  };
}
