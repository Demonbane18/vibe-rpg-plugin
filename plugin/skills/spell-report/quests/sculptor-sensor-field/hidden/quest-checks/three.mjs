// A small stand-in for the parts of three.js r186 core that scene modules use, for grading without a GPU.
// Math, Object3D transforms, BufferGeometry, InstancedMesh and raycasting follow three.js behaviour. Every
// geometry, material and texture registers itself in RESOURCES so graders can tell what was created and disposed.

export const REVISION = '186';
export const RESOURCES = new Set();

// ---------- constants ----------
export const FrontSide = 0, BackSide = 1, DoubleSide = 2;
export const NoBlending = 0, NormalBlending = 1, AdditiveBlending = 2, SubtractiveBlending = 3, MultiplyBlending = 4, CustomBlending = 5;
export const NoColorSpace = '', SRGBColorSpace = 'srgb', LinearSRGBColorSpace = 'srgb-linear';
export const StaticDrawUsage = 35044, DynamicDrawUsage = 35048, StreamDrawUsage = 35040;
export const UnsignedByteType = 1009, ByteType = 1010, ShortType = 1011, UnsignedShortType = 1012, IntType = 1013, UnsignedIntType = 1014, FloatType = 1015, HalfFloatType = 1016;
export const AlphaFormat = 1021, RGBFormat = 1022, RGBAFormat = 1023, LuminanceFormat = 1024, LuminanceAlphaFormat = 1025, DepthFormat = 1026, RedFormat = 1028, RGFormat = 1030;
export const RepeatWrapping = 1000, ClampToEdgeWrapping = 1001, MirroredRepeatWrapping = 1002;
export const NearestFilter = 1003, NearestMipmapNearestFilter = 1004, NearestMipmapLinearFilter = 1005, LinearFilter = 1006, LinearMipmapNearestFilter = 1007, LinearMipmapLinearFilter = 1008;
export const UVMapping = 300, NoToneMapping = 0, LinearToneMapping = 1, ReinhardToneMapping = 2, CineonToneMapping = 3, ACESFilmicToneMapping = 4, AgXToneMapping = 6, NeutralToneMapping = 7;
export const BasicShadowMap = 0, PCFShadowMap = 1, PCFSoftShadowMap = 2, VSMShadowMap = 3;
export const TrianglesDrawMode = 0, TriangleStripDrawMode = 1, TriangleFanDrawMode = 2;
export const NeverDepth = 0, AlwaysDepth = 1, LessDepth = 2, LessEqualDepth = 3, EqualDepth = 4, GreaterEqualDepth = 5, GreaterDepth = 6, NotEqualDepth = 7;

// ---------- math ----------
let uuidCounter = 1;
export const MathUtils = {
  DEG2RAD: Math.PI / 180, RAD2DEG: 180 / Math.PI,
  degToRad: (d) => d * Math.PI / 180, radToDeg: (r) => r * 180 / Math.PI,
  clamp: (v, a, b) => Math.max(a, Math.min(b, v)), lerp: (a, b, t) => (1 - t) * a + t * b,
  inverseLerp: (a, b, v) => (a !== b ? (v - a) / (b - a) : 0), mapLinear: (x, a1, a2, b1, b2) => b1 + (x - a1) * (b2 - b1) / (a2 - a1),
  smoothstep: (x, min, max) => { if (x <= min) return 0; if (x >= max) return 1; x = (x - min) / (max - min); return x * x * (3 - 2 * x); },
  euclideanModulo: (n, m) => ((n % m) + m) % m, damp: (x, y, l, dt) => MathUtils.lerp(x, y, 1 - Math.exp(-l * dt)),
  randFloat: (a, b) => a + Math.random() * (b - a), randFloatSpread: (r) => r * (0.5 - Math.random()), randInt: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),
  isPowerOfTwo: (v) => (v & (v - 1)) === 0 && v !== 0, generateUUID: () => `00000000-0000-4000-8000-${(uuidCounter++).toString(16).padStart(12, '0')}`,
  seededRandom: (s) => { let t = (s ?? 1) + 0x6D2B79F5; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; },
};

export class Vector2 {
  constructor(x = 0, y = 0) { this.x = x; this.y = y; this.isVector2 = true; }
  get width() { return this.x; } set width(v) { this.x = v; }
  get height() { return this.y; } set height(v) { this.y = v; }
  set(x, y) { this.x = x; this.y = y; return this; }
  setScalar(s) { this.x = this.y = s; return this; }
  copy(v) { this.x = v.x; this.y = v.y; return this; }
  clone() { return new Vector2(this.x, this.y); }
  add(v) { this.x += v.x; this.y += v.y; return this; }
  sub(v) { this.x -= v.x; this.y -= v.y; return this; }
  multiplyScalar(s) { this.x *= s; this.y *= s; return this; }
  divideScalar(s) { return this.multiplyScalar(1 / s); }
  length() { return Math.hypot(this.x, this.y); }
  normalize() { return this.divideScalar(this.length() || 1); }
  dot(v) { return this.x * v.x + this.y * v.y; }
  distanceTo(v) { return Math.hypot(this.x - v.x, this.y - v.y); }
  fromArray(a, o = 0) { this.x = a[o]; this.y = a[o + 1]; return this; }
  toArray(a = [], o = 0) { a[o] = this.x; a[o + 1] = this.y; return a; }
  equals(v) { return v.x === this.x && v.y === this.y; }
}

export class Vector3 {
  constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; this.isVector3 = true; }
  set(x, y, z) { if (z === undefined) z = this.z; this.x = x; this.y = y; this.z = z; return this; }
  setScalar(s) { this.x = this.y = this.z = s; return this; }
  setX(x) { this.x = x; return this; } setY(y) { this.y = y; return this; } setZ(z) { this.z = z; return this; }
  setComponent(i, v) { this['xyz'[i]] = v; return this; } getComponent(i) { return this['xyz'[i]]; }
  copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
  clone() { return new Vector3(this.x, this.y, this.z); }
  add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
  addScalar(s) { this.x += s; this.y += s; this.z += s; return this; }
  addVectors(a, b) { this.x = a.x + b.x; this.y = a.y + b.y; this.z = a.z + b.z; return this; }
  addScaledVector(v, s) { this.x += v.x * s; this.y += v.y * s; this.z += v.z * s; return this; }
  sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
  subScalar(s) { this.x -= s; this.y -= s; this.z -= s; return this; }
  subVectors(a, b) { this.x = a.x - b.x; this.y = a.y - b.y; this.z = a.z - b.z; return this; }
  multiply(v) { this.x *= v.x; this.y *= v.y; this.z *= v.z; return this; }
  multiplyScalar(s) { this.x *= s; this.y *= s; this.z *= s; return this; }
  multiplyVectors(a, b) { this.x = a.x * b.x; this.y = a.y * b.y; this.z = a.z * b.z; return this; }
  divide(v) { this.x /= v.x; this.y /= v.y; this.z /= v.z; return this; }
  divideScalar(s) { return this.multiplyScalar(1 / s); }
  min(v) { this.x = Math.min(this.x, v.x); this.y = Math.min(this.y, v.y); this.z = Math.min(this.z, v.z); return this; }
  max(v) { this.x = Math.max(this.x, v.x); this.y = Math.max(this.y, v.y); this.z = Math.max(this.z, v.z); return this; }
  clamp(a, b) { this.x = Math.max(a.x, Math.min(b.x, this.x)); this.y = Math.max(a.y, Math.min(b.y, this.y)); this.z = Math.max(a.z, Math.min(b.z, this.z)); return this; }
  negate() { this.x = -this.x; this.y = -this.y; this.z = -this.z; return this; }
  floor() { this.x = Math.floor(this.x); this.y = Math.floor(this.y); this.z = Math.floor(this.z); return this; }
  round() { this.x = Math.round(this.x); this.y = Math.round(this.y); this.z = Math.round(this.z); return this; }
  dot(v) { return this.x * v.x + this.y * v.y + this.z * v.z; }
  lengthSq() { return this.dot(this); }
  length() { return Math.sqrt(this.lengthSq()); }
  manhattanLength() { return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z); }
  normalize() { return this.divideScalar(this.length() || 1); }
  setLength(l) { return this.normalize().multiplyScalar(l); }
  lerp(v, t) { this.x += (v.x - this.x) * t; this.y += (v.y - this.y) * t; this.z += (v.z - this.z) * t; return this; }
  lerpVectors(a, b, t) { return this.copy(a).lerp(b, t); }
  cross(v) { return this.crossVectors(this, v); }
  crossVectors(a, b) { const ax = a.x, ay = a.y, az = a.z, bx = b.x, by = b.y, bz = b.z; this.x = ay * bz - az * by; this.y = az * bx - ax * bz; this.z = ax * by - ay * bx; return this; }
  distanceToSquared(v) { const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z; return dx * dx + dy * dy + dz * dz; }
  distanceTo(v) { return Math.sqrt(this.distanceToSquared(v)); }
  applyMatrix4(m) {
    const x = this.x, y = this.y, z = this.z, e = m.elements;
    const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
    this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
    this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
    this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
    return this;
  }
  applyMatrix3(m) { const x = this.x, y = this.y, z = this.z, e = m.elements; this.x = e[0] * x + e[3] * y + e[6] * z; this.y = e[1] * x + e[4] * y + e[7] * z; this.z = e[2] * x + e[5] * y + e[8] * z; return this; }
  applyNormalMatrix(m) { return this.applyMatrix3(m).normalize(); }
  applyQuaternion(q) {
    const vx = this.x, vy = this.y, vz = this.z, qx = q.x, qy = q.y, qz = q.z, qw = q.w;
    const tx = 2 * (qy * vz - qz * vy), ty = 2 * (qz * vx - qx * vz), tz = 2 * (qx * vy - qy * vx);
    this.x = vx + qw * tx + qy * tz - qz * ty; this.y = vy + qw * ty + qz * tx - qx * tz; this.z = vz + qw * tz + qx * ty - qy * tx;
    return this;
  }
  applyEuler(e) { return this.applyQuaternion(new Quaternion().setFromEuler(e)); }
  applyAxisAngle(axis, angle) { return this.applyQuaternion(new Quaternion().setFromAxisAngle(axis, angle)); }
  transformDirection(m) { const x = this.x, y = this.y, z = this.z, e = m.elements; this.x = e[0] * x + e[4] * y + e[8] * z; this.y = e[1] * x + e[5] * y + e[9] * z; this.z = e[2] * x + e[6] * y + e[10] * z; return this.normalize(); }
  project(camera) { return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix); }
  unproject(camera) { return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld); }
  setFromMatrixPosition(m) { const e = m.elements; this.x = e[12]; this.y = e[13]; this.z = e[14]; return this; }
  setFromMatrixScale(m) { const e = m.elements; this.x = Math.hypot(e[0], e[1], e[2]); this.y = Math.hypot(e[4], e[5], e[6]); this.z = Math.hypot(e[8], e[9], e[10]); return this; }
  setFromMatrixColumn(m, i) { return this.fromArray(m.elements, i * 4); }
  setFromBufferAttribute(a, i) { this.x = a.getX(i); this.y = a.getY(i); this.z = a.getZ(i); return this; }
  setFromSpherical(s) { const st = Math.sin(s.phi) * s.radius; this.x = st * Math.sin(s.theta); this.y = Math.cos(s.phi) * s.radius; this.z = st * Math.cos(s.theta); return this; }
  angleTo(v) { const d = Math.sqrt(this.lengthSq() * v.lengthSq()); return d === 0 ? Math.PI / 2 : Math.acos(Math.max(-1, Math.min(1, this.dot(v) / d))); }
  fromArray(a, o = 0) { this.x = a[o]; this.y = a[o + 1]; this.z = a[o + 2]; return this; }
  toArray(a = [], o = 0) { a[o] = this.x; a[o + 1] = this.y; a[o + 2] = this.z; return a; }
  equals(v) { return v.x === this.x && v.y === this.y && v.z === this.z; }
  random() { this.x = Math.random(); this.y = Math.random(); this.z = Math.random(); return this; }
  *[Symbol.iterator]() { yield this.x; yield this.y; yield this.z; }
}

export class Vector4 {
  constructor(x = 0, y = 0, z = 0, w = 1) { this.x = x; this.y = y; this.z = z; this.w = w; this.isVector4 = true; }
  set(x, y, z, w) { this.x = x; this.y = y; this.z = z; this.w = w; return this; }
  copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; this.w = v.w ?? 1; return this; }
  clone() { return new Vector4(this.x, this.y, this.z, this.w); }
  fromArray(a, o = 0) { this.x = a[o]; this.y = a[o + 1]; this.z = a[o + 2]; this.w = a[o + 3]; return this; }
  toArray(a = [], o = 0) { a[o] = this.x; a[o + 1] = this.y; a[o + 2] = this.z; a[o + 3] = this.w; return a; }
}

