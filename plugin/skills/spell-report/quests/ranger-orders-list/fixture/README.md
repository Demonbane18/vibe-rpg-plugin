# Ledgerleaf Merchant

Expo app merchants use to track and fulfil orders.

## Conventions

- TypeScript, function components and hooks. The React Compiler is not enabled in this app, so memoize by hand where it matters.
- Order data comes from `src/lib/orders.ts`. Keep `fetchOrders`, `sortByNewest` and `matchesQuery` as the single source for loading, ordering and search.
- Product photos are full-size originals. Request every photo through `cdnImage()` in `src/lib/cdn.ts` at twice the size it is drawn on screen.
- Styles live in `StyleSheet.create` at the bottom of each file.
- Money uses each order's currency with the `en-US` locale, and dates use a short month and day.
