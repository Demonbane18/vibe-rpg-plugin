# Gatherly API

A small RSVP service for community events. No dependencies; Node 20 or newer.

## Layout

- `src/app.mjs` exports `createApp({ store })`. Its `handle({ method, url, body })` takes a request (`body` is the raw JSON text, if any) and resolves to `{ status, body }`. It matches routes, parses JSON and turns errors into responses. Like any server, it is called for many requests at once.
- `src/routes.mjs` is the HTTP layer: it validates input, calls the service and picks status codes.
- `src/service.mjs` holds the business rules. It knows nothing about HTTP and throws `AppError` when a rule is broken.
- `src/store.mjs` stands in for the database and hands out copies. Like a real database, every call is asynchronous. Only the service talks to it.
- `src/errors.mjs` defines `AppError` and two helpers.

## Endpoints

| Method | Path | Success |
|---|---|---|
| POST | `/events` with `{ "title" }` | 201 `{ event }` |
| GET | `/events/:eventId` | 200 `{ event }` |
| GET | `/events/:eventId/rsvps` | 200 `{ rsvps }`, oldest first |
| POST | `/events/:eventId/rsvps` with `{ "name", "email" }` | 201 `{ rsvp }` |

An event looks like `{ id, title, rsvpCount }` and an RSVP like `{ id, eventId, name, email }`. Text fields are trimmed. Emails are stored in lower case, and one email can RSVP to an event once.

## Errors

Every error response has the body `{ "error": { "code", "message", "field" } }`, with `field` present only when one input field is at fault.

| Status | Code | When |
|---|---|---|
| 400 | `invalid_json` | The body is not valid JSON |
| 400 | `invalid_request` | Input fails validation |
| 404 | `not_found` | Unknown route or record |
| 405 | `method_not_allowed` | Known path, wrong method |
| 409 | `conflict` | The request clashes with existing data |

Routes validate input before the service looks anything up, so a malformed request gets 400 even when the record it names does not exist.

## Tests

`node --test test/` runs everything. Tests go through `createApp().handle(...)`, the same way a real request would.
