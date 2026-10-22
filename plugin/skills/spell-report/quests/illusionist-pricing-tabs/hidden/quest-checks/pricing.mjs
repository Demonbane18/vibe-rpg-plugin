// Shared lookups for the pricing quest checks.
import { fileURLToPath } from 'node:url';
import { loadPage, elements, attr, ancestors, clean, text, byId } from './lib.mjs';

export const dir = fileURLToPath(new URL('..', import.meta.url));
export const page = loadPage(dir);
export const all = elements(page.doc);
export const PLANS = ['Starter', 'Team', 'Business'];

/** The monthly panel, or the whole document when the switcher is missing. */
export function monthlyPanel() {
  const tab = all.find((el) => attr(el, 'role') === 'tab' && /monthly/i.test(text(el)));
  return (tab && byId(page.doc, (attr(tab, 'aria-controls') ?? '').trim())) ?? page.doc;
}

/** Plan cards in the monthly panel: { container, cards: [{ name, heading, card }] } or null. */
export function planCards() {
  const scope = monthlyPanel();
  const headings = PLANS.map((name) => elements(scope).find((el) => /^h[2-6]$/.test(el.tag) && new RegExp(`^${name}\\b`, 'i').test(clean(text(el)))));
  if (headings.some((h) => !h)) return null;
  const chains = headings.map((h) => [h, ...ancestors(h)]);
  const container = chains[0].find((a) => a !== headings[0] && chains.every((c) => c.includes(a)));
  if (!container) return null;
  const cards = headings.map((heading, i) => ({ name: PLANS[i], heading, card: chains[i][chains[i].indexOf(container) - 1] }));
  if (new Set(cards.map((c) => c.card)).size !== 3) return null;
  return { container, cards };
}
