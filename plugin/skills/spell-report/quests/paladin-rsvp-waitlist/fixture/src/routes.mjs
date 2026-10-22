import { invalid } from './errors.mjs';

// HTTP layer: validates input, calls the service and shapes responses.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function requireText(body, field, max) {
  const value = body[field];
  if (typeof value !== 'string' || !value.trim()) throw invalid(field, `${field} is required`);
  const text = value.trim();
  if (text.length > max) throw invalid(field, `${field} must be at most ${max} characters`);
  return text;
}

export function routes(service) {
  return [
    {
      method: 'POST',
      path: '/events',
      handler: async ({ body }) => {
        const title = requireText(body, 'title', 100);
        return { status: 201, body: { event: await service.createEvent({ title }) } };
      },
    },
    {
      method: 'GET',
      path: '/events/:eventId',
      handler: async ({ params }) => ({ status: 200, body: { event: await service.getEvent(params.eventId) } }),
    },
    {
      method: 'GET',
      path: '/events/:eventId/rsvps',
      handler: async ({ params }) => ({ status: 200, body: { rsvps: await service.listRsvps(params.eventId) } }),
    },
    {
      method: 'POST',
      path: '/events/:eventId/rsvps',
      handler: async ({ params, body }) => {
        const name = requireText(body, 'name', 80);
        const email = requireText(body, 'email', 254);
        if (!EMAIL.test(email)) throw invalid('email', 'email must be a valid address');
        return { status: 201, body: { rsvp: await service.addRsvp(params.eventId, { name, email }) } };
      },
    },
  ];
}
