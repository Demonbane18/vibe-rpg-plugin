// db is a pg-compatible client; authorize returns a project the user owns.
// db runs with the server role, so the handler must scope its own queries.
export async function receipts(request, { db, authorize, logger, serviceToken }) {
  const projectId = await authorize(request);
  const query = new URL(request.url).searchParams.get('q') ?? '';
  const sql = "select id, memo from public.receipts where project_id = $1 and memo ilike '%" + query + "%' order by created_at desc limit 50";
  try {
    const rows = await db.query(sql, [projectId]);
    return Response.json({ receipts: rows.rows });
  } catch {
    logger.error({ serviceToken, projectId }, 'receipt lookup failed');
    return Response.json({ error: 'Lookup failed' }, { status: 500 });
  }
}
