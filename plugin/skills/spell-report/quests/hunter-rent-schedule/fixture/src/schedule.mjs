import { addDays, addMonths, formatDate, parseDate } from './dates.mjs';

// Recurring schedules for reminders (rent, invoices, check-ins). See README.md.
const UNITS = ['day', 'week', 'month', 'year'];

export function createSchedule({ start, every = 1, unit, count, until } = {}) {
  const startDate = parseDate(start);
  if (!Number.isSafeInteger(every) || every < 1) throw new RangeError('every must be a positive integer');
  if (!UNITS.includes(unit)) throw new RangeError(`unit must be one of ${UNITS.join(', ')}`);
  if (count !== undefined && (!Number.isSafeInteger(count) || count < 1)) throw new RangeError('count must be a positive integer');
  if (until !== undefined && parseDate(until) < startDate) throw new RangeError('until must not be before start');
  return Object.freeze({ start, every, unit, count, until });
}

function step(date, every, unit) {
  switch (unit) {
    case 'day': return addDays(date, every);
    case 'week': return addDays(date, 7 * every);
    case 'month': return addMonths(date, every);
    case 'year': return addMonths(date, 12 * every);
  }
}

// Every occurrence in order, until the schedule ends (it may never end).
function* walk(schedule) {
  const until = schedule.until === undefined ? null : parseDate(schedule.until);
  let date = parseDate(schedule.start);
  for (let n = 0; schedule.count === undefined || n < schedule.count; n++) {
    if (until && date > until) return;
    yield date;
    date = step(date, schedule.every, schedule.unit);
  }
}

export function occurrences(schedule, from, to) {
  const fromDate = parseDate(from), toDate = parseDate(to);
  const found = [];
  for (const date of walk(schedule)) {
    if (date > toDate) break;
    if (date >= fromDate) found.push(formatDate(date));
  }
  return found;
}

export function nextOccurrence(schedule, after) {
  const afterDate = parseDate(after);
  for (const date of walk(schedule)) {
    if (date > afterDate) return formatDate(date);
  }
  return null;
}
