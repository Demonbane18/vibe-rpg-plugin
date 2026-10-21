# Fading Tracks: TTL cache repair

`src/cache.mjs` exports the class `TTLCache`.

## Construction

`new TTLCache({ maxSize = 3, ttlMs = 1000, now = Date.now } = {})`

- `maxSize` must be a positive safe integer; otherwise throw `RangeError`.
- `ttlMs` must be a finite number greater than or equal to zero; otherwise throw `RangeError`. Fractions are valid. Units are milliseconds.
- `now` must be a function; otherwise throw `TypeError`. It returns a finite, monotonically nondecreasing number in milliseconds. Assume callers honor that clock contract.
- Omitted and undefined options use the defaults. Each cache owns separate state. Use only Node 20+ built-ins.

## Operations

- `set(key, value)` returns this cache. Keys use Map equality and values may be anything, including undefined. A write stores the value with deadline `now() + ttlMs`, and makes that key most recently used. Replacing a live key resets its deadline and recency without increasing size or evicting another key. Replacing an expired key is a new insertion.
- `get(key)` returns the live value or undefined. A successful read makes that key most recently used, even if its stored value is undefined. Reads never extend deadlines. Misses do not change recency.
- Entries expire exactly when `now() >= deadline`. Before deciding size or capacity, remove expired entries. If insertion would exceed `maxSize`, evict the least recently used live key. An expiry must never force eviction of another live key.
- `ttlMs: 0` means a write is immediately expired: it removes any previous value for that key and must not evict another key.
- The read-only `size` getter returns the number of live keys, after removing expired entries. Inspecting size must not refresh recency or expiry.
- `delete(key)` removes a live key and returns true, or returns false for missing or expired keys. It must not refresh other keys. `clear()` removes all entries and returns undefined; the cache remains usable.

Read `ISSUE.md`. Preserve `test/cache.test.mjs` exactly and add `test/regression.test.mjs` with at least two independent tests. Use an injected fake clock with explicit time changes; do not sleep or inspect internal fields. Run `node --test test/cache.test.mjs test/regression.test.mjs`. Deliver the implementation and regressions that fail against the original source.
