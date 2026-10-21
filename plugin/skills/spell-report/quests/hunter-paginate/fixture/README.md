# Broken Trail: pagination repair

`src/paginate.mjs` exports `paginate(items, page = 1, pageSize = 10)`.

- `items` must be an array; otherwise throw `TypeError`.
- `page` and `pageSize` must each be positive safe integers; otherwise throw `RangeError`. Omitted or undefined arguments use the defaults.
- Page numbers start at 1. Return a new array containing indices `(page - 1) * pageSize` through `page * pageSize - 1`, inclusive. Include every available item in that range, preserving order and value identity.
- Empty input and pages beyond the end return a new empty array. A short last page includes all its remaining items.
- Do not change the input array. Results are shallow copies, so objects remain the same objects.

Read `BUG_REPORT.md`, preserve `test/paginate.test.mjs` exactly, and add `test/regression.test.mjs` before fixing the implementation. Existing tests cover three cases but do not establish correctness for every page.

Run `node --test test/paginate.test.mjs test/regression.test.mjs` with Node 20+. Deliver the fix and at least one new independent regression test that fails if `src/paginate.mjs` is replaced by the starter version.
