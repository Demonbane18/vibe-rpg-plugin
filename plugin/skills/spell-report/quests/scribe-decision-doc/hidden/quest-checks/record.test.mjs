import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8').replace(/\r\n/g, '\n');
const doc = read('DECISION.md');
const lines = doc.split('\n');

function section(name) {
  const out = [];
  let inside = false;
  for (const line of lines) {
    const m = /^(#{1,6})\s+(.*?)\s*$/.exec(line);
    if (m) { inside = m[2].trim().toLowerCase() === name.toLowerCase(); continue; }
    if (inside) out.push(line);
  }
  return out;
}

const cells = (line) => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
function rows() {
  const table = section('Decisions and owners').filter((line) => line.trim().startsWith('|'));
  assert.ok(table.length >= 3, 'no table');
  const head = cells(table[0]).map((cell) => cell.toLowerCase());
  const at = (name) => head.findIndex((cell) => cell.includes(name));
  const [d, o, t] = [at('decision'), at('owner'), at('date')];
  assert.ok(d >= 0 && o >= 0 && t >= 0, 'table columns');
  return table.slice(2).map(cells).map((row) => ({ what: row[d] ?? '', owner: row[o] ?? '', date: row[t] ?? '' }));
}

test('template structure', () => {
  const h1 = lines.filter((line) => /^#\s/.test(line));
  assert.equal(h1.length, 1);
  assert.match(h1[0], /^# Decision: \S/);
  const h2 = lines.filter((line) => /^#{2,6}\s/.test(line)).map((line) => line.trim());
  assert.deepEqual(h2, ['## Context', '## Options considered', '## Decision', '## Evidence', '## Decisions and owners', '## Open questions']);
  assert.match(doc, /^Status: Decided\s*$/m);
  assert.match(doc, /^Decision date: 2026-10-08\s*$/m);
  assert.doesNotMatch(doc, /<!--|<(?:short title|Proposed or Decided|YYYY-MM-DD|names|what|name)>/);
});

test('options', () => {
  const text = section('Options considered').join('\n');
  assert.match(text, /elasticsearch/i);
  assert.match(text, /postgres|\bpg\b/i);
  assert.match(text, /typesense/i);
});

const expected = [
  ['shadow traffic', /shadow|parallel|side by side|dual|compare/i, /Ines|Duarte/, '2026-10-26'],
  ['cutover', /cut ?over|switch|move|migrat|typesense/i, /Marek|Lind/, '2026-11-16'],
  ['on-call', /on-?call|rota|pager/i, /Sol\b|Abara|Platform/, '2026-11-16'],
  ['old index', /index|fallback|postgres|\bpg\b|drop/i, /Sol\b|Abara|Platform/, '2026-12-31'],
  ['hosting', /budget|hosting|cost|pay|fund/i, /Hana|Brooks|Finance|Platform|Sol\b|Abara/, '2026-10-15'],
];

for (const [name, what, owner, date] of expected) {
  test(`row: ${name}`, () => {
    assert.ok(rows().some((row) => what.test(row.what) && owner.test(row.owner) && row.date.includes(date)));
  });
}

test('current state', () => {
  assert.ok(rows().every((row) => !row.date.includes('2026-11-02')));
});

test('open questions', () => {
  const items = section('Open questions').filter((line) => /^\s*(?:[-*+]|\d+[.)])\s+/.test(line));
  for (const topic of [/\bEU\b|region/i, /shadow|side by side|parallel|dual|\b(?:2|3|two|three) weeks/i]) {
    assert.ok(items.some((item) => topic.test(item)));
  }
  assert.ok(items.some((item) => /\bCSV\b|export/i.test(item) && /index|drop|2026-12-31|fallback|retir|remov|delet|decommission|shut|turn(?:ed)? off/i.test(item)));
  for (const item of items) {
    assert.ok(/Hana|Brooks|Rui|Tan\b|Marek|Ines|Sol\b|Abara|Finance|Legal|Support/.test(item) || /nobody|no one|unassigned|no owner|not assigned/i.test(item));
    assert.doesNotMatch(item, /autocomplete|budget|financ|who pays|pays for/i);
    if (!/\bEU\b|region|\bCSV\b|export/i.test(item)) {
      assert.ok(!(/index|postgres|\bpg\b/i.test(item) && /how long|keep|retain|drop|fallback|retire|delete|remov/i.test(item)));
    }
  }
});

test('figures', () => {
  const numbers = (text) => (text.match(/\d{1,3}(?:,\d{3})+(?:\.\d+)*|\d+(?:\.\d+)*/g) ?? []).map((value) => value.replaceAll(',', ''));
  const allowed = new Set(['TEMPLATE.md', 'notes/meeting.md', 'notes/thread.txt', 'notes/metrics.csv'].flatMap((path) => numbers(read(path))));
  const added = [...new Set(numbers(doc).filter((value) => !allowed.has(value)))];
  assert.equal(added.length, 0, `${added.length} figures not in the notes`);
});
