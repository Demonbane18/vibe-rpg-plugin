#!/usr/bin/env node
// Generated from src/expeditions/cli.ts; Expeditions 0.1.0. Node 22+. Rebuild with bun run build:expeditions.
var __defProp = Object.defineProperty;
var __returnValue = (v) => v;
function __exportSetter(name, newValue) {
  this[name] = __returnValue.bind(null, newValue);
}
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: __exportSetter.bind(all, name)
    });
};

// src/expeditions/adapters/generic.ts
var exports_generic = {};
__export(exports_generic, {
  CAPS: () => CAPS,
  MARKS: () => MARKS,
  normalize: () => normalize
});

// node_modules/zod/v4/classic/iso.js
var exports_iso = {};
__export(exports_iso, {
  ZodISODate: () => ZodISODate,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODuration: () => ZodISODuration,
  ZodISOTime: () => ZodISOTime,
  date: () => date2,
  datetime: () => datetime2,
  duration: () => duration2,
  time: () => time2
});

// src/expeditions/adapters/claude-code.ts
var exports_claude_code = {};
__export(exports_claude_code, {
  CAPS: () => CAPS2,
  normalize: () => normalize2
});

// src/expeditions/adapters/codex.ts
var exports_codex = {};
__export(exports_codex, {
  CAPS: () => CAPS3,
  normalize: () => normalize3
});

// src/expeditions/adapters/gemini.ts
var exports_gemini = {};
__export(exports_gemini, {
  CAPS: () => CAPS4,
  normalize: () => normalize4
});

// src/expeditions/cli.ts
import { existsSync as existsSync3, realpathSync as realpathSync3 } from "node:fs";
import { join as join7 } from "node:path";
import { fileURLToPath as fileURLToPath3 } from "node:url";
import { parseArgs } from "node:util";

// src/shared/expeditions-types.ts
var RULES_VERSION = 1;
var DATA_VERSION = 1;
var CHANNEL_VERSION = 1;
var EXP_AGENTS = ["claude-code", "codex", "omp", "gemini", "generic", "manual"];
var TOOL_KINDS = ["read", "edit", "shell", "test", "ship", "web", "mcp", "skill", "subagent", "other"];
var VERDICTS = ["cleared", "partly", "fizzled", "skip"];
var STANCES = ["press", "steady"];
var BADGES = ["buffed", "restraint"];
var BALANCE = {
  contextMax: 100,
  baseStrike: 10,
  strikeMin: 6,
  strikeMax: 25,
  buffedBonus: 5,
  buffedMax: 2,
  comboBonus: 5,
  restraintBonus: 10,
  costlyPenalty: 2,
  waveHpBase: 3,
  waveHpScale: 10,
  eliteEvery: 5,
  eliteHpMultiplier: 2,
  frontier: 20,
  foeHitBase: 1,
  foeHitWaves: 16,
  turnRestore: 10,
  compactionRestore: 30,
  rallyBonus: 5,
  cardEvery: 5,
  sharpenStrike: 3,
  maxUpgrades: 3,
  restContext: 20,
  levelSessions: [1, 3, 7, 15]
};
var TIMINGS = {
  campAfterMs: 120000,
  idleCloseMs: 2 * 60 * 60 * 1000,
  helperIdleExitMs: 30 * 60 * 1000,
  hookTimeoutMs: 1000,
  guideReplyMs: 800,
  verdictGraceMs: 15 * 60 * 1000
};
var LIVE_PHASES = ["working", "tool", "approval", "waiting", "compacting"];
var LIVE_LIMITS = { projectChars: 48, targetChars: 64 };
var CHANNEL_LIMITS = { requestBytes: 64 * 1024, promptChars: 8000, eventsPerRequest: 32, connections: 16 };

// node_modules/zod/v4/core/util.js
function getEnumValues(entries) {
  const numericValues = Object.values(entries).filter((v) => typeof v === "number");
  const values = Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
  return values;
}
function joinValues(array, separator = "|") {
  return array.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
  if (typeof value === "bigint")
    return value.toString();
  return value;
}

class Cached {
  constructor(getter) {
    this._getter = getter;
    this._value = undefined;
  }
  get value() {
    const getter = this._getter;
    if (getter !== undefined) {
      this._value = getter();
      this._getter = undefined;
    }
    return this._value;
  }
}
function cached(getter) {
  return new Cached(getter);
}
function nullish(input) {
  return input === null || input === undefined;
}
function cleanRegex(source) {
  const start = source.startsWith("^") ? 1 : 0;
  const end = source.endsWith("$") ? source.length - 1 : source.length;
  return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
  const ratio = val / step;
  const roundedRatio = Math.round(ratio);
  const tolerance = 4 * Number.EPSILON * Math.max(Math.abs(ratio), 1);
  if (Math.abs(ratio - roundedRatio) < tolerance)
    return 0;
  return ratio - roundedRatio;
}
function assignProp(target, prop, value) {
  Object.defineProperty(target, prop, {
    value,
    writable: true,
    enumerable: true,
    configurable: true
  });
}
function rawShape(def) {
  const desc = Object.getOwnPropertyDescriptor(def, "shape");
  return desc?.get ? desc.get.raw : desc?.value;
}
function sourceShape(schema) {
  return rawShape(schema._zod.def) ?? schema._zod.def.shape;
}
function deferProp(target, key, getter) {
  Object.defineProperty(target, key, {
    get() {
      const value = getter();
      assignProp(this, key, value);
      return value;
    },
    enumerable: true,
    configurable: true
  });
}
function putProp(target, key, value) {
  if (key in target)
    assignProp(target, key, value);
  else
    target[key] = value;
}
function mirrorShape(target, source, keys, wrap) {
  const raw = sourceShape(source);
  for (const key of keys) {
    const desc = Object.getOwnPropertyDescriptor(raw, key);
    if (!desc.enumerable)
      continue;
    if (desc.get) {
      deferProp(target, key, () => {
        const value = source._zod.def.shape[key];
        return wrap ? wrap(value, key) : value;
      });
    } else
      putProp(target, key, wrap ? wrap(desc.value, key) : desc.value);
  }
}
function mirrorProps(target, source) {
  for (const key of Reflect.ownKeys(source)) {
    const desc = Object.getOwnPropertyDescriptor(source, key);
    if (!desc.enumerable)
      continue;
    if (desc.get)
      deferProp(target, key, () => source[key]);
    else
      putProp(target, key, desc.value);
  }
}
function mergeDefs(...defs) {
  const mergedDescriptors = {};
  for (const def of defs) {
    const descriptors = Object.getOwnPropertyDescriptors(def);
    Object.assign(mergedDescriptors, descriptors);
  }
  return Object.defineProperties({}, mergedDescriptors);
}
function esc(str) {
  return JSON.stringify(str);
}
function slugify(input) {
  return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
function isObject(data) {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}
var allowsEval = /* @__PURE__ */ cached(() => {
  if (globalConfig.jitless) {
    return false;
  }
  if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
    return false;
  }
  try {
    const F = Function;
    new F("");
    return true;
  } catch (_) {
    return false;
  }
});
function isPlainObject(o) {
  if (isObject(o) === false)
    return false;
  const ctor = o.constructor;
  if (ctor === undefined)
    return true;
  if (typeof ctor !== "function")
    return true;
  const prot = ctor.prototype;
  if (isObject(prot) === false)
    return false;
  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function shallowClone(o) {
  if (isPlainObject(o))
    return { ...o };
  if (Array.isArray(o))
    return [...o];
  if (o instanceof Map)
    return new Map(o);
  if (o instanceof Set)
    return new Set(o);
  return o;
}
var propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
  const cl = new inst._zod.constr(def ?? inst._zod.def);
  if (!def || params?.parent)
    cl._zod.parent = inst;
  return cl;
}
function normalizeParams(_params) {
  const params = _params;
  if (!params)
    return {};
  if (typeof params === "string")
    return { error: () => params };
  if (params?.message !== undefined) {
    if (params?.error !== undefined)
      throw new Error("Cannot specify both `message` and `error` params");
    params.error = params.message;
  }
  delete params.message;
  if (typeof params.error === "string")
    return { ...params, error: () => params.error };
  return params;
}
function stringifyPrimitive(value) {
  if (typeof value === "bigint")
    return value.toString() + "n";
  if (typeof value === "string")
    return `"${value}"`;
  return `${value}`;
}
function optionalKeys(shape) {
  return Object.keys(shape).filter((k) => {
    return shape[k]._zod.optin !== undefined && shape[k]._zod.optout === "optional";
  });
}
var NUMBER_FORMAT_RANGES = /* @__PURE__ */ (() => ({
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-340282346638528860000000000000000000000, 340282346638528860000000000000000000000],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
}))();
var BIGINT_FORMAT_RANGES = {
  int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
  uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
};
function pick(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  }
  const newShape = {};
  mirrorShape(newShape, schema, maskedKeys(schema, mask));
  return clone(schema, mergeDefs(currDef, { shape: newShape, checks: [] }));
}
function maskedKeys(schema, mask) {
  const raw = sourceShape(schema);
  const keys = [];
  for (const key of Reflect.ownKeys(mask)) {
    if (!Object.getOwnPropertyDescriptor(raw, key)?.enumerable) {
      throw new Error(`Unrecognized key: "${String(key)}"`);
    }
    if (mask[key])
      keys.push(key);
  }
  return keys;
}
function omit(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  }
  const omitted = new Set(maskedKeys(schema, mask));
  const newShape = {};
  mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)).filter((key) => !omitted.has(key)));
  return clone(schema, mergeDefs(currDef, { shape: newShape, checks: [] }));
}
function extend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to extend: expected a plain object");
  }
  const checks = schema._zod.def.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    const existingShape = sourceShape(schema);
    for (const key of Reflect.ownKeys(shape)) {
      if (Object.getOwnPropertyDescriptor(existingShape, key) !== undefined) {
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
      }
    }
  }
  return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
}
function extended(schema, shape) {
  const newShape = {};
  mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)));
  mirrorProps(newShape, shape);
  return newShape;
}
function safeExtend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to safeExtend: expected a plain object");
  }
  return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
}
function merge(a, b) {
  if (!b?._zod?.def) {
    throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
  }
  if (a._zod.def.checks?.length) {
    throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
  }
  const newShape = {};
  mirrorShape(newShape, a, Reflect.ownKeys(sourceShape(a)));
  mirrorShape(newShape, b, Reflect.ownKeys(sourceShape(b)));
  const def = mergeDefs(a._zod.def, {
    shape: newShape,
    get catchall() {
      return b._zod.def.catchall;
    },
    checks: b._zod.def.checks ?? []
  });
  return clone(a, def);
}
function partial(Class, schema, mask, name = "partial") {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(`.${name}() cannot be used on object schemas containing refinements`);
  }
  const selected = mask ? new Set(maskedKeys(schema, mask)) : undefined;
  const newShape = {};
  mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), Class && ((value, key) => selected && !selected.has(key) ? value : new Class({ type: "optional", innerType: value })));
  return clone(schema, mergeDefs(schema._zod.def, { shape: newShape, checks: [] }));
}
function required(Class, schema, mask) {
  const selected = mask ? new Set(maskedKeys(schema, mask)) : undefined;
  const newShape = {};
  mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), (value, key) => selected && !selected.has(key) ? value : new Class({ type: "nonoptional", innerType: value }));
  return clone(schema, mergeDefs(schema._zod.def, { shape: newShape }));
}
function aborted(x, startIndex = 0) {
  if (x.aborted === true)
    return true;
  for (let i = startIndex;i < x.issues.length; i++) {
    if (x.issues[i]?.continue !== true) {
      return true;
    }
  }
  return false;
}
function explicitlyAborted(x, startIndex = 0) {
  if (x.aborted === true)
    return true;
  for (let i = startIndex;i < x.issues.length; i++) {
    if (x.issues[i]?.continue === false) {
      return true;
    }
  }
  return false;
}
function prefixIssues(path, issues) {
  return issues.map((iss) => {
    var _a;
    (_a = iss).path ?? (_a.path = []);
    iss.path.unshift(path);
    return iss;
  });
}
function unwrapMessage(message) {
  return typeof message === "string" ? message : message?.message;
}
function sizeCaps(defChecks) {
  const caps = [];
  for (const ch of defChecks ?? []) {
    const d = ch._zod.def;
    if (!/_(length|size)$|_equals$/.test(d.check))
      break;
    const max = d.maximum ?? d.length ?? d.size;
    if (max >= 0)
      caps.push([max, ch]);
  }
  return caps;
}
function attachSchema(issues, start, inst) {
  var _a;
  for (let i = start;i < issues.length; i++) {
    (_a = issues[i]).schema ?? (_a.schema = inst);
  }
}
function finalizeIssue(iss, ctx, config) {
  var _a;
  const traits = iss.inst?._zod?.traits;
  if (traits?.has("$ZodType")) {
    if (traits.has("$ZodCheck"))
      (_a = iss).schema ?? (_a.schema = iss.inst);
    else
      iss.schema = iss.inst;
  }
  const schemaError = iss.schema !== iss.inst ? iss.schema?._zod.def?.error : undefined;
  const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(schemaError?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
  const full = {};
  for (const k of Object.keys(iss)) {
    if (k === "inst" || k === "schema" || k === "continue" || k === "input" || k === "__proto__")
      continue;
    full[k] = iss[k];
  }
  full.path ?? (full.path = []);
  full.message = message;
  if (ctx?.reportInput) {
    full.input = iss.input;
  }
  return full;
}
var highSurrogate = /[\uD800-\uDBFF]/;
function codePointLength(str) {
  const units = str.length;
  if (!highSurrogate.test(str))
    return units;
  let count = units;
  for (let i = 0;i < units - 1; i++) {
    if ((str.charCodeAt(i) & 64512) === 55296 && (str.charCodeAt(i + 1) & 64512) === 56320) {
      count--;
      i++;
    }
  }
  return count;
}
function getLengthableOrigin(input) {
  if (Array.isArray(input))
    return "array";
  if (typeof input === "string")
    return "string";
  return "unknown";
}
function parsedType(data) {
  const t = typeof data;
  switch (t) {
    case "number": {
      return Number.isNaN(data) ? "nan" : "number";
    }
    case "object": {
      if (data === null) {
        return "null";
      }
      if (Array.isArray(data)) {
        return "array";
      }
      const obj = data;
      if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) {
        return obj.constructor.name;
      }
    }
  }
  return t;
}
function issue(...args) {
  const [iss, input, inst] = args;
  if (typeof iss === "string") {
    return {
      message: iss,
      code: "custom",
      input,
      inst
    };
  }
  return { ...iss };
}
function members(proto, table) {
  for (const key in table) {
    const desc = Object.getOwnPropertyDescriptor(table, key);
    if (desc.get)
      Object.defineProperty(proto, key, { ...desc, enumerable: false });
    else
      defineBound(proto, key, desc.value);
  }
}
function own(inst, key, value, enumerable = true) {
  Object.defineProperty(inst, key, { configurable: true, writable: true, enumerable, value });
  return value;
}
function hide(inst, key, value) {
  return own(inst, key, value, false);
}
function derived(computes, table) {
  for (const key in computes) {
    const compute = computes[key];
    Object.defineProperty(table, key, {
      configurable: true,
      enumerable: true,
      get() {
        return own(this, key, compute(this));
      },
      set(value) {
        own(this, key, value);
      }
    });
  }
  return table;
}
function defineBound(proto, key, fn) {
  Object.defineProperty(proto, key, {
    configurable: true,
    get() {
      return this == null ? fn : own(this, key, fn.bind(this));
    },
    set(value) {
      own(this, key, value);
    }
  });
}
function claim(inst, sentinel) {
  const proto = Object.getPrototypeOf(inst);
  return sentinel in proto ? undefined : proto;
}
var installing;
var broke = false;
var breaker = {
  configurable: true,
  get() {
    broke = true;
    return;
  }
};
function defineLazyInternal(inst, key, compute) {
  const proto = Object.getPrototypeOf(inst._zod);
  if (key in proto && installing !== inst._zod) {
    installing = undefined;
    return;
  }
  installing = inst._zod;
  Object.defineProperty(proto, key, {
    configurable: true,
    get() {
      Object.defineProperty(this, key, breaker);
      const outer = broke;
      broke = false;
      try {
        const value = compute(this);
        if (broke)
          delete this[key];
        else
          Object.defineProperty(this, key, { configurable: true, writable: true, value });
        broke = broke || outer;
        return value;
      } catch (err) {
        delete this[key];
        broke = broke || outer;
        throw err;
      }
    },
    set(value) {
      Object.defineProperty(this, key, { configurable: true, writable: true, value });
    }
  });
}
function installLazyProp(inst, key, make, enumerable) {
  const proto = claim(inst, key);
  if (!proto)
    return;
  Object.defineProperty(proto, key, {
    configurable: true,
    get() {
      const desc = { configurable: true, writable: true, enumerable, value: undefined };
      Object.defineProperty(this, key, desc);
      desc.value = make(this);
      Object.defineProperty(this, key, desc);
      return desc.value;
    },
    set(value) {
      Object.defineProperty(this, key, { configurable: true, writable: true, enumerable, value });
    }
  });
}
var CONSTANT_CATCH = "~constantCatch";
function constantCatch(value) {
  const fn = () => value;
  fn[CONSTANT_CATCH] = true;
  return fn;
}

// node_modules/zod/v4/core/core.js
var _a;
var _zodDesc = { value: undefined, enumerable: false };
var _E = "captureStackTrace" in Error ? Error : null;
function newError(Definition) {
  const E = _E;
  if (E) {
    const saved = E.stackTraceLimit;
    if (typeof saved === "number") {
      try {
        E.stackTraceLimit = 0;
      } catch {
        _E = null;
        return new Definition;
      }
      try {
        return new Definition;
      } finally {
        E.stackTraceLimit = saved;
      }
    }
  }
  return new Definition;
}
function $constructor(name, initializer, proto, params) {
  const zodProto = {};
  function Internals(def) {
    this.def = def;
    this.constr = _;
    this.traits = new Set;
  }
  Internals.prototype = zodProto;
  const protoMembers = proto;
  const initialized = protoMembers && new WeakSet;
  function init(inst, def) {
    if (!inst._zod) {
      _zodDesc.value = new Internals(def);
      try {
        Object.defineProperty(inst, "_zod", _zodDesc);
      } finally {
        _zodDesc.value = undefined;
      }
    } else if (inst._zod.traits.has(name)) {
      return;
    }
    inst._zod.traits.add(name);
    initializer(inst, def);
    if (initialized) {
      const own = Object.getPrototypeOf(inst);
      const ctorProto = inst._zod.constr.prototype;
      let up = own;
      while (up && up !== ctorProto)
        up = Object.getPrototypeOf(up);
      const target = up ?? own;
      if (!initialized.has(target)) {
        initialized.add(target);
        members(target, protoMembers);
      }
    }
    const proto = _.prototype;
    for (const k in proto) {
      if (!Object.prototype.hasOwnProperty.call(proto, k))
        continue;
      if (!(k in inst)) {
        inst[k] = proto[k].bind(inst);
      }
    }
  }
  const Parent = params?.Parent ?? Object;

  class Definition extends Parent {
  }
  Object.defineProperty(Definition, "name", { value: name });
  function _(def) {
    const inst = params?.Parent ? newError(Definition) : this;
    init(inst, def);
    const deferred = inst._zod.deferred;
    if (deferred) {
      for (const fn of deferred) {
        fn();
      }
      inst._zod.deferred = undefined;
    }
    const pp = globalThis.__zod_globalConfig?.postProcessor;
    if (pp)
      pp(inst);
    return inst;
  }
  Object.defineProperty(_, "init", { value: init });
  Object.defineProperty(_, Symbol.hasInstance, {
    value: (inst) => {
      if (params?.Parent && inst instanceof params.Parent)
        return true;
      return inst?._zod?.traits?.has(name);
    }
  });
  Object.defineProperty(_, "name", { value: name });
  return _;
}
class $ZodAsyncError extends Error {
  constructor() {
    super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
  }
}

class $ZodEncodeError extends Error {
  constructor(name) {
    super(`Encountered unidirectional transform during encode: ${name}`);
    this.name = "ZodEncodeError";
  }
}
(_a = globalThis).__zod_globalConfig ?? (_a.__zod_globalConfig = {});
var globalConfig = globalThis.__zod_globalConfig;
function config(newConfig) {
  if (newConfig)
    Object.assign(globalConfig, newConfig);
  return globalConfig;
}
// node_modules/zod/v4/core/errors.js
function _getMessage() {
  const internals = this._zod;
  internals.message ?? (internals.message = JSON.stringify(internals.def, jsonStringifyReplacer, 2));
  return internals.message;
}
function _setMessage(value) {
  this._zod.message = value;
}
var _messageDesc = {
  get: _getMessage,
  set: _setMessage,
  enumerable: true,
  configurable: true
};
var _issuesDesc = { value: undefined, enumerable: false };
var _installedToString = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
var initializer = (inst, def) => {
  inst.name = "$ZodError";
  _issuesDesc.value = def;
  Object.defineProperty(inst, "issues", _issuesDesc);
  _issuesDesc.value = undefined;
  Object.defineProperty(inst, "message", _messageDesc);
  const proto = Object.getPrototypeOf(inst);
  if (!_installedToString.has(proto)) {
    _installedToString.add(proto);
    Object.defineProperty(proto, "toString", {
      configurable: true,
      enumerable: false,
      get() {
        const value = () => this.message;
        Object.defineProperty(this, "toString", { value, configurable: true, writable: true });
        return value;
      },
      set(value) {
        Object.defineProperty(this, "toString", { value, configurable: true, writable: true });
      }
    });
  }
};
var $ZodError = $constructor("$ZodError", initializer);
var $ZodRealError = $constructor("$ZodError", initializer, undefined, {
  Parent: Error
});
function node(obj, key, make) {
  if (!Object.prototype.hasOwnProperty.call(obj, key)) {
    if (key === "__proto__") {
      Object.defineProperty(obj, key, { value: make(), writable: true, enumerable: true, configurable: true });
    } else {
      obj[key] = make();
    }
  }
  return obj[key];
}
function flattenError(error, mapper = (issue) => issue.message) {
  const fieldErrors = {};
  const formErrors = [];
  for (const sub of error.issues) {
    if (sub.path.length > 0) {
      node(fieldErrors, sub.path[0], () => []).push(mapper(sub));
    } else {
      formErrors.push(mapper(sub));
    }
  }
  return { formErrors, fieldErrors };
}
function formatError(error, mapper = (issue) => issue.message) {
  const fieldErrors = { _errors: [] };
  const processError = (error, path = []) => {
    for (const issue of error.issues) {
      if (issue.code === "invalid_union" && issue.errors.length) {
        issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
      } else if (issue.code === "invalid_key") {
        processError({ issues: issue.issues }, [...path, ...issue.path]);
      } else if (issue.code === "invalid_element") {
        processError({ issues: issue.issues }, [...path, ...issue.path]);
      } else {
        const fullpath = [...path, ...issue.path];
        if (fullpath.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < fullpath.length) {
            const el = fullpath[i];
            const terminal = i === fullpath.length - 1;
            if (el === "_errors") {
              if (terminal)
                curr._errors.push(mapper(issue));
              i++;
              continue;
            }
            if (!Object.prototype.hasOwnProperty.call(curr, el)) {
              Object.defineProperty(curr, el, {
                value: { _errors: [] },
                enumerable: true,
                writable: true,
                configurable: true
              });
            }
            const node = curr[el];
            if (terminal) {
              node._errors.push(mapper(issue));
            }
            curr = node;
            i++;
          }
        }
      }
    }
  };
  processError(error);
  return fieldErrors;
}

// node_modules/zod/v4/core/parse.js
function finalizeParams(callee, params) {
  return { callee: params?.callee ?? callee, Err: params?.Err };
}
var _parse = (_Err) => {
  const fn = (schema, value, _ctx, _params) => {
    const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
    const result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise) {
      throw new $ZodAsyncError;
    }
    if (result.issues.length) {
      const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
      captureStackTrace(e, _params?.callee ?? fn);
      throw e;
    }
    return result.value;
  };
  return fn;
};
var _parseAsync = (_Err) => {
  const fn = async (schema, value, _ctx, params) => {
    const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
    let result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise)
      result = await result;
    if (result.issues.length) {
      const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
      captureStackTrace(e, params?.callee ?? fn);
      throw e;
    }
    return result.value;
  };
  return fn;
};
var _safeParse = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError;
  }
  return result.issues.length ? failure(_Err, result.issues, ctx) : { success: true, data: result.value };
};
function failure(Err, issues, ctx) {
  let error;
  return {
    success: false,
    get error() {
      if (!error) {
        error = new Err(issues.map((iss) => finalizeIssue(iss, ctx, config())));
        issues = undefined;
        ctx = undefined;
      }
      return error;
    },
    set error(e) {
      error = e;
      issues = undefined;
      ctx = undefined;
    }
  };
}
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  return result.issues.length ? failure(_Err, result.issues, ctx) : { success: true, data: result.value };
};
var COMPILE_INVALID = /* @__PURE__ */ Symbol.for("zod.compile.invalid");
var COMPILE_FALLBACK = /* @__PURE__ */ Symbol.for("zod.compile.fallback");
var validate = (schema, value, _ctx) => {
  const validator = schema._zod.bag.validator;
  if (validator !== undefined) {
    if (validator(value) !== COMPILE_INVALID)
      return true;
    if (validator.definite === true && _ctx === undefined)
      return false;
  }
  return validateFallback(schema, value, _ctx);
};
function validateFallback(schema, value, _ctx) {
  const ctx = _ctx ? { ..._ctx, async: false, abortEarly: true } : { async: false, abortEarly: true };
  const fallbackRun = schema._zod.bag.fallbackRun;
  let result;
  if (fallbackRun) {
    ctx[COMPILE_FALLBACK] = true;
    result = fallbackRun({ value, issues: [] }, ctx);
  } else {
    result = schema._zod.run({ value, issues: [] }, ctx);
  }
  if (result instanceof Promise) {
    throw new $ZodAsyncError;
  }
  return result.issues.length === 0;
}
var validateAsync = async (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: true, abortEarly: true } : { async: true, abortEarly: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  return result.issues.length === 0;
};
var _encode = (_Err) => {
  const parse = _parse(_Err);
  const fn = (schema, value, _ctx, _params) => {
    const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
    return parse(schema, value, ctx, finalizeParams(fn, _params));
  };
  return fn;
};
var _decode = (_Err) => {
  const parse = _parse(_Err);
  const fn = (schema, value, _ctx, _params) => {
    return parse(schema, value, _ctx, finalizeParams(fn, _params));
  };
  return fn;
};
var _encodeAsync = (_Err) => {
  const parseAsync = _parseAsync(_Err);
  const fn = async (schema, value, _ctx, _params) => {
    const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
    return await parseAsync(schema, value, ctx, finalizeParams(fn, _params));
  };
  return fn;
};
var _decodeAsync = (_Err) => {
  const parseAsync = _parseAsync(_Err);
  const fn = async (schema, value, _ctx, _params) => {
    return await parseAsync(schema, value, _ctx, finalizeParams(fn, _params));
  };
  return fn;
};
var _safeEncode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
  return _safeParse(_Err)(schema, value, ctx);
};
var _safeDecode = (_Err) => (schema, value, _ctx) => {
  return _safeParse(_Err)(schema, value, _ctx);
};
var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
  return _safeParseAsync(_Err)(schema, value, ctx);
};
var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _safeParseAsync(_Err)(schema, value, _ctx);
};
// node_modules/zod/v4/core/regexes.js
var cuid = /^[cC][0-9a-z]{6,}$/;
var cuid2 = /^[0-9a-z]+$/;
var ulid = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/;
var xid = /^[0-9a-vA-V]{20}$/;
var ksuid = /^[A-Za-z0-9]{27}$/;
var nanoid = /^[a-zA-Z0-9_-]{21}$/;
function nanoidOfLength(length) {
  return new RegExp(`^[a-zA-Z0-9_-]{${length}}$`);
}
var duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
var uuid = (version) => {
  if (!version)
    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
  return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
var email = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var _emoji = `^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$`;
function emoji() {
  return new RegExp(_emoji, "u");
}
var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var base64url = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;
var httpProtocol = /^https?$/;
var e164 = /^\+[1-9]\d{6,14}$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
function anchor(source) {
  return new RegExp(`^${source}$`);
}
var date = /* @__PURE__ */ anchor(dateSource);
function timeSource(args) {
  const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : args.seconds ? `${hhmm}:[0-5]\\d(?:\\.\\d+)?` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
  return regex;
}
function time(args) {
  return new RegExp(`^${timeSource(args)}$`);
}
function datetime(args) {
  const opts = ["Z"];
  if (args.offset)
    opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
  const qualified = `${timeSource({ precision: args.precision, seconds: true })}(?:${opts.join("|")})`;
  const timeRegex = args.local ? `${qualified}|${timeSource({ precision: args.precision })}` : qualified;
  return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
var anyString = /^[\s\S]{0,}$/;
var integer = /^-?\d+$/;
var number = /^-?\d+(?:\.\d+)?$/;
var boolean = /^(?:true|false)$/i;
var lowercase = /^[^A-Z]*$/;
var uppercase = /^[^a-z]*$/;

// node_modules/zod/v4/core/checks.js
var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
  var _a;
  inst._zod ?? (inst._zod = {});
  inst._zod.def = def;
  (_a = inst._zod).onattach ?? (_a.onattach = []);
});
var _whenHasLength = (payload) => {
  const val = payload.value;
  return !nullish(val) && val.length !== undefined;
};
var numericOriginMap = {
  number: "number",
  bigint: "bigint",
  object: "date"
};
var $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
      return;
    }
    payload.issues.push({
      origin: numericOriginMap[typeof payload.value] ?? origin,
      code: "too_big",
      maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
      return;
    }
    payload.issues.push({
      origin: numericOriginMap[typeof payload.value] ?? origin,
      code: "too_small",
      minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    if (typeof payload.value !== typeof def.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    const isMultiple = typeof payload.value === "bigint" ? def.value !== BigInt(0) && payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0;
    if (isMultiple)
      return;
    payload.issues.push({
      origin: typeof payload.value,
      code: "not_multiple_of",
      divisor: def.value,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  def.format = def.format || "float64";
  const isInt = def.format?.includes("int");
  const origin = isInt ? "int" : "number";
  const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (isInt) {
      if (!Number.isInteger(input)) {
        payload.issues.push({
          expected: origin,
          format: def.format,
          code: "invalid_type",
          continue: false,
          input,
          inst
        });
        return;
      }
      if (!Number.isSafeInteger(input)) {
        if (input > 0) {
          payload.issues.push({
            input,
            code: "too_big",
            maximum: Number.MAX_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        } else {
          payload.issues.push({
            input,
            code: "too_small",
            minimum: Number.MIN_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        }
        return;
      }
    }
    if (input < minimum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_big",
        maximum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
  inst._zod.check = (payload) => {
    const input = payload.value;
    const units = input.length;
    const length = typeof input === "string" && units > def.maximum ? codePointLength(input) : units;
    if (length <= def.maximum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
  inst._zod.check = (payload) => {
    const input = payload.value;
    const units = input.length;
    const length = typeof input === "string" && units >= def.minimum && units < def.minimum * 2 ? codePointLength(input) : units;
    if (length >= def.minimum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
  inst._zod.check = (payload) => {
    const input = payload.value;
    const units = input.length;
    const length = typeof input === "string" && units >= def.length && units <= def.length * 2 ? codePointLength(input) : units;
    if (length === def.length)
      return;
    const origin = getLengthableOrigin(input);
    const tooBig = length > def.length;
    payload.issues.push({
      origin,
      ...tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
  var _a, _b;
  $ZodCheck.init(inst, def);
  if (def.pattern)
    (_a = inst._zod).check ?? (_a.check = (payload) => {
      def.pattern.lastIndex = 0;
      if (def.pattern.test(payload.value))
        return;
      payload.issues.push({
        origin: "string",
        code: "invalid_format",
        format: def.format,
        input: payload.value,
        ...def.pattern ? { pattern: def.pattern.toString() } : {},
        inst,
        continue: !def.abort
      });
    });
  else
    (_b = inst._zod).check ?? (_b.check = () => {});
});
var $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    def.pattern.lastIndex = 0;
    if (def.pattern.test(payload.value))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: payload.value,
      pattern: def.pattern.toString(),
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
  def.pattern ?? (def.pattern = lowercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
  def.pattern ?? (def.pattern = uppercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
  $ZodCheck.init(inst, def);
  const escapedRegex = escapeRegex(def.includes);
  const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position},}${escapedRegex}` : escapedRegex);
  def.pattern = pattern;
  inst._zod.check = (payload) => {
    if (payload.value.includes(def.includes, def.position))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: def.includes,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.check = (payload) => {
    if (payload.value.startsWith(def.prefix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: def.prefix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.check = (payload) => {
    if (payload.value.endsWith(def.suffix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: def.suffix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    payload.value = def.tx(payload.value);
  };
});

// node_modules/zod/v4/core/doc.js
class Doc {
  constructor(args = [], closed = {}) {
    this.content = [];
    this.indent = 0;
    this.args = args;
    this.closed = closed;
  }
  indented(fn) {
    this.indent += 1;
    try {
      fn(this);
    } finally {
      this.indent -= 1;
    }
  }
  write(arg) {
    if (typeof arg === "function") {
      arg(this, { execution: "sync" });
      arg(this, { execution: "async" });
      return;
    }
    const content = arg;
    const lines = content.split(`
`).filter((x) => x);
    const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
    const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
    for (const line of dedented) {
      this.content.push(line);
    }
  }
  compile() {
    const F = Function;
    const content = this?.content ?? [``];
    const factory = new F(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {
${content.join(`
`)}
};`);
    return factory(...Object.values(this.closed));
  }
}

// node_modules/zod/v4/core/versions.js
var version = {
  major: 4,
  minor: 6,
  patch: 7
};

// node_modules/zod/v4/core/schemas.js
var $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
  var _a;
  inst ?? (inst = {});
  inst._zod.def = def;
  inst._zod.bag = inst._zod.bag || {};
  inst._zod.version = version;
  const defChecks = inst._zod.def.checks;
  const checks = inst._zod.traits.has("$ZodCheck") ? [inst, ...defChecks ?? []] : defChecks?.length ? [...defChecks] : [];
  for (const ch of checks) {
    for (const fn of ch._zod.onattach) {
      fn(inst);
    }
  }
  if (checks.length === 0) {
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    inst._zod.deferred?.push(() => {
      inst._zod.run = inst._zod.parse;
    });
  } else {
    const runChecks = (payload, checks, ctx) => {
      if (payload.memo)
        return payload;
      let isAborted = aborted(payload);
      let asyncResult;
      for (const ch of checks) {
        if (ch._zod.def.when) {
          if (explicitlyAborted(payload))
            continue;
          const shouldRun = ch._zod.def.when(payload);
          if (!shouldRun)
            continue;
        } else if (isAborted) {
          continue;
        }
        const currLen = payload.issues.length;
        const _ = ch._zod.check(payload);
        if (_ instanceof Promise && ctx?.async === false) {
          throw new $ZodAsyncError;
        }
        if (asyncResult || _ instanceof Promise) {
          asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
            await _;
            const nextLen = payload.issues.length;
            if (nextLen === currLen)
              return;
            attachSchema(payload.issues, currLen, inst);
            if (!isAborted)
              isAborted = aborted(payload, currLen);
          });
        } else {
          const nextLen = payload.issues.length;
          if (nextLen === currLen)
            continue;
          attachSchema(payload.issues, currLen, inst);
          if (!isAborted)
            isAborted = aborted(payload, currLen);
        }
      }
      if (asyncResult) {
        return asyncResult.then(() => {
          return payload;
        });
      }
      return payload;
    };
    const handleCanaryResult = (canary, payload, ctx) => {
      if (aborted(canary)) {
        canary.aborted = true;
        return canary;
      }
      const checkResult = runChecks(payload, checks, ctx);
      if (checkResult instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError;
        return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
      }
      return inst._zod.parse(checkResult, ctx);
    };
    inst._zod.run = (payload, ctx) => {
      if (ctx.skipChecks) {
        return inst._zod.parse(payload, ctx);
      }
      if (ctx.direction === "backward") {
        const canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: true });
        if (canary instanceof Promise) {
          return canary.then((canary) => {
            return handleCanaryResult(canary, payload, ctx);
          });
        }
        return handleCanaryResult(canary, payload, ctx);
      }
      const result = inst._zod.parse(payload, ctx);
      if (result instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError;
        return result.then((result) => runChecks(result, checks, ctx));
      }
      return runChecks(result, checks, ctx);
    };
  }
}, {
  get "~standard"() {
    return hide(this, "~standard", standardProps(this));
  },
  set "~standard"(value) {
    own(this, "~standard", value);
  }
});
var toStandardResult = (r, ctx) => r.issues.length ? { issues: r.issues.map((iss) => finalizeIssue(iss, ctx, config())) } : { value: r.value };
async function validateAsync2(inst, value) {
  const ctx = { async: true };
  return toStandardResult(await inst._zod.run({ value, issues: [] }, ctx), ctx);
}
function standardProps(inst) {
  return {
    validate: (value) => {
      const ctx = { async: false };
      try {
        const r = inst._zod.run({ value, issues: [] }, ctx);
        if (!(r instanceof Promise))
          return toStandardResult(r, ctx);
      } catch (_) {}
      return validateAsync2(inst, value);
    },
    vendor: "zod",
    version: 1
  };
}
var $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = def.pattern ?? anyString;
  inst._zod.parse = (payload, _) => {
    if (def.coerce)
      try {
        payload.value = String(payload.value);
      } catch (_) {}
    if (typeof payload.value === "string")
      return payload;
    payload.issues.push({
      expected: "string",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  $ZodString.init(inst, def);
});
var $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
  def.pattern ?? (def.pattern = guid);
  $ZodStringFormat.init(inst, def);
});
var $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
  if (def.version) {
    const versionMap = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    };
    const v = versionMap[def.version];
    if (v === undefined)
      throw new Error(`Invalid UUID version: "${def.version}"`);
    def.pattern ?? (def.pattern = uuid(v));
  } else
    def.pattern ?? (def.pattern = uuid());
  $ZodStringFormat.init(inst, def);
});
var $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
  def.pattern ?? (def.pattern = email);
  $ZodStringFormat.init(inst, def);
});
var URL_BAD_FORMAT = 1;
var URL_UNPARSEABLE = 2;
function canParseURL(input) {
  try {
    if (typeof URL !== "undefined" && typeof URL.canParse === "function")
      return URL.canParse(input);
    new URL(input);
    return true;
  } catch {
    return false;
  }
}
function validateURL(trimmed, def) {
  if (!("normalize" in def) && !("hostname" in def) && !("protocol" in def)) {
    return canParseURL(trimmed) || URL_UNPARSEABLE;
  }
  return parseURLObject(trimmed, def);
}
function parseURLObject(trimmed, def) {
  if (!def.normalize && def.protocol?.source === httpProtocol.source && !/^https?:\/\//i.test(trimmed)) {
    return URL_BAD_FORMAT;
  }
  try {
    if (typeof URL !== "undefined") {
      const URLStatic = URL;
      if (typeof URLStatic.parse === "function")
        return URLStatic.parse(trimmed) ?? URL_UNPARSEABLE;
    }
    return new URL(trimmed);
  } catch {
    return URL_UNPARSEABLE;
  }
}
var asciiTabOrNewline = /[\t\n\r]/g;
function stripTabAndNewline(value) {
  return value.replace(asciiTabOrNewline, "");
}
function urlHostnameOk(url, hostname) {
  hostname.lastIndex = 0;
  return hostname.test(url.hostname);
}
function urlProtocolOk(url, protocol) {
  protocol.lastIndex = 0;
  return protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol);
}
var $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    try {
      const trimmed = payload.value.trim();
      const url = validateURL(trimmed, def);
      if (url === URL_BAD_FORMAT) {
        payload.issues.push({
          code: "invalid_format",
          format: "url",
          note: "Invalid URL format",
          input: payload.value,
          inst,
          continue: !def.abort
        });
        return;
      }
      if (url === URL_UNPARSEABLE) {
        payload.issues.push({
          code: "invalid_format",
          format: "url",
          input: payload.value,
          inst,
          continue: !def.abort
        });
        return;
      }
      if (url === true) {
        payload.value = stripTabAndNewline(trimmed);
        return;
      }
      if (def.hostname && !urlHostnameOk(url, def.hostname)) {
        payload.issues.push({
          code: "invalid_format",
          format: "url",
          note: "Invalid hostname",
          pattern: def.hostname.source,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      }
      if (def.protocol && !urlProtocolOk(url, def.protocol)) {
        payload.issues.push({
          code: "invalid_format",
          format: "url",
          note: "Invalid protocol",
          pattern: def.protocol.source,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      }
      payload.value = def.normalize ? url.href : stripTabAndNewline(trimmed);
      return;
    } catch (_) {
      payload.issues.push({
        code: "invalid_format",
        format: "url",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
  def.pattern ?? (def.pattern = emoji());
  $ZodStringFormat.init(inst, def);
});
var $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
  if (def.length !== undefined && (!Number.isInteger(def.length) || def.length < 1))
    throw new Error(`Invalid nanoid length: ${def.length}`);
  def.pattern ?? (def.pattern = def.length === undefined ? nanoid : nanoidOfLength(def.length));
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
  def.pattern ?? (def.pattern = cuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
  def.pattern ?? (def.pattern = cuid2);
  $ZodStringFormat.init(inst, def);
});
var $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
  def.pattern ?? (def.pattern = ulid);
  $ZodStringFormat.init(inst, def);
});
var $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
  def.pattern ?? (def.pattern = xid);
  $ZodStringFormat.init(inst, def);
});
var $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
  def.pattern ?? (def.pattern = ksuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
  def.pattern ?? (def.pattern = datetime(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
  def.pattern ?? (def.pattern = date);
  $ZodStringFormat.init(inst, def);
});
var $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
  def.pattern ?? (def.pattern = time(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
  def.pattern ?? (def.pattern = duration);
  $ZodStringFormat.init(inst, def);
});
var $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
  def.pattern ?? (def.pattern = ipv4);
  $ZodStringFormat.init(inst, def);
});
var ipv6Alphabet = /^[0-9a-fA-F:.]+$/;
function isValidIPv6(value) {
  if (!ipv6Alphabet.test(value))
    return false;
  return canParseURL(`http://[${value}]`);
}
var $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
  def.pattern ?? (def.pattern = ipv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (!isValidIPv6(payload.value)) {
      payload.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv4);
  $ZodStringFormat.init(inst, def);
});
function isValidCIDRv6(value) {
  const parts = value.split("/");
  if (parts.length !== 2)
    return false;
  const [address, prefix] = parts;
  if (!prefix)
    return false;
  const prefixNum = Number(prefix);
  if (`${prefixNum}` !== prefix)
    return false;
  if (prefixNum < 0 || prefixNum > 128)
    return false;
  return isValidIPv6(address);
}
var $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (!isValidCIDRv6(payload.value)) {
      payload.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
function isValidBase64(data) {
  if (data === "")
    return true;
  if (/\s/.test(data))
    return false;
  if (data.length % 4 !== 0)
    return false;
  try {
    atob(data);
    return true;
  } catch {
    return false;
  }
}
var base64Charset = /^[0-9a-zA-Z+/]*={0,2}$/;
var $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
  def.pattern ?? (def.pattern = base64Charset);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidBase64(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var base64urlCharset = /^[A-Za-z0-9_-]*$/;
function isValidBase64URL(data) {
  if (!base64urlCharset.test(data))
    return false;
  const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  return isValidBase64(padded);
}
var $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
  def.pattern ?? (def.pattern = base64urlCharset);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidBase64URL(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
  def.pattern ?? (def.pattern = e164);
  $ZodStringFormat.init(inst, def);
});
function isValidJWT(token, algorithm = null) {
  try {
    const tokensParts = token.split(".");
    if (tokensParts.length !== 3)
      return false;
    const [header] = tokensParts;
    if (!header)
      return false;
    const parsedHeader = JSON.parse(atob(header));
    if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
      return false;
    if (!parsedHeader.alg)
      return false;
    if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
      return false;
    return true;
  } catch {
    return false;
  }
}
var $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidJWT(payload.value, def.alg))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = number;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Number(payload.value);
      } catch (_) {}
    const input = payload.value;
    if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
      return payload;
    }
    const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? String(input) : undefined : undefined;
    payload.issues.push({
      expected: "number",
      code: "invalid_type",
      input,
      inst,
      ...received ? { received } : {}
    });
    return payload;
  };
});
var $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def) => {
  $ZodCheckNumberFormat.init(inst, def);
  $ZodNumber.init(inst, def);
});
var $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = boolean;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Boolean(payload.value);
      } catch (_) {}
    const input = payload.value;
    if (typeof input === "boolean")
      return payload;
    payload.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