export class Euler {
  constructor(x = 0, y = 0, z = 0, order = 'XYZ') { this._x = x; this._y = y; this._z = z; this._order = order; this.isEuler = true; this._onChange = () => {}; }
  get x() { return this._x; } set x(v) { this._x = v; this._onChange(); }
  get y() { return this._y; } set y(v) { this._y = v; this._onChange(); }
  get z() { return this._z; } set z(v) { this._z = v; this._onChange(); }
  get order() { return this._order; } set order(v) { this._order = v; this._onChange(); }
  set(x, y, z, order = this._order) { this._x = x; this._y = y; this._z = z; this._order = order; this._onChange(); return this; }
  copy(e) { return this.set(e._x, e._y, e._z, e._order); }
  clone() { return new Euler(this._x, this._y, this._z, this._order); }
  setFromRotationMatrix(m, order = this._order, update = true) {
    const e = m.elements, m11 = e[0], m12 = e[4], m13 = e[8], m22 = e[5], m23 = e[9], m32 = e[6], m33 = e[10];
    // XYZ order only, which is the default and what scene code uses.
    this._y = Math.asin(Math.max(-1, Math.min(1, m13)));
    if (Math.abs(m13) < 0.9999999) { this._x = Math.atan2(-m23, m33); this._z = Math.atan2(-m12, m11); }
    else { this._x = Math.atan2(m32, m22); this._z = 0; }
    this._order = order;
    if (update) this._onChange();
    return this;
  }
  setFromQuaternion(q, order, update) { return this.setFromRotationMatrix(new Matrix4().makeRotationFromQuaternion(q), order, update); }
  _onChangeCallback(cb) { this._onChange = cb; return this; }
}

export class Quaternion {
  constructor(x = 0, y = 0, z = 0, w = 1) { this._x = x; this._y = y; this._z = z; this._w = w; this.isQuaternion = true; this._onChange = () => {}; }
  get x() { return this._x; } set x(v) { this._x = v; this._onChange(); }
  get y() { return this._y; } set y(v) { this._y = v; this._onChange(); }
  get z() { return this._z; } set z(v) { this._z = v; this._onChange(); }
  get w() { return this._w; } set w(v) { this._w = v; this._onChange(); }
  set(x, y, z, w) { this._x = x; this._y = y; this._z = z; this._w = w; this._onChange(); return this; }
  identity() { return this.set(0, 0, 0, 1); }
  copy(q) { return this.set(q.x, q.y, q.z, q.w); }
  clone() { return new Quaternion(this._x, this._y, this._z, this._w); }
  setFromEuler(e, update = true) {
    const c1 = Math.cos(e.x / 2), c2 = Math.cos(e.y / 2), c3 = Math.cos(e.z / 2), s1 = Math.sin(e.x / 2), s2 = Math.sin(e.y / 2), s3 = Math.sin(e.z / 2);
    const o = e.order;
    let x, y, z, w;
    if (o === 'YXZ') { x = s1 * c2 * c3 + c1 * s2 * s3; y = c1 * s2 * c3 - s1 * c2 * s3; z = c1 * c2 * s3 - s1 * s2 * c3; w = c1 * c2 * c3 + s1 * s2 * s3; }
    else if (o === 'ZXY') { x = s1 * c2 * c3 - c1 * s2 * s3; y = c1 * s2 * c3 + s1 * c2 * s3; z = c1 * c2 * s3 + s1 * s2 * c3; w = c1 * c2 * c3 - s1 * s2 * s3; }
    else if (o === 'ZYX') { x = s1 * c2 * c3 - c1 * s2 * s3; y = c1 * s2 * c3 + s1 * c2 * s3; z = c1 * c2 * s3 - s1 * s2 * c3; w = c1 * c2 * c3 + s1 * s2 * s3; }
    else if (o === 'YZX') { x = s1 * c2 * c3 + c1 * s2 * s3; y = c1 * s2 * c3 + s1 * c2 * s3; z = c1 * c2 * s3 - s1 * s2 * c3; w = c1 * c2 * c3 - s1 * s2 * s3; }
    else if (o === 'XZY') { x = s1 * c2 * c3 - c1 * s2 * s3; y = c1 * s2 * c3 - s1 * c2 * s3; z = c1 * c2 * s3 + s1 * s2 * c3; w = c1 * c2 * c3 + s1 * s2 * s3; }
    else { x = s1 * c2 * c3 + c1 * s2 * s3; y = c1 * s2 * c3 - s1 * c2 * s3; z = c1 * c2 * s3 + s1 * s2 * c3; w = c1 * c2 * c3 - s1 * s2 * s3; }
    this._x = x; this._y = y; this._z = z; this._w = w;
    if (update) this._onChange();
    return this;
  }
  setFromAxisAngle(axis, angle) { const s = Math.sin(angle / 2); return this.set(axis.x * s, axis.y * s, axis.z * s, Math.cos(angle / 2)); }
  setFromRotationMatrix(m) {
    const e = m.elements, m11 = e[0], m12 = e[4], m13 = e[8], m21 = e[1], m22 = e[5], m23 = e[9], m31 = e[2], m32 = e[6], m33 = e[10], t = m11 + m22 + m33;
    if (t > 0) { const s = 0.5 / Math.sqrt(t + 1); return this.set((m32 - m23) * s, (m13 - m31) * s, (m21 - m12) * s, 0.25 / s); }
    if (m11 > m22 && m11 > m33) { const s = 2 * Math.sqrt(1 + m11 - m22 - m33); return this.set(0.25 * s, (m12 + m21) / s, (m13 + m31) / s, (m32 - m23) / s); }
    if (m22 > m33) { const s = 2 * Math.sqrt(1 + m22 - m11 - m33); return this.set((m12 + m21) / s, 0.25 * s, (m23 + m32) / s, (m13 - m31) / s); }
    const s = 2 * Math.sqrt(1 + m33 - m11 - m22); return this.set((m13 + m31) / s, (m23 + m32) / s, 0.25 * s, (m21 - m12) / s);
  }
  setFromUnitVectors(a, b) {
    let r = a.dot(b) + 1, x, y, z, w;
    if (r < 1e-8) { r = 0; if (Math.abs(a.x) > Math.abs(a.z)) { x = -a.y; y = a.x; z = 0; w = r; } else { x = 0; y = -a.z; z = a.y; w = r; } }
    else { x = a.y * b.z - a.z * b.y; y = a.z * b.x - a.x * b.z; z = a.x * b.y - a.y * b.x; w = r; }
    return this.set(x, y, z, w).normalize();
  }
  multiply(q) { return this.multiplyQuaternions(this, q); }
  premultiply(q) { return this.multiplyQuaternions(q, this); }
  multiplyQuaternions(a, b) {
    const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w, qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;
    return this.set(qax * qbw + qaw * qbx + qay * qbz - qaz * qby, qay * qbw + qaw * qby + qaz * qbx - qax * qbz, qaz * qbw + qaw * qbz + qax * qby - qay * qbx, qaw * qbw - qax * qbx - qay * qby - qaz * qbz);
  }
  length() { return Math.hypot(this._x, this._y, this._z, this._w); }
  normalize() { const l = this.length(); return l === 0 ? this.set(0, 0, 0, 1) : this.set(this._x / l, this._y / l, this._z / l, this._w / l); }
  invert() { return this.set(-this._x, -this._y, -this._z, this._w); }
  conjugate() { return this.invert(); }
  dot(q) { return this._x * q._x + this._y * q._y + this._z * q._z + this._w * q._w; }
  fromArray(a, o = 0) { return this.set(a[o], a[o + 1], a[o + 2], a[o + 3]); }
  toArray(a = [], o = 0) { a[o] = this._x; a[o + 1] = this._y; a[o + 2] = this._z; a[o + 3] = this._w; return a; }
  _onChangeCallback(cb) { this._onChange = cb; return this; }
}

export class Matrix3 {
  constructor() { this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]; this.isMatrix3 = true; }
  identity() { this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]; return this; }
  copy(m) { this.elements = m.elements.slice(); return this; }
  clone() { return new Matrix3().copy(this); }
  setFromMatrix4(m) { const e = m.elements; this.elements = [e[0], e[1], e[2], e[4], e[5], e[6], e[8], e[9], e[10]]; return this; }
  invert() {
    const [n11, n21, n31, n12, n22, n32, n13, n23, n33] = this.elements;
    const t11 = n33 * n22 - n32 * n23, t12 = n32 * n13 - n33 * n12, t13 = n23 * n12 - n22 * n13, det = n11 * t11 + n21 * t12 + n31 * t13;
    if (det === 0) { this.elements.fill(0); return this; }
    const d = 1 / det;
    this.elements = [t11 * d, (n31 * n23 - n33 * n21) * d, (n32 * n21 - n31 * n22) * d, t12 * d, (n33 * n11 - n31 * n13) * d, (n31 * n12 - n32 * n11) * d, t13 * d, (n21 * n13 - n23 * n11) * d, (n22 * n11 - n21 * n12) * d];
    return this;
  }
  transpose() { const m = this.elements; [m[1], m[3]] = [m[3], m[1]]; [m[2], m[6]] = [m[6], m[2]]; [m[5], m[7]] = [m[7], m[5]]; return this; }
  getNormalMatrix(m4) { return this.setFromMatrix4(m4).invert().transpose(); }
}

