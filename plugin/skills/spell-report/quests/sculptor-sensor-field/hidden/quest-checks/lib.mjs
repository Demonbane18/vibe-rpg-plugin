// Grader helpers: installs the three.js stand-in, loads src/field.mjs, builds survey data and imitates what
// WebGLRenderer uploads and draws, so checks read what would reach the GPU rather than what the code meant.
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
let THREE;

export async function load() {
  const dir = join(process.cwd(), 'node_modules', 'three');
  mkdirSync(join(dir, 'build'), { recursive: true });
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 'three', version: '0.186.0', type: 'module', main: './build/three.module.js', module: './build/three.module.js', exports: { '.': './build/three.module.js', './package.json': './package.json' } }));
  copyFileSync(join(here, 'three.mjs'), join(dir, 'build', 'three.module.js'));
  THREE = await import(pathToFileURL(join(dir, 'build', 'three.module.js')).href);
  const field = await import(pathToFileURL(join(process.cwd(), 'src', 'field.mjs')).href);
  if (typeof field.createSensorField !== 'function') throw new Error('src/field.mjs does not export createSensorField');
  return { THREE, createSensorField: field.createSensorField };
}

// ---------- data ----------
export const height = (x, z) => 18 * Math.sin(x / 37) * Math.cos(z / 53) + 6 * Math.sin(x / 11 + z / 17);
export const STATUS = { ok: 0x3fb950, warn: 0xd29922, alarm: 0xf85149, offline: 0x8b949e };
const STATUSES = ['ok', 'ok', 'warn', 'ok', 'alarm', 'ok', 'offline', 'ok', 'warn', 'ok', 'ok'];

export function terrain(cols = 300, rows = 280, spacing = 2) {
  const heights = new Float32Array(rows * cols), landUse = new Uint8Array(rows * cols * 3);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const i = r * cols + c;
    heights[i] = height(c * spacing, r * spacing);
    landUse[i * 3] = (c * 7 + r * 3) % 256; landUse[i * 3 + 1] = 90 + ((r * 5) % 140); landUse[i * 3 + 2] = (c * r) % 200 + 20;
  }
  return { cols, rows, spacing, heights, landUse };
}

export function sensors(prefix, count, perRow, dx, dz, x0, z0) {
  const list = [];
  for (let i = 0; i < count; i++) {
    const x = x0 + (i % perRow) * dx, z = z0 + Math.floor(i / perRow) * dz;
    list.push({ id: `${prefix}-${1000 + i}`, x, y: Math.round(height(x, z) * 100) / 100, z, status: STATUSES[(i * 7919) % STATUSES.length] });
  }
  return list;
}

// ---------- scene ----------
/** A scene holding the app's own objects, which the field must leave alone. */
export function appScene() {
  const scene = new THREE.Scene();
  const sun = new THREE.DirectionalLight(0xffffff, 2); sun.position.set(100, 200, 50);
  const sky = new THREE.HemisphereLight(0xbcd7ff, 0x3b2f1e, 0.6);
  const compass = new THREE.Group(); compass.name = 'compass'; compass.position.set(-20, 30, -20);
  const needle = new THREE.Mesh(new THREE.ConeGeometry(1, 4, 8), new THREE.MeshBasicMaterial({ color: 0xff3333 }));
  compass.add(needle);
  scene.add(sun, sun.target, sky, compass);
  const owned = new Set([needle.geometry, needle.material]);
  const objects = new Set(); scene.traverse((o) => objects.add(o));
  return { scene, owned, objects, children: scene.children.slice() };
}

const gpu = new WeakMap();
export const seen = new Set();

function upload(attr) {
  if (!attr) return;
  const store = attr.isInterleavedBufferAttribute ? attr.data : attr;
  const prev = gpu.get(store);
  if (!prev || prev.version !== store.version) gpu.set(store, { version: store.version, array: store.array.slice() });
}
/** The attribute as it was last uploaded, read the way the shader reads it. */
export function uploaded(attr) {
  const store = attr.isInterleavedBufferAttribute ? attr.data : attr;
  const copy = gpu.get(store);
  if (!copy) throw new Error('attribute was never drawn');
  const stride = attr.isInterleavedBufferAttribute ? store.stride : attr.itemSize, offset = attr.isInterleavedBufferAttribute ? attr.offset : 0;
  const integer = !(copy.array instanceof Float32Array || copy.array instanceof Float64Array);
  const read = (i, k) => { const v = copy.array[i * stride + offset + k]; return integer && attr.normalized ? THREE_denormalize(v, copy.array) : v; };
  return { count: attr.count, itemSize: attr.itemSize, read, array: copy.array };
}
function THREE_denormalize(v, a) {
  if (a instanceof Uint8Array || a instanceof Uint8ClampedArray) return v / 255;
  if (a instanceof Uint16Array) return v / 65535;
  if (a instanceof Uint32Array) return v / 4294967295;
  if (a instanceof Int8Array) return Math.max(v / 127, -1);
  if (a instanceof Int16Array) return Math.max(v / 32767, -1);
  return v;
}