var $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    payload.issues.push({
      expected: "never",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
function capSize(inst, size) {
  const caps = sizeCaps(inst._zod.def.checks);
  if (!caps.length)
    return;
  const cap = Math.min(...caps.map((c) => c[0]));
  const parse = inst._zod.parse;
  inst._zod.parse = (payload, ctx) => {
    const n = size(payload.value);
    if (n > cap && !ctx?.skipChecks && ctx?.direction !== "backward") {
      for (const [max, ch] of sizeCaps(inst._zod.def.checks)) {
        if (n > max && ch._zod.def.when(payload)) {
          const start = payload.issues.length;
          ch._zod.check(payload);
          payload.issues[start].continue = false;
          attachSchema(payload.issues, start, inst);
          return payload;
        }
      }
    }
    return parse(payload, ctx);
  };
}
var arraySize = (input) => Array.isArray(input) ? input.length : -1;
function handleArrayResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
var $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
  $ZodType.init(inst, def);
  const memo = globalConfig.memoizer;
  memo?.attach(inst);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        expected: "array",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = memo ? memo.alloc(inst, payload, Array(input.length), ctx) : Array(input.length);
    const proms = [];
    const abortEarly = ctx?.abortEarly;
    for (let i = 0;i < input.length; i++) {
      const item = input[i];
      const result = def.element._zod.run({
        value: item,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result) => handleArrayResult(result, payload, i)));
      } else {
        handleArrayResult(result, payload, i);
        if (abortEarly && result.issues.length !== 0 && aborted(result))
          break;
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
  capSize(inst, arraySize);
});
function handlePropertyResult(result, final, key, input, optin, optout) {
  const isPresent = key in input;
  const isOptionalOut = optout === "optional";
  if (!isPresent && isOptionalOut && optin === "optional") {
    return;
  }
  if (result.issues.length) {
    if (optin !== undefined && isOptionalOut && !isPresent) {
      return;
    }
    final.issues.push(...prefixIssues(key, result.issues));
  }
  if (!isPresent && optin === undefined) {
    if (!result.issues.length) {
      final.issues.push({
        code: "invalid_type",
        expected: "nonoptional",
        input: undefined,
        path: [key]
      });
    }
    return;
  }
  if (result.value === undefined) {
    if (isPresent || optin === "defaulted" && !isOptionalOut) {
      final.value[key] = undefined;
    }
  } else {
    final.value[key] = result.value;
  }
}
var NO_SYMBOL_KEYS = [];
function normalizeDef(def) {
  const keys = Object.keys(def.shape);
  const ownSymbols = Object.getOwnPropertySymbols(def.shape);
  const symbolKeys = ownSymbols.length ? ownSymbols : NO_SYMBOL_KEYS;
  const allKeys = symbolKeys.length ? [...keys, ...symbolKeys] : keys;
  for (const k of allKeys) {
    if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) {
      throw new Error(`Invalid element at key "${String(k)}": expected a Zod schema`);
    }
  }
  const okeys = optionalKeys(def.shape);
  return {
    ...def,
    allKeys,
    symbolKeys,
    keySet: new Set(keys),
    numKeys: keys.length,
    optionalKeys: new Set(okeys)
  };
}
function handleCatchall(proms, input, payload, ctx, def, inst, abortEarly) {
  const unrecognized = [];
  const keySet = def.keySet;
  const _catchall = def.catchall._zod;
  const t = _catchall.def.type;
  const optin = _catchall.optin;
  const optout = _catchall.optout;
  let seen = 0;
  for (const key in input) {
    if (abortEarly && payload.issues.length !== seen) {
      if (aborted(payload, seen))
        break;
      seen = payload.issues.length;
    }
    if (keySet.has(key))
      continue;
    if (key === "__proto__") {
      if (t === "never")
        unrecognized.push(key);
      continue;
    }
    if (t === "never") {
      unrecognized.push(key);
      continue;
    }
    const r = _catchall.run({ value: input[key], issues: [] }, ctx);
    if (r instanceof Promise) {
      proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
    } else {
      handlePropertyResult(r, payload, key, input, optin, optout);
    }
  }
  if (unrecognized.length) {
    payload.issues.push({
      code: "unrecognized_keys",
      keys: unrecognized,
      input,
      inst,
      continue: true
    });
  }
  if (!proms.length)
    return payload;
  return Promise.all(proms).then(() => {
    return payload;
  });
}
var $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
  $ZodType.init(inst, def);
  const desc = Object.getOwnPropertyDescriptor(def, "shape");
  const sh = desc?.get ? desc.get.raw : def.shape ?? {};
  if (sh) {
    const get = () => {
      const newSh = { ...sh };
      Object.defineProperty(def, "shape", { value: newSh });
      get.raw = newSh;
      return newSh;
    };
    get.raw = sh;
    Object.defineProperty(def, "shape", { get });
  }
  const _normalized = cached(() => normalizeDef(def));
  defineLazyInternal(inst, "propValues", (zod) => {
    const shape = zod.def.shape;
    const propValues = {};
    for (const key in shape) {
      const field = shape[key]._zod;
      if (field.values) {
        if (!Object.prototype.hasOwnProperty.call(propValues, key)) {
          assignProp(propValues, key, new Set);
        }
        for (const v of field.values)
          propValues[key].add(v);
        if (field.optin !== undefined)
          propValues[key].add(undefined);
      }
    }
    return propValues;
  });
  const isObject2 = isObject;
  const catchall = def.catchall;
  let value;
  const memo = globalConfig.memoizer;
  memo?.attach(inst);
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
    const proms = [];
    const shape = value.shape;
    const abortEarly = ctx?.abortEarly;
    let seen = payload.issues.length;
    for (const key of value.allKeys) {
      if (abortEarly && payload.issues.length !== seen) {
        if (aborted(payload, seen))
          break;
        seen = payload.issues.length;
      }
      if (key === "__proto__")
        continue;
      const el = shape[key];
      const optin = el._zod.optin;
      const optout = el._zod.optout;
      const r = el._zod.run({ value: input[key], issues: [] }, ctx);
      if (r instanceof Promise) {
        proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
      } else {
        handlePropertyResult(r, payload, key, input, optin, optout);
      }
    }
    if (!catchall) {
      return proms.length ? Promise.all(proms).then(() => payload) : payload;
    }
    return handleCatchall(proms, input, payload, ctx, _normalized.value, inst, abortEarly === true);
  };
});
var $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
  $ZodObject.init(inst, def);
  const superParse = inst._zod.parse;
  const _normalized = cached(() => normalizeDef(def));
  const memo = globalConfig.memoizer;
  const generateFastpass = (shape) => {
    const normalized = _normalized.value;
    const syms = normalized.symbolKeys;
    const doc = new Doc(["payload", "ctx"], { shape, inst, memo, syms });
    const parseStr = (k) => `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
    const prefixStr = (id, k) => `
          let ${id}_ab = false;
          for (let i = 0; i < ${id}.issues.length; i++) {
            const iss = ${id}.issues[i];
            iss.path = iss.path ? [${k}, ...iss.path] : [${k}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${id}_ab = true;
          }
          if (${id}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
    doc.write(`const input = payload.value;`);
    const ids = Object.create(null);
    let counter = 0;
    for (const key of normalized.allKeys) {
      ids[key] = `key_${counter++}`;
    }
    doc.write(memo ? `const newResult = memo.alloc(inst, payload, {}, ctx);` : `const newResult = {};`);
    for (const key of normalized.allKeys) {
      if (key === "__proto__")
        continue;
      const id = ids[key];
      const k = typeof key === "symbol" ? `syms[${syms.indexOf(key)}]` : esc(key);
      const isPresent = `${k} in input`;
      const schema = shape[key];
      const optin = schema?._zod?.optin;
      const isOptionalIn = optin !== undefined;
      const isOptionalOut = schema?._zod?.optout === "optional";
      doc.write(`const ${id} = ${parseStr(k)};`);
      if (isOptionalIn && isOptionalOut) {
        const assign = optin === "optional" ? `${id}_present` : `${id}.value !== undefined || ${id}_present`;
        doc.write(`
        const ${id}_present = ${isPresent};
        if (!${id}.issues.length || ${id}_present) {
          if (${id}.issues.length) {${prefixStr(id, k)}
          }

          if (${assign}) {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
      } else if (!isOptionalIn) {
        doc.write(`
        const ${id}_present = ${isPresent};
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${id}_present) {
          newResult[${k}] = ${id}.value;
        }

      `);
      } else {
        doc.write(`
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
      `);
        if (optin === "defaulted") {
          doc.write(`newResult[${k}] = ${id}.value;`);
        } else {
          doc.write(`
        if (${id}.value !== undefined || ${isPresent}) {
          newResult[${k}] = ${id}.value;
        }
      `);
        }
      }
    }
    doc.write(`payload.value = newResult;`);
    doc.write(`return payload;`);
    return doc.compile();
  };
  let fastpass;
  const isObject2 = isObject;
  const jit = !globalConfig.jitless;
  const allowsEval2 = allowsEval;
  const fastEnabled = jit && allowsEval2.value;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
      if (!fastpass)
        fastpass = generateFastpass(def.shape);
      payload = fastpass(payload, ctx);
      if (!catchall)
        return payload;
      return handleCatchall([], input, payload, ctx, value, inst, ctx?.abortEarly === true);
    }
    return superParse(payload, ctx);
  };
});
function handleUnionResults(results, final, inst, ctx) {
  for (const result of results) {
    if (result.issues.length === 0) {
      final.value = result.value;
      return final;
    }
  }
  const nonaborted = results.filter((r) => !aborted(r));
  if (nonaborted.length === 1) {
    final.value = nonaborted[0].value;
    return nonaborted[0];
  }
  final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  });
  return final;
}
var $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "optin", (zod) => zod.def.options.some((o) => o._zod.optin === "defaulted") ? "defaulted" : zod.def.options.some((o) => o._zod.optin !== undefined) ? "optional" : undefined);
  defineLazyInternal(inst, "optout", (zod) => zod.def.options.some((o) => o._zod.optout === "optional") ? "optional" : undefined);
  defineLazyInternal(inst, "values", (zod) => {
    if (zod.def.options.every((o) => o._zod.values)) {
      return new Set(zod.def.options.flatMap((option) => Array.from(option._zod.values)));
    }
    return;
  });
  defineLazyInternal(inst, "pattern", (zod) => {
    if (zod.def.options.every((o) => o._zod.pattern)) {
      const patterns = zod.def.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
    }
    return;
  });
  const first = def.options.length === 1 ? def.options[0]._zod.run : null;
  inst._zod.parse = (payload, ctx) => {
    if (first) {
      return first(payload, ctx);
    }
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        if (result.issues.length === 0)
          return result;
        results.push(result);
      }
    }
    if (!async)
      return handleUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results) => {
      return handleUnionResults(results, payload, inst, ctx);
    });
  };
});
function discriminatorMap(def) {
  const map = new Map;
  for (const option of def.options) {
    const values = option._zod.propValues?.[def.discriminator];
    if (!values || values.size === 0)
      throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
    for (const value of values) {
      if (map.has(value)) {
        if (value !== undefined)
          throw new Error(`Duplicate discriminator value "${String(value)}"`);
        map.set(value, null);
      } else {
        map.set(value, option);
      }
    }
  }
  return map;
}
var $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
  def.inclusive = false;
  $ZodUnion.init(inst, def);
  const _super = inst._zod.parse;
  defineLazyInternal(inst, "propValues", (zod) => {
    const propValues = {};
    let undefinedCount = 0;
    for (const option of zod.def.options) {
      const pv = option._zod.propValues;
      if (!pv || Object.keys(pv).length === 0)
        throw new Error(`Invalid discriminated union option at index "${zod.def.options.indexOf(option)}"`);
      if (pv[zod.def.discriminator]?.has(undefined))
        undefinedCount++;
      for (const [k, v] of Object.entries(pv)) {
        if (!Object.prototype.hasOwnProperty.call(propValues, k)) {
          assignProp(propValues, k, new Set);
        }
        for (const val of v) {
          propValues[k].add(val);
        }
      }
    }
    if (!zod.def.unionFallback && undefinedCount > 1)
      propValues[zod.def.discriminator]?.delete(undefined);
    return propValues;
  });
  def.options.forEach((option, i) => {
    const propShape = rawShape(option._zod.def);
    if (propShape && !Object.prototype.hasOwnProperty.call(propShape, def.discriminator)) {
      throw new Error(`Invalid discriminated union option at index "${i}"`);
    }
  });
  const disc = cached(() => discriminatorMap(def));
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isObject(input)) {
      payload.issues.push({
        code: "invalid_type",
        expected: "object",
        input,
        inst
      });
      return payload;
    }
    const value = input?.[def.discriminator];
    const opt = disc.value.get(value);
    if (opt && (value !== undefined || ctx.direction !== "backward")) {
      return opt._zod.run(payload, ctx);
    }
    if (def.unionFallback || ctx.direction === "backward") {
      return _super(payload, ctx);
    }
    payload.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: def.discriminator,
      options: Array.from(disc.value.keys()).filter((value) => disc.value.get(value) !== null),
      input,
      path: [def.discriminator],
      inst
    });
    return payload;
  };
});
var $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    const left = def.left._zod.run({ value: input, issues: [] }, ctx);
    const right = def.right._zod.run({ value: input, issues: [] }, ctx);
    const async = left instanceof Promise || right instanceof Promise;
    if (async) {
      return Promise.all([left, right]).then(([left, right]) => {
        return handleIntersectionResults(payload, left, right);
      });
    }
    return handleIntersectionResults(payload, left, right);
  };
});
function mergeValues(a, b) {
  if (a === b) {
    return { valid: true, data: a };
  }
  if (a instanceof Date && b instanceof Date && +a === +b) {
    return { valid: true, data: a };
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const bKeys = Object.keys(b);
    const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    if (Object.prototype.hasOwnProperty.call(newObj, "__proto__"))
      delete newObj.__proto__;
    for (const key of sharedKeys) {
      if (key === "__proto__")
        continue;
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
        };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return { valid: false, mergeErrorPath: [] };
    }
    const newArray = [];
    for (let index = 0;index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
        };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  }
  return { valid: false, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
  const unrecKeys = new Map;
  let unrecIssue;
  const keyIssues = new Map;
  const collect = (iss, side) => {
    let keys;
    if (iss.code === "unrecognized_keys" && !iss.path?.length) {
      unrecIssue ?? (unrecIssue = iss);
      keys = iss.keys;
    } else if (iss.code === "invalid_key" && iss.origin === "record" && iss.path?.length === 1) {
      const k = String(iss.path[0]);
      if (!keyIssues.has(k))
        keyIssues.set(k, iss);
      keys = [k];
    } else {
      return false;
    }
    for (const k of keys) {
      if (!unrecKeys.has(k))
        unrecKeys.set(k, {});
      unrecKeys.get(k)[side] = true;
    }
    return true;
  };
  for (const iss of left.issues) {
    if (!collect(iss, "l"))
      result.issues.push(iss);
  }
  for (const iss of right.issues) {
    if (!collect(iss, "r"))
      result.issues.push(iss);
  }
  const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
  if (bothKeys.length) {
    const aggregated = unrecIssue ? bothKeys.filter((k) => unrecIssue.keys.includes(k)) : [];
    if (aggregated.length)
      result.issues.push({ ...unrecIssue, keys: aggregated });
    for (const k of bothKeys) {
      if (!aggregated.includes(k) && keyIssues.has(k))
        result.issues.push(keyIssues.get(k));
    }
  }
  const merged = mergeValues(left.value, right.value);
  if (!merged.valid) {
    if (aborted(result))
      return result;
    throw new Error(`Unmergable intersection. Error path: ` + `${JSON.stringify(merged.mergeErrorPath)}`);
  }
  result.value = merged.data;
  return result;
}
var $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
  $ZodType.init(inst, def);
  const memo = globalConfig.memoizer;
  memo?.attach(inst);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isPlainObject(input)) {
      payload.issues.push({
        expected: "record",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    const values = def.keyType._zod.values;
    if (values && !def.partial) {
      payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
      const recordKeys = new Set;
      for (const key of values) {
        if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
          recordKeys.add(typeof key === "number" ? key.toString() : key);
          if (key === "__proto__")
            continue;
          const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
          if (keyResult instanceof Promise) {
            throw new Error("Async schemas not supported in object keys currently");
          }
          if (keyResult.issues.length) {
            payload.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
              input: key,
              path: [key],
              inst
            });
            continue;
          }
          const outKey = keyResult.value;
          if (outKey === "__proto__")
            continue;
          const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
          if (result instanceof Promise) {
            proms.push(result.then((result) => {
              if (result.issues.length) {
                payload.issues.push(...prefixIssues(key, result.issues));
              }
              payload.value[outKey] = result.value;
            }));
          } else {
            if (result.issues.length) {
              payload.issues.push(...prefixIssues(key, result.issues));
            }
            payload.value[outKey] = result.value;
          }
        }
      }
      let unrecognized;
      for (const key in input) {
        if (!recordKeys.has(key)) {
          if (def.mode === "loose") {
            if (key === "__proto__")
              continue;
            payload.value[key] = input[key];
          } else {
            unrecognized = unrecognized ?? [];
            unrecognized.push(key);
          }
        }
      }
      if (unrecognized && unrecognized.length > 0) {
        payload.issues.push({
          code: "unrecognized_keys",
          input,
          inst,
          keys: unrecognized,
          continue: true
        });
      }
    } else {
      payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
      let unrecognized;
      for (const key of Reflect.ownKeys(input)) {
        if (key === "__proto__")
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(input, key))
          continue;
        let keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
        if (keyResult instanceof Promise) {
          throw new Error("Async schemas not supported in object keys currently");
        }
        const checkNumericKey = typeof key === "string" && number.test(key) && keyResult.issues.length;
        if (checkNumericKey) {
          const retryResult = def.keyType._zod.run({ value: Number(key), issues: [] }, ctx);
          if (retryResult instanceof Promise) {
            throw new Error("Async schemas not supported in object keys currently");
          }
          if (retryResult.issues.length === 0) {
            keyResult = retryResult;
          }
        }
        if (keyResult.issues.length) {
          if (def.mode === "loose") {
            payload.value[key] = input[key];
          } else if (values) {
            unrecognized = unrecognized ?? [];
            unrecognized.push(key);
          } else {
            payload.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
              input: key,
              path: [key],
              inst
            });
          }
          continue;
        }
        const outKey = keyResult.value;
        if (outKey === "__proto__")
          continue;
        const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((result) => {
            if (result.issues.length) {
              payload.issues.push(...prefixIssues(key, result.issues));
            }
            payload.value[outKey] = result.value;
          }));
        } else {
          if (result.issues.length) {
            payload.issues.push(...prefixIssues(key, result.issues));
          }
          payload.value[outKey] = result.value;
        }
      }
      if (unrecognized && unrecognized.length > 0) {
        payload.issues.push({
          code: "unrecognized_keys",
          input,
          inst,
          keys: unrecognized,
          continue: true
        });
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
var $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
  $ZodType.init(inst, def);
  const values = getEnumValues(def.entries);
  const valuesSet = new Set(values);
  inst._zod.values = valuesSet;
  defineLazyInternal(inst, "pattern", (zod) => {
    const patternValues = getEnumValues(zod.def.entries).filter((k) => propertyKeyTypes.has(typeof k));
    return new RegExp(patternValues.length ? `^(${patternValues.map((o) => escapeRegex(o.toString())).join("|")})$` : "^[^\\s\\S]$");
  });
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (valuesSet.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  const values = new Set(def.values);
  inst._zod.values = values;
  defineLazyInternal(inst, "pattern", (zod) => {
    const vals = zod.def.values;
    return new RegExp(vals.length ? `^(${vals.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$` : "^[^\\s\\S]$");
  });
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (values.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values: def.values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  globalConfig.memoizer?.guard(inst);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    const _out = def.transform(payload.value, payload);
    if (ctx.async) {
      const output = _out instanceof Promise ? _out : Promise.resolve(_out);
      return output.then((output) => {
        payload.value = output;
        return payload;
      });
    }
    if (_out instanceof Promise) {
      throw new $ZodAsyncError;
    }
    payload.value = _out;
    return payload;
  };
});
function handleOptionalResult(payload, result) {
  payload.value = result.issues.length ? undefined : result.value;
  return payload;
}
var $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
  inst._zod.optout = "optional";
  defineLazyInternal(inst, "values", (zod) => {
    const values = zod.def.innerType._zod.values;
    return values ? new Set([...values, undefined]) : undefined;
  });
  defineLazyInternal(inst, "pattern", (zod) => {
    const pattern = zod.def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === undefined) {
      if (def.innerType._zod.optin !== "defaulted")
        return payload;
      const result = def.innerType._zod.run({ value: payload.value, issues: [] }, ctx);
      if (result instanceof Promise)
        return result.then((result) => handleOptionalResult(payload, result));
      return handleOptionalResult(payload, result);
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
  defineLazyInternal(inst, "pattern", (zod) => zod.def.innerType._zod.pattern);
  inst._zod.parse = (payload, ctx) => {
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin);
  defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
  defineLazyInternal(inst, "pattern", (zod) => {
    const pattern = zod.def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : undefined;
  });
  defineLazyInternal(inst, "values", (zod) => {
    return zod.def.innerType._zod.values ? new Set([...zod.def.innerType._zod.values, null]) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === null)
      return payload;
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "defaulted";
  defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === undefined) {
      payload.value = def.defaultValue;
      return payload;
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result) => handleDefaultResult(result, def));
    }
    return handleDefaultResult(result, def);
  };
});
function handleDefaultResult(payload, def) {
  if (payload.value === undefined) {
    payload.value = def.defaultValue;
  }
  return payload;
}
var $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "defaulted";
  defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === undefined) {
      payload.value = def.defaultValue;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "values", (zod) => {
    const v = zod.def.innerType._zod.values;
    return v ? new Set([...v].filter((x) => x !== undefined)) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result) => handleNonOptionalResult(result, inst));
    }
    return handleNonOptionalResult(result, inst);
  };
});
function handleNonOptionalResult(payload, inst) {
  if (!payload.issues.length && payload.value === undefined) {
    payload.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: payload.value,
      inst
    });
  }
  return payload;
}
function handleCatchResult(payload, result, def, ctx) {
  if (!result.issues.length) {
    payload.value = result.value;
    if (result.memo)
      payload.memo = true;
    return payload;
  }
  payload.value = def.catchValue({
    ...result,
    value: payload.value,
    error: {
      issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config()))
    },
    input: payload.value
  });
  return payload;
}
var $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
  defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
  defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run({ value: payload.value, issues: [] }, ctx);
    if (result instanceof Promise) {
      return result.then((result) => handleCatchResult(payload, result, def, ctx));
    }
    return handleCatchResult(payload, result, def, ctx);
  };
});
var $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "values", (zod) => zod.def.in._zod.values);
  defineLazyInternal(inst, "optin", (zod) => zod.def.in._zod.optin);
  defineLazyInternal(inst, "optout", (zod) => zod.def.out._zod.optout);
  defineLazyInternal(inst, "propValues", (zod) => zod.def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right) => handlePipeResult(right, def.in, ctx));
      }
      return handlePipeResult(right, def.in, ctx);
    }
    const left = def.in._zod.run(payload, ctx);
    if (left instanceof Promise) {
      return left.then((left) => handlePipeResult(left, def.out, ctx));
    }
    return handlePipeResult(left, def.out, ctx);
  };
});
function handlePipeResult(left, next, ctx) {
  if (left.issues.some((iss) => iss.code !== "unrecognized_keys")) {
    left.aborted = true;
    return left;
  }
  return next._zod.run({ value: left.value, issues: left.issues }, ctx);
}
var $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "propValues", (zod) => zod.def.innerType._zod.propValues);
  defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
  defineLazyInternal(inst, "optin", (zod) => zod.def.innerType?._zod?.optin);
  defineLazyInternal(inst, "optout", (zod) => zod.def.innerType?._zod?.optout);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then(handleReadonlyResult);
    }
    return handleReadonlyResult(result);
  };
});
function handleReadonlyResult(payload) {
  if (!payload.memo)
    payload.value = Object.freeze(payload.value);
  return payload;
}
var $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
  $ZodCheck.init(inst, def);
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _) => {
    return payload;
  };
  inst._zod.check = (payload) => {
    const input = payload.value;
    const r = def.fn(input);
    if (r instanceof Promise) {
      return r.then((r) => handleRefineResult(r, payload, input, inst));
    }
    handleRefineResult(r, payload, input, inst);
    return;
  };
});
function handleRefineResult(result, payload, input, inst) {
  if (!result) {
    const _iss = {
      code: "custom",
      input,
      inst,
      path: [...inst._zod.def.path ?? []],
      continue: !inst._zod.def.abort
    };
    if (inst._zod.def.params)
      _iss.params = inst._zod.def.params;
    payload.issues.push(issue(_iss));
  }
}
// node_modules/zod/v4/core/memoizer.js
class $ZodCyclicError extends Error {
  constructor() {
    super(`Cannot parse a reference cycle that closes through a transform`);
    this.name = "ZodCyclicError";
  }
}
var STATE = "~memo";
var NO_ISSUES = [];
function isRef(value) {
  return value !== null && typeof value === "object";
}
function cloneIssues(issues) {
  return issues.map((iss) => iss.path ? { ...iss, path: iss.path.slice() } : { ...iss });
}
var recursive = /* @__PURE__ */ new WeakMap;
var NONE = 0;
var ASSUMED = 1;
var PROVEN = 2;
function isRecursive(inst, stack, resolve) {
  const cached = recursive.get(inst);
  if (cached !== undefined)
    return cached ? PROVEN : NONE;
  if (stack.has(inst))
    return PROVEN;
  stack.add(inst);
  let result = NONE;
  const check = (child) => {
    if (result !== PROVEN && child?._zod) {
      const answer = isRecursive(child, stack, resolve);
      if (answer > result)
        result = answer;
    }
  };
  const shape = (sh, spread) => {
    let answer = NONE;
    for (const key of Reflect.ownKeys(sh)) {
      const desc = Object.getOwnPropertyDescriptor(sh, key);
      if (spread && !desc.enumerable)
        continue;
      const child = desc.get ? ASSUMED : desc.value?._zod ? isRecursive(desc.value, stack, resolve) : NONE;
      if (child > answer)
        answer = child;
    }
    return answer;
  };
  const merge = (answer) => {
    if (answer > result)
      result = answer;
  };
  const def = inst._zod.def;
  const kind = def.type;
  switch (kind) {
    case "object": {
      const raw = rawShape(def);
      merge(raw ? shape(raw, true) : ASSUMED);
      check(def.catchall);
      break;
    }
    case "array":
      check(def.element);
      break;
    case "tuple":
      for (const el of def.items)
        check(el);
      check(def.rest);
      break;
    case "record":
    case "map":
      check(def.keyType);
      check(def.valueType);
      break;
    case "set":
      check(def.valueType);
      break;
    case "union":
      for (const el of def.options)
        check(el);
      break;
    case "intersection":
      check(def.left);
      check(def.right);
      break;
    case "optional":
    case "nullable":
    case "default":
    case "prefault":
    case "catch":
    case "readonly":
    case "nonoptional":
    case "promise":
    case "success":
      check(def.innerType);
      break;
    case "pipe":
      check(def.in);
      check(def.out);
      break;
    case "function":
      check(def.input);
      check(def.output);
      break;
    case "lazy": {
      const inner = def._cachedInner ?? (resolve ? inst._zod.innerType : undefined);
      merge(inner ? isRecursive(inner, stack, false) : ASSUMED);
      break;
    }
    case "template_literal":
    case "string":
    case "number":
    case "int":
    case "boolean":
    case "bigint":
    case "symbol":
    case "undefined":
    case "null":
    case "void":
    case "never":
    case "any":
    case "unknown":
    case "date":
    case "nan":
    case "enum":
    case "literal":
    case "file":
    case "transform":
    case "custom":
      break;
    default: {
      for (const key in def) {
        const desc = Object.getOwnPropertyDescriptor(def, key);
        if (!desc || desc.get)
          continue;
        const value = desc.value;
        if (!value || typeof value !== "object")
          continue;
        if (value._zod)
          check(value);
        else if (Array.isArray(value))
          for (const el of value)
            check(el);
      }
    }
  }
  stack.delete(inst);
  return settle(inst, result);
}
function settle(inst, answer) {
  if (answer !== ASSUMED)
    recursive.set(inst, answer === PROVEN);
  return answer;
}
function bucketFor(state, inst) {
  let bucket = state.buckets.get(inst);
  if (!bucket) {
    bucket = new WeakMap;
    state.buckets.set(inst, bucket);
  }
  return bucket;
}
var handoff;
var open = [];
var memo = {
  alloc(_inst, payload, empty) {
    const bucket = handoff;
    if (!bucket)
      return empty;
    handoff = undefined;
    const entry = { value: empty, issues: null };
    bucket.set(payload.value, entry);
    open.push(entry);
    return empty;
  },
  guard(inst) {
    var _a;
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    inst._zod.deferred.push(() => {
      const base = inst._zod.parse;
      const wrapped = (payload, ctx) => {
        if (ctx.direction !== "backward" && isBackEdge(ctx, payload.value))
          throw new $ZodCyclicError;
        return base(payload, ctx);
      };
      inst._zod.parse = wrapped;
      if (inst._zod.run === base)
        inst._zod.run = wrapped;
    });
  },
  attach(inst) {
    var _a;
    let isRecursiveInst;
    let rechecked = false;
    let lastCtx;
    let lastBucket;
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    inst._zod.deferred.push(() => {
      const base = inst._zod.parse;
      const wrapped = (payload, ctx) => {
        if (isRecursiveInst === undefined) {
          const walked = isRecursive(inst, new Set, false);
          if (walked === NONE) {
            inst._zod.parse = base;
            if (inst._zod.run === wrapped)
              inst._zod.run = base;
            return base(payload, ctx);
          }
          if (walked === PROVEN || rechecked)
            isRecursiveInst = true;
          else
            rechecked = true;
        }
        const input = payload.value;
        if (!isRef(input))
          return base(payload, ctx);
        let state = ctx[STATE];
        if (!state) {
          state = { buckets: new WeakMap, backEdges: undefined };
          ctx[STATE] = state;
        }
        let bucket;
        if (lastCtx === ctx) {
          bucket = lastBucket;
        } else {
          bucket = bucketFor(state, inst);
          lastCtx = ctx;
          lastBucket = bucket;
        }
        const hit = bucket.get(input);
        if (hit) {
          payload.value = hit.value;
          if (hit.issues) {
            if (hit.issues.length)
              payload.issues.push(...cloneIssues(hit.issues));
          } else {
            payload.memo = true;
            state.backEdges ?? (state.backEdges = new WeakSet);
            state.backEdges.add(hit.value);
          }
          return payload;
        }
        handoff = bucket;
        const depth = open.length;
        const result = base(payload, ctx);
        handoff = undefined;
        const entry = open.length > depth ? open.pop() : undefined;
        if (result instanceof Promise) {
          return result.then((r) => {
            if (entry)
              entry.issues = r.issues.length ? cloneIssues(r.issues) : NO_ISSUES;
            return r;
          });
        }
        if (entry)
          entry.issues = result.issues.length ? cloneIssues(result.issues) : NO_ISSUES;
        return result;
      };
      inst._zod.parse = wrapped;
      if (inst._zod.run === base)
        inst._zod.run = wrapped;
    });
  }
};
function memoizer() {
  return memo;
}
function isBackEdge(ctx, value) {
  const backEdges = ctx[STATE]?.backEdges;
  return backEdges !== undefined && isRef(value) && backEdges.has(value);
}
// node_modules/zod/v4/locales/en.js
var error = () => {
  const Sizable = {
    string: { unit: "characters", verb: "to have" },
    file: { unit: "bytes", verb: "to have" },
    array: { unit: "items", verb: "to have" },
    set: { unit: "items", verb: "to have" },
    map: { unit: "entries", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    mac: "MAC address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    currency_code: "currency code",
    credit_card: "credit card number",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  function getTypeName(type, input) {
    if (type === "number" && typeof input === "number" && !Number.isFinite(input)) {
      return String(input);
    }
    return TypeDictionary[type] ?? type;
  }
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = getTypeName(issue.expected);
        const receivedType = parsedType(issue.input);
        const received = getTypeName(receivedType, issue.input);
        return `Invalid input: expected ${expected}, received ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue.values[0])}`;
        return `Invalid option: expected one of ${joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.exact ? "exactly " : issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.exact ? "exactly " : issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") {
          return `Invalid string: must start with "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Invalid string: must end with "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Invalid string: must include "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Invalid string: must match pattern ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${issue.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${issue.origin}`;
      case "invalid_union":
        if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) {
          const opts = issue.options.map((o) => `'${o}'`).join(" | ");
          return `Invalid discriminator value. Expected ${opts}`;
        }
        if (issue.inclusive === false) {
          return "Invalid input: more than one option matched";
        }
        return "Invalid input";
      case "invalid_element":
        return `Invalid value in ${issue.origin}`;
      default:
        return `Invalid input`;
    }
  };
};
function en_default() {
  return {
    localeError: error()
  };
}
// node_modules/zod/v4/core/registries.js
var _a2;
class $ZodRegistry {
  constructor() {
    this._map = new WeakMap;
    this._idmap = new Map;
  }
  add(schema, ..._meta) {
    const meta = _meta[0];
    this._map.set(schema, meta);
    if (meta && typeof meta === "object" && "id" in meta) {
      this._idmap.set(meta.id, schema);
    }
    return this;
  }
  clear() {
    this._map = new WeakMap;
    this._idmap = new Map;
    return this;
  }
  remove(schema) {
    const meta = this._map.get(schema);
    if (meta && typeof meta === "object" && "id" in meta) {
      this._idmap.delete(meta.id);
    }
    this._map.delete(schema);
    return this;
  }
  get(schema) {
    const p = schema._zod.parent;
    if (p) {
      const pm = { ...this.get(p) ?? {} };
      delete pm.id;
      const f = { ...pm, ...this._map.get(schema) };
      return Object.keys(f).length ? f : undefined;
    }
    return this._map.get(schema);
  }
  has(schema) {
    return this._map.has(schema);
  }
}
function registry() {
  return new $ZodRegistry;
}
(_a2 = globalThis).__zod_globalRegistry ?? (_a2.__zod_globalRegistry = registry());
var globalRegistry = globalThis.__zod_globalRegistry;
// node_modules/zod/v4/core/api.js
function snapshotChecks(def) {
  if (def.checks)
    def.checks = [...def.checks];
  return def;
}
function _string(Class, params) {
  return new Class(snapshotChecks({ type: "string", ...normalizeParams(params) }));
}
function _email(Class, params) {
  return new Class({
    type: "string",
    format: "email",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _guid(Class, params) {
  return new Class({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuid(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuidv4(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v4",
    ...normalizeParams(params)
  });
}
function _uuidv6(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v6",
    ...normalizeParams(params)
  });
}
function _uuidv7(Class, params) {
  return new Class({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v7",
    ...normalizeParams(params)
  });
}
function _url(Class, params) {
  return new Class({
    type: "string",
    format: "url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _emoji2(Class, params) {
  return new Class({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _nanoid(Class, params) {
  return new Class({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid(Class, params) {
  return new Class({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid2(Class, params) {
  return new Class({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ulid(Class, params) {
  return new Class({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _xid(Class, params) {
  return new Class({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ksuid(Class, params) {
  return new Class({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv4(Class, params) {
  return new Class({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv6(Class, params) {
  return new Class({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv4(Class, params) {
  return new Class({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv6(Class, params) {
  return new Class({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64(Class, params) {
  return new Class({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64url(Class, params) {
  return new Class({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _e164(Class, params) {
  return new Class({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _jwt(Class, params) {
  return new Class({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _isoDateTime(Class, params) {
  return new Class({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: false,
    local: false,
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDate(Class, params) {
  return new Class({
    type: "string",
    format: "date",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _isoTime(Class, params) {
  return new Class({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDuration(Class, params) {
  return new Class({
    type: "string",
    format: "duration",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _number(Class, params) {
  return new Class(snapshotChecks({ type: "number", checks: [], ...normalizeParams(params) }));
}
function _int(Class, params) {
  return new Class({
    type: "number",
    check: "number_format",
    abort: false,
    format: "safeint",
    ...normalizeParams(params)
  });
}
function _boolean(Class, params) {
  return new Class({
    type: "boolean",
    ...normalizeParams(params)
  });
}
function _unknown(Class) {
  return new Class({
    type: "unknown"
  });
}
function _never(Class, params) {
  return new Class({
    type: "never",
    ...normalizeParams(params)
  });
}
function _lt(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
function _lte(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _gt(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
function _gte(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _multipleOf(value, params) {
  return new $ZodCheckMultipleOf({
    check: "multiple_of",
    ...normalizeParams(params),
    value
  });
}
function _maxLength(maximum, params) {
  const ch = new $ZodCheckMaxLength({
    check: "max_length",
    ...normalizeParams(params),
    maximum
  });
  return ch;
}
function _minLength(minimum, params) {
  return new $ZodCheckMinLength({
    check: "min_length",
    ...normalizeParams(params),
    minimum
  });
}
function _length(length, params) {
  return new $ZodCheckLengthEquals({
    check: "length_equals",
    ...normalizeParams(params),
    length
  });
}
function _regex(pattern, params) {
  return new $ZodCheckRegex({
    check: "string_format",
    format: "regex",
    ...normalizeParams(params),
    pattern
  });
}
function _lowercase(params) {
  return new $ZodCheckLowerCase({
    check: "string_format",
    format: "lowercase",
    ...normalizeParams(params)
  });
}
function _uppercase(params) {
  return new $ZodCheckUpperCase({
    check: "string_format",
    format: "uppercase",
    ...normalizeParams(params)
  });
}
function _includes(includes, params) {
  return new $ZodCheckIncludes({
    check: "string_format",
    format: "includes",
    ...normalizeParams(params),
    includes
  });
}
function _startsWith(prefix, params) {
  return new $ZodCheckStartsWith({
    check: "string_format",
    format: "starts_with",
    ...normalizeParams(params),
    prefix
  });
}
function _endsWith(suffix, params) {
  return new $ZodCheckEndsWith({
    check: "string_format",
    format: "ends_with",
    ...normalizeParams(params),
    suffix
  });
}
function _overwrite(tx) {
  return new $ZodCheckOverwrite({
    check: "overwrite",
    tx
  });
}
function _normalize(form) {
  return _overwrite((input) => input.normalize(form));
}
function _trim() {
  return _overwrite((input) => input.trim());
}
function _toLowerCase() {
  return _overwrite((input) => input.toLowerCase());
}
function _toUpperCase() {
  return _overwrite((input) => input.toUpperCase());
}
function _slugify() {
  return _overwrite((input) => slugify(input));
}
function _array(Class, element, params) {
  return new Class({
    type: "array",
    element,
    ...normalizeParams(params)
  });
}
function _refine(Class, fn, _params) {
  const schema = new Class({
    type: "custom",
    check: "custom",
    fn,
    ...normalizeParams(_params)
  });
  return schema;
}
function _superRefine(fn, params) {
  const ch = _check((payload) => {
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(issue(issue2, payload.value, ch._zod.def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        if (!("input" in _issue))
          _issue.input = payload.value;
        _issue.inst ?? (_issue.inst = ch);
        _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
        payload.issues.push(issue(_issue));
      }
    };
    return fn(payload.value, payload);
  }, params);
  return ch;
}
function _check(fn, params) {
  const ch = new $ZodCheck({
    check: "custom",
    ...normalizeParams(params)
  });
  ch._zod.check = fn;
  return ch;
}
// node_modules/zod/v4/core/to-json-schema.js
function assignProps(target, ...sources) {
  for (const source of sources) {
    for (const key of Reflect.ownKeys(source)) {
      if (Object.prototype.propertyIsEnumerable.call(source, key)) {
        assignProp(target, key, source[key]);
      }
    }
  }
  return target;
}
function initializeContext(params) {
  let target = params?.target ?? "draft-2020-12";
  if (target === "draft-4")
    target = "draft-04";
  if (target === "draft-7")
    target = "draft-07";
  return {
    processors: params.processors ?? {},
    metadataRegistry: params?.metadata ?? globalRegistry,
    target,
    unrepresentable: params?.unrepresentable ?? "throw",
    override: params?.override ?? (() => {}),
    io: params?.io ?? "output",
    counter: 0,
    seen: new Map,
    sharedDefsExtractedFor: undefined,
    sharedEmitDoneFor: undefined,
    cycles: params?.cycles ?? "ref",
    reused: params?.reused ?? "inline",
    intersections: [],
    deferred: [],
    external: params?.external ?? undefined
  };
}
function handleUnrepresentable(schema, ctx, json, params, message) {
  const result = typeof ctx.unrepresentable === "function" ? ctx.unrepresentable({ zodSchema: schema, path: params.path, message }) : ctx.unrepresentable;
  if (result === "any")
    return false;
  if (result === undefined || result === "throw")
    throw new Error(message);
  Object.assign(json, result);
  return true;
}
function processSchema(schema, ctx, _params = { path: [], schemaPath: [] }) {
  var _a;
  const def = schema._zod.def;
  const seen = ctx.seen.get(schema);
  if (seen) {
    seen.count++;
    const isCycle = _params.schemaPath.includes(schema);
    if (isCycle) {
      seen.cycle = _params.path;
    }
    return seen.schema;
  }
  const result = { schema: {}, count: 1, cycle: undefined, path: _params.path };
  ctx.seen.set(schema, result);
  ctx.sharedDefsExtractedFor = undefined;
  ctx.sharedEmitDoneFor = undefined;
  const overrideSchema = schema._zod.toJSONSchema?.();
  if (overrideSchema) {
    result.schema = overrideSchema;
  } else {
    const params = {
      ..._params,
      schemaPath: [..._params.schemaPath, schema],
      path: _params.path
    };
    if (schema._zod.processJSONSchema) {
      schema._zod.processJSONSchema(ctx, result.schema, params);
    } else {
      const _json = result.schema;
      const processor = ctx.processors[def.type];
      if (!processor) {
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
      }
      processor(schema, ctx, _json, params);
    }
    const parent = schema._zod.parent;
    if (parent) {
      if (!result.ref)
        result.ref = parent;
      processSchema(parent, ctx, params);
      ctx.seen.get(parent).isParent = true;
    }
  }
  const meta = ctx.metadataRegistry.get(schema);
  if (meta)
    assignProps(result.schema, meta);
  if (ctx.io === "input" && isTransforming(schema)) {
    delete result.schema.examples;
    delete result.schema.default;
  }
  if (ctx.io === "input" && "_prefault" in result.schema)
    (_a = result.schema).default ?? (_a.default = result.schema._prefault);
  delete result.schema._prefault;
  const _result = ctx.seen.get(schema);
  return _result.schema;
}
function encodeJSONPointerSegment(segment) {
  return segment.replace(/~/g, "~0").replace(/\//g, "~1");
}
function extractDefs(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  if (ctx.external && ctx.sharedDefsExtractedFor === ctx.external)
    return;
  const idToSchema = new Map;
  for (const entry of ctx.seen.entries()) {
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      const existing = idToSchema.get(id);
      if (existing && existing !== entry[0]) {
        throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      }
      idToSchema.set(id, entry[0]);
    }
  }
  const makeURI = (entry) => {
    const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
    if (ctx.external) {
      const externalId = ctx.external.registry.get(entry[0])?.id;
      const uriGenerator = ctx.external.uri ?? ((id) => id);
      if (externalId) {
        return { ref: uriGenerator(externalId) };
      }
      const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
      entry[1].defId = id;
      return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${encodeJSONPointerSegment(id)}` };
    }
    const uriPrefix = `#`;
    const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
    if (entry[1] === root && !entry[1].schema.id) {
      return { ref: uriPrefix };
    }
    const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
    return { defId, ref: defUriPrefix + encodeJSONPointerSegment(defId) };
  };
  const extractToDef = (entry) => {
    if (entry[1].schema.$ref) {
      return;
    }
    const seen = entry[1];
    const { ref, defId } = makeURI(entry);
    seen.def = { ...seen.schema };
    if (defId)
      seen.defId = defId;
    const schema = seen.schema;
    for (const key in schema) {
      delete schema[key];
    }
    schema.$ref = ref;
  };
  if (ctx.cycles === "throw") {
    for (const entry of ctx.seen.entries()) {
      const seen = entry[1];
      if (seen.cycle) {
        throw new Error("Cycle detected: " + `#/${seen.cycle?.join("/")}/<root>` + '\n\nSet the `cycles` parameter to `"ref"` to resolve cyclical schemas with defs.');
      }
    }
  }
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (schema === entry[0]) {
      extractToDef(entry);
      continue;
    }
    if (ctx.external) {
      const ext = ctx.external.registry.get(entry[0])?.id;
      if (schema !== entry[0] && ext) {
        extractToDef(entry);
        continue;
      }
    }
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      extractToDef(entry);
      continue;
    }
    if (seen.cycle) {
      extractToDef(entry);
      continue;
    }
    if (seen.count > 1) {
      if (ctx.reused === "ref") {
        extractToDef(entry);
      }
    }
  }
  if (ctx.external)
    ctx.sharedDefsExtractedFor = ctx.external;
}
function compactTypeUnion(schema) {
  const options = schema.anyOf;
  if (!Array.isArray(options) || options.length === 0 || schema.type !== undefined)
    return;
  const types = [];
  for (const option of options) {
    if (!option || typeof option !== "object")
      return;
    compactTypeUnion(option);
    const keys = Object.keys(option);
    if (keys.length !== 1 || keys[0] !== "type")
      return;
    const type = option.type;
    for (const member of Array.isArray(type) ? type : [type]) {
      if (typeof member !== "string")
        return;
      if (!types.includes(member))
        types.push(member);
    }
  }
  delete schema.anyOf;
  schema.type = types.length === 1 ? types[0] : types;
}
var FOLDABLE_KEYS = new Set(["type", "properties", "required", "additionalProperties"]);
var UNION_KEYS = ["oneOf", "anyOf"];
function undeclaredConstraint(member) {
  const extra = member.additionalProperties;
  if (extra === undefined || extra === false || typeof extra !== "object" || extra === null)
    return null;
  return Object.keys(extra).length ? extra : null;
}
function foldObjects(members) {
  const objects = [];
  for (const member of members) {
    if (typeof member !== "object" || member.type !== "object")
      return null;
    for (const key in member) {
      if (!FOLDABLE_KEYS.has(key))
        return null;
    }
    objects.push(member);
  }
  const properties = {};
  const required = new Set;
  for (const object of objects) {
    for (const key in object.properties) {
      if (Object.prototype.hasOwnProperty.call(properties, key))
        continue;
      const parts = [];
      for (const other of objects) {
        const part = other.properties?.[key] ?? undeclaredConstraint(other);
        if (part === null || part === undefined)
          continue;
        if (!parts.some((seen) => JSON.stringify(seen) === JSON.stringify(part)))
          parts.push(part);
      }
      const merged = parts.length === 1 ? parts[0] : foldObjects(parts) ?? { allOf: parts };
      assignProp(properties, key, merged);
    }
    for (const key of object.required ?? [])
      required.add(key);
  }
  const folded = { type: "object", properties };
  if (required.size)
    folded.required = [...required];
  if (objects.every((object) => object.additionalProperties === false)) {
    folded.additionalProperties = false;
  } else {
    const constraints = [];
    for (const object of objects) {
      const constraint = undeclaredConstraint(object);
      if (constraint && !constraints.some((seen) => JSON.stringify(seen) === JSON.stringify(constraint)))
        constraints.push(constraint);
    }
    if (constraints.length === 1)
      folded.additionalProperties = constraints[0];
    else if (constraints.length > 1)
      folded.additionalProperties = { allOf: constraints };
  }
  return folded;
}
function foldIntersection(json) {
  const allOf = json.allOf;
  if (!Array.isArray(allOf) || allOf.length < 2)
    return;
  for (const key of FOLDABLE_KEYS)
    if (key in json)
      return;
  const unions = allOf.filter((m) => UNION_KEYS.some((k) => Array.isArray(m[k])));
  let folded = null;
  if (!unions.length) {
    folded = foldObjects(allOf);
  } else {
    const union = unions[0];
    const keyword = UNION_KEYS.find((k) => Array.isArray(union[k]));
    if (Object.keys(union).length !== 1)
      return;
    const rest = allOf.filter((m) => m !== union);
    const branches = union[keyword].map((branch) => foldObjects([...rest, branch]));
    if (branches.some((b) => !b))
      return;
    folded = { [keyword]: branches };
  }
  if (!folded)
    return;
  delete json.allOf;
  assignProps(json, folded);
}
function finalize(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const flattenRef = (zodSchema) => {
    const seen = ctx.seen.get(zodSchema);
    if (seen.ref === null)
      return;
    const schema = seen.def ?? seen.schema;
    const _cached = { ...schema };
    const ref = seen.ref;
    seen.ref = null;
    if (ref) {
      flattenRef(ref);
      const refSeen = ctx.seen.get(ref);
      const refSchema = refSeen.schema;
      if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
        schema.allOf = schema.allOf ?? [];
        schema.allOf.push(refSchema);
      } else {
        assignProps(schema, refSchema);
      }
      assignProps(schema, _cached);
      const isParentRef = zodSchema._zod.parent === ref;
      if (isParentRef) {
        for (const key in schema) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (!(key in _cached)) {
            delete schema[key];
          }
        }
      }
      if (refSchema.$ref && refSeen.def) {
        for (const key in schema) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) {
            delete schema[key];
          }
        }
      }
    }
    const parent = zodSchema._zod.parent;
    if (parent && parent !== ref) {
      flattenRef(parent);
      const parentSeen = ctx.seen.get(parent);
      if (parentSeen?.schema.$ref) {
        schema.$ref = parentSeen.schema.$ref;
        if (parentSeen.def) {
          for (const key in schema) {
            if (key === "$ref" || key === "allOf")
              continue;
            if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) {
              delete schema[key];
            }
          }
        }
      }
    }
    ctx.override({
      zodSchema,
      jsonSchema: schema,
      path: seen.path ?? []
    });
  };
  if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
    for (const entry of [...ctx.seen.entries()].reverse()) {
      flattenRef(entry[0]);
    }
    if (ctx.target !== "openapi-3.0") {
      for (const entry of ctx.seen.entries()) {
        compactTypeUnion(entry[1].def ?? entry[1].schema);
      }
    }
    for (const rewrite of ctx.deferred)
      rewrite();
    if (ctx.intersections.length) {
      const carriers = new Map;
      for (const seen of ctx.seen.values()) {
        for (const json of [seen.schema, seen.def]) {
          const allOf = json?.allOf;
          if (!Array.isArray(allOf))
            continue;
          const existing = carriers.get(allOf);
          if (existing)
            existing.push(json);
          else
            carriers.set(allOf, [json]);
        }
      }
      for (const allOf of ctx.intersections) {
        for (const json of carriers.get(allOf) ?? [])
          foldIntersection(json);
      }
    }
  }
  const result = {};
  if (ctx.target === "draft-2020-12") {
    result.$schema = "https://json-schema.org/draft/2020-12/schema";
  } else if (ctx.target === "draft-07") {
    result.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (ctx.target === "draft-04") {
    result.$schema = "http://json-schema.org/draft-04/schema#";
  } else if (ctx.target === "openapi-3.0") {}
  if (ctx.external?.uri) {
    const id = ctx.external.registry.get(schema)?.id;
    if (!id)
      throw new Error("Schema is missing an `id` property");
    result.$id = ctx.external.uri(id);
  }
  assignProps(result, root.defId ? root.schema : root.def ?? root.schema);
  const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
  if (rootMetaId !== undefined && result.id === rootMetaId)
    delete result.id;
  const defs = ctx.external?.defs ?? {};
  if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
    for (const entry of ctx.seen.entries()) {
      const seen = entry[1];
      if (seen.def && seen.defId) {
        if (seen.def.id === seen.defId)
          delete seen.def.id;
        assignProp(defs, seen.defId, seen.def);
      }
    }
  }
  if (ctx.external)
    ctx.sharedEmitDoneFor = ctx.external;
  if (ctx.external) {} else {
    if (Object.keys(defs).length > 0) {
      if (ctx.target === "draft-2020-12") {
        result.$defs = defs;
      } else {
        result.definitions = defs;
      }
    }
  }
  try {
    const finalized = JSON.parse(JSON.stringify(result));
    Object.defineProperty(finalized, "~standard", {
      value: {
        ...schema["~standard"],
        jsonSchema: {
          input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
          output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
        }
      },
      enumerable: false,
      writable: false
    });
    return finalized;
  } catch (_err) {
    throw new Error("Error converting schema to JSON.");
  }
}
function isTransforming(_schema, _ctx) {
  const ctx = _ctx ?? { seen: new Set };
  if (ctx.seen.has(_schema))
    return false;
  ctx.seen.add(_schema);
  const def = _schema._zod.def;
  if (def.type === "transform")
    return true;
  if (def.type === "array")
    return isTransforming(def.element, ctx);
  if (def.type === "set")
    return isTransforming(def.valueType, ctx);
  if (def.type === "lazy")
    return isTransforming(def.getter(), ctx);
  if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault" || def.type === "catch") {
    return isTransforming(def.innerType, ctx);
  }
  if (def.type === "intersection") {
    return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
  }
  if (def.type === "record" || def.type === "map") {
    return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
  }
  if (def.type === "pipe") {
    if (_schema._zod.traits.has("$ZodCodec"))
      return true;
    return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
  }
  if (def.type === "object") {
    for (const key in def.shape) {
      if (isTransforming(def.shape[key], ctx))
        return true;
    }
    return false;
  }
  if (def.type === "union") {
    for (const option of def.options) {
      if (isTransforming(option, ctx))
        return true;
    }
    return false;
  }
  if (def.type === "tuple") {
    for (const item of def.items) {
      if (isTransforming(item, ctx))
        return true;
    }
    if (def.rest && isTransforming(def.rest, ctx))
      return true;
    return false;
  }
  return false;
}
var createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
  const ctx = initializeContext({ ...params, processors });
  processSchema(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};
var createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
  const { libraryOptions, target } = params ?? {};
  const ctx = initializeContext({ ...libraryOptions ?? {}, target, io, processors });
  processSchema(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};
// node_modules/zod/v4/core/json-schema-processors.js
var narrowMin = (agg, key, value) => {
  if (agg[key] === undefined || value > agg[key])
    agg[key] = value;
};
var narrowMax = (agg, key, value) => {
  if (agg[key] === undefined || value < agg[key])
    agg[key] = value;
};
var narrowBoth = (agg, value) => {
  narrowMin(agg, "minimum", value);
  narrowMax(agg, "maximum", value);
};
var addDivisor = (agg, value) => {
  agg.multipleOf ?? (agg.multipleOf = []);
  if (!agg.multipleOf.includes(value))
    agg.multipleOf.push(value);
};
var addPattern = (agg, pattern) => {
  agg.patterns ?? (agg.patterns = new Set);
  agg.patterns.add(pattern);
};
var intersectMime = (agg, mime) => {
  agg.mime = agg.mime ? agg.mime.filter((m) => mime.includes(m)) : [...mime];
};
var setFormat = (agg, format) => {
  agg.format = format;
  if (format.includes("int"))
    agg.isInt = true;
};
var minContributor = (agg, def) => narrowMin(agg, "minimum", def.minimum);
var maxContributor = (agg, def) => narrowMax(agg, "maximum", def.maximum);
var formatContributor = (ranges) => (agg, def) => {
  setFormat(agg, def.format);
  const [minimum, maximum] = ranges[def.format];
  narrowMin(agg, "minimum", minimum);
  narrowMax(agg, "maximum", maximum);
};
var contributors = {
  greater_than: (agg, def) => narrowMin(agg, def.inclusive ? "minimum" : "exclusiveMinimum", def.value),
  less_than: (agg, def) => narrowMax(agg, def.inclusive ? "maximum" : "exclusiveMaximum", def.value),
  multiple_of: (agg, def) => addDivisor(agg, def.value),
  number_format: formatContributor(NUMBER_FORMAT_RANGES),
  bigint_format: formatContributor(BIGINT_FORMAT_RANGES),
  min_length: minContributor,
  max_length: maxContributor,
  length_equals: (agg, def) => narrowBoth(agg, def.length),
  min_size: minContributor,
  max_size: maxContributor,
  size_equals: (agg, def) => narrowBoth(agg, def.size),
  string_format: (agg, def) => {
    setFormat(agg, def.format);
    if (def.pattern)
      addPattern(agg, def.pattern);
    if (def.format === "base64" || def.format === "base64url")
      agg.contentEncoding = def.format;
    if (def.local || def.precision === -1)
      agg.laxFormat = true;
  },
  mime_type: (agg, def) => intersectMime(agg, def.mime)
};
function aggregateChecks(schema) {
  const agg = {};
  const def = schema._zod.def;
  const list = schema._zod.traits.has("$ZodCheck") ? [schema, ...def.checks ?? []] : def.checks ?? [];
  for (const ch of list)
    contributors[ch._zod.def.check]?.(agg, ch._zod.def);
  const bag = schema._zod.bag;
  if (bag.minimum !== undefined)
    narrowMin(agg, "minimum", bag.minimum);
  if (bag.exclusiveMinimum !== undefined)
    narrowMin(agg, "exclusiveMinimum", bag.exclusiveMinimum);
  if (bag.maximum !== undefined)
    narrowMax(agg, "maximum", bag.maximum);
  if (bag.exclusiveMaximum !== undefined)
    narrowMax(agg, "exclusiveMaximum", bag.exclusiveMaximum);
  if (bag.multipleOf !== undefined)
    addDivisor(agg, bag.multipleOf);
  if (bag.format !== undefined) {
    agg.format ?? (agg.format = bag.format);
    if (bag.format.includes("int"))
      agg.isInt = true;
  }
  if (bag.mime)
    intersectMime(agg, bag.mime);
  for (const pattern of bag.patterns ?? [])
    addPattern(agg, pattern);
  return agg;
}
var formatMap = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
};
var exactPatterns = new Map([
  [base64Charset, base64],
  [base64urlCharset, base64url]
]);
var exactPattern = (p) => exactPatterns.get(p) ?? p;
var stringProcessor = (schema, ctx, _json, _params) => {
  const json = _json;
  json.type = "string";
  const { minimum, maximum, format, patterns, contentEncoding, laxFormat } = aggregateChecks(schema);
  if (typeof minimum === "number")
    json.minLength = minimum;
  if (typeof maximum === "number")
    json.maxLength = maximum;
  if (format) {
    json.format = formatMap[format] ?? format;
    if (json.format === "")
      delete json.format;
    if (format === "time" || laxFormat) {
      delete json.format;
    }
  }
  if (contentEncoding)
    json.contentEncoding = contentEncoding;
  if (patterns && patterns.size > 0) {
    const patternList = [...patterns].map(exactPattern);
    if (patternList.length === 1)
      json.pattern = patternList[0].source;
    else if (patternList.length > 1) {
      json.allOf = [
        ...patternList.map((regex) => ({
          ...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
          pattern: regex.source
        }))
      ];
    }
  }
};
var numberProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const { minimum, maximum, multipleOf, exclusiveMaximum, exclusiveMinimum, isInt } = aggregateChecks(schema);
  json.type = isInt ? "integer" : "number";
  const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
  const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
  const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
  if (exMin) {
    if (legacy) {
      json.minimum = exclusiveMinimum;
      json.exclusiveMinimum = true;
    } else {
      json.exclusiveMinimum = exclusiveMinimum;
    }
  } else if (typeof minimum === "number") {
    json.minimum = minimum;
  }
  if (exMax) {
    if (legacy) {
      json.maximum = exclusiveMaximum;
      json.exclusiveMaximum = true;
    } else {
      json.exclusiveMaximum = exclusiveMaximum;
    }
  } else if (typeof maximum === "number") {
    json.maximum = maximum;
  }
  if (multipleOf) {
    const divisors = new Set;
    for (const divisor of multipleOf) {
      if (Number.isFinite(divisor) && divisor !== 0)
        divisors.add(Math.abs(divisor));
      else
        handleUnrepresentable(schema, ctx, json, params, `A multipleOf divisor of ${divisor} cannot be represented in JSON Schema`);
    }
    const [first, ...rest] = divisors;
    if (first !== undefined)
      json.multipleOf = first;
    if (rest.length)
      json.allOf = [...json.allOf ?? [], ...rest.map((m) => ({ multipleOf: m }))];
  }
};
var booleanProcessor = (_schema, _ctx, json, _params) => {
  json.type = "boolean";
};
var neverProcessor = (_schema, _ctx, json, _params) => {
  json.not = {};
};
var unknownProcessor = (_schema, _ctx, _json, _params) => {};
var enumProcessor = (schema, _ctx, json, _params) => {
  const def = schema._zod.def;
  const values = getEnumValues(def.entries);
  if (values.length === 0) {
    json.not = {};
    return;
  }
  if (values.every((v) => typeof v === "number"))
    json.type = "number";
  if (values.every((v) => typeof v === "string"))
    json.type = "string";
  json.enum = values;
};
var literalProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  if (def.values.length === 0) {
    json.not = {};
    return;
  }
  const vals = [];
  for (const val of def.values) {
    if (val === undefined) {
      if (handleUnrepresentable(schema, ctx, json, params, "Literal `undefined` cannot be represented in JSON Schema"))
        return;
    } else if (typeof val === "bigint") {
      if (handleUnrepresentable(schema, ctx, json, params, "BigInt literals cannot be represented in JSON Schema"))
        return;
      vals.push(Number(val));
    } else {
      vals.push(val);
    }
  }
  if (vals.length === 0) {} else if (vals.length === 1) {
    const val = vals[0];
    json.type = val === null ? "null" : typeof val;
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json.enum = [val];
    } else {
      json.const = val;
    }
  } else {
    if (vals.every((v) => typeof v === "number"))
      json.type = "number";
    if (vals.every((v) => typeof v === "string"))
      json.type = "string";
    if (vals.every((v) => typeof v === "boolean"))
      json.type = "boolean";
    if (vals.every((v) => v === null))
      json.type = "null";
    json.enum = vals;
  }
};
var customProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Custom types cannot be represented in JSON Schema");
};
var transformProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Transforms cannot be represented in JSON Schema");
};
var arrayProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  const { minimum, maximum } = aggregateChecks(schema);
  if (typeof minimum === "number")
    json.minItems = minimum;
  if (typeof maximum === "number")
    json.maxItems = maximum;
  json.type = "array";
  json.items = processSchema(def.element, ctx, {
    ...params,
    path: [...params.path, "items"]
  });
};
function inputOptin(schema) {
  const def = schema._zod.def;
  if (def.type === "pipe" && def.in._zod.traits.has("$ZodTransform")) {
    return inputOptin(def.out);
  }
  if (def.type === "catch") {
    return inputOptin(def.innerType);
  }
  return schema._zod.optin;
}
var objectProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  const shape = def.shape;
  const symbolKeys = Object.getOwnPropertySymbols(shape);
  if (symbolKeys.length && handleUnrepresentable(schema, ctx, json, params, "Symbol keys cannot be represented in JSON Schema")) {
    return;
  }
  json.type = "object";
  json.properties = {};
  for (const key in shape) {
    assignProp(json.properties, key, processSchema(shape[key], ctx, {
      ...params,
      path: [...params.path, "properties", key]
    }));
  }
  const requiredKeys = [];
  for (const key of Object.keys(shape)) {
    const field = def.shape[key];
    if (ctx.io === "input" ? inputOptin(field) === undefined : field._zod.optout === undefined) {
      requiredKeys.push(key);
    }
  }
  if (requiredKeys.length > 0) {
    json.required = requiredKeys;
  }
  if (def.catchall?._zod.def.type === "never") {
    json.additionalProperties = false;
  } else if (!def.catchall) {
    if (ctx.io === "output")
      json.additionalProperties = false;
  } else if (def.catchall) {
    json.additionalProperties = processSchema(def.catchall, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
};
var unionProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const isExclusive = def.inclusive === false;
  const options = def.options.map((x, i) => processSchema(x, ctx, {
    ...params,
    path: [...params.path, isExclusive ? "oneOf" : "anyOf", i]
  }));
  if (isExclusive) {
    json.oneOf = options;
  } else {
    json.anyOf = options;
  }
};
var intersectionProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const a = processSchema(def.left, ctx, {
    ...params,
    path: [...params.path, "allOf", 0]
  });
  const b = processSchema(def.right, ctx, {
    ...params,
    path: [...params.path, "allOf", 1]
  });
  const isSimpleIntersection = (val) => ("allOf" in val) && Object.keys(val).length === 1;
  const allOf = [
    ...isSimpleIntersection(a) ? a.allOf : [a],
    ...isSimpleIntersection(b) ? b.allOf : [b]
  ];
  json.allOf = allOf;
  ctx.intersections.push(allOf);
};
function stringifyKeyNames(bySchema, json, visited) {
  if (json.$ref) {
    if (visited.has(json))
      return json;
    visited.add(json);
    const def = bySchema.get(json)?.def;
    if (!def)
      return json;
    const inlined = stringifyKeyNames(bySchema, def, visited);
    return inlined === def ? json : inlined;
  }
  for (const keyword of ["anyOf", "oneOf"]) {
    const branches = json[keyword];
    if (!Array.isArray(branches))
      continue;
    const mapped = branches.map((branch) => stringifyKeyNames(bySchema, branch, visited));
    if (mapped.some((branch, i) => branch !== branches[i]))
      json = { ...json, [keyword]: mapped };
  }
  const types = Array.isArray(json.type) ? json.type : [json.type];
  const numericType = !types.includes("string") && types.some((t) => t === "number" || t === "integer");
  const values = json.enum ?? (json.const !== undefined ? [json.const] : undefined);
  if (!numericType && !values?.some((v) => typeof v === "number"))
    return json;
  const { minimum, maximum, exclusiveMinimum, exclusiveMaximum, multipleOf, format, id, ...rest } = json;
  if (rest.enum)
    rest.enum = rest.enum.map((v) => typeof v === "number" ? String(v) : v);
  else if (typeof rest.const === "number")
    rest.const = String(rest.const);
  if (!numericType)
    return rest;
  rest.type = "string";
  if (!values)
    rest.pattern = (types.includes("number") ? number : integer).source;
  return rest;
}
var pendingRecords = new WeakMap;
function rewriteKeyNames(ctx) {
  const bySchema = new Map;
  for (const entry of ctx.seen.values()) {
    if (entry.def && !bySchema.has(entry.schema))
      bySchema.set(entry.schema, entry);
  }
  const rewrites = new Map;
  for (const record of pendingRecords.get(ctx) ?? []) {
    const seen = ctx.seen.get(record);
    const names = (seen?.def ?? seen?.schema)?.propertyNames;
    if (!names || names === true || rewrites.has(names))
      continue;
    const rewritten = stringifyKeyNames(bySchema, names, new Set);
    if (rewritten !== names)
      rewrites.set(names, rewritten);
  }
  if (!rewrites.size)
    return;
  for (const entry of ctx.seen.values()) {
    for (const carrier of [entry.schema, entry.def]) {
      const rewritten = carrier && rewrites.get(carrier.propertyNames);
      if (rewritten)
        carrier.propertyNames = rewritten;
    }
  }
}
var recordProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  json.type = "object";
  const keyType = def.keyType;
  const patterns = aggregateChecks(keyType).patterns;
  if (def.mode === "loose" && patterns && patterns.size > 0) {
    const valueSchema = processSchema(def.valueType, ctx, {
      ...params,
      path: [...params.path, "patternProperties", "*"]
    });
    json.patternProperties = {};
    for (const pattern of patterns) {
      assignProp(json.patternProperties, exactPattern(pattern).source, valueSchema);
    }
  } else {
    if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
      json.propertyNames = processSchema(def.keyType, ctx, {
        ...params,
        path: [...params.path, "propertyNames"]
      });
      let pending = pendingRecords.get(ctx);
      if (!pending) {
        pending = [];
        pendingRecords.set(ctx, pending);
        ctx.deferred.push(() => rewriteKeyNames(ctx));
      }
      pending.push(schema);
    }
    json.additionalProperties = processSchema(def.valueType, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
  const keyValues = keyType._zod.values;
  const omittableOnInput = ctx.io === "input" && inputOptin(def.valueType) !== undefined;
  if (keyValues && !def.partial && !omittableOnInput) {
    const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
    if (validKeyValues.length > 0) {
      json.required = validKeyValues.map(String);
    }
  }
};
var nullableProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const inner = processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  if (ctx.target === "openapi-3.0") {
    seen.ref = def.innerType;
    json.nullable = true;
  } else {
    json.anyOf = [inner, { type: "null" }];
  }
};
var nonoptionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var UNREPRESENTABLE_DEFAULT = Symbol();
function serializeDefaultValue(value, schema, ctx, json, params) {
  let unrepresentable = false;
  const serialized = JSON.stringify(value, (_, val) => {
    if (typeof val !== "bigint")
      return val;
    unrepresentable = true;
    return null;
  });
  if (!unrepresentable)
    return JSON.parse(serialized);
  handleUnrepresentable(schema, ctx, json, params, "BigInt defaults cannot be represented in JSON Schema");
  return UNREPRESENTABLE_DEFAULT;
}
var defaultProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
  if (value !== UNREPRESENTABLE_DEFAULT)
    json.default = value;
};
var prefaultProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  if (ctx.io !== "input")
    return;
  const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
  if (value !== UNREPRESENTABLE_DEFAULT)
    json._prefault = value;
};
var catchProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  let catchValue;
  try {
    catchValue = def.catchValue(undefined);
  } catch {
    handleUnrepresentable(schema, ctx, json, params, "Dynamic catch values are not supported in JSON Schema");
    return;
  }
  json.default = catchValue;
};
var pipeProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  const inIsTransform = def.in._zod.traits.has("$ZodTransform");
  const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
  processSchema(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var readonlyProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json.readOnly = true;
};
var optionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
// node_modules/zod/v4/classic/errors.js
var _installedErrorProtos = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
function _lazyMethod(proto, key, make) {
  Object.defineProperty(proto, key, {
    configurable: true,
    enumerable: false,
    get() {
      const value = make(this);
      Object.defineProperty(this, key, { value, configurable: true, writable: true });
      return value;
    },
    set(value) {
      Object.defineProperty(this, key, { value, configurable: true, writable: true });
    }
  });
}
var initializer2 = (inst, issues) => {
  $ZodError.init(inst, issues);
  inst.name = "ZodError";
  const proto = Object.getPrototypeOf(inst);
  if (_installedErrorProtos.has(proto))
    return;
  _installedErrorProtos.add(proto);
  _lazyMethod(proto, "format", (self) => (mapper) => formatError(self, mapper));
  _lazyMethod(proto, "flatten", (self) => (mapper) => flattenError(self, mapper));
  _lazyMethod(proto, "addIssue", (self) => (issue) => {
    self.issues.push(issue);
    self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
  });
  _lazyMethod(proto, "addIssues", (self) => (issues) => {
    self.issues.push(...issues);
    self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
  });
  Object.defineProperty(proto, "isEmpty", {
    configurable: true,
    enumerable: false,
    get() {
      return this.issues.length === 0;
    }
  });
};
var ZodRealError = /* @__PURE__ */ $constructor("ZodError", initializer2, undefined, {
  Parent: Error
});

// node_modules/zod/v4/classic/parse.js
var parse2 = /* @__PURE__ */ _parse(ZodRealError);
var parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
var safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
var safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
var encode = /* @__PURE__ */ _encode(ZodRealError);
var decode = /* @__PURE__ */ _decode(ZodRealError);
var encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
var decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
var safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
var safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
var safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
var safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);

// node_modules/zod/v4/classic/schemas.js
function _ensureDefaultLocale() {
  if (!globalConfig.localeError)
    config(en_default());
}
function _ensureDefaultMemoizer() {
  if (!globalConfig.memoizer)
    config({ memoizer: memoizer() });
}
var ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
  _ensureDefaultLocale();
  $ZodType.init(inst, def);
  inst.def = def;
  inst.type = def.type;
  return inst;
}, {
  check(...chks) {
    const def = this.def;
    return this.clone(mergeDefs(def, {
      checks: [
        ...def.checks ?? [],
        ...chks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
      ]
    }), { parent: true });
  },
  with(...chks) {
    return this.check(...chks);
  },
  clone(def, params) {
    return clone(this, def, params);
  },
  brand() {
    return this;
  },
  register(reg, meta) {
    reg.add(this, meta);
    return this;
  },
  refine(check, params) {
    return this.check(refine(check, params));
  },
  superRefine(refinement, params) {
    return this.check(superRefine(refinement, params));
  },
  overwrite(fn) {
    return this.check(_overwrite(fn));
  },
  optional() {
    return optional(this);
  },
  exactOptional() {
    return exactOptional(this);
  },
  nullable() {
    return nullable(this);
  },
  nullish() {
    return optional(nullable(this));
  },
  nonoptional(params) {
    return nonoptional(this, params);
  },
  array() {
    return array(this);
  },
  or(arg) {
    return union([this, arg]);
  },
  and(arg) {
    return intersection(this, arg);
  },
  transform(tx) {
    return pipe(this, transform(tx));
  },
  default(d) {
    return _default(this, d);
  },
  prefault(d) {
    return prefault(this, d);
  },
  catch(params) {
    return _catch(this, params);
  },
  pipe(target) {
    return pipe(this, target);
  },
  readonly() {
    return readonly(this);
  },
  describe(description) {
    const cl = this.clone();
    globalRegistry.add(cl, { description });
    return cl;
  },
  meta(...args) {
    if (args.length === 0)
      return globalRegistry.get(this);
    const cl = this.clone();
    globalRegistry.add(cl, args[0]);
    return cl;
  },
  isOptional() {
    return this.safeParse(undefined).success;
  },
  isNullable() {
    return this.safeParse(null).success;
  },
  apply(fn, ...args) {
    return args.length === 0 ? fn(this) : fn(this, ...args);
  },
  get "~standard"() {
    return hide(this, "~standard", {
      ...standardProps(this),
      jsonSchema: {
        input: createStandardJSONSchemaMethod(this, "input"),
        output: createStandardJSONSchemaMethod(this, "output")
      }
    });
  },
  set "~standard"(value) {
    own(this, "~standard", value);
  },
  parse: function _parse(data, params) {
    return parse2(this, data, params, { callee: _parse });
  },
  parseAsync: async function _parseAsync(data, params) {
    return await parseAsync(this, data, params, { callee: _parseAsync });
  },
  safeParse(data, params) {
    return safeParse(this, data, params);
  },
  async safeParseAsync(data, params) {
    return safeParseAsync(this, data, params);
  },
  get spa() {
    return this?.safeParseAsync;
  },
  set spa(value) {
    own(this, "spa", value);
  },
  validate(data, params) {
    return validate(this, data, params);
  },
  validateAsync(data, params) {
    return validateAsync(this, data, params);
  },
  encode: function _encode(data, params) {
    return encode(this, data, params, { callee: _encode });
  },
  decode: function _decode(data, params) {
    return decode(this, data, params, { callee: _decode });
  },
  encodeAsync: async function _encodeAsync(data, params) {
    return await encodeAsync(this, data, params, { callee: _encodeAsync });
  },
  decodeAsync: async function _decodeAsync(data, params) {
    return await decodeAsync(this, data, params, { callee: _decodeAsync });
  },
  safeEncode(data, params) {
    return safeEncode(this, data, params);
  },
  safeDecode(data, params) {
    return safeDecode(this, data, params);
  },
  async safeEncodeAsync(data, params) {
    return safeEncodeAsync(this, data, params);
  },
  async safeDecodeAsync(data, params) {
    return safeDecodeAsync(this, data, params);
  },
  toJSONSchema(params) {
    return createToJSONSchemaMethod(this, {})(params);
  },
  get description() {
    return globalRegistry.get(this)?.description;
  },
  get _def() {
    return this._zod.def;
  }
});
var _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
}, /* @__PURE__ */ derived({
  format: (inst) => aggregateChecks(inst).format ?? null,
  minLength: (inst) => aggregateChecks(inst).minimum ?? null,
  maxLength: (inst) => aggregateChecks(inst).maximum ?? null
}, {
  regex(...args) {
    return this.check(_regex(...args));
  },
  includes(...args) {
    return this.check(_includes(...args));
  },
  startsWith(...args) {
    return this.check(_startsWith(...args));
  },
  endsWith(...args) {
    return this.check(_endsWith(...args));
  },
  min(...args) {
    return this.check(_minLength(...args));
  },
  max(...args) {
    return this.check(_maxLength(...args));
  },
  length(...args) {
    return this.check(_length(...args));
  },
  nonempty(...args) {
    return this.check(_minLength(1, ...args));
  },
  lowercase(params) {
    return this.check(_lowercase(params));
  },
  uppercase(params) {
    return this.check(_uppercase(params));
  },
  trim() {
    return this.check(_trim());
  },
  normalize(...args) {
    return this.check(_normalize(...args));
  },
  toLowerCase() {
    return this.check(_toLowerCase());
  },
  toUpperCase() {
    return this.check(_toUpperCase());
  },
  slugify() {
    return this.check(_slugify());
  }
}));
var ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  _ZodString.init(inst, def);
}, {
  email(params) {
    return this.check(_email(ZodEmail, params));
  },
  url(params) {
    return this.check(_url(ZodURL, params));
  },
  jwt(params) {
    return this.check(_jwt(ZodJWT, params));
  },
  emoji(params) {
    return this.check(_emoji2(ZodEmoji, params));
  },
  guid(params) {
    return this.check(_guid(ZodGUID, params));
  },
  uuid(params) {
    return this.check(_uuid(ZodUUID, params));
  },
  uuidv4(params) {
    return this.check(_uuidv4(ZodUUID, params));
  },
  uuidv6(params) {
    return this.check(_uuidv6(ZodUUID, params));
  },
  uuidv7(params) {
    return this.check(_uuidv7(ZodUUID, params));
  },
  nanoid(params) {
    return this.check(_nanoid(ZodNanoID, params));
  },
  cuid(params) {
    return this.check(_cuid(ZodCUID, params));
  },
  cuid2(params) {
    return this.check(_cuid2(ZodCUID2, params));
  },
  ulid(params) {
    return this.check(_ulid(ZodULID, params));
  },
  base64(params) {
    return this.check(_base64(ZodBase64, params));
  },
  base64url(params) {
    return this.check(_base64url(ZodBase64URL, params));
  },
  xid(params) {
    return this.check(_xid(ZodXID, params));
  },
  ksuid(params) {
    return this.check(_ksuid(ZodKSUID, params));
  },
  ipv4(params) {
    return this.check(_ipv4(ZodIPv4, params));
  },
  ipv6(params) {
    return this.check(_ipv6(ZodIPv6, params));
  },
  cidrv4(params) {
    return this.check(_cidrv4(ZodCIDRv4, params));
  },
  cidrv6(params) {
    return this.check(_cidrv6(ZodCIDRv6, params));
  },
  e164(params) {
    return this.check(_e164(ZodE164, params));
  },
  datetime(params) {
    return this.check(_isoDateTime(ZodISODateTime, params));
  },
  date(params) {
    return this.check(_isoDate(ZodISODate, params));
  },
  time(params) {
    return this.check(_isoTime(ZodISOTime, params));
  },
  duration(params) {
    return this.check(_isoDuration(ZodISODuration, params));
  }
});
function string2(params) {
  return _string(ZodString, params);
}
var ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  _ZodString.init(inst, def);
});
var ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
  $ZodISODateTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
  $ZodISODate.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
  $ZodISOTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
  $ZodISODuration.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
  $ZodEmail.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
  $ZodGUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
  $ZodUUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
  $ZodURL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function url(params) {
  return _url(ZodURL, params);
}
var ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
  $ZodEmoji.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
  $ZodNanoID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
  $ZodCUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
  $ZodCUID2.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
  $ZodULID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
  $ZodXID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
  $ZodKSUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
  $ZodIPv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
  $ZodIPv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
  $ZodCIDRv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
  $ZodCIDRv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
  $ZodBase64.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
  $ZodBase64URL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
  $ZodE164.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
  $ZodJWT.init(inst, def);
  ZodStringFormat.init(inst, def);
});
var ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
  $ZodNumber.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
  inst.isFinite = true;
}, /* @__PURE__ */ derived({
  minValue: (inst) => {
    const { minimum, exclusiveMinimum } = aggregateChecks(inst);
    return Math.max(minimum ?? Number.NEGATIVE_INFINITY, exclusiveMinimum ?? Number.NEGATIVE_INFINITY);
  },
  maxValue: (inst) => {
    const { maximum, exclusiveMaximum } = aggregateChecks(inst);
    return Math.min(maximum ?? Number.POSITIVE_INFINITY, exclusiveMaximum ?? Number.POSITIVE_INFINITY);
  },
  isInt: (inst) => {
    const { isInt, multipleOf } = aggregateChecks(inst);
    return !!isInt || !!multipleOf?.some(Number.isSafeInteger);
  },
  format: (inst) => aggregateChecks(inst).format ?? null
}, {
  gt(value, params) {
    return this.check(_gt(value, params));
  },
  gte(value, params) {
    return this.check(_gte(value, params));
  },
  min(value, params) {
    return this.check(_gte(value, params));
  },
  lt(value, params) {
    return this.check(_lt(value, params));
  },
  lte(value, params) {
    return this.check(_lte(value, params));
  },
  max(value, params) {
    return this.check(_lte(value, params));
  },
  int(params) {
    return this.check(int(params));
  },
  safe(params) {
    return this.check(int(params));
  },
  positive(params) {
    return this.check(_gt(0, params));
  },
  nonnegative(params) {
    return this.check(_gte(0, params));
  },
  negative(params) {
    return this.check(_lt(0, params));
  },
  nonpositive(params) {
    return this.check(_lte(0, params));
  },
  multipleOf(value, params) {
    return this.check(_multipleOf(value, params));
  },
  step(value, params) {
    return this.check(_multipleOf(value, params));
  },
  finite() {
    return this;
  }
}));
function number2(params) {
  return _number(ZodNumber, params);
}
var ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
  $ZodNumberFormat.init(inst, def);
  ZodNumber.init(inst, def);
});
function int(params) {
  return _int(ZodNumberFormat, params);
}
var ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
  $ZodBoolean.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
});
function boolean2(params) {
  return _boolean(ZodBoolean, params);
}
var ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
  $ZodUnknown.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => unknownProcessor(inst, ctx, json, params);
});
function unknown() {
  return _unknown(ZodUnknown);
}
var ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
  $ZodNever.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
});
function never(params) {
  return _never(ZodNever, params);
}
var ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
  _ensureDefaultMemoizer();
  $ZodArray.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
  inst.element = def.element;
}, {
  min(n, params) {
    return this.check(_minLength(n, params));
  },
  nonempty(params) {
    return this.check(_minLength(1, params));
  },
  max(n, params) {
    return this.check(_maxLength(n, params));
  },
  length(n, params) {
    return this.check(_length(n, params));
  },
  unwrap() {
    return this.element;
  }
});
function array(element, params) {
  return _array(ZodArray, element, params);
}
var ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
  _ensureDefaultMemoizer();
  $ZodObjectJIT.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
  installLazyProp(inst, "shape", (self) => self._zod.def.shape, false);
}, {
  keyof() {
    return _enum(Object.keys(this._zod.def.shape));
  },
  catchall(catchall) {
    return this.clone(mergeDefs(this._zod.def, { catchall }));
  },
  passthrough() {
    return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
  },
  loose() {
    return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
  },
  strict() {
    return this.clone(mergeDefs(this._zod.def, { catchall: never() }));
  },
  strip() {
    return this.clone(mergeDefs(this._zod.def, { catchall: undefined }));
  },
  extend(incoming) {
    return extend(this, incoming);
  },
  safeExtend(incoming) {
    return safeExtend(this, incoming);
  },
  merge(other) {
    return merge(this, other);
  },
  pick(mask) {
    return pick(this, mask);
  },
  omit(mask) {
    return omit(this, mask);
  },
  partial(...args) {
    return partial(ZodOptional, this, args[0]);
  },
  exactPartial(...args) {
    return partial(ZodExactOptional, this, args[0], "exactPartial");
  },
  required(...args) {
    return required(ZodNonOptional, this, args[0]);
  }
});
function object(shape, params) {
  const def = {
    type: "object",
    shape: shape ?? {},
    ...normalizeParams(params)
  };
  return new ZodObject(def);
}
function strictObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: never(),
    ...normalizeParams(params)
  });
}
function looseObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: unknown(),
    ...normalizeParams(params)
  });
}
var ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
  $ZodUnion.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
  inst.options = def.options;
});
function union(options, params) {
  return new ZodUnion({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
var ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
  ZodUnion.init(inst, def);
  $ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
  return new ZodDiscriminatedUnion({
    type: "union",
    options,
    discriminator,
    ...normalizeParams(params)
  });
}
var ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
  $ZodIntersection.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
});
function intersection(left, right) {
  return new ZodIntersection({
    type: "intersection",
    left,
    right
  });
}
var ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
  _ensureDefaultMemoizer();
  $ZodRecord.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => recordProcessor(inst, ctx, json, params);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
  if (!valueType || !valueType._zod) {
    return new ZodRecord({
      type: "record",
      keyType: string2(),
      valueType: keyType,
      ...normalizeParams(valueType)
    });
  }
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
function partialRecord(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params),
    partial: true
  });
}
var ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
  $ZodEnum.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
  inst.enum = def.entries;
  inst.options = [...inst._zod.values];
  const keys = new Set(Object.keys(def.entries));
  inst.extract = (values, params) => {
    const newEntries = {};
    for (const value of values) {
      if (keys.has(value)) {
        newEntries[value] = def.entries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...normalizeParams(params),
      entries: newEntries
    });
  };
  inst.exclude = (values, params) => {
    const newEntries = { ...def.entries };
    for (const value of values) {
      if (keys.has(value)) {
        delete newEntries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...normalizeParams(params),
      entries: newEntries
    });
  };
});
function _enum(values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new ZodEnum({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
var ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
  $ZodLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
  inst.values = new Set(def.values);
  Object.defineProperty(inst, "value", {
    get() {
      if (def.values.length > 1) {
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      }
      return def.values[0];
    }
  });
});
function literal(value, params) {
  return new ZodLiteral({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params)
  });
}
var ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
  _ensureDefaultMemoizer();
  $ZodTransform.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
  inst._zod.parse = (payload, _ctx) => {
    if (_ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(issue(issue2, payload.value, def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        if (!("input" in _issue))
          _issue.input = payload.value;
        _issue.inst ?? (_issue.inst = inst);
        payload.issues.push(issue(_issue));
      }
    };
    const output = def.transform(payload.value, payload);
    if (output instanceof Promise) {
      return output.then((output) => {
        payload.value = output;
        return payload;
      });
    }
    payload.value = output;
    return payload;
  };
});
function transform(fn) {
  return new ZodTransform({
    type: "transform",
    transform: fn
  });
}
var ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
  return new ZodOptional({
    type: "optional",
    innerType
  });
}
var ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
  $ZodExactOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
  return new ZodExactOptional({
    type: "optional",
    innerType
  });
}
var ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
  $ZodNullable.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
  return new ZodNullable({
    type: "nullable",
    innerType
  });
}
var ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
  $ZodDefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
  return new ZodDefault({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
var ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
  $ZodPrefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
  return new ZodPrefault({
    type: "prefault",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
var ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
  $ZodNonOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
  return new ZodNonOptional({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params)
  });
}
var ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
  $ZodCatch.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
  return new ZodCatch({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : constantCatch(catchValue)
  });
}
var ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
  $ZodPipe.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
  inst.in = def.in;
  inst.out = def.out;
});
function pipe(in_, out) {
  return new ZodPipe({
    type: "pipe",
    in: in_,
    out
  });
}
var ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
  $ZodReadonly.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
  return new ZodReadonly({
    type: "readonly",
    innerType
  });
}
var ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
  $ZodCustom.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
});
function refine(fn, _params = {}) {
  return _refine(ZodCustom, fn, _params);
}
function superRefine(fn, params) {
  return _superRefine(fn, params);
}
// node_modules/zod/v4/classic/iso.js
function datetime2(params) {
  return _isoDateTime(ZodISODateTime, params);
}
function date2(params) {
  return _isoDate(ZodISODate, params);
}
function time2(params) {
  return _isoTime(ZodISOTime, params);
}
function duration2(params) {
  return _isoDuration(ZodISODuration, params);
}
// src/shared/loadout-rules.ts
var PHASES = ["scout", "craft", "test", "ship"];
var ACTIONS = ["cast", "summon", "link", "scan", "strike", "craft", "guard", "loot"];
var FOE_ROLES = ["foe", "boss"];
var FOE_FX = ["claw", "slam", "spit", "haze", "split", "flicker", "regrow", "crash", "grind", "paper", "barrier", "venom", "breath", "call", "rewind", "stare"];
var FOE_STATUSES = ["haze", "poison"];
var PASSIVES = ["split", "flicker", "regrow", "barrier"];
var EFFORTS = ["none", "low", "medium", "high", "xhigh", "max"];
var WEAPONS = ["greatsword", "longsword", "dagger", "warhammer", "staff"];
var LOADOUT_LIMITS = { perPhase: 3, spells: 12, title: 60, task: 90, notes: 300, author: 32 };
var CONTROL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u200b-\u200f\u202a-\u202e\u2066-\u2069]/;
var SINGLE_LINE = /^[^\r\n\u0085\u2028\u2029]*$/;
function toBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes)
    binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

