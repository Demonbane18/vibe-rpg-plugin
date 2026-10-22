# Rent reminder skipped February

From Priya (tenant support)

A tenant whose lease started on 31 January never got a rent reminder in February. The next one arrived on 3 March, which confused them because rent is due at the end of each month.

Their schedule is `createSchedule({ start: '2026-01-31', unit: 'month' })`. The schedule tests all pass. Please fix this and add tests so it stays fixed.