export class Matrix4 {
  constructor() { this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; this.isMatrix4 = true; }
  set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    const te = this.elements;
    te[0] = n11; te[4] = n12; te[8] = n13; te[12] = n14; te[1] = n21; te[5] = n22; te[9] = n23; te[13] = n24;
    te[2] = n31; te[6] = n32; te[10] = n33; te[14] = n34; te[3] = n41; te[7] = n42; te[11] = n43; te[15] = n44;
    return this;
  }
  identity() { return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  copy(m) { for (let i = 0; i < 16; i++) this.elements[i] = m.elements[i]; return this; }
  clone() { return new Matrix4().copy(this); }
  fromArray(a, o = 0) { for (let i = 0; i < 16; i++) this.elements[i] = a[i + o]; return this; }
  toArray(a = [], o = 0) { for (let i = 0; i < 16; i++) a[i + o] = this.elements[i]; return a; }
  copyPosition(m) { const t = this.elements, s = m.elements; t[12] = s[12]; t[13] = s[13]; t[14] = s[14]; return this; }
  setPosition(x, y, z) { const te = this.elements; if (x.isVector3) { te[12] = x.x; te[13] = x.y; te[14] = x.z; } else { te[12] = x; te[13] = y; te[14] = z; } return this; }
  makeTranslation(x, y, z) { if (x.isVector3) { z = x.z; y = x.y; x = x.x; } return this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1); }
  makeScale(x, y, z) { return this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1); }
  makeRotationX(t) { const c = Math.cos(t), s = Math.sin(t); return this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1); }
  makeRotationY(t) { const c = Math.cos(t), s = Math.sin(t); return this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1); }
  makeRotationZ(t) { const c = Math.cos(t), s = Math.sin(t); return this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  makeRotationAxis(axis, angle) { return this.makeRotationFromQuaternion(new Quaternion().setFromAxisAngle(axis, angle)); }
  makeRotationFromQuaternion(q) { return this.compose(new Vector3(), q, new Vector3(1, 1, 1)); }
  makeRotationFromEuler(e) { return this.makeRotationFromQuaternion(new Quaternion().setFromEuler(e)); }
  compose(position, quaternion, scale) {
    const te = this.elements, x = quaternion.x, y = quaternion.y, z = quaternion.z, w = quaternion.w;
    const x2 = x + x, y2 = y + y, z2 = z + z, xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
    const sx = scale.x, sy = scale.y, sz = scale.z;
    te[0] = (1 - (yy + zz)) * sx; te[1] = (xy + wz) * sx; te[2] = (xz - wy) * sx; te[3] = 0;
    te[4] = (xy - wz) * sy; te[5] = (1 - (xx + zz)) * sy; te[6] = (yz + wx) * sy; te[7] = 0;
    te[8] = (xz + wy) * sz; te[9] = (yz - wx) * sz; te[10] = (1 - (xx + yy)) * sz; te[11] = 0;
    te[12] = position.x; te[13] = position.y; te[14] = position.z; te[15] = 1;
    return this;
  }
  decompose(position, quaternion, scale) {
    const te = this.elements;
    let sx = Math.hypot(te[0], te[1], te[2]); const sy = Math.hypot(te[4], te[5], te[6]), sz = Math.hypot(te[8], te[9], te[10]);
    if (this.determinant() < 0) sx = -sx;
    position.set(te[12], te[13], te[14]);
    const m = this.clone(), me = m.elements;
    me[0] /= sx; me[1] /= sx; me[2] /= sx; me[4] /= sy; me[5] /= sy; me[6] /= sy; me[8] /= sz; me[9] /= sz; me[10] /= sz;
    quaternion.setFromRotationMatrix(m);
    scale.set(sx, sy, sz);
    return this;
  }
  multiply(m) { return this.multiplyMatrices(this, m); }
  premultiply(m) { return this.multiplyMatrices(m, this); }
  multiplyMatrices(a, b) {
    const ae = a.elements, be = b.elements, r = new Array(16);
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) r[j * 4 + i] = ae[i] * be[j * 4] + ae[4 + i] * be[j * 4 + 1] + ae[8 + i] * be[j * 4 + 2] + ae[12 + i] * be[j * 4 + 3];
    for (let i = 0; i < 16; i++) this.elements[i] = r[i];
    return this;
  }
  multiplyScalar(s) { for (let i = 0; i < 16; i++) this.elements[i] *= s; return this; }
  determinant() {
    const te = this.elements;
    const n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12], n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13], n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14], n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];
    return n41 * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34)
      + n42 * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31)
      + n43 * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31)
      + n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31);
  }
  invert() {
    const te = this.elements;
    const n11 = te[0], n21 = te[1], n31 = te[2], n41 = te[3], n12 = te[4], n22 = te[5], n32 = te[6], n42 = te[7], n13 = te[8], n23 = te[9], n33 = te[10], n43 = te[11], n14 = te[12], n24 = te[13], n34 = te[14], n44 = te[15];
    const t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
    const t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
    const t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
    const t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
    const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
    if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const d = 1 / det;
    te[0] = t11 * d; te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * d;
    te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * d;
    te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * d;
    te[4] = t12 * d; te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * d;
    te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * d;
    te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * d;
    te[8] = t13 * d; te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * d;
    te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * d;
    te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * d;
    te[12] = t14 * d; te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * d;
    te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * d;
    te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * d;
    return this;
  }
  getMaxScaleOnAxis() { const te = this.elements; return Math.sqrt(Math.max(te[0] ** 2 + te[1] ** 2 + te[2] ** 2, te[4] ** 2 + te[5] ** 2 + te[6] ** 2, te[8] ** 2 + te[9] ** 2 + te[10] ** 2)); }
  scale(v) { const te = this.elements; for (const [i, s] of [[0, v.x], [4, v.y], [8, v.z]]) { te[i] *= s; te[i + 1] *= s; te[i + 2] *= s; te[i + 3] *= s; } return this; }
  extractRotation(m) { const s = new Vector3().setFromMatrixScale(m); const te = this.elements, me = m.elements; this.identity(); for (const [i, k] of [[0, s.x], [4, s.y], [8, s.z]]) { te[i] = me[i] / k; te[i + 1] = me[i + 1] / k; te[i + 2] = me[i + 2] / k; } return this; }
  lookAt(eye, target, up) {
    const z = new Vector3().subVectors(eye, target); if (z.lengthSq() === 0) z.z = 1; z.normalize();
    const x = new Vector3().crossVectors(up, z); if (x.lengthSq() === 0) { z.x += 0.0001; z.normalize(); x.crossVectors(up, z); } x.normalize();
    const y = new Vector3().crossVectors(z, x), te = this.elements;
    te[0] = x.x; te[4] = y.x; te[8] = z.x; te[1] = x.y; te[5] = y.y; te[9] = z.y; te[2] = x.z; te[6] = y.z; te[10] = z.z;
    return this;
  }
  makePerspective(left, right, top, bottom, near, far) {
    const x = 2 * near / (right - left), y = 2 * near / (top - bottom), a = (right + left) / (right - left), b = (top + bottom) / (top - bottom), c = -(far + near) / (far - near), d = -2 * far * near / (far - near);
    return this.set(x, 0, a, 0, 0, y, b, 0, 0, 0, c, d, 0, 0, -1, 0);
  }
  makeOrthographic(left, right, top, bottom, near, far) {
    const w = 1 / (right - left), h = 1 / (top - bottom), p = 1 / (far - near);
    return this.set(2 * w, 0, 0, -(right + left) * w, 0, 2 * h, 0, -(top + bottom) * h, 0, 0, -2 * p, -(far + near) * p, 0, 0, 0, 1);
  }
  equals(m) { return m.elements.every((v, i) => v === this.elements[i]); }
}

export class Ray {
  constructor(origin = new Vector3(), direction = new Vector3(0, 0, -1)) { this.origin = origin; this.direction = direction; }
  set(o, d) { this.origin.copy(o); this.direction.copy(d); return this; }
  copy(r) { return this.set(r.origin, r.direction); }
  clone() { return new Ray().copy(this); }
  at(t, target = new Vector3()) { return target.copy(this.origin).addScaledVector(this.direction, t); }
  applyMatrix4(m) { this.origin.applyMatrix4(m); this.direction.transformDirection(m); return this; }
  distanceSqToPoint(p) { const t = new Vector3().subVectors(p, this.origin).dot(this.direction); if (t < 0) return this.origin.distanceToSquared(p); return this.at(t).distanceToSquared(p); }
  distanceToPoint(p) { return Math.sqrt(this.distanceSqToPoint(p)); }
  intersectSphere(sphere, target = new Vector3()) {
    const v = new Vector3().subVectors(sphere.center, this.origin), tca = v.dot(this.direction), d2 = v.dot(v) - tca * tca, r2 = sphere.radius * sphere.radius;
    if (d2 > r2) return null;
    const thc = Math.sqrt(r2 - d2), t0 = tca - thc, t1 = tca + thc;
    if (t1 < 0) return null;
    return this.at(t0 < 0 ? t1 : t0, target);
  }
  intersectsSphere(sphere) { return sphere.radius >= 0 && this.distanceSqToPoint(sphere.center) <= sphere.radius * sphere.radius; }
  intersectBox(box, target = new Vector3()) {
    let tmin = -Infinity, tmax = Infinity;
    for (const k of ['x', 'y', 'z']) {
      const inv = 1 / this.direction[k];
      let t1 = (box.min[k] - this.origin[k]) * inv, t2 = (box.max[k] - this.origin[k]) * inv;
      if (t1 > t2) [t1, t2] = [t2, t1];
      tmin = Math.max(tmin, t1); tmax = Math.min(tmax, t2);
    }
    if (tmax < 0 || tmin > tmax) return null;
    return this.at(tmin >= 0 ? tmin : tmax, target);
  }
  intersectsBox(box) { return this.intersectBox(box) !== null; }
  intersectPlane(plane, target = new Vector3()) {
    const denom = plane.normal.dot(this.direction);
    if (denom === 0) return plane.distanceToPoint(this.origin) === 0 ? target.copy(this.origin) : null;
    const t = -(this.origin.dot(plane.normal) + plane.constant) / denom;
    return t >= 0 ? this.at(t, target) : null;
  }
  intersectTriangle(a, b, c, backfaceCulling, target = new Vector3()) {
    const edge1 = new Vector3().subVectors(b, a), edge2 = new Vector3().subVectors(c, a), normal = new Vector3().crossVectors(edge1, edge2);
    let DdN = this.direction.dot(normal), sign;
    if (DdN > 0) { if (backfaceCulling) return null; sign = 1; } else if (DdN < 0) { sign = -1; DdN = -DdN; } else return null;
    const diff = new Vector3().subVectors(this.origin, a);
    const DdQxE2 = sign * this.direction.dot(new Vector3().crossVectors(diff, edge2));
    if (DdQxE2 < 0) return null;
    const DdE1xQ = sign * this.direction.dot(new Vector3().copy(edge1).cross(diff));
    if (DdE1xQ < 0 || DdQxE2 + DdE1xQ > DdN) return null;
    const QdN = -sign * diff.dot(normal);
    if (QdN < 0) return null;
    return this.at(QdN / DdN, target);
  }
}

export class Sphere {
  constructor(center = new Vector3(), radius = -1) { this.center = center; this.radius = radius; this.isSphere = true; }
  set(c, r) { this.center.copy(c); this.radius = r; return this; }
  copy(s) { this.center.copy(s.center); this.radius = s.radius; return this; }
  clone() { return new Sphere().copy(this); }
  isEmpty() { return this.radius < 0; }
  makeEmpty() { this.center.set(0, 0, 0); this.radius = -1; return this; }
  containsPoint(p) { return p.distanceToSquared(this.center) <= this.radius * this.radius; }
  distanceToPoint(p) { return p.distanceTo(this.center) - this.radius; }
  intersectsSphere(s) { const r = this.radius + s.radius; return s.center.distanceToSquared(this.center) <= r * r; }
  applyMatrix4(m) { this.center.applyMatrix4(m); this.radius *= m.getMaxScaleOnAxis(); return this; }
  translate(o) { this.center.add(o); return this; }
  expandByPoint(p) {
    if (this.isEmpty()) { this.center.copy(p); this.radius = 0; return this; }
    const d = new Vector3().subVectors(p, this.center), l2 = d.lengthSq();
    if (l2 > this.radius * this.radius) { const l = Math.sqrt(l2), half = (l - this.radius) * 0.5; this.center.addScaledVector(d, half / l); this.radius += half; }
    return this;
  }
  union(s) {
    if (s.isEmpty()) return this;
    if (this.isEmpty()) return this.copy(s);
    if (this.center.equals(s.center)) { this.radius = Math.max(this.radius, s.radius); return this; }
    const dir = new Vector3().subVectors(s.center, this.center).normalize().multiplyScalar(s.radius);
    this.expandByPoint(new Vector3().copy(s.center).add(dir));
    this.expandByPoint(new Vector3().copy(s.center).sub(dir));
    return this;
  }
  setFromPoints(points, optionalCenter) {
    const center = this.center;
    if (optionalCenter) center.copy(optionalCenter); else new Box3().setFromPoints(points).getCenter(center);
    let m = 0; for (const p of points) m = Math.max(m, center.distanceToSquared(p));
    this.radius = Math.sqrt(m);
    return this;
  }
  getBoundingBox(target = new Box3()) { if (this.isEmpty()) return target.makeEmpty(); target.set(this.center, this.center); target.expandByScalar(this.radius); return target; }
}

export class Box3 {
  constructor(min = new Vector3(Infinity, Infinity, Infinity), max = new Vector3(-Infinity, -Infinity, -Infinity)) { this.min = min; this.max = max; this.isBox3 = true; }
  set(min, max) { this.min.copy(min); this.max.copy(max); return this; }
  copy(b) { return this.set(b.min, b.max); }
  clone() { return new Box3().copy(this); }
  makeEmpty() { this.min.setScalar(Infinity); this.max.setScalar(-Infinity); return this; }
  isEmpty() { return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z; }
  expandByPoint(p) { this.min.min(p); this.max.max(p); return this; }
  expandByScalar(s) { this.min.addScalar(-s); this.max.addScalar(s); return this; }
  expandByVector(v) { this.min.sub(v); this.max.add(v); return this; }
  setFromPoints(points) { this.makeEmpty(); for (const p of points) this.expandByPoint(p); return this; }
  setFromArray(a) { this.makeEmpty(); for (let i = 0; i < a.length; i += 3) this.expandByPoint(new Vector3(a[i], a[i + 1], a[i + 2])); return this; }
  setFromBufferAttribute(attr) { this.makeEmpty(); const v = new Vector3(); for (let i = 0; i < attr.count; i++) this.expandByPoint(v.fromBufferAttribute(attr, i)); return this; }
  setFromCenterAndSize(c, s) { const h = s.clone().multiplyScalar(0.5); this.min.copy(c).sub(h); this.max.copy(c).add(h); return this; }
  setFromObject(object, precise) { this.makeEmpty(); return this.expandByObject(object, precise); }
  expandByObject(object) {
    object.updateWorldMatrix(false, false);
    let bb = null;
    if (object.isInstancedMesh) { if (object.boundingBox === null) object.computeBoundingBox(); bb = object.boundingBox; }
    else if (object.geometry) { if (object.geometry.boundingBox === null) object.geometry.computeBoundingBox(); bb = object.geometry.boundingBox; }
    if (bb && !bb.isEmpty()) this.union(bb.clone().applyMatrix4(object.matrixWorld));
    for (const child of object.children) this.expandByObject(child);
    return this;
  }
  getCenter(t = new Vector3()) { return this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(0.5); }
  getSize(t = new Vector3()) { return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min); }
  containsPoint(p) { return p.x >= this.min.x && p.x <= this.max.x && p.y >= this.min.y && p.y <= this.max.y && p.z >= this.min.z && p.z <= this.max.z; }
  intersectsBox(b) { return !(b.max.x < this.min.x || b.min.x > this.max.x || b.max.y < this.min.y || b.min.y > this.max.y || b.max.z < this.min.z || b.min.z > this.max.z); }
  union(b) { this.min.min(b.min); this.max.max(b.max); return this; }
  translate(o) { this.min.add(o); this.max.add(o); return this; }
  applyMatrix4(m) {
    if (this.isEmpty()) return this;
    const pts = [];
    for (const x of [this.min.x, this.max.x]) for (const y of [this.min.y, this.max.y]) for (const z of [this.min.z, this.max.z]) pts.push(new Vector3(x, y, z).applyMatrix4(m));
    return this.setFromPoints(pts);
  }
  getBoundingSphere(t = new Sphere()) { if (this.isEmpty()) return t.makeEmpty(); this.getCenter(t.center); t.radius = this.getSize(new Vector3()).length() * 0.5; return t; }
}

