// Public event pages. Anyone can read a published event without signing in.
export async function getEvent(req, { db }) {
  const event = await db.oneOrNone('select * from events where id = $1 and published', [req.params.id]);
  if (!event) return { status: 404, body: { error: 'Not found' } };
  if (!event.show_attendees) return { status: 200, body: event };
  const rows = await db.any(
    'select first_name from users where id in (select buyer_id from orders where event_id = $1) limit 50',
    [event.id],
  );
  return { status: 200, body: { ...event, attendees: rows.map((row) => row.first_name) } };
}
