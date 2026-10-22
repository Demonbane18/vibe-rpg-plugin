import { AppError, invalid } from './errors.mjs';
import { routes } from './routes.mjs';
import { createService } from './service.mjs';
import { createStore } from './store.mjs';

function matchPath(pattern, pathname) {
  const want = pattern.split('/').filter(Boolean);
  const got = pathname.split('/').filter(Boolean);
  if (want.length !== got.length) return null;
  const params = {};
  for (let i = 0; i < want.length; i++) {
    if (want[i].startsWith(':')) params[want[i].slice(1)] = decodeURIComponent(got[i]);
    else if (want[i] !== got[i]) return null;
  }
  return params;
}

// handle({ method, url, body }) takes the raw request (body is the JSON text, if any)
// and resolves to { status, body } where body is a plain object.
export function createApp({ store = createStore() } = {}) {
  const table = routes(createService(store));

  async function handle({ method = 'GET', url, body } = {}) {
    try {
      const { pathname, searchParams } = new URL(url, 'http://localhost');
      const matches = table.flatMap((route) => {
        const params = matchPath(route.path, pathname);
        return params ? [{ route, params }] : [];
      });
      if (matches.length === 0) throw new AppError(404, 'not_found', 'route not found');
      const hit = matches.find((match) => match.route.method === method);
      if (!hit) throw new AppError(405, 'method_not_allowed', `${method} is not allowed here`);

      let parsed = {};
      if (method !== 'GET' && body !== undefined && body !== '') {
        try {
          parsed = JSON.parse(body);
        } catch {
          throw new AppError(400, 'invalid_json', 'body must be valid JSON');
        }
        if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) throw invalid(undefined, 'body must be a JSON object');
      }
      return await hit.route.handler({ params: hit.params, query: searchParams, body: parsed });
    } catch (error) {
      if (!(error instanceof AppError)) return { status: 500, body: { error: { code: 'internal', message: 'internal error' } } };
      const payload = { code: error.code, message: error.message };
      if (error.field) payload.field = error.field;
      return { status: error.status, body: { error: payload } };
    }
  }

  return { handle };
}
