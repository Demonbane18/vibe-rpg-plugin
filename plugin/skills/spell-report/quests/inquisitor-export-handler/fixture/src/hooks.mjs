// Billing provider webhook and the ops reindex hook.
import { execFile } from 'node:child_process';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { sendJson } from './http.mjs';

function safeEqual(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

// POST /webhooks/billing. The provider signs `${timestamp}.${body}` with the shared secret; timestamps are in seconds.
export async function billingWebhook(req, res, { db, config, rawBody }) {
  const timestamp = Number(req.headers['x-billing-timestamp']);
  if (!Number.isInteger(timestamp) || Math.abs(nowSeconds() - timestamp) > 300) return sendJson(res, 400, { error: 'Stale request' });
  const expected = createHmac('sha256', config.billingWebhookSecret).update(`${timestamp}.${rawBody}`).digest('hex');
  if (!safeEqual(String(req.headers['x-billing-signature'] ?? ''), expected)) return sendJson(res, 401, { error: 'Bad signature' });
  const event = JSON.parse(rawBody);
  await db.tx(async (tx) => {
    const { rowCount } = await tx.query('insert into billing_events (id) values ($1) on conflict do nothing', [event.id]);
    if (rowCount === 1 && event.type === 'plan.changed') {
      await tx.query('update accounts set plan = $1 where billing_customer_id = $2', [event.plan, event.customerId]);
    }
  });
  sendJson(res, 204);
}

// POST /admin/reindex?account=41. Ops use this to rebuild one account's search index.
export async function reindex(req, res, { config, logger }) {
  const token = String(req.headers.authorization ?? '').replace(/^Bearer /, '');
  if (!safeEqual(token, config.adminToken ?? '')) return sendJson(res, 403, { error: 'Forbidden' });
  const account = new URL(req.url, 'http://localhost').searchParams.get('account') ?? '';
  if (!/^\d+$/.test(account)) return sendJson(res, 400, { error: 'account must be numeric' });
  logger.info({ account }, 'reindex requested');
  execFile('quill-index', ['--account', account], { timeout: 10 * 60_000 }, (err) => {
    if (err) logger.error({ err, account }, 'reindex failed');
  });
  sendJson(res, 202, { status: 'started' });
}

function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}