export class Plane {
  constructor(normal = new Vector3(1, 0, 0), constant = 0) { this.normal = normal; this.constant = constant; this.isPlane = true; }
  set(n, c) { this.normal.copy(n); this.constant = c; return this; }
  setFromNormalAndCoplanarPoint(n, p) { this.normal.copy(n); this.constant = -p.dot(this.normal); return this; }
  distanceToPoint(p) { return this.normal.dot(p) + this.constant; }
  copy(p) { return this.set(p.normal, p.constant); }
  clone() { return new Plane().copy(this); }
}

export class Spherical {
  constructor(radius = 1, phi = 0, theta = 0) { this.radius = radius; this.phi = phi; this.theta = theta; }
  set(r, p, t) { this.radius = r; this.phi = p; this.theta = t; return this; }
  setFromVector3(v) { this.radius = v.length(); if (this.radius === 0) { this.theta = 0; this.phi = 0; } else { this.theta = Math.atan2(v.x, v.z); this.phi = Math.acos(Math.max(-1, Math.min(1, v.y / this.radius))); } return this; }
}

export class Frustum {
  constructor() { this.planes = Array.from({ length: 6 }, () => new Plane()); }
  setFromProjectionMatrix() { return this; }
  intersectsObject() { return true; }
  intersectsSphere() { return true; }
  intersectsBox() { return true; }
  containsPoint() { return true; }
}

// ---------- colour ----------
const srgbToLinear = (c) => (c < 0.04045 ? c * 0.0773993808 : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4));
const linearToSrgb = (c) => (c < 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 0.41666) - 0.055);
export const ColorManagement = {
  enabled: true, workingColorSpace: LinearSRGBColorSpace,
  convert(color, from, to) { if (!this.enabled || from === to || !from || !to) return color; if (from === SRGBColorSpace) { color.r = srgbToLinear(color.r); color.g = srgbToLinear(color.g); color.b = srgbToLinear(color.b); } else { color.r = linearToSrgb(color.r); color.g = linearToSrgb(color.g); color.b = linearToSrgb(color.b); } return color; },
  toWorkingColorSpace(c, from) { return this.convert(c, from, this.workingColorSpace); },
  fromWorkingColorSpace(c, to) { return this.convert(c, this.workingColorSpace, to); },
  getPrimaries() { return 'rec709'; }, getTransfer(cs) { return cs === SRGBColorSpace ? 'srgb' : 'linear'; },
};
const NAMED = { white: 0xffffff, black: 0x000000, red: 0xff0000, green: 0x008000, blue: 0x0000ff, yellow: 0xffff00, gray: 0x808080, grey: 0x808080, orange: 0xffa500, cyan: 0x00ffff, magenta: 0xff00ff, lime: 0x00ff00 };

