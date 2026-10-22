import test from 'node:test';
import assert from 'node:assert/strict';
import { createSchedule, nextOccurrence, occurrences } from '../src/schedule.mjs';

const monthly = (start, extra = {}) => createSchedule({ start, unit: 'month', ...extra });

test('schedule contract: part 1', () => {
  assert.deepEqual(occurrences(monthly('2026-01-31'), '2026-01-01', '2026-12-31'), [
    '2026-01-31', '2026-02-28', '2026-03-31', '2026-04-30', '2026-05-31', '2026-06-30',
    '2026-07-31', '2026-08-31', '2026-09-30', '2026-10-31', '2026-11-30', '2026-12-31',
  ]);
});

test('schedule contract: part 2', () => {
  assert.deepEqual(occurrences(monthly('2027-12-31'), '2028-01-15', '2028-04-30'), ['2028-01-31', '2028-02-29', '2028-03-31', '2028-04-30']);
  assert.deepEqual(occurrences(monthly('2026-01-30'), '2026-01-01', '2026-04-30'), ['2026-01-30', '2026-02-28', '2026-03-30', '2026-04-30']);
  assert.deepEqual(occurrences(monthly('2026-01-29'), '2026-02-01', '2026-03-31'), ['2026-02-28', '2026-03-29']);
});

test('schedule contract: part 3', () => {
  assert.deepEqual(occurrences(monthly('2026-08-31', { every: 2 }), '2026-01-01', '2027-08-31'), [
    '2026-08-31', '2026-10-31', '2026-12-31', '2027-02-28', '2027-04-30', '2027-06-30', '2027-08-31',
  ]);
  assert.deepEqual(occurrences(monthly('2026-05-31', { every: 3 }), '2026-01-01', '2027-03-31'), ['2026-05-31', '2026-08-31', '2026-11-30', '2027-02-28']);
});

test('schedule contract: part 4', () => {
  const leap = createSchedule({ start: '2028-02-29', unit: 'year' });
  assert.deepEqual(occurrences(leap, '2028-01-01', '2033-12-31'), ['2028-02-29', '2029-02-28', '2030-02-28', '2031-02-28', '2032-02-29', '2033-02-28']);
  const century = createSchedule({ start: '2096-02-29', unit: 'year', every: 4 });
  assert.deepEqual(occurrences(century, '2096-01-01', '2108-12-31'), ['2096-02-29', '2100-02-28', '2104-02-29', '2108-02-29']);
  assert.deepEqual(occurrences(createSchedule({ start: '2026-08-31', unit: 'year' }), '2027-01-01', '2028-12-31'), ['2027-08-31', '2028-08-31']);
});

test('schedule contract: part 5', () => {
  const rent = monthly('2026-01-31');
  assert.equal(nextOccurrence(rent, '2026-01-30'), '2026-01-31');
  assert.equal(nextOccurrence(rent, '2026-01-31'), '2026-02-28');
  assert.equal(nextOccurrence(rent, '2026-03-01'), '2026-03-31');
  assert.equal(nextOccurrence(rent, '2026-03-28'), '2026-03-31');
  assert.equal(nextOccurrence(rent, '2026-03-31'), '2026-04-30');
  assert.equal(nextOccurrence(rent, '2025-06-01'), '2026-01-31');
  assert.equal(nextOccurrence(rent, '2030-02-28'), '2030-03-31');
  assert.equal(nextOccurrence(createSchedule({ start: '2000-01-31', unit: 'month' }), '2100-02-01'), '2100-02-28');
});

test('schedule contract: part 6', () => {
  const counted = monthly('2026-01-31', { count: 4 });
  assert.deepEqual(occurrences(counted, '2026-03-01', '2030-01-01'), ['2026-03-31', '2026-04-30']);
  assert.equal(nextOccurrence(counted, '2026-04-29'), '2026-04-30');
  assert.equal(nextOccurrence(counted, '2026-04-30'), null);
  const bounded = monthly('2026-01-31', { until: '2026-04-30' });
  assert.deepEqual(occurrences(bounded, '2026-01-01', '2026-12-31'), ['2026-01-31', '2026-02-28', '2026-03-31', '2026-04-30']);
  assert.equal(nextOccurrence(bounded, '2026-04-30'), null);
  const shorter = monthly('2026-01-31', { until: '2026-03-30' });
  assert.deepEqual(occurrences(shorter, '2026-01-01', '2026-12-31'), ['2026-01-31', '2026-02-28']);
  assert.deepEqual(occurrences(monthly('2026-01-31', { count: 10, until: '2026-03-31' }), '2026-01-01', '2026-12-31'), ['2026-01-31', '2026-02-28', '2026-03-31']);
});

test('schedule contract: part 7', () => {
  for (const start of ['2026-02-30', '2025-02-29', '2026-04-31', '2026-06-31', '2026-1-05', '2026-00-10', '2026-13-01']) {
    assert.throws(() => createSchedule({ start, unit: 'month' }), RangeError, start);
  }
  assert.doesNotThrow(() => createSchedule({ start: '2028-02-29', unit: 'month' }));
  assert.throws(() => createSchedule({ start: '2026-01-31', unit: 'month', until: '2026-02-30' }), RangeError);
  assert.throws(() => createSchedule({ start: '2026-01-31', unit: 'month', until: '2026-01-30' }), RangeError);
  const rent = monthly('2026-01-31');
  assert.throws(() => occurrences(rent, '2026-02-29', '2026-12-31'), RangeError);
  assert.throws(() => occurrences(rent, '2026-01-01', '2026-11-31'), RangeError);
  assert.throws(() => nextOccurrence(rent, '2026-09-31'), RangeError);
  for (const every of [0, -1, 1.5, '2']) assert.throws(() => createSchedule({ start: '2026-01-01', unit: 'day', every }), RangeError);
  for (const count of [0, 2.5]) assert.throws(() => createSchedule({ start: '2026-01-01', unit: 'day', count }), RangeError);
});

test('schedule contract: part 8', () => {
  const daily = createSchedule({ start: '2026-01-30', unit: 'day', every: 3 });
  assert.deepEqual(occurrences(daily, '2026-01-30', '2026-02-10'), ['2026-01-30', '2026-02-02', '2026-02-05', '2026-02-08']);
  const weekly = createSchedule({ start: '2026-03-27', unit: 'week', every: 2 });
  assert.deepEqual(occurrences(weekly, '2026-03-01', '2026-05-01'), ['2026-03-27', '2026-04-10', '2026-04-24']);
  assert.equal(nextOccurrence(createSchedule({ start: '2000-01-01', unit: 'day' }), '2099-12-31'), '2100-01-01');
  assert.deepEqual(occurrences(monthly('2026-01-31'), '2026-06-01', '2026-05-01'), []);
});
