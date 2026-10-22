import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, fresh, terrain, sensors, render, drawnPins, colorProblems } from './lib.mjs';

const { createSensorField } = await load();
const app = fresh();
const list = sensors('S', 20000, 150, 3.5, 4, 6, 6);
const field = createSensorField(app.scene, { terrain: terrain(), sensors: list });
render(app);

test('pins show the colour of their status', () => {
  assert.deepEqual(colorProblems(drawnPins(app), list), []);
});

test('status updates show on the next frame', () => {
  const order = ['alarm', 'warn', 'offline', 'ok'];
  for (let round = 0; round < 3; round++) {
    const changed = [];
    for (let i = round * 37; i < list.length; i += 331) {
      const sensor = list[i];
      sensor.status = order[(order.indexOf(sensor.status) + 1 + round) % order.length];
      field.setStatus(sensor.id, sensor.status);
      changed.push(sensor);
    }
    render(app);
    assert.deepEqual(colorProblems(drawnPins(app), changed), [], `after update round ${round + 1}`);
  }
  assert.deepEqual(colorProblems(drawnPins(app), list), []);
});