// src/stats/rules.ts
var TEST = /\b(bun test|vitest|jest|pytest|go test|cargo test|(?:npm|pnpm|yarn|bun) (?:run )?test|playwright test|swift test|xcodebuild\b.*\btest|phpunit|rspec|mocha|deno test|dotnet test|mvn test|gradle test)\b/;
function testFamily(cmd) {
  const match = TEST.exec(cmd)?.[1];
  if (match === undefined)
    return null;
  const family = match.toLowerCase().replace(/\s+/g, " ");
  return family.startsWith("xcodebuild") ? "xcodebuild test" : family.replace(" run test", " test");
}
var SKILL_PATH = /skills[\\/]+([a-z0-9][a-z0-9._-]{0,63})[\\/]+SKILL\.md/g;
var CODEX_BUILTIN_MCP = new Set(["codex_app", "codex_apps", "node_repl", "cua_repl"]);
var CLAUDE_BUILTIN_MCP = new Set(["claude_preview", "ccd_session"]);
var CLAUDE_BUILTIN_COMMANDS = new Set([
  "add-dir",
  "agents",
  "bug",
  "clear",
  "compact",
  "config",
  "context",
  "cost",
  "doctor",
  "effort",
  "exit",
  "export",
  "fast",
  "goal",
  "help",
  "hooks",
  "ide",
  "init",
  "install-github-app",
  "login",
  "logout",
  "mcp",
  "memory",
  "model",
  "output-style",
  "permissions",
  "plugin",
  "plugins",
  "privacy-settings",
  "release-notes",
  "resume",
  "rewind",
  "status",
  "statusline",
  "terminal-setup",
  "theme",
  "todos",
  "upgrade",
  "usage",
  "vim"
]);

