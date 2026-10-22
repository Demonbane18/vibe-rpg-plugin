// A small DOM over lib.mjs nodes, enough to run a plain tab script and press keys. Unsupported APIs throw
// Unsupported so the caller can fall back to a static reading of the script.
import vm from 'node:vm';
import { elements, childElements, matches, splitTop, parseHTML, text as textOf } from './lib.mjs';

export class Unsupported extends Error {}
const ARIA = ['ariaSelected', 'ariaControls', 'ariaLabel', 'ariaHidden', 'ariaExpanded', 'ariaPressed', 'ariaCurrent', 'ariaLabelledBy', 'ariaOrientation', 'ariaDisabled'];
const attrName = (prop) => prop.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

export function createDom(doc) {
  const wrappers = new Map();
  const listeners = new Map(); // target -> [{type, fn, capture}]
  const state = { active: null, readyState: 'loading', timers: [] };
  const wrap = (node) => {
    if (!node) return null;
    if (node.tag === '#document') return document;
    let w = wrappers.get(node); if (!w) { w = new El(node); wrappers.set(node, w); } return w;
  };
  const query = (root, sel, one) => {
    const scopeEl = root.tag === '#document' ? null : root;
    const list = elements(root).filter((el) => splitTop(sel, ',').some((s) => matches(el, s.trim(), { scopeEl }, null)));
    return one ? wrap(list[0] ?? null) : nodeList(list.map(wrap));
  };
  const nodeList = (arr) => { const nl = [...arr]; nl.item = (i) => nl[i] ?? null; return nl; };
  class Target {
    addEventListener(type, fn, opts) { if (typeof fn !== 'function' && !fn?.handleEvent) return; const l = listeners.get(this) ?? []; l.push({ type, fn, capture: opts === true || !!opts?.capture, once: !!opts?.once }); listeners.set(this, l); }
    removeEventListener(type, fn) { const l = listeners.get(this) ?? []; listeners.set(this, l.filter((x) => !(x.type === type && x.fn === fn))); }
    dispatchEvent(event) { return dispatch(this, event); }
  }
  class El extends Target {
    constructor(node) {
      super(); this._n = node; this.nodeType = 1;
      // element.style reads and writes the style attribute, so the cascade sees script changes
      const read = () => Object.fromEntries((node.attrs.style ?? '').split(';').map((d) => { const k = d.indexOf(':'); return k > 0 ? [d.slice(0, k).trim(), d.slice(k + 1).trim()] : null; }).filter(Boolean));
      const write = (o) => { node.attrs.style = Object.entries(o).filter(([, v]) => v !== '' && v != null).map(([k, v]) => `${k}: ${v}`).join('; '); };
      const kebab = (p) => (p.startsWith('--') ? p : p.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`));
      this.style = new Proxy({}, {
        get: (_, p) => {
          if (p === 'setProperty') return (k, v) => { const o = read(); o[k] = v; write(o); };
          if (p === 'removeProperty') return (k) => { const o = read(); delete o[k]; write(o); };
          if (p === 'getPropertyValue') return (k) => read()[k] ?? '';
          if (p === 'cssText') return node.attrs.style ?? '';
          return typeof p === 'string' ? read()[kebab(p)] ?? '' : undefined;
        },
        set: (_, p, v) => { if (p === 'cssText') { node.attrs.style = String(v); return true; } const o = read(); o[kebab(String(p))] = v === null ? '' : String(v); write(o); return true; },
      });
    }
    get tagName() { return this._n.tag.toUpperCase(); }
    get nodeName() { return this.tagName; }
    get localName() { return this._n.tag; }
    get id() { return this._n.attrs.id ?? ''; } set id(v) { this._n.attrs.id = String(v); }
    get className() { return this._n.attrs.class ?? ''; } set className(v) { this._n.attrs.class = String(v); }
    getAttribute(n) { const v = this._n.attrs[n.toLowerCase()]; return v === undefined ? null : v; }
    setAttribute(n, v) { this._n.attrs[n.toLowerCase()] = String(v); }
    removeAttribute(n) { delete this._n.attrs[n.toLowerCase()]; }
    hasAttribute(n) { return this._n.attrs[n.toLowerCase()] !== undefined; }
    toggleAttribute(n, force) { const on = force === undefined ? !this.hasAttribute(n) : !!force; if (on) this.setAttribute(n, ''); else this.removeAttribute(n); return on; }
    getAttributeNames() { return Object.keys(this._n.attrs); }
    get hidden() { return this.hasAttribute('hidden'); } set hidden(v) { this.toggleAttribute('hidden', !!v); }
    get tabIndex() { const v = this.getAttribute('tabindex'); if (v !== null && /^-?\d+$/.test(v.trim())) return Number(v); return ['button', 'input', 'select', 'textarea'].includes(this._n.tag) || (this._n.tag === 'a' && this.hasAttribute('href')) ? 0 : -1; }
    set tabIndex(v) { this.setAttribute('tabindex', String(v)); }
    get disabled() { return this.hasAttribute('disabled'); } set disabled(v) { this.toggleAttribute('disabled', !!v); }
    get href() { return this.getAttribute('href') ?? ''; }
    get type() { return this.getAttribute('type') ?? (this._n.tag === 'button' ? 'submit' : 'text'); }
    get value() { return this.getAttribute('value') ?? ''; }
    get dataset() {
      const el = this;
      return new Proxy({}, {
        get: (_, k) => (typeof k === 'string' ? el.getAttribute(`data-${attrName(k)}`) ?? undefined : undefined),
        set: (_, k, v) => { el.setAttribute(`data-${attrName(k)}`, v); return true; },
        has: (_, k) => el.hasAttribute(`data-${attrName(String(k))}`),
        deleteProperty: (_, k) => { el.removeAttribute(`data-${attrName(String(k))}`); return true; },
      });
    }
    get classList() {
      const el = this; const list = () => (el._n.attrs.class ?? '').split(/\s+/).filter(Boolean);
      const set = (arr) => { el._n.attrs.class = arr.join(' '); };
      return {
        add: (...c) => set([...new Set([...list(), ...c])]),
        remove: (...c) => set(list().filter((x) => !c.includes(x))),
        toggle: (c, force) => { const on = force === undefined ? !list().includes(c) : !!force; set(on ? [...new Set([...list(), c])] : list().filter((x) => x !== c)); return on; },
        contains: (c) => list().includes(c),
        replace: (a, b) => set(list().map((x) => (x === a ? b : x))),
        get length() { return list().length; },
        forEach: (fn) => list().forEach(fn),
        [Symbol.iterator]: () => list()[Symbol.iterator](),
      };
    }
    get textContent() { return textOf(this._n); }
    set textContent(v) { this._n.children = [{ type: 'text', text: String(v), parent: this._n }]; }
    get innerText() { return this.textContent; } set innerText(v) { this.textContent = v; }
    set innerHTML(v) { const frag = parseHTML(String(v)); this._n.children = frag.children; for (const c of frag.children) c.parent = this._n; }
    get children() { return nodeList(childElements(this._n).map(wrap)); }
    get childElementCount() { return childElements(this._n).length; }
    get parentElement() { const p = this._n.parent; return p && p.tag !== '#document' ? wrap(p) : null; }
    get parentNode() { return wrap(this._n.parent); }
    get firstElementChild() { return wrap(childElements(this._n)[0] ?? null); }
    get lastElementChild() { const c = childElements(this._n); return wrap(c[c.length - 1] ?? null); }
    get nextElementSibling() { const s = this._n.parent ? childElements(this._n.parent) : []; return wrap(s[s.indexOf(this._n) + 1] ?? null); }
    get previousElementSibling() { const s = this._n.parent ? childElements(this._n.parent) : []; return wrap(s[s.indexOf(this._n) - 1] ?? null); }
    get ownerDocument() { return document; }
    get isConnected() { return true; }
    querySelector(s) { return query(this._n, s, true); }
    querySelectorAll(s) { return query(this._n, s, false); }
    getElementsByTagName(t) { return nodeList(elements(this._n).filter((e) => e.tag === t.toLowerCase()).map(wrap)); }
    getElementsByClassName(c) { return this.querySelectorAll(`.${c}`); }
    matches(s) { return splitTop(s, ',').some((x) => matches(this._n, x.trim(), {})); }
    closest(s) { for (let n = this._n; n && n.tag !== '#document'; n = n.parent) if (wrap(n).matches(s)) return wrap(n); return null; }
    contains(o) { for (let n = o?._n; n; n = n.parent) if (n === this._n) return true; return false; }
    focus() { if (state.active === this) return; const prev = state.active; state.active = this; if (prev) { dispatch(prev, mkEvent('blur', { bubbles: false })); dispatch(prev, mkEvent('focusout')); } dispatch(this, mkEvent('focus', { bubbles: false })); dispatch(this, mkEvent('focusin')); }
    blur() { if (state.active === this) state.active = null; }
    click() { dispatch(this, mkEvent('click')); }
    scrollIntoView() {}
    getBoundingClientRect() { return { x: 0, y: 0, top: 0, left: 0, right: 100, bottom: 40, width: 100, height: 40 }; }
    get offsetWidth() { return 100; } get offsetHeight() { return 40; }
    getRootNode() { return document; }
    append() { throw new Unsupported('append'); }
    appendChild() { throw new Unsupported('appendChild'); }
    insertAdjacentHTML() { throw new Unsupported('insertAdjacentHTML'); }
    attachShadow() { throw new Unsupported('shadow DOM'); }
  }
  for (const p of ARIA) Object.defineProperty(El.prototype, p, { get() { return this.getAttribute(attrName(p)); }, set(v) { if (v === null) this.removeAttribute(attrName(p)); else this.setAttribute(attrName(p), v); } });
  const mkEvent = (type, init = {}) => {
    const e = { type, bubbles: init.bubbles ?? true, cancelable: true, defaultPrevented: false, _stop: false, key: init.key, code: init.code, shiftKey: false, altKey: false, ctrlKey: false, metaKey: false, repeat: false, isComposing: false, detail: 1, button: 0,
      preventDefault() { this.defaultPrevented = true; }, stopPropagation() { this._stop = true; }, stopImmediatePropagation() { this._stop = true; this._stopNow = true; }, composedPath() { return this._path ?? []; } };
    if (init.keyCode) { e.keyCode = init.keyCode; e.which = init.keyCode; }
    return e;
  };
  const dispatch = (target, event) => {
    const path = [];
    for (let t = target; t; t = t === document ? win : t === win ? null : t.parentElement ?? document) path.push(t);
    event.target = target; event._path = path; event.srcElement = target;
    const fire = (t, phase) => {
      event.currentTarget = t; event.eventPhase = phase;
      for (const l of [...(listeners.get(t) ?? [])]) {
        if (l.type !== event.type) continue;
        if (phase === 1 && !l.capture) continue; if (phase === 3 && l.capture) continue;
        if (l.once) t.removeEventListener(l.type, l.fn);
        if (typeof l.fn === 'function') l.fn.call(t, event); else l.fn.handleEvent(event);
        if (event._stopNow) break;
      }
      const prop = t[`on${event.type}`]; if (typeof prop === 'function' && phase !== 1) prop.call(t, event);
    };
    for (let i = path.length - 1; i > 0 && !event._stop; i--) fire(path[i], 1);
    if (!event._stop) fire(target, 2);
    if (event.bubbles) for (let i = 1; i < path.length && !event._stop; i++) fire(path[i], 3);
    return !event.defaultPrevented;
  };
  const document = new (class extends Target {
    get documentElement() { return wrap(elements(doc).find((e) => e.tag === 'html')); }
    get body() { return wrap(elements(doc).find((e) => e.tag === 'body')); }
    get activeElement() { return state.active ?? this.body; }
    get readyState() { return state.readyState; }
    get defaultView() { return win; }
    getElementById(id) { return wrap(elements(doc).find((e) => e.attrs.id === id) ?? null); }
    querySelector(s) { return query(doc, s, true); }
    querySelectorAll(s) { return query(doc, s, false); }
    getElementsByTagName(t) { return nodeList(elements(doc).filter((e) => e.tag === t.toLowerCase()).map(wrap)); }
    getElementsByClassName(c) { return this.querySelectorAll(`.${c}`); }
    createElement() { throw new Unsupported('createElement'); }
  })();
  const mq = (q) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, onchange: null });
  const win = new (class extends Target {})();
  Object.assign(win, {
    document, matchMedia: mq, navigator: { userAgent: 'node' }, location: { hash: '', search: '', pathname: '/pricing', href: 'http://localhost/pricing' },
    history: { replaceState() {}, pushState() {} }, localStorage: { getItem: () => null, setItem() {}, removeItem() {} }, sessionStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    requestAnimationFrame: (fn) => { state.timers.push(() => fn(0)); return state.timers.length; }, cancelAnimationFrame() {},
    setTimeout: (fn, ms, ...a) => { if (typeof fn === 'function') state.timers.push(() => fn(...a)); return state.timers.length; }, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
    queueMicrotask: (fn) => state.timers.push(fn), console: { log() {}, warn() {}, error() {}, info() {}, debug() {} },
    CSS: { escape: (s) => String(s).replace(/[^\w-]/g, (c) => `\\${c}`), supports: () => true },
    URLSearchParams, URL,
    getComputedStyle: () => new Proxy({}, { get: (_, k) => (k === 'getPropertyValue' ? () => '' : '') }),
    HTMLElement: El, Element: El, Node: El, Event: function Event(type, init) { return mkEvent(type, init); }, KeyboardEvent: function KeyboardEvent(type, init) { return mkEvent(type, init); },
    CustomEvent: function CustomEvent(type, init) { const e = mkEvent(type, init); e.detail = init?.detail; return e; },
    IntersectionObserver: class { observe() {} unobserve() {} disconnect() {} }, ResizeObserver: class { observe() {} unobserve() {} disconnect() {} }, MutationObserver: class { observe() {} disconnect() {} },
    customElements: { define() { throw new Unsupported('custom elements'); }, get() {} },
  });
  win.window = win; win.self = win; win.globalThis = win;
  const flush = () => { for (let i = 0; i < 50 && state.timers.length; i++) { const t = state.timers.splice(0); for (const fn of t) fn(); } };
  return {
    document, window: win, wrap, flush,
    run(code) {
      if (/^\s*(import|export)\s/m.test(code)) throw new Unsupported('module syntax');
      const context = vm.createContext(win);
      new vm.Script(code, { filename: 'app.js' }).runInContext(context, { timeout: 1000 });
      state.readyState = 'interactive'; dispatch(document, mkEvent('DOMContentLoaded'));
      state.readyState = 'complete'; dispatch(win, mkEvent('load', { bubbles: false })); flush();
    },
    key(target, key) {
      const codes = { ArrowRight: 39, ArrowLeft: 37, ArrowUp: 38, ArrowDown: 40, Home: 36, End: 35, Enter: 13, ' ': 32 };
      const e = mkEvent('keydown', { key, code: key === ' ' ? 'Space' : key, keyCode: codes[key] });
      const go = dispatch(target, e);
      if (go && (key === 'Enter' || key === ' ') && (target._n.tag === 'button' || (key === 'Enter' && target._n.tag === 'a'))) {
        dispatch(target, mkEvent('keyup', { key, keyCode: codes[key] })); dispatch(target, mkEvent('click'));
      } else dispatch(target, mkEvent('keyup', { key, keyCode: codes[key] }));
      flush();
    },
    click(target) { target.focus(); dispatch(target, mkEvent('click')); flush(); },
    get active() { return state.active; },
  };
}
