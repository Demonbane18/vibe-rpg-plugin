import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, fresh, terrain, sensors, render, drawnPins, matchPins, colorProblems, pinsAt, rayAt, leaked } from './lib.mjs';

const { THREE, createSensorField } = await load();
const app = fresh();
const field = createSensorField(app.scene, { terrain: terrain(), sensors: sensors('S', 20000, 150, 3.5, 4, 6, 6) });
render(app);

const centreOf = (sensor) => {
  const here = pinsAt(drawnPins(app), sensor);
  assert.ok(here.length, `no pin for ${sensor.id}`);
  return here[0].box.getCenter(new THREE.Vector3());
};
const leakText = (list) => list.map((r) => `${r.__kind} ${r.type ?? ''}`.trim()).join(', ');

const longer = sensors('T', 30000, 170, 3.5, 3, 7.5, 8);
const shorter = sensors('U', 5000, 70, 5, 5, 12.5, 15);

test('a longer sensor list replaces the old one', () => {
  field.setSensors(longer);
  const draws = render(app);
  assert.ok(draws.length <= 3, `the field issued ${draws.length} draw calls`);
  assert.deepEqual(matchPins(drawnPins(app), longer), []);
  assert.deepEqual(colorProblems(drawnPins(app), longer), []);
});

test('the new sensors can be clicked, recoloured and moved', () => {
  const s = longer[29001];
  assert.equal(field.pick(rayAt(centreOf(s))), s.id);
  s.status = s.status === 'alarm' ? 'ok' : 'alarm';
  field.setStatus(s.id, s.status);
  Object.assign(s, { x: 1500, y: 12, z: 1500 });
  field.moveSensor(s.id, s.x, s.y, s.z);
  render(app);
  assert.deepEqual(colorProblems(drawnPins(app), [s]), []);
  assert.equal(field.pick(rayAt(centreOf(s))), s.id);
});

test('a shorter sensor list leaves no old pins behind', () => {
  field.setSensors(shorter);
  const draws = render(app);
  assert.ok(draws.length <= 3, `the field issued ${draws.length} draw calls`);
  assert.deepEqual(matchPins(drawnPins(app), shorter), []);
  assert.deepEqual(colorProblems(drawnPins(app), shorter), []);
  const s = shorter[4999];
  assert.equal(field.pick(rayAt(centreOf(s))), s.id);
});

test('replacing the sensor list frees what the old list used', () => {
  field.setSensors(sensors('V', 8000, 100, 4, 4, 10, 10));
  const draws = render(app);
  const left = leaked(app, draws);
  assert.equal(left.length, 0, `still holding: ${leakText(left)}`);
});
