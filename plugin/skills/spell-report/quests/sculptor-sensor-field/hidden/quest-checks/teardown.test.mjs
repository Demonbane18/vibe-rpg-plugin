import { test } from 'node:test';
import assert from 'node:assert/strict';
import { load, fresh, terrain, sensors, render, leaked } from './lib.mjs';

const { createSensorField } = await load();
const leakText = (list) => list.map((r) => `${r.__kind} ${r.type ?? ''}`.trim()).join(', ');

function session(app, round) {
  const list = sensors(`S${round}`, 6000, 80, 3.5, 4, 6, 6);
  const field = createSensorField(app.scene, { terrain: terrain(160, 120, 2), sensors: list });
  render(app);
  field.setStatus(list[10].id, 'alarm');
  field.moveSensor(list[20].id, 900, 4, 900);
  render(app);
  field.setSensors(sensors(`T${round}`, 9000, 100, 3, 3, 5, 5));
  render(app);
  field.dispose();
  return render(app);
}

test('closing the field leaves the scene as it was', () => {
  const app = fresh();
  for (let round = 0; round < 2; round++) {
    const draws = session(app, round);
    assert.equal(draws.length, 0, `${draws.length} field objects are still drawn after dispose`);
    assert.ok(app.scene.children.length === app.children.length && app.children.every((child, i) => app.scene.children[i] === child), 'the scene children differ from before the field opened');
    let count = 0; app.scene.traverse(() => count++);
    assert.equal(count, app.objects.size, 'objects were added to or removed from the app scene');
  }
});

test('closing the field frees everything it created', () => {
  const app = fresh();
  const draws = session(app, 0);
  const left = leaked(app, draws);
  assert.equal(left.length, 0, `still holding: ${leakText(left)}`);
});

test('closing the field leaves the app objects working', () => {
  const app = fresh();
  session(app, 0);
  const disposed = [...app.owned].filter((r) => r.__disposed > 0);
  assert.equal(disposed.length, 0, 'the field disposed resources it does not own');
});
