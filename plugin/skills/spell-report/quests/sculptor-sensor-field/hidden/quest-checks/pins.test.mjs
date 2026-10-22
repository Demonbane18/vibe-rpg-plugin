import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, fresh, terrain, sensors, render, drawnPins, matchPins } from './lib.mjs';

const { createSensorField } = await load();
const app = fresh();
const list = sensors('S', 20000, 150, 3.5, 4, 6, 6);
createSensorField(app.scene, { terrain: terrain(), sensors: list });
const draws = render(app);

test('a 20,000 sensor survey stays within the draw-call budget', () => {
  assert.ok(draws.length <= 3, `the field issued ${draws.length} draw calls`);
});

test('every sensor has exactly its own pin', () => {
  const problems = matchPins(drawnPins(app), list);
  assert.deepEqual(problems, []);
});

test('pins have the size the brief gives', () => {
  const pins = drawnPins(app);
  assert.ok(pins.length > 0, 'no pins drawn');
  const odd = pins.find((p) => p.size.y < 1 || p.size.y > 3 || Math.max(p.size.x, p.size.z) < 0.2 || Math.max(p.size.x, p.size.z) > 1.5);
  assert.equal(odd, undefined, odd && `a pin measures ${odd.size.x.toFixed(2)} x ${odd.size.y.toFixed(2)} x ${odd.size.z.toFixed(2)}`);
});

test('a small survey draws its pins too', () => {
  const small = fresh();
  const few = sensors('F', 300, 20, 5, 5, 20, 20);
  createSensorField(small.scene, { terrain: terrain(40, 30, 2), sensors: few });
  render(small);
  assert.deepEqual(matchPins(drawnPins(small), few), []);
});
