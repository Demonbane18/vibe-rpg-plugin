// Grader helpers for Illusionist quests: a small HTML parser, CSS parser, selector matcher, cascade, value math,
// colour contrast and a rough width model. Node built-ins only. No browser exists while grading.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, normalize } from 'node:path';

// ---------- HTML ----------
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const RAW = new Set(['script', 'style', 'textarea', 'title']);
const AUTO_CLOSE = { li: ['li'], option: ['option'], dt: ['dt', 'dd'], dd: ['dt', 'dd'], tr: ['tr', 'td', 'th'], td: ['td', 'th'], th: ['td', 'th'] };
const BLOCKS = new Set(['address', 'article', 'aside', 'blockquote', 'details', 'div', 'dl', 'fieldset', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'main', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'ul']);
const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0', times: '\u00d7', middot: '\u00b7', mdash: '\u2014', ndash: '\u2013', hellip: '\u2026', copy: '\u00a9', rarr: '\u2192', larr: '\u2190', check: '\u2713' };
export function decode(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (all, code) => {
    if (code[0] === '#') return String.fromCodePoint(code[1] === 'x' || code[1] === 'X' ? parseInt(code.slice(2), 16) : Number(code.slice(1)));
    return ENTITIES[code.toLowerCase()] ?? all;
  });
}

export function parseHTML(html) {
  const root = { type: 'element', tag: '#document', attrs: {}, children: [], parent: null };
  const stack = [root];
  const top = () => stack[stack.length - 1];
  let i = 0;
  const addText = (text) => { if (text) top().children.push({ type: 'text', text: decode(text), parent: top() }); };
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt < 0) { addText(html.slice(i)); break; }
    addText(html.slice(i, lt));
    if (html.startsWith('<!--', lt)) { const end = html.indexOf('-->', lt + 4); i = end < 0 ? html.length : end + 3; continue; }
    if (html[lt + 1] === '!' || html[lt + 1] === '?') { const end = html.indexOf('>', lt); i = end < 0 ? html.length : end + 1; continue; }
    if (html[lt + 1] === '/') {
      const end = html.indexOf('>', lt); const tag = html.slice(lt + 2, end < 0 ? html.length : end).trim().toLowerCase();
      i = end < 0 ? html.length : end + 1;
      for (let s = stack.length - 1; s > 0; s--) if (stack[s].tag === tag) { stack.length = s; break; }
      continue;
    }
    const m = /^<([a-zA-Z][a-zA-Z0-9-]*)/.exec(html.slice(lt, lt + 64));
    if (!m) { addText('<'); i = lt + 1; continue; }
    const tag = m[1].toLowerCase();
    let j = lt + m[0].length; const attrs = {};
    let selfClose = false;
    while (j < html.length) {
      while (/\s/.test(html[j])) j++;
      if (html[j] === '>') { j++; break; }
      if (html[j] === '/' && html[j + 1] === '>') { selfClose = true; j += 2; break; }
      if (html[j] === '/') { j++; continue; }
      const nm = /^[^\s=>\/]+/.exec(html.slice(j, j + 200));
      if (!nm) { j++; continue; }
      const name = nm[0].toLowerCase(); j += nm[0].length;
      while (/\s/.test(html[j])) j++;
      let value = '';
      if (html[j] === '=') {
        j++; while (/\s/.test(html[j])) j++;
        const q = html[j];
        if (q === '"' || q === "'") { const end = html.indexOf(q, j + 1); value = html.slice(j + 1, end < 0 ? html.length : end); j = end < 0 ? html.length : end + 1; }
        else { const v = /^[^\s>]+/.exec(html.slice(j)); value = v ? v[0] : ''; j += value.length; }
      }
      if (!(name in attrs)) attrs[name] = decode(value);
    }
    const closes = AUTO_CLOSE[tag] ?? (BLOCKS.has(tag) ? ['p'] : []);
    if (closes.length) {
      // close an open p/li/... sibling, stopping at the nearest list or table container
      for (let s = stack.length - 1; s > 0; s--) {
        if (closes.includes(stack[s].tag)) { stack.length = s; break; }
        if (['ul', 'ol', 'table', 'tbody', 'thead', 'select', 'dl', 'div', 'section', 'article', 'form', 'body'].includes(stack[s].tag)) break;
      }
    }
    const el = { type: 'element', tag, attrs, children: [], parent: top() };
    top().children.push(el);
    i = j;
    if (RAW.has(tag) && !selfClose) {
      const end = html.toLowerCase().indexOf(`</${tag}`, i);
      const raw = html.slice(i, end < 0 ? html.length : end);
      if (raw) el.children.push({ type: 'text', text: tag === 'textarea' || tag === 'title' ? decode(raw) : raw, parent: el });
      const close = end < 0 ? html.length : html.indexOf('>', end);
      i = close < 0 ? html.length : close + 1;
      continue;
    }
    if (!VOID.has(tag) && !selfClose) stack.push(el);
  }
  return root;
}

export const elements = (node) => { const out = []; const walk = (n) => { for (const c of n.children) if (c.type === 'element') { out.push(c); walk(c); } }; walk(node); return out; };
export const childElements = (el) => el.children.filter((c) => c.type === 'element');
export const attr = (el, name) => (el.attrs[name] === undefined ? null : el.attrs[name]);
export const has = (el, name) => el.attrs[name] !== undefined;
export function text(node) {
  if (node.type === 'text') return node.text;
  if (['script', 'style', 'template'].includes(node.tag)) return '';
  return node.children.map(text).join('');
}
export const clean = (s) => s.replace(/\s+/g, ' ').trim();
export function byId(doc, id) { return elements(doc).find((el) => el.attrs.id === id) ?? null; }
export function ancestors(el) { const out = []; for (let p = el.parent; p && p.tag !== '#document'; p = p.parent) out.push(p); return out; }

/** Accessible name of a form control or button, roughly per accname: aria-labelledby, aria-label, label, title. */
export function accessibleName(doc, el) {
  const ids = (attr(el, 'aria-labelledby') ?? '').split(/\s+/).filter(Boolean);
  if (ids.length) { const names = ids.map((id) => byId(doc, id)).filter(Boolean).map((n) => clean(text(n))); if (names.join('')) return names.join(' '); }
  if (attr(el, 'aria-label')?.trim()) return attr(el, 'aria-label').trim();
  const lbl = labelsFor(doc, el).map((l) => clean(text(l))).join(' ').trim();
  if (lbl) return lbl;
  if (['button', 'a', 'summary', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'legend'].includes(el.tag) || ['tab', 'button', 'link'].includes(attr(el, 'role'))) {
    const t = clean(nameFromContent(el)); if (t) return t;
  }
  if (el.tag === 'input' && ['submit', 'button', 'reset'].includes((attr(el, 'type') ?? '').toLowerCase())) return attr(el, 'value') ?? '';
  return (attr(el, 'title') ?? '').trim();
}
function nameFromContent(node) {
  if (node.type === 'text') return node.text;
  if (attr(node, 'aria-hidden') === 'true' || has(node, 'hidden')) return '';
  if (node.tag === 'img') return attr(node, 'alt') ?? '';
  if (node.tag === 'svg') { const t = node.children.find((c) => c.tag === 'title'); return attr(node, 'aria-label') ?? (t ? text(t) : ''); }
  if (['script', 'style'].includes(node.tag)) return '';
  if (attr(node, 'aria-label')) return attr(node, 'aria-label');
  return node.children.map(nameFromContent).join(' ');
}
export function labelsFor(doc, el) {
  const out = [];
  if (el.attrs.id) for (const l of elements(doc)) if (l.tag === 'label' && attr(l, 'for') === el.attrs.id) out.push(l);
  const wrap = ancestors(el).find((a) => a.tag === 'label');
  if (wrap && !out.includes(wrap) && (!has(wrap, 'for') || attr(wrap, 'for') === el.attrs.id)) out.push(wrap);
  return out;
}

