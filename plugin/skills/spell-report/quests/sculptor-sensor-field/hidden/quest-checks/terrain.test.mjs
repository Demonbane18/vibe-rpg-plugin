import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, fresh, terrain, sensors, render, terrainMesh, uploaded } from './lib.mjs';

const { THREE, createSensorField } = await load();
const app = fresh();
const grid = terrain();
const { cols, rows, spacing, heights } = grid;
createSensorField(app.scene, { terrain: grid, sensors: sensors('S', 2000, 50, 3.5, 4, 6, 6) });
render(app);
const mesh = terrainMesh(app);

// World position of every drawn vertex and the grid point it sits on, if any.
const vertices = [];
if (mesh) {
  const pos = uploaded(mesh.geometry.attributes.position), v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.set(pos.read(i, 0), pos.read(i, 1), pos.read(i, 2)).applyMatrix4(mesh.matrixWorld);
    const c = Math.round(v.x / spacing), r = Math.round(v.z / spacing);
    const onGrid = Math.abs(v.x - c * spacing) < 0.01 && Math.abs(v.z - r * spacing) < 0.01 && r >= 0 && r < rows && c >= 0 && c < cols;
    vertices.push({ p: v.clone(), r: onGrid ? r : -1, c: onGrid ? c : -1 });
  }
}

test('the field draws a terrain surface', () => {
  assert.ok(mesh, 'no terrain mesh in the scene');
});

test('every grid point is drawn at its surveyed height', () => {
  const found = new Uint8Array(rows * cols);
  for (const { p, r, c } of vertices) {
    if (r < 0) continue;
    if (Math.abs(p.y - heights[r * cols + c]) < 0.01) found[r * cols + c] = 1;
  }
  const missing = found.indexOf(0);
  assert.equal(missing, -1, missing >= 0 && `grid point row ${Math.floor(missing / cols)}, column ${missing % cols} is not drawn at its height`);
});

test('terrain triangles join neighbouring grid points and face up', () => {
  const geometry = mesh.geometry;
  const index = geometry.index ? uploaded(geometry.index) : null;
  const total = index ? index.count : vertices.length;
  const start = geometry.drawRange.start, end = Math.min(total, start + geometry.drawRange.count);
  assert.equal(end - start, (rows - 1) * (cols - 1) * 6, `the terrain draws ${(end - start) / 3} triangles`);
  const ab = new THREE.Vector3(), ac = new THREE.Vector3();
  for (let i = start; i < end; i += 3) {
    const ids = [0, 1, 2].map((k) => (index ? index.read(i + k, 0) : i + k));
    assert.ok(ids.every((id) => id < vertices.length), `triangle ${i / 3} uses a vertex that does not exist`);
    if (index && index.array instanceof Uint16Array) assert.ok(!ids.includes(65535), `triangle ${i / 3} is missing from the surface`);
    const [a, b, c] = ids.map((id) => vertices[id]);
    assert.ok(a.r >= 0 && b.r >= 0 && c.r >= 0, `triangle ${i / 3} has a corner off the grid`);
    const span = Math.max(a.r, b.r, c.r) - Math.min(a.r, b.r, c.r) + Math.max(a.c, b.c, c.c) - Math.min(a.c, b.c, c.c);
    assert.ok(span <= 2, `triangle ${i / 3} stretches across the terrain`);
    const n = ab.subVectors(b.p, a.p).cross(ac.subVectors(c.p, a.p));
    assert.ok(n.y > 0, `triangle ${i / 3} faces down`);
  }
});

test('terrain responds to the app lights with the right shading', () => {
  const material = [mesh.material].flat()[0];
  assert.ok(material.isMeshStandardMaterial || material.isMeshLambertMaterial || material.isMeshPhongMaterial || material.isMeshToonMaterial || material.isMeshPhysicalMaterial, `${material.type} ignores lights`);
  const normals = mesh.geometry.attributes.normal;
  assert.ok(normals, 'the terrain has no normals');
  const nor = uploaded(normals), normalMatrix = new THREE.Matrix3().getNormalMatrix(mesh.matrixWorld), n = new THREE.Vector3(), want = new THREE.Vector3();
  for (let id = 0; id < vertices.length; id++) {
    const { r, c } = vertices[id];
    if (r < 1 || c < 1 || r >= rows - 1 || c >= cols - 1 || (r * 31 + c) % 13) continue;
    const h = (rr, cc) => heights[rr * cols + cc];
    want.set(-(h(r, c + 1) - h(r, c - 1)) / (2 * spacing), 1, -(h(r + 1, c) - h(r - 1, c)) / (2 * spacing)).normalize();
    n.set(nor.read(id, 0), nor.read(id, 1), nor.read(id, 2)).applyMatrix3(normalMatrix).normalize();
    assert.ok(n.dot(want) > 0.95, `shading at row ${r}, column ${c} does not follow the slope`);
  }
});