export class Color {
  constructor(r, g, b) { this.isColor = true; this.r = 1; this.g = 1; this.b = 1; this.set(r, g, b); }
  set(r, g, b) {
    if (g === undefined && b === undefined) {
      if (r === undefined) return this;
      if (r && r.isColor) this.copy(r);
      else if (typeof r === 'number') this.setHex(r);
      else if (typeof r === 'string') this.setStyle(r);
    } else this.setRGB(r, g, b);
    return this;
  }
  setScalar(s) { this.r = this.g = this.b = s; return this; }
  setHex(hex, colorSpace = SRGBColorSpace) { hex = Math.floor(hex); this.r = (hex >> 16 & 255) / 255; this.g = (hex >> 8 & 255) / 255; this.b = (hex & 255) / 255; ColorManagement.toWorkingColorSpace(this, colorSpace); return this; }
  setRGB(r, g, b, colorSpace = ColorManagement.workingColorSpace) { this.r = r; this.g = g; this.b = b; ColorManagement.toWorkingColorSpace(this, colorSpace); return this; }
  setHSL(h, s, l, colorSpace = ColorManagement.workingColorSpace) {
    h = MathUtils.euclideanModulo(h, 1); s = Math.max(0, Math.min(1, s)); l = Math.max(0, Math.min(1, l));
    const hue2rgb = (p, q, t) => { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t); return p; };
    if (s === 0) { this.r = this.g = this.b = l; } else { const p = l <= 0.5 ? l * (1 + s) : l + s - l * s, q = 2 * l - p; this.r = hue2rgb(q, p, h + 1 / 3); this.g = hue2rgb(q, p, h); this.b = hue2rgb(q, p, h - 1 / 3); }
    ColorManagement.toWorkingColorSpace(this, colorSpace);
    return this;
  }
  setStyle(style, colorSpace = SRGBColorSpace) {
    let m;
    if ((m = /^#([0-9a-f]{6})$/i.exec(style))) return this.setHex(parseInt(m[1], 16), colorSpace);
    if ((m = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(style))) return this.setHex(parseInt(m[1] + m[1] + m[2] + m[2] + m[3] + m[3], 16), colorSpace);
    if ((m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(style))) return this.setRGB(+m[1] / 255, +m[2] / 255, +m[3] / 255, colorSpace);
    if ((m = /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/i.exec(style))) return this.setHSL(+m[1] / 360, +m[2] / 100, +m[3] / 100, colorSpace);
    if (NAMED[style.toLowerCase()] !== undefined) return this.setHex(NAMED[style.toLowerCase()], colorSpace);
    return this;
  }
  setColorName(name, colorSpace) { return this.setStyle(name, colorSpace); }
  getHex(colorSpace = SRGBColorSpace) { const c = this.clone(); ColorManagement.fromWorkingColorSpace(c, colorSpace); const f = (v) => Math.round(Math.max(0, Math.min(1, v)) * 255); return f(c.r) * 65536 + f(c.g) * 256 + f(c.b); }
  getHexString(cs) { return ('000000' + this.getHex(cs).toString(16)).slice(-6); }
  getStyle(cs) { return `#${this.getHexString(cs)}`; }
  getRGB(target, colorSpace = ColorManagement.workingColorSpace) { target.r = this.r; target.g = this.g; target.b = this.b; ColorManagement.fromWorkingColorSpace(target, colorSpace); return target; }
  getHSL(target) { const max = Math.max(this.r, this.g, this.b), min = Math.min(this.r, this.g, this.b), l = (min + max) / 2; let h = 0, s = 0; if (max !== min) { const d = max - min; s = l <= 0.5 ? d / (max + min) : d / (2 - max - min); h = max === this.r ? (this.g - this.b) / d + (this.g < this.b ? 6 : 0) : max === this.g ? (this.b - this.r) / d + 2 : (this.r - this.g) / d + 4; h /= 6; } target.h = h; target.s = s; target.l = l; return target; }
  offsetHSL(h, s, l) { const t = this.getHSL({}); return this.setHSL(t.h + h, t.s + s, t.l + l); }
  convertSRGBToLinear() { this.r = srgbToLinear(this.r); this.g = srgbToLinear(this.g); this.b = srgbToLinear(this.b); return this; }
  convertLinearToSRGB() { this.r = linearToSrgb(this.r); this.g = linearToSrgb(this.g); this.b = linearToSrgb(this.b); return this; }
  copySRGBToLinear(c) { return this.copy(c).convertSRGBToLinear(); }
  copyLinearToSRGB(c) { return this.copy(c).convertLinearToSRGB(); }
  copy(c) { this.r = c.r; this.g = c.g; this.b = c.b; return this; }
  clone() { return new Color(this.r, this.g, this.b); }
  add(c) { this.r += c.r; this.g += c.g; this.b += c.b; return this; }
  multiply(c) { this.r *= c.r; this.g *= c.g; this.b *= c.b; return this; }
  multiplyScalar(s) { this.r *= s; this.g *= s; this.b *= s; return this; }
  lerp(c, t) { this.r += (c.r - this.r) * t; this.g += (c.g - this.g) * t; this.b += (c.b - this.b) * t; return this; }
  lerpColors(a, b, t) { return this.copy(a).lerp(b, t); }
  equals(c) { return c.r === this.r && c.g === this.g && c.b === this.b; }
  fromArray(a, o = 0) { this.r = a[o]; this.g = a[o + 1]; this.b = a[o + 2]; return this; }
  toArray(a = [], o = 0) { a[o] = this.r; a[o + 1] = this.g; a[o + 2] = this.b; return a; }
  fromBufferAttribute(attr, i) { this.r = attr.getX(i); this.g = attr.getY(i); this.b = attr.getZ(i); return this; }
  *[Symbol.iterator]() { yield this.r; yield this.g; yield this.b; }
}

// ---------- events ----------
export class EventDispatcher {
  addEventListener(type, fn) { this._listeners ??= {}; (this._listeners[type] ??= []).includes(fn) || this._listeners[type].push(fn); }
  hasEventListener(type, fn) { return !!this._listeners?.[type]?.includes(fn); }
  removeEventListener(type, fn) { const list = this._listeners?.[type]; if (list) { const i = list.indexOf(fn); if (i >= 0) list.splice(i, 1); } }
  dispatchEvent(event) { const list = this._listeners?.[event.type]; if (list) { event.target = this; for (const fn of list.slice()) fn.call(this, event); event.target = null; } }
}

function track(resource, kind) { resource.__kind = kind; resource.__disposed = 0; RESOURCES.add(resource); }
function disposeResource(resource) { resource.__disposed++; resource.dispatchEvent({ type: 'dispose' }); }

// ---------- attributes ----------
function normalizeValue(v, a) {
  if (a instanceof Float32Array || a instanceof Float64Array) return v;
  if (a instanceof Uint8Array || a instanceof Uint8ClampedArray) return Math.round(v * 255);
  if (a instanceof Uint16Array) return Math.round(v * 65535);
  if (a instanceof Uint32Array) return Math.round(v * 4294967295);
  if (a instanceof Int8Array) return Math.round(v * 127);
  if (a instanceof Int16Array) return Math.round(v * 32767);
  if (a instanceof Int32Array) return Math.round(v * 2147483647);
  return v;
}
export function denormalizeValue(v, a) {
  if (a instanceof Uint8Array || a instanceof Uint8ClampedArray) return v / 255;
  if (a instanceof Uint16Array) return v / 65535;
  if (a instanceof Uint32Array) return v / 4294967295;
  if (a instanceof Int8Array) return Math.max(v / 127, -1);
  if (a instanceof Int16Array) return Math.max(v / 32767, -1);
  if (a instanceof Int32Array) return Math.max(v / 2147483647, -1);
  return v;
}

export class BufferAttribute {
  constructor(array, itemSize, normalized = false) {
    if (Array.isArray(array)) throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');
    this.isBufferAttribute = true; this.name = ''; this.array = array; this.itemSize = itemSize; this.count = array !== undefined ? array.length / itemSize : 0;
    this.normalized = normalized; this.usage = StaticDrawUsage; this.updateRanges = []; this.gpuType = FloatType; this.version = 0;
  }
  onUploadCallback() {}
  set needsUpdate(v) { if (v === true) this.version++; }
  setUsage(u) { this.usage = u; return this; }
  addUpdateRange(start, count) { this.updateRanges.push({ start, count }); }
  clearUpdateRanges() { this.updateRanges.length = 0; }
  copy(src) { this.name = src.name; this.array = new src.array.constructor(src.array); this.itemSize = src.itemSize; this.count = src.count; this.normalized = src.normalized; this.usage = src.usage; return this; }
  copyAt(i1, attr, i2) { for (let i = 0; i < this.itemSize; i++) this.array[i1 * this.itemSize + i] = attr.array[i2 * attr.itemSize + i]; return this; }
  copyArray(a) { this.array.set(a); return this; }
  set(value, offset = 0) { this.array.set(value, offset); return this; }
  getComponent(i, c) { let v = this.array[i * this.itemSize + c]; if (this.normalized) v = denormalizeValue(v, this.array); return v; }
  setComponent(i, c, v) { this.array[i * this.itemSize + c] = this.normalized ? normalizeValue(v, this.array) : v; }
  getX(i) { return this.getComponent(i, 0); } getY(i) { return this.getComponent(i, 1); } getZ(i) { return this.getComponent(i, 2); } getW(i) { return this.getComponent(i, 3); }
  setX(i, v) { this.setComponent(i, 0, v); return this; } setY(i, v) { this.setComponent(i, 1, v); return this; } setZ(i, v) { this.setComponent(i, 2, v); return this; } setW(i, v) { this.setComponent(i, 3, v); return this; }
  setXY(i, x, y) { this.setX(i, x); this.setY(i, y); return this; }
  setXYZ(i, x, y, z) { this.setX(i, x); this.setY(i, y); this.setZ(i, z); return this; }
  setXYZW(i, x, y, z, w) { this.setXYZ(i, x, y, z); this.setW(i, w); return this; }
  onUpload(cb) { this.onUploadCallback = cb; return this; }
  clone() { return new this.constructor(this.array, this.itemSize).copy(this); }
  applyMatrix4(m) { const v = new Vector3(); for (let i = 0; i < this.count; i++) { v.fromBufferAttribute(this, i).applyMatrix4(m); this.setXYZ(i, v.x, v.y, v.z); } return this; }
  applyMatrix3(m) { const v = new Vector3(); for (let i = 0; i < this.count; i++) { v.fromBufferAttribute(this, i).applyMatrix3(m); this.setXYZ(i, v.x, v.y, v.z); } return this; }
  applyNormalMatrix(m) { const v = new Vector3(); for (let i = 0; i < this.count; i++) { v.fromBufferAttribute(this, i).applyNormalMatrix(m); this.setXYZ(i, v.x, v.y, v.z); } return this; }
  transformDirection(m) { const v = new Vector3(); for (let i = 0; i < this.count; i++) { v.fromBufferAttribute(this, i).transformDirection(m); this.setXYZ(i, v.x, v.y, v.z); } return this; }
  toJSON() { return { itemSize: this.itemSize, type: this.array.constructor.name, array: Array.from(this.array), normalized: this.normalized }; }
}
Vector3.prototype.fromBufferAttribute = function (a, i) { this.x = a.getX(i); this.y = a.getY(i); this.z = a.getZ(i); return this; };
Vector2.prototype.fromBufferAttribute = function (a, i) { this.x = a.getX(i); this.y = a.getY(i); return this; };

const typed = (Type) => class extends BufferAttribute { constructor(array, itemSize, normalized) { super(new Type(array), itemSize, normalized); } };
export const Int8BufferAttribute = typed(Int8Array), Uint8BufferAttribute = typed(Uint8Array), Uint8ClampedBufferAttribute = typed(Uint8ClampedArray);
export const Int16BufferAttribute = typed(Int16Array), Uint16BufferAttribute = typed(Uint16Array), Int32BufferAttribute = typed(Int32Array), Uint32BufferAttribute = typed(Uint32Array);
export const Float16BufferAttribute = typed(Uint16Array), Float32BufferAttribute = typed(Float32Array);

export class InstancedBufferAttribute extends BufferAttribute {
  constructor(array, itemSize, normalized, meshPerAttribute = 1) { super(array, itemSize, normalized); this.isInstancedBufferAttribute = true; this.meshPerAttribute = meshPerAttribute; }
}

export class InterleavedBuffer {
  constructor(array, stride) { this.isInterleavedBuffer = true; this.array = array; this.stride = stride; this.count = array.length / stride; this.usage = StaticDrawUsage; this.version = 0; this.updateRanges = []; }
  set needsUpdate(v) { if (v === true) this.version++; }
  setUsage(u) { this.usage = u; return this; }
}
export class InterleavedBufferAttribute {
  constructor(data, itemSize, offset, normalized = false) { this.isInterleavedBufferAttribute = true; this.data = data; this.itemSize = itemSize; this.offset = offset; this.normalized = normalized; this.name = ''; }
  get count() { return this.data.count; }
  get array() { return this.data.array; }
  set needsUpdate(v) { this.data.needsUpdate = v; }
  getComponent(i, c) { let v = this.data.array[i * this.data.stride + this.offset + c]; if (this.normalized) v = denormalizeValue(v, this.data.array); return v; }
  setComponent(i, c, v) { this.data.array[i * this.data.stride + this.offset + c] = this.normalized ? normalizeValue(v, this.data.array) : v; }
  getX(i) { return this.getComponent(i, 0); } getY(i) { return this.getComponent(i, 1); } getZ(i) { return this.getComponent(i, 2); } getW(i) { return this.getComponent(i, 3); }
  setX(i, v) { this.setComponent(i, 0, v); return this; } setY(i, v) { this.setComponent(i, 1, v); return this; } setZ(i, v) { this.setComponent(i, 2, v); return this; } setW(i, v) { this.setComponent(i, 3, v); return this; }
  setXY(i, x, y) { this.setX(i, x); this.setY(i, y); return this; }
  setXYZ(i, x, y, z) { this.setX(i, x); this.setY(i, y); this.setZ(i, z); return this; }
  setXYZW(i, x, y, z, w) { this.setXYZ(i, x, y, z); this.setW(i, w); return this; }
  applyMatrix4(m) { const v = new Vector3(); for (let i = 0; i < this.count; i++) { v.fromBufferAttribute(this, i).applyMatrix4(m); this.setXYZ(i, v.x, v.y, v.z); } return this; }
}

// ---------- geometry ----------
let nextId = 0;
export class BufferGeometry extends EventDispatcher {
  constructor() {
    super();
    this.isBufferGeometry = true; this.id = nextId++; this.uuid = MathUtils.generateUUID(); this.name = ''; this.type = 'BufferGeometry';
    this.index = null; this.indirect = null; this.attributes = {}; this.morphAttributes = {}; this.morphTargetsRelative = false;
    this.groups = []; this.boundingBox = null; this.boundingSphere = null; this.drawRange = { start: 0, count: Infinity }; this.userData = {};
    track(this, 'geometry');
  }
  getIndex() { return this.index; }
  setIndex(index) {
    if (Array.isArray(index)) this.index = new (index.some((v) => v >= 65535) ? Uint32BufferAttribute : Uint16BufferAttribute)(index, 1);
    else this.index = index;
    return this;
  }
  getAttribute(name) { return this.attributes[name]; }
  setAttribute(name, attr) { this.attributes[name] = attr; return this; }
  deleteAttribute(name) { delete this.attributes[name]; return this; }
  hasAttribute(name) { return this.attributes[name] !== undefined; }
  addGroup(start, count, materialIndex = 0) { this.groups.push({ start, count, materialIndex }); }
  clearGroups() { this.groups = []; }
  setDrawRange(start, count) { this.drawRange.start = start; this.drawRange.count = count; }
  applyMatrix4(m) {
    const pos = this.attributes.position; if (pos) { pos.applyMatrix4(m); pos.needsUpdate = true; }
    const normal = this.attributes.normal; if (normal) { normal.applyNormalMatrix(new Matrix3().getNormalMatrix(m)); normal.needsUpdate = true; }
    if (this.boundingBox !== null) this.computeBoundingBox();
    if (this.boundingSphere !== null) this.computeBoundingSphere();
    return this;
  }
  applyQuaternion(q) { return this.applyMatrix4(new Matrix4().makeRotationFromQuaternion(q)); }
  rotateX(a) { return this.applyMatrix4(new Matrix4().makeRotationX(a)); }
  rotateY(a) { return this.applyMatrix4(new Matrix4().makeRotationY(a)); }
  rotateZ(a) { return this.applyMatrix4(new Matrix4().makeRotationZ(a)); }
  translate(x, y, z) { return this.applyMatrix4(new Matrix4().makeTranslation(x, y, z)); }
  scale(x, y, z) { return this.applyMatrix4(new Matrix4().makeScale(x, y, z)); }
  lookAt() { return this; }
  center() { this.computeBoundingBox(); const c = this.boundingBox.getCenter(new Vector3()).negate(); return this.translate(c.x, c.y, c.z); }
  setFromPoints(points) {
    const a = []; for (const p of points) a.push(p.x, p.y, p.z ?? 0);
    this.setAttribute('position', new Float32BufferAttribute(a, 3));
    return this;
  }
  computeBoundingBox() {
    this.boundingBox ??= new Box3();
    const pos = this.attributes.position;
    if (pos) this.boundingBox.setFromBufferAttribute(pos); else this.boundingBox.makeEmpty();
    return this;
  }
  computeBoundingSphere() {
    this.boundingSphere ??= new Sphere();
    const pos = this.attributes.position;
    if (!pos) { this.boundingSphere.makeEmpty(); return this; }
    const box = new Box3().setFromBufferAttribute(pos), center = box.getCenter(this.boundingSphere.center), v = new Vector3();
    let m = 0; for (let i = 0; i < pos.count; i++) m = Math.max(m, center.distanceToSquared(v.fromBufferAttribute(pos, i)));
    this.boundingSphere.radius = Math.sqrt(m);
    return this;
  }
  computeTangents() { return this; }
  computeVertexNormals() {
    const index = this.index, pos = this.attributes.position;
    if (!pos) return this;
    let normal = this.attributes.normal;
    if (normal === undefined || normal.count !== pos.count) { normal = new BufferAttribute(new Float32Array(pos.count * 3), 3); this.setAttribute('normal', normal); }
    else normal.array.fill(0);
    const pA = new Vector3(), pB = new Vector3(), pC = new Vector3(), cb = new Vector3(), ab = new Vector3(), nA = new Vector3(), nB = new Vector3(), nC = new Vector3();
    const tris = index ? index.count : pos.count;
    for (let i = 0; i + 2 < tris; i += 3) {
      const a = index ? index.getX(i) : i, b = index ? index.getX(i + 1) : i + 1, c = index ? index.getX(i + 2) : i + 2;
      pA.fromBufferAttribute(pos, a); pB.fromBufferAttribute(pos, b); pC.fromBufferAttribute(pos, c);
      cb.subVectors(pC, pB); ab.subVectors(pA, pB); cb.cross(ab);
      if (index) {
        nA.fromBufferAttribute(normal, a); nB.fromBufferAttribute(normal, b); nC.fromBufferAttribute(normal, c);
        nA.add(cb); nB.add(cb); nC.add(cb);
        normal.setXYZ(a, nA.x, nA.y, nA.z); normal.setXYZ(b, nB.x, nB.y, nB.z); normal.setXYZ(c, nC.x, nC.y, nC.z);
      } else { normal.setXYZ(a, cb.x, cb.y, cb.z); normal.setXYZ(b, cb.x, cb.y, cb.z); normal.setXYZ(c, cb.x, cb.y, cb.z); }
    }
    this.normalizeNormals();
    normal.needsUpdate = true;
    return this;
  }
  normalizeNormals() { const n = this.attributes.normal, v = new Vector3(); for (let i = 0; i < n.count; i++) { v.fromBufferAttribute(n, i).normalize(); n.setXYZ(i, v.x, v.y, v.z); } }
  toNonIndexed() {
    if (this.index === null) return this;
    const g = new BufferGeometry(), idx = this.index.array;
    for (const [name, attr] of Object.entries(this.attributes)) {
      const out = new attr.array.constructor(idx.length * attr.itemSize);
      for (let i = 0; i < idx.length; i++) for (let k = 0; k < attr.itemSize; k++) out[i * attr.itemSize + k] = attr.array[idx[i] * attr.itemSize + k];
      g.setAttribute(name, new BufferAttribute(out, attr.itemSize, attr.normalized));
    }
    return g;
  }
  clone() { return new this.constructor().copy(this); }
  copy(src) {
    this.index = src.index ? src.index.clone() : null;
    this.attributes = {}; for (const [k, v] of Object.entries(src.attributes)) this.attributes[k] = v.clone();
    this.groups = src.groups.map((g) => ({ ...g }));
    this.boundingBox = src.boundingBox ? src.boundingBox.clone() : null;
    this.boundingSphere = src.boundingSphere ? src.boundingSphere.clone() : null;
    this.drawRange = { ...src.drawRange }; this.userData = { ...src.userData };
    if (src.parameters) this.parameters = { ...src.parameters };
    return this;
  }
  dispose() { disposeResource(this); }
}

export class InstancedBufferGeometry extends BufferGeometry {
  constructor() { super(); this.isInstancedBufferGeometry = true; this.type = 'InstancedBufferGeometry'; this.instanceCount = Infinity; }
  copy(src) { super.copy(src); this.instanceCount = src.instanceCount; return this; }
}

// Builds a convex primitive from triangles, then orients each triangle outward from the origin. Results are cached
// per type and parameters, so thousands of identical primitives stay cheap; each geometry gets its own copies.
const primitiveCache = new Map();
function convexGeometry(geometry, tris) {
  const key = geometry.type + JSON.stringify(geometry.parameters);
  let data = primitiveCache.get(key);
  if (!data) {
    const pos = [], nor = [], uv = [], ab = new Vector3(), ac = new Vector3(), n = new Vector3(), mid = new Vector3();
    for (let [a, b, c] of typeof tris === 'function' ? tris() : tris) {
      n.crossVectors(ab.subVectors(b, a), ac.subVectors(c, a));
      mid.copy(a).add(b).add(c).divideScalar(3);
      if (n.dot(mid) < 0) { [b, c] = [c, b]; n.negate(); }
      n.normalize();
      for (const p of [a, b, c]) { pos.push(p.x, p.y, p.z); nor.push(n.x, n.y, n.z); uv.push(0, 0); }
    }
    data = { pos: new Float32Array(pos), nor: new Float32Array(nor), uv: new Float32Array(uv) };
    primitiveCache.set(key, data);
  }
  geometry.setAttribute('position', new BufferAttribute(data.pos.slice(), 3));
  geometry.setAttribute('normal', new BufferAttribute(data.nor.slice(), 3));
  geometry.setAttribute('uv', new BufferAttribute(data.uv.slice(), 2));
  return geometry;
}
function frustumTris(rTop, rBottom, height, segments, openEnded) {
  const tris = [], top = height / 2, bottom = -height / 2;
  const at = (r, y, i) => new Vector3(r * Math.sin(i / segments * Math.PI * 2), y, r * Math.cos(i / segments * Math.PI * 2));
  for (let i = 0; i < segments; i++) {
    const t0 = at(rTop, top, i), t1 = at(rTop, top, i + 1), b0 = at(rBottom, bottom, i), b1 = at(rBottom, bottom, i + 1);
    if (rTop > 0) tris.push([t0, b0, t1]);
    if (rBottom > 0) tris.push([t1, b0, b1]);
    if (!openEnded) { if (rTop > 0) tris.push([new Vector3(0, top, 0), t0, t1]); if (rBottom > 0) tris.push([new Vector3(0, bottom, 0), b0, b1]); }
  }
  return tris;
}
function sphereTris(radius, ws, hs, sy = 1, stretch = 0) {
  const tris = [], p = (ix, iy) => { const u = ix / ws, v = iy / hs, y = Math.cos(v * Math.PI) * radius * sy; return new Vector3(-radius * Math.cos(u * Math.PI * 2) * Math.sin(v * Math.PI), y + Math.sign(y) * stretch, radius * Math.sin(u * Math.PI * 2) * Math.sin(v * Math.PI)); };
  for (let iy = 0; iy < hs; iy++) for (let ix = 0; ix < ws; ix++) {
    const a = p(ix, iy), b = p(ix + 1, iy), c = p(ix, iy + 1), d = p(ix + 1, iy + 1);
    if (iy !== 0) tris.push([a, c, b]);
    if (iy !== hs - 1) tris.push([b, c, d]);
  }
  return tris;
}

export class BoxGeometry extends BufferGeometry {
  constructor(width = 1, height = 1, depth = 1) {
    super(); this.type = 'BoxGeometry'; this.parameters = { width, height, depth };
    const v = (x, y, z) => new Vector3(x * width / 2, y * height / 2, z * depth / 2), tris = [];
    for (const axis of [0, 1, 2]) for (const s of [-1, 1]) {
      const c = (a, b) => { const p = [0, 0, 0]; p[axis] = s; p[(axis + 1) % 3] = a; p[(axis + 2) % 3] = b; return v(...p); };
      tris.push([c(-1, -1), c(1, -1), c(1, 1)], [c(-1, -1), c(1, 1), c(-1, 1)]);
    }
    convexGeometry(this, tris);
  }
}
export class CylinderGeometry extends BufferGeometry {
  constructor(radiusTop = 1, radiusBottom = 1, height = 1, radialSegments = 32, heightSegments = 1, openEnded = false, thetaStart = 0, thetaLength = Math.PI * 2) {
    super(); this.type = 'CylinderGeometry'; this.parameters = { radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength };
    convexGeometry(this, () => frustumTris(radiusTop, radiusBottom, height, Math.max(3, Math.floor(radialSegments)), openEnded));
  }
}
export class ConeGeometry extends CylinderGeometry {
  constructor(radius = 1, height = 1, radialSegments = 32, heightSegments = 1, openEnded = false, thetaStart, thetaLength) {
    super(0, radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
    this.type = 'ConeGeometry'; this.parameters = { radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength };
  }
}
export class SphereGeometry extends BufferGeometry {
  constructor(radius = 1, widthSegments = 32, heightSegments = 16) {
    super(); this.type = 'SphereGeometry'; this.parameters = { radius, widthSegments, heightSegments };
    convexGeometry(this, () => sphereTris(radius, Math.max(3, Math.floor(widthSegments)), Math.max(2, Math.floor(heightSegments))));
  }
}
export class CapsuleGeometry extends BufferGeometry {
  constructor(radius = 1, height = 1, capSegments = 4, radialSegments = 8, heightSegments = 1) {
    super(); this.type = 'CapsuleGeometry'; this.parameters = { radius, height, capSegments, radialSegments, heightSegments };
    convexGeometry(this, () => sphereTris(radius, Math.max(3, radialSegments), Math.max(2, capSegments * 2), 1, height / 2));
  }
}
const polyhedron = (name) => class extends BufferGeometry {
  constructor(radius = 1, detail = 0) { super(); this.type = name; this.parameters = { radius, detail }; convexGeometry(this, sphereTris(radius, 8, 6)); }
};
export const IcosahedronGeometry = polyhedron('IcosahedronGeometry'), OctahedronGeometry = polyhedron('OctahedronGeometry'), TetrahedronGeometry = polyhedron('TetrahedronGeometry'), DodecahedronGeometry = polyhedron('DodecahedronGeometry');
export class TorusGeometry extends BufferGeometry {
  constructor(radius = 1, tube = 0.4, radialSegments = 12, tubularSegments = 48) {
    super(); this.type = 'TorusGeometry'; this.parameters = { radius, tube, radialSegments, tubularSegments };
    convexGeometry(this, () => frustumTris(radius + tube, radius + tube, tube * 2, 24, false));
  }
}
export class PlaneGeometry extends BufferGeometry {
  constructor(width = 1, height = 1, widthSegments = 1, heightSegments = 1) {
    super(); this.type = 'PlaneGeometry'; this.parameters = { width, height, widthSegments, heightSegments };
    const gridX = Math.floor(widthSegments), gridY = Math.floor(heightSegments), gridX1 = gridX + 1, gridY1 = gridY + 1, segW = width / gridX, segH = height / gridY;
    const vertices = new Float32Array(gridX1 * gridY1 * 3), normals = new Float32Array(gridX1 * gridY1 * 3), uvs = new Float32Array(gridX1 * gridY1 * 2), indices = [];
    for (let iy = 0; iy < gridY1; iy++) for (let ix = 0; ix < gridX1; ix++) {
      const k = iy * gridX1 + ix;
      vertices[k * 3] = ix * segW - width / 2; vertices[k * 3 + 1] = -(iy * segH - height / 2); normals[k * 3 + 2] = 1;
      uvs[k * 2] = ix / gridX; uvs[k * 2 + 1] = 1 - iy / gridY;
    }
    for (let iy = 0; iy < gridY; iy++) for (let ix = 0; ix < gridX; ix++) {
      const a = ix + gridX1 * iy, b = ix + gridX1 * (iy + 1), c = ix + 1 + gridX1 * (iy + 1), d = ix + 1 + gridX1 * iy;
      indices.push(a, b, d, b, c, d);
    }
    this.setIndex(indices);
    this.setAttribute('position', new BufferAttribute(vertices, 3));
    this.setAttribute('normal', new BufferAttribute(normals, 3));
    this.setAttribute('uv', new BufferAttribute(uvs, 2));
  }
}
export class CircleGeometry extends BufferGeometry {
  constructor(radius = 1, segments = 32) {
    super(); this.type = 'CircleGeometry'; this.parameters = { radius, segments };
    const pos = [0, 0, 0], idx = [];
    for (let i = 0; i <= segments; i++) { const t = i / segments * Math.PI * 2; pos.push(radius * Math.cos(t), radius * Math.sin(t), 0); }
    for (let i = 1; i <= segments; i++) idx.push(i, i + 1, 0);
    this.setIndex(idx); this.setAttribute('position', new Float32BufferAttribute(pos, 3)); this.computeVertexNormals();
  }
}
export class RingGeometry extends CircleGeometry { constructor(inner = 0.5, outer = 1, segments = 32) { super(outer, segments); this.type = 'RingGeometry'; this.parameters = { innerRadius: inner, outerRadius: outer, thetaSegments: segments }; } }
export class EdgesGeometry extends BufferGeometry { constructor(geometry = null) { super(); this.type = 'EdgesGeometry'; if (geometry?.attributes.position) this.setAttribute('position', geometry.attributes.position.clone()); } }
export class WireframeGeometry extends EdgesGeometry { constructor(geometry) { super(geometry); this.type = 'WireframeGeometry'; } }

// ---------- materials ----------
let materialId = 0;
export class Material extends EventDispatcher {
  constructor() {
    super();
    this.isMaterial = true; this.id = materialId++; this.uuid = MathUtils.generateUUID(); this.name = ''; this.type = 'Material';
    this.blending = NormalBlending; this.side = FrontSide; this.vertexColors = false; this.opacity = 1; this.transparent = false; this.alphaTest = 0;
    this.depthTest = true; this.depthWrite = true; this.colorWrite = true; this.visible = true; this.toneMapped = true; this.fog = true; this.userData = {}; this.version = 0;
    this.polygonOffset = false; this.polygonOffsetFactor = 0; this.polygonOffsetUnits = 0; this.dithering = false; this.premultipliedAlpha = false;
    track(this, 'material');
  }
  onBeforeCompile() {}
  customProgramCacheKey() { return this.onBeforeCompile.toString(); }
  setValues(values) {
    if (values === undefined) return;
    for (const key in values) {
      const value = values[key];
      if (value === undefined) continue;
      const current = this[key];
      if (current && current.isColor) current.set(value);
      else if (current && current.isVector3 && value && value.isVector3) current.copy(value);
      else this[key] = value;
    }
  }
  set needsUpdate(v) { if (v === true) this.version++; }
  clone() { return new this.constructor().copy(this); }
  copy(src) {
    for (const [k, v] of Object.entries(src)) {
      if (k === 'id' || k === 'uuid' || k.startsWith('_') || k.startsWith('__')) continue;
      this[k] = v && (v.isColor || v.isVector2 || v.isVector3) ? v.clone() : v;
    }
    return this;
  }
  dispose() { disposeResource(this); }
}
const surface = (type, extra = {}) => class extends Material {
  constructor(parameters) {
    super(); this.type = type; this['is' + type] = true;
    this.color = new Color(0xffffff); this.map = null; this.alphaMap = null; this.envMap = null; this.wireframe = false; this.wireframeLinewidth = 1;
    for (const [k, v] of Object.entries(extra)) this[k] = typeof v === 'function' ? v() : v;
    this.setValues(parameters);
  }
};
const lit = { emissive: () => new Color(0x000000), emissiveIntensity: 1, emissiveMap: null, normalMap: null, aoMap: null, aoMapIntensity: 1, lightMap: null, bumpMap: null, displacementMap: null, flatShading: false };
export const MeshBasicMaterial = surface('MeshBasicMaterial', { aoMap: null, lightMap: null, specularMap: null, reflectivity: 1, refractionRatio: 0.98 });
export const MeshLambertMaterial = surface('MeshLambertMaterial', lit);
export const MeshPhongMaterial = surface('MeshPhongMaterial', { ...lit, specular: () => new Color(0x111111), shininess: 30 });
export const MeshStandardMaterial = surface('MeshStandardMaterial', { ...lit, roughness: 1, metalness: 0, roughnessMap: null, metalnessMap: null, envMapIntensity: 1 });
export const MeshPhysicalMaterial = surface('MeshPhysicalMaterial', { ...lit, roughness: 1, metalness: 0, clearcoat: 0, transmission: 0, ior: 1.5, sheen: 0, envMapIntensity: 1, isMeshStandardMaterial: true });
export const MeshToonMaterial = surface('MeshToonMaterial', { ...lit, gradientMap: null });
export const MeshMatcapMaterial = surface('MeshMatcapMaterial', { matcap: null, flatShading: false });
export const MeshNormalMaterial = surface('MeshNormalMaterial', { flatShading: false });
export const MeshDepthMaterial = surface('MeshDepthMaterial');
export const MeshDistanceMaterial = surface('MeshDistanceMaterial');
export const LineBasicMaterial = surface('LineBasicMaterial', { linewidth: 1 });
export const LineDashedMaterial = surface('LineDashedMaterial', { linewidth: 1, dashSize: 3, gapSize: 1, scale: 1 });
export const PointsMaterial = surface('PointsMaterial', { size: 1, sizeAttenuation: true });
export const SpriteMaterial = surface('SpriteMaterial', { rotation: 0, sizeAttenuation: true });
export const ShadowMaterial = surface('ShadowMaterial');
export const ShaderMaterial = surface('ShaderMaterial', { uniforms: () => ({}), vertexShader: '', fragmentShader: '', defines: () => ({}) });
export const RawShaderMaterial = surface('RawShaderMaterial', { uniforms: () => ({}), vertexShader: '', fragmentShader: '', defines: () => ({}) });

// ---------- textures ----------
let textureId = 0;
export class Source { constructor(data = null) { this.data = data; this.version = 0; } set needsUpdate(v) { if (v === true) this.version++; } }
export class Texture extends EventDispatcher {
  constructor(image = null, mapping = UVMapping, wrapS = ClampToEdgeWrapping, wrapT = ClampToEdgeWrapping, magFilter = LinearFilter, minFilter = LinearMipmapLinearFilter, format = RGBAFormat, type = UnsignedByteType, anisotropy = 1, colorSpace = NoColorSpace) {
    super();
    this.isTexture = true; this.id = textureId++; this.uuid = MathUtils.generateUUID(); this.name = ''; this.source = new Source(image);
    this.mapping = mapping; this.channel = 0; this.wrapS = wrapS; this.wrapT = wrapT; this.magFilter = magFilter; this.minFilter = minFilter; this.anisotropy = anisotropy;
    this.format = format; this.type = type; this.offset = new Vector2(0, 0); this.repeat = new Vector2(1, 1); this.center = new Vector2(0, 0); this.rotation = 0;
    this.generateMipmaps = true; this.premultiplyAlpha = false; this.flipY = true; this.unpackAlignment = 4; this.colorSpace = colorSpace; this.userData = {}; this.version = 0;
    track(this, 'texture');
  }
  get image() { return this.source.data; } set image(v) { this.source.data = v; }
  set needsUpdate(v) { if (v === true) { this.version++; this.source.needsUpdate = true; } }
  clone() { const t = new this.constructor(); t.source = this.source; for (const k of ['wrapS', 'wrapT', 'magFilter', 'minFilter', 'format', 'type', 'colorSpace', 'flipY', 'generateMipmaps']) t[k] = this[k]; return t; }
  dispose() { disposeResource(this); }
}
export class DataTexture extends Texture {
  constructor(data = null, width = 1, height = 1, format, type, mapping, wrapS, wrapT, magFilter = NearestFilter, minFilter = NearestFilter, anisotropy, colorSpace) {
    super(null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace);
    this.isDataTexture = true; this.image = { data, width, height }; this.generateMipmaps = false; this.flipY = false; this.unpackAlignment = 1;
  }
}
export class CanvasTexture extends Texture { constructor(canvas, ...rest) { super(canvas, ...rest); this.isCanvasTexture = true; this.needsUpdate = true; } }

// ---------- scene graph ----------
let objectId = 0;
export class Layers {
  constructor() { this.mask = 1; }
  set(c) { this.mask = (1 << c) >>> 0; } enable(c) { this.mask |= 1 << c; } enableAll() { this.mask = 0xffffffff; } disable(c) { this.mask &= ~(1 << c); }
  toggle(c) { this.mask ^= 1 << c; } test(l) { return (this.mask & l.mask) !== 0; } isEnabled(c) { return (this.mask & (1 << c)) !== 0; }
}

export class Object3D extends EventDispatcher {
  constructor() {
    super();
    this.isObject3D = true; this.id = objectId++; this.uuid = MathUtils.generateUUID(); this.name = ''; this.type = 'Object3D';
    this.parent = null; this.children = []; this.up = new Vector3(0, 1, 0);
    const position = new Vector3(), rotation = new Euler(), quaternion = new Quaternion(), scale = new Vector3(1, 1, 1);
    rotation._onChangeCallback(() => quaternion.setFromEuler(rotation, false));
    quaternion._onChangeCallback(() => rotation.setFromQuaternion(quaternion, undefined, false));
    this.position = position; this.rotation = rotation; this.quaternion = quaternion; this.scale = scale;
    this.matrix = new Matrix4(); this.matrixWorld = new Matrix4(); this.matrixAutoUpdate = true; this.matrixWorldAutoUpdate = true; this.matrixWorldNeedsUpdate = false;
    this.layers = new Layers(); this.visible = true; this.castShadow = false; this.receiveShadow = false; this.frustumCulled = true; this.renderOrder = 0; this.userData = {};
    this.pivot = null;
  }
  applyMatrix4(m) { if (this.matrixAutoUpdate) this.updateMatrix(); this.matrix.premultiply(m); this.matrix.decompose(this.position, this.quaternion, this.scale); }
  applyQuaternion(q) { this.quaternion.premultiply(q); return this; }
  setRotationFromAxisAngle(axis, angle) { this.quaternion.setFromAxisAngle(axis, angle); }
  setRotationFromEuler(e) { this.quaternion.setFromEuler(e, true); }
  rotateOnAxis(axis, angle) { this.quaternion.multiply(new Quaternion().setFromAxisAngle(axis, angle)); return this; }
  rotateX(a) { return this.rotateOnAxis(new Vector3(1, 0, 0), a); }
  rotateY(a) { return this.rotateOnAxis(new Vector3(0, 1, 0), a); }
  rotateZ(a) { return this.rotateOnAxis(new Vector3(0, 0, 1), a); }
  translateOnAxis(axis, d) { this.position.add(axis.clone().applyQuaternion(this.quaternion).multiplyScalar(d)); return this; }
  translateX(d) { return this.translateOnAxis(new Vector3(1, 0, 0), d); }
  translateY(d) { return this.translateOnAxis(new Vector3(0, 1, 0), d); }
  translateZ(d) { return this.translateOnAxis(new Vector3(0, 0, 1), d); }
  localToWorld(v) { this.updateWorldMatrix(true, false); return v.applyMatrix4(this.matrixWorld); }
  worldToLocal(v) { this.updateWorldMatrix(true, false); return v.applyMatrix4(this.matrixWorld.clone().invert()); }
  lookAt(x, y, z) {
    const target = x.isVector3 ? x.clone() : new Vector3(x, y, z);
    this.updateWorldMatrix(true, false);
    const pos = new Vector3().setFromMatrixPosition(this.matrixWorld), m = new Matrix4();
    if (this.isCamera || this.isLight) m.lookAt(pos, target, this.up); else m.lookAt(target, pos, this.up);
    this.quaternion.setFromRotationMatrix(m);
  }
  add(...objects) {
    for (const object of objects) {
      if (object === this || !object || !object.isObject3D) continue;
      object.removeFromParent();
      object.parent = this; this.children.push(object);
      object.dispatchEvent({ type: 'added' });
    }
    return this;
  }
  remove(...objects) {
    for (const object of objects) {
      const i = this.children.indexOf(object);
      if (i !== -1) { object.parent = null; this.children.splice(i, 1); object.dispatchEvent({ type: 'removed' }); }
    }
    return this;
  }
  removeFromParent() { this.parent?.remove(this); return this; }
  clear() { return this.remove(...this.children); }
  attach(object) { return this.add(object); }
  getObjectById(id) { return this.getObjectByProperty('id', id); }
  getObjectByName(name) { return this.getObjectByProperty('name', name); }
  getObjectByProperty(k, v) { if (this[k] === v) return this; for (const c of this.children) { const o = c.getObjectByProperty(k, v); if (o) return o; } return undefined; }
  getObjectsByProperty(k, v, result = []) { if (this[k] === v) result.push(this); for (const c of this.children) c.getObjectsByProperty(k, v, result); return result; }
  getWorldPosition(t = new Vector3()) { this.updateWorldMatrix(true, false); return t.setFromMatrixPosition(this.matrixWorld); }
  getWorldQuaternion(t = new Quaternion()) { this.updateWorldMatrix(true, false); this.matrixWorld.decompose(new Vector3(), t, new Vector3()); return t; }
  getWorldScale(t = new Vector3()) { this.updateWorldMatrix(true, false); this.matrixWorld.decompose(new Vector3(), new Quaternion(), t); return t; }
  getWorldDirection(t = new Vector3()) { this.updateWorldMatrix(true, false); const e = this.matrixWorld.elements; return t.set(e[8], e[9], e[10]).normalize(); }
  raycast() {}
  traverse(cb) { cb(this); for (const c of this.children.slice()) c.traverse(cb); }
  traverseVisible(cb) { if (!this.visible) return; cb(this); for (const c of this.children.slice()) c.traverseVisible(cb); }
  traverseAncestors(cb) { if (this.parent) { cb(this.parent); this.parent.traverseAncestors(cb); } }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    if (this.pivot) { const p = this.pivot, e = this.matrix.elements; e[12] += p.x - e[0] * p.x - e[4] * p.y - e[8] * p.z; e[13] += p.y - e[1] * p.x - e[5] * p.y - e[9] * p.z; e[14] += p.z - e[2] * p.x - e[6] * p.y - e[10] * p.z; }
    this.matrixWorldNeedsUpdate = true;
  }
  updateMatrixWorld(force) {
    if (this.matrixAutoUpdate) this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || force) {
      if (this.matrixWorldAutoUpdate) { if (this.parent === null) this.matrixWorld.copy(this.matrix); else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix); }
      this.matrixWorldNeedsUpdate = false; force = true;
    }
    for (const c of this.children) c.updateMatrixWorld(force);
  }
  updateWorldMatrix(updateParents, updateChildren) {
    if (updateParents === true && this.parent !== null) this.parent.updateWorldMatrix(true, false);
    if (this.matrixAutoUpdate) this.updateMatrix();
    if (this.matrixWorldAutoUpdate) { if (this.parent === null) this.matrixWorld.copy(this.matrix); else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix); }
    if (updateChildren === true) for (const c of this.children) c.updateWorldMatrix(false, true);
  }
  clone(recursive) { return new this.constructor().copy(this, recursive); }
  copy(src, recursive = true) {
    this.name = src.name; this.position.copy(src.position); this.quaternion.copy(src.quaternion); this.scale.copy(src.scale); this.matrix.copy(src.matrix);
    this.visible = src.visible; this.frustumCulled = src.frustumCulled; this.renderOrder = src.renderOrder; this.userData = JSON.parse(JSON.stringify(src.userData));
    if (recursive) for (const c of src.children) this.add(c.clone());
    return this;
  }
  dispose() { this.dispatchEvent({ type: 'dispose' }); }
}