let generation = 0;
/** Imitates one WebGLRenderer.render call: matrices, frustum-culling bounds, uploads and draw calls. */
export function render(app) {
  const { scene } = app;
  generation++;
  scene.updateMatrixWorld();
  const draws = [];
  const visit = (object) => {
    if (!object.visible) return;
    if ((object.isMesh || object.isPoints || object.isLine || object.isSprite) && object.geometry && object.material) {
      const materials = [object.material].flat();
      if (object.frustumCulled) {
        if (object.isInstancedMesh) { if (object.boundingSphere === null) object.computeBoundingSphere(); }
        else if (object.geometry.boundingSphere === null) object.geometry.computeBoundingSphere();
      }
      const geometry = object.geometry;
      seen.add(geometry);
      for (const attr of Object.values(geometry.attributes)) upload(attr);
      if (geometry.index) upload(geometry.index);
      for (const material of materials) {
        seen.add(material);
        for (const value of Object.values(material)) if (value && value.isTexture) seen.add(value);
      }
      if (object.isInstancedMesh) { upload(object.instanceMatrix); if (object.instanceColor) upload(object.instanceColor); }
      const instances = object.isInstancedMesh ? object.count : 1;
      if (instances > 0 && materials.some((m) => m.visible !== false)) {
        const calls = Array.isArray(object.material) && geometry.groups.length ? geometry.groups.length : 1;
        if (!app.objects.has(object)) draws.push(...Array(calls).fill(object));
      }
    }
    for (const child of object.children) visit(child);
  };
  visit(scene);
  return draws;
}

// ---------- reading what is drawn ----------
const near = (a, b, tol) => Math.abs(a - b) <= tol;

/** Every drawn pin instance: world-space bounds, base point, colour as shaded, and where it came from. */
// GPU state only changes on render, so the drawn pins are read once per render.
let cached = { generation: -1, app: null, pins: null };
export function drawnPins(app) {
  if (cached.generation === generation && cached.app === app) return cached.pins;
  const pins = [];
  app.scene.traverseVisible((object) => {
    if (!object.isInstancedMesh || app.objects.has(object) || object.count <= 0) return;
    const geometry = object.geometry;
    geometry.computeBoundingBox();
    const gc = geometry.boundingBox.getCenter(new THREE.Vector3()), gh = geometry.boundingBox.getSize(new THREE.Vector3()).multiplyScalar(0.5);
    const matrices = uploaded(object.instanceMatrix), colors = object.instanceColor ? uploaded(object.instanceColor) : null;
    const material = [object.material].flat()[0];
    const base = material.color ? material.color : new THREE.Color(1, 1, 1);
    const blank = unshaded.some((flag) => material[flag]) || (material.vertexColors && !geometry.attributes.color);
    const local = new THREE.Matrix4(), world = new THREE.Matrix4(), e = world.elements;
    for (let i = 0; i < object.count; i++) {
      for (let k = 0; k < 16; k++) local.elements[k] = matrices.read(i, k);
      world.multiplyMatrices(object.matrixWorld, local);
      // Axis-aligned bounds of the transformed geometry box.
      const centre = gc.clone().applyMatrix4(world);
      const half = new THREE.Vector3(
        Math.abs(e[0]) * gh.x + Math.abs(e[4]) * gh.y + Math.abs(e[8]) * gh.z,
        Math.abs(e[1]) * gh.x + Math.abs(e[5]) * gh.y + Math.abs(e[9]) * gh.z,
        Math.abs(e[2]) * gh.x + Math.abs(e[6]) * gh.y + Math.abs(e[10]) * gh.z);
      const box = new THREE.Box3(centre.clone().sub(half), centre.clone().add(half));
      const color = blank ? [0, 0, 0] : colors ? [colors.read(i, 0) * base.r, colors.read(i, 1) * base.g, colors.read(i, 2) * base.b] : [base.r, base.g, base.b];
      pins.push({ object, index: i, box, centre, size: half.multiplyScalar(2), base: new THREE.Vector3(centre.x, box.min.y, centre.z), color });
    }
  });
  pins.byKey = new Map();
  for (const pin of pins) { const k = key(pin.base.x, pin.base.z); if (!pins.byKey.has(k)) pins.byKey.set(k, []); pins.byKey.get(k).push(pin); }
  cached = { generation, app, pins };
  return pins;
}

