// Invoice exports for signed-in users: list, create, download and delete.
import { createReadStream } from 'node:fs';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { sendJson } from './http.mjs';
import { displayName } from './names.mjs';

const SORTS = new Map([['created', 'created_at'], ['size', 'size_bytes'], ['title', 'title']]);
const DIRECTIONS = new Set(['asc', 'desc']);
const AFTER_DELETE = new Set(['/exports', '/settings/exports']);

// GET /exports?sort=created&dir=desc
export async function listExports(req, res, { db, session, logger }) {
  const url = new URL(req.url, 'http://localhost');
  const column = SORTS.get(url.searchParams.get('sort')) ?? 'created_at';
  const direction = DIRECTIONS.has(url.searchParams.get('dir')) ? url.searchParams.get('dir') : 'desc';
  const { rows } = await db.query(
    `select id, title, visibility, size_bytes, created_at from exports
     where account_id = $1 and (visibility = 'account' or created_by = $2)
     order by ${column} ${direction} limit 100`,
    [session.accountId, session.userId],
  );
  logger.info({ req, count: rows.length }, 'exports listed');
  sendJson(res, 200, { exports: rows });
}

// POST /exports { title, visibility }
export async function createExport(req, res, { db, session, config, body }) {
  const title = displayName(body.title ?? 'Invoices');
  const visibility = body.visibility === 'account' ? 'account' : 'private';
  const { rows: invoices } = await db.query(
    'select number, issued_on, total_cents, status from invoices where account_id = $1 order by issued_on',
    [session.accountId],
  );
  const csv = ['number,issued_on,total_cents,status']
    .concat(invoices.map((i) => [i.number, i.issued_on.toISOString().slice(0, 10), i.total_cents, i.status].join(',')))
    .join('\n');
  const id = await db.nextId('exports_id_seq');
  const fileName = `${id}-${title}.csv`;
  const dir = join(config.exportRoot, String(session.accountId));
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, fileName), csv);
  await db.query(
    'insert into exports (id, account_id, created_by, visibility, title, file_name, size_bytes) values ($1, $2, $3, $4, $5, $6, $7)',
    [id, session.accountId, session.userId, visibility, title, fileName, Buffer.byteLength(csv)],
  );
  sendJson(res, 201, { id });
}

// GET /exports/:id/download
export async function downloadExport(req, res, { db, session, config, logger, params }) {
  const { rows: [row] } = await db.query(
    'select id, file_name from exports where id = $1 and account_id = $2',
    [params.id, session.accountId],
  );
  if (!row) return sendJson(res, 404, { error: 'Not found' });
  const path = join(config.exportRoot, String(session.accountId), row.file_name);
  try {
    const info = await stat(path);
    res.writeHead(200, { 'content-type': 'text/csv', 'content-length': info.size, 'content-disposition': `attachment; filename="export-${row.id}.csv"` });
    createReadStream(path).on('error', () => res.destroy()).pipe(res);
  } catch (err) {
    logger.error({ err, exportId: row.id, headers: req.headers }, 'export file missing');
    sendJson(res, 404, { error: 'Not found' });
  }
}

// POST /exports/:id/delete?next=/exports (form post from the exports page)
export async function deleteExport(req, res, { db, session, params }) {
  await db.query(
    "delete from exports where id = $1 and account_id = $2 and (created_by = $3 or $4 = 'owner')",
    [params.id, session.accountId, session.userId, session.role],
  );
  const next = new URL(req.url, 'http://localhost').searchParams.get('next');
  res.writeHead(303, { location: AFTER_DELETE.has(next) ? next : '/exports' });
  res.end();
}