export class Group extends Object3D { constructor() { super(); this.isGroup = true; this.type = 'Group'; } }
export class Scene extends Object3D { constructor() { super(); this.isScene = true; this.type = 'Scene'; this.background = null; this.environment = null; this.fog = null; this.overrideMaterial = null; } }
export class Fog { constructor(color, near = 1, far = 1000) { this.isFog = true; this.color = new Color(color); this.near = near; this.far = far; } }
export class FogExp2 { constructor(color, density = 0.00025) { this.isFogExp2 = true; this.color = new Color(color); this.density = density; } }

function raycastTriangles(object, raycaster, intersects, matrixWorld) {
  const geometry = object.geometry, material = object.material;
  if (material === undefined || !geometry.attributes.position) return;
  if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
  const sphere = geometry.boundingSphere.clone().applyMatrix4(matrixWorld);
  if (!raycaster.ray.intersectsSphere(sphere)) return;
  const inverse = matrixWorld.clone().invert(), ray = raycaster.ray.clone().applyMatrix4(inverse);
  if (geometry.boundingBox !== null && !ray.intersectsBox(geometry.boundingBox)) return;
  const pos = geometry.attributes.position, index = geometry.index, a = new Vector3(), b = new Vector3(), c = new Vector3(), hit = new Vector3();
  const side = Array.isArray(material) ? FrontSide : material.side;
  const n = index ? index.count : pos.count;
  const start = Math.max(0, geometry.drawRange.start), end = Math.min(n, geometry.drawRange.start + geometry.drawRange.count);
  for (let i = start; i + 2 < end; i += 3) {
    const ia = index ? index.getX(i) : i, ib = index ? index.getX(i + 1) : i + 1, ic = index ? index.getX(i + 2) : i + 2;
    a.fromBufferAttribute(pos, ia); b.fromBufferAttribute(pos, ib); c.fromBufferAttribute(pos, ic);
    const p = side === BackSide ? ray.intersectTriangle(c, b, a, true, hit) : ray.intersectTriangle(a, b, c, side === FrontSide, hit);
    if (p === null) continue;
    const world = p.clone().applyMatrix4(matrixWorld), distance = raycaster.ray.origin.distanceTo(world);
    if (distance < raycaster.near || distance > raycaster.far) continue;
    intersects.push({ distance, point: world, object, face: { a: ia, b: ib, c: ic, normal: new Vector3(), materialIndex: 0 }, faceIndex: Math.floor(i / 3) });
  }
}