// src/expeditions/adapters/tools.ts
var TOOL_ARG_CHARS = 4096;
var SHIP = /\b(?:git\s+push|gh\s+pr\s+(?:create|merge)|(?:npm|pnpm|yarn|bun|cargo)\s+publish|vercel(?:\s+deploy)?\s+--prod|(?:vercel|netlify|wrangler|flyctl|fly|firebase|railway|gcloud(?:\s+[a-z-]+)*?)\s+deploy|terraform\s+apply|kubectl\s+apply)\b/;
var RAW_NAME = /^[a-z0-9][a-z0-9._:@/-]{0,99}$/;
var optString = string2().min(1).max(500).optional().catch(undefined);
var optId = string2().min(1).max(200).optional().catch(undefined);
var optModel = string2().regex(/^[^\x00-\x1f\x7f]{1,80}$/).optional().catch(undefined);
var optEffort = object({ level: _enum(EFFORTS) }).optional().catch(undefined);
var optPrompt = string2().optional().catch(undefined).transform((text) => text?.slice(0, CHANNEL_LIMITS.promptChars));
var optLiveString = string2().max(TOOL_ARG_CHARS).optional().catch(undefined);
function sanitizeLiveText(value, limit) {
  if (typeof value !== "string" || value.length > TOOL_ARG_CHARS)
    return null;
  const text = value.replace(/[\x00-\x1f\x7f-\x9f\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]/g, "").replace(/\s+/g, " ").trim().slice(0, limit).trim();
  return text || null;
}
function liveBaseName(value, limit) {
  const text = sanitizeLiveText(value, TOOL_ARG_CHARS);
  const name = text?.split(/[?#]/, 1)[0]?.replace(/\\/g, "/").replace(/\/+$/, "").split("/").pop();
  if (!name || name === "." || name === ".." || /^[a-z]:$/i.test(name))
    return null;
  return sanitizeLiveText(name, limit);
}
function projectName(path) {
  return liveBaseName(path, LIVE_LIMITS.projectChars) ?? undefined;
}
var StepArgs = object({
  file_path: optLiveString,
  path: optLiveString,
  notebook_path: optLiveString,
  url: optLiveString,
  skill: optLiveString,
  name: optLiveString,
  subagent_type: optLiveString,
  agent_type: optLiveString,
  agent: optLiveString
}).catch({});
function stepFor(call, name, input, server) {
  if (call.tool === "shell" || call.tool === "test" || call.tool === "ship")
    return { kind: call.tool, target: null };
  const args = StepArgs.parse(input);
  let target;
  switch (call.tool) {
    case "read":
    case "edit":
      target = args.file_path ?? args.path ?? args.notebook_path;
      break;
    case "web": {
      const text = sanitizeLiveText(args.url, TOOL_ARG_CHARS);
      try {
        const url = new URL(text ?? "");
        if (url.protocol === "https:" || url.protocol === "http:")
          target = url.hostname;
      } catch {}
      break;
    }
    case "mcp": {
      const parts = name.length <= TOOL_ARG_CHARS ? name.split("__", 3) : [];
      target = server ?? (call.match?.startsWith("mcp:") ? call.match.slice(4) : parts.length === 3 ? parts[1] : undefined);
      break;
    }
    case "skill":
      target = call.match?.startsWith("skill:") ? call.match.slice(6) : call.match?.startsWith("command:") ? call.match.slice(8) : args.skill ?? args.name;
      break;
    case "subagent":
      target = args.subagent_type ?? args.agent_type ?? args.agent ?? args.name;
      break;
    case "other":
      target = name;
      break;
  }
  return { kind: call.tool, target: liveBaseName(target, LIVE_LIMITS.targetChars) };
}
var ToolArgs = object({
  command: string2().optional().catch(undefined),
  file_path: string2().optional().catch(undefined),
  path: string2().optional().catch(undefined),
  skill: string2().optional().catch(undefined),
  name: string2().optional().catch(undefined),
  subagent_type: string2().optional().catch(undefined),
  agent_type: string2().optional().catch(undefined)
}).catch({});
function rawId(kind, name) {
  if (name !== undefined && name.length > TOOL_ARG_CHARS)
    return;
  const lower = name?.trim().toLowerCase();
  return lower !== undefined && RAW_NAME.test(lower) ? `${kind}:${lower}` : undefined;
}
function skillRead(text) {
  if (text.length > TOOL_ARG_CHARS)
    return;
  for (const match of text.matchAll(SKILL_PATH)) {
    const id = rawId("skill", match[1]);
    if (id !== undefined)
      return id;
  }
  return;
}
function shellCall(command) {
  if (command.length > TOOL_ARG_CHARS)
    return { tool: "shell" };
  const match = skillRead(command);
  if (match !== undefined)
    return { tool: "skill", match };
  if (testFamily(command) !== null)
    return { tool: "test" };
  return { tool: SHIP.test(command) ? "ship" : "shell" };
}
function mcpServer(name, builtin) {
  if (name.length > TOOL_ARG_CHARS)
    return;
  const server = name.split("__")[1]?.toLowerCase();
  return server === undefined || builtin.has(server) ? undefined : rawId("mcp", server);
}
var CLAUDE_TOOLS = {
  Read: "read",
  Glob: "read",
  Grep: "read",
  LS: "read",
  NotebookRead: "read",
  Edit: "edit",
  Write: "edit",
  MultiEdit: "edit",
  NotebookEdit: "edit",
  Bash: "shell",
  PowerShell: "shell",
  WebFetch: "web",
  WebSearch: "web",
  Skill: "skill",
  SlashCommand: "skill",
  Agent: "subagent",
  Task: "subagent"
};
var CODEX_TOOLS = {
  Bash: "shell",
  apply_patch: "edit",
  read_file: "read",
  list_dir: "read",
  grep_files: "read",
  view_image: "read",
  spawn_agent: "subagent",
  Agent: "subagent"
};
var GEMINI_TOOLS = {
  read_file: "read",
  read_many_files: "read",
  list_directory: "read",
  glob: "read",
  grep_search: "read",
  search_file_content: "read",
  read_mcp_resource: "read",
  list_mcp_resources: "read",
  write_file: "edit",
  replace: "edit",
  run_shell_command: "shell",
  google_web_search: "web",
  web_fetch: "web",
  activate_skill: "skill"
};
function toolCall(table, name, input) {
  const tool = Object.hasOwn(table, name) ? table[name] ?? "other" : "other";
  const args = ToolArgs.parse(input);
  if (Object.values(args).some((value) => value !== undefined && value.length > TOOL_ARG_CHARS))
    return { tool };
  switch (tool) {
    case "shell":
      return args.command === undefined ? { tool } : shellCall(args.command);
    case "read": {
      const match = skillRead(args.file_path ?? args.path ?? "");
      return match === undefined ? { tool } : { tool: "skill", match };
    }
    case "skill": {
      if (name === "SlashCommand") {
        const command = /^\/?([a-z0-9][a-z0-9:_-]{0,63})(?:\s|$)/.exec(args.command ?? "")?.[1];
        const match = command === undefined || CLAUDE_BUILTIN_COMMANDS.has(command) ? undefined : rawId("command", command);
        return match === undefined ? { tool } : { tool, match };
      }
      const match = rawId("skill", args.skill ?? args.name ?? args.command);
      return match === undefined ? { tool } : { tool, match };
    }
    case "subagent": {
      const type = args.subagent_type ?? args.agent_type;
      const match = type?.includes(":") ? rawId("plugin", type.split(":", 1)[0]) : undefined;
      return match === undefined ? { tool } : { tool, match };
    }
    default:
      return { tool };
  }
}

// src/expeditions/adapters/generic.ts
var CAPS = { prompt: false, tools: false, skills: false, subagents: false, compaction: false, toolStart: false, model: false };
var MARKS = ["start", "progress", "done"];
var Payload = object({
  mark: _enum(MARKS),
  class: string2().regex(/^[a-z0-9][a-z0-9-]{0,63}$/).optional(),
  session: string2().min(1).max(500).optional(),
  cwd: optLiveString
});
function normalize(payload) {
  const parsed = Payload.safeParse(payload);
  if (!parsed.success)
    return null;
  const { mark, class: cls, session, cwd } = parsed.data;
  const events = [];
  if (mark === "start") {
    events.push({ kind: "session_start", agent: "generic", caps: CAPS, model: null, effort: null });
    if (cls !== undefined)
      events.push({ kind: "class_set", class: cls, by: "auto", sure: true, candidates: [] });
  } else {
    events.push({ kind: "turn_end" });
    if (mark === "done")
      events.push({ kind: "session_end", reason: "agent" });
  }
  return { session: session ?? null, events, wantsGuide: false, live: mark === "done" ? undefined : { phase: "working", project: projectName(cwd) } };
}

// src/expeditions/channel.ts
import { spawn } from "node:child_process";
import { createHmac, randomBytes as randomBytes2, timingSafeEqual } from "node:crypto";
import { chmod as chmod2, link as link2, lstat as lstat2, readdir as readdir2, rename as rename4, rm as rm4 } from "node:fs/promises";
import { connect, createServer } from "node:net";
import { join as join3 } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

// src/expeditions/paths.ts
import { randomBytes, randomUUID } from "node:crypto";
import { constants as constants2 } from "node:fs";
import { link, open as open2, readFile, rename as rename2, rm as rm2 } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// src/trials/arena.ts
import { constants, existsSync, realpathSync } from "node:fs";
import { chmod, copyFile, cp, lstat, mkdir, mkdtemp, readdir, realpath, rename, rm, stat, writeFile } from "node:fs/promises";
var WARD_AVAILABLE = process.platform === "darwin" && existsSync("/usr/bin/sandbox-exec");
async function privateDir(path) {
  await mkdir(path, { recursive: true, mode: 448 });
  const info = await lstat(path);
  if (!info.isDirectory() || process.getuid && info.uid !== process.getuid())
    throw new Error(`${path} is not a folder you own. Remove it and try again.`);
  if ((info.mode & 63) !== 0)
    await chmod(path, 448);
  return path;
}

// src/expeditions/paths.ts
var SECRET_FILE = "secret";
var SOCKET_FILE = "run/helper.sock";
var HELPER_FILE = "run/helper.json";
var SECRET_BYTES = 32;
function expeditionsHome() {
  return process.env.EXPEDITIONS_HOME || join(process.env.VIBERPG_DATA_DIR || join(homedir(), ".viberpg"), "expeditions");
}
function homePaths(home = expeditionsHome()) {
  return {
    home,
    settings: join(home, "settings.json"),
    secret: join(home, SECRET_FILE),
    save: join(home, "save.json"),
    runs: join(home, "runs"),
    index: join(home, "runs", "index.json"),
    cache: join(home, "cache"),
    looks: join(home, "cache", "looks"),
    run: join(home, "run"),
    socket: join(home, SOCKET_FILE),
    lock: join(home, "run", "helper.lock"),
    helper: join(home, HELPER_FILE)
  };
}
async function ensureHome(paths) {
  await privateDir(paths.home);
  for (const dir of [paths.runs, paths.cache, paths.looks, paths.run])
    await privateDir(dir);
}
async function ensureClientHome(paths) {
  if (!process.getuid)
    return;
  await privateDir(paths.home);
  await privateDir(paths.run);
}
function isCode(error, code) {
  return error instanceof Error && "code" in error && error.code === code;
}
async function readIfExists(path) {
  try {
    return await readFile(path);
  } catch (error) {
    if (isCode(error, "ENOENT"))
      return null;
    throw error;
  }
}
async function writeTemporary(path, data) {
  const temporary = `${path}.${randomUUID()}.tmp`;
  const handle = await open2(temporary, constants2.O_WRONLY | constants2.O_CREAT | constants2.O_EXCL | constants2.O_NOFOLLOW, 384);
  try {
    await handle.writeFile(data);
  } finally {
    await handle.close();
  }
  return temporary;
}
async function writePrivate(path, data) {
  const temporary = await writeTemporary(path, data);
  try {
    await rename2(temporary, path);
  } finally {
    await rm2(temporary, { force: true });
  }
}
async function readSecret(path) {
  if (!process.getuid)
    return readIfExists(path);
  let handle;
  try {
    handle = await open2(path, constants2.O_RDONLY | constants2.O_NOFOLLOW | constants2.O_NONBLOCK);
  } catch (error) {
    if (isCode(error, "ENOENT"))
      return null;
    throw error;
  }
  try {
    const info = await handle.stat();
    if (!info.isFile() || info.uid !== process.getuid() || (info.mode & 63) !== 0 || info.size !== SECRET_BYTES) {
      throw new Error(`${path} is not a private ${SECRET_BYTES}-byte file you own.`);
    }
    const bytes = await handle.readFile();
    if (bytes.length !== SECRET_BYTES)
      throw new Error(`${path} is damaged.`);
    return bytes;
  } finally {
    await handle.close();
  }
}
async function loadSecret(paths = homePaths()) {
  await ensureClientHome(paths);
  const existing = await readSecret(paths.secret);
  if (existing?.length === SECRET_BYTES)
    return existing;
  await privateDir(paths.home);
  const bytes = randomBytes(SECRET_BYTES);
  if (existing) {
    await writePrivate(paths.secret, bytes);
    return bytes;
  }
  const temporary = await writeTemporary(paths.secret, bytes);
  try {
    await link(temporary, paths.secret);
    return bytes;
  } catch (error) {
    if (!isCode(error, "EEXIST"))
      throw error;
    const winner = await readSecret(paths.secret);
    if (winner?.length !== SECRET_BYTES)
      throw new Error(`${paths.secret} is damaged. Delete it and try again.`);
    return winner;
  } finally {
    await rm2(temporary, { force: true });
  }
}
function installPaths() {
  const self = fileURLToPath(import.meta.url);
  if (!self.endsWith(".ts")) {
    const root = dirname(dirname(self));
    return { root, entry: self, data: join(root, "data", "expeditions.json"), window: join(root, "window"), assets: join(root, "assets") };
  }
  const repo = resolve(dirname(self), "..", "..");
  const root = join(repo, "expeditions");
  return { root, entry: join(dirname(self), "cli.ts"), data: join(root, "data", "expeditions.json"), window: join(root, "window"), assets: join(repo, "src", "site", "assets") };
}
function localDay(ms) {
  const date = new Date(ms);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// src/expeditions/store.ts
import { rename as rename3, rm as rm3 } from "node:fs/promises";
import { join as join2 } from "node:path";

// src/shared/expeditions-sim.ts
function seedFor(runId) {
  let h = 2166136261;
  for (let i = 0;i < runId.length; i++)
    h = Math.imul(h ^ runId.charCodeAt(i), 16777619);
  return h >>> 0;
}
function random(seed) {
  let a = seed;
  return () => {
    a = a + 1831565813 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function own2(record, key) {
  return Object.hasOwn(record, key) ? record[key] : undefined;
}
function startRun(seed, agent, caps) {
  return {
    seed: seed >>> 0,
    comboSteps: {},
    waveHits: 0,
    passiveUses: 0,
    trophyFoes: [],
    agent,
    caps: { ...caps },
    model: null,
    effort: null,
    class: null,
    classSure: true,
    candidates: [],
    push: 1,
    wave: 1,
    waveHp: 0,
    elite: false,
    foe: null,
    context: BALANCE.contextMax,
    strike: BALANCE.baseStrike,
    upgrades: 0,
    stance: "press",
    card: null,
    rally: false,
    misses: 0,
    attuned: [],
    caught: [],
    combos: [],
    beaten: [],
    deepest: 0,
    falls: 0,
    summons: 0,
    turns: 0,
    verdict: null,
    closed: false,
    lastSeq: -1
  };
}
function strikeFor(state, data) {
  const evidence = state.class ? own2(data.evidence, state.class) : undefined;
  let strike = BALANCE.baseStrike + state.upgrades * BALANCE.sharpenStrike;
  if (state.caps.skills && evidence) {
    const buffed = new Set(evidence.buffed.map((entry) => entry.spell));
    strike += Math.min(BALANCE.buffedMax, state.attuned.filter((spell) => buffed.has(spell)).length) * BALANCE.buffedBonus;
    if (state.combos.some((combo) => evidence.combosBuffed.includes(combo)))
      strike += BALANCE.comboBonus;
    if (!state.attuned.length && evidence.restraint.length)
      strike += BALANCE.restraintBonus;
    strike -= state.attuned.filter((spell) => Object.hasOwn(evidence.upkeep, spell) && !buffed.has(spell)).length * BALANCE.costlyPenalty;
  }
  return Math.max(BALANCE.strikeMin, Math.min(BALANCE.strikeMax, strike));
}
function waveHp(wave) {
  return BALANCE.waveHpScale * (BALANCE.waveHpBase + wave) * (wave % BALANCE.eliteEvery === 0 ? BALANCE.eliteHpMultiplier : 1);
}
function beginWave(state, data, beats, row = "scout") {
  const category = data.classes.find((item) => item.slug === state.class);
  if (!category)
    return;
  const foes = data.foes.filter((foe) => foe.role === "foe");
  const rng = random(seedFor(`${state.seed}:${state.push}:${state.wave}`));
  state.elite = state.wave % BALANCE.eliteEvery === 0;
  state.foe = state.elite || state.wave === 1 ? category.foe : row === "craft" && category.craftFoe ? category.craftFoe : rng() < 0.5 ? category.foe : foes[Math.floor(rng() * foes.length)]?.slug ?? category.foe;
  state.waveHp = waveHp(state.wave);
  state.waveHits = 0;
  state.passiveUses = 0;
  state.deepest = Math.max(state.deepest, state.wave);
  beats.push({ kind: "wave", wave: state.wave, push: state.push, foe: state.foe, hp: state.waveHp, elite: state.elite });
}
function toolRow(tool, spellPhase) {
  switch (tool) {
    case "read":
    case "web":
      return "scout";
    case "test":
      return "test";
    case "ship":
      return "ship";
    case "mcp":
    case "skill":
      return spellPhase ?? "scout";
    default:
      return "craft";
  }
}
function restore(state, beats, amount, reason) {
  if (state.context === 0)
    return;
  const gained = Math.min(BALANCE.contextMax - state.context, amount);
  state.context += gained;
  if (gained > 0)
    beats.push({ kind: "restore", amount: gained, reason, context: state.context });
}
function takeCard(state, beats, pick) {
  if (!state.card)
    return;
  const card = state.card.options[pick ?? (state.stance === "press" ? 0 : 1)];
  beats.push({ kind: "card_taken", wave: state.card.wave, card, auto: pick === undefined });
  state.card = null;
  if (card === "sharpen")
    state.upgrades = Math.min(BALANCE.maxUpgrades, state.upgrades + 1);
  else
    restore(state, beats, BALANCE.restContext, "rest");
}
function useSpell(state, data, beats, slug, tool) {
  const spell = data.spells.find((item) => item.slug === slug);
  if (!spell)
    return;
  if (!state.caught.includes(spell.slug)) {
    state.caught = [...state.caught, spell.slug];
    beats.push({ kind: "caught", spell: spell.slug });
  }
  if ((spell.kind === "skill" || spell.kind === "plugin") && (tool === "read" || tool === "skill") && !state.attuned.includes(spell.slug)) {
    state.attuned = [...state.attuned, spell.slug];
    const buffed = !!state.class && !!own2(data.evidence, state.class)?.buffed.some((entry) => entry.spell === spell.slug);
    beats.push({ kind: "attuned", spell: spell.slug, buffed });
  }
  for (const combo of data.combos) {
    const step = own2(state.comboSteps, combo.slug) ?? 0;
    if (combo.steps[step] !== spell.slug)
      continue;
    state.comboSteps = { ...state.comboSteps, [combo.slug]: step + 1 };
    if (step + 1 === combo.steps.length)
      state.combos = [...state.combos, combo.slug];
  }
  return spell.phase;
}
function hit(state, data, beats, actor, tool, row, finisher = false) {
  if (!state.foe || state.context === 0)
    return;
  const rally = state.rally || state.misses > 0;
  if (state.misses > 0)
    beats.push({ kind: "rally", actor });
  state.misses = 0;
  state.rally = false;
  const passive = state.elite ? data.foes.find((foe) => foe.slug === state.foe)?.passive : null;
  state.waveHits++;
  if (passive === "barrier" && row === "ship")
    state.passiveUses = 1;
  const blocked = passive === "flicker" && state.waveHits % 2 === 1 || passive === "barrier" && state.passiveUses === 0 && state.waveHits < 3;
  const damage = blocked ? 0 : Math.min(state.waveHp, strikeFor(state, data) + (rally ? BALANCE.rallyBonus : 0));
  state.waveHp -= damage;
  beats.push(finisher ? { kind: "finisher", damage } : { kind: "strike", actor, tool, row, damage, rally });
  if (state.waveHp === 0) {
    const firstTime = !state.beaten.includes(state.foe);
    const paid = state.wave <= BALANCE.frontier;
    if (firstTime)
      state.beaten = [...state.beaten, state.foe];
    if (paid && !state.trophyFoes.includes(state.foe))
      state.trophyFoes = [...state.trophyFoes, state.foe];
    beats.push({ kind: "wave_clear", wave: state.wave, foe: state.foe, firstTime, paid });
    if (paid && state.wave % BALANCE.cardEvery === 0) {
      takeCard(state, beats);
      if (state.upgrades < BALANCE.maxUpgrades) {
        state.card = { wave: state.wave, options: ["sharpen", "rest"] };
        beats.push({ kind: "card", wave: state.card.wave, options: [...state.card.options] });
      }
    }
    state.wave++;
    beginWave(state, data, beats, row);
    return;
  }
  if (passive === "split" && state.passiveUses === 0) {
    state.waveHp += Math.round(waveHp(state.wave) * 40 / 100);
    state.passiveUses++;
  }
  const damageBack = (BALANCE.foeHitBase + Math.floor(state.wave / BALANCE.foeHitWaves)) * (state.elite ? 2 : 1);
  state.context = Math.max(0, state.context - damageBack);
  beats.push({ kind: "foe_hit", damage: damageBack, context: state.context });
  if (passive === "regrow" && state.passiveUses < 2) {
    state.waveHp = Math.min(waveHp(state.wave), state.waveHp + Math.round(waveHp(state.wave) * 15 / 100));
    state.passiveUses++;
  }
  if (state.context === 0) {
    state.falls++;
    beats.push({ kind: "fall", wave: state.wave, push: state.push });
  }
}
function applyEvent(previous, event, data) {
  if (previous.closed || event.seq <= previous.lastSeq)
    return { state: previous, beats: [] };
  const state = { ...previous, lastSeq: event.seq };
  const beats = [];
  switch (event.kind) {
    case "session_start":
      state.agent = event.agent;
      state.caps = { ...event.caps };
      state.model = event.model;
      state.effort = event.effort;
      beats.push({ kind: "party", agent: state.agent, model: state.model, effort: state.effort });
      break;
    case "prompt":
      if (state.context === 0) {
        state.push++;
        state.context = BALANCE.contextMax;
        state.wave = 1;
        state.upgrades = 0;
        state.card = null;
        state.misses = 0;
        state.rally = false;
        beginWave(state, data, beats);
      }
      break;
    case "class_set":
      if (state.deepest > 1 || !data.classes.some((item) => item.slug === event.class))
        break;
      state.class = event.class;
      state.classSure = event.sure;
      state.candidates = [...event.candidates];
      beats.push({ kind: "class", class: event.class, by: event.by, sure: event.sure, candidates: [...event.candidates] });
      beginWave(state, data, beats);
      break;
    case "tool_start":
      beats.push({ kind: "holding" });
      break;
    case "tool": {
      if (!event.ok) {
        state.misses++;
        beats.push({ kind: "miss", actor: event.actor, tool: event.tool });
        break;
      }
      const phase = useSpell(state, data, beats, event.spell, event.tool);
      if (state.misses > 0) {
        state.rally = true;
        state.misses = 0;
        beats.push({ kind: "rally", actor: event.actor });
      }
      if (event.tool === "subagent") {
        state.summons++;
        beats.push({ kind: "summon", actor: event.actor });
      } else
        hit(state, data, beats, event.actor, event.tool, toolRow(event.tool, phase));
      break;
    }
    case "turn_end":
      state.turns++;
      takeCard(state, beats);
      hit(state, data, beats, event.actor, "other", "ship", true);
      restore(state, beats, BALANCE.turnRestore, "turn");
      break;
    case "progress":
      hit(state, data, beats, event.actor, "other", "ship", true);
      break;
    case "compaction":
      restore(state, beats, BALANCE.compactionRestore, "compaction");
      break;
    case "subagent_start":
      state.summons++;
      beats.push({ kind: "summon", actor: event.actor });
      break;
    case "subagent_end":
      beats.push({ kind: "summon_back", actor: event.actor, ok: event.ok });
      break;
    case "mishap":
      beats.push({ kind: "mishap" });
      break;
    case "choice":
      if (state.card?.wave === event.wave)
        takeCard(state, beats, event.pick);
      break;
    case "stance":
      state.stance = event.stance;
      break;
    case "verdict":
      state.verdict = event.verdict;
      beats.push({ kind: "verdict", verdict: event.verdict });
      if (event.verdict === "cleared")
        beats.push({ kind: "finale" });
      break;
    case "session_end":
      state.closed = true;
      beats.push({ kind: "closed" });
      break;
  }
  state.strike = strikeFor(state, data);
  return { state, beats };
}
function replayRun(record, data) {
  const first = record.events.find((event) => event.kind === "session_start");
  const caps = first?.caps ?? { prompt: false, tools: false, skills: false, subagents: false, compaction: false, toolStart: false, model: false };
  let state = startRun(record.seed, record.agent, caps);
  for (const event of record.events)
    state = applyEvent(state, event, data).state;
  return state;
}
function emptyCollection() {
  return { v: 1, expeditions: 0, caught: {}, trophies: {}, stars: {}, badges: {}, records: {}, medals: {} };
}
function settleRun(previous, state, data, day) {
  const category = data.classes.find((item) => item.slug === state.class);
  if (!category)
    return { collection: previous, earned: [] };
  const collection = {
    ...previous,
    expeditions: previous.expeditions + 1,
    caught: { ...previous.caught },
    trophies: { ...previous.trophies },
    stars: { ...previous.stars },
    badges: { ...previous.badges },
    records: { ...previous.records },
    medals: { ...previous.medals }
  };
  const earned = [];
  const evidence = own2(data.evidence, category.slug);
  const restraint = state.caps.skills && !state.attuned.length && !!evidence?.restraint.length;
  const caught = data.spells.filter((spell) => state.caught.includes(spell.slug));
  if (state.verdict === "cleared") {
    const stars = [1];
    if (restraint || caught.some((spell) => spell.classes.includes(category.slug)))
      stars.push(2);
    if (data.combos.some((combo) => combo.class === category.slug && state.combos.includes(combo.slug)))
      stars.push(3);
    const existing = own2(collection.stars, category.slug) ?? [];
    for (const star of stars) {
      if (existing.includes(star))
        continue;
      earned.push({ kind: "star", class: category.slug, star });
    }
    collection.stars[category.slug] = [...new Set([...existing, ...stars])].sort((a, b) => a - b);
    const badges = [];
    if (state.caps.skills && evidence?.buffed.some((entry) => state.attuned.includes(entry.spell)))
      badges.push("buffed");
    if (restraint)
      badges.push("restraint");
    for (const badge of badges) {
      const owned = own2(collection.badges, category.slug) ?? [];
      if (owned.includes(badge))
        continue;
      collection.badges[category.slug] = [...owned, badge];
      earned.push({ kind: "badge", class: category.slug, badge });
    }
  }
  for (const foe of state.trophyFoes) {
    const key = `${category.slug}:${foe}`;
    if (Object.hasOwn(collection.trophies, key))
      continue;
    collection.trophies[key] = day;
    earned.push({ kind: "trophy", class: category.slug, foe });
  }
  if (state.deepest > (own2(collection.records, category.slug) ?? 0)) {
    collection.records[category.slug] = state.deepest;
    earned.push({ kind: "record", class: category.slug, wave: state.deepest });
  }
  const medals = new Set;
  for (const spell of caught) {
    const sessions = own2(collection.caught, spell.slug) ?? 0;
    collection.caught[spell.slug] = sessions + 1;
    for (const [index, threshold] of BALANCE.levelSessions.entries()) {
      if (sessions < threshold && sessions + 1 >= threshold)
        earned.push({ kind: "level", spell: spell.slug, level: index + 2 });
    }
    if (spell.kind === "skill")
      medals.add("first-scroll");
    if (spell.kind === "plugin")
      medals.add("relic-keeper");
    if (spell.kind === "mcp_server")
      medals.add("orb-bearer");
  }
  if (state.summons > 0)
    medals.add("summoner");
  for (const combo of data.combos)
    if (state.combos.includes(combo.slug))
      medals.add(`combo-${combo.slug}`);
  const phases = state.caught.map((slug) => data.spells.find((spell) => spell.slug === slug)?.phase);
  const scout = phases.indexOf("scout");
  if (scout >= 0 && phases.indexOf("craft") > scout)
    medals.add("scout-first");
  for (const id of medals) {
    if (Object.hasOwn(collection.medals, id))
      continue;
    collection.medals[id] = day;
    earned.push({ kind: "medal", id });
  }
  return { collection, earned };
}

// src/expeditions/store.ts
var KEEP_CLOSED = 20;
var MAX_OPEN_RUNS = 64;
var MAX_RECORD_EVENTS = 21024;
var UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
var DAY = /^\d{4}-\d{2}-\d{2}$/;
var DEFAULT_SETTINGS = { guide: false, openOnStart: true, sound: false, chime: true, stance: "steady", motion: "system" };
var SettingsPatch = strictObject({
  guide: boolean2(),
  openOnStart: boolean2(),
  sound: boolean2(),
  chime: boolean2(),
  stance: _enum(STANCES),
  motion: _enum(["system", "reduced", "full"])
}).partial();
async function loadSettings(paths) {
  const bytes = await readIfExists(paths.settings);
  if (!bytes)
    return { ...DEFAULT_SETTINGS };
  try {
    const parsed = SettingsPatch.safeParse(JSON.parse(bytes.toString("utf8")));
    return { ...DEFAULT_SETTINGS, ...parsed.success ? parsed.data : {} };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}
async function saveSettings(paths, settings) {
  await writePrivate(paths.settings, `${JSON.stringify(settings, null, 2)}
`);
}
var Count = number2().int().nonnegative();
var Day = string2().regex(DAY);
var CollectionSchema = object({
  v: literal(1),
  expeditions: Count,
  caught: record(string2(), Count),
  trophies: record(string2(), Day),
  stars: record(string2(), array(Count)),
  badges: record(string2(), array(_enum(BADGES))),
  records: record(string2(), Count),
  medals: record(string2(), Day),
  settled: array(string2().regex(UUID)).max(MAX_OPEN_RUNS + KEEP_CLOSED).default([])
});
async function loadCollection(paths, now) {
  const bytes = await readIfExists(paths.save);
  if (!bytes)
    return { collection: emptyCollection(), settled: [] };
  try {
    const parsed = CollectionSchema.safeParse(JSON.parse(bytes.toString("utf8")));
    if (parsed.success) {
      const { settled, ...collection } = parsed.data;
      return { collection, settled };
    }
  } catch {}
  await rename3(paths.save, join2(paths.home, `save.broken-${now}.json`));
  return { collection: emptyCollection(), settled: [] };
}
async function saveCollection(paths, collection, settled) {
  await writePrivate(paths.save, `${JSON.stringify({ ...collection, settled })}
`);
}
var IndexSchema = object({
  v: literal(1),
  open: array(object({
    id: string2().regex(UUID),
    route: string2().max(200),
    actors: array(string2().max(200)).max(256),
    lastEventAt: number2(),
    endingAt: number2().nullable().default(null)
  })),
  closed: array(string2().regex(UUID)),
  openedDay: Day.nullable()
});
async function loadIndex(paths) {
  const empty = { v: 1, open: [], closed: [], openedDay: null };
  const bytes = await readIfExists(paths.index);
  if (!bytes)
    return empty;
  try {
    const parsed = IndexSchema.safeParse(JSON.parse(bytes.toString("utf8")));
    return parsed.success ? parsed.data : empty;
  } catch {
    return empty;
  }
}
async function saveIndex(paths, index) {
  await writePrivate(paths.index, `${JSON.stringify(index)}
`);
}
var RecordSchema = object({
  v: literal(RULES_VERSION),
  id: string2().regex(UUID),
  agent: _enum(EXP_AGENTS),
  seed: number2().int(),
  startedAt: string2(),
  dataVersion: string2(),
  events: array(looseObject({ seq: number2().int(), actor: number2().int(), kind: string2() })).max(MAX_RECORD_EVENTS)
});
var recordPath = (paths, id) => join2(paths.runs, `${id}.json`);
async function loadRecord(paths, id) {
  if (!UUID.test(id))
    return null;
  const bytes = await readIfExists(recordPath(paths, id));
  if (!bytes)
    return null;
  try {
    const parsed = RecordSchema.safeParse(JSON.parse(bytes.toString("utf8")));
    if (!parsed.success)
      return null;
    const events = parsed.data.events;
    return { ...parsed.data, events };
  } catch {
    return null;
  }
}
async function saveRecord(paths, record2) {
  if (record2.events.length > MAX_RECORD_EVENTS)
    throw new Error("expedition event limit exceeded");
  await writePrivate(recordPath(paths, record2.id), `${JSON.stringify(record2)}
`);
}
async function pruneClosed(paths, closed) {
  const drop = closed.slice(0, Math.max(0, closed.length - KEEP_CLOSED));
  for (const id of drop)
    await rm3(recordPath(paths, id), { force: true });
  return closed.slice(drop.length);
}

// src/expeditions/channel.ts
var CLIENT_LABEL = "expeditions-client:";
var HELPER_LABEL = "expeditions-helper:";
var CONNECTION_MS = 5000;
var RESPONSE_BYTES = 64 * 1024;
var SOCKET_PATH_MAX = 100;
var mac2 = (secret, text) => createHmac("sha256", secret).update(text).digest("hex");
function sameHex(a, b) {
  const left = Buffer.from(a, "utf8");
  const right = Buffer.from(b, "utf8");
  return left.length === right.length && timingSafeEqual(left, right);
}
async function routeKey(agent, sessionId) {
  return mac2(await loadSecret(homePaths()), `${agent}:${sessionId}`).slice(0, 16);
}
var Caps = strictObject({
  prompt: boolean2(),
  tools: boolean2(),
  skills: boolean2(),
  subagents: boolean2(),
  compaction: boolean2(),
  toolStart: boolean2(),
  model: boolean2()
});
var Slug = string2().regex(/^[a-z0-9][a-z0-9-]{0,80}$/);
var extra = {
  sub: string2().regex(/^[\w.:-]{1,128}$/).optional(),
  dedupe: string2().regex(/^[\w.:-]{1,128}$/).optional(),
  match: string2().regex(/^(?:skill|plugin|mcp|command):[^\s\x00-\x1f\x7f]{1,190}$/).optional()
};
var Inbound = discriminatedUnion("kind", [
  strictObject({ kind: literal("session_start"), agent: _enum(EXP_AGENTS), caps: Caps, model: string2().regex(/^[^\x00-\x1f\x7f]{1,80}$/).nullable(), effort: _enum(EFFORTS).nullable(), ...extra }),
  strictObject({ kind: literal("prompt"), ...extra }),
  strictObject({ kind: literal("class_set"), class: Slug, by: _enum(["auto", "player"]), sure: boolean2(), candidates: array(Slug).max(5), ...extra }),
  strictObject({ kind: literal("tool_start"), tool: _enum(TOOL_KINDS), ...extra }),
  strictObject({ kind: literal("tool"), tool: _enum(TOOL_KINDS), ok: boolean2(), spell: Slug.nullable(), ...extra }),
  strictObject({ kind: literal("turn_end"), ...extra }),
  strictObject({ kind: literal("compaction"), ...extra }),
  strictObject({ kind: literal("subagent_start"), ...extra }),
  strictObject({ kind: literal("subagent_end"), ok: boolean2(), ...extra }),
  strictObject({ kind: literal("mishap"), ...extra }),
  strictObject({ kind: literal("session_end"), reason: _enum(["agent", "idle", "player"]), ...extra })
]);
var LiveText = string2().min(1).regex(/^[^\x00-\x1f\x7f-\x9f\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]*$/u).refine((text) => text === text.replace(/\s+/g, " ").trim(), { message: "live text must use normalized whitespace" });
var LiveStep = strictObject({
  kind: _enum(TOOL_KINDS),
  target: LiveText.max(LIVE_LIMITS.targetChars).nullable()
}).refine((step) => step.target === null || !["shell", "test", "ship"].includes(step.kind), { message: "command steps cannot include targets" });
var LiveHint = strictObject({
  at: number2().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
  phase: _enum(LIVE_PHASES).optional(),
  step: LiveStep.nullable().optional(),
  project: LiveText.max(LIVE_LIMITS.projectChars).optional(),
  scope: literal("sub").optional(),
  actor: string2().regex(/^[0-9a-f]{16}$/).optional(),
  call: string2().regex(/^[0-9a-f]{16}$/).optional()
});
var RequestSchema = strictObject({
  v: literal(CHANNEL_VERSION),
  agent: _enum(EXP_AGENTS).exclude(["manual"]),
  route: string2().regex(/^[0-9a-f]{16}$/),
  caps: Caps,
  events: array(Inbound).max(CHANNEL_LIMITS.eventsPerRequest),
  prompt: string2().transform((text) => text.slice(0, CHANNEL_LIMITS.promptChars)).optional(),
  reply: literal("guide").optional(),
  live: LiveHint.optional()
}).refine((request) => request.events.length > 0 || request.live !== undefined, { path: ["events"], message: "events or live status required" });
var ControlSchema = discriminatedUnion("control", [
  strictObject({ v: literal(CHANNEL_VERSION), control: literal("status") }),
  strictObject({ v: literal(CHANNEL_VERSION), control: literal("code") }),
  strictObject({ v: literal(CHANNEL_VERSION), control: literal("stop") }),
  strictObject({ v: literal(CHANNEL_VERSION), control: literal("settings"), settings: SettingsPatch })
]);
var StatusSchema = object({
  pid: number2().int(),
  port: number2().int(),
  dataVersion: string2(),
  dataSource: _enum(["fetched", "cache", "bundled"]),
  runs: array(object({ id: string2(), agent: _enum(EXP_AGENTS), class: string2().nullable(), wave: number2() }))
});
var ControlResponseSchema = object({
  ok: boolean2(),
  error: string2().optional(),
  status: StatusSchema.optional(),
  code: string2().regex(/^[0-9a-f]{32}$/).optional(),
  port: number2().int().optional(),
  settings: SettingsPatch.optional()
});
var ResponseSchema = object({ ok: boolean2(), guide: string2().nullable().optional(), error: string2().optional() });
function lineReader(socket, limit, maxFrames) {
  const lines = [];
  const partial = Buffer.allocUnsafe(limit);
  const byteLimit = maxFrames * (limit + 1);
  let size = 0;
  let bytes = 0;
  let frames = 0;
  let done = false;
  let tooLong = false;
  let waiting = null;
  const settle = () => {
    if (!waiting)
      return;
    const line = lines.shift();
    if (line === undefined && !done)
      return;
    const answer = waiting;
    waiting = null;
    answer.resolve(line ?? null);
  };
  const stop = () => {
    done = true;
    lines.length = 0;
    size = 0;
    socket.off("data", receive);
    socket.pause();
    settle();
  };
  const overflow = (destroy) => {
    tooLong = true;
    stop();
    if (destroy)
      socket.destroy();
  };
  function receive(chunk) {
    if (done)
      return;
    if (chunk.length > byteLimit - bytes) {
      overflow(frames === maxFrames);
      return;
    }
    bytes += chunk.length;
    for (let start = 0;start < chunk.length; ) {
      if (frames === maxFrames) {
        overflow(true);
        return;
      }
      const newline = chunk.indexOf(10, start);
      const end = newline === -1 ? chunk.length : newline;
      const length = end - start;
      if (length > limit - size) {
        overflow(false);
        return;
      }
      chunk.copy(partial, size, start, end);
      size += length;
      if (newline !== -1) {
        lines.push(partial.toString("utf8", 0, size));
        frames++;
        size = 0;
      }
      start = end + 1;
    }
    settle();
  }
  socket.on("data", receive);
  const finish = () => {
    done = true;
    settle();
  };
  socket.on("end", finish);
  socket.on("close", finish);
  socket.on("error", finish);
  return {
    next() {
      waiting = Promise.withResolvers();
      const { promise } = waiting;
      settle();
      return promise;
    },
    overflow: () => tooLong,
    stop
  };
}
function parseLine(line) {
  if (line === null)
    return null;
  try {
    return JSON.parse(line);
  } catch {
    return null;
  }
}
var Hex64 = string2().regex(/^[0-9a-f]{64}$/);
var Challenge = object({ challenge: Hex64 });
var Hello = object({ nonce: Hex64, proof: Hex64 });
var Proof = object({ proof: Hex64 });
var HelperInfo = object({ pid: number2().int(), port: number2().int(), channelPort: number2().int().min(1).max(65535).nullable() });
async function readHelperInfo(paths) {
  await ensureClientHome(paths);
  try {
    const bytes = await readIfExists(paths.helper);
    const parsed = HelperInfo.safeParse(bytes ? JSON.parse(bytes.toString("utf8")) : null);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
function spawnHelper() {
  const child = spawn(process.execPath, [installPaths().entry, "helper"], { detached: true, stdio: "ignore", windowsHide: true });
  child.on("error", () => {});
  child.unref();
}
async function attempt(paths, payload, deadline) {
  const info = await readHelperInfo(paths);
  const port = info?.channelPort ?? null;
  if (port === null && process.platform === "win32")
    return { kind: "absent" };
  if (port === null && process.getuid) {
    try {
      const endpoint = await lstat2(paths.socket);
      if (!endpoint.isSocket() || endpoint.uid !== process.getuid() || (endpoint.mode & 63) !== 0)
        return { kind: "absent" };
    } catch {
      return { kind: "absent" };
    }
  }
  const socket = port === null ? connect(paths.socket) : connect({ host: "127.0.0.1", port });
  const timer = setTimeout(() => socket.destroy(), Math.max(1, deadline - Date.now()));
  try {
    const connected = Promise.withResolvers();
    socket.once("connect", () => connected.resolve(true));
    socket.once("error", () => connected.resolve(false));
    socket.once("close", () => connected.resolve(false));
    if (!await connected.promise)
      return { kind: "absent" };
    const reader = lineReader(socket, RESPONSE_BYTES, port === null ? 1 : 3);
    if (port !== null) {
      const challenge = Challenge.safeParse(parseLine(await reader.next()));
      if (!challenge.success)
        return { kind: "absent" };
      const secret = await loadSecret(paths);
      const nonce = randomBytes2(32).toString("hex");
      socket.write(`${JSON.stringify({ nonce, proof: mac2(secret, `${CLIENT_LABEL}${challenge.data.challenge}:${nonce}`) })}
`);
      const proof = Proof.safeParse(parseLine(await reader.next()));
      if (!proof.success || !sameHex(proof.data.proof, mac2(secret, `${HELPER_LABEL}${nonce}:${challenge.data.challenge}`)))
        return { kind: "absent" };
    }
    socket.write(`${JSON.stringify(payload)}
`);
    const answer = parseLine(await reader.next());
    return answer === null ? { kind: "failed" } : { kind: "answer", value: answer };
  } finally {
    clearTimeout(timer);
    socket.destroy();
  }
}
async function exchange(payload, opts) {
  try {
    const paths = opts.paths ?? homePaths();
    const deadline = Date.now() + (opts.timeoutMs ?? TIMINGS.hookTimeoutMs);
    let spawned = false;
    for (;; ) {
      const result = await attempt(paths, payload, deadline);
      if (result.kind === "answer")
        return result.value;
      if (result.kind === "failed" || !opts.start || Date.now() + 50 >= deadline)
        return null;
      if (!spawned) {
        spawned = true;
        spawnHelper();
      }
      await sleep(50);
    }
  } catch {
    return null;
  }
}
async function sendToHelper(request, opts = {}) {
  const parsed = ResponseSchema.safeParse(await exchange(request, opts));
  return parsed.success ? parsed.data : null;
}
async function controlHelper(request, opts = {}) {
  const parsed = ControlResponseSchema.safeParse(await exchange(request, opts));
  return parsed.success ? parsed.data : null;
}
function channelMode(paths) {
  return process.platform === "win32" || Buffer.byteLength(join3(paths.run, "helper-00000000.sock")) > SOCKET_PATH_MAX ? "tcp" : "unix";
}
function issueText(error) {
  const issue = error.issues[0];
  return issue ? `invalid request: ${issue.path.join(".") || "request"} (${issue.code})` : "invalid request";
}
async function dispatch(line, handlers) {
  const value = parseLine(line);
  if (typeof value !== "object" || value === null)
    return { ok: false, error: "not a JSON object" };
  if ("control" in value) {
    const control = ControlSchema.safeParse(value);
    return control.success ? await handlers.control(control.data) : { ok: false, error: issueText(control.error) };
  }
  const request = RequestSchema.safeParse(value);
  return request.success ? await handlers.events(request.data) : { ok: false, error: issueText(request.error) };
}
async function startChannel(paths, mode, handlers, ownsLock) {
  const unique = mode === "unix" ? join3(paths.run, `helper-${randomBytes2(4).toString("hex")}.sock`) : null;
  if (unique !== null && Buffer.byteLength(unique) > SOCKET_PATH_MAX)
    throw new Error("Unix socket path is too long.");
  const secret = await loadSecret(paths);
  const serve = async (socket) => {
    const deadline = setTimeout(() => socket.destroy(), CONNECTION_MS);
    socket.on("close", () => clearTimeout(deadline));
    socket.on("error", () => {});
    const reader = lineReader(socket, CHANNEL_LIMITS.requestBytes, mode === "tcp" ? 2 : 1);
    const reply = (value) => {
      reader.stop();
      if (!socket.destroyed)
        socket.end(`${JSON.stringify(value)}
`, () => socket.destroy());
    };
    try {
      if (mode === "tcp") {
        const challenge = randomBytes2(32).toString("hex");
        socket.write(`${JSON.stringify({ challenge })}
`);
        const hello = Hello.safeParse(parseLine(await reader.next()));
        if (!hello.success || !sameHex(hello.data.proof, mac2(secret, `${CLIENT_LABEL}${challenge}:${hello.data.nonce}`))) {
          reply({ ok: false, error: "challenge failed" });
          return;
        }
        socket.write(`${JSON.stringify({ proof: mac2(secret, `${HELPER_LABEL}${hello.data.nonce}:${challenge}`) })}
`);
      }
      const line = await reader.next();
      if (line === null) {
        if (reader.overflow())
          reply({ ok: false, error: `request over ${CHANNEL_LIMITS.requestBytes} bytes` });
        else
          socket.destroy();
        return;
      }
      reply(await dispatch(line, handlers));
    } catch {
      reply({ ok: false, error: "helper error" });
    }
  };
  const server = createServer((socket) => void serve(socket));
  server.maxConnections = CHANNEL_LIMITS.connections;
  let bound = null;
  const removeOwnedSocket = async (path) => {
    try {
      const current = await lstat2(path);
      if (bound !== null && current.dev === bound.dev && current.ino === bound.ino)
        await rm4(path, { force: true });
    } catch (error) {
      if (!isCode(error, "ENOENT"))
        throw error;
    }
  };
  const close = async (options = {}) => {
    if (server.listening) {
      const closed = Promise.withResolvers();
      server.close(() => closed.resolve());
      await closed.promise;
    }
    if (unique !== null) {
      if (options.unpublish === true)
        await removeOwnedSocket(paths.socket);
      await removeOwnedSocket(unique);
    }
  };
  try {
    const listening = Promise.withResolvers();
    server.once("error", listening.reject);
    if (unique !== null)
      server.listen(unique, () => listening.resolve());
    else
      server.listen({ host: "127.0.0.1", port: 0 }, () => listening.resolve());
    await listening.promise;
    server.on("error", () => {});
    if (unique !== null) {
      await chmod2(unique, 384);
      bound = await lstat2(unique);
      const temporary = `${paths.socket}.${randomBytes2(8).toString("hex")}.tmp`;
      await link2(unique, temporary);
      try {
        if (ownsLock !== undefined && !await ownsLock())
          throw new Error("Helper lock ownership changed.");
        await rename4(temporary, paths.socket);
      } finally {
        await rm4(temporary, { force: true });
      }
      for (const entry of await readdir2(paths.run, { withFileTypes: true })) {
        const path = join3(paths.run, entry.name);
        if (path === unique || !entry.isSocket() || !/^helper-[0-9a-f]{8}\.sock$/.test(entry.name) && !entry.name.endsWith(".tmp"))
          continue;
        try {
          const candidate = await lstat2(path);
          if (!candidate.isSocket() || Date.now() - candidate.mtimeMs <= 60000)
            continue;
          const published = await lstat2(paths.socket);
          if (candidate.dev === published.dev && candidate.ino === published.ino)
            continue;
          await rm4(path, { force: true });
        } catch (error) {
          if (!isCode(error, "ENOENT"))
            throw error;
        }
      }
    }
  } catch (error) {
    await close();
    throw error;
  }
  const address = server.address();
  return {
    mode,
    port: mode === "tcp" && address !== null && typeof address === "object" ? address.port : null,
    close
  };
}

// src/expeditions/helper.ts
import { spawn as spawn2 } from "node:child_process";
import { randomUUID as randomUUID3 } from "node:crypto";
import { link as link3, open as open3, rm as rm6, stat as stat3 } from "node:fs/promises";

// src/expeditions/content.ts
import { join as join4 } from "node:path";

// src/shared/content.ts
var AGENTS = ["claude-code", "codex"];
var KINDS = ["skill", "plugin", "mcp_server", "subagent"];
var TIERS = ["S", "A", "B", "C"];
var BASES = ["documented", "proposed", "curated"];
var SlugSchema = string2().regex(/^[a-z0-9][a-z0-9-]{1,62}$/, "Use 2-63 lowercase letters, digits and hyphens");
var Https = url().startsWith("https://", "Use an https:// link").max(400);
var Day2 = string2().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");
var MediaSchema = object({
  file: string2().regex(/^[a-z0-9][a-z0-9-]{1,62}\/[A-Za-z0-9._-]{1,115}\.(png|jpe?g|gif|webp|mp4|webm)$/),
  kind: _enum(["image", "video"]),
  alt: string2().min(3).max(200),
  caption: string2().max(200).nullable(),
  width: number2().int().positive().nullable(),
  height: number2().int().positive().nullable()
});
var VerdictSchema = object({
  tier: _enum(TIERS).nullable(),
  note: string2().max(280).nullable(),
  pick: boolean2().optional()
});
var MatchIdSchema = string2().regex(/^(skill|mcp|plugin|command):[a-z0-9][a-z0-9._:@\/-]{0,99}$/);
var SkillSchema = object({
  slug: SlugSchema,
  name: string2().min(2).max(80),
  kind: _enum(KINDS),
  agents: array(_enum(AGENTS)).min(1),
  categories: array(SlugSchema).min(1),
  summary: string2().min(10).max(160),
  sourceUrl: Https,
  evidenceUrl: Https.nullable(),
  install: string2().max(400).nullable(),
  publisher: string2().max(120).nullable(),
  license: string2().max(80).nullable(),
  lastActivity: Day2.nullable(),
  verifiedOn: Day2,
  notes: string2().max(600).nullable(),
  verdict: VerdictSchema,
  match: array(MatchIdSchema),
  media: array(MediaSchema).max(12)
});
var WorkflowStepSchema = object({ skill: SlugSchema, note: string2().max(120).nullable() });
var WorkflowSchema = object({
  slug: SlugSchema,
  name: string2().min(2).max(80),
  category: SlugSchema,
  steps: array(WorkflowStepSchema).min(2).max(8),
  why: string2().min(10).max(300),
  basis: _enum(BASES),
  sourceUrl: Https.nullable(),
  verdict: VerdictSchema,
  media: array(MediaSchema).max(12)
});
var CategorySchema = object({
  slug: SlugSchema,
  name: string2().min(2).max(60),
  className: string2().min(2).max(30),
  description: string2().min(10).max(240),
  emblem: string2().regex(/^[a-z0-9-]+\.png$/),
  foe: SlugSchema,
  craftFoe: SlugSchema.optional()
});
var FoeSchema = object({
  slug: SlugSchema,
  name: string2().min(2).max(40),
  means: string2().min(5).max(120),
  role: _enum(FOE_ROLES),
  hp: number2().int().min(1).max(999),
  speed: number2().int().min(1).max(30),
  attack: string2().min(2).max(24),
  fx: _enum(FOE_FX),
  damage: array(number2().int().min(1).max(50)).min(1).max(4),
  all: boolean2().default(false),
  inflicts: _enum(FOE_STATUSES).nullable().default(null),
  passive: _enum(PASSIVES).nullable().default(null),
  minion: SlugSchema.nullable().default(null),
  rpg: string2().min(10).max(140),
  plain: string2().min(10).max(220)
});
var BeatSchema = object({
  action: _enum(ACTIONS),
  rpg: string2().min(10).max(120),
  plain: string2().min(10).max(180),
  pop: string2().min(1).max(24).nullable(),
  allies: array(string2().min(2).max(24)).min(1).max(6).optional()
});
var GuideSchema = object({
  slug: SlugSchema,
  phase: _enum(PHASES),
  foe: SlugSchema,
  tagline: string2().min(10).max(100),
  beats: array(BeatSchema).min(3).max(5),
  install: partialRecord(_enum(AGENTS), string2().min(3).max(400))
});
var ModelIdSchema = string2().regex(/^[a-z0-9][a-z0-9.-]{1,48}$/);
var ArmorySchema = object({
  launch: partialRecord(_enum(AGENTS), string2().includes("{model}").includes("{effort}").max(200)),
  models: array(object({
    id: ModelIdSchema,
    name: string2().min(2).max(40),
    weapon: _enum(WEAPONS),
    harness: _enum(AGENTS),
    select: string2().regex(/^[A-Za-z0-9.[\]-]{2,40}$/),
    efforts: array(_enum(EFFORTS)).min(1),
    role: string2().min(3).max(80),
    sourceUrl: Https,
    verifiedOn: Day2
  }))
});
var UsdPerMillion = number2().nonnegative().max(1000);
var ModelPriceSchema = object({
  id: string2().regex(/^[A-Za-z0-9][A-Za-z0-9._-]{1,63}$/),
  vendor: string2().min(2).max(40),
  name: string2().min(2).max(40),
  aliases: array(string2().regex(/^[A-Za-z0-9][A-Za-z0-9._/-]{1,79}$/)),
  input: UsdPerMillion,
  cacheRead: UsdPerMillion,
  cacheWrite: UsdPerMillion.nullable(),
  cacheWrite1h: UsdPerMillion.optional(),
  output: UsdPerMillion,
  effectiveFrom: Day2.nullable(),
  effectiveTo: Day2.nullable(),
  sourceUrl: Https,
  verifiedOn: Day2,
  note: string2().min(3).max(240).optional()
}).refine((card) => !card.effectiveFrom || !card.effectiveTo || card.effectiveFrom <= card.effectiveTo, { message: "effectiveFrom must not be after effectiveTo", path: ["effectiveTo"] });
var LoadoutSpellSchema = object({ spell: SlugSchema, phase: _enum(PHASES) });
var LoadoutBuildSchema = object({
  title: string2().trim().min(3).max(LOADOUT_LIMITS.title).regex(SINGLE_LINE, "Keep this to a single line"),
  task: string2().trim().min(3).max(LOADOUT_LIMITS.task).regex(SINGLE_LINE, "Keep this to a single line"),
  school: SlugSchema,
  harness: _enum(AGENTS),
  model: ModelIdSchema,
  effort: _enum(EFFORTS),
  spells: array(LoadoutSpellSchema).min(1).max(LOADOUT_LIMITS.spells),
  notes: string2().trim().max(LOADOUT_LIMITS.notes).nullable()
});
var CuratedLoadoutSchema = object({
  slug: SlugSchema,
  ...LoadoutBuildSchema.shape,
  basis: _enum(BASES),
  sourceUrl: Https.nullable(),
  pick: boolean2().optional()
});
var SiteSchema = object({
  title: string2().min(2).max(60),
  heroTitle: string2().min(5).max(80),
  tagline: string2().min(10).max(160),
  baseUrl: url({ protocol: /^https?$/ }),
  githubRepo: string2().regex(/^[A-Za-z0-9-]{1,39}\/[A-Za-z0-9._-]{1,100}$/, "Use owner/name").nullable(),
  titleParty: array(SlugSchema).min(1).max(5),
  questFoes: object({ scout: array(SlugSchema).max(3), test: array(SlugSchema).max(3), ship: array(SlugSchema).max(2) }),
  demoFoe: SlugSchema
});
var LooksSchema = record(SlugSchema, string2().regex(/^[a-z]+-[a-z]+$/, "Use base-palette, like tome-ember"));
var REGISTRIES = ["npm", "pypi"];
var RepoSchema = string2().regex(/^[A-Za-z0-9-]{1,39}\/[A-Za-z0-9._-]{1,100}$/, "Use owner/name");
var Count2 = number2().int().nonnegative();
var PopularitySchema = object({
  checkedOn: Day2,
  spells: record(SlugSchema, object({
    repo: RepoSchema.nullable(),
    stars: Count2.nullable(),
    downloads: object({ registry: _enum(REGISTRIES), package: string2().min(1).max(214), weekly: Count2 }).nullable()
  })),
  overrides: record(SlugSchema, object({ repo: RepoSchema.nullable().optional(), npm: string2().min(1).max(214).nullable().optional(), pypi: string2().min(1).max(214).nullable().optional() }))
});

// src/expeditions/content.ts
var DATA_BYTES = 4 * 1024 * 1024;
var LIST_MAX = 5000;
var FEW = 50;
var COUNT_MAX = 1e6;
var LOOK_BYTES = 128 * 1024;
var PNG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
var LOOK = /^[a-z0-9]+(?:-[a-z0-9]+){1,3}$/;
var Text = (max) => string2().min(1).max(max);
var Count3 = number2().int().min(0).max(COUNT_MAX);
var atMost = (max) => (record2) => Object.keys(record2).length <= max;
var ClassSchema = object({
  slug: SlugSchema,
  name: Text(80),
  className: Text(40),
  description: Text(400),
  emblem: string2().max(68).regex(/^[a-z0-9-]+\.png$/),
  foe: SlugSchema,
  craftFoe: SlugSchema.nullable(),
  quests: Count3
});
var FoeSchema2 = object({
  slug: SlugSchema,
  name: Text(80),
  means: Text(200),
  role: _enum(FOE_ROLES),
  hp: number2().int().min(1).max(9999),
  damage: array(number2().int().min(0).max(999)).min(1).max(8),
  passive: SlugSchema.nullable(),
  attack: Text(40),
  fx: SlugSchema
});
var SpellSchema = object({
  slug: SlugSchema,
  name: Text(80),
  kind: _enum(KINDS),
  agents: array(_enum(AGENTS)).max(AGENTS.length),
  classes: array(SlugSchema).max(FEW),
  phase: _enum(PHASES),
  look: string2().max(64).regex(LOOK),
  match: array(MatchIdSchema).max(FEW)
});
var ComboSchema = object({ slug: SlugSchema, name: Text(80), class: SlugSchema, steps: array(SlugSchema).max(FEW) });
var LoadoutSchema = object({
  slug: SlugSchema,
  title: Text(200),
  task: Text(200),
  class: SlugSchema,
  harness: _enum(AGENTS),
  model: ModelIdSchema,
  effort: _enum(EFFORTS),
  spells: array(SlugSchema).max(FEW),
  basis: _enum(BASES)
});
var ModelSchema = object({ id: ModelIdSchema, name: Text(80), weapon: _enum(WEAPONS), harness: _enum(AGENTS), select: string2().regex(/^[A-Za-z0-9.[\]-]{2,40}$/) });
var BuffedSchema = object({
  spell: SlugSchema,
  points: number2().int().min(-100).max(100),
  cast: _enum(["invoked", "ambient"]),
  matchedCleared: Count3,
  matchedRuns: Count3,
  controlCleared: Count3,
  controlRuns: Count3,
  heroes: array(SlugSchema).max(FEW)
});
var EvidenceSchema = object({
  quests: Count3,
  buffed: array(BuffedSchema).max(LIST_MAX),
  combosBuffed: array(SlugSchema).max(LIST_MAX),
  restraint: array(object({ quest: SlugSchema, name: Text(200), cleared: Count3, runs: Count3 })).max(LIST_MAX),
  upkeep: record(SlugSchema, number2().int().min(-100).max(COUNT_MAX)).refine(atMost(LIST_MAX))
});
var ExpeditionsDataSchema = object({
  v: literal(DATA_VERSION),
  builtAt: exports_iso.datetime(),
  baseUrl: string2().max(200).regex(/^https?:\/\/[^/\s]+(?:\/[^\s]*)?$/).refine((url) => !url.endsWith("/")),
  classes: array(ClassSchema).max(LIST_MAX),
  foes: array(FoeSchema2).max(LIST_MAX),
  spells: array(SpellSchema).max(LIST_MAX),
  combos: array(ComboSchema).max(LIST_MAX),
  loadouts: array(LoadoutSchema).max(LIST_MAX),
  models: array(ModelSchema).max(LIST_MAX),
  evidence: record(SlugSchema, EvidenceSchema).refine(atMost(LIST_MAX)),
  classifier: object({
    terms: record(string2().regex(/^[a-z0-9]{2,64}$/), record(SlugSchema, number2().min(0).max(100)).refine(atMost(LIST_MAX))).refine(atMost(1e5)),
    minScore: number2().min(0).max(1000),
    margin: number2().min(0).max(1)
  })
});
function parseData(bytes) {
  if (!bytes || bytes.length > DATA_BYTES)
    return null;
  try {
    const parsed = ExpeditionsDataSchema.safeParse(JSON.parse(Buffer.from(bytes).toString("utf8")));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
async function readCapped(response, cap) {
  if (!response.body)
    return null;
  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  for (;; ) {
    const { done, value } = await reader.read();
    if (done)
      break;
    size += value.length;
    if (size > cap) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}
async function loadData(install, paths, fetcher, waitMs = 300) {
  const cacheFile = join4(paths.cache, "expeditions.json");
  const etagFile = join4(paths.cache, "expeditions.etag");
  const bundled = parseData(await readIfExists(install.data));
  const cached = parseData(await readIfExists(cacheFile));
  const base = bundled?.baseUrl ?? cached?.baseUrl;
  const local = cached && (!bundled || cached.builtAt >= bundled.builtAt) ? { data: cached, source: "cache" } : bundled ? { data: bundled, source: "bundled" } : null;
  const refresh = async () => {
    if (!base)
      return null;
    try {
      const etag = cached ? (await readIfExists(etagFile))?.toString("utf8").trim() : undefined;
      const response = await fetcher(`${base}/assets/expeditions.json`, {
        headers: etag ? { "If-None-Match": etag } : {},
        redirect: "error",
        signal: AbortSignal.timeout(1e4)
      });
      if (response.status === 304 && cached)
        return { data: cached, source: "cache" };
      if (!response.ok)
        return null;
      const bytes = await readCapped(response, DATA_BYTES);
      const fresh = parseData(bytes);
      if (!bytes || !fresh || fresh.baseUrl !== base)
        return null;
      await writePrivate(cacheFile, bytes);
      const tag = response.headers.get("etag");
      if (tag && tag.length <= 200 && !/[\r\n]/.test(tag))
        await writePrivate(etagFile, tag);
      return { data: fresh, source: "fetched" };
    } catch {
      return null;
    }
  };
  const fetched = refresh();
  let timer;
  const budget = Promise.withResolvers();
  if (local)
    timer = setTimeout(() => budget.resolve(null), waitMs);
  const first = await Promise.race([fetched, budget.promise]);
  clearTimeout(timer);
  const loaded = first ?? local;
  if (!loaded)
    throw new Error(`No Expeditions content found at ${install.data}. Reinstall the plugin, or run the build.`);
  return loaded;
}
function lookCache(paths, data, fetcher) {
  const known = new Set(data.spells.map((spell) => spell.look));
  const pending = new Map;
  const fetchLook = async (look) => {
    const file = join4(paths.looks, `${look}.png`);
    const cached = await readIfExists(file);
    if (cached)
      return cached;
    try {
      const response = await fetcher(`${data.baseUrl}/assets/img/looks/${look}.png`, { redirect: "error", signal: AbortSignal.timeout(1e4) });
      if (!response.ok)
        return null;
      const bytes = await readCapped(response, LOOK_BYTES);
      if (!bytes || bytes.length < PNG.length || !PNG.equals(bytes.subarray(0, PNG.length)))
        return null;
      await writePrivate(file, bytes);
      return Buffer.from(bytes);
    } catch {
      return null;
    }
  };
  return {
    get(look) {
      if (!LOOK.test(look) || !known.has(look))
        return Promise.resolve(null);
      const running = pending.get(look);
      if (running)
        return running;
      const job = fetchLook(look).finally(() => pending.delete(look));
      pending.set(look, job);
      return job;
    }
  };
}

// src/expeditions/http.ts
import { randomBytes as randomBytes3 } from "node:crypto";
import { readdir as readdir3, readFile as readFile2 } from "node:fs/promises";
import { createServer as createServer2 } from "node:http";
import { extname, join as join5 } from "node:path";

// src/shared/game.ts
var SLUG = /^[a-z0-9][a-z0-9-]{1,62}$/;
var MEDAL_ID = /^[a-z0-9][a-z0-9-]{1,80}$/;
var DAY2 = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;
var MAX_ENTRIES = 500;
var TRAINER_MAX = 24;
var LISTS = ["seen", "learned", "caught", "proven", "foes"];
function emptySave() {
  return { v: 1, trainer: null, seen: [], learned: [], caught: [], proven: [], foes: [], medals: {}, gyms: {}, hidden: [] };
}
function cleanList(value, pattern) {
  if (!Array.isArray(value))
    return [];
  const out = new Set;
  for (const item of value) {
    if (out.size === MAX_ENTRIES)
      break;
    if (typeof item === "string" && pattern.test(item))
      out.add(item);
  }
  return [...out];
}
function cleanRecord(value, key, keep) {
  const out = {};
  if (typeof value !== "object" || value === null || Array.isArray(value))
    return out;
  let count = 0;
  for (const [id, item] of Object.entries(value)) {
    if (count === MAX_ENTRIES)
      break;
    if (key.test(id) && keep(item)) {
      out[id] = item;
      count += 1;
    }
  }
  return out;
}
function cleanTrainer(value) {
  if (typeof value !== "string")
    return null;
  const name = value.trim();
  if (!name || Array.from(name).length > TRAINER_MAX || !SINGLE_LINE.test(name) || CONTROL.test(name))
    return null;
  return name;
}
var isDay = (item) => typeof item === "string" && DAY2.test(item);
var isBadge = (item) => item === "bronze" || item === "gold";
function cleanSave(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value))
    return null;
  const raw = value;
  if (raw.v !== 1)
    return null;
  const save = emptySave();
  save.trainer = cleanTrainer(raw.trainer);
  for (const list of LISTS)
    save[list] = cleanList(raw[list], SLUG);
  save.medals = cleanRecord(raw.medals, MEDAL_ID, isDay);
  save.gyms = cleanRecord(raw.gyms, SLUG, isBadge);
  save.hidden = cleanList(raw.hidden, MEDAL_ID);
  return save;
}
async function checksum(bytes) {
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
  return Array.from(digest.subarray(0, 4), (b) => b.toString(16).padStart(2, "0")).join("");
}
async function encodeSave(save) {
  const json = new TextEncoder().encode(JSON.stringify(save));
  const stream = new Blob([json]).stream().pipeThrough(new CompressionStream("deflate-raw"));
  const packed = new Uint8Array(await new Response(stream).arrayBuffer());
  return `1.${toBase64Url(packed)}.${await checksum(json)}`;
}

// src/expeditions/http.ts
var CSP = "default-src 'self'; img-src 'self'; style-src 'self'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'";
var SECURITY = { "Content-Security-Policy": CSP, "Referrer-Policy": "no-referrer", "X-Content-Type-Options": "nosniff" };
var TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".mp3": "audio/mpeg",
  ".ogg": "audio/ogg",
  ".wav": "audio/wav",
  ".woff2": "font/woff2"
};
var CODE_TTL_MS = 2 * 60 * 1000;
var KEEP_CODES = 16;
var KEEP_KEYS = 16;
var BODY_BYTES = 16 * 1024;
var STREAM_CLIENTS = 8;
var STREAM_QUEUE_BYTES = 512 * 1024;
var PING_MS = 25000;
var AGENTS_TTL_MS = 60000;
var Slug2 = string2().regex(/^[a-z0-9][a-z0-9-]{0,80}$/);
var RunId = string2().regex(UUID);
var WindowInputSchema = discriminatedUnion("kind", [
  strictObject({ kind: literal("class_set"), run: RunId, class: Slug2 }),
  strictObject({ kind: literal("choice"), run: RunId, wave: number2().int().min(1).max(1e6), pick: union([literal(0), literal(1)]) }),
  strictObject({ kind: literal("stance"), stance: _enum(STANCES) }),
  strictObject({ kind: literal("verdict"), run: RunId, verdict: _enum(VERDICTS) }),
  strictObject({ kind: literal("progress"), run: RunId }),
  strictObject({ kind: literal("manual_start"), class: Slug2 }),
  strictObject({ kind: literal("manual_end"), run: RunId })
]);
var SessionBody = strictObject({ code: string2().max(256) });

class HttpError extends Error {
  status;
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
async function staticFiles(install) {
  const files = new Map([["/", join5(install.window, "index.html")], ["/app.js", join5(install.window, "app.js")], ["/app.css", join5(install.window, "app.css")]]);
  const walk = async (dir, prefix) => {
    const entries = await readdir3(dir, { withFileTypes: true }).catch(() => []);
    for (const entry of entries) {
      const url = `${prefix}/${encodeURIComponent(entry.name)}`;
      if (entry.isDirectory() && url !== "/assets/img/looks")
        await walk(join5(dir, entry.name), url);
      else if (entry.isFile() && TYPES[extname(entry.name)])
        files.set(url, join5(dir, entry.name));
    }
  };
  await walk(install.assets, "/assets");
  return files;
}
async function readJson(req) {
  if (!/^application\/json(?:\s*;|$)/i.test(req.headers["content-type"] ?? ""))
    throw new HttpError(415, "send application/json");
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk));
    size += bytes.length;
    if (size > BODY_BYTES)
      throw new HttpError(413, "body too large");
    chunks.push(bytes);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new HttpError(400, "body is not JSON");
  }
}
function parse4(schema, value) {
  const parsed = schema.safeParse(value);
  if (!parsed.success)
    throw new HttpError(400, `invalid ${parsed.error.issues[0]?.path.join(".") || "body"}`);
  return parsed.data;
}
async function startWindowServer(deps, listenPort = 0) {
  const { manager } = deps;
  const files = await staticFiles(deps.install);
  const codes = new Map;
  const keys = new Set;
  const clients = new Set;
  let agents = null;
  let port = 0;
  const agentList = async () => {
    if (!agents || deps.now() - agents.at > AGENTS_TTL_MS)
      agents = { at: deps.now(), list: await deps.agents().catch(() => []) };
    return agents.list;
  };
  const snapshotLine = (list) => `${JSON.stringify({
    type: "snapshot",
    runs: manager.views(),
    collection: manager.collection,
    settings: manager.settings,
    agents: list,
    dataVersion: manager.data.builtAt
  })}
`;
  const resync = async (client) => {
    const list = await agentList();
    if (!client.stale || client.res.destroyed)
      return;
    client.stale = false;
    client.res.write(snapshotLine(list));
  };
  const broadcast = (message) => {
    const line = `${JSON.stringify(message)}
`;
    for (const client of clients) {
      if (client.stale)
        continue;
      if (client.res.writableLength + line.length > STREAM_QUEUE_BYTES) {
        client.stale = true;
        if (!client.res.writableNeedDrain)
          resync(client);
      } else {
        client.res.write(line);
      }
    }
  };
  const send = (req, res, status, body, type, noStore) => {
    res.writeHead(status, { ...SECURITY, "Content-Type": type, "Content-Length": Buffer.byteLength(body), ...noStore ? { "Cache-Control": "no-store" } : {} });
    res.end(req.method === "HEAD" ? undefined : body);
  };
  const json = (req, res, status, value) => send(req, res, status, JSON.stringify(value), "application/json; charset=utf-8", true);
  const stream = async (req, res) => {
    if (clients.size >= STREAM_CLIENTS)
      throw new HttpError(429, "too many windows open");
    const list = await agentList();
    if (req.socket.destroyed)
      return;
    res.writeHead(200, { ...SECURITY, "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store" });
    const client = { res, stale: false };
    res.write(snapshotLine(list));
    clients.add(client);
    const ping = setInterval(() => {
      if (!client.stale)
        res.write(`${JSON.stringify({ type: "ping" })}
`);
    }, PING_MS);
    res.on("drain", () => {
      if (client.stale)
        resync(client);
    });
    res.on("close", () => {
      clearInterval(ping);
      clients.delete(client);
    });
  };
  const api = async (req, res, path) => {
    const method = req.method ?? "GET";
    if (path === "/api/session") {
      if (method !== "POST")
        throw new HttpError(405, "use POST");
      const { code } = parse4(SessionBody, await readJson(req));
      const expires = codes.get(code);
      codes.delete(code);
      if (expires === undefined || expires < deps.now())
        throw new HttpError(401, "this link has expired; run expeditions open for a new one");
      const key = randomBytes3(32).toString("hex");
      keys.add(key);
      if (keys.size > KEEP_KEYS)
        keys.delete(keys.values().next().value ?? key);
      return json(req, res, 200, { key });
    }
    const bearer = /^Bearer ([0-9a-f]{64})$/.exec(req.headers.authorization ?? "");
    if (!bearer || !keys.has(bearer[1]))
      throw new HttpError(401, "run expeditions open for a fresh link");
    const route = `${method} ${path}`;
    switch (route) {
      case "GET /api/stream":
        return stream(req, res);
      case "GET /api/data":
        return json(req, res, 200, manager.data);
      case "GET /api/export": {
        const save = cleanSave({ ...emptySave(), caught: Object.keys(manager.collection.caught), medals: { ...manager.collection.medals } }) ?? emptySave();
        const code = await encodeSave(save);
        return json(req, res, 200, { link: `${manager.data.baseUrl}/play/#s=${code}`, code });
      }
      case "POST /api/input": {
        const input = parse4(WindowInputSchema, await readJson(req));
        if (input.kind === "stance") {
          await manager.updateSettings({ stance: input.stance });
          return json(req, res, 200, { ok: true });
        }
        const result = await manager.input(input);
        return json(req, res, result.ok ? 200 : 409, result);
      }
      case "POST /api/settings": {
        const settings = await manager.updateSettings(parse4(SettingsPatch, await readJson(req)));
        return json(req, res, 200, { ok: true, settings });
      }
    }
    throw new HttpError(404, "not found");
  };
  const handle = async (req, res) => {
    const hosts = [`127.0.0.1:${port}`, `localhost:${port}`];
    if (!hosts.includes(req.headers.host ?? ""))
      throw new HttpError(421, "wrong host");
    const method = req.method ?? "GET";
    if (method === "POST" && !hosts.some((host) => req.headers.origin === `http://${host}`))
      throw new HttpError(403, "wrong origin");
    const url = req.url ?? "";
    if (!url.startsWith("/"))
      throw new HttpError(400, "bad path");
    const path = url.split("?")[0];
    if (path.startsWith("/api/"))
      return api(req, res, path);
    if (method !== "GET" && method !== "HEAD")
      throw new HttpError(405, "use GET");
    const look = /^\/assets\/img\/looks\/([a-z0-9-]{1,60})\.png$/.exec(path);
    if (look) {
      const bytes = await deps.looks.get(look[1]);
      if (!bytes)
        throw new HttpError(404, "not found");
      return send(req, res, 200, bytes, "image/png", false);
    }
    const file = files.get(path);
    if (!file)
      throw new HttpError(404, "not found");
    let bytes;
    try {
      bytes = await readFile2(file);
    } catch (error) {
      if (isCode(error, "ENOENT"))
        throw new HttpError(404, "not found");
      throw error;
    }
    send(req, res, 200, bytes, TYPES[extname(file)] ?? "application/octet-stream", path === "/");
  };
  const server = createServer2((req, res) => {
    handle(req, res).catch((error) => {
      if (res.headersSent) {
        res.destroy();
        return;
      }
      const status = error instanceof HttpError ? error.status : 500;
      json(req, res, status, { ok: false, error: error instanceof HttpError ? error.message : "helper error" });
    });
  });
  const listening = Promise.withResolvers();
  server.once("error", listening.reject);
  server.listen({ host: "127.0.0.1", port: listenPort }, () => listening.resolve());
  await listening.promise;
  const address = server.address();
  port = address !== null && typeof address === "object" ? address.port : 0;
  return {
    port,
    mintCode() {
      const now = deps.now();
      for (const [code, expires] of codes)
        if (expires < now)
          codes.delete(code);
      if (codes.size >= KEEP_CODES)
        codes.delete(codes.keys().next().value ?? "");
      const code = randomBytes3(16).toString("hex");
      codes.set(code, now + CODE_TTL_MS);
      return code;
    },
    clients: () => clients.size,
    broadcast,
    async close() {
      const closed = Promise.withResolvers();
      server.close(() => closed.resolve());
      server.closeAllConnections();
      await closed.promise;
    }
  };
}

// src/expeditions/runs.ts
import { randomUUID as randomUUID2 } from "node:crypto";

// src/shared/expeditions-card.ts
var HERO = { "claude-code": "Claude Code", codex: "Codex", omp: "OMP", gemini: "Gemini CLI", generic: "Generic agent", manual: "Manual play" };
var KIND = { skill: "skill", plugin: "plugin", mcp_server: "MCP server", subagent: "subagent" };
function buffLine(data, buff) {
  const name = data.spells.find((spell) => spell.slug === buff.spell)?.name ?? buff.spell;
  const heroes = buff.heroes.map((hero) => own2(HERO, hero) ?? hero).join(", ");
  const cast = buff.cast === "ambient" ? "ambient cast (installed)" : "invoked cast (named in the prompt)";
  return `${name}: +${buff.points} clear-rate points across ${buff.matchedRuns} matched runs; ${buff.matchedCleared} cleared with it, against ${buff.controlCleared} of ${buff.controlRuns} without it. ${cast}; heroes: ${heroes}.`;
}
function spellIndex(data) {
  const index = new Map;
  for (const spell of data.spells) {
    for (const id of new Set(spell.match)) {
      const slugs = index.get(id);
      if (slugs)
        slugs.push(spell.slug);
      else
        index.set(id, [spell.slug]);
    }
  }
  return index;
}
function recommendationCard(data, classSlug, agent) {
  const category = data.classes.find((item) => item.slug === classSlug);
  const evidence = own2(data.evidence, classSlug);
  const buffed = evidence?.buffed ?? [];
  const restraint = evidence?.restraint ?? [];
  const spells = data.spells.filter((spell) => spell.classes.includes(classSlug)).map((spell) => spell.slug);
  const loadouts = data.loadouts.filter((loadout) => loadout.class === classSlug).toSorted((a, b) => Number(b.harness === agent) - Number(a.harness === agent));
  const measured = evidence !== undefined && evidence.quests > 0;
  const lines = measured ? [`Curator trials on ${evidence.quests} ${evidence.quests === 1 ? "quest" : "quests"}. These results do not measure your session.`, ...buffed.map((buff) => buffLine(data, buff))] : [
    `${category?.className ?? classSlug}: not measured yet. These library spells have no trial claims here.`,
    ...spells.map((slug) => data.spells.find((spell) => spell.slug === slug).name)
  ];
  if (measured && !buffed.length)
    lines.push("No spell has a positive Buff over enough matched runs here yet.");
  for (const row of restraint)
    lines.push(`Wise Restraint: ${row.name}. Unarmed cleared ${row.cleared} of ${row.runs} runs; measured spells added cost without raising the clear rate.`);
  for (const loadout of loadouts)
    lines.push(`${loadout.title} (${HERO[loadout.harness]}): ${loadout.task}. ${loadout.basis === "proposed" ? "Proposed: nobody ran it end to end yet" : "Curated setup. Its full loadout is not appraised here."}`);
  return { class: classSlug, measured, buffed, restraint, loadouts, spells, lines };
}
function recap(data, state) {
  const evidence = state.class ? own2(data.evidence, state.class) : undefined;
  const used = [...new Set([...state.caught, ...state.attuned])].flatMap((slug) => {
    const spell = data.spells.find((item) => item.slug === slug);
    if (!spell)
      return [];
    const buff = evidence?.buffed.find((row) => row.spell === slug);
    const upkeep = evidence ? own2(evidence.upkeep, slug) : undefined;
    const line = buff ? buffLine(data, buff) : upkeep !== undefined ? `${spell.name}: measured Upkeep ${upkeep >= 0 ? "+" : ""}${upkeep}% mana against Unarmed. No positive Buff over enough matched runs here.` : `${spell.name}: ${evidence ? "no qualifying Buff or Upkeep result here" : "not measured here"}. This session is not a trial result.`;
    return [{ spell: slug, line }];
  });
  let suggestion = null;
  if (!state.caps.skills)
    suggestion = "Spells are not visible for this agent. Pick a loadout from the card if it fits your next task.";
  else {
    const missing = evidence?.buffed.find((row) => !used.some((item) => item.spell === row.spell));
    if (missing)
      suggestion = `Next time, consider ${missing.spell} if installed. Its curator trials raised the clear rate here; your result may differ.`;
    else if (evidence?.restraint.length && used.length)
      suggestion = "Next time, consider Unarmed for a similar small task. The card lists quests where spells added cost without a higher clear rate.";
    else if (used.length)
      suggestion = "Keep only spells that fit the next task. One session does not establish a trial result.";
    else if (state.class)
      suggestion = "Pick a spell only if it fits the next task. Unmeasured spells carry no trial claim.";
  }
  return { used, suggestion };
}
var SLUG2 = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
var NOTE_MAX = 400;
function guideNote(data, classSlug, agent) {
  if (classSlug.length > 40 || !SLUG2.test(classSlug) || !data.classes.some((item) => item.slug === classSlug))
    return null;
  const choices = (own2(data.evidence, classSlug)?.buffed ?? []).filter((row) => {
    const spell = data.spells.find((item) => item.slug === row.spell);
    return spell && (agent !== "claude-code" && agent !== "codex" || spell.agents.includes(agent));
  });
  const buff = choices.find((row) => row.heroes.includes(agent)) ?? choices[0];
  const spell = data.spells.find((item) => item.slug === buff?.spell);
  if (!buff || !spell || spell.slug.length > 64 || !SLUG2.test(spell.slug) || !Object.hasOwn(KIND, spell.kind))
    return null;
  const counts = [buff.matchedCleared, buff.matchedRuns, buff.controlCleared, buff.controlRuns];
  if (!counts.every((count) => Number.isSafeInteger(count) && count >= 0 && count <= 1e6) || buff.matchedRuns < 1 || buff.controlRuns < 1 || buff.matchedCleared > buff.matchedRuns || buff.controlCleared > buff.controlRuns || !(buff.points > 0))
    return null;
  const note = `VibeRPG trials: on ${classSlug} quests, agents with the ${spell.slug} ${KIND[spell.kind]} ${buff.cast === "ambient" ? "installed" : "named in the prompt"} cleared ${buff.matchedCleared} of ${buff.matchedRuns} runs, against ${buff.controlCleared} of ${buff.controlRuns} without it. Use it if installed.`;
  return note.length <= NOTE_MAX ? note : null;
}

// src/shared/expeditions-classify.ts
var STOP = /^(?:a|an|and|are|as|at|be|been|but|by|can|could|do|for|from|has|have|how|i|in|into|is|it|its|me|my|of|on|or|our|please|that|the|their|them|there|these|they|this|to|us|use|using|want|was|we|what|when|where|which|will|with|would|you|your)$/;
function tokens(text) {
  return (text.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter((word) => word.length > 1 && !STOP.test(word)).map((word) => {
    if (word.length > 5 && word.endsWith("ies"))
      return `${word.slice(0, -3)}y`;
    if (word.length > 5 && word.endsWith("ing")) {
      const stem = word.slice(0, -3);
      return /([b-df-hj-np-tv-z])\1$/.test(stem) ? stem.slice(0, -1) : stem;
    }
    if (word.length > 4 && word.endsWith("ed"))
      return word.slice(0, -2);
    if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss"))
      return word.slice(0, -1);
    return word;
  });
}
function classify(index, text) {
  const scores = new Map;
  for (const term of new Set(tokens(text))) {
    if (!Object.hasOwn(index.terms, term))
      continue;
    for (const [slug, weight] of Object.entries(index.terms[term]))
      scores.set(slug, (scores.get(slug) ?? 0) + weight);
  }
  const ranked = [...scores].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const first = ranked[0];
  const sure = first !== undefined && first[1] >= index.minScore && (first[1] - (ranked[1]?.[1] ?? 0)) / first[1] >= index.margin;
  return { class: sure ? first[0] : null, sure, candidates: ranked.slice(0, 3).map(([slug]) => slug) };
}

// src/expeditions/runs.ts
var MAX_ACTORS = 64;
var DEDUPE_KEEP = 2048;
var MAX_INGEST_JOBS = 128;
var MAX_OBSERVATION_EVENTS = MAX_RECORD_EVENTS - 1024;
var MAX_PENDING_APPROVALS = 64;
var MAX_COMPLETED_CALLS = 2048;
var NO_CAPS = { prompt: false, tools: false, skills: false, subagents: false, compaction: false, toolStart: false, model: false };
function freshLive(since) {
  return {
    at: -1,
    status: { phase: null, since, step: null, project: null },
    basePhase: null,
    baseStep: null,
    approvals: new Map,
    completed: new Set
  };
}

class RunManager {
  #deps;
  #runs = new Map;
  #live = new Map;
  #spells;
  #index;
  #collection;
  #settled;
  #settings;
  #queue = Promise.resolve();
  #ingestJobs = 0;
  #activityDirty = false;
  lastActivity;
  constructor(deps, index, save, settings) {
    this.#deps = deps;
    this.#index = index;
    this.#collection = save.collection;
    this.#settled = new Set(save.settled);
    this.#settings = settings;
    this.#spells = spellIndex(deps.data);
    this.lastActivity = deps.now();
  }
  static async load(deps) {
    const index = await loadIndex(deps.paths);
    const manager = new RunManager(deps, index, await loadCollection(deps.paths, deps.now()), await loadSettings(deps.paths));
    for (const entry of index.open) {
      if (manager.#runs.size >= MAX_OPEN_RUNS)
        break;
      const record = await loadRecord(deps.paths, entry.id);
      if (!record)
        continue;
      let state;
      try {
        state = replayRun(record, deps.data);
      } catch {
        continue;
      }
      if (state.closed && manager.#settled.has(record.id))
        index.closed.push(record.id);
      else {
        manager.#runs.set(record.id, { record, state, route: entry.route, actors: entry.actors, seen: new Set, lastEventAt: entry.lastEventAt, endingAt: entry.endingAt });
        manager.#live.set(record.id, freshLive(entry.lastEventAt));
      }
    }
    index.closed = await pruneClosed(deps.paths, index.closed);
    await manager.#saveIndex();
    return manager;
  }
  get settings() {
    return this.#settings;
  }
  get collection() {
    return this.#collection;
  }
  get data() {
    return this.#deps.data;
  }
  views() {
    return [...this.#runs.values()].map((run) => this.#view(run));
  }
  #view(run) {
    const { state, record } = run;
    return { id: record.id, agent: record.agent, caps: state.caps, state, card: state.class ? recommendationCard(this.#deps.data, state.class, record.agent) : null, ending: run.endingAt !== null, capped: record.events.length >= MAX_OBSERVATION_EVENTS, live: this.#live.get(record.id)?.status ?? { phase: null, since: run.lastEventAt, step: null, project: null } };
  }
  #rememberCompleted(live, call) {
    live.completed.add(call);
    if (live.completed.size > MAX_COMPLETED_CALLS)
      live.completed.delete(live.completed.values().next().value ?? call);
  }
  #applyLive(run, hint) {
    const live = this.#live.get(run.record.id);
    if (!live)
      return;
    if (hint.call !== undefined && (hint.phase === "tool" || hint.phase === "approval") && live.completed.has(hint.call))
      return;
    const actor = hint.scope === "sub" ? hint.actor ?? "main" : "main";
    const pending = live.approvals.get(actor);
    const ownResolution = hint.scope === "sub" && hint.phase !== undefined && hint.phase !== "approval" && pending !== undefined && hint.at >= pending.at;
    if (hint.at < live.at && !ownResolution)
      return;
    if (hint.scope === "sub" && hint.phase !== "approval" && pending === undefined)
      return;
    if (hint.phase === "approval") {
      if (pending === undefined && live.approvals.size >= MAX_PENDING_APPROVALS)
        return;
      const step = hint.step === undefined ? pending !== undefined ? pending.step : live.baseStep : hint.step;
      live.approvals.delete(actor);
      live.approvals.set(actor, { step, at: hint.at });
    } else {
      if (hint.phase !== undefined)
        live.approvals.delete(actor);
      if (hint.scope !== "sub") {
        if (hint.phase === "waiting")
          live.approvals.clear();
        live.basePhase = hint.phase ?? live.basePhase;
        if (hint.step !== undefined)
          live.baseStep = hint.step;
      }
    }
    const before = live.status;
    const phase = live.approvals.size ? "approval" : live.basePhase;
    let step = live.baseStep;
    for (const entry of live.approvals.values())
      step = entry.step;
    const status = {
      phase,
      since: phase === before.phase ? before.since : this.#deps.now(),
      step,
      project: hint.at >= live.at ? hint.project ?? before.project : before.project
    };
    live.at = Math.max(live.at, hint.at);
    live.status = status;
    if (status.phase !== before.phase || status.project !== before.project || status.step?.kind !== before.step?.kind || status.step?.target !== before.step?.target) {
      this.#deps.broadcast({ type: "live", run: run.record.id, live: status });
    }
  }
  #serial(job) {
    const next = this.#queue.then(job, job);
    this.#queue = next.catch(() => {});
    return next;
  }
  async#saveIndex() {
    this.#index.open = [...this.#runs.values()].map((run) => ({ id: run.record.id, route: run.route, actors: run.actors, lastEventAt: run.lastEventAt, endingAt: run.endingAt }));
    await saveIndex(this.#deps.paths, this.#index);
    this.#activityDirty = false;
  }
  #apply(run, body, actor, beats) {
    if (run.state.closed || run.record.events.length >= MAX_RECORD_EVENTS)
      return;
    const event = { ...body, seq: run.record.events.length + 1, actor };
    const result = applyEvent(run.state, event, this.#deps.data);
    run.state = result.state;
    run.record.events.push(event);
    beats.push(...result.beats);
    if (run.record.events.length === MAX_OBSERVATION_EVENTS)
      this.#deps.broadcast({ type: "run_opened", run: this.#view(run) });
    if (!run.state.closed && run.record.events.length >= MAX_RECORD_EVENTS - 1) {
      this.#apply(run, { kind: "session_end", reason: "idle" }, 0, beats);
    }
  }
  #open(agent, caps, route, model, effort, beats) {
    if (this.#runs.size >= MAX_OPEN_RUNS)
      return null;
    const now = this.#deps.now();
    const id = randomUUID2();
    const seed = seedFor(id);
    const record = { v: RULES_VERSION, id, agent, seed, startedAt: new Date(now).toISOString(), dataVersion: this.#deps.data.builtAt, events: [] };
    const run = { record, state: startRun(seed, agent, caps), route, actors: [], seen: new Set, lastEventAt: now, endingAt: null };
    this.#apply(run, { kind: "session_start", agent, caps, model, effort }, 0, beats);
    if (run.state.stance !== this.#settings.stance)
      this.#apply(run, { kind: "stance", stance: this.#settings.stance }, 0, beats);
    this.#runs.set(id, run);
    this.#live.set(id, freshLive(now));
    this.#deps.broadcast({ type: "run_opened", run: this.#view(run) });
    const day = localDay(now);
    if (agent !== "manual" && this.#settings.openOnStart && this.#index.openedDay !== day) {
      this.#index.openedDay = day;
      this.#deps.firstRunToday();
    }
    return run;
  }
  async#persist(run, beats, activity = true) {
    run.lastEventAt = this.#deps.now();
    if (activity)
      this.lastActivity = run.lastEventAt;
    await saveRecord(this.#deps.paths, run.record);
    if (run.state.closed) {
      await this.#settle(run, beats);
      return;
    }
    await this.#saveIndex();
    if (beats.length)
      this.#deps.broadcast({ type: "beats", run: run.record.id, beats, state: run.state });
  }
  async#settle(run, beats) {
    const { paths, data } = this.#deps;
    const id = run.record.id;
    const settled = this.#settled.has(id) ? { collection: this.#collection, earned: [] } : settleRun(this.#collection, run.state, data, localDay(this.#deps.now()));
    const summary = recap(data, run.state);
    if (!this.#settled.has(id)) {
      const receipts = [...this.#settled].filter((previous) => this.#runs.has(previous) || this.#index.closed.includes(previous));
      receipts.push(id);
      await saveCollection(paths, settled.collection, receipts);
      this.#collection = settled.collection;
      this.#settled = new Set(receipts);
    }
    const index = {
      ...this.#index,
      open: [...this.#runs.values()].filter((item) => item.record.id !== id).map((item) => ({ id: item.record.id, route: item.route, actors: item.actors, lastEventAt: item.lastEventAt, endingAt: item.endingAt })),
      closed: await pruneClosed(paths, [...this.#index.closed, id])
    };
    await saveIndex(paths, index);
    this.#index = index;
    this.#runs.delete(id);
    this.#live.delete(id);
    this.#activityDirty = false;
    if (beats.length)
      this.#deps.broadcast({ type: "beats", run: id, beats, state: run.state });
    this.#deps.broadcast({ type: "run_closed", run: id, earned: settled.earned, recap: summary, collection: settled.collection });
  }
  #actor(run, sub) {
    if (sub === undefined)
      return 0;
    const known = run.actors.indexOf(sub);
    if (known !== -1)
      return known + 1;
    if (run.actors.length < MAX_ACTORS)
      run.actors.push(sub);
    return run.actors.length;
  }
  #byRoute(route) {
    for (const run of this.#runs.values())
      if (run.route === route)
        return run;
    return;
  }
  ingest(request) {
    if (this.#ingestJobs >= MAX_INGEST_JOBS) {
      request.prompt = undefined;
      return Promise.resolve({ ok: true, guide: null });
    }
    this.#ingestJobs++;
    let prompt = request.prompt;
    request.prompt = undefined;
    return this.#serial(async () => {
      const { data } = this.#deps;
      const beats = [];
      let run = this.#byRoute(request.route) ?? null;
      if (!run) {
        if (!request.events.some((event) => event.kind !== "session_end"))
          return { ok: true, guide: null };
        const start = request.events.find((event) => event.kind === "session_start");
        run = this.#open(request.agent, request.caps, request.route, start?.model ?? null, start?.effort ?? null, beats);
        if (!run)
          return { ok: true, guide: null };
      }
      const wasEnding = run.endingAt !== null;
      const previousLength = run.record.events.length;
      if (request.events.length || request.live !== undefined) {
        run.lastEventAt = this.#deps.now();
        this.lastActivity = run.lastEventAt;
        this.#activityDirty = true;
      }
      let firstPrompt = false;
      for (const event of request.events) {
        if (event.kind === "session_end") {
          run.endingAt ??= this.#deps.now();
          break;
        }
        if (event.kind === "session_start") {
          run.endingAt = null;
          continue;
        }
        if (event.kind === "tool" && event.dedupe !== undefined) {
          const live = this.#live.get(run.record.id);
          if (live)
            this.#rememberCompleted(live, event.dedupe);
        }
        if (run.record.events.length >= MAX_OBSERVATION_EVENTS)
          continue;
        if (event.dedupe !== undefined) {
          const key = `${event.kind}:${event.dedupe}`;
          if (run.seen.has(key))
            continue;
          run.seen.add(key);
          if (run.seen.size > DEDUPE_KEEP)
            run.seen.delete(run.seen.values().next().value ?? key);
        }
        const actor = this.#actor(run, event.sub);
        const { sub: _sub, dedupe: _dedupe, match, ...body } = event;
        if (body.kind === "tool") {
          const slugs = match === undefined ? undefined : this.#spells.get(match);
          body.spell = slugs?.length === 1 ? slugs[0] : null;
        }
        if (body.kind === "class_set")
          body.candidates = body.candidates.filter((slug) => data.classes.some((item) => item.slug === slug));
        firstPrompt ||= body.kind === "prompt" && !run.record.events.some((item) => item.kind === "prompt");
        this.#apply(run, body, actor, beats);
        if (body.kind === "prompt" && prompt !== undefined && run.state.class === null && run.record.events.length < MAX_OBSERVATION_EVENTS) {
          const guess = classify(data.classifier, prompt);
          prompt = undefined;
          const pick = guess.class ?? guess.candidates[0];
          if (pick !== undefined)
            this.#apply(run, { kind: "class_set", class: pick, by: "auto", sure: guess.sure, candidates: guess.candidates }, 0, beats);
        }
      }
      if (request.live !== undefined)
        this.#applyLive(run, request.live);
      prompt = undefined;
      const { state, record } = run;
      const guide = request.reply === "guide" && this.#settings.guide && firstPrompt && state.class !== null ? guideNote(data, state.class, record.agent) : null;
      if (beats.length || run.record.events.length !== previousLength || wasEnding !== (run.endingAt !== null))
        await this.#persist(run, beats);
      if (wasEnding !== (run.endingAt !== null))
        this.#deps.broadcast({ type: "run_opened", run: this.#view(run) });
      return { ok: true, guide };
    }).finally(() => {
      prompt = undefined;
      this.#ingestJobs--;
    });
  }
  sweep() {
    return this.#serial(async () => {
      const now = this.#deps.now();
      for (const run of [...this.#runs.values()]) {
        const graceOver = run.endingAt !== null && now - run.endingAt >= TIMINGS.verdictGraceMs;
        if (!run.state.closed && !graceOver && now - run.lastEventAt < TIMINGS.idleCloseMs)
          continue;
        const beats = [];
        this.#apply(run, { kind: "session_end", reason: graceOver ? "agent" : "idle" }, 0, beats);
        await this.#persist(run, beats, false);
      }
      if (this.#activityDirty)
        await this.#saveIndex();
    });
  }
  idle() {
    return this.#serial(async () => {
      if (this.#activityDirty)
        await this.#saveIndex();
    });
  }
  updateSettings(patch) {
    return this.#serial(async () => {
      const previous = this.#settings;
      this.#settings = { ...previous, ...patch };
      await saveSettings(this.#deps.paths, this.#settings);
      this.#deps.broadcast({ type: "settings", settings: this.#settings });
      if (this.#settings.stance !== previous.stance) {
        for (const run of [...this.#runs.values()]) {
          const beats = [];
          this.#apply(run, { kind: "stance", stance: this.#settings.stance }, 0, beats);
          await this.#persist(run, beats);
        }
      }
      return this.#settings;
    });
  }
  input(input) {
    return this.#serial(async () => {
      const { data } = this.#deps;
      const beats = [];
      if (input.kind === "manual_start") {
        if (!data.classes.some((item) => item.slug === input.class))
          return { ok: false, error: "unknown class" };
        const run = this.#open("manual", NO_CAPS, `manual:${randomUUID2()}`, null, null, beats);
        if (!run)
          return { ok: false, error: "too many open expeditions" };
        this.#apply(run, { kind: "class_set", class: input.class, by: "player", sure: true, candidates: [] }, 0, beats);
        await this.#persist(run, beats);
        return { ok: true, run: run.record.id };
      }
      const run = this.#runs.get(input.run);
      if (!run)
        return { ok: false, error: "no open expedition with that id" };
      const manual = run.record.agent === "manual";
      switch (input.kind) {
        case "class_set":
          if (!data.classes.some((item) => item.slug === input.class))
            return { ok: false, error: "unknown class" };
          this.#apply(run, { kind: "class_set", class: input.class, by: "player", sure: true, candidates: [] }, 0, beats);
          break;
        case "choice":
          this.#apply(run, { kind: "choice", wave: input.wave, pick: input.pick }, 0, beats);
          break;
        case "verdict":
          this.#apply(run, { kind: "verdict", verdict: input.verdict }, 0, beats);
          if (run.endingAt !== null)
            this.#apply(run, { kind: "session_end", reason: "agent" }, 0, beats);
          break;
        case "progress":
          if (!manual)
            return { ok: false, error: "Progress is for manual expeditions" };
          if (run.record.events.length >= MAX_OBSERVATION_EVENTS)
            return { ok: false, error: "expedition event limit reached" };
          this.#apply(run, { kind: "progress" }, 0, beats);
          break;
        case "manual_end":
          if (!manual)
            return { ok: false, error: "only manual expeditions end from the window" };
          this.#apply(run, { kind: "session_end", reason: "player" }, 0, beats);
          break;
      }
      await this.#persist(run, beats);
      return { ok: true, run: run.record.id };
    });
  }
}

// src/expeditions/setup.ts
import { existsSync as existsSync2, realpathSync as realpathSync2 } from "node:fs";
import { mkdir as mkdir2, readFile as readFile3, rm as rm5, stat as stat2, writeFile as writeFile2 } from "node:fs/promises";
import { homedir as homedir2 } from "node:os";
import { delimiter, dirname as dirname2, isAbsolute, join as join6 } from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";
import { isDeepStrictEqual } from "node:util";
var HOOK_NAME = "expeditions";
var GEMINI_EVENTS = ["SessionStart", "BeforeAgent", "AfterTool", "AfterAgent", "PreCompress", "SessionEnd"];
var MARKER = "// expeditions:install";
var INSTALL_LINE = /^const INSTALL: \{ node: string; cli: string \} = .*;$/m;
var PLUGIN_ID = /^expeditions@/;
var home = () => process.env.HOME || homedir2();
var ompAgentDir = () => process.env.PI_CODING_AGENT_DIR || join6(home(), process.env.PI_CONFIG_DIR || ".omp", "agent");
var ompFile = () => join6(ompAgentDir(), "extensions", "expeditions.ts");
var geminiDir = () => join6(process.env.GEMINI_CLI_HOME || home(), ".gemini");
var geminiFile = () => join6(geminiDir(), "settings.json");
var backupOf = (path) => `${path}.expeditions-backup`;
function extensionSource() {
  const self = fileURLToPath2(import.meta.url);
  return self.endsWith(".ts") ? join6(dirname2(self), "adapters", "omp-extension.ts") : join6(installPaths().root, "extensions", "omp", "expeditions.ts");
}
function shellQuote(text) {
  return process.platform === "win32" ? `"${text}"` : `'${text.replaceAll("'", "'\\''")}'`;
}
var DESCRIPTION = "Expeditions: sends session events to the local game window";
var JsonObject = record(string2(), unknown());
var Group = looseObject({ hooks: array(unknown()) });
var OurHook = object({ name: literal(HOOK_NAME), type: literal("command"), description: literal(DESCRIPTION), command: string2().endsWith(" hook gemini") });
var SameName = object({ name: literal(HOOK_NAME) });
function withoutOurs(settings) {
  const hooks = JsonObject.safeParse(settings.hooks);
  if (!hooks.success)
    return settings;
  const next = {};
  for (const [event, groups] of Object.entries(hooks.data)) {
    if (!Array.isArray(groups)) {
      next[event] = groups;
      continue;
    }
    const kept = groups.flatMap((group) => {
      const parsed = Group.safeParse(group);
      if (!parsed.success)
        return [group];
      const others = parsed.data.hooks.filter((hook) => !OurHook.safeParse(hook).success);
      if (others.length === parsed.data.hooks.length)
        return [group];
      return others.length === 0 ? [] : [{ ...parsed.data, hooks: others }];
    });
    if (kept.length > 0 || groups.length === 0)
      next[event] = kept;
  }
  const out = { ...settings };
  if (Object.keys(next).length === 0 && Object.keys(hooks.data).length > 0)
    delete out.hooks;
  else
    out.hooks = next;
  return out;
}
function withOurs(settings, install) {
  const base = withoutOurs(settings);
  const hooks = { ...JsonObject.catch({}).parse(base.hooks) };
  const command = `${shellQuote(install.node)} ${shellQuote(install.cli)} hook gemini`;
  for (const event of GEMINI_EVENTS) {
    const ours = { hooks: [{ name: HOOK_NAME, type: "command", command, timeout: 3000, description: DESCRIPTION }] };
    const groups = hooks[event];
    hooks[event] = Array.isArray(groups) ? [...groups, ours] : [ours];
  }
  return { ...base, hooks };
}
function countOurs(settings) {
  const hooks = JsonObject.catch({}).parse(settings.hooks);
  return GEMINI_EVENTS.filter((event) => {
    const groups = hooks[event];
    return Array.isArray(groups) && groups.some((group) => Group.safeParse(group).data?.hooks.some((hook) => OurHook.safeParse(hook).success));
  }).length;
}
function sameNameOthers(settings) {
  const hooks = JsonObject.catch({}).parse(settings.hooks);
  return Object.values(hooks).some((groups) => Array.isArray(groups) && groups.some((group) => Group.safeParse(group).data?.hooks.some((hook) => SameName.safeParse(hook).success && !OurHook.safeParse(hook).success)));
}
async function readJson2(path) {
  const bytes = await readIfExists(path);
  if (bytes === null)
    return { bytes, value: {} };
  try {
    const parsed = JsonObject.safeParse(JSON.parse(bytes.toString("utf8")));
    return { bytes, value: parsed.success ? parsed.data : undefined };
  } catch {
    return { bytes, value: undefined };
  }
}
async function writeJson(path, value, like) {
  const indent = like === null ? "  " : /^([ \t]+)"/m.exec(like.toString("utf8"))?.[1] ?? "  ";
  const mode = like === null ? 384 : (await stat2(path)).mode & 511;
  await mkdir2(dirname2(path), { recursive: true });
  await writeFile2(path, `${JSON.stringify(value, null, indent)}
`, { mode });
}
async function setupGemini(opts, install) {
  const path = geminiFile();
  const { bytes, value } = await readJson2(path);
  if (value === undefined) {
    opts.log(`Gemini CLI: ${path} isn't plain JSON, so setup left it alone. Remove its comments or add the hooks by hand.`);
    return false;
  }
  const next = withOurs(value, install);
  if (sameNameOthers(value))
    opts.log(`Gemini CLI: ${path} has a hook named "${HOOK_NAME}" that setup didn't add; it stays as it is.`);
  if (isDeepStrictEqual(next, value)) {
    opts.log(`Gemini CLI: the hooks in ${path} are up to date.`);
    return true;
  }
  const backup = backupOf(path);
  const needsBackup = !existsSync2(backup);
  if (!opts.yes) {
    opts.log(`Gemini CLI: would add hooks named "${HOOK_NAME}" for ${GEMINI_EVENTS.join(", ")} to ${path}.`);
    if (needsBackup)
      opts.log(`Gemini CLI: would first save the current file to ${backup}.`);
    return true;
  }
  if (needsBackup) {
    await mkdir2(dirname2(backup), { recursive: true });
    await writeFile2(backup, bytes ?? "", { mode: 384 });
  }
  await writeJson(path, next, bytes);
  opts.log(`Gemini CLI: added the hooks to ${path}.${needsBackup ? ` The previous file is saved as ${backup}.` : ""} Start a new Gemini CLI session to use them.`);
  return true;
}
async function uninstallGemini(opts) {
  const path = geminiFile();
  const { bytes, value } = await readJson2(path);
  if (bytes === null) {
    opts.log(`Gemini CLI: no settings file at ${path}; nothing to remove.`);
    return true;
  }
  if (value === undefined) {
    opts.log(`Gemini CLI: ${path} isn't plain JSON, so uninstall left it alone. Remove the hooks named "${HOOK_NAME}" by hand.`);
    return false;
  }
  const stripped = withoutOurs(value);
  if (isDeepStrictEqual(stripped, value)) {
    opts.log(`Gemini CLI: no Expeditions hooks in ${path}.`);
    return true;
  }
  const backupPath = backupOf(path);
  const backup = await readIfExists(backupPath);
  const before = backup === null || backup.length === 0 ? null : await readJson2(backupPath);
  const created = backup?.length === 0 && isDeepStrictEqual(stripped, {});
  const restore = before !== null && isDeepStrictEqual(before.value, stripped);
  if (!opts.yes) {
    opts.log(created ? `Gemini CLI: would delete ${path}, which setup created.` : restore ? `Gemini CLI: would restore ${path} from ${backupPath}.` : `Gemini CLI: would remove the hooks named "${HOOK_NAME}" from ${path}.`);
    return true;
  }
  if (created)
    await rm5(path, { force: true });
  else if (restore && backup !== null)
    await writeFile2(path, backup);
  else
    await writeJson(path, stripped, bytes);
  if (created || restore)
    await rm5(backupPath, { force: true });
  opts.log(`Gemini CLI: removed the Expeditions hooks from ${path}.${!created && !restore && backup !== null ? ` The file changed since setup, so the backup stays at ${backupPath}.` : ""}`);
  return true;
}
async function setupOmp(opts, install) {
  const path = ompFile();
  const source = await readFile3(extensionSource(), "utf8");
  if (!INSTALL_LINE.test(source))
    throw new Error(`${extensionSource()} has no INSTALL line to fill in.`);
  const line = `const INSTALL: { node: string; cli: string } = ${JSON.stringify(install)};`;
  const stamped = source.replace(INSTALL_LINE, () => line);
  const current = await readIfExists(path);
  if (current !== null && !current.toString("utf8").includes(MARKER)) {
    opts.log(`OMP: ${path} exists and isn't the Expeditions extension, so setup left it alone.`);
    return false;
  }
  if (current?.toString("utf8") === stamped) {
    opts.log(`OMP: the extension at ${path} is up to date.`);
    return true;
  }
  if (!opts.yes) {
    opts.log(`OMP: would ${current === null ? "add" : "update"} the extension at ${path}.`);
    return true;
  }
  await mkdir2(dirname2(path), { recursive: true });
  await writeFile2(path, stamped, { mode: 384 });
  opts.log(`OMP: ${current === null ? "added" : "updated"} the extension at ${path}. Start a new OMP session to load it.`);
  return true;
}
async function uninstallOmp(opts) {
  const path = ompFile();
  const current = await readIfExists(path);
  if (current === null) {
    opts.log(`OMP: no Expeditions extension at ${path}.`);
    return true;
  }
  if (!current.toString("utf8").includes(MARKER)) {
    opts.log(`OMP: ${path} isn't the Expeditions extension, so uninstall left it alone.`);
    return false;
  }
  if (!opts.yes) {
    opts.log(`OMP: would delete ${path}.`);
    return true;
  }
  await rm5(path, { force: true });
  opts.log(`OMP: deleted ${path}. Running OMP sessions keep it until they end.`);
  return true;
}
function targets(opts) {
  if (opts.agent !== "all")
    return [opts.agent];
  const found = [];
  if (existsSync2(ompAgentDir()))
    found.push("omp");
  else
    opts.log(`OMP: not found at ${ompAgentDir()}; skipped.`);
  if (existsSync2(geminiDir()))
    found.push("gemini");
  else
    opts.log(`Gemini CLI: not found at ${geminiDir()}; skipped.`);
  return found;
}
async function run(opts, each) {
  let ok = true;
  for (const agent of targets(opts)) {
    try {
      ok = await each(agent) && ok;
    } catch (error) {
      opts.log(`${agent === "omp" ? "OMP" : "Gemini CLI"}: ${error instanceof Error ? error.message : String(error)}`);
      ok = false;
    }
  }
  if (!opts.yes)
    opts.log("Nothing changed yet. Run the same command with --yes to apply it.");
  return ok ? 0 : 1;
}
function stableNode(execPath = process.execPath, path = process.env.PATH ?? "") {
  for (const dir of path.split(delimiter)) {
    if (!isAbsolute(dir))
      continue;
    const candidate = join6(dir, process.platform === "win32" ? "node.exe" : "node");
    try {
      if (realpathSync2(candidate) === realpathSync2(execPath))
        return candidate;
    } catch {}
  }
  return execPath;
}
async function setup(opts) {
  const install = opts.install ?? { node: stableNode(), cli: installPaths().entry };
  if (opts.agent === "all")
    opts.log("Claude Code and Codex: install the Expeditions plugin from the marketplace; setup has nothing to change for them.");
  return run(opts, (agent) => agent === "omp" ? setupOmp(opts, install) : setupGemini(opts, install));
}
async function uninstall(opts) {
  if (opts.agent === "all")
    opts.log("Claude Code and Codex: remove the Expeditions plugin with /plugin in each app.");
  return run(opts, (agent) => agent === "omp" ? uninstallOmp(opts) : uninstallGemini(opts));
}
var ClaudeSettings = object({ enabledPlugins: record(string2(), unknown()).catch({}) }).catch({ enabledPlugins: {} });
async function claudeStatus() {
  const { value } = await readJson2(join6(process.env.CLAUDE_CONFIG_DIR || join6(home(), ".claude"), "settings.json"));
  const states = Object.entries(ClaudeSettings.parse(value).enabledPlugins).filter(([id]) => PLUGIN_ID.test(id)).map(([, on]) => on);
  if (states.includes(true))
    return { agent: "claude-code", status: "ok", detail: null };
  return { agent: "claude-code", status: "not set up", detail: states.length > 0 ? "The plugin is installed but turned off." : null };
}
async function codexStatus() {
  const text = (await readIfExists(join6(process.env.CODEX_HOME || join6(home(), ".codex"), "config.toml")))?.toString("utf8") ?? "";
  const table = /^\[plugins\."expeditions@[^"\]]+"\][^\n]*\n((?:(?!\[)[^\n]*\n?)*)/m.exec(text);
  if (table === null)
    return { agent: "codex", status: "not set up", detail: null };
  if (/^\s*enabled\s*=\s*false\b/m.test(table[1] ?? ""))
    return { agent: "codex", status: "not set up", detail: "The plugin is installed but turned off." };
  return { agent: "codex", status: "ok", detail: "Codex asks you to approve the plugin's hooks in /hooks after each update." };
}
async function ompStatus() {
  const text = (await readIfExists(ompFile()))?.toString("utf8");
  if (text === undefined || !text.includes(MARKER))
    return { agent: "omp", status: "not set up", detail: null };
  const quoted = /"cli":("(?:[^"\\]|\\.)*")/.exec(INSTALL_LINE.exec(text)?.[0] ?? "")?.[1];
  let cli = null;
  try {
    cli = quoted === undefined ? null : JSON.parse(quoted);
  } catch {}
  if (typeof cli === "string" && cli !== "" && !existsSync2(cli)) {
    return { agent: "omp", status: "limited", detail: "The extension points at an install that moved. Run expeditions setup again." };
  }
  return { agent: "omp", status: "ok", detail: null };
}
async function geminiStatus() {
  const { value } = await readJson2(geminiFile());
  const count = value === undefined ? 0 : countOurs(value);
  if (count === GEMINI_EVENTS.length)
    return { agent: "gemini", status: "ok", detail: null };
  if (count === 0)
    return { agent: "gemini", status: "not set up", detail: null };
  return { agent: "gemini", status: "limited", detail: "Some hooks are missing. Run expeditions setup again." };
}
async function setupStatus() {
  return Promise.all([claudeStatus(), codexStatus(), ompStatus(), geminiStatus()]);
}

// src/expeditions/helper.ts
var TICK_MS = 60000;
var LOCK_GRACE_MS = 30000;
var TAKEOVER_LEASE_MS = 15000;
var LockSchema = object({ pid: number2().int().positive(), token: string2().uuid().optional() });
async function readLock(paths) {
  try {
    const parsed = LockSchema.safeParse(JSON.parse((await readIfExists(paths.lock))?.toString("utf8") ?? "null"));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
async function ownsLock(paths, token) {
  return (await readLock(paths))?.token === token;
}
async function claimLock(paths) {
  const observed = await stat3(paths.lock).catch(() => null);
  if (!observed)
    return null;
  const expired = [];
  for (let generation = 0;; generation++) {
    const path = `${paths.lock}.${observed.dev}-${observed.ino}.takeover.${generation}`;
    try {
      const handle = await open3(path, "wx", 384);
      await handle.close();
      return { path, expired, dev: observed.dev, ino: observed.ino };
    } catch (error) {
      if (!isCode(error, "EEXIST"))
        throw error;
      const info = await stat3(path).catch(() => null);
      if (!info || Date.now() - info.mtimeMs < TAKEOVER_LEASE_MS)
        return null;
      expired.push(path);
    }
  }
}
async function releaseClaim(claim) {
  for (const path of [claim.path, ...claim.expired])
    await rm6(path, { force: true });
}
var windowUrl = (port, code) => `http://127.0.0.1:${port}/#code=${code}`;
function openUrl(url) {
  const [command, args] = process.platform === "darwin" ? ["open", [url]] : process.platform === "win32" ? ["cmd", ["/c", "start", "", url]] : ["xdg-open", [url]];
  const child = spawn2(command, args, { detached: true, stdio: "ignore", windowsHide: true });
  child.on("error", () => {});
  child.unref();
}
function alive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return isCode(error, "EPERM");
  }
}
async function acquireLock(paths, token = randomUUID3()) {
  const temporary = `${paths.lock}.${token}.tmp`;
  await writePrivate(temporary, JSON.stringify({ pid: process.pid, token }));
  try {
    for (let tries = 0;tries < 2; tries++) {
      try {
        await link3(temporary, paths.lock);
        return true;
      } catch (error) {
        if (!isCode(error, "EEXIST"))
          throw error;
      }
      const claim = await claimLock(paths);
      if (!claim)
        return false;
      try {
        const current = await stat3(paths.lock).catch(() => null);
        if (!current || current.dev !== claim.dev || current.ino !== claim.ino)
          continue;
        const lock = await readLock(paths);
        if (lock === null || alive(lock.pid)) {
          if (Date.now() - current.mtimeMs < LOCK_GRACE_MS || await controlHelper({ v: 1, control: "status" }, { timeoutMs: 1000, paths }) !== null)
            return false;
        }
        const latest = await stat3(paths.lock).catch(() => null);
        const lease = await stat3(claim.path).catch(() => null);
        if (!lease || Date.now() - lease.mtimeMs >= TAKEOVER_LEASE_MS)
          return false;
        if (!latest || latest.dev !== claim.dev || latest.ino !== claim.ino)
          continue;
        await rm6(paths.lock, { force: true });
        try {
          await link3(temporary, paths.lock);
          return true;
        } catch (error) {
          if (!isCode(error, "EEXIST"))
            throw error;
          return false;
        }
      } finally {
        await releaseClaim(claim);
      }
    }
    return false;
  } finally {
    await rm6(temporary, { force: true });
  }
}
async function startHelper(options = {}) {
  const paths = options.paths ?? homePaths();
  const install = options.install ?? installPaths();
  const now = options.now ?? Date.now;
  const fetcher = options.fetcher ?? fetch;
  const opener = options.opener ?? openUrl;
  await ensureHome(paths);
  const token = randomUUID3();
  if (!await acquireLock(paths, token))
    return null;
  let window = null;
  let channel = null;
  const close = async (drain) => {
    await channel?.close().catch(() => {});
    await window?.close().catch(() => {});
    await drain?.();
    const claim = await ownsLock(paths, token) ? await claimLock(paths) : null;
    if (!claim)
      return;
    try {
      if (await ownsLock(paths, token)) {
        await channel?.close({ unpublish: true }).catch(() => {});
        await rm6(paths.helper, { force: true });
        await rm6(paths.lock, { force: true });
      }
    } finally {
      await releaseClaim(claim);
    }
  };
  try {
    const loaded = await loadData(install, paths, fetcher);
    if (!await ownsLock(paths, token))
      return null;
    const manager = await RunManager.load({
      paths,
      data: loaded.data,
      now,
      broadcast: (message) => window?.broadcast(message),
      firstRunToday: () => {
        if (window && window.clients() === 0)
          opener(windowUrl(window.port, window.mintCode()));
      }
    });
    if (!await ownsLock(paths, token))
      return null;
    const server = await startWindowServer({ install, manager, looks: lookCache(paths, loaded.data, fetcher), agents: options.agents ?? setupStatus, now }, options.httpPort);
    window = server;
    const stopped = Promise.withResolvers();
    let stopping = null;
    const stop = () => {
      stopping ??= (async () => {
        clearInterval(timer);
        await close(() => manager.idle());
        stopped.resolve();
      })();
      return stopping;
    };
    const control = async (request) => {
      switch (request.control) {
        case "status":
          return { ok: true, status: {
            pid: process.pid,
            port: server.port,
            dataVersion: loaded.data.builtAt,
            dataSource: loaded.source,
            runs: manager.views().map((run) => ({ id: run.id, agent: run.agent, class: run.state.class, wave: run.state.wave }))
          } };
        case "code":
          return { ok: true, code: server.mintCode(), port: server.port };
        case "stop":
          setImmediate(() => void stop());
          return { ok: true };
        case "settings":
          return { ok: true, settings: await manager.updateSettings(request.settings) };
      }
    };
    channel = await startChannel(paths, options.mode ?? channelMode(paths), { events: (request) => manager.ingest(request), control }, () => ownsLock(paths, token));
    if (!await ownsLock(paths, token)) {
      await close();
      return null;
    }
    await writePrivate(paths.helper, JSON.stringify({ pid: process.pid, port: server.port, channelPort: channel.port }));
    const tick = async () => {
      if (!await ownsLock(paths, token)) {
        await stop();
        return;
      }
      await manager.sweep();
      if (server.clients() === 0 && now() - manager.lastActivity >= TIMINGS.helperIdleExitMs)
        await stop();
    };
    const timer = setInterval(() => void tick().catch(() => {}), TICK_MS);
    timer.unref();
    await manager.sweep();
    return { manager, window: server, channel, tick, stop, stopped: stopped.promise };
  } catch (error) {
    await close();
    throw error;
  }
}
async function runHelper() {
  const helper = await startHelper();
  if (!helper)
    return;
  const stop = () => void helper.stop();
  process.once("SIGTERM", stop);
  process.once("SIGINT", stop);
  await helper.stopped;
}

// src/expeditions/adapters/claude-code.ts
var CAPS2 = { prompt: true, tools: true, skills: true, subagents: true, compaction: true, toolStart: true, model: true };
var Payload2 = object({
  hook_event_name: string2(),
  session_id: string2().min(1).max(200),
  agent_id: optId,
  agent_type: string2().max(200).optional().catch(undefined),
  source: optString,
  model: optModel,
  effort: optEffort,
  prompt: optPrompt,
  cwd: optLiveString,
  notification_type: optString,
  mcp_server: optLiveString,
  tool_name: optId,
  tool_use_id: optId,
  tool_input: unknown().optional()
});
function normalize2(payload) {
  const parsed = Payload2.safeParse(payload);
  if (!parsed.success)
    return null;
  const p = parsed.data;
  const session = p.session_id;
  const sub = p.agent_id !== undefined;
  switch (p.hook_event_name) {
    case "SessionStart":
      if (p.source === "compact")
        return { session, events: [], wantsGuide: false };
      return {
        session,
        events: [{ kind: "session_start", agent: "claude-code", caps: CAPS2, model: p.model ?? null, effort: p.effort?.level ?? null }],
        wantsGuide: false,
        live: sub ? undefined : { phase: "waiting", project: projectName(p.cwd) }
      };
    case "UserPromptSubmit":
      return { session, events: [{ kind: "prompt" }], prompt: p.prompt, wantsGuide: true, live: sub ? undefined : { phase: "working", project: projectName(p.cwd) } };
    case "PreToolUse":
    case "PermissionRequest":
    case "PostToolUse":
    case "PostToolUseFailure": {
      if (p.tool_name === undefined)
        return null;
      const call = p.tool_name.startsWith("mcp__") ? { tool: "mcp", match: mcpServer(p.tool_name, CLAUDE_BUILTIN_MCP) } : toolCall(CLAUDE_TOOLS, p.tool_name, p.tool_input);
      const step = stepFor(call, p.tool_name, p.tool_input, p.mcp_server);
      if (p.hook_event_name === "PermissionRequest") {
        return { session, events: [], wantsGuide: false, live: { phase: "approval", step, ...sub ? { scope: "sub", actor: p.agent_id } : {} } };
      }
      if (p.hook_event_name === "PreToolUse") {
        return { session, events: [{ kind: "tool_start", tool: call.tool, sub: p.agent_id }], wantsGuide: false, live: sub ? undefined : { phase: "tool", step, call: p.tool_use_id } };
      }
      return {
        session,
        events: [{
          kind: "tool",
          tool: call.tool,
          ok: p.hook_event_name === "PostToolUse",
          spell: null,
          match: call.match,
          sub: p.agent_id,
          dedupe: p.tool_use_id
        }],
        wantsGuide: false,
        live: { phase: "working", step, call: p.tool_use_id, ...sub ? { scope: "sub", actor: p.agent_id } : {} }
      };
    }
    case "Notification":
      if (p.notification_type === "permission_prompt") {
        return { session, events: [], wantsGuide: false, live: { phase: "approval", ...sub ? { scope: "sub", actor: p.agent_id } : {} } };
      }
      return p.notification_type === "idle_prompt" && !sub ? { session, events: [], wantsGuide: false, live: { phase: "waiting" } } : null;
    case "PreCompact":
      return { session, events: [], wantsGuide: false, live: sub ? undefined : { phase: "compacting" } };
    case "SubagentStart":
    case "SubagentStop":
      if (p.agent_id === undefined || !p.agent_type)
        return { session, events: [], wantsGuide: false };
      return {
        session,
        events: [p.hook_event_name === "SubagentStart" ? { kind: "subagent_start", sub: p.agent_id } : { kind: "subagent_end", ok: true, sub: p.agent_id }],
        wantsGuide: false,
        live: { phase: "working" }
      };
    case "PostCompact":
      return { session, events: [{ kind: "compaction" }], wantsGuide: false, live: sub ? undefined : { phase: "working" } };
    case "Stop":
      return { session, events: [{ kind: "turn_end" }], wantsGuide: false, live: sub ? undefined : { phase: "waiting" } };
    case "StopFailure":
      return { session, events: [{ kind: "mishap" }], wantsGuide: false, live: sub ? undefined : { phase: "waiting" } };
    case "SessionEnd":
      return { session, events: [{ kind: "session_end", reason: "agent" }], wantsGuide: false };
    default:
      return null;
  }
}

// src/expeditions/adapters/codex.ts
var CAPS3 = { prompt: true, tools: true, skills: true, subagents: true, compaction: true, toolStart: true, model: true };
var Payload3 = object({
  hook_event_name: string2(),
  session_id: string2().min(1).max(200),
  agent_id: optId,
  agent_type: optString,
  source: optString,
  model: optModel,
  prompt: optPrompt,
  cwd: optLiveString,
  tool_name: optId,
  tool_use_id: optId,
  tool_input: unknown().optional(),
  tool_response: unknown().optional()
});
var McpResult = object({
  isError: boolean2().optional().catch(undefined),
  is_error: boolean2().optional().catch(undefined)
}).catch({});
function normalize3(payload) {
  const parsed = Payload3.safeParse(payload);
  if (!parsed.success)
    return null;
  const p = parsed.data;
  const session = p.session_id;
  switch (p.hook_event_name) {
    case "SessionStart":
      if (p.source === "compact")
        return { session, events: [], wantsGuide: false };
      return {
        session,
        events: [{ kind: "session_start", agent: "codex", caps: CAPS3, model: p.model ?? null, effort: null }],
        wantsGuide: false,
        live: { phase: "waiting", project: projectName(p.cwd) }
      };
    case "UserPromptSubmit":
      if (p.agent_id !== undefined)
        return { session, events: [], wantsGuide: false };
      return { session, events: [{ kind: "prompt" }], prompt: p.prompt, wantsGuide: true, live: { phase: "working", project: projectName(p.cwd) } };
    case "PreToolUse":
    case "PermissionRequest":
    case "PostToolUse": {
      if (p.tool_name === undefined)
        return null;
      const mcp = p.tool_name.startsWith("mcp__");
      const call = mcp ? { tool: "mcp", match: mcpServer(p.tool_name, CODEX_BUILTIN_MCP) } : toolCall(CODEX_TOOLS, p.tool_name, p.tool_input);
      const step = stepFor(call, p.tool_name, p.tool_input);
      if (p.hook_event_name === "PermissionRequest") {
        return { session, events: [], wantsGuide: false, live: { phase: "approval", step } };
      }
      if (p.hook_event_name === "PreToolUse") {
        return { session, events: [{ kind: "tool_start", tool: call.tool, sub: p.agent_id }], wantsGuide: false, live: { phase: "tool", step, call: p.tool_use_id } };
      }
      const result = mcp ? McpResult.parse(p.tool_response) : {};
      return {
        session,
        events: [{
          kind: "tool",
          tool: call.tool,
          ok: result.isError !== true && result.is_error !== true,
          spell: null,
          match: call.match,
          sub: p.agent_id,
          dedupe: p.tool_use_id
        }],
        wantsGuide: false,
        live: { phase: "working", step, call: p.tool_use_id }
      };
    }
    case "SubagentStart":
    case "SubagentStop":
      if (p.agent_id === undefined)
        return { session, events: [], wantsGuide: false };
      return {
        session,
        events: [p.hook_event_name === "SubagentStart" ? { kind: "subagent_start", sub: p.agent_id } : { kind: "subagent_end", ok: true, sub: p.agent_id }],
        wantsGuide: false,
        live: { phase: "working" }
      };
    case "PostCompact":
      return { session, events: [{ kind: "compaction" }], wantsGuide: false, live: { phase: "working" } };
    case "Stop":
      return { session, events: [{ kind: "turn_end" }], wantsGuide: false, live: { phase: "waiting" } };
    case "SessionEnd":
      return { session, events: [{ kind: "session_end", reason: "agent" }], wantsGuide: false };
    default:
      return null;
  }
}

// src/expeditions/adapters/gemini.ts
var CAPS4 = { prompt: true, tools: true, skills: true, subagents: false, compaction: true, toolStart: false, model: false };
var Payload4 = object({
  hook_event_name: string2(),
  session_id: string2().min(1).max(200),
  source: optString,
  prompt: optPrompt,
  cwd: optLiveString,
  tool_name: string2().min(1).max(200).optional().catch(undefined),
  tool_input: unknown().optional(),
  tool_response: object({
    error: unknown().optional(),
    llmContent: union([string2(), array(object({ text: string2().optional().catch(undefined) }).catch({}))]).optional().catch(undefined)
  }).catch({ error: undefined }),
  mcp_context: object({ server_name: string2() }).optional().catch(undefined)
});
function normalize4(payload) {
  const parsed = Payload4.safeParse(payload);
  if (!parsed.success)
    return null;
  const p = parsed.data;
  const session = p.session_id;
  switch (p.hook_event_name) {
    case "SessionStart":
      return { session, events: [{ kind: "session_start", agent: "gemini", caps: CAPS4, model: null, effort: null }], wantsGuide: false, live: { phase: "waiting", project: projectName(p.cwd) } };
    case "BeforeAgent":
      return { session, events: [{ kind: "prompt" }], prompt: p.prompt, wantsGuide: false, live: { phase: "working" } };
    case "AfterTool": {
      if (p.tool_name === undefined)
        return null;
      const call = p.mcp_context === undefined ? toolCall(GEMINI_TOOLS, p.tool_name, p.tool_input) : { tool: "mcp", match: rawId("mcp", p.mcp_context.server_name) };
      const { error, llmContent } = p.tool_response;
      const text = typeof llmContent === "string" ? llmContent : (llmContent ?? []).map((part) => part.text ?? "").join(`
`);
      const exit = p.tool_name === "run_shell_command" ? /^Exit Code: (-?\d+)\s*$/m.exec(text)?.[1] : undefined;
      return {
        session,
        events: [{ kind: "tool", tool: call.tool, ok: (error === undefined || error === null) && (exit === undefined || Number(exit) === 0), spell: null, match: call.match }],
        wantsGuide: false,
        live: { phase: "working", step: stepFor(call, p.tool_name, p.tool_input, p.mcp_context?.server_name) }
      };
    }
    case "AfterAgent":
      return { session, events: [{ kind: "turn_end" }], wantsGuide: false, live: { phase: "waiting" } };
    case "PreCompress":
      return { session, events: [{ kind: "compaction" }], wantsGuide: false, live: { phase: "compacting" } };
    case "SessionEnd":
      return { session, events: [{ kind: "session_end", reason: "agent" }], wantsGuide: false };
    default:
      return null;
  }
}

// src/expeditions/hook.ts
var HOOK_STDIN_LIMIT = 1024 * 1024;
var ADAPTERS = { "claude-code": exports_claude_code, codex: exports_codex, gemini: exports_gemini, generic: exports_generic };
var LIVE = {
  routeKey,
  sendToHelper,
  now: Date.now,
  guideOn: async () => {
    const paths = homePaths();
    await ensureClientHome(paths);
    return (await loadSettings(paths)).guide;
  }
};
async function readHookStdin(stream) {
  const chunks = [];
  let size = 0;
  for await (const chunk of stream) {
    const bytes = typeof chunk === "string" ? Buffer.from(chunk) : chunk;
    size += bytes.length;
    if (size <= HOOK_STDIN_LIMIT)
      chunks.push(bytes);
  }
  return size > HOOK_STDIN_LIMIT ? "" : Buffer.concat(chunks).toString("utf8");
}
async function forward(agent, caps, result, deps, at) {
  const session = result.session;
  if (session === null || result.events.length === 0 && result.live === undefined)
    return null;
  const opaque = new Map;
  const hash = (id) => {
    if (id === undefined)
      return;
    const known = opaque.get(id) ?? deps.routeKey(agent, `${session}/${id}`);
    opaque.set(id, known);
    return known;
  };
  const events = [];
  for (const event of result.events)
    events.push({ ...event, sub: await hash(event.sub), dedupe: await hash(event.dedupe) });
  const guide = result.wantsGuide && result.events.some((event) => event.kind === "prompt") && await deps.guideOn();
  const request = {
    v: CHANNEL_VERSION,
    agent,
    route: await deps.routeKey(agent, session),
    caps,
    events,
    prompt: result.prompt,
    reply: guide ? "guide" : undefined,
    live: result.live === undefined ? undefined : { ...result.live, actor: await hash(result.live.actor), call: await hash(result.live.call), at }
  };
  const start = result.events.some((event) => event.kind !== "session_end");
  const response = await deps.sendToHelper(request, { start, timeoutMs: TIMINGS.hookTimeoutMs + (guide ? TIMINGS.guideReplyMs : 0) });
  return guide && typeof response?.guide === "string" && response.guide.length > 0 ? response.guide : null;
}
async function runHook(agent, stdin, deps = LIVE, startedAt) {
  const silent = agent === "gemini" ? "{}" : "";
  try {
    const at = startedAt ?? deps.now();
    const adapter = ADAPTERS[agent];
    if (adapter === undefined || stdin.length === 0 || Buffer.byteLength(stdin) > HOOK_STDIN_LIMIT)
      return silent;
    const result = adapter.normalize(JSON.parse(stdin));
    if (result === null)
      return silent;
    const note = await forward(agent, adapter.CAPS, result, deps, at);
    return note === null ? silent : JSON.stringify({ hookSpecificOutput: { hookEventName: "UserPromptSubmit", additionalContext: note } });
  } catch {
    return silent;
  }
}
async function runMark(mark, opts = {}, deps = LIVE) {
  const at = deps.now();
  const result = normalize({ mark, class: opts.class, session: opts.session ?? process.env.EXPEDITIONS_SESSION ?? process.cwd(), cwd: process.cwd() });
  if (result === null)
    return 1;
  try {
    await forward("generic", CAPS, result, deps, at);
  } catch {}
  return 0;
}

// src/expeditions/cli.ts
var NODE_MAJOR = 22;
var HELP = `Usage: expeditions <command>
  start                         Start the helper if needed and open the window
  open                          Open the window of a running helper
  stop                          Stop the helper
  status                        Show the helper, open expeditions and agent setup
  setup [--agent omp|gemini|all] [--yes]
  uninstall [--agent omp|gemini|all] [--yes]
  update                        How to update this install; re-runs setup for set-up agents
  guide on|off                  Guide mode: one short note on a session's first prompt, only where trials found a spell that helped
  mark start|progress|done [--class <slug>]`;
var out = (line) => console.log(line);
var err = (line) => console.error(line);
var HOOK_AGENTS = EXP_AGENTS.filter((agent) => agent !== "manual");
function agentOption(args) {
  const { values, positionals } = parseArgs({ args, allowPositionals: true, options: { agent: { type: "string", default: "all" }, yes: { type: "boolean", default: false } } });
  const agent = values.agent;
  if (positionals.length || agent !== "omp" && agent !== "gemini" && agent !== "all")
    return null;
  return { agent, yes: values.yes };
}
async function openWindow(start) {
  const answer = await controlHelper({ v: 1, control: "code" }, { start, timeoutMs: start ? 8000 : 2000 });
  if (!answer?.ok || answer.code === undefined || answer.port === undefined) {
    err(start ? "The helper didn't start. Run `expeditions helper` to see why." : "Expeditions isn't running. Run `expeditions start`.");
    return 1;
  }
  const url = windowUrl(answer.port, answer.code);
  openUrl(url);
  out(`Opening the Expeditions window. If no browser opens, visit this link within two minutes (it works once):
${url}`);
  return 0;
}
async function main(argv) {
  const [command, ...args] = argv;
  const major = Number.parseInt(process.versions.node.split(".")[0] ?? "0", 10);
  if (major < NODE_MAJOR) {
    if (command === "hook")
      return 0;
    err(`Expeditions needs Node ${NODE_MAJOR} or newer; found Node ${process.versions.node}.`);
    return 1;
  }
  switch (command) {
    case "hook": {
      const at = Date.now();
      try {
        const agent = HOOK_AGENTS.find((item) => item === args[0]);
        const text = agent === undefined ? "" : await runHook(agent, await readHookStdin(process.stdin), undefined, at);
        if (text) {
          const written = Promise.withResolvers();
          process.stdout.write(text, () => written.resolve());
          await written.promise;
        }
      } catch {}
      return 0;
    }
    case "helper":
      await runHelper();
      return 0;
    case "start":
      return openWindow(true);
    case "open":
      return openWindow(false);
    case "stop": {
      const answer = await controlHelper({ v: 1, control: "stop" }, { timeoutMs: 2000 });
      out(answer?.ok ? "Expeditions stopped. Open expeditions stay open and continue next time." : "Expeditions isn't running.");
      return 0;
    }
    case "status": {
      const answer = await controlHelper({ v: 1, control: "status" }, { timeoutMs: 2000 });
      const status = answer?.status;
      if (!status)
        out("Helper: not running");
      else {
        out(`Helper: running at http://127.0.0.1:${status.port}/ (process ${status.pid})`);
        out(`Content: built ${status.dataVersion} (${status.dataSource})`);
        out(`Open expeditions: ${status.runs.length}`);
        for (const run of status.runs)
          out(`  ${run.agent}: ${run.class ?? "no class yet"}, wave ${run.wave}`);
      }
      for (const agent of await setupStatus())
        out(`${agent.agent}: ${agent.status}${agent.detail ? ` (${agent.detail})` : ""}`);
      return 0;
    }
    case "setup":
    case "uninstall": {
      const options = agentOption(args);
      if (!options) {
        err(`Usage: expeditions ${command} [--agent omp|gemini|all] [--yes]`);
        return 1;
      }
      return (command === "setup" ? setup : uninstall)({ ...options, log: out });
    }
    case "update": {
      const { root } = installPaths();
      if (existsSync3(join7(root, ".git")))
        out(`This install is a clone of the plugin repository. To update it, run \`git pull\` in ${root}, then \`expeditions update\` again.`);
      else
        out("Claude Code: run /plugin update expeditions. Codex: update Expeditions from its marketplace, then approve its hooks again in /hooks. Updates never happen in the background.");
      let code = 0;
      for (const agent of await setupStatus()) {
        if ((agent.agent === "omp" || agent.agent === "gemini") && agent.status !== "not set up") {
          out(`Refreshing ${agent.agent} setup from this install.`);
          code = Math.max(code, await setup({ agent: agent.agent, yes: true, log: out }));
        }
      }
      return code;
    }
    case "guide": {
      const value = args[0];
      if (args.length !== 1 || value !== "on" && value !== "off") {
        err("Usage: expeditions guide on|off");
        return 1;
      }
      const guide = value === "on";
      const answer = await controlHelper({ v: 1, control: "settings", settings: { guide } }, { timeoutMs: 2000 });
      if (!answer?.ok) {
        const paths = homePaths();
        await ensureHome(paths);
        await saveSettings(paths, { ...await loadSettings(paths), guide });
      }
      out(guide ? "Guide mode is on. On a session's first prompt, Claude Code and Codex get one short note, only for classes where trials found a spell that helped." : "Guide mode is off. Hooks add nothing to the conversation.");
      return 0;
    }
    case "mark": {
      const { values, positionals } = parseArgs({ args, allowPositionals: true, options: { class: { type: "string" } } });
      const mark = MARKS.find((item) => item === positionals[0]);
      if (mark === undefined || positionals.length !== 1) {
        err("Usage: expeditions mark start|progress|done [--class <slug>]");
        return 1;
      }
      const code = await runMark(mark, { class: values.class });
      if (code !== 0)
        err("Usage: expeditions mark start|progress|done [--class <slug>]. A class is a lowercase slug such as testing-debugging.");
      return code;
    }
    case undefined:
    case "help":
    case "--help":
    case "-h":
      out(HELP);
      return 0;
  }
  err(`Unknown command: ${command}
${HELP}`);
  return 1;
}
var entry = process.argv[1];
if (entry && realpathSync3(entry) === realpathSync3(fileURLToPath3(import.meta.url)))
  process.exitCode = await main(process.argv.slice(2));
export {
  main
};
