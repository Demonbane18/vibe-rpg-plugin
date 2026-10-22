import { VERSION } from './version.mjs';

export class TidepoolError extends Error {
  constructor(message, { status, requestId } = {}) {
    super(requestId ? `${message} (request ${requestId})` : message);
    this.status = status;
    this.requestId = requestId;
  }
}

export function createClient({ baseUrl = 'https://api.tidepool.example', token, timeout = 30_000, retryDelay = 250, signal } = {}) {
  async function request(path, init = {}) {
    const response = await fetch(new URL(path, baseUrl), {
      ...init,
      signal: AbortSignal.any([AbortSignal.timeout(timeout), ...(signal ? [signal] : [])]),
      headers: { authorization: `Bearer ${token}`, 'user-agent': `tidepool-js/${VERSION}`, ...init.headers },
    });
    if (!response.ok) throw new TidepoolError(`Tidepool API returned ${response.status}`, { status: response.status, requestId: response.headers.get('x-request-id') });
    return response.json();
  }

  async function* listAll(path) {
    let cursor;
    do {
      const page = await request(cursor ? `${path}?cursor=${encodeURIComponent(cursor)}` : path);
      yield* page.items;
      cursor = page.next_cursor || undefined;
    } while (cursor);
  }

  const getStation = (id) => request(`/stations/${encodeURIComponent(id)}`);

  return { request, listAll, getStation, retryDelay };
}