// ---------- CSS parsing ----------
function stripComments(css) { return css.replace(/\/\*[\s\S]*?\*\//g, ''); }
/** Split on a separator at depth 0, ignoring strings and brackets. */
export function splitTop(s, sep) {
  const out = []; let depth = 0, quote = null, cur = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (quote) { cur += c; if (c === '\\') { cur += s[++i] ?? ''; } else if (c === quote) quote = null; continue; }
    if (c === '"' || c === "'") { quote = c; cur += c; continue; }
    if (c === '(' || c === '[') depth++;
    if (c === ')' || c === ']') depth--;
    if (depth === 0 && (sep === ' ' ? /\s/.test(c) : c === sep)) { if (sep !== ' ' || cur) out.push(cur); cur = ''; continue; }
    cur += c;
  }
  if (sep !== ' ' || cur) out.push(cur);
  return out;
}
/** Parse a block body into items: { decl: [name, value, important] } or { prelude, body } for nested blocks. */
function parseBlock(css) {
  const items = []; let i = 0;
  while (i < css.length) {
    let depth = 0, quote = null, j = i;
    for (; j < css.length; j++) {
      const c = css[j];
      if (quote) { if (c === '\\') j++; else if (c === quote) quote = null; continue; }
      if (c === '"' || c === "'") { quote = c; continue; }
      if (c === '(') depth++; else if (c === ')') depth--;
      else if (depth === 0 && (c === ';' || c === '{' || c === '}')) break;
    }
    const head = css.slice(i, j).trim();
    if (j >= css.length || css[j] === ';' || css[j] === '}') {
      if (head.startsWith('@')) items.push({ prelude: head, body: null });
      else if (head.includes(':')) {
        const k = head.indexOf(':'); let name = head.slice(0, k).trim(); let value = head.slice(k + 1).trim();
        const important = /!\s*important\s*$/i.test(value); if (important) value = value.replace(/!\s*important\s*$/i, '').trim();
        if (!name.startsWith('--')) name = name.toLowerCase();
        items.push({ decl: [name, value, important] });
      }
      i = j + 1; continue;
    }
    // '{': find the matching '}'
    let d = 1, k = j + 1; quote = null;
    for (; k < css.length && d > 0; k++) {
      const c = css[k];
      if (quote) { if (c === '\\') k++; else if (c === quote) quote = null; continue; }
      if (c === '"' || c === "'") quote = c; else if (c === '{') d++; else if (c === '}') d--;
    }
    items.push({ prelude: head, body: css.slice(j + 1, k - 1) });
    i = k;
  }
  return items;
}
/**
 * Flatten a stylesheet into rules: { selectors: [{ text, spec, pseudoEl }], decls, media: [conditions], layer, order }.
 * @supports and @container are treated as matching; @keyframes and @font-face are skipped.
 */
export function parseCSS(css, sheetIndex = 0) {
  const rules = []; let order = sheetIndex * 1e6;
  const layerNames = [];
  const visit = (body, media, layer, parentSelectors) => {
    const decls = [];
    for (const item of parseBlock(body)) {
      if (item.decl) { decls.push(item.decl); continue; }
      const prelude = item.prelude;
      if (prelude.startsWith('@')) {
        const name = /^@([\w-]+)/.exec(prelude)?.[1]?.toLowerCase();
        const rest = prelude.slice(name.length + 1).trim();
        if (name === 'media' && item.body !== null) visit(item.body, [...media, rest], layer, parentSelectors);
        else if ((name === 'supports' || name === 'container' || name === 'scope') && item.body !== null) visit(item.body, media, layer, parentSelectors);
        else if (name === 'layer') {
          const names = rest ? splitTop(rest, ',').map((s) => s.trim()) : [`anon${layerNames.length}`];
          for (const n of names) if (!layerNames.includes(n)) layerNames.push(n);
          if (item.body !== null) visit(item.body, media, names[0], parentSelectors);
        }
        continue;
      }
      if (item.body === null) continue;
      const own = splitTop(prelude, ',').map((s) => s.trim()).filter(Boolean);
      const selectors = parentSelectors ? parentSelectors.flatMap((p) => own.map((c) => (c.includes('&') ? c.replaceAll('&', p) : `${p} ${c}`))) : own;
      visit(item.body, media, layer, selectors);
    }
    if (parentSelectors && decls.length) {
      rules.push({ selectors: parentSelectors.map(compileSelector).filter(Boolean), decls, media, layer, order: order++ });
    }
  };
  visit(stripComments(css), [], null, null);
  for (const r of rules) r.layerRank = r.layer === null ? Infinity : layerNames.indexOf(r.layer);
  return rules;
}
export function collectCSS(dir, doc) {
  const sheets = [];
  for (const el of elements(doc)) {
    if (el.tag === 'style') sheets.push(text(el));
    if (el.tag === 'link' && /\bstylesheet\b/i.test(attr(el, 'rel') ?? '') && attr(el, 'href') && !/^(?:[a-z]+:)?\/\//i.test(attr(el, 'href'))) {
      const path = join(dir, normalize(attr(el, 'href').split(/[?#]/)[0]));
      if (existsSync(path)) sheets.push(resolveImports(readFileSync(path, 'utf8'), dirname(path), 0));
    }
  }
  return sheets;
}
function resolveImports(css, dir, depth) {
  return css.replace(/@import\s+(?:url\()?\s*["']?([^"')\s;]+)["']?\s*\)?[^;]*;/gi, (all, href) => {
    const path = join(dir, href); return depth < 3 && existsSync(path) ? resolveImports(readFileSync(path, 'utf8'), dirname(path), depth + 1) : '';
  });
}

// ---------- media queries ----------
export function mediaMatches(query, ctx) {
  return splitTop(query, ',').some((q) => {
    q = q.trim().toLowerCase(); if (!q) return true;
    let negate = false;
    if (q.startsWith('not ')) { negate = true; q = q.slice(4).trim(); }
    if (q.startsWith('only ')) q = q.slice(5).trim();
    const parts = q.split(/\s+and\s+/);
    let ok = true;
    for (const p of parts) {
      const t = p.trim();
      if (!t) continue;
      if (!t.startsWith('(')) { if (t === 'print' || t === 'speech') ok = false; continue; }
      ok = ok && featureMatches(t, ctx);
    }
    return negate ? !ok : ok;
  });
}
function mqLength(v) { const m = /^(-?[\d.]+)(px|em|rem)?$/.exec(v.trim()); if (!m) return NaN; return Number(m[1]) * (m[2] === 'em' || m[2] === 'rem' ? 16 : 1); }
function featureMatches(t, ctx) {
  const inner = t.replace(/^\(|\)$/g, '').trim();
  if (inner.startsWith('(') || / or /.test(inner)) {
    // nested: (a) or (b) / not (a)
    if (/^not\s/.test(inner)) return !featureMatches(inner.slice(4).trim(), ctx);
    return splitTop(inner.replace(/\)\s*or\s*\(/g, ')|('), '|').some((x) => featureMatches(x.trim(), ctx));
  }
  const range = /^(?:([\d.]+(?:px|em|rem)?)\s*(<=|<|>=|>)\s*)?(width|height)\s*(?:(<=|<|>=|>)\s*([\d.]+(?:px|em|rem)?))?$/.exec(inner);
  if (range && (range[2] || range[4])) {
    const val = range[3] === 'width' ? ctx.width : ctx.height ?? 800;
    const cmp = (a, op, b) => (op === '<' ? a < b : op === '<=' ? a <= b : op === '>' ? a > b : a >= b);
    let ok = true;
    if (range[2]) ok = ok && cmp(mqLength(range[1]), range[2], val);
    if (range[4]) ok = ok && cmp(val, range[4], mqLength(range[5]));
    return ok;
  }
  const [name, value = ''] = inner.split(':').map((s) => s.trim());
  const height = ctx.height ?? 800;
  switch (name) {
    case 'min-width': return ctx.width >= mqLength(value);
    case 'max-width': return ctx.width <= mqLength(value);
    case 'width': return ctx.width === mqLength(value);
    case 'min-height': return height >= mqLength(value);
    case 'max-height': return height <= mqLength(value);
    case 'prefers-reduced-motion': return value ? value === (ctx.reducedMotion ? 'reduce' : 'no-preference') : !!ctx.reducedMotion;
    case 'prefers-color-scheme': return value === (ctx.dark ? 'dark' : 'light');
    case 'hover': case 'any-hover': return value ? value === (ctx.width < 700 ? 'none' : 'hover') : ctx.width >= 700;
    case 'pointer': case 'any-pointer': return value ? value === (ctx.width < 700 ? 'coarse' : 'fine') : true;
    case 'orientation': return value === (ctx.width > height ? 'landscape' : 'portrait');
    case 'color': return true;
    case 'forced-colors': return value ? value === (ctx.forcedColors ? 'active' : 'none') : !!ctx.forcedColors;
    case 'prefers-contrast': return value ? value === (ctx.forcedColors ? 'more' : 'no-preference') : !!ctx.forcedColors;
    default: return false;
  }
}

// ---------- selectors ----------
function tokenizeSelector(sel) {
  // returns list of { combinator, compound } from left to right
  const out = []; let i = 0; let comb = null;
  const s = sel.trim();
  while (i < s.length) {
    if (/\s/.test(s[i])) { i++; if (comb === null && out.length) comb = ' '; continue; }
    if ('>+~'.includes(s[i])) { comb = s[i]; i++; continue; }
    let j = i, depth = 0, quote = null;
    for (; j < s.length; j++) {
      const c = s[j];
      if (quote) { if (c === '\\') j++; else if (c === quote) quote = null; continue; }
      if (c === '"' || c === "'") { quote = c; continue; }
      if (c === '(' || c === '[') depth++; else if (c === ')' || c === ']') depth--;
      else if (depth === 0 && (/\s/.test(c) || '>+~'.includes(c))) break;
    }
    out.push({ combinator: out.length ? comb ?? ' ' : null, compound: parseCompound(s.slice(i, j)) });
    comb = null; i = j;
  }
  return out;
}
function parseCompound(src) {
  const parts = []; let i = 0;
  const ident = () => { const m = /^(?:\\.|[\w-]|[^\x00-\x7f])+/.exec(src.slice(i)); const v = m ? m[0] : ''; i += v.length; return v.replace(/\\(.)/g, '$1'); };
  while (i < src.length) {
    const c = src[i];
    if (c === '*') { i++; parts.push({ k: 'any' }); }
    else if (c === '#') { i++; parts.push({ k: 'id', v: ident() }); }
    else if (c === '.') { i++; parts.push({ k: 'class', v: ident() }); }
    else if (c === '[') {
      let depth = 1, j = i + 1, quote = null;
      for (; j < src.length && depth; j++) { const d = src[j]; if (quote) { if (d === quote) quote = null; continue; } if (d === '"' || d === "'") quote = d; else if (d === '[') depth++; else if (d === ']') depth--; }
      const inner = src.slice(i + 1, j - 1); i = j;
      const m = /^\s*([\w-:|]+)\s*(?:([~|^$*]?=)\s*(?:"([^"]*)"|'([^']*)'|([^\s\]]+))\s*([is])?)?\s*$/i.exec(inner);
      if (m) parts.push({ k: 'attr', name: m[1].toLowerCase(), op: m[2] ?? null, v: m[3] ?? m[4] ?? m[5] ?? '', ci: !!m[6] });
      else parts.push({ k: 'never' });
    } else if (c === ':') {
      const el = src[i + 1] === ':'; i += el ? 2 : 1;
      const name = ident().toLowerCase(); let arg = null;
      if (src[i] === '(') {
        let depth = 1, j = i + 1; for (; j < src.length && depth; j++) { if (src[j] === '(') depth++; else if (src[j] === ')') depth--; }
        arg = src.slice(i + 1, j - 1); i = j;
      }
      if (el || ['before', 'after', 'first-line', 'first-letter'].includes(name) && !el) parts.push({ k: 'pseudoEl', v: name });
      else parts.push({ k: 'pseudo', v: name, arg, list: ['not', 'is', 'where', 'matches', 'has'].includes(name) ? splitTop(arg ?? '', ',').map((x) => x.trim()) : null });
    } else if (/[\w-]/.test(c)) parts.push({ k: 'tag', v: ident().toLowerCase() });
    else i++;
  }
  return parts;
}
function specOf(tokens) {
  let a = 0, b = 0, c = 0;
  for (const { compound } of tokens) for (const p of compound) {
    if (p.k === 'id') a++;
    else if (p.k === 'class' || p.k === 'attr') b++;
    else if (p.k === 'tag' || p.k === 'pseudoEl') c++;
    else if (p.k === 'pseudo') {
      if (p.v === 'where') continue;
      if (p.list) { const best = p.list.map((s) => specOf(tokenizeSelector(s.replace(/^[>+~]\s*/, '')))).reduce((x, y) => (cmpSpec(x, y) >= 0 ? x : y), [0, 0, 0]); a += best[0]; b += best[1]; c += best[2]; }
      else b++;
    }
  }
  return [a, b, c];
}
const cmpSpec = (x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
const compiled = new Map();
export function compileSelector(text) {
  if (compiled.has(text)) return compiled.get(text);
  let out = null;
  try {
    const tokens = tokenizeSelector(text);
    if (tokens.length) {
      const last = tokens[tokens.length - 1].compound;
      const pseudoEl = last.find((p) => p.k === 'pseudoEl')?.v ?? null;
      out = { text, tokens, spec: specOf(tokens), pseudoEl };
    }
  } catch { out = null; }
  compiled.set(text, out);
  return out;
}
const STATE_PSEUDOS = new Set(['hover', 'active', 'visited', 'target', 'focus', 'focus-visible', 'focus-within', 'placeholder-shown', 'autofill', '-webkit-autofill', 'invalid', 'user-invalid', 'indeterminate', 'open', 'popover-open', 'modal', 'fullscreen', 'defined']);
function siblingsOf(el) { return el.parent ? childElements(el.parent) : [el]; }
function nth(arg, index) {
  const a = (arg ?? '').trim().toLowerCase().split(/\s+of\s+/)[0];
  if (a === 'odd') return index % 2 === 1;
  if (a === 'even') return index % 2 === 0;
  const m = /^([+-]?\d*)n\s*(?:([+-])\s*(\d+))?$/.exec(a.replace(/\s+/g, ''));
  if (!m) return Number(a) === index;
  const step = m[1] === '' || m[1] === '+' ? 1 : m[1] === '-' ? -1 : Number(m[1]);
  const off = m[3] ? Number(m[2] + m[3]) : 0;
  if (step === 0) return index === off;
  return (index - off) / step >= 0 && Number.isInteger((index - off) / step);
}
function matchCompound(el, compound, ctx) {
  for (const p of compound) {
    switch (p.k) {
      case 'any': break;
      case 'pseudoEl': break;
      case 'never': return false;
      case 'tag': if (el.tag !== p.v) return false; break;
      case 'id': if (el.attrs.id !== p.v) return false; break;
      case 'class': if (!(el.attrs.class ?? '').split(/\s+/).includes(p.v)) return false; break;
      case 'attr': {
        const raw = el.attrs[p.name]; if (raw === undefined) return false; if (!p.op) break;
        const v = p.ci ? raw.toLowerCase() : raw, w = p.ci ? p.v.toLowerCase() : p.v;
        const ok = p.op === '=' ? v === w : p.op === '~=' ? v.split(/\s+/).includes(w) : p.op === '|=' ? v === w || v.startsWith(`${w}-`) : p.op === '^=' ? w !== '' && v.startsWith(w) : p.op === '$=' ? w !== '' && v.endsWith(w) : w !== '' && v.includes(w);
        if (!ok) return false; break;
      }
      case 'pseudo': {
        const sibs = siblingsOf(el), idx = sibs.indexOf(el) + 1;
        const ofType = sibs.filter((s) => s.tag === el.tag), tIdx = ofType.indexOf(el) + 1;
        const v = p.v;
        if (v === 'not') { if (p.list.some((s) => matches(el, s, ctx))) return false; break; }
        if (v === 'is' || v === 'where' || v === 'matches') { if (!p.list.some((s) => matches(el, s, ctx))) return false; break; }
        if (v === 'has') { if (!p.list.some((s) => hasRelative(el, s, ctx))) return false; break; }
        if (v === 'root') { if (el.tag !== 'html') return false; break; }
        if (v === 'scope') { if (ctx.scopeEl ? el !== ctx.scopeEl : el.tag !== 'html') return false; break; }
        if (v === 'first-child') { if (idx !== 1) return false; break; }
        if (v === 'last-child') { if (idx !== sibs.length) return false; break; }
        if (v === 'only-child') { if (sibs.length !== 1) return false; break; }
        if (v === 'nth-child') { if (!nth(p.arg, idx)) return false; break; }
        if (v === 'nth-last-child') { if (!nth(p.arg, sibs.length - idx + 1)) return false; break; }
        if (v === 'first-of-type') { if (tIdx !== 1) return false; break; }
        if (v === 'last-of-type') { if (tIdx !== ofType.length) return false; break; }
        if (v === 'nth-of-type') { if (!nth(p.arg, tIdx)) return false; break; }
        if (v === 'empty') { if (el.children.some((c) => c.type === 'element' || c.text.trim())) return false; break; }
        if (v === 'link' || v === 'any-link') { if (!(['a', 'area'].includes(el.tag) && has(el, 'href'))) return false; break; }
        if (v === 'checked') { if (!has(el, 'checked') && !has(el, 'selected')) return false; break; }
        if (v === 'disabled') { if (!has(el, 'disabled')) return false; break; }
        if (v === 'enabled') { if (has(el, 'disabled')) return false; break; }
        if (v === 'required') { if (!has(el, 'required')) return false; break; }
        if (v === 'optional') { if (has(el, 'required')) return false; break; }
        if (v === 'valid') break;
        if (v === 'focus' || v === 'focus-visible') { if (ctx.focus !== el) return false; break; }
        if (v === 'focus-within') { if (!(ctx.focus === el || (ctx.focus && ancestors(ctx.focus).includes(el)))) return false; break; }
        if (v === 'hover' || v === 'active') { if (!ctx.hover || (ctx.hover !== el && !ancestors(ctx.hover).includes(el))) return false; break; }
        if (v === 'lang') break;
        if (v === 'dir') break;
        if (v.startsWith('-')) return false;
        if (STATE_PSEUDOS.has(v)) return false;
        return false;
      }
    }
  }
  return true;
}
function hasRelative(el, sel, ctx) {
  const s = sel.trim();
  if (s.startsWith('>')) return childElements(el).some((c) => matches(c, s.slice(1), ctx, el));
  if (s.startsWith('+')) { const sibs = siblingsOf(el); const next = sibs[sibs.indexOf(el) + 1]; return !!next && matches(next, s.slice(1), ctx); }
  if (s.startsWith('~')) { const sibs = siblingsOf(el); return sibs.slice(sibs.indexOf(el) + 1).some((n) => matches(n, s.slice(1), ctx)); }
  return elements(el).some((d) => matches(d, s, ctx, el));
}
/** Does el match the selector text? `scope` limits ancestor walks (for :has). */
export function matches(el, selText, ctx = {}, scope = null) {
  const c = typeof selText === 'string' ? compileSelector(selText) : selText;
  if (!c) return false;
  const tokens = c.tokens;
  const rec = (node, k) => {
    if (!matchCompound(node, tokens[k].compound, ctx)) return false;
    if (k === 0) return true;
    const comb = tokens[k].combinator;
    if (comb === '>') { const p = node.parent; return !!p && p.tag !== '#document' && p !== scope && rec(p, k - 1); }
    if (comb === ' ') { for (let p = node.parent; p && p.tag !== '#document' && p !== scope; p = p.parent) if (rec(p, k - 1)) return true; return false; }
    const sibs = siblingsOf(node), idx = sibs.indexOf(node);
    if (comb === '+') return idx > 0 && rec(sibs[idx - 1], k - 1);
    for (let s = idx - 1; s >= 0; s--) if (rec(sibs[s], k - 1)) return true;
    return false;
  };
  return rec(el, tokens.length - 1);
}
export function querySelectorAll(doc, sel, ctx = {}) { return elements(doc).filter((el) => splitTop(sel, ',').some((s) => matches(el, s.trim(), ctx))); }

// ---------- cascade ----------
const INHERITED = new Set(['color', 'font-size', 'font-weight', 'font-family', 'font-style', 'line-height', 'white-space', 'overflow-wrap', 'word-wrap', 'word-break', 'visibility', 'text-align', 'letter-spacing', 'cursor', 'text-transform', 'hyphens', 'scroll-behavior']);
const UA = {
  html: { display: 'block', 'font-size': '16px', color: '#000000', 'line-height': 'normal' },
  body: { display: 'block', 'margin-left': '8px', 'margin-right': '8px' },
  button: { display: 'inline-block', 'font-size': '13.333px', 'padding-top': '1px', 'padding-bottom': '1px', 'padding-left': '6px', 'padding-right': '6px', 'background-color': '#efefef', color: '#000000', 'border-top-width': '2px', 'border-bottom-width': '2px', 'border-left-width': '2px', 'border-right-width': '2px', 'line-height': 'normal', 'font-weight': '400' },
  input: { display: 'inline-block', 'font-size': '13.333px', 'padding-top': '1px', 'padding-bottom': '1px', 'padding-left': '2px', 'padding-right': '2px', 'background-color': '#ffffff', color: '#000000', 'border-top-width': '2px', 'border-bottom-width': '2px', 'border-left-width': '2px', 'border-right-width': '2px', 'line-height': 'normal' },
  select: { display: 'inline-block', 'font-size': '13.333px', 'background-color': '#ffffff', color: '#000000' },
  textarea: { display: 'inline-block', 'font-size': '13.333px', 'background-color': '#ffffff', color: '#000000' },
  a: { color: '#0000ee', display: 'inline' },
  h1: { 'font-size': '2em', 'font-weight': '700', display: 'block' }, h2: { 'font-size': '1.5em', 'font-weight': '700', display: 'block' },
  h3: { 'font-size': '1.17em', 'font-weight': '700', display: 'block' }, h4: { 'font-weight': '700', display: 'block' }, h5: { 'font-size': '0.83em', 'font-weight': '700', display: 'block' }, h6: { 'font-size': '0.67em', 'font-weight': '700', display: 'block' },
  strong: { 'font-weight': '700' }, b: { 'font-weight': '700' }, th: { 'font-weight': '700', display: 'table-cell' }, td: { display: 'table-cell' },
  small: { 'font-size': 'smaller' }, pre: { display: 'block', 'white-space': 'pre' }, code: { 'font-family': 'monospace' }, kbd: { 'font-family': 'monospace' },
  ul: { display: 'block', 'padding-left': '40px' }, ol: { display: 'block', 'padding-left': '40px' }, li: { display: 'list-item' },
  table: { display: 'table' }, tr: { display: 'table-row' }, img: { display: 'inline' }, svg: { display: 'inline' }, span: { display: 'inline' }, label: { display: 'inline' }, em: { display: 'inline' },
  fieldset: { display: 'block', 'padding-left': '12px', 'padding-right': '12px', 'margin-left': '2px', 'margin-right': '2px', 'border-left-width': '2px', 'border-right-width': '2px' },
  legend: { display: 'block' }, summary: { display: 'block' },
  script: { display: 'none' }, style: { display: 'none' }, head: { display: 'none' }, template: { display: 'none' }, title: { display: 'none' }, meta: { display: 'none' }, link: { display: 'none' },
};
const BLOCK_TAGS = new Set(['div', 'p', 'section', 'article', 'header', 'footer', 'main', 'nav', 'aside', 'form', 'figure', 'blockquote', 'address', 'dl', 'dt', 'dd', 'hgroup', 'details', 'figcaption', 'menu', 'hr', 'search', 'dialog']);
/** Expand shorthands we care about into longhands. */
function expand(name, value) {
  const four = (prefix, suffix = '') => {
    const v = splitTop(value, ' '); const [t, r = t, b = t, l = r] = v;
    return [[`${prefix}-top${suffix}`, t], [`${prefix}-right${suffix}`, r], [`${prefix}-bottom${suffix}`, b], [`${prefix}-left${suffix}`, l]];
  };
  switch (name) {
    case 'padding': return four('padding');
    case 'margin': return four('margin');
    case 'border-width': return four('border', '-width');
    case 'padding-inline': case 'margin-inline': { const [a, b = a] = splitTop(value, ' '); const p = name.split('-')[0]; return [[`${p}-left`, a], [`${p}-right`, b]]; }
    case 'padding-block': case 'margin-block': { const [a, b = a] = splitTop(value, ' '); const p = name.split('-')[0]; return [[`${p}-top`, a], [`${p}-bottom`, b]]; }
    case 'padding-inline-start': return [['padding-left', value]]; case 'padding-inline-end': return [['padding-right', value]];
    case 'padding-block-start': return [['padding-top', value]]; case 'padding-block-end': return [['padding-bottom', value]];
    case 'scroll-padding': case 'scroll-margin': case 'scroll-padding-block': case 'scroll-margin-block': case 'scroll-padding-block-start': case 'scroll-margin-block-start':
      return [[`${name.startsWith('scroll-padding') ? 'scroll-padding' : 'scroll-margin'}-top`, splitTop(value, ' ')[0]]];
    case 'margin-inline-start': return [['margin-left', value]]; case 'margin-inline-end': return [['margin-right', value]];
    case 'inline-size': return [['width', value]]; case 'min-inline-size': return [['min-width', value]]; case 'max-inline-size': return [['max-width', value]];
    case 'block-size': return [['height', value]]; case 'min-block-size': return [['min-height', value]];
    case 'inset': { const v = splitTop(value, ' '); const [t, r = t, b = t, l = r] = v; return [['top', t], ['right', r], ['bottom', b], ['left', l]]; }
    case 'inset-block': { const [a, b = a] = splitTop(value, ' '); return [['top', a], ['bottom', b]]; }
    case 'inset-inline': { const [a, b = a] = splitTop(value, ' '); return [['left', a], ['right', b]]; }
    case 'inset-block-start': return [['top', value]]; case 'inset-block-end': return [['bottom', value]];
    case 'inset-inline-start': return [['left', value]]; case 'inset-inline-end': return [['right', value]];
    case 'margin-block-start': return [['margin-top', value]]; case 'margin-block-end': return [['margin-bottom', value]];
    case 'border-inline-start': return expand('border-left', value); case 'border-inline-end': return expand('border-right', value);
    case 'border-block-start': return expand('border-top', value); case 'border-block-end': return expand('border-bottom', value);
    case 'border-inline-width': { const [a, b = a] = splitTop(value, ' '); return [['border-left-width', a], ['border-right-width', b]]; }
    case 'border-block-width': { const [a, b = a] = splitTop(value, ' '); return [['border-top-width', a], ['border-bottom-width', b]]; }
    case 'border-inline-start-width': return [['border-left-width', value]]; case 'border-inline-end-width': return [['border-right-width', value]];
    case 'border-block-start-width': return [['border-top-width', value]]; case 'border-block-end-width': return [['border-bottom-width', value]];
    case 'border-inline-color': case 'border-block-color': { const [a, b = a] = splitTop(value, ' '); const s = name.includes('inline') ? ['left', 'right'] : ['top', 'bottom']; return [[`border-${s[0]}-color`, a], [`border-${s[1]}-color`, b]]; }
    case 'max-block-size': return [['max-height', value]];
    case 'border': case 'border-top': case 'border-bottom': case 'border-left': case 'border-right': case 'border-inline': case 'border-block': {
      const sides = name === 'border' ? ['top', 'right', 'bottom', 'left'] : name === 'border-inline' ? ['left', 'right'] : name === 'border-block' ? ['top', 'bottom'] : [name.slice(7)];
      const toks = splitTop(value, ' ');
      const style = toks.find((t) => /^(none|hidden|solid|dashed|dotted|double|groove|ridge|inset|outset)$/i.test(t));
      const width = toks.find((t) => /^(thin|medium|thick|[\d.]+[a-z]*|0|calc\(.*\)|var\(.*\))$/i.test(t) && t !== style);
      const color = toks.find((t) => t !== style && t !== width);
      return sides.flatMap((s) => [[`border-${s}-width`, style && /^(none|hidden)$/i.test(style) ? '0' : width ?? (style ? 'medium' : '0')], [`border-${s}-color`, color ?? 'currentcolor'], [`border-${s}-style`, style ?? 'none']]);
    }
    case 'border-color': return four('border', '-color');
    case 'background': {
      if (/^(none|transparent)$/i.test(value.trim())) return [['background-color', 'transparent'], ['background-image', 'none']];
      const layers = splitTop(value, ',');
      const last = layers[layers.length - 1];
      const toks = splitTop(last, ' ');
      const color = toks.find((t) => isColorish(t)) ?? 'transparent';
      const image = layers.filter((l) => /gradient\(|url\(/i.test(l)).join(', ') || 'none';
      return [['background-color', color], ['background-image', image]];
    }
    case 'outline': {
      const toks = splitTop(value, ' ');
      if (toks.length === 1 && /^(none|0|0px)$/i.test(toks[0])) return [['outline-style', 'none'], ['outline-width', '0'], ['outline-color', 'currentcolor']];
      const style = toks.find((t) => /^(none|auto|solid|dashed|dotted|double|groove|ridge|inset|outset)$/i.test(t));
      const width = toks.find((t) => t !== style && /^(thin|medium|thick|-?[\d.]+[a-z]*|calc\(.*\)|var\(.*\))$/i.test(t) && !isColorish(t));
      const color = toks.find((t) => t !== style && t !== width);
      return [['outline-style', style ?? 'none'], ['outline-width', width ?? 'medium'], ['outline-color', color ?? 'currentcolor']];
    }
    case 'font': {
      if (/^(inherit|initial|unset|revert)$/i.test(value.trim())) return [['font-size', value], ['line-height', value], ['font-weight', value], ['font-family', value]];
      const m = /(?:^|\s)((?:[\d.]+(?:px|rem|em|%|pt|vw)|(?:min|max|clamp|calc|var)\([^)]*\)+|small|medium|large|x-large|xx-large|smaller|larger))(?:\s*\/\s*([^\s]+))?\s+(.+)$/i.exec(value);
      if (!m) return [];
      const before = value.slice(0, m.index);
      const weight = /\b(bold|bolder|[1-9]00)\b/i.exec(before)?.[1] ?? 'normal';
      return [['font-size', m[1]], ['line-height', m[2] ?? 'normal'], ['font-weight', weight], ['font-family', m[3]]];
    }
    case 'flex': {
      const v = value.trim();
      if (v === 'none') return [['flex-grow', '0'], ['flex-shrink', '0'], ['flex-basis', 'auto']];
      if (v === 'auto') return [['flex-grow', '1'], ['flex-shrink', '1'], ['flex-basis', 'auto']];
      if (v === 'initial') return [['flex-grow', '0'], ['flex-shrink', '1'], ['flex-basis', 'auto']];
      const toks = splitTop(v, ' ');
      const nums = toks.filter((t) => /^[\d.]+$/.test(t)); const basis = toks.find((t) => !/^[\d.]+$/.test(t));
      return [['flex-grow', nums[0] ?? '1'], ['flex-shrink', nums[1] ?? '1'], ['flex-basis', basis ?? (nums.length ? '0%' : 'auto')]];
    }
    case 'flex-flow': { const out = []; for (const t of splitTop(value, ' ')) out.push(/wrap/.test(t) ? ['flex-wrap', t] : ['flex-direction', t]); return out; }
    case 'gap': { const [r, c = r] = splitTop(value, ' '); return [['row-gap', r], ['column-gap', c]]; }
    case 'grid-gap': { const [r, c = r] = splitTop(value, ' '); return [['row-gap', r], ['column-gap', c]]; }
    case 'grid-column-gap': return [['column-gap', value]];
    case 'grid-template': { const parts = value.split('/'); return parts.length > 1 ? [['grid-template-columns', parts[1].trim()]] : []; }
    case 'word-wrap': return [['overflow-wrap', value]];
    case 'overflow': { const [x, y = x] = splitTop(value, ' '); return [['overflow-x', x], ['overflow-y', y]]; }
    case 'animation': {
      const layers = splitTop(value, ',');
      const names = layers.map((l) => splitTop(l, ' ').find((t) => /^[a-z_-][\w-]*$/i.test(t) && !/^(none|infinite|linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end|alternate|alternate-reverse|reverse|normal|forwards|backwards|both|running|paused|initial|inherit|unset)$/i.test(t)) ?? (/\bnone\b/i.test(l) ? 'none' : 'none'));
      const durations = layers.map((l) => splitTop(l, ' ').find((t) => /^-?[\d.]+m?s$/i.test(t)) ?? '0s');
      return [['animation-name', names.join(', ')], ['animation-duration', durations.join(', ')], ['animation', value]];
    }
    case 'transition': {
      const layers = splitTop(value, ',');
      const durations = layers.map((l) => splitTop(l, ' ').find((t) => /^-?[\d.]+m?s$/i.test(t)) ?? '0s');
      const props = layers.map((l) => (/^\s*none\b/i.test(l) ? 'none' : splitTop(l, ' ').find((t) => /^[a-z-]+$/i.test(t) && !/^(ease|linear|ease-in|ease-out|ease-in-out|step-start|step-end|allow-discrete|normal)$/i.test(t)) ?? 'all'));
      return [['transition-duration', durations.join(', ')], ['transition-property', props.join(', ')]];
    }
    case 'place-items': return [['align-items', splitTop(value, ' ')[0]]];
    default: return [[name, value]];
  }
}
export function isColorish(t) { return /^(#[0-9a-f]{3,8}|rgba?\(|hsla?\(|var\(--|transparent$|currentcolor$|white$|black$|red$|blue$|green$|gray$|grey$|orange$|navy$|oklch\(|oklab\(|lab\(|lch\(|color-mix\(|color\(|light-dark\()/i.test(t.trim()) || /^(canvas|canvastext|linktext|visitedtext|activetext|buttonface|buttontext|buttonborder|field|fieldtext|highlight|highlighttext|selecteditem|selecteditemtext|mark|marktext|graytext|accentcolor|accentcolortext)$/i.test(t.trim()); }

export class Styles {
  constructor(doc, sheets) {
    this.doc = doc;
    this.rules = sheets.flatMap((css, i) => parseCSS(css, i));
    this.cache = new Map();
  }
  key(ctx) { return `${ctx.width}|${ctx.reducedMotion ? 1 : 0}|${ctx.forcedColors ? 1 : 0}|${ctx.dark ? 1 : 0}|${ctx.focus ? elements(this.doc).indexOf(ctx.focus) : -1}|${ctx.hover ? elements(this.doc).indexOf(ctx.hover) : -1}`; }
  /** Cascaded and inherited longhand values for el (strings, var() resolved). pseudo picks ::before/::after rules. */
  computed(el, ctx, pseudo = null) {
    const k = this.key(ctx);
    let map = this.cache.get(k); if (!map) { map = new Map(); this.cache.set(k, map); }
    const ck = pseudo ? `${pseudo}` : '';
    let perEl = map.get(el); if (!perEl) { perEl = {}; map.set(el, perEl); }
    if (perEl[ck]) return perEl[ck];
    const parent = pseudo ? this.computed(el, ctx) : el.parent && el.parent.tag !== '#document' ? this.computed(el.parent, ctx) : null;
    const raw = []; // [name, value, rank] in cascade order
    const put = (name, value, rank) => { raw.push([name, value, rank]); };
    if (!pseudo) {
      for (const [n, v] of Object.entries(UA[el.tag] ?? (BLOCK_TAGS.has(el.tag) ? { display: 'block' } : {}))) put(n, v, [0, 0, 0, 0, 0, 0, -1]);
      if (has(el, 'hidden')) put('display', 'none', [0, 0, 0, 0, 0, 0, 0]);
      if (el.tag === 'input' && (attr(el, 'type') ?? '').toLowerCase() === 'hidden') put('display', 'none', [0, 0, 0, 0, 0, 0, 0]);
      if (el.tag === 'dialog' && !has(el, 'open')) put('display', 'none', [0, 0, 0, 0, 0, 0, 0]);
      if (el.tag === 'details') { /* children other than summary hidden when closed: handled in visible() */ }
    }
    for (const rule of this.rules) {
      if (!rule.media.every((m) => mediaMatches(m, ctx))) continue;
      let best = null;
      for (const sel of rule.selectors) {
        if ((sel.pseudoEl ?? null) !== pseudo && !(pseudo === null && sel.pseudoEl === null)) continue;
        if (pseudo && sel.pseudoEl !== pseudo) continue;
        if (!pseudo && sel.pseudoEl) continue;
        if (matches(el, sel, ctx) && (!best || cmpSpec(sel.spec, best) > 0)) best = sel.spec;
      }
      if (!best) continue;
      for (const [name, value, important] of rule.decls) {
        // rank: important, layer (important reverses), spec a,b,c, order
        const layer = important ? -rule.layerRank : rule.layerRank;
        put(name, value, [important ? 1 : 0, 1, layer, ...best, rule.order]);
      }
    }
    if (!pseudo && el.attrs.style) for (const item of parseBlock(el.attrs.style)) if (item.decl) put(item.decl[0], item.decl[1], [item.decl[2] ? 1 : 0, 2, Infinity, 0, 0, 0, 0]);
    const out = {};
    // custom properties first (inherit), then var() is substituted before shorthands expand, as in browsers
    if (parent) for (const [n, v] of Object.entries(parent)) if (n.startsWith('--')) out[n] = v;
    const customs = new Map();
    for (const [n, v, rank] of raw) if (n.startsWith('--')) { const cur = customs.get(n); if (!cur || cmpRank(rank, cur.rank) >= 0) customs.set(n, { value: v, rank }); }
    for (const [n, { value }] of customs) out[n] = value;
    for (const n of Object.keys(out)) if (n.startsWith('--')) out[n] = resolveVars(out[n], out, 0);
    const winners = new Map(); // longhand -> { value, rank }
    for (const [name, value, rank] of raw) {
      if (name.startsWith('--')) continue;
      for (const [n, v] of expand(name, lightDark(resolveVars(value, out, 0), ctx))) {
        const cur = winners.get(n);
        if (!cur || cmpRank(rank, cur.rank) >= 0) winners.set(n, { value: v, rank });
      }
    }
    if (parent) for (const n of INHERITED) if (parent[n] !== undefined) out[n] = parent[n];
    for (const [n, { value }] of winners) {
      let v = value.trim();
      const kw = v.toLowerCase();
      if (kw === 'inherit' || (kw === 'unset' && INHERITED.has(n))) { v = parent?.[n]; if (v === undefined) { delete out[n]; continue; } }
      else if (kw === 'initial' || kw === 'unset' || kw === 'revert' || kw === 'revert-layer') { if (INHERITED.has(n) && parent) out[n] = parent[n]; else delete out[n]; continue; }
      out[n] = v;
    }
    // font-size resolves relative to the parent
    const pfs = parent ? Number(parent['font-size']) || 16 : 16;
    const fsRaw = winners.has('font-size') || !parent ? out['font-size'] ?? '16px' : null;
    if (fsRaw !== null) {
      const kw = { smaller: pfs / 1.2, larger: pfs * 1.2, small: 13, medium: 16, large: 18, 'x-large': 24, 'xx-large': 32 }[String(fsRaw).toLowerCase()];
      out['font-size'] = String(kw ?? length(fsRaw, { em: pfs, percent: pfs, viewport: ctx.width }) ?? pfs);
    }
    out['font-size'] = String(Number(out['font-size']) || pfs);
    perEl[ck] = out;
    return out;
  }
  px(el, ctx, prop, percentBase = 0) {
    const cs = this.computed(el, ctx);
    const v = cs[prop]; if (v === undefined || v === null) return null;
    return length(v, { em: Number(cs['font-size']), percent: percentBase, viewport: ctx.width });
  }
}
/** Pick the light or dark branch of light-dark(a, b). */
function lightDark(value, ctx) {
  let i = value.indexOf('light-dark(');
  while (i >= 0) {
    let d = 1, j = i + 11; for (; j < value.length && d; j++) { if (value[j] === '(') d++; else if (value[j] === ')') d--; }
    const [a, b = a] = splitTop(value.slice(i + 11, j - 1), ',').map((s) => s.trim());
    value = value.slice(0, i) + (ctx.dark ? b : a) + value.slice(j);
    i = value.indexOf('light-dark(');
  }
  return value;
}
function cmpRank(a, b) { for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] > b[i] ? 1 : -1; return 0; }
export function resolveVars(value, props, depth) {
  if (depth > 20 || !value.includes('var(')) return value;
  let out = '', i = 0;
  while (i < value.length) {
    const k = value.indexOf('var(', i);
    if (k < 0) { out += value.slice(i); break; }
    out += value.slice(i, k);
    let d = 1, j = k + 4; for (; j < value.length && d; j++) { if (value[j] === '(') d++; else if (value[j] === ')') d--; }
    const inner = value.slice(k + 4, j - 1); const comma = splitTop(inner, ',');
    const name = comma[0].trim(); const fallback = comma.length > 1 ? comma.slice(1).join(',').trim() : null;
    const v = props[name] !== undefined ? props[name] : fallback;
    out += v === null ? '' : resolveVars(v, props, depth + 1);
    i = j;
  }
  return out;
}

// ---------- values ----------
/** Resolve a length/calc expression to px. base: { em, percent, viewport }. Returns null when not a length. */
export function length(value, base = {}) {
  if (value === undefined || value === null) return null;
  const v = String(value).trim().toLowerCase();
  if (v === '' || v === 'auto' || v === 'none' || v === 'normal' || /content|fit-content|stretch/.test(v)) return null;
  try { const r = evalExpr(v, base); return Number.isFinite(r) ? r : null; } catch { return null; }
}
function evalExpr(src, base) {
  let i = 0;
  const ws = () => { while (/\s/.test(src[i])) i++; };
  const num = () => {
    ws();
    const fn = /^(calc|min|max|clamp)\(/.exec(src.slice(i));
    if (fn) {
      i += fn[0].length; const args = [];
      for (;;) { args.push(sum()); ws(); if (src[i] === ',') { i++; continue; } if (src[i] === ')') { i++; break; } throw new Error('bad'); }
      if (fn[1] === 'calc') return args[0];
      if (fn[1] === 'min') return Math.min(...args);
      if (fn[1] === 'max') return Math.max(...args);
      return Math.max(args[0], Math.min(args[1], args[2]));
    }
    if (src[i] === '(') { i++; const r = sum(); ws(); i++; return r; }
    const m = /^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(px|rem|em|%|vw|vh|vmin|vmax|svw|lvw|dvw|svh|dvh|lvh|ch|ex|pt|cqi|cqw)?/.exec(src.slice(i));
    if (!m) throw new Error('bad');
    i += m[0].length; const n = Number(m[1]); const u = m[2];
    const vw = base.viewport ?? 1280, vh = base.vh ?? 800;
    switch (u) {
      case undefined: return n; case 'px': return n; case 'rem': return n * 16; case 'em': return n * (base.em ?? 16);
      case '%': return (n / 100) * (base.percent ?? 0); case 'vw': case 'svw': case 'lvw': case 'dvw': case 'cqi': case 'cqw': return (n / 100) * vw;
      case 'vh': case 'svh': case 'dvh': case 'lvh': return (n / 100) * vh; case 'vmin': return (n / 100) * Math.min(vw, vh); case 'vmax': return (n / 100) * Math.max(vw, vh);
      case 'ch': return n * 0.5 * (base.em ?? 16); case 'ex': return n * 0.5 * (base.em ?? 16); case 'pt': return (n * 4) / 3;
    }
    throw new Error('bad');
  };
  const prod = () => { let r = num(); for (;;) { ws(); if (src[i] === '*') { i++; r *= num(); } else if (src[i] === '/') { i++; r /= num(); } else return r; } };
  const sum = () => { let r = prod(); for (;;) { ws(); if (src[i] === '+' && /\s/.test(src[i + 1] ?? ' ')) { i++; r += prod(); } else if (src[i] === '-' && /\s/.test(src[i + 1] ?? ' ')) { i++; r -= prod(); } else return r; } };
  const r = sum(); ws(); if (i < src.length) throw new Error('trailing'); return r;
}
export const seconds = (t) => { const m = /^(-?[\d.]+)(ms|s)$/i.exec(String(t).trim()); return m ? Number(m[1]) / (m[2].toLowerCase() === 'ms' ? 1000 : 1) : 0; };

// ---------- colour ----------
const NAMED = { white: [255, 255, 255, 1], black: [0, 0, 0, 1], transparent: [0, 0, 0, 0], red: [255, 0, 0, 1], blue: [0, 0, 255, 1], green: [0, 128, 0, 1], gray: [128, 128, 128, 1], grey: [128, 128, 128, 1], orange: [255, 165, 0, 1], navy: [0, 0, 128, 1], yellow: [255, 255, 0, 1], silver: [192, 192, 192, 1] };
/** Parse a colour to [r, g, b, a] or null when the format is not supported. */
export function parseColor(v, current = [0, 0, 0, 1]) {
  if (!v) return null; const s = v.trim().toLowerCase();
  if (s === 'currentcolor') return current;
  if (NAMED[s]) return NAMED[s];
  let m = /^#([0-9a-f]{3,8})$/.exec(s);
  if (m) {
    let h = m[1]; if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
    if (h.length !== 6 && h.length !== 8) return null;
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1];
  }
  if (s.startsWith('color-mix(')) {
    // color-mix(in <space>, A [p%], B [q%]); mixed in sRGB (close enough for other spaces at grading precision)
    const args = splitTop(s.slice(10, -1), ',').map((a) => a.trim());
    const part = (a) => { const m2 = /^(.*?)\s+([\d.]+)%$/.exec(a); return m2 ? [parseColor(m2[1], current), Number(m2[2]) / 100] : [parseColor(a, current), null]; };
    const [c1, p1] = part(args[1] ?? ''), [c2, p2] = part(args[2] ?? '');
    if (!c1 || !c2) return null;
    let w1 = p1 ?? (p2 !== null ? 1 - p2 : 0.5), w2 = p2 ?? 1 - w1; const sum = w1 + w2; w1 /= sum; w2 /= sum;
    const a = c1[3] * w1 + c2[3] * w2; if (a === 0) return [0, 0, 0, 0];
    return [0, 1, 2].map((i) => (c1[i] * c1[3] * w1 + c2[i] * c2[3] * w2) / a).concat(a);
  }
  m = /^(rgba?|hsla?)\((.*)\)$/.exec(s);
  if (m) {
    const parts = m[2].replace('/', ' / ').split(/[\s,]+/).filter((x) => x && x !== '/');
    const alpha = parts[3] === undefined ? 1 : parts[3].endsWith('%') ? Number(parts[3].slice(0, -1)) / 100 : Number(parts[3]);
    if (m[1].startsWith('rgb')) {
      const c = parts.slice(0, 3).map((p) => (p.endsWith('%') ? (Number(p.slice(0, -1)) * 255) / 100 : Number(p)));
      return c.some((x) => !Number.isFinite(x)) ? null : [...c, alpha];
    }
    const h = parseFloat(parts[0]), sat = parseFloat(parts[1]) / 100, l = parseFloat(parts[2]) / 100;
    const f = (n) => { const k = (n + h / 30) % 12; const a = sat * Math.min(l, 1 - l); return 255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))); };
    return [f(0), f(8), f(4), alpha];
  }
  return null;
}
export function over(top, bottom) {
  const a = top[3] + bottom[3] * (1 - top[3]); if (a === 0) return [0, 0, 0, 0];
  return [0, 1, 2].map((i) => (top[i] * top[3] + bottom[i] * bottom[3] * (1 - top[3])) / a).concat(a);
}
export function luminance([r, g, b]) { const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); }
export function contrast(a, b) { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
/** Background colours behind el (several when a gradient is involved), composited down to the page. null = unknown format. */
export function backgrounds(styles, el, ctx) {
  const chain = [el, ...ancestors(el)];
  // the canvas is dark only when the page opts into a dark color-scheme
  const root = chain[chain.length - 1];
  const scheme = `${styles.computed(root, ctx)['color-scheme'] ?? ''} ${elements(styles.doc).filter((e) => e.tag === 'meta' && attr(e, 'name') === 'color-scheme').map((e) => attr(e, 'content')).join(' ')}`;
  let layers = [ctx.dark && /dark/.test(scheme) ? [18, 18, 18, 1] : [255, 255, 255, 1]];
  for (let k = chain.length - 1; k >= 0; k--) {
    const cs = styles.computed(chain[k], ctx);
    const color = cs['color'] ? parseColor(cs['color']) : [0, 0, 0, 1];
    const bgc = cs['background-color'] ? parseColor(cs['background-color'], color) : [0, 0, 0, 0];
    if (!bgc) return null;
    const img = cs['background-image'] ?? 'none';
    if (/gradient\(/i.test(img)) {
      const stops = [...img.matchAll(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|\b(?:white|black|transparent)\b/gi)].map((x) => parseColor(x[0]));
      if (stops.some((s) => !s)) return null;
      layers = layers.flatMap((l) => stops.map((s) => over(s, over(bgc, l))));
    } else if (/url\(/i.test(img)) return null;
    else layers = layers.map((l) => over(bgc, l));
  }
  return layers;
}
export function textColor(styles, el, ctx) { const cs = styles.computed(el, ctx); return parseColor(cs.color ?? '#000000'); }
export function isLargeText(styles, el, ctx) {
  const cs = styles.computed(el, ctx); const fs = Number(cs['font-size']);
  const w = String(cs['font-weight'] ?? '400').toLowerCase(); const bold = w === 'bold' || w === 'bolder' || Number(w) >= 700;
  return fs >= 24 || (bold && fs >= 18.66);
}

// ---------- visibility and layout ----------
export function visible(styles, el, ctx) {
  for (const n of [el, ...ancestors(el)]) {
    const cs = styles.computed(n, ctx);
    if (cs.display === 'none') return false;
    if (n.parent?.tag === 'details' && !has(n.parent, 'open') && n.tag !== 'summary') return false;
  }
  const cs = styles.computed(el, ctx);
  if (cs.visibility === 'hidden' || cs.visibility === 'collapse') return false;
  if (isVisuallyHidden(styles, el, ctx)) return false;
  return true;
}
function isVisuallyHidden(styles, el, ctx) {
  for (const n of [el, ...ancestors(el)]) {
    const cs = styles.computed(n, ctx);
    const w = length(cs.width, { percent: 0 }), h = length(cs.height, { percent: 0 });
    if (w !== null && h !== null && w <= 1 && h <= 1 && /hidden|clip/.test(cs['overflow-x'] ?? cs['overflow'] ?? '')) return true;
    if (cs.clip && /rect\(\s*0/.test(cs.clip)) return true;
    if (cs['clip-path'] && /inset\(\s*50%/.test(cs['clip-path'])) return true;
    if (cs.position === 'absolute' || cs.position === 'fixed') { const l = length(cs.left, {}); if (l !== null && l < -999) return true; }
  }
  return false;
}
const HORIZ = (styles, el, ctx, base) => {
  const g = (p) => styles.px(el, ctx, p, base) ?? 0;
  return { margin: g('margin-left') + g('margin-right'), padding: g('padding-left') + g('padding-right'), border: g('border-left-width') + g('border-right-width') };
};
/** Rough content-box width of el at ctx.width: block flow, width/min/max, padding and borders. */
export function contentWidth(styles, el, ctx) {
  const memo = (styles._cw ??= new Map()); const key = `${styles.key(ctx)}#${elements(styles.doc).indexOf(el)}`;
  if (memo.has(key)) return memo.get(key);
  let result;
  if (!el.parent || el.parent.tag === '#document') result = ctx.width;
  else {
    const avail = contentWidth(styles, el.parent, ctx);
    const own = borderBoxWidth(styles, el, ctx, avail);
    const h = HORIZ(styles, el, ctx, avail);
    result = Math.max(0, own - h.padding - h.border);
  }
  memo.set(key, result); return result;
}
/** Border-box width the element would take inside avail (block-level fill when width is auto). */
export function borderBoxWidth(styles, el, ctx, avail) {
  const cs = styles.computed(el, ctx); const h = HORIZ(styles, el, ctx, avail);
  const boxSizing = cs['box-sizing'] === 'border-box';
  const toBorderBox = (v) => (boxSizing ? v : v + h.padding + h.border);
  let w = styles.px(el, ctx, 'width', avail);
  if (w === null && el.tag === 'img' && attr(el, 'width') && /^\d+$/.test(attr(el, 'width'))) w = Number(attr(el, 'width'));
  let bb = w !== null ? toBorderBox(w) : Math.max(0, avail - h.margin);
  const max = styles.px(el, ctx, 'max-width', avail); if (max !== null) bb = Math.min(bb, toBorderBox(max));
  const min = styles.px(el, ctx, 'min-width', avail); if (min !== null) bb = Math.max(bb, toBorderBox(min));
  return bb;
}
/** Approximate width of a string of text: average glyph ~0.55em, monospace 0.6em. */
export function textWidth(str, fontSize, mono = false) { return [...str].length * fontSize * (mono ? 0.6 : 0.55); }
export function columnCount(styles, container, ctx, items) {
  const cs = styles.computed(container, ctx);
  const avail = contentWidth(styles, container, ctx);
  const gap = styles.px(container, ctx, 'column-gap', avail) ?? 0;
  const display = cs.display ?? 'block';
  if (/grid/.test(display)) {
    const tpl = cs['grid-template-columns'];
    if (!tpl || tpl === 'none') return 1;
    let count = 0;
    for (const tok of splitTop(tpl, ' ')) {
      const rep = /^repeat\(\s*([^,]+),(.*)\)$/i.exec(tok);
      if (rep) {
        const tracks = splitTop(rep[2].trim(), ' ');
        if (/auto-(fit|fill)/i.test(rep[1])) {
          const mins = tracks.map((t) => { const mm = /^minmax\((.*)\)$/i.exec(t); const first = mm ? splitTop(mm[1], ',')[0] : t; return length(first, { percent: avail, viewport: ctx.width, em: Number(cs['font-size']) }) ?? 0; });
          const per = mins.reduce((a, b) => a + b, 0) + gap * tracks.length;
          const reps = Math.max(1, Math.floor((avail + gap) / Math.max(per, 1)));
          count += /fit/i.test(rep[1]) ? Math.min(reps * tracks.length, items ?? Infinity) : reps * tracks.length;
        } else count += Number(rep[1]) * tracks.length;
      } else if (tok.trim()) count++;
    }
    return count;
  }
  if (/flex/.test(display)) {
    if (/column/.test(cs['flex-direction'] ?? '')) return 1;
    const kids = childElements(container).filter((k) => styles.computed(k, ctx).display !== 'none');
    if (!/^wrap/.test(cs['flex-wrap'] ?? 'nowrap')) return kids.length;
    let row = 0, used = 0;
    for (const k of kids) {
      const kcs = styles.computed(k, ctx);
      const basis = length(kcs['flex-basis'], { percent: avail, viewport: ctx.width, em: Number(kcs['font-size']) });
      const w = basis ?? styles.px(k, ctx, 'width', avail);
      const min = styles.px(k, ctx, 'min-width', avail) ?? 0;
      const size = Math.max(w ?? avail, min);
      if (row === 0 || used + gap + size <= avail + 0.5) { used += (row ? gap : 0) + size; row++; } else break;
    }
    return Math.max(1, row);
  }
  return 1;
}
export function loadPage(dir, file = 'index.html') {
  const html = readFileSync(join(dir, file), 'utf8');
  const doc = parseHTML(html);
  const sheets = collectCSS(dir, doc);
  return { html, doc, sheets, styles: new Styles(doc, sheets) };
}
export function scripts(dir, doc) {
  const out = [];
  for (const el of elements(doc)) if (el.tag === 'script') {
    const src = attr(el, 'src');
    if (src && !/^(?:[a-z]+:)?\/\//i.test(src)) { const p = join(dir, normalize(src.split(/[?#]/)[0])); if (existsSync(p)) out.push(readFileSync(p, 'utf8')); }
    else if (!src) out.push(text(el));
  }
  return out.join('\n');
}
/** Strip JS comments (keeps strings). */
export function stripJsComments(js) {
  let out = '', i = 0, quote = null;
  while (i < js.length) {
    const c = js[i];
    if (quote) { out += c; if (c === '\\') { out += js[i + 1] ?? ''; i += 2; continue; } if (c === quote) quote = null; i++; continue; }
    if (c === '"' || c === "'" || c === '`') { quote = c; out += c; i++; continue; }
    if (c === '/' && js[i + 1] === '/') { while (i < js.length && js[i] !== '\n') i++; continue; }
    if (c === '/' && js[i + 1] === '*') { const e = js.indexOf('*/', i + 2); i = e < 0 ? js.length : e + 2; continue; }
    out += c; i++;
  }
  return out;
}

// ---------- small-screen overflow ----------
const REPLACED = new Set(['img', 'svg', 'video', 'canvas', 'iframe', 'input', 'select', 'textarea', 'object', 'embed']);
const isInline = (cs, el) => (cs.display ?? 'inline') === 'inline' && !REPLACED.has(el.tag);
const clips = (cs) => /hidden|auto|scroll|clip/.test(cs['overflow-x'] ?? '');
const outOfFlow = (cs) => /absolute|fixed/.test(cs.position ?? '');
const breaksAnywhere = (cs) => /anywhere/.test(cs['overflow-wrap'] ?? '') || /break-all|break-word/.test(cs['word-break'] ?? '');
const wrapsLongWords = (cs) => breaksAnywhere(cs) || /break-word/.test(cs['overflow-wrap'] ?? '');
const noWrap = (cs) => /^(nowrap|pre)$/.test(cs['white-space'] ?? '') || /nowrap/.test(cs['text-wrap-mode'] ?? '');
const mono = (cs) => /mono|courier|consolas|menlo/i.test(cs['font-family'] ?? '');
function segments(str, cs) {
  const t = str.replace(/\s+/g, ' ').trim(); if (!t) return [];
  if (noWrap(cs)) return [t];
  if (breaksAnywhere(cs)) return [t.slice(0, 1)];
  return t.split(' ').flatMap((w) => w.split(/(?<=[-\/?&\u2014\u2013])/));
}
const glyphs = (s, cs) => [...s].length * Number(cs['font-size']) * (mono(cs) ? 0.6 : 0.52);
function hpad(styles, el, ctx) { const g = (p) => Math.max(0, styles.px(el, ctx, p, 0) ?? 0); return g('padding-left') + g('padding-right') + g('border-left-width') + g('border-right-width'); }
function hmargin(styles, el, ctx, base = 0) { const g = (p) => Math.max(0, styles.px(el, ctx, p, base) ?? 0); return g('margin-left') + g('margin-right'); }
const fixedPx = (v, cs, ctx) => (v && !/%/.test(v) ? length(v, { em: Number(cs['font-size']), viewport: ctx.width }) : null);
function inFlow(styles, el, ctx) { return childElements(el).filter((c) => { const cs = styles.computed(c, ctx); return cs.display !== 'none' && !outOfFlow(cs) && !(el.tag === 'details' && !has(el, 'open') && c.tag !== 'summary'); }); }
/** Smallest border-box width el can take without its content overflowing (min-content). */
export function intrinsicMin(styles, el, ctx) {
  const memo = (styles._im ??= new Map()); const key = `${styles.key(ctx)}#${elements(styles.doc).indexOf(el)}`;
  if (memo.has(key)) return memo.get(key);
  const cs = styles.computed(el, ctx);
  const pad = hpad(styles, el, ctx);
  const bb = (v) => (cs['box-sizing'] === 'border-box' ? v : v + pad);
  let result;
  const w = fixedPx(cs.width, cs, ctx);
  if (REPLACED.has(el.tag)) {
    const attrW = /^\d+$/.test(attr(el, 'width') ?? '') ? Number(attr(el, 'width')) : null;
    if (/%/.test(cs['max-width'] ?? '') || /%/.test(cs.width ?? '')) result = 0;
    else if (w !== null) result = bb(w);
    else if (attrW !== null && el.tag !== 'input') result = attrW;
    else if (el.tag === 'input' || el.tag === 'select' || el.tag === 'textarea') result = 11 * Number(cs['font-size']) + pad;
    else result = 0;
  } else if (w !== null) result = bb(w);
  else if (clips(cs)) result = pad;
  else {
    let inner = 0;
    for (const c of el.children) if (c.type === 'text') for (const s of segments(c.text, cs)) inner = Math.max(inner, glyphs(s, cs));
    if (noWrap(cs)) inner = Math.max(inner, glyphs(text(el).replace(/\s+/g, ' ').trim(), cs));
    const kids = inFlow(styles, el, ctx);
    const display = cs.display ?? '';
    if (/flex/.test(display) && !/column/.test(cs['flex-direction'] ?? '') && !/wrap/.test(cs['flex-wrap'] ?? '')) {
      const gap = Math.max(0, fixedPx(cs['column-gap'], cs, ctx) ?? 0);
      inner = Math.max(inner, kids.reduce((sum, k) => sum + itemMin(styles, k, ctx) + hmargin(styles, k, ctx), 0) + gap * Math.max(0, kids.length - 1));
    } else if (/grid/.test(display)) {
      inner = Math.max(inner, gridMin(styles, el, ctx, kids));
    } else for (const k of kids) inner = Math.max(inner, (/flex|grid/.test(display) ? itemMin(styles, k, ctx) : intrinsicMin(styles, k, ctx)) + hmargin(styles, k, ctx));
    result = inner + pad;
    const max = fixedPx(cs['max-width'], cs, ctx); if (max !== null && clips(cs)) result = Math.min(result, bb(max));
  }
  const min = fixedPx(cs['min-width'], cs, ctx); if (min !== null && !REPLACED.has(el.tag) && w !== null) result = Math.max(result, bb(min));
  memo.set(key, result); return result;
}
/** Minimum a flex or grid item contributes (automatic minimum size). */
function itemMin(styles, k, ctx) {
  const cs = styles.computed(k, ctx);
  const pad = hpad(styles, k, ctx); const bb = (v) => (cs['box-sizing'] === 'border-box' ? v : v + pad);
  const minW = fixedPx(cs['min-width'], cs, ctx);
  const content = intrinsicMin(styles, k, ctx);
  const specified = fixedPx(cs.width, cs, ctx);
  let m = minW !== null ? bb(minW) : clips(cs) ? 0 : specified !== null ? Math.min(content, bb(specified)) : content;
  if ((cs['flex-shrink'] ?? '1').trim() === '0') m = Math.max(m, specified !== null ? bb(specified) : 0, fixedPx(cs['flex-basis'], cs, ctx) ?? 0);
  return m;
}
function gridTracks(styles, el, ctx, avail) {
  const cs = styles.computed(el, ctx); const tpl = cs['grid-template-columns'];
  if (!tpl || tpl === 'none') return null;
  const base = { em: Number(cs['font-size']), viewport: ctx.width, percent: avail ?? 0 };
  const minOf = (t) => {
    const mm = /^minmax\((.*)\)$/i.exec(t.trim()); const first = mm ? splitTop(mm[1], ',')[0].trim() : t.trim();
    if (/^(auto|min-content|max-content)$/i.test(first) || /fr$/.test(first) || /^fit-content/i.test(first)) return { auto: true, px: 0 };
    if (avail === null && /%/.test(first)) return { auto: false, px: 0 };
    return { auto: false, px: length(first, base) ?? 0 };
  };
  const out = [];
  for (const tok of splitTop(tpl, ' ')) {
    if (/^\[.*\]$/.test(tok)) continue;
    const rep = /^repeat\(\s*([^,]+),(.*)\)$/i.exec(tok);
    if (rep) {
      const tracks = splitTop(rep[2].trim(), ' ').filter((t) => !/^\[/.test(t)).map(minOf);
      let n = Number(rep[1]);
      if (!Number.isFinite(n)) { const per = tracks.reduce((a, b) => a + b.px, 0); n = avail === null || per <= 0 ? 1 : Math.max(1, Math.floor((avail + 0) / per)); }
      for (let i = 0; i < n; i++) out.push(...tracks);
    } else out.push(minOf(tok));
  }
  return out;
}
function gridMin(styles, el, ctx, kids) {
  const cs = styles.computed(el, ctx);
  const tracks = gridTracks(styles, el, ctx, null) ?? [{ auto: true, px: 0 }];
  const gap = Math.max(0, fixedPx(cs['column-gap'], cs, ctx) ?? 0);
  const need = tracks.map((t) => t.px);
  kids.forEach((k, i) => {
    const kcs = styles.computed(k, ctx);
    const span = /span\s*(\d+)/.exec(kcs['grid-column'] ?? '');
    const full = /1\s*\/\s*-1/.test(kcs['grid-column'] ?? '');
    const idx = i % tracks.length;
    const m = itemMin(styles, k, ctx) + hmargin(styles, k, ctx);
    if (full || span) return; // spanning items are covered by the sum of tracks
    need[idx] = Math.max(need[idx], m);
  });
  return need.reduce((a, b) => a + b, 0) + gap * Math.max(0, tracks.length - 1);
}
/** Elements that would make the page scroll sideways at a viewport width. Empty list = fits. */
export function overflowAt(styles, width) {
  const ctx = { width }; const problems = [];
  const html = elements(styles.doc).find((e) => e.tag === 'html'); const body = elements(styles.doc).find((e) => e.tag === 'body');
  if (!html || !body) return ['missing html or body'];
  const name = (el) => `${el.tag}${el.attrs.id ? `#${el.attrs.id}` : ''}${el.attrs.class ? `.${el.attrs.class.trim().split(/\s+/).join('.')}` : ''}`;
  const visit = (el, avail, blockContent) => {
    const cs = styles.computed(el, ctx);
    if (cs.display === 'none' || outOfFlow(cs)) return;
    let content = blockContent;
    if (!isInline(cs, el)) {
      const used = REPLACED.has(el.tag) ? Math.max(intrinsicMin(styles, el, ctx), Math.min(borderBoxWidth(styles, el, ctx, avail), avail)) : borderBoxWidth(styles, el, ctx, avail);
      if (used + hmargin(styles, el, ctx, avail) > avail + 1) problems.push(`${name(el)} is ${Math.round(used)}px wide in ${Math.round(avail)}px`);
      content = Math.max(0, used - hpad(styles, el, ctx));
    }
    for (const c of el.children) if (c.type === 'text') {
      for (const s of segments(c.text, cs)) if (!wrapsLongWords(cs) || noWrap(cs)) {
        if (glyphs(s, cs) > content + 1) { problems.push(`${name(el)} text "${s.slice(0, 30)}" needs ${Math.round(glyphs(s, cs))}px of ${Math.round(content)}px`); break; }
      }
    }
    if (clips(cs) && el !== html && el !== body) return;
    if (REPLACED.has(el.tag)) return;
    const kids = inFlow(styles, el, ctx);
    const display = cs.display ?? '';
    const gap = Math.max(0, fixedPx(cs['column-gap'], cs, ctx) ?? 0);
    if (/flex/.test(display) && !/column/.test(cs['flex-direction'] ?? '')) {
      const mins = kids.map((k) => itemMin(styles, k, ctx) + hmargin(styles, k, ctx));
      const wrap = /wrap/.test(cs['flex-wrap'] ?? '');
      const total = wrap ? Math.max(0, ...mins) : mins.reduce((a, b) => a + b, 0) + gap * Math.max(0, kids.length - 1);
      if (total > content + 1) problems.push(`${name(el)} row needs ${Math.round(total)}px of ${Math.round(content)}px`);
      kids.forEach((k, i) => {
        const others = wrap ? 0 : mins.reduce((a, b, j) => (j === i ? a : a + b), 0) + gap * Math.max(0, kids.length - 1);
        const share = Math.max(mins[i], content - others) - hmargin(styles, k, ctx);
        const kcs = styles.computed(k, ctx);
        const spec = fixedPx(kcs.width, kcs, ctx);
        visit(k, spec !== null && (kcs['flex-shrink'] ?? '1').trim() !== '0' ? Math.max(share, mins[i]) + hmargin(styles, k, ctx) : share + hmargin(styles, k, ctx), content);
      });
      return;
    }
    if (/grid/.test(display)) {
      const need = gridMin(styles, el, ctx, kids);
      if (need > content + 1) problems.push(`${name(el)} grid needs ${Math.round(need)}px of ${Math.round(content)}px`);
      const tracks = gridTracks(styles, el, ctx, content) ?? [{ auto: true, px: 0 }];
      const fixedSum = tracks.reduce((a, t) => a + t.px, 0) + gap * Math.max(0, tracks.length - 1);
      kids.forEach((k, i) => {
        const t = tracks[i % tracks.length];
        const share = Math.max(t.px, content - (fixedSum - t.px));
        visit(k, Math.min(share, content), content);
      });
      return;
    }
    for (const k of kids) visit(k, content, content);
  };
  visit(html, width, width);
  return problems;
}

// ---------- focus ----------
function shadowLayers(s) {
  if (!s || s.trim().toLowerCase() === 'none') return [];
  return splitTop(s, ',').map((layer) => {
    const toks = splitTop(layer.trim(), ' ');
    const inset = toks.includes('inset');
    const lens = toks.filter((t) => /^-?[\d.]/.test(t)).map((t) => length(t, {}) ?? 0);
    const color = toks.find((t) => t !== 'inset' && !/^-?[\d.]/.test(t));
    return { inset, lens, color: color ?? 'currentcolor' };
  });
}
/**
 * How el shows keyboard focus at a viewport width: { kind, color, outside } or null when nothing changes.
 * kind: 'ua' (browser default ring), 'outline', 'shadow', 'border', 'background', 'underline'.
 */
export function focusIndicator(styles, el, width, extra = {}) {
  const ctx = { width, ...extra }, f = { width, ...extra, focus: el };
  const a = styles.computed(el, ctx), b = styles.computed(el, f);
  const current = parseColor(b.color ?? '#000') ?? [0, 0, 0, 1];
  if (b['outline-style'] === undefined) return { kind: 'ua', color: null, outside: true };
  const style = b['outline-style'].toLowerCase();
  const ow = length(b['outline-width'] ?? 'medium', { em: Number(b['font-size']) }) ?? ({ thin: 1, medium: 3, thick: 5 }[b['outline-width']] ?? 3);
  const oc = parseColor(b['outline-color'] ?? 'currentcolor', current);
  if (style === 'auto') return { kind: 'ua', color: null, outside: true };
  if (style !== 'none' && style !== 'hidden' && ow > 0 && (!oc || oc[3] > 0)) return { kind: 'outline', color: oc, outside: (length(b['outline-offset'] ?? '0', {}) ?? 0) >= 0, width: ow };
  const sb = (b['box-shadow'] ?? 'none').trim(), sa = (a['box-shadow'] ?? 'none').trim();
  if (sb !== sa) {
    const visibleLayers = shadowLayers(sb).filter((l) => l.lens.some((n) => n !== 0)).map((l) => ({ ...l, rgba: parseColor(l.color, current) })).filter((l) => !l.rgba || l.rgba[3] > 0);
    if (visibleLayers.length) {
      const outer = visibleLayers.filter((l) => !l.inset);
      const pick = (outer.length ? outer : visibleLayers);
      return { kind: 'shadow', color: pick[pick.length - 1].rgba, colors: pick.map((l) => l.rgba), outside: outer.length > 0 };
    }
  }
  for (const side of ['top', 'right', 'bottom', 'left']) {
    const w = length(b[`border-${side}-width`] ?? '0', {}) ?? 0;
    if (w >= 1 && (b[`border-${side}-color`] ?? '') !== (a[`border-${side}-color`] ?? '')) return { kind: 'border', color: parseColor(b[`border-${side}-color`], current), outside: false };
    if (w >= 2 && (a[`border-${side}-width`] ?? '0') !== b[`border-${side}-width`]) return { kind: 'border', color: parseColor(b[`border-${side}-color`] ?? 'currentcolor', current), outside: false };
  }
  if ((b['background-color'] ?? '') !== (a['background-color'] ?? '')) return { kind: 'background', color: parseColor(b['background-color'], current), outside: false };
  const td = (s) => s['text-decoration'] ?? s['text-decoration-line'] ?? '';
  if (td(b) !== td(a) && /underline/.test(td(b))) return { kind: 'underline', color: current, outside: false };
  return null;
}
export const focusShows = (styles, el, width) => focusIndicator(styles, el, width) !== null;

// ---------- target size ----------
/** Rough rendered border-box size of a control at ctx: explicit sizes, else padding + line box or text. */
export function targetSize(styles, el, ctx) {
  const cs = styles.computed(el, ctx);
  const fs = Number(cs['font-size']);
  const avail = contentWidth(styles, el.parent, ctx);
  const px = (p, base = avail) => styles.px(el, ctx, p, base);
  const lhRaw = cs['line-height'];
  const lh = lhRaw && lhRaw !== 'normal' ? (/^[\d.]+$/.test(lhRaw) ? Number(lhRaw) * fs : length(lhRaw, { em: fs }) ?? fs * 1.2) : fs * 1.2;
  const bt = (px('border-top-width') ?? 0) + (px('border-bottom-width') ?? 0), bl = (px('border-left-width') ?? 0) + (px('border-right-width') ?? 0);
  const pt = (px('padding-top') ?? 0) + (px('padding-bottom') ?? 0), pl = (px('padding-left') ?? 0) + (px('padding-right') ?? 0);
  const svg = elements(el).find((c) => c.tag === 'svg' || c.tag === 'img');
  const svgH = svg ? styles.px(svg, ctx, 'height', 0) ?? Number(attr(svg, 'height') ?? 0) : 0;
  const svgW = svg ? styles.px(svg, ctx, 'width', 0) ?? Number(attr(svg, 'width') ?? 0) : 0;
  const label = el.tag === 'input' ? attr(el, 'value') ?? 'Submit' : clean(text(el));
  const border = cs['box-sizing'] === 'border-box';
  const box = (prop, pad, b) => {
    if (/%/.test(cs[prop] ?? '') && prop.includes('height')) return null;
    const v = px(prop, prop.includes('height') ? 0 : avail); return v === null ? null : border ? v : v + pad + b;
  };
  let h = box('height', pt, bt) ?? pt + bt + Math.max(lh, svgH);
  const block = /^(block|flex|grid|list-item)$/.test(cs.display ?? '') && !/absolute|fixed/.test(cs.position ?? '') && !/left|right/.test(cs.float ?? '');
  let w = box('width', pl, bl) ?? (block ? avail : pl + bl + Math.max(textWidth(label, fs), svgW));
  const minH = box('min-height', pt, bt), minW = box('min-width', pl, bl);
  if (minH !== null) h = Math.max(h, minH);
  if (minW !== null) w = Math.max(w, minW);
  const maxH = box('max-height', pt, bt); if (maxH !== null) h = Math.min(h, maxH);
  // a flex or grid parent that stretches its items gives them the row height
  const pcs = styles.computed(el.parent, ctx);
  if (/flex|grid/.test(pcs.display ?? '') && !/column/.test(pcs['flex-direction'] ?? '') && /stretch|normal/.test(pcs['align-items'] ?? 'normal') && !/start|end|center|baseline/.test(cs['align-self'] ?? '')) {
    const ph = styles.px(el.parent, ctx, 'min-height', 0) ?? styles.px(el.parent, ctx, 'height', 0);
    if (ph !== null) h = Math.max(h, ph - (styles.px(el.parent, ctx, 'padding-top', 0) ?? 0) - (styles.px(el.parent, ctx, 'padding-bottom', 0) ?? 0));
  }
  return { w, h };
}
/** Contrast of el's focus indicator against what surrounds it (Infinity for the browser default ring or underline). */
export function focusContrast(styles, el, width, extra = {}) {
  const ind = focusIndicator(styles, el, width, extra);
  if (!ind) return 0;
  if (ind.kind === 'ua' || ind.kind === 'underline') return Infinity;
  const f = { width, ...extra, focus: el };
  if (ind.kind === 'background') {
    const before = backgrounds(styles, el, { width, ...extra }), after = backgrounds(styles, el, f);
    return before && after ? Math.min(...after.map((a, i) => contrast(a, before[i % before.length]))) : 0;
  }
  const behind = backgrounds(styles, ind.outside || ind.kind === 'border' ? el.parent : el, f);
  const colors = (ind.colors ?? [ind.color]).filter(Boolean);
  if (!behind || !colors.length) return 0;
  return Math.max(...colors.map((c) => Math.min(...behind.map((bg) => contrast(over(c, bg), bg)))));
}
/** Text elements whose contrast fails AA at a width. extra(el) adds elements to check even when hidden or empty. */
export function contrastFailures(styles, doc, width, extra = () => false, base = {}) {
  const ctx = { width, ...base }; const out = []; let checked = 0;
  for (const el of elements(doc)) {
    if (['script', 'style', 'title', 'head', 'svg', 'option', 'html'].includes(el.tag) || ancestors(el).some((a) => a.tag === 'svg' || a.tag === 'head')) continue;
    const forced = extra(el);
    if (!forced && (!el.children.some((c) => c.type === 'text' && c.text.trim()) || has(el, 'disabled') || !visible(styles, el, ctx))) continue;
    checked++;
    const cs = styles.computed(el, ctx);
    const fg = parseColor(cs.color ?? '#000000'); const bgs = backgrounds(styles, el, ctx);
    const label = `${el.tag}${el.attrs.id ? `#${el.attrs.id}` : ''} "${clean(el.children.filter((c) => c.type === 'text').map((c) => c.text).join(' ')).slice(0, 24)}" at ${width}px`;
    if (!fg || !bgs) { out.push(`${label}: colour not readable`); continue; }
    let opacity = 1;
    for (const n of [el, ...ancestors(el)]) { const o = Number(styles.computed(n, ctx).opacity ?? 1); if (Number.isFinite(o)) opacity *= o; }
    const need = isLargeText(styles, el, ctx) ? 3 : 4.5;
    const worst = Math.min(...bgs.map((bg) => contrast(over([fg[0], fg[1], fg[2], fg[3] * opacity], bg), bg)));
    if (worst < need - 0.005) out.push(`${label}: ${worst.toFixed(2)}`);
  }
  return { failures: out, checked };
}
/** Exposed to assistive tech: rendered (not display:none or visibility:hidden) and not aria-hidden. Visually hidden text counts. */
export function exposed(styles, el, ctx) {
  for (const n of [el, ...ancestors(el)]) {
    if (attr(n, 'aria-hidden') === 'true') return false;
    if (styles.computed(n, ctx).display === 'none') return false;
    if (n.parent?.tag === 'details' && !has(n.parent, 'open') && n.tag !== 'summary') return false;
  }
  return !/hidden|collapse/.test(styles.computed(el, ctx).visibility ?? '');
}

// ---------- forced colours (Windows high contrast) ----------
const SYSTEM = /^(canvas|canvastext|linktext|visitedtext|activetext|buttonface|buttontext|buttonborder|field|fieldtext|highlight|highlighttext|selecteditem|selecteditemtext|mark|marktext|graytext|accentcolor|accentcolortext)$/i;
const isSystem = (v) => !!v && SYSTEM.test(v.trim());
const weight = (w) => ({ normal: 400, bold: 700, bolder: 700, lighter: 300 }[String(w ?? 'normal').trim().toLowerCase()] ?? (Number(w) || 400));
const sideWidth = (cs, side) => (/^(none|hidden)$/.test(cs[`border-${side}-style`] ?? 'none') ? 0 : length(cs[`border-${side}-width`] ?? '0', {}) ?? ({ thin: 1, medium: 3, thick: 5 }[cs[`border-${side}-width`]] ?? 0));
/** Styles as painted in forced colours mode: author colours become system colours unless forced-color-adjust: none. */
export function forcedStyle(styles, el, ctx, pseudo = null) {
  const cs = styles.computed(el, { ...ctx, forcedColors: true }, pseudo);
  if ((cs['forced-color-adjust'] ?? 'auto').trim() === 'none') return { ...cs, preserved: true };
  const out = { ...cs };
  const keep = (v, fallback) => (isSystem(v) ? v.trim().toLowerCase() : fallback);
  out.color = keep(cs.color, 'canvastext');
  const bg = parseColor(cs['background-color'] ?? 'transparent');
  out['background-color'] = isSystem(cs['background-color']) ? cs['background-color'].trim().toLowerCase() : bg && bg[3] === 0 ? 'transparent' : 'canvas';
  for (const side of ['top', 'right', 'bottom', 'left']) out[`border-${side}-color`] = keep(cs[`border-${side}-color`], 'canvastext');
  out['outline-color'] = keep(cs['outline-color'], 'canvastext');
  out['box-shadow'] = 'none';
  if (/gradient/.test(cs['background-image'] ?? '')) out['background-image'] = 'none';
  return out;
}
/** A cue that still tells the selected element from an unselected one in forced colours mode, or null. */
export function forcedSelectionCue(styles, sel, un, ctx) {
  const a = forcedStyle(styles, sel, ctx), b = forcedStyle(styles, un, ctx);
  if (a.preserved) {
    const ca = parseColor(a['background-color'] ?? 'transparent'), cb = parseColor(b['background-color'] ?? 'transparent');
    if (ca && cb && ca[3] > 0 && contrast(over(ca, [255, 255, 255, 1]), over(cb, [255, 255, 255, 1])) >= 3) return 'preserved colours';
  }
  for (const side of ['top', 'right', 'bottom', 'left']) if (sideWidth(a, side) >= 1 && sideWidth(a, side) - sideWidth(b, side) >= 1) return 'border';
  const ow = (cs) => (/^(none|hidden)$/.test(cs['outline-style'] ?? 'none') ? 0 : length(cs['outline-width'] ?? 'medium', {}) ?? 3);
  if (ow(a) > 0 && ow(b) === 0) return 'outline';
  const td = (cs) => /underline|overline/.test(`${cs['text-decoration'] ?? ''} ${cs['text-decoration-line'] ?? ''}`);
  if (td(a) && !td(b)) return 'underline';
  if (weight(a['font-weight']) - weight(b['font-weight']) >= 200) return 'weight';
  if (isSystem(a['background-color']) && !/^canvas$/i.test(a['background-color']) && a['background-color'] !== b['background-color']) return 'system background';
  for (const p of ['before', 'after']) {
    const pa = forcedStyle(styles, sel, ctx, p), pb = forcedStyle(styles, un, ctx, p);
    const has = (cs) => cs.content && !/^(none|normal)$/.test(cs.content.trim()) && cs.display !== 'none';
    if (!has(pa) || (has(pb) && JSON.stringify(pa) === JSON.stringify(pb))) continue;
    if (/^["'].+["']$/.test(pa.content.trim())) return 'marker text';
    if (['top', 'right', 'bottom', 'left'].some((s) => sideWidth(pa, s) >= 1)) return 'marker border';
    if (isSystem(pa['background-color']) && !/^canvas$/i.test(pa['background-color'])) return 'marker system background';
    if (pa.preserved && (parseColor(pa['background-color'] ?? 'transparent')?.[3] ?? 0) > 0) return 'marker preserved';
  }
  return null;
}
/** Keyboard focus still shows in forced colours mode. */
export function forcedFocusOk(styles, el, width) {
  const f = forcedStyle(styles, el, { width, focus: el });
  const style = (f['outline-style'] ?? '').toLowerCase();
  if (f['outline-style'] === undefined || style === 'auto') return true;
  if (style !== 'none' && style !== 'hidden' && (length(f['outline-width'] ?? 'medium', {}) ?? 3) > 0) return true;
  const ind = focusIndicator(styles, el, width, { forcedColors: true });
  if (!ind) return false;
  if (ind.kind === 'underline' || ind.kind === 'ua') return true;
  if (f.preserved) return true;
  if (ind.kind === 'border') { const n = forcedStyle(styles, el, { width }); return ['top', 'right', 'bottom', 'left'].some((s) => sideWidth(f, s) - sideWidth(n, s) >= 1); }
  if (ind.kind === 'background') return isSystem(styles.computed(el, { width, focus: el, forcedColors: true })['background-color']);
  return false;
}

// ---------- sticky header and focus not obscured ----------
/** Rough border-box height of a block at ctx (single-line rows; under-estimates wrapping). */
export function blockHeight(styles, el, ctx, depth = 0) {
  const cs = styles.computed(el, ctx);
  if (cs.display === 'none' || depth > 12) return 0;
  if ((el.tag === 'a' || el.tag === 'button') && !/flex|grid|block/.test(cs.display ?? '')) return targetSize(styles, el, ctx).h;
  if (el.tag === 'a' || el.tag === 'button') return Math.max(targetSize(styles, el, ctx).h, 0);
  const px = (p) => Math.max(0, styles.px(el, ctx, p, 0) ?? 0);
  const pad = px('padding-top') + px('padding-bottom') + px('border-top-width') + px('border-bottom-width');
  const fs = Number(cs['font-size']);
  const lhRaw = cs['line-height'];
  const lh = lhRaw && lhRaw !== 'normal' ? (/^[\d.]+$/.test(lhRaw) ? Number(lhRaw) * fs : length(lhRaw, { em: fs }) ?? fs * 1.2) : fs * 1.2;
  const kids = childElements(el).filter((k) => !/absolute|fixed/.test(styles.computed(k, ctx).position ?? '') && styles.computed(k, ctx).display !== 'none' && !isVisuallyHidden(styles, k, ctx));
  const ownText = el.children.some((c) => c.type === 'text' && c.text.trim());
  const margins = (k) => Math.max(0, styles.px(k, ctx, 'margin-top', 0) ?? 0) + Math.max(0, styles.px(k, ctx, 'margin-bottom', 0) ?? 0);
  let content;
  if (/flex/.test(cs.display ?? '') && !/column/.test(cs['flex-direction'] ?? '')) content = Math.max(ownText ? lh : 0, ...kids.map((k) => blockHeight(styles, k, ctx, depth + 1) + margins(k)));
  else if (/grid/.test(cs.display ?? '')) content = Math.max(ownText ? lh : 0, ...kids.map((k) => blockHeight(styles, k, ctx, depth + 1) + margins(k)));
  else {
    const inlineKids = kids.filter((k) => /^inline/.test(styles.computed(k, ctx).display ?? 'inline'));
    const blockKids = kids.filter((k) => !inlineKids.includes(k));
    content = blockKids.reduce((s, k) => s + blockHeight(styles, k, ctx, depth + 1) + margins(k), 0) + (ownText || inlineKids.length ? Math.max(lh, ...inlineKids.map((k) => blockHeight(styles, k, ctx, depth + 1))) : 0);
  }
  let h = pad + content;
  const box = (p) => { const v = styles.px(el, ctx, p, 0); return v === null || /%/.test(cs[p] ?? '') ? null : cs['box-sizing'] === 'border-box' ? v : v + pad; };
  const fixed = box('height'); if (fixed !== null) h = fixed;
  const min = box('min-height'); if (min !== null) h = Math.max(h, min);
  return h;
}
/** The element that keeps a header pinned to the top at ctx (the header itself or a wrapper), or null. */
export function stickyTop(styles, el, ctx) {
  for (const n of [el, ...ancestors(el)]) {
    const cs = styles.computed(n, ctx);
    if (/sticky|fixed/.test(cs.position ?? '') && (styles.px(n, ctx, 'top', 0) ?? Infinity) <= 1) return n;
  }
  return null;
}
