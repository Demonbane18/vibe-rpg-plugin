# Rune Trail: slug function

Implement the named export `slugify(text, options = {})` in `src/slugify.mjs`. Write tests in `test/slugify.test.mjs` before changing the starter implementation.

`text` must be a primitive string; otherwise throw `TypeError`. Return a primitive string. `options` is an optional object with `maxLength`, defaulting to 60 when omitted or undefined. `maxLength` must be a positive safe integer; otherwise throw `RangeError`.

Normalize in this order:

1. Trim surrounding whitespace and lowercase using JavaScript's locale-independent `toLowerCase()`.
2. Apply Unicode NFKD normalization and remove all Unicode combining marks (`\p{M}`). This includes compatibility forms such as fullwidth letters and ligatures; do not invent transliterations for letters NFKD leaves unchanged.
3. Replace each run outside ASCII `[a-z0-9]` with one hyphen, then remove edge hyphens. Blank input or input with no surviving letters or digits becomes `''`.
4. If the normalized slug exceeds `maxLength`, find its last hyphen whose zero-based index is between 1 and `maxLength`, inclusive. If found, keep everything before that hyphen. Otherwise keep exactly its first `maxLength` characters, even when that cuts a single long word. Never return an edge hyphen.

Examples: `slugify('  Brûme & Fern! ')` returns `'brume-fern'`; `slugify('amber-river-stone', { maxLength: 11 })` returns `'amber-river'`; the same input with 10 returns `'amber'`; `slugify('evergreen path', { maxLength: 4 })` returns `'ever'`.

Use Node 20+ built-ins only. Run `node --test test/slugify.test.mjs`. Deliver at least five passing, independent tests and the complete implementation.
