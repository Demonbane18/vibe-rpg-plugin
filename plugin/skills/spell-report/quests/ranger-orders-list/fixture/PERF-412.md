# PERF-412: Orders screen stalls on big accounts

Support reproduced this on a Pixel 6a with 2,140 orders. Opening Orders takes four or five seconds. Memory climbs past 600 MB, and returning from another app sometimes restarts Ledgerleaf.

Search falls behind fast typing. Scrolling and tapping notes also stutter. Tapping a row should update that row, not every other visible order. Typing should leave unchanged row data alone. Pull to refresh sometimes moves the expanded note to a different order when new orders arrive at the top.

Photos are 48 x 48 on this screen. Rows shift while photos load. Some accounts crash as soon as the list appears; other accounts crash only after opening a note. Sentry reports: "Text strings must be rendered within a <Text> component."

Fix the screen's render path for this workload. Keep search, pull to refresh, the order count, note expansion, and all displayed fields. Follow the app conventions in README.md.
