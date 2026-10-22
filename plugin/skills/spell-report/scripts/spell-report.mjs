#!/usr/bin/env node
// Generated from src/plugin/cli.ts; spell-report 0.4.0. Rebuild with bun run build:plugin.
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

// src/plugin/cli.ts
import { spawn as spawn3 } from "node:child_process";
import { constants as constants4 } from "node:fs";
import { access, lstat as lstat4, mkdir as mkdir7, open as open3, readFile as readFile8, writeFile as writeFile6 } from "node:fs/promises";
import { homedir as homedir4 } from "node:os";
import { basename as basename3, dirname as dirname5, extname, join as join11, resolve as resolve4, sep as sep4 } from "node:path";
import { createInterface as createInterface2 } from "node:readline/promises";
import { fileURLToPath } from "node:url";
import { parseArgs as parseArgs2 } from "node:util";

// node_modules/zod/v4/classic/external.js
var exports_external = {};
__export(exports_external, {
  xor: () => xor,
  xid: () => xid2,
  withParser: () => withParser,
  void: () => _void2,
  validateAsync: () => validateAsync,
  validate: () => validate,
  uuidv7: () => uuidv7,
  uuidv6: () => uuidv6,
  uuidv4: () => uuidv4,
  uuid: () => uuid2,
  util: () => exports_util,
  url: () => url,
  uppercase: () => _uppercase,
  unknown: () => unknown,
  union: () => union,
  undefined: () => _undefined3,
  ulid: () => ulid2,
  uint64: () => uint64,
  uint32: () => uint32,
  tuple: () => tuple,
  trim: () => _trim,
  treeifyError: () => treeifyError,
  transform: () => transform,
  toZod: () => toZod,
  toUpperCase: () => _toUpperCase,
  toLowerCase: () => _toLowerCase,
  toJSONSchema: () => toJSONSchema,
  templateLiteral: () => templateLiteral,
  symbol: () => symbol,
  superRefine: () => superRefine,
  success: () => success,
  stringbool: () => stringbool,
  stringFormat: () => stringFormat,
  string: () => string2,
  strictObject: () => strictObject,
  startsWith: () => _startsWith,
  slugify: () => _slugify,
  size: () => _size,
  setErrorMap: () => setErrorMap,
  set: () => set,
  safeParseAsync: () => safeParseAsync2,
  safeParse: () => safeParse2,
  safeEncodeAsync: () => safeEncodeAsync2,
  safeEncode: () => safeEncode2,
  safeDecodeAsync: () => safeDecodeAsync2,
  safeDecode: () => safeDecode2,
  registry: () => registry,
  regexes: () => exports_regexes,
  regex: () => _regex,
  refine: () => refine,
  record: () => record,
  readonly: () => readonly,
  property: () => _property,
  properties: () => _properties,
  promise: () => promise,
  prettifyError: () => prettifyError,
  preprocess: () => preprocess,
  prefault: () => prefault,
  positive: () => _positive,
  pipe: () => pipe,
  partialRecord: () => partialRecord,
  parseAsync: () => parseAsync2,
  parse: () => parse3,
  overwrite: () => _overwrite,
  output: () => output,
  optional: () => optional,
  object: () => object,
  number: () => number2,
  nullish: () => nullish2,
  nullable: () => nullable,
  null: () => _null3,
  normalize: () => _normalize,
  nonpositive: () => _nonpositive,
  nonoptional: () => nonoptional,
  nonnegative: () => _nonnegative,
  never: () => never,
  negative: () => _negative,
  nativeEnum: () => nativeEnum,
  nanoid: () => nanoid2,
  nan: () => nan,
  multipleOf: () => _multipleOf,
  minSize: () => _minSize,
  minLength: () => _minLength,
  mime: () => _mime,
  meta: () => meta2,
  memoizer: () => memoizer,
  maxSize: () => _maxSize,
  maxLength: () => _maxLength,
  map: () => map,
  mac: () => mac2,
  lte: () => _lte,
  lt: () => _lt,
  lowercase: () => _lowercase,
  looseRecord: () => looseRecord,
  looseObject: () => looseObject,
  locales: () => exports_locales,
  literal: () => literal,
  length: () => _length,
  lazy: () => lazy,
  ksuid: () => ksuid2,
  keyof: () => keyof,
  jwt: () => jwt,
  json: () => json,
  iso: () => exports_iso,
  ipv6: () => ipv62,
  ipv4: () => ipv42,
  invertCodec: () => invertCodec,
  intersection: () => intersection,
  int64: () => int64,
  int32: () => int32,
  int: () => int,
  instanceof: () => _instanceof,
  input: () => input,
  includes: () => _includes,
  iban: () => iban2,
  httpUrl: () => httpUrl,
  hostname: () => hostname2,
  hex: () => hex2,
  hash: () => hash,
  guid: () => guid2,
  gte: () => _gte,
  gt: () => _gt,
  globalRegistry: () => globalRegistry,
  getErrorMap: () => getErrorMap,
  getDiscriminatedOption: () => getDiscriminatedOption,
  function: () => _function,
  fromJSONSchema: () => fromJSONSchema,
  formatError: () => formatError,
  float64: () => float64,
  float32: () => float32,
  flattenError: () => flattenError,
  file: () => file,
  exactOptional: () => exactOptional,
  enum: () => _enum2,
  endsWith: () => _endsWith,
  encodeAsync: () => encodeAsync2,
  encode: () => encode2,
  emoji: () => emoji2,
  email: () => email2,
  e164: () => e1642,
  discriminatedUnion: () => discriminatedUnion,
  describe: () => describe2,
  deepPartial: () => deepPartial,
  decodeAsync: () => decodeAsync2,
  decode: () => decode2,
  date: () => date2,
  custom: () => custom,
  currencyCode: () => currencyCode2,
  cuid2: () => cuid22,
  cuid: () => cuid3,
  creditCard: () => creditCard2,
  core: () => exports_core2,
  config: () => config,
  compile: () => compile,
  coerce: () => exports_coerce,
  codec: () => codec,
  clone: () => clone,
  cidrv6: () => cidrv62,
  cidrv4: () => cidrv42,
  check: () => check,
  catch: () => _catch2,
  boolean: () => boolean2,
  bigint: () => bigint2,
  base64url: () => base64url2,
  base64: () => base642,
  array: () => array,
  any: () => any,
  _function: () => _function,
  _default: () => _default2,
  _ZodString: () => _ZodString,
  ZodXor: () => ZodXor,
  ZodXID: () => ZodXID,
  ZodVoid: () => ZodVoid,
  ZodUnknown: () => ZodUnknown,
  ZodUnion: () => ZodUnion,
  ZodUndefined: () => ZodUndefined,
  ZodUUID: () => ZodUUID,
  ZodURL: () => ZodURL,
  ZodULID: () => ZodULID,
  ZodType: () => ZodType,
  ZodTuple: () => ZodTuple,
  ZodTransform: () => ZodTransform,
  ZodTemplateLiteral: () => ZodTemplateLiteral,
  ZodSymbol: () => ZodSymbol,
  ZodSuccess: () => ZodSuccess,
  ZodStringFormat: () => ZodStringFormat,
  ZodString: () => ZodString,
  ZodSet: () => ZodSet,
  ZodRecord: () => ZodRecord,
  ZodRealError: () => ZodRealError,
  ZodReadonly: () => ZodReadonly,
  ZodPromise: () => ZodPromise,
  ZodPreprocess: () => ZodPreprocess,
  ZodPrefault: () => ZodPrefault,
  ZodPipe: () => ZodPipe,
  ZodOptional: () => ZodOptional,
  ZodObject: () => ZodObject,
  ZodNumberFormat: () => ZodNumberFormat,
  ZodNumber: () => ZodNumber,
  ZodNullable: () => ZodNullable,
  ZodNull: () => ZodNull,
  ZodNonOptional: () => ZodNonOptional,
  ZodNever: () => ZodNever,
  ZodNanoID: () => ZodNanoID,
  ZodNaN: () => ZodNaN,
  ZodMap: () => ZodMap,
  ZodMAC: () => ZodMAC,
  ZodLiteral: () => ZodLiteral,
  ZodLazy: () => ZodLazy,
  ZodKSUID: () => ZodKSUID,
  ZodJWT: () => ZodJWT,
  ZodIssueCode: () => ZodIssueCode,
  ZodIntersection: () => ZodIntersection,
  ZodInstanceOf: () => ZodInstanceOf,
  ZodISOTime: () => ZodISOTime,
  ZodISODuration: () => ZodISODuration,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODate: () => ZodISODate,
  ZodIPv6: () => ZodIPv6,
  ZodIPv4: () => ZodIPv4,
  ZodIBAN: () => ZodIBAN,
  ZodGUID: () => ZodGUID,
  ZodFunction: () => ZodFunction,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFile: () => ZodFile,
  ZodExactOptional: () => ZodExactOptional,
  ZodError: () => ZodError,
  ZodEnum: () => ZodEnum,
  ZodEmoji: () => ZodEmoji,
  ZodEmail: () => ZodEmail,
  ZodE164: () => ZodE164,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodDefault: () => ZodDefault,
  ZodDate: () => ZodDate,
  ZodCustomStringFormat: () => ZodCustomStringFormat,
  ZodCustom: () => ZodCustom,
  ZodCreditCard: () => ZodCreditCard,
  ZodCompileUnsupportedError: () => ZodCompileUnsupportedError,
  ZodCompileAsyncError: () => ZodCompileAsyncError,
  ZodCodec: () => ZodCodec,
  ZodCatch: () => ZodCatch,
  ZodCUID2: () => ZodCUID2,
  ZodCUID: () => ZodCUID,
  ZodCIDRv6: () => ZodCIDRv6,
  ZodCIDRv4: () => ZodCIDRv4,
  ZodBoolean: () => ZodBoolean,
  ZodBigIntFormat: () => ZodBigIntFormat,
  ZodBigInt: () => ZodBigInt,
  ZodBase64URL: () => ZodBase64URL,
  ZodBase64: () => ZodBase64,
  ZodArray: () => ZodArray,
  ZodAny: () => ZodAny,
  TimePrecision: () => TimePrecision,
  NEVER: () => NEVER,
  INVALID: () => INVALID,
  $output: () => $output,
  $input: () => $input,
  $brand: () => $brand
});

// node_modules/zod/v4/core/index.js
var exports_core2 = {};
__export(exports_core2, {
  withParser: () => withParser,
  version: () => version,
  validateURL: () => validateURL,
  validateAsync: () => validateAsync,
  validate: () => validate,
  util: () => exports_util,
  urlProtocolOk: () => urlProtocolOk,
  urlHostnameOk: () => urlHostnameOk,
  treeifyError: () => treeifyError,
  toZod: () => toZod,
  toJSONSchema: () => toJSONSchema,
  toDotPath: () => toDotPath,
  stripTabAndNewline: () => stripTabAndNewline,
  standardProps: () => standardProps,
  safeParseAsync: () => safeParseAsync,
  safeParse: () => safeParse,
  safeEncodeAsync: () => safeEncodeAsync,
  safeEncode: () => safeEncode,
  safeDecodeAsync: () => safeDecodeAsync,
  safeDecode: () => safeDecode,
  registry: () => registry,
  regexes: () => exports_regexes,
  processSchema: () => processSchema,
  process: () => processSchema,
  prettifyError: () => prettifyError,
  parseURLObject: () => parseURLObject,
  parseAsync: () => parseAsync,
  parse: () => parse,
  meta: () => meta,
  mergeValues: () => mergeValues,
  memoizer: () => memoizer,
  locales: () => exports_locales,
  isValidJWT: () => isValidJWT,
  isValidIPv6: () => isValidIPv6,
  isValidIBAN: () => isValidIBAN,
  isValidCreditCard: () => isValidCreditCard,
  isValidCIDRv6: () => isValidCIDRv6,
  isValidBase64URL: () => isValidBase64URL,
  isValidBase64: () => isValidBase64,
  isRecursiveSchema: () => isRecursiveSchema,
  isBackEdge: () => isBackEdge,
  initializeContext: () => initializeContext,
  handleUnrepresentable: () => handleUnrepresentable,
  globalRegistry: () => globalRegistry,
  globalConfig: () => globalConfig,
  getDiscriminatedOption: () => getDiscriminatedOption,
  formatError: () => formatError,
  flattenError: () => flattenError,
  finalize: () => finalize,
  extractDefs: () => extractDefs,
  encodeAsync: () => encodeAsync,
  encode: () => encode,
  describe: () => describe,
  decodeAsync: () => decodeAsync,
  decode: () => decode,
  createToJSONSchemaMethod: () => createToJSONSchemaMethod,
  createStandardJSONSchemaMethod: () => createStandardJSONSchemaMethod,
  config: () => config,
  compileFn: () => compileFn,
  compile: () => compile,
  clone: () => clone,
  canParseURL: () => canParseURL,
  base64urlCharset: () => base64urlCharset,
  base64Charset: () => base64Charset,
  _xor: () => _xor,
  _xid: () => _xid,
  _void: () => _void,
  _uuidv7: () => _uuidv7,
  _uuidv6: () => _uuidv6,
  _uuidv4: () => _uuidv4,
  _uuid: () => _uuid,
  _url: () => _url,
  _uppercase: () => _uppercase,
  _unknown: () => _unknown,
  _union: () => _union,
  _undefined: () => _undefined2,
  _ulid: () => _ulid,
  _uint64: () => _uint64,
  _uint32: () => _uint32,
  _tuple: () => _tuple,
  _trim: () => _trim,
  _transform: () => _transform,
  _toUpperCase: () => _toUpperCase,
  _toLowerCase: () => _toLowerCase,
  _templateLiteral: () => _templateLiteral,
  _symbol: () => _symbol,
  _superRefine: () => _superRefine,
  _success: () => _success,
  _stringbool: () => _stringbool,
  _stringFormat: () => _stringFormat,
  _string: () => _string,
  _startsWith: () => _startsWith,
  _slugify: () => _slugify,
  _size: () => _size,
  _set: () => _set,
  _safeParseAsync: () => _safeParseAsync,
  _safeParse: () => _safeParse,
  _safeEncodeAsync: () => _safeEncodeAsync,
  _safeEncode: () => _safeEncode,
  _safeDecodeAsync: () => _safeDecodeAsync,
  _safeDecode: () => _safeDecode,
  _regex: () => _regex,
  _refine: () => _refine,
  _record: () => _record,
  _readonly: () => _readonly,
  _property: () => _property,
  _properties: () => _properties,
  _promise: () => _promise,
  _positive: () => _positive,
  _pipe: () => _pipe,
  _parseAsync: () => _parseAsync,
  _parse: () => _parse,
  _overwrite: () => _overwrite,
  _optional: () => _optional,
  _number: () => _number,
  _nullable: () => _nullable,
  _null: () => _null2,
  _normalize: () => _normalize,
  _nonpositive: () => _nonpositive,
  _nonoptional: () => _nonoptional,
  _nonnegative: () => _nonnegative,
  _never: () => _never,
  _negative: () => _negative,
  _nativeEnum: () => _nativeEnum,
  _nanoid: () => _nanoid,
  _nan: () => _nan,
  _multipleOf: () => _multipleOf,
  _minSize: () => _minSize,
  _minLength: () => _minLength,
  _min: () => _gte,
  _mime: () => _mime,
  _maxSize: () => _maxSize,
  _maxLength: () => _maxLength,
  _max: () => _lte,
  _map: () => _map,
  _mac: () => _mac,
  _lte: () => _lte,
  _lt: () => _lt,
  _lowercase: () => _lowercase,
  _literal: () => _literal,
  _length: () => _length,
  _lazy: () => _lazy,
  _ksuid: () => _ksuid,
  _jwt: () => _jwt,
  _isoTime: () => _isoTime,
  _isoDuration: () => _isoDuration,
  _isoDateTime: () => _isoDateTime,
  _isoDate: () => _isoDate,
  _ipv6: () => _ipv6,
  _ipv4: () => _ipv4,
  _intersection: () => _intersection,
  _int64: () => _int64,
  _int32: () => _int32,
  _int: () => _int,
  _includes: () => _includes,
  _iban: () => _iban,
  _guid: () => _guid,
  _gte: () => _gte,
  _gt: () => _gt,
  _float64: () => _float64,
  _float32: () => _float32,
  _file: () => _file,
  _enum: () => _enum,
  _endsWith: () => _endsWith,
  _encodeAsync: () => _encodeAsync,
  _encode: () => _encode,
  _emoji: () => _emoji2,
  _email: () => _email,
  _e164: () => _e164,
  _discriminatedUnion: () => _discriminatedUnion,
  _default: () => _default,
  _decodeAsync: () => _decodeAsync,
  _decode: () => _decode,
  _date: () => _date,
  _custom: () => _custom,
  _cuid2: () => _cuid2,
  _cuid: () => _cuid,
  _creditCard: () => _creditCard,
  _coercedString: () => _coercedString,
  _coercedNumber: () => _coercedNumber,
  _coercedDate: () => _coercedDate,
  _coercedBoolean: () => _coercedBoolean,
  _coercedBigint: () => _coercedBigint,
  _cidrv6: () => _cidrv6,
  _cidrv4: () => _cidrv4,
  _check: () => _check,
  _catch: () => _catch,
  _boolean: () => _boolean,
  _bigint: () => _bigint,
  _base64url: () => _base64url,
  _base64: () => _base64,
  _array: () => _array,
  _any: () => _any,
  ZodCompileUnsupportedError: () => ZodCompileUnsupportedError,
  ZodCompileAsyncError: () => ZodCompileAsyncError,
  URL_UNPARSEABLE: () => URL_UNPARSEABLE,
  URL_BAD_FORMAT: () => URL_BAD_FORMAT,
  TimePrecision: () => TimePrecision,
  NEVER: () => NEVER,
  JSONSchemaGenerator: () => JSONSchemaGenerator,
  JSONSchema: () => exports_json_schema,
  INVALID: () => INVALID,
  Doc: () => Doc,
  $output: () => $output,
  $input: () => $input,
  $constructor: () => $constructor,
  $brand: () => $brand,
  $ZodXor: () => $ZodXor,
  $ZodXID: () => $ZodXID,
  $ZodVoid: () => $ZodVoid,
  $ZodUnknown: () => $ZodUnknown,
  $ZodUnion: () => $ZodUnion,
  $ZodUndefined: () => $ZodUndefined,
  $ZodUUID: () => $ZodUUID,
  $ZodURL: () => $ZodURL,
  $ZodULID: () => $ZodULID,
  $ZodType: () => $ZodType,
  $ZodTuple: () => $ZodTuple,
  $ZodTransform: () => $ZodTransform,
  $ZodTemplateLiteral: () => $ZodTemplateLiteral,
  $ZodSymbol: () => $ZodSymbol,
  $ZodSuccess: () => $ZodSuccess,
  $ZodStringFormat: () => $ZodStringFormat,
  $ZodString: () => $ZodString,
  $ZodSet: () => $ZodSet,
  $ZodRegistry: () => $ZodRegistry,
  $ZodRecord: () => $ZodRecord,
  $ZodRealError: () => $ZodRealError,
  $ZodReadonly: () => $ZodReadonly,
  $ZodPromise: () => $ZodPromise,
  $ZodPreprocess: () => $ZodPreprocess,
  $ZodPrefault: () => $ZodPrefault,
  $ZodPipe: () => $ZodPipe,
  $ZodOptional: () => $ZodOptional,
  $ZodObjectJIT: () => $ZodObjectJIT,
  $ZodObject: () => $ZodObject,
  $ZodNumberFormat: () => $ZodNumberFormat,
  $ZodNumber: () => $ZodNumber,
  $ZodNullable: () => $ZodNullable,
  $ZodNull: () => $ZodNull,
  $ZodNonOptional: () => $ZodNonOptional,
  $ZodNever: () => $ZodNever,
  $ZodNanoID: () => $ZodNanoID,
  $ZodNaN: () => $ZodNaN,
  $ZodMap: () => $ZodMap,
  $ZodMAC: () => $ZodMAC,
  $ZodLiteral: () => $ZodLiteral,
  $ZodLazy: () => $ZodLazy,
  $ZodKSUID: () => $ZodKSUID,
  $ZodJWT: () => $ZodJWT,
  $ZodIntersection: () => $ZodIntersection,
  $ZodISOTime: () => $ZodISOTime,
  $ZodISODuration: () => $ZodISODuration,
  $ZodISODateTime: () => $ZodISODateTime,
  $ZodISODate: () => $ZodISODate,
  $ZodIPv6: () => $ZodIPv6,
  $ZodIPv4: () => $ZodIPv4,
  $ZodIBAN: () => $ZodIBAN,
  $ZodGUID: () => $ZodGUID,
  $ZodFunction: () => $ZodFunction,
  $ZodFile: () => $ZodFile,
  $ZodExactOptional: () => $ZodExactOptional,
  $ZodError: () => $ZodError,
  $ZodEnum: () => $ZodEnum,
  $ZodEncodeError: () => $ZodEncodeError,
  $ZodEmoji: () => $ZodEmoji,
  $ZodEmail: () => $ZodEmail,
  $ZodE164: () => $ZodE164,
  $ZodDiscriminatedUnion: () => $ZodDiscriminatedUnion,
  $ZodDefault: () => $ZodDefault,
  $ZodDate: () => $ZodDate,
  $ZodCyclicError: () => $ZodCyclicError,
  $ZodCustomStringFormat: () => $ZodCustomStringFormat,
  $ZodCustom: () => $ZodCustom,
  $ZodCreditCard: () => $ZodCreditCard,
  $ZodCodec: () => $ZodCodec,
  $ZodCheckUpperCase: () => $ZodCheckUpperCase,
  $ZodCheckStringFormat: () => $ZodCheckStringFormat,
  $ZodCheckStartsWith: () => $ZodCheckStartsWith,
  $ZodCheckSizeEquals: () => $ZodCheckSizeEquals,
  $ZodCheckRegex: () => $ZodCheckRegex,
  $ZodCheckProperty: () => $ZodCheckProperty,
  $ZodCheckProperties: () => $ZodCheckProperties,
  $ZodCheckOverwrite: () => $ZodCheckOverwrite,
  $ZodCheckNumberFormat: () => $ZodCheckNumberFormat,
  $ZodCheckMultipleOf: () => $ZodCheckMultipleOf,
  $ZodCheckMinSize: () => $ZodCheckMinSize,
  $ZodCheckMinLength: () => $ZodCheckMinLength,
  $ZodCheckMimeType: () => $ZodCheckMimeType,
  $ZodCheckMaxSize: () => $ZodCheckMaxSize,
  $ZodCheckMaxLength: () => $ZodCheckMaxLength,
  $ZodCheckLowerCase: () => $ZodCheckLowerCase,
  $ZodCheckLessThan: () => $ZodCheckLessThan,
  $ZodCheckLengthEquals: () => $ZodCheckLengthEquals,
  $ZodCheckIncludes: () => $ZodCheckIncludes,
  $ZodCheckGreaterThan: () => $ZodCheckGreaterThan,
  $ZodCheckEndsWith: () => $ZodCheckEndsWith,
  $ZodCheckBigIntFormat: () => $ZodCheckBigIntFormat,
  $ZodCheck: () => $ZodCheck,
  $ZodCatch: () => $ZodCatch,
  $ZodCUID2: () => $ZodCUID2,
  $ZodCUID: () => $ZodCUID,
  $ZodCIDRv6: () => $ZodCIDRv6,
  $ZodCIDRv4: () => $ZodCIDRv4,
  $ZodBoolean: () => $ZodBoolean,
  $ZodBigIntFormat: () => $ZodBigIntFormat,
  $ZodBigInt: () => $ZodBigInt,
  $ZodBase64URL: () => $ZodBase64URL,
  $ZodBase64: () => $ZodBase64,
  $ZodAsyncError: () => $ZodAsyncError,
  $ZodArray: () => $ZodArray,
  $ZodAny: () => $ZodAny
});

// node_modules/zod/v4/core/util.js
var exports_util = {};
__export(exports_util, {
  unwrapMessage: () => unwrapMessage,
  uint8ArrayToHex: () => uint8ArrayToHex,
  uint8ArrayToBase64url: () => uint8ArrayToBase64url,
  uint8ArrayToBase64: () => uint8ArrayToBase64,
  toZod: () => toZod,
  stringifyPrimitive: () => stringifyPrimitive,
  slugify: () => slugify,
  sizeCaps: () => sizeCaps,
  shallowClone: () => shallowClone,
  safeExtend: () => safeExtend,
  required: () => required,
  rawShape: () => rawShape,
  randomString: () => randomString,
  propertyKeyTypes: () => propertyKeyTypes,
  promiseAllObject: () => promiseAllObject,
  primitiveTypes: () => primitiveTypes,
  prefixIssues: () => prefixIssues,
  pick: () => pick,
  partial: () => partial,
  parsedType: () => parsedType,
  own: () => own,
  optionalKeys: () => optionalKeys,
  omit: () => omit,
  objectClone: () => objectClone,
  numKeys: () => numKeys,
  nullish: () => nullish,
  normalizeParams: () => normalizeParams,
  mergeDefs: () => mergeDefs,
  merge: () => merge,
  members: () => members,
  jsonStringifyReplacer: () => jsonStringifyReplacer,
  joinValues: () => joinValues,
  issue: () => issue,
  isPlainObject: () => isPlainObject,
  isObject: () => isObject,
  installLazyProp: () => installLazyProp,
  hide: () => hide,
  hexToUint8Array: () => hexToUint8Array,
  getSizableOrigin: () => getSizableOrigin,
  getParsedType: () => getParsedType,
  getLengthableOrigin: () => getLengthableOrigin,
  getEnumValues: () => getEnumValues,
  getElementAtPath: () => getElementAtPath,
  floatSafeRemainder: () => floatSafeRemainder,
  finalizeIssue: () => finalizeIssue,
  extend: () => extend,
  explicitlyAborted: () => explicitlyAborted,
  escapeRegex: () => escapeRegex,
  esc: () => esc,
  derived: () => derived,
  defineLazyInternal: () => defineLazyInternal,
  defineLazy: () => defineLazy,
  createTransparentProxy: () => createTransparentProxy,
  constantCatch: () => constantCatch,
  codePointLength: () => codePointLength,
  cloneDef: () => cloneDef,
  clone: () => clone,
  cleanRegex: () => cleanRegex,
  cleanEnum: () => cleanEnum,
  captureStackTrace: () => captureStackTrace,
  cached: () => cached,
  base64urlToUint8Array: () => base64urlToUint8Array,
  base64ToUint8Array: () => base64ToUint8Array,
  attachSchema: () => attachSchema,
  assignProp: () => assignProp,
  assertNotEqual: () => assertNotEqual,
  assertNever: () => assertNever,
  assertIs: () => assertIs,
  assertEqual: () => assertEqual,
  assert: () => assert,
  allowsEval: () => allowsEval,
  aborted: () => aborted,
  NUMBER_FORMAT_RANGES: () => NUMBER_FORMAT_RANGES,
  Class: () => Class,
  CONSTANT_CATCH: () => CONSTANT_CATCH,
  BIGINT_FORMAT_RANGES: () => BIGINT_FORMAT_RANGES
});
function assertEqual(val) {
  return val;
}
function assertNotEqual(val) {
  return val;
}
function toZod() {
  return (schema) => schema;
}
function assertIs(_arg) {}
function assertNever(_x) {
  throw new Error("Unexpected value in exhaustive check");
}
function assert(_) {}
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
var EVALUATING = /* @__PURE__ */ Symbol("evaluating");
function defineLazy(object, key, getter) {
  let value = undefined;
  Object.defineProperty(object, key, {
    get() {
      if (value === EVALUATING) {
        return;
      }
      if (value === undefined) {
        value = EVALUATING;
        value = getter();
      }
      return value;
    },
    set(v) {
      Object.defineProperty(object, key, {
        value: v
      });
    },
    configurable: true
  });
}
function objectClone(obj) {
  return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
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
function cloneDef(schema) {
  return mergeDefs(schema._zod.def);
}
function getElementAtPath(obj, path) {
  if (!path)
    return obj;
  return path.reduce((acc, key) => acc?.[key], obj);
}
function promiseAllObject(promisesObj) {
  const keys = Object.keys(promisesObj);
  const promises = keys.map((key) => promisesObj[key]);
  return Promise.all(promises).then((results) => {
    const resolvedObj = {};
    for (let i = 0;i < keys.length; i++) {
      resolvedObj[keys[i]] = results[i];
    }
    return resolvedObj;
  });
}
function randomString(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let str = "";
  for (let i = 0;i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
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
function numKeys(data) {
  let keyCount = 0;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      keyCount++;
    }
  }
  return keyCount;
}
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return "undefined";
    case "string":
      return "string";
    case "number":
      return Number.isNaN(data) ? "nan" : "number";
    case "boolean":
      return "boolean";
    case "function":
      return "function";
    case "bigint":
      return "bigint";
    case "symbol":
      return "symbol";
    case "object":
      if (Array.isArray(data)) {
        return "array";
      }
      if (data === null) {
        return "null";
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return "promise";
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return "map";
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return "set";
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return "date";
      }
      if (typeof File !== "undefined" && data instanceof File) {
        return "file";
      }
      return "object";
    default:
      throw new Error(`Unknown data type: ${t}`);
  }
};
var propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
var primitiveTypes = /* @__PURE__ */ new Set([
  "string",
  "number",
  "bigint",
  "boolean",
  "symbol",
  "undefined"
]);
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
function createTransparentProxy(getter) {
  let target;
  return new Proxy({}, {
    get(_, prop, receiver) {
      target ?? (target = getter());
      return Reflect.get(target, prop, receiver);
    },
    set(_, prop, value, receiver) {
      target ?? (target = getter());
      return Reflect.set(target, prop, value, receiver);
    },
    has(_, prop) {
      target ?? (target = getter());
      return Reflect.has(target, prop);
    },
    deleteProperty(_, prop) {
      target ?? (target = getter());
      return Reflect.deleteProperty(target, prop);
    },
    ownKeys(_) {
      target ?? (target = getter());
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor(_, prop) {
      target ?? (target = getter());
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
    defineProperty(_, prop, descriptor) {
      target ?? (target = getter());
      return Reflect.defineProperty(target, prop, descriptor);
    }
  });
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
function getSizableOrigin(input) {
  if (input instanceof Set)
    return "set";
  if (input instanceof Map)
    return "map";
  if (input instanceof File)
    return "file";
  return "unknown";
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
function cleanEnum(obj) {
  return Object.entries(obj).filter(([k, _]) => {
    return Number.isNaN(Number.parseInt(k, 10));
  }).map((el) => el[1]);
}
function base64ToUint8Array(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0;i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
function uint8ArrayToBase64(bytes) {
  let binaryString = "";
  for (let i = 0;i < bytes.length; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  return btoa(binaryString);
}
function base64urlToUint8Array(base64url) {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - base64.length % 4) % 4);
  return base64ToUint8Array(base64 + padding);
}
function uint8ArrayToBase64url(bytes) {
  return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function hexToUint8Array(hex) {
  const cleanHex = hex.replace(/^0x/, "");
  if (cleanHex.length % 2 !== 0) {
    throw new Error("Invalid hex string length");
  }
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0;i < cleanHex.length; i += 2) {
    bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
  }
  return bytes;
}
function uint8ArrayToHex(bytes) {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

class Class {
  constructor(..._args) {}
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
var NEVER = /* @__PURE__ */ Object.freeze({
  status: "aborted"
});
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
      const own2 = Object.getPrototypeOf(inst);
      const ctorProto = inst._zod.constr.prototype;
      let up = own2;
      while (up && up !== ctorProto)
        up = Object.getPrototypeOf(up);
      const target = up ?? own2;
      if (!initialized.has(target)) {
        initialized.add(target);
        members(target, protoMembers);
      }
    }
    const proto2 = _.prototype;
    for (const k in proto2) {
      if (!Object.prototype.hasOwnProperty.call(proto2, k))
        continue;
      if (!(k in inst)) {
        inst[k] = proto2[k].bind(inst);
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
var $brand = /* @__PURE__ */ Symbol("zod_brand");

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
function flattenError(error, mapper = (issue2) => issue2.message) {
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
function formatError(error, mapper = (issue2) => issue2.message) {
  const fieldErrors = { _errors: [] };
  const processError = (error2, path = []) => {
    for (const issue2 of error2.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }, [...path, ...issue2.path]));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues }, [...path, ...issue2.path]);
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues }, [...path, ...issue2.path]);
      } else {
        const fullpath = [...path, ...issue2.path];
        if (fullpath.length === 0) {
          fieldErrors._errors.push(mapper(issue2));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < fullpath.length) {
            const el = fullpath[i];
            const terminal = i === fullpath.length - 1;
            if (el === "_errors") {
              if (terminal)
                curr._errors.push(mapper(issue2));
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
            const node2 = curr[el];
            if (terminal) {
              node2._errors.push(mapper(issue2));
            }
            curr = node2;
            i++;
          }
        }
      }
    }
  };
  processError(error);
  return fieldErrors;
}
function treeifyError(error, mapper = (issue2) => issue2.message) {
  const result = { errors: [] };
  const processError = (error2, path = []) => {
    var _a2;
    for (const issue2 of error2.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }, [...path, ...issue2.path]));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues }, [...path, ...issue2.path]);
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues }, [...path, ...issue2.path]);
      } else {
        const fullpath = [...path, ...issue2.path];
        if (fullpath.length === 0) {
          result.errors.push(mapper(issue2));
          continue;
        }
        let curr = result;
        let i = 0;
        while (i < fullpath.length) {
          const el = fullpath[i];
          const terminal = i === fullpath.length - 1;
          if (typeof el === "string") {
            curr.properties ?? (curr.properties = {});
            if (!Object.prototype.hasOwnProperty.call(curr.properties, el)) {
              Object.defineProperty(curr.properties, el, {
                value: { errors: [] },
                enumerable: true,
                writable: true,
                configurable: true
              });
            }
            curr = curr.properties[el];
          } else {
            curr.items ?? (curr.items = []);
            (_a2 = curr.items)[el] ?? (_a2[el] = { errors: [] });
            curr = curr.items[el];
          }
          if (terminal) {
            curr.errors.push(mapper(issue2));
          }
          i++;
        }
      }
    }
  };
  processError(error);
  return result;
}
function toDotPath(_path) {
  const segs = [];
  const path = _path.map((seg) => typeof seg === "object" ? seg.key : seg);
  for (const seg of path) {
    if (typeof seg === "number")
      segs.push(`[${seg}]`);
    else if (typeof seg === "symbol")
      segs.push(`[${JSON.stringify(String(seg))}]`);
    else if (/[^\w$]/.test(seg))
      segs.push(`[${JSON.stringify(seg)}]`);
    else {
      if (segs.length)
        segs.push(".");
      segs.push(seg);
    }
  }
  return segs.join("");
}
function prettifyError(error) {
  const lines = [];
  const issues = [...error.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
  for (const issue2 of issues) {
    lines.push(`✖ ${issue2.message}`);
    if (issue2.path?.length)
      lines.push(`  → at ${toDotPath(issue2.path)}`);
  }
  return lines.join(`
`);
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
var parse = /* @__PURE__ */ _parse($ZodRealError);
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
var parseAsync = /* @__PURE__ */ _parseAsync($ZodRealError);
var _safeParse = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError;
  }
  return result.issues.length ? failure(_Err, result.issues, ctx) : { success: true, data: result.value };
};
var safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
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
var safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError);
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
  const parse2 = _parse(_Err);
  const fn = (schema, value, _ctx, _params) => {
    const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
    return parse2(schema, value, ctx, finalizeParams(fn, _params));
  };
  return fn;
};
var encode = /* @__PURE__ */ _encode($ZodRealError);
var _decode = (_Err) => {
  const parse2 = _parse(_Err);
  const fn = (schema, value, _ctx, _params) => {
    return parse2(schema, value, _ctx, finalizeParams(fn, _params));
  };
  return fn;
};
var decode = /* @__PURE__ */ _decode($ZodRealError);
var _encodeAsync = (_Err) => {
  const parseAsync2 = _parseAsync(_Err);
  const fn = async (schema, value, _ctx, _params) => {
    const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
    return await parseAsync2(schema, value, ctx, finalizeParams(fn, _params));
  };
  return fn;
};
var encodeAsync = /* @__PURE__ */ _encodeAsync($ZodRealError);
var _decodeAsync = (_Err) => {
  const parseAsync2 = _parseAsync(_Err);
  const fn = async (schema, value, _ctx, _params) => {
    return await parseAsync2(schema, value, _ctx, finalizeParams(fn, _params));
  };
  return fn;
};
var decodeAsync = /* @__PURE__ */ _decodeAsync($ZodRealError);
var _safeEncode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
  return _safeParse(_Err)(schema, value, ctx);
};
var safeEncode = /* @__PURE__ */ _safeEncode($ZodRealError);
var _safeDecode = (_Err) => (schema, value, _ctx) => {
  return _safeParse(_Err)(schema, value, _ctx);
};
var safeDecode = /* @__PURE__ */ _safeDecode($ZodRealError);
var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, direction: "backward" } : { direction: "backward" };
  return _safeParseAsync(_Err)(schema, value, ctx);
};
var safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync($ZodRealError);
var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _safeParseAsync(_Err)(schema, value, _ctx);
};
var safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync($ZodRealError);
// node_modules/zod/v4/core/regexes.js
var exports_regexes = {};
__export(exports_regexes, {
  xid: () => xid,
  uuid7: () => uuid7,
  uuid6: () => uuid6,
  uuid4: () => uuid4,
  uuid: () => uuid,
  uppercase: () => uppercase,
  unicodeEmail: () => unicodeEmail,
  undefined: () => _undefined,
  ulid: () => ulid,
  time: () => time,
  string: () => string,
  sha512_hex: () => sha512_hex,
  sha512_base64url: () => sha512_base64url,
  sha512_base64: () => sha512_base64,
  sha384_hex: () => sha384_hex,
  sha384_base64url: () => sha384_base64url,
  sha384_base64: () => sha384_base64,
  sha256_hex: () => sha256_hex,
  sha256_base64url: () => sha256_base64url,
  sha256_base64: () => sha256_base64,
  sha1_hex: () => sha1_hex,
  sha1_base64url: () => sha1_base64url,
  sha1_base64: () => sha1_base64,
  rfc5322Email: () => rfc5322Email,
  number: () => number,
  null: () => _null,
  nanoidOfLength: () => nanoidOfLength,
  nanoid: () => nanoid,
  md5_hex: () => md5_hex,
  md5_base64url: () => md5_base64url,
  md5_base64: () => md5_base64,
  mac: () => mac,
  lowercase: () => lowercase,
  ksuid: () => ksuid,
  ipv6: () => ipv6,
  ipv4: () => ipv4,
  integer: () => integer,
  idnEmail: () => idnEmail,
  iban: () => iban,
  httpProtocol: () => httpProtocol,
  html5Email: () => html5Email,
  hostname: () => hostname,
  hex: () => hex,
  guid: () => guid,
  extendedDuration: () => extendedDuration,
  emoji: () => emoji,
  email: () => email,
  e164: () => e164,
  duration: () => duration,
  domain: () => domain,
  datetime: () => datetime,
  date: () => date,
  currencyCode: () => currencyCode,
  cuid2: () => cuid2,
  cuid: () => cuid,
  creditCard: () => creditCard,
  cidrv6: () => cidrv6,
  cidrv4: () => cidrv4,
  browserEmail: () => browserEmail,
  boolean: () => boolean,
  bigint: () => bigint,
  base64url: () => base64url,
  base64: () => base64,
  anyString: () => anyString
});
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
var extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
var uuid = (version) => {
  if (!version)
    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
  return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
var uuid4 = /* @__PURE__ */ uuid(4);
var uuid6 = /* @__PURE__ */ uuid(6);
var uuid7 = /* @__PURE__ */ uuid(7);
var email = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
var idnEmail = unicodeEmail;
var browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var _emoji = `^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$`;
function emoji() {
  return new RegExp(_emoji, "u");
}
var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var mac = (delimiter) => {
  const escapedDelim = escapeRegex(delimiter ?? ":");
  return new RegExp(`^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`);
};
var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var base64url = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;
var hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
var domain = /^(?=.{1,253}$)([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/;
var httpProtocol = /^https?$/;
var e164 = /^\+[1-9]\d{6,14}$/;
var creditCard = /^\d(?:[ -]?\d){11,18}$/;
var currencyCode = /^(?:AED|AFN|ALL|AMD|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BHD|BIF|BMD|BND|BOB|BOV|BRL|BSD|BTN|BWP|BYN|BZD|CAD|CDF|CHE|CHF|CHW|CLF|CLP|CNY|COP|COU|CRC|CUP|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HTG|HUF|IDR|ILS|INR|IQD|IRR|ISK|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRU|MUR|MVR|MWK|MXN|MXV|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLE|SOS|SRD|SSP|STN|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TWD|TZS|UAH|UGX|USD|USN|UYI|UYU|UYW|UZS|VED|VES|VND|VUV|WST|XAD|XAF|XAG|XAU|XBA|XBB|XBC|XBD|XCD|XCG|XDR|XOF|XPD|XPF|XPT|XSU|XTS|XUA|XXX|YER|ZAR|ZMW|ZWG)$/;
var iban = /^[A-Z]{2}(?!00|01|99)\d{2}[A-Z0-9]{11,30}$/;
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
var string = (params) => {
  const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
  return new RegExp(`^${regex}$`);
};
var bigint = /^-?\d+n?$/;
var integer = /^-?\d+$/;
var number = /^-?\d+(?:\.\d+)?$/;
var boolean = /^(?:true|false)$/i;
var _null = /^null$/i;
var _undefined = /^undefined$/i;
var lowercase = /^[^A-Z]*$/;
var uppercase = /^[^a-z]*$/;
var hex = /^[0-9a-fA-F]*$/;
function fixedBase64(bodyLength, padding) {
  return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
}
function fixedBase64url(length) {
  return new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
}
var md5_hex = /^[0-9a-fA-F]{32}$/;
var md5_base64 = /* @__PURE__ */ fixedBase64(22, "==");
var md5_base64url = /* @__PURE__ */ fixedBase64url(22);
var sha1_hex = /^[0-9a-fA-F]{40}$/;
var sha1_base64 = /* @__PURE__ */ fixedBase64(27, "=");
var sha1_base64url = /* @__PURE__ */ fixedBase64url(27);
var sha256_hex = /^[0-9a-fA-F]{64}$/;
var sha256_base64 = /* @__PURE__ */ fixedBase64(43, "=");
var sha256_base64url = /* @__PURE__ */ fixedBase64url(43);
var sha384_hex = /^[0-9a-fA-F]{96}$/;
var sha384_base64 = /* @__PURE__ */ fixedBase64(64, "");
var sha384_base64url = /* @__PURE__ */ fixedBase64url(64);
var sha512_hex = /^[0-9a-fA-F]{128}$/;
var sha512_base64 = /* @__PURE__ */ fixedBase64(86, "==");
var sha512_base64url = /* @__PURE__ */ fixedBase64url(86);

// node_modules/zod/v4/core/checks.js
var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
  var _a2;
  inst._zod ?? (inst._zod = {});
  inst._zod.def = def;
  (_a2 = inst._zod).onattach ?? (_a2.onattach = []);
});
var _whenHasSize = (payload) => {
  const val = payload.value;
  return !nullish(val) && val.size !== undefined;
};
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
var $ZodCheckBigIntFormat = /* @__PURE__ */ $constructor("$ZodCheckBigIntFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  const [minimum, maximum] = BIGINT_FORMAT_RANGES[def.format];
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (input < minimum) {
      payload.issues.push({
        origin: "bigint",
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
        origin: "bigint",
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
var $ZodCheckMaxSize = /* @__PURE__ */ $constructor("$ZodCheckMaxSize", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = _whenHasSize);
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size <= def.maximum)
      return;
    payload.issues.push({
      origin: getSizableOrigin(input),
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMinSize = /* @__PURE__ */ $constructor("$ZodCheckMinSize", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = _whenHasSize);
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size >= def.minimum)
      return;
    payload.issues.push({
      origin: getSizableOrigin(input),
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckSizeEquals = /* @__PURE__ */ $constructor("$ZodCheckSizeEquals", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = _whenHasSize);
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size === def.size)
      return;
    const tooBig = size > def.size;
    payload.issues.push({
      origin: getSizableOrigin(input),
      ...tooBig ? { code: "too_big", maximum: def.size } : { code: "too_small", minimum: def.size },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = _whenHasLength);
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
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = _whenHasLength);
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
  var _a2;
  $ZodCheck.init(inst, def);
  (_a2 = inst._zod.def).when ?? (_a2.when = _whenHasLength);
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
  var _a2, _b;
  $ZodCheck.init(inst, def);
  if (def.pattern)
    (_a2 = inst._zod).check ?? (_a2.check = (payload) => {
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
function handleCheckPropertyResult(result, payload, property) {
  if (result.issues.length) {
    payload.issues.push(...prefixIssues(property, result.issues));
  }
}
var $ZodCheckProperty = /* @__PURE__ */ $constructor("$ZodCheckProperty", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    const result = def.schema._zod.run({
      value: payload.value[def.property],
      issues: []
    }, {});
    if (result instanceof Promise) {
      return result.then((result2) => handleCheckPropertyResult(result2, payload, def.property));
    }
    handleCheckPropertyResult(result, payload, def.property);
    return;
  };
});
var $ZodCheckProperties = /* @__PURE__ */ $constructor("$ZodCheckProperties", (inst, def) => {
  $ZodCheck.init(inst, def);
  hide(inst, Symbol.iterator, function* () {
    yield inst;
  });
  let entries;
  inst._zod.check = (payload) => {
    if (payload.value == null) {
      payload.issues.push({ expected: "object", code: "invalid_type", input: payload.value, inst });
      return;
    }
    entries ?? (entries = Reflect.ownKeys(def.shape).map((key) => [key, def.shape[key]]));
    const input = payload.value;
    let proms;
    for (const [key, schema] of entries) {
      const result = schema._zod.run({ value: input[key], issues: [] }, {});
      if (result instanceof Promise) {
        proms ?? (proms = []);
        proms.push(result.then((result2) => handleCheckPropertyResult(result2, payload, key)));
      } else {
        handleCheckPropertyResult(result, payload, key);
      }
    }
    if (proms)
      return Promise.all(proms).then(() => {
        return;
      });
    return;
  };
});
var $ZodCheckMimeType = /* @__PURE__ */ $constructor("$ZodCheckMimeType", (inst, def) => {
  $ZodCheck.init(inst, def);
  const mimeSet = new Set(def.mime);
  inst._zod.check = (payload) => {
    if (mimeSet.has(payload.value.type))
      return;
    payload.issues.push({
      code: "invalid_value",
      values: def.mime,
      input: payload.value.type,
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
  var _a2;
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
    (_a2 = inst._zod).deferred ?? (_a2.deferred = []);
    inst._zod.deferred?.push(() => {
      inst._zod.run = inst._zod.parse;
    });
  } else {
    const runChecks = (payload, checks2, ctx) => {
      if (payload.memo)
        return payload;
      let isAborted = aborted(payload);
      let asyncResult;
      for (const ch of checks2) {
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
        return checkResult.then((checkResult2) => inst._zod.parse(checkResult2, ctx));
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
          return canary.then((canary2) => {
            return handleCanaryResult(canary2, payload, ctx);
          });
        }
        return handleCanaryResult(canary, payload, ctx);
      }
      const result = inst._zod.parse(payload, ctx);
      if (result instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError;
        return result.then((result2) => runChecks(result2, checks, ctx));
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
      } catch (_2) {}
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
function urlHostnameOk(url, hostname2) {
  hostname2.lastIndex = 0;
  return hostname2.test(url.hostname);
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
var $ZodMAC = /* @__PURE__ */ $constructor("$ZodMAC", (inst, def) => {
  def.pattern ?? (def.pattern = mac(def.delimiter));
  $ZodStringFormat.init(inst, def);
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
  const base642 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
  const padded = base642.padEnd(Math.ceil(base642.length / 4) * 4, "=");
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
var CC_SANITIZE = /[- ]/g;
function isLuhnAlgo(digits) {
  let length = digits.length;
  let bit = 1;
  let sum = 0;
  while (length) {
    const value = digits.charCodeAt(--length) - 48;
    bit ^= 1;
    sum += bit ? [0, 2, 4, 6, 8, 1, 3, 5, 7, 9][value] : value;
  }
  return sum % 10 === 0;
}
function isValidCreditCard(input) {
  if (!creditCard.test(input))
    return false;
  return isLuhnAlgo(input.replace(CC_SANITIZE, ""));
}
var $ZodCreditCard = /* @__PURE__ */ $constructor("$ZodCreditCard", (inst, def) => {
  def.pattern ?? (def.pattern = creditCard);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidCreditCard(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "credit_card",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function isIso7064Mod97(iban2) {
  let remainder = 0;
  const len = iban2.length;
  for (let i = 4;i < len; i++) {
    const code = iban2.charCodeAt(i);
    remainder = (code >= 65 ? remainder * 100 + (code - 55) : remainder * 10 + (code - 48)) % 97;
  }
  for (let i = 0;i < 4; i++) {
    const code = iban2.charCodeAt(i);
    remainder = (code >= 65 ? remainder * 100 + (code - 55) : remainder * 10 + (code - 48)) % 97;
  }
  return remainder === 1;
}
function isValidIBAN(input) {
  if (!iban.test(input))
    return false;
  return isIso7064Mod97(input);
}
var $ZodIBAN = /* @__PURE__ */ $constructor("$ZodIBAN", (inst, def) => {
  def.pattern ?? (def.pattern = iban);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidIBAN(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "iban",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
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
var $ZodCustomStringFormat = /* @__PURE__ */ $constructor("$ZodCustomStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (def.fn(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: def.format,
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
var $ZodBigIntFormat = /* @__PURE__ */ $constructor("$ZodBigIntFormat", (inst, def) => {
  $ZodCheckBigIntFormat.init(inst, def);
  $ZodBigInt.init(inst, def);
});
var $ZodSymbol = /* @__PURE__ */ $constructor("$ZodSymbol", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "symbol")
      return payload;
    payload.issues.push({
      expected: "symbol",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodUndefined = /* @__PURE__ */ $constructor("$ZodUndefined", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _undefined;
  inst._zod.values = new Set([undefined]);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "undefined")
      return payload;
    payload.issues.push({
      expected: "undefined",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodNull = /* @__PURE__ */ $constructor("$ZodNull", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _null;
  inst._zod.values = new Set([null]);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input === null)
      return payload;
    payload.issues.push({
      expected: "null",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
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
var $ZodVoid = /* @__PURE__ */ $constructor("$ZodVoid", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "undefined")
      return payload;
    payload.issues.push({
      expected: "void",
      code: "invalid_type",
      input,
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
  const parse2 = inst._zod.parse;
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
    return parse2(payload, ctx);
  };
}
var arraySize = (input) => Array.isArray(input) ? input.length : -1;
var mapSize = (input) => input instanceof Map ? input.size : -1;
var setSize = (input) => input instanceof Set ? input.size : -1;
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
        proms.push(result.then((result2) => handleArrayResult(result2, payload, i)));
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
      proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, optin, optout)));
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
        proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, optin, optout)));
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
    return Promise.all(results).then((results2) => {
      return handleUnionResults(results2, payload, inst, ctx);
    });
  };
});
function handleExclusiveUnionResults(results, final, inst, ctx) {
  const matches = [];
  for (let i = 0;i < results.length; i++) {
    if (results[i].issues.length === 0)
      matches.push(i);
  }
  if (matches.length === 1) {
    final.value = results[matches[0]].value;
    return final;
  }
  if (matches.length === 0) {
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
    });
  } else {
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: [],
      inclusive: false,
      matches
    });
  }
  return final;
}
var $ZodXor = /* @__PURE__ */ $constructor("$ZodXor", (inst, def) => {
  $ZodUnion.init(inst, def);
  def.inclusive = false;
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
        results.push(result);
      }
    }
    if (!async)
      return handleExclusiveUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results2) => {
      return handleExclusiveUnionResults(results2, payload, inst, ctx);
    });
  };
});
function getDiscriminatedOption(union, value) {
  const internals = union._zod;
  let map = internals.bag.optionsMap;
  if (!map) {
    map = discriminatorMap(internals.def);
    internals.bag.optionsMap = map;
  }
  const option = map.get(value);
  if (option === null)
    throw new Error(`Ambiguous discriminator value "${String(value)}"`);
  return option;
}
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
      options: Array.from(disc.value.keys()).filter((value2) => disc.value.get(value2) !== null),
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
      return Promise.all([left, right]).then(([left2, right2]) => {
        return handleIntersectionResults(payload, left2, right2);
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
            proms.push(result.then((result2) => {
              if (result2.issues.length) {
                payload.issues.push(...prefixIssues(key, result2.issues));
              }
              payload.value[outKey] = result2.value;
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
          proms.push(result.then((result2) => {
            if (result2.issues.length) {
              payload.issues.push(...prefixIssues(key, result2.issues));
            }
            payload.value[outKey] = result2.value;
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
var $ZodMap = /* @__PURE__ */ $constructor("$ZodMap", (inst, def) => {
  $ZodType.init(inst, def);
  const memo = globalConfig.memoizer;
  memo?.attach(inst);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!(input instanceof Map)) {
      payload.issues.push({
        expected: "map",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    payload.value = memo ? memo.alloc(inst, payload, new Map, ctx) : new Map;
    const abortEarly = ctx?.abortEarly;
    let seen = payload.issues.length;
    for (const [key, value] of input) {
      if (abortEarly && payload.issues.length !== seen) {
        if (aborted(payload, seen))
          break;
        seen = payload.issues.length;
      }
      const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
      const valueResult = def.valueType._zod.run({ value, issues: [] }, ctx);
      if (keyResult instanceof Promise || valueResult instanceof Promise) {
        proms.push(Promise.all([keyResult, valueResult]).then(([keyResult2, valueResult2]) => {
          handleMapResult(keyResult2, valueResult2, payload, key, input, inst, ctx);
        }));
      } else {
        handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
      }
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
  capSize(inst, mapSize);
});
function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
  if (keyResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, keyResult.issues));
    } else {
      final.issues.push({
        code: "invalid_key",
        origin: "map",
        input,
        inst,
        issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
      });
    }
  }
  if (valueResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, valueResult.issues));
    } else {
      final.issues.push({
        origin: "map",
        code: "invalid_element",
        input,
        inst,
        key,
        issues: valueResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
      });
    }
  }
  final.value.set(keyResult.value, valueResult.value);
}
var $ZodSet = /* @__PURE__ */ $constructor("$ZodSet", (inst, def) => {
  $ZodType.init(inst, def);
  const memo = globalConfig.memoizer;
  memo?.attach(inst);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!(input instanceof Set)) {
      payload.issues.push({
        input,
        inst,
        expected: "set",
        code: "invalid_type"
      });
      return payload;
    }
    const proms = [];
    payload.value = memo ? memo.alloc(inst, payload, new Set, ctx) : new Set;
    const abortEarly = ctx?.abortEarly;
    let seen = payload.issues.length;
    for (const item of input) {
      if (abortEarly && payload.issues.length !== seen) {
        if (aborted(payload, seen))
          break;
        seen = payload.issues.length;
      }
      const result = def.valueType._zod.run({ value: item, issues: [] }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleSetResult(result2, payload)));
      } else
        handleSetResult(result, payload);
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
  capSize(inst, setSize);
});
function handleSetResult(result, final) {
  if (result.issues.length) {
    final.issues.push(...result.issues);
  }
  final.value.add(result.value);
}
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
var $ZodFile = /* @__PURE__ */ $constructor("$ZodFile", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input instanceof File)
      return payload;
    payload.issues.push({
      expected: "file",
      code: "invalid_type",
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
      return output.then((output2) => {
        payload.value = output2;
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
        return result.then((result2) => handleOptionalResult(payload, result2));
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
      return result.then((result2) => handleDefaultResult(result2, def));
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
      return result.then((result2) => handleNonOptionalResult(result2, inst));
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
var $ZodSuccess = /* @__PURE__ */ $constructor("$ZodSuccess", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError("ZodSuccess");
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => {
        payload.value = result2.issues.length === 0;
        return payload;
      });
    }
    payload.value = result.issues.length === 0;
    return payload;
  };
});
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
      return result.then((result2) => handleCatchResult(payload, result2, def, ctx));
    }
    return handleCatchResult(payload, result, def, ctx);
  };
});
var $ZodNaN = /* @__PURE__ */ $constructor("$ZodNaN", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
      payload.issues.push({
        input: payload.value,
        inst,
        expected: "nan",
        code: "invalid_type"
      });
      return payload;
    }
    return payload;
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
        return right.then((right2) => handlePipeResult(right2, def.in, ctx));
      }
      return handlePipeResult(right, def.in, ctx);
    }
    const left = def.in._zod.run(payload, ctx);
    if (left instanceof Promise) {
      return left.then((left2) => handlePipeResult(left2, def.out, ctx));
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
var $ZodCodec = /* @__PURE__ */ $constructor("$ZodCodec", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazyInternal(inst, "values", (zod) => zod.def.in._zod.values);
  defineLazyInternal(inst, "optin", (zod) => zod.def.in._zod.optin);
  defineLazyInternal(inst, "optout", (zod) => zod.def.out._zod.optout);
  defineLazyInternal(inst, "propValues", (zod) => zod.def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    const direction = ctx.direction || "forward";
    if (direction === "forward") {
      const left = def.in._zod.run(payload, ctx);
      if (left instanceof Promise) {
        return left.then((left2) => handleCodecAResult(left2, def, ctx));
      }
      return handleCodecAResult(left, def, ctx);
    } else {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right2) => handleCodecAResult(right2, def, ctx));
      }
      return handleCodecAResult(right, def, ctx);
    }
  };
});
function handleCodecAResult(result, def, ctx) {
  if (result.issues.length) {
    result.aborted = true;
    return result;
  }
  const direction = ctx.direction || "forward";
  if (direction === "forward") {
    const transformed = def.transform(result.value, result);
    if (transformed instanceof Promise) {
      return transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx));
    }
    return handleCodecTxResult(result, transformed, def.out, ctx);
  } else {
    const transformed = def.reverseTransform(result.value, result);
    if (transformed instanceof Promise) {
      return transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx));
    }
    return handleCodecTxResult(result, transformed, def.in, ctx);
  }
}
function handleCodecTxResult(left, value, nextSchema, ctx) {
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return nextSchema._zod.run({ value, issues: left.issues }, ctx);
}
var $ZodPreprocess = /* @__PURE__ */ $constructor("$ZodPreprocess", (inst, def) => {
  $ZodPipe.init(inst, def);
});
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
function leafPattern(schema) {
  const def = schema._zod.def;
  let pattern = def.pattern;
  let isInt = !!def.format?.includes("int");
  let minimum;
  let maximum;
  for (const ch of def.checks ?? []) {
    const d = ch._zod.def;
    if (d.pattern)
      pattern = d.pattern;
    isInt || (isInt = !!d.format?.includes("int"));
    const lo = d.minimum ?? d.length;
    const hi = d.maximum ?? d.length;
    if (lo !== undefined && (minimum === undefined || lo > minimum))
      minimum = lo;
    if (hi !== undefined && (maximum === undefined || hi < maximum))
      maximum = hi;
  }
  if (pattern)
    return pattern.source;
  if (minimum !== undefined && maximum !== undefined && minimum > maximum)
    return "(?!)";
  if (minimum !== undefined || maximum !== undefined)
    return string({ minimum, maximum }).source;
  const own2 = schema._zod.pattern;
  return (isInt && own2 === number ? integer : own2)?.source;
}
function partPattern(schema) {
  const def = schema._zod.def;
  const own2 = schema._zod.pattern?.source;
  const inner = def.innerType ?? schema._zod.innerType;
  if (inner) {
    const before = inner._zod.pattern?.source;
    const after = partPattern(inner);
    if (own2 && before && after && after !== before) {
      return own2.replace(cleanRegex(before), () => cleanRegex(after));
    }
    return own2;
  }
  if (def.options) {
    const sources = def.options.map(partPattern);
    if (sources.every(Boolean))
      return `^(${sources.map((s) => cleanRegex(s)).join("|")})$`;
  }
  return leafPattern(schema);
}
var $ZodTemplateLiteral = /* @__PURE__ */ $constructor("$ZodTemplateLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  const regexParts = [];
  for (const part of def.parts) {
    if (typeof part === "object" && part !== null) {
      const source = partPattern(part);
      if (!source) {
        throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
      }
      regexParts.push(cleanRegex(source));
    } else if (part === null || primitiveTypes.has(typeof part)) {
      regexParts.push(escapeRegex(`${part}`));
    } else {
      throw new Error(`Invalid template literal part: ${part}`);
    }
  }
  inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "string") {
      payload.issues.push({
        input: payload.value,
        inst,
        expected: "string",
        code: "invalid_type"
      });
      return payload;
    }
    inst._zod.pattern.lastIndex = 0;
    if (!inst._zod.pattern.test(payload.value)) {
      payload.issues.push({
        input: payload.value,
        inst,
        code: "invalid_format",
        format: def.format ?? "template_literal",
        pattern: inst._zod.pattern.source
      });
      return payload;
    }
    return payload;
  };
});
var $ZodFunction = /* @__PURE__ */ $constructor("$ZodFunction", (inst, def) => {
  $ZodType.init(inst, def);
  Object.defineProperty(inst, "_def", { value: def });
  inst._zod.def = def;
  inst.implement = (func) => {
    if (typeof func !== "function") {
      throw new Error("implement() must be called with a function");
    }
    return Object.defineProperty(function(...args) {
      const parsedArgs = inst._def.input ? parse(inst._def.input, args) : args;
      const result = Reflect.apply(func, this, parsedArgs);
      if (inst._def.output) {
        return parse(inst._def.output, result);
      }
      return result;
    }, "_zod", { value: inst._zod, enumerable: false });
  };
  inst.implementAsync = (func) => {
    if (typeof func !== "function") {
      throw new Error("implementAsync() must be called with a function");
    }
    return Object.defineProperty(async function(...args) {
      const parsedArgs = inst._def.input ? await parseAsync(inst._def.input, args) : args;
      const result = await Reflect.apply(func, this, parsedArgs);
      if (inst._def.output) {
        return await parseAsync(inst._def.output, result);
      }
      return result;
    }, "_zod", { value: inst._zod, enumerable: false });
  };
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "function") {
      payload.issues.push({
        code: "invalid_type",
        expected: "function",
        input: payload.value,
        inst
      });
      return payload;
    }
    const hasPromiseOutput = inst._def.output && inst._def.output._zod.def.type === "promise";
    if (hasPromiseOutput) {
      payload.value = inst.implementAsync(payload.value);
    } else {
      payload.value = inst.implement(payload.value);
    }
    return payload;
  };
  inst.input = (...args) => {
    const F = inst.constructor;
    if (Array.isArray(args[0])) {
      return new F({
        type: "function",
        input: new $ZodTuple({
          type: "tuple",
          items: args[0],
          rest: args[1]
        }),
        output: inst._def.output
      });
    }
    return new F({
      type: "function",
      input: args[0],
      output: inst._def.output
    });
  };
  inst.output = (output) => {
    const F = inst.constructor;
    return new F({
      type: "function",
      input: inst._def.input,
      output
    });
  };
  return inst;
});
var $ZodPromise = /* @__PURE__ */ $constructor("$ZodPromise", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({ value: inner, issues: [] }, ctx));
  };
});
var $ZodLazy = /* @__PURE__ */ $constructor("$ZodLazy", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "innerType", () => {
    const d = def;
    if (!d._cachedInner)
      d._cachedInner = def.getter();
    return d._cachedInner;
  });
  defineLazyInternal(inst, "pattern", (zod) => zod.innerType?._zod?.pattern);
  defineLazyInternal(inst, "propValues", (zod) => zod.innerType?._zod?.propValues);
  defineLazyInternal(inst, "optin", (zod) => zod.innerType?._zod?.optin ?? undefined);
  defineLazyInternal(inst, "optout", (zod) => zod.innerType?._zod?.optout ?? undefined);
  inst._zod.parse = (payload, ctx) => {
    const inner = inst._zod.innerType;
    return inner._zod.run(payload, ctx);
  };
});
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
      return r.then((r2) => handleRefineResult(r2, payload, input, inst));
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
  const cached2 = recursive.get(inst);
  if (cached2 !== undefined)
    return cached2 ? PROVEN : NONE;
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
  const merge2 = (answer) => {
    if (answer > result)
      result = answer;
  };
  const def = inst._zod.def;
  const kind = def.type;
  switch (kind) {
    case "object": {
      const raw = rawShape(def);
      merge2(raw ? shape(raw, true) : ASSUMED);
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
      merge2(inner ? isRecursive(inner, stack, false) : ASSUMED);
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
function isRecursiveSchema(inst) {
  return isRecursive(inst, new Set, true) !== NONE;
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
    var _a2;
    (_a2 = inst._zod).deferred ?? (_a2.deferred = []);
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
    var _a2;
    let isRecursiveInst;
    let rechecked = false;
    let lastCtx;
    let lastBucket;
    (_a2 = inst._zod).deferred ?? (_a2.deferred = []);
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
// node_modules/zod/v4/locales/index.js
var exports_locales = {};
__export(exports_locales, {
  zhTW: () => zh_TW_default,
  zhCN: () => zh_CN_default,
  yo: () => yo_default,
  vi: () => vi_default,
  uz: () => uz_default,
  ur: () => ur_default,
  uk: () => uk_default,
  ua: () => ua_default,
  tr: () => tr_default,
  tk: () => tk_default,
  th: () => th_default,
  tg: () => tg_default,
  ta: () => ta_default,
  sv: () => sv_default,
  sl: () => sl_default,
  sk: () => sk_default,
  ru: () => ru_default,
  ro: () => ro_default,
  ptBR: () => pt_BR_default,
  pt: () => pt_default,
  ps: () => ps_default,
  pl: () => pl_default,
  ota: () => ota_default,
  no: () => no_default,
  nn: () => nn_default,
  nl: () => nl_default,
  ne: () => ne_default,
  ms: () => ms_default,
  mk: () => mk_default,
  lt: () => lt_default,
  ko: () => ko_default,
  kn: () => kn_default,
  km: () => km_default,
  kh: () => kh_default,
  ka: () => ka_default,
  ja: () => ja_default,
  it: () => it_default,
  is: () => is_default,
  id: () => id_default,
  hy: () => hy_default,
  hu: () => hu_default,
  hr: () => hr_default,
  hi: () => hi_default,
  he: () => he_default,
  gu: () => gu_default,
  frCA: () => fr_CA_default,
  fr: () => fr_default,
  fi: () => fi_default,
  fa: () => fa_default,
  es: () => es_default,
  eo: () => eo_default,
  en: () => en_default,
  el: () => el_default,
  de: () => de_default,
  da: () => da_default,
  cs: () => cs_default,
  ckb: () => ckb_default,
  ca: () => ca_default,
  bn: () => bn_default,
  bg: () => bg_default,
  be: () => be_default,
  az: () => az_default,
  ar: () => ar_default
});

// node_modules/zod/v4/locales/ar.js
var error = () => {
  const Sizable = {
    string: { unit: "حرف", verb: "أن يحوي" },
    file: { unit: "بايت", verb: "أن يحوي" },
    array: { unit: "عنصر", verb: "أن يحوي" },
    set: { unit: "عنصر", verb: "أن يحوي" },
    map: { unit: "عنصر", verb: "أن يحوي" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "مدخل",
    email: "بريد إلكتروني",
    url: "رابط",
    emoji: "إيموجي",
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
    datetime: "تاريخ ووقت بمعيار ISO",
    date: "تاريخ بمعيار ISO",
    time: "وقت بمعيار ISO",
    duration: "مدة بمعيار ISO",
    ipv4: "عنوان IPv4",
    ipv6: "عنوان IPv6",
    mac: "عنوان MAC",
    cidrv4: "مدى عناوين بصيغة IPv4",
    cidrv6: "مدى عناوين بصيغة IPv6",
    base64: "نَص بترميز base64-encoded",
    base64url: "نَص بترميز base64url-encoded",
    json_string: "نَص على هيئة JSON",
    e164: "رقم هاتف بمعيار E.164",
    credit_card: "رقم بطاقة الائتمان",
    currency_code: "رمز العملة",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "مدخل"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `مدخلات غير مقبولة: يفترض إدخال instanceof ${issue2.expected}، ولكن تم إدخال ${received}`;
        }
        return `مدخلات غير مقبولة: يفترض إدخال ${expected}، ولكن تم إدخال ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `مدخلات غير مقبولة: يفترض إدخال ${stringifyPrimitive(issue2.values[0])}`;
        return `اختيار غير مقبول: يتوقع انتقاء أحد هذه الخيارات: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return ` أكبر من اللازم: يفترض أن تكون ${issue2.origin ?? "القيمة"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "عنصر"}`;
        return `أكبر من اللازم: يفترض أن تكون ${issue2.origin ?? "القيمة"} ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `أصغر من اللازم: يفترض لـ ${issue2.origin} أن يكون ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `أصغر من اللازم: يفترض لـ ${issue2.origin} أن يكون ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `نَص غير مقبول: يجب أن يبدأ بـ "${issue2.prefix}"`;
        if (_issue.format === "ends_with")
          return `نَص غير مقبول: يجب أن ينتهي بـ "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `نَص غير مقبول: يجب أن يتضمَّن "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `نَص غير مقبول: يجب أن يطابق النمط ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} غير مقبول`;
      }
      case "not_multiple_of":
        return `رقم غير مقبول: يجب أن يكون من مضاعفات ${issue2.divisor}`;
      case "unrecognized_keys":
        return `معرف${issue2.keys.length > 1 ? "ات" : ""} غريب${issue2.keys.length > 1 ? "ة" : ""}: ${joinValues(issue2.keys, "، ")}`;
      case "invalid_key":
        return `معرف غير مقبول في ${issue2.origin}`;
      case "invalid_union":
        return "مدخل غير مقبول";
      case "invalid_element":
        return `مدخل غير مقبول في ${issue2.origin}`;
      default:
        return "مدخل غير مقبول";
    }
  };
};
function ar_default() {
  return {
    localeError: error()
  };
}
// node_modules/zod/v4/locales/az.js
var error2 = () => {
  const Sizable = {
    string: { unit: "simvol", verb: "olmalıdır" },
    file: { unit: "bayt", verb: "olmalıdır" },
    array: { unit: "element", verb: "olmalıdır" },
    set: { unit: "element", verb: "olmalıdır" },
    map: { unit: "element", verb: "olmalıdır" }
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
    credit_card: "kredit kartı nömrəsi",
    currency_code: "valyuta kodu",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Yanlış dəyər: gözlənilən instanceof ${issue2.expected}, daxil olan ${received}`;
        }
        return `Yanlış dəyər: gözlənilən ${expected}, daxil olan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Yanlış dəyər: gözlənilən ${stringifyPrimitive(issue2.values[0])}`;
        return `Yanlış seçim: aşağıdakılardan biri olmalıdır: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Çox böyük: gözlənilən ${issue2.origin ?? "dəyər"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
        return `Çox böyük: gözlənilən ${issue2.origin ?? "dəyər"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Çox kiçik: gözlənilən ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        return `Çox kiçik: gözlənilən ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Yanlış mətn: "${_issue.prefix}" ilə başlamalıdır`;
        if (_issue.format === "ends_with")
          return `Yanlış mətn: "${_issue.suffix}" ilə bitməlidir`;
        if (_issue.format === "includes")
          return `Yanlış mətn: "${_issue.includes}" daxil olmalıdır`;
        if (_issue.format === "regex")
          return `Yanlış mətn: ${_issue.pattern} şablonuna uyğun olmalıdır`;
        return `Yanlış ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Yanlış ədəd: ${issue2.divisor} ilə bölünə bilən olmalıdır`;
      case "unrecognized_keys":
        return `Tanınmayan açar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} daxilində yanlış açar`;
      case "invalid_union":
        return "Yanlış dəyər";
      case "invalid_element":
        return `${issue2.origin} daxilində yanlış dəyər`;
      default:
        return `Yanlış dəyər`;
    }
  };
};
function az_default() {
  return {
    localeError: error2()
  };
}
// node_modules/zod/v4/locales/be.js
function getBelarusianPlural(count, one, few, many) {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
var error3 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "сімвал",
        few: "сімвалы",
        many: "сімвалаў"
      },
      verb: "мець"
    },
    array: {
      unit: {
        one: "элемент",
        few: "элементы",
        many: "элементаў"
      },
      verb: "мець"
    },
    set: {
      unit: {
        one: "элемент",
        few: "элементы",
        many: "элементаў"
      },
      verb: "мець"
    },
    map: {
      unit: {
        one: "элемент",
        few: "элементы",
        many: "элементаў"
      },
      verb: "мець"
    },
    file: {
      unit: {
        one: "байт",
        few: "байты",
        many: "байтаў"
      },
      verb: "мець"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "увод",
    email: "email адрас",
    url: "URL",
    emoji: "эмодзі",
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
    datetime: "ISO дата і час",
    date: "ISO дата",
    time: "ISO час",
    duration: "ISO працягласць",
    ipv4: "IPv4 адрас",
    ipv6: "IPv6 адрас",
    mac: "MAC адрас",
    cidrv4: "IPv4 дыяпазон",
    cidrv6: "IPv6 дыяпазон",
    base64: "радок у фармаце base64",
    base64url: "радок у фармаце base64url",
    json_string: "JSON радок",
    e164: "нумар E.164",
    credit_card: "нумар крэдытнай карты",
    currency_code: "код валюты",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "увод"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "лік",
    array: "масіў"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Няправільны ўвод: чакаўся instanceof ${issue2.expected}, атрымана ${received}`;
        }
        return `Няправільны ўвод: чакаўся ${expected}, атрымана ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Няправільны ўвод: чакалася ${stringifyPrimitive(issue2.values[0])}`;
        return `Няправільны варыянт: чакаўся адзін з ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getBelarusianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Занадта вялікі: чакалася, што ${issue2.origin ?? "значэнне"} павінна ${sizing.verb} ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `Занадта вялікі: чакалася, што ${issue2.origin ?? "значэнне"} павінна быць ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getBelarusianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Занадта малы: чакалася, што ${issue2.origin} павінна ${sizing.verb} ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `Занадта малы: чакалася, што ${issue2.origin} павінна быць ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Няправільны радок: павінен пачынацца з "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Няправільны радок: павінен заканчвацца на "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Няправільны радок: павінен змяшчаць "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Няправільны радок: павінен адпавядаць шаблону ${_issue.pattern}`;
        return `Няправільны ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Няправільны лік: павінен быць кратным ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Нераспазнаны ${issue2.keys.length > 1 ? "ключы" : "ключ"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Няправільны ключ у ${issue2.origin}`;
      case "invalid_union":
        return "Няправільны ўвод";
      case "invalid_element":
        return `Няправільнае значэнне ў ${issue2.origin}`;
      default:
        return `Няправільны ўвод`;
    }
  };
};
function be_default() {
  return {
    localeError: error3()
  };
}
// node_modules/zod/v4/locales/bg.js
var error4 = () => {
  const Sizable = {
    string: { unit: "символа", verb: "да съдържа" },
    file: { unit: "байта", verb: "да съдържа" },
    array: { unit: "елемента", verb: "да съдържа" },
    set: { unit: "елемента", verb: "да съдържа" },
    map: { unit: "елемента", verb: "да съдържа" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "вход",
    email: "имейл адрес",
    url: "URL",
    emoji: "емоджи",
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
    datetime: "ISO време",
    date: "ISO дата",
    time: "ISO време",
    duration: "ISO продължителност",
    ipv4: "IPv4 адрес",
    ipv6: "IPv6 адрес",
    mac: "MAC адрес",
    cidrv4: "IPv4 диапазон",
    cidrv6: "IPv6 диапазон",
    base64: "base64-кодиран низ",
    base64url: "base64url-кодиран низ",
    json_string: "JSON низ",
    e164: "E.164 номер",
    credit_card: "номер на кредитна карта",
    currency_code: "код на валута",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "вход"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "число",
    array: "масив"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Невалиден вход: очакван instanceof ${issue2.expected}, получен ${received}`;
        }
        return `Невалиден вход: очакван ${expected}, получен ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Невалиден вход: очакван ${stringifyPrimitive(issue2.values[0])}`;
        return `Невалидна опция: очаквано едно от ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Твърде голямо: очаква се ${issue2.origin ?? "стойност"} да съдържа ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "елемента"}`;
        return `Твърде голямо: очаква се ${issue2.origin ?? "стойност"} да бъде ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Твърде малко: очаква се ${issue2.origin} да съдържа ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Твърде малко: очаква се ${issue2.origin} да бъде ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Невалиден низ: трябва да започва с "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Невалиден низ: трябва да завършва с "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Невалиден низ: трябва да включва "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Невалиден низ: трябва да съвпада с ${_issue.pattern}`;
        let invalid_adj = "Невалиден";
        if (_issue.format === "emoji")
          invalid_adj = "Невалидно";
        if (_issue.format === "datetime")
          invalid_adj = "Невалидно";
        if (_issue.format === "date")
          invalid_adj = "Невалидна";
        if (_issue.format === "time")
          invalid_adj = "Невалидно";
        if (_issue.format === "duration")
          invalid_adj = "Невалидна";
        return `${invalid_adj} ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Невалидно число: трябва да бъде кратно на ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Неразпознат${issue2.keys.length > 1 ? "и" : ""} ключ${issue2.keys.length > 1 ? "ове" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Невалиден ключ в ${issue2.origin}`;
      case "invalid_union":
        return "Невалиден вход";
      case "invalid_element":
        return `Невалидна стойност в ${issue2.origin}`;
      default:
        return `Невалиден вход`;
    }
  };
};
function bg_default() {
  return {
    localeError: error4()
  };
}
// node_modules/zod/v4/locales/bn.js
var error5 = () => {
  const Sizable = {
    string: { unit: "অক্ষর", verb: "থাকতে হবে" },
    file: { unit: "বাইট", verb: "থাকতে হবে" },
    array: { unit: "আইটেম", verb: "থাকতে হবে" },
    set: { unit: "আইটেম", verb: "থাকতে হবে" },
    map: { unit: "এন্ট্রি", verb: "থাকতে হবে" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ইনপুট",
    email: "ইমেইল ঠিকানা",
    url: "URL",
    emoji: "ইমোজি",
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
    datetime: "ISO তারিখ ও সময়",
    date: "ISO তারিখ",
    time: "ISO সময়",
    duration: "ISO সময়কাল",
    ipv4: "IPv4 ঠিকানা",
    ipv6: "IPv6 ঠিকানা",
    mac: "MAC ঠিকানা",
    cidrv4: "IPv4 রেঞ্জ",
    cidrv6: "IPv6 রেঞ্জ",
    base64: "base64-এনকোডেড স্ট্রিং",
    base64url: "base64url-এনকোডেড স্ট্রিং",
    json_string: "JSON স্ট্রিং",
    e164: "E.164 নম্বর",
    credit_card: "ক্রেডিট কার্ড নম্বর",
    currency_code: "মুদ্রা কোড",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "ইনপুট"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `অবৈধ ইনপুট: প্রত্যাশিত ${expected}, প্রাপ্ত ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `অবৈধ ইনপুট: প্রত্যাশিত ${stringifyPrimitive(issue2.values[0])}`;
        return `অবৈধ অপশন: ${joinValues(issue2.values, " | ")} এর মধ্যে একটি প্রত্যাশিত`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `অনেক বড়: ${issue2.origin ?? "মান"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "এলিমেন্ট"} হতে হবে`;
        return `অনেক বড়: ${issue2.origin ?? "মান"} ${adj}${issue2.maximum.toString()} হতে হবে`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `অনেক ছোট: ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} হতে হবে`;
        }
        return `অনেক ছোট: ${issue2.origin} ${adj}${issue2.minimum.toString()} হতে হবে`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `অবৈধ স্ট্রিং: "${_issue.prefix}" দিয়ে শুরু হতে হবে`;
        }
        if (_issue.format === "ends_with")
          return `অবৈধ স্ট্রিং: "${_issue.suffix}" দিয়ে শেষ হতে হবে`;
        if (_issue.format === "includes")
          return `অবৈধ স্ট্রিং: "${_issue.includes}" অন্তর্ভুক্ত থাকতে হবে`;
        if (_issue.format === "regex")
          return `অবৈধ স্ট্রিং: ${_issue.pattern} প্যাটার্ন মিলতে হবে`;
        return `অবৈধ ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `অবৈধ নম্বর: ${issue2.divisor} এর গুণিতক হতে হবে`;
      case "unrecognized_keys":
        return `অচেনা কী${issue2.keys.length > 1 ? "গুলো" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} এ অবৈধ কী`;
      case "invalid_union":
        if (issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0) {
          const opts = issue2.options.map((o) => `'${o}'`).join(" | ");
          return `অবৈধ ডিসক্রিমিনেটর মান। প্রত্যাশিত ${opts}`;
        }
        return "অবৈধ ইনপুট";
      case "invalid_element":
        return `${issue2.origin} এ অবৈধ মান`;
      default:
        return "অবৈধ ইনপুট";
    }
  };
};
function bn_default() {
  return {
    localeError: error5()
  };
}
// node_modules/zod/v4/locales/ca.js
var error6 = () => {
  const Sizable = {
    string: { unit: "caràcters", verb: "contenir" },
    file: { unit: "bytes", verb: "contenir" },
    array: { unit: "elements", verb: "contenir" },
    set: { unit: "elements", verb: "contenir" },
    map: { unit: "elements", verb: "contenir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrada",
    email: "adreça electrònica",
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
    datetime: "data i hora ISO",
    date: "data ISO",
    time: "hora ISO",
    duration: "durada ISO",
    ipv4: "adreça IPv4",
    ipv6: "adreça IPv6",
    mac: "adreça MAC",
    cidrv4: "rang IPv4",
    cidrv6: "rang IPv6",
    base64: "cadena codificada en base64",
    base64url: "cadena codificada en base64url",
    json_string: "cadena JSON",
    e164: "número E.164",
    credit_card: "número de targeta de crèdit",
    currency_code: "codi de moneda",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Tipus invàlid: s'esperava instanceof ${issue2.expected}, s'ha rebut ${received}`;
        }
        return `Tipus invàlid: s'esperava ${expected}, s'ha rebut ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Valor invàlid: s'esperava ${stringifyPrimitive(issue2.values[0])}`;
        return `Opció invàlida: s'esperava una de ${joinValues(issue2.values, " o ")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "com a màxim" : "menys de";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} contingués ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} fos ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "com a mínim" : "més de";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Massa petit: s'esperava que ${issue2.origin} contingués ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Massa petit: s'esperava que ${issue2.origin} fos ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Format invàlid: ha de començar amb "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Format invàlid: ha d'acabar amb "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Format invàlid: ha d'incloure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Format invàlid: ha de coincidir amb el patró ${_issue.pattern}`;
        return `Format invàlid per a ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Número invàlid: ha de ser múltiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Clau${issue2.keys.length > 1 ? "s" : ""} no reconeguda${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Clau invàlida a ${issue2.origin}`;
      case "invalid_union":
        return "Entrada invàlida";
      case "invalid_element":
        return `Element invàlid a ${issue2.origin}`;
      default:
        return `Entrada invàlida`;
    }
  };
};
function ca_default() {
  return {
    localeError: error6()
  };
}
// node_modules/zod/v4/locales/ckb.js
var error7 = () => {
  const Sizable = {
    string: { unit: "پیت", verb: "بێت" },
    file: { unit: "بایت", verb: "بێت" },
    array: { unit: "دانە", verb: "بێت" },
    set: { unit: "دانە", verb: "بێت" },
    map: { unit: "دانە", verb: "بێت" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "regex",
    email: "ئیمەیڵ",
    url: "بەستەر (URL)",
    emoji: "ئیمۆجی",
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
    datetime: "ڕێکەوت و کات",
    date: "ڕێکەوت",
    time: "کات",
    duration: "ماوە",
    ipv4: "ناونیشانی IPv4",
    ipv6: "ناونیشانی IPv6",
    mac: "ناونیشانی MAC",
    cidrv4: "مەودای IPv4",
    cidrv6: "مەودای IPv6",
    base64: "دەقی base64",
    base64url: "دەقی base64url",
    json_string: "دەقی JSON",
    e164: "ژمارەی E.164",
    credit_card: "ژمارەی کارتی کرێدیت",
    currency_code: "کۆدی دراو",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "تێکردە"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "نووسین",
    number: "ژمارە",
    boolean: "boolean",
    array: "array",
    object: "object",
    date: "ڕێکەوت",
    integer: "ژمارە",
    float: "ژمارە",
    null: "null",
    undefined: "undefined",
    function: "function",
    symbol: "symbol",
    unknown: "unknown",
    promise: "promise",
    void: "void",
    never: "never",
    map: "map",
    set: "set"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        const postfix = ["ا", "و", "ۆ", "وو", "ە", "ی", "ێ"].some((p) => received.endsWith(p)) ? "یە" : "ە";
        const isEnglish = /^[a-zA-Z]+$/.test(received);
        if (receivedType === "null" || receivedType === "undefined")
          return `داواکراوە`;
        return `چاوەڕوانکراوە ${expected} بێت، بەڵام ${received}${isEnglish ? "" : postfix}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `بەهاکە نادرووستە: چاوەڕوانکراوە ${stringifyPrimitive(issue2.values[0])} بێت`;
        return `هەڵبژاردەی نادروست: چاوەڕوانکراوە یەکێک بێت لە ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `پێویستە بە لایەنی زۆرەوە ${issue2.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `پێویستە بە لایەنی زۆرەوە ${issue2.maximum.toString()} بێت`;
      }
      case "too_small": {
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `پێویستە بە لایەنی کەمەوە ${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `پێویستە بە لایەنی کەمەوە ${issue2.minimum.toString()} بێت`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `دەقی نادروست: پێویستە دەستپێبکات بە "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `دەقی نادروست: پێویستە کۆتاییبێت بە "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `دەقی نادروست: پێویستە "${_issue.includes}" لەخۆبگرێت`;
        if (_issue.format === "regex")
          return `دەقی نادروست: پێویستە لەگەڵ پاتێرنی ${_issue.pattern} بگونجێت`;
        return `بەهای ${FormatDictionary[_issue.format] ?? issue2.format} نادروستە`;
      }
      case "not_multiple_of":
        return `ژمارەی نادروست: دەبێت چەند هێندە بێت بۆ ${issue2.divisor}`;
      case "unrecognized_keys":
        return `کلیلی نەناسراو: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `کلیلی نادروست لە ${issue2.origin}`;
      case "invalid_union":
        if (issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0) {
          const opts = issue2.options.map((o) => `'${o}'`).join(" | ");
          return `بەهای نەناسراو هەیە. بەهای چاوەڕوانکراو: ${opts}`;
        }
        return "یەکگرتنی نادروست";
      case "invalid_element":
        return `${issue2.origin} بەهاکە نادروستە`;
      default:
        return `تێکردەی نادروست`;
    }
  };
};
function ckb_default() {
  return {
    localeError: error7()
  };
}
// node_modules/zod/v4/locales/cs.js
var error8 = () => {
  const Sizable = {
    string: { unit: "znaků", verb: "mít" },
    file: { unit: "bajtů", verb: "mít" },
    array: { unit: "prvků", verb: "mít" },
    set: { unit: "prvků", verb: "mít" },
    map: { unit: "prvků", verb: "mít" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "regulární výraz",
    email: "e-mailová adresa",
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
    datetime: "datum a čas ve formátu ISO",
    date: "datum ve formátu ISO",
    time: "čas ve formátu ISO",
    duration: "doba trvání ISO",
    ipv4: "IPv4 adresa",
    ipv6: "IPv6 adresa",
    mac: "MAC adresa",
    cidrv4: "rozsah IPv4",
    cidrv6: "rozsah IPv6",
    base64: "řetězec zakódovaný ve formátu base64",
    base64url: "řetězec zakódovaný ve formátu base64url",
    json_string: "řetězec ve formátu JSON",
    e164: "číslo E.164",
    credit_card: "číslo kreditní karty",
    currency_code: "kód měny",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "vstup"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "číslo",
    string: "řetězec",
    function: "funkce",
    array: "pole"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Neplatný vstup: očekáváno instanceof ${issue2.expected}, obdrženo ${received}`;
        }
        return `Neplatný vstup: očekáváno ${expected}, obdrženo ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neplatný vstup: očekáváno ${stringifyPrimitive(issue2.values[0])}`;
        return `Neplatná možnost: očekávána jedna z hodnot ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Hodnota je příliš velká: ${issue2.origin ?? "hodnota"} musí mít ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "prvků"}`;
        }
        return `Hodnota je příliš velká: ${issue2.origin ?? "hodnota"} musí být ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Hodnota je příliš malá: ${issue2.origin ?? "hodnota"} musí mít ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "prvků"}`;
        }
        return `Hodnota je příliš malá: ${issue2.origin ?? "hodnota"} musí být ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Neplatný řetězec: musí začínat na "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Neplatný řetězec: musí končit na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neplatný řetězec: musí obsahovat "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neplatný řetězec: musí odpovídat vzoru ${_issue.pattern}`;
        return `Neplatný formát ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neplatné číslo: musí být násobkem ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Neznámé klíče: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neplatný klíč v ${issue2.origin}`;
      case "invalid_union":
        return "Neplatný vstup";
      case "invalid_element":
        return `Neplatná hodnota v ${issue2.origin}`;
      default:
        return `Neplatný vstup`;
    }
  };
};
function cs_default() {
  return {
    localeError: error8()
  };
}
// node_modules/zod/v4/locales/da.js
var error9 = () => {
  const Sizable = {
    string: { unit: "tegn", verb: "havde" },
    file: { unit: "bytes", verb: "havde" },
    array: { unit: "elementer", verb: "indeholdt" },
    set: { unit: "elementer", verb: "indeholdt" },
    map: { unit: "elementer", verb: "indeholdt" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "e-mailadresse",
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
    datetime: "ISO dato- og klokkeslæt",
    date: "ISO-dato",
    time: "ISO-klokkeslæt",
    duration: "ISO-varighed",
    ipv4: "IPv4-adresse",
    ipv6: "IPv6-adresse",
    mac: "MAC-adresse",
    cidrv4: "IPv4-spektrum",
    cidrv6: "IPv6-spektrum",
    base64: "base64-kodet streng",
    base64url: "base64url-kodet streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    credit_card: "kreditkortnummer",
    currency_code: "valutakode",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "streng",
    number: "tal",
    boolean: "boolean",
    array: "liste",
    object: "objekt",
    set: "sæt",
    file: "fil"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ugyldigt input: forventede instanceof ${issue2.expected}, fik ${received}`;
        }
        return `Ugyldigt input: forventede ${expected}, fik ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ugyldig værdi: forventede ${stringifyPrimitive(issue2.values[0])}`;
        return `Ugyldigt valg: forventede en af følgende ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing)
          return `For stor: forventede ${origin ?? "value"} ${sizing.verb} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
        return `For stor: forventede ${origin ?? "value"} havde ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing) {
          return `For lille: forventede ${origin} ${sizing.verb} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `For lille: forventede ${origin} havde ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: skal starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: skal ende med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: skal indeholde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: skal matche mønsteret ${_issue.pattern}`;
        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ugyldigt tal: skal være deleligt med ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ukendte nøgler" : "Ukendt nøgle"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig nøgle i ${issue2.origin}`;
      case "invalid_union":
        return "Ugyldigt input: matcher ingen af de tilladte typer";
      case "invalid_element":
        return `Ugyldig værdi i ${issue2.origin}`;
      default:
        return `Ugyldigt input`;
    }
  };
};
function da_default() {
  return {
    localeError: error9()
  };
}
// node_modules/zod/v4/locales/de.js
var error10 = () => {
  const Sizable = {
    string: { unit: "Zeichen", verb: "zu haben" },
    file: { unit: "Bytes", verb: "zu haben" },
    array: { unit: "Elemente", verb: "zu haben" },
    set: { unit: "Elemente", verb: "zu haben" },
    map: { unit: "Elemente", verb: "zu haben" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "Eingabe",
    email: "E-Mail-Adresse",
    url: "URL",
    emoji: "Emoji",
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
    datetime: "ISO-Datum und -Uhrzeit",
    date: "ISO-Datum",
    time: "ISO-Uhrzeit",
    duration: "ISO-Dauer",
    ipv4: "IPv4-Adresse",
    ipv6: "IPv6-Adresse",
    mac: "MAC-Adresse",
    cidrv4: "IPv4-Bereich",
    cidrv6: "IPv6-Bereich",
    base64: "Base64-codierter String",
    base64url: "Base64-URL-codierter String",
    json_string: "JSON-String",
    e164: "E.164-Nummer",
    credit_card: "Kreditkartennummer",
    currency_code: "Währungscode",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "Eingabe"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "Zahl",
    array: "Array"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ungültige Eingabe: erwartet instanceof ${issue2.expected}, erhalten ${received}`;
        }
        return `Ungültige Eingabe: erwartet ${expected}, erhalten ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ungültige Eingabe: erwartet ${stringifyPrimitive(issue2.values[0])}`;
        return `Ungültige Option: erwartet eine von ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Zu groß: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "Elemente"} hat`;
        return `Zu groß: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ist`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} hat`;
        }
        return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ist`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ungültiger String: muss mit "${_issue.prefix}" beginnen`;
        if (_issue.format === "ends_with")
          return `Ungültiger String: muss mit "${_issue.suffix}" enden`;
        if (_issue.format === "includes")
          return `Ungültiger String: muss "${_issue.includes}" enthalten`;
        if (_issue.format === "regex")
          return `Ungültiger String: muss dem Muster ${_issue.pattern} entsprechen`;
        return `Ungültig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ungültige Zahl: muss ein Vielfaches von ${issue2.divisor} sein`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Unbekannte Schlüssel" : "Unbekannter Schlüssel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ungültiger Schlüssel in ${issue2.origin}`;
      case "invalid_union":
        return "Ungültige Eingabe";
      case "invalid_element":
        return `Ungültiger Wert in ${issue2.origin}`;
      default:
        return `Ungültige Eingabe`;
    }
  };
};
function de_default() {
  return {
    localeError: error10()
  };
}
// node_modules/zod/v4/locales/el.js
var error11 = () => {
  const Sizable = {
    string: { unit: "χαρακτήρες", verb: "να έχει" },
    file: { unit: "bytes", verb: "να έχει" },
    array: { unit: "στοιχεία", verb: "να έχει" },
    set: { unit: "στοιχεία", verb: "να έχει" },
    map: { unit: "καταχωρήσεις", verb: "να έχει" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "είσοδος",
    email: "διεύθυνση email",
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
    datetime: "ISO ημερομηνία και ώρα",
    date: "ISO ημερομηνία",
    time: "ISO ώρα",
    duration: "ISO διάρκεια",
    ipv4: "διεύθυνση IPv4",
    ipv6: "διεύθυνση IPv6",
    mac: "διεύθυνση MAC",
    cidrv4: "εύρος IPv4",
    cidrv6: "εύρος IPv6",
    base64: "συμβολοσειρά κωδικοποιημένη σε base64",
    base64url: "συμβολοσειρά κωδικοποιημένη σε base64url",
    json_string: "συμβολοσειρά JSON",
    e164: "αριθμός E.164",
    credit_card: "αριθμός πιστωτικής κάρτας",
    currency_code: "κωδικός νομίσματος",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "είσοδος"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (typeof issue2.expected === "string" && /^[A-Z]/.test(issue2.expected)) {
          return `Μη έγκυρη είσοδος: αναμενόταν instanceof ${issue2.expected}, λήφθηκε ${received}`;
        }
        return `Μη έγκυρη είσοδος: αναμενόταν ${expected}, λήφθηκε ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Μη έγκυρη είσοδος: αναμενόταν ${stringifyPrimitive(issue2.values[0])}`;
        return `Μη έγκυρη επιλογή: αναμενόταν ένα από ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Πολύ μεγάλο: αναμενόταν ${issue2.origin ?? "τιμή"} να έχει ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "στοιχεία"}`;
        return `Πολύ μεγάλο: αναμενόταν ${issue2.origin ?? "τιμή"} να είναι ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Πολύ μικρό: αναμενόταν ${issue2.origin} να έχει ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Πολύ μικρό: αναμενόταν ${issue2.origin} να είναι ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Μη έγκυρη συμβολοσειρά: πρέπει να ξεκινά με "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Μη έγκυρη συμβολοσειρά: πρέπει να τελειώνει με "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Μη έγκυρη συμβολοσειρά: πρέπει να περιέχει "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Μη έγκυρη συμβολοσειρά: πρέπει να ταιριάζει με το μοτίβο ${_issue.pattern}`;
        return `Μη έγκυρο: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Μη έγκυρος αριθμός: πρέπει να είναι πολλαπλάσιο του ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Άγνωστ${issue2.keys.length > 1 ? "α" : "ο"} κλειδ${issue2.keys.length > 1 ? "ιά" : "ί"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Μη έγκυρο κλειδί στο ${issue2.origin}`;
      case "invalid_union":
        return "Μη έγκυρη είσοδος";
      case "invalid_element":
        return `Μη έγκυρη τιμή στο ${issue2.origin}`;
      default:
        return `Μη έγκυρη είσοδος`;
    }
  };
};
function el_default() {
  return {
    localeError: error11()
  };
}
// node_modules/zod/v4/locales/en.js
var error12 = () => {
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
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = getTypeName(issue2.expected);
        const receivedType = parsedType(issue2.input);
        const received = getTypeName(receivedType, issue2.input);
        return `Invalid input: expected ${expected}, received ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
        return `Invalid option: expected one of ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.exact ? "exactly " : issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Too big: expected ${issue2.origin ?? "value"} to have ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Too big: expected ${issue2.origin ?? "value"} to be ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.exact ? "exactly " : issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Too small: expected ${issue2.origin} to have ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Too small: expected ${issue2.origin} to be ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Invalid string: must start with "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Invalid string: must end with "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Invalid string: must include "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Invalid string: must match pattern ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${issue2.origin}`;
      case "invalid_union":
        if (issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0) {
          const opts = issue2.options.map((o) => `'${o}'`).join(" | ");
          return `Invalid discriminator value. Expected ${opts}`;
        }
        if (issue2.inclusive === false) {
          return "Invalid input: more than one option matched";
        }
        return "Invalid input";
      case "invalid_element":
        return `Invalid value in ${issue2.origin}`;
      default:
        return `Invalid input`;
    }
  };
};
function en_default() {
  return {
    localeError: error12()
  };
}
// node_modules/zod/v4/locales/eo.js
var error13 = () => {
  const Sizable = {
    string: { unit: "karaktrojn", verb: "havi" },
    file: { unit: "bajtojn", verb: "havi" },
    array: { unit: "elementojn", verb: "havi" },
    set: { unit: "elementojn", verb: "havi" },
    map: { unit: "elementojn", verb: "havi" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "enigo",
    email: "retadreso",
    url: "URL",
    emoji: "emoĝio",
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
    datetime: "ISO-datotempo",
    date: "ISO-dato",
    time: "ISO-tempo",
    duration: "ISO-daŭro",
    ipv4: "IPv4-adreso",
    ipv6: "IPv6-adreso",
    mac: "MAC-adreso",
    cidrv4: "IPv4-rango",
    cidrv6: "IPv6-rango",
    base64: "64-ume kodita karaktraro",
    base64url: "URL-64-ume kodita karaktraro",
    json_string: "JSON-karaktraro",
    e164: "E.164-nombro",
    credit_card: "kreditkarta numero",
    currency_code: "valuta kodo",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "enigo"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombro",
    array: "tabelo",
    null: "senvalora"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Nevalida enigo: atendiĝis instanceof ${issue2.expected}, riceviĝis ${received}`;
        }
        return `Nevalida enigo: atendiĝis ${expected}, riceviĝis ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Nevalida enigo: atendiĝis ${stringifyPrimitive(issue2.values[0])}`;
        return `Nevalida opcio: atendiĝis unu el ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Tro granda: atendiĝis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementojn"}`;
        return `Tro granda: atendiĝis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Tro malgranda: atendiĝis ke ${issue2.origin} havu ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Tro malgranda: atendiĝis ke ${issue2.origin} estu ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Nevalida karaktraro: devas komenciĝi per "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Nevalida karaktraro: devas finiĝi per "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}`;
        return `Nevalida ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nevalida nombro: devas esti oblo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nekonata${issue2.keys.length > 1 ? "j" : ""} ŝlosilo${issue2.keys.length > 1 ? "j" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Nevalida ŝlosilo en ${issue2.origin}`;
      case "invalid_union":
        return "Nevalida enigo";
      case "invalid_element":
        return `Nevalida valoro en ${issue2.origin}`;
      default:
        return `Nevalida enigo`;
    }
  };
};
function eo_default() {
  return {
    localeError: error13()
  };
}
// node_modules/zod/v4/locales/es.js
var error14 = () => {
  const Sizable = {
    string: { unit: "caracteres", verb: "tener" },
    file: { unit: "bytes", verb: "tener" },
    array: { unit: "elementos", verb: "tener" },
    set: { unit: "elementos", verb: "tener" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrada",
    email: "dirección de correo electrónico",
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
    datetime: "fecha y hora ISO",
    date: "fecha ISO",
    time: "hora ISO",
    duration: "duración ISO",
    ipv4: "dirección IPv4",
    ipv6: "dirección IPv6",
    mac: "dirección MAC",
    cidrv4: "rango IPv4",
    cidrv6: "rango IPv6",
    base64: "cadena codificada en base64",
    base64url: "URL codificada en base64",
    json_string: "cadena JSON",
    e164: "número E.164",
    credit_card: "número de tarjeta de crédito",
    currency_code: "código de moneda",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "texto",
    number: "número",
    boolean: "booleano",
    array: "arreglo",
    object: "objeto",
    set: "conjunto",
    file: "archivo",
    date: "fecha",
    bigint: "número grande",
    symbol: "símbolo",
    undefined: "indefinido",
    null: "nulo",
    function: "función",
    map: "mapa",
    record: "registro",
    tuple: "tupla",
    enum: "enumeración",
    union: "unión",
    literal: "literal",
    promise: "promesa",
    void: "vacío",
    never: "nunca",
    unknown: "desconocido",
    any: "cualquiera"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entrada inválida: se esperaba instanceof ${issue2.expected}, recibido ${received}`;
        }
        return `Entrada inválida: se esperaba ${expected}, recibido ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrada inválida: se esperaba ${stringifyPrimitive(issue2.values[0])}`;
        return `Opción inválida: se esperaba una de ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing)
          return `Demasiado grande: se esperaba que ${origin ?? "valor"} tuviera ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Demasiado grande: se esperaba que ${origin ?? "valor"} fuera ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing) {
          return `Demasiado pequeño: se esperaba que ${origin} tuviera ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Demasiado pequeño: se esperaba que ${origin} fuera ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Cadena inválida: debe comenzar con "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Cadena inválida: debe terminar en "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Cadena inválida: debe incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Cadena inválida: debe coincidir con el patrón ${_issue.pattern}`;
        return `Inválido ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Número inválido: debe ser múltiplo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Llave${issue2.keys.length > 1 ? "s" : ""} desconocida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Llave inválida en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      case "invalid_union":
        return "Entrada inválida";
      case "invalid_element":
        return `Valor inválido en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      default:
        return `Entrada inválida`;
    }
  };
};
function es_default() {
  return {
    localeError: error14()
  };
}
// node_modules/zod/v4/locales/fa.js
var error15 = () => {
  const Sizable = {
    string: { unit: "کاراکتر", verb: "داشته باشد" },
    file: { unit: "بایت", verb: "داشته باشد" },
    array: { unit: "آیتم", verb: "داشته باشد" },
    set: { unit: "آیتم", verb: "داشته باشد" },
    map: { unit: "آیتم", verb: "داشته باشد" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ورودی",
    email: "آدرس ایمیل",
    url: "URL",
    emoji: "ایموجی",
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
    datetime: "تاریخ و زمان ایزو",
    date: "تاریخ ایزو",
    time: "زمان ایزو",
    duration: "مدت زمان ایزو",
    ipv4: "IPv4 آدرس",
    ipv6: "IPv6 آدرس",
    mac: "MAC آدرس",
    cidrv4: "IPv4 دامنه",
    cidrv6: "IPv6 دامنه",
    base64: "base64-encoded رشته",
    base64url: "base64url-encoded رشته",
    json_string: "JSON رشته",
    e164: "E.164 عدد",
    credit_card: "شماره کارت اعتباری",
    currency_code: "کد ارز",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "ورودی"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "عدد",
    array: "آرایه"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `ورودی نامعتبر: می‌بایست instanceof ${issue2.expected} می‌بود، ${received} دریافت شد`;
        }
        return `ورودی نامعتبر: می‌بایست ${expected} می‌بود، ${received} دریافت شد`;
      }
      case "invalid_value":
        if (issue2.values.length === 1) {
          return `ورودی نامعتبر: می‌بایست ${stringifyPrimitive(issue2.values[0])} می‌بود`;
        }
        return `گزینه نامعتبر: می‌بایست یکی از ${joinValues(issue2.values, "|")} می‌بود`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `خیلی بزرگ: ${issue2.origin ?? "مقدار"} باید ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "عنصر"} باشد`;
        }
        return `خیلی بزرگ: ${issue2.origin ?? "مقدار"} باید ${adj}${issue2.maximum.toString()} باشد`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `خیلی کوچک: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} ${sizing.unit} باشد`;
        }
        return `خیلی کوچک: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} باشد`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `رشته نامعتبر: باید با "${_issue.prefix}" شروع شود`;
        }
        if (_issue.format === "ends_with") {
          return `رشته نامعتبر: باید با "${_issue.suffix}" تمام شود`;
        }
        if (_issue.format === "includes") {
          return `رشته نامعتبر: باید شامل "${_issue.includes}" باشد`;
        }
        if (_issue.format === "regex") {
          return `رشته نامعتبر: باید با الگوی ${_issue.pattern} مطابقت داشته باشد`;
        }
        return `${FormatDictionary[_issue.format] ?? issue2.format} نامعتبر`;
      }
      case "not_multiple_of":
        return `عدد نامعتبر: باید مضرب ${issue2.divisor} باشد`;
      case "unrecognized_keys":
        return `کلید${issue2.keys.length > 1 ? "های" : ""} ناشناس: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `کلید ناشناس در ${issue2.origin}`;
      case "invalid_union":
        return `ورودی نامعتبر`;
      case "invalid_element":
        return `مقدار نامعتبر در ${issue2.origin}`;
      default:
        return `ورودی نامعتبر`;
    }
  };
};
function fa_default() {
  return {
    localeError: error15()
  };
}
// node_modules/zod/v4/locales/fi.js
var error16 = () => {
  const Sizable = {
    string: { unit: "merkkiä", subject: "merkkijonon" },
    file: { unit: "tavua", subject: "tiedoston" },
    array: { unit: "alkiota", subject: "listan" },
    set: { unit: "alkiota", subject: "joukon" },
    map: { unit: "alkiota", subject: "kuvauksen" },
    number: { unit: "", subject: "luvun" },
    bigint: { unit: "", subject: "suuren kokonaisluvun" },
    int: { unit: "", subject: "kokonaisluvun" },
    date: { unit: "", subject: "päivämäärän" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "säännöllinen lauseke",
    email: "sähköpostiosoite",
    url: "URL-osoite",
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
    datetime: "ISO-aikaleima",
    date: "ISO-päivämäärä",
    time: "ISO-aika",
    duration: "ISO-kesto",
    ipv4: "IPv4-osoite",
    ipv6: "IPv6-osoite",
    mac: "MAC-osoite",
    cidrv4: "IPv4-alue",
    cidrv6: "IPv6-alue",
    base64: "base64-koodattu merkkijono",
    base64url: "base64url-koodattu merkkijono",
    json_string: "JSON-merkkijono",
    e164: "E.164-luku",
    credit_card: "luottokortin numero",
    currency_code: "valuuttakoodi",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "templaattimerkkijono"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Virheellinen tyyppi: odotettiin instanceof ${issue2.expected}, oli ${received}`;
        }
        return `Virheellinen tyyppi: odotettiin ${expected}, oli ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Virheellinen syöte: täytyy olla ${stringifyPrimitive(issue2.values[0])}`;
        return `Virheellinen valinta: täytyy olla yksi seuraavista: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Liian suuri: ${sizing.subject} täytyy olla ${adj}${issue2.maximum.toString()} ${sizing.unit}`.trim();
        }
        return `Liian suuri: arvon täytyy olla ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Liian pieni: ${sizing.subject} täytyy olla ${adj}${issue2.minimum.toString()} ${sizing.unit}`.trim();
        }
        return `Liian pieni: arvon täytyy olla ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Virheellinen syöte: täytyy alkaa "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Virheellinen syöte: täytyy loppua "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Virheellinen syöte: täytyy sisältää "${_issue.includes}"`;
        if (_issue.format === "regex") {
          return `Virheellinen syöte: täytyy vastata säännöllistä lauseketta ${_issue.pattern}`;
        }
        return `Virheellinen ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Virheellinen luku: täytyy olla luvun ${issue2.divisor} monikerta`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return "Virheellinen avain tietueessa";
      case "invalid_union":
        return "Virheellinen unioni";
      case "invalid_element":
        return "Virheellinen arvo joukossa";
      default:
        return `Virheellinen syöte`;
    }
  };
};
function fi_default() {
  return {
    localeError: error16()
  };
}
// node_modules/zod/v4/locales/fr.js
var error17 = () => {
  const Sizable = {
    string: { unit: "caractères", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "éléments", verb: "avoir" },
    set: { unit: "éléments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "expression régulière",
    email: "adresse e-mail",
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
    datetime: "date et heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "durée ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    mac: "adresse MAC",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "chaîne de caractères encodée en base64",
    base64url: "chaîne de caractères encodée en base64url",
    json_string: "chaîne de caractères JSON",
    e164: "numéro au format E.164",
    credit_card: "numéro de carte de crédit",
    currency_code: "code de devise",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "entrée"
  };
  const TypeDictionary = {
    string: "chaîne de caractères",
    number: "nombre",
    int: "entier",
    boolean: "booléen",
    bigint: "grand entier",
    symbol: "symbole",
    undefined: "indéfini",
    null: "null",
    never: "jamais",
    void: "vide",
    date: "date",
    array: "tableau",
    object: "objet",
    tuple: "tuple",
    record: "record",
    map: "map",
    set: "ensemble",
    file: "fichier",
    nonoptional: "non optionnel",
    nan: "NaN",
    function: "fonction"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entrée invalide : instance de ${issue2.expected} attendu, ${received} reçu`;
        }
        return `Entrée invalide : ${expected} attendu, ${received} reçu`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrée invalide : ${stringifyPrimitive(issue2.values[0])} attendu`;
        return `Option invalide : une valeur parmi ${joinValues(issue2.values, "|")} attendue`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Trop grand : ${TypeDictionary[issue2.origin] ?? "valeur"} doit ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "élément(s)"}`;
        return `Trop grand : ${TypeDictionary[issue2.origin] ?? "valeur"} doit être ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Trop petit : ${TypeDictionary[issue2.origin] ?? "valeur"} doit ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        return `Trop petit : ${TypeDictionary[issue2.origin] ?? "valeur"} doit être ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Chaîne de caractères invalide : doit commencer par "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Chaîne de caractères invalide : doit se terminer par "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chaîne de caractères invalide : doit inclure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chaîne de caractères invalide : doit correspondre au motif ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit être un multiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Clé${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Clé invalide dans ${issue2.origin}`;
      case "invalid_union":
        return "Entrée invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue2.origin}`;
      default:
        return `Entrée invalide`;
    }
  };
};
function fr_default() {
  return {
    localeError: error17()
  };
}
// node_modules/zod/v4/locales/fr-CA.js
var error18 = () => {
  const Sizable = {
    string: { unit: "caractères", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "éléments", verb: "avoir" },
    set: { unit: "éléments", verb: "avoir" },
    map: { unit: "éléments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrée",
    email: "adresse courriel",
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
    datetime: "date-heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "durée ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    mac: "adresse MAC",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "chaîne encodée en base64",
    base64url: "chaîne encodée en base64url",
    json_string: "chaîne JSON",
    e164: "numéro E.164",
    credit_card: "numéro de carte de crédit",
    currency_code: "code de devise",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "entrée"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entrée invalide : attendu instanceof ${issue2.expected}, reçu ${received}`;
        }
        return `Entrée invalide : attendu ${expected}, reçu ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrée invalide : attendu ${stringifyPrimitive(issue2.values[0])}`;
        return `Option invalide : attendu l'une des valeurs suivantes ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "≤" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} ait ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} soit ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "≥" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Trop petit : attendu que ${issue2.origin} ait ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Trop petit : attendu que ${issue2.origin} soit ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chaîne invalide : doit inclure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chaîne invalide : doit correspondre au motif ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit être un multiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Clé${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Clé invalide dans ${issue2.origin}`;
      case "invalid_union":
        return "Entrée invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue2.origin}`;
      default:
        return `Entrée invalide`;
    }
  };
};
function fr_CA_default() {
  return {
    localeError: error18()
  };
}
// node_modules/zod/v4/locales/gu.js
var error19 = () => {
  const Sizable = {
    string: { unit: "અક્ષર", verb: "હોવા જોઈએ" },
    file: { unit: "બાયટ", verb: "હોવા જોઈએ" },
    array: { unit: "આઇટમ", verb: "હોવા જોઈએ" },
    set: { unit: "આઇટમ", verb: "હોવા જોઈએ" },
    map: { unit: "એન્ટ્રી", verb: "હોવા જોઈએ" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ઇનપુટ",
    email: "ઈમેઇલ એડ્રેસ",
    url: "URL",
    emoji: "ઇમોજી",
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
    datetime: "ISO તારીખ અને સમય",
    date: "ISO તારીખ",
    time: "ISO સમય",
    duration: "ISO અવધિ",
    ipv4: "IPv4 એડ્રેસ",
    ipv6: "IPv6 એડ્રેસ",
    mac: "MAC એડ્રેસ",
    cidrv4: "IPv4 શ્રેણી",
    cidrv6: "IPv6 શ્રેણી",
    base64: "base64-એન્કોડેડ સ્ટ્રિંગ",
    base64url: "base64url-એન્કોડેડ સ્ટ્રિંગ",
    json_string: "JSON સ્ટ્રિંગ",
    e164: "E.164 નંબર",
    credit_card: "ક્રેડિટ કાર્ડ નંબર",
    currency_code: "ચલણ કોડ",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "ઇનપુટ"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `અમાન્ય ઇનપુટ: અપેક્ષિત ${expected}, પ્રાપ્ત ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `અમાન્ય ઇનપુટ: અપેક્ષિત ${stringifyPrimitive(issue2.values[0])}`;
        return `અમાન્ય વિકલ્પ: ${joinValues(issue2.values, " | ")} માધ્યમથી એક અપેક્ષિત`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `ખૂબ મોટું: ${issue2.origin ?? "મૂલ્ય"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "એલિમેન્ટ"} હોવા જોઈએ`;
        return `ખૂબ મોટું: ${issue2.origin ?? "મૂલ્ય"} ${adj}${issue2.maximum.toString()} હોવું જોઈએ`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `ખૂબ નાનું: ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} હોવા જોઈએ`;
        }
        return `ખૂબ નાનું: ${issue2.origin} ${adj}${issue2.minimum.toString()} હોવું જોઈએ`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `અમાન્ય સ્ટ્રિંગ: "${_issue.prefix}" થી શરૂ થવું જોઈએ`;
        }
        if (_issue.format === "ends_with")
          return `અમાન્ય સ્ટ્રિંગ: "${_issue.suffix}" પર સમાપ્ત થવું જોઈએ`;
        if (_issue.format === "includes")
          return `અમાન્ય સ્ટ્રિંગ: "${_issue.includes}" શામેલ હોવું જોઈએ`;
        if (_issue.format === "regex")
          return `અમાન્ય સ્ટ્રિંગ: પેટર્ન ${_issue.pattern} સાથે મેળ ખાવું જોઈએ`;
        return `અમાન્ય ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `અમાન્ય નંબર: ${issue2.divisor} નો ગુણાંક હોવો જોઈએ`;
      case "unrecognized_keys":
        return `ઓળખી શકાતા નહીં તે કી${issue2.keys.length > 1 ? "ઓ" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} માં અમાન્ય કી`;
      case "invalid_union":
        if (issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0) {
          const opts = issue2.options.map((o) => `'${o}'`).join(" | ");
          return `અમાન્ય ડિસ્ક્રિમિનેટર મૂલ્ય. અપેક્ષિત ${opts}`;
        }
        return "અમાન્ય ઇનપુટ";
      case "invalid_element":
        return `${issue2.origin} માં અમાન્ય મૂલ્ય`;
      default:
        return "અમાન્ય ઇનપુટ";
    }
  };
};
function gu_default() {
  return {
    localeError: error19()
  };
}
// node_modules/zod/v4/locales/he.js
var error20 = () => {
  const TypeNames = {
    string: { label: "מחרוזת", gender: "f" },
    number: { label: "מספר", gender: "m" },
    boolean: { label: "ערך בוליאני", gender: "m" },
    bigint: { label: "BigInt", gender: "m" },
    date: { label: "תאריך", gender: "m" },
    array: { label: "מערך", gender: "m" },
    object: { label: "אובייקט", gender: "m" },
    null: { label: "ערך ריק (null)", gender: "m" },
    undefined: { label: "ערך לא מוגדר (undefined)", gender: "m" },
    symbol: { label: "סימבול (Symbol)", gender: "m" },
    function: { label: "פונקציה", gender: "f" },
    map: { label: "מפה (Map)", gender: "f" },
    set: { label: "קבוצה (Set)", gender: "f" },
    file: { label: "קובץ", gender: "m" },
    promise: { label: "Promise", gender: "m" },
    NaN: { label: "NaN", gender: "m" },
    unknown: { label: "ערך לא ידוע", gender: "m" },
    value: { label: "ערך", gender: "m" }
  };
  const Sizable = {
    string: { unit: "תווים", shortLabel: "קצר", longLabel: "ארוך" },
    file: { unit: "בייטים", shortLabel: "קטן", longLabel: "גדול" },
    array: { unit: "פריטים", shortLabel: "קטן", longLabel: "גדול" },
    set: { unit: "פריטים", shortLabel: "קטן", longLabel: "גדול" },
    number: { unit: "", shortLabel: "קטן", longLabel: "גדול" }
  };
  const typeEntry = (t) => t ? TypeNames[t] : undefined;
  const typeLabel = (t) => {
    const e = typeEntry(t);
    if (e)
      return e.label;
    return t ?? TypeNames.unknown.label;
  };
  const withDefinite = (t) => `ה${typeLabel(t)}`;
  const verbFor = (t) => {
    const e = typeEntry(t);
    const gender = e?.gender ?? "m";
    return gender === "f" ? "צריכה להיות" : "צריך להיות";
  };
  const getSizing = (origin) => {
    if (!origin)
      return null;
    return Sizable[origin] ?? null;
  };
  const FormatDictionary = {
    regex: { label: "קלט", gender: "m" },
    email: { label: "כתובת אימייל", gender: "f" },
    url: { label: "כתובת רשת", gender: "f" },
    emoji: { label: "אימוג'י", gender: "m" },
    uuid: { label: "UUID", gender: "m" },
    uuidv4: { label: "UUIDv4", gender: "m" },
    uuidv6: { label: "UUIDv6", gender: "m" },
    nanoid: { label: "nanoid", gender: "m" },
    guid: { label: "GUID", gender: "m" },
    cuid: { label: "cuid", gender: "m" },
    cuid2: { label: "cuid2", gender: "m" },
    ulid: { label: "ULID", gender: "m" },
    xid: { label: "XID", gender: "m" },
    ksuid: { label: "KSUID", gender: "m" },
    datetime: { label: "תאריך וזמן ISO", gender: "m" },
    date: { label: "תאריך ISO", gender: "m" },
    time: { label: "זמן ISO", gender: "m" },
    duration: { label: "משך זמן ISO", gender: "m" },
    ipv4: { label: "כתובת IPv4", gender: "f" },
    ipv6: { label: "כתובת IPv6", gender: "f" },
    mac: { label: "כתובת MAC", gender: "f" },
    cidrv4: { label: "טווח IPv4", gender: "m" },
    cidrv6: { label: "טווח IPv6", gender: "m" },
    base64: { label: "מחרוזת בבסיס 64", gender: "f" },
    base64url: { label: "מחרוזת בבסיס 64 לכתובות רשת", gender: "f" },
    json_string: { label: "מחרוזת JSON", gender: "f" },
    e164: { label: "מספר E.164", gender: "m" },
    credit_card: { label: "מספר כרטיס אשראי", gender: "m" },
    currency_code: { label: "קוד מטבע", gender: "m" },
    iban: { label: "IBAN", gender: "m" },
    jwt: { label: "JWT", gender: "m" },
    template_literal: { label: "קלט", gender: "m" },
    ends_with: { label: "קלט", gender: "m" },
    includes: { label: "קלט", gender: "m" },
    lowercase: { label: "קלט", gender: "m" },
    starts_with: { label: "קלט", gender: "m" },
    uppercase: { label: "קלט", gender: "m" }
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expectedKey = issue2.expected;
        const expected = TypeDictionary[expectedKey ?? ""] ?? typeLabel(expectedKey);
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? TypeNames[receivedType]?.label ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `קלט לא תקין: צריך להיות instanceof ${issue2.expected}, התקבל ${received}`;
        }
        return `קלט לא תקין: צריך להיות ${expected}, התקבל ${received}`;
      }
      case "invalid_value": {
        if (issue2.values.length === 1) {
          return `ערך לא תקין: הערך חייב להיות ${stringifyPrimitive(issue2.values[0])}`;
        }
        const stringified = issue2.values.map((v) => stringifyPrimitive(v));
        if (issue2.values.length === 2) {
          return `ערך לא תקין: האפשרויות המתאימות הן ${stringified[0]} או ${stringified[1]}`;
        }
        const lastValue = stringified[stringified.length - 1];
        const restValues = stringified.slice(0, -1).join(", ");
        return `ערך לא תקין: האפשרויות המתאימות הן ${restValues} או ${lastValue}`;
      }
      case "too_big": {
        const sizing = getSizing(issue2.origin);
        const subject = withDefinite(issue2.origin ?? "value");
        if (issue2.origin === "string") {
          return `${sizing?.longLabel ?? "ארוך"} מדי: ${subject} צריכה להכיל ${issue2.maximum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "או פחות" : "לכל היותר"}`.trim();
        }
        if (issue2.origin === "number") {
          const comparison = issue2.inclusive ? `קטן או שווה ל-${issue2.maximum}` : `קטן מ-${issue2.maximum}`;
          return `גדול מדי: ${subject} צריך להיות ${comparison}`;
        }
        if (issue2.origin === "array" || issue2.origin === "set") {
          const verb = issue2.origin === "set" ? "צריכה" : "צריך";
          const comparison = issue2.inclusive ? `${issue2.maximum} ${sizing?.unit ?? ""} או פחות` : `פחות מ-${issue2.maximum} ${sizing?.unit ?? ""}`;
          return `גדול מדי: ${subject} ${verb} להכיל ${comparison}`.trim();
        }
        const adj = issue2.inclusive ? "<=" : "<";
        const be = verbFor(issue2.origin ?? "value");
        if (sizing?.unit) {
          return `${sizing.longLabel} מדי: ${subject} ${be} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        }
        return `${sizing?.longLabel ?? "גדול"} מדי: ${subject} ${be} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const sizing = getSizing(issue2.origin);
        const subject = withDefinite(issue2.origin ?? "value");
        if (issue2.origin === "string") {
          return `${sizing?.shortLabel ?? "קצר"} מדי: ${subject} צריכה להכיל ${issue2.minimum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "או יותר" : "לפחות"}`.trim();
        }
        if (issue2.origin === "number") {
          const comparison = issue2.inclusive ? `גדול או שווה ל-${issue2.minimum}` : `גדול מ-${issue2.minimum}`;
          return `קטן מדי: ${subject} צריך להיות ${comparison}`;
        }
        if (issue2.origin === "array" || issue2.origin === "set") {
          const verb = issue2.origin === "set" ? "צריכה" : "צריך";
          if (issue2.minimum === 1 && issue2.inclusive) {
            const singularPhrase = issue2.origin === "set" ? "לפחות פריט אחד" : "לפחות פריט אחד";
            return `קטן מדי: ${subject} ${verb} להכיל ${singularPhrase}`;
          }
          const comparison = issue2.inclusive ? `${issue2.minimum} ${sizing?.unit ?? ""} או יותר` : `יותר מ-${issue2.minimum} ${sizing?.unit ?? ""}`;
          return `קטן מדי: ${subject} ${verb} להכיל ${comparison}`.trim();
        }
        const adj = issue2.inclusive ? ">=" : ">";
        const be = verbFor(issue2.origin ?? "value");
        if (sizing?.unit) {
          return `${sizing.shortLabel} מדי: ${subject} ${be} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `${sizing?.shortLabel ?? "קטן"} מדי: ${subject} ${be} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `המחרוזת חייבת להתחיל ב "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `המחרוזת חייבת להסתיים ב "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `המחרוזת חייבת לכלול "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `המחרוזת חייבת להתאים לתבנית ${_issue.pattern}`;
        const nounEntry = FormatDictionary[_issue.format];
        const noun = nounEntry?.label ?? _issue.format;
        const gender = nounEntry?.gender ?? "m";
        const adjective = gender === "f" ? "תקינה" : "תקין";
        return `${noun} לא ${adjective}`;
      }
      case "not_multiple_of":
        return `מספר לא תקין: חייב להיות מכפלה של ${issue2.divisor}`;
      case "unrecognized_keys":
        return `מפתח${issue2.keys.length > 1 ? "ות" : ""} לא מזוה${issue2.keys.length > 1 ? "ים" : "ה"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key": {
        return `שדה לא תקין באובייקט`;
      }
      case "invalid_union":
        return "קלט לא תקין";
      case "invalid_element": {
        const place = withDefinite(issue2.origin ?? "array");
        return `ערך לא תקין ב${place}`;
      }
      default:
        return `קלט לא תקין`;
    }
  };
};
function he_default() {
  return {
    localeError: error20()
  };
}
// node_modules/zod/v4/locales/hi.js
var error21 = () => {
  const Sizable = {
    string: { unit: "अक्षर", verb: "रखने के लिए" },
    file: { unit: "बाइट्स", verb: "रखने के लिए" },
    array: { unit: "तत्व", verb: "रखने के लिए" },
    set: { unit: "तत्व", verb: "रखने के लिए" },
    map: { unit: "प्रविष्टियाँ", verb: "रखने के लिए" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "इनपुट",
    email: "ईमेल पता",
    url: "URL",
    emoji: "इमोजी",
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
    datetime: "ISO तिथि और समय",
    date: "ISO तिथि",
    time: "ISO समय",
    duration: "ISO अवधि",
    ipv4: "IPv4 पता",
    ipv6: "IPv6 पता",
    mac: "MAC पता",
    cidrv4: "IPv4 श्रेणी",
    cidrv6: "IPv6 श्रेणी",
    base64: "Base64-एन्कोडेड स्ट्रिंग",
    base64url: "Base64URL-एन्कोडेड स्ट्रिंग",
    json_string: "JSON स्ट्रिंग",
    e164: "E.164 संख्या",
    credit_card: "क्रेडिट कार्ड संख्या",
    currency_code: "मुद्रा कोड",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "इनपुट"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `अमान्य इनपुट: अपेक्षित ${expected}, प्राप्त ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `अमान्य इनपुट: अपेक्षित ${stringifyPrimitive(issue2.values[0])}`;
        return `अमान्य विकल्प: अपेक्षित मानों में से एक ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `बहुत बड़ा: अपेक्षित था कि ${issue2.origin ?? "मान"} में ${adj}${issue2.maximum} ${sizing.unit} हों`;
        return `बहुत बड़ा: अपेक्षित था कि ${issue2.origin ?? "मान"} ${adj}${issue2.maximum} हो`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `बहुत छोटा: अपेक्षित था कि ${issue2.origin} में ${adj}${issue2.minimum} ${sizing.unit} हों`;
        return `बहुत छोटा: अपेक्षित था कि ${issue2.origin} ${adj}${issue2.minimum} हो`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `अमान्य स्ट्रिंग: "${_issue.prefix}" से शुरू होना चाहिए`;
        if (_issue.format === "ends_with")
          return `अमान्य स्ट्रिंग: "${_issue.suffix}" पर समाप्त होना चाहिए`;
        if (_issue.format === "includes")
          return `अमान्य स्ट्रिंग: इसमें "${_issue.includes}" शामिल होना चाहिए`;
        if (_issue.format === "regex")
          return `अमान्य स्ट्रिंग: पैटर्न ${_issue.pattern} से मेल खाना चाहिए`;
        return `अमान्य ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `अमान्य संख्या: यह ${issue2.divisor} का गुणज होना चाहिए`;
      case "unrecognized_keys":
        return `अपरिचित कुंजी${issue2.keys.length > 1 ? "याँ" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `अमान्य कुंजी: ${issue2.origin} में`;
      case "invalid_union":
        if (issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0) {
          const opts = issue2.options.map((o) => `'${o}'`).join(" | ");
          return `अमान्य डिस्क्रिमिनेटर मान: अपेक्षित ${opts}`;
        }
        return "अमान्य इनपुट";
      case "invalid_element":
        return `अमान्य मान: ${issue2.origin} में`;
      default:
        return `अमान्य इनपुट`;
    }
  };
};
function hi_default() {
  return {
    localeError: error21()
  };
}
// node_modules/zod/v4/locales/hr.js
var error22 = () => {
  const Sizable = {
    string: { unit: "znakova", verb: "imati" },
    file: { unit: "bajtova", verb: "imati" },
    array: { unit: "stavki", verb: "imati" },
    set: { unit: "stavki", verb: "imati" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "unos",
    email: "email adresa",
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
    datetime: "ISO datum i vrijeme",
    date: "ISO datum",
    time: "ISO vrijeme",
    duration: "ISO trajanje",
    ipv4: "IPv4 adresa",
    ipv6: "IPv6 adresa",
    mac: "MAC adresa",
    cidrv4: "IPv4 raspon",
    cidrv6: "IPv6 raspon",
    base64: "base64 kodirani tekst",
    base64url: "base64url kodirani tekst",
    json_string: "JSON tekst",
    e164: "E.164 broj",
    credit_card: "broj kreditne kartice",
    currency_code: "kod valute",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "unos"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "tekst",
    number: "broj",
    boolean: "boolean",
    array: "niz",
    object: "objekt",
    set: "skup",
    file: "datoteka",
    date: "datum",
    bigint: "bigint",
    symbol: "simbol",
    undefined: "undefined",
    null: "null",
    function: "funkcija",
    map: "mapa"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Neispravan unos: očekuje se instanceof ${issue2.expected}, a primljeno je ${received}`;
        }
        return `Neispravan unos: očekuje se ${expected}, a primljeno je ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neispravna vrijednost: očekivano ${stringifyPrimitive(issue2.values[0])}`;
        return `Neispravna opcija: očekivano jedno od ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing)
          return `Preveliko: očekivano da ${origin ?? "vrijednost"} ima ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemenata"}`;
        return `Preveliko: očekivano da ${origin ?? "vrijednost"} bude ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing) {
          return `Premalo: očekivano da ${origin} ima ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Premalo: očekivano da ${origin} bude ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Neispravan tekst: mora započinjati s "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Neispravan tekst: mora završavati s "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neispravan tekst: mora sadržavati "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neispravan tekst: mora odgovarati uzorku ${_issue.pattern}`;
        return `Neispravna ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neispravan broj: mora biti višekratnik od ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Neprepoznat${issue2.keys.length > 1 ? "i ključevi" : " ključ"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neispravan ključ u ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      case "invalid_union":
        return "Neispravan unos";
      case "invalid_element":
        return `Neispravna vrijednost u ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      default:
        return `Neispravan unos`;
    }
  };
};
function hr_default() {
  return {
    localeError: error22()
  };
}
// node_modules/zod/v4/locales/hu.js
var error23 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "legyen" },
    file: { unit: "byte", verb: "legyen" },
    array: { unit: "elem", verb: "legyen" },
    set: { unit: "elem", verb: "legyen" },
    map: { unit: "elem", verb: "legyen" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "bemenet",
    email: "email cím",
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
    datetime: "ISO időbélyeg",
    date: "ISO dátum",
    time: "ISO idő",
    duration: "ISO időintervallum",
    ipv4: "IPv4 cím",
    ipv6: "IPv6 cím",
    mac: "MAC cím",
    cidrv4: "IPv4 tartomány",
    cidrv6: "IPv6 tartomány",
    base64: "base64-kódolt string",
    base64url: "base64url-kódolt string",
    json_string: "JSON string",
    e164: "E.164 szám",
    credit_card: "hitelkártyaszám",
    currency_code: "pénznemkód",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "bemenet"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "szám",
    array: "tömb"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Érvénytelen bemenet: a várt érték instanceof ${issue2.expected}, a kapott érték ${received}`;
        }
        return `Érvénytelen bemenet: a várt érték ${expected}, a kapott érték ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Érvénytelen bemenet: a várt érték ${stringifyPrimitive(issue2.values[0])}`;
        return `Érvénytelen opció: valamelyik érték várt ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Túl nagy: ${issue2.origin ?? "érték"} mérete túl nagy ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elem"}`;
        return `Túl nagy: a bemeneti érték ${issue2.origin ?? "érték"} túl nagy: ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Túl kicsi: a bemeneti érték ${issue2.origin} mérete túl kicsi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Túl kicsi: a bemeneti érték ${issue2.origin} túl kicsi ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Érvénytelen string: "${_issue.prefix}" értékkel kell kezdődnie`;
        if (_issue.format === "ends_with")
          return `Érvénytelen string: "${_issue.suffix}" értékkel kell végződnie`;
        if (_issue.format === "includes")
          return `Érvénytelen string: "${_issue.includes}" értéket kell tartalmaznia`;
        if (_issue.format === "regex")
          return `Érvénytelen string: ${_issue.pattern} mintának kell megfelelnie`;
        return `Érvénytelen ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Érvénytelen szám: ${issue2.divisor} többszörösének kell lennie`;
      case "unrecognized_keys":
        return `Ismeretlen kulcs${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Érvénytelen kulcs ${issue2.origin}`;
      case "invalid_union":
        return "Érvénytelen bemenet";
      case "invalid_element":
        return `Érvénytelen érték: ${issue2.origin}`;
      default:
        return `Érvénytelen bemenet`;
    }
  };
};
function hu_default() {
  return {
    localeError: error23()
  };
}
// node_modules/zod/v4/locales/hy.js
function getArmenianPlural(count, one, many) {
  return Math.abs(count) === 1 ? one : many;
}
function withDefiniteArticle(word) {
  if (!word)
    return "";
  const vowels = ["ա", "ե", "ը", "ի", "ո", "ու", "օ"];
  const lastChar = word[word.length - 1];
  return word + (vowels.includes(lastChar) ? "ն" : "ը");
}
var error24 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "նշան",
        many: "նշաններ"
      },
      verb: "ունենալ"
    },
    file: {
      unit: {
        one: "բայթ",
        many: "բայթեր"
      },
      verb: "ունենալ"
    },
    array: {
      unit: {
        one: "տարր",
        many: "տարրեր"
      },
      verb: "ունենալ"
    },
    set: {
      unit: {
        one: "տարր",
        many: "տարրեր"
      },
      verb: "ունենալ"
    },
    map: {
      unit: {
        one: "տարր",
        many: "տարրեր"
      },
      verb: "ունենալ"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "մուտք",
    email: "էլ. հասցե",
    url: "URL",
    emoji: "էմոջի",
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
    datetime: "ISO ամսաթիվ և ժամ",
    date: "ISO ամսաթիվ",
    time: "ISO ժամ",
    duration: "ISO տևողություն",
    ipv4: "IPv4 հասցե",
    ipv6: "IPv6 հասցե",
    mac: "MAC հասցե",
    cidrv4: "IPv4 միջակայք",
    cidrv6: "IPv6 միջակայք",
    base64: "base64 ձևաչափով տող",
    base64url: "base64url ձևաչափով տող",
    json_string: "JSON տող",
    e164: "E.164 համար",
    credit_card: "կրեդիտ քարտի համար",
    currency_code: "արժույթի կոդ",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "մուտք"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "թիվ",
    array: "զանգված"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Սխալ մուտքագրում․ սպասվում էր instanceof ${issue2.expected}, ստացվել է ${received}`;
        }
        return `Սխալ մուտքագրում․ սպասվում էր ${expected}, ստացվել է ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Սխալ մուտքագրում․ սպասվում էր ${stringifyPrimitive(issue2.values[1])}`;
        return `Սխալ տարբերակ․ սպասվում էր հետևյալներից մեկը՝ ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getArmenianPlural(maxValue, sizing.unit.one, sizing.unit.many);
          return `Չափազանց մեծ արժեք․ սպասվում է, որ ${withDefiniteArticle(issue2.origin ?? "արժեք")} կունենա ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `Չափազանց մեծ արժեք․ սպասվում է, որ ${withDefiniteArticle(issue2.origin ?? "արժեք")} լինի ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getArmenianPlural(minValue, sizing.unit.one, sizing.unit.many);
          return `Չափազանց փոքր արժեք․ սպասվում է, որ ${withDefiniteArticle(issue2.origin)} կունենա ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `Չափազանց փոքր արժեք․ սպասվում է, որ ${withDefiniteArticle(issue2.origin)} լինի ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Սխալ տող․ պետք է սկսվի "${_issue.prefix}"-ով`;
        if (_issue.format === "ends_with")
          return `Սխալ տող․ պետք է ավարտվի "${_issue.suffix}"-ով`;
        if (_issue.format === "includes")
          return `Սխալ տող․ պետք է պարունակի "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Սխալ տող․ պետք է համապատասխանի ${_issue.pattern} ձևաչափին`;
        return `Սխալ ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Սխալ թիվ․ պետք է բազմապատիկ լինի ${issue2.divisor}-ի`;
      case "unrecognized_keys":
        return `Չճանաչված բանալի${issue2.keys.length > 1 ? "ներ" : ""}. ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Սխալ բանալի ${withDefiniteArticle(issue2.origin)}-ում`;
      case "invalid_union":
        return "Սխալ մուտքագրում";
      case "invalid_element":
        return `Սխալ արժեք ${withDefiniteArticle(issue2.origin)}-ում`;
      default:
        return `Սխալ մուտքագրում`;
    }
  };
};
function hy_default() {
  return {
    localeError: error24()
  };
}
// node_modules/zod/v4/locales/id.js
var error25 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "memiliki" },
    file: { unit: "byte", verb: "memiliki" },
    array: { unit: "item", verb: "memiliki" },
    set: { unit: "item", verb: "memiliki" },
    map: { unit: "item", verb: "memiliki" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "alamat email",
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
    datetime: "tanggal dan waktu format ISO",
    date: "tanggal format ISO",
    time: "jam format ISO",
    duration: "durasi format ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    mac: "alamat MAC",
    cidrv4: "rentang alamat IPv4",
    cidrv6: "rentang alamat IPv6",
    base64: "string dengan enkode base64",
    base64url: "string dengan enkode base64url",
    json_string: "string JSON",
    e164: "angka E.164",
    credit_card: "nomor kartu kredit",
    currency_code: "kode mata uang",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input tidak valid: diharapkan instanceof ${issue2.expected}, diterima ${received}`;
        }
        return `Input tidak valid: diharapkan ${expected}, diterima ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input tidak valid: diharapkan ${stringifyPrimitive(issue2.values[0])}`;
        return `Pilihan tidak valid: diharapkan salah satu dari ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} memiliki ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
        return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} menjadi ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Terlalu kecil: diharapkan ${issue2.origin} memiliki ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Terlalu kecil: diharapkan ${issue2.origin} menjadi ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `String tidak valid: harus dimulai dengan "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `String tidak valid: harus berakhir dengan "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `String tidak valid: harus menyertakan "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `String tidak valid: harus sesuai pola ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} tidak valid`;
      }
      case "not_multiple_of":
        return `Angka tidak valid: harus kelipatan dari ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak valid di ${issue2.origin}`;
      case "invalid_union":
        return "Input tidak valid";
      case "invalid_element":
        return `Nilai tidak valid di ${issue2.origin}`;
      default:
        return `Input tidak valid`;
    }
  };
};
function id_default() {
  return {
    localeError: error25()
  };
}
// node_modules/zod/v4/locales/is.js
var error26 = () => {
  const Sizable = {
    string: { unit: "stafi", verb: "að hafa" },
    file: { unit: "bæti", verb: "að hafa" },
    array: { unit: "hluti", verb: "að hafa" },
    set: { unit: "hluti", verb: "að hafa" },
    map: { unit: "hluti", verb: "að hafa" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "gildi",
    email: "netfang",
    url: "vefslóð",
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
    datetime: "ISO dagsetning og tími",
    date: "ISO dagsetning",
    time: "ISO tími",
    duration: "ISO tímalengd",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    mac: "MAC address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded strengur",
    base64url: "base64url-encoded strengur",
    json_string: "JSON strengur",
    e164: "E.164 tölugildi",
    credit_card: "kreditkortanúmer",
    currency_code: "gjaldmiðilskóði",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "gildi"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "númer",
    array: "fylki"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Rangt gildi: Þú slóst inn ${received} þar sem á að vera instanceof ${issue2.expected}`;
        }
        return `Rangt gildi: Þú slóst inn ${received} þar sem á að vera ${expected}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Rangt gildi: gert ráð fyrir ${stringifyPrimitive(issue2.values[0])}`;
        return `Ógilt val: má vera eitt af eftirfarandi ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Of stórt: gert er ráð fyrir að ${issue2.origin ?? "gildi"} hafi ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "hluti"}`;
        return `Of stórt: gert er ráð fyrir að ${issue2.origin ?? "gildi"} sé ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Of lítið: gert er ráð fyrir að ${issue2.origin} hafi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Of lítið: gert er ráð fyrir að ${issue2.origin} sé ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ógildur strengur: verður að byrja á "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Ógildur strengur: verður að enda á "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ógildur strengur: verður að innihalda "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ógildur strengur: verður að fylgja mynstri ${_issue.pattern}`;
        return `Rangt ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Röng tala: verður að vera margfeldi af ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Óþekkt ${issue2.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Rangur lykill í ${issue2.origin}`;
      case "invalid_union":
        return "Rangt gildi";
      case "invalid_element":
        return `Rangt gildi í ${issue2.origin}`;
      default:
        return `Rangt gildi`;
    }
  };
};
function is_default() {
  return {
    localeError: error26()
  };
}
// node_modules/zod/v4/locales/it.js
var error27 = () => {
  const Sizable = {
    string: { unit: "caratteri", verb: "avere" },
    file: { unit: "byte", verb: "avere" },
    array: { unit: "elementi", verb: "avere" },
    set: { unit: "elementi", verb: "avere" },
    map: { unit: "elementi", verb: "avere" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "indirizzo email",
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
    datetime: "data e ora ISO",
    date: "data ISO",
    time: "ora ISO",
    duration: "durata ISO",
    ipv4: "indirizzo IPv4",
    ipv6: "indirizzo IPv6",
    mac: "indirizzo MAC",
    cidrv4: "intervallo IPv4",
    cidrv6: "intervallo IPv6",
    base64: "stringa codificata in base64",
    base64url: "URL codificata in base64",
    json_string: "stringa JSON",
    e164: "numero E.164",
    credit_card: "numero di carta di credito",
    currency_code: "codice valuta",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "numero",
    array: "vettore"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input non valido: atteso instanceof ${issue2.expected}, ricevuto ${received}`;
        }
        return `Input non valido: atteso ${expected}, ricevuto ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input non valido: atteso ${stringifyPrimitive(issue2.values[0])}`;
        return `Opzione non valida: atteso uno tra ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Troppo grande: ${issue2.origin ?? "valore"} deve avere ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementi"}`;
        return `Troppo grande: ${issue2.origin ?? "valore"} deve essere ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Troppo piccolo: ${issue2.origin} deve avere ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Troppo piccolo: ${issue2.origin} deve essere ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Stringa non valida: deve iniziare con "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Stringa non valida: deve terminare con "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Stringa non valida: deve includere "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}`;
        return `Input non valido: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Numero non valido: deve essere un multiplo di ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Chiav${issue2.keys.length > 1 ? "i" : "e"} non riconosciut${issue2.keys.length > 1 ? "e" : "a"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Chiave non valida in ${issue2.origin}`;
      case "invalid_union":
        return "Input non valido";
      case "invalid_element":
        return `Valore non valido in ${issue2.origin}`;
      default:
        return `Input non valido`;
    }
  };
};
function it_default() {
  return {
    localeError: error27()
  };
}
// node_modules/zod/v4/locales/ja.js
var error28 = () => {
  const Sizable = {
    string: { unit: "文字", verb: "である" },
    file: { unit: "バイト", verb: "である" },
    array: { unit: "要素", verb: "である" },
    set: { unit: "要素", verb: "である" },
    map: { unit: "要素", verb: "である" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "入力値",
    email: "メールアドレス",
    url: "URL",
    emoji: "絵文字",
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
    datetime: "ISO日時",
    date: "ISO日付",
    time: "ISO時刻",
    duration: "ISO期間",
    ipv4: "IPv4アドレス",
    ipv6: "IPv6アドレス",
    mac: "MACアドレス",
    cidrv4: "IPv4範囲",
    cidrv6: "IPv6範囲",
    base64: "base64エンコード文字列",
    base64url: "base64urlエンコード文字列",
    json_string: "JSON文字列",
    e164: "E.164番号",
    credit_card: "クレジットカード番号",
    currency_code: "通貨コード",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "入力値"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "数値",
    array: "配列"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `無効な入力: instanceof ${issue2.expected}が期待されましたが、${received}が入力されました`;
        }
        return `無効な入力: ${expected}が期待されましたが、${received}が入力されました`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `無効な入力: ${stringifyPrimitive(issue2.values[0])}が期待されました`;
        return `無効な選択: ${joinValues(issue2.values, "、")}のいずれかである必要があります`;
      case "too_big": {
        const adj = issue2.inclusive ? "以下である" : "より小さい";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `大きすぎる値: ${issue2.origin ?? "値"}は${issue2.maximum.toString()}${sizing.unit ?? "要素"}${adj}必要があります`;
        return `大きすぎる値: ${issue2.origin ?? "値"}は${issue2.maximum.toString()}${adj}必要があります`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "以上である" : "より大きい";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `小さすぎる値: ${issue2.origin}は${issue2.minimum.toString()}${sizing.unit}${adj}必要があります`;
        return `小さすぎる値: ${issue2.origin}は${issue2.minimum.toString()}${adj}必要があります`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `無効な文字列: "${_issue.prefix}"で始まる必要があります`;
        if (_issue.format === "ends_with")
          return `無効な文字列: "${_issue.suffix}"で終わる必要があります`;
        if (_issue.format === "includes")
          return `無効な文字列: "${_issue.includes}"を含む必要があります`;
        if (_issue.format === "regex")
          return `無効な文字列: パターン${_issue.pattern}に一致する必要があります`;
        return `無効な${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `無効な数値: ${issue2.divisor}の倍数である必要があります`;
      case "unrecognized_keys":
        return `認識されていないキー${issue2.keys.length > 1 ? "群" : ""}: ${joinValues(issue2.keys, "、")}`;
      case "invalid_key":
        return `${issue2.origin}内の無効なキー`;
      case "invalid_union":
        return "無効な入力";
      case "invalid_element":
        return `${issue2.origin}内の無効な値`;
      default:
        return `無効な入力`;
    }
  };
};
function ja_default() {
  return {
    localeError: error28()
  };
}
// node_modules/zod/v4/locales/ka.js
var error29 = () => {
  const Sizable = {
    string: { unit: "სიმბოლო", verb: "უნდა შეიცავდეს" },
    file: { unit: "ბაიტი", verb: "უნდა შეიცავდეს" },
    array: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" },
    set: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" },
    map: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "შეყვანა",
    email: "ელ-ფოსტის მისამართი",
    url: "URL",
    emoji: "ემოჯი",
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
    datetime: "თარიღი-დრო",
    date: "თარიღი",
    time: "დრო",
    duration: "ხანგრძლივობა",
    ipv4: "IPv4 მისამართი",
    ipv6: "IPv6 მისამართი",
    mac: "MAC მისამართი",
    cidrv4: "IPv4 დიაპაზონი",
    cidrv6: "IPv6 დიაპაზონი",
    base64: "base64-კოდირებული ველი",
    base64url: "base64url-კოდირებული ველი",
    json_string: "JSON ველი",
    e164: "E.164 ნომერი",
    credit_card: "საკრედიტო ბარათის ნომერი",
    currency_code: "ვალუტის კოდი",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "შეყვანა"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "რიცხვი",
    string: "ველი",
    boolean: "ბულეანი",
    function: "ფუნქცია",
    array: "მასივი"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `არასწორი შეყვანა: მოსალოდნელი instanceof ${issue2.expected}, მიღებული ${received}`;
        }
        return `არასწორი შეყვანა: მოსალოდნელი ${expected}, მიღებული ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `არასწორი შეყვანა: მოსალოდნელი ${stringifyPrimitive(issue2.values[0])}`;
        return `არასწორი ვარიანტი: მოსალოდნელია ერთ-ერთი ${joinValues(issue2.values, "|")}-დან`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `ზედმეტად დიდი: მოსალოდნელი ${issue2.origin ?? "მნიშვნელობა"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        return `ზედმეტად დიდი: მოსალოდნელი ${issue2.origin ?? "მნიშვნელობა"} იყოს ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `ზედმეტად პატარა: მოსალოდნელი ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `ზედმეტად პატარა: მოსალოდნელი ${issue2.origin} იყოს ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `არასწორი ველი: უნდა იწყებოდეს "${_issue.prefix}"-ით`;
        }
        if (_issue.format === "ends_with")
          return `არასწორი ველი: უნდა მთავრდებოდეს "${_issue.suffix}"-ით`;
        if (_issue.format === "includes")
          return `არასწორი ველი: უნდა შეიცავდეს "${_issue.includes}"-ს`;
        if (_issue.format === "regex")
          return `არასწორი ველი: უნდა შეესაბამებოდეს შაბლონს ${_issue.pattern}`;
        return `არასწორი ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `არასწორი რიცხვი: უნდა იყოს ${issue2.divisor}-ის ჯერადი`;
      case "unrecognized_keys":
        return `უცნობი გასაღებ${issue2.keys.length > 1 ? "ები" : "ი"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `არასწორი გასაღები ${issue2.origin}-ში`;
      case "invalid_union":
        return "არასწორი შეყვანა";
      case "invalid_element":
        return `არასწორი მნიშვნელობა ${issue2.origin}-ში`;
      default:
        return `არასწორი შეყვანა`;
    }
  };
};
function ka_default() {
  return {
    localeError: error29()
  };
}
// node_modules/zod/v4/locales/km.js
var error30 = () => {
  const Sizable = {
    string: { unit: "តួអក្សរ", verb: "គួរមាន" },
    file: { unit: "បៃ", verb: "គួរមាន" },
    array: { unit: "ធាតុ", verb: "គួរមាន" },
    set: { unit: "ធាតុ", verb: "គួរមាន" },
    map: { unit: "ធាតុ", verb: "គួរមាន" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ទិន្នន័យបញ្ចូល",
    email: "អាសយដ្ឋានអ៊ីមែល",
    url: "URL",
    emoji: "សញ្ញាអារម្មណ៍",
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
    datetime: "កាលបរិច្ឆេទ និងម៉ោង ISO",
    date: "កាលបរិច្ឆេទ ISO",
    time: "ម៉ោង ISO",
    duration: "រយៈពេល ISO",
    ipv4: "អាសយដ្ឋាន IPv4",
    ipv6: "អាសយដ្ឋាន IPv6",
    mac: "អាសយដ្ឋាន MAC",
    cidrv4: "ដែនអាសយដ្ឋាន IPv4",
    cidrv6: "ដែនអាសយដ្ឋាន IPv6",
    base64: "ខ្សែអក្សរអ៊ិកូដ base64",
    base64url: "ខ្សែអក្សរអ៊ិកូដ base64url",
    json_string: "ខ្សែអក្សរ JSON",
    e164: "លេខ E.164",
    credit_card: "លេខប័ណ្ណឥណទាន",
    currency_code: "កូដរូបិយប័ណ្ណ",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "ទិន្នន័យបញ្ចូល"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "លេខ",
    array: "អារេ (Array)",
    null: "គ្មានតម្លៃ (null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ instanceof ${issue2.expected} ប៉ុន្តែទទួលបាន ${received}`;
        }
        return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${expected} ប៉ុន្តែទទួលបាន ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${stringifyPrimitive(issue2.values[0])}`;
        return `ជម្រើសមិនត្រឹមត្រូវ៖ ត្រូវជាមួយក្នុងចំណោម ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `ធំពេក៖ ត្រូវការ ${issue2.origin ?? "តម្លៃ"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "ធាតុ"}`;
        return `ធំពេក៖ ត្រូវការ ${issue2.origin ?? "តម្លៃ"} ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `តូចពេក៖ ត្រូវការ ${issue2.origin} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `តូចពេក៖ ត្រូវការ ${issue2.origin} ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវចាប់ផ្តើមដោយ "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវបញ្ចប់ដោយ "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវមាន "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវតែផ្គូផ្គងនឹងទម្រង់ដែលបានកំណត់ ${_issue.pattern}`;
        return `មិនត្រឹមត្រូវ៖ ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `លេខមិនត្រឹមត្រូវ៖ ត្រូវតែជាពហុគុណនៃ ${issue2.divisor}`;
      case "unrecognized_keys":
        return `រកឃើញសោមិនស្គាល់៖ ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `សោមិនត្រឹមត្រូវនៅក្នុង ${issue2.origin}`;
      case "invalid_union":
        return `ទិន្នន័យមិនត្រឹមត្រូវ`;
      case "invalid_element":
        return `ទិន្នន័យមិនត្រឹមត្រូវនៅក្នុង ${issue2.origin}`;
      default:
        return `ទិន្នន័យមិនត្រឹមត្រូវ`;
    }
  };
};
function km_default() {
  return {
    localeError: error30()
  };
}

// node_modules/zod/v4/locales/kh.js
function kh_default() {
  return km_default();
}
// node_modules/zod/v4/locales/kn.js
var error31 = () => {
  const Sizable = {
    string: { unit: "ಅಕ್ಷರಗಳು", verb: "ಹೊಂದಲು" },
    file: { unit: "ಬೈಟ್‌ಗಳು", verb: "ಹೊಂದಲು" },
    array: { unit: "ವಸ್ತುಗಳು", verb: "ಹೊಂದಲು" },
    set: { unit: "ವಸ್ತುಗಳು", verb: "ಹೊಂದಲು" },
    map: { unit: "entries", verb: "ಹೊಂದಲು" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ಇನ್ಪುಟ್",
    email: "email ವಿಳಾಸ",
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
    datetime: "ISO ದಿನಾಂಕದ ಸಮಯ",
    date: "ISO ದಿನಾಂಕ",
    time: "ISO ಸಮಯ",
    duration: "ISO ಅವಧಿ",
    ipv4: "IPv4 ವಿಳಾಸ",
    ipv6: "IPv6 ವಿಳಾಸ",
    mac: "MAC ವಿಳಾಸ",
    cidrv4: "IPv4 ವ್ಯಾಪ್ತಿಯ",
    cidrv6: "IPv6 ವ್ಯಾಪ್ತಿಯ",
    base64: "base64-encodedಸ್ಟ್ರಿಂಗ್",
    base64url: "base64url-encodedಸ್ಟ್ರಿಂಗ್",
    json_string: "JSONಸ್ಟ್ರಿಂಗ್",
    e164: "E.164 ಸಂಖ್ಯೆ",
    credit_card: "ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ",
    currency_code: "ಕರೆನ್ಸಿ ಕೋಡ್",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "ಇನ್ಪುಟ್"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `ಅಮಾನ್ಯ ಇನ್‌ಪುಟ್: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${expected}, ಸ್ವೀಕರಿಸಿದನು ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `ಅಮಾನ್ಯ ಇನ್‌ಪುಟ್: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${stringifyPrimitive(issue2.values[0])}`;
        return `ಅಮಾನ್ಯ ಆಯ್ಕೆ: ಇವುಗಳಲ್ಲಿ ಒಂದನ್ನು ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `ತುಂಬಾ ದೊಡ್ಡದು: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${issue2.origin ?? "value"} ಹೊಂದಲು ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "ಅಂಶಗಳು"}`;
        return `ತುಂಬಾ ದೊಡ್ಡದು: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${issue2.origin ?? "value"} ಎಂದು ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `ತುಂಬಾ ಚಿಕ್ಕದು: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${issue2.origin} ಹೊಂದಲು ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `ತುಂಬಾ ಚಿಕ್ಕದು: ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${issue2.origin} ಎಂದು ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `ಅಮಾನ್ಯವಾದ ಸ್ಟ್ರಿಂಗ್: ಇದರೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಬೇಕು "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `ಅಮಾನ್ಯವಾದ ಸ್ಟ್ರಿಂಗ್: ಇದರೊಂದಿಗೆ ಕೊನೆಗೊಳ್ಳಬೇಕು "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `ಅಮಾನ್ಯ ಸ್ಟ್ರಿಂಗ್: ಒಳಗೊಂಡಿರಬೇಕು "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `ಅಮಾನ್ಯವಾದ ಸ್ಟ್ರಿಂಗ್: ಮಾದರಿಗೆ ಹೊಂದಿಕೆಯಾಗಬೇಕು ${_issue.pattern}`;
        return `ಅಮಾನ್ಯ ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `ಅಮಾನ್ಯ ಸಂಖ್ಯೆ: ಬಹುಸಂಖ್ಯೆಯಾಗಿರಬೇಕು ${issue2.divisor}`;
      case "unrecognized_keys":
        return `ಗುರುತಿಸಲಾಗದ ಕೀ ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `ಅಮಾನ್ಯವಾದ ಕೀ ಇನ್ ${issue2.origin}`;
      case "invalid_union":
        if (issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0) {
          const opts = issue2.options.map((o) => `'${o}'`).join(" | ");
          return `ಅಮಾನ್ಯ ತಾರತಮ್ಯ ಮೌಲ್ಯ. ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ ${opts}`;
        }
        return "ಅಮಾನ್ಯ ಇನ್‌ಪುಟ್";
      case "invalid_element":
        return `ರಲ್ಲಿ ಅಮಾನ್ಯ ಮೌಲ್ಯ ${issue2.origin}`;
      default:
        return `ಅಮಾನ್ಯ ಇನ್‌ಪುಟ್`;
    }
  };
};
function kn_default() {
  return {
    localeError: error31()
  };
}
// node_modules/zod/v4/locales/ko.js
var error32 = () => {
  const Sizable = {
    string: { unit: "문자", verb: "to have" },
    file: { unit: "바이트", verb: "to have" },
    array: { unit: "개", verb: "to have" },
    set: { unit: "개", verb: "to have" },
    map: { unit: "개", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "입력",
    email: "이메일 주소",
    url: "URL",
    emoji: "이모지",
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
    datetime: "ISO 날짜시간",
    date: "ISO 날짜",
    time: "ISO 시간",
    duration: "ISO 기간",
    ipv4: "IPv4 주소",
    ipv6: "IPv6 주소",
    mac: "MAC 주소",
    cidrv4: "IPv4 범위",
    cidrv6: "IPv6 범위",
    base64: "base64 인코딩 문자열",
    base64url: "base64url 인코딩 문자열",
    json_string: "JSON 문자열",
    e164: "E.164 번호",
    credit_card: "신용카드 번호",
    currency_code: "통화 코드",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "입력"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `잘못된 입력: 예상 타입은 instanceof ${issue2.expected}, 받은 타입은 ${received}입니다`;
        }
        return `잘못된 입력: 예상 타입은 ${expected}, 받은 타입은 ${received}입니다`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `잘못된 입력: 값은 ${stringifyPrimitive(issue2.values[0])} 이어야 합니다`;
        return `잘못된 옵션: ${joinValues(issue2.values, "또는 ")} 중 하나여야 합니다`;
      case "too_big": {
        const adj = issue2.inclusive ? "이하" : "미만";
        const suffix = adj === "미만" ? "이어야 합니다" : "여야 합니다";
        const sizing = getSizing(issue2.origin);
        const unit = sizing?.unit ?? "요소";
        if (sizing)
          return `${issue2.origin ?? "값"}이 너무 큽니다: ${issue2.maximum.toString()}${unit} ${adj}${suffix}`;
        return `${issue2.origin ?? "값"}이 너무 큽니다: ${issue2.maximum.toString()} ${adj}${suffix}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "이상" : "초과";
        const suffix = adj === "이상" ? "이어야 합니다" : "여야 합니다";
        const sizing = getSizing(issue2.origin);
        const unit = sizing?.unit ?? "요소";
        if (sizing) {
          return `${issue2.origin ?? "값"}이 너무 작습니다: ${issue2.minimum.toString()}${unit} ${adj}${suffix}`;
        }
        return `${issue2.origin ?? "값"}이 너무 작습니다: ${issue2.minimum.toString()} ${adj}${suffix}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `잘못된 문자열: "${_issue.prefix}"(으)로 시작해야 합니다`;
        }
        if (_issue.format === "ends_with")
          return `잘못된 문자열: "${_issue.suffix}"(으)로 끝나야 합니다`;
        if (_issue.format === "includes")
          return `잘못된 문자열: "${_issue.includes}"을(를) 포함해야 합니다`;
        if (_issue.format === "regex")
          return `잘못된 문자열: 정규식 ${_issue.pattern} 패턴과 일치해야 합니다`;
        return `잘못된 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `잘못된 숫자: ${issue2.divisor}의 배수여야 합니다`;
      case "unrecognized_keys":
        return `인식할 수 없는 키: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `잘못된 키: ${issue2.origin}`;
      case "invalid_union":
        return `잘못된 입력`;
      case "invalid_element":
        return `잘못된 값: ${issue2.origin}`;
      default:
        return `잘못된 입력`;
    }
  };
};
function ko_default() {
  return {
    localeError: error32()
  };
}
// node_modules/zod/v4/locales/lt.js
var capitalizeFirstCharacter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
function getUnitTypeFromNumber(number2) {
  const abs = Math.abs(number2);
  const last = abs % 10;
  const last2 = abs % 100;
  if (last2 >= 11 && last2 <= 19 || last === 0)
    return "many";
  if (last === 1)
    return "one";
  return "few";
}
var error33 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "simbolis",
        few: "simboliai",
        many: "simbolių"
      },
      verb: {
        smaller: {
          inclusive: "turi būti ne ilgesnė kaip",
          notInclusive: "turi būti trumpesnė kaip"
        },
        bigger: {
          inclusive: "turi būti ne trumpesnė kaip",
          notInclusive: "turi būti ilgesnė kaip"
        }
      }
    },
    file: {
      unit: {
        one: "baitas",
        few: "baitai",
        many: "baitų"
      },
      verb: {
        smaller: {
          inclusive: "turi būti ne didesnis kaip",
          notInclusive: "turi būti mažesnis kaip"
        },
        bigger: {
          inclusive: "turi būti ne mažesnis kaip",
          notInclusive: "turi būti didesnis kaip"
        }
      }
    },
    array: {
      unit: {
        one: "elementą",
        few: "elementus",
        many: "elementų"
      },
      verb: {
        smaller: {
          inclusive: "turi turėti ne daugiau kaip",
          notInclusive: "turi turėti mažiau kaip"
        },
        bigger: {
          inclusive: "turi turėti ne mažiau kaip",
          notInclusive: "turi turėti daugiau kaip"
        }
      }
    },
    set: {
      unit: {
        one: "elementą",
        few: "elementus",
        many: "elementų"
      },
      verb: {
        smaller: {
          inclusive: "turi turėti ne daugiau kaip",
          notInclusive: "turi turėti mažiau kaip"
        },
        bigger: {
          inclusive: "turi turėti ne mažiau kaip",
          notInclusive: "turi turėti daugiau kaip"
        }
      }
    }
  };
  function getSizing(origin, unitType, inclusive, targetShouldBe) {
    const result = Sizable[origin] ?? null;
    if (result === null)
      return result;
    return {
      unit: result.unit[unitType],
      verb: result.verb[targetShouldBe][inclusive ? "inclusive" : "notInclusive"]
    };
  }
  const FormatDictionary = {
    regex: "įvestis",
    email: "el. pašto adresas",
    url: "URL",
    emoji: "jaustukas",
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
    datetime: "ISO data ir laikas",
    date: "ISO data",
    time: "ISO laikas",
    duration: "ISO trukmė",
    ipv4: "IPv4 adresas",
    ipv6: "IPv6 adresas",
    mac: "MAC adresas",
    cidrv4: "IPv4 tinklo prefiksas (CIDR)",
    cidrv6: "IPv6 tinklo prefiksas (CIDR)",
    base64: "base64 užkoduota eilutė",
    base64url: "base64url užkoduota eilutė",
    json_string: "JSON eilutė",
    e164: "E.164 numeris",
    credit_card: "kredito kortelės numeris",
    currency_code: "valiutos kodas",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "įvestis"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "skaičius",
    bigint: "sveikasis skaičius",
    string: "eilutė",
    boolean: "loginė reikšmė",
    undefined: "neapibrėžta reikšmė",
    function: "funkcija",
    symbol: "simbolis",
    array: "masyvas",
    object: "objektas",
    null: "nulinė reikšmė"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Gautas tipas ${received}, o tikėtasi - instanceof ${issue2.expected}`;
        }
        return `Gautas tipas ${received}, o tikėtasi - ${expected}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Privalo būti ${stringifyPrimitive(issue2.values[0])}`;
        return `Privalo būti vienas iš ${joinValues(issue2.values, "|")} pasirinkimų`;
      case "too_big": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.maximum)), issue2.inclusive ?? false, "smaller");
        if (sizing?.verb)
          return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} ${sizing.verb} ${issue2.maximum.toString()} ${sizing.unit ?? "elementų"}`;
        const adj = issue2.inclusive ? "ne didesnis kaip" : "mažesnis kaip";
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} turi būti ${adj} ${issue2.maximum.toString()} ${sizing?.unit}`;
      }
      case "too_small": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.minimum)), issue2.inclusive ?? false, "bigger");
        if (sizing?.verb)
          return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} ${sizing.verb} ${issue2.minimum.toString()} ${sizing.unit ?? "elementų"}`;
        const adj = issue2.inclusive ? "ne mažesnis kaip" : "didesnis kaip";
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} turi būti ${adj} ${issue2.minimum.toString()} ${sizing?.unit}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Eilutė privalo prasidėti "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Eilutė privalo pasibaigti "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Eilutė privalo įtraukti "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Eilutė privalo atitikti ${_issue.pattern}`;
        return `Neteisingas ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Skaičius privalo būti ${issue2.divisor} kartotinis.`;
      case "unrecognized_keys":
        return `Neatpažint${issue2.keys.length > 1 ? "i" : "as"} rakt${issue2.keys.length > 1 ? "ai" : "as"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return "Rastas klaidingas raktas";
      case "invalid_union":
        return "Klaidinga įvestis";
      case "invalid_element": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} turi klaidingą įvestį`;
      }
      default:
        return "Klaidinga įvestis";
    }
  };
};
function lt_default() {
  return {
    localeError: error33()
  };
}
// node_modules/zod/v4/locales/mk.js
var error34 = () => {
  const Sizable = {
    string: { unit: "знаци", verb: "да имаат" },
    file: { unit: "бајти", verb: "да имаат" },
    array: { unit: "ставки", verb: "да имаат" },
    set: { unit: "ставки", verb: "да имаат" },
    map: { unit: "ставки", verb: "да имаат" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "внес",
    email: "адреса на е-пошта",
    url: "URL",
    emoji: "емоџи",
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
    datetime: "ISO датум и време",
    date: "ISO датум",
    time: "ISO време",
    duration: "ISO времетраење",
    ipv4: "IPv4 адреса",
    ipv6: "IPv6 адреса",
    mac: "MAC адреса",
    cidrv4: "IPv4 опсег",
    cidrv6: "IPv6 опсег",
    base64: "base64-енкодирана низа",
    base64url: "base64url-енкодирана низа",
    json_string: "JSON низа",
    e164: "E.164 број",
    credit_card: "број на кредитна картичка",
    currency_code: "код на валута",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "внес"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "број",
    array: "низа"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Грешен внес: се очекува instanceof ${issue2.expected}, примено ${received}`;
        }
        return `Грешен внес: се очекува ${expected}, примено ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
        return `Грешана опција: се очекува една ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Премногу голем: се очекува ${issue2.origin ?? "вредноста"} да има ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "елементи"}`;
        return `Премногу голем: се очекува ${issue2.origin ?? "вредноста"} да биде ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Премногу мал: се очекува ${issue2.origin} да има ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Премногу мал: се очекува ${issue2.origin} да биде ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Неважечка низа: мора да започнува со "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Неважечка низа: мора да завршува со "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Неважечка низа: мора да вклучува "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Неважечка низа: мора да одгоара на патернот ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Грешен број: мора да биде делив со ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Непрепознаени клучеви" : "Непрепознаен клуч"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Грешен клуч во ${issue2.origin}`;
      case "invalid_union":
        return "Грешен внес";
      case "invalid_element":
        return `Грешна вредност во ${issue2.origin}`;
      default:
        return `Грешен внес`;
    }
  };
};
function mk_default() {
  return {
    localeError: error34()
  };
}
// node_modules/zod/v4/locales/ms.js
var error35 = () => {
  const Sizable = {
    string: { unit: "aksara", verb: "mempunyai" },
    file: { unit: "bait", verb: "mempunyai" },
    array: { unit: "elemen", verb: "mempunyai" },
    set: { unit: "elemen", verb: "mempunyai" },
    map: { unit: "elemen", verb: "mempunyai" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "alamat e-mel",
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
    datetime: "tarikh masa ISO",
    date: "tarikh ISO",
    time: "masa ISO",
    duration: "tempoh ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    mac: "alamat MAC",
    cidrv4: "julat IPv4",
    cidrv6: "julat IPv6",
    base64: "string dikodkan base64",
    base64url: "string dikodkan base64url",
    json_string: "string JSON",
    e164: "nombor E.164",
    credit_card: "nombor kad kredit",
    currency_code: "kod mata wang",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombor"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input tidak sah: dijangka instanceof ${issue2.expected}, diterima ${received}`;
        }
        return `Input tidak sah: dijangka ${expected}, diterima ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input tidak sah: dijangka ${stringifyPrimitive(issue2.values[0])}`;
        return `Pilihan tidak sah: dijangka salah satu daripada ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
        return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} adalah ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Terlalu kecil: dijangka ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Terlalu kecil: dijangka ${issue2.origin} adalah ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `String tidak sah: mesti bermula dengan "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `String tidak sah: mesti berakhir dengan "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `String tidak sah: mesti mengandungi "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} tidak sah`;
      }
      case "not_multiple_of":
        return `Nombor tidak sah: perlu gandaan ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak sah dalam ${issue2.origin}`;
      case "invalid_union":
        return "Input tidak sah";
      case "invalid_element":
        return `Nilai tidak sah dalam ${issue2.origin}`;
      default:
        return `Input tidak sah`;
    }
  };
};
function ms_default() {
  return {
    localeError: error35()
  };
}
// node_modules/zod/v4/locales/ne.js
var error36 = () => {
  const Sizable = {
    string: { unit: "अक्षर", verb: "हुनुपर्छ" },
    file: { unit: "बाइट", verb: "हुनुपर्छ" },
    array: { unit: "तत्व", verb: "हुनुपर्छ" },
    set: { unit: "तत्व", verb: "हुनुपर्छ" },
    map: { unit: "प्रविष्टि", verb: "हुनुपर्छ" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "इनपुट",
    email: "इमेल ठेगाना",
    url: "URL",
    emoji: "इमोजी",
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
    datetime: "ISO मिति र समय",
    date: "ISO मिति",
    time: "ISO समय",
    duration: "ISO अवधि",
    ipv4: "IPv4 ठेगाना",
    ipv6: "IPv6 ठेगाना",
    mac: "MAC ठेगाना",
    cidrv4: "IPv4 दायरा",
    cidrv6: "IPv6 दायरा",
    base64: "base64-इन्कोड गरिएको स्ट्रिङ",
    base64url: "base64url-इन्कोड गरिएको स्ट्रिङ",
    json_string: "JSON स्ट्रिङ",
    e164: "E.164 नम्बर",
    credit_card: "क्रेडिट कार्ड नम्बर",
    currency_code: "मुद्रा कोड",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "इनपुट"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `अमान्य इनपुट: अपेक्षित ${expected}, प्राप्त ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `अमान्य इनपुट: अपेक्षित ${stringifyPrimitive(issue2.values[0])}`;
        return `अमान्य विकल्प: अपेक्षित मानहरू मध्ये एक ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `धेरै ठूलो: ${issue2.origin ?? "मान"} मा ${adj}${issue2.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `धेरै ठूलो: ${issue2.origin ?? "मान"} ${adj}${issue2.maximum.toString()} हुनुपर्छ`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `धेरै सानो: ${issue2.origin} मा ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `धेरै सानो: ${issue2.origin} ${adj}${issue2.minimum.toString()} हुनुपर्छ`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `अमान्य स्ट्रिङ: "${_issue.prefix}" बाट सुरु हुनुपर्छ`;
        if (_issue.format === "ends_with")
          return `अमान्य स्ट्रिङ: "${_issue.suffix}" मा समाप्त हुनुपर्छ`;
        if (_issue.format === "includes")
          return `अमान्य स्ट्रिङ: "${_issue.includes}" समावेश हुनुपर्छ`;
        if (_issue.format === "regex")
          return `अमान्य स्ट्रिङ: ढाँचा ${_issue.pattern} सँग मेल खानुपर्छ`;
        return `अमान्य ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `अमान्य संख्या: ${issue2.divisor} को गुणज हुनुपर्छ`;
      case "unrecognized_keys":
        return `अपरिचित कुञ्जी${issue2.keys.length > 1 ? "हरू" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `अमान्य कुञ्जी: ${issue2.origin} मा`;
      case "invalid_union":
        if (issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0) {
          const opts = issue2.options.map((o) => `'${o}'`).join(" | ");
          return `अमान्य डिस्क्रिमिनेटर मान: अपेक्षित ${opts}`;
        }
        return "अमान्य इनपुट";
      case "invalid_element":
        return `अमान्य मान: ${issue2.origin} मा`;
      default:
        return `अमान्य इनपुट`;
    }
  };
};
function ne_default() {
  return {
    localeError: error36()
  };
}
// node_modules/zod/v4/locales/nl.js
var error37 = () => {
  const Sizable = {
    string: { unit: "tekens", verb: "heeft" },
    file: { unit: "bytes", verb: "heeft" },
    array: { unit: "elementen", verb: "heeft" },
    set: { unit: "elementen", verb: "heeft" },
    map: { unit: "elementen", verb: "heeft" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "invoer",
    email: "emailadres",
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
    datetime: "ISO datum en tijd",
    date: "ISO datum",
    time: "ISO tijd",
    duration: "ISO duur",
    ipv4: "IPv4-adres",
    ipv6: "IPv6-adres",
    mac: "MAC-adres",
    cidrv4: "IPv4-bereik",
    cidrv6: "IPv6-bereik",
    base64: "base64-gecodeerde tekst",
    base64url: "base64 URL-gecodeerde tekst",
    json_string: "JSON string",
    e164: "E.164-nummer",
    credit_card: "creditcardnummer",
    currency_code: "valutacode",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "invoer"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "getal"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ongeldige invoer: verwacht instanceof ${issue2.expected}, ontving ${received}`;
        }
        return `Ongeldige invoer: verwacht ${expected}, ontving ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ongeldige invoer: verwacht ${stringifyPrimitive(issue2.values[0])}`;
        return `Ongeldige optie: verwacht één van ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const longName = issue2.origin === "date" ? "laat" : issue2.origin === "string" ? "lang" : "groot";
        if (sizing)
          return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementen"} ${sizing.verb}`;
        return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} is`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const shortName = issue2.origin === "date" ? "vroeg" : issue2.origin === "string" ? "kort" : "klein";
        if (sizing) {
          return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        }
        return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} is`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
        }
        if (_issue.format === "ends_with")
          return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
        if (_issue.format === "includes")
          return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
        if (_issue.format === "regex")
          return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
        return `Ongeldig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ongeldig getal: moet een veelvoud van ${issue2.divisor} zijn`;
      case "unrecognized_keys":
        return `Onbekende key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ongeldige key in ${issue2.origin}`;
      case "invalid_union":
        return "Ongeldige invoer";
      case "invalid_element":
        return `Ongeldige waarde in ${issue2.origin}`;
      default:
        return `Ongeldige invoer`;
    }
  };
};
function nl_default() {
  return {
    localeError: error37()
  };
}
// node_modules/zod/v4/locales/nn.js
var error38 = () => {
  const Sizable = {
    string: { unit: "teikn", verb: "å ha" },
    file: { unit: "bytes", verb: "å ha" },
    array: { unit: "element", verb: "å innehalde" },
    set: { unit: "element", verb: "å innehalde" },
    map: { unit: "element", verb: "å innehalde" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "e-postadresse",
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
    datetime: "ISO dato- og klokkeslett",
    date: "ISO-dato",
    time: "ISO-klokkeslett",
    duration: "ISO-varigheit",
    ipv4: "IPv4-adresse",
    ipv6: "IPv6-adresse",
    mac: "MAC-adresse",
    cidrv4: "IPv4-spekter",
    cidrv6: "IPv6-spekter",
    base64: "base64-enkoda streng",
    base64url: "base64url-enkoda streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    credit_card: "kredittkortnummer",
    currency_code: "valutakode",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "tal",
    array: "liste"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ugyldig input: forventa instanceof ${issue2.expected}, fekk ${received}`;
        }
        return `Ugyldig input: forventa ${expected}, fekk ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ugyldig verdi: forventa ${stringifyPrimitive(issue2.values[0])}`;
        return `Ugyldig val: forventa eitt av ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `For stor(t): forventa ${issue2.origin ?? "value"} til å ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
        return `For stor(t): forventa ${issue2.origin ?? "value"} til å ha ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `For lite(n): forventa ${issue2.origin} til å ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `For lite(n): forventa ${issue2.origin} til å ha ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: må starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: må slutte med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: må innehalde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: må matche mønsteret ${_issue.pattern}`;
        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ugyldig tal: må vere eit multiplum av ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ukjende nøklar" : "Ukjend nøkkel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig nøkkel i ${issue2.origin}`;
      case "invalid_union":
        return "Ugyldig input";
      case "invalid_element":
        return `Ugyldig verdi i ${issue2.origin}`;
      default:
        return `Ugyldig input`;
    }
  };
};
function nn_default() {
  return {
    localeError: error38()
  };
}
// node_modules/zod/v4/locales/no.js
var error39 = () => {
  const Sizable = {
    string: { unit: "tegn", verb: "å ha" },
    file: { unit: "bytes", verb: "å ha" },
    array: { unit: "elementer", verb: "å inneholde" },
    set: { unit: "elementer", verb: "å inneholde" },
    map: { unit: "elementer", verb: "å inneholde" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "e-postadresse",
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
    datetime: "ISO dato- og klokkeslett",
    date: "ISO-dato",
    time: "ISO-klokkeslett",
    duration: "ISO-varighet",
    ipv4: "IPv4-adresse",
    ipv6: "IPv6-adresse",
    mac: "MAC-adresse",
    cidrv4: "IPv4-spekter",
    cidrv6: "IPv6-spekter",
    base64: "base64-enkodet streng",
    base64url: "base64url-enkodet streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    credit_card: "kredittkortnummer",
    currency_code: "valutakode",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "tall",
    array: "liste"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ugyldig input: forventet instanceof ${issue2.expected}, fikk ${received}`;
        }
        return `Ugyldig input: forventet ${expected}, fikk ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ugyldig verdi: forventet ${stringifyPrimitive(issue2.values[0])}`;
        return `Ugyldig valg: forventet en av ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `For stor(t): forventet ${issue2.origin ?? "value"} til å ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
        return `For stor(t): forventet ${issue2.origin ?? "value"} til å ha ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `For lite(n): forventet ${issue2.origin} til å ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `For lite(n): forventet ${issue2.origin} til å ha ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: må starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: må ende med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: må inneholde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: må matche mønsteret ${_issue.pattern}`;
        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ugyldig tall: må være et multiplum av ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ukjente nøkler" : "Ukjent nøkkel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig nøkkel i ${issue2.origin}`;
      case "invalid_union":
        return "Ugyldig input";
      case "invalid_element":
        return `Ugyldig verdi i ${issue2.origin}`;
      default:
        return `Ugyldig input`;
    }
  };
};
function no_default() {
  return {
    localeError: error39()
  };
}
// node_modules/zod/v4/locales/ota.js
var error40 = () => {
  const Sizable = {
    string: { unit: "harf", verb: "olmalıdır" },
    file: { unit: "bayt", verb: "olmalıdır" },
    array: { unit: "unsur", verb: "olmalıdır" },
    set: { unit: "unsur", verb: "olmalıdır" },
    map: { unit: "unsur", verb: "olmalıdır" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "giren",
    email: "epostagâh",
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
    datetime: "ISO hengâmı",
    date: "ISO tarihi",
    time: "ISO zamanı",
    duration: "ISO müddeti",
    ipv4: "IPv4 nişânı",
    ipv6: "IPv6 nişânı",
    mac: "MAC nişânı",
    cidrv4: "IPv4 menzili",
    cidrv6: "IPv6 menzili",
    base64: "base64-şifreli metin",
    base64url: "base64url-şifreli metin",
    json_string: "JSON metin",
    e164: "E.164 sayısı",
    credit_card: "i'tibâr kartı numarası",
    currency_code: "para birimi kodu",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "giren"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "numara",
    array: "saf",
    null: "gayb"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Fâsit giren: umulan instanceof ${issue2.expected}, alınan ${received}`;
        }
        return `Fâsit giren: umulan ${expected}, alınan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Fâsit giren: umulan ${stringifyPrimitive(issue2.values[0])}`;
        return `Fâsit tercih: mûteberler ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Fazla büyük: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmalıydı.`;
        return `Fazla büyük: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} olmalıydı.`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Fazla küçük: ${issue2.origin}, ${adj}${issue2.minimum.toString()} ${sizing.unit} sahip olmalıydı.`;
        }
        return `Fazla küçük: ${issue2.origin}, ${adj}${issue2.minimum.toString()} olmalıydı.`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Fâsit metin: "${_issue.prefix}" ile başlamalı.`;
        if (_issue.format === "ends_with")
          return `Fâsit metin: "${_issue.suffix}" ile bitmeli.`;
        if (_issue.format === "includes")
          return `Fâsit metin: "${_issue.includes}" ihtivâ etmeli.`;
        if (_issue.format === "regex")
          return `Fâsit metin: ${_issue.pattern} nakşına uymalı.`;
        return `Fâsit ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Fâsit sayı: ${issue2.divisor} katı olmalıydı.`;
      case "unrecognized_keys":
        return `Tanınmayan anahtar ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} için tanınmayan anahtar var.`;
      case "invalid_union":
        return "Giren tanınamadı.";
      case "invalid_element":
        return `${issue2.origin} için tanınmayan kıymet var.`;
      default:
        return `Kıymet tanınamadı.`;
    }
  };
};
function ota_default() {
  return {
    localeError: error40()
  };
}
// node_modules/zod/v4/locales/ps.js
var error41 = () => {
  const Sizable = {
    string: { unit: "توکي", verb: "ولري" },
    file: { unit: "بایټس", verb: "ولري" },
    array: { unit: "توکي", verb: "ولري" },
    set: { unit: "توکي", verb: "ولري" },
    map: { unit: "توکي", verb: "ولري" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ورودي",
    email: "بریښنالیک",
    url: "یو آر ال",
    emoji: "ایموجي",
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
    datetime: "نیټه او وخت",
    date: "نېټه",
    time: "وخت",
    duration: "موده",
    ipv4: "د IPv4 پته",
    ipv6: "د IPv6 پته",
    mac: "د MAC پته",
    cidrv4: "د IPv4 ساحه",
    cidrv6: "د IPv6 ساحه",
    base64: "base64-encoded متن",
    base64url: "base64url-encoded متن",
    json_string: "JSON متن",
    e164: "د E.164 شمېره",
    credit_card: "د کریډیټ کارت شمیره",
    currency_code: "د اسعارو کوډ",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "ورودي"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "عدد",
    array: "ارې"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `ناسم ورودي: باید instanceof ${issue2.expected} وای, مګر ${received} ترلاسه شو`;
        }
        return `ناسم ورودي: باید ${expected} وای, مګر ${received} ترلاسه شو`;
      }
      case "invalid_value":
        if (issue2.values.length === 1) {
          return `ناسم ورودي: باید ${stringifyPrimitive(issue2.values[0])} وای`;
        }
        return `ناسم انتخاب: باید یو له ${joinValues(issue2.values, "|")} څخه وای`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `ډیر لوی: ${issue2.origin ?? "ارزښت"} باید ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "عنصرونه"} ولري`;
        }
        return `ډیر لوی: ${issue2.origin ?? "ارزښت"} باید ${adj}${issue2.maximum.toString()} وي`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `ډیر کوچنی: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} ${sizing.unit} ولري`;
        }
        return `ډیر کوچنی: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} وي`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `ناسم متن: باید د "${_issue.prefix}" سره پیل شي`;
        }
        if (_issue.format === "ends_with") {
          return `ناسم متن: باید د "${_issue.suffix}" سره پای ته ورسيږي`;
        }
        if (_issue.format === "includes") {
          return `ناسم متن: باید "${_issue.includes}" ولري`;
        }
        if (_issue.format === "regex") {
          return `ناسم متن: باید د ${_issue.pattern} سره مطابقت ولري`;
        }
        return `${FormatDictionary[_issue.format] ?? issue2.format} ناسم دی`;
      }
      case "not_multiple_of":
        return `ناسم عدد: باید د ${issue2.divisor} مضرب وي`;
      case "unrecognized_keys":
        return `ناسم ${issue2.keys.length > 1 ? "کلیډونه" : "کلیډ"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `ناسم کلیډ په ${issue2.origin} کې`;
      case "invalid_union":
        return `ناسمه ورودي`;
      case "invalid_element":
        return `ناسم عنصر په ${issue2.origin} کې`;
      default:
        return `ناسمه ورودي`;
    }
  };
};
function ps_default() {
  return {
    localeError: error41()
  };
}
// node_modules/zod/v4/locales/pl.js
var error42 = () => {
  const Sizable = {
    string: { unit: "znaków", verb: "mieć" },
    file: { unit: "bajtów", verb: "mieć" },
    array: { unit: "elementów", verb: "mieć" },
    set: { unit: "elementów", verb: "mieć" },
    map: { unit: "elementów", verb: "mieć" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "wyrażenie",
    email: "adres email",
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
    datetime: "data i godzina w formacie ISO",
    date: "data w formacie ISO",
    time: "godzina w formacie ISO",
    duration: "czas trwania ISO",
    ipv4: "adres IPv4",
    ipv6: "adres IPv6",
    mac: "adres MAC",
    cidrv4: "zakres IPv4",
    cidrv6: "zakres IPv6",
    base64: "ciąg znaków zakodowany w formacie base64",
    base64url: "ciąg znaków zakodowany w formacie base64url",
    json_string: "ciąg znaków w formacie JSON",
    e164: "liczba E.164",
    credit_card: "numer karty kredytowej",
    currency_code: "kod waluty",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "wejście"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "liczba",
    array: "tablica"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Nieprawidłowe dane wejściowe: oczekiwano instanceof ${issue2.expected}, otrzymano ${received}`;
        }
        return `Nieprawidłowe dane wejściowe: oczekiwano ${expected}, otrzymano ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Nieprawidłowe dane wejściowe: oczekiwano ${stringifyPrimitive(issue2.values[0])}`;
        return `Nieprawidłowa opcja: oczekiwano jednej z wartości ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Za duża wartość: oczekiwano, że ${issue2.origin ?? "wartość"} będzie mieć ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementów"}`;
        }
        return `Zbyt duż(y/a/e): oczekiwano, że ${issue2.origin ?? "wartość"} będzie wynosić ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Za mała wartość: oczekiwano, że ${issue2.origin ?? "wartość"} będzie mieć ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "elementów"}`;
        }
        return `Zbyt mał(y/a/e): oczekiwano, że ${issue2.origin ?? "wartość"} będzie wynosić ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Nieprawidłowy ciąg znaków: musi zaczynać się od "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Nieprawidłowy ciąg znaków: musi kończyć się na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Nieprawidłowy ciąg znaków: musi zawierać "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Nieprawidłowy ciąg znaków: musi odpowiadać wzorcowi ${_issue.pattern}`;
        return `Nieprawidłow(y/a/e) ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nieprawidłowa liczba: musi być wielokrotnością ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nierozpoznane klucze${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Nieprawidłowy klucz w ${issue2.origin}`;
      case "invalid_union":
        return "Nieprawidłowe dane wejściowe";
      case "invalid_element":
        return `Nieprawidłowa wartość w ${issue2.origin}`;
      default:
        return `Nieprawidłowe dane wejściowe`;
    }
  };
};
function pl_default() {
  return {
    localeError: error42()
  };
}
// node_modules/zod/v4/locales/pt.js
var error43 = () => {
  const Sizable = {
    string: { unit: "caracteres" },
    file: { unit: "bytes" },
    array: { unit: "elementos" },
    set: { unit: "elementos" },
    map: { unit: "entradas" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "a entrada",
    email: "o endereço de e-mail",
    url: "o URL",
    emoji: "o emoji",
    uuid: "o UUID",
    uuidv4: "o UUIDv4",
    uuidv6: "o UUIDv6",
    nanoid: "o nanoid",
    guid: "o GUID",
    cuid: "o cuid",
    cuid2: "o cuid2",
    ulid: "o ULID",
    xid: "o XID",
    ksuid: "o KSUID",
    datetime: "a data e hora ISO",
    date: "a data ISO",
    time: "a hora ISO",
    duration: "a duração ISO",
    ipv4: "o endereço IPv4",
    ipv6: "o endereço IPv6",
    mac: "o endereço MAC",
    cidrv4: "o intervalo de endereços IPv4",
    cidrv6: "o intervalo de endereços IPv6",
    base64: "o texto codificado em base64",
    base64url: "o texto codificado em base64url",
    json_string: "o texto JSON",
    e164: "o número E.164",
    credit_card: "o número de cartão de crédito",
    currency_code: "o código de moeda",
    iban: "o IBAN",
    jwt: "o JWT",
    template_literal: "a entrada"
  };
  const Gender = {
    masculine: { definite: "o", indefinite: "um" },
    feminine: { definite: "a", indefinite: "uma" }
  };
  const TypeDictionary = {
    string: { name: "texto", articles: Gender.masculine },
    number: { name: "número", articles: Gender.masculine },
    int: { name: "número inteiro", articles: Gender.masculine },
    boolean: { name: "valor booleano", articles: Gender.masculine },
    bigint: { name: "número bigint", articles: Gender.masculine },
    symbol: { name: "símbolo", articles: Gender.masculine },
    undefined: { name: 'valor "undefined"', articles: Gender.masculine },
    null: { name: 'valor "nulo"', articles: Gender.masculine },
    never: { name: 'valor "never"', articles: Gender.masculine },
    void: { name: 'valor "void"', articles: Gender.masculine },
    date: { name: "data", articles: Gender.feminine },
    array: { name: "vetor", articles: Gender.masculine },
    object: { name: "objeto", articles: Gender.masculine },
    tuple: { name: "tuplo", articles: Gender.masculine },
    record: { name: "registo", articles: Gender.masculine },
    map: { name: "mapa", articles: Gender.masculine },
    set: { name: "conjunto", articles: Gender.masculine },
    file: { name: "ficheiro", articles: Gender.masculine },
    nonoptional: { name: "valor não opcional", articles: Gender.masculine },
    nan: { name: 'valor "NaN"', articles: Gender.masculine },
    function: { name: "função", articles: Gender.feminine }
  };
  function translateOriginWithArticle(type, articleType) {
    const translatedValue = TypeDictionary[type] ?? { name: `valor "${type}"`, articles: Gender.masculine };
    return `${translatedValue.articles[articleType]} ${translatedValue.name}`;
  }
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = translateOriginWithArticle(issue2.expected, "indefinite");
        const receivedType = parsedType(issue2.input);
        const received = translateOriginWithArticle(receivedType, "indefinite");
        return `Entrada inválida: esperava ${expected}, recebeu ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrada inválida: esperava ${stringifyPrimitive(issue2.values[0])}`;
        return `Opção inválida: esperava uma das seguintes opções: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Demasiado grande: esperava que ${translateOriginWithArticle(issue2.origin, "definite")} tivesse ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Demasiado grande: esperava que ${translateOriginWithArticle(issue2.origin, "definite")} fosse ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Demasiado pequeno: esperava que ${translateOriginWithArticle(issue2.origin, "definite")} tivesse ${adj} ${issue2.minimum.toString()} ${sizing.unit ?? "elementos"}`;
        }
        return `Demasiado pequeno: esperava que ${translateOriginWithArticle(issue2.origin, "definite")} fosse ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Texto inválido: deve começar por "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Texto inválido: deve terminar em "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Texto inválido: deve incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Texto inválido: deve corresponder ao padrão ${_issue.pattern}`;
        return `Formato d${FormatDictionary[_issue.format] ?? issue2.format} inválido`;
      }
      case "not_multiple_of":
        return `Número inválido: deve ser múltiplo de ${issue2.divisor}`;
      case "unrecognized_keys": {
        const plural = issue2.keys.length > 1 ? "s" : "";
        return `Chave${plural} inválida${plural}: ${joinValues(issue2.keys, ", ")}`;
      }
      case "invalid_key":
        return `Entrada inválida n${translateOriginWithArticle(issue2.origin, "definite")}`;
      case "invalid_union":
        if (issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0) {
          const opts = issue2.options.map((o) => `'${o}'`).join(" | ");
          return `Valor de discriminação inválido. Esperava ${opts}`;
        }
        return "Entrada inválida";
      case "invalid_element":
        return `Entrada inválida n${translateOriginWithArticle(issue2.origin, "definite")}`;
      default:
        return `Entrada inválida`;
    }
  };
};
function pt_default() {
  return {
    localeError: error43()
  };
}
// node_modules/zod/v4/locales/pt-BR.js
var error44 = () => {
  const Sizable = {
    string: { unit: "caracteres" },
    file: { unit: "bytes" },
    array: { unit: "elementos" },
    set: { unit: "elementos" },
    map: { unit: "entradas" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "a entrada",
    email: "o endereço de e-mail",
    url: "o URL",
    emoji: "o emoji",
    uuid: "o UUID",
    uuidv4: "o UUIDv4",
    uuidv6: "o UUIDv6",
    nanoid: "o nanoid",
    guid: "o GUID",
    cuid: "o cuid",
    cuid2: "o cuid2",
    ulid: "o ULID",
    xid: "o XID",
    ksuid: "o KSUID",
    datetime: "a data e hora ISO",
    date: "a data ISO",
    time: "a hora ISO",
    duration: "a duração ISO",
    ipv4: "o endereço IPv4",
    ipv6: "o endereço IPv6",
    mac: "o endereço MAC",
    cidrv4: "a faixa de endereços IPv4",
    cidrv6: "a faixa de endereços IPv6",
    base64: "o texto codificado em base64",
    base64url: "o texto codificado em base64url",
    json_string: "o texto JSON",
    e164: "o número E.164",
    credit_card: "o número de cartão de crédito",
    currency_code: "o código de moeda",
    iban: "o IBAN",
    jwt: "o JWT",
    template_literal: "a entrada"
  };
  const Gender = {
    masculine: { definite: "o", indefinite: "um" },
    feminine: { definite: "a", indefinite: "uma" }
  };
  const TypeDictionary = {
    string: { name: "texto", articles: Gender.masculine },
    number: { name: "número", articles: Gender.masculine },
    int: { name: "número inteiro", articles: Gender.masculine },
    boolean: { name: "valor booleano", articles: Gender.masculine },
    bigint: { name: "número bigint", articles: Gender.masculine },
    symbol: { name: "símbolo", articles: Gender.masculine },
    undefined: { name: 'valor "undefined"', articles: Gender.masculine },
    null: { name: 'valor "nulo"', articles: Gender.masculine },
    never: { name: 'valor "never"', articles: Gender.masculine },
    void: { name: 'valor "void"', articles: Gender.masculine },
    date: { name: "data", articles: Gender.feminine },
    array: { name: "vetor", articles: Gender.masculine },
    object: { name: "objeto", articles: Gender.masculine },
    tuple: { name: "tupla", articles: Gender.feminine },
    record: { name: "registro", articles: Gender.masculine },
    map: { name: "mapa", articles: Gender.masculine },
    set: { name: "conjunto", articles: Gender.masculine },
    file: { name: "arquivo", articles: Gender.masculine },
    nonoptional: { name: "valor não opcional", articles: Gender.masculine },
    nan: { name: 'valor "NaN"', articles: Gender.masculine },
    function: { name: "função", articles: Gender.feminine }
  };
  function translateOriginWithArticle(type, articleType) {
    const translatedValue = TypeDictionary[type] ?? { name: `valor "${type}"`, articles: Gender.masculine };
    return `${translatedValue.articles[articleType]} ${translatedValue.name}`;
  }
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = translateOriginWithArticle(issue2.expected, "indefinite");
        const receivedType = parsedType(issue2.input);
        const received = translateOriginWithArticle(receivedType, "indefinite");
        return `Entrada inválida: esperava ${expected}, recebeu ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrada inválida: esperava ${stringifyPrimitive(issue2.values[0])}`;
        return `Opção inválida: esperava uma das seguintes opções: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Grande demais: esperava que ${translateOriginWithArticle(issue2.origin, "definite")} tivesse ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Grande demais: esperava que ${translateOriginWithArticle(issue2.origin, "definite")} fosse ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Pequeno demais: esperava que ${translateOriginWithArticle(issue2.origin, "definite")} tivesse ${adj} ${issue2.minimum.toString()} ${sizing.unit ?? "elementos"}`;
        }
        return `Pequeno demais: esperava que ${translateOriginWithArticle(issue2.origin, "definite")} fosse ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Texto inválido: deve começar com "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Texto inválido: deve terminar com "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Texto inválido: deve incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Texto inválido: deve corresponder ao padrão ${_issue.pattern}`;
        return `Formato d${FormatDictionary[_issue.format] ?? issue2.format} inválido`;
      }
      case "not_multiple_of":
        return `Número inválido: deve ser múltiplo de ${issue2.divisor}`;
      case "unrecognized_keys": {
        const plural = issue2.keys.length > 1 ? "s" : "";
        return `Chave${plural} inválida${plural}: ${joinValues(issue2.keys, ", ")}`;
      }
      case "invalid_key":
        return `Entrada inválida n${translateOriginWithArticle(issue2.origin, "definite")}`;
      case "invalid_union":
        if (issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0) {
          const opts = issue2.options.map((o) => `'${o}'`).join(" | ");
          return `Valor de discriminação inválido. Esperava ${opts}`;
        }
        return "Entrada inválida";
      case "invalid_element":
        return `Entrada inválida n${translateOriginWithArticle(issue2.origin, "definite")}`;
      default:
        return `Entrada inválida`;
    }
  };
};
function pt_BR_default() {
  return {
    localeError: error44()
  };
}
// node_modules/zod/v4/locales/ro.js
var error45 = () => {
  const Sizable = {
    string: { unit: "caractere", verb: "să aibă" },
    file: { unit: "octeți", verb: "să aibă" },
    array: { unit: "elemente", verb: "să aibă" },
    set: { unit: "elemente", verb: "să aibă" },
    map: { unit: "intrări", verb: "să aibă" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "intrare",
    email: "adresă de email",
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
    datetime: "dată și oră ISO",
    date: "dată ISO",
    time: "oră ISO",
    duration: "durată ISO",
    ipv4: "adresă IPv4",
    ipv6: "adresă IPv6",
    mac: "adresă MAC",
    cidrv4: "interval IPv4",
    cidrv6: "interval IPv6",
    base64: "șir codat base64",
    base64url: "șir codat base64url",
    json_string: "șir JSON",
    e164: "număr E.164",
    credit_card: "număr de card de credit",
    currency_code: "cod valutar",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "intrare"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "șir",
    number: "număr",
    boolean: "boolean",
    function: "funcție",
    array: "matrice",
    object: "obiect",
    undefined: "nedefinit",
    symbol: "simbol",
    bigint: "număr mare",
    void: "void",
    never: "never",
    map: "hartă",
    set: "set"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `Intrare invalidă: așteptat ${expected}, primit ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Intrare invalidă: așteptat ${stringifyPrimitive(issue2.values[0])}`;
        return `Opțiune invalidă: așteptat una dintre ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Prea mare: așteptat ca ${issue2.origin ?? "valoarea"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemente"}`;
        return `Prea mare: așteptat ca ${issue2.origin ?? "valoarea"} să fie ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Prea mic: așteptat ca ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Prea mic: așteptat ca ${issue2.origin} să fie ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Șir invalid: trebuie să înceapă cu "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Șir invalid: trebuie să se termine cu "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Șir invalid: trebuie să includă "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Șir invalid: trebuie să se potrivească cu modelul ${_issue.pattern}`;
        return `Format invalid: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Număr invalid: trebuie să fie multiplu de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Chei nerecunoscute: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Cheie invalidă în ${issue2.origin}`;
      case "invalid_union":
        return "Intrare invalidă";
      case "invalid_element":
        return `Valoare invalidă în ${issue2.origin}`;
      default:
        return `Intrare invalidă`;
    }
  };
};
function ro_default() {
  return {
    localeError: error45()
  };
}
// node_modules/zod/v4/locales/ru.js
function getRussianPlural(count, one, few, many) {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
var error46 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "символ",
        few: "символа",
        many: "символов"
      },
      verb: "иметь"
    },
    file: {
      unit: {
        one: "байт",
        few: "байта",
        many: "байт"
      },
      verb: "иметь"
    },
    array: {
      unit: {
        one: "элемент",
        few: "элемента",
        many: "элементов"
      },
      verb: "иметь"
    },
    set: {
      unit: {
        one: "элемент",
        few: "элемента",
        many: "элементов"
      },
      verb: "иметь"
    },
    map: {
      unit: {
        one: "элемент",
        few: "элемента",
        many: "элементов"
      },
      verb: "иметь"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ввод",
    email: "email адрес",
    url: "URL",
    emoji: "эмодзи",
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
    datetime: "ISO дата и время",
    date: "ISO дата",
    time: "ISO время",
    duration: "ISO длительность",
    ipv4: "IPv4 адрес",
    ipv6: "IPv6 адрес",
    mac: "MAC адрес",
    cidrv4: "IPv4 диапазон",
    cidrv6: "IPv6 диапазон",
    base64: "строка в формате base64",
    base64url: "строка в формате base64url",
    json_string: "JSON строка",
    e164: "номер E.164",
    credit_card: "номер кредитной карты",
    currency_code: "код валюты",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "ввод"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "число",
    array: "массив"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Неверный ввод: ожидалось instanceof ${issue2.expected}, получено ${received}`;
        }
        return `Неверный ввод: ожидалось ${expected}, получено ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Неверный ввод: ожидалось ${stringifyPrimitive(issue2.values[0])}`;
        return `Неверный вариант: ожидалось одно из ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getRussianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Слишком большое значение: ожидалось, что ${issue2.origin ?? "значение"} будет иметь ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `Слишком большое значение: ожидалось, что ${issue2.origin ?? "значение"} будет ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getRussianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Слишком маленькое значение: ожидалось, что ${issue2.origin} будет иметь ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `Слишком маленькое значение: ожидалось, что ${issue2.origin} будет ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Неверная строка: должна начинаться с "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Неверная строка: должна заканчиваться на "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Неверная строка: должна содержать "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Неверная строка: должна соответствовать шаблону ${_issue.pattern}`;
        return `Неверный ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Неверное число: должно быть кратным ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Нераспознанн${issue2.keys.length > 1 ? "ые" : "ый"} ключ${issue2.keys.length > 1 ? "и" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Неверный ключ в ${issue2.origin}`;
      case "invalid_union":
        return "Неверные входные данные";
      case "invalid_element":
        return `Неверное значение в ${issue2.origin}`;
      default:
        return `Неверные входные данные`;
    }
  };
};
function ru_default() {
  return {
    localeError: error46()
  };
}
// node_modules/zod/v4/locales/sk.js
var error47 = () => {
  const Sizable = {
    string: { unit: "znakov", verb: "mať" },
    file: { unit: "bajtov", verb: "mať" },
    array: { unit: "prvkov", verb: "mať" },
    set: { unit: "prvkov", verb: "mať" },
    map: { unit: "položiek", verb: "mať" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "regulárny výraz",
    email: "e-mailová adresa",
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
    datetime: "dátum a čas vo formáte ISO",
    date: "dátum vo formáte ISO",
    time: "čas vo formáte ISO",
    duration: "doba trvania ISO",
    ipv4: "IPv4 adresa",
    ipv6: "IPv6 adresa",
    mac: "MAC adresa",
    cidrv4: "rozsah IPv4",
    cidrv6: "rozsah IPv6",
    base64: "reťazec zakódovaný vo formáte base64",
    base64url: "reťazec zakódovaný vo formáte base64url",
    json_string: "reťazec vo formáte JSON",
    e164: "číslo E.164",
    credit_card: "číslo kreditnej karty",
    currency_code: "kód meny",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "vstup"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "číslo",
    string: "reťazec",
    function: "funkcia",
    array: "pole"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Neplatný vstup: očakávané instanceof ${issue2.expected}, obdržané ${received}`;
        }
        return `Neplatný vstup: očakávané ${expected}, obdržané ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neplatný vstup: očakávané ${stringifyPrimitive(issue2.values[0])}`;
        return `Neplatný vstup: očakávaná jedna z hodnôt ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Hodnota je príliš veľká: ${issue2.origin ?? "hodnota"} musí mať ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "prvkov"}`;
        }
        return `Hodnota je príliš veľká: ${issue2.origin ?? "hodnota"} musí byť ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Hodnota je príliš malá: ${issue2.origin ?? "hodnota"} musí mať ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "prvkov"}`;
        }
        return `Hodnota je príliš malá: ${issue2.origin ?? "hodnota"} musí byť ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Neplatný reťazec: musí začínať na "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Neplatný reťazec: musí končiť na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neplatný reťazec: musí obsahovať "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neplatný reťazec: musí zodpovedať vzoru ${_issue.pattern}`;
        return `Neplatný formát ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neplatné číslo: musí byť násobkom ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Neznáme klúče: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neplatný klúč v ${issue2.origin}`;
      case "invalid_union":
        return "Neplatný vstup";
      case "invalid_element":
        return `Neplatná hodnota v ${issue2.origin}`;
      default:
        return `Neplatný vstup`;
    }
  };
};
function sk_default() {
  return {
    localeError: error47()
  };
}
// node_modules/zod/v4/locales/sl.js
var error48 = () => {
  const Sizable = {
    string: { unit: "znakov", verb: "imeti" },
    file: { unit: "bajtov", verb: "imeti" },
    array: { unit: "elementov", verb: "imeti" },
    set: { unit: "elementov", verb: "imeti" },
    map: { unit: "elementov", verb: "imeti" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "vnos",
    email: "e-poštni naslov",
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
    datetime: "ISO datum in čas",
    date: "ISO datum",
    time: "ISO čas",
    duration: "ISO trajanje",
    ipv4: "IPv4 naslov",
    ipv6: "IPv6 naslov",
    mac: "MAC naslov",
    cidrv4: "obseg IPv4",
    cidrv6: "obseg IPv6",
    base64: "base64 kodiran niz",
    base64url: "base64url kodiran niz",
    json_string: "JSON niz",
    e164: "E.164 številka",
    credit_card: "številka kreditne kartice",
    currency_code: "koda valute",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "vnos"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "število",
    array: "tabela"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Neveljaven vnos: pričakovano instanceof ${issue2.expected}, prejeto ${received}`;
        }
        return `Neveljaven vnos: pričakovano ${expected}, prejeto ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neveljaven vnos: pričakovano ${stringifyPrimitive(issue2.values[0])}`;
        return `Neveljavna možnost: pričakovano eno izmed ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Preveliko: pričakovano, da bo ${issue2.origin ?? "vrednost"} imelo ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementov"}`;
        return `Preveliko: pričakovano, da bo ${issue2.origin ?? "vrednost"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Premajhno: pričakovano, da bo ${issue2.origin} imelo ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Premajhno: pričakovano, da bo ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Neveljaven niz: mora se začeti z "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Neveljaven niz: mora se končati z "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neveljaven niz: mora vsebovati "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}`;
        return `Neveljaven ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neveljavno število: mora biti večkratnik ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Neprepoznan${issue2.keys.length > 1 ? "i ključi" : " ključ"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neveljaven ključ v ${issue2.origin}`;
      case "invalid_union":
        return "Neveljaven vnos";
      case "invalid_element":
        return `Neveljavna vrednost v ${issue2.origin}`;
      default:
        return "Neveljaven vnos";
    }
  };
};
function sl_default() {
  return {
    localeError: error48()
  };
}
// node_modules/zod/v4/locales/sv.js
var error49 = () => {
  const Sizable = {
    string: { unit: "tecken", verb: "att ha" },
    file: { unit: "bytes", verb: "att ha" },
    array: { unit: "objekt", verb: "att innehålla" },
    set: { unit: "objekt", verb: "att innehålla" },
    map: { unit: "objekt", verb: "att innehålla" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "reguljärt uttryck",
    email: "e-postadress",
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
    datetime: "ISO-datum och tid",
    date: "ISO-datum",
    time: "ISO-tid",
    duration: "ISO-varaktighet",
    ipv4: "IPv4-adress",
    ipv6: "IPv6-adress",
    mac: "MAC-adress",
    cidrv4: "IPv4-spektrum",
    cidrv6: "IPv6-spektrum",
    base64: "base64-kodad sträng",
    base64url: "base64url-kodad sträng",
    json_string: "JSON-sträng",
    e164: "E.164-nummer",
    credit_card: "kreditkortsnummer",
    currency_code: "valutakod",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "mall-literal"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "antal",
    array: "lista"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ogiltig inmatning: förväntat instanceof ${issue2.expected}, fick ${received}`;
        }
        return `Ogiltig inmatning: förväntat ${expected}, fick ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ogiltig inmatning: förväntat ${stringifyPrimitive(issue2.values[0])}`;
        return `Ogiltigt val: förväntade en av ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `För stor(t): förväntade ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
        }
        return `För stor(t): förväntat ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `För lite(t): förväntade ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `För lite(t): förväntade ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ogiltig sträng: måste börja med "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Ogiltig sträng: måste sluta med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ogiltig sträng: måste innehålla "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ogiltig sträng: måste matcha mönstret "${_issue.pattern}"`;
        return `Ogiltig(t) ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ogiltigt tal: måste vara en multipel av ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Okända nycklar" : "Okänd nyckel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ogiltig nyckel i ${issue2.origin ?? "värdet"}`;
      case "invalid_union":
        return "Ogiltig input";
      case "invalid_element":
        return `Ogiltigt värde i ${issue2.origin ?? "värdet"}`;
      default:
        return `Ogiltig input`;
    }
  };
};
function sv_default() {
  return {
    localeError: error49()
  };
}
// node_modules/zod/v4/locales/ta.js
var error50 = () => {
  const Sizable = {
    string: { unit: "எழுத்துக்கள்", verb: "கொண்டிருக்க வேண்டும்" },
    file: { unit: "பைட்டுகள்", verb: "கொண்டிருக்க வேண்டும்" },
    array: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
    set: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
    map: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "உள்ளீடு",
    email: "மின்னஞ்சல் முகவரி",
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
    datetime: "ISO தேதி நேரம்",
    date: "ISO தேதி",
    time: "ISO நேரம்",
    duration: "ISO கால அளவு",
    ipv4: "IPv4 முகவரி",
    ipv6: "IPv6 முகவரி",
    mac: "MAC முகவரி",
    cidrv4: "IPv4 வரம்பு",
    cidrv6: "IPv6 வரம்பு",
    base64: "base64-encoded சரம்",
    base64url: "base64url-encoded சரம்",
    json_string: "JSON சரம்",
    e164: "E.164 எண்",
    credit_card: "கடன் அட்டை எண்",
    currency_code: "நாணயக் குறியீடு",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "எண்",
    array: "அணி",
    null: "வெறுமை"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது instanceof ${issue2.expected}, பெறப்பட்டது ${received}`;
        }
        return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${expected}, பெறப்பட்டது ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${stringifyPrimitive(issue2.values[0])}`;
        return `தவறான விருப்பம்: எதிர்பார்க்கப்பட்டது ${joinValues(issue2.values, "|")} இல் ஒன்று`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue2.origin ?? "மதிப்பு"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "உறுப்புகள்"} ஆக இருக்க வேண்டும்`;
        }
        return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue2.origin ?? "மதிப்பு"} ${adj}${issue2.maximum.toString()} ஆக இருக்க வேண்டும்`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ஆக இருக்க வேண்டும்`;
        }
        return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue2.origin} ${adj}${issue2.minimum.toString()} ஆக இருக்க வேண்டும்`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `தவறான சரம்: "${_issue.prefix}" இல் தொடங்க வேண்டும்`;
        if (_issue.format === "ends_with")
          return `தவறான சரம்: "${_issue.suffix}" இல் முடிவடைய வேண்டும்`;
        if (_issue.format === "includes")
          return `தவறான சரம்: "${_issue.includes}" ஐ உள்ளடக்க வேண்டும்`;
        if (_issue.format === "regex")
          return `தவறான சரம்: ${_issue.pattern} முறைபாட்டுடன் பொருந்த வேண்டும்`;
        return `தவறான ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `தவறான எண்: ${issue2.divisor} இன் பலமாக இருக்க வேண்டும்`;
      case "unrecognized_keys":
        return `அடையாளம் தெரியாத விசை${issue2.keys.length > 1 ? "கள்" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} இல் தவறான விசை`;
      case "invalid_union":
        return "தவறான உள்ளீடு";
      case "invalid_element":
        return `${issue2.origin} இல் தவறான மதிப்பு`;
      default:
        return `தவறான உள்ளீடு`;
    }
  };
};
function ta_default() {
  return {
    localeError: error50()
  };
}
// node_modules/zod/v4/locales/tg.js
var error51 = () => {
  const Sizable = {
    string: { unit: "аломат", verb: "дошта бошад" },
    file: { unit: "байт", verb: "дошта бошад" },
    array: { unit: "унсур", verb: "дошта бошад" },
    set: { unit: "унсур", verb: "дошта бошад" },
    map: { unit: "сабт", verb: "дошта бошад" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "вуруд",
    email: "суроғаи email",
    url: "URL",
    emoji: "эмоҷи",
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
    datetime: "санаву вақти ISO",
    date: "санаи ISO",
    time: "вақти ISO",
    duration: "давомнокии ISO",
    ipv4: "суроғаи IPv4",
    ipv6: "суроғаи IPv6",
    mac: "суроғаи MAC",
    cidrv4: "маҳдудаи IPv4",
    cidrv6: "маҳдудаи IPv6",
    base64: "сатри дар формати base64",
    base64url: "сатри дар формати base64url",
    json_string: "сатри JSON",
    e164: "рақами E.164",
    credit_card: "рақами корти кредитӣ",
    currency_code: "рамзи асъор",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "вуруд"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "рақам",
    string: "сатр",
    array: "массив",
    object: "объект",
    date: "сана"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `Вуруди нодуруст: ${expected} интизор мерафт, ${received} гирифта шуд`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Вуруди нодуруст: ${stringifyPrimitive(issue2.values[0])} интизор мерафт`;
        return `Интихоби нодуруст: яке аз ${joinValues(issue2.values, "|")} интизор мерафт`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Хеле калон: ${issue2.origin ?? "қимат"} бояд ${adj}${issue2.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `Хеле калон: ${issue2.origin ?? "қимат"} бояд ${adj}${issue2.maximum.toString()} бошад`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Хеле хурд: ${issue2.origin} бояд ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `Хеле хурд: ${issue2.origin} бояд ${adj}${issue2.minimum.toString()} бошад`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Сатри нодуруст: бояд бо "${_issue.prefix}" оғоз шавад`;
        if (_issue.format === "ends_with")
          return `Сатри нодуруст: бояд бо "${_issue.suffix}" анҷом ёбад`;
        if (_issue.format === "includes")
          return `Сатри нодуруст: бояд "${_issue.includes}"-ро дар бар гирад`;
        if (_issue.format === "regex")
          return `Сатри нодуруст: бояд ба намунаи ${_issue.pattern} мувофиқат кунад`;
        return `${FormatDictionary[_issue.format] ?? issue2.format}-и нодуруст`;
      }
      case "not_multiple_of":
        return `Рақами нодуруст: бояд ба ${issue2.divisor} бе бақия тақсим шавад`;
      case "unrecognized_keys":
        return `Калид${issue2.keys.length > 1 ? "ҳои" : "и"} номаълум: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Калиди нодуруст дар ${issue2.origin}`;
      case "invalid_union":
        if (issue2.options && Array.isArray(issue2.options) && issue2.options.length > 0) {
          const opts = issue2.options.map((o) => `'${o}'`).join(" | ");
          return `Қимати нодурусти дискриминатор: ${opts} интизор мерафт`;
        }
        return "Вуруди нодуруст";
      case "invalid_element":
        return `Қимати нодуруст дар ${issue2.origin}`;
      default:
        return `Вуруди нодуруст`;
    }
  };
};
function tg_default() {
  return {
    localeError: error51()
  };
}
// node_modules/zod/v4/locales/th.js
var error52 = () => {
  const Sizable = {
    string: { unit: "ตัวอักษร", verb: "ควรมี" },
    file: { unit: "ไบต์", verb: "ควรมี" },
    array: { unit: "รายการ", verb: "ควรมี" },
    set: { unit: "รายการ", verb: "ควรมี" },
    map: { unit: "รายการ", verb: "ควรมี" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ข้อมูลที่ป้อน",
    email: "ที่อยู่อีเมล",
    url: "URL",
    emoji: "อิโมจิ",
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
    datetime: "วันที่เวลาแบบ ISO",
    date: "วันที่แบบ ISO",
    time: "เวลาแบบ ISO",
    duration: "ช่วงเวลาแบบ ISO",
    ipv4: "ที่อยู่ IPv4",
    ipv6: "ที่อยู่ IPv6",
    mac: "ที่อยู่ MAC",
    cidrv4: "ช่วง IP แบบ IPv4",
    cidrv6: "ช่วง IP แบบ IPv6",
    base64: "ข้อความแบบ Base64",
    base64url: "ข้อความแบบ Base64 สำหรับ URL",
    json_string: "ข้อความแบบ JSON",
    e164: "เบอร์โทรศัพท์ระหว่างประเทศ (E.164)",
    credit_card: "หมายเลขบัตรเครดิต",
    currency_code: "รหัสสกุลเงิน",
    iban: "IBAN",
    jwt: "โทเคน JWT",
    template_literal: "ข้อมูลที่ป้อน"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "ตัวเลข",
    array: "อาร์เรย์ (Array)",
    null: "ไม่มีค่า (null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น instanceof ${issue2.expected} แต่ได้รับ ${received}`;
        }
        return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น ${expected} แต่ได้รับ ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `ค่าไม่ถูกต้อง: ควรเป็น ${stringifyPrimitive(issue2.values[0])}`;
        return `ตัวเลือกไม่ถูกต้อง: ควรเป็นหนึ่งใน ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "ไม่เกิน" : "น้อยกว่า";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `เกินกำหนด: ${issue2.origin ?? "ค่า"} ควรมี${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "รายการ"}`;
        return `เกินกำหนด: ${issue2.origin ?? "ค่า"} ควรมี${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "อย่างน้อย" : "มากกว่า";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `น้อยกว่ากำหนด: ${issue2.origin} ควรมี${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `น้อยกว่ากำหนด: ${issue2.origin} ควรมี${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `รูปแบบไม่ถูกต้อง: ข้อความต้องขึ้นต้นด้วย "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `รูปแบบไม่ถูกต้อง: ข้อความต้องลงท้ายด้วย "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `รูปแบบไม่ถูกต้อง: ข้อความต้องมี "${_issue.includes}" อยู่ในข้อความ`;
        if (_issue.format === "regex")
          return `รูปแบบไม่ถูกต้อง: ต้องตรงกับรูปแบบที่กำหนด ${_issue.pattern}`;
        return `รูปแบบไม่ถูกต้อง: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `ตัวเลขไม่ถูกต้อง: ต้องเป็นจำนวนที่หารด้วย ${issue2.divisor} ได้ลงตัว`;
      case "unrecognized_keys":
        return `พบคีย์ที่ไม่รู้จัก: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `คีย์ไม่ถูกต้องใน ${issue2.origin}`;
      case "invalid_union":
        return "ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้";
      case "invalid_element":
        return `ข้อมูลไม่ถูกต้องใน ${issue2.origin}`;
      default:
        return `ข้อมูลไม่ถูกต้อง`;
    }
  };
};
function th_default() {
  return {
    localeError: error52()
  };
}
// node_modules/zod/v4/locales/tk.js
var error53 = () => {
  const Sizable = {
    string: { unit: "simwol", verb: "bolmaly" },
    file: { unit: "baýt", verb: "bolmaly" },
    array: { unit: "elementler", verb: "bolmaly" },
    set: { unit: "elementler", verb: "bolmaly" },
    map: { unit: "elementler", verb: "bolmaly" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "giriş",
    email: "e-poçta salgysy",
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
    datetime: "ISO sene we wagt",
    date: "ISO sene",
    time: "ISO wagt",
    duration: "ISO wagt aralygy",
    ipv4: "IPv4 salgysy",
    ipv6: "IPv6 salgysy",
    mac: "MAC salgysy",
    cidrv4: "IPv4 aralygy",
    cidrv6: "IPv6 aralygy",
    base64: "base64 bilen şifrlenen setir",
    base64url: "base64url bilen şifrlenen setir",
    json_string: "JSON setiri",
    e164: "E.164 nomeri",
    credit_card: "kredit kartynyň nomeri",
    currency_code: "walýuta kody",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "şablon"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `Nädogry baha: garaşylan ${expected} ýerine ${received} alyndy`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Nädogry baha: ${stringifyPrimitive(issue2.values[0])} bolmaly`;
        return `Nädogry saýlaw: aşakdakylardan biri bolmaly: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Has uly: garaşylýan ${issue2.origin ?? "baha"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
        return `Has uly: garaşylýan ${issue2.origin ?? "baha"} ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Has kiçi: garaşylýan ${issue2.origin} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        return `Has kiçi: garaşylýan ${issue2.origin} ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Nädogry setir: "${_issue.prefix}" bilen başlamaly`;
        if (_issue.format === "ends_with")
          return `Nädogry setir: "${_issue.suffix}" bilen gutarmaly`;
        if (_issue.format === "includes")
          return `Nädogry setir: "${_issue.includes}" saklamaly`;
        if (_issue.format === "regex")
          return `Nädogry setir: ${_issue.pattern} nusga laýyk bolmaly`;
        return `Nädogry ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nädogry san: ${issue2.divisor} bilen galyndysyz bölünmeli`;
      case "unrecognized_keys":
        return `Tanalmaýan açar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} içinde nädogry açar`;
      case "invalid_union":
        return "Nädogry baha";
      case "invalid_element":
        return `${issue2.origin} içinde nädogry baha`;
      default:
        return `Nädogry baha`;
    }
  };
};
function tk_default() {
  return {
    localeError: error53()
  };
}
// node_modules/zod/v4/locales/tr.js
var error54 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "olmalı" },
    file: { unit: "bayt", verb: "olmalı" },
    array: { unit: "öğe", verb: "olmalı" },
    set: { unit: "öğe", verb: "olmalı" },
    map: { unit: "öğe", verb: "olmalı" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "girdi",
    email: "e-posta adresi",
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
    datetime: "ISO tarih ve saat",
    date: "ISO tarih",
    time: "ISO saat",
    duration: "ISO süre",
    ipv4: "IPv4 adresi",
    ipv6: "IPv6 adresi",
    mac: "MAC adresi",
    cidrv4: "IPv4 aralığı",
    cidrv6: "IPv6 aralığı",
    base64: "base64 ile şifrelenmiş metin",
    base64url: "base64url ile şifrelenmiş metin",
    json_string: "JSON dizesi",
    e164: "E.164 sayısı",
    credit_card: "kredi kartı numarası",
    currency_code: "para birimi kodu",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "Şablon dizesi"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Geçersiz değer: beklenen instanceof ${issue2.expected}, alınan ${received}`;
        }
        return `Geçersiz değer: beklenen ${expected}, alınan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Geçersiz değer: beklenen ${stringifyPrimitive(issue2.values[0])}`;
        return `Geçersiz seçenek: aşağıdakilerden biri olmalı: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Çok büyük: beklenen ${issue2.origin ?? "değer"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "öğe"}`;
        return `Çok büyük: beklenen ${issue2.origin ?? "değer"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Çok küçük: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        return `Çok küçük: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Geçersiz metin: "${_issue.prefix}" ile başlamalı`;
        if (_issue.format === "ends_with")
          return `Geçersiz metin: "${_issue.suffix}" ile bitmeli`;
        if (_issue.format === "includes")
          return `Geçersiz metin: "${_issue.includes}" içermeli`;
        if (_issue.format === "regex")
          return `Geçersiz metin: ${_issue.pattern} desenine uymalı`;
        return `Geçersiz ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Geçersiz sayı: ${issue2.divisor} ile tam bölünebilmeli`;
      case "unrecognized_keys":
        return `Tanınmayan anahtar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} içinde geçersiz anahtar`;
      case "invalid_union":
        return "Geçersiz değer";
      case "invalid_element":
        return `${issue2.origin} içinde geçersiz değer`;
      default:
        return `Geçersiz değer`;
    }
  };
};
function tr_default() {
  return {
    localeError: error54()
  };
}
// node_modules/zod/v4/locales/uk.js
var error55 = () => {
  const Sizable = {
    string: { unit: "символів", verb: "матиме" },
    file: { unit: "байтів", verb: "матиме" },
    array: { unit: "елементів", verb: "матиме" },
    set: { unit: "елементів", verb: "матиме" },
    map: { unit: "елементів", verb: "матиме" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "вхідні дані",
    email: "адреса електронної пошти",
    url: "URL",
    emoji: "емодзі",
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
    datetime: "дата та час ISO",
    date: "дата ISO",
    time: "час ISO",
    duration: "тривалість ISO",
    ipv4: "адреса IPv4",
    ipv6: "адреса IPv6",
    mac: "адреса MAC",
    cidrv4: "діапазон IPv4",
    cidrv6: "діапазон IPv6",
    base64: "рядок у кодуванні base64",
    base64url: "рядок у кодуванні base64url",
    json_string: "рядок JSON",
    e164: "номер E.164",
    credit_card: "номер кредитної картки",
    currency_code: "код валюти",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "вхідні дані"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "число",
    array: "масив"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Неправильні вхідні дані: очікується instanceof ${issue2.expected}, отримано ${received}`;
        }
        return `Неправильні вхідні дані: очікується ${expected}, отримано ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Неправильні вхідні дані: очікується ${stringifyPrimitive(issue2.values[0])}`;
        return `Неправильна опція: очікується одне з ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Занадто велике: очікується, що ${issue2.origin ?? "значення"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "елементів"}`;
        return `Занадто велике: очікується, що ${issue2.origin ?? "значення"} буде ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Занадто мале: очікується, що ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Занадто мале: очікується, що ${issue2.origin} буде ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Неправильний рядок: повинен починатися з "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Неправильний рядок: повинен закінчуватися на "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Неправильний рядок: повинен містити "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Неправильний рядок: повинен відповідати шаблону ${_issue.pattern}`;
        return `Неправильний ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Неправильне число: повинно бути кратним ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Нерозпізнаний ключ${issue2.keys.length > 1 ? "і" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Неправильний ключ у ${issue2.origin}`;
      case "invalid_union":
        return "Неправильні вхідні дані";
      case "invalid_element":
        return `Неправильне значення у ${issue2.origin}`;
      default:
        return `Неправильні вхідні дані`;
    }
  };
};
function uk_default() {
  return {
    localeError: error55()
  };
}

// node_modules/zod/v4/locales/ua.js
function ua_default() {
  return uk_default();
}
// node_modules/zod/v4/locales/ur.js
var error56 = () => {
  const Sizable = {
    string: { unit: "حروف", verb: "ہونا" },
    file: { unit: "بائٹس", verb: "ہونا" },
    array: { unit: "آئٹمز", verb: "ہونا" },
    set: { unit: "آئٹمز", verb: "ہونا" },
    map: { unit: "آئٹمز", verb: "ہونا" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ان پٹ",
    email: "ای میل ایڈریس",
    url: "یو آر ایل",
    emoji: "ایموجی",
    uuid: "یو یو آئی ڈی",
    uuidv4: "یو یو آئی ڈی وی 4",
    uuidv6: "یو یو آئی ڈی وی 6",
    nanoid: "نینو آئی ڈی",
    guid: "جی یو آئی ڈی",
    cuid: "سی یو آئی ڈی",
    cuid2: "سی یو آئی ڈی 2",
    ulid: "یو ایل آئی ڈی",
    xid: "ایکس آئی ڈی",
    ksuid: "کے ایس یو آئی ڈی",
    datetime: "آئی ایس او ڈیٹ ٹائم",
    date: "آئی ایس او تاریخ",
    time: "آئی ایس او وقت",
    duration: "آئی ایس او مدت",
    ipv4: "آئی پی وی 4 ایڈریس",
    ipv6: "آئی پی وی 6 ایڈریس",
    mac: "ایم اے سی ایڈریس",
    cidrv4: "آئی پی وی 4 رینج",
    cidrv6: "آئی پی وی 6 رینج",
    base64: "بیس 64 ان کوڈڈ سٹرنگ",
    base64url: "بیس 64 یو آر ایل ان کوڈڈ سٹرنگ",
    json_string: "جے ایس او این سٹرنگ",
    e164: "ای 164 نمبر",
    credit_card: "کریڈٹ کارڈ نمبر",
    currency_code: "کرنسی کوڈ",
    iban: "IBAN",
    jwt: "جے ڈبلیو ٹی",
    template_literal: "ان پٹ"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "نمبر",
    array: "آرے",
    null: "نل"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `غلط ان پٹ: instanceof ${issue2.expected} متوقع تھا، ${received} موصول ہوا`;
        }
        return `غلط ان پٹ: ${expected} متوقع تھا، ${received} موصول ہوا`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `غلط ان پٹ: ${stringifyPrimitive(issue2.values[0])} متوقع تھا`;
        return `غلط آپشن: ${joinValues(issue2.values, "|")} میں سے ایک متوقع تھا`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `بہت بڑا: ${issue2.origin ?? "ویلیو"} کے ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "عناصر"} ہونے متوقع تھے`;
        return `بہت بڑا: ${issue2.origin ?? "ویلیو"} کا ${adj}${issue2.maximum.toString()} ہونا متوقع تھا`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `بہت چھوٹا: ${issue2.origin} کے ${adj}${issue2.minimum.toString()} ${sizing.unit} ہونے متوقع تھے`;
        }
        return `بہت چھوٹا: ${issue2.origin} کا ${adj}${issue2.minimum.toString()} ہونا متوقع تھا`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `غلط سٹرنگ: "${_issue.prefix}" سے شروع ہونا چاہیے`;
        }
        if (_issue.format === "ends_with")
          return `غلط سٹرنگ: "${_issue.suffix}" پر ختم ہونا چاہیے`;
        if (_issue.format === "includes")
          return `غلط سٹرنگ: "${_issue.includes}" شامل ہونا چاہیے`;
        if (_issue.format === "regex")
          return `غلط سٹرنگ: پیٹرن ${_issue.pattern} سے میچ ہونا چاہیے`;
        return `غلط ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `غلط نمبر: ${issue2.divisor} کا مضاعف ہونا چاہیے`;
      case "unrecognized_keys":
        return `غیر تسلیم شدہ کی${issue2.keys.length > 1 ? "ز" : ""}: ${joinValues(issue2.keys, "، ")}`;
      case "invalid_key":
        return `${issue2.origin} میں غلط کی`;
      case "invalid_union":
        return "غلط ان پٹ";
      case "invalid_element":
        return `${issue2.origin} میں غلط ویلیو`;
      default:
        return `غلط ان پٹ`;
    }
  };
};
function ur_default() {
  return {
    localeError: error56()
  };
}
// node_modules/zod/v4/locales/uz.js
var error57 = () => {
  const Sizable = {
    string: { unit: "belgi", verb: "bo‘lishi kerak" },
    file: { unit: "bayt", verb: "bo‘lishi kerak" },
    array: { unit: "element", verb: "bo‘lishi kerak" },
    set: { unit: "element", verb: "bo‘lishi kerak" },
    map: { unit: "yozuv", verb: "bo‘lishi kerak" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "kirish",
    email: "elektron pochta manzili",
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
    datetime: "ISO sana va vaqti",
    date: "ISO sana",
    time: "ISO vaqt",
    duration: "ISO davomiylik",
    ipv4: "IPv4 manzil",
    ipv6: "IPv6 manzil",
    mac: "MAC manzil",
    cidrv4: "IPv4 diapazon",
    cidrv6: "IPv6 diapazon",
    base64: "base64 kodlangan satr",
    base64url: "base64url kodlangan satr",
    json_string: "JSON satr",
    e164: "E.164 raqam",
    credit_card: "kredit karta raqami",
    currency_code: "valyuta kodi",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "kirish"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "raqam",
    array: "massiv"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Noto‘g‘ri kirish: kutilgan instanceof ${issue2.expected}, qabul qilingan ${received}`;
        }
        return `Noto‘g‘ri kirish: kutilgan ${expected}, qabul qilingan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Noto‘g‘ri kirish: kutilgan ${stringifyPrimitive(issue2.values[0])}`;
        return `Noto‘g‘ri variant: quyidagilardan biri kutilgan ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        }
        return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Noto‘g‘ri satr: "${_issue.prefix}" bilan boshlanishi kerak`;
        if (_issue.format === "ends_with")
          return `Noto‘g‘ri satr: "${_issue.suffix}" bilan tugashi kerak`;
        if (_issue.format === "includes")
          return `Noto‘g‘ri satr: "${_issue.includes}" ni o‘z ichiga olishi kerak`;
        if (_issue.format === "regex")
          return `Noto‘g‘ri satr: ${_issue.pattern} shabloniga mos kelishi kerak`;
        return `Noto‘g‘ri ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Noto‘g‘ri raqam: ${issue2.divisor} ning karralisi bo‘lishi kerak`;
      case "unrecognized_keys":
        return `Noma’lum kalit${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} dagi kalit noto‘g‘ri`;
      case "invalid_union":
        return "Noto‘g‘ri kirish";
      case "invalid_element":
        return `${issue2.origin} da noto‘g‘ri qiymat`;
      default:
        return `Noto‘g‘ri kirish`;
    }
  };
};
function uz_default() {
  return {
    localeError: error57()
  };
}
// node_modules/zod/v4/locales/vi.js
var error58 = () => {
  const Sizable = {
    string: { unit: "ký tự", verb: "có" },
    file: { unit: "byte", verb: "có" },
    array: { unit: "phần tử", verb: "có" },
    set: { unit: "phần tử", verb: "có" },
    map: { unit: "phần tử", verb: "có" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "đầu vào",
    email: "địa chỉ email",
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
    datetime: "ngày giờ ISO",
    date: "ngày ISO",
    time: "giờ ISO",
    duration: "khoảng thời gian ISO",
    ipv4: "địa chỉ IPv4",
    ipv6: "địa chỉ IPv6",
    mac: "địa chỉ MAC",
    cidrv4: "dải IPv4",
    cidrv6: "dải IPv6",
    base64: "chuỗi mã hóa base64",
    base64url: "chuỗi mã hóa base64url",
    json_string: "chuỗi JSON",
    e164: "số E.164",
    credit_card: "số thẻ tín dụng",
    currency_code: "mã tiền tệ",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "đầu vào"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "số",
    array: "mảng"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Đầu vào không hợp lệ: mong đợi instanceof ${issue2.expected}, nhận được ${received}`;
        }
        return `Đầu vào không hợp lệ: mong đợi ${expected}, nhận được ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Đầu vào không hợp lệ: mong đợi ${stringifyPrimitive(issue2.values[0])}`;
        return `Tùy chọn không hợp lệ: mong đợi một trong các giá trị ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Quá lớn: mong đợi ${issue2.origin ?? "giá trị"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "phần tử"}`;
        return `Quá lớn: mong đợi ${issue2.origin ?? "giá trị"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Quá nhỏ: mong đợi ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Quá nhỏ: mong đợi ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Chuỗi không hợp lệ: phải bắt đầu bằng "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Chuỗi không hợp lệ: phải kết thúc bằng "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chuỗi không hợp lệ: phải bao gồm "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chuỗi không hợp lệ: phải khớp với mẫu ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} không hợp lệ`;
      }
      case "not_multiple_of":
        return `Số không hợp lệ: phải là bội số của ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Khóa không được nhận dạng: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Khóa không hợp lệ trong ${issue2.origin}`;
      case "invalid_union":
        return "Đầu vào không hợp lệ";
      case "invalid_element":
        return `Giá trị không hợp lệ trong ${issue2.origin}`;
      default:
        return `Đầu vào không hợp lệ`;
    }
  };
};
function vi_default() {
  return {
    localeError: error58()
  };
}
// node_modules/zod/v4/locales/zh-CN.js
var error59 = () => {
  const Sizable = {
    string: { unit: "字符", verb: "包含" },
    file: { unit: "字节", verb: "包含" },
    array: { unit: "项", verb: "包含" },
    set: { unit: "项", verb: "包含" },
    map: { unit: "项", verb: "包含" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "输入",
    email: "电子邮件",
    url: "URL",
    emoji: "表情符号",
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
    datetime: "ISO日期时间",
    date: "ISO日期",
    time: "ISO时间",
    duration: "ISO时长",
    ipv4: "IPv4地址",
    ipv6: "IPv6地址",
    mac: "MAC地址",
    cidrv4: "IPv4网段",
    cidrv6: "IPv6网段",
    base64: "base64编码字符串",
    base64url: "base64url编码字符串",
    json_string: "JSON字符串",
    e164: "E.164号码",
    credit_card: "信用卡号",
    currency_code: "货币代码",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "输入"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "数字",
    array: "数组",
    null: "空值(null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `无效输入：期望 instanceof ${issue2.expected}，实际接收 ${received}`;
        }
        return `无效输入：期望 ${expected}，实际接收 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `无效输入：期望 ${stringifyPrimitive(issue2.values[0])}`;
        return `无效选项：期望以下之一 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `数值过大：期望 ${issue2.origin ?? "值"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "个元素"}`;
        return `数值过大：期望 ${issue2.origin ?? "值"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `数值过小：期望 ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `数值过小：期望 ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `无效字符串：必须以 "${_issue.prefix}" 开头`;
        if (_issue.format === "ends_with")
          return `无效字符串：必须以 "${_issue.suffix}" 结尾`;
        if (_issue.format === "includes")
          return `无效字符串：必须包含 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `无效字符串：必须满足正则表达式 ${_issue.pattern}`;
        return `无效${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `无效数字：必须是 ${issue2.divisor} 的倍数`;
      case "unrecognized_keys":
        return `出现未知的键(key): ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} 中的键(key)无效`;
      case "invalid_union":
        return "无效输入";
      case "invalid_element":
        return `${issue2.origin} 中包含无效值(value)`;
      default:
        return `无效输入`;
    }
  };
};
function zh_CN_default() {
  return {
    localeError: error59()
  };
}
// node_modules/zod/v4/locales/zh-TW.js
var error60 = () => {
  const Sizable = {
    string: { unit: "字元", verb: "擁有" },
    file: { unit: "位元組", verb: "擁有" },
    array: { unit: "項目", verb: "擁有" },
    set: { unit: "項目", verb: "擁有" },
    map: { unit: "項目", verb: "擁有" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "輸入",
    email: "郵件地址",
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
    datetime: "ISO 日期時間",
    date: "ISO 日期",
    time: "ISO 時間",
    duration: "ISO 期間",
    ipv4: "IPv4 位址",
    ipv6: "IPv6 位址",
    mac: "MAC 位址",
    cidrv4: "IPv4 範圍",
    cidrv6: "IPv6 範圍",
    base64: "base64 編碼字串",
    base64url: "base64url 編碼字串",
    json_string: "JSON 字串",
    e164: "E.164 數值",
    credit_card: "信用卡號",
    currency_code: "貨幣代碼",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "輸入"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `無效的輸入值：預期為 instanceof ${issue2.expected}，但收到 ${received}`;
        }
        return `無效的輸入值：預期為 ${expected}，但收到 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `無效的輸入值：預期為 ${stringifyPrimitive(issue2.values[0])}`;
        return `無效的選項：預期為以下其中之一 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `數值過大：預期 ${issue2.origin ?? "值"} 應為 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "個元素"}`;
        return `數值過大：預期 ${issue2.origin ?? "值"} 應為 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `數值過小：預期 ${issue2.origin} 應為 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `數值過小：預期 ${issue2.origin} 應為 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `無效的字串：必須以 "${_issue.prefix}" 開頭`;
        }
        if (_issue.format === "ends_with")
          return `無效的字串：必須以 "${_issue.suffix}" 結尾`;
        if (_issue.format === "includes")
          return `無效的字串：必須包含 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `無效的字串：必須符合格式 ${_issue.pattern}`;
        return `無效的 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `無效的數字：必須為 ${issue2.divisor} 的倍數`;
      case "unrecognized_keys":
        return `無法識別的鍵值${issue2.keys.length > 1 ? "們" : ""}：${joinValues(issue2.keys, "、")}`;
      case "invalid_key":
        return `${issue2.origin} 中有無效的鍵值`;
      case "invalid_union":
        return "無效的輸入值";
      case "invalid_element":
        return `${issue2.origin} 中有無效的值`;
      default:
        return `無效的輸入值`;
    }
  };
};
function zh_TW_default() {
  return {
    localeError: error60()
  };
}
// node_modules/zod/v4/locales/yo.js
var error61 = () => {
  const Sizable = {
    string: { unit: "àmi", verb: "ní" },
    file: { unit: "bytes", verb: "ní" },
    array: { unit: "nkan", verb: "ní" },
    set: { unit: "nkan", verb: "ní" },
    map: { unit: "nkan", verb: "ní" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ẹ̀rọ ìbáwọlé",
    email: "àdírẹ́sì ìmẹ́lì",
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
    datetime: "àkókò ISO",
    date: "ọjọ́ ISO",
    time: "àkókò ISO",
    duration: "àkókò tó pé ISO",
    ipv4: "àdírẹ́sì IPv4",
    ipv6: "àdírẹ́sì IPv6",
    mac: "àdírẹ́sì MAC",
    cidrv4: "àgbègbè IPv4",
    cidrv6: "àgbègbè IPv6",
    base64: "ọ̀rọ̀ tí a kọ́ ní base64",
    base64url: "ọ̀rọ̀ base64url",
    json_string: "ọ̀rọ̀ JSON",
    e164: "nọ́mbà E.164",
    credit_card: "nọmba kaadi gbese",
    currency_code: "koodu owó",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "ẹ̀rọ ìbáwọlé"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nọ́mbà",
    array: "akopọ"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ìbáwọlé aṣìṣe: a ní láti fi instanceof ${issue2.expected}, àmọ̀ a rí ${received}`;
        }
        return `Ìbáwọlé aṣìṣe: a ní láti fi ${expected}, àmọ̀ a rí ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ìbáwọlé aṣìṣe: a ní láti fi ${stringifyPrimitive(issue2.values[0])}`;
        return `Àṣàyàn aṣìṣe: yan ọ̀kan lára ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Tó pọ̀ jù: a ní láti jẹ́ pé ${issue2.origin ?? "iye"} ${sizing.verb} ${adj}${issue2.maximum} ${sizing.unit}`;
        return `Tó pọ̀ jù: a ní láti jẹ́ ${adj}${issue2.maximum}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Kéré ju: a ní láti jẹ́ pé ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum} ${sizing.unit}`;
        return `Kéré ju: a ní láti jẹ́ ${adj}${issue2.minimum}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bẹ̀rẹ̀ pẹ̀lú "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ parí pẹ̀lú "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ ní "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bá àpẹẹrẹ mu ${_issue.pattern}`;
        return `Aṣìṣe: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nọ́mbà aṣìṣe: gbọ́dọ̀ jẹ́ èyà pípín ti ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Bọtìnì àìmọ̀: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Bọtìnì aṣìṣe nínú ${issue2.origin}`;
      case "invalid_union":
        return "Ìbáwọlé aṣìṣe";
      case "invalid_element":
        return `Iye aṣìṣe nínú ${issue2.origin}`;
      default:
        return "Ìbáwọlé aṣìṣe";
    }
  };
};
function yo_default() {
  return {
    localeError: error61()
  };
}
// node_modules/zod/v4/core/registries.js
var _a2;
var $output = /* @__PURE__ */ Symbol("ZodOutput");
var $input = /* @__PURE__ */ Symbol("ZodInput");

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
// node_modules/zod/v4/core/compile.js
var INVALID = Symbol.for("zod.compile.invalid");
var FALLBACK_FLAG = Symbol.for("zod.compile.fallback");

class ZodCompileAsyncError extends Error {
  constructor(message = "z.compile does not support async refinements, transforms, or checks") {
    super(message);
    this.name = "ZodCompileAsyncError";
  }
}

class ZodCompileUnsupportedError extends Error {
  constructor(feature, islandable = true) {
    super(`z.compile does not support ${feature}; this schema must use the runtime parser`);
    this.name = "ZodCompileUnsupportedError";
    this.islandable = islandable;
  }
}
function compileValidator(schema, parser) {
  try {
    return compileFn(schema, { assertOnly: true });
  } catch {
    return parser;
  }
}
function compile(schema, options) {
  try {
    const parser = compileFn(schema);
    const clone2 = withParser(schema, parser);
    clone2._zod.bag.validator = compileValidator(schema, parser);
    return clone2;
  } catch (err) {
    if (options?.strict)
      throw err;
    return schema;
  }
}
function withParser(schema, parser) {
  if (isRecursiveSchema(schema)) {
    throw new ZodCompileUnsupportedError("a schema whose subtree contains a reference cycle");
  }
  const clone2 = clone(schema);
  const liveRun = schema._zod.run;
  const originalRun = liveRun.__originalRun ?? liveRun;
  const wrapped = (payload, ctx) => {
    if (ctx?.async || ctx?.direction === "backward" || ctx?.skipChecks || ctx?.[FALLBACK_FLAG]) {
      return originalRun(payload, ctx);
    }
    if (ctx && isBackEdge(ctx, payload.value)) {
      return originalRun(payload, ctx);
    }
    const out = parser(payload.value);
    if (out !== INVALID) {
      payload.value = out;
      return payload;
    }
    if (ctx)
      ctx[FALLBACK_FLAG] = true;
    return originalRun(payload, ctx);
  };
  wrapped.__originalRun = originalRun;
  clone2._zod.bag.fallbackRun = originalRun;
  clone2._zod.bag.validator = parser;
  clone2._zod.run = wrapped;
  if (!liveRun.__originalRun)
    installCompiledUserMethods(clone2, schema, parser);
  return clone2;
}
function installCompiledUserMethods(target, source, parser) {
  const targetAny = target;
  const sourceAny = source;
  if (typeof sourceAny.safeParse === "function") {
    const originalSafeParse = sourceAny.safeParse;
    targetAny.safeParse = (data, params) => {
      const out = parser(data);
      if (out !== INVALID) {
        return { success: true, data: out };
      }
      return originalSafeParse(data, params);
    };
  }
  if (typeof sourceAny.parse === "function") {
    const originalParse = sourceAny.parse;
    targetAny.parse = (data, params) => {
      const out = parser(data);
      if (out !== INVALID) {
        return out;
      }
      return originalParse(data, params);
    };
  }
}
function compileFn(schema, options) {
  let recursive2 = true;
  try {
    recursive2 = isRecursiveSchema(schema);
  } catch {}
  if (recursive2) {
    throw new ZodCompileUnsupportedError("a schema whose subtree contains a reference cycle");
  }
  const ctx = {
    constants: new Map,
    constantCounter: 0,
    varCounter: 0,
    definite: true
  };
  const doc = new Doc(["input"]);
  const outputAccessor = generateCheck(doc, ctx, schema, "input", !options?.assertOnly);
  doc.write(outputAccessor === null ? `return true;` : `return ${outputAccessor};`);
  const constantNames = ["INVALID", ...ctx.constants.keys()];
  const constantValues = [INVALID, ...ctx.constants.values()];
  const code = doc.content.join(`
`);
  const fullCode = options?.debug ? constantNames.length > 0 ? `// Constants: ${constantNames.join(", ")}
${code}` : code : "";
  const F = Function;
  const factoryCode = `return (input) => {
${code}
}`;
  let fn;
  try {
    const factory = new F(...constantNames, factoryCode);
    fn = factory(...constantValues);
  } catch (err) {
    throw new ZodCompileUnsupportedError(`this schema (generated code failed to evaluate: ${err.message})`);
  }
  if (options?.debug) {
    fn.code = fullCode;
  }
  fn.definite = ctx.definite;
  return fn;
}
function addConstant(ctx, value) {
  for (const [name2, v] of ctx.constants) {
    if (v === value)
      return name2;
  }
  const name = `c${ctx.constantCounter++}`;
  ctx.constants.set(name, value);
  return name;
}
function addUserConstant(ctx, fn) {
  ctx.definite = false;
  return addConstant(ctx, fn);
}
function newVar(ctx) {
  return `v${ctx.varCounter++}`;
}
function runtimeRun(schema, value) {
  const result = schema._zod.run({ value, issues: [] }, {});
  if (result && typeof result.then === "function")
    return INVALID;
  const r = result;
  return r.issues.length === 0 ? r.value : INVALID;
}
function compileChild(doc, ctx, schema, accessor, needsValue = true) {
  const contentLen = doc.content.length;
  const constantCount = ctx.constants.size;
  const constantCounter = ctx.constantCounter;
  const varCounter = ctx.varCounter;
  try {
    return generateCheck(doc, ctx, schema, accessor, needsValue);
  } catch (err) {
    if (!(err instanceof ZodCompileUnsupportedError) || !err.islandable)
      throw err;
    doc.content.length = contentLen;
    if (ctx.constants.size > constantCount) {
      const trailing = Array.from(ctx.constants.keys()).slice(constantCount);
      for (const k of trailing)
        ctx.constants.delete(k);
    }
    ctx.constantCounter = constantCounter;
    ctx.varCounter = varCounter;
    return emitRuntimeIsland(doc, ctx, schema, accessor);
  }
}
function emitRuntimeIsland(doc, ctx, schema, accessor) {
  ctx.definite = false;
  const schemaConst = addConstant(ctx, schema);
  const runConst = addConstant(ctx, runtimeRun);
  const outVar = newVar(ctx);
  doc.write(`const ${outVar} = ${runConst}(${schemaConst}, ${accessor});`);
  doc.write(`if (${outVar} === INVALID) return INVALID;`);
  return outVar;
}
var WHEN_DEFAULTED_CHECKS = new Set([
  "max_size",
  "min_size",
  "size_equals",
  "max_length",
  "min_length",
  "length_equals"
]);
function generateChecks(doc, ctx, schema, accessor) {
  const schemaChecks = schema._zod.def.checks;
  if (!schemaChecks || schemaChecks.length === 0)
    return accessor;
  let currentAccessor = accessor;
  for (const check of schemaChecks) {
    const def = check._zod.def;
    if (def.when && !WHEN_DEFAULTED_CHECKS.has(def.check)) {
      throw new ZodCompileUnsupportedError(`check with a custom "when" condition`);
    }
    switch (def.check) {
      case "greater_than":
        generateGreaterThanCheck(doc, ctx, def, currentAccessor);
        break;
      case "less_than":
        generateLessThanCheck(doc, ctx, def, currentAccessor);
        break;
      case "multiple_of":
        generateMultipleOfCheck(doc, ctx, def, currentAccessor);
        break;
      case "number_format":
        generateNumberFormatCheck(doc, def, currentAccessor);
        break;
      case "min_length": {
        const min = numericOperand(def.minimum, "min_length");
        const len = codePointLengthVar(doc, ctx, currentAccessor, `${currentAccessor}.length >= ${min} && ${currentAccessor}.length < ${def.minimum * 2}`);
        doc.write(`if (${len} < ${min}) return INVALID;`);
        break;
      }
      case "max_length": {
        const max = numericOperand(def.maximum, "max_length");
        const len = codePointLengthVar(doc, ctx, currentAccessor, `${currentAccessor}.length > ${max}`);
        doc.write(`if (${len} > ${max}) return INVALID;`);
        break;
      }
      case "length_equals": {
        const exact = numericOperand(def.length, "length_equals");
        const len = codePointLengthVar(doc, ctx, currentAccessor, `${currentAccessor}.length >= ${exact} && ${currentAccessor}.length <= ${def.length * 2}`);
        doc.write(`if (${len} !== ${exact}) return INVALID;`);
        break;
      }
      case "min_size":
        doc.write(`if (${currentAccessor}.size < ${numericOperand(def.minimum, "min_size")}) return INVALID;`);
        break;
      case "max_size":
        doc.write(`if (${currentAccessor}.size > ${numericOperand(def.maximum, "max_size")}) return INVALID;`);
        break;
      case "size_equals":
        doc.write(`if (${currentAccessor}.size !== ${numericOperand(def.size, "size_equals")}) return INVALID;`);
        break;
      case "string_format":
        currentAccessor = generateStringFormatCheck(doc, ctx, def, currentAccessor);
        break;
      case "custom":
        currentAccessor = generateCustomRefineCheck(doc, ctx, check, currentAccessor);
        break;
      case "bigint_format":
        generateBigIntFormatCheck(doc, def, currentAccessor);
        break;
      case "mime_type":
        generateMimeTypeCheck(doc, ctx, def, currentAccessor);
        break;
      case "property":
        generatePropertyCheck(doc, ctx, def, currentAccessor);
        break;
      case "properties":
        generatePropertiesChecks(doc, ctx, def, currentAccessor);
        break;
      case "overwrite": {
        const newAccessor = newVar(ctx);
        generateOverwriteCheck(doc, ctx, check, currentAccessor, newAccessor);
        currentAccessor = newAccessor;
        break;
      }
      default: {
        throw new ZodCompileUnsupportedError(`check type ${def.check}`);
      }
    }
  }
  return currentAccessor;
}
function codePointLengthVar(doc, ctx, accessor, inDoubt) {
  const cpLen = addConstant(ctx, codePointLength);
  const v = newVar(ctx);
  doc.write(`const ${v} = typeof ${accessor} === "string" && ${inDoubt} ? ${cpLen}(${accessor}) : ${accessor}.length;`);
  return v;
}
function numericOperand(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new ZodCompileUnsupportedError(`${label} bound of type ${typeof value}`);
  }
  return `${value}`;
}
function comparisonOperand(ctx, value) {
  if (typeof value === "bigint")
    return `${value}n`;
  if (typeof value === "number") {
    if (Number.isNaN(value))
      throw new ZodCompileUnsupportedError("comparison check with NaN bound");
    return `${value}`;
  }
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      throw new ZodCompileUnsupportedError("comparison check with Invalid Date bound");
    }
    return addConstant(ctx, value);
  }
  throw new ZodCompileUnsupportedError(`comparison check bound of type ${typeof value}`);
}
function generateGreaterThanCheck(doc, ctx, def, accessor) {
  const op = def.inclusive ? "<" : "<=";
  doc.write(`if (${accessor} ${op} ${comparisonOperand(ctx, def.value)}) return INVALID;`);
}
function generateLessThanCheck(doc, ctx, def, accessor) {
  const op = def.inclusive ? ">" : ">=";
  doc.write(`if (${accessor} ${op} ${comparisonOperand(ctx, def.value)}) return INVALID;`);
}
function generateMultipleOfCheck(doc, ctx, def, accessor) {
  if (typeof def.value === "bigint") {
    if (def.value === BigInt(0))
      throw new ZodCompileUnsupportedError("multiple_of check with a zero divisor");
    doc.write(`if (${accessor} % ${def.value}n !== 0n) return INVALID;`);
  } else {
    const remainder = addConstant(ctx, floatSafeRemainder);
    doc.write(`if (${remainder}(${accessor}, ${numericOperand(def.value, "multiple_of")}) !== 0) return INVALID;`);
  }
}
function generateNumberFormatCheck(doc, def, accessor) {
  const format = def.format;
  switch (format) {
    case "safeint":
      doc.write(`if (!Number.isSafeInteger(${accessor})) return INVALID;`);
      break;
    case "int32":
      doc.write(`if (!Number.isInteger(${accessor}) || ${accessor} < -2147483648 || ${accessor} > 2147483647) return INVALID;`);
      break;
    case "uint32":
      doc.write(`if (!Number.isInteger(${accessor}) || ${accessor} < 0 || ${accessor} > 4294967295) return INVALID;`);
      break;
    case "float32":
      doc.write(`if (!Number.isFinite(${accessor}) || ${accessor} < -3.4028234663852886e38 || ${accessor} > 3.4028234663852886e38) return INVALID;`);
      break;
    case "float64":
      doc.write(`if (!Number.isFinite(${accessor})) return INVALID;`);
      break;
    default: {
      throw new ZodCompileUnsupportedError(`number format ${format}`);
    }
  }
}
function generateBigIntFormatCheck(doc, def, accessor) {
  const format = def.format;
  if (!format)
    return;
  switch (format) {
    case "int64":
      doc.write(`if (${accessor} < -9223372036854775808n || ${accessor} > 9223372036854775807n) return INVALID;`);
      break;
    case "uint64":
      doc.write(`if (${accessor} < 0n || ${accessor} > 18446744073709551615n) return INVALID;`);
      break;
    default: {
      throw new ZodCompileUnsupportedError(`bigint format ${format}`);
    }
  }
}
function generateMimeTypeCheck(doc, ctx, def, accessor) {
  const mimeTypes = def.mime;
  if (mimeTypes && mimeTypes.length > 0) {
    const mimeSet = addConstant(ctx, new Set(mimeTypes));
    doc.write(`if (!${mimeSet}.has(${accessor}.type)) return INVALID;`);
  }
}
function generatePropertiesChecks(doc, ctx, def, accessor) {
  if (def.when) {
    throw new ZodCompileUnsupportedError(`check with a custom "when" condition`);
  }
  doc.write(`if (${accessor} == null) return INVALID;`);
  const shape = def.shape;
  for (const key of Reflect.ownKeys(shape)) {
    const keyExpr = typeof key === "symbol" ? addConstant(ctx, key) : esc(key);
    const inputVar = newVar(ctx);
    doc.write(`const ${inputVar} = ${accessor}[${keyExpr}];`);
    compileChild(doc, ctx, shape[key], inputVar, false);
  }
}
function generatePropertyCheck(doc, ctx, def, accessor) {
  const propAccessor = `${accessor}[${JSON.stringify(def.property)}]`;
  generateCheck(doc, ctx, def.schema, propAccessor);
}
function generateOverwriteCheck(doc, ctx, check, currentAccessor, newAccessor) {
  const tx = check._zod.def.tx;
  if (!tx) {
    throw new ZodCompileUnsupportedError("overwrite check without a transform function");
  }
  if (isAsyncFunction(tx)) {
    throw new ZodCompileAsyncError("z.compile: async overwrite transforms are not supported");
  }
  const txConst = addConstant(ctx, tx);
  doc.write(`const ${newAccessor} = ${txConst}(${currentAccessor});`);
}
function throwAsync() {
  throw new $ZodAsyncError;
}
function pushIssue(issue2) {
  this.issues.push(issue2);
}
function generateCustomRefineCheck(doc, ctx, check, accessor) {
  const def = check._zod.def;
  if (def.fn) {
    if (isAsyncFunction(def.fn)) {
      throw new ZodCompileAsyncError("z.compile: async .refine() predicates are not supported");
    }
    const fnConst = addUserConstant(ctx, def.fn);
    const throwAsyncConst = addConstant(ctx, throwAsync);
    const resVar = newVar(ctx);
    doc.write(`const ${resVar} = ${fnConst}(${accessor});`);
    doc.write(`if (${resVar} instanceof Promise) ${throwAsyncConst}();`);
    doc.write(`if (!${resVar}) return INVALID;`);
    return accessor;
  }
  if (check._zod.check) {
    if (isAsyncFunction(check._zod.check)) {
      throw new ZodCompileAsyncError("z.compile: async .superRefine() / check functions are not supported");
    }
    const checkFn = check._zod.check;
    const helperFn = (value) => {
      const fakePayload = { value, issues: [], addIssue: pushIssue };
      const result = checkFn(fakePayload);
      if (result instanceof Promise)
        throwAsync();
      return fakePayload.issues.length === 0 ? fakePayload.value : INVALID;
    };
    const helperConst = addUserConstant(ctx, helperFn);
    const outVar = newVar(ctx);
    doc.write(`const ${outVar} = ${helperConst}(${accessor});`);
    doc.write(`if (${outVar} === INVALID) return INVALID;`);
    return outVar;
  }
  throw new ZodCompileUnsupportedError("custom check without a predicate or check function");
}
var PATTERN_IS_COMPLETE = new Set([
  "cidrv4",
  "cuid",
  "cuid2",
  "date",
  "datetime",
  "duration",
  "e164",
  "email",
  "emoji",
  "ends_with",
  "guid",
  "includes",
  "ipv4",
  "ksuid",
  "lowercase",
  "mac",
  "nanoid",
  "regex",
  "starts_with",
  "time",
  "ulid",
  "uppercase",
  "uuid",
  "xid"
]);
function generateStringFormatCheck(doc, ctx, def, accessor, needsValue = true) {
  const fmt = def.format;
  if (fmt === "base64") {
    const validator = addConstant(ctx, isValidBase64);
    doc.write(`if (!${validator}(${accessor})) return INVALID;`);
    return accessor;
  }
  if (fmt === "base64url") {
    const validator = addConstant(ctx, isValidBase64URL);
    doc.write(`if (!${validator}(${accessor})) return INVALID;`);
    return accessor;
  }
  if (fmt === "jwt") {
    const validator = addConstant(ctx, isValidJWT);
    const alg = addConstant(ctx, def.alg ?? null);
    doc.write(`if (!${validator}(${accessor}, ${alg})) return INVALID;`);
    return accessor;
  }
  if (fmt === "ipv6") {
    const validator = addConstant(ctx, isValidIPv6);
    doc.write(`if (!${validator}(${accessor})) return INVALID;`);
    return accessor;
  }
  if (fmt === "cidrv6") {
    const validator = addConstant(ctx, isValidCIDRv6);
    doc.write(`if (!${validator}(${accessor})) return INVALID;`);
    return accessor;
  }
  if (fmt === "credit_card") {
    const validator = addConstant(ctx, isValidCreditCard);
    doc.write(`if (!${validator}(${accessor})) return INVALID;`);
    return accessor;
  }
  if (fmt === "iban") {
    const validator = addConstant(ctx, isValidIBAN);
    doc.write(`if (!${validator}(${accessor})) return INVALID;`);
    return accessor;
  }
  const formatDef = def;
  if (fmt === "url" || fmt === "httpurl" || formatDef.normalize || formatDef.hostname !== undefined || formatDef.protocol !== undefined) {
    const parseConst = addConstant(ctx, validateURL);
    const defConst = addConstant(ctx, def);
    const trimVar = newVar(ctx);
    const urlVar = newVar(ctx);
    doc.write(`const ${trimVar} = ${accessor}.trim();`);
    doc.write(`const ${urlVar} = ${parseConst}(${trimVar}, ${defConst});`);
    doc.write(`if (typeof ${urlVar} === "number") return INVALID;`);
    if (formatDef.hostname !== undefined) {
      const hostnameConst = addConstant(ctx, urlHostnameOk);
      doc.write(`if (!${hostnameConst}(${urlVar}, ${defConst}.hostname)) return INVALID;`);
    }
    if (formatDef.protocol !== undefined) {
      const protocolConst = addConstant(ctx, urlProtocolOk);
      doc.write(`if (!${protocolConst}(${urlVar}, ${defConst}.protocol)) return INVALID;`);
    }
    if (!needsValue)
      return null;
    const outputVar = newVar(ctx);
    const outputExpr = formatDef.normalize ? `${urlVar}.href` : `${addConstant(ctx, stripTabAndNewline)}(${trimVar})`;
    doc.write(`const ${outputVar} = ${outputExpr};`);
    return outputVar;
  }
  const customFn = def.fn;
  if (customFn) {
    if (isAsyncFunction(customFn))
      throw new ZodCompileUnsupportedError(`async string format ${fmt}`);
    const fnConst = addConstant(ctx, customFn);
    doc.write(`if (!${fnConst}(${accessor})) return INVALID;`);
    return accessor;
  }
  if (PATTERN_IS_COMPLETE.has(fmt) && def.pattern) {
    const patternConst = addConstant(ctx, def.pattern);
    doc.write(`${patternConst}.lastIndex = 0;`);
    doc.write(`if (!${patternConst}.test(${accessor})) return INVALID;`);
    return accessor;
  }
  const format = def.format;
  switch (format) {
    case "regex":
      throw new ZodCompileUnsupportedError("regex format without a pattern");
    case "lowercase":
      doc.write(`if (${accessor} !== ${accessor}.toLowerCase()) return INVALID;`);
      break;
    case "uppercase":
      doc.write(`if (${accessor} !== ${accessor}.toUpperCase()) return INVALID;`);
      break;
    case "includes":
      doc.write(`if (!${accessor}.includes(${esc(def.includes)})) return INVALID;`);
      break;
    case "starts_with": {
      const prefix = def.prefix;
      doc.write(`if (${accessor}.slice(0, ${prefix.length}) !== ${esc(prefix)}) return INVALID;`);
      break;
    }
    case "ends_with": {
      const suffix = def.suffix;
      doc.write(`if (${accessor}.slice(-${suffix.length}) !== ${esc(suffix)}) return INVALID;`);
      break;
    }
    default: {
      throw new ZodCompileUnsupportedError(`string format ${format}`);
    }
  }
  return accessor;
}
function generateCheck(doc, ctx, schema, accessor, needsValue = true) {
  const def = schema._zod.def;
  const type = def.type;
  if (def.coerce) {
    throw new ZodCompileUnsupportedError(`coercion (z.coerce.${type}())`);
  }
  const buildsValue = needsValue || !!def.checks?.length;
  let typeAccessor;
  switch (type) {
    case "string":
      typeAccessor = generateStringCheck(doc, ctx, schema, accessor, buildsValue);
      break;
    case "number":
      typeAccessor = generateNumberCheck(doc, schema, accessor);
      break;
    case "boolean":
      typeAccessor = generateBooleanCheck(doc, accessor);
      break;
    case "bigint":
      typeAccessor = generateBigIntCheck(doc, schema, accessor);
      break;
    case "symbol":
      typeAccessor = generateSymbolCheck(doc, accessor);
      break;
    case "undefined":
      typeAccessor = generateUndefinedCheck(doc, accessor);
      break;
    case "null":
      typeAccessor = generateNullCheck(doc, accessor);
      break;
    case "any":
    case "unknown":
      typeAccessor = accessor;
      break;
    case "never":
      doc.write("return INVALID;");
      typeAccessor = accessor;
      break;
    case "void":
      typeAccessor = generateVoidCheck(doc, accessor);
      break;
    case "nan":
      typeAccessor = generateNaNCheck(doc, accessor);
      break;
    case "date":
      typeAccessor = generateDateCheck(doc, accessor);
      break;
    case "object":
      typeAccessor = generateObjectCheck(doc, ctx, schema, accessor, buildsValue);
      break;
    case "optional":
      typeAccessor = generateOptionalCheck(doc, ctx, schema, accessor, buildsValue);
      break;
    case "nullable":
      typeAccessor = generateNullableCheck(doc, ctx, schema, accessor, buildsValue);
      break;
    case "array":
      typeAccessor = generateArrayCheck(doc, ctx, schema, accessor, buildsValue);
      break;
    case "literal":
      typeAccessor = generateLiteralCheck(doc, ctx, schema, accessor);
      break;
    case "enum":
      typeAccessor = generateEnumCheck(doc, ctx, schema, accessor);
      break;
    case "readonly": {
      const innerOut = generateWrapperCheck(doc, ctx, schema, accessor);
      const frozenVar = newVar(ctx);
      doc.write(`const ${frozenVar} = Object.freeze(${innerOut});`);
      typeAccessor = frozenVar;
      break;
    }
    case "success":
      generateWrapperCheck(doc, ctx, schema, accessor);
      typeAccessor = "true";
      break;
    case "default":
    case "prefault":
      typeAccessor = generateDefaultCheck(doc, ctx, schema, accessor);
      break;
    case "nonoptional":
      typeAccessor = generateNonOptionalCheck(doc, ctx, schema, accessor);
      break;
    case "tuple":
      typeAccessor = generateTupleCheck(doc, ctx, schema, accessor);
      break;
    case "union":
      typeAccessor = generateUnionCheck(doc, ctx, schema, accessor);
      break;
    case "intersection":
      typeAccessor = generateIntersectionCheck(doc, ctx, schema, accessor);
      break;
    case "record":
      typeAccessor = generateRecordCheck(doc, ctx, schema, accessor);
      break;
    case "map":
      typeAccessor = generateMapCheck(doc, ctx, schema, accessor);
      break;
    case "set":
      typeAccessor = generateSetCheck(doc, ctx, schema, accessor);
      break;
    case "file":
      typeAccessor = generateFileCheck(doc, accessor);
      break;
    case "template_literal":
      typeAccessor = generateTemplateLiteralCheck(doc, ctx, schema, accessor);
      break;
    case "lazy":
      typeAccessor = generateLazyCheck(doc, ctx, schema, accessor);
      break;
    case "pipe":
      typeAccessor = generatePipeCheck(doc, ctx, schema, accessor);
      break;
    case "custom":
      typeAccessor = generateCustomCheck(doc, ctx, schema, accessor);
      break;
    case "transform":
      typeAccessor = generateTransformCheck(doc, ctx, schema, accessor);
      break;
    case "catch":
      typeAccessor = generateCatchCheck(doc, ctx, schema, accessor);
      break;
    default: {
      throw new ZodCompileUnsupportedError(`schema type ${type}`);
    }
  }
  if (typeAccessor === null)
    return null;
  return generateChecks(doc, ctx, schema, typeAccessor);
}
function generateStringCheck(doc, ctx, schema, accessor, needsValue = true) {
  doc.write(`if (typeof ${accessor} !== "string") return INVALID;`);
  const def = schema._zod.def;
  if (def.format === undefined)
    return accessor;
  return generateStringFormatCheck(doc, ctx, def, accessor, needsValue);
}
function generateNumberCheck(doc, schema, accessor) {
  doc.write(`if (typeof ${accessor} !== "number" || !Number.isFinite(${accessor})) return INVALID;`);
  const def = schema._zod.def;
  if (def.check === "number_format" && def.format) {
    generateNumberFormatCheck(doc, { format: def.format }, accessor);
  }
  return accessor;
}
function generateBooleanCheck(doc, accessor) {
  doc.write(`if (typeof ${accessor} !== "boolean") return INVALID;`);
  return accessor;
}
function generateBigIntCheck(doc, schema, accessor) {
  doc.write(`if (typeof ${accessor} !== "bigint") return INVALID;`);
  const def = schema._zod.def;
  if (def.format) {
    switch (def.format) {
      case "int64":
        doc.write(`if (${accessor} < -9223372036854775808n || ${accessor} > 9223372036854775807n) return INVALID;`);
        break;
      case "uint64":
        doc.write(`if (${accessor} < 0n || ${accessor} > 18446744073709551615n) return INVALID;`);
        break;
    }
  }
  return accessor;
}
function generateSymbolCheck(doc, accessor) {
  doc.write(`if (typeof ${accessor} !== "symbol") return INVALID;`);
  return accessor;
}
function generateUndefinedCheck(doc, accessor) {
  doc.write(`if (${accessor} !== undefined) return INVALID;`);
  return accessor;
}
function generateNullCheck(doc, accessor) {
  doc.write(`if (${accessor} !== null) return INVALID;`);
  return accessor;
}
function generateVoidCheck(doc, accessor) {
  doc.write(`if (${accessor} !== undefined) return INVALID;`);
  return accessor;
}
function generateNaNCheck(doc, accessor) {
  doc.write(`if (typeof ${accessor} !== "number" || !Number.isNaN(${accessor})) return INVALID;`);
  return accessor;
}
function generateDateCheck(doc, accessor) {
  doc.write(`if (!(${accessor} instanceof Date) || Number.isNaN(${accessor}.getTime())) return INVALID;`);
  return accessor;
}
function generateObjectCheck(doc, ctx, schema, accessor, buildsValue = true) {
  const def = schema._zod.def;
  doc.write(`if (typeof ${accessor} !== "object" || ${accessor} === null || Array.isArray(${accessor})) return INVALID;`);
  const shape = def.shape;
  const keys = Object.keys(shape);
  const symbolKeys = Object.getOwnPropertySymbols(shape);
  const allKeys = symbolKeys.length ? [...keys, ...symbolKeys] : keys;
  const keyExpr = (k) => typeof k === "symbol" ? addConstant(ctx, k) : esc(k);
  const propKey = (k) => typeof k === "symbol" ? `[${keyExpr(k)}]` : esc(k);
  const propShape = shape;
  if (keys.includes("__proto__")) {
    throw new ZodCompileUnsupportedError('object shape key "__proto__"');
  }
  const propOutputs = new Map;
  for (const key of allKeys) {
    const propSchema = propShape[key];
    const kx = keyExpr(key);
    const inputVar = newVar(ctx);
    doc.write(`const ${inputVar} = ${accessor}[${kx}];`);
    if (propSchema._zod.optin !== undefined) {
      const outputVar2 = newVar(ctx);
      doc.write(`let ${outputVar2} = (() => {`);
      doc.indented((d) => {
        const outputAccessor = compileChild(d, ctx, propSchema, inputVar);
        d.write(`return ${outputAccessor};`);
      });
      doc.write(`})();`);
      if (propSchema._zod.optout === "optional") {
        doc.write(`if (${outputVar2} === INVALID) {`);
        doc.indented((d) => {
          d.write(`if (${kx} in ${accessor}) return INVALID;`);
          d.write(`${outputVar2} = undefined;`);
        });
        doc.write(`}`);
      } else {
        doc.write(`if (${outputVar2} === INVALID) return INVALID;`);
      }
      propOutputs.set(key, outputVar2);
    } else {
      if (requiresPresenceCheck(propSchema)) {
        doc.write(`if (!(${kx} in ${accessor})) return INVALID;`);
      }
      const outputAccessor = compileChild(doc, ctx, propSchema, inputVar, buildsValue);
      if (outputAccessor !== null)
        propOutputs.set(key, outputAccessor);
    }
  }
  const catchall = def.catchall;
  let unknownKeysMode = "none";
  if (catchall) {
    const catchallType = catchall._zod.def.type;
    if (catchallType === "never") {
      const condition = keys.map((k) => `k !== ${esc(k)}`).join(" && ") || "true";
      doc.write(`for (const k in ${accessor}) {`);
      doc.indented((d) => {
        d.write(`if (${condition}) return INVALID;`);
      });
      doc.write(`}`);
    } else if ((catchallType === "unknown" || catchallType === "any") && !catchall._zod.def.checks?.length) {
      unknownKeysMode = "passthrough";
    } else {
      unknownKeysMode = "schema";
    }
  }
  const outputVar = newVar(ctx);
  const hasConditionalKeys = allKeys.some((k) => mayOmitUndefined(propShape[k]) || dropsWhenAbsent(propShape[k]));
  if (!buildsValue) {
    if (unknownKeysMode === "schema") {
      const knownSet = keys.length > 0 ? addConstant(ctx, new Set(keys)) : null;
      doc.write(`for (const k in ${accessor}) {`);
      doc.indented((d) => {
        d.write(`if (k === "__proto__") continue;`);
        if (knownSet)
          d.write(`if (${knownSet}.has(k)) continue;`);
        const valVar = newVar(ctx);
        d.write(`const ${valVar} = ${accessor}[k];`);
        compileChild(d, ctx, catchall, valVar, false);
      });
      doc.write(`}`);
    }
    return null;
  }
  if (!hasConditionalKeys) {
    const propLiterals = allKeys.map((k) => `${propKey(k)}: ${propOutputs.get(k)}`).join(", ");
    doc.write(`const ${outputVar} = { ${propLiterals} };`);
  } else {
    doc.write(`const ${outputVar} = {};`);
    for (const k of allKeys) {
      const kx = keyExpr(k);
      const out = propOutputs.get(k);
      if (dropsWhenAbsent(propShape[k])) {
        doc.write(`if (${kx} in ${accessor}) ${outputVar}[${kx}] = ${out};`);
      } else if (mayOmitUndefined(propShape[k])) {
        doc.write(`if (${out} !== undefined || ${kx} in ${accessor}) ${outputVar}[${kx}] = ${out};`);
      } else {
        doc.write(`${outputVar}[${kx}] = ${out};`);
      }
    }
  }
  if (unknownKeysMode !== "none") {
    const knownSet = keys.length > 0 ? addConstant(ctx, new Set(keys)) : null;
    doc.write(`for (const k in ${accessor}) {`);
    doc.indented((d) => {
      d.write(`if (k === "__proto__") continue;`);
      if (knownSet)
        d.write(`if (${knownSet}.has(k)) continue;`);
      if (unknownKeysMode === "passthrough") {
        d.write(`${outputVar}[k] = ${accessor}[k];`);
      } else {
        const valVar = newVar(ctx);
        d.write(`const ${valVar} = ${accessor}[k];`);
        const catchallOut = compileChild(d, ctx, catchall, valVar);
        d.write(`${outputVar}[k] = ${catchallOut};`);
      }
    });
    doc.write(`}`);
  }
  return outputVar;
}
function generateOptionalCheck(doc, ctx, schema, accessor, buildsValue = true) {
  const def = schema._zod.def;
  if (isExactOptional(schema)) {
    return generateCheck(doc, ctx, def.innerType, accessor, buildsValue);
  }
  if (def.innerType._zod.optin === "defaulted") {
    const outputVar2 = newVar(ctx);
    const branchVar = newVar(ctx);
    doc.write(`let ${outputVar2};`);
    doc.write(`if (${accessor} === undefined) {`);
    doc.indented((d) => {
      d.write(`const ${branchVar} = (() => {`);
      d.indented((d2) => {
        const innerOutput = generateCheck(d2, ctx, def.innerType, accessor);
        d2.write(`return ${innerOutput};`);
      });
      d.write(`})();`);
      d.write(`if (${branchVar} !== INVALID) ${outputVar2} = ${branchVar};`);
    });
    doc.write(`} else {`);
    doc.indented((d) => {
      const innerOutput = generateCheck(d, ctx, def.innerType, accessor);
      d.write(`${outputVar2} = ${innerOutput};`);
    });
    doc.write(`}`);
    return outputVar2;
  }
  const outputVar = buildsValue ? newVar(ctx) : null;
  if (outputVar)
    doc.write(`let ${outputVar};`);
  doc.write(`if (${accessor} !== undefined) {`);
  doc.indented((d) => {
    const innerOutput = generateCheck(d, ctx, def.innerType, accessor, buildsValue);
    if (outputVar && innerOutput !== null)
      d.write(`${outputVar} = ${innerOutput};`);
  });
  doc.write(`}`);
  return outputVar;
}
function isExactOptional(schema) {
  return schema._zod.traits?.has("$ZodExactOptional") === true;
}
function requiresPresenceCheck(schema) {
  return schema._zod.optin === undefined && fastPathAcceptsAbsence(schema);
}
function fastPathAcceptsAbsence(schema) {
  if (schema._zod.def.coerce)
    return true;
  const def = schema._zod.def;
  switch (def.type) {
    case "any":
    case "unknown":
    case "undefined":
    case "void":
    case "default":
    case "prefault":
    case "transform":
    case "custom":
    case "lazy":
      return true;
    case "string":
    case "number":
    case "boolean":
    case "bigint":
    case "symbol":
    case "null":
    case "never":
    case "nan":
    case "date":
    case "object":
    case "array":
    case "tuple":
    case "record":
    case "map":
    case "set":
    case "file":
    case "template_literal":
      return false;
    case "nonoptional":
      return def.innerType ? fastPathAcceptsAbsence(def.innerType) : false;
    case "literal":
      return !!def.values?.includes(undefined);
    case "enum":
      return !!schema._zod.values?.has(undefined);
    case "optional":
    case "nullable":
    case "readonly":
    case "success":
      return def.innerType ? fastPathAcceptsAbsence(def.innerType) : true;
    case "catch":
      return true;
    case "union":
      return def.options ? def.options.some(fastPathAcceptsAbsence) : true;
    case "intersection":
      if (!def.left || !def.right)
        return true;
      return fastPathAcceptsAbsence(def.left) && fastPathAcceptsAbsence(def.right);
    case "pipe":
      return def.in ? fastPathAcceptsAbsence(def.in) : true;
    default:
      return true;
  }
}
function dropsWhenAbsent(schema) {
  return schema._zod.optin === "optional" && schema._zod.optout === "optional";
}
function mayOmitUndefined(schema) {
  return (schema._zod.optin !== "defaulted" || schema._zod.optout === "optional") && mayOutputUndefined(schema);
}
function mayOutputUndefined(schema) {
  const def = schema._zod.def;
  switch (def.type) {
    case "string":
    case "number":
    case "boolean":
    case "bigint":
    case "symbol":
    case "null":
    case "nan":
    case "date":
    case "object":
    case "array":
    case "tuple":
    case "record":
    case "map":
    case "set":
    case "file":
    case "template_literal":
    case "never":
    case "success":
      return false;
    case "literal":
      return !!def.values?.includes(undefined);
    case "enum":
      return !!schema._zod.values?.has(undefined);
    case "optional":
      return true;
    case "nullable":
    case "readonly":
    case "nonoptional":
      return def.innerType ? mayOutputUndefined(def.innerType) : true;
    case "union":
      return def.options ? def.options.some(mayOutputUndefined) : true;
    case "intersection":
      return !def.left || !def.right || mayOutputUndefined(def.left) || mayOutputUndefined(def.right);
    case "pipe":
      return def.out ? mayOutputUndefined(def.out) : true;
    default:
      return true;
  }
}
function generateNullableCheck(doc, ctx, schema, accessor, buildsValue = true) {
  const def = schema._zod.def;
  const outputVar = buildsValue ? newVar(ctx) : null;
  if (outputVar)
    doc.write(`let ${outputVar} = null;`);
  doc.write(`if (${accessor} !== null) {`);
  doc.indented((d) => {
    const innerOutput = generateCheck(d, ctx, def.innerType, accessor, buildsValue);
    if (outputVar && innerOutput !== null)
      d.write(`${outputVar} = ${innerOutput};`);
  });
  doc.write(`}`);
  return outputVar;
}
function generateSizeGate(doc, schema, size) {
  for (const [max, check] of sizeCaps(schema._zod.def.checks)) {
    doc.write(`if (${size} > ${numericOperand(max, check._zod.def.check)}) return INVALID;`);
  }
}
function generateArrayCheck(doc, ctx, schema, accessor, buildsValue = true) {
  const def = schema._zod.def;
  doc.write(`if (!Array.isArray(${accessor})) return INVALID;`);
  generateSizeGate(doc, schema, `${accessor}.length`);
  const outputVar = buildsValue ? newVar(ctx) : null;
  const iVar = newVar(ctx);
  const elemVar = newVar(ctx);
  if (outputVar)
    doc.write(`const ${outputVar} = new Array(${accessor}.length);`);
  doc.write(`for (let ${iVar} = 0; ${iVar} < ${accessor}.length; ${iVar}++) {`);
  doc.indented((d) => {
    d.write(`const ${elemVar} = ${accessor}[${iVar}];`);
    const elemOutput = compileChild(d, ctx, def.element, elemVar, buildsValue);
    if (outputVar && elemOutput !== null)
      d.write(`${outputVar}[${iVar}] = ${elemOutput};`);
  });
  doc.write(`}`);
  return outputVar;
}
function generateLiteralCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  const values = def.values;
  if (values.length !== 1) {
    const literalSet = addConstant(ctx, new Set(values));
    doc.write(`if (!${literalSet}.has(${accessor})) return INVALID;`);
    return accessor;
  }
  const value = values[0];
  if (typeof value === "number" && Number.isNaN(value)) {
    const literalSet = addConstant(ctx, new Set(values));
    doc.write(`if (!${literalSet}.has(${accessor})) return INVALID;`);
    return accessor;
  }
  if (typeof value === "string") {
    doc.write(`if (${accessor} !== ${esc(value)}) return INVALID;`);
  } else if (typeof value === "number" || typeof value === "boolean") {
    doc.write(`if (${accessor} !== ${value}) return INVALID;`);
  } else if (value === null) {
    doc.write(`if (${accessor} !== null) return INVALID;`);
  } else if (value === undefined) {
    doc.write(`if (${accessor} !== undefined) return INVALID;`);
  } else if (typeof value === "bigint") {
    doc.write(`if (${accessor} !== ${value}n) return INVALID;`);
  } else {
    throw new ZodCompileUnsupportedError(`literal type ${typeof value}`);
  }
  return accessor;
}
function generateEnumCheck(doc, ctx, schema, accessor) {
  const values = schema._zod.values;
  if (!values) {
    throw new ZodCompileUnsupportedError("enum schema without enumerated values");
  }
  const enumSet = addConstant(ctx, values);
  doc.write(`if (!${enumSet}.has(${accessor})) return INVALID;`);
  return accessor;
}
function generateWrapperCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  return generateCheck(doc, ctx, def.innerType, accessor);
}
function generateDefaultCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  const descriptor = Object.getOwnPropertyDescriptor(schema._zod.def, "defaultValue");
  const defaultGetter = descriptor ? () => schema._zod.def.defaultValue : undefined;
  if (schema._zod.def.type === "prefault") {
    if (!defaultGetter) {
      return generateCheck(doc, ctx, def.innerType, accessor);
    }
    const defaultFn = addConstant(ctx, defaultGetter);
    const inputVar = newVar(ctx);
    doc.write(`let ${inputVar} = ${accessor};`);
    doc.write(`if (${accessor} === undefined) ${inputVar} = ${defaultFn}();`);
    return generateCheck(doc, ctx, def.innerType, inputVar);
  }
  const outputVar = newVar(ctx);
  if (defaultGetter) {
    const defaultFn = addConstant(ctx, defaultGetter);
    const cloneFn = addConstant(ctx, shallowClone);
    doc.write(`let ${outputVar};`);
    doc.write(`if (${accessor} === undefined) {`);
    doc.indented((d) => {
      d.write(`${outputVar} = ${cloneFn}(${defaultFn}());`);
    });
    doc.write(`} else {`);
    doc.indented((d) => {
      const innerOutput = generateCheck(d, ctx, def.innerType, accessor);
      d.write(`${outputVar} = ${innerOutput} === undefined ? ${cloneFn}(${defaultFn}()) : ${innerOutput};`);
    });
    doc.write(`}`);
  } else {
    doc.write(`let ${outputVar};`);
    doc.write(`if (${accessor} !== undefined) {`);
    doc.indented((d) => {
      const innerOutput = generateCheck(d, ctx, def.innerType, accessor);
      d.write(`${outputVar} = ${innerOutput};`);
    });
    doc.write(`}`);
  }
  return outputVar;
}
function generateNonOptionalCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  const innerOutput = generateCheck(doc, ctx, def.innerType, accessor);
  const outputVar = newVar(ctx);
  doc.write(`const ${outputVar} = ${innerOutput};`);
  doc.write(`if (${outputVar} === undefined) return INVALID;`);
  return outputVar;
}
function generateTupleCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  const items = def.items;
  const rest = def.rest;
  doc.write(`if (!Array.isArray(${accessor})) return INVALID;`);
  const optinStart = getTupleOptStart2(items, "optin");
  const optoutStart = getTupleOptStart2(items, "optout");
  if (rest) {
    doc.write(`if (${accessor}.length < ${optinStart}) return INVALID;`);
  } else {
    doc.write(`if (${accessor}.length < ${optinStart} || ${accessor}.length > ${items.length}) return INVALID;`);
  }
  const outputVar = newVar(ctx);
  doc.write(`const ${outputVar} = [];`);
  for (let i = 0;i < items.length; i++) {
    const itemSchema = items[i];
    if (i >= optoutStart) {
      doc.write(`if (${outputVar}.length === ${i}) {`);
      doc.indented((d) => {
        d.write(`if (${i} < ${accessor}.length) {`);
        d.indented((d2) => {
          const elemVar = newVar(ctx);
          d2.write(`const ${elemVar} = ${accessor}[${i}];`);
          const elemOutput = compileChild(d2, ctx, itemSchema, elemVar);
          d2.write(`${outputVar}[${i}] = ${elemOutput};`);
        });
        d.write(`} else {`);
        d.indented((d2) => {
          if (dropsWhenAbsent(itemSchema)) {
            d2.write(`${outputVar}.length = ${i};`);
            return;
          }
          const elemVar = newVar(ctx);
          const branchVar = newVar(ctx);
          d2.write(`const ${elemVar} = undefined;`);
          d2.write(`const ${branchVar} = (() => {`);
          d2.indented((d3) => {
            const elemOutput = compileChild(d3, ctx, itemSchema, elemVar);
            d3.write(`return ${elemOutput};`);
          });
          d2.write(`})();`);
          d2.write(`if (${branchVar} === INVALID || ${branchVar} === undefined) ${outputVar}.length = ${i};`);
          d2.write(`else ${outputVar}[${i}] = ${branchVar};`);
        });
        d.write(`}`);
      });
      doc.write(`}`);
    } else {
      const elemVar = newVar(ctx);
      doc.write(`const ${elemVar} = ${accessor}[${i}];`);
      const elemOutput = compileChild(doc, ctx, itemSchema, elemVar);
      doc.write(`${outputVar}[${i}] = ${elemOutput};`);
    }
  }
  if (rest) {
    const iVar = newVar(ctx);
    const elemVar = newVar(ctx);
    doc.write(`for (let ${iVar} = ${items.length}; ${iVar} < ${accessor}.length; ${iVar}++) {`);
    doc.indented((d) => {
      d.write(`const ${elemVar} = ${accessor}[${iVar}];`);
      const elemOutput = compileChild(d, ctx, rest, elemVar);
      d.write(`${outputVar}[${iVar}] = ${elemOutput};`);
    });
    doc.write(`}`);
  }
  return outputVar;
}
function getTupleOptStart2(items, key) {
  for (let i = items.length - 1;i >= 0; i--) {
    const omittable = key === "optin" ? items[i]._zod.optin !== undefined : items[i]._zod.optout === "optional";
    if (!omittable)
      return i + 1;
  }
  return 0;
}
function generateUnionCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  const options = def.options;
  if (def.discriminator) {
    return generateDiscriminatedUnionCheck(doc, ctx, def, accessor);
  }
  if (def.inclusive === false) {
    throw new ZodCompileUnsupportedError("exclusive unions (z.xor)");
  }
  if (options.length === 0) {
    doc.write("return INVALID;");
    return accessor;
  }
  if (options.length === 1) {
    return generateCheck(doc, ctx, options[0], accessor);
  }
  const allLiterals = options.every((opt) => opt._zod.def.type === "literal" && !opt._zod.def.checks?.length);
  if (allLiterals) {
    const values = new Set(options.flatMap((opt) => opt._zod.def.values));
    const valuesConst = addConstant(ctx, values);
    doc.write(`if (!${valuesConst}.has(${accessor})) return INVALID;`);
    return accessor;
  }
  const outputVar = newVar(ctx);
  doc.write(`let ${outputVar};`);
  for (let i = 0;i < options.length; i++) {
    const opt = options[i];
    if (i === 0) {
      doc.write(`${outputVar} = (() => {`);
    } else {
      doc.write(`if (${outputVar} === INVALID) ${outputVar} = (() => {`);
    }
    doc.indented((d) => {
      const branchOutput = generateCheck(d, ctx, opt, accessor);
      d.write(`return ${branchOutput};`);
    });
    doc.write(`})();`);
  }
  doc.write(`if (${outputVar} === INVALID) return INVALID;`);
  return outputVar;
}
function generateDiscriminatedUnionCheck(doc, ctx, def, accessor) {
  if (def.unionFallback) {
    throw new ZodCompileUnsupportedError("discriminated union with unionFallback");
  }
  if (def.options.length === 0) {
    doc.write("return INVALID;");
    return accessor;
  }
  const discVar = newVar(ctx);
  const outputVar = newVar(ctx);
  doc.write(`const ${discVar} = ${accessor}?.[${esc(def.discriminator)}];`);
  doc.write(`let ${outputVar};`);
  let firstBranch = true;
  const claimed = new Set;
  for (const option of def.options) {
    const values = option._zod.propValues?.[def.discriminator];
    if (!values || values.size === 0) {
      throw new ZodCompileUnsupportedError("discriminated union option without static discriminator values");
    }
    for (const value of values) {
      if (claimed.has(value)) {
        throw new ZodCompileUnsupportedError(`duplicate discriminator value ${String(value)}`);
      }
      claimed.add(value);
    }
    const conditions = Array.from(values, (value) => literalEquality(ctx, discVar, value));
    const prefix = firstBranch ? "if" : "else if";
    doc.write(`${prefix} (${conditions.join(" || ")}) {`);
    doc.indented((d) => {
      const branchOutput = generateCheck(d, ctx, option, accessor);
      d.write(`${outputVar} = ${branchOutput};`);
    });
    doc.write(`}`);
    firstBranch = false;
  }
  doc.write(`else { return INVALID; }`);
  return outputVar;
}
function literalEquality(ctx, accessor, value) {
  if (typeof value === "string")
    return `${accessor} === ${esc(value)}`;
  if (typeof value === "number") {
    if (Number.isNaN(value))
      return `Number.isNaN(${accessor})`;
    return `${accessor} === ${value}`;
  }
  if (typeof value === "boolean")
    return `${accessor} === ${value}`;
  if (value === null)
    return `${accessor} === null`;
  if (value === undefined)
    return `${accessor} === undefined`;
  if (typeof value === "bigint")
    return `${accessor} === ${value}n`;
  if (typeof value === "symbol") {
    const symbolConst = addConstant(ctx, value);
    return `${accessor} === ${symbolConst}`;
  }
  throw new ZodCompileUnsupportedError(`literal discriminator value ${String(value)}`);
}
function generateIntersectionCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  ctx.definite = false;
  const leftOutput = compileChild(doc, ctx, def.left, accessor);
  const rightOutput = compileChild(doc, ctx, def.right, accessor);
  const mergeConst = addConstant(ctx, mergeValues);
  const mergedVar = newVar(ctx);
  doc.write(`const ${mergedVar} = ${mergeConst}(${leftOutput}, ${rightOutput});`);
  doc.write(`if (!${mergedVar}.valid) return INVALID;`);
  return `${mergedVar}.data`;
}
function generateRecordCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  const isPlainObjectConst = addConstant(ctx, isPlainObject);
  doc.write(`if (!${isPlainObjectConst}(${accessor})) return INVALID;`);
  const outputVar = newVar(ctx);
  const kVar = newVar(ctx);
  const valVar = newVar(ctx);
  doc.write(`const ${outputVar} = {};`);
  const recordDef = def;
  const keyValues = recordDef.partial ? undefined : def.keyType._zod.values;
  if (keyValues) {
    const inputKeys = [];
    for (const key of keyValues) {
      if (!(typeof key === "string" || typeof key === "number" || typeof key === "symbol")) {
        throw new ZodCompileUnsupportedError(`record key value ${String(key)}`);
      }
      const inputKey = typeof key === "number" ? key.toString() : key;
      if (inputKey === "__proto__") {
        throw new ZodCompileUnsupportedError('record key "__proto__"');
      }
      inputKeys.push(inputKey);
      const keyConst = addConstant(ctx, key);
      const outKey = generateCheck(doc, ctx, def.keyType, keyConst);
      const valueVar = newVar(ctx);
      doc.write(`const ${valueVar} = ${accessor}[${literalPropertyKey(ctx, inputKey)}];`);
      const valOutput = compileChild(doc, ctx, def.valueType, valueVar);
      doc.write(`${outputVar}[${outKey}] = ${valOutput};`);
    }
    const knownKeysConst = addConstant(ctx, new Set(inputKeys));
    doc.write(`for (const ${kVar} in ${accessor}) {`);
    doc.indented((d) => {
      d.write(`if (${knownKeysConst}.has(${kVar})) continue;`);
      if (recordDef.mode === "loose") {
        d.write(`if (${kVar} !== "__proto__") ${outputVar}[${kVar}] = ${accessor}[${kVar}];`);
      } else {
        d.write(`return INVALID;`);
      }
    });
    doc.write(`}`);
    return outputVar;
  }
  const keyDef = def.keyType._zod.def;
  const keyIsBareString = keyDef.type === "string" && keyDef.format === undefined && !keyDef.coerce && (keyDef.checks?.length ?? 0) === 0;
  if (!keyIsBareString) {
    const isLoose = def.mode === "loose";
    const keyFn = compileFn(def.keyType);
    if (keyFn.definite === false)
      ctx.definite = false;
    const keyFast = addConstant(ctx, keyFn);
    const numericConst = addConstant(ctx, number);
    const outKeyVar = newVar(ctx);
    emitOwnKeys(doc, ctx, accessor, kVar, (d) => {
      d.write(`let ${outKeyVar} = ${keyFast}(${kVar});`);
      d.write(`if (${outKeyVar} === INVALID && typeof ${kVar} === "string" && ${numericConst}.test(${kVar})) ${outKeyVar} = ${keyFast}(Number(${kVar}));`);
      if (isLoose) {
        d.write(`if (${outKeyVar} === INVALID) { ${outputVar}[${kVar}] = ${accessor}[${kVar}]; continue; }`);
      } else {
        d.write(`if (${outKeyVar} === INVALID) return INVALID;`);
      }
      d.write(`if (${outKeyVar} === "__proto__") continue;`);
      const valueVar = newVar(ctx);
      d.write(`const ${valueVar} = ${accessor}[${kVar}];`);
      const valOutput = compileChild(d, ctx, def.valueType, valueVar);
      d.write(`${outputVar}[${outKeyVar}] = ${valOutput};`);
    });
    return outputVar;
  }
  emitOwnKeys(doc, ctx, accessor, kVar, (d) => {
    d.write(`const ${valVar} = ${accessor}[${kVar}];`);
    const valOutput = compileChild(d, ctx, def.valueType, valVar);
    d.write(`${outputVar}[${kVar}] = ${valOutput};`);
  }, `return INVALID;`);
  return outputVar;
}
function emitOwnKeys(doc, ctx, accessor, kVar, body, onSymbol) {
  const propIsEnumerableConst = addConstant(ctx, Object.prototype.propertyIsEnumerable);
  const symsVar = newVar(ctx);
  const keysVar = newVar(ctx);
  const iVar = newVar(ctx);
  doc.write(`const ${symsVar} = Object.getOwnPropertySymbols(${accessor});`);
  doc.write(`const ${keysVar} = Object.getOwnPropertyNames(${accessor});`);
  doc.write(`for (let ${iVar} = 0; ${iVar} < ${keysVar}.length; ${iVar}++) {`);
  doc.indented((d) => {
    d.write(`const ${kVar} = ${keysVar}[${iVar}];`);
    d.write(`if (${kVar} === "__proto__" || !${propIsEnumerableConst}.call(${accessor}, ${kVar})) continue;`);
    body(d);
  });
  doc.write(`}`);
  doc.write(`for (let ${iVar} = 0; ${iVar} < ${symsVar}.length; ${iVar}++) {`);
  doc.indented((d) => {
    d.write(`const ${kVar} = ${symsVar}[${iVar}];`);
    d.write(`if (!${propIsEnumerableConst}.call(${accessor}, ${kVar})) continue;`);
    if (onSymbol)
      d.write(onSymbol);
    else
      body(d);
  });
  doc.write(`}`);
}
function literalPropertyKey(ctx, key) {
  if (typeof key === "string")
    return esc(key);
  return addConstant(ctx, key);
}
function generateMapCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  doc.write(`if (!(${accessor} instanceof Map)) return INVALID;`);
  generateSizeGate(doc, schema, `${accessor}.size`);
  const outputVar = newVar(ctx);
  const kVar = newVar(ctx);
  const valVar = newVar(ctx);
  doc.write(`const ${outputVar} = new Map();`);
  doc.write(`for (const [${kVar}, ${valVar}] of ${accessor}) {`);
  doc.indented((d) => {
    const keyOutput = generateCheck(d, ctx, def.keyType, kVar);
    const valOutput = generateCheck(d, ctx, def.valueType, valVar);
    d.write(`${outputVar}.set(${keyOutput}, ${valOutput});`);
  });
  doc.write(`}`);
  return outputVar;
}
function generateSetCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  doc.write(`if (!(${accessor} instanceof Set)) return INVALID;`);
  generateSizeGate(doc, schema, `${accessor}.size`);
  const outputVar = newVar(ctx);
  const valVar = newVar(ctx);
  doc.write(`const ${outputVar} = new Set();`);
  doc.write(`for (const ${valVar} of ${accessor}) {`);
  doc.indented((d) => {
    const valOutput = generateCheck(d, ctx, def.valueType, valVar);
    d.write(`${outputVar}.add(${valOutput});`);
  });
  doc.write(`}`);
  return outputVar;
}
function generateFileCheck(doc, accessor) {
  doc.write(`if (!(${accessor} instanceof File)) return INVALID;`);
  return accessor;
}
function generateTemplateLiteralCheck(doc, ctx, schema, accessor) {
  doc.write(`if (typeof ${accessor} !== "string") return INVALID;`);
  const pattern = schema._zod.pattern;
  if (pattern) {
    const patternConst = addConstant(ctx, pattern);
    doc.write(`${patternConst}.lastIndex = 0;`);
    doc.write(`if (!${patternConst}.test(${accessor})) return INVALID;`);
  }
  return accessor;
}
function generateLazyCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  const getterConst = addUserConstant(ctx, def.getter);
  const cacheConst = addConstant(ctx, { parser: null });
  doc.write(`if (!${cacheConst}.parser) {`);
  doc.indented((d) => {
    d.write(`const inner = ${getterConst}();`);
    d.write(`${cacheConst}.parser = function(input) {`);
    d.indented((d2) => {
      d2.write(`const result = inner._zod.run({ value: input, issues: [] }, {});`);
      d2.write(`return result.issues.length === 0 ? result.value : INVALID;`);
    });
    d.write(`};`);
  });
  doc.write(`}`);
  const outputVar = newVar(ctx);
  doc.write(`const ${outputVar} = ${cacheConst}.parser(${accessor});`);
  doc.write(`if (${outputVar} === INVALID) return INVALID;`);
  return outputVar;
}
function generatePipeCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  const inputOutput = generateCheck(doc, ctx, def.in, accessor);
  if (def.transform) {
    if (isAsyncFunction(def.transform)) {
      throw new ZodCompileAsyncError("z.compile: async transforms in pipes are not supported");
    }
    const transformFn = def.transform;
    const helperFn = (value) => {
      const fakePayload = { value, issues: [], addIssue: pushIssue };
      const result = transformFn(value, fakePayload);
      if (result instanceof Promise)
        return INVALID;
      return fakePayload.issues.length === 0 ? result : INVALID;
    };
    const helperConst = addUserConstant(ctx, helperFn);
    const transformedVar = newVar(ctx);
    doc.write(`const ${transformedVar} = ${helperConst}(${inputOutput});`);
    doc.write(`if (${transformedVar} === INVALID) return INVALID;`);
    return generateCheck(doc, ctx, def.out, transformedVar);
  } else {
    return generateCheck(doc, ctx, def.out, inputOutput);
  }
}
function isAsyncFunction(fn) {
  return typeof fn === "function" && (fn.constructor.name === "AsyncFunction" || fn[Symbol.toStringTag] === "AsyncFunction");
}
function generateCustomCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  if (def.fn) {
    if (isAsyncFunction(def.fn)) {
      throw new ZodCompileAsyncError("z.compile: async custom predicates are not supported");
    }
    const fnConst = addUserConstant(ctx, def.fn);
    const throwAsyncConst = addConstant(ctx, throwAsync);
    const resVar = newVar(ctx);
    doc.write(`const ${resVar} = ${fnConst}(${accessor});`);
    doc.write(`if (${resVar} instanceof Promise) ${throwAsyncConst}();`);
    doc.write(`if (!${resVar}) return INVALID;`);
  } else {
    throw new ZodCompileUnsupportedError("custom schema without a predicate function");
  }
  return accessor;
}
function runtimeCatch(innerSchema, catchValue, value) {
  const result = innerSchema._zod.run({ value, issues: [] }, {});
  if (result && typeof result.then === "function")
    return INVALID;
  const r = result;
  if (r.issues.length === 0)
    return r.value;
  return catchValue();
}
function generateCatchCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  if (!def.catchValue[CONSTANT_CATCH]) {
    throw new ZodCompileUnsupportedError("catch with a callback (only a constant catch value compiles)", false);
  }
  const outputVar = newVar(ctx);
  doc.write(`let ${outputVar} = (() => {`);
  doc.indented((d) => {
    const innerOut = compileChild(d, ctx, def.innerType, accessor);
    d.write(`return ${innerOut};`);
  });
  doc.write(`})();`);
  const innerConst = addConstant(ctx, def.innerType);
  const catchConst = addUserConstant(ctx, def.catchValue);
  const catchHelperConst = addConstant(ctx, runtimeCatch);
  doc.write(`if (${outputVar} === INVALID) {`);
  doc.indented((d) => {
    d.write(`${outputVar} = ${catchHelperConst}(${innerConst}, ${catchConst}, ${accessor});`);
    d.write(`if (${outputVar} === INVALID) return INVALID;`);
  });
  doc.write(`}`);
  return outputVar;
}
function generateTransformCheck(doc, ctx, schema, accessor) {
  const def = schema._zod.def;
  if (def.transform) {
    if (isAsyncFunction(def.transform)) {
      throw new ZodCompileAsyncError("z.compile: async transforms are not supported");
    }
    const transformFn = def.transform;
    const helperFn = (value) => {
      const fakePayload = { value, issues: [], addIssue: pushIssue };
      const result = transformFn(value, fakePayload);
      if (result instanceof Promise)
        return INVALID;
      return fakePayload.issues.length === 0 ? result : INVALID;
    };
    const helperConst = addUserConstant(ctx, helperFn);
    const outputVar = newVar(ctx);
    doc.write(`const ${outputVar} = ${helperConst}(${accessor});`);
    doc.write(`if (${outputVar} === INVALID) return INVALID;`);
    return outputVar;
  }
  return accessor;
}
// node_modules/zod/v4/core/api.js
function snapshotChecks(def) {
  if (def.checks)
    def.checks = [...def.checks];
  return def;
}
function _string(Class2, params) {
  return new Class2(snapshotChecks({ type: "string", ...normalizeParams(params) }));
}
function _coercedString(Class2, params) {
  return new Class2(snapshotChecks({ type: "string", coerce: true, ...normalizeParams(params) }));
}
function _email(Class2, params) {
  return new Class2({
    type: "string",
    format: "email",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _guid(Class2, params) {
  return new Class2({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuidv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v4",
    ...normalizeParams(params)
  });
}
function _uuidv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v6",
    ...normalizeParams(params)
  });
}
function _uuidv7(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v7",
    ...normalizeParams(params)
  });
}
function _url(Class2, params) {
  return new Class2({
    type: "string",
    format: "url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _emoji2(Class2, params) {
  return new Class2({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _nanoid(Class2, params) {
  return new Class2({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid2(Class2, params) {
  return new Class2({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ulid(Class2, params) {
  return new Class2({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _xid(Class2, params) {
  return new Class2({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ksuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _mac(Class2, params) {
  return new Class2({
    type: "string",
    format: "mac",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64(Class2, params) {
  return new Class2({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64url(Class2, params) {
  return new Class2({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _e164(Class2, params) {
  return new Class2({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _creditCard(Class2, params) {
  return new Class2({
    type: "string",
    format: "credit_card",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _iban(Class2, params) {
  return new Class2({
    type: "string",
    format: "iban",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _jwt(Class2, params) {
  return new Class2({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
var TimePrecision = {
  Any: null,
  Minute: -1,
  Second: 0,
  Millisecond: 3,
  Microsecond: 6
};
function _isoDateTime(Class2, params) {
  return new Class2({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: false,
    local: false,
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDate(Class2, params) {
  return new Class2({
    type: "string",
    format: "date",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _isoTime(Class2, params) {
  return new Class2({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDuration(Class2, params) {
  return new Class2({
    type: "string",
    format: "duration",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _number(Class2, params) {
  return new Class2(snapshotChecks({ type: "number", checks: [], ...normalizeParams(params) }));
}
function _coercedNumber(Class2, params) {
  return new Class2(snapshotChecks({ type: "number", coerce: true, checks: [], ...normalizeParams(params) }));
}
function _int(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "safeint",
    ...normalizeParams(params)
  });
}
function _float32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float32",
    ...normalizeParams(params)
  });
}
function _float64(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float64",
    ...normalizeParams(params)
  });
}
function _int32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "int32",
    ...normalizeParams(params)
  });
}
function _uint32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "uint32",
    ...normalizeParams(params)
  });
}
function _boolean(Class2, params) {
  return new Class2({
    type: "boolean",
    ...normalizeParams(params)
  });
}
function _coercedBoolean(Class2, params) {
  return new Class2({
    type: "boolean",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _bigint(Class2, params) {
  return new Class2({
    type: "bigint",
    ...normalizeParams(params)
  });
}
function _coercedBigint(Class2, params) {
  return new Class2({
    type: "bigint",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _int64(Class2, params) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "int64",
    ...normalizeParams(params)
  });
}
function _uint64(Class2, params) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "uint64",
    ...normalizeParams(params)
  });
}
function _symbol(Class2, params) {
  return new Class2({
    type: "symbol",
    ...normalizeParams(params)
  });
}
function _undefined2(Class2, params) {
  return new Class2({
    type: "undefined",
    ...normalizeParams(params)
  });
}
function _null2(Class2, params) {
  return new Class2({
    type: "null",
    ...normalizeParams(params)
  });
}
function _any(Class2) {
  return new Class2({
    type: "any"
  });
}
function _unknown(Class2) {
  return new Class2({
    type: "unknown"
  });
}
function _never(Class2, params) {
  return new Class2({
    type: "never",
    ...normalizeParams(params)
  });
}
function _void(Class2, params) {
  return new Class2({
    type: "void",
    ...normalizeParams(params)
  });
}
function _date(Class2, params) {
  return new Class2({
    type: "date",
    ...normalizeParams(params)
  });
}
function _coercedDate(Class2, params) {
  return new Class2({
    type: "date",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _nan(Class2, params) {
  return new Class2({
    type: "nan",
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
function _positive(params) {
  return _gt(0, params);
}
function _negative(params) {
  return _lt(0, params);
}
function _nonpositive(params) {
  return _lte(0, params);
}
function _nonnegative(params) {
  return _gte(0, params);
}
function _multipleOf(value, params) {
  return new $ZodCheckMultipleOf({
    check: "multiple_of",
    ...normalizeParams(params),
    value
  });
}
function _maxSize(maximum, params) {
  return new $ZodCheckMaxSize({
    check: "max_size",
    ...normalizeParams(params),
    maximum
  });
}
function _minSize(minimum, params) {
  return new $ZodCheckMinSize({
    check: "min_size",
    ...normalizeParams(params),
    minimum
  });
}
function _size(size, params) {
  return new $ZodCheckSizeEquals({
    check: "size_equals",
    ...normalizeParams(params),
    size
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
function _property(property, schema, params) {
  return new $ZodCheckProperty({
    check: "property",
    property,
    schema,
    ...normalizeParams(params)
  });
}
function _properties(shape, params) {
  return new $ZodCheckProperties({
    check: "properties",
    shape,
    ...normalizeParams(params)
  });
}
function _mime(types, params) {
  return new $ZodCheckMimeType({
    check: "mime_type",
    mime: types,
    ...normalizeParams(params)
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
function _array(Class2, element, params) {
  return new Class2({
    type: "array",
    element,
    ...normalizeParams(params)
  });
}
function _union(Class2, options, params) {
  return new Class2({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
function _xor(Class2, options, params) {
  return new Class2({
    type: "union",
    options,
    inclusive: false,
    ...normalizeParams(params)
  });
}
function _discriminatedUnion(Class2, discriminator, options, params) {
  return new Class2({
    type: "union",
    options,
    discriminator,
    ...normalizeParams(params)
  });
}
function _intersection(Class2, left, right) {
  return new Class2({
    type: "intersection",
    left,
    right
  });
}
function _tuple(Class2, items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new Class2({
    type: "tuple",
    items,
    rest,
    ...normalizeParams(params)
  });
}
function _record(Class2, keyType, valueType, params) {
  return new Class2({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
function _map(Class2, keyType, valueType, params) {
  return new Class2({
    type: "map",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
function _set(Class2, valueType, params) {
  return new Class2({
    type: "set",
    valueType,
    ...normalizeParams(params)
  });
}
function _enum(Class2, values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new Class2({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
function _nativeEnum(Class2, entries, params) {
  return new Class2({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
function _literal(Class2, value, params) {
  return new Class2({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params)
  });
}
function _file(Class2, params) {
  return new Class2({
    type: "file",
    ...normalizeParams(params)
  });
}
function _transform(Class2, fn) {
  return new Class2({
    type: "transform",
    transform: fn
  });
}
function _optional(Class2, innerType) {
  return new Class2({
    type: "optional",
    innerType
  });
}
function _nullable(Class2, innerType) {
  return new Class2({
    type: "nullable",
    innerType
  });
}
function _default(Class2, innerType, defaultValue) {
  return new Class2({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
function _nonoptional(Class2, innerType, params) {
  return new Class2({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params)
  });
}
function _success(Class2, innerType) {
  return new Class2({
    type: "success",
    innerType
  });
}
function _catch(Class2, innerType, catchValue) {
  return new Class2({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : constantCatch(catchValue)
  });
}
function _pipe(Class2, in_, out) {
  return new Class2({
    type: "pipe",
    in: in_,
    out
  });
}
function _readonly(Class2, innerType) {
  return new Class2({
    type: "readonly",
    innerType
  });
}
function _templateLiteral(Class2, parts, params) {
  return new Class2({
    type: "template_literal",
    parts,
    ...normalizeParams(params)
  });
}
function _lazy(Class2, getter) {
  return new Class2({
    type: "lazy",
    getter
  });
}
function _promise(Class2, innerType) {
  return new Class2({
    type: "promise",
    innerType
  });
}
function _custom(Class2, fn, _params) {
  const norm = normalizeParams(_params);
  norm.abort ?? (norm.abort = true);
  const schema = new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...norm
  });
  return schema;
}
function _refine(Class2, fn, _params) {
  const schema = new Class2({
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
function describe(description) {
  const ch = new $ZodCheck({ check: "describe" });
  ch._zod.onattach = [
    (inst) => {
      const existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, description });
    }
  ];
  ch._zod.check = () => {};
  return ch;
}
function meta(metadata) {
  const ch = new $ZodCheck({ check: "meta" });
  ch._zod.onattach = [
    (inst) => {
      const existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, ...metadata });
    }
  ];
  ch._zod.check = () => {};
  return ch;
}
function _stringbool(Classes, _params) {
  const params = normalizeParams(_params);
  let truthyArray = params.truthy ?? ["true", "1", "yes", "on", "y", "enabled"];
  let falsyArray = params.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
  if (params.case !== "sensitive") {
    truthyArray = truthyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
    falsyArray = falsyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
  }
  const truthySet = new Set(truthyArray);
  const falsySet = new Set(falsyArray);
  const _Codec = Classes.Codec ?? $ZodCodec;
  const _Boolean = Classes.Boolean ?? $ZodBoolean;
  const _String = Classes.String ?? $ZodString;
  const stringSchema = new _String({ type: "string", error: params.error });
  const booleanSchema = new _Boolean({ type: "boolean", error: params.error });
  const codec = new _Codec({
    type: "pipe",
    in: stringSchema,
    out: booleanSchema,
    transform: (input, payload) => {
      let data = input;
      if (params.case !== "sensitive")
        data = data.toLowerCase();
      if (truthySet.has(data)) {
        return true;
      } else if (falsySet.has(data)) {
        return false;
      } else {
        payload.issues.push({
          code: "invalid_value",
          expected: "stringbool",
          values: [...truthySet, ...falsySet],
          input: payload.value,
          inst: codec,
          continue: false
        });
        return {};
      }
    },
    reverseTransform: (input, _payload) => {
      if (input === true) {
        return truthyArray[0] || "true";
      } else {
        return falsyArray[0] || "false";
      }
    },
    error: params.error
  });
  codec._zod.bag.truthy = truthyArray;
  codec._zod.bag.falsy = falsyArray;
  codec._zod.bag.case = params.case ?? "insensitive";
  return codec;
}
function _stringFormat(Class2, format, fnOrRegex, _params = {}) {
  const params = normalizeParams(_params);
  const def = {
    check: "string_format",
    type: "string",
    format,
    fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
    ...params
  };
  if (fnOrRegex instanceof RegExp) {
    def.pattern = fnOrRegex;
  }
  const inst = new Class2(def);
  return inst;
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
  var _a3;
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
  const meta2 = ctx.metadataRegistry.get(schema);
  if (meta2)
    assignProps(result.schema, meta2);
  if (ctx.io === "input" && isTransforming(schema)) {
    delete result.schema.examples;
    delete result.schema.default;
  }
  if (ctx.io === "input" && "_prefault" in result.schema)
    (_a3 = result.schema).default ?? (_a3.default = result.schema._prefault);
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
      const uriGenerator = ctx.external.uri ?? ((id2) => id2);
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
    const schema2 = seen.schema;
    for (const key in schema2) {
      delete schema2[key];
    }
    schema2.$ref = ref;
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
function foldObjects(members2) {
  const objects = [];
  for (const member of members2) {
    if (typeof member !== "object" || member.type !== "object")
      return null;
    for (const key in member) {
      if (!FOLDABLE_KEYS.has(key))
        return null;
    }
    objects.push(member);
  }
  const properties = {};
  const required2 = new Set;
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
      required2.add(key);
  }
  const folded = { type: "object", properties };
  if (required2.size)
    folded.required = [...required2];
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
    const schema2 = seen.def ?? seen.schema;
    const _cached = { ...schema2 };
    const ref = seen.ref;
    seen.ref = null;
    if (ref) {
      flattenRef(ref);
      const refSeen = ctx.seen.get(ref);
      const refSchema = refSeen.schema;
      if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
        schema2.allOf = schema2.allOf ?? [];
        schema2.allOf.push(refSchema);
      } else {
        assignProps(schema2, refSchema);
      }
      assignProps(schema2, _cached);
      const isParentRef = zodSchema._zod.parent === ref;
      if (isParentRef) {
        for (const key in schema2) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (!(key in _cached)) {
            delete schema2[key];
          }
        }
      }
      if (refSchema.$ref && refSeen.def) {
        for (const key in schema2) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (key in refSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(refSeen.def[key])) {
            delete schema2[key];
          }
        }
      }
    }
    const parent = zodSchema._zod.parent;
    if (parent && parent !== ref) {
      flattenRef(parent);
      const parentSeen = ctx.seen.get(parent);
      if (parentSeen?.schema.$ref) {
        schema2.$ref = parentSeen.schema.$ref;
        if (parentSeen.def) {
          for (const key in schema2) {
            if (key === "$ref" || key === "allOf")
              continue;
            if (key in parentSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(parentSeen.def[key])) {
              delete schema2[key];
            }
          }
        }
      }
    }
    ctx.override({
      zodSchema,
      jsonSchema: schema2,
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
var symbolProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Symbols cannot be represented in JSON Schema");
};
var nullProcessor = (_schema, ctx, json, _params) => {
  if (ctx.target === "openapi-3.0") {
    json.type = "string";
    json.nullable = true;
    json.enum = [null];
  } else {
    json.type = "null";
  }
};
var undefinedProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Undefined cannot be represented in JSON Schema");
};
var voidProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Void cannot be represented in JSON Schema");
};
var neverProcessor = (_schema, _ctx, json, _params) => {
  json.not = {};
};
var anyProcessor = (_schema, _ctx, _json, _params) => {};
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
var nanProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "NaN cannot be represented in JSON Schema");
};
var templateLiteralProcessor = (schema, _ctx, json, _params) => {
  const _json = json;
  const pattern = schema._zod.pattern;
  if (!pattern)
    throw new Error("Pattern not found in template literal");
  _json.type = "string";
  _json.pattern = pattern.source;
};
var fileProcessor = (schema, _ctx, json, _params) => {
  const _json = json;
  _json.type = "string";
  _json.format = "binary";
  _json.contentEncoding = "binary";
  const { minimum, maximum, mime } = aggregateChecks(schema);
  if (minimum !== undefined)
    _json.minLength = minimum;
  if (maximum !== undefined)
    _json.maxLength = maximum;
  if (!mime)
    return;
  if (mime.length === 0)
    _json.not = {};
  else if (mime.length === 1)
    _json.contentMediaType = mime[0];
  else
    _json.anyOf = mime.map((m) => ({ contentMediaType: m }));
};
var successProcessor = (_schema, _ctx, json, _params) => {
  json.type = "boolean";
};
var customProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Custom types cannot be represented in JSON Schema");
};
var functionProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Function types cannot be represented in JSON Schema");
};
var transformProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Transforms cannot be represented in JSON Schema");
};
var mapProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Map cannot be represented in JSON Schema");
};
var setProcessor = (schema, ctx, json, params) => {
  handleUnrepresentable(schema, ctx, json, params, "Set cannot be represented in JSON Schema");
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
var promiseProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var optionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  processSchema(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var lazyProcessor = (schema, ctx, _json, params) => {
  const innerType = schema._zod.innerType;
  processSchema(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var allProcessors = {
  string: stringProcessor,
  number: numberProcessor,
  boolean: booleanProcessor,
  bigint: bigintProcessor,
  symbol: symbolProcessor,
  null: nullProcessor,
  undefined: undefinedProcessor,
  void: voidProcessor,
  never: neverProcessor,
  any: anyProcessor,
  unknown: unknownProcessor,
  date: dateProcessor,
  enum: enumProcessor,
  literal: literalProcessor,
  nan: nanProcessor,
  template_literal: templateLiteralProcessor,
  file: fileProcessor,
  success: successProcessor,
  custom: customProcessor,
  function: functionProcessor,
  transform: transformProcessor,
  map: mapProcessor,
  set: setProcessor,
  array: arrayProcessor,
  object: objectProcessor,
  union: unionProcessor,
  intersection: intersectionProcessor,
  tuple: tupleProcessor,
  record: recordProcessor,
  nullable: nullableProcessor,
  nonoptional: nonoptionalProcessor,
  default: defaultProcessor,
  prefault: prefaultProcessor,
  catch: catchProcessor,
  pipe: pipeProcessor,
  readonly: readonlyProcessor,
  promise: promiseProcessor,
  optional: optionalProcessor,
  lazy: lazyProcessor
};
function toJSONSchema(input, params) {
  if ("_idmap" in input) {
    const registry2 = input;
    const ctx2 = initializeContext({ ...params, processors: allProcessors });
    const defs = {};
    for (const entry of registry2._idmap.entries()) {
      const [_, schema] = entry;
      processSchema(schema, ctx2);
    }
    const schemas = {};
    const external = {
      registry: registry2,
      uri: params?.uri,
      defs
    };
    ctx2.external = external;
    for (const entry of registry2._idmap.entries()) {
      const [key, schema] = entry;
      extractDefs(ctx2, schema);
      assignProp(schemas, key, finalize(ctx2, schema));
    }
    if (Object.keys(defs).length > 0) {
      const defsSegment = ctx2.target === "draft-2020-12" ? "$defs" : "definitions";
      schemas.__shared = {
        [defsSegment]: defs
      };
    }
    return { schemas };
  }
  const ctx = initializeContext({ ...params, processors: allProcessors });
  processSchema(input, ctx);
  extractDefs(ctx, input);
  return finalize(ctx, input);
}
// node_modules/zod/v4/core/json-schema-generator.js
class JSONSchemaGenerator {
  get metadataRegistry() {
    return this.ctx.metadataRegistry;
  }
  get target() {
    return this.ctx.target;
  }
  get unrepresentable() {
    return this.ctx.unrepresentable;
  }
  get override() {
    return this.ctx.override;
  }
  get io() {
    return this.ctx.io;
  }
  get counter() {
    return this.ctx.counter;
  }
  set counter(value) {
    this.ctx.counter = value;
  }
  get seen() {
    return this.ctx.seen;
  }
  constructor(params) {
    let normalizedTarget = params?.target ?? "draft-2020-12";
    if (normalizedTarget === "draft-4")
      normalizedTarget = "draft-04";
    if (normalizedTarget === "draft-7")
      normalizedTarget = "draft-07";
    this.ctx = initializeContext({
      processors: allProcessors,
      target: normalizedTarget,
      ...params?.metadata && { metadata: params.metadata },
      ...params?.unrepresentable && { unrepresentable: params.unrepresentable },
      ...params?.override && { override: params.override },
      ...params?.io && { io: params.io }
    });
  }
  process(schema, _params = { path: [], schemaPath: [] }) {
    return processSchema(schema, this.ctx, _params);
  }
  emit(schema, _params) {
    if (_params) {
      if (_params.cycles)
        this.ctx.cycles = _params.cycles;
      if (_params.reused)
        this.ctx.reused = _params.reused;
      if (_params.external)
        this.ctx.external = _params.external;
    }
    this.ctx.sharedDefsExtractedFor = undefined;
    this.ctx.sharedEmitDoneFor = undefined;
    extractDefs(this.ctx, schema);
    const result = finalize(this.ctx, schema);
    const { "~standard": _, ...plainResult } = result;
    return plainResult;
  }
}
// node_modules/zod/v4/core/json-schema.js
var exports_json_schema = {};
// node_modules/zod/v4/classic/schemas.js
var exports_schemas2 = {};
__export(exports_schemas2, {
  xor: () => xor,
  xid: () => xid2,
  void: () => _void2,
  uuidv7: () => uuidv7,
  uuidv6: () => uuidv6,
  uuidv4: () => uuidv4,
  uuid: () => uuid2,
  url: () => url,
  unknown: () => unknown,
  union: () => union,
  undefined: () => _undefined3,
  ulid: () => ulid2,
  uint64: () => uint64,
  uint32: () => uint32,
  tuple: () => tuple,
  transform: () => transform,
  templateLiteral: () => templateLiteral,
  symbol: () => symbol,
  superRefine: () => superRefine,
  success: () => success,
  stringbool: () => stringbool,
  stringFormat: () => stringFormat,
  string: () => string2,
  strictObject: () => strictObject,
  set: () => set,
  refine: () => refine,
  record: () => record,
  readonly: () => readonly,
  promise: () => promise,
  preprocess: () => preprocess,
  prefault: () => prefault,
  pipe: () => pipe,
  partialRecord: () => partialRecord,
  optional: () => optional,
  object: () => object,
  number: () => number2,
  nullish: () => nullish2,
  nullable: () => nullable,
  null: () => _null3,
  nonoptional: () => nonoptional,
  never: () => never,
  nativeEnum: () => nativeEnum,
  nanoid: () => nanoid2,
  nan: () => nan,
  meta: () => meta2,
  map: () => map,
  mac: () => mac2,
  looseRecord: () => looseRecord,
  looseObject: () => looseObject,
  literal: () => literal,
  lazy: () => lazy,
  ksuid: () => ksuid2,
  keyof: () => keyof,
  jwt: () => jwt,
  json: () => json,
  ipv6: () => ipv62,
  ipv4: () => ipv42,
  invertCodec: () => invertCodec,
  intersection: () => intersection,
  int64: () => int64,
  int32: () => int32,
  int: () => int,
  instanceof: () => _instanceof,
  iban: () => iban2,
  httpUrl: () => httpUrl,
  hostname: () => hostname2,
  hex: () => hex2,
  hash: () => hash,
  guid: () => guid2,
  function: () => _function,
  float64: () => float64,
  float32: () => float32,
  file: () => file,
  exactOptional: () => exactOptional,
  enum: () => _enum2,
  emoji: () => emoji2,
  email: () => email2,
  e164: () => e1642,
  discriminatedUnion: () => discriminatedUnion,
  describe: () => describe2,
  date: () => date2,
  custom: () => custom,
  currencyCode: () => currencyCode2,
  cuid2: () => cuid22,
  cuid: () => cuid3,
  creditCard: () => creditCard2,
  codec: () => codec,
  cidrv6: () => cidrv62,
  cidrv4: () => cidrv42,
  check: () => check,
  catch: () => _catch2,
  boolean: () => boolean2,
  bigint: () => bigint2,
  base64url: () => base64url2,
  base64: () => base642,
  array: () => array,
  any: () => any,
  _function: () => _function,
  _default: () => _default2,
  _ZodString: () => _ZodString,
  ZodXor: () => ZodXor,
  ZodXID: () => ZodXID,
  ZodVoid: () => ZodVoid,
  ZodUnknown: () => ZodUnknown,
  ZodUnion: () => ZodUnion,
  ZodUndefined: () => ZodUndefined,
  ZodUUID: () => ZodUUID,
  ZodURL: () => ZodURL,
  ZodULID: () => ZodULID,
  ZodType: () => ZodType,
  ZodTuple: () => ZodTuple,
  ZodTransform: () => ZodTransform,
  ZodTemplateLiteral: () => ZodTemplateLiteral,
  ZodSymbol: () => ZodSymbol,
  ZodSuccess: () => ZodSuccess,
  ZodStringFormat: () => ZodStringFormat,
  ZodString: () => ZodString,
  ZodSet: () => ZodSet,
  ZodRecord: () => ZodRecord,
  ZodReadonly: () => ZodReadonly,
  ZodPromise: () => ZodPromise,
  ZodPreprocess: () => ZodPreprocess,
  ZodPrefault: () => ZodPrefault,
  ZodPipe: () => ZodPipe,
  ZodOptional: () => ZodOptional,
  ZodObject: () => ZodObject,
  ZodNumberFormat: () => ZodNumberFormat,
  ZodNumber: () => ZodNumber,
  ZodNullable: () => ZodNullable,
  ZodNull: () => ZodNull,
  ZodNonOptional: () => ZodNonOptional,
  ZodNever: () => ZodNever,
  ZodNanoID: () => ZodNanoID,
  ZodNaN: () => ZodNaN,
  ZodMap: () => ZodMap,
  ZodMAC: () => ZodMAC,
  ZodLiteral: () => ZodLiteral,
  ZodLazy: () => ZodLazy,
  ZodKSUID: () => ZodKSUID,
  ZodJWT: () => ZodJWT,
  ZodIntersection: () => ZodIntersection,
  ZodInstanceOf: () => ZodInstanceOf,
  ZodISOTime: () => ZodISOTime,
  ZodISODuration: () => ZodISODuration,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODate: () => ZodISODate,
  ZodIPv6: () => ZodIPv6,
  ZodIPv4: () => ZodIPv4,
  ZodIBAN: () => ZodIBAN,
  ZodGUID: () => ZodGUID,
  ZodFunction: () => ZodFunction,
  ZodFile: () => ZodFile,
  ZodExactOptional: () => ZodExactOptional,
  ZodEnum: () => ZodEnum,
  ZodEmoji: () => ZodEmoji,
  ZodEmail: () => ZodEmail,
  ZodE164: () => ZodE164,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodDefault: () => ZodDefault,
  ZodDate: () => ZodDate,
  ZodCustomStringFormat: () => ZodCustomStringFormat,
  ZodCustom: () => ZodCustom,
  ZodCreditCard: () => ZodCreditCard,
  ZodCodec: () => ZodCodec,
  ZodCatch: () => ZodCatch,
  ZodCUID2: () => ZodCUID2,
  ZodCUID: () => ZodCUID,
  ZodCIDRv6: () => ZodCIDRv6,
  ZodCIDRv4: () => ZodCIDRv4,
  ZodBoolean: () => ZodBoolean,
  ZodBigIntFormat: () => ZodBigIntFormat,
  ZodBigInt: () => ZodBigInt,
  ZodBase64URL: () => ZodBase64URL,
  ZodBase64: () => ZodBase64,
  ZodArray: () => ZodArray,
  ZodAny: () => ZodAny
});

// node_modules/zod/v4/classic/checks.js
var exports_checks2 = {};
__export(exports_checks2, {
  uppercase: () => _uppercase,
  trim: () => _trim,
  toUpperCase: () => _toUpperCase,
  toLowerCase: () => _toLowerCase,
  startsWith: () => _startsWith,
  slugify: () => _slugify,
  size: () => _size,
  regex: () => _regex,
  property: () => _property,
  properties: () => _properties,
  positive: () => _positive,
  overwrite: () => _overwrite,
  normalize: () => _normalize,
  nonpositive: () => _nonpositive,
  nonnegative: () => _nonnegative,
  negative: () => _negative,
  multipleOf: () => _multipleOf,
  minSize: () => _minSize,
  minLength: () => _minLength,
  mime: () => _mime,
  maxSize: () => _maxSize,
  maxLength: () => _maxLength,
  lte: () => _lte,
  lt: () => _lt,
  lowercase: () => _lowercase,
  length: () => _length,
  includes: () => _includes,
  gte: () => _gte,
  gt: () => _gt,
  endsWith: () => _endsWith
});

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
  _lazyMethod(proto, "addIssue", (self) => (issue2) => {
    self.issues.push(issue2);
    self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
  });
  _lazyMethod(proto, "addIssues", (self) => (issues2) => {
    self.issues.push(...issues2);
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
var parse3 = /* @__PURE__ */ _parse(ZodRealError);
var parseAsync2 = /* @__PURE__ */ _parseAsync(ZodRealError);
var safeParse2 = /* @__PURE__ */ _safeParse(ZodRealError);
var safeParseAsync2 = /* @__PURE__ */ _safeParseAsync(ZodRealError);
var encode2 = /* @__PURE__ */ _encode(ZodRealError);
var decode2 = /* @__PURE__ */ _decode(ZodRealError);
var encodeAsync2 = /* @__PURE__ */ _encodeAsync(ZodRealError);
var decodeAsync2 = /* @__PURE__ */ _decodeAsync(ZodRealError);
var safeEncode2 = /* @__PURE__ */ _safeEncode(ZodRealError);
var safeDecode2 = /* @__PURE__ */ _safeDecode(ZodRealError);
var safeEncodeAsync2 = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
var safeDecodeAsync2 = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);

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
    return this.clone(exports_util.mergeDefs(def, {
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
  register(reg, meta2) {
    reg.add(this, meta2);
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
    return _default2(this, d);
  },
  prefault(d) {
    return prefault(this, d);
  },
  catch(params) {
    return _catch2(this, params);
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
    return exports_util.hide(this, "~standard", {
      ...standardProps(this),
      jsonSchema: {
        input: createStandardJSONSchemaMethod(this, "input"),
        output: createStandardJSONSchemaMethod(this, "output")
      }
    });
  },
  set "~standard"(value) {
    exports_util.own(this, "~standard", value);
  },
  parse: function _parse2(data, params) {
    return parse3(this, data, params, { callee: _parse2 });
  },
  parseAsync: async function _parseAsync2(data, params) {
    return await parseAsync2(this, data, params, { callee: _parseAsync2 });
  },
  safeParse(data, params) {
    return safeParse2(this, data, params);
  },
  async safeParseAsync(data, params) {
    return safeParseAsync2(this, data, params);
  },
  get spa() {
    return this?.safeParseAsync;
  },
  set spa(value) {
    exports_util.own(this, "spa", value);
  },
  validate(data, params) {
    return validate(this, data, params);
  },
  validateAsync(data, params) {
    return validateAsync(this, data, params);
  },
  encode: function _encode2(data, params) {
    return encode2(this, data, params, { callee: _encode2 });
  },
  decode: function _decode2(data, params) {
    return decode2(this, data, params, { callee: _decode2 });
  },
  encodeAsync: async function _encodeAsync2(data, params) {
    return await encodeAsync2(this, data, params, { callee: _encodeAsync2 });
  },
  decodeAsync: async function _decodeAsync2(data, params) {
    return await decodeAsync2(this, data, params, { callee: _decodeAsync2 });
  },
  safeEncode(data, params) {
    return safeEncode2(this, data, params);
  },
  safeDecode(data, params) {
    return safeDecode2(this, data, params);
  },
  async safeEncodeAsync(data, params) {
    return safeEncodeAsync2(this, data, params);
  },
  async safeDecodeAsync(data, params) {
    return safeDecodeAsync2(this, data, params);
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
}, /* @__PURE__ */ exports_util.derived({
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
function guid2(params) {
  return _guid(ZodGUID, params);
}
var ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
  $ZodUUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function uuid2(params) {
  return _uuid(ZodUUID, params);
}
function uuidv4(params) {
  return _uuidv4(ZodUUID, params);
}
function uuidv6(params) {
  return _uuidv6(ZodUUID, params);
}
function uuidv7(params) {
  return _uuidv7(ZodUUID, params);
}
var ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
  $ZodURL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function url(params) {
  return _url(ZodURL, params);
}
function httpUrl(params) {
  return _url(ZodURL, {
    protocol: httpProtocol,
    hostname: domain,
    ...exports_util.normalizeParams(params)
  });
}
var ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
  $ZodEmoji.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function emoji2(params) {
  return _emoji2(ZodEmoji, params);
}
var ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
  $ZodNanoID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function nanoid2(params) {
  return _nanoid(ZodNanoID, params);
}
var ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
  $ZodCUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cuid3(params) {
  return _cuid(ZodCUID, params);
}
var ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
  $ZodCUID2.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cuid22(params) {
  return _cuid2(ZodCUID2, params);
}
var ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
  $ZodULID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ulid2(params) {
  return _ulid(ZodULID, params);
}
var ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
  $ZodXID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function xid2(params) {
  return _xid(ZodXID, params);
}
var ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
  $ZodKSUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ksuid2(params) {
  return _ksuid(ZodKSUID, params);
}
var ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
  $ZodIPv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ipv42(params) {
  return _ipv4(ZodIPv4, params);
}
var ZodMAC = /* @__PURE__ */ $constructor("ZodMAC", (inst, def) => {
  $ZodMAC.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function mac2(params) {
  return _mac(ZodMAC, params);
}
var ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
  $ZodIPv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ipv62(params) {
  return _ipv6(ZodIPv6, params);
}
var ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
  $ZodCIDRv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cidrv42(params) {
  return _cidrv4(ZodCIDRv4, params);
}
var ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
  $ZodCIDRv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cidrv62(params) {
  return _cidrv6(ZodCIDRv6, params);
}
var ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
  $ZodBase64.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function base642(params) {
  return _base64(ZodBase64, params);
}
var ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
  $ZodBase64URL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function base64url2(params) {
  return _base64url(ZodBase64URL, params);
}
var ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
  $ZodE164.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function e1642(params) {
  return _e164(ZodE164, params);
}
var ZodCreditCard = /* @__PURE__ */ $constructor("ZodCreditCard", (inst, def) => {
  $ZodCreditCard.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function creditCard2(params) {
  return _creditCard(ZodCreditCard, params);
}
var ZodIBAN = /* @__PURE__ */ $constructor("ZodIBAN", (inst, def) => {
  $ZodIBAN.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function iban2(params) {
  return _iban(ZodIBAN, params);
}
var ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
  $ZodJWT.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function jwt(params) {
  return _jwt(ZodJWT, params);
}
var ZodCustomStringFormat = /* @__PURE__ */ $constructor("ZodCustomStringFormat", (inst, def) => {
  $ZodCustomStringFormat.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function stringFormat(format, fnOrRegex, _params = {}) {
  return _stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
}
function hostname2(_params) {
  return _stringFormat(ZodCustomStringFormat, "hostname", hostname, _params);
}
function hex2(_params) {
  return _stringFormat(ZodCustomStringFormat, "hex", hex, _params);
}
function currencyCode2(_params) {
  return _stringFormat(ZodCustomStringFormat, "currency_code", currencyCode, _params);
}
function hash(alg, params) {
  const enc = params?.enc ?? "hex";
  const format = `${alg}_${enc}`;
  const regex = exports_regexes[format];
  if (!regex)
    throw new Error(`Unrecognized hash format: ${format}`);
  return _stringFormat(ZodCustomStringFormat, format, regex, params);
}
var ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
  $ZodNumber.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
  inst.isFinite = true;
}, /* @__PURE__ */ exports_util.derived({
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
function float32(params) {
  return _float32(ZodNumberFormat, params);
}
function float64(params) {
  return _float64(ZodNumberFormat, params);
}
function int32(params) {
  return _int32(ZodNumberFormat, params);
}
function uint32(params) {
  return _uint32(ZodNumberFormat, params);
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
}, /* @__PURE__ */ exports_util.derived({
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
function bigint2(params) {
  return _bigint(ZodBigInt, params);
}
var ZodBigIntFormat = /* @__PURE__ */ $constructor("ZodBigIntFormat", (inst, def) => {
  $ZodBigIntFormat.init(inst, def);
  ZodBigInt.init(inst, def);
});
function int64(params) {
  return _int64(ZodBigIntFormat, params);
}
function uint64(params) {
  return _uint64(ZodBigIntFormat, params);
}
var ZodSymbol = /* @__PURE__ */ $constructor("ZodSymbol", (inst, def) => {
  $ZodSymbol.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => symbolProcessor(inst, ctx, json, params);
});
function symbol(params) {
  return _symbol(ZodSymbol, params);
}
var ZodUndefined = /* @__PURE__ */ $constructor("ZodUndefined", (inst, def) => {
  $ZodUndefined.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => undefinedProcessor(inst, ctx, json, params);
});
function _undefined3(params) {
  return _undefined2(ZodUndefined, params);
}
var ZodNull = /* @__PURE__ */ $constructor("ZodNull", (inst, def) => {
  $ZodNull.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nullProcessor(inst, ctx, json, params);
});
function _null3(params) {
  return _null2(ZodNull, params);
}
var ZodAny = /* @__PURE__ */ $constructor("ZodAny", (inst, def) => {
  $ZodAny.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => anyProcessor(inst, ctx, json, params);
});
function any() {
  return _any(ZodAny);
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
var ZodVoid = /* @__PURE__ */ $constructor("ZodVoid", (inst, def) => {
  $ZodVoid.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => voidProcessor(inst, ctx, json, params);
});
function _void2(params) {
  return _void(ZodVoid, params);
}
var ZodDate = /* @__PURE__ */ $constructor("ZodDate", (inst, def) => {
  $ZodDate.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => dateProcessor(inst, ctx, json, params);
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
}, /* @__PURE__ */ exports_util.derived({
  minDate: (inst) => {
    const { minimum } = aggregateChecks(inst);
    return minimum ? new Date(minimum) : null;
  },
  maxDate: (inst) => {
    const { maximum } = aggregateChecks(inst);
    return maximum ? new Date(maximum) : null;
  }
}, {}));
function date2(params) {
  return _date(ZodDate, params);
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
function keyof(schema) {
  const shape = schema._zod.def.shape;
  return _enum2(Object.keys(shape));
}
var ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
  _ensureDefaultMemoizer();
  $ZodObjectJIT.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
  exports_util.installLazyProp(inst, "shape", (self) => self._zod.def.shape, false);
}, {
  keyof() {
    return _enum2(Object.keys(this._zod.def.shape));
  },
  catchall(catchall) {
    return this.clone(exports_util.mergeDefs(this._zod.def, { catchall }));
  },
  passthrough() {
    return this.clone(exports_util.mergeDefs(this._zod.def, { catchall: unknown() }));
  },
  loose() {
    return this.clone(exports_util.mergeDefs(this._zod.def, { catchall: unknown() }));
  },
  strict() {
    return this.clone(exports_util.mergeDefs(this._zod.def, { catchall: never() }));
  },
  strip() {
    return this.clone(exports_util.mergeDefs(this._zod.def, { catchall: undefined }));
  },
  extend(incoming) {
    return exports_util.extend(this, incoming);
  },
  safeExtend(incoming) {
    return exports_util.safeExtend(this, incoming);
  },
  merge(other) {
    return exports_util.merge(this, other);
  },
  pick(mask) {
    return exports_util.pick(this, mask);
  },
  omit(mask) {
    return exports_util.omit(this, mask);
  },
  partial(...args) {
    return exports_util.partial(ZodOptional, this, args[0]);
  },
  exactPartial(...args) {
    return exports_util.partial(ZodExactOptional, this, args[0], "exactPartial");
  },
  required(...args) {
    return exports_util.required(ZodNonOptional, this, args[0]);
  }
});
function object(shape, params) {
  const def = {
    type: "object",
    shape: shape ?? {},
    ...exports_util.normalizeParams(params)
  };
  return new ZodObject(def);
}
function strictObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: never(),
    ...exports_util.normalizeParams(params)
  });
}
function looseObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: unknown(),
    ...exports_util.normalizeParams(params)
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
    ...exports_util.normalizeParams(params)
  });
}
var ZodXor = /* @__PURE__ */ $constructor("ZodXor", (inst, def) => {
  ZodUnion.init(inst, def);
  $ZodXor.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
  inst.options = def.options;
});
function xor(options, params) {
  return new ZodXor({
    type: "union",
    options,
    inclusive: false,
    ...exports_util.normalizeParams(params)
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
    ...exports_util.normalizeParams(params)
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
    ...exports_util.normalizeParams(params)
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
      ...exports_util.normalizeParams(valueType)
    });
  }
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    ...exports_util.normalizeParams(params)
  });
}
function partialRecord(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    ...exports_util.normalizeParams(params),
    partial: true
  });
}
function looseRecord(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    mode: "loose",
    ...exports_util.normalizeParams(params)
  });
}
var ZodMap = /* @__PURE__ */ $constructor("ZodMap", (inst, def) => {
  _ensureDefaultMemoizer();
  $ZodMap.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => mapProcessor(inst, ctx, json, params);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
  inst.min = (...args) => inst.check(_minSize(...args));
  inst.nonempty = (params) => inst.check(_minSize(1, params));
  inst.max = (...args) => inst.check(_maxSize(...args));
  inst.size = (...args) => inst.check(_size(...args));
});
function map(keyType, valueType, params) {
  return new ZodMap({
    type: "map",
    keyType,
    valueType,
    ...exports_util.normalizeParams(params)
  });
}
var ZodSet = /* @__PURE__ */ $constructor("ZodSet", (inst, def) => {
  _ensureDefaultMemoizer();
  $ZodSet.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => setProcessor(inst, ctx, json, params);
  inst.min = (...args) => inst.check(_minSize(...args));
  inst.nonempty = (params) => inst.check(_minSize(1, params));
  inst.max = (...args) => inst.check(_maxSize(...args));
  inst.size = (...args) => inst.check(_size(...args));
});
function set(valueType, params) {
  return new ZodSet({
    type: "set",
    valueType,
    ...exports_util.normalizeParams(params)
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
      ...exports_util.normalizeParams(params),
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
      ...exports_util.normalizeParams(params),
      entries: newEntries
    });
  };
});
function _enum2(values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new ZodEnum({
    type: "enum",
    entries,
    ...exports_util.normalizeParams(params)
  });
}
function nativeEnum(entries, params) {
  return new ZodEnum({
    type: "enum",
    entries,
    ...exports_util.normalizeParams(params)
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
    ...exports_util.normalizeParams(params)
  });
}
var ZodFile = /* @__PURE__ */ $constructor("ZodFile", (inst, def) => {
  $ZodFile.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => fileProcessor(inst, ctx, json, params);
  inst.min = (size, params) => inst.check(_minSize(size, params));
  inst.max = (size, params) => inst.check(_maxSize(size, params));
  inst.mime = (types, params) => inst.check(_mime(Array.isArray(types) ? types : [types], params));
});
function file(params) {
  return _file(ZodFile, params);
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
        payload.issues.push(exports_util.issue(issue2, payload.value, def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        if (!("input" in _issue))
          _issue.input = payload.value;
        _issue.inst ?? (_issue.inst = inst);
        payload.issues.push(exports_util.issue(_issue));
      }
    };
    const output = def.transform(payload.value, payload);
    if (output instanceof Promise) {
      return output.then((output2) => {
        payload.value = output2;
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
function nullish2(innerType) {
  return optional(nullable(innerType));
}
var ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
  $ZodDefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeDefault = inst.unwrap;
});
function _default2(innerType, defaultValue) {
  return new ZodDefault({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : exports_util.shallowClone(defaultValue);
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
      return typeof defaultValue === "function" ? defaultValue() : exports_util.shallowClone(defaultValue);
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
    ...exports_util.normalizeParams(params)
  });
}
var ZodSuccess = /* @__PURE__ */ $constructor("ZodSuccess", (inst, def) => {
  $ZodSuccess.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => successProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function success(innerType) {
  return new ZodSuccess({
    type: "success",
    innerType
  });
}
var ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
  $ZodCatch.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeCatch = inst.unwrap;
});
function _catch2(innerType, catchValue) {
  return new ZodCatch({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : exports_util.constantCatch(catchValue)
  });
}
var ZodNaN = /* @__PURE__ */ $constructor("ZodNaN", (inst, def) => {
  $ZodNaN.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nanProcessor(inst, ctx, json, params);
});
function nan(params) {
  return _nan(ZodNaN, params);
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
var ZodCodec = /* @__PURE__ */ $constructor("ZodCodec", (inst, def) => {
  ZodPipe.init(inst, def);
  $ZodCodec.init(inst, def);
});
function codec(in_, out, params) {
  return new ZodCodec({
    type: "pipe",
    in: in_,
    out,
    transform: params.decode,
    reverseTransform: params.encode
  });
}
function invertCodec(codec2) {
  const def = codec2._zod.def;
  return new ZodCodec({
    type: "pipe",
    in: def.out,
    out: def.in,
    transform: def.reverseTransform,
    reverseTransform: def.transform
  });
}
var ZodPreprocess = /* @__PURE__ */ $constructor("ZodPreprocess", (inst, def) => {
  ZodPipe.init(inst, def);
  $ZodPreprocess.init(inst, def);
});
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
var ZodTemplateLiteral = /* @__PURE__ */ $constructor("ZodTemplateLiteral", (inst, def) => {
  $ZodTemplateLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => templateLiteralProcessor(inst, ctx, json, params);
});
function templateLiteral(parts, params) {
  return new ZodTemplateLiteral({
    type: "template_literal",
    parts,
    ...exports_util.normalizeParams(params)
  });
}
var ZodLazy = /* @__PURE__ */ $constructor("ZodLazy", (inst, def) => {
  $ZodLazy.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => lazyProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
  return new ZodLazy({
    type: "lazy",
    getter
  });
}
var ZodPromise = /* @__PURE__ */ $constructor("ZodPromise", (inst, def) => {
  $ZodPromise.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => promiseProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function promise(innerType) {
  return new ZodPromise({
    type: "promise",
    innerType
  });
}
var ZodFunction = /* @__PURE__ */ $constructor("ZodFunction", (inst, def) => {
  $ZodFunction.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => functionProcessor(inst, ctx, json, params);
});
function _function(params) {
  return new ZodFunction({
    type: "function",
    input: Array.isArray(params?.input) ? tuple(params?.input) : params?.input ?? array(unknown()),
    output: params?.output ?? unknown()
  });
}
var ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
  $ZodCustom.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
});
function check(fn) {
  const ch = new $ZodCheck({
    check: "custom"
  });
  ch._zod.check = fn;
  return ch;
}
function custom(fn, _params) {
  return _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
  return _refine(ZodCustom, fn, _params);
}
function superRefine(fn, params) {
  return _superRefine(fn, params);
}
var describe2 = describe;
var meta2 = meta;
var ZodInstanceOf = /* @__PURE__ */ $constructor("ZodInstanceOf", (inst, def) => {
  ZodCustom.init(inst, def);
}, {
  properties(shape, params) {
    return this.check(_properties(shape, params));
  }
});
function _instanceof(cls, params = {}) {
  const inst = new ZodInstanceOf({
    type: "custom",
    check: "custom",
    fn: (data) => data instanceof cls,
    abort: true,
    ...exports_util.normalizeParams(params)
  });
  inst._zod.bag.Class = cls;
  inst._zod.check = (payload) => {
    if (!(payload.value instanceof cls)) {
      payload.issues.push({
        code: "invalid_type",
        expected: cls.name,
        input: payload.value,
        inst,
        path: [...inst._zod.def.path ?? []]
      });
    }
  };
  return inst;
}
var stringbool = (...args) => _stringbool({
  Codec: ZodCodec,
  Boolean: ZodBoolean,
  String: ZodString
}, ...args);
function json(params) {
  const jsonSchema = lazy(() => {
    return union([string2(params), number2(), boolean2(), _null3(), array(jsonSchema), record(string2(), jsonSchema)]);
  });
  return jsonSchema;
}
function preprocess(fn, schema) {
  return new ZodPreprocess({
    type: "pipe",
    in: transform(fn),
    out: schema
  });
}
// node_modules/zod/v4/classic/compat.js
var ZodIssueCode = {
  invalid_type: "invalid_type",
  too_big: "too_big",
  too_small: "too_small",
  invalid_format: "invalid_format",
  not_multiple_of: "not_multiple_of",
  unrecognized_keys: "unrecognized_keys",
  invalid_union: "invalid_union",
  invalid_key: "invalid_key",
  invalid_element: "invalid_element",
  invalid_value: "invalid_value",
  custom: "custom"
};
function setErrorMap(map2) {
  config({
    customError: map2
  });
}
function getErrorMap() {
  return config().customError;
}
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
// node_modules/zod/v4/classic/iso.js
var exports_iso = {};
__export(exports_iso, {
  time: () => time2,
  duration: () => duration2,
  datetime: () => datetime2,
  date: () => date3,
  ZodISOTime: () => ZodISOTime,
  ZodISODuration: () => ZodISODuration,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODate: () => ZodISODate
});
function datetime2(params) {
  return _isoDateTime(ZodISODateTime, params);
}
function date3(params) {
  return _isoDate(ZodISODate, params);
}
function time2(params) {
  return _isoTime(ZodISOTime, params);
}
function duration2(params) {
  return _isoDuration(ZodISODuration, params);
}

// node_modules/zod/v4/classic/from-json-schema.js
var z = {
  ...exports_schemas2,
  ...exports_checks2,
  iso: exports_iso
};
var RECOGNIZED_KEYS = /* @__PURE__ */ new Set([
  "$schema",
  "$ref",
  "$defs",
  "definitions",
  "$id",
  "id",
  "$comment",
  "$anchor",
  "$vocabulary",
  "$dynamicRef",
  "$dynamicAnchor",
  "type",
  "enum",
  "const",
  "anyOf",
  "oneOf",
  "allOf",
  "not",
  "properties",
  "required",
  "additionalProperties",
  "patternProperties",
  "propertyNames",
  "minProperties",
  "maxProperties",
  "items",
  "prefixItems",
  "additionalItems",
  "minItems",
  "maxItems",
  "uniqueItems",
  "contains",
  "minContains",
  "maxContains",
  "minLength",
  "maxLength",
  "pattern",
  "format",
  "minimum",
  "maximum",
  "exclusiveMinimum",
  "exclusiveMaximum",
  "multipleOf",
  "description",
  "default",
  "contentEncoding",
  "contentMediaType",
  "contentSchema",
  "unevaluatedItems",
  "unevaluatedProperties",
  "if",
  "then",
  "else",
  "dependentSchemas",
  "dependentRequired",
  "nullable",
  "readOnly"
]);
function detectVersion(schema, defaultTarget) {
  const $schema = schema.$schema;
  if ($schema === "https://json-schema.org/draft/2020-12/schema") {
    return "draft-2020-12";
  }
  if ($schema === "http://json-schema.org/draft-07/schema#") {
    return "draft-7";
  }
  if ($schema === "http://json-schema.org/draft-04/schema#") {
    return "draft-4";
  }
  return defaultTarget ?? "draft-2020-12";
}
function applyMinItems(items, minItems) {
  return items.map((item, index) => index < minItems ? item : item.optional());
}
function decodeJSONPointerSegment(segment) {
  return segment.replace(/~1/g, "/").replace(/~0/g, "~");
}
function resolveRef(ref, ctx) {
  if (!ref.startsWith("#")) {
    throw new Error("External $ref is not supported, only local refs (#/...) are allowed");
  }
  const path = ref.slice(1).split("/").filter(Boolean);
  if (path.length === 0) {
    return ctx.rootSchema;
  }
  const defsKey = ctx.version === "draft-2020-12" ? "$defs" : "definitions";
  if (path[0] === defsKey) {
    const key = path[1] === undefined ? undefined : decodeJSONPointerSegment(path[1]);
    if (!key || !ctx.defs[key]) {
      throw new Error(`Reference not found: ${ref}`);
    }
    return ctx.defs[key];
  }
  throw new Error(`Reference not found: ${ref}`);
}
function checkObjectGuards(objectSchema, guards) {
  const guard = z.transform((value) => value).check((payload) => {
    const value = payload.value;
    if (typeof value !== "object" || value === null || Array.isArray(value))
      return;
    const keys = Object.getOwnPropertyNames(value);
    if (guards.minProperties !== undefined && keys.length < guards.minProperties) {
      payload.issues.push({
        origin: "object",
        code: "too_small",
        minimum: guards.minProperties,
        inclusive: true,
        message: `Too small: expected object to have >=${guards.minProperties} properties`,
        input: value,
        inst: objectSchema,
        continue: true
      });
    }
    if (guards.maxProperties !== undefined && keys.length > guards.maxProperties) {
      payload.issues.push({
        origin: "object",
        code: "too_big",
        maximum: guards.maxProperties,
        inclusive: true,
        message: `Too big: expected object to have <=${guards.maxProperties} properties`,
        input: value,
        inst: objectSchema,
        continue: true
      });
    }
    if (guards.keySchema) {
      for (const key of keys) {
        const result = guards.keySchema.safeParse(key);
        if (result.success)
          continue;
        payload.issues.push({
          code: "invalid_key",
          origin: "record",
          issues: result.error.issues,
          input: key,
          path: [key],
          continue: true
        });
      }
    }
  });
  return guard.pipe(objectSchema);
}
function canonicalKey(value, seen) {
  if (value === null)
    return "z";
  const type = typeof value;
  if (type !== "object") {
    if (type === "number" && Number.isNaN(value))
      return null;
    const raw = String(value);
    return `${type[0]}${raw.length}:${raw}`;
  }
  if (seen.has(value))
    return null;
  seen.add(value);
  try {
    if (Array.isArray(value)) {
      const parts2 = [];
      for (const item of value) {
        const key = canonicalKey(item, seen);
        if (key === null)
          return null;
        parts2.push(key);
      }
      return `a${parts2.length}:[${parts2.join(",")}]`;
    }
    const keys = Object.keys(value).sort();
    const parts = [];
    for (const k of keys) {
      const key = canonicalKey(value[k], seen);
      if (key === null)
        return null;
      parts.push(`${k.length}:${k}=${key}`);
    }
    return `o${parts.length}:{${parts.join(",")}}`;
  } finally {
    seen.delete(value);
  }
}
var SCHEMA_KEYWORDS = /* @__PURE__ */ new Set([
  "items",
  "prefixItems",
  "additionalItems",
  "additionalProperties",
  "contains",
  "propertyNames",
  "not",
  "if",
  "then",
  "else",
  "allOf",
  "anyOf",
  "oneOf",
  "unevaluatedItems",
  "unevaluatedProperties",
  "contentSchema"
]);
var SCHEMA_MAP_KEYWORDS = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "dependentSchemas",
  "dependencies",
  "$defs",
  "definitions"
]);
function containsRef(value) {
  if (typeof value !== "object" || value === null)
    return false;
  if (Array.isArray(value))
    return value.some(containsRef);
  if (typeof value.$ref === "string")
    return true;
  return Object.entries(value).some(([key, sub]) => {
    if (SCHEMA_KEYWORDS.has(key))
      return containsRef(sub);
    if (!SCHEMA_MAP_KEYWORDS.has(key) || typeof sub !== "object" || sub === null)
      return false;
    return Object.values(sub).some(containsRef);
  });
}
function plural(n) {
  return n === 1 ? "element" : "elements";
}
function checkArrayGuards(arraySchema, guards) {
  const guard = z.transform((value) => value).check((payload) => {
    const items = payload.value;
    if (!Array.isArray(items))
      return;
    if (guards.uniqueItems === true) {
      const firstSeen = new Map;
      for (let i = 0;i < items.length; i++) {
        const key = canonicalKey(items[i], new Set);
        if (key === null)
          continue;
        const first = firstSeen.get(key);
        if (first === undefined) {
          firstSeen.set(key, i);
          continue;
        }
        payload.issues.push({
          code: "custom",
          message: `Array items must be unique: element at index ${i} duplicates the one at index ${first}`,
          input: items,
          path: [i],
          continue: true
        });
      }
    }
    if (guards.containsSchema) {
      const minContains = guards.minContains ?? 1;
      const ceiling = guards.maxContains !== undefined ? guards.maxContains + 1 : Number.POSITIVE_INFINITY;
      let matches = 0;
      for (const item of items) {
        if (guards.containsSchema.safeParse(item).success && ++matches >= ceiling)
          break;
      }
      if (matches < minContains) {
        payload.issues.push({
          code: "custom",
          message: `Array must contain at least ${minContains} matching ${plural(minContains)}; found ${matches}`,
          input: items,
          continue: true
        });
      }
      if (guards.maxContains !== undefined && matches > guards.maxContains) {
        payload.issues.push({
          code: "custom",
          message: `Array must contain at most ${guards.maxContains} matching ${plural(guards.maxContains)}`,
          input: items,
          continue: true
        });
      }
    }
  });
  return guard.pipe(arraySchema);
}
function getTupleRest(restSchema, ctx) {
  if (restSchema === false) {
    return;
  }
  if (restSchema === undefined || restSchema === true) {
    return z.any();
  }
  return convertSchema(restSchema, ctx);
}
var fullTime = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/;
function convertBaseSchema(schema, ctx) {
  if (schema.not !== undefined) {
    if (typeof schema.not === "object" && Object.keys(schema.not).length === 0) {
      return z.never();
    }
    throw new Error("not is not supported in Zod (except { not: {} } for never)");
  }
  if (schema.unevaluatedItems !== undefined) {
    throw new Error("unevaluatedItems is not supported");
  }
  if (schema.unevaluatedProperties !== undefined) {
    throw new Error("unevaluatedProperties is not supported");
  }
  if (schema.if !== undefined || schema.then !== undefined || schema.else !== undefined) {
    throw new Error("Conditional schemas (if/then/else) are not supported");
  }
  if (schema.dependentSchemas !== undefined || schema.dependentRequired !== undefined) {
    throw new Error("dependentSchemas and dependentRequired are not supported");
  }
  if (schema.$ref) {
    const refPath = schema.$ref;
    if (ctx.refs.has(refPath)) {
      return ctx.refs.get(refPath);
    }
    if (ctx.processing.has(refPath)) {
      return z.lazy(() => {
        if (!ctx.refs.has(refPath)) {
          throw new Error(`Circular reference not resolved: ${refPath}`);
        }
        return ctx.refs.get(refPath);
      });
    }
    ctx.processing.add(refPath);
    const resolved = resolveRef(refPath, ctx);
    const zodSchema2 = convertSchema(resolved, ctx);
    ctx.refs.set(refPath, zodSchema2);
    ctx.processing.delete(refPath);
    return zodSchema2;
  }
  if (schema.enum !== undefined) {
    const enumValues = schema.enum;
    if (ctx.version === "openapi-3.0" && schema.nullable === true && enumValues.length === 1 && enumValues[0] === null) {
      return z.null();
    }
    if (enumValues.length === 0) {
      return z.never();
    }
    if (enumValues.length === 1) {
      return z.literal(enumValues[0]);
    }
    if (enumValues.every((v) => typeof v === "string")) {
      return z.enum(enumValues);
    }
    const literalSchemas = enumValues.map((v) => z.literal(v));
    if (literalSchemas.length < 2) {
      return literalSchemas[0];
    }
    return z.union([literalSchemas[0], literalSchemas[1], ...literalSchemas.slice(2)]);
  }
  if (schema.const !== undefined) {
    return z.literal(schema.const);
  }
  const type = schema.type;
  if (Array.isArray(type)) {
    const typeSchemas = type.map((t) => {
      const typeSchema = { ...schema, type: t };
      return convertBaseSchema(typeSchema, ctx);
    });
    if (typeSchemas.length === 0) {
      return z.never();
    }
    if (typeSchemas.length === 1) {
      return typeSchemas[0];
    }
    return z.union(typeSchemas);
  }
  if (!type) {
    return z.any();
  }
  let zodSchema;
  switch (type) {
    case "string": {
      let stringSchema = z.string();
      if (schema.format) {
        const format = schema.format;
        if (format === "email") {
          stringSchema = stringSchema.check(z.email());
        } else if (format === "uri" || format === "uri-reference") {
          stringSchema = stringSchema.check(z.url());
        } else if (format === "uuid" || format === "guid") {
          stringSchema = stringSchema.check(z.uuid());
        } else if (format === "date-time") {
          stringSchema = stringSchema.check(z.iso.datetime({ offset: true }));
        } else if (format === "date") {
          stringSchema = stringSchema.check(z.iso.date());
        } else if (format === "time") {
          stringSchema = stringSchema.check(z.regex(fullTime));
        } else if (format === "duration") {
          stringSchema = stringSchema.check(z.iso.duration());
        } else if (format === "hostname") {
          stringSchema = stringSchema.check(z.hostname());
        } else if (format === "ipv4") {
          stringSchema = stringSchema.check(z.ipv4());
        } else if (format === "ipv6") {
          stringSchema = stringSchema.check(z.ipv6());
        } else if (format === "mac") {
          stringSchema = stringSchema.check(z.mac());
        } else if (format === "cidr") {
          stringSchema = stringSchema.check(z.cidrv4());
        } else if (format === "cidr-v6") {
          stringSchema = stringSchema.check(z.cidrv6());
        } else if (format === "base64") {
          stringSchema = stringSchema.check(z.base64());
        } else if (format === "base64url") {
          stringSchema = stringSchema.check(z.base64url());
        } else if (format === "e164") {
          stringSchema = stringSchema.check(z.e164());
        } else if (format === "credit_card") {
          stringSchema = stringSchema.check(z.creditCard());
        } else if (format === "iban") {
          stringSchema = stringSchema.check(z.iban());
        } else if (format === "jwt") {
          stringSchema = stringSchema.check(z.jwt());
        } else if (format === "emoji") {
          stringSchema = stringSchema.check(z.emoji());
        } else if (format === "nanoid") {
          stringSchema = stringSchema.check(z.nanoid());
        } else if (format === "cuid") {
          stringSchema = stringSchema.check(z.cuid());
        } else if (format === "cuid2") {
          stringSchema = stringSchema.check(z.cuid2());
        } else if (format === "ulid") {
          stringSchema = stringSchema.check(z.ulid());
        } else if (format === "xid") {
          stringSchema = stringSchema.check(z.xid());
        } else if (format === "ksuid") {
          stringSchema = stringSchema.check(z.ksuid());
        }
      }
      if (typeof schema.minLength === "number") {
        stringSchema = stringSchema.min(schema.minLength);
      }
      if (typeof schema.maxLength === "number") {
        stringSchema = stringSchema.max(schema.maxLength);
      }
      if (schema.pattern) {
        stringSchema = stringSchema.regex(new RegExp(schema.pattern));
      }
      zodSchema = stringSchema;
      break;
    }
    case "number":
    case "integer": {
      let numberSchema = type === "integer" ? z.number().int() : z.number();
      if (typeof schema.minimum === "number" && schema.exclusiveMinimum !== true) {
        numberSchema = numberSchema.min(schema.minimum);
      }
      if (typeof schema.maximum === "number" && schema.exclusiveMaximum !== true) {
        numberSchema = numberSchema.max(schema.maximum);
      }
      if (typeof schema.exclusiveMinimum === "number") {
        numberSchema = numberSchema.gt(schema.exclusiveMinimum);
      } else if (schema.exclusiveMinimum === true && typeof schema.minimum === "number") {
        numberSchema = numberSchema.gt(schema.minimum);
      }
      if (typeof schema.exclusiveMaximum === "number") {
        numberSchema = numberSchema.lt(schema.exclusiveMaximum);
      } else if (schema.exclusiveMaximum === true && typeof schema.maximum === "number") {
        numberSchema = numberSchema.lt(schema.maximum);
      }
      if (typeof schema.multipleOf === "number") {
        numberSchema = numberSchema.multipleOf(schema.multipleOf);
      }
      zodSchema = numberSchema;
      break;
    }
    case "boolean": {
      zodSchema = z.boolean();
      break;
    }
    case "null": {
      zodSchema = z.null();
      break;
    }
    case "object": {
      const shape = {};
      const properties = schema.properties || {};
      const requiredSet = new Set(schema.required || []);
      const additionalSchema = typeof schema.additionalProperties === "object" ? convertSchema(schema.additionalProperties, ctx) : undefined;
      for (const [key, propSchema] of Object.entries(properties)) {
        const propZodSchema = convertSchema(propSchema, ctx);
        assignProp(shape, key, requiredSet.has(key) ? propZodSchema : propZodSchema.optional());
      }
      if (schema.patternProperties) {
        const patternProps = schema.patternProperties;
        const patternKeys = Object.keys(patternProps);
        const looseRecords = [];
        for (const pattern of patternKeys) {
          const patternValue = convertSchema(patternProps[pattern], ctx);
          const keySchema = z.string().regex(new RegExp(pattern));
          looseRecords.push(z.looseRecord(keySchema, patternValue));
        }
        const schemasToIntersect = [];
        if (Object.keys(shape).length > 0) {
          schemasToIntersect.push(z.object(shape).passthrough());
        }
        schemasToIntersect.push(...looseRecords);
        if (schemasToIntersect.length === 0) {
          zodSchema = z.object({}).passthrough();
        } else if (schemasToIntersect.length === 1) {
          zodSchema = schemasToIntersect[0];
        } else {
          let result = z.intersection(schemasToIntersect[0], schemasToIntersect[1]);
          for (let i = 2;i < schemasToIntersect.length; i++) {
            result = z.intersection(result, schemasToIntersect[i]);
          }
          zodSchema = result;
        }
        if (schema.additionalProperties === false) {
          const propertyKeys = Object.keys(shape);
          const patterns = patternKeys.map((p) => new RegExp(p));
          const basePatternSchema = zodSchema;
          zodSchema = zodSchema.check((payload) => {
            if (!isPlainObject(payload.value))
              return;
            const unrecognized = [];
            for (const key of Object.keys(payload.value)) {
              if (propertyKeys.includes(key))
                continue;
              if (patterns.some((regex) => regex.test(key)))
                continue;
              unrecognized.push(key);
            }
            if (unrecognized.length) {
              payload.issues.push({
                code: "unrecognized_keys",
                keys: unrecognized,
                input: payload.value,
                inst: basePatternSchema
              });
            }
          });
        }
      } else {
        const objectSchema = z.object(shape);
        if (schema.additionalProperties === false) {
          zodSchema = objectSchema.strict();
        } else if (additionalSchema) {
          zodSchema = objectSchema.catchall(additionalSchema);
        } else {
          zodSchema = objectSchema.passthrough();
        }
      }
      const hasKeyGuard = schema.propertyNames !== undefined && schema.propertyNames !== true;
      const minProperties = typeof schema.minProperties === "number" ? schema.minProperties : undefined;
      const maxProperties = typeof schema.maxProperties === "number" ? schema.maxProperties : undefined;
      if (hasKeyGuard || minProperties !== undefined || maxProperties !== undefined) {
        let keySchema;
        if (hasKeyGuard) {
          const keyJSONSchema = typeof schema.propertyNames === "object" && schema.propertyNames.type === undefined ? { type: "string", ...schema.propertyNames } : schema.propertyNames;
          keySchema = convertSchema(keyJSONSchema, ctx);
        }
        zodSchema = checkObjectGuards(zodSchema, { keySchema, minProperties, maxProperties });
      }
      break;
    }
    case "array": {
      const prefixItems = schema.prefixItems;
      const items = schema.items;
      if (prefixItems && Array.isArray(prefixItems)) {
        const minItems = typeof schema.minItems === "number" ? schema.minItems : 0;
        const tupleItems = prefixItems.map((item) => convertSchema(item, ctx));
        const positionalItems = applyMinItems(tupleItems, minItems);
        const rest = !Array.isArray(items) ? getTupleRest(items, ctx) : undefined;
        const tupleSchema = z.tuple(positionalItems);
        zodSchema = rest ? tupleSchema.rest(rest) : tupleSchema;
        if (typeof schema.minItems === "number") {
          zodSchema = zodSchema.check(z.minLength(schema.minItems));
        }
        if (typeof schema.maxItems === "number") {
          zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
        }
      } else if (Array.isArray(items)) {
        const minItems = typeof schema.minItems === "number" ? schema.minItems : 0;
        const tupleItems = items.map((item) => convertSchema(item, ctx));
        const positionalItems = applyMinItems(tupleItems, minItems);
        const rest = getTupleRest(schema.additionalItems, ctx);
        const tupleSchema = z.tuple(positionalItems);
        zodSchema = rest ? tupleSchema.rest(rest) : tupleSchema;
        if (typeof schema.minItems === "number") {
          zodSchema = zodSchema.check(z.minLength(schema.minItems));
        }
        if (typeof schema.maxItems === "number") {
          zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
        }
      } else if (items !== undefined) {
        const element = convertSchema(items, ctx);
        let arraySchema = z.array(element);
        if (typeof schema.minItems === "number") {
          arraySchema = arraySchema.min(schema.minItems);
        }
        if (typeof schema.maxItems === "number") {
          arraySchema = arraySchema.max(schema.maxItems);
        }
        zodSchema = arraySchema;
      } else {
        zodSchema = z.array(z.any());
      }
      if (schema.uniqueItems === true || schema.contains !== undefined) {
        zodSchema = checkArrayGuards(zodSchema, {
          uniqueItems: schema.uniqueItems === true,
          containsSchema: schema.contains !== undefined ? convertSchema(schema.contains, ctx) : undefined,
          minContains: typeof schema.minContains === "number" ? schema.minContains : undefined,
          maxContains: typeof schema.maxContains === "number" ? schema.maxContains : undefined
        });
      }
      break;
    }
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
  return zodSchema;
}
function convertSchema(schema, ctx) {
  if (typeof schema === "boolean") {
    return schema ? z.any() : z.never();
  }
  let baseSchema = convertBaseSchema(schema, ctx);
  const hasExplicitType = schema.type || schema.enum !== undefined || schema.const !== undefined;
  if (schema.anyOf && Array.isArray(schema.anyOf)) {
    const options = schema.anyOf.map((s) => convertSchema(s, ctx));
    const anyOfUnion = z.union(options);
    baseSchema = hasExplicitType ? z.intersection(baseSchema, anyOfUnion) : anyOfUnion;
  }
  if (schema.oneOf && Array.isArray(schema.oneOf)) {
    const options = schema.oneOf.map((s) => convertSchema(s, ctx));
    const oneOfUnion = z.xor(options);
    baseSchema = hasExplicitType ? z.intersection(baseSchema, oneOfUnion) : oneOfUnion;
  }
  if (schema.allOf && Array.isArray(schema.allOf)) {
    if (schema.allOf.length === 0) {
      baseSchema = hasExplicitType ? baseSchema : z.any();
    } else {
      let result = hasExplicitType ? baseSchema : convertSchema(schema.allOf[0], ctx);
      const startIdx = hasExplicitType ? 0 : 1;
      for (let i = startIdx;i < schema.allOf.length; i++) {
        result = z.intersection(result, convertSchema(schema.allOf[i], ctx));
      }
      baseSchema = result;
    }
  }
  if (schema.nullable === true && ctx.version === "openapi-3.0") {
    baseSchema = z.nullable(baseSchema);
  }
  if (schema.readOnly === true) {
    baseSchema = z.readonly(baseSchema);
  }
  if (schema.default !== undefined) {
    baseSchema = baseSchema.default(schema.default);
  }
  const extraMeta = {};
  const coreMetadataKeys = ["$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor"];
  for (const key of coreMetadataKeys) {
    if (key in schema) {
      extraMeta[key] = schema[key];
    }
  }
  const contentMetadataKeys = ["contentEncoding", "contentMediaType", "contentSchema"];
  for (const key of contentMetadataKeys) {
    if (key in schema) {
      extraMeta[key] = schema[key];
    }
  }
  if (schema.type === "object" && schema.$ref === undefined) {
    if (schema.propertyNames !== undefined && !containsRef(schema.propertyNames)) {
      extraMeta.propertyNames = schema.propertyNames;
    }
    for (const key of ["minProperties", "maxProperties"]) {
      if (schema[key] !== undefined)
        extraMeta[key] = schema[key];
    }
  }
  if (schema.type === "array" && schema.$ref === undefined) {
    if (schema.contains !== undefined && !containsRef(schema.contains)) {
      extraMeta.contains = schema.contains;
    }
    for (const key of ["uniqueItems", "minContains", "maxContains"]) {
      if (schema[key] !== undefined)
        extraMeta[key] = schema[key];
    }
  }
  for (const key of Object.keys(schema)) {
    if (!RECOGNIZED_KEYS.has(key)) {
      assignProp(extraMeta, key, schema[key]);
    }
  }
  if (Object.keys(extraMeta).length > 0) {
    ctx.registry.add(baseSchema, extraMeta);
  }
  if (schema.description) {
    baseSchema = baseSchema.describe(schema.description);
  }
  return baseSchema;
}
function fromJSONSchema(schema, params) {
  if (typeof schema === "boolean") {
    return schema ? z.any() : z.never();
  }
  let normalized;
  try {
    normalized = JSON.parse(JSON.stringify(schema));
  } catch {
    throw new Error("fromJSONSchema input is not valid JSON (possibly cyclic); use $defs/$ref for recursive schemas");
  }
  const version2 = detectVersion(normalized, params?.defaultTarget);
  const defs = normalized.$defs || normalized.definitions || {};
  const ctx = {
    version: version2,
    defs,
    refs: new Map,
    processing: new Set,
    rootSchema: normalized,
    registry: params?.registry ?? globalRegistry
  };
  return convertSchema(normalized, ctx);
}
// node_modules/zod/v4/core/visit.js
var RESOLVING = Symbol("z.visit/resolving");
function visit(schema, fnOrHandlers) {
  const fn = typeof fnOrHandlers === "function" ? fnOrHandlers : (node2, rewritten) => {
    const h = fnOrHandlers[node2._zod.def.type];
    return h ? h(node2, rewritten) : node2;
  };
  const cache = new Map;
  function run(s) {
    const cached2 = cache.get(s);
    if (cached2 === RESOLVING) {
      return new $ZodLazy({
        type: "lazy",
        getter: () => cache.get(s)
      });
    }
    if (cached2 !== undefined)
      return cached2;
    cache.set(s, RESOLVING);
    const inner = mapInner(s);
    const mapped = fn(inner, inner !== s);
    cache.set(s, mapped);
    return mapped;
  }
  function mapInner(s) {
    const def = s._zod.def;
    const kind = def.type;
    switch (kind) {
      case "object": {
        const oldShape = def.shape;
        const keys = Object.keys(oldShape);
        let changed = false;
        const newShape = {};
        for (const k of keys) {
          const mapped = run(oldShape[k]);
          if (mapped !== oldShape[k])
            changed = true;
          newShape[k] = mapped;
        }
        let newCatchall = def.catchall;
        if (def.catchall) {
          newCatchall = run(def.catchall);
          if (newCatchall !== def.catchall)
            changed = true;
        }
        return changed ? clone(s, { ...def, shape: newShape, catchall: newCatchall }) : s;
      }
      case "array": {
        const mapped = run(def.element);
        return mapped === def.element ? s : clone(s, { ...def, element: mapped });
      }
      case "tuple": {
        const oldItems = def.items;
        let changed = false;
        const newItems = [];
        for (const item of oldItems) {
          const mapped = run(item);
          if (mapped !== item)
            changed = true;
          newItems.push(mapped);
        }
        let newRest = def.rest;
        if (def.rest) {
          newRest = run(def.rest);
          if (newRest !== def.rest)
            changed = true;
        }
        return changed ? clone(s, { ...def, items: newItems, rest: newRest }) : s;
      }
      case "record":
      case "map": {
        const newKey = run(def.keyType);
        const newVal = run(def.valueType);
        return newKey === def.keyType && newVal === def.valueType ? s : clone(s, { ...def, keyType: newKey, valueType: newVal });
      }
      case "set": {
        const newVal = run(def.valueType);
        return newVal === def.valueType ? s : clone(s, { ...def, valueType: newVal });
      }
      case "union": {
        const oldOptions = def.options;
        let changed = false;
        const newOptions = [];
        for (const opt of oldOptions) {
          const mapped = run(opt);
          if (mapped !== opt)
            changed = true;
          newOptions.push(mapped);
        }
        return changed ? clone(s, { ...def, options: newOptions }) : s;
      }
      case "intersection": {
        const newLeft = run(def.left);
        const newRight = run(def.right);
        return newLeft === def.left && newRight === def.right ? s : clone(s, { ...def, left: newLeft, right: newRight });
      }
      case "optional":
      case "nullable":
      case "default":
      case "prefault":
      case "catch":
      case "readonly":
      case "nonoptional":
      case "promise":
      case "success": {
        const newInner = run(def.innerType);
        return newInner === def.innerType ? s : clone(s, { ...def, innerType: newInner });
      }
      case "pipe": {
        const newIn = run(def.in);
        const newOut = run(def.out);
        return newIn === def.in && newOut === def.out ? s : clone(s, { ...def, in: newIn, out: newOut });
      }
      case "function": {
        const newInput = run(def.input);
        const newOutput = run(def.output);
        return newInput === def.input && newOutput === def.output ? s : clone(s, { ...def, input: newInput, output: newOutput });
      }
      case "lazy": {
        const original = def.getter;
        const { _cachedInner, ...rest } = def;
        return clone(s, { ...rest, getter: () => run(original()) });
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
        return s;
      default: {
        return s;
      }
    }
  }
  return run(schema);
}

// node_modules/zod/v4/classic/deep-partial.js
function deepPartial(schema) {
  return visit(schema, {
    object: (s) => s.partial(),
    union: (s) => {
      const def = s._zod.def;
      return def.discriminator === undefined ? s : union(def.options);
    }
  });
}
// node_modules/zod/v4/classic/in-out.js
function withChecks(side, checks2) {
  if (!checks2?.length)
    return side;
  const def = side._zod.def;
  return clone(side, mergeDefs(def, { checks: [...def.checks ?? [], ...checks2] }), { parent: true });
}
function outSide(def) {
  return withChecks(def.out, def.checks);
}
function inSide(def) {
  return def.in._zod.traits.has("$ZodTransform") ? outSide(def) : def.in;
}
function input(schema) {
  return visit(schema, {
    pipe: (s) => inSide(s._zod.def),
    default: (s, rewritten) => rewritten ? optional(s._zod.def.innerType) : s,
    catch: (s, rewritten) => rewritten ? s._zod.def.innerType : s
  });
}
function output(schema) {
  return visit(schema, {
    pipe: (s) => outSide(s._zod.def),
    prefault: (s, rewritten) => rewritten ? s._zod.def.innerType : s
  });
}
// node_modules/zod/v4/classic/coerce.js
var exports_coerce = {};
__export(exports_coerce, {
  string: () => string3,
  number: () => number3,
  date: () => date4,
  boolean: () => boolean3,
  bigint: () => bigint3
});
function string3(params) {
  return _coercedString(ZodString, params);
}
function number3(params) {
  return _coercedNumber(ZodNumber, params);
}
function boolean3(params) {
  return _coercedBoolean(ZodBoolean, params);
}
function bigint3(params) {
  return _coercedBigint(ZodBigInt, params);
}
function date4(params) {
  return _coercedDate(ZodDate, params);
}
// src/shared/loadout-rules.ts
var PHASES = ["scout", "craft", "test", "ship"];
var ACTIONS = ["cast", "summon", "link", "scan", "strike", "craft", "guard", "loot"];
var FOES = ["bug-slime", "flaky-wisp", "fog-wraith", "tangle-hydra", "blank-mimic", "clay-golem", "reel-phantom", "clockwork-imp", "paper-golem", "gate-warden", "vault-serpent", "error-imp"];
var EFFORTS = ["none", "low", "medium", "high", "xhigh", "max"];
var WEAPONS = ["greatsword", "longsword", "dagger", "warhammer", "staff"];
var LOADOUT_LIMITS = { perPhase: 3, spells: 12, title: 60, task: 90, notes: 300, author: 32 };
var SINGLE_LINE = /^[^\r\n\u0085\u2028\u2029]*$/;

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
var SlugSchema = exports_external.string().regex(/^[a-z0-9][a-z0-9-]{1,62}$/, "Use 2-63 lowercase letters, digits and hyphens");
var Https = exports_external.url().startsWith("https://", "Use an https:// link").max(400);
var Day = exports_external.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");
var MediaSchema = exports_external.object({
  file: exports_external.string().regex(/^[a-z0-9][a-z0-9-]{1,62}\/[A-Za-z0-9._-]{1,115}\.(png|jpe?g|gif|webp|mp4|webm)$/),
  kind: exports_external.enum(["image", "video"]),
  alt: exports_external.string().min(3).max(200),
  caption: exports_external.string().max(200).nullable(),
  width: exports_external.number().int().positive().nullable(),
  height: exports_external.number().int().positive().nullable()
});
var VerdictSchema = exports_external.object({
  tier: exports_external.enum(TIERS).nullable(),
  note: exports_external.string().max(280).nullable(),
  pick: exports_external.boolean().optional()
});
var MatchIdSchema = exports_external.string().regex(/^(skill|mcp|plugin|command):[a-z0-9][a-z0-9._:@\/-]{0,99}$/);
var SkillSchema = exports_external.object({
  slug: SlugSchema,
  name: exports_external.string().min(2).max(80),
  kind: exports_external.enum(KINDS),
  agents: exports_external.array(exports_external.enum(AGENTS)).min(1),
  categories: exports_external.array(SlugSchema).min(1),
  summary: exports_external.string().min(10).max(160),
  sourceUrl: Https,
  evidenceUrl: Https.nullable(),
  install: exports_external.string().max(400).nullable(),
  publisher: exports_external.string().max(120).nullable(),
  license: exports_external.string().max(80).nullable(),
  lastActivity: Day.nullable(),
  verifiedOn: Day,
  notes: exports_external.string().max(600).nullable(),
  verdict: VerdictSchema,
  match: exports_external.array(MatchIdSchema),
  media: exports_external.array(MediaSchema).max(12)
});
var WorkflowStepSchema = exports_external.object({ skill: SlugSchema, note: exports_external.string().max(120).nullable() });
var WorkflowSchema = exports_external.object({
  slug: SlugSchema,
  name: exports_external.string().min(2).max(80),
  category: SlugSchema,
  steps: exports_external.array(WorkflowStepSchema).min(2).max(8),
  why: exports_external.string().min(10).max(300),
  basis: exports_external.enum(BASES),
  sourceUrl: Https.nullable(),
  verdict: VerdictSchema,
  media: exports_external.array(MediaSchema).max(12)
});
var CategorySchema = exports_external.object({
  slug: SlugSchema,
  name: exports_external.string().min(2).max(60),
  className: exports_external.string().min(2).max(30),
  description: exports_external.string().min(10).max(240),
  emblem: exports_external.string().regex(/^[a-z0-9-]+\.png$/)
});
var BeatSchema = exports_external.object({
  action: exports_external.enum(ACTIONS),
  rpg: exports_external.string().min(10).max(120),
  plain: exports_external.string().min(10).max(180),
  pop: exports_external.string().min(1).max(24).nullable(),
  allies: exports_external.array(exports_external.string().min(2).max(24)).min(1).max(6).optional()
});
var GuideSchema = exports_external.object({
  slug: SlugSchema,
  phase: exports_external.enum(PHASES),
  foe: exports_external.enum(FOES),
  tagline: exports_external.string().min(10).max(100),
  beats: exports_external.array(BeatSchema).min(3).max(5),
  install: exports_external.partialRecord(exports_external.enum(AGENTS), exports_external.string().min(3).max(400))
});
var ModelIdSchema = exports_external.string().regex(/^[a-z0-9][a-z0-9.-]{1,48}$/);
var ArmorySchema = exports_external.object({
  launch: exports_external.partialRecord(exports_external.enum(AGENTS), exports_external.string().includes("{model}").includes("{effort}").max(200)),
  models: exports_external.array(exports_external.object({
    id: ModelIdSchema,
    name: exports_external.string().min(2).max(40),
    weapon: exports_external.enum(WEAPONS),
    harness: exports_external.enum(AGENTS),
    select: exports_external.string().regex(/^[A-Za-z0-9.[\]-]{2,40}$/),
    efforts: exports_external.array(exports_external.enum(EFFORTS)).min(1),
    role: exports_external.string().min(3).max(80),
    sourceUrl: Https,
    verifiedOn: Day
  }))
});
var LoadoutSpellSchema = exports_external.object({ spell: SlugSchema, phase: exports_external.enum(PHASES) });
var LoadoutBuildSchema = exports_external.object({
  title: exports_external.string().trim().min(3).max(LOADOUT_LIMITS.title).regex(SINGLE_LINE, "Keep this to a single line"),
  task: exports_external.string().trim().min(3).max(LOADOUT_LIMITS.task).regex(SINGLE_LINE, "Keep this to a single line"),
  school: SlugSchema,
  harness: exports_external.enum(AGENTS),
  model: ModelIdSchema,
  effort: exports_external.enum(EFFORTS),
  spells: exports_external.array(LoadoutSpellSchema).min(1).max(LOADOUT_LIMITS.spells),
  notes: exports_external.string().trim().max(LOADOUT_LIMITS.notes).nullable()
});
var CuratedLoadoutSchema = exports_external.object({
  slug: SlugSchema,
  ...LoadoutBuildSchema.shape,
  basis: exports_external.enum(BASES),
  sourceUrl: Https.nullable(),
  pick: exports_external.boolean().optional()
});
var SiteSchema = exports_external.object({
  title: exports_external.string().min(2).max(60),
  heroTitle: exports_external.string().min(5).max(80),
  tagline: exports_external.string().min(10).max(160),
  baseUrl: exports_external.url({ protocol: /^https?$/ }),
  githubRepo: exports_external.string().regex(/^[A-Za-z0-9-]{1,39}\/[A-Za-z0-9._-]{1,100}$/, "Use owner/name").nullable()
});
var LooksSchema = exports_external.record(SlugSchema, exports_external.string().regex(/^[a-z]+-[a-z]+$/, "Use base-palette, like tome-ember"));
var REGISTRIES = ["npm", "pypi"];
var RepoSchema = exports_external.string().regex(/^[A-Za-z0-9-]{1,39}\/[A-Za-z0-9._-]{1,100}$/, "Use owner/name");
var Count = exports_external.number().int().nonnegative();
var PopularitySchema = exports_external.object({
  checkedOn: Day,
  spells: exports_external.record(SlugSchema, exports_external.object({
    repo: RepoSchema.nullable(),
    stars: Count.nullable(),
    downloads: exports_external.object({ registry: exports_external.enum(REGISTRIES), package: exports_external.string().min(1).max(214), weekly: Count }).nullable()
  })),
  overrides: exports_external.record(SlugSchema, exports_external.object({ repo: RepoSchema.nullable().optional(), npm: exports_external.string().min(1).max(214).nullable().optional(), pypi: exports_external.string().min(1).max(214).nullable().optional() }))
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
var Count2 = exports_external.number().int().nonnegative();
var ByAgent = exports_external.partialRecord(exports_external.enum(USAGE_AGENTS), Count2);
var ByMonth = exports_external.record(exports_external.string().regex(/^\d{4}-\d{2}$/), Count2);
var TestStatsSchema = exports_external.object({ sessionsWithFailingTest: Count2, recovered: Count2 });
var HarnessVersionSchema = exports_external.string().regex(HARNESS_VERSION);
var VersionsSchema = exports_external.partialRecord(exports_external.enum(USAGE_AGENTS), exports_external.object({ first: HarnessVersionSchema, last: HarnessVersionSchema }));
var EnvironmentSchema = exports_external.object({
  os: exports_external.string().regex(/^[A-Za-z0-9 ._()-]{1,60}$/).nullable(),
  arch: exports_external.string().regex(/^[A-Za-z0-9_]{1,20}$/).nullable(),
  harness: exports_external.partialRecord(exports_external.enum(USAGE_AGENTS), HarnessVersionSchema)
});
function environmentLabel(environment) {
  const system = environment.os ? `${environment.os}${environment.arch ? ` (${environment.arch})` : ""}` : environment.arch ?? "unknown OS";
  const harness = USAGE_AGENTS.flatMap((agent) => environment.harness[agent] ? [`${HARNESS_NAMES[agent]} ${environment.harness[agent]}`] : []);
  return harness.length > 0 ? `${system}; ${harness.join(", ")}` : system;
}
var SkillUsageSchema = exports_external.object({
  sessions: Count2,
  byAgent: ByAgent,
  byMonth: ByMonth,
  firstUsed: exports_external.string().nullable(),
  lastUsed: exports_external.string().nullable(),
  partners: exports_external.array(exports_external.object({ skill: exports_external.string(), sessions: Count2 })),
  tests: TestStatsSchema,
  versions: VersionsSchema
});
var WorkflowUsageSchema = exports_external.object({
  measurable: exports_external.boolean(),
  together: Count2,
  inOrder: Count2,
  tests: TestStatsSchema
});
var PublishedUsageSchema = exports_external.object({
  generatedAt: exports_external.string(),
  window: exports_external.object({ from: exports_external.string().nullable(), to: exports_external.string().nullable() }),
  totals: exports_external.object({ sessions: Count2, byAgent: ByAgent, byMonth: ByMonth }),
  skills: exports_external.record(exports_external.string(), SkillUsageSchema),
  workflows: exports_external.record(exports_external.string(), WorkflowUsageSchema),
  environment: EnvironmentSchema
});

// src/shared/trials.ts
var RANKS = ["apprentice", "journeyman", "master", "grandmaster"];
var RANK_NAMES = { apprentice: "Apprentice", journeyman: "Journeyman", master: "Master", grandmaster: "Grandmaster" };
var FOCUS_LEVELS = ["default", "off", "minimal", "low", "medium", "high", "xhigh", "max"];
var CONTAINMENTS = ["sealed", "warded", "open"];
var LOADOUT_KINDS = ["unarmed", "spell", "workflow", "combo"];
var CASTS = ["invoked", "ambient"];
var Count3 = exports_external.number().int().nonnegative();
var Day2 = exports_external.string().regex(/^\d{4}-\d{2}-\d{2}$/);
var CommitSchema = exports_external.string().regex(/^[0-9a-f]{7,40}$/);
var ScryingFileSchema = exports_external.string().regex(/^[0-9a-f]{16}\.png$/);
var CasterSchema = exports_external.string().regex(/^[A-Za-z0-9][A-Za-z0-9._:/@[\]-]{0,79}$/);
var LoadoutSchema = exports_external.object({
  kind: exports_external.enum(LOADOUT_KINDS),
  slug: SlugSchema.nullable(),
  spells: exports_external.array(SlugSchema).max(8),
  refs: exports_external.record(SlugSchema, CommitSchema)
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
var TrialCellSchema = exports_external.object({
  quest: SlugSchema,
  questVersion: exports_external.number().int().positive(),
  loadout: LoadoutSchema,
  cast: exports_external.enum(CASTS).nullable(),
  hero: exports_external.enum(USAGE_AGENTS),
  heroVersion: exports_external.string().regex(HARNESS_VERSION).nullable(),
  caster: CasterSchema,
  focus: exports_external.enum(FOCUS_LEVELS),
  containment: exports_external.enum(CONTAINMENTS),
  environment: EnvironmentSchema.pick({ os: true, arch: true }),
  source: exports_external.object({ kind: exports_external.enum(["curator", "community"]), name: exports_external.string().min(1).max(60).nullable() }),
  runs: Count3,
  mishaps: Count3,
  cleared: Count3,
  oneShot: Count3,
  attuned: Count3,
  medianPromptsToClear: exports_external.number().positive().nullable(),
  meanScore: exports_external.number().min(0).max(1),
  medianDurationMs: Count3.nullable(),
  medianTokens: Count3.nullable(),
  medianToolCalls: Count3.nullable(),
  medianCostUsd: exports_external.number().nonnegative().nullable(),
  firstRun: Day2,
  lastRun: Day2,
  scrying: exports_external.object({ file: ScryingFileSchema, outcome: exports_external.enum(["cleared", "fizzled"]) }).optional()
}).refine((cell) => cell.cleared <= cell.runs && cell.oneShot <= cell.cleared && cell.attuned <= cell.runs, "counts must nest: oneShot <= cleared <= runs, attuned <= runs").refine((cell) => cell.loadout.kind === "unarmed" === (cell.cast === null), "unarmed cells have no cast; armed cells have one");
var TrialsFileSchema = exports_external.object({
  generatedAt: exports_external.string(),
  cells: exports_external.array(TrialCellSchema)
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

// src/shared/report.ts
var SIGNATURE_NAMESPACE = "viberpg-spell-report";
var TEMPLATE_SOURCE_URL = "https://github.com/OWNER/REPO";
var Count4 = exports_external.number().int().nonnegative();
var Month = exports_external.string().regex(/^\d{4}-\d{2}$/);
var ReportEvidenceSchema = exports_external.object({
  generator: exports_external.string().min(1).max(60),
  generatedAt: exports_external.string(),
  match: exports_external.array(MatchIdSchema).min(1).max(10),
  sessions: Count4,
  byAgent: exports_external.partialRecord(exports_external.enum(USAGE_AGENTS), Count4),
  firstUsed: Month.nullable(),
  lastUsed: Month.nullable(),
  tests: exports_external.object({ sessionsWithFailingTest: Count4, recovered: Count4 }),
  environment: EnvironmentSchema.optional()
});
var ReportAttachmentSchema = exports_external.object({
  file: exports_external.string().regex(/^[A-Za-z0-9][A-Za-z0-9._-]{0,119}$/),
  sha256: exports_external.string().regex(/^[0-9a-f]{64}$/),
  alt: exports_external.string().min(3).max(200)
});
var ReportCardSchema = exports_external.object({
  look: exports_external.string().refine((look) => parseLook(look) !== null, "Choose a known look, like tome-ember"),
  summary: exports_external.string().min(10).max(160).regex(SINGLE_LINE, "Keep this to a single line"),
  classes: exports_external.array(SlugSchema).min(1).max(3).refine((classes) => new Set(classes).size === classes.length, "Choose each class once"),
  install: exports_external.partialRecord(exports_external.enum(AGENTS), exports_external.string().min(3).max(400).regex(SINGLE_LINE, "Keep this to a single line")),
  phase: GuideSchema.shape.phase,
  foe: GuideSchema.shape.foe,
  tagline: GuideSchema.shape.tagline,
  beats: exports_external.array(BeatSchema).min(3).max(5)
});
var ReportMetaSchema = exports_external.object({
  format: exports_external.literal(REPORT_FORMAT),
  spell: exports_external.object({
    name: exports_external.string().min(2).max(80),
    kind: exports_external.enum(KINDS),
    sourceUrl: exports_external.url().startsWith("https://").max(400),
    version: exports_external.string().max(80).nullable(),
    agents: exports_external.array(exports_external.enum(AGENTS)).min(1)
  }),
  submitter: exports_external.object({
    name: exports_external.string().min(1).max(80),
    github: exports_external.string().regex(GITHUB_USER).nullable(),
    email: exports_external.email().max(200).nullable()
  }),
  verdict: exports_external.object({
    tier: exports_external.enum(TIERS).nullable(),
    summary: exports_external.string().min(10).max(280)
  }),
  evidence: ReportEvidenceSchema.nullable(),
  trials: exports_external.array(TrialCellSchema).max(60).optional(),
  attachments: exports_external.array(ReportAttachmentSchema).max(SUBMIT_LIMITS.attachments),
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
function formatReport(meta3, body) {
  return `---
${JSON.stringify(ReportMetaSchema.parse(meta3), null, 2)}
---

${body.trim()}
`;
}
var PLACEHOLDER_SUMMARY = "Replace with your test findings.";
function unfinishedParts(meta3, body) {
  const filled = new Set;
  for (const part of body.split(/^## /m).slice(1)) {
    const newline = part.indexOf(`
`);
    const text = newline === -1 ? "" : part.slice(newline + 1).replace(/<!--[\s\S]*?-->/g, "").trim();
    if (text)
      filled.add((newline === -1 ? part : part.slice(0, newline)).trim());
  }
  const parts = REPORT_SECTIONS.filter((title) => !filled.has(title)).map((title) => `Section "${title}" is empty.`);
  if (meta3.verdict.summary === PLACEHOLDER_SUMMARY)
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
    const version2 = envelope.uint32();
    if (version2 !== 1)
      throw new Error(`Unsupported SSHSIG version: ${version2}.`);
    const keyBlob = envelope.string();
    const publicKey = new SshReader(keyBlob);
    const keyType = publicKey.identifier();
    result.keyType = keyType;
    result.publicKey = `${keyType} ${keyBlob.toString("base64")}`;
    result.fingerprint = `SHA256:${createHash("sha256").update(keyBlob).digest("base64").replace(/=+$/, "")}`;
    const signedNamespace = envelope.string();
    envelope.string();
    const hash2 = envelope.identifier();
    const signatureBlob = envelope.string();
    envelope.end();
    if (!namespace || signedNamespace.length === 0)
      throw new Error("SSH signature namespace must not be empty.");
    if (!signedNamespace.equals(Buffer2.from(namespace)))
      throw new Error("SSH signature namespace does not match the expected namespace.");
    if (hash2 !== "sha256" && hash2 !== "sha512")
      throw new Error(`Unsupported SSHSIG hash algorithm: ${hash2}.`);
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
      sshString(Buffer2.from(hash2)),
      sshString(createHash(hash2).update(report).digest())
    ]);
    const valid = ecdsa ? verify(algorithm, payload, { key, dsaEncoding: "ieee-p1363" }, signatureBytes) : verify(algorithm, payload, keyType === "ssh-rsa" ? { key, padding: constants.RSA_PKCS1_PADDING } : key, signatureBytes);
    return { ...result, status: valid ? "valid" : "invalid", reason: valid ? null : "Signature does not match the report bytes." };
  } catch (error62) {
    return { ...result, reason: error62 instanceof Error ? error62.message : "Malformed SSH signature." };
  }
}

// src/shared/provenance.ts
var SigningKeysSchema = exports_external.array(exports_external.object({ key: exports_external.string() }));
async function githubKeyStatus(user, publicKey, fetchFn, token) {
  const [expectedType, encoded] = publicKey.split(" ");
  const expectedBlob = encoded?.replace(/={1,2}$/, "");
  async function lookup(url2, json2) {
    try {
      const headers = new Headers({ "User-Agent": "VibeRPGSimulator" });
      if (json2 && token)
        headers.set("Authorization", `Bearer ${token}`);
      const response = await fetchFn(url2, { headers, signal: AbortSignal.timeout(5000) });
      if (!response.ok)
        return "failed";
      const keys = json2 ? SigningKeysSchema.parse(await response.json()).map((entry) => entry.key) : (await response.text()).split(/\r?\n/);
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
async function checkProvenance(input2) {
  const checked = input2.signature === null ? null : verifySshSignature(input2.report, input2.signature);
  const signature = checked ? { status: checked.status, keyType: checked.keyType, fingerprint: checked.fingerprint, reason: checked.reason } : { status: "unsigned", keyType: null, fingerprint: null, reason: null };
  const user = input2.meta?.submitter.github ?? null;
  const githubStatus = !user ? "not_claimed" : !checked ? "unsigned" : "key_not_listed";
  const listed = input2.meta?.attachments ?? [];
  const [reportSha256, status, attachments] = await Promise.all([
    sha256Hex(input2.report),
    user && checked?.status === "valid" && checked.publicKey ? githubKeyStatus(user, checked.publicKey, input2.fetchFn ?? fetch, input2.githubToken) : githubStatus,
    Promise.all(input2.attachments.map(async (attachment) => {
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
    missingAttachments: listed.filter((entry) => !input2.attachments.some((attachment) => attachment.name === entry.file)).map((entry) => entry.file)
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
  for (const file2 of files)
    if (file2.session)
      paths.set(resolve(file2.path), file2.session.id);
  const sessions = new Map;
  for (const file2 of files) {
    const incoming = file2.session;
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
async function parseClaudeFile(file2) {
  const child = /[\\/]([^\\/]+)[\\/]subagents[\\/]agent-([^\\/]+)\.jsonl$/.exec(file2.path);
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
  for await (const { line, seq } of readLines(file2.path, file2.size, state)) {
    if (line.trim() === "")
      continue;
    let record2;
    try {
      record2 = JSON.parse(line);
    } catch {
      malformedLines++;
      continue;
    }
    if (typeof record2 !== "object" || record2 === null)
      continue;
    if (session.harnessVersion === null && "version" in record2)
      session.harnessVersion = harnessVersion(record2.version);
    if (sessionId === null && "sessionId" in record2 && typeof record2.sessionId === "string") {
      sessionId = record2.sessionId;
    }
    const ts = "timestamp" in record2 ? timestamp(record2.timestamp) : null;
    if (ts !== null) {
      if (session.startedAt === null || ts < session.startedAt)
        session.startedAt = ts;
      if (session.endedAt === null || ts > session.endedAt)
        session.endedAt = ts;
    }
    if (!("type" in record2) || record2.type !== "assistant" && record2.type !== "user")
      continue;
    if (!("message" in record2) || typeof record2.message !== "object" || record2.message === null)
      continue;
    if (!("content" in record2.message))
      continue;
    const content = record2.message.content;
    if (record2.type === "user" && typeof content === "string")
      addCommands(content, ts);
    if (!Array.isArray(content))
      continue;
    const blocks = content;
    for (const block of blocks) {
      if (typeof block !== "object" || block === null || !("type" in block))
        continue;
      if (record2.type === "assistant" && block.type === "tool_use") {
        if (!("name" in block) || typeof block.name !== "string")
          continue;
        if (block.name.startsWith("mcp__")) {
          const server = block.name.split("__")[1]?.toLowerCase();
          if (server && !CLAUDE_BUILTIN_MCP.has(server))
            addSpell(`mcp:${server}`, ts);
        }
        if (!("input" in block) || typeof block.input !== "object" || block.input === null)
          continue;
        const input2 = block.input;
        if (block.name === "Skill") {
          const name = ("skill" in input2 ? input2.skill : undefined) ?? ("command" in input2 ? input2.command : undefined);
          if (typeof name === "string")
            addSpell(`skill:${name}`, ts);
        } else if (block.name === "Bash" && "command" in input2 && typeof input2.command === "string" && "id" in block && typeof block.id === "string") {
          const family = testFamily(input2.command);
          if (family !== null)
            pending.set(block.id, family);
        }
      } else if (record2.type === "user") {
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
  const identity = parent !== undefined && childId !== undefined ? `${parent}:${childId}` : sessionId ?? basename(file2.path, ".jsonl");
  session.id = `claude-code:${identity}`;
  session.spells = Array.from(spells, ([id, firstTs]) => ({ id, firstTs }));
  return {
    path: file2.path,
    agent: "claude-code",
    size: file2.size,
    mtimeMs: file2.mtimeMs,
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
  let output2;
  try {
    output2 = JSON.parse(text);
  } catch {
    return null;
  }
  if (!isObject2(output2))
    return null;
  if (typeof output2.exit_code === "number" && Number.isInteger(output2.exit_code))
    return output2.exit_code;
  const metadata = output2.metadata;
  return isObject2(metadata) && typeof metadata.exit_code === "number" && Number.isInteger(metadata.exit_code) ? metadata.exit_code : null;
}
async function parseCodexFile(file2) {
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
  for await (const { line, seq } of readLines(file2.path, file2.size, state)) {
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
    let record2;
    try {
      record2 = JSON.parse(line);
    } catch {
      malformedLines++;
      continue;
    }
    if (!isObject2(record2))
      continue;
    const ts = typeof record2.timestamp === "string" ? record2.timestamp : null;
    if (ts !== null) {
      firstTimestamp ??= ts;
      if (endedAt === null || ts > endedAt)
        endedAt = ts;
    }
    const payload = record2.payload;
    switch (record2.type) {
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
    path: file2.path,
    agent: file2.agent,
    size: file2.size,
    mtimeMs: file2.mtimeMs,
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
    const version2 = plist && /<key>ProductVersion<\/key>\s*<string>([^<]{1,20})<\/string>/.exec(plist)?.[1];
    os = cleanOs(name && version2 ? `${name} ${version2}` : `macOS (Darwin ${release()})`);
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
  const latest2 = new Map;
  for (const root of roots) {
    if (root.harnessVersion === null)
      continue;
    const at = root.startedAt === null ? -Infinity : Date.parse(root.startedAt);
    const seen = latest2.get(root.agent);
    if (!seen || at >= seen.at)
      latest2.set(root.agent, { at, version: root.harnessVersion });
  }
  return Object.fromEntries(USAGE_AGENTS.flatMap((agent) => {
    const seen = latest2.get(agent);
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
  const date5 = new Date(value);
  return Number.isFinite(date5.getTime()) ? date5.toISOString() : null;
}
async function parseOmpFile(file2) {
  const child = relative(file2.root, file2.path).split(sep).length > 2;
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
  for await (const { line, seq } of readLines(file2.path, file2.size, state)) {
    if (line.trim() === "")
      continue;
    let record2;
    try {
      record2 = JSON.parse(line);
    } catch {
      malformedLines++;
      continue;
    }
    if (typeof record2 !== "object" || record2 === null || !("type" in record2))
      continue;
    if (record2.type !== "session" && record2.type !== "message")
      continue;
    let ts = "timestamp" in record2 ? timestamp2(record2.timestamp) : null;
    let message = null;
    if (record2.type === "session") {
      if (session.id === "" && "id" in record2 && typeof record2.id === "string" && record2.id !== "") {
        session.id = `omp:${record2.id}`;
        if (child) {
          session.parentPath = "parentSession" in record2 && typeof record2.parentSession === "string" ? record2.parentSession : `${dirname(file2.path)}.jsonl`;
        }
      }
    } else {
      if (!("message" in record2) || typeof record2.message !== "object" || record2.message === null)
        continue;
      message = record2.message;
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
    path: file2.path,
    agent: "omp",
    size: file2.size,
    mtimeMs: file2.mtimeMs,
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
          } catch (error62) {
            if (!(error62 instanceof Error && ("code" in error62) && error62.code === "ENOENT"))
              throw error62;
          }
        }
      }
    } catch (error62) {
      if (error62 instanceof Error && "code" in error62 && error62.code === "ENOENT")
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
    } catch (error62) {
      if (error62 instanceof Error && "code" in error62 && error62.code === "ENOENT")
        return;
      throw new Error("Could not read a session source directory.");
    }
  }));
  return files.sort((a, b) => b.mtimeMs - a.mtimeMs || a.path.localeCompare(b.path, "en"));
}

// src/trials/batch.ts
import { spawnSync } from "node:child_process";
import { parseArgs } from "node:util";

// src/trials/arena.ts
import { createHash as createHash2 } from "node:crypto";
import { constants as constants2, existsSync } from "node:fs";
import { chmod, copyFile, cp, lstat as lstat2, mkdir, mkdtemp, readdir as readdir2, realpath, rename, rm, stat, writeFile } from "node:fs/promises";
import { homedir as homedir2, tmpdir } from "node:os";
import { dirname as dirname2, join as join2 } from "node:path";
var WARD_AVAILABLE = process.platform === "darwin" && existsSync("/usr/bin/sandbox-exec");
async function privateDir(path) {
  await mkdir(path, { recursive: true, mode: 448 });
  const info = await lstat2(path);
  if (!info.isDirectory() || process.getuid && info.uid !== process.getuid())
    throw new Error(`${path} is not a folder you own. Remove it and run the trial again.`);
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
function wardProfile(arenaRoot, rules, home = homedir2()) {
  const reads = rules.read.map((path) => `(subpath ${quote(path)})`).join(" ");
  const writes = [`(subpath ${quote(arenaRoot)})`, '(subpath "/dev")', ...rules.write.map((path) => `(subpath ${quote(path)})`)].join(" ");
  const locked = (rules.locked ?? []).map((path) => `(subpath ${quote(path)})`).join(" ");
  return [
    "(version 1)",
    "(allow default)",
    `(deny file-read* (subpath ${quote(home)}))`,
    "(allow file-read-metadata)",
    `(allow file-read* (literal ${quote(home)})${reads ? ` ${reads}` : ""})`,
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
  return ["/usr/bin/sandbox-exec", "-p", wardProfile(rules.root ?? arena.root, rules)];
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
import { cp as cp2, mkdir as mkdir3, readdir as readdir4, readFile as readFile3, stat as stat3, symlink, writeFile as writeFile3 } from "node:fs/promises";
import { homedir as homedir3 } from "node:os";
import { dirname as dirname3, join as join4 } from "node:path";
import { createInterface } from "node:readline";

// src/trials/spellbook.ts
import { mkdir as mkdir2, readdir as readdir3, readFile as readFile2, rename as rename2, rm as rm2, stat as stat2, writeFile as writeFile2 } from "node:fs/promises";
import { join as join3, posix } from "node:path";

// src/shared/source-url.ts
function parseSourceUrl(raw) {
  const input2 = raw.trim();
  if (!input2 || /[\u0000-\u001f\u007f\\]/.test(input2))
    throw new Error("Enter a valid HTTP(S) source URL.");
  let url2;
  try {
    url2 = new URL(/^[a-z][a-z\d+.-]*:/i.test(input2) ? input2 : `https:${input2.startsWith("//") ? input2 : `//${input2}`}`);
  } catch {
    throw new Error("Enter a valid HTTP(S) source URL.");
  }
  if (url2.protocol !== "http:" && url2.protocol !== "https:")
    throw new Error("Source URLs must use HTTP or HTTPS.");
  if (url2.username || url2.password || /^(?:https?:\/\/|\/\/)?[^/?#]*@/i.test(input2)) {
    throw new Error("Source URLs must not contain credentials.");
  }
  url2.protocol = "https:";
  const sourceUrl = url2.href;
  if (url2.hostname !== "github.com" && url2.hostname !== "skills.sh")
    return { type: "other", sourceUrl };
  let segments;
  try {
    segments = url2.pathname.replace(/\/+$/, "").slice(1).split("/").map(decodeURIComponent);
  } catch {
    throw new Error("Source URL has invalid path encoding.");
  }
  const [owner, repo, view, ref, ...path] = segments;
  if (!owner || !repo || !/^[a-z\d][a-z\d-]*$/i.test(owner) || !/^[a-z\d_.-]+$/i.test(repo) || repo === "." || repo === "..") {
    throw new Error("Source URL must include a valid owner and repository.");
  }
  if (url2.hostname === "skills.sh") {
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
async function github(url2, accept, fetcher) {
  const token = url2.startsWith("https://api.github.com/") ? process.env.GITHUB_TOKEN : undefined;
  const response = await fetcher(url2, {
    headers: { Accept: accept, "User-Agent": "VibeRPGSimulator-trials", ...token ? { Authorization: `Bearer ${token}` } : {} },
    signal: AbortSignal.timeout(20000)
  });
  if (!response.ok)
    throw new Error(`GitHub answered ${response.status} for ${url2.replace(/\?.*$/, "")}`);
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
  const file2 = join3(cacheRoot, "refs", `${folder.owner}__${folder.repo}__${ref.replaceAll("/", "__")}.json`);
  try {
    const cached2 = JSON.parse(await readFile2(file2, "utf8"));
    if (Date.now() - cached2.at < REF_TTL_MS && /^[0-9a-f]{40}$/.test(cached2.sha))
      return cached2.sha;
  } catch {}
  let sha;
  try {
    sha = (await (await github(`https://api.github.com/repos/${folder.owner}/${folder.repo}/commits/${encodeURIComponent(ref)}`, "application/vnd.github.sha", fetcher)).text()).trim();
  } catch (error62) {
    const repoDir = join3(cacheRoot, folder.owner, folder.repo);
    const candidates = await readdir3(repoDir, { withFileTypes: true }).catch(() => []);
    const usable = [];
    for (const entry of candidates) {
      if (!entry.isDirectory() || !/^[0-9a-f]{40}$/.test(entry.name))
        continue;
      for (const key of keys) {
        const meta3 = join3(repoDir, entry.name, `${key}.json`);
        const info = await stat2(meta3).catch(() => null);
        if (info)
          usable.push({ sha: entry.name, at: info.mtimeMs });
      }
    }
    const newest = usable.sort((a, b) => b.at - a.at)[0];
    if (!newest)
      throw error62;
    console.warn(`${folder.owner}/${folder.repo}: ${error62 instanceof Error ? error62.message : String(error62)}; using cached commit ${newest.sha.slice(0, 7)}`);
    return newest.sha;
  }
  if (!/^[0-9a-f]{40}$/.test(sha))
    throw new Error(`GitHub did not return a commit for ${folder.owner}/${folder.repo}@${ref}`);
  await mkdir2(join3(cacheRoot, "refs"), { recursive: true });
  await writeFile2(file2, JSON.stringify({ sha, at: Date.now() }));
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
      const api2 = `https://api.github.com/repos/${folder.owner}/${folder.repo}`;
      const sha = await resolveCommit(folder, folder.dirs.map((dir) => cacheKey(kind, dir)), opts.cacheRoot, fetcher);
      const entry = kind === "skill" ? "SKILL.md" : ".claude-plugin/plugin.json";
      let picked = null;
      let tree = null;
      for (const dir of folder.dirs) {
        const local2 = join3(opts.cacheRoot, folder.owner, folder.repo, sha, cacheKey(kind, dir));
        const cached2 = await cachedSpell(local2);
        if (cached2) {
          equipped.push({ slug: skill.slug, kind, name: cached2.name, dir: local2, ref: sha, files: cached2.files, hazards: cached2.hazards });
          continue spells;
        }
        if (!tree) {
          const listing = await (await github(`${api2}/git/trees/${sha}?recursive=1`, "application/vnd.github+json", fetcher)).json();
          if (listing.truncated)
            throw new Error(`${skill.slug}: ${folder.owner}/${folder.repo} is too large to list`);
          tree = listing.tree ?? [];
        }
        const prefix2 = dir ? `${dir}/` : "";
        const blobs = kind === "subagent" ? tree.filter((item) => item.type === "blob" && item.mode !== "120000" && item.path === dir) : !tree.some((item) => item.type === "blob" && item.path === `${prefix2}${entry}`) ? [] : tree.filter((item) => item.type === "blob" && item.mode !== "120000" && item.path.startsWith(prefix2) && !item.path.slice(prefix2.length).split("/").some((part, depth) => part.startsWith(".") && !(kind === "plugin" && depth === 0 && (part === ".claude-plugin" || part === ".mcp.json"))));
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
        const relative2 = kind === "subagent" ? "agent.md" : blob.path.slice(prefix.length);
        const raw = `https://raw.githubusercontent.com/${folder.owner}/${folder.repo}/${sha}/${blob.path.split("/").map(encodeURIComponent).join("/")}`;
        const bytes = new Uint8Array(await (await github(raw, "*/*", fetcher)).arrayBuffer());
        if (bytes.byteLength > LIMITS.fileBytes)
          throw new Error(`${skill.slug}: ${relative2} is over the size limit`);
        hazards.push(...screenFile(relative2, bytes));
        const text = kind !== "skill" || relative2 === "SKILL.md" ? new TextDecoder().decode(bytes) : "";
        if (kind !== "skill")
          hazards.push(...screenPart(relative2, text));
        if (kind === "subagent" || kind === "skill" && relative2 === "SKILL.md")
          name = frontmatterName(text);
        if (relative2 === entry && kind === "plugin") {
          let manifest;
          try {
            manifest = JSON.parse(text) ?? {};
          } catch {
            throw new Error(`${skill.slug}: ${entry} is not valid JSON`);
          }
          name = typeof manifest.name === "string" && SKILL_NAME.test(manifest.name) ? manifest.name : null;
        }
        await mkdir2(join3(staging, posix.dirname(relative2)), { recursive: true });
        await writeFile2(join3(staging, relative2), bytes);
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
  const { promise: promise2, resolve: resolve3 } = Promise.withResolvers();
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
  child.on("error", (error62) => {
    stderr += String(error62);
  });
  child.on("close", (code) => {
    clearTimeout(timer);
    resolve3({ code, stdout, stderr, timedOut, durationMs: Math.round(performance.now() - started) });
  });
  return promise2;
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
async function summaries(root, agent, parse5) {
  if (!existsSync2(root))
    return [];
  const results = [];
  for (const entry of await readdir4(root, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".jsonl"))
      continue;
    const path = join4(entry.parentPath, entry.name);
    const info = await stat3(path);
    results.push(await parse5({ agent, path, size: info.size, mtimeMs: info.mtimeMs, root }));
  }
  return results;
}
var skillNames = (files) => [...new Set(files.flatMap((file2) => file2.session?.spells ?? []).map((spell) => spell.id).filter((id) => id.startsWith("skill:")).map((id) => id.slice(6).split(":").pop()))].sort();
var asFocus = (value, fallback) => typeof value === "string" && FOCUS_LEVELS.includes(value) ? value : fallback;
var baseEnv = (home, tmp) => ({ PATH: process.env.PATH ?? "/usr/bin:/bin", HOME: home, TMPDIR: tmp, LANG: "en_US.UTF-8", USER: process.env.USER ?? "quester" });
var TRANSCRIPT_LIMIT = 64000000;
var CODEX_TOOL_ITEMS = new Set(["command_execution", "file_change", "mcp_tool_call", "web_search"]);
function codexConfig(caster, focus, realHome) {
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
  async start({ arena, spells, caster, focus, timeLimitMs }) {
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
    await writeFile3(join4(codexHome, "config.toml"), codexConfig(caster, focus, realHome));
    const base = baseEnv(arena.home, arena.tmp);
    const env = { ...base, PATH: [...await cloneOutOfHome(["codex", "node"]), base.PATH].join(":"), CODEX_HOME: codexHome };
    let thread = null;
    let tokens = null;
    let toolCalls = 0;
    return {
      async send(prompt) {
        const argv = thread ? ["codex", "exec", "resume", thread, "--json", "--skip-git-repo-check", prompt] : ["codex", "exec", "--json", "--skip-git-repo-check", "-C", arena.workspace, prompt];
        const result = await runProcess(argv, { cwd: arena.workspace, env, timeoutMs: timeLimitMs });
        let failure2 = "";
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
            tokens = (tokens ?? 0) + (Number(usage.input_tokens) || 0) + (Number(usage.output_tokens) || 0);
          } else if (event.type === "turn.failed")
            failure2 += ` ${event.error?.message ?? ""}`;
          else if (event.type === "error")
            failure2 += ` ${event.message ?? ""}`;
        }
        const mishap = result.timedOut || completed ? null : mishapFrom(`${failure2} ${result.stderr}`);
        return { durationMs: result.durationMs, timedOut: result.timedOut, mishap, reply };
      },
      async finish() {
        const files = await summaries(join4(codexHome, "sessions"), "codex", parseCodexFile);
        let model = null;
        let effort = null;
        for (const file2 of files) {
          for (const event of jsonLines(await readFile3(file2.path, "utf8"))) {
            if (event.type !== "turn_context")
              continue;
            model = typeof event.payload?.model === "string" ? event.payload.model : model;
            effort = event.payload?.effort ?? effort;
          }
        }
        return {
          heroVersion: files.map((file2) => file2.session?.harnessVersion ?? null).find(Boolean) ?? null,
          caster: model ?? caster,
          focus: asFocus(effort, focus),
          tokens,
          toolCalls,
          costUsd: null,
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
    const version2 = await ompVersion();
    let first = true;
    let tokens = null;
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
        let failure2 = "";
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
          if (typeof usage.cost?.total === "number")
            cost = (cost ?? 0) + usage.cost.total;
          toolCalls += (message.content ?? []).filter((part) => part.type === "toolCall").length;
          if (typeof message.model === "string")
            model = message.provider ? `${message.provider}/${message.model}` : message.model;
          if (message.stopReason === "error")
            failure2 += ` ${message.errorMessage ?? message.error ?? "provider error"}`;
          const text = (message.content ?? []).filter((part) => part.type === "text").map((part) => part.text ?? "").join("").trim();
          if (text)
            reply = text;
        }
        const mishap = result.timedOut ? null : failure2 ? mishapFrom(failure2) : result.code !== 0 || !answered ? mishapFrom(result.stderr) : null;
        return { durationMs: result.durationMs, timedOut: result.timedOut, mishap, reply };
      },
      async finish() {
        return {
          heroVersion: version2,
          caster: model ?? caster,
          focus,
          tokens,
          toolCalls,
          costUsd: cost === null ? null : Math.round(cost * 1e4) / 1e4,
          opened: skillNames(await summaries(sessions, "omp", parseOmpFile))
        };
      }
    };
  }
};
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
    const settings = {
      sandbox: {
        enabled: true,
        failIfUnavailable: true,
        allowUnsandboxedCommands: false,
        autoAllowBashIfSandboxed: true,
        filesystem: { denyRead: [realHome], allowRead: [arena.workspace] }
      },
      permissions: { deny: ["WebFetch", "WebSearch", `Read(/${realHome}/**)`] },
      disableAllHooks: true,
      disableSkillShellExecution: true
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
      JSON.stringify(settings),
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
      for (const resolve3 of waiting.splice(0))
        resolve3(null);
    });
    let usage = { tokens: null, cost: null };
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
        usage = { tokens: (usage.tokens ?? 0) + turnTokens, cost: typeof outcome.total_cost_usd === "number" ? outcome.total_cost_usd : usage.cost };
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
        let version2 = null;
        let toolCalls = 0;
        const read = new Set;
        for (const event of jsonLines(transcript.join(`
`))) {
          if (event.type === "system" && event.subtype === "init") {
            model = typeof event.model === "string" ? event.model : model;
            version2 = harnessVersion(event.claude_code_version) ?? version2;
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
              const name2 = owners.get(match[1]) ?? [...pluginSkills].find(([path]) => target.replaceAll("\\", "/").includes(`${path}/SKILL.md`))?.[1];
              if (name2)
                read.add(name2);
            }
          }
        }
        return {
          heroVersion: version2,
          caster: model ?? caster,
          focus,
          tokens: usage.tokens,
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
import { appendFile, mkdir as mkdir4, readdir as readdir5, readFile as readFile4, stat as stat4, unlink, writeFile as writeFile4 } from "node:fs/promises";
import { dirname as dirname4, join as join5 } from "node:path";
async function appendRun(run, file2) {
  await mkdir4(dirname4(file2), { recursive: true });
  await appendFile(file2, `${JSON.stringify(run)}
`);
}
async function saveOutput(output2, dir) {
  await mkdir4(dir, { recursive: true });
  await writeFile4(join5(dir, `${output2.runId}.json`), JSON.stringify(output2));
}
async function readRuns(file2) {
  let text;
  try {
    text = await readFile4(file2, "utf8");
  } catch (error62) {
    if (error62 instanceof Error && "code" in error62 && error62.code === "ENOENT")
      return [];
    throw error62;
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
function median(values) {
  if (values.length === 0)
    return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
function cellsFromRuns(runs, quests, content) {
  const versions2 = new Map(quests.map((quest) => [quest.id, quest.version]));
  const spells = new Set(content.skills.map((skill) => skill.slug));
  const workflows = new Set(content.workflows.map((workflow) => workflow.slug));
  const groups = new Map;
  for (const run of runs) {
    if (versions2.get(run.quest) !== run.questVersion)
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
import { realpath as realpath3 } from "node:fs/promises";
import { join as join8 } from "node:path";

// src/trials/checks.ts
import { spawn as spawn2 } from "node:child_process";
import { cp as cp3, lstat as lstat3, mkdir as mkdir5, mkdtemp as mkdtemp2, readdir as readdir6, readFile as readFile5, rm as rm3 } from "node:fs/promises";
import { basename as basename2, join as join6 } from "node:path";
var OUTPUT_LIMIT = 1e6;
function nodeRunner(prefix = []) {
  return (args, { cwd, timeoutMs }) => {
    const { promise: promise2, resolve: resolve3 } = Promise.withResolvers();
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
      resolve3({ code: null, stdout, stderr, timedOut });
    });
    child.once("close", (code) => {
      clearTimeout(timer);
      resolve3({ code: overflowed ? null : code, stdout, stderr, timedOut });
    });
    return promise2;
  };
}
var runNode = nodeRunner();
var OMIT = new Set([".git", "node_modules", ".agents", ".claude", ".codex", ".omp"]);
async function copyWorkspace(source, dest) {
  await cp3(source, dest, { recursive: true, filter: async (path) => !OMIT.has(basename2(path)) && !(await lstat3(path)).isSymbolicLink() });
}
async function testFiles(root, dir) {
  const folder = join6(root, dir);
  const entries = await readdir6(folder, { withFileTypes: true }).catch(() => []);
  const files = [];
  for (const entry of entries) {
    if (OMIT.has(entry.name))
      continue;
    const path = join6(dir, entry.name);
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
async function checkOne(check2, quest, root, runner, timeoutMs) {
  const result = (ok, score, detail) => ({ id: check2.id, label: check2.label, ok, score, detail });
  const text = (file2) => readFile5(join6(root, file2), "utf8");
  const original = (file2) => readFile5(join6(quest.dir, "fixture", file2), "utf8");
  if (check2.type === "node-test" || check2.type === "own-tests" || check2.type === "catches-original") {
    if (check2.type === "node-test") {
      for (const file2 of check2.files) {
        await mkdir5(join6(root, file2, ".."), { recursive: true });
        await cp3(join6(quest.dir, "hidden", file2), join6(root, file2));
      }
    } else if (check2.type === "catches-original") {
      for (const file2 of check2.restore) {
        await mkdir5(join6(root, file2, ".."), { recursive: true });
        await cp3(join6(quest.dir, "fixture", file2), join6(root, file2));
      }
    }
    const files = check2.type === "node-test" ? check2.files : await testFiles(root, check2.dir);
    if (!files.length)
      return result(false, 0, "No test files found.");
    const run = await runner(["--test", "--test-reporter=tap", ...files.map((file2) => `./${file2}`)], { cwd: root, timeoutMs });
    if (run.timedOut)
      return result(false, 0, "Tests exceeded the time limit.");
    const counts = tap(run.stdout);
    const feedback = `${counts.passed}/${counts.total} tests passed.${counts.names.length ? ` Failing tests: ${counts.names.join("; ")}` : ""}`;
    if (check2.type === "catches-original") {
      const caught = run.code !== null && run.code !== 0 && counts.failed > 0;
      return result(caught, caught ? 1 : 0, caught ? "Tests fail against the original code." : "Tests did not expose the original bug.");
    }
    const ok = run.code === 0 && counts.failed === 0 && counts.total > 0 && (check2.type !== "own-tests" || counts.runnable >= check2.minTests);
    return result(ok, check2.type === "node-test" ? counts.total ? counts.passed / counts.total : 0 : Number(ok), `${feedback}${check2.type === "own-tests" ? ` ${counts.runnable}/${check2.minTests} required runnable tests.` : ""}`);
  }
  if (check2.type === "unchanged") {
    const changed = [];
    for (const path of check2.paths) {
      const actual2 = await readFile5(join6(root, path)).catch(() => null);
      if (!actual2 || !actual2.equals(await readFile5(join6(quest.dir, "fixture", path))))
        changed.push(path);
    }
    return result(changed.length === 0, (check2.paths.length - changed.length) / check2.paths.length, changed.length ? `Changed or missing files: ${changed.join(", ")}` : `${check2.paths.length} files unchanged.`);
  }
  const actual = await text(check2.file);
  switch (check2.type) {
    case "contains": {
      const missing = check2.values.filter((value) => !actual.includes(value));
      return result(!missing.length, (check2.values.length - missing.length) / check2.values.length, missing.length ? `Missing facts: ${missing.join("; ")}` : "All required facts kept.");
    }
    case "avoids": {
      const prose = skipRegions(actual, check2.skip);
      const matches = check2.patterns.flatMap((pattern) => new RegExp(pattern, "imu").exec(prose)?.[0] ?? []);
      return result(!matches.length, Number(!matches.length), matches.length ? `Remove matched wording: ${matches.join("; ")}` : "No disallowed wording found.");
    }
    case "keeps-blocks": {
      const before = blocks(await original(check2.source)).filter((block) => check2.blocks.includes(block.kind)).map((block) => block.text);
      const after = blocks(actual).filter((block) => check2.blocks.includes(block.kind)).map((block) => block.text);
      const ok = before.length === after.length && before.every((block, index) => block === after[index]);
      return result(ok, Number(ok), ok ? `${before.length} protected blocks kept.` : "Protected blocks changed, missing, added or reordered.");
    }
    case "no-new-numbers": {
      const allowed = new Set(numbers(await original(check2.source)));
      const added = [...new Set(numbers(actual).filter((number4) => !allowed.has(number4)))];
      return result(!added.length, Number(!added.length), added.length ? `New figures: ${added.join(", ")}` : "No new figures added.");
    }
    case "word-ratio": {
      const count = words(actual), sourceCount = words(await original(check2.source));
      const ratio = sourceCount ? count / sourceCount : count === 0 ? 1 : Infinity;
      const ok = ratio >= check2.min && ratio <= check2.max;
      return result(ok, Number(ok), `${count}/${sourceCount} words; allowed ratio ${check2.min} to ${check2.max}.`);
    }
    case "findings": {
      let match = function(finding, seen) {
        for (const issue2 of edges[finding]) {
          if (seen.has(issue2))
            continue;
          seen.add(issue2);
          const previous = assigned.get(issue2);
          if (previous === undefined || match(previous, seen)) {
            assigned.set(issue2, finding);
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
      const edges = findings.map((finding) => check2.expected.flatMap((issue2, index) => finding.file === issue2.file && finding.line >= issue2.lines[0] && finding.line <= issue2.lines[1] ? [index] : []));
      const assigned = new Map;
      for (let i = 0;i < findings.length; i++)
        match(i, new Set);
      const found = assigned.size, extra = edges.filter((edge) => !edge.length).length;
      const ok = found >= check2.minFound && extra <= check2.maxExtra;
      return result(ok, extra > check2.maxExtra ? 0 : found / check2.expected.length, `${found}/${check2.expected.length} issues found; ${extra} extra findings (limit ${check2.maxExtra}).`);
    }
  }
}
async function gradeQuest(quest, workspace, opts) {
  await mkdir5(opts.scratch, { recursive: true });
  const checks3 = [];
  for (const check2 of quest.checks) {
    const root = await mkdtemp2(join6(opts.scratch, "grade-"));
    try {
      await copyWorkspace(workspace, root);
      checks3.push(await checkOne(check2, quest, root, opts.runNode ?? runNode, opts.testTimeoutMs ?? 30000));
    } catch (error62) {
      const detail = error62 instanceof SyntaxError ? "Invalid JSON in the submitted file." : "Required files could not be read or checked.";
      checks3.push({ id: check2.id, label: check2.label, ok: false, score: 0, detail });
    } finally {
      await rm3(root, { recursive: true, force: true });
    }
  }
  return { passed: checks3.every((check2) => check2.ok), score: checks3.length ? checks3.reduce((sum, check2) => sum + check2.score, 0) / checks3.length : 0, checks: checks3 };
}

// src/trials/diff.ts
import { constants as constants3 } from "node:fs";
import { open as open2, readdir as readdir7, realpath as realpath2 } from "node:fs/promises";
import { join as join7, sep as sep3 } from "node:path";
var SKIP = new Set([".claude", ".codex", ".agents", ".omp", "node_modules", ".git"]);
var MAX_BYTES = 200000;
var MAX_CELLS = 4000000;
async function listFiles(root, dir = "") {
  const found = [];
  for (const entry of await readdir7(join7(root, dir), { withFileTypes: true }).catch(() => [])) {
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
    for (let i2 = x.length - 1;i2 >= 0; i2--) {
      for (let j2 = y.length - 1;j2 >= 0; j2--) {
        lcs[i2 * width + j2] = x[i2] === y[j2] ? lcs[(i2 + 1) * width + j2 + 1] + 1 : Math.max(lcs[(i2 + 1) * width + j2], lcs[i2 * width + j2 + 1]);
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
  const path = join7(root, rel);
  const handle = await open2(path, constants3.O_RDONLY | constants3.O_NOFOLLOW).catch((error62) => error62.code === "ENOENT" ? "absent" : "refused");
  if (typeof handle === "string")
    return handle;
  try {
    const info = await handle.stat();
    if (!info.isFile() || info.nlink !== 1 || !(await realpath2(path)).startsWith(realRoot + sep3))
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
  const [realBefore, realAfter] = await Promise.all([realpath2(before), realpath2(after)]);
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

// src/trials/run.ts
var PREAMBLE = "You are working alone in this folder on a quest. Do the task without asking questions. Use only Node.js built-ins (Node 20 or newer); do not install packages or use the network. When you finish, reply with a short summary of what you changed.";
function followUp(grade, prompt, maxPrompts) {
  const lines = grade.checks.map((check2) => check2.ok ? `- PASSED: ${check2.label}` : `- FAILED: ${check2.label}: ${check2.detail}`);
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
    session = await hero.start({ arena, spells, caster: plan.caster, focus: plan.focus, timeLimitMs: plan.quest.timeLimitSec * 1000 });
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
  } catch (error62) {
    outcome = "mishap";
    reason = `harness error: ${error62 instanceof Error ? error62.message.slice(0, 200) : String(error62).slice(0, 200)}`;
  } finally {
    diff = await treeDiff(join8(plan.quest.dir, "fixture"), arena.workspace).catch(() => "");
    const resolved = [...roots, ...await Promise.all(roots.map((path) => realpath3(path).catch(() => path)))];
    roots = [...new Set([...resolved, ...resolved.map((path) => path.replace(/^\/private(?=\/)/, ""))])];
    if (!plan.keep)
      await closeArena(arena);
  }
  const opened = new Set(report?.opened ?? []);
  const id = randomUUID();
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
    checks: (grade?.checks ?? []).map((check2) => ({ id: check2.id, ok: check2.ok, score: check2.score })),
    attuned: spells.filter((spell) => opened.has(spell.name)).map((spell) => spell.slug),
    durationMs,
    tokens: report?.tokens ?? null,
    toolCalls: report?.toolCalls ?? null,
    costUsd: report?.costUsd ?? null
  };
  const checks3 = (grade?.checks ?? []).map((check2) => ({ id: check2.id, label: check2.label, ok: check2.ok, detail: check2.detail }));
  return { run, output: { v: 1, runId: id, replies, followUps, diff, checks: checks3, roots } };
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
  const unknown2 = names.filter((name) => !quests.some((quest) => quest.id === name || quest.school === name));
  if (unknown2.length > 0)
    throw new Error(`Unknown quest or school: ${unknown2.join(", ")}`);
  return quests.filter((quest) => names.includes(quest.id) || names.includes(quest.school));
}
var STATUS = { cleared: "Cleared", fizzled: "Fizzled", mishap: "Mishap" };
function runLine(run, quest) {
  const how = run.outcome === "cleared" ? run.clearedAtPrompt === 1 ? "instant cast (one-shot)" : `channeled (${run.clearedAtPrompt} prompts)` : run.reason ?? "";
  const loadout = run.loadout.kind === "unarmed" ? "Unarmed" : run.loadout.kind === "workflow" ? `Workflow ${run.loadout.slug}` : `${run.loadout.kind === "combo" ? "Combo" : "Spell"} ${run.loadout.spells.join(" + ")}`;
  const metrics = [
    formatDuration(run.durationMs),
    run.tokens === null ? null : `${formatTokens(run.tokens)} mana`,
    run.costUsd === null ? null : `$${run.costUsd.toFixed(2)}`,
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
    const { run: result, output: output2 } = await runTrial({ quest: job.quest, loadout: job.loadout, hero: request.hero, caster: request.caster, focus: request.focus, cast: request.cast, keep: request.keep });
    await appendRun(result, ctx.runsFile);
    if (ctx.outputsDir)
      await saveOutput(output2, ctx.outputsDir);
    let note = null;
    if (ctx.scry && result.outcome !== "mishap") {
      try {
        note = await ctx.scry(result, output2, job.quest);
      } catch (error62) {
        note = `scrying failed: ${error62 instanceof Error ? error62.message : String(error62)}`;
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
      lines.push(`  ${name}${cell.cast ? ` (${cell.cast} cast)` : ""} · ${HARNESS_NAMES[cell.hero]} ${cell.heroVersion ?? "?"} · weapon ${cell.caster} · charge ${cell.focus}${cell.source.kind === "community" ? ` · community: ${cell.source.name ?? "anonymous"}` : ""}`, `    Clear rate (pass rate) ${cell.cleared}/${cell.runs}${rate === null ? "" : ` = ${Math.round(rate * 100)}%`} · Steadiness (reliability) ${Math.round(wilsonLower(cell.cleared, cell.runs) * 100)}%` + ` · Buff (vs Unarmed) ${cell.loadout.kind === "unarmed" ? "control" : buff ? `${buff.points >= 0 ? "+" : ""}${buff.points} pts` : "no control yet"}`, `    Instant casts ${cell.oneShot}/${cell.cleared} · Casts (prompts) ${cell.medianPromptsToClear ?? "-"} · Mastery ${Math.round(cell.meanScore * 100)}%` + ` · Cast time ${cell.medianDurationMs === null ? "-" : formatDuration(cell.medianDurationMs)} · Mana ${cell.medianTokens === null ? "-" : formatTokens(cell.medianTokens)}` + ` · Gold ${cell.medianCostUsd === null ? "-" : `$${cell.medianCostUsd.toFixed(2)}`} · Attuned ${cell.loadout.kind === "unarmed" ? "-" : `${cell.attuned}/${cell.runs}`}` + (cell.mishaps ? ` · ${cell.mishaps} mishap(s) left out` : ""));
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
    const version2 = said([commands[id], "--version"]);
    if (!version2.ok) {
      lines.push(`${HARNESS_NAMES[id]}: not installed`);
      continue;
    }
    const signIn = id === "codex" ? /logged in/i.test(said(["codex", "login", "status"]).text) ? "signed in" : "not signed in (codex login)" : id === "claude-code" ? /"loggedIn":\s*true/.test(said(["claude", "auth", "status"]).text) ? "signed in" : "not signed in (claude auth login)" : "uses the accounts OMP is signed in to";
    lines.push(`${HARNESS_NAMES[id]}: ${version2.text.trim().split(`
`)[0]}; ${signIn}; arena ${HEROES[id].containment}`);
  }
  return lines;
}

// src/trials/quest.ts
import { readdir as readdir8, readFile as readFile6, stat as stat5 } from "node:fs/promises";
import { join as join9, resolve as resolve3 } from "node:path";
var RelPath = exports_external.string().regex(/^(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$))[A-Za-z0-9._/-]{1,200}$/, "Use a relative path without ..");
var CheckId = exports_external.string().regex(/^[a-z][a-z0-9-]{0,39}$/);
var Label = exports_external.string().min(5).max(80);
var Pattern = exports_external.string().min(1).max(300).refine((source) => {
  try {
    new RegExp(source, "imu");
    return true;
  } catch {
    return false;
  }
}, "Invalid regular expression");
var Base = { id: CheckId, label: Label };
var CheckSchema = exports_external.discriminatedUnion("type", [
  exports_external.object({ ...Base, type: exports_external.literal("node-test"), files: exports_external.array(RelPath).min(1) }),
  exports_external.object({ ...Base, type: exports_external.literal("own-tests"), dir: RelPath, minTests: exports_external.number().int().min(1) }),
  exports_external.object({ ...Base, type: exports_external.literal("catches-original"), dir: RelPath, restore: exports_external.array(RelPath).min(1) }),
  exports_external.object({ ...Base, type: exports_external.literal("unchanged"), paths: exports_external.array(RelPath).min(1) }),
  exports_external.object({ ...Base, type: exports_external.literal("contains"), file: RelPath, values: exports_external.array(exports_external.string().min(1).max(200)).min(1) }),
  exports_external.object({ ...Base, type: exports_external.literal("avoids"), file: RelPath, patterns: exports_external.array(Pattern).min(1), skip: exports_external.array(exports_external.enum(["code", "inline-code", "quote", "table", "link-url"])).default([]) }),
  exports_external.object({ ...Base, type: exports_external.literal("keeps-blocks"), file: RelPath, source: RelPath, blocks: exports_external.array(exports_external.enum(["code", "quote", "table"])).min(1) }),
  exports_external.object({ ...Base, type: exports_external.literal("no-new-numbers"), file: RelPath, source: RelPath }),
  exports_external.object({ ...Base, type: exports_external.literal("word-ratio"), file: RelPath, source: RelPath, min: exports_external.number().positive(), max: exports_external.number().positive() }),
  exports_external.object({
    ...Base,
    type: exports_external.literal("findings"),
    file: RelPath,
    expected: exports_external.array(exports_external.object({ id: CheckId, file: RelPath, lines: exports_external.tuple([exports_external.number().int().positive(), exports_external.number().int().positive()]) })).min(1),
    minFound: exports_external.number().int().min(1),
    maxExtra: exports_external.number().int().min(0)
  })
]);
var QuestSchema = exports_external.object({
  id: SlugSchema,
  version: exports_external.number().int().positive(),
  name: exports_external.string().min(3).max(60),
  school: SlugSchema,
  rank: exports_external.enum(RANKS),
  summary: exports_external.string().min(10).max(160),
  prompt: exports_external.string().min(20).max(4000),
  maxPrompts: exports_external.number().int().min(1).max(5),
  timeLimitSec: exports_external.number().int().min(30).max(1800),
  checks: exports_external.array(CheckSchema).min(1).max(12)
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
    } catch (error62) {
      problems.push(`${entry.name}/quest.json: ${error62 instanceof Error ? error62.message : String(error62)}`);
      continue;
    }
    const parsed = QuestSchema.safeParse(raw);
    if (!parsed.success) {
      problems.push(...parsed.error.issues.map((issue2) => `${entry.name}/quest.json ${issue2.path.join(".")}: ${issue2.message}`));
      continue;
    }
    const quest = parsed.data;
    if (quest.id !== entry.name)
      problems.push(`${entry.name}/quest.json: id "${quest.id}" must match the folder name`);
    const ids = new Set;
    for (const check2 of quest.checks) {
      if (ids.has(check2.id))
        problems.push(`${entry.name}: duplicate check id "${check2.id}"`);
      ids.add(check2.id);
      const needed = check2.type === "node-test" ? check2.files.map((file2) => join9("hidden", file2)) : check2.type === "catches-original" ? check2.restore.map((file2) => join9("fixture", file2)) : check2.type === "unchanged" ? check2.paths.map((file2) => join9("fixture", file2)) : ("source" in check2) ? [join9("fixture", check2.source)] : [];
      for (const file2 of needed) {
        if (!await isFile(join9(questDir, file2)))
          problems.push(`${entry.name}: check "${check2.id}" needs ${file2}`);
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
import { mkdir as mkdir6, readdir as readdir9, readFile as readFile7, writeFile as writeFile5 } from "node:fs/promises";
import { hostname as hostname3, userInfo } from "node:os";
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
function localIdentity() {
  let user = null;
  try {
    user = userInfo().username;
  } catch {}
  return { user, host: hostname3() || null };
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
function redact(input2, roots, identity = localIdentity()) {
  const found = {};
  const count = (kind) => {
    found[kind] = (found[kind] ?? 0) + 1;
  };
  let text = input2;
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
  const names = [["user name", identity.user], ["host name", identity.host], ["host name", identity.host?.split(".")[0] ?? null]];
  for (const [kind, name] of names) {
    if (!name || name.length < 3 || COMMON_NAMES.has(name.toLowerCase()))
      continue;
    text = text.replace(new RegExp(`(?<![A-Za-z0-9_])${escape(name)}(?![A-Za-z0-9_])`, "gi"), (match) => {
      count(kind);
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
function chunk(type2, data) {
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  out.write(type2, 4, "ascii");
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
function scry(run, output2, quest, identity = localIdentity()) {
  const found = {};
  const clean = (text) => {
    const result = redact(text, output2.roots, identity);
    for (const [kind, n] of Object.entries(result.found))
      found[kind] = (found[kind] ?? 0) + n;
    return toGlyphs(result.text);
  };
  const rows = [];
  const gap = (height2) => rows.push({ segments: [], bg: null, height: height2 });
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
    ["Mana", run.tokens === null ? "not reported" : `${formatTokens(run.tokens)} tokens`]
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
  const reply = [...output2.replies].reverse().find((text) => text.trim()) ?? "";
  const replyLines = reply ? wrap(clean(reply.replace(/\*\*|__/g, "").trim()), COLS - 2) : [toGlyphs("(The hero reported no final message.)")];
  for (const line of replyLines.slice(0, CAPS.reply))
    row([{ text: ` ${line}`, color: reply ? TEXT : MUTED }], WELL);
  if (replyLines.length > CAPS.reply)
    row([{ text: ` ... ${replyLines.length - CAPS.reply} more lines`, color: MUTED }], WELL);
  title("Changes");
  const diffLines = output2.diff.trim() ? clean(output2.diff.replace(/\n$/, "")).split(`
`) : [];
  if (diffLines.length === 0)
    row([{ text: " (No file changes.)", color: MUTED }], WELL);
  for (const line of diffLines.slice(0, CAPS.diff)) {
    const color = /^(\+\+\+|---) /.test(line) ? GOLD : line.startsWith("+") ? XP : line.startsWith("-") ? HP : line.startsWith("@@") ? LINK : line.startsWith("Binary files") ? MUTED : MUTED;
    row([{ text: ` ${clip(line, COLS - 2)}`, color }], WELL);
  }
  if (diffLines.length > CAPS.diff)
    row([{ text: ` ... ${diffLines.length - CAPS.diff} more lines`, color: MUTED }], WELL);
  title(`Checks: ${output2.checks.filter((check2) => check2.ok).length} of ${output2.checks.length} passed`);
  for (const check2 of output2.checks.slice(0, CAPS.checks)) {
    row([{ text: check2.ok ? " ✓ " : " × ", color: check2.ok ? XP : HP }, { text: clip(toGlyphs(check2.label), COLS - 4), color: TEXT }], WELL);
  }
  if (output2.checks.length > CAPS.checks)
    row([{ text: ` ... ${output2.checks.length - CAPS.checks} more checks`, color: MUTED }], WELL);
  if (output2.checks.length === 0)
    row([{ text: " (No checks were graded.)", color: MUTED }], WELL);
  gap(8);
  const note = describeFindings(found);
  row([{ text: toGlyphs(`VibeRPG Proving Grounds · ${quest?.id ?? run.quest} v${run.questVersion} · ${run.startedAt.slice(0, 10)}`), color: MUTED }]);
  if (note)
    row([{ text: clip(`${note[0].toUpperCase()}${note.slice(1)}.`, COLS), color: MUTED }]);
  const top = 24;
  const height = top + rows.reduce((sum, item) => sum + item.height, 0) + 24;
  const pixels = new Uint8Array(WIDTH * height).fill(NIGHT);
  const fill = (x, y2, w, h, color) => {
    for (let yy = Math.max(0, y2);yy < Math.min(height, y2 + h); yy++)
      pixels.fill(color, yy * WIDTH + Math.max(0, x), yy * WIDTH + Math.min(WIDTH, x + w));
  };
  for (let y2 = 0;y2 < height; y2 += 4)
    for (let x = y2 / 4 % 2 ? 2 : 0;x < WIDTH; x += 4)
      pixels[y2 * WIDTH + x] = 7;
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
    const hex3 = GLYPHS.get(char) ?? GLYPHS.get("?");
    for (let r = 0;r < 16; r++) {
      const bits = Number.parseInt(hex3.slice(r * 2, r * 2 + 2), 16);
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
  const file2 = join10(dir, `${runId}.png`);
  await writeFile5(file2, png);
  return file2;
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
    const output2 = JSON.parse(await readFile7(join10(outputsDir, name), "utf8"));
    const run = byId.get(output2.runId);
    if (!run || run.outcome === "mishap")
      continue;
    const note = await render(run, output2);
    if (note === null)
      continue;
    rendered++;
    log(`${run.quest} ${run.outcome}: ${note}`);
  }
  return { rendered, skipped: pending.length - rendered };
}

// src/plugin/cli.ts
var DEFAULT_ENDPOINT = "https://vibe-rpg-simulator.vercel.app/api/submit";
var VERSION = "0.4.0";
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
Without --yes: local preview only, exit 2, no network. With --yes: check, then send only the report, signature and chosen attachments. Endpoint: --endpoint, SPELL_REPORT_ENDPOINT, then the bundled site URL.`
};
async function readLocal(path, limit) {
  if (resolve4(path).split(sep4).some((part) => SENSITIVE_NAME.test(part) || part.startsWith(".env") || part === ".ssh")) {
    throw new Error("Refusing to read a sensitive path.");
  }
  if ((await lstat4(path)).isSymbolicLink())
    throw new Error("Refusing to read a symbolic link.");
  const file2 = await open3(path, constants4.O_RDONLY | constants4.O_NOFOLLOW);
  try {
    const info = await file2.stat();
    if (!info.isFile())
      throw new Error("Expected a regular file.");
    if (info.size > limit)
      throw new Error(`File exceeds the ${limit}-byte limit.`);
    const bytes = await file2.readFile();
    if (bytes.length > limit)
      throw new Error(`File exceeds the ${limit}-byte limit.`);
    return bytes;
  } finally {
    await file2.close();
  }
}
async function optionalSignature(path) {
  try {
    return await readLocal(`${path}.sig`, SUBMIT_LIMITS.signatureBytes);
  } catch (error62) {
    if (error62 instanceof Error && "code" in error62 && error62.code === "ENOENT")
      return null;
    throw error62;
  }
}
async function readReport(path, verify2, fetchFn) {
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
  const provenance = verify2 ? await checkProvenance({ report, signature: signature?.toString("utf8") ?? null, meta: parsed.meta, attachments, fetchFn }) : null;
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
  for (const issue2 of files.issues)
    out(`Problem: ${issue2}`);
}
async function scanLogs(err) {
  const sources = await discoverFiles();
  const summaries2 = [];
  let failed = 0;
  let malformed = 0;
  let tails = 0;
  err(`Reading ${sources.length} local session files; no logs will be sent.`);
  for (const [index, source] of sources.entries()) {
    try {
      const summary = await PARSERS[source.agent](source);
      summaries2.push(summary);
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
  return rollUp(summaries2).roots;
}
function endpointUrl(value) {
  const raw = value ?? process.env.SPELL_REPORT_ENDPOINT ?? DEFAULT_ENDPOINT;
  if (!raw)
    throw new Error("No submission endpoint configured. Use --endpoint <site>/api/submit.");
  const url2 = new URL(raw);
  if (url2.username || url2.password || url2.hash || url2.search)
    throw new Error("Endpoint must not contain credentials, a query or a fragment.");
  const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(url2.hostname);
  if (url2.protocol !== "https:" && !(url2.protocol === "http:" && loopback))
    throw new Error("Use HTTPS for submission (HTTP is allowed only on localhost).");
  return url2;
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
  const type2 = sniffMediaType(bytes);
  if (!type2)
    throw new Error("Unsupported attachment type. Use PNG, JPEG, GIF, WebP, MP4 or WebM.");
  const stem = basename3(source, extname(source)).normalize("NFKD").replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^[^A-Za-z0-9]+/, "").slice(0, 100);
  const name = as ?? `${stem || "attachment"}.${type2.ext}`;
  const previous = parsed.meta.attachments.find((item) => item.file === name);
  const entry = { file: name, sha256: await sha256Hex(bytes), alt };
  const meta3 = ReportMetaSchema.parse({ ...parsed.meta, attachments: previous ? parsed.meta.attachments.map((item) => item.file === name ? entry : item) : [...parsed.meta.attachments, entry] });
  const text = formatReport(meta3, parsed.body);
  const reportSize = Buffer.byteLength(text);
  if (reportSize > SUBMIT_LIMITS.reportBytes)
    throw new Error("Report exceeds the report byte limit.");
  let total = reportSize + bytes.length;
  for (const item of meta3.attachments) {
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
      } catch (error62) {
        if (!(error62 instanceof Error && ("code" in error62) && error62.code === "ENOENT"))
          throw error62;
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
  const success2 = await new Promise((done) => {
    const child = spawn3("ssh-keygen", args, {
      detached: true,
      windowsHide: true,
      stdio: "ignore",
      timeout: 15000,
      env: { ...process.env, SSH_ASKPASS_REQUIRE: "never" }
    });
    child.on("error", (error62) => {
      missing = "code" in error62 && error62.code === "ENOENT";
      done(false);
    });
    child.on("close", (code) => done(code === 0));
  });
  if (!success2) {
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
  const blur2 = args.includes("--blur");
  const consent = args.includes("--scrying") || ask !== null && await ask("Save a screenshot of each run's output (Scrying)? Nothing is shared unless you add screenshots to a report. [y/N] ");
  if (!consent) {
    if (blur2)
      out("--blur has no effect without --scrying; no screenshots will be saved.");
    return { args: rest, context: {} };
  }
  return { args: rest, context: {
    outputsDir: join11(dir, "outputs"),
    scry: async (run, output2, quest) => {
      const shot = scry(run, output2, quest);
      if (sensitiveCount(shot.found) > 0) {
        const credentials = shot.found.credential ? ` ${listFindings(shot.found, ["credential"])} will be removed either way.` : "";
        out(`Alert: the screenshot of run ${run.id.slice(0, 8)} (${quest.id}) shows sensitive details: ${listFindings(shot.found, FINDINGS.filter((kind) => kind !== "credential"))}.${credentials}`);
        const allowed = blur2 || ask !== null && await ask("Save this screenshot with those details blurred? [y/N] ");
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
Commands: spells, quests, doctor, trial, trials, scry, new, attach, check, sign, submit
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
    const catalog = async () => options.catalog ?? exports_external.object({ skills: exports_external.array(SkillSchema), workflows: exports_external.array(WorkflowSchema) }).parse(JSON.parse(await readFile8(join11(skillDir, "catalog.json"), "utf8")));
    switch (command) {
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
        const counts = await scryPending(join11(dataDir, "trials", "outputs"), join11(dataDir, "trials", "scrying"), await readRuns(runsFile), async (run, output2) => {
          const quest = quests.find((item) => item.id === run.quest && item.version === run.questVersion);
          return quest ? context.scry(run, output2, quest) : null;
        }, out);
        out(`Checked ${counts.rendered} saved run output(s); ${counts.skipped} skipped (mishaps or quests no longer bundled).`);
        return 0;
      }
      case "trials": {
        if (args.length)
          throw new Error(HELP.trials);
        const library = await catalog();
        const quests = await loadQuests(questsDir);
        const cells = cellsFromRuns(await readRuns(runsFile), quests, library);
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
        const top = values.top === undefined ? Infinity : exports_external.coerce.number().int().positive().parse(values.top);
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
        } catch (error62) {
          if (!(error62 instanceof Error && ("code" in error62) && error62.code === "ENOENT"))
            throw error62;
        }
        const meta3 = ReportMetaSchema.parse({
          format: REPORT_FORMAT,
          spell: { name: values.name, kind: values.kind, sourceUrl: values.source, version: values.version ?? null, agents: values.agent ?? ["claude-code"] },
          submitter: { name: values.submitter ?? "Anonymous", github: values.github ?? null, email: values.email ?? null },
          verdict: { tier: null, summary: PLACEHOLDER_SUMMARY },
          evidence: { generator: `spell-report ${VERSION}`, generatedAt: new Date().toISOString(), match: [...new Set(values.match ?? [])], sessions: 0, byAgent: {}, firstUsed: null, lastUsed: null, tests: { sessionsWithFailingTest: 0, recovered: 0 } },
          attachments: []
        });
        const evidence = meta3.evidence;
        if (!evidence)
          throw new Error("At least one --match id is required.");
        const roots = await scanLogs(err);
        const stats = measureSpell(roots, evidence.match);
        meta3.evidence = {
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
          const cells = cellsFromRuns(runs, await loadQuests(questsDir), library);
          const selected = cells.filter((cell) => cell.loadout.kind !== "unarmed" && (values.trials.includes(cell.loadout.slug ?? "") || cell.loadout.spells.some((slug) => values.trials.includes(slug))));
          meta3.trials = cells.filter((cell) => selected.includes(cell) || cell.loadout.kind === "unarmed" && selected.some((armed) => sameSetup(armed, cell))).map((cell) => ({ ...cell, source: { kind: "community", name: meta3.submitter.name } }));
        }
        const body = REPORT_SECTIONS.map((section) => `## ${section}

<!-- Write your experience here; omit private details. -->`).join(`

`);
        const shots = [];
        let leftOut = 0;
        if (values.scrying) {
          if (!meta3.trials?.length)
            throw new Error("--scrying attaches trial screenshots; add --trials <library-slug>.");
          const runs = await readRuns(runsFile);
          let total = Buffer.byteLength(formatReport(meta3, body)) + 2000 + SUBMIT_LIMITS.signatureBytes;
          const armedFirst = [...meta3.trials].sort((a, b) => Number(a.loadout.kind === "unarmed") - Number(b.loadout.kind === "unarmed"));
          for (const cell of armedFirst) {
            const latest2 = runs.filter((run) => run.outcome !== "mishap" && setupKey(run) === setupKey(cell)).sort((a, b) => b.startedAt.localeCompare(a.startedAt));
            for (const run of latest2) {
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
        await writeFile6(join11(dir, "spell-report.md"), formatReport(meta3, body), { flag: "wx" });
        for (const shot of shots)
          await attach(join11(dir, "spell-report.md"), shot.source, shot.alt, out, shot.name);
        out(`Created spell-report.md. Evidence: ${stats.sessions} root sessions. Fill every section and the verdict before sending.`);
        out(`Environment: ${meta3.evidence.environment ? environmentLabel(meta3.evidence.environment) : "not recorded (--no-environment)"}`);
        if (meta3.trials)
          out(`Added ${meta3.trials.length} trial cells, including matching Unarmed controls (self-measured).`);
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
        const email3 = values.email === undefined ? files.meta?.submitter.email : exports_external.email().max(200).parse(values.email);
        if (!values.yes) {
          out(`Nothing sent. Destination: ${endpoint?.href ?? "not configured; pass --endpoint <site>/api/submit"}
Report: ${basename3(path)} (${files.report.length} bytes)
${files.report.toString("utf8")}`);
          out(`Signature: ${files.signature ? `${basename3(path)}.sig (${files.signature.length} bytes)` : "none"}`);
          for (const file2 of files.attachments)
            out(`Attachment: ${file2.name} (${file2.bytes.length} bytes), SHA-256 ${await sha256Hex(file2.bytes)}`);
          out(`Reply-to: ${email3 ?? "none"}
Consent: yes; via: plugin. Logs are never sent.
Review these files, then rerun with --yes only after explicit approval.`);
          for (const issue2 of files.issues)
            err(`Problem: ${issue2}`);
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
        for (const file2 of files.attachments)
          form.append("files", new Blob([file2.bytes], { type: sniffMediaType(file2.bytes)?.mime }), file2.name);
        form.set("consent", "yes");
        form.set("via", "plugin");
        form.set("website", "");
        if (email3)
          form.set("email", email3);
        try {
          const response = await (options.fetchFn ?? fetch)(endpoint, { method: "POST", body: form, headers: { Accept: "application/json" }, signal: AbortSignal.timeout(30000), redirect: "error" });
          const result = await response.json();
          if (!response.ok) {
            const problem = exports_external.object({ error: exports_external.string(), issues: exports_external.array(exports_external.string()).optional(), retryAfterSeconds: exports_external.number().optional() }).safeParse(result);
            if (!problem.success)
              throw new Error(`Submission failed (HTTP ${response.status}).`);
            err(problem.data.error);
            for (const issue2 of problem.data.issues ?? [])
              err(issue2);
            if (problem.data.retryAfterSeconds !== undefined)
              err(`Retry after ${problem.data.retryAfterSeconds} seconds.`);
            throw new Error(`Submission failed (HTTP ${response.status}).`);
          }
          const receipt = exports_external.object({ id: exports_external.string().min(1), signature: exports_external.enum(["valid", "invalid", "unsigned", "unsupported"]), github: exports_external.enum(["verified", "key_not_listed", "lookup_failed", "not_claimed", "unsigned"]), warnings: exports_external.array(exports_external.string()) }).parse(result);
          out(`Reference id: ${receipt.id}
Signature: ${receipt.signature}
GitHub: ${receipt.github}`);
          for (const warning of receipt.warnings)
            out(`Warning: ${warning}`);
          return 0;
        } catch (error62) {
          err(`Could not submit: ${error62 instanceof Error ? error62.message : "request failed"}
Upload the report and chosen files at ${new URL("../submit/", endpoint).href}`);
          return 1;
        }
      }
    }
  } catch (error62) {
    if (error62 instanceof exports_external.ZodError)
      for (const issue2 of error62.issues)
        err(`${issue2.path.join(".") || "input"}: ${issue2.message}`);
    else
      err(error62 instanceof Error ? error62.message : "Command failed.");
  }
  return 1;
}
if (process.argv[1] && resolve4(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = await runCli(process.argv.slice(2));
}
export {
  trialScrying,
  runCli
};
