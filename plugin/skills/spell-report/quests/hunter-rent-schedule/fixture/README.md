# Schedules

`src/schedule.mjs` works out when recurring reminders fire: rent, invoices, check-ins. `src/dates.mjs` has the small date helpers it uses. Dates are calendar dates written `YYYY-MM-DD`; there are no times and time zones never matter.

## API

`createSchedule({ start, every = 1, unit, count, until })` returns a schedule.

- `start` is the first occurrence. It must be a real calendar date in `YYYY-MM-DD` form.
- `unit` is `"day"`, `"week"`, `"month"` or `"year"`, and `every` (a positive integer) says how many units lie between occurrences.
- `count`, if given, is a positive integer that caps the total number of occurrences, counted from `start`.
- `until`, if given, is the last date an occurrence may fall on (inclusive). It must not be before `start`.
- Anything invalid throws `RangeError`.

`occurrences(schedule, from, to)` returns every occurrence with `from <= date <= to`, oldest first, as `YYYY-MM-DD` strings.

`nextOccurrence(schedule, after)` returns the first occurrence strictly after `after`, or `null` once the schedule has ended.

Both throw `RangeError` when `from`, `to` or `after` is not a real calendar date.

## How dates repeat

Daily and weekly schedules simply move forward by whole days.

Monthly schedules keep the day of the month they started on, and yearly schedules keep the month and day. When a month is too short for that day (the 31st in April, or 29 February in a common year), that occurrence falls on the last day of the month instead.

## Tests

`node --test test/` runs the suite.
