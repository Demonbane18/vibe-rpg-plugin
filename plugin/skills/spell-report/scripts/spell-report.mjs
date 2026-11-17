#!/usr/bin/env node
// Generated from src/plugin/cli.ts; spell-report 0.7.3. Rebuild with bun run build:plugin.
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

// node_modules/zod/v4/classic/coerce.js
var exports_coerce = {};
__export(exports_coerce, {
  bigint: () => bigint2,
  boolean: () => boolean3,
  date: () => date2,
  number: () => number3,
  string: () => string3
});

// src/plugin/cli.ts
import { spawn as spawn3 } from "node:child_process";
import { constants as constants4 } from "node:fs";
import { access, lstat as lstat4, mkdir as mkdir7, open as open3, readFile as readFile8, writeFile as writeFile6 } from "node:fs/promises";
import { homedir as homedir4 } from "node:os";
import { basename as basename3, dirname as dirname5, extname, join as join11, resolve as resolve4, sep as sep4 } from "node:path";
import { createInterface as createInterface2 } from "node:readline/promises";
import { fileURLToPath } from "node:url";
import { parseArgs as parseArgs2 } from "node:util";

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
var bigint = /^-?\d+n?$/;
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
var $ZodBigInt = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = bigint;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = BigInt(payload.value);
      } catch (_) {}
    if (typeof payload.value === "bigint")
      return payload;
    payload.issues.push({
      expected: "bigint",
      code: "invalid_type",
      input: payload.value,
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
var $ZodDate = /* @__PURE__ */ $constructor("$ZodDate", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce) {
      try {
        payload.value = new Date(payload.value);
      } catch (_err) {}
    }
    const input = payload.value;
    const isDate = input instanceof Date;
    const isValidDate = isDate && !Number.isNaN(input.getTime());
    if (isValidDate)
      return payload;
    payload.issues.push({
      expected: "date",
      code: "invalid_type",
      input,
      ...isDate ? { received: "Invalid Date" } : {},
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
var $ZodTuple = /* @__PURE__ */ $constructor("$ZodTuple", (inst, def) => {
  $ZodType.init(inst, def);
  const items = def.items;
  const memo = globalConfig.memoizer;
  memo?.attach(inst);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        input,
        inst,
        expected: "tuple",
        code: "invalid_type"
      });
      return payload;
    }
    payload.value = memo ? memo.alloc(inst, payload, [], ctx) : [];
    const proms = [];
    const optinStart = getTupleOptStart(items, "optin");
    const optoutStart = getTupleOptStart(items, "optout");
    if (!def.rest) {
      if (input.length < optinStart) {
        payload.issues.push({
          code: "too_small",
          minimum: optinStart,
          inclusive: true,
          input,
          inst,
          origin: "array"
        });
        return payload;
      }
      if (input.length > items.length) {
        payload.issues.push({
          code: "too_big",
          maximum: items.length,
          inclusive: true,
          input,
          inst,
          origin: "array"
        });
      }
    }
    const itemResults = new Array(items.length);
    const abortEarly = def.rest ? ctx?.abortEarly : undefined;
    let itemAborted = false;
    for (let i = 0;i < items.length; i++) {
      const r = items[i]._zod.run({ value: input[i], issues: [] }, ctx);
      if (r instanceof Promise) {
        proms.push(r.then((rr) => {
          itemResults[i] = rr;
        }));
      } else {
        itemResults[i] = r;
        if (abortEarly && !itemAborted && r.issues.length)
          itemAborted = aborted(r);
      }
    }
    if (def.rest && !itemAborted) {
      let i = items.length - 1;
      const rest = input.slice(items.length);
      let seen = payload.issues.length;
      for (const el of rest) {
        if (abortEarly && payload.issues.length !== seen) {
          if (aborted(payload, seen))
            break;
          seen = payload.issues.length;
        }
        i++;
        const result = def.rest._zod.run({ value: el, issues: [] }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((r) => handleTupleResult(r, payload, i)));
        } else {
          handleTupleResult(result, payload, i);
        }
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => handleTupleResults(itemResults, payload, items, input, optoutStart));
    }
    return handleTupleResults(itemResults, payload, items, input, optoutStart);
  };
});
function getTupleOptStart(items, key) {
  for (let i = items.length - 1;i >= 0; i--) {
    const omittable = key === "optin" ? items[i]._zod.optin !== undefined : items[i]._zod.optout === "optional";
    if (!omittable)
      return i + 1;
  }
  return 0;
}
function handleTupleResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
function handleTupleResults(itemResults, final, items, input, optoutStart) {
  for (let i = 0;i < items.length; i++) {
    const r = itemResults[i];
    const isPresent = i < input.length;
    if (!isPresent && i >= optoutStart && items[i]._zod.optin === "optional") {
      final.value.length = i;
      break;
    }
    if (r.issues.length) {
      if (!isPresent && i >= optoutStart) {
        final.value.length = i;
        break;
      }
      final.issues.push(...prefixIssues(i, r.issues));
    }
    final.value[i] = r.value;
  }
  for (let i = final.value.length - 1;i >= input.length; i--) {
    if (items[i]._zod.optout === "optional" && final.value[i] === undefined) {
      final.value.length = i;
    } else {
      break;
    }
  }
  return final;
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
function _coercedString(Class, params) {
  return new Class(snapshotChecks({ type: "string", coerce: true, ...normalizeParams(params) }));
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
function _coercedNumber(Class, params) {
  return new Class(snapshotChecks({ type: "number", coerce: true, checks: [], ...normalizeParams(params) }));
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
function _coercedBoolean(Class, params) {
  return new Class({
    type: "boolean",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _coercedBigint(Class, params) {
  return new Class({
    type: "bigint",
    coerce: true,
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
function _coercedDate(Class, params) {
  return new Class({
    type: "date",
    coerce: true,
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
var bigintProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "BigInt cannot be represented in JSON Schema");
};
var neverProcessor = (_schema, _ctx, json, _params) => {
  json.not = {};
};
var unknownProcessor = (_schema, _ctx, _json, _params) => {};
var dateProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Date cannot be represented in JSON Schema");
};
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
var tupleProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  json.type = "array";
  const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
  const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
  const prefixItems = def.items.map((x, i) => processSchema(x, ctx, {
    ...params,
    path: [...params.path, prefixPath, i]
  }));
  const rest = def.rest ? processSchema(def.rest, ctx, {
    ...params,
    path: [...params.path, restPath, ...ctx.target === "openapi-3.0" ? [def.items.length] : []]
  }) : null;
  let minItems = def.items.length;
  while (minItems > 0) {
    const item = def.items[minItems - 1];
    const optional = ctx.io === "input" ? inputOptin(item) !== undefined : item._zod.optout === "optional";
    if (!optional)
      break;
    minItems--;
  }
  const maxItems = def.items.length;
  const isClosed = !def.rest;
  if (ctx.target === "draft-2020-12") {
    json.prefixItems = prefixItems;
    if (isClosed) {
      json.items = false;
    } else if (rest) {
      json.items = rest;
    }
    if (minItems > 0)
      json.minItems = minItems;
    if (isClosed)
      json.maxItems = maxItems;
  } else if (ctx.target === "openapi-3.0") {
    json.items = {
      anyOf: prefixItems
    };
    if (rest) {
      json.items.anyOf.push(rest);
    }
    if (minItems > 0)
      json.minItems = minItems;
    if (isClosed)
      json.maxItems = maxItems;
  } else {
    json.items = prefixItems;
    if (isClosed) {
      json.additionalItems = false;
    } else if (rest) {
      json.additionalItems = rest;
    }
    if (minItems > 0)
      json.minItems = minItems;
    if (isClosed)
      json.maxItems = maxItems;
  }
  const { minimum, maximum } = aggregateChecks(schema);
  if (typeof minimum === "number")
    json.minItems = minimum;
  if (typeof maximum === "number")
    json.maxItems = maximum;
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
var ZodError = /* @__PURE__ */ $constructor("ZodError", initializer2);
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
function email2(params) {
  return _email(ZodEmail, params);
}
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
var ZodBigInt = /* @__PURE__ */ $constructor("ZodBigInt", (inst, def) => {
  $ZodBigInt.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => bigintProcessor(inst, ctx, json, params);
}, /* @__PURE__ */ derived({
  minValue: (inst) => aggregateChecks(inst).minimum ?? null,
  maxValue: (inst) => aggregateChecks(inst).maximum ?? null,
  format: (inst) => aggregateChecks(inst).format ?? null
}, {
  gte(value, params) {
    return this.check(_gte(value, params));
  },
  min(value, params) {
    return this.check(_gte(value, params));
  },
  gt(value, params) {
    return this.check(_gt(value, params));
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
  positive(params) {
    return this.check(_gt(BigInt(0), params));
  },
  negative(params) {
    return this.check(_lt(BigInt(0), params));
  },
  nonpositive(params) {
    return this.check(_lte(BigInt(0), params));
  },
  nonnegative(params) {
    return this.check(_gte(BigInt(0), params));
  },
  multipleOf(value, params) {
    return this.check(_multipleOf(value, params));
  }
}));
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
var ZodDate = /* @__PURE__ */ $constructor("ZodDate", (inst, def) => {
  $ZodDate.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => dateProcessor(inst, ctx, json, params);
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
}, /* @__PURE__ */ derived({
  minDate: (inst) => {
    const { minimum } = aggregateChecks(inst);
    return minimum ? new Date(minimum) : null;
  },
  maxDate: (inst) => {
    const { maximum } = aggregateChecks(inst);
    return maximum ? new Date(maximum) : null;
  }
}, {}));
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
var ZodTuple = /* @__PURE__ */ $constructor("ZodTuple", (inst, def) => {
  _ensureDefaultMemoizer();
  $ZodTuple.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => tupleProcessor(inst, ctx, json, params);
}, {
  rest(rest) {
    return this.clone({
      ...this._zod.def,
      rest
    });
  },
  partial() {
    const def = this._zod.def;
    if (def.checks?.length)
      throw new Error(".partial() cannot be used on tuple schemas containing refinements");
    return this.clone({
      ...def,
      items: def.items.map((item) => new ZodOptional({ type: "optional", innerType: item }))
    });
  }
});
function tuple(items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new ZodTuple({
    type: "tuple",
    items,
    rest,
    ...normalizeParams(params)
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
// node_modules/zod/v4/classic/coerce.js
function string3(params) {
  return _coercedString(ZodString, params);
}
function number3(params) {
  return _coercedNumber(ZodNumber, params);
}
function boolean3(params) {
  return _coercedBoolean(ZodBoolean, params);
}
function bigint2(params) {
  return _coercedBigint(ZodBigInt, params);
}
function date2(params) {
  return _coercedDate(ZodDate, params);
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
var SINGLE_LINE = /^[^\r\n\u0085\u2028\u2029]*$/;
function toBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes)
    binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

// src/shared/looks.ts
var ICON_BASES = [
  { id: "scroll", name: "Scroll", kind: "skill" },
  { id: "tome", name: "Tome", kind: "skill" },
  { id: "tablet", name: "Rune tablet", kind: "skill" },
  { id: "letter", name: "Sealed letter", kind: "skill" },
  { id: "talisman", name: "Talisman", kind: "skill" },
  { id: "medallion", name: "Medallion", kind: "plugin" },
  { id: "amulet", name: "Amulet", kind: "plugin" },
  { id: "crown", name: "Crown", kind: "plugin" },
  { id: "chalice", name: "Chalice", kind: "plugin" },
  { id: "ring", name: "Ring", kind: "plugin" },
  { id: "orb", name: "Orb", kind: "mcp_server" },
  { id: "crystal", name: "Crystal", kind: "mcp_server" },
  { id: "lantern", name: "Lantern", kind: "mcp_server" },
  { id: "mirror", name: "Mirror", kind: "mcp_server" },
  { id: "key", name: "Key", kind: "mcp_server" },
  { id: "owl", name: "Owl", kind: "subagent" },
  { id: "fox", name: "Fox", kind: "subagent" },
  { id: "beaver", name: "Beaver", kind: "subagent" },
  { id: "hedgehog", name: "Hedgehog", kind: "subagent" },
  { id: "tortoise", name: "Tortoise", kind: "subagent" }
];
var PALETTES = [
  { id: "ember", name: "Ember", primary: ["#6e2727", "#b33831", "#ea4f36", "#f57d4a"], accent: ["#f79617", "#f9c22b", "#fbff86"] },
  { id: "frost", name: "Frost", primary: ["#484a77", "#4d65b4", "#4d9be6", "#8fd3ff"], accent: ["#9babb2", "#c7dcd0", "#ffffff"] },
  { id: "verdant", name: "Verdant", primary: ["#165a4c", "#239063", "#1ebc73", "#91db69"], accent: ["#a2a947", "#d5e04b", "#fbff86"] },
  { id: "royal", name: "Royal", primary: ["#45293f", "#6b3e75", "#905ea9", "#a884f3"], accent: ["#f79617", "#f9c22b", "#fbff86"] },
  { id: "gilded", name: "Gilded", primary: ["#cd683d", "#f79617", "#f9c22b", "#fbff86"], accent: ["#4d65b4", "#4d9be6", "#8fd3ff"] },
  { id: "shadow", name: "Shadow", primary: ["#2e222f", "#3e3546", "#625565", "#7f708a"], accent: ["#c32454", "#f04f78", "#f68181"] },
  { id: "coral", name: "Coral", primary: ["#7a3045", "#cf657f", "#fca790", "#fdcbb0"], accent: ["#0b8a8f", "#0eaf9b", "#30e1b9"] },
  { id: "tide", name: "Tide", primary: ["#0b5e65", "#0b8a8f", "#0eaf9b", "#30e1b9"], accent: ["#cd683d", "#e6904e", "#fbb954"] },
  { id: "rose", name: "Rose", primary: ["#831c5d", "#c32454", "#f04f78", "#f68181"], accent: ["#9babb2", "#c7dcd0", "#ffffff"] },
  { id: "moss", name: "Moss", primary: ["#374e4a", "#547e64", "#92a984", "#b2ba90"], accent: ["#676633", "#a2a947", "#d5e04b"] },
  { id: "storm", name: "Storm", primary: ["#323353", "#484a77", "#9babb2", "#c7dcd0"], accent: ["#4d9be6", "#8fd3ff", "#ffffff"] },
  { id: "rust", name: "Rust", primary: ["#4c3e24", "#7a3045", "#9e4539", "#cd683d"], accent: ["#547e64", "#92a984", "#b2ba90"] },
  { id: "ivory", name: "Ivory", primary: ["#7f708a", "#9babb2", "#c7dcd0", "#ffffff"], accent: ["#f79617", "#f9c22b", "#fbff86"] },
  { id: "plum", name: "Plum", primary: ["#45293f", "#753c54", "#a24b6f", "#cf657f"], accent: ["#905ea9", "#a884f3", "#eaaded"] },
  { id: "sunset", name: "Sunset", primary: ["#6b3e75", "#c32454", "#fb6b1d", "#f9c22b"], accent: ["#4d65b4", "#4d9be6", "#8fd3ff"] },
  { id: "mint", name: "Mint", primary: ["#239063", "#1ebc73", "#30e1b9", "#8ff8e2"], accent: ["#cf657f", "#ed8099", "#fca790"] },
  { id: "ash", name: "Ash", primary: ["#4c3e24", "#966c6c", "#ab947a", "#c7dcd0"], accent: ["#ea4f36", "#f57d4a", "#fbb954"] },
  { id: "crimson", name: "Crimson", primary: ["#45293f", "#6e2727", "#ae2334", "#e83b3b"], accent: ["#f79617", "#f9c22b", "#fbff86"] },
  { id: "amber", name: "Amber", primary: ["#9e4539", "#e6904e", "#fbb954", "#fdcbb0"], accent: ["#165a4c", "#239063", "#1ebc73"] },
  { id: "olive", name: "Olive", primary: ["#4c3e24", "#676633", "#a2a947", "#d5e04b"], accent: ["#cd683d", "#e6904e", "#fbb954"] }
];
function parseLook(look) {
  const [baseId, paletteId, extra] = look.split("-");
  const base = ICON_BASES.find((b) => b.id === baseId);
  const palette = PALETTES.find((p) => p.id === paletteId);
  return base && palette && extra === undefined ? { base, palette } : null;
}

// src/shared/content.ts
var AGENTS = ["claude-code", "codex"];
var KINDS = ["skill", "plugin", "mcp_server", "subagent"];
var TIERS = ["S", "A", "B", "C"];
var BASES = ["documented", "proposed", "curated"];
var SlugSchema = string2().regex(/^[a-z0-9][a-z0-9-]{1,62}$/, "Use 2-63 lowercase letters, digits and hyphens");
var Https = url().startsWith("https://", "Use an https:// link").max(400);
var Day = string2().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");
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
  lastActivity: Day.nullable(),
  verifiedOn: Day,
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
    verifiedOn: Day
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
  effectiveFrom: Day.nullable(),
  effectiveTo: Day.nullable(),
  sourceUrl: Https,
  verifiedOn: Day,
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
var Count = number2().int().nonnegative();
var PopularitySchema = object({
  checkedOn: Day,
  spells: record(SlugSchema, object({
    repo: RepoSchema.nullable(),
    stars: Count.nullable(),
    downloads: object({ registry: _enum(REGISTRIES), package: string2().min(1).max(214), weekly: Count }).nullable()
  })),
  overrides: record(SlugSchema, object({ repo: RepoSchema.nullable().optional(), npm: string2().min(1).max(214).nullable().optional(), pypi: string2().min(1).max(214).nullable().optional() }))
});
var TOOL_TYPES = ["app", "cli", "library", "mcp_server", "model"];
var PLATFORMS = ["macos", "windows", "linux", "web"];
var ToolSchema = object({
  slug: SlugSchema,
  name: string2().min(2).max(80),
  type: _enum(TOOL_TYPES),
  categories: array(SlugSchema).min(1),
  summary: string2().min(10).max(200),
  note: string2().min(10).max(400),
  siteUrl: Https.nullable(),
  repoUrl: Https,
  license: string2().min(2).max(80),
  openSource: boolean2(),
  platforms: array(_enum(PLATFORMS)),
  spell: SlugSchema.nullable(),
  verifiedOn: Day,
  approved: boolean2()
});

// src/shared/media-type.ts
var IMAGE_BRANDS = new Set(["heic", "heix", "hevc", "hevx", "heim", "heis", "mif1", "msf1", "avif", "avis"]);
function sniffMediaType(bytes) {
  const at = (offset, signature) => signature.every((value, i) => bytes[offset + i] === value);
  if (at(0, [137, 80, 78, 71]))
    return { mime: "image/png", ext: "png", kind: "image" };
  if (at(0, [255, 216, 255]))
    return { mime: "image/jpeg", ext: "jpg", kind: "image" };
  if (at(0, [71, 73, 70, 56]))
    return { mime: "image/gif", ext: "gif", kind: "image" };
  if (at(0, [82, 73, 70, 70]) && at(8, [87, 69, 66, 80]))
    return { mime: "image/webp", ext: "webp", kind: "image" };
  if (at(4, [102, 116, 121, 112])) {
    const brand = String.fromCharCode(...bytes.subarray(8, 12));
    return IMAGE_BRANDS.has(brand) ? null : { mime: "video/mp4", ext: "mp4", kind: "video" };
  }
  if (at(0, [26, 69, 223, 163]))
    return { mime: "video/webm", ext: "webm", kind: "video" };
  return null;
}

// src/shared/report-format.ts
var REPORT_FORMAT = "viberpg-spell-report/1";
var REPORT_SECTIONS = [
  "What I used it for",
  "How I tested it",
  "Results",
  "Problems and limits",
  "How to reproduce",
  "Links"
];
var SUBMIT_LIMITS = { reportBytes: 200000, signatureBytes: 1e4, attachments: 6, totalBytes: 4000000 };
var GITHUB_USER = /^[A-Za-z0-9][A-Za-z0-9-]{0,38}$/;

// src/shared/usage.ts
var USAGE_AGENTS = ["codex", "claude-code", "omp"];
var HARNESS_NAMES = { codex: "Codex", "claude-code": "Claude Code", omp: "OMP" };
var HARNESS_VERSION = /^\d{1,4}\.\d{1,4}(?:\.\d{1,6})?(?:-[0-9A-Za-z.-]{1,30})?$/;
function harnessVersion(value) {
  return typeof value === "string" && HARNESS_VERSION.test(value) ? value : null;
}
var Count2 = number2().int().nonnegative();
var ByAgent = partialRecord(_enum(USAGE_AGENTS), Count2);
var ByMonth = record(string2().regex(/^\d{4}-\d{2}$/), Count2);
var TestStatsSchema = object({ sessionsWithFailingTest: Count2, recovered: Count2 });
var HarnessVersionSchema = string2().regex(HARNESS_VERSION);
var VersionsSchema = partialRecord(_enum(USAGE_AGENTS), object({ first: HarnessVersionSchema, last: HarnessVersionSchema }));
var EnvironmentSchema = object({
  os: string2().regex(/^[A-Za-z0-9 ._()-]{1,60}$/).nullable(),
  arch: string2().regex(/^[A-Za-z0-9_]{1,20}$/).nullable(),
  harness: partialRecord(_enum(USAGE_AGENTS), HarnessVersionSchema)
});
function environmentLabel(environment) {
  const system = environment.os ? `${environment.os}${environment.arch ? ` (${environment.arch})` : ""}` : environment.arch ?? "unknown OS";
  const harness = USAGE_AGENTS.flatMap((agent) => environment.harness[agent] ? [`${HARNESS_NAMES[agent]} ${environment.harness[agent]}`] : []);
  return harness.length > 0 ? `${system}; ${harness.join(", ")}` : system;
}
var SkillUsageSchema = object({
  sessions: Count2,
  byAgent: ByAgent,
  byMonth: ByMonth,
  firstUsed: string2().nullable(),
  lastUsed: string2().nullable(),
  partners: array(object({ skill: string2(), sessions: Count2 })),
  tests: TestStatsSchema,
  versions: VersionsSchema
});
var WorkflowUsageSchema = object({
  measurable: boolean2(),
  together: Count2,
  inOrder: Count2,
  tests: TestStatsSchema
});
var PublishedUsageSchema = object({
  generatedAt: string2(),
  window: object({ from: string2().nullable(), to: string2().nullable() }),
  totals: object({ sessions: Count2, byAgent: ByAgent, byMonth: ByMonth }),
  skills: record(string2(), SkillUsageSchema),
  workflows: record(string2(), WorkflowUsageSchema),
  environment: EnvironmentSchema
});

// src/shared/trials.ts
var RANKS = ["apprentice", "journeyman", "master", "grandmaster"];
var RANK_NAMES = { apprentice: "Apprentice", journeyman: "Journeyman", master: "Master", grandmaster: "Grandmaster" };
var FOCUS_LEVELS = ["default", "off", "minimal", "low", "medium", "high", "xhigh", "max"];
var CONTAINMENTS = ["sealed", "warded", "open"];
var LOADOUT_KINDS = ["unarmed", "spell", "workflow", "combo"];
var CASTS = ["invoked", "ambient"];
var Count3 = number2().int().nonnegative();
var Day2 = string2().regex(/^\d{4}-\d{2}-\d{2}$/);
var CommitSchema = string2().regex(/^[0-9a-f]{7,40}$/);
var ScryingFileSchema = string2().regex(/^[0-9a-f]{16}\.png$/);
var CasterSchema = string2().regex(/^[A-Za-z0-9][A-Za-z0-9._:/@[\]-]{0,79}$/);
var LoadoutSchema = object({
  kind: _enum(LOADOUT_KINDS),
  slug: SlugSchema.nullable(),
  spells: array(SlugSchema).max(8),
  refs: record(SlugSchema, CommitSchema)
}).superRefine((loadout, ctx) => {
  const fail = (message) => ctx.addIssue({ code: "custom", message });
  if (new Set(loadout.spells).size !== loadout.spells.length)
    fail("spells must be distinct");
  if ([...loadout.spells].sort().join() !== loadout.spells.join())
    fail("spells must be sorted");
  if (Object.keys(loadout.refs).sort().join() !== loadout.spells.join())
    fail("refs must name exactly the equipped spells");
  if (loadout.kind === "unarmed" && (loadout.slug !== null || loadout.spells.length > 0))
    fail("an unarmed loadout has no spells");
  if (loadout.kind === "spell" && (loadout.spells.length !== 1 || loadout.slug !== loadout.spells[0]))
    fail("a spell loadout equips exactly its own spell");
  if (loadout.kind === "workflow" && (loadout.slug === null || loadout.spells.length < 2))
    fail("a workflow loadout names its workflow and equips at least two spells");
  if (loadout.kind === "combo" && (loadout.slug !== null || loadout.spells.length < 2))
    fail("a combo equips at least two spells and has no slug");
});
var TrialCellSchema = object({
  quest: SlugSchema,
  questVersion: number2().int().positive(),
  loadout: LoadoutSchema,
  cast: _enum(CASTS).nullable(),
  hero: _enum(USAGE_AGENTS),
  heroVersion: string2().regex(HARNESS_VERSION).nullable(),
  caster: CasterSchema,
  focus: _enum(FOCUS_LEVELS),
  containment: _enum(CONTAINMENTS),
  environment: EnvironmentSchema.pick({ os: true, arch: true }),
  source: object({ kind: _enum(["curator", "community"]), name: string2().min(1).max(60).nullable() }),
  runs: Count3,
  mishaps: Count3,
  cleared: Count3,
  oneShot: Count3,
  attuned: Count3,
  medianPromptsToClear: number2().positive().nullable(),
  meanScore: number2().min(0).max(1),
  medianDurationMs: Count3.nullable(),
  medianTokens: Count3.nullable(),
  medianToolCalls: Count3.nullable(),
  medianCostUsd: number2().nonnegative().nullable(),
  medianOutputTokens: Count3.nullable().optional(),
  medianLinesAdded: Count3.nullable().optional(),
  medianLinesRemoved: Count3.nullable().optional(),
  firstRun: Day2,
  lastRun: Day2,
  scrying: object({ file: ScryingFileSchema, outcome: _enum(["cleared", "fizzled"]) }).optional()
}).refine((cell) => cell.cleared <= cell.runs && cell.oneShot <= cell.cleared && cell.attuned <= cell.runs, "counts must nest: oneShot <= cleared <= runs, attuned <= runs").refine((cell) => cell.loadout.kind === "unarmed" === (cell.cast === null), "unarmed cells have no cast; armed cells have one");
var TrialsFileSchema = object({
  generatedAt: string2(),
  cells: array(TrialCellSchema)
});
function wilsonLower(k, n, z95 = 1.959964) {
  if (n <= 0)
    return 0;
  const p = k / n;
  const z2 = z95 * z95;
  return Math.max(0, (p + z2 / (2 * n) - z95 * Math.sqrt((p * (1 - p) + z2 / (4 * n)) / n)) / (1 + z2 / n));
}
function clearRate(cell) {
  return cell.runs > 0 ? cell.cleared / cell.runs : null;
}
function sameSetup(a, b) {
  return a.quest === b.quest && a.questVersion === b.questVersion && a.hero === b.hero && a.heroVersion === b.heroVersion && a.caster === b.caster && a.focus === b.focus && a.containment === b.containment && a.environment.os === b.environment.os && a.environment.arch === b.environment.arch && a.source.kind === b.source.kind && a.source.name === b.source.name;
}
function buffOver(cell, cells) {
  if (cell.loadout.kind === "unarmed")
    return null;
  const baseline = cells.find((other) => other.loadout.kind === "unarmed" && sameSetup(cell, other));
  const rate = clearRate(cell);
  const base = baseline ? clearRate(baseline) : null;
  if (!baseline || rate === null || base === null)
    return null;
  return { points: Math.round((rate - base) * 100), baseline };
}
function formatDuration(ms) {
  const seconds = Math.round(ms / 1000);
  return seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}
function formatTokens(value) {
  return value >= 1000 ? `${Number((value / 1000).toFixed(1))}k` : String(value);
}
function formatLines(added, removed) {
  return `+${added} / -${removed}`;
}

// src/shared/report.ts
var SIGNATURE_NAMESPACE = "viberpg-spell-report";
var TEMPLATE_SOURCE_URL = "https://github.com/OWNER/REPO";
var Count4 = number2().int().nonnegative();
var Month = string2().regex(/^\d{4}-\d{2}$/);
var ReportEvidenceSchema = object({
  generator: string2().min(1).max(60),
  generatedAt: string2(),
  match: array(MatchIdSchema).min(1).max(10),
  sessions: Count4,
  byAgent: partialRecord(_enum(USAGE_AGENTS), Count4),
  firstUsed: Month.nullable(),
  lastUsed: Month.nullable(),
  tests: object({ sessionsWithFailingTest: Count4, recovered: Count4 }),
  environment: EnvironmentSchema.optional()
});
var ReportAttachmentSchema = object({
  file: string2().regex(/^[A-Za-z0-9][A-Za-z0-9._-]{0,119}$/),
  sha256: string2().regex(/^[0-9a-f]{64}$/),
  alt: string2().min(3).max(200)
});
var ReportCardSchema = object({
  look: string2().refine((look) => parseLook(look) !== null, "Choose a known look, like tome-ember"),
  summary: string2().min(10).max(160).regex(SINGLE_LINE, "Keep this to a single line"),
  classes: array(SlugSchema).min(1).max(3).refine((classes) => new Set(classes).size === classes.length, "Choose each class once"),
  install: partialRecord(_enum(AGENTS), string2().min(3).max(400).regex(SINGLE_LINE, "Keep this to a single line")),
  phase: GuideSchema.shape.phase,
  foe: GuideSchema.shape.foe,
  tagline: GuideSchema.shape.tagline,
  beats: array(BeatSchema).min(3).max(5)
});
var ReportMetaSchema = object({
  format: literal(REPORT_FORMAT),
  spell: object({
    name: string2().min(2).max(80),
    kind: _enum(KINDS),
    sourceUrl: url().startsWith("https://").max(400),
    version: string2().max(80).nullable(),
    agents: array(_enum(AGENTS)).min(1)
  }),
  submitter: object({
    name: string2().min(1).max(80),
    github: string2().regex(GITHUB_USER).nullable(),
    email: email2().max(200).nullable()
  }),
  verdict: object({
    tier: _enum(TIERS).nullable(),
    summary: string2().min(10).max(280)
  }),
  evidence: ReportEvidenceSchema.nullable(),
  trials: array(TrialCellSchema).max(60).optional(),
  attachments: array(ReportAttachmentSchema).max(SUBMIT_LIMITS.attachments),
  card: ReportCardSchema.optional()
}).superRefine((report, ctx) => {
  for (const [index, cell] of (report.trials ?? []).entries()) {
    if (cell.source.kind !== "community" || cell.source.name !== report.submitter.name) {
      ctx.addIssue({ code: "custom", path: ["trials", index, "source"], message: "Trial source must be community with the submitter's name." });
    }
  }
  const base = report.card && parseLook(report.card.look)?.base;
  if (base && base.kind !== report.spell.kind) {
    ctx.addIssue({ code: "custom", path: ["card", "look"], message: `The ${base.name} look is for a ${base.kind}, not a ${report.spell.kind}.` });
  }
});
var HEADER = /^---\n([\s\S]*?)\n---(?:\n|$)/;
function parseReport(text) {
  const normalized = text.replace(/^\uFEFF/, "").replace(/\r\n/g, `
`);
  const match = HEADER.exec(normalized);
  if (!match)
    return { meta: null, body: normalized.trim(), issues: ["No report header; treated as a free-form report."] };
  const body = normalized.slice(match[0].length).trim();
  let raw;
  try {
    raw = JSON.parse(match[1] ?? "");
  } catch {
    return { meta: null, body, issues: ["The report header is not valid JSON."] };
  }
  const result = ReportMetaSchema.safeParse(raw);
  if (!result.success) {
    return { meta: null, body, issues: result.error.issues.map((i) => `${i.path.join(".") || "header"}: ${i.message}`) };
  }
  const issues = result.data.spell.sourceUrl === TEMPLATE_SOURCE_URL ? ["spell.sourceUrl: replace the template link"] : [];
  return { meta: issues.length > 0 ? null : result.data, body, issues };
}
function formatReport(meta, body) {
  return `---
${JSON.stringify(ReportMetaSchema.parse(meta), null, 2)}
---

${body.trim()}
`;
}
var PLACEHOLDER_SUMMARY = "Replace with your test findings.";
function unfinishedParts(meta, body) {
  const filled = new Set;
  for (const part of body.split(/^## /m).slice(1)) {
    const newline = part.indexOf(`
`);
    const text = newline === -1 ? "" : part.slice(newline + 1).replace(/<!--[\s\S]*?-->/g, "").trim();
    if (text)
      filled.add((newline === -1 ? part : part.slice(0, newline)).trim());
  }
  const parts = REPORT_SECTIONS.filter((title) => !filled.has(title)).map((title) => `Section "${title}" is empty.`);
  if (meta.verdict.summary === PLACEHOLDER_SUMMARY)
    parts.unshift("The verdict summary still has the template text.");
  return parts;
}
async function sha256Hex(data) {
  const bytes = typeof data === "string" ? new TextEncoder().encode(data) : data;
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

// src/shared/sshsig.ts
import { Buffer as Buffer2 } from "node:buffer";
import { constants, createHash, createPublicKey, ECDH, verify } from "node:crypto";
var MAGIC = Buffer2.from("SSHSIG");
var CURVES = {
  nistp256: { name: "prime256v1", jwk: "P-256", size: 32, hash: "sha256" },
  nistp384: { name: "secp384r1", jwk: "P-384", size: 48, hash: "sha384" },
  nistp521: { name: "secp521r1", jwk: "P-521", size: 66, hash: "sha512" }
};

class SshReader {
  bytes;
  offset = 0;
  constructor(bytes) {
    this.bytes = bytes;
  }
  take(size) {
    if (size > this.bytes.length - this.offset)
      throw new Error("Truncated SSH signature field.");
    const value = this.bytes.subarray(this.offset, this.offset + size);
    this.offset += size;
    return value;
  }
  uint32() {
    return this.take(4).readUInt32BE(0);
  }
  string() {
    return this.take(this.uint32());
  }
  identifier() {
    const value = this.string().toString("utf8");
    if (!/^[\x21-\x7e]+$/.test(value))
      throw new Error("Invalid SSH algorithm identifier.");
    return value;
  }
  positiveMpint() {
    const value = this.string();
    const first = value[0];
    if (first === undefined || first >= 128)
      throw new Error("SSH integer must be positive.");
    if (first !== 0)
      return value;
    if ((value[1] ?? 0) < 128)
      throw new Error("SSH integer has redundant leading zero bytes.");
    return value.subarray(1);
  }
  end() {
    if (this.offset !== this.bytes.length)
      throw new Error("SSH signature contains trailing data.");
  }
}
function dearmor(signature) {
  const match = /^-----BEGIN SSH SIGNATURE-----\r?\n([A-Za-z0-9+/=\r\n]+)\r?\n-----END SSH SIGNATURE-----(?:\r?\n)?$/.exec(signature);
  const encoded = match?.[1]?.replace(/[\r\n]/g, "");
  if (!encoded)
    throw new Error("Expected an armored SSH signature with BEGIN and END markers.");
  if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(encoded)) {
    throw new Error("SSH signature contains invalid base64.");
  }
  const bytes = Buffer2.from(encoded, "base64");
  if (bytes.toString("base64") !== encoded)
    throw new Error("SSH signature contains non-canonical base64.");
  return bytes;
}
function sshString(bytes) {
  const result = Buffer2.alloc(4 + bytes.length);
  result.writeUInt32BE(bytes.length);
  result.set(bytes, 4);
  return result;
}
function verifySshSignature(report, signature, namespace = SIGNATURE_NAMESPACE) {
  const result = { status: "invalid", keyType: null, publicKey: null, fingerprint: null, reason: null };
  try {
    const envelope = new SshReader(dearmor(signature));
    if (!envelope.take(MAGIC.length).equals(MAGIC))
      throw new Error("Invalid SSHSIG preamble.");
    const version = envelope.uint32();
    if (version !== 1)
      throw new Error(`Unsupported SSHSIG version: ${version}.`);
    const keyBlob = envelope.string();
    const publicKey = new SshReader(keyBlob);
    const keyType = publicKey.identifier();
    result.keyType = keyType;
    result.publicKey = `${keyType} ${keyBlob.toString("base64")}`;
    result.fingerprint = `SHA256:${createHash("sha256").update(keyBlob).digest("base64").replace(/=+$/, "")}`;
    const signedNamespace = envelope.string();
    envelope.string();
    const hash = envelope.identifier();
    const signatureBlob = envelope.string();
    envelope.end();
    if (!namespace || signedNamespace.length === 0)
      throw new Error("SSH signature namespace must not be empty.");
    if (!signedNamespace.equals(Buffer2.from(namespace)))
      throw new Error("SSH signature namespace does not match the expected namespace.");
    if (hash !== "sha256" && hash !== "sha512")
      throw new Error(`Unsupported SSHSIG hash algorithm: ${hash}.`);
    if (keyType.startsWith("sk-"))
      return { ...result, status: "unsupported", reason: "SSH security-key signatures are not supported." };
    if (keyType !== "ssh-ed25519" && keyType !== "ssh-rsa" && !keyType.startsWith("ecdsa-sha2-")) {
      return { ...result, status: "unsupported", reason: `Unsupported SSH key type: ${keyType}.` };
    }
    const signed = new SshReader(signatureBlob);
    const signatureType = signed.identifier();
    let signatureBytes = signed.string();
    signed.end();
    let key;
    let algorithm;
    let ecdsa = false;
    if (keyType === "ssh-ed25519") {
      if (signatureType !== keyType)
        throw new Error("Signature algorithm does not match the Ed25519 key.");
      const point = publicKey.string();
      if (point.length !== 32 || signatureBytes.length !== 64)
        throw new Error("Invalid Ed25519 key or signature length.");
      key = createPublicKey({ key: { kty: "OKP", crv: "Ed25519", x: point.toString("base64url") }, format: "jwk" });
      algorithm = null;
    } else if (keyType === "ssh-rsa") {
      if (signatureType !== "rsa-sha2-256" && signatureType !== "rsa-sha2-512") {
        throw new Error("RSA signatures must use rsa-sha2-256 or rsa-sha2-512; RSA-SHA1 is not accepted.");
      }
      const exponent = publicKey.positiveMpint();
      const modulus = publicKey.positiveMpint();
      if (signatureBytes.length === 0 || signatureBytes.length > modulus.length)
        throw new Error("Invalid RSA signature length.");
      if (signatureBytes.length < modulus.length) {
        const padded = Buffer2.alloc(modulus.length);
        padded.set(signatureBytes, modulus.length - signatureBytes.length);
        signatureBytes = padded;
      }
      key = createPublicKey({ key: { kty: "RSA", e: exponent.toString("base64url"), n: modulus.toString("base64url") }, format: "jwk" });
      algorithm = signatureType === "rsa-sha2-256" ? "sha256" : "sha512";
    } else {
      if (signatureType !== keyType)
        throw new Error("Signature algorithm does not match the ECDSA key.");
      const curveName = publicKey.identifier();
      if (keyType !== `ecdsa-sha2-${curveName}`)
        throw new Error("ECDSA curve does not match the key type.");
      if (curveName !== "nistp256" && curveName !== "nistp384" && curveName !== "nistp521") {
        return { ...result, status: "unsupported", reason: `Unsupported ECDSA curve: ${curveName}.` };
      }
      const curve = CURVES[curveName];
      const point = ECDH.convertKey(publicKey.string(), curve.name, undefined, undefined, "uncompressed");
      if (typeof point === "string" || point.length !== 1 + curve.size * 2)
        throw new Error("Invalid ECDSA public key point.");
      key = createPublicKey({
        key: { kty: "EC", crv: curve.jwk, x: point.subarray(1, 1 + curve.size).toString("base64url"), y: point.subarray(1 + curve.size).toString("base64url") },
        format: "jwk"
      });
      const integers = new SshReader(signatureBytes);
      const r = integers.positiveMpint();
      const s = integers.positiveMpint();
      integers.end();
      if (r.length > curve.size || s.length > curve.size)
        throw new Error("ECDSA signature integer exceeds the curve size.");
      signatureBytes = Buffer2.alloc(curve.size * 2);
      signatureBytes.set(r, curve.size - r.length);
      signatureBytes.set(s, curve.size * 2 - s.length);
      algorithm = curve.hash;
      ecdsa = true;
    }
    publicKey.end();
    const payload = Buffer2.concat([
      MAGIC,
      sshString(signedNamespace),
      sshString(Buffer2.alloc(0)),
      sshString(Buffer2.from(hash)),
      sshString(createHash(hash).update(report).digest())
    ]);
    const valid = ecdsa ? verify(algorithm, payload, { key, dsaEncoding: "ieee-p1363" }, signatureBytes) : verify(algorithm, payload, keyType === "ssh-rsa" ? { key, padding: constants.RSA_PKCS1_PADDING } : key, signatureBytes);
    return { ...result, status: valid ? "valid" : "invalid", reason: valid ? null : "Signature does not match the report bytes." };
  } catch (error) {
    return { ...result, reason: error instanceof Error ? error.message : "Malformed SSH signature." };
  }
}

// src/shared/provenance.ts
var SigningKeysSchema = array(object({ key: string2() }));
async function githubKeyStatus(user, publicKey, fetchFn, token) {
  const [expectedType, encoded] = publicKey.split(" ");
  const expectedBlob = encoded?.replace(/={1,2}$/, "");
  async function lookup(url, json) {
    try {
      const headers = new Headers({ "User-Agent": "VibeRPGSimulator" });
      if (json && token)
        headers.set("Authorization", `Bearer ${token}`);
      const response = await fetchFn(url, { headers, signal: AbortSignal.timeout(5000) });
      if (!response.ok)
        return "failed";
      const keys = json ? SigningKeysSchema.parse(await response.json()).map((entry) => entry.key) : (await response.text()).split(/\r?\n/);
      return keys.some((line) => {
        const [keyType, blob] = line.trim().split(/\s+/, 2);
        return keyType === expectedType && blob?.replace(/={1,2}$/, "") === expectedBlob;
      }) ? "matched" : "missing";
    } catch {
      return "failed";
    }
  }
  const results = await Promise.all([
    lookup(`https://github.com/${encodeURIComponent(user)}.keys`, false),
    lookup(`https://api.github.com/users/${encodeURIComponent(user)}/ssh_signing_keys`, true)
  ]);
  if (results.includes("matched"))
    return "verified";
  return results.includes("failed") ? "lookup_failed" : "key_not_listed";
}
async function checkProvenance(input) {
  const checked = input.signature === null ? null : verifySshSignature(input.report, input.signature);
  const signature = checked ? { status: checked.status, keyType: checked.keyType, fingerprint: checked.fingerprint, reason: checked.reason } : { status: "unsigned", keyType: null, fingerprint: null, reason: null };
  const user = input.meta?.submitter.github ?? null;
  const githubStatus = !user ? "not_claimed" : !checked ? "unsigned" : "key_not_listed";
  const listed = input.meta?.attachments ?? [];
  const [reportSha256, status, attachments] = await Promise.all([
    sha256Hex(input.report),
    user && checked?.status === "valid" && checked.publicKey ? githubKeyStatus(user, checked.publicKey, input.fetchFn ?? fetch, input.githubToken) : githubStatus,
    Promise.all(input.attachments.map(async (attachment) => {
      const expectedSha256 = listed.find((entry) => entry.file === attachment.name)?.sha256 ?? null;
      const actualSha256 = await sha256Hex(attachment.bytes);
      const type = sniffMediaType(attachment.bytes)?.mime ?? null;
      return { file: attachment.name, expectedSha256, actualSha256, type, ok: expectedSha256 === actualSha256 && type !== null };
    }))
  ]);
  return {
    reportSha256,
    signature,
    github: { status, user },
    attachments,
    missingAttachments: listed.filter((entry) => !input.attachments.some((attachment) => attachment.name === entry.file)).map((entry) => entry.file)
  };
}

// src/stats/aggregate.ts
import { resolve } from "node:path";
function earliest(a, b) {
  if (a === null)
    return b;
  return b !== null && Date.parse(b) < Date.parse(a) ? b : a;
}
function latest(a, b) {
  if (a === null)
    return b;
  return b !== null && Date.parse(b) > Date.parse(a) ? b : a;
}
function mergeSpells(target, spells) {
  for (const spell of spells)
    target.set(spell.id, earliest(target.get(spell.id) ?? null, spell.firstTs));
}
function rollUp(files) {
  const paths = new Map;
  for (const file of files)
    if (file.session)
      paths.set(resolve(file.path), file.session.id);
  const sessions = new Map;
  for (const file of files) {
    const incoming = file.session;
    if (!incoming)
      continue;
    const parentId = incoming.parentId ?? (incoming.parentPath ? paths.get(resolve(incoming.parentPath)) ?? null : null);
    const current = sessions.get(incoming.id);
    if (!current) {
      sessions.set(incoming.id, { ...incoming, parentId, spells: [...incoming.spells], tests: [...incoming.tests] });
      continue;
    }
    current.parentId ??= parentId;
    current.parentPath ??= incoming.parentPath;
    current.support ||= incoming.support;
    current.harnessVersion ??= incoming.harnessVersion;
    current.startedAt = earliest(current.startedAt, incoming.startedAt);
    current.endedAt = latest(current.endedAt, incoming.endedAt);
    const spells = new Map;
    mergeSpells(spells, current.spells);
    mergeSpells(spells, incoming.spells);
    current.spells = [...spells].map(([id, firstTs]) => ({ id, firstTs }));
    const tests = new Map;
    for (const test of [...current.tests, ...incoming.tests]) {
      tests.set(`${test.seq}\x00${test.family}\x00${test.failed}\x00${test.ts}`, test);
    }
    current.tests = [...tests.values()].sort((a, b) => a.seq - b.seq);
  }
  const children = new Map;
  const skipped = new Set;
  for (const member of sessions.values()) {
    if (member.support)
      skipped.add(member.id);
    if (member.parentId) {
      const list = children.get(member.parentId) ?? [];
      list.push(member.id);
      children.set(member.parentId, list);
    }
  }
  const queue = [...skipped];
  for (const id of queue) {
    for (const child of children.get(id) ?? []) {
      if (!skipped.has(child)) {
        skipped.add(child);
        queue.push(child);
      }
    }
  }
  const roots = new Map;
  for (const member of sessions.values()) {
    if (skipped.has(member.id))
      continue;
    let ancestor = member;
    const visited = new Set([ancestor.id]);
    for (let hop = 0;hop < 10 && ancestor.parentId; hop++) {
      const parent = sessions.get(ancestor.parentId);
      if (!parent || visited.has(parent.id))
        break;
      ancestor = parent;
      visited.add(ancestor.id);
    }
    let root = roots.get(ancestor.id);
    if (!root) {
      root = { agent: ancestor.agent, id: ancestor.id, startedAt: ancestor.startedAt, endedAt: ancestor.endedAt, spells: new Map, members: [], harnessVersion: ancestor.harnessVersion };
      roots.set(ancestor.id, root);
    }
    root.members.push(member);
    root.harnessVersion ??= member.harnessVersion;
    root.endedAt = latest(root.endedAt, member.endedAt);
    mergeSpells(root.spells, member.spells);
  }
  for (const root of roots.values()) {
    if (root.startedAt === null) {
      for (const member of root.members)
        root.startedAt = earliest(root.startedAt, member.startedAt);
    }
  }
  return { roots: [...roots.values()].sort((a, b) => a.id.localeCompare(b.id, "en")), supportSkipped: skipped.size };
}
function sessionTotals(roots) {
  const agents = new Map;
  const months = new Map;
  for (const root of roots) {
    agents.set(root.agent, (agents.get(root.agent) ?? 0) + 1);
    if (root.startedAt !== null) {
      const month = new Date(root.startedAt).toISOString().slice(0, 7);
      months.set(month, (months.get(month) ?? 0) + 1);
    }
  }
  return {
    sessions: roots.length,
    byAgent: Object.fromEntries([...agents].sort(([a], [b]) => a.localeCompare(b, "en"))),
    byMonth: Object.fromEntries([...months].sort(([a], [b]) => a.localeCompare(b, "en")))
  };
}
function testStats(roots) {
  let sessionsWithFailingTest = 0;
  let recovered = 0;
  for (const root of roots) {
    let rootFailed = false;
    let rootRecovered = false;
    for (const member of root.members) {
      const failures = new Map;
      for (const test of member.tests) {
        if (test.failed) {
          rootFailed = true;
          failures.set(test.family, Math.min(failures.get(test.family) ?? Infinity, test.seq));
        }
      }
      for (const test of member.tests) {
        if (!test.failed && test.seq > (failures.get(test.family) ?? Infinity))
          rootRecovered = true;
      }
    }
    if (rootFailed)
      sessionsWithFailingTest++;
    if (rootRecovered)
      recovered++;
  }
  return { sessionsWithFailingTest, recovered };
}
function measureSpell(roots, matchIds) {
  const matching = roots.filter((root) => matchIds.some((id) => root.spells.has(id)));
  const totals = sessionTotals(matching);
  const months = Object.keys(totals.byMonth);
  return {
    sessions: totals.sessions,
    byAgent: totals.byAgent,
    firstMonth: months[0] ?? null,
    lastMonth: months.at(-1) ?? null,
    tests: testStats(matching)
  };
}

// src/stats/claude.ts
import { basename } from "node:path";

// src/stats/lines.ts
import { createReadStream } from "node:fs";
var NEWLINE = 10;
async function* readLines(path, size, state) {
  state.truncatedTail = false;
  if (size <= 0)
    return;
  const decoder = new TextDecoder;
  let pending = [];
  let seq = 0;
  const stream = createReadStream(path, { start: 0, end: size - 1, highWaterMark: 1 << 20 });
  for await (const chunk of stream) {
    if (!(chunk instanceof Uint8Array))
      continue;
    let start = 0;
    let nl = chunk.indexOf(NEWLINE);
    while (nl !== -1) {
      const part = chunk.subarray(start, nl);
      let bytes = part;
      if (pending.length > 0) {
        pending.push(part);
        bytes = Buffer.concat(pending);
        pending = [];
      }
      yield { line: decoder.decode(bytes), seq: seq++ };
      start = nl + 1;
      nl = chunk.indexOf(NEWLINE, start);
    }
    if (start < chunk.length)
      pending.push(chunk.slice(start));
  }
  state.truncatedTail = pending.length > 0;
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
var CODEX_BUILTIN_PLUGIN_SUFFIX = "@openai-bundled";
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
var SENSITIVE_NAME = /(credential|secret|token|auth|keychain|cookie)/i;

// src/stats/claude.ts
function timestamp(value) {
  if (typeof value !== "string")
    return null;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? new Date(ms).toISOString() : null;
}
function resultText(value) {
  if (typeof value === "string")
    return value;
  if (!Array.isArray(value))
    return "";
  const parts = [];
  const blocks = value;
  for (const part of blocks) {
    if (typeof part === "object" && part !== null && "text" in part && typeof part.text === "string") {
      parts.push(part.text);
    }
  }
  return parts.join(`
`);
}
async function parseClaudeFile(file) {
  const child = /[\\/]([^\\/]+)[\\/]subagents[\\/]agent-([^\\/]+)\.jsonl$/.exec(file.path);
  const parent = child?.[1];
  const childId = child?.[2];
  let sessionId = null;
  const session = {
    agent: "claude-code",
    id: "",
    parentId: parent === undefined ? null : `claude-code:${parent}`,
    parentPath: null,
    support: false,
    startedAt: null,
    endedAt: null,
    harnessVersion: null,
    spells: [],
    tests: []
  };
  const spells = new Map;
  const pending = new Map;
  const state = { truncatedTail: false };
  let malformedLines = 0;
  function addSpell(id, ts) {
    id = id.toLowerCase();
    const previous = spells.get(id);
    if (previous === undefined || ts !== null && (previous === null || ts < previous)) {
      spells.set(id, ts);
    }
  }
  function addCommands(text, ts) {
    for (const match of text.matchAll(/<command-name>\/?([a-z0-9][a-z0-9:_-]{0,63})<\/command-name>/g)) {
      const name = match[1];
      if (name !== undefined && !CLAUDE_BUILTIN_COMMANDS.has(name))
        addSpell(`command:${name}`, ts);
    }
  }
  for await (const { line, seq } of readLines(file.path, file.size, state)) {
    if (line.trim() === "")
      continue;
    let record;
    try {
      record = JSON.parse(line);
    } catch {
      malformedLines++;
      continue;
    }
    if (typeof record !== "object" || record === null)
      continue;
    if (session.harnessVersion === null && "version" in record)
      session.harnessVersion = harnessVersion(record.version);
    if (sessionId === null && "sessionId" in record && typeof record.sessionId === "string") {
      sessionId = record.sessionId;
    }
    const ts = "timestamp" in record ? timestamp(record.timestamp) : null;
    if (ts !== null) {
      if (session.startedAt === null || ts < session.startedAt)
        session.startedAt = ts;
      if (session.endedAt === null || ts > session.endedAt)
        session.endedAt = ts;
    }
    if (!("type" in record) || record.type !== "assistant" && record.type !== "user")
      continue;
    if (!("message" in record) || typeof record.message !== "object" || record.message === null)
      continue;
    if (!("content" in record.message))
      continue;
    const content = record.message.content;
    if (record.type === "user" && typeof content === "string")
      addCommands(content, ts);
    if (!Array.isArray(content))
      continue;
    const blocks = content;
    for (const block of blocks) {
      if (typeof block !== "object" || block === null || !("type" in block))
        continue;
      if (record.type === "assistant" && block.type === "tool_use") {
        if (!("name" in block) || typeof block.name !== "string")
          continue;
        if (block.name.startsWith("mcp__")) {
          const server = block.name.split("__")[1]?.toLowerCase();
          if (server && !CLAUDE_BUILTIN_MCP.has(server))
            addSpell(`mcp:${server}`, ts);
        }
        if (!("input" in block) || typeof block.input !== "object" || block.input === null)
          continue;
        const input = block.input;
        if (block.name === "Skill") {
          const name = ("skill" in input ? input.skill : undefined) ?? ("command" in input ? input.command : undefined);
          if (typeof name === "string")
            addSpell(`skill:${name}`, ts);
        } else if (block.name === "Bash" && "command" in input && typeof input.command === "string" && "id" in block && typeof block.id === "string") {
          const family = testFamily(input.command);
          if (family !== null)
            pending.set(block.id, family);
        }
      } else if (record.type === "user") {
        if (block.type === "text" && "text" in block && typeof block.text === "string")
          addCommands(block.text, ts);
        if (block.type !== "tool_result" || !("tool_use_id" in block) || typeof block.tool_use_id !== "string")
          continue;
        const family = pending.get(block.tool_use_id);
        if (family === undefined)
          continue;
        pending.delete(block.tool_use_id);
        const text = "content" in block ? resultText(block.content) : "";
        const exit = /^Exit code:?\s+(-?\d+)/m.exec(text)?.[1];
        session.tests.push({
          family,
          failed: "is_error" in block && block.is_error === true || exit !== undefined && Number(exit) !== 0,
          seq,
          ts
        });
      }
    }
  }
  const identity = parent !== undefined && childId !== undefined ? `${parent}:${childId}` : sessionId ?? basename(file.path, ".jsonl");
  session.id = `claude-code:${identity}`;
  session.spells = Array.from(spells, ([id, firstTs]) => ({ id, firstTs }));
  return {
    path: file.path,
    agent: "claude-code",
    size: file.size,
    mtimeMs: file.mtimeMs,
    session: identity === "" ? null : session,
    malformedLines,
    truncatedTail: state.truncatedTail
  };
}

// src/stats/codex.ts
var SKIPPED_TYPES = [
  '"type":"compacted"',
  '"type":"reasoning"',
  '"type":"token_count"',
  '"type":"world_state"',
  '"type":"turn_context"',
  '"type":"token_usage_record"',
  '"type":"realtime_item"',
  '"type":"inter_agent_communication_metadata"',
  '"type":"agent_message"'
];
function isObject2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function commandText(value) {
  if (typeof value === "string")
    return value;
  if (!Array.isArray(value))
    return null;
  const parts = value;
  return parts.every((part) => typeof part === "string") ? parts.join(" ") : null;
}
function legacyExit(text) {
  const match = /^(?:Process exited with code|Exit code:)\s*(-?\d+)/m.exec(text.slice(0, 600));
  if (match?.[1] !== undefined)
    return Number(match[1]);
  if (!text.trimStart().startsWith("{"))
    return null;
  let output;
  try {
    output = JSON.parse(text);
  } catch {
    return null;
  }
  if (!isObject2(output))
    return null;
  if (typeof output.exit_code === "number" && Number.isInteger(output.exit_code))
    return output.exit_code;
  const metadata = output.metadata;
  return isObject2(metadata) && typeof metadata.exit_code === "number" && Number.isInteger(metadata.exit_code) ? metadata.exit_code : null;
}
async function parseCodexFile(file) {
  const state = { truncatedTail: false };
  const spells = new Map;
  const tests = [];
  const pending = new Map;
  let session = null;
  let sawMeta = false;
  let firstTimestamp = null;
  let endedAt = null;
  let malformedLines = 0;
  function addSpell(id, ts) {
    const key = id.toLowerCase();
    const previous = spells.get(key);
    if (previous === undefined || ts !== null && (previous === null || ts < previous))
      spells.set(key, ts);
  }
  function recordCommand(command, exit, seq, ts) {
    if (typeof exit !== "number" || !Number.isInteger(exit))
      return;
    const cmd = commandText(command);
    if (cmd === null)
      return;
    if (exit === 0) {
      for (const match of cmd.matchAll(SKILL_PATH)) {
        if (match[1] !== undefined)
          addSpell(`skill:${match[1]}`, ts);
      }
    }
    const family = testFamily(cmd);
    if (family !== null)
      tests.push({ family, failed: exit !== 0, seq, ts });
  }
  for await (const { line, seq } of readLines(file.path, file.size, state)) {
    if (line.length === 0)
      continue;
    const prefix = line.slice(0, 200);
    let skipped = false;
    for (const type of SKIPPED_TYPES) {
      if (prefix.includes(type)) {
        skipped = true;
        break;
      }
    }
    if (skipped)
      continue;
    let record;
    try {
      record = JSON.parse(line);
    } catch {
      malformedLines++;
      continue;
    }
    if (!isObject2(record))
      continue;
    const ts = typeof record.timestamp === "string" ? record.timestamp : null;
    if (ts !== null) {
      firstTimestamp ??= ts;
      if (endedAt === null || ts > endedAt)
        endedAt = ts;
    }
    const payload = record.payload;
    switch (record.type) {
      case "session_meta": {
        if (sawMeta)
          break;
        sawMeta = true;
        if (!isObject2(payload) || typeof payload.id !== "string" || payload.id.length === 0)
          break;
        const source = payload.source;
        const subagent = isObject2(source) && isObject2(source.subagent) ? source.subagent : null;
        const spawn = subagent !== null && isObject2(subagent.thread_spawn) ? subagent.thread_spawn : null;
        const parent = typeof payload.parent_thread_id === "string" && payload.parent_thread_id.length > 0 ? payload.parent_thread_id : spawn?.parent_thread_id;
        session = {
          agent: "codex",
          id: `codex:${payload.id}`,
          parentId: typeof parent === "string" && parent.length > 0 ? `codex:${parent}` : null,
          parentPath: null,
          support: payload.thread_source === "guardian_review" || subagent?.other === "guardian",
          startedAt: typeof payload.timestamp === "string" ? payload.timestamp : null,
          endedAt: null,
          harnessVersion: harnessVersion(payload.cli_version),
          spells: [],
          tests
        };
        break;
      }
      case "event_msg": {
        if (!isObject2(payload) || payload.type !== "item_completed" || !isObject2(payload.item))
          break;
        const item = payload.item;
        if (item.type === "CommandExecution") {
          recordCommand(item.command, item.exit_code, seq, ts);
        } else if (item.type === "McpToolCall") {
          if (typeof item.server === "string" && item.server.length > 0) {
            const server = item.server.toLowerCase();
            if (!CODEX_BUILTIN_MCP.has(server))
              addSpell(`mcp:${server}`, ts);
          }
          if (typeof item.pluginId === "string") {
            const pluginId = item.pluginId.toLowerCase();
            const name = pluginId.split("@", 1)[0];
            if (name && !pluginId.endsWith(CODEX_BUILTIN_PLUGIN_SUFFIX))
              addSpell(`plugin:${name}`, ts);
          }
        }
        break;
      }
      case "response_item": {
        if (!isObject2(payload))
          break;
        switch (payload.type) {
          case "message": {
            if (payload.role !== "user" || !Array.isArray(payload.content))
              break;
            const content = payload.content;
            const metadata = payload.internal_chat_message_metadata_passthrough;
            const kinds = isObject2(metadata) && Array.isArray(metadata.content_item_kinds) && metadata.content_item_kinds.length === content.length ? metadata.content_item_kinds : null;
            for (let index = 0;index < content.length; index++) {
              const part = content[index];
              if (!isObject2(part) || typeof part.text !== "string")
                continue;
              if (kinds !== null ? kinds[index] !== "skills.selected_skill_instructions" : !part.text.startsWith("<skill>"))
                continue;
              const name = /<name>([a-z0-9][a-z0-9._-]{0,63})<\/name>/i.exec(part.text)?.[1];
              if (name !== undefined)
                addSpell(`skill:${name}`, ts);
            }
            break;
          }
          case "function_call": {
            if (payload.name !== "exec_command" && payload.name !== "shell" || typeof payload.call_id !== "string" || typeof payload.arguments !== "string")
              break;
            let args;
            try {
              args = JSON.parse(payload.arguments);
            } catch {
              break;
            }
            if (!isObject2(args))
              break;
            const cmd = typeof args.cmd === "string" ? args.cmd : Array.isArray(args.command) ? commandText(args.command) : null;
            if (cmd !== null)
              pending.set(payload.call_id, cmd);
            break;
          }
          case "function_call_output": {
            if (typeof payload.call_id !== "string")
              break;
            const cmd = pending.get(payload.call_id);
            if (cmd === undefined)
              break;
            pending.delete(payload.call_id);
            let text = "";
            if (typeof payload.output === "string") {
              text = payload.output;
            } else if (Array.isArray(payload.output)) {
              const parts = payload.output;
              for (const part of parts) {
                if (isObject2(part) && typeof part.text === "string")
                  text += part.text;
              }
            } else {
              break;
            }
            recordCommand(cmd, legacyExit(text), seq, ts);
            break;
          }
        }
        break;
      }
    }
  }
  if (session !== null) {
    session.startedAt ??= firstTimestamp;
    session.endedAt = endedAt;
    session.spells = Array.from(spells, ([id, firstTs]) => ({ id, firstTs }));
  }
  return {
    path: file.path,
    agent: file.agent,
    size: file.size,
    mtimeMs: file.mtimeMs,
    session,
    malformedLines,
    truncatedTail: state.truncatedTail
  };
}

// src/stats/environment.ts
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { arch, platform, release, type } from "node:os";
import { promisify } from "node:util";
function cleanOs(value) {
  const text = value.replace(/[^A-Za-z0-9 ._()-]+/g, " ").replace(/\s+/g, " ").trim().slice(0, 60).trim();
  return text || null;
}
async function readText(path) {
  try {
    return await readFile(path, "utf8");
  } catch {
    return null;
  }
}
async function describeOs() {
  const system = platform();
  let os = null;
  if (system === "darwin") {
    const plist = await readText("/System/Library/CoreServices/SystemVersion.plist");
    const name = plist && /<key>ProductName<\/key>\s*<string>([^<]{1,40})<\/string>/.exec(plist)?.[1];
    const version = plist && /<key>ProductVersion<\/key>\s*<string>([^<]{1,20})<\/string>/.exec(plist)?.[1];
    os = cleanOs(name && version ? `${name} ${version}` : `macOS (Darwin ${release()})`);
  } else if (system === "win32") {
    const build = Number(release().split(".")[2]);
    os = cleanOs(Number.isInteger(build) ? `Windows ${build >= 22000 ? 11 : 10} (build ${build})` : `Windows ${release()}`);
  } else if (system === "linux") {
    const osRelease = await readText("/etc/os-release");
    const pretty = osRelease && /^PRETTY_NAME=(?:"([^"\n]*)"|([^\n]*))$/m.exec(osRelease);
    os = cleanOs(pretty ? pretty[1] ?? pretty[2] ?? "" : "Linux");
  } else {
    os = cleanOs(type());
  }
  const cpu = arch();
  return { os, arch: /^[A-Za-z0-9_]{1,20}$/.test(cpu) ? cpu : null };
}
function latestHarnessVersions(roots) {
  const latest = new Map;
  for (const root of roots) {
    if (root.harnessVersion === null)
      continue;
    const at = root.startedAt === null ? -Infinity : Date.parse(root.startedAt);
    const seen = latest.get(root.agent);
    if (!seen || at >= seen.at)
      latest.set(root.agent, { at, version: root.harnessVersion });
  }
  return Object.fromEntries(USAGE_AGENTS.flatMap((agent) => {
    const seen = latest.get(agent);
    return seen ? [[agent, seen.version]] : [];
  }));
}
var execFileAsync = promisify(execFile);
async function testerEnvironment(roots) {
  return { ...await describeOs(), harness: latestHarnessVersions(roots) };
}

// src/stats/omp.ts
import { dirname, relative, sep } from "node:path";
function timestamp2(value) {
  if (typeof value !== "string" && typeof value !== "number")
    return null;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date.toISOString() : null;
}
async function parseOmpFile(file) {
  const child = relative(file.root, file.path).split(sep).length > 2;
  const session = {
    agent: "omp",
    id: "",
    parentId: null,
    parentPath: null,
    support: false,
    startedAt: null,
    endedAt: null,
    harnessVersion: null,
    spells: [],
    tests: []
  };
  const spells = new Map;
  const pending = new Map;
  const state = { truncatedTail: false };
  let malformedLines = 0;
  function addSpell(id, ts) {
    id = id.toLowerCase();
    const previous = spells.get(id);
    if (previous === undefined || ts !== null && (previous === null || ts < previous)) {
      spells.set(id, ts);
    }
  }
  for await (const { line, seq } of readLines(file.path, file.size, state)) {
    if (line.trim() === "")
      continue;
    let record;
    try {
      record = JSON.parse(line);
    } catch {
      malformedLines++;
      continue;
    }
    if (typeof record !== "object" || record === null || !("type" in record))
      continue;
    if (record.type !== "session" && record.type !== "message")
      continue;
    let ts = "timestamp" in record ? timestamp2(record.timestamp) : null;
    let message = null;
    if (record.type === "session") {
      if (session.id === "" && "id" in record && typeof record.id === "string" && record.id !== "") {
        session.id = `omp:${record.id}`;
        if (child) {
          session.parentPath = "parentSession" in record && typeof record.parentSession === "string" ? record.parentSession : `${dirname(file.path)}.jsonl`;
        }
      }
    } else {
      if (!("message" in record) || typeof record.message !== "object" || record.message === null)
        continue;
      message = record.message;
      if ("timestamp" in message && typeof message.timestamp === "number") {
        ts = timestamp2(message.timestamp) ?? ts;
      }
    }
    if (ts !== null) {
      if (session.startedAt === null || ts < session.startedAt)
        session.startedAt = ts;
      if (session.endedAt === null || ts > session.endedAt)
        session.endedAt = ts;
    }
    if (message === null || !("role" in message))
      continue;
    if (message.role === "assistant") {
      if (!("content" in message) || !Array.isArray(message.content))
        continue;
      const blocks = message.content;
      for (const block of blocks) {
        if (typeof block !== "object" || block === null || !("type" in block) || block.type !== "toolCall")
          continue;
        if (!("arguments" in block) || typeof block.arguments !== "object" || block.arguments === null)
          continue;
        if (!("name" in block))
          continue;
        const args = block.arguments;
        if (block.name === "read" && "path" in args && typeof args.path === "string" && args.path.startsWith("skill://")) {
          const name = args.path.slice(8).split(/[/:]/, 1)[0]?.toLowerCase();
          if (name !== undefined && /^[a-z0-9][a-z0-9._-]{0,63}$/.test(name))
            addSpell(`skill:${name}`, ts);
        } else if (block.name === "bash" && "command" in args && typeof args.command === "string" && "id" in block && typeof block.id === "string") {
          const family = testFamily(args.command);
          if (family !== null)
            pending.set(block.id, family);
        }
      }
    } else if (message.role === "toolResult") {
      const details = "details" in message && typeof message.details === "object" && message.details !== null ? message.details : null;
      if ("toolCallId" in message && typeof message.toolCallId === "string") {
        const family = pending.get(message.toolCallId);
        if (family !== undefined) {
          pending.delete(message.toolCallId);
          const exit = details !== null && "exitCode" in details ? details.exitCode : null;
          session.tests.push({
            family,
            failed: "isError" in message && message.isError === true || typeof exit === "number" && Number.isInteger(exit) && exit !== 0,
            seq,
            ts
          });
        }
      }
      if (details !== null && "serverName" in details && typeof details.serverName === "string") {
        addSpell(`mcp:${details.serverName}`, ts);
      }
    }
  }
  session.spells = Array.from(spells, ([id, firstTs]) => ({ id, firstTs }));
  return {
    path: file.path,
    agent: "omp",
    size: file.size,
    mtimeMs: file.mtimeMs,
    session: session.id === "" ? null : session,
    malformedLines,
    truncatedTail: state.truncatedTail
  };
}

// src/stats/sources.ts
import { lstat, readdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join, resolve as resolve2, sep as sep2 } from "node:path";
async function discoverFiles() {
  const codex = process.env.CODEX_HOME ?? join(homedir(), ".codex");
  const claude = process.env.CLAUDE_CONFIG_DIR ?? join(homedir(), ".claude");
  const roots = [
    { agent: "codex", root: resolve2(codex, "sessions") },
    { agent: "codex", root: resolve2(codex, "archived_sessions") },
    { agent: "claude-code", root: resolve2(claude, "projects") },
    { agent: "omp", root: resolve2(process.env.VIBERPG_OMP_SESSIONS ?? join(homedir(), ".omp/agent/sessions")) }
  ];
  const files = [];
  async function walk(dir, agent, root) {
    try {
      const entries = await readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isSymbolicLink() || SENSITIVE_NAME.test(entry.name) || entry.name.startsWith(".env"))
          continue;
        const path = join(dir, entry.name);
        if (entry.isDirectory()) {
          if (agent !== "omp" || entry.name !== "local")
            await walk(path, agent, root);
        } else if (entry.isFile() && entry.name.endsWith(".jsonl")) {
          if (agent === "codex" && !entry.name.startsWith("rollout-"))
            continue;
          if (agent === "omp" && entry.name.startsWith("__advisor"))
            continue;
          try {
            const info = await lstat(path);
            if (info.isFile())
              files.push({ agent, path, root, size: info.size, mtimeMs: info.mtimeMs });
          } catch (error) {
            if (!(error instanceof Error && ("code" in error) && error.code === "ENOENT"))
              throw error;
          }
        }
      }
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT")
        return;
      throw new Error("Could not read a session source directory.");
    }
  }
  await Promise.all(roots.map(async ({ agent, root }) => {
    if (root.split(sep2).some((name) => SENSITIVE_NAME.test(name) || name.startsWith(".env")))
      return;
    try {
      const info = await lstat(root);
      if (info.isDirectory() && !info.isSymbolicLink())
        await walk(root, agent, root);
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT")
        return;
      throw new Error("Could not read a session source directory.");
    }
  }));
  return files.sort((a, b) => b.mtimeMs - a.mtimeMs || a.path.localeCompare(b.path, "en"));
}

// src/trials/batch.ts
import { spawnSync } from "node:child_process";
import { parseArgs } from "node:util";

// src/shared/mana.ts
var MANA_PER_USD = 1e4;
function priceCard(model, at, prices) {
  const name = model.toLowerCase();
  const day = at.toISOString().slice(0, 10);
  return prices.find((card) => (card.id.toLowerCase() === name || card.aliases.some((alias) => alias.toLowerCase() === name)) && (card.effectiveFrom === null || card.effectiveFrom <= day) && (card.effectiveTo === null || day <= card.effectiveTo)) ?? null;
}
function cardMana(card, usage) {
  const usd = usage.input * card.input + usage.cacheRead * card.cacheRead + usage.cacheWrite * (card.cacheWrite ?? card.input) + usage.output * card.output;
  return usd * MANA_PER_USD / 1e6;
}
function formatMana(mana) {
  return mana < 10 ? mana.toLocaleString("en-US", { maximumSignificantDigits: 2 }) : mana.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

// src/trials/arena.ts
import { createHash as createHash2 } from "node:crypto";
import { constants as constants2, existsSync, realpathSync } from "node:fs";
import { chmod, copyFile, cp, lstat as lstat2, mkdir, mkdtemp, readdir as readdir2, realpath, rename, rm, stat, writeFile } from "node:fs/promises";
import { homedir as homedir2, tmpdir } from "node:os";
import { dirname as dirname2, join as join2 } from "node:path";
function tempRoot() {
  return realpathSync(tmpdir());
}
var WARD_AVAILABLE = process.platform === "darwin" && existsSync("/usr/bin/sandbox-exec");
async function privateDir(path) {
  await mkdir(path, { recursive: true, mode: 448 });
  const info = await lstat2(path);
  if (!info.isDirectory() || process.getuid && info.uid !== process.getuid())
    throw new Error(`${path} is not a folder you own. Remove it and try again.`);
  if ((info.mode & 63) !== 0)
    await chmod(path, 448);
  return path;
}
async function openArena(quest, base = join2(tmpdir(), "viberpg-arena")) {
  await privateDir(base);
  const root = await realpath(await mkdtemp(join2(base, `${quest.id}-`)));
  const arena = { root, workspace: join2(root, "ws"), home: join2(root, "home"), scratch: join2(root, "grade"), tmp: join2(root, "tmp") };
  for (const dir of [arena.home, arena.scratch, arena.tmp])
    await mkdir(dir, { recursive: true });
  await cp(join2(quest.dir, "fixture"), arena.workspace, { recursive: true });
  return arena;
}
async function closeArena(arena) {
  await rm(arena.root, { recursive: true, force: true });
}
var quote = (path) => `"${path.replaceAll("\\", "\\\\").replaceAll('"', "\\\"")}"`;
function wardProfile(arenaRoot, rules, home = homedir2(), temp = tempRoot()) {
  const reads = rules.read.map((path) => `(subpath ${quote(path)})`).join(" ");
  const writes = [`(subpath ${quote(rules.root ?? arenaRoot)})`, '(subpath "/dev")', ...rules.write.map((path) => `(subpath ${quote(path)})`)].join(" ");
  const locked = (rules.locked ?? []).map((path) => `(subpath ${quote(path)})`).join(" ");
  return [
    "(version 1)",
    "(allow default)",
    `(deny file-read* (subpath ${quote(home)}))`,
    `(deny file-read* (subpath ${quote(temp)}))`,
    "(allow file-read-metadata)",
    `(allow file-read* (literal ${quote(home)})${reads ? ` ${reads}` : ""})`,
    `(allow file-read* (subpath ${quote(arenaRoot)}))`,
    "(deny file-write*)",
    `(allow file-write* ${writes})`,
    ...locked ? [`(deny file-write* ${locked})`] : [],
    ...rules.network ? [] : ["(deny network*)"],
    ""
  ].join(`
`);
}
async function ward(arena, name, rules) {
  if (!WARD_AVAILABLE)
    throw new Error(`The ${name} step needs a sandbox, and macOS Seatbelt is not available on this system.`);
  return ["/usr/bin/sandbox-exec", "-p", wardProfile(await realpath(arena.root), rules)];
}
async function commandReadPaths(command) {
  const home = homedir2();
  for (const dir of (process.env.PATH ?? "").split(":")) {
    const candidate = join2(dir, command);
    if (!dir || !existsSync(candidate))
      continue;
    const real = await realpath(candidate);
    return [...new Set([dir, join2(real, "..", "..")])].filter((path) => path.startsWith(`${home}/`));
  }
  return [];
}
async function cloneOutOfHome(commands, cacheRoot = join2(tmpdir(), "viberpg-arena", ".bin")) {
  const home = homedir2();
  const folders = [];
  await privateDir(dirname2(cacheRoot));
  await privateDir(cacheRoot);
  for (const command of commands) {
    const dir = (process.env.PATH ?? "").split(":").find((entry) => entry && existsSync(join2(entry, command)));
    if (!dir)
      continue;
    const real = await realpath(join2(dir, command));
    if (!real.startsWith(`${home}/`))
      continue;
    const source = dirname2(real);
    const key = createHash2("sha256").update(`${source}\x00${(await stat(real)).mtimeMs}`).digest("hex").slice(0, 16);
    const target = join2(cacheRoot, key);
    if (!existsSync(join2(target, ".complete"))) {
      const staging = `${target}.partial-${process.pid}`;
      await rm(staging, { recursive: true, force: true });
      await mkdir(staging, { recursive: true });
      for (const entry of await readdir2(source, { withFileTypes: true })) {
        if (!entry.isFile())
          continue;
        await copyFile(join2(source, entry.name), join2(staging, entry.name), constants2.COPYFILE_FICLONE);
        await chmod(join2(staging, entry.name), 493);
      }
      await writeFile(join2(staging, ".complete"), "");
      await rm(target, { recursive: true, force: true });
      await rename(staging, target);
    }
    folders.push(target);
  }
  return [...new Set(folders)];
}

// src/trials/heroes.ts
import { spawn } from "node:child_process";
import { existsSync as existsSync2 } from "node:fs";
import { cp as cp2, mkdir as mkdir3, readdir as readdir4, readFile as readFile3, realpath as realpath2, stat as stat3, symlink, writeFile as writeFile3 } from "node:fs/promises";
import { homedir as homedir3 } from "node:os";
import { dirname as dirname3, join as join4 } from "node:path";
import { createInterface } from "node:readline";

// src/trials/spellbook.ts
import { mkdir as mkdir2, readdir as readdir3, readFile as readFile2, rename as rename2, rm as rm2, stat as stat2, writeFile as writeFile2 } from "node:fs/promises";
import { join as join3, posix } from "node:path";

// src/shared/source-url.ts
function parseSourceUrl(raw) {
  const input = raw.trim();
  if (!input || /[\u0000-\u001f\u007f\\]/.test(input))
    throw new Error("Enter a valid HTTP(S) source URL.");
  let url;
  try {
    url = new URL(/^[a-z][a-z\d+.-]*:/i.test(input) ? input : `https:${input.startsWith("//") ? input : `//${input}`}`);
  } catch {
    throw new Error("Enter a valid HTTP(S) source URL.");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:")
    throw new Error("Source URLs must use HTTP or HTTPS.");
  if (url.username || url.password || /^(?:https?:\/\/|\/\/)?[^/?#]*@/i.test(input)) {
    throw new Error("Source URLs must not contain credentials.");
  }
  url.protocol = "https:";
  const sourceUrl = url.href;
  if (url.hostname !== "github.com" && url.hostname !== "skills.sh")
    return { type: "other", sourceUrl };
  let segments;
  try {
    segments = url.pathname.replace(/\/+$/, "").slice(1).split("/").map(decodeURIComponent);
  } catch {
    throw new Error("Source URL has invalid path encoding.");
  }
  const [owner, repo, view, ref, ...path] = segments;
  if (!owner || !repo || !/^[a-z\d][a-z\d-]*$/i.test(owner) || !/^[a-z\d_.-]+$/i.test(repo) || repo === "." || repo === "..") {
    throw new Error("Source URL must include a valid owner and repository.");
  }
  if (url.hostname === "skills.sh") {
    if (segments.length !== 3 || !view || !/^[a-z\d][a-z\d_.-]*$/i.test(view)) {
      throw new Error("Use a skills.sh/owner/repository/skill URL.");
    }
    return { type: "skills.sh", sourceUrl, owner, repo, skill: view };
  }
  if (segments.length === 2)
    return { type: "github", sourceUrl, owner, repo };
  if (view !== "tree" && view !== "blob" || !ref || /[\u0000-\u001f\u007f\\]/.test(ref) || ref.split("/").some((part) => !part || part === "." || part === "..") || path.some((part) => !part || part === "." || part === ".." || /[\u0000-\u001f\u007f/\\]/.test(part))) {
    throw new Error("Use a GitHub repository, tree, or blob URL with a valid ref and path.");
  }
  return { type: "github", sourceUrl, owner, repo, ref, ...path.length ? { path: path.join("/") } : {} };
}

// src/trials/spellbook.ts
var EQUIPPABLE = ["skill", "plugin", "subagent"];
var LIMITS = { files: 300, fileBytes: 1024 * 1024, totalBytes: 4 * 1024 * 1024 };
var SKILL_NAME = /^[a-z0-9][a-z0-9._-]{0,63}$/;
var HAZARDS = [
  [/\b(?:curl|wget)\b[^\n|]*\|\s*(?:ba|z|da)?sh\b/i, "pipes a download into a shell"],
  [/\brm\s+-[a-z]*r[a-z]*\s+(?:\/|~\/?|\$HOME\/?)(?=\s|$)/im, "deletes the root or home folder"],
  [/(?:~|\$HOME|\/Users\/[^/\s]+|\/home\/[^/\s]+)\/\.(?:ssh|aws|gnupg|kube|docker|netrc)\b/i, "reads a credential folder"],
  [/\bsecurity\s+(?:find|dump)-(?:generic|internet)-password\b|\bdump-keychain\b/i, "reads the keychain"],
  [/\blaunchctl\s+(?:load|bootstrap)\b|\bcrontab\s+-[^l]|\/LaunchAgents\//i, "installs a background job"],
  [/(?:^|[\s;&|`(])sudo\s+\S/m, "uses sudo"],
  [/\bbase64\s+(?:-d|-D|--decode)\b[^\n]*\|\s*(?:ba|z)?sh\b/i, "runs decoded text in a shell"],
  [/\beval\s*\(?\s*["'`]?\$\(\s*(?:curl|wget)\b/i, "evaluates downloaded code"],
  [/\b(?:nc|ncat|netcat)\b[^\n]*\s-e\s/i, "opens a reverse shell"]
];
var EXECUTABLE_MAGIC = [[127, 69, 76, 70], [207, 250, 237, 254], [206, 250, 237, 254], [202, 254, 186, 190], [77, 90]];
function skillFolder(sourceUrl, slug) {
  const source = parseSourceUrl(sourceUrl);
  if (source.type === "skills.sh")
    return { owner: source.owner, repo: source.repo, ref: undefined, dirs: [`skills/${source.skill}`, source.skill] };
  if (source.type !== "github")
    return null;
  const path = source.path ?? "";
  const dir = path === "SKILL.md" ? "" : path.endsWith("/SKILL.md") ? posix.dirname(path) : path;
  return { owner: source.owner, repo: source.repo, ref: source.ref, dirs: dir === "" && slug ? ["", `skills/${slug}`] : [dir] };
}
function pluginFolder(sourceUrl) {
  const source = parseSourceUrl(sourceUrl);
  if (source.type !== "github")
    return null;
  const dir = (source.path ?? "").replace(/(?:^|\/)\.claude-plugin\/plugin\.json$/, "");
  return { owner: source.owner, repo: source.repo, ref: source.ref, dirs: [dir] };
}
function agentFile(sourceUrl) {
  const source = parseSourceUrl(sourceUrl);
  return source.type === "github" && source.path?.endsWith(".md") ? { owner: source.owner, repo: source.repo, ref: source.ref, dirs: [source.path] } : null;
}
var frontmatter = (text) => /^(?:\uFEFF)?---[\t ]*\r?\n([\s\S]*?)\r?\n---[\t ]*(?:\r?\n|$)/.exec(text)?.[1];
function frontmatterName(text) {
  const block = frontmatter(text);
  const name = block && /^name:[\t ]*["']?([^"'\r\n]+?)["']?[\t ]*$/m.exec(block)?.[1]?.trim().toLowerCase();
  return name && SKILL_NAME.test(name) ? name : null;
}
function screenPart(path, text) {
  const findings = [];
  if (path.startsWith("hooks/") || posix.basename(path) === "hooks.json")
    findings.push(`${path} defines or runs hooks`);
  if (posix.basename(path) === ".mcp.json")
    findings.push(`${path} configures MCP servers`);
  let keys = [];
  if (path === ".claude-plugin/plugin.json") {
    try {
      keys = Object.keys(JSON.parse(text) ?? {});
    } catch {}
  } else if (path.endsWith(".md"))
    keys = [...(frontmatter(text) ?? "").matchAll(/^([A-Za-z]+):/gm)].map((match) => match[1]);
  if (keys.includes("hooks"))
    findings.push(`${path} declares hooks`);
  if (keys.includes("mcpServers"))
    findings.push(`${path} declares MCP servers`);
  return findings;
}
function screenFile(path, bytes) {
  if (EXECUTABLE_MAGIC.some((magic) => magic.every((byte, i) => bytes[i] === byte)))
    return [`${path} is an executable binary`];
  if (bytes.subarray(0, 8000).includes(0))
    return [];
  const text = new TextDecoder().decode(bytes);
  const findings = [];
  for (const [pattern, reason] of HAZARDS) {
    const match = pattern.exec(text);
    if (match)
      findings.push(`${path}:${text.slice(0, match.index).split(`
`).length} ${reason}`);
  }
  return findings;
}
async function github(url, accept, fetcher) {
  const token = url.startsWith("https://api.github.com/") ? process.env.GITHUB_TOKEN : undefined;
  const response = await fetcher(url, {
    headers: { Accept: accept, "User-Agent": "VibeRPGSimulator-trials", ...token ? { Authorization: `Bearer ${token}` } : {} },
    signal: AbortSignal.timeout(20000)
  });
  if (!response.ok)
    throw new Error(`GitHub answered ${response.status} for ${url.replace(/\?.*$/, "")}`);
  return response;
}
async function cachedSpell(dir) {
  try {
    return JSON.parse(await readFile2(`${dir}.json`, "utf8"));
  } catch {
    return null;
  }
}
async function countFiles(dir) {
  let total = 0;
  for (const entry of await readdir3(dir, { withFileTypes: true, recursive: true }))
    if (entry.isFile())
      total++;
  return total;
}
var REF_TTL_MS = 12 * 60 * 60 * 1000;
var cacheKey = (kind, dir) => kind === "skill" ? dir || "_root" : `_${kind}/${dir || "_root"}`;
async function resolveCommit(folder, keys, cacheRoot, fetcher) {
  const ref = folder.ref ?? "HEAD";
  const file = join3(cacheRoot, "refs", `${folder.owner}__${folder.repo}__${ref.replaceAll("/", "__")}.json`);
  try {
    const cached = JSON.parse(await readFile2(file, "utf8"));
    if (Date.now() - cached.at < REF_TTL_MS && /^[0-9a-f]{40}$/.test(cached.sha))
      return cached.sha;
  } catch {}
  let sha;
  try {
    sha = (await (await github(`https://api.github.com/repos/${folder.owner}/${folder.repo}/commits/${encodeURIComponent(ref)}`, "application/vnd.github.sha", fetcher)).text()).trim();
  } catch (error) {
    const repoDir = join3(cacheRoot, folder.owner, folder.repo);
    const candidates = await readdir3(repoDir, { withFileTypes: true }).catch(() => []);
    const usable = [];
    for (const entry of candidates) {
      if (!entry.isDirectory() || !/^[0-9a-f]{40}$/.test(entry.name))
        continue;
      for (const key of keys) {
        const meta = join3(repoDir, entry.name, `${key}.json`);
        const info = await stat2(meta).catch(() => null);
        if (info)
          usable.push({ sha: entry.name, at: info.mtimeMs });
      }
    }
    const newest = usable.sort((a, b) => b.at - a.at)[0];
    if (!newest)
      throw error;
    console.warn(`${folder.owner}/${folder.repo}: ${error instanceof Error ? error.message : String(error)}; using cached commit ${newest.sha.slice(0, 7)}`);
    return newest.sha;
  }
  if (!/^[0-9a-f]{40}$/.test(sha))
    throw new Error(`GitHub did not return a commit for ${folder.owner}/${folder.repo}@${ref}`);
  await mkdir2(join3(cacheRoot, "refs"), { recursive: true });
  await writeFile2(file, JSON.stringify({ sha, at: Date.now() }));
  return sha;
}
async function equipSpells(skills, opts) {
  const fetcher = opts.fetcher ?? fetch;
  const equipped = [];
  spells:
    for (const skill of skills) {
      const kind = skill.kind;
      if (!EQUIPPABLE.includes(kind))
        throw new Error(`${skill.slug} is a ${skill.kind}; trials equip skills, plugins and subagents only`);
      const folder = kind === "skill" ? skillFolder(skill.sourceUrl, skill.slug) : kind === "plugin" ? pluginFolder(skill.sourceUrl) : agentFile(skill.sourceUrl);
      if (!folder)
        throw new Error(`${skill.slug}: the source is not a GitHub ${kind === "subagent" ? "markdown file" : `${kind} folder`} (${skill.sourceUrl})`);
      const api = `https://api.github.com/repos/${folder.owner}/${folder.repo}`;
      const sha = await resolveCommit(folder, folder.dirs.map((dir) => cacheKey(kind, dir)), opts.cacheRoot, fetcher);
      const entry = kind === "skill" ? "SKILL.md" : ".claude-plugin/plugin.json";
      let picked = null;
      let tree = null;
      for (const dir of folder.dirs) {
        const local = join3(opts.cacheRoot, folder.owner, folder.repo, sha, cacheKey(kind, dir));
        const cached = await cachedSpell(local);
        if (cached) {
          equipped.push({ slug: skill.slug, kind, name: cached.name, dir: local, ref: sha, files: cached.files, hazards: cached.hazards });
          continue spells;
        }
        if (!tree) {
          const listing = await (await github(`${api}/git/trees/${sha}?recursive=1`, "application/vnd.github+json", fetcher)).json();
          if (listing.truncated)
            throw new Error(`${skill.slug}: ${folder.owner}/${folder.repo} is too large to list`);
          tree = listing.tree ?? [];
        }
        const prefix = dir ? `${dir}/` : "";
        const blobs = kind === "subagent" ? tree.filter((item) => item.type === "blob" && item.mode !== "120000" && item.path === dir) : !tree.some((item) => item.type === "blob" && item.path === `${prefix}${entry}`) ? [] : tree.filter((item) => item.type === "blob" && item.mode !== "120000" && item.path.startsWith(prefix) && !item.path.slice(prefix.length).split("/").some((part, depth) => part.startsWith(".") && !(kind === "plugin" && depth === 0 && (part === ".claude-plugin" || part === ".mcp.json"))));
        if (blobs.length === 0)
          continue;
        if (blobs.length > LIMITS.files)
          throw new Error(`${skill.slug}: ${blobs.length} files is over the ${LIMITS.files}-file limit`);
        const total = blobs.reduce((sum, blob) => sum + (blob.size ?? 0), 0);
        if (total > LIMITS.totalBytes || blobs.some((blob) => (blob.size ?? 0) > LIMITS.fileBytes))
          throw new Error(`${skill.slug}: the ${kind} is over the size limit`);
        picked = { dir, blobs: blobs.map((item) => ({ path: item.path, size: item.size ?? 0 })) };
        break;
      }
      if (!picked) {
        const where = folder.dirs.map((dir) => dir || "the repository root").join(" or ");
        throw new Error(`${skill.slug}: ${kind === "subagent" ? `no file ${where}` : `no ${entry} in ${where}`}`);
      }
      const local = join3(opts.cacheRoot, folder.owner, folder.repo, sha, cacheKey(kind, picked.dir));
      const staging = `${local}.partial-${process.pid}`;
      await rm2(staging, { recursive: true, force: true });
      const hazards = [];
      let name = null;
      const prefix = picked.dir ? `${picked.dir}/` : "";
      for (const blob of picked.blobs) {
        const relative = kind === "subagent" ? "agent.md" : blob.path.slice(prefix.length);
        const raw = `https://raw.githubusercontent.com/${folder.owner}/${folder.repo}/${sha}/${blob.path.split("/").map(encodeURIComponent).join("/")}`;
        const bytes = new Uint8Array(await (await github(raw, "*/*", fetcher)).arrayBuffer());
        if (bytes.byteLength > LIMITS.fileBytes)
          throw new Error(`${skill.slug}: ${relative} is over the size limit`);
        hazards.push(...screenFile(relative, bytes));
        const text = kind !== "skill" || relative === "SKILL.md" ? new TextDecoder().decode(bytes) : "";
        if (kind !== "skill")
          hazards.push(...screenPart(relative, text));
        if (kind === "subagent" || kind === "skill" && relative === "SKILL.md")
          name = frontmatterName(text);
        if (relative === entry && kind === "plugin") {
          let manifest;
          try {
            manifest = JSON.parse(text) ?? {};
          } catch {
            throw new Error(`${skill.slug}: ${entry} is not valid JSON`);
          }
          name = typeof manifest.name === "string" && SKILL_NAME.test(manifest.name) ? manifest.name : null;
        }
        await mkdir2(join3(staging, posix.dirname(relative)), { recursive: true });
        await writeFile2(join3(staging, relative), bytes);
      }
      const base = posix.basename(picked.dir || folder.repo, ".md").toLowerCase();
      const spellName = name ?? (SKILL_NAME.test(base) ? base : null);
      if (!spellName)
        throw new Error(`${skill.slug}: ${kind === "subagent" ? "the agent file" : entry} has no usable name`);
      const files = await countFiles(staging);
      await rm2(local, { recursive: true, force: true });
      await mkdir2(join3(local, ".."), { recursive: true });
      await rename2(staging, local);
      await writeFile2(`${local}.json`, `${JSON.stringify({ name: spellName, files, hazards }, null, 2)}
`);
      equipped.push({ slug: skill.slug, kind, name: spellName, dir: local, ref: sha, files, hazards });
    }
  const names = equipped.map((spell) => spell.name);
  const duplicate = names.find((name, i) => names.indexOf(name) !== i);
  if (duplicate)
    throw new Error(`Two equipped spells are both named "${duplicate}"; a harness can load only one`);
  return equipped;
}

// src/trials/heroes.ts
function refuseUnequippable(hero, entries) {
  const entry = entries.find((item) => !hero.kinds.includes(item.kind));
  if (!entry)
    return;
  throw new Error(EQUIPPABLE.includes(entry.kind) ? `${entry.slug} is a ${entry.kind}; only Claude Code can equip ${entry.kind}s in trials` : `${entry.slug} is a ${entry.kind}; trials equip skills, plugins and subagents only`);
}
function runProcess(argv, opts) {
  const { promise, resolve } = Promise.withResolvers();
  const started = performance.now();
  const [command, ...args] = argv;
  const child = spawn(command, args, { cwd: opts.cwd, env: opts.env, detached: true, stdio: ["ignore", "pipe", "pipe"] });
  let stdout = "";
  let stderr = "";
  let timedOut = false;
  child.stdout.setEncoding("utf8").on("data", (chunk) => {
    if (stdout.length < 64000000)
      stdout += chunk;
  });
  child.stderr.setEncoding("utf8").on("data", (chunk) => {
    if (stderr.length < 1e6)
      stderr += chunk;
  });
  const timer = setTimeout(() => {
    timedOut = true;
    killGroup(child.pid, "SIGTERM");
    setTimeout(() => killGroup(child.pid, "SIGKILL"), 5000).unref();
  }, opts.timeoutMs);
  child.on("error", (error) => {
    stderr += String(error);
  });
  child.on("close", (code) => {
    clearTimeout(timer);
    resolve({ code, stdout, stderr, timedOut, durationMs: Math.round(performance.now() - started) });
  });
  return promise;
}
function killGroup(pid, signal) {
  try {
    if (pid)
      process.kill(-pid, signal);
  } catch {}
}
function* jsonLines(text) {
  for (const line of text.split(`
`)) {
    if (!line.startsWith("{"))
      continue;
    try {
      yield JSON.parse(line);
    } catch {}
  }
}
function mishapFrom(text) {
  if (/not logged in|unauthori[sz]ed|\b401\b|please (?:run )?\/?login|sign in|authenticat|token (?:has )?expired|invalid[_ ]grant/i.test(text))
    return "sign-in";
  if (/rate.?limit|\b429\b|usage limit|quota|too many requests/i.test(text))
    return "rate limit";
  if (/overloaded|\b5\d\d\b|ECONN|ETIMEDOUT|network error|stream (?:error|disconnected)|fetch failed|socket hang up/i.test(text))
    return "provider error";
  return "harness error";
}
async function summaries(root, agent, parse) {
  if (!existsSync2(root))
    return [];
  const results = [];
  for (const entry of await readdir4(root, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".jsonl"))
      continue;
    const path = join4(entry.parentPath, entry.name);
    const info = await stat3(path);
    results.push(await parse({ agent, path, size: info.size, mtimeMs: info.mtimeMs, root }));
  }
  return results;
}
var skillNames = (files) => [...new Set(files.flatMap((file) => file.session?.spells ?? []).map((spell) => spell.id).filter((id) => id.startsWith("skill:")).map((id) => id.slice(6).split(":").pop()))].sort();
var asFocus = (value, fallback) => typeof value === "string" && FOCUS_LEVELS.includes(value) ? value : fallback;
var baseEnv = (home, tmp) => ({ PATH: process.env.PATH ?? "/usr/bin:/bin", HOME: home, TMPDIR: tmp, LANG: "en_US.UTF-8", USER: process.env.USER ?? "quester" });
var TRANSCRIPT_LIMIT = 64000000;
var CODEX_TOOL_ITEMS = new Set(["command_execution", "file_change", "mcp_tool_call", "web_search"]);
function codexCostUsd(totals, model, at, prices) {
  const card = priceCard(model, at, prices);
  if (!card)
    return null;
  const fresh = Math.max(0, totals.input - totals.cached - totals.cacheWrites);
  return Math.round(cardMana(card, { input: fresh, cacheRead: totals.cached, cacheWrite: totals.cacheWrites, output: totals.output })) / MANA_PER_USD;
}
function codexConfig(caster, focus, realHome, temp, readable) {
  return [
    ...caster ? [`model = ${JSON.stringify(caster)}`] : [],
    ...focus !== "default" ? [`model_reasoning_effort = ${JSON.stringify(focus)}`] : [],
    'approval_policy = "never"',
    'default_permissions = "arena"',
    'web_search = "disabled"',
    "",
    "[permissions.arena]",
    'description = "VibeRPGSimulator quest arena"',
    'extends = ":workspace"',
    "",
    "[permissions.arena.filesystem]",
    `${JSON.stringify(realHome)} = "deny"`,
    `${JSON.stringify(temp)} = "deny"`,
    ...readable.map((path) => `${JSON.stringify(path)} = "read"`),
    "",
    "[permissions.arena.network]",
    "enabled = false",
    "",
    "[features]",
    "memories = false",
    "apps = false",
    "plugins = false",
    "remote_plugin = false",
    ""
  ].join(`
`);
}
var codex = {
  id: "codex",
  containment: "sealed",
  focusLevels: ["default", "minimal", "low", "medium", "high", "xhigh"],
  kinds: ["skill"],
  async start({ arena, spells, caster, focus, timeLimitMs, prices }) {
    const startedAt = new Date;
    refuseUnequippable(codex, spells);
    const realHome = homedir3();
    const codexHome = join4(arena.home, ".codex");
    await mkdir3(join4(codexHome, "skills"), { recursive: true });
    const shared = join4(dirname3(arena.root), ".codex-shared", "chatgpt-meetings");
    await mkdir3(shared, { recursive: true });
    await symlink(shared, join4(codexHome, "chatgpt-meetings"));
    for (const spell of spells)
      await cp2(spell.dir, join4(codexHome, "skills", spell.name), { recursive: true });
    const auth = join4(realHome, ".codex", "auth.json");
    if (existsSync2(auth))
      await symlink(auth, join4(codexHome, "auth.json"));
    const clones = await cloneOutOfHome(["codex", "node"]);
    await writeFile3(join4(codexHome, "config.toml"), codexConfig(caster, focus, realHome, tempRoot(), [arena.home, ...await Promise.all(clones.map((dir) => realpath2(dir)))]));
    const base = baseEnv(arena.home, arena.tmp);
    const env = { ...base, PATH: [...clones, base.PATH].join(":"), CODEX_HOME: codexHome };
    let thread = null;
    let totals = null;
    let toolCalls = 0;
    return {
      async send(prompt) {
        const argv = thread ? ["codex", "exec", "resume", thread, "--json", "--skip-git-repo-check", prompt] : ["codex", "exec", "--json", "--skip-git-repo-check", "-C", arena.workspace, prompt];
        const result = await runProcess(argv, { cwd: arena.workspace, env, timeoutMs: timeLimitMs });
        let failure = "";
        let completed = false;
        let reply = "";
        for (const event of jsonLines(result.stdout)) {
          if (event.type === "thread.started" && typeof event.thread_id === "string")
            thread = event.thread_id;
          else if (event.type === "item.completed" && CODEX_TOOL_ITEMS.has(event.item?.type))
            toolCalls++;
          else if (event.type === "item.completed" && event.item?.type === "agent_message" && typeof event.item.text === "string")
            reply = event.item.text;
          else if (event.type === "turn.completed") {
            completed = true;
            const usage = event.usage ?? {};
            totals = { input: Number(usage.input_tokens) || 0, cached: Number(usage.cached_input_tokens) || 0, cacheWrites: Number(usage.cache_write_input_tokens) || 0, output: Number(usage.output_tokens) || 0 };
          } else if (event.type === "turn.failed")
            failure += ` ${event.error?.message ?? ""}`;
          else if (event.type === "error")
            failure += ` ${event.message ?? ""}`;
        }
        const mishap = result.timedOut || completed ? null : mishapFrom(`${failure} ${result.stderr}`);
        return { durationMs: result.durationMs, timedOut: result.timedOut, mishap, reply };
      },
      async finish() {
        const files = await summaries(join4(codexHome, "sessions"), "codex", parseCodexFile);
        let model = null;
        let effort = null;
        for (const file of files) {
          for (const event of jsonLines(await readFile3(file.path, "utf8"))) {
            if (event.type !== "turn_context")
              continue;
            model = typeof event.payload?.model === "string" ? event.payload.model : model;
            effort = event.payload?.effort ?? effort;
          }
        }
        const priced = model ?? caster;
        return {
          heroVersion: files.map((file) => file.session?.harnessVersion ?? null).find(Boolean) ?? null,
          caster: priced,
          focus: asFocus(effort, focus),
          tokens: totals && totals.input + totals.output,
          outputTokens: totals?.output ?? null,
          toolCalls,
          costUsd: totals && priced ? codexCostUsd(totals, priced, startedAt, prices) : null,
          opened: skillNames(files)
        };
      }
    };
  }
};
var OMP_TOOLS = "read,bash,edit,write,grep,glob,todo";
function ompOverlay(loadout, names) {
  const skills = names.length === 0 ? ["skills:", "  enabled: false"] : [
    "skills:",
    "  enabled: true",
    ...["enableCodexUser", "enableClaudeUser", "enableClaudeProject", "enablePiUser", "enablePiProject", "enableAgentsUser", "enableAgentsProject"].map((key) => `  ${key}: false`),
    "  customDirectories:",
    `    - ${JSON.stringify(loadout)}`,
    "  includeSkills:",
    ...names.map((name) => `    - ${JSON.stringify(name)}`)
  ];
  return [
    "memory:",
    "  backend: off",
    "autolearn:",
    "  enabled: false",
    "advisor:",
    "  enabled: false",
    "ttsr:",
    "  enabled: false",
    "disabledExtensions:",
    ...["user:AGENTS.md", "user:CLAUDE.md", "project:AGENTS.md", "project:CLAUDE.md"].map((id) => `  - context-file:${id}`),
    ...skills,
    ""
  ].join(`
`);
}
async function ompVersion() {
  const result = await runProcess(["omp", "--version"], { cwd: homedir3(), env: baseEnv(homedir3(), process.env.TMPDIR ?? "/tmp"), timeoutMs: 15000 });
  return harnessVersion(/(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)/.exec(result.stdout)?.[1]);
}
var omp = {
  id: "omp",
  containment: WARD_AVAILABLE ? "warded" : "open",
  focusLevels: ["default", "off", "minimal", "low", "medium", "high", "xhigh", "max"],
  kinds: ["skill"],
  async start({ arena, spells, caster, focus, timeLimitMs }) {
    refuseUnequippable(omp, spells);
    const realHome = homedir3();
    const loadout = join4(arena.home, "loadout");
    const sessions = join4(arena.home, "sessions");
    await mkdir3(loadout, { recursive: true });
    await mkdir3(sessions, { recursive: true });
    for (const spell of spells)
      await cp2(spell.dir, join4(loadout, spell.name), { recursive: true });
    const overlay = join4(arena.home, "omp.yml");
    await writeFile3(overlay, ompOverlay(loadout, spells.map((spell) => spell.name)));
    const ompDir = join4(realHome, ".omp");
    const locked = ["config.yml", "config.yaml", "models.yml", "AGENTS.md", "RULES.md", "SYSTEM.md", ".env", "extensions", "skills", "managed-skills", "agents", "hooks", "rules", "commands", "prompts"].map((name) => join4(ompDir, "agent", name));
    const prefix = await ward(arena, "omp", {
      read: [join4(realHome, ".bun"), ompDir, ...await commandReadPaths("node")],
      write: [ompDir],
      locked: [...locked, join4(ompDir, "plugins"), join4(ompDir, "profiles")],
      network: true
    });
    const env = { ...baseEnv(realHome, arena.tmp), PI_NO_TITLE: "1" };
    const version = await ompVersion();
    let first = true;
    let tokens = null;
    let outputTokens = null;
    let cost = null;
    let toolCalls = 0;
    let model = null;
    return {
      async send(prompt) {
        const argv = [
          ...prefix,
          "omp",
          "-p",
          "--mode",
          "json",
          "--config",
          overlay,
          "--no-extensions",
          "--no-rules",
          "--no-title",
          "--no-lsp",
          "--session-dir",
          sessions,
          "--tools",
          OMP_TOOLS,
          ...caster ? ["--model", caster] : [],
          ...focus !== "default" ? ["--thinking", focus] : [],
          ...first ? [] : ["--continue"],
          prompt
        ];
        first = false;
        const result = await runProcess(argv, { cwd: arena.workspace, env, timeoutMs: timeLimitMs });
        let failure = "";
        let answered = false;
        let reply = "";
        for (const event of jsonLines(result.stdout)) {
          const message = event.message;
          if (event.type !== "message_end" || message?.role !== "assistant")
            continue;
          answered = true;
          const usage = message.usage ?? {};
          if (typeof usage.totalTokens === "number")
            tokens = (tokens ?? 0) + usage.totalTokens;
          if (typeof usage.output === "number")
            outputTokens = (outputTokens ?? 0) + usage.output;
          if (typeof usage.cost?.total === "number")
            cost = (cost ?? 0) + usage.cost.total;
          toolCalls += (message.content ?? []).filter((part) => part.type === "toolCall").length;
          if (typeof message.model === "string")
            model = message.provider ? `${message.provider}/${message.model}` : message.model;
          if (message.stopReason === "error")
            failure += ` ${message.errorMessage ?? message.error ?? "provider error"}`;
          const text = (message.content ?? []).filter((part) => part.type === "text").map((part) => part.text ?? "").join("").trim();
          if (text)
            reply = text;
        }
        const mishap = result.timedOut ? null : failure ? mishapFrom(failure) : result.code !== 0 || !answered ? mishapFrom(result.stderr) : null;
        return { durationMs: result.durationMs, timedOut: result.timedOut, mishap, reply };
      },
      async finish() {
        return {
          heroVersion: version,
          caster: model ?? caster,
          focus,
          tokens,
          outputTokens,
          toolCalls,
          costUsd: cost === null ? null : Math.round(cost * 1e4) / 1e4,
          opened: skillNames(await summaries(sessions, "omp", parseOmpFile))
        };
      }
    };
  }
};
function claudeSettings(realHome, temp, arena) {
  return {
    sandbox: {
      enabled: true,
      failIfUnavailable: true,
      allowUnsandboxedCommands: false,
      autoAllowBashIfSandboxed: true,
      filesystem: { denyRead: [realHome, temp], allowRead: [arena.workspace, arena.home, arena.tmp] }
    },
    permissions: { deny: ["WebFetch", "WebSearch", `Read(/${realHome}/**)`] },
    disableAllHooks: true,
    disableSkillShellExecution: true
  };
}
var claudeCode = {
  id: "claude-code",
  containment: "sealed",
  focusLevels: ["default", "low", "medium", "high", "xhigh", "max"],
  kinds: EQUIPPABLE,
  async start({ arena, spells, caster, focus, timeLimitMs }) {
    const realHome = homedir3();
    const owners = new Map;
    const pluginSkills = new Map;
    const pluginDirs = [];
    for (const spell of spells) {
      if (spell.kind === "skill")
        await cp2(spell.dir, join4(arena.workspace, ".claude", "skills", spell.name), { recursive: true });
      else if (spell.kind === "subagent")
        await cp2(join4(spell.dir, "agent.md"), join4(arena.workspace, ".claude", "agents", `${spell.name}.md`));
      else {
        const dir = join4(arena.home, "plugins", spell.name);
        await cp2(spell.dir, dir, { recursive: true });
        pluginDirs.push("--plugin-dir", dir);
        owners.set(`${spell.name}:`, spell.name);
        for (const entry of await readdir4(join4(dir, "skills")).catch(() => []))
          pluginSkills.set(`plugins/${spell.name}/skills/${entry}`, spell.name);
        continue;
      }
      owners.set(spell.name, spell.name);
    }
    const owner = (id) => {
      if (typeof id !== "string")
        return;
      const clean = id.replace(/^\//, "").split(/\s/)[0];
      return owners.get(clean) ?? (clean.includes(":") ? owners.get(clean.slice(0, clean.indexOf(":") + 1)) : undefined);
    };
    const argv = [
      "claude",
      "-p",
      "--input-format",
      "stream-json",
      "--output-format",
      "stream-json",
      "--verbose",
      "--no-session-persistence",
      "--setting-sources",
      "project",
      "--strict-mcp-config",
      "--mcp-config",
      '{"mcpServers":{}}',
      "--permission-mode",
      "acceptEdits",
      "--permission-prompts",
      "none",
      "--settings",
      JSON.stringify(claudeSettings(realHome, tempRoot(), arena)),
      ...pluginDirs,
      ...caster ? ["--model", caster] : [],
      ...focus !== "default" ? ["--effort", focus] : []
    ];
    const child = spawn(argv[0], argv.slice(1), { cwd: arena.workspace, env: baseEnv(realHome, arena.tmp), detached: true, stdio: ["pipe", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.setEncoding("utf8").on("data", (chunk) => {
      if (stderr.length < 1e6)
        stderr += chunk;
    });
    const transcript = [];
    let transcriptBytes = 0;
    const waiting = [];
    const backlog = [];
    createInterface({ input: child.stdout }).on("line", (line) => {
      if (!line.startsWith("{"))
        return;
      if (transcriptBytes + line.length <= TRANSCRIPT_LIMIT) {
        transcript.push(line);
        transcriptBytes += line.length;
      }
      try {
        const event = JSON.parse(line);
        if (event.type !== "result")
          return;
        const next = waiting.shift();
        if (next)
          next(event);
        else
          backlog.push(event);
      } catch {}
    });
    let ended = false;
    child.on("close", () => {
      ended = true;
      for (const resolve of waiting.splice(0))
        resolve(null);
    });
    let usage = { tokens: null, outputTokens: null, cost: null };
    return {
      async send(prompt) {
        const started = performance.now();
        if (ended)
          return { durationMs: 0, timedOut: false, mishap: mishapFrom(stderr), reply: "" };
        const result = Promise.withResolvers();
        const ready = backlog.shift();
        if (ready)
          result.resolve(ready);
        else
          waiting.push(result.resolve);
        child.stdin.write(`${JSON.stringify({ type: "user", message: { role: "user", content: [{ type: "text", text: prompt }] } })}
`);
        const deadline = Promise.withResolvers();
        const timer = setTimeout(() => deadline.resolve("timeout"), timeLimitMs);
        const outcome = await Promise.race([result.promise, deadline.promise]);
        clearTimeout(timer);
        const durationMs = Math.round(performance.now() - started);
        if (outcome === "timeout") {
          killGroup(child.pid, "SIGTERM");
          return { durationMs, timedOut: true, mishap: null, reply: "" };
        }
        if (outcome === null)
          return { durationMs, timedOut: false, mishap: mishapFrom(stderr), reply: "" };
        const turnUsage = outcome.usage ?? {};
        const turnTokens = ["input_tokens", "cache_creation_input_tokens", "cache_read_input_tokens", "output_tokens"].reduce((sum, key) => sum + (Number(turnUsage[key]) || 0), 0);
        usage = {
          tokens: (usage.tokens ?? 0) + turnTokens,
          outputTokens: (usage.outputTokens ?? 0) + (Number(turnUsage.output_tokens) || 0),
          cost: typeof outcome.total_cost_usd === "number" ? outcome.total_cost_usd : usage.cost
        };
        const failed = outcome.is_error === true || outcome.subtype === "error_during_execution";
        return { durationMs, timedOut: false, mishap: failed ? mishapFrom(`${outcome.result ?? ""} ${outcome.terminal_reason ?? ""} ${stderr}`) : null, reply: typeof outcome.result === "string" ? outcome.result : "" };
      },
      async finish() {
        child.stdin.end();
        const closed = Promise.withResolvers();
        if (ended)
          closed.resolve();
        else
          child.on("close", () => closed.resolve());
        const grace = setTimeout(() => killGroup(child.pid, "SIGKILL"), 1e4);
        await closed.promise;
        clearTimeout(grace);
        await writeFile3(join4(arena.home, "claude-stream.jsonl"), `${transcript.join(`
`)}
`);
        let model = null;
        let version = null;
        let toolCalls = 0;
        const read = new Set;
        for (const event of jsonLines(transcript.join(`
`))) {
          if (event.type === "system" && event.subtype === "init") {
            model = typeof event.model === "string" ? event.model : model;
            version = harnessVersion(event.claude_code_version) ?? version;
          }
          if (event.type !== "assistant")
            continue;
          for (const part of event.message?.content ?? []) {
            if (part?.type !== "tool_use")
              continue;
            toolCalls++;
            const used = part.name === "Skill" ? part.input?.skill ?? part.input?.command : part.name === "SlashCommand" ? part.input?.command : part.name === "Task" || part.name === "Agent" ? part.input?.subagent_type : null;
            const name = owner(used);
            if (name)
              read.add(name);
            const target = part.name === "Read" ? part.input?.file_path : part.name === "Bash" ? part.input?.command : null;
            if (typeof target !== "string")
              continue;
            for (const match of target.matchAll(SKILL_PATH)) {
              const name = owners.get(match[1]) ?? [...pluginSkills].find(([path]) => target.replaceAll("\\", "/").includes(`${path}/SKILL.md`))?.[1];
              if (name)
                read.add(name);
            }
          }
        }
        return {
          heroVersion: version,
          caster: model ?? caster,
          focus,
          tokens: usage.tokens,
          outputTokens: usage.outputTokens,
          toolCalls,
          costUsd: usage.cost === null ? null : Math.round(usage.cost * 1e4) / 1e4,
          opened: [...read].sort()
        };
      }
    };
  }
};
var HEROES = { codex, omp, "claude-code": claudeCode };

// src/trials/results.ts
import { appendFile, mkdir as mkdir4, readdir as readdir6, readFile as readFile4, stat as stat4, unlink, writeFile as writeFile4 } from "node:fs/promises";
import { dirname as dirname4, join as join6 } from "node:path";

// src/trials/diff.ts
import { constants as constants3 } from "node:fs";
import { open as open2, readdir as readdir5, realpath as realpath3 } from "node:fs/promises";
import { join as join5, sep as sep3 } from "node:path";
var SKIP = new Set([".claude", ".codex", ".agents", ".omp", "node_modules", ".git"]);
var MAX_BYTES = 200000;
var MAX_CELLS = 4000000;
async function listFiles(root, dir = "") {
  const found = [];
  for (const entry of await readdir5(join5(root, dir), { withFileTypes: true }).catch(() => [])) {
    const rel = dir ? `${dir}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (!SKIP.has(entry.name))
        found.push(...await listFiles(root, rel));
    } else if (entry.isFile())
      found.push(rel);
  }
  return found;
}
function lineOps(a, b) {
  let start = 0;
  while (start < a.length && start < b.length && a[start] === b[start])
    start++;
  let endA = a.length, endB = b.length;
  while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
    endA--;
    endB--;
  }
  const x = a.slice(start, endA), y = b.slice(start, endB);
  const middle = [];
  if (x.length * y.length > MAX_CELLS) {
    middle.push(...x.map((line) => ["-", line]), ...y.map((line) => ["+", line]));
  } else {
    const width = y.length + 1;
    const lcs = new Uint32Array((x.length + 1) * width);
    for (let i = x.length - 1;i >= 0; i--) {
      for (let j = y.length - 1;j >= 0; j--) {
        lcs[i * width + j] = x[i] === y[j] ? lcs[(i + 1) * width + j + 1] + 1 : Math.max(lcs[(i + 1) * width + j], lcs[i * width + j + 1]);
      }
    }
    let i = 0, j = 0;
    while (i < x.length && j < y.length) {
      if (x[i] === y[j]) {
        middle.push([" ", x[i]]);
        i++;
        j++;
      } else if (lcs[(i + 1) * width + j] >= lcs[i * width + j + 1])
        middle.push(["-", x[i++]]);
      else
        middle.push(["+", y[j++]]);
    }
    while (i < x.length)
      middle.push(["-", x[i++]]);
    while (j < y.length)
      middle.push(["+", y[j++]]);
  }
  return [...a.slice(0, start).map((line) => [" ", line]), ...middle, ...a.slice(endA).map((line) => [" ", line])];
}
function hunks(ops, context) {
  const aLine = [], bLine = [];
  let a = 1, b = 1;
  for (const [kind] of ops) {
    aLine.push(a);
    bLine.push(b);
    if (kind !== "+")
      a++;
    if (kind !== "-")
      b++;
  }
  const changes = ops.flatMap(([kind], index) => kind === " " ? [] : [index]);
  const lines = [];
  for (let first = 0;first < changes.length; ) {
    let last = first;
    while (last + 1 < changes.length && changes[last + 1] - changes[last] <= 2 * context + 1)
      last++;
    const from = Math.max(0, changes[first] - context), to = Math.min(ops.length, changes[last] + context + 1);
    const slice = ops.slice(from, to);
    const aCount = slice.filter(([kind]) => kind !== "+").length, bCount = slice.filter(([kind]) => kind !== "-").length;
    lines.push(`@@ -${aCount > 0 ? aLine[from] : aLine[from] - 1},${aCount} +${bCount > 0 ? bLine[from] : bLine[from] - 1},${bCount} @@`, ...slice.map(([kind, text]) => kind + text));
    first = last + 1;
  }
  return lines;
}
var textLines = (bytes) => {
  if (!bytes)
    return [];
  const lines = bytes.toString("utf8").split(`
`);
  if (lines.at(-1) === "")
    lines.pop();
  return lines;
};
async function readContained(root, realRoot, rel) {
  const path = join5(root, rel);
  const handle = await open2(path, constants3.O_RDONLY | constants3.O_NOFOLLOW).catch((error) => error.code === "ENOENT" ? "absent" : "refused");
  if (typeof handle === "string")
    return handle;
  try {
    const info = await handle.stat();
    if (!info.isFile() || info.nlink !== 1 || !(await realpath3(path)).startsWith(realRoot + sep3))
      return "refused";
    if (info.size > MAX_BYTES)
      return "large";
    const buffer = Buffer.alloc(info.size + 1);
    let total = 0;
    while (total < buffer.length) {
      const { bytesRead } = await handle.read(buffer, total, buffer.length - total, total);
      if (bytesRead === 0)
        break;
      total += bytesRead;
    }
    return total > MAX_BYTES ? "large" : buffer.subarray(0, total);
  } finally {
    await handle.close();
  }
}
async function treeDiff(before, after, context = 2) {
  const [realBefore, realAfter] = await Promise.all([realpath3(before), realpath3(after)]);
  const paths = [...new Set([...await listFiles(before), ...await listFiles(after)])].sort();
  const out = [];
  for (const rel of paths) {
    const [a, b] = await Promise.all([readContained(before, realBefore, rel), readContained(after, realAfter, rel)]);
    if (a === "refused" || b === "refused") {
      out.push(`Skipped ${rel}: not a regular file inside the workspace`);
      continue;
    }
    if (Buffer.isBuffer(a) && Buffer.isBuffer(b) && a.equals(b))
      continue;
    const from = a === "absent" ? "/dev/null" : `a/${rel}`, to = b === "absent" ? "/dev/null" : `b/${rel}`;
    if (a === "large" || b === "large" || [a, b].some((bytes) => Buffer.isBuffer(bytes) && bytes.subarray(0, 8000).includes(0))) {
      out.push(`Binary files ${from} and ${to} differ`);
      continue;
    }
    out.push(`--- ${from}`, `+++ ${to}`, ...hunks(lineOps(textLines(Buffer.isBuffer(a) ? a : null), textLines(Buffer.isBuffer(b) ? b : null)), context));
  }
  return out.join(`
`);
}
function diffLines(diff) {
  let added = 0, removed = 0, oldLeft = 0, newLeft = 0;
  for (const line of diff.split(`
`)) {
    if (oldLeft > 0 || newLeft > 0) {
      if (line.startsWith("+")) {
        added++;
        newLeft--;
      } else if (line.startsWith("-")) {
        removed++;
        oldLeft--;
      } else {
        oldLeft--;
        newLeft--;
      }
      continue;
    }
    const hunk = /^@@ -\d+,(\d+) \+\d+,(\d+) @@$/.exec(line);
    if (hunk) {
      oldLeft = Number(hunk[1]);
      newLeft = Number(hunk[2]);
    }
  }
  return { added, removed };
}

// src/trials/results.ts
async function appendRun(run, file) {
  await mkdir4(dirname4(file), { recursive: true });
  await appendFile(file, `${JSON.stringify(run)}
`);
}
async function saveOutput(output, dir) {
  await mkdir4(dir, { recursive: true });
  await writeFile4(join6(dir, `${output.runId}.json`), JSON.stringify(output));
}
async function readRuns(file) {
  let text;
  try {
    text = await readFile4(file, "utf8");
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT")
      return [];
    throw error;
  }
  return text.split(`
`).flatMap((line) => {
    if (!line.trim())
      return [];
    try {
      const run = JSON.parse(line);
      return run.v === 1 ? [run] : [];
    } catch {
      return [];
    }
  });
}
async function withLines(runs, dir) {
  return Promise.all(runs.map(async (run) => {
    if (run.linesAdded != null && run.linesRemoved != null)
      return run;
    let output;
    try {
      output = JSON.parse(await readFile4(join6(dir, `${run.id}.json`), "utf8"));
    } catch {
      return run;
    }
    if (typeof output.diff !== "string")
      return run;
    const lines = diffLines(output.diff);
    return { ...run, linesAdded: lines.added, linesRemoved: lines.removed };
  }));
}
function median(values) {
  if (values.length === 0)
    return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
function cellsFromRuns(runs, quests, content) {
  const versions = new Map(quests.map((quest) => [quest.id, quest.version]));
  const spells = new Set(content.skills.map((skill) => skill.slug));
  const workflows = new Set(content.workflows.map((workflow) => workflow.slug));
  const groups = new Map;
  for (const run of runs) {
    if (versions.get(run.quest) !== run.questVersion)
      continue;
    if (!run.loadout.spells.every((slug) => spells.has(slug)))
      continue;
    if (run.loadout.kind === "workflow" && !workflows.has(run.loadout.slug ?? ""))
      continue;
    const key = setupKey(run);
    const group = groups.get(key);
    if (group)
      group.push(run);
    else
      groups.set(key, [run]);
  }
  const cells = [];
  for (const group of groups.values()) {
    const first = group[0];
    const valid = group.filter((run) => run.outcome !== "mishap");
    if (valid.length === 0)
      continue;
    const cleared = valid.filter((run) => run.outcome === "cleared");
    const days = group.map((run) => run.startedAt.slice(0, 10)).sort();
    const rounded = (value) => value === null ? null : Math.round(value);
    const cost = median(valid.flatMap((run) => run.costUsd === null ? [] : [run.costUsd]));
    cells.push({
      quest: first.quest,
      questVersion: first.questVersion,
      loadout: first.loadout,
      cast: first.cast,
      hero: first.hero,
      heroVersion: first.heroVersion,
      caster: first.caster,
      focus: first.focus,
      containment: first.containment,
      environment: first.environment,
      source: { kind: "curator", name: null },
      runs: valid.length,
      mishaps: group.length - valid.length,
      cleared: cleared.length,
      oneShot: cleared.filter((run) => run.clearedAtPrompt === 1).length,
      attuned: valid.filter((run) => run.attuned.length > 0).length,
      medianPromptsToClear: median(cleared.map((run) => run.clearedAtPrompt ?? run.prompts)),
      meanScore: Math.round(valid.reduce((sum, run) => sum + run.score, 0) / valid.length * 1000) / 1000,
      medianDurationMs: rounded(median(valid.map((run) => run.durationMs))),
      medianTokens: rounded(median(valid.flatMap((run) => run.tokens === null ? [] : [run.tokens]))),
      medianToolCalls: rounded(median(valid.flatMap((run) => run.toolCalls === null ? [] : [run.toolCalls]))),
      medianCostUsd: cost === null ? null : Math.round(cost * 1e4) / 1e4,
      medianOutputTokens: rounded(median(valid.flatMap((run) => run.outputTokens == null ? [] : [run.outputTokens]))),
      medianLinesAdded: rounded(median(valid.flatMap((run) => run.linesAdded == null ? [] : [run.linesAdded]))),
      medianLinesRemoved: rounded(median(valid.flatMap((run) => run.linesRemoved == null ? [] : [run.linesRemoved]))),
      firstRun: days[0],
      lastRun: days[days.length - 1]
    });
  }
  const kindOrder = { unarmed: 0, spell: 1, workflow: 2, combo: 3 };
  return cells.sort((a, b) => a.quest.localeCompare(b.quest) || kindOrder[a.loadout.kind] - kindOrder[b.loadout.kind] || a.loadout.spells.join().localeCompare(b.loadout.spells.join()) || a.hero.localeCompare(b.hero) || a.caster.localeCompare(b.caster) || a.focus.localeCompare(b.focus) || (a.heroVersion ?? "").localeCompare(b.heroVersion ?? ""));
}
function setupKey(item) {
  return JSON.stringify([item.quest, item.questVersion, item.loadout, item.cast, item.hero, item.heroVersion, item.caster, item.focus, item.containment, item.environment.os, item.environment.arch]);
}

// src/trials/run.ts
import { randomUUID } from "node:crypto";
import { realpath as realpath4 } from "node:fs/promises";
import { join as join8 } from "node:path";

// src/trials/checks.ts
import { spawn as spawn2 } from "node:child_process";
import { cp as cp3, lstat as lstat3, mkdir as mkdir5, mkdtemp as mkdtemp2, readdir as readdir7, readFile as readFile5, rm as rm3 } from "node:fs/promises";
import { basename as basename2, join as join7 } from "node:path";
var OUTPUT_LIMIT = 1e6;
function nodeRunner(prefix = []) {
  return (args, { cwd, timeoutMs }) => {
    const { promise, resolve } = Promise.withResolvers();
    const [command, ...commandArgs] = [...prefix, "node", ...args];
    const child = spawn2(command, commandArgs, {
      cwd,
      detached: process.platform !== "win32",
      stdio: ["ignore", "pipe", "pipe"],
      env: { PATH: process.env.PATH ?? "", HOME: cwd, TMPDIR: cwd, LANG: "C.UTF-8" }
    });
    let stdout = "", stderr = "", timedOut = false, overflowed = false;
    const stop = () => {
      if (child.pid && process.platform !== "win32") {
        try {
          process.kill(-child.pid, "SIGKILL");
        } catch {
          child.kill("SIGKILL");
        }
      } else
        child.kill("SIGKILL");
    };
    const keep = (text, chunk) => {
      if (overflowed)
        return text;
      if (text.length + chunk.length <= OUTPUT_LIMIT)
        return text + chunk.toString();
      overflowed = true;
      stop();
      return `${text}
[output limit reached; the check was stopped]`;
    };
    child.stdout.on("data", (chunk) => {
      stdout = keep(stdout, chunk);
    });
    child.stderr.on("data", (chunk) => {
      stderr = keep(stderr, chunk);
    });
    const timer = setTimeout(() => {
      timedOut = true;
      stop();
    }, timeoutMs);
    child.once("error", () => {
      clearTimeout(timer);
      resolve({ code: null, stdout, stderr, timedOut });
    });
    child.once("close", (code) => {
      clearTimeout(timer);
      resolve({ code: overflowed ? null : code, stdout, stderr, timedOut });
    });
    return promise;
  };
}
var runNode = nodeRunner();
var OMIT = new Set([".git", "node_modules", ".agents", ".claude", ".codex", ".omp"]);
async function copyWorkspace(source, dest) {
  await cp3(source, dest, { recursive: true, filter: async (path) => !OMIT.has(basename2(path)) && !(await lstat3(path)).isSymbolicLink() });
}
async function testFiles(root, dir) {
  const folder = join7(root, dir);
  const entries = await readdir7(folder, { withFileTypes: true }).catch(() => []);
  const files = [];
  for (const entry of entries) {
    if (OMIT.has(entry.name))
      continue;
    const path = join7(dir, entry.name);
    if (entry.isDirectory())
      files.push(...await testFiles(root, path));
    else if (entry.isFile() && /\.test\.(?:mjs|cjs|js)$/.test(entry.name))
      files.push(path);
  }
  return files.sort();
}
function tap(stdout) {
  const count = (name) => Number([...stdout.matchAll(new RegExp(`^# ${name} (\\d+)\\s*$`, "gm"))].at(-1)?.[1] ?? 0);
  const total = count("tests"), passed = count("pass"), failed = count("fail");
  const names = [...stdout.matchAll(/^\s*not ok \d+ - (.+)$/gm)].map((match) => match[1].trim()).filter((name) => !/# (?:SKIP|TODO)\b/i.test(name));
  return { total, passed, failed, runnable: total - count("skipped") - count("todo"), names };
}
function blocks(text) {
  const lines = text.match(/[^\n]*\n|[^\n]+$/g) ?? [];
  const found = [];
  let offset = 0;
  for (let i = 0;i < lines.length; ) {
    const line = lines[i];
    const fence = /^ {0,3}(`{3,}|~{3,})/.exec(line);
    const kind = fence ? "code" : line.startsWith(">") ? "quote" : line.startsWith("|") ? "table" : undefined;
    if (!kind) {
      offset += line.length;
      i++;
      continue;
    }
    const start = offset;
    let textBlock = line;
    offset += line.length;
    i++;
    if (fence) {
      const marker = fence[1];
      const close = new RegExp(`^ {0,3}${marker[0]}{${marker.length},}[ \\t]*(?:\\r?\\n)?$`);
      while (i < lines.length) {
        const next = lines[i++];
        textBlock += next;
        offset += next.length;
        if (close.test(next))
          break;
      }
    } else {
      const prefix = kind === "quote" ? ">" : "|";
      while (i < lines.length && lines[i].startsWith(prefix)) {
        const next = lines[i++];
        textBlock += next;
        offset += next.length;
      }
    }
    found.push({ kind, start, end: offset, text: textBlock });
  }
  return found;
}
function skipRegions(text, skip) {
  const chars = text.split("");
  const mask = (start, end) => {
    for (let i = start;i < end; i++)
      if (chars[i] !== `
` && chars[i] !== "\r")
        chars[i] = " ";
  };
  for (const block of blocks(text))
    if (skip.includes(block.kind))
      mask(block.start, block.end);
  if (skip.includes("inline-code")) {
    const visible = chars.join("");
    for (const match of visible.matchAll(/(`+)([\s\S]*?)\1/g))
      mask(match.index, match.index + match[0].length);
  }
  if (skip.includes("link-url")) {
    const visible = chars.join("");
    for (let i = 0;i < visible.length - 1; i++) {
      if (visible[i] !== "]" || visible[i + 1] !== "(")
        continue;
      let depth = 1, end = i + 2;
      for (;end < visible.length && depth > 0; end++) {
        if (visible[end] === "\\") {
          end++;
          continue;
        }
        if (visible[end] === "(")
          depth++;
        if (visible[end] === ")")
          depth--;
      }
      if (depth === 0) {
        mask(i + 1, end);
        i = end - 1;
      }
    }
  }
  return chars.join("");
}
function numbers(text) {
  return (text.match(/\d{1,3}(?:,\d{3})+(?:\.\d+)*|\d+(?:\.\d+)*/g) ?? []).map((value) => value.replaceAll(",", ""));
}
function words(text) {
  return text.match(/\S+/gu)?.length ?? 0;
}
async function checkOne(check, quest, root, runner, timeoutMs) {
  const result = (ok, score, detail) => ({ id: check.id, label: check.label, ok, score, detail });
  const text = (file) => readFile5(join7(root, file), "utf8");
  const original = (file) => readFile5(join7(quest.dir, "fixture", file), "utf8");
  if (check.type === "node-test" || check.type === "own-tests" || check.type === "catches-original") {
    if (check.type === "node-test") {
      for (const file of check.files) {
        await mkdir5(join7(root, file, ".."), { recursive: true });
        await cp3(join7(quest.dir, "hidden", file), join7(root, file));
      }
    } else if (check.type === "catches-original") {
      for (const file of check.restore) {
        await mkdir5(join7(root, file, ".."), { recursive: true });
        await cp3(join7(quest.dir, "fixture", file), join7(root, file));
      }
    }
    const files = check.type === "node-test" ? check.files : await testFiles(root, check.dir);
    if (!files.length)
      return result(false, 0, "No test files found.");
    const run = await runner(["--test", "--test-reporter=tap", ...files.map((file) => `./${file}`)], { cwd: root, timeoutMs });
    if (run.timedOut)
      return result(false, 0, "Tests exceeded the time limit.");
    const counts = tap(run.stdout);
    const feedback = `${counts.passed}/${counts.total} tests passed.${counts.names.length ? ` Failing tests: ${counts.names.join("; ")}` : ""}`;
    if (check.type === "catches-original") {
      const caught = run.code !== null && run.code !== 0 && counts.failed > 0;
      return result(caught, caught ? 1 : 0, caught ? "Tests fail against the original code." : "Tests did not expose the original bug.");
    }
    const ok = run.code === 0 && counts.failed === 0 && counts.total > 0 && (check.type !== "own-tests" || counts.runnable >= check.minTests);
    return result(ok, check.type === "node-test" ? counts.total ? counts.passed / counts.total : 0 : Number(ok), `${feedback}${check.type === "own-tests" ? ` ${counts.runnable}/${check.minTests} required runnable tests.` : ""}`);
  }
  if (check.type === "unchanged") {
    const changed = [];
    for (const path of check.paths) {
      const actual = await readFile5(join7(root, path)).catch(() => null);
      if (!actual || !actual.equals(await readFile5(join7(quest.dir, "fixture", path))))
        changed.push(path);
    }
    return result(changed.length === 0, (check.paths.length - changed.length) / check.paths.length, changed.length ? `Changed or missing files: ${changed.join(", ")}` : `${check.paths.length} files unchanged.`);
  }
  const actual = await text(check.file);
  switch (check.type) {
    case "contains": {
      const missing = check.values.filter((value) => !actual.includes(value));
      return result(!missing.length, (check.values.length - missing.length) / check.values.length, missing.length ? `Missing facts: ${missing.join("; ")}` : "All required facts kept.");
    }
    case "avoids": {
      const prose = skipRegions(actual, check.skip);
      const matches = check.patterns.flatMap((pattern) => new RegExp(pattern, "imu").exec(prose)?.[0] ?? []);
      return result(!matches.length, Number(!matches.length), matches.length ? `Remove matched wording: ${matches.join("; ")}` : "No disallowed wording found.");
    }
    case "keeps-blocks": {
      const before = blocks(await original(check.source)).filter((block) => check.blocks.includes(block.kind)).map((block) => block.text);
      const after = blocks(actual).filter((block) => check.blocks.includes(block.kind)).map((block) => block.text);
      const ok = before.length === after.length && before.every((block, index) => block === after[index]);
      return result(ok, Number(ok), ok ? `${before.length} protected blocks kept.` : "Protected blocks changed, missing, added or reordered.");
    }
    case "no-new-numbers": {
      const allowed = new Set(numbers(await original(check.source)));
      const added = [...new Set(numbers(actual).filter((number) => !allowed.has(number)))];
      return result(!added.length, Number(!added.length), added.length ? `New figures: ${added.join(", ")}` : "No new figures added.");
    }
    case "word-ratio": {
      const count = words(actual), sourceCount = words(await original(check.source));
      const ratio = sourceCount ? count / sourceCount : count === 0 ? 1 : Infinity;
      const ok = ratio >= check.min && ratio <= check.max;
      return result(ok, Number(ok), `${count}/${sourceCount} words; allowed ratio ${check.min} to ${check.max}.`);
    }
    case "findings": {
      let match = function(finding, seen) {
        for (const issue of edges[finding]) {
          if (seen.has(issue))
            continue;
          seen.add(issue);
          const previous = assigned.get(issue);
          if (previous === undefined || match(previous, seen)) {
            assigned.set(issue, finding);
            return true;
          }
        }
        return false;
      };
      const data = JSON.parse(actual);
      if (!data || typeof data !== "object" || !("findings" in data) || !Array.isArray(data.findings))
        return result(false, 0, "Expected a findings array.");
      const findings = [];
      for (const entry of data.findings) {
        if (!entry || typeof entry !== "object" || !("file" in entry) || typeof entry.file !== "string" || !("line" in entry) || typeof entry.line !== "number" || !Number.isInteger(entry.line) || entry.line < 1 || !("severity" in entry) || typeof entry.severity !== "string" || !entry.severity.trim() || !("title" in entry) || typeof entry.title !== "string" || !entry.title.trim())
          return result(false, 0, "Each finding needs file, positive integer line, severity and title.");
        findings.push({ file: entry.file.replace(/^(?:\.\/)+/, ""), line: entry.line });
      }
      const edges = findings.map((finding) => check.expected.flatMap((issue, index) => finding.file === issue.file && finding.line >= issue.lines[0] && finding.line <= issue.lines[1] ? [index] : []));
      const assigned = new Map;
      for (let i = 0;i < findings.length; i++)
        match(i, new Set);
      const found = assigned.size, extra = edges.filter((edge) => !edge.length).length;
      const ok = found >= check.minFound && extra <= check.maxExtra;
      return result(ok, extra > check.maxExtra ? 0 : found / check.expected.length, `${found}/${check.expected.length} issues found; ${extra} extra findings (limit ${check.maxExtra}).`);
    }
  }
}
async function gradeQuest(quest, workspace, opts) {
  await mkdir5(opts.scratch, { recursive: true });
  const checks = [];
  for (const check of quest.checks) {
    const root = await mkdtemp2(join7(opts.scratch, "grade-"));
    try {
      await copyWorkspace(workspace, root);
      checks.push(await checkOne(check, quest, root, opts.runNode ?? runNode, opts.testTimeoutMs ?? 30000));
    } catch (error) {
      const detail = error instanceof SyntaxError ? "Invalid JSON in the submitted file." : "Required files could not be read or checked.";
      checks.push({ id: check.id, label: check.label, ok: false, score: 0, detail });
    } finally {
      await rm3(root, { recursive: true, force: true });
    }
  }
  return { passed: checks.every((check) => check.ok), score: checks.length ? checks.reduce((sum, check) => sum + check.score, 0) / checks.length : 0, checks };
}

// src/trials/run.ts
var PREAMBLE = "You are working alone in this folder on a quest. Do the task without asking questions. Use only Node.js built-ins (Node 20 or newer); do not install packages or use the network. When you finish, reply with a short summary of what you changed.";
function followUp(grade, prompt, maxPrompts) {
  const lines = grade.checks.map((check) => check.ok ? `- PASSED: ${check.label}` : `- FAILED: ${check.label}: ${check.detail}`);
  return ["Quest checks after your last attempt:", ...lines, "", `Keep working in this folder until every check passes. Prompt ${prompt} of ${maxPrompts}.`].join(`
`);
}
var NOUNS = { skill: "skill", plugin: "plugin", subagent: "agent" };
function invocation(spells) {
  const groups = EQUIPPABLE.map((kind) => spells.filter((spell) => spell.kind === kind)).filter((group) => group.length > 0).map((group) => `the equipped ${NOUNS[group[0].kind]}${group.length === 1 ? "" : "s"}: ${group.map((spell) => spell.name).join(", ")}`);
  return groups.length === 0 ? "" : `Use ${groups.join("; ")}.`;
}
async function runTrial(plan) {
  const hero = HEROES[plan.hero];
  const spells = [...plan.loadout.spells].sort((a, b) => a.slug.localeCompare(b.slug));
  const loadout = LoadoutSchema.parse({
    kind: plan.loadout.kind,
    slug: plan.loadout.slug,
    spells: spells.map((spell) => spell.slug),
    refs: Object.fromEntries(spells.map((spell) => [spell.slug, spell.ref]))
  });
  const startedAt = new Date().toISOString();
  const environment = await describeOs();
  const arena = await openArena(plan.quest);
  let session = null;
  let report = null;
  let grade = null;
  let outcome = "fizzled";
  let reason = "checks";
  let prompts = 0;
  let clearedAtPrompt = null;
  let durationMs = 0;
  const replies = [];
  const followUps = [];
  let diff = "";
  let roots = [arena.workspace, arena.root];
  try {
    const grader = nodeRunner(await ward(arena, "grade", { read: await commandReadPaths("node"), write: [], network: false, root: arena.scratch }));
    session = await hero.start({ arena, spells, caster: plan.caster, focus: plan.focus, timeLimitMs: plan.quest.timeLimitSec * 1000, prices: plan.prices });
    for (let n = 1;n <= plan.quest.maxPrompts; n++) {
      const invoked = plan.cast === "invoked" ? invocation(spells) : "";
      const prompt = n === 1 ? `${PREAMBLE}

${plan.quest.prompt}${invoked ? `

${invoked}` : ""}` : followUp(grade, n, plan.quest.maxPrompts);
      if (n > 1)
        followUps.push(prompt);
      const turn = await session.send(prompt);
      replies.push(turn.reply);
      prompts = n;
      durationMs += turn.durationMs;
      if (turn.mishap) {
        outcome = "mishap";
        reason = turn.mishap;
        break;
      }
      grade = await gradeQuest(plan.quest, arena.workspace, { scratch: join8(arena.scratch, String(n)), runNode: grader });
      if (turn.timedOut) {
        reason = "timeout";
        break;
      }
      if (grade.passed) {
        outcome = "cleared";
        reason = null;
        clearedAtPrompt = n;
        break;
      }
    }
    report = await session.finish();
  } catch (error) {
    outcome = "mishap";
    reason = `harness error: ${error instanceof Error ? error.message.slice(0, 200) : String(error).slice(0, 200)}`;
  } finally {
    diff = await treeDiff(join8(plan.quest.dir, "fixture"), arena.workspace).catch(() => "");
    const resolved = [...roots, ...await Promise.all(roots.map((path) => realpath4(path).catch(() => path)))];
    roots = [...new Set([...resolved, ...resolved.map((path) => path.replace(/^\/private(?=\/)/, ""))])];
    if (!plan.keep)
      await closeArena(arena);
  }
  const opened = new Set(report?.opened ?? []);
  const id = randomUUID();
  const lines = diffLines(diff);
  const run = {
    v: 1,
    id,
    startedAt,
    quest: plan.quest.id,
    questVersion: plan.quest.version,
    loadout,
    cast: loadout.kind === "unarmed" ? null : plan.cast,
    hero: plan.hero,
    heroVersion: report?.heroVersion ?? null,
    caster: report?.caster ?? plan.caster ?? "unknown",
    focus: report?.focus ?? plan.focus,
    containment: hero.containment,
    environment,
    outcome,
    reason,
    prompts,
    clearedAtPrompt,
    score: grade?.score ?? 0,
    checks: (grade?.checks ?? []).map((check) => ({ id: check.id, ok: check.ok, score: check.score })),
    attuned: spells.filter((spell) => opened.has(spell.name)).map((spell) => spell.slug),
    durationMs,
    tokens: report?.tokens ?? null,
    toolCalls: report?.toolCalls ?? null,
    costUsd: report?.costUsd ?? null,
    outputTokens: report?.outputTokens ?? null,
    linesAdded: lines.added,
    linesRemoved: lines.removed
  };
  const checks = (grade?.checks ?? []).map((check) => ({ id: check.id, label: check.label, ok: check.ok, detail: check.detail }));
  return { run, output: { v: 1, runId: id, replies, followUps, diff, checks, roots } };
}

// src/trials/batch.ts
var BATCH_HELP = `  --spell <slug>       Equip one library spell (repeatable; each is its own loadout)
  --workflow <slug>    Equip every step of a library workflow (repeatable)
  --combo <a+b>        Equip several spells together (repeatable)
  --unarmed            Run with no spell (the control)
  --control            Also run Unarmed beside each loadout, interleaved
  --quest <id|school|all>  Quests to run (repeatable). Default: the loadout's schools
  --hero <codex|claude-code|omp>  Harness to drive (required)
  --weapon <model>     Weapon: the model id passed to the harness (default: the harness's own default)
  --charge <level>     Charge: the reasoning effort (default: medium)
  --cast <invoked|ambient>  Invoked names the equipped skills in the prompt; ambient leaves the choice to the agent (default: invoked)
  --runs <n>           Runs per quest and loadout (default: 3)
  --keep               Keep arenas for inspection
  --allow-hazards      Run spells the safety screen flagged (after reading the findings)
  --allow-open-arena   Accept an OMP trial: its agent can read OMP's own sign-in files and reach the network`;
function parseBatchArgs(args) {
  const { values } = parseArgs({
    args,
    options: {
      spell: { type: "string", multiple: true, default: [] },
      workflow: { type: "string", multiple: true, default: [] },
      combo: { type: "string", multiple: true, default: [] },
      unarmed: { type: "boolean", default: false },
      control: { type: "boolean", default: false },
      quest: { type: "string", multiple: true, default: [] },
      hero: { type: "string" },
      weapon: { type: "string" },
      charge: { type: "string", default: "medium" },
      cast: { type: "string", default: "invoked" },
      runs: { type: "string", default: "3" },
      keep: { type: "boolean", default: false },
      "allow-hazards": { type: "boolean", default: false },
      "allow-open-arena": { type: "boolean", default: false }
    }
  });
  const hero = values.hero;
  if (!hero || !USAGE_AGENTS.includes(hero))
    throw new Error(`--hero must be one of ${USAGE_AGENTS.join(", ")}`);
  const focus = values.charge;
  if (!FOCUS_LEVELS.includes(focus) || !HEROES[hero].focusLevels.includes(focus))
    throw new Error(`${HARNESS_NAMES[hero]} accepts --charge ${HEROES[hero].focusLevels.join(", ")}`);
  const cast = values.cast;
  if (!CASTS.includes(cast))
    throw new Error(`--cast must be ${CASTS.join(" or ")}`);
  const runs = Number(values.runs);
  if (!Number.isInteger(runs) || runs < 1 || runs > 20)
    throw new Error("--runs must be 1 to 20");
  return {
    spells: values.spell,
    workflows: values.workflow,
    combos: values.combo,
    unarmed: values.unarmed,
    control: values.control,
    quests: values.quest,
    hero,
    caster: values.weapon ?? null,
    focus,
    cast,
    runs,
    keep: values.keep,
    allowHazards: values["allow-hazards"],
    allowOpenArena: values["allow-open-arena"]
  };
}
function pickQuests(quests, names) {
  if (names.includes("all"))
    return [...quests];
  const unknown = names.filter((name) => !quests.some((quest) => quest.id === name || quest.school === name));
  if (unknown.length > 0)
    throw new Error(`Unknown quest or school: ${unknown.join(", ")}`);
  return quests.filter((quest) => names.includes(quest.id) || names.includes(quest.school));
}
var STATUS = { cleared: "Cleared", fizzled: "Fizzled", mishap: "Mishap" };
function runLine(run, quest) {
  const how = run.outcome === "cleared" ? run.clearedAtPrompt === 1 ? "instant cast (one-shot)" : `channeled (${run.clearedAtPrompt} prompts)` : run.reason ?? "";
  const loadout = run.loadout.kind === "unarmed" ? "Unarmed" : run.loadout.kind === "workflow" ? `Workflow ${run.loadout.slug}` : `${run.loadout.kind === "combo" ? "Combo" : "Spell"} ${run.loadout.spells.join(" + ")}`;
  const metrics = [
    formatDuration(run.durationMs),
    run.costUsd === null ? "mana not priced yet" : `${formatMana(Math.round(run.costUsd * MANA_PER_USD))} mana`,
    run.outputTokens == null ? null : `${formatTokens(run.outputTokens)} incantation (output tokens)`,
    run.linesAdded == null || run.linesRemoved == null ? null : `runes ${formatLines(run.linesAdded, run.linesRemoved)} lines`,
    run.loadout.kind === "unarmed" ? null : run.attuned.length > 0 ? `attuned: ${run.attuned.join(", ")}` : "not attuned"
  ].filter(Boolean).join(" · ");
  return `${quest.id} (${RANK_NAMES[quest.rank]}) · ${loadout}${run.cast ? ` (${run.cast})` : ""} · ${HARNESS_NAMES[run.hero]} ${run.heroVersion ?? "?"} ${run.caster} ${run.focus} → ${STATUS[run.outcome]}, ${how} · score ${Math.round(run.score * 100)}% · ${metrics}`;
}
async function runBatch(request, ctx) {
  const hero = HEROES[request.hero];
  if (!WARD_AVAILABLE)
    throw new Error("Trials need a sandbox to grade the agent's code. For now that means macOS (Seatbelt); this system has none, so trials cannot run here.");
  if (request.hero === "omp" && !request.allowOpenArena)
    throw new Error("In an OMP trial the agent can read OMP's own sign-in files and reach the network. Trial only spells you have reviewed, and pass --allow-open-arena to accept that.");
  const skill = (slug) => {
    const found = ctx.catalog.skills.find((item) => item.slug === slug);
    if (!found)
      throw new Error(`No spell "${slug}" in the library`);
    return found;
  };
  const planned = [
    ...request.spells.map((slug) => ({ kind: "spell", slug, skills: [skill(slug)], schools: skill(slug).categories })),
    ...request.workflows.map((slug) => {
      const workflow = ctx.catalog.workflows.find((item) => item.slug === slug);
      if (!workflow)
        throw new Error(`No workflow "${slug}" in the library`);
      return { kind: "workflow", slug, skills: workflow.steps.map((step) => skill(step.skill)), schools: [workflow.category] };
    }),
    ...request.combos.map((list) => {
      const skills = list.split("+").map((slug) => skill(slug.trim()));
      if (skills.length < 2)
        throw new Error("--combo needs at least two spells joined with +");
      return { kind: "combo", slug: null, skills, schools: [...new Set(skills.flatMap((item) => item.categories))] };
    })
  ];
  for (const loadout of planned)
    refuseUnequippable(hero, loadout.skills);
  if (request.unarmed || request.control)
    planned.push({ kind: "unarmed", slug: null, skills: [], schools: [] });
  if (planned.length === 0)
    throw new Error("Choose a loadout: --spell, --workflow, --combo or --unarmed");
  const named = request.quests.length > 0 ? pickQuests(ctx.quests, request.quests) : null;
  if (!named && planned.every((loadout) => loadout.kind === "unarmed"))
    throw new Error("Name the quests for an Unarmed run with --quest");
  const fits = (loadout, quest) => loadout.kind === "unarmed" || named !== null || loadout.schools.includes(quest.school);
  const selected = named ?? ctx.quests.filter((quest) => planned.some((loadout) => loadout.kind !== "unarmed" && fits(loadout, quest)));
  if (selected.length === 0)
    throw new Error("No quest matches these loadouts' schools yet; name one with --quest");
  ctx.log(`Fetching ${new Set(planned.flatMap((loadout) => loadout.skills.map((item) => item.slug))).size} spell(s) at their current upstream commits...`);
  const equipped = [];
  for (const loadout of planned)
    equipped.push({ ...loadout, spells: await equipSpells(loadout.skills, { cacheRoot: ctx.cacheRoot }) });
  const hazards = [...new Set(equipped.flatMap((loadout) => loadout.spells.flatMap((spell) => spell.hazards.map((finding) => `${spell.slug}: ${finding}`))))];
  if (hazards.length > 0) {
    ctx.log(`Safety screen findings:
${hazards.map((line) => `  ${line}`).join(`
`)}`);
    if (!request.allowHazards)
      throw new Error("Read the findings, then rerun with --allow-hazards to run these spells anyway");
  }
  const jobs = selected.flatMap((quest) => Array.from({ length: request.runs }, () => equipped.filter((loadout) => fits(loadout, quest)).map((loadout) => ({ quest, loadout }))).flat());
  ctx.log(`${jobs.length} run(s) with ${HARNESS_NAMES[request.hero]} (${hero.containment} arena), weapon ${request.caster ?? "harness default"}, charge ${request.focus}, ${request.cast} cast. Results go to ${ctx.runsFile}.`);
  const results = [];
  let mishapsInRow = 0;
  for (const [index, job] of jobs.entries()) {
    const { run: result, output } = await runTrial({ quest: job.quest, loadout: job.loadout, hero: request.hero, caster: request.caster, focus: request.focus, cast: request.cast, keep: request.keep, prices: ctx.catalog.prices });
    await appendRun(result, ctx.runsFile);
    if (ctx.outputsDir)
      await saveOutput(output, ctx.outputsDir);
    let note = null;
    if (ctx.scry && result.outcome !== "mishap") {
      try {
        note = await ctx.scry(result, output, job.quest);
      } catch (error) {
        note = `scrying failed: ${error instanceof Error ? error.message : String(error)}`;
      }
    }
    results.push(result);
    ctx.log(`[${index + 1}/${jobs.length}] ${runLine(result, job.quest)}${note ? ` · ${note}` : ""}`);
    mishapsInRow = result.outcome === "mishap" ? mishapsInRow + 1 : 0;
    if (result.outcome === "mishap" && (result.reason === "sign-in" || result.reason?.startsWith("harness error") || mishapsInRow >= 3)) {
      throw new Error(`Stopped: ${HARNESS_NAMES[request.hero]} ${result.reason}${mishapsInRow >= 3 ? " three times in a row" : ""}. Check the hero with doctor and rerun.`);
    }
  }
  return results;
}
function describeCells(cells, catalog, quests) {
  const lines = [];
  const byQuest = Map.groupBy(cells, (cell) => cell.quest);
  for (const quest of quests) {
    const group = byQuest.get(quest.id);
    if (!group)
      continue;
    lines.push("", `${quest.name} (${RANK_NAMES[quest.rank]}, ${quest.id} v${quest.version})`);
    for (const cell of group) {
      const name = cell.loadout.kind === "unarmed" ? "Unarmed" : cell.loadout.kind === "workflow" ? catalog.workflows.find((item) => item.slug === cell.loadout.slug)?.name ?? cell.loadout.slug : cell.loadout.spells.map((slug) => catalog.skills.find((item) => item.slug === slug)?.name ?? slug).join(" + ");
      const rate = clearRate(cell);
      const buff = buffOver(cell, cells);
      lines.push(`  ${name}${cell.cast ? ` (${cell.cast} cast)` : ""} · ${HARNESS_NAMES[cell.hero]} ${cell.heroVersion ?? "?"} · weapon ${cell.caster} · charge ${cell.focus}${cell.source.kind === "community" ? ` · community: ${cell.source.name ?? "anonymous"}` : ""}`, `    Clear rate (pass rate) ${cell.cleared}/${cell.runs}${rate === null ? "" : ` = ${Math.round(rate * 100)}%`} · Steadiness (reliability) ${Math.round(wilsonLower(cell.cleared, cell.runs) * 100)}%` + ` · Buff (vs Unarmed) ${cell.loadout.kind === "unarmed" ? "control" : buff ? `${buff.points >= 0 ? "+" : ""}${buff.points} pts` : "no control yet"}`, `    Instant casts ${cell.oneShot}/${cell.cleared} · Casts (prompts) ${cell.medianPromptsToClear ?? "-"} · Mastery ${Math.round(cell.meanScore * 100)}%` + ` · Cast time ${cell.medianDurationMs === null ? "-" : formatDuration(cell.medianDurationMs)}` + ` · Mana (cost at list prices) ${cell.medianCostUsd === null ? "not priced yet" : formatMana(Math.round(cell.medianCostUsd * MANA_PER_USD))}` + ` · Incantation (output tokens) ${cell.medianOutputTokens == null ? "-" : formatTokens(cell.medianOutputTokens)}` + ` · Runes (lines written) ${cell.medianLinesAdded == null || cell.medianLinesRemoved == null ? "-" : formatLines(cell.medianLinesAdded, cell.medianLinesRemoved)}` + ` · Attuned ${cell.loadout.kind === "unarmed" ? "-" : `${cell.attuned}/${cell.runs}`}` + (cell.mishaps ? ` · ${cell.mishaps} mishap(s) left out` : ""));
    }
  }
  return lines;
}
function doctorLines() {
  const said = (argv) => {
    const result = spawnSync(argv[0], argv.slice(1), { encoding: "utf8", timeout: 20000 });
    return { ok: result.status === 0, text: `${result.stdout ?? ""}${result.stderr ?? ""}` };
  };
  const lines = [
    `Node: ${said(["node", "--version"]).text.trim() || "not found"} (quests and grading need Node 20 or newer)`,
    `Ward (macOS Seatbelt): ${WARD_AVAILABLE ? "available" : "not available, so trials cannot run on this system"}`
  ];
  const commands = { codex: "codex", "claude-code": "claude", omp: "omp" };
  for (const id of USAGE_AGENTS) {
    const version = said([commands[id], "--version"]);
    if (!version.ok) {
      lines.push(`${HARNESS_NAMES[id]}: not installed`);
      continue;
    }
    const signIn = id === "codex" ? /logged in/i.test(said(["codex", "login", "status"]).text) ? "signed in" : "not signed in (codex login)" : id === "claude-code" ? /"loggedIn":\s*true/.test(said(["claude", "auth", "status"]).text) ? "signed in" : "not signed in (claude auth login)" : "uses the accounts OMP is signed in to";
    lines.push(`${HARNESS_NAMES[id]}: ${version.text.trim().split(`
`)[0]}; ${signIn}; arena ${HEROES[id].containment}`);
  }
  return lines;
}

// src/trials/quest.ts
import { readdir as readdir8, readFile as readFile6, stat as stat5 } from "node:fs/promises";
import { join as join9, resolve as resolve3 } from "node:path";
var RelPath = string2().regex(/^(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$))[A-Za-z0-9._/-]{1,200}$/, "Use a relative path without ..");
var CheckId = string2().regex(/^[a-z][a-z0-9-]{0,39}$/);
var Label = string2().min(5).max(80);
var Pattern = string2().min(1).max(300).refine((source) => {
  try {
    new RegExp(source, "imu");
    return true;
  } catch {
    return false;
  }
}, "Invalid regular expression");
var Base = { id: CheckId, label: Label };
var CheckSchema = discriminatedUnion("type", [
  object({ ...Base, type: literal("node-test"), files: array(RelPath).min(1) }),
  object({ ...Base, type: literal("own-tests"), dir: RelPath, minTests: number2().int().min(1) }),
  object({ ...Base, type: literal("catches-original"), dir: RelPath, restore: array(RelPath).min(1) }),
  object({ ...Base, type: literal("unchanged"), paths: array(RelPath).min(1) }),
  object({ ...Base, type: literal("contains"), file: RelPath, values: array(string2().min(1).max(200)).min(1) }),
  object({ ...Base, type: literal("avoids"), file: RelPath, patterns: array(Pattern).min(1), skip: array(_enum(["code", "inline-code", "quote", "table", "link-url"])).default([]) }),
  object({ ...Base, type: literal("keeps-blocks"), file: RelPath, source: RelPath, blocks: array(_enum(["code", "quote", "table"])).min(1) }),
  object({ ...Base, type: literal("no-new-numbers"), file: RelPath, source: RelPath }),
  object({ ...Base, type: literal("word-ratio"), file: RelPath, source: RelPath, min: number2().positive(), max: number2().positive() }),
  object({
    ...Base,
    type: literal("findings"),
    file: RelPath,
    expected: array(object({ id: CheckId, file: RelPath, lines: tuple([number2().int().positive(), number2().int().positive()]) })).min(1),
    minFound: number2().int().min(1),
    maxExtra: number2().int().min(0)
  })
]);
var QuestSchema = object({
  id: SlugSchema,
  version: number2().int().positive(),
  name: string2().min(3).max(60),
  school: SlugSchema,
  rank: _enum(RANKS),
  summary: string2().min(10).max(160),
  prompt: string2().min(20).max(4000),
  maxPrompts: number2().int().min(1).max(5),
  timeLimitSec: number2().int().min(30).max(1800),
  checks: array(CheckSchema).min(1).max(12)
});
async function isFile(path) {
  try {
    return (await stat5(path)).isFile();
  } catch {
    return false;
  }
}
async function loadQuests(dir = "quests") {
  const root = resolve3(dir);
  const problems = [];
  const quests = [];
  const entries = await readdir8(root, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    if (!entry.isDirectory())
      continue;
    const questDir = join9(root, entry.name);
    if ((await readdir8(questDir)).length === 0)
      continue;
    let raw;
    try {
      raw = JSON.parse(await readFile6(join9(questDir, "quest.json"), "utf8"));
    } catch (error) {
      problems.push(`${entry.name}/quest.json: ${error instanceof Error ? error.message : String(error)}`);
      continue;
    }
    const parsed = QuestSchema.safeParse(raw);
    if (!parsed.success) {
      problems.push(...parsed.error.issues.map((issue) => `${entry.name}/quest.json ${issue.path.join(".")}: ${issue.message}`));
      continue;
    }
    const quest = parsed.data;
    if (quest.id !== entry.name)
      problems.push(`${entry.name}/quest.json: id "${quest.id}" must match the folder name`);
    const ids = new Set;
    for (const check of quest.checks) {
      if (ids.has(check.id))
        problems.push(`${entry.name}: duplicate check id "${check.id}"`);
      ids.add(check.id);
      const needed = check.type === "node-test" ? check.files.map((file) => join9("hidden", file)) : check.type === "catches-original" ? check.restore.map((file) => join9("fixture", file)) : check.type === "unchanged" ? check.paths.map((file) => join9("fixture", file)) : ("source" in check) ? [join9("fixture", check.source)] : [];
      for (const file of needed) {
        if (!await isFile(join9(questDir, file)))
          problems.push(`${entry.name}: check "${check.id}" needs ${file}`);
      }
    }
    quests.push({ ...quest, dir: questDir });
  }
  if (problems.length > 0)
    throw new Error(`Invalid quests:
${problems.join(`
`)}`);
  return quests.sort((a, b) => a.school.localeCompare(b.school) || RANKS.indexOf(a.rank) - RANKS.indexOf(b.rank) || a.id.localeCompare(b.id));
}

// src/trials/scrying.ts
import { execFileSync } from "node:child_process";
import { mkdir as mkdir6, readdir as readdir9, readFile as readFile7, writeFile as writeFile5 } from "node:fs/promises";
import { hostname, userInfo } from "node:os";
import { join as join10 } from "node:path";
import { deflateSync } from "node:zlib";
var FONT_CHARS = `${Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join("")}·×→─★✓`;
var FONT_HEX = [
  "00000000000000000000000000000000001818181818181818000018180000000066666600000000000000000000000000006C6C6CFE6C6C6CFE6C6C6C0000000018183C666030180C06663C18180000000006C6CCCC181830306666C6C000000000386C6C38307ADECCCCCC7600000000181818300000000000000000000000",
  "000C18183030303030303018180C0000003018180C0C0C0C0C0C0C18183000000000000066663CFF3C66660000000000000000001818187E181818000000000000000000000000000000381818306000000000000000007E000000000000000000000000000000000000181818000000030306060C0C181830306060C0C00000",
  "0000386CC6C6CED6E6C6C66C380000000000183878181818181818187E00000000003C666606060C183060607E00000000003C666606061C060666663C00000000000C1C3C6CCCCCFE0C0C0C0C00000000007E6060607C06060666663C00000000001C3060607C66666666663C00000000007E0606060C0C1818181818000000",
  "00003C666666763C6E6666663C00000000003C666666663E0606060C380000000000001818180000000018181800000000000018181800000000381818306000000000060C18306030180C060000000000000000007E0000007E0000000000000000006030180C060C18306000000000003C6666060C18181800001818000000",
  "00007CC6C6C6DEDEDEDCC0C07C0000000000183C6666667E666666666600000000007C6666666C786C6666667C00000000003C6666606060606066663C0000000000786C666666666666666C7800000000007E606060607C606060607E00000000007E6060607C60606060606000000000003C666660606E666666663E000000",
  "000066666666667E666666666600000000007E1818181818181818187E0000000000060606060606060666663C0000000000C6C6CCCCD8F0D8CCCCC6C60000000000606060606060606060607E0000000000C6EEEEFED6D6C6C6C6C6C60000000000C6C6E6E6F6FEDECECEC6C600000000003C6666666666666666663C000000",
  "00007C666666667C606060606000000000003C6666666666666666663C0C060000007C666666667C6C6666666600000000003C66666030180C0666663C00000000007E181818181818181818180000000000666666666666666666663C0000000000666666666666663C3C18180000000000C6C6C6C6C6D6D6FEEEEEC6000000",
  "0000C3C3663C1818183C66C3C30000000000C3C366663C18181818181800000000007E06060C0C18303060607E000000003C30303030303030303030303C0000C0C06060303018180C0C060603030000003C0C0C0C0C0C0C0C0C0C0C0C3C00000010386C6CC6C6000000000000000000000000000000000000000000000000FF",
  "0018180C0600000000000000000000000000000000003C063E6666663E0000000000606060607C66666666667C0000000000000000003C66606060663C0000000000060606063E66666666663E0000000000000000003C66667E60603C00000000001E3030307E3030303030300000000000000000003E66666666663E06067C",
  "0000606060607C6666666666660000000000181800007818181818181E00000000000C0C00000C0C0C0C0C0C0C0C0C7800006060606066666C786C66660000000000781818181818181818181E000000000000000000CCFED6D6D6D6C60000000000000000007C6666666666660000000000000000003C66666666663C000000",
  "0000000000007C66666666667C6060600000000000003E66666666663E0606060000000000007C6666606060600000000000000000003E60603C06067C0000000000003030307E30303030301E0000000000000000006666666666663E00000000000000000066666666663C18000000000000000000C6C6D6D6D67C6C000000",
  "000000000000C6C66C386CC6C60000000000000000006666666666663E06063C0000000000007E060C1830607E000000000E1818181818F018181818180E00001818181818181818181818181818000000E030303030301E3030303030E000000072D69C00000000000000000000000000000000000000180000000000000000",
  "0000000082C66C386CC68200000000000000000000080CFEFE0C08000000000000000000000000FFFF00000000000000000010103838FEFE38386C6C82820000020206060C0CD8D8F0F0E0E0C0C00000"
].join("");
var GLYPHS = new Map([...FONT_CHARS].map((char, i) => [char, FONT_HEX.slice(i * 32, i * 32 + 32)]));
var CREDENTIAL_MARK = "";
var SENSITIVE_MARK = "";
var FINDINGS = ["credential", "local path", "user name", "host name", "email address", "IP address", "id", "URL secret"];
var PLURAL = {
  credential: "credentials",
  "local path": "local paths",
  "user name": "user names",
  "host name": "host names",
  "email address": "email addresses",
  "IP address": "IP addresses",
  id: "ids",
  "URL secret": "URL secrets"
};
var COMMON_NAMES = new Set(["root", "user", "admin", "runner", "ubuntu", "node", "localhost", "home", "test"]);
var cachedIdentity;
function localIdentity() {
  if (cachedIdentity)
    return cachedIdentity;
  let user = null;
  try {
    user = userInfo().username;
  } catch {}
  let fullName = null;
  try {
    fullName = execFileSync("id", ["-F"], { encoding: "utf8", timeout: 2000, stdio: ["ignore", "pipe", "ignore"] }).trim() || null;
  } catch {}
  return cachedIdentity = { user, host: hostname() || null, fullName };
}
var escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
var sensitive = (length) => SENSITIVE_MARK.repeat(Math.min(40, Math.max(3, length)));
var CREDENTIAL = CREDENTIAL_MARK.repeat(12);
function looksSecret(value) {
  if (value.length < 8 || /\s/.test(value) || /^[$<{%]/.test(value))
    return false;
  return [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((pattern) => pattern.test(value)).length >= 2;
}
var NAMED = "[A-Za-z0-9_.-]*(?:secret|token|passw(?:or)?d|api[_-]?key|private[_-]?key|access[_-]?key)[A-Za-z0-9_.-]*";
var CREDENTIAL_PATTERNS = [
  /\bsk-(?:ant-|proj-)?[A-Za-z0-9_-]{16,}/g,
  /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})/g,
  /\bxox[abprs]-[A-Za-z0-9-]{10,}/g,
  /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g,
  /\bAIza[0-9A-Za-z_-]{35}/g,
  /\b[sr]k_live_[0-9A-Za-z]{16,}/g,
  /\bnpm_[A-Za-z0-9]{36}\b/g,
  /\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}/g
];
function redact(input, roots, identity = localIdentity()) {
  const found = {};
  const count = (kind) => {
    found[kind] = (found[kind] ?? 0) + 1;
  };
  let text = input;
  for (const root of [...new Set(roots)].filter((item) => item.length >= 4).sort((a, b) => b.length - a.length)) {
    text = text.replace(new RegExp(`${escape(root.replace(/\/+$/, ""))}(/|(?![\\w-]|\\.\\w))`, "g"), (_, slash) => slash ? "./" : ".");
  }
  text = text.replace(/-----BEGIN[A-Z0-9 ]*PRIVATE KEY-----[\s\S]*?(?:-----END[A-Z0-9 ]*PRIVATE KEY-----|$)/g, (match) => {
    count("credential");
    return match.split(`
`).map((line, i) => `${i > 0 && /^[+\- ]/.test(line) ? line[0] : ""}${CREDENTIAL}`).join(`
`);
  });
  for (const pattern of CREDENTIAL_PATTERNS)
    text = text.replace(pattern, () => {
      count("credential");
      return CREDENTIAL;
    });
  text = text.replace(/\b(Bearer\s+)([A-Za-z0-9._~+/=-]{16,})/gi, (_, lead) => {
    count("credential");
    return `${lead}${CREDENTIAL}`;
  });
  text = text.replace(new RegExp(`(["']?)(${NAMED})\\1(\\s*[:=]\\s*)(["'\`])([^"'\`\\s]+)\\4`, "gi"), (match, q1, name, op, q2, value) => {
    if (!looksSecret(value))
      return match;
    count("credential");
    return `${q1}${name}${q1}${op}${q2}${CREDENTIAL}${q2}`;
  });
  text = text.replace(/\b([A-Z0-9_]*(?:SECRET|TOKEN|PASSWORD|PASSWD|API_?KEY|PRIVATE_KEY|ACCESS_KEY)[A-Z0-9_]*=)([^\s"'`]{8,})/g, (match, lead, value) => {
    if (!looksSecret(value))
      return match;
    count("credential");
    return `${lead}${CREDENTIAL}`;
  });
  text = text.replace(/\b([a-z][a-z0-9+.-]*:\/\/)([^\s/@:]+:[^\s/@]+)@/gi, (_, scheme, info) => {
    count("URL secret");
    return `${scheme}${sensitive(info.length)}@`;
  });
  text = text.replace(/([?&](?:access_token|refresh_token|id_token|token|api_key|apikey|key|secret|client_secret|password|auth|sig|signature|code|x-amz-signature|x-amz-credential|x-amz-security-token)=)([^&\s#"'`<>]+)/gi, (_, lead, value) => {
    count("URL secret");
    return `${lead}${sensitive(value.length)}`;
  });
  text = text.replace(/(?<![\w.~/-])(?:\/(?:Users|home|private|var\/folders|tmp)\/|~\/|[A-Za-z]:\\Users\\)[^\s"'`<>()[\]{},;|*]*/g, (match) => {
    count("local path");
    return sensitive(match.length);
  });
  text = text.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}\b/g, (match) => {
    count("email address");
    return sensitive(match.length);
  });
  const names = [["user name", identity.user], ["user name", identity.fullName], ["host name", identity.host], ["host name", identity.host?.split(".")[0] ?? null]];
  for (const [kind, name] of names) {
    if (!name || name.length < 3 || COMMON_NAMES.has(name.toLowerCase()))
      continue;
    const pattern = name.trim().split(/\s+/).map(escape).join("\\s+");
    text = text.replace(new RegExp(`(?<![A-Za-z0-9_])${pattern}\\d*(?![A-Za-z0-9_])`, "gi"), (match) => {
      count(kind);
      return sensitive(match.length);
    });
  }
  for (const part of identity.fullName?.trim().split(/\s+/) ?? []) {
    if (part.length < 4 || COMMON_NAMES.has(part.toLowerCase()))
      continue;
    text = text.replace(new RegExp(`(?<![A-Za-z0-9_])${escape(part)}(?![A-Za-z0-9_])`, "g"), (match) => {
      count("user name");
      return sensitive(match.length);
    });
  }
  text = text.replace(/(?<![\w.])(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})(?![\w]|\.\d)/g, (match, a, ...rest) => {
    if ([a, ...rest.slice(0, 3)].some((octet) => Number(octet) > 255) || a === "127")
      return match;
    count("IP address");
    return sensitive(match.length);
  });
  text = text.replace(/(?<![\w:])(?:[0-9a-f]{1,4}:){1,6}:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4}(?![\w:])|(?<![\w:])(?:[0-9a-f]{1,4}:){7}[0-9a-f]{1,4}(?![\w:])/gi, (match) => {
    if (!/[0-9a-f]{3}/i.test(match))
      return match;
    count("IP address");
    return sensitive(match.length);
  });
  text = text.replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi, (match) => {
    count("id");
    return sensitive(match.length);
  });
  text = text.replace(/\b(session[_-]?id["']?\s*[:=]\s*["']?)([A-Za-z0-9._-]{8,})/gi, (_, lead, value) => {
    count("id");
    return `${lead}${sensitive(value.length)}`;
  });
  return { text, found };
}
function sensitiveCount(found) {
  return FINDINGS.reduce((sum, kind) => sum + (kind === "credential" ? 0 : found[kind] ?? 0), 0);
}
function listFindings(found, kinds = FINDINGS) {
  const parts = kinds.flatMap((kind) => found[kind] ? [`${found[kind]} ${found[kind] === 1 ? kind : PLURAL[kind]}`] : []);
  return parts.length <= 1 ? parts.join("") : `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}
function describeFindings(found) {
  const removed = listFindings(found, ["credential"]);
  const blurred = listFindings(found, FINDINGS.filter((kind) => kind !== "credential"));
  return [removed && `removed ${removed}`, blurred && `blurred ${blurred}`].filter(Boolean).join(", ");
}
var CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0;k < 8; k++)
    c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
  return c >>> 0;
});
function crc32(bytes) {
  let c = 4294967295;
  for (const byte of bytes)
    c = CRC_TABLE[(c ^ byte) & 255] ^ c >>> 8;
  return (c ^ 4294967295) >>> 0;
}
function chunk(type, data) {
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, "ascii");
  out.set(data, 8);
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length);
  return out;
}
function encodePng(width, height, palette, pixels) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header.set([8, 3, 0, 0, 0], 8);
  const plte = Buffer.alloc(palette.length * 3);
  palette.forEach((rgb, i) => plte.set([rgb >> 16 & 255, rgb >> 8 & 255, rgb & 255], i * 3));
  const raw = Buffer.alloc((width + 1) * height);
  for (let y = 0;y < height; y++)
    raw.set(pixels.subarray(y * width, (y + 1) * width), y * (width + 1) + 1);
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", header),
    chunk("PLTE", plte),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", new Uint8Array(0))
  ]);
}
var mix = (a, b, t) => [16, 8, 0].reduce((rgb, shift) => rgb | Math.round((a >> shift & 255) * (1 - t) + (b >> shift & 255) * t) << shift, 0);
var BASE = [921639, 723996, 3095951, 2238830, 1514572, 15265023, 8884424, 1119807, 16777215, 13095152, 16765773, 9425919, 15219515, 5086182, 9558889, 4856366];
var [NIGHT, INK, TOP, MID, BOTTOM, EDGE, LINE, WELL, TEXT, MUTED, GOLD, LINK, HP, MP, XP, CRED_BG] = BASE.map((_, i) => i);
var RAMPS = { sensitive: [TOP, 16, 17, 18, MUTED], credential: [CRED_BG, 19, 20, 21, HP] };
var PALETTE = [...BASE, ...[0.25, 0.5, 0.75].map((t) => mix(BASE[TOP], BASE[MUTED], t)), ...[0.25, 0.5, 0.75].map((t) => mix(BASE[CRED_BG], BASE[HP], t))];
var WIDTH = 800;
var COLS = 94;
var LEFT = 24;
var LH = 18;
var CAPS = { reply: 12, diff: 36, checks: 12 };
var PLACEHOLDER = "aeonsrtilcuhdm";
var QUOTES = { "‘": "'", "’": "'", "‚": "'", "“": '"', "”": '"', "„": '"', "–": "-", "—": "-", "−": "-", "…": "...", " ": " ", "\t": "  ", "•": "*", "\r": "" };
function toGlyphs(text) {
  let out = "";
  for (const char of text.normalize("NFKD")) {
    if (GLYPHS.has(char) || char === `
` || char === CREDENTIAL_MARK || char === SENSITIVE_MARK)
      out += char;
    else if (QUOTES[char] !== undefined)
      out += QUOTES[char];
    else if (!/\p{M}/u.test(char))
      out += "?";
  }
  return out;
}
function wrap(text, width) {
  const lines = [];
  for (const raw of text.split(`
`)) {
    let line = "";
    for (const word of raw.split(/(?<= )/)) {
      if (line.length + word.trimEnd().length > width && line) {
        lines.push(line.trimEnd());
        line = "";
      }
      let rest = word;
      while (rest.length > width) {
        lines.push(rest.slice(0, width));
        rest = rest.slice(width);
      }
      line += rest;
    }
    lines.push(line.trimEnd());
  }
  return lines;
}
var clip = (text, width) => text.length > width ? `${text.slice(0, width - 1)}→` : text;
function loadoutLabel(run) {
  const name = run.loadout.kind === "unarmed" ? "Unarmed" : run.loadout.kind === "workflow" ? `Workflow ${run.loadout.slug}` : `${run.loadout.kind === "combo" ? "Combo" : "Spell"} ${run.loadout.spells.join(" + ")}`;
  return `${name}${run.cast ? ` (${run.cast} cast)` : ""}`;
}
function scry(run, output, quest, identity = localIdentity()) {
  const found = {};
  const clean = (text) => {
    const result = redact(text, output.roots, identity);
    for (const [kind, n] of Object.entries(result.found))
      found[kind] = (found[kind] ?? 0) + n;
    return toGlyphs(result.text);
  };
  const rows = [];
  const gap = (height) => rows.push({ segments: [], bg: null, height });
  const row = (segments, bg = null) => rows.push({ segments, bg, height: LH });
  const title = (text) => {
    gap(6);
    row([{ text: toGlyphs(text), color: GOLD }]);
    rows.push({ segments: [], bg: null, height: 4, rule: true });
    gap(4);
  };
  const rank = quest ? `${RANK_NAMES[quest.rank]} ${"★".repeat(RANKS.indexOf(quest.rank) + 1)}` : "";
  const name = clip(toGlyphs(quest?.name ?? run.quest), COLS - rank.length - 12);
  row([{ text: "SCRYING  ", color: GOLD }, { text: name, color: TEXT }, { text: " ".repeat(Math.max(1, COLS - 9 - name.length - rank.length)), color: TEXT }, { text: rank, color: GOLD }]);
  rows.push({ segments: [], bg: null, height: 4, rule: true });
  gap(4);
  const outcome = run.outcome === "cleared" ? `Cleared, ${run.clearedAtPrompt === 1 ? "instant cast" : `channeled (${run.clearedAtPrompt} prompts)`}` : run.outcome === "fizzled" ? `Fizzled${run.reason ? ` (${run.reason})` : ""}` : "Mishap";
  const tokens = run.tokens === null ? "" : ` (${formatTokens(run.tokens)} tokens)`;
  const fields = [
    ["Loadout", loadoutLabel(run)],
    ["Hero", `${HARNESS_NAMES[run.hero]} ${run.heroVersion ?? "(version not reported)"}`],
    ["Weapon", run.caster],
    ["Charge", run.focus],
    ["Arena", run.containment],
    ["Outcome", outcome, run.outcome === "cleared" ? XP : run.outcome === "fizzled" ? HP : MUTED],
    ["Prompts", `${run.prompts}${quest ? ` of ${quest.maxPrompts}` : ""}`],
    ["Score", `${Math.round(run.score * 100)}%`],
    ["Cast time", formatDuration(run.durationMs)],
    ["Mana", `${run.costUsd === null ? "not priced yet" : formatMana(Math.round(run.costUsd * MANA_PER_USD))}${tokens}`]
  ];
  for (let i = 0;i < fields.length; i += 2) {
    const segments = [];
    for (const [index, [label, value, color]] of fields.slice(i, i + 2).entries()) {
      const text = clip(toGlyphs(value), 47 - 11 - 1);
      segments.push({ text: `${label.padEnd(11)}`, color: GOLD }, { text: index === 0 ? text.padEnd(47 - 11) : text, color: color ?? TEXT });
    }
    row(segments);
  }
  title("Final reply");
  const reply = [...output.replies].reverse().find((text) => text.trim()) ?? "";
  const replyLines = reply ? wrap(clean(reply.replace(/\*\*|__/g, "").trim()), COLS - 2) : [toGlyphs("(The hero reported no final message.)")];
  for (const line of replyLines.slice(0, CAPS.reply))
    row([{ text: ` ${line}`, color: reply ? TEXT : MUTED }], WELL);
  if (replyLines.length > CAPS.reply)
    row([{ text: ` ... ${replyLines.length - CAPS.reply} more lines`, color: MUTED }], WELL);
  title("Changes");
  const diffLines = output.diff.trim() ? clean(output.diff.replace(/\n$/, "")).split(`
`) : [];
  if (diffLines.length === 0)
    row([{ text: " (No file changes.)", color: MUTED }], WELL);
  for (const line of diffLines.slice(0, CAPS.diff)) {
    const color = /^(\+\+\+|---) /.test(line) ? GOLD : line.startsWith("+") ? XP : line.startsWith("-") ? HP : line.startsWith("@@") ? LINK : line.startsWith("Binary files") ? MUTED : MUTED;
    row([{ text: ` ${clip(line, COLS - 2)}`, color }], WELL);
  }
  if (diffLines.length > CAPS.diff)
    row([{ text: ` ... ${diffLines.length - CAPS.diff} more lines`, color: MUTED }], WELL);
  title(`Checks: ${output.checks.filter((check) => check.ok).length} of ${output.checks.length} passed`);
  for (const check of output.checks.slice(0, CAPS.checks)) {
    row([{ text: check.ok ? " ✓ " : " × ", color: check.ok ? XP : HP }, { text: clip(toGlyphs(check.label), COLS - 4), color: TEXT }], WELL);
  }
  if (output.checks.length > CAPS.checks)
    row([{ text: ` ... ${output.checks.length - CAPS.checks} more checks`, color: MUTED }], WELL);
  if (output.checks.length === 0)
    row([{ text: " (No checks were graded.)", color: MUTED }], WELL);
  gap(8);
  const note = describeFindings(found);
  row([{ text: toGlyphs(`VibeRPG Proving Grounds · ${quest?.id ?? run.quest} v${run.questVersion} · ${run.startedAt.slice(0, 10)}`), color: MUTED }]);
  if (note)
    row([{ text: clip(`${note[0].toUpperCase()}${note.slice(1)}.`, COLS), color: MUTED }]);
  const top = 24;
  const height = top + rows.reduce((sum, item) => sum + item.height, 0) + 24;
  const pixels = new Uint8Array(WIDTH * height).fill(NIGHT);
  const fill = (x, y, w, h, color) => {
    for (let yy = Math.max(0, y);yy < Math.min(height, y + h); yy++)
      pixels.fill(color, yy * WIDTH + Math.max(0, x), yy * WIDTH + Math.min(WIDTH, x + w));
  };
  for (let y = 0;y < height; y += 4)
    for (let x = y / 4 % 2 ? 2 : 0;x < WIDTH; x += 4)
      pixels[y * WIDTH + x] = 7;
  const [wx, wy, ww, wh] = [8, 8, WIDTH - 16, height - 16];
  fill(wx + 1, wy, ww - 2, wh, INK);
  fill(wx, wy + 1, ww, wh - 2, INK);
  fill(wx + 1, wy + 1, ww - 2, wh - 2, EDGE);
  fill(wx + 3, wy + 3, ww - 6, wh - 6, LINE);
  const inner = [wx + 4, wy + 4, ww - 8, wh - 8];
  const band = Math.ceil(inner[3] / 3);
  [TOP, MID, BOTTOM].forEach((color, i) => fill(inner[0], inner[1] + i * band, inner[2], Math.min(band, inner[3] - i * band), color));
  const blurs = [];
  let y = top;
  for (const item of rows) {
    if (item.bg !== null)
      fill(LEFT - 4, y, COLS * 8 + 8, item.height, item.bg);
    if (item.rule)
      fill(LEFT, y + 1, COLS * 8, 1, LINE);
    let col = 0;
    for (const segment of item.segments) {
      for (const char of segment.text) {
        const x = LEFT + col * 8;
        const mark = char === CREDENTIAL_MARK ? "credential" : char === SENSITIVE_MARK ? "sensitive" : null;
        if (col < COLS) {
          if (mark) {
            const ramp = RAMPS[mark];
            fill(x, y, 8, LH, ramp[0]);
            drawGlyph(pixels, x, y + 1, PLACEHOLDER[(col * 7 + y) % PLACEHOLDER.length], ramp[4]);
            const last = blurs[blurs.length - 1];
            if (last && last.y === y && last.x + last.w === x && last.ramp === ramp)
              last.w += 8;
            else
              blurs.push({ x, y, w: 8, ramp });
          } else
            drawGlyph(pixels, x, y + 1, char, segment.color);
        }
        col++;
      }
    }
    y += item.height;
  }
  for (const region of blurs)
    blur(pixels, region.x, region.y, region.w, LH, region.ramp);
  return { png: encodePng(WIDTH, height, PALETTE, pixels), width: WIDTH, height, found };
  function drawGlyph(buffer, x, y0, char, color) {
    const hex = GLYPHS.get(char) ?? GLYPHS.get("?");
    for (let r = 0;r < 16; r++) {
      const bits = Number.parseInt(hex.slice(r * 2, r * 2 + 2), 16);
      if (bits) {
        for (let c = 0;c < 8; c++)
          if (bits & 128 >> c)
            buffer[(y0 + r) * WIDTH + x + c] = color;
      }
    }
  }
}
function blur(pixels, x0, y0, w, h, ramp) {
  const ink = new Float32Array(w * h);
  for (let y = 0;y < h; y++)
    for (let x = 0;x < w; x++)
      ink[y * w + x] = pixels[(y0 + y) * WIDTH + x0 + x] === ramp[4] ? 1 : 0;
  const radius = 3;
  for (let y = 0;y < h; y++)
    for (let x = 0;x < w; x++) {
      let sum = 0, n = 0;
      for (let dy = -radius;dy <= radius; dy++)
        for (let dx = -radius;dx <= radius; dx++) {
          const yy = y + dy, xx = x + dx;
          if (yy >= 0 && yy < h && xx >= 0 && xx < w) {
            sum += ink[yy * w + xx];
            n++;
          }
        }
      pixels[(y0 + y) * WIDTH + x0 + x] = ramp[Math.min(4, Math.round(sum / n * 6))];
    }
}
async function saveScrying(png, runId, dir) {
  if (!/^[A-Za-z0-9][A-Za-z0-9-]{0,79}$/.test(runId))
    throw new Error("Unexpected run id for a screenshot file name.");
  await mkdir6(dir, { recursive: true });
  const file = join10(dir, `${runId}.png`);
  await writeFile5(file, png);
  return file;
}
function savedNote(found) {
  const findings = describeFindings(found);
  return `scrying saved${findings ? `, ${findings}` : ""}`;
}
async function scryPending(outputsDir, scryingDir, runs, render, log) {
  const done = new Set(await readdir9(scryingDir).catch(() => []));
  const pending = (await readdir9(outputsDir).catch(() => [])).filter((name) => name.endsWith(".json") && !done.has(name.replace(/\.json$/, ".png"))).sort();
  const byId = new Map(runs.map((run) => [run.id, run]));
  let rendered = 0;
  for (const name of pending) {
    const output = JSON.parse(await readFile7(join10(outputsDir, name), "utf8"));
    const run = byId.get(output.runId);
    if (!run || run.outcome === "mishap")
      continue;
    const note = await render(run, output);
    if (note === null)
      continue;
    rendered++;
    log(`${run.quest} ${run.outcome}: ${note}`);
  }
  return { rendered, skipped: pending.length - rendered };
}

// src/shared/game.ts
function emptySave() {
  return { v: 1, trainer: null, seen: [], learned: [], caught: [], proven: [], foes: [], medals: {}, gyms: {}, hidden: [] };
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
function medalCatalog(input) {
  const medal = (id, name, tier, source, rule, feedback) => ({ id, name, tier, source, rule, feedback });
  return [
    medal("first-victory", "First Victory", "bronze", "practice", "Win your first practice battle.", "You matched a spell to a problem. Try a gym next."),
    medal("type-scholar", "Type Scholar", "silver", "practice", "Beat every foe in the bestiary at least once in practice.", "You know which spell fights each foe. Try it on a real task."),
    medal("full-party", "Full Party", "silver", "practice", "Win a battle casting Scout, Craft, Test and Ship spells in that order.", "Gather context, build, check, then ship."),
    medal("wise-restraint", "Wise Restraint", "silver", "practice", "Clear a quest round Unarmed, where trials show spells only add cost.", "Sometimes the best spell is none. Check the trials before you equip."),
    ...input.classes.map((c) => medal(`gym-${c.slug}`, `${c.className} Gym`, "bronze", "practice", `Win the ${c.className} gym's battle.`, `You know the ${c.className} foes. Earn gold by clearing a real ${c.className} quest.`)),
    medal("first-scroll", "First Scroll", "bronze", "logs", "Use a library skill in a real session.", "Your agent read a skill. Open its page to see what it is good at."),
    medal("orb-bearer", "Orb Bearer", "bronze", "logs", "Use a library MCP server in a real session.", "Your agent called a tool server. Check which foes it fights."),
    medal("relic-keeper", "Relic Keeper", "bronze", "logs", "Use a library plugin in a real session.", "A plugin did some of the work. See if a combo uses it."),
    medal("summoner", "Summoner", "bronze", "logs", "Run a session where your agent sends a subagent.", "Your agent split the work. Give helpers small, clear jobs."),
    medal("scout-first", "Scout First", "silver", "logs", "In one session, use a Scout-row spell before the first Craft-row spell.", "You looked before you built. Keep doing that."),
    medal("bug-slayer", "Bug Slayer", "silver", "logs", "In one session, a test fails and later passes with the same runner. It shows a fix happened, not that a spell caused it.", "You ran the tests again after a fix. That is the habit."),
    medal("explorer", "Explorer", "bronze", "logs", "Use a skill, MCP server or plugin that isn't in the library yet. Its name stays on your machine.", "You found something new. Send a spell report if it helped."),
    ...input.combos.map((w) => medal(`combo-${w.slug}`, `Combo: ${w.name}`, "silver", "logs", "Use this combo's spells in order in one session.", "You ran the whole combo. Try it in a local quest to see if it pays off.")),
    ...input.classes.filter((c) => input.questSchools.includes(c.slug)).map((c) => medal(`proven-${c.slug}`, `${c.className} Proven`, "gold", "trials", `Clear ${/^[AEIOU]/.test(c.className) ? "an" : "a"} ${c.className} quest on your machine with a spell equipped and opened.`, "Your spell helped on a real quest. Run it Unarmed too, to see the difference.")),
    medal("true-buff", "True Buff", "gold", "trials", "Clear a quest with spells that your Unarmed run of the same setup failed.", "The spells made the difference here. Share a spell report."),
    medal("thrift", "Thrift", "gold", "trials", "Clear a quest with spells at or below the Unarmed run's mana, or its tokens when a run is not priced.", "The spells paid for themselves. Keep this loadout.")
  ];
}
function today(date = new Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// src/plugin/medals.ts
var KIND_MEDALS = { skill: "first-scroll", mcp_server: "orb-bearer", plugin: "relic-keeper" };
var TIER_MARKS = { gold: "[G]", silver: "[S]", bronze: "[B]" };
function earn(medals, id, ts) {
  const day = today(ts !== null && !Number.isNaN(Date.parse(ts)) ? new Date(ts) : undefined);
  if (!medals[id] || day < medals[id])
    medals[id] = day;
}
function earlier(a, b) {
  if (a === null)
    return b;
  return b !== null && Date.parse(b) < Date.parse(a) ? b : a;
}
function comboWorkflows(library) {
  const matched = new Set(library.skills.filter((skill) => skill.match.length > 0).map((skill) => skill.slug));
  return library.workflows.filter((workflow) => workflow.steps.every((step) => matched.has(step.skill)));
}
function logMedals(roots, library) {
  const medals = {};
  const caught = new Set;
  const byId = new Map;
  for (const skill of library.skills)
    for (const id of skill.match)
      byId.set(id, [...byId.get(id) ?? [], skill]);
  const kinds = new Map(library.skills.map((skill) => [skill.slug, skill.kind]));
  const combos = comboWorkflows(library);
  for (const root of roots) {
    const used = new Map;
    for (const [id, ts] of root.spells) {
      const skills = byId.get(id);
      if (!skills) {
        if (/^(skill|mcp|plugin):/.test(id))
          earn(medals, "explorer", ts ?? root.startedAt);
        continue;
      }
      for (const { slug } of skills)
        used.set(slug, used.has(slug) ? earlier(used.get(slug), ts) : ts);
    }
    for (const [slug, ts] of used) {
      caught.add(slug);
      const medal = KIND_MEDALS[kinds.get(slug)];
      if (medal)
        earn(medals, medal, ts ?? root.startedAt);
    }
    for (const member of root.members)
      if (member.id !== root.id)
        earn(medals, "summoner", member.startedAt ?? root.startedAt);
    const firstIn = (phase) => [...used].filter(([slug, ts]) => ts !== null && library.phases?.[slug] === phase).map(([, ts]) => ts).reduce(earlier, null);
    const scout = firstIn("scout");
    const craft = firstIn("craft");
    if (scout !== null && craft !== null && Date.parse(scout) < Date.parse(craft))
      earn(medals, "scout-first", craft);
    for (const member of root.members) {
      const failures = new Map;
      for (const test of member.tests)
        if (test.failed)
          failures.set(test.family, Math.min(failures.get(test.family) ?? Infinity, test.seq));
      for (const test of member.tests) {
        if (!test.failed && test.seq > (failures.get(test.family) ?? Infinity))
          earn(medals, "bug-slayer", test.ts ?? member.startedAt ?? root.startedAt);
      }
    }
    for (const workflow of combos) {
      const times = workflow.steps.map((step) => used.get(step.skill) ?? null);
      if (times.every((ts, index) => ts !== null && (index === 0 || Date.parse(times[index - 1]) <= Date.parse(ts)))) {
        earn(medals, `combo-${workflow.slug}`, times.at(-1));
      }
    }
  }
  return { medals, caught: [...caught].sort() };
}
function setupKey2(item) {
  return JSON.stringify([
    item.quest,
    item.questVersion,
    item.loadout,
    item.cast,
    item.hero,
    item.heroVersion,
    item.caster,
    item.focus,
    item.containment,
    item.environment.os,
    item.environment.arch
  ]);
}
function questMedals(runs, quests, library) {
  const medals = {};
  const proven = new Set;
  const gyms = {};
  const spells = new Set(library.skills.map((skill) => skill.slug));
  const current = new Map(quests.map((quest) => [quest.id, quest]));
  for (const run of runs) {
    const quest = current.get(run.quest);
    const attuned = run.attuned.filter((slug) => spells.has(slug));
    if (run.outcome !== "cleared" || !quest || quest.version !== run.questVersion || attuned.length === 0)
      continue;
    earn(medals, `proven-${quest.school}`, run.startedAt);
    gyms[quest.school] = "gold";
    for (const slug of attuned)
      proven.add(slug);
  }
  const cells = cellsFromRuns(runs, quests, library);
  for (const cell of cells) {
    if (cell.loadout.kind === "unarmed" || cell.cleared === 0)
      continue;
    const control = cells.find((other) => other.loadout.kind === "unarmed" && sameSetup(cell, other));
    if (!control)
      continue;
    const thrift = cell.medianCostUsd !== null && control.medianCostUsd !== null ? cell.medianCostUsd <= control.medianCostUsd : cell.medianTokens !== null && control.medianTokens !== null && cell.medianTokens <= control.medianTokens;
    const key = setupKey2(cell);
    for (const run of runs) {
      if (run.outcome !== "cleared" || setupKey2(run) !== key)
        continue;
      if (control.cleared < control.runs)
        earn(medals, "true-buff", run.startedAt);
      if (thrift)
        earn(medals, "thrift", run.startedAt);
    }
  }
  return { medals, proven: [...proven].sort(), gyms };
}
async function medalsReport(roots, runs, quests, library, base) {
  const logs = logMedals(roots, library);
  const trials = questMedals(runs, quests, library);
  const medals = { ...logs.medals, ...trials.medals };
  const defs = medalCatalog({
    classes: library.classes ?? [],
    questSchools: [...new Set(quests.map((quest) => quest.school))],
    combos: comboWorkflows(library).map(({ slug, name }) => ({ slug, name }))
  }).filter((def) => def.source !== "practice");
  const earned = defs.filter((def) => medals[def.id]);
  const width = Math.max(...defs.map((def) => def.name.length));
  const bar = `+${"-".repeat(width + 22)}+`;
  const lines = [bar, `|  ${"MEDALS FROM YOUR SESSIONS AND QUESTS".padEnd(width + 20)}|`, bar];
  for (const def of earned)
    lines.push(`${TIER_MARKS[def.tier]} ${def.name.padEnd(width)}  ${def.tier.padEnd(6)}  ${medals[def.id]}`);
  if (earned.length < defs.length)
    lines.push("", "Not yet:");
  for (const def of defs)
    if (!medals[def.id])
      lines.push(`[ ] ${def.name.padEnd(width)}  ${def.tier.padEnd(6)}  ${def.rule}`);
  lines.push("", `Earned ${earned.length} of ${defs.length} medals. Library spells used in your sessions: ${logs.caught.length}. Spells proven in your quests: ${trials.proven.length}.`);
  if (!base) {
    lines.push("No site address is bundled, so there is no import link. Rerun with --base <site address>.", "Nothing was sent.");
    return lines;
  }
  const code = await encodeSave({ ...emptySave(), medals, caught: logs.caught, proven: trials.proven, gyms: trials.gyms });
  lines.push("", "Open this link to add these medals to your save on the Practice Grounds:", `${new URL("play/", base).href}#s=${code}`, "Only medal names, days and library spell names are in this link. Nothing was sent.");
  return lines;
}

// src/plugin/cli.ts
var DEFAULT_ENDPOINT = "https://rlbreak.jpfusin.tech/api/submit";
var VERSION = "0.7.3";
var PARSERS = {
  codex: parseCodexFile,
  "claude-code": parseClaudeFile,
  omp: parseOmpFile
};
var HELP = {
  spells: `spells [--top N]
List local spell ids and root-session counts. Logs stay on this machine.`,
  quests: `quests
List bundled quests by school, rank, id and summary.`,
  doctor: `doctor
Check Node, sandbox support, installed heroes (harnesses) and sign-in state.`,
  trial: `trial <batch options> [--scrying [--blur]]
Run quests with your own plan allowance. Requires Node 22 or newer.
${BATCH_HELP}
  --scrying            Save a screenshot of each run's output (off by default; nothing is shared unless you attach screenshots to a report)
  --blur               Also save screenshots that show sensitive details, with those details blurred (credentials are always removed)`,
  trials: `trials
Show locally measured trial results: Steadiness (reliability) and Buff (effectiveness against Unarmed). Requires Node 22 or newer.`,
  scry: `scry [--blur]
Saves screenshots for runs made with trial --scrying that have none yet, such as ones withheld for sensitive details. Without --blur (or a yes at the prompt) those stay unsaved. Starts no new runs.`,
  new: `new <dir> --name <name> --kind <skill|plugin|mcp_server|subagent> --source <https-url> --match <id>...
  [--version <version>] [--agent <claude-code|codex>]... [--submitter <name>] [--github <user>] [--email <address>] [--no-environment] [--trials <library-slug>]... [--scrying]
Creates spell-report.md without overwriting. Records this machine's OS, CPU architecture and harness versions from local logs unless --no-environment is given. --trials adds matching loadouts and their Unarmed controls; --scrying also attaches your saved screenshots of those trials (up to 6 files and 4 MB). Default agent: claude-code; submitter: Anonymous. Edit the draft before sending.`,
  attach: `attach <report.md> <file> --alt <text>
Copies a chosen PNG, JPEG, GIF, WebP, MP4 or WebM next to the report and records its SHA-256. Maximum 6 files and 4 MB for the whole submission.`,
  check: `check <report.md>
Checks the report header, byte limits, attachment hashes and optional <report.md>.sig. Valid signatures with a GitHub claim trigger public-key lookups.`,
  sign: `sign <report.md> [--key <path>]
Signs exact report bytes with ssh-keygen. Default key: first existing ~/.ssh/id_ed25519, id_ecdsa or id_rsa. The CLI never reads private key bytes. Passphrase prompts must run in your own terminal.`,
  submit: `submit <report.md> [--yes] [--endpoint <url>] [--email <address>]
Without --yes: local preview only, exit 2, no network. With --yes: check, then send only the report, signature and chosen attachments. Endpoint: --endpoint, SPELL_REPORT_ENDPOINT, then the bundled site URL.`,
  medals: `medals [--base <url>]
Checks your local session logs and quest results for medals, then prints a card and an import link for the Practice Grounds. Nothing is sent; the link holds only medal names, days and library spell names. Base: --base, then the bundled site. Requires Node 20.12 or newer.`
};
var PluginCatalogSchema = object({
  skills: array(SkillSchema),
  workflows: array(WorkflowSchema),
  phases: record(SlugSchema, _enum(PHASES)).optional(),
  classes: array(object({ slug: SlugSchema, className: string2() })).optional(),
  prices: array(ModelPriceSchema)
});
async function readPluginCatalog(skillDir) {
  return PluginCatalogSchema.parse(JSON.parse(await readFile8(join11(skillDir, "catalog.json"), "utf8")));
}
async function readLocal(path, limit) {
  if (resolve4(path).split(sep4).some((part) => SENSITIVE_NAME.test(part) || part.startsWith(".env") || part === ".ssh")) {
    throw new Error("Refusing to read a sensitive path.");
  }
  if ((await lstat4(path)).isSymbolicLink())
    throw new Error("Refusing to read a symbolic link.");
  const file = await open3(path, constants4.O_RDONLY | constants4.O_NOFOLLOW);
  try {
    const info = await file.stat();
    if (!info.isFile())
      throw new Error("Expected a regular file.");
    if (info.size > limit)
      throw new Error(`File exceeds the ${limit}-byte limit.`);
    const bytes = await file.readFile();
    if (bytes.length > limit)
      throw new Error(`File exceeds the ${limit}-byte limit.`);
    return bytes;
  } finally {
    await file.close();
  }
}
async function optionalSignature(path) {
  try {
    return await readLocal(`${path}.sig`, SUBMIT_LIMITS.signatureBytes);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT")
      return null;
    throw error;
  }
}
async function readReport(path, verify, fetchFn) {
  if (extname(path).toLowerCase() !== ".md")
    throw new Error("Report filename must end in .md.");
  const report = await readLocal(path, SUBMIT_LIMITS.reportBytes);
  const parsed = parseReport(report.toString("utf8"));
  const issues = [...parsed.issues, ...parsed.meta ? unfinishedParts(parsed.meta, parsed.body) : []];
  const signature = await optionalSignature(path);
  let total = report.length + (signature?.length ?? 0);
  const attachments = [];
  const names = new Set;
  for (const entry of parsed.meta?.attachments ?? []) {
    if (names.has(entry.file) || entry.file === basename3(path) || entry.file === `${basename3(path)}.sig`) {
      issues.push(`Attachment name is repeated or reserved: ${entry.file}`);
      continue;
    }
    names.add(entry.file);
    try {
      const bytes = await readLocal(join11(dirname5(path), entry.file), SUBMIT_LIMITS.totalBytes - total);
      total += bytes.length;
      attachments.push({ name: entry.file, bytes });
    } catch {
      issues.push(`Cannot read attachment within the upload limit: ${entry.file}`);
    }
  }
  if (total > SUBMIT_LIMITS.totalBytes)
    issues.push("Report, signature and attachments exceed 4 MB total.");
  const provenance = verify ? await checkProvenance({ report, signature: signature?.toString("utf8") ?? null, meta: parsed.meta, attachments, fetchFn }) : null;
  if (provenance) {
    if (provenance.signature.status === "invalid")
      issues.push(`Invalid signature: ${provenance.signature.reason ?? "verification failed"}`);
    for (const item of provenance.attachments)
      if (!item.ok)
        issues.push(`Attachment hash or type check failed: ${item.file}`);
    for (const name of provenance.missingAttachments)
      issues.push(`Missing attachment: ${name}`);
  }
  return { report, meta: parsed.meta, signature, attachments, issues, provenance, total };
}
function printCheck(files, out) {
  out(`Report: ${files.meta?.spell.name ?? "invalid header"} (${files.report.length} bytes)`);
  out(`Attachments: ${files.attachments.length}; total: ${files.total} bytes`);
  if (files.meta?.evidence?.environment)
    out(`Environment: ${environmentLabel(files.meta.evidence.environment)}`);
  if (files.provenance) {
    out(`SHA-256: ${files.provenance.reportSha256}`);
    out(`Signature: ${files.provenance.signature.status}`);
    out(`GitHub: ${files.provenance.github.status}`);
    if (files.provenance.signature.status === "unsupported")
      out("Warning: this key type cannot be verified here.");
    if (["key_not_listed", "lookup_failed"].includes(files.provenance.github.status))
      out("Warning: GitHub account attribution was not verified.");
  }
  for (const issue of files.issues)
    out(`Problem: ${issue}`);
}
async function scanLogs(err) {
  const sources = await discoverFiles();
  const summaries = [];
  let failed = 0;
  let malformed = 0;
  let tails = 0;
  err(`Reading ${sources.length} local session files; no logs will be sent.`);
  for (const [index, source] of sources.entries()) {
    try {
      const summary = await PARSERS[source.agent](source);
      summaries.push(summary);
      malformed += summary.malformedLines;
      if (summary.truncatedTail)
        tails++;
    } catch {
      failed++;
    }
    if ((index + 1) % 200 === 0)
      err(`Read ${index + 1}/${sources.length} files.`);
  }
  err(`Read ${sources.length}/${sources.length} files. Skipped ${failed} unreadable files, ${malformed} malformed lines and ${tails} unfinished tails.`);
  return rollUp(summaries).roots;
}
function endpointUrl(value) {
  const raw = value ?? process.env.SPELL_REPORT_ENDPOINT ?? DEFAULT_ENDPOINT;
  if (!raw)
    throw new Error("No submission endpoint configured. Use --endpoint <site>/api/submit.");
  const url = new URL(raw);
  if (url.username || url.password || url.hash || url.search)
    throw new Error("Endpoint must not contain credentials, a query or a fragment.");
  const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if (url.protocol !== "https:" && !(url.protocol === "http:" && loopback))
    throw new Error("Use HTTPS for submission (HTTP is allowed only on localhost).");
  return url;
}
async function attach(path, source, alt, out, as) {
  if (await optionalSignature(path))
    throw new Error("This report is signed. Create an unsigned copy before changing its attachments.");
  const report = await readLocal(path, SUBMIT_LIMITS.reportBytes);
  const parsed = parseReport(report.toString("utf8"));
  if (!parsed.meta || parsed.issues.length)
    throw new Error(parsed.issues.join(`
`));
  const bytes = await readLocal(source, SUBMIT_LIMITS.totalBytes);
  const type = sniffMediaType(bytes);
  if (!type)
    throw new Error("Unsupported attachment type. Use PNG, JPEG, GIF, WebP, MP4 or WebM.");
  const stem = basename3(source, extname(source)).normalize("NFKD").replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^[^A-Za-z0-9]+/, "").slice(0, 100);
  const name = as ?? `${stem || "attachment"}.${type.ext}`;
  const previous = parsed.meta.attachments.find((item) => item.file === name);
  const entry = { file: name, sha256: await sha256Hex(bytes), alt };
  const meta = ReportMetaSchema.parse({ ...parsed.meta, attachments: previous ? parsed.meta.attachments.map((item) => item.file === name ? entry : item) : [...parsed.meta.attachments, entry] });
  const text = formatReport(meta, parsed.body);
  const reportSize = Buffer.byteLength(text);
  if (reportSize > SUBMIT_LIMITS.reportBytes)
    throw new Error("Report exceeds the report byte limit.");
  let total = reportSize + bytes.length;
  for (const item of meta.attachments) {
    if (item.file !== name)
      total += (await readLocal(join11(dirname5(path), item.file), SUBMIT_LIMITS.totalBytes)).length;
  }
  if (total > SUBMIT_LIMITS.totalBytes)
    throw new Error("Report, signature and attachments exceed 4 MB total.");
  const target = join11(dirname5(path), name);
  if (resolve4(target) !== resolve4(source)) {
    if (previous) {
      try {
        if ((await lstat4(target)).isSymbolicLink())
          throw new Error("Refusing to replace a symbolic link.");
      } catch (error) {
        if (!(error instanceof Error && ("code" in error) && error.code === "ENOENT"))
          throw error;
      }
    }
    await writeFile6(target, bytes, { flag: previous ? constants4.O_WRONLY | constants4.O_TRUNC | constants4.O_CREAT | constants4.O_NOFOLLOW : "wx" });
  }
  await writeFile6(path, text, { flag: constants4.O_WRONLY | constants4.O_TRUNC | constants4.O_NOFOLLOW });
  out(`Attached ${name} (${bytes.length} bytes), SHA-256 ${entry.sha256}`);
}
async function sign(path, selectedKey, out, err) {
  const files = await readReport(path, false);
  if (files.issues.length)
    throw new Error(files.issues.join(`
`));
  if (files.signature)
    throw new Error("A signature already exists. Move it aside before signing again.");
  let key = selectedKey;
  if (!key) {
    for (const name of ["id_ed25519", "id_ecdsa", "id_rsa"]) {
      const candidate = join11(homedir4(), ".ssh", name);
      try {
        await access(candidate);
        key = candidate;
        break;
      } catch {}
    }
  }
  if (!key)
    throw new Error("No standard SSH key found. Use --key <path> with your signing key.");
  const args = ["-Y", "sign", "-n", SIGNATURE_NAMESPACE, "-f", resolve4(key), resolve4(path)];
  const windows = process.platform === "win32";
  const command = `${windows ? "& " : ""}${["ssh-keygen", ...args].map((part) => `'${part.replace(/'/g, windows ? "''" : "'\\''")}'`).join(" ")}`;
  let missing = false;
  const success = await new Promise((done) => {
    const child = spawn3("ssh-keygen", args, {
      detached: true,
      windowsHide: true,
      stdio: "ignore",
      timeout: 15000,
      env: { ...process.env, SSH_ASKPASS_REQUIRE: "never" }
    });
    child.on("error", (error) => {
      missing = "code" in error && error.code === "ENOENT";
      done(false);
    });
    child.on("close", (code) => done(code === 0));
  });
  if (!success) {
    err(`${missing ? "ssh-keygen was not found. Install the OpenSSH client." : "Signing did not finish. Your key may need a passphrase."} Run this in your own ${windows ? "PowerShell" : "terminal"}:
${command}`);
    return 1;
  }
  out(`Signed ${basename3(path)}. Signature: ${basename3(path)}.sig`);
  return 0;
}
async function terminalAsk(question) {
  const prompt = createInterface2({ input: process.stdin, output: process.stdout });
  try {
    return /^y(es)?$/i.test((await prompt.question(question)).trim());
  } finally {
    prompt.close();
  }
}
async function trialScrying(args, dir, ask, out) {
  const rest = args.filter((arg) => arg !== "--scrying" && arg !== "--blur");
  const blur = args.includes("--blur");
  const consent = args.includes("--scrying") || ask !== null && await ask("Save a screenshot of each run's output (Scrying)? Nothing is shared unless you add screenshots to a report. [y/N] ");
  if (!consent) {
    if (blur)
      out("--blur has no effect without --scrying; no screenshots will be saved.");
    return { args: rest, context: {} };
  }
  return { args: rest, context: {
    outputsDir: join11(dir, "outputs"),
    scry: async (run, output, quest) => {
      const shot = scry(run, output, quest);
      if (sensitiveCount(shot.found) > 0) {
        const credentials = shot.found.credential ? ` ${listFindings(shot.found, ["credential"])} will be removed either way.` : "";
        out(`Alert: the screenshot of run ${run.id.slice(0, 8)} (${quest.id}) shows sensitive details: ${listFindings(shot.found, FINDINGS.filter((kind) => kind !== "credential"))}.${credentials}`);
        const allowed = blur || ask !== null && await ask("Save this screenshot with those details blurred? [y/N] ");
        if (!allowed)
          return "screenshot not saved (sensitive details; rerun with --blur to save it blurred)";
      }
      await saveScrying(shot.png, run.id, join11(dir, "scrying"));
      return savedNote(shot.found);
    }
  } };
}
async function runCli(argv, options = {}) {
  const out = options.stdout ?? console.log;
  const err = options.stderr ?? console.error;
  if (Number.parseInt(process.versions.node.split(".")[0] ?? "0", 10) < 20) {
    err(`spell-report requires Node 20 or newer; found Node ${process.versions.node}.`);
    return 1;
  }
  const [command, ...args] = argv;
  if (!command || command === "--help" || command === "-h") {
    out(`spell-report ${VERSION} (Node 20+; trials need Node 22+)
Usage: spell-report <command> [options]
Commands: spells, quests, doctor, trial, trials, scry, medals, new, attach, check, sign, submit
Use <command> --help for details.${DEFAULT_ENDPOINT ? `
Default endpoint: ${DEFAULT_ENDPOINT}` : ""}`);
    return 0;
  }
  if (!Object.hasOwn(HELP, command)) {
    err(`Unknown command: ${command}`);
    return 1;
  }
  if (args.includes("--help") || args.includes("-h")) {
    out(HELP[command] ?? "");
    return 0;
  }
  try {
    if ((command === "trial" || command === "trials") && Number.parseInt(process.versions.node.split(".")[0] ?? "0", 10) < 22) {
      throw new Error(`spell-report ${command} requires Node 22 or newer; found Node ${process.versions.node}. Other report commands support Node 20.`);
    }
    const skillDir = dirname5(dirname5(fileURLToPath(import.meta.url)));
    const questsDir = options.questsDir ?? join11(skillDir, "quests");
    const dataDir = options.dataDir ?? process.env.VIBERPG_DATA_DIR ?? join11(homedir4(), ".viberpg");
    const runsFile = join11(dataDir, "trials", "runs.jsonl");
    const catalog = async () => options.catalog ?? readPluginCatalog(skillDir);
    switch (command) {
      case "medals": {
        const { values, positionals } = parseArgs2({ args, allowPositionals: true, options: { base: { type: "string" } } });
        if (positionals.length)
          throw new Error(HELP.medals);
        const [major = 0, minor = 0] = process.versions.node.split(".").map(Number);
        if (major === 20 && minor < 12)
          throw new Error(`spell-report medals requires Node 20.12 or newer; found Node ${process.versions.node}.`);
        const base = values.base !== undefined ? endpointUrl(values.base.replace(/\/*$/, "/")) : DEFAULT_ENDPOINT ? new URL("../", DEFAULT_ENDPOINT) : null;
        const library = await catalog();
        const quests = await loadQuests(questsDir);
        const roots = options.roots ?? await scanLogs(err);
        for (const line of await medalsReport(roots, options.runs ?? await readRuns(runsFile), quests, library, base))
          out(line);
        return 0;
      }
      case "quests":
        if (args.length)
          throw new Error(HELP.quests);
        for (const quest of await loadQuests(questsDir))
          out(`${quest.school}	${RANK_NAMES[quest.rank]}	${quest.id}	${quest.summary}`);
        return 0;
      case "doctor":
        if (args.length)
          throw new Error(HELP.doctor);
        for (const line of doctorLines())
          out(line);
        return 0;
      case "trial": {
        const ask = options.ask !== undefined ? options.ask : process.stdin.isTTY && process.stdout.isTTY ? terminalAsk : null;
        const scrying = await trialScrying(args, join11(dataDir, "trials"), ask, out);
        const request = parseBatchArgs(scrying.args);
        await runBatch(request, { catalog: await catalog(), quests: await loadQuests(questsDir), cacheRoot: join11(dataDir, "trials", "cache"), runsFile, log: out, ...scrying.context });
        return 0;
      }
      case "scry": {
        if (args.some((arg) => arg !== "--blur"))
          throw new Error(HELP.scry);
        const ask = options.ask !== undefined ? options.ask : process.stdin.isTTY && process.stdout.isTTY ? terminalAsk : null;
        const { context } = await trialScrying(["--scrying", ...args], join11(dataDir, "trials"), ask, out);
        const quests = await loadQuests(questsDir);
        const counts = await scryPending(join11(dataDir, "trials", "outputs"), join11(dataDir, "trials", "scrying"), await readRuns(runsFile), async (run, output) => {
          const quest = quests.find((item) => item.id === run.quest && item.version === run.questVersion);
          return quest ? context.scry(run, output, quest) : null;
        }, out);
        out(`Checked ${counts.rendered} saved run output(s); ${counts.skipped} skipped (mishaps or quests no longer bundled).`);
        return 0;
      }
      case "trials": {
        if (args.length)
          throw new Error(HELP.trials);
        const library = await catalog();
        const quests = await loadQuests(questsDir);
        const cells = cellsFromRuns(await withLines(await readRuns(runsFile), join11(dataDir, "trials", "outputs")), quests, library);
        for (const line of describeCells(cells, library, quests))
          out(line);
        if (!cells.length)
          out("No trial results yet. Use quests, doctor, then trial --help.");
        return 0;
      }
      case "spells": {
        const { values, positionals } = parseArgs2({ args, allowPositionals: true, options: { top: { type: "string" } } });
        if (positionals.length)
          throw new Error(HELP.spells);
        const top = values.top === undefined ? Infinity : exports_coerce.number().int().positive().parse(values.top);
        const counts = new Map;
        for (const root of await scanLogs(err))
          for (const id of root.spells.keys())
            counts.set(id, (counts.get(id) ?? 0) + 1);
        for (const [id, count] of [...counts].sort(([a, ac], [b, bc]) => bc - ac || a.localeCompare(b, "en")).slice(0, top))
          out(`${id}	${count}`);
        return 0;
      }
      case "new": {
        const { values, positionals } = parseArgs2({ args, allowPositionals: true, options: {
          name: { type: "string" },
          kind: { type: "string" },
          source: { type: "string" },
          match: { type: "string", multiple: true },
          version: { type: "string" },
          agent: { type: "string", multiple: true },
          submitter: { type: "string" },
          github: { type: "string" },
          email: { type: "string" },
          "no-environment": { type: "boolean" },
          trials: { type: "string", multiple: true },
          scrying: { type: "boolean" }
        } });
        const dir = positionals[0];
        if (!dir || positionals.length !== 1)
          throw new Error(HELP.new);
        try {
          await lstat4(join11(dir, "spell-report.md"));
          throw new Error("spell-report.md already exists; choose a new directory.");
        } catch (error) {
          if (!(error instanceof Error && ("code" in error) && error.code === "ENOENT"))
            throw error;
        }
        const meta = ReportMetaSchema.parse({
          format: REPORT_FORMAT,
          spell: { name: values.name, kind: values.kind, sourceUrl: values.source, version: values.version ?? null, agents: values.agent ?? ["claude-code"] },
          submitter: { name: values.submitter ?? "Anonymous", github: values.github ?? null, email: values.email ?? null },
          verdict: { tier: null, summary: PLACEHOLDER_SUMMARY },
          evidence: { generator: `spell-report ${VERSION}`, generatedAt: new Date().toISOString(), match: [...new Set(values.match ?? [])], sessions: 0, byAgent: {}, firstUsed: null, lastUsed: null, tests: { sessionsWithFailingTest: 0, recovered: 0 } },
          attachments: []
        });
        const evidence = meta.evidence;
        if (!evidence)
          throw new Error("At least one --match id is required.");
        const roots = await scanLogs(err);
        const stats = measureSpell(roots, evidence.match);
        meta.evidence = {
          ...evidence,
          sessions: stats.sessions,
          byAgent: stats.byAgent,
          firstUsed: stats.firstMonth,
          lastUsed: stats.lastMonth,
          tests: stats.tests,
          ...!values["no-environment"] ? { environment: await testerEnvironment(roots) } : {}
        };
        if (values.trials) {
          const library = await catalog();
          const slugs = new Set([...library.skills, ...library.workflows].map((item) => item.slug));
          for (const slug of values.trials)
            if (!slugs.has(slug))
              throw new Error(`No spell or workflow "${slug}" in the library.`);
          const runs = await readRuns(runsFile);
          const cells = cellsFromRuns(await withLines(runs, join11(dataDir, "trials", "outputs")), await loadQuests(questsDir), library);
          const selected = cells.filter((cell) => cell.loadout.kind !== "unarmed" && (values.trials.includes(cell.loadout.slug ?? "") || cell.loadout.spells.some((slug) => values.trials.includes(slug))));
          meta.trials = cells.filter((cell) => selected.includes(cell) || cell.loadout.kind === "unarmed" && selected.some((armed) => sameSetup(armed, cell))).map((cell) => ({ ...cell, source: { kind: "community", name: meta.submitter.name } }));
        }
        const body = REPORT_SECTIONS.map((section) => `## ${section}

<!-- Write your experience here; omit private details. -->`).join(`

`);
        const shots = [];
        let leftOut = 0;
        if (values.scrying) {
          if (!meta.trials?.length)
            throw new Error("--scrying attaches trial screenshots; add --trials <library-slug>.");
          const runs = await readRuns(runsFile);
          let total = Buffer.byteLength(formatReport(meta, body)) + 2000 + SUBMIT_LIMITS.signatureBytes;
          const armedFirst = [...meta.trials].sort((a, b) => Number(a.loadout.kind === "unarmed") - Number(b.loadout.kind === "unarmed"));
          for (const cell of armedFirst) {
            const latest = runs.filter((run) => run.outcome !== "mishap" && setupKey(run) === setupKey(cell)).sort((a, b) => b.startedAt.localeCompare(a.startedAt));
            for (const run of latest) {
              const source = join11(dataDir, "trials", "scrying", `${run.id}.png`);
              let bytes;
              try {
                bytes = await readLocal(source, SUBMIT_LIMITS.totalBytes);
              } catch {
                continue;
              }
              const name = `${(await sha256Hex(bytes)).slice(0, 16)}.png`;
              const outcome = run.outcome === "cleared" ? "cleared" : "fizzled";
              if (!shots.some((shot) => shot.name === name)) {
                if (shots.length >= SUBMIT_LIMITS.attachments || total + bytes.length > SUBMIT_LIMITS.totalBytes) {
                  leftOut++;
                  break;
                }
                total += bytes.length;
                const loadout = cell.loadout.kind === "unarmed" ? "Unarmed" : cell.loadout.slug ?? cell.loadout.spells.join(" + ");
                shots.push({ source, name, alt: `Scrying (screenshot) of a ${outcome} run of ${cell.quest} with ${loadout}` });
              }
              cell.scrying = { file: name, outcome };
              break;
            }
          }
        }
        await mkdir7(dir, { recursive: true });
        await writeFile6(join11(dir, "spell-report.md"), formatReport(meta, body), { flag: "wx" });
        for (const shot of shots)
          await attach(join11(dir, "spell-report.md"), shot.source, shot.alt, out, shot.name);
        out(`Created spell-report.md. Evidence: ${stats.sessions} root sessions. Fill every section and the verdict before sending.`);
        out(`Environment: ${meta.evidence.environment ? environmentLabel(meta.evidence.environment) : "not recorded (--no-environment)"}`);
        if (meta.trials)
          out(`Added ${meta.trials.length} trial cells, including matching Unarmed controls (self-measured).`);
        if (values.scrying)
          out(shots.length ? `Attached ${shots.length} screenshot(s) of these trials${leftOut ? `; ${leftOut} left out to stay within ${SUBMIT_LIMITS.attachments} files and 4 MB` : ""}. View each one before sending.` : "No saved screenshots for these trials. Run trial with --scrying first.");
        return 0;
      }
      case "attach": {
        const { values, positionals } = parseArgs2({ args, allowPositionals: true, options: { alt: { type: "string" } } });
        const [path, source] = positionals;
        if (!path || !source || positionals.length !== 2 || values.alt === undefined)
          throw new Error(HELP.attach);
        await attach(path, source, values.alt, out);
        return 0;
      }
      case "check": {
        const { positionals } = parseArgs2({ args, allowPositionals: true });
        const path = positionals[0];
        if (!path || positionals.length !== 1)
          throw new Error(HELP.check);
        const files = await readReport(path, true, options.fetchFn);
        printCheck(files, out);
        return files.issues.length ? 1 : 0;
      }
      case "sign": {
        const { values, positionals } = parseArgs2({ args, allowPositionals: true, options: { key: { type: "string" } } });
        const path = positionals[0];
        if (!path || positionals.length !== 1)
          throw new Error(HELP.sign);
        return await sign(path, values.key, out, err);
      }
      case "submit": {
        const { values, positionals } = parseArgs2({ args, allowPositionals: true, options: { yes: { type: "boolean" }, endpoint: { type: "string" }, email: { type: "string" } } });
        const path = positionals[0];
        if (!path || positionals.length !== 1)
          throw new Error(HELP.submit);
        const configured = values.endpoint ?? process.env.SPELL_REPORT_ENDPOINT ?? DEFAULT_ENDPOINT;
        const endpoint = configured ? endpointUrl(configured) : null;
        const files = await readReport(path, values.yes === true, options.fetchFn);
        const email = values.email === undefined ? files.meta?.submitter.email : email2().max(200).parse(values.email);
        if (!values.yes) {
          out(`Nothing sent. Destination: ${endpoint?.href ?? "not configured; pass --endpoint <site>/api/submit"}
Report: ${basename3(path)} (${files.report.length} bytes)
${files.report.toString("utf8")}`);
          out(`Signature: ${files.signature ? `${basename3(path)}.sig (${files.signature.length} bytes)` : "none"}`);
          for (const file of files.attachments)
            out(`Attachment: ${file.name} (${file.bytes.length} bytes), SHA-256 ${await sha256Hex(file.bytes)}`);
          out(`Reply-to: ${email ?? "none"}
Consent: yes; via: plugin. Logs are never sent.
Review these files, then rerun with --yes only after explicit approval.`);
          for (const issue of files.issues)
            err(`Problem: ${issue}`);
          return 2;
        }
        printCheck(files, out);
        if (files.issues.length)
          return 1;
        if (!endpoint)
          throw new Error("No submission endpoint configured. Use --endpoint <site>/api/submit.");
        const form = new FormData;
        form.set("report", new Blob([files.report], { type: "text/markdown" }), basename3(path));
        if (files.signature)
          form.set("signature", new Blob([files.signature], { type: "text/plain" }), `${basename3(path)}.sig`);
        for (const file of files.attachments)
          form.append("files", new Blob([file.bytes], { type: sniffMediaType(file.bytes)?.mime }), file.name);
        form.set("consent", "yes");
        form.set("via", "plugin");
        form.set("website", "");
        if (email)
          form.set("email", email);
        try {
          const response = await (options.fetchFn ?? fetch)(endpoint, { method: "POST", body: form, headers: { Accept: "application/json" }, signal: AbortSignal.timeout(30000), redirect: "error" });
          const result = await response.json();
          if (!response.ok) {
            const problem = object({ error: string2(), issues: array(string2()).optional(), retryAfterSeconds: number2().optional() }).safeParse(result);
            if (!problem.success)
              throw new Error(`Submission failed (HTTP ${response.status}).`);
            err(problem.data.error);
            for (const issue of problem.data.issues ?? [])
              err(issue);
            if (problem.data.retryAfterSeconds !== undefined)
              err(`Retry after ${problem.data.retryAfterSeconds} seconds.`);
            throw new Error(`Submission failed (HTTP ${response.status}).`);
          }
          const receipt = object({ id: string2().min(1), signature: _enum(["valid", "invalid", "unsigned", "unsupported"]), github: _enum(["verified", "key_not_listed", "lookup_failed", "not_claimed", "unsigned"]), warnings: array(string2()) }).parse(result);
          out(`Reference id: ${receipt.id}
Signature: ${receipt.signature}
GitHub: ${receipt.github}`);
          for (const warning of receipt.warnings)
            out(`Warning: ${warning}`);
          return 0;
        } catch (error) {
          err(`Could not submit: ${error instanceof Error ? error.message : "request failed"}
Upload the report and chosen files at ${new URL("../submit/", endpoint).href}`);
          return 1;
        }
      }
    }
  } catch (error) {
    if (error instanceof ZodError)
      for (const issue of error.issues)
        err(`${issue.path.join(".") || "input"}: ${issue.message}`);
    else
      err(error instanceof Error ? error.message : "Command failed.");
  }
  return 1;
}
if (process.argv[1] && resolve4(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = await runCli(process.argv.slice(2));
}
export {
  readPluginCatalog,
  runCli,
  trialScrying
};
