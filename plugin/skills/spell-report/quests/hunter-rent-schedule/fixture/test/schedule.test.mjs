import test from 'node:test';
import assert from 'node:assert/strict';
import { createSchedule, nextOccurrence, occurrences } from '../src/schedule.mjs';

test('daily schedules', () => {
  const schedule = createSchedule({ start: '2026-02-26', unit: 'day', every: 2 });
  assert.deepEqual(occurrences(schedule, '2026-02-26', '2026-03-05'), ['2026-02-26', '2026-02-28', '2026-03-02', '2026-03-04']);
});

test('weekly schedules', () => {
  const schedule = createSchedule({ start: '2026-03-02', unit: 'week' });
  assert.deepEqual(occurrences(schedule, '2026-03-05', '2026-03-31'), ['2026-03-09', '2026-03-16', '2026-03-23', '2026-03-30']);
});

test('monthly schedules on the 15th', () => {
  const schedule = createSchedule({ start: '2026-01-15', unit: 'month' });
  assert.deepEqual(occurrences(schedule, '2026-01-01', '2026-04-30'), ['2026-01-15', '2026-02-15', '2026-03-15', '2026-04-15']);
  assert.equal(nextOccurrence(schedule, '2026-04-15'), '2026-05-15');
});

test('count and until end a schedule', () => {
  const counted = createSchedule({ start: '2026-01-10', unit: 'month', count: 2 });
  assert.deepEqual(occurrences(counted, '2026-01-01', '2026-12-31'), ['2026-01-10', '2026-02-10']);
  assert.equal(nextOccurrence(counted, '2026-02-10'), null);
  const bounded = createSchedule({ start: '2026-01-10', unit: 'week', until: '2026-01-24' });
  assert.deepEqual(occurrences(bounded, '2026-01-01', '2026-12-31'), ['2026-01-10', '2026-01-17', '2026-01-24']);
});

test('rejects invalid schedules', () => {
  assert.throws(() => createSchedule({ start: 'tomorrow', unit: 'day' }), RangeError);
  assert.throws(() => createSchedule({ start: '2026-01-01', unit: 'hour' }), RangeError);
  assert.throws(() => createSchedule({ start: '2026-01-01', unit: 'day', every: 0 }), RangeError);
});
