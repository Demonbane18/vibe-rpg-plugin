import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, fresh, terrain, sensors, render, terrainMesh, uploaded } from './lib.mjs';

const { THREE, createSensorField } = await load();
const app = fresh();
const grid = terrain();
const { cols, rows, spacing, landUse } = grid;
createSensorField(app.scene, { terrain: grid, sensors: sensors('S', 2000, 50, 3.5, 4, 6, 6) });
render(app);
const mesh = terrainMesh(app);
const toLinear = (c) => (c < 0.04045 ? c * 0.0773993808 : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4));

test('each grid point shows its land-use colour', () => {
  assert.ok(mesh, 'no terrain mesh in the scene');
  const material = [mesh.material].flat()[0];
  const colors = mesh.geometry.attributes.color;
  assert.ok(material.vertexColors && colors, 'the terrain does not colour its grid points');
  const pos = uploaded(mesh.geometry.attributes.position), col = uploaded(colors), base = material.color ?? new THREE.Color(1, 1, 1), v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.set(pos.read(i, 0), pos.read(i, 1), pos.read(i, 2)).applyMatrix4(mesh.matrixWorld);
    const c = Math.round(v.x / spacing), r = Math.round(v.z / spacing);
    if (r < 0 || r >= rows || c < 0 || c >= cols) continue;
    const g = (r * cols + c) * 3;
    const shown = [col.read(i, 0) * base.r, col.read(i, 1) * base.g, col.read(i, 2) * base.b];
    const raw = [0, 1, 2].map((k) => landUse[g + k] / 255);
    const ok = raw.every((x, k) => Math.abs(shown[k] - x) < 0.02) || raw.every((x, k) => Math.abs(shown[k] - toLinear(x)) < 0.02);
    assert.ok(ok, `row ${r}, column ${c} shows rgb(${shown.map((x) => x.toFixed(3)).join(', ')}) for land use rgb(${landUse.slice(g, g + 3).join(', ')})`);
  }
});
