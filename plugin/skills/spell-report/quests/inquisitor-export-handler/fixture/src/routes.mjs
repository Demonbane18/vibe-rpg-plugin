// Route table, served by every Quillstone API instance (public web and ops alike).
// Handlers get ctx = { db, logger, config, params, body, rawBody }. requireSession rejects requests without a valid
// session cookie (HttpOnly, SameSite=Lax) and cross-origin POSTs, then adds ctx.session = { userId, accountId, role },
// where role is 'owner' or 'member'.
import { createExport, deleteExport, downloadExport, listExports } from './exports.mjs';
import { billingWebhook, reindex } from './hooks.mjs';
import { getProfile, updateProfile } from './profile.mjs';
import { requireSession } from './session.mjs';
import { createShare, openShare } from './shares.mjs';

export const routes = [
  ['GET', '/profile', requireSession(getProfile)],
  ['POST', '/profile', requireSession(updateProfile)],
  ['GET', '/exports', requireSession(listExports)],
  ['POST', '/exports', requireSession(createExport)],
  ['GET', '/exports/:id/download', requireSession(downloadExport)],
  ['POST', '/exports/:id/delete', requireSession(deleteExport)],
  ['POST', '/exports/:id/share', requireSession(createShare)],
  ['GET', '/s/:id', openShare],
  ['POST', '/webhooks/billing', billingWebhook],
  ['POST', '/admin/reindex', reindex],
];
