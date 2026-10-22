// Share links: a signed URL that lets anyone with the link download one export for a week.
import { createHmac, timingSafeEqual } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { sendJson } from './http.mjs';

const SHARE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const nowSeconds = () => Math.floor(Date.now() / 1000);

function sign(secret, exportId, expires) {
  return createHmac('sha256', secret).update(`${exportId}.${expires}`).digest('hex');
}

// POST /exports/:id/share
export async function createShare(req, res, { db, session, config, params }) {
  const { rows: [row] } = await db.query(
    "select id from exports where id = $1 and account_id = $2 and (visibility = 'account' or created_by = $3)",
    [params.id, session.accountId, session.userId],
  );
  if (!row) return sendJson(res, 404, { error: 'Not found' });
  const expires = Date.now() + SHARE_TTL_MS;
  const sig = sign(config.shareSecret, row.id, expires);
  sendJson(res, 201, { url: `${config.appOrigin}/s/${row.id}?expires=${expires}&sig=${sig}` });
}

// GET /s/:id?expires=...&sig=... No session: the signature is the credential.
export async function openShare(req, res, { db, config, params }) {
  const url = new URL(req.url, 'http://localhost');
  const expires = Number(url.searchParams.get('expires'));
  const given = Buffer.from(url.searchParams.get('sig') ?? '', 'hex');
  const wanted = Buffer.from(sign(config.shareSecret, params.id, expires), 'hex');
  if (given.length !== wanted.length || !timingSafeEqual(given, wanted)) return sendJson(res, 403, { error: 'Invalid link' });
  if (expires < nowSeconds()) return sendJson(res, 410, { error: 'This link has expired' });
  const { rows: [row] } = await db.query('select id, account_id, file_name from exports where id = $1', [params.id]);
  if (!row) return sendJson(res, 404, { error: 'Not found' });
  res.writeHead(200, { 'content-type': 'text/csv', 'content-disposition': `attachment; filename="export-${row.id}.csv"` });
  createReadStream(join(config.exportRoot, String(row.account_id), row.file_name)).on('error', () => res.destroy()).pipe(res);
}