// Materials that ignore instance colours, so pins would not show their status.
const unshaded = ['isMeshNormalMaterial', 'isMeshDepthMaterial', 'isMeshDistanceMaterial'];
const key = (x, z) => `${Math.round(x * 2)},${Math.round(z * 2)}`;
/** Matches drawn pins to sensors by base point. Returns problems found, or an empty list. */
export function matchPins(pins, list) {
  const problems = [], used = new Set();
  for (const sensor of list) {
    const here = pinsAt(pins, sensor);
    if (!here.length) { problems.push(`no pin stands on sensor ${sensor.id} at (${sensor.x}, ${sensor.y}, ${sensor.z})`); continue; }
    for (const p of here) used.add(p);
  }
  const extra = pins.filter((p) => !used.has(p));
  if (extra.length) problems.push(`${extra.length} pins drawn where no sensor is, e.g. at (${extra[0].base.x.toFixed(2)}, ${extra[0].base.y.toFixed(2)}, ${extra[0].base.z.toFixed(2)})`);
  return problems.slice(0, 5);
}

export function pinsAt(pins, sensor) {
  return (pins.byKey.get(key(sensor.x, sensor.z)) ?? []).filter((p) => near(p.base.x, sensor.x, 0.15) && near(p.base.z, sensor.z, 0.15) && near(p.base.y, sensor.y, 0.15));
}

const srgb = (hex) => [(hex >> 16 & 255) / 255, (hex >> 8 & 255) / 255, (hex & 255) / 255];
const toLinear = (c) => (c < 0.04045 ? c * 0.0773993808 : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4));
/** True when `rgb` equals the hex colour, read either as sRGB values or converted to linear. */
export function sameColor(rgb, hex, tol = 0.03) {
  const s = srgb(hex), l = s.map(toLinear);
  return s.every((v, i) => near(rgb[i], v, tol)) || l.every((v, i) => near(rgb[i], v, tol));
}
export function colorProblems(pins, list) {
  const problems = [];
  for (const sensor of list) {
    const here = pinsAt(pins, sensor);
    if (!here.length) { problems.push(`no pin for ${sensor.id}`); continue; }
    if (!here.some((p) => sameColor(p.color, STATUS[sensor.status]))) problems.push(`${sensor.id} (${sensor.status}) is drawn as rgb(${here[0].color.map((v) => v.toFixed(3)).join(', ')})`);
    if (problems.length >= 5) break;
  }
  return problems;
}

/** A ray from high above, slightly tilted, aimed at a point. */
export function rayAt(point) {
  const dir = new THREE.Vector3(0.03, -1, 0.02).normalize();
  return new THREE.Raycaster(point.clone().addScaledVector(dir, -300), dir);
}

/** The field's terrain: the largest drawn mesh that is not instanced and not the app's. */
export function terrainMesh(app) {
  let best = null;
  app.scene.traverseVisible((o) => {
    if (o.isMesh && !o.isInstancedMesh && !app.objects.has(o) && o.geometry?.attributes.position) {
      if (!best || o.geometry.attributes.position.count > best.geometry.attributes.position.count) best = o;
    }
  });
  return best;
}

/** Resources the renderer saw that the field created and that are no longer drawn, and not yet disposed. */
export function leaked(app, drawnNow) {
  const live = new Set();
  for (const object of drawnNow) {
    live.add(object.geometry);
    for (const m of [object.material].flat()) { live.add(m); for (const v of Object.values(m)) if (v && v.isTexture) live.add(v); }
  }
  return [...seen].filter((r) => !app.owned.has(r) && !live.has(r) && r.__disposed === 0);
}

/** Fresh state for one test: the app scene, survey data and a cleared record of what the renderer saw. */
export function fresh() {
  seen.clear();
  return appScene();
}