export class Mesh extends Object3D {
  constructor(geometry = new BufferGeometry(), material = new MeshBasicMaterial()) {
    super(); this.isMesh = true; this.type = 'Mesh'; this.geometry = geometry; this.material = material; this.morphTargetInfluences = undefined; this.morphTargetDictionary = undefined;
  }
  updateMorphTargets() {}
  copy(src, recursive) { super.copy(src, recursive); this.geometry = src.geometry; this.material = Array.isArray(src.material) ? src.material.slice() : src.material; return this; }
  raycast(raycaster, intersects) { raycastTriangles(this, raycaster, intersects, this.matrixWorld); }
}

export class InstancedMesh extends Mesh {
  constructor(geometry, material, count) {
    super(geometry, material);
    this.isInstancedMesh = true; this.type = 'InstancedMesh';
    this.instanceMatrix = new InstancedBufferAttribute(new Float32Array(count * 16), 16);
    this.instanceColor = null; this.morphTexture = null; this.count = count; this.boundingBox = null; this.boundingSphere = null;
    const identity = new Matrix4();
    for (let i = 0; i < count; i++) this.setMatrixAt(i, identity);
  }
  computeBoundingBox() {
    if (this.boundingBox === null) this.boundingBox = new Box3();
    if (this.geometry.boundingBox === null) this.geometry.computeBoundingBox();
    this.boundingBox.makeEmpty();
    const m = new Matrix4();
    for (let i = 0; i < this.count; i++) { this.getMatrixAt(i, m); this.boundingBox.union(this.geometry.boundingBox.clone().applyMatrix4(m)); }
  }
  computeBoundingSphere() {
    if (this.boundingSphere === null) this.boundingSphere = new Sphere();
    if (this.geometry.boundingSphere === null) this.geometry.computeBoundingSphere();
    this.boundingSphere.makeEmpty();
    const m = new Matrix4();
    for (let i = 0; i < this.count; i++) { this.getMatrixAt(i, m); this.boundingSphere.union(this.geometry.boundingSphere.clone().applyMatrix4(m)); }
  }
  copy(src, recursive) {
    super.copy(src, recursive);
    this.instanceMatrix.copy(src.instanceMatrix);
    if (src.instanceColor !== null) this.instanceColor = src.instanceColor.clone();
    this.count = src.count;
    if (src.boundingBox !== null) this.boundingBox = src.boundingBox.clone();
    if (src.boundingSphere !== null) this.boundingSphere = src.boundingSphere.clone();
    return this;
  }
  getColorAt(index, color) { return color.fromArray(this.instanceColor.array, index * 3); }
  getMatrixAt(index, matrix) { return matrix.fromArray(this.instanceMatrix.array, index * 16); }
  getMorphAt() {}
  setColorAt(index, color) {
    if (this.instanceColor === null) this.instanceColor = new InstancedBufferAttribute(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3);
    color.toArray(this.instanceColor.array, index * 3);
    return this;
  }
  setMatrixAt(index, matrix) { matrix.toArray(this.instanceMatrix.array, index * 16); return this; }
  setMorphAt() { return this; }
  updateMorphTargets() {}
  raycast(raycaster, intersects) {
    const matrixWorld = this.matrixWorld;
    if (this.material === undefined) return;
    if (this.boundingSphere === null) this.computeBoundingSphere();
    const sphere = this.boundingSphere.clone().applyMatrix4(matrixWorld);
    if (raycaster.ray.intersectsSphere(sphere) === false) return;
    const local = new Matrix4(), world = new Matrix4();
    for (let id = 0; id < this.count; id++) {
      this.getMatrixAt(id, local);
      world.multiplyMatrices(matrixWorld, local);
      const found = [];
      raycastTriangles(this, raycaster, found, world);
      for (const hit of found) { hit.instanceId = id; hit.object = this; intersects.push(hit); }
    }
  }
  dispose() { this.dispatchEvent({ type: 'dispose' }); if (this.morphTexture !== null) { this.morphTexture.dispose(); this.morphTexture = null; } }
}

