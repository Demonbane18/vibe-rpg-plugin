// Checkout: charge the buyer for a seat hold and record the order.
import { Gone, NotFound, PaymentFailed } from './errors.mjs';
import { isExpired } from './holds.mjs';

// Groups of five or more seats get 10% off.
const GROUP_DISCOUNT_ABOVE = 4;

export async function checkout(db, payments, mailer, logger, { holdId, buyerId, paymentMethodId }) {
  const hold = await db.oneOrNone('select * from holds where id = $1', [holdId]);
  if (!hold || hold.buyer_id !== buyerId) throw new NotFound('hold');
  if (hold.status === 'paid') return { orderId: hold.order_id };
  if (hold.status !== 'active' || isExpired(hold)) throw new Gone('hold');

  const event = await db.one('select id, title, price_cents, booking_fee_cents, currency from events where id = $1', [hold.event_id]);
  const ticketsCents = event.price_cents * hold.seats;
  const discountCents = hold.seats > GROUP_DISCOUNT_ABOVE ? Math.floor(ticketsCents / 10) : 0;
  const totalCents = ticketsCents - discountCents + event.booking_fee_cents;
  let charge;
  try {
    charge = await payments.charge({ amountCents: totalCents, currency: event.currency, paymentMethodId, idempotencyKey: `hold-${hold.id}` });
  } catch (err) {
    logger.warn({ err, holdId }, 'charge failed');
    throw new PaymentFailed(err.code);
  }
  const order = await db.tx(async (tx) => {
    const row = await tx.one(
      'insert into orders (hold_id, event_id, buyer_id, seats, amount_cents, currency, charge_id) values ($1, $2, $3, $4, $5, $6, $7) on conflict (hold_id) do update set charge_id = excluded.charge_id returning id',
      [hold.id, event.id, buyerId, hold.seats, totalCents, event.currency, charge.id],
    );
    await tx.none("update holds set status = 'paid', order_id = $1 where id = $2", [row.id, hold.id]);
    return row;
  });
  mailer.sendReceipt({ buyerId, orderId: order.id, title: event.title, totalCents }).catch((err) => logger.warn({ err, orderId: order.id }, 'receipt failed'));
  return { orderId: order.id };
}
