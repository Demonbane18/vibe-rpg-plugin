import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, fresh, terrain, sensors, render, drawnPins, matchPins, pinsAt, rayAt } from './lib.mjs';

const { THREE, createSensorField } = await load();
const app = fresh();
const list = sensors('S', 20000, 150, 3.5, 4, 6, 6);
const field = createSensorField(app.scene, { terrain: terrain(), sensors: list });
render(app);

const centreOf = (sensor) => {
  const here = pinsAt(drawnPins(app), sensor);
  assert.ok(here.length, `no pin for ${sensor.id}`);
  return here[0].box.getCenter(new THREE.Vector3());
};

const a = list[4321], b = list[777], c = list[15000];
const before = {};

test('clicking a pin picks its sensor', () => {
  before.a = centreOf(a);
  assert.equal(field.pick(rayAt(before.a)), a.id);
  assert.equal(field.pick(rayAt(centreOf(c))), c.id);
});

test('clicking empty sky picks nothing', () => {
  const ray = new THREE.Raycaster(new THREE.Vector3(200, 50, 200), new THREE.Vector3(0, 1, 0));
  assert.equal(field.pick(ray), null);
});

test('moved sensors are drawn at their new points', () => {
  Object.assign(a, { x: 2600, y: 35, z: -1900 });
  field.moveSensor(a.id, a.x, a.y, a.z);
  Object.assign(b, { x: -800, y: 5, z: 900 });
  field.moveSensor(b.id, b.x, b.y, b.z);
  Object.assign(c, { x: c.x + 1, y: c.y + 2, z: c.z - 1 });
  field.moveSensor(c.id, c.x, c.y, c.z);
  render(app);
  assert.deepEqual(matchPins(drawnPins(app), list), []);
});

test('moved pins stay on screen when the camera looks at them', () => {
  for (const sensor of [a, b]) {
    const pin = pinsAt(drawnPins(app), sensor)[0];
    assert.ok(pin, `no pin for ${sensor.id}`);
    const object = pin.object;
    if (!object.frustumCulled) continue;
    const bounds = object.boundingSphere.clone().applyMatrix4(object.matrixWorld);
    assert.ok(bounds.containsPoint(pin.centre), `${sensor.id} disappears when the camera looks at it`);
  }
});

test('moved pins can be clicked where they are now', () => {
  assert.equal(field.pick(rayAt(centreOf(a))), a.id);
  assert.equal(field.pick(rayAt(centreOf(b))), b.id);
  assert.equal(field.pick(rayAt(centreOf(c))), c.id);
  assert.notEqual(field.pick(rayAt(before.a)), a.id, 'the old spot still picks the moved sensor');
});
