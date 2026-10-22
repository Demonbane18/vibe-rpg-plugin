// Seat holds: a buyer reserves seats for a few minutes while paying.
import { randomUUID } from 'node:crypto';
import { NotFound, SoldOut } from './errors.mjs';

export const HOLD_MINUTES = 10;
export const MAX_SEATS_PER_HOLD = 8;

export function isExpired(hold, now = Date.now()) {
  return hold.expires_at.getTime() <= now;
}

export async function createHold(db, { eventId, buyerId, seats }) {
  if (!Number.isInteger(seats) || seats < 1 || seats > MAX_SEATS_PER_HOLD) {
    throw new RangeError(`seats must be 1 to ${MAX_SEATS_PER_HOLD}`);
  }
  return db.tx(async (tx) => {
    const event = await tx.oneOrNone('select seats_left from events where id = $1 and published for update', [eventId]);
    if (!event) throw new NotFound('event');
    if (event.seats_left < seats) throw new SoldOut(eventId);
    await tx.none('update events set seats_left = $1 where id = $2', [event.seats_left - seats, eventId]);
    const id = randomUUID();
    const expiresAt = new Date(Date.now() + HOLD_MINUTES * 60_000);
    await tx.none(
      "insert into holds (id, event_id, buyer_id, seats, status, expires_at) values ($1, $2, $3, $4, 'active', $5)",
      [id, eventId, buyerId, seats, expiresAt],
    );
    return { id, eventId, seats, expiresAt };
  });
}

export async function releaseHold(db, { holdId, buyerId }) {
  return db.tx(async (tx) => {
    const hold = await tx.oneOrNone(
      "update holds set status = 'released' where id = $1 and buyer_id = $2 and status = 'active' returning event_id, seats",
      [holdId, buyerId],
    );
    if (!hold) return false;
    await tx.none('update events set seats_left = seats_left + $1 where id = $2', [hold.seats, hold.event_id]);
    return true;
  });
}

// A checkout that starts just before expiry can still be paying, so the sweeper waits a little past expiry.
const SWEEP_GRACE_MS = 2 * 60_000;

// Gives seats from expired holds back to their events. Scheduled every minute on each API instance.
export async function sweepExpiredHolds(db, now = Date.now()) {
  return db.tx(async (tx) => {
    const expired = await tx.any(
      "update holds set status = 'expired' where status = 'active' and expires_at < $1 returning event_id, seats",
      [new Date(now - SWEEP_GRACE_MS)],
    );
    for (const hold of expired) {
      await tx.none('update events set seats_left = seats_left + $1 where id = $2', [hold.seats, hold.event_id]);
    }
    return expired.length;
  });
}
