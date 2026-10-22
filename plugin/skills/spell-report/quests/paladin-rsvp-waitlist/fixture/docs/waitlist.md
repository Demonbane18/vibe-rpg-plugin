# Capacity and waitlists

Organisers keep asking for a seat limit. When an event is full, new RSVPs should join a waitlist. When a seat opens up, the next person in line gets a day to claim it, so seats don't go to people who have lost interest.

## What we agreed

An event can have a `capacity`: a whole number from 1 to 10000, or `null` for no limit. Every RSVP has a `status`:

- `going`: has a seat.
- `offered`: a seat is being held for them until `offerExpiresAt`.
- `waitlisted`: in line for a seat.
- `cancelled`: they cancelled.
- `expired`: their offer ran out before they confirmed.

Going plus offered never exceeds the capacity. A new RSVP is going if a seat is free and waitlisted otherwise. Without a limit everyone is going.

Whenever a seat becomes free while people are waiting, the waitlisted RSVP that signed up first is offered it. An offer lasts exactly 24 hours from the moment the seat became free, and runs out at that instant. An offer that runs out frees its seat at that moment, so the next person in line is offered it from then. Offers run out on time even if nobody touches the API in between.

API changes:

1. `createApp({ store, now })` takes an optional `now()` that returns the current time in milliseconds (default `Date.now`). All timing uses it.
2. `POST /events` accepts an optional `capacity`. Leaving it out means no limit.
3. Events gain `capacity`, `going`, `offered` and `waitlisted` (counts of RSVPs with that status). `rsvpCount` stays and means going plus offered plus waitlisted.
4. RSVPs gain `status` and `offerExpiresAt`: an ISO 8601 UTC timestamp such as `2026-06-01T12:00:00.000Z` while offered, `null` otherwise.
5. New: `POST /events/:eventId/rsvps/:rsvpId/confirm` turns an open offer into a seat and responds 200 with `{ rsvp }`. Confirming an RSVP that is not currently offered gives 409 `conflict`.
6. New: `DELETE /events/:eventId/rsvps/:rsvpId` cancels a going, offered or waitlisted RSVP and responds 200 with `{ rsvp }`.
7. For both new endpoints, an unknown event, an unknown RSVP, and an RSVP that belongs to another event give 404 `not_found`. Cancelling an RSVP that is already cancelled or expired also gives 404.
8. `GET /events/:eventId/rsvps` lists going, offered and waitlisted RSVPs, oldest first. An optional `status` query parameter (`going`, `offered` or `waitlisted`) filters the list.
9. One email can hold one RSVP per event, not counting cancelled or expired ones. Someone whose RSVP was cancelled or expired can RSVP again; that is a new RSVP with a new id and a new place at the back of the line.
10. New: `POST /events/:eventId/rsvps/import` with `{ "rsvps": [{ "name", "email" }, ...] }` (1 to 100 entries) adds several RSVPs at once, in list order, as if each had been sent on its own. It responds 201 with `{ rsvps }` in the same order. It is all or nothing: if any entry would be rejected, nothing is added. Problems with an entry name it in `field` with a 0-based index, for example `rsvps[2].email`.

Validation follows the same rules as the rest of the API, and bad input is a validation error on the field at fault.