export class BatchedMesh extends Mesh {
  constructor(maxInstanceCount, maxVertexCount, maxIndexCount, material) { super(new BufferGeometry(), material); this.isBatchedMesh = true; this.type = 'BatchedMesh'; this.maxInstanceCount = maxInstanceCount; }
}
export class Points extends Mesh { constructor(g, m = new PointsMaterial()) { super(g, m); this.isMesh = false; this.isPoints = true; this.type = 'Points'; } raycast() {} }
export class Line extends Mesh { constructor(g, m = new LineBasicMaterial()) { super(g, m); this.isMesh = false; this.isLine = true; this.type = 'Line'; } raycast() {} computeLineDistances() { return this; } }
export class LineSegments extends Line { constructor(g, m) { super(g, m); this.isLineSegments = true; this.type = 'LineSegments'; } }
export class LineLoop extends Line { constructor(g, m) { super(g, m); this.isLineLoop = true; this.type = 'LineLoop'; } }
export class Sprite extends Mesh { constructor(m = new SpriteMaterial()) { super(new PlaneGeometry(1, 1), m); this.isMesh = false; this.isSprite = true; this.type = 'Sprite'; this.center = new Vector2(0.5, 0.5); this.count = 1; } raycast() {} }
export class LOD extends Object3D { constructor() { super(); this.isLOD = true; this.levels = []; } addLevel(object, distance = 0) { this.levels.push({ object, distance }); this.add(object); return this; } }

// ---------- cameras and lights ----------
export class Camera extends Object3D {
  constructor() { super(); this.isCamera = true; this.type = 'Camera'; this.matrixWorldInverse = new Matrix4(); this.projectionMatrix = new Matrix4(); this.projectionMatrixInverse = new Matrix4(); }
  updateMatrixWorld(force) { super.updateMatrixWorld(force); this.matrixWorldInverse.copy(this.matrixWorld).invert(); }
  updateWorldMatrix(p, c) { super.updateWorldMatrix(p, c); this.matrixWorldInverse.copy(this.matrixWorld).invert(); }
}
export class PerspectiveCamera extends Camera {
  constructor(fov = 50, aspect = 1, near = 0.1, far = 2000) { super(); this.isPerspectiveCamera = true; this.type = 'PerspectiveCamera'; this.fov = fov; this.aspect = aspect; this.near = near; this.far = far; this.zoom = 1; this.updateProjectionMatrix(); }
  updateProjectionMatrix() {
    const top = this.near * Math.tan(MathUtils.DEG2RAD * 0.5 * this.fov) / this.zoom, height = 2 * top, width = this.aspect * height;
    this.projectionMatrix.makePerspective(-0.5 * width, 0.5 * width, top, top - height, this.near, this.far);
    this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
}
export class OrthographicCamera extends Camera {
  constructor(left = -1, right = 1, top = 1, bottom = -1, near = 0.1, far = 2000) { super(); this.isOrthographicCamera = true; this.type = 'OrthographicCamera'; Object.assign(this, { left, right, top, bottom, near, far, zoom: 1 }); this.updateProjectionMatrix(); }
  updateProjectionMatrix() { this.projectionMatrix.makeOrthographic(this.left / this.zoom, this.right / this.zoom, this.top / this.zoom, this.bottom / this.zoom, this.near, this.far); this.projectionMatrixInverse.copy(this.projectionMatrix).invert(); }
}
const light = (type, extra = {}) => class extends Object3D {
  constructor(color, intensity = 1, ...rest) {
    super(); this.isLight = true; this['is' + type] = true; this.type = type; this.color = new Color(color); this.intensity = intensity;
    if (extra.target) { this.target = new Object3D(); this.position.set(0, 1, 0); }
    if (extra.ground) this.groundColor = new Color(rest[0]);
    this.shadow = { mapSize: new Vector2(512, 512), camera: new OrthographicCamera(), bias: 0, normalBias: 0, radius: 1 };
  }
  dispose() {}
};
export const AmbientLight = light('AmbientLight'), DirectionalLight = light('DirectionalLight', { target: true }), PointLight = light('PointLight');
export const SpotLight = light('SpotLight', { target: true }), HemisphereLight = light('HemisphereLight', { ground: true }), RectAreaLight = light('RectAreaLight');

// ---------- raycaster ----------
function intersect(object, raycaster, intersects, recursive) {
  let propagate = true;
  if (object.layers.test(raycaster.layers)) { const r = object.raycast(raycaster, intersects); if (r === false) propagate = false; }
  if (propagate === true && recursive === true) for (const c of object.children) intersect(c, raycaster, intersects, true);
}
export class Raycaster {
  constructor(origin, direction, near = 0, far = Infinity) {
    this.ray = new Ray(origin ? origin.clone() : undefined, direction ? direction.clone() : undefined); this.near = near; this.far = far; this.camera = null; this.layers = new Layers();
    this.params = { Mesh: {}, Line: { threshold: 1 }, LOD: {}, Points: { threshold: 1 }, Sprite: {} };
  }
  set(origin, direction) { this.ray.set(origin, direction); }
  setFromCamera(coords, camera) {
    if (camera.isPerspectiveCamera) { this.ray.origin.setFromMatrixPosition(camera.matrixWorld); this.ray.direction.set(coords.x, coords.y, 0.5).unproject(camera).sub(this.ray.origin).normalize(); }
    else { this.ray.origin.set(coords.x, coords.y, (camera.near + camera.far) / (camera.near - camera.far)).unproject(camera); this.ray.direction.set(0, 0, -1).transformDirection(camera.matrixWorld); }
    this.camera = camera;
  }
  intersectObject(object, recursive = true, intersects = []) { intersect(object, this, intersects, recursive); intersects.sort((a, b) => a.distance - b.distance); return intersects; }
  intersectObjects(objects, recursive = true, intersects = []) { for (const o of objects) intersect(o, this, intersects, recursive); intersects.sort((a, b) => a.distance - b.distance); return intersects; }
}

// ---------- misc ----------
export class Clock {
  constructor(autoStart = true) { this.autoStart = autoStart; this.startTime = 0; this.oldTime = 0; this.elapsedTime = 0; this.running = false; }
  start() { this.startTime = performance.now(); this.oldTime = this.startTime; this.elapsedTime = 0; this.running = true; }
  stop() { this.getElapsedTime(); this.running = false; }
  getElapsedTime() { this.getDelta(); return this.elapsedTime; }
  getDelta() { let d = 0; if (this.autoStart && !this.running) { this.start(); return 0; } if (this.running) { const n = performance.now(); d = (n - this.oldTime) / 1000; this.oldTime = n; this.elapsedTime += d; } return d; }
}
export class Timer extends Clock { update() { this.getDelta(); return this; } }
export class WebGLRenderer {
  constructor() { this.domElement = {}; this.info = { render: { calls: 0, triangles: 0 }, memory: { geometries: 0, textures: 0 } }; this.shadowMap = { enabled: false, type: PCFShadowMap }; this.outputColorSpace = SRGBColorSpace; this.toneMapping = NoToneMapping; }
  setSize() {} setPixelRatio() {} getPixelRatio() { return 1; } setClearColor() {} setAnimationLoop() {} render() {} dispose() {} compile() {} getContext() { return {}; }
}
