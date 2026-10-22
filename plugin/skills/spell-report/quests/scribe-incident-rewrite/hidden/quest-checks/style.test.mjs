import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const raw = readFileSync(new URL('../POSTMORTEM.md', import.meta.url), 'utf8').replace(/\r\n/g, '\n');

// Prose only: drop fenced code, tables and quotes; keep headings separately.
const lines = [];
let fenced = false;
for (const line of raw.split('\n')) {
  if (/^ {0,3}(`{3,}|~{3,})/.test(line)) { fenced = !fenced; lines.push(''); continue; }
  if (fenced || line.startsWith('|') || line.startsWith('>')) { lines.push(''); continue; }
  lines.push(line);
}
const headings = lines.map((line) => /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line)).filter(Boolean).map((m) => ({ level: m[1].length, text: m[2] }));
const proseLines = lines.map((line) => (/^#{1,6}\s/.test(line) ? '' : line));
const prose = proseLines.join('\n');
const plain = prose.replace(/`[^`]*`/g, 'code');

// Paragraphs and list items, then sentences.
function units(text) {
  const out = [];
  let current = [];
  for (const line of text.split('\n')) {
    if (!line.trim()) { if (current.length) out.push(current.join(' ')); current = []; continue; }
    if (/^\s*(?:[-*+]|\d+[.)])\s+/.test(line)) { if (current.length) out.push(current.join(' ')); current = [line.replace(/^\s*(?:[-*+]|\d+[.)])\s+/, '')]; continue; }
    current.push(line.trim());
  }
  if (current.length) out.push(current.join(' '));
  return out;
}
const sentences = (unit) => unit.split(/(?<=[.!?]["')\]]?)\s+(?=["'(\[]?[A-Z0-9])/).map((s) => s.trim()).filter(Boolean);

function section(name) {
  const out = [];
  let inside = false;
  for (const line of lines) {
    const m = /^(#{1,6})\s+(.*?)\s*$/.exec(line);
    if (m) { inside = m[2].trim().toLowerCase() === name.toLowerCase(); continue; }
    if (inside) out.push(line);
  }
  return out.join('\n');
}

test('section layout', () => {
  const h1 = headings.filter((h) => h.level === 1);
  assert.equal(h1.length, 1, 'expected one title');
  const rest = headings.filter((h) => h.level > 1).map((h) => `${'#'.repeat(h.level)} ${h.text}`);
  assert.deepEqual(rest, ['## Summary', '## Impact', '## Timeline', '## Root cause', '## Resolution', '## Action items']);
});

test('opening section', () => {
  const summary = units(section('Summary').replace(/`[^`]*`/g, 'code')).flatMap(sentences);
  assert.ok(summary.length >= 2 && summary.length <= 4, `opening has ${summary.length} sentences`);
  const text = summary.join(' ');
  assert.match(text, /14:02 UTC/);
  assert.match(text, /14:40 UTC/);
  assert.match(text, /1,187|4,312/);
});

test('sentence length', () => {
  const long = units(plain).flatMap(sentences).filter((s) => (s.match(/\S+/g) ?? []).length > 25);
  assert.equal(long.length, 0, `${long.length} sentences too long`);
});

test('times of day', () => {
  const bare = [...plain.matchAll(/\b\d{1,2}:\d{2}\b(?!\s*UTC)/g)].map((m) => m[0]);
  assert.deepEqual(bare, []);
});

test('word choice', () => {
  assert.doesNotMatch(plain, /\busers?\b/i);
});

test('abbreviations', () => {
  for (const short of ['PSP', 'TTL', 'CI', 'SRE']) {
    const first = new RegExp(`\\b${short}\\b`).exec(plain);
    if (!first) continue;
    const before = plain.slice(0, first.index);
    const after = plain.slice(first.index + short.length);
    assert.ok(/[A-Za-z][\w -]*\s\($/.test(before) && after.startsWith(')'), `${short} at first use`);
  }
});

test('blameless', () => {
  assert.doesNotMatch(plain, /\b(?:Priya|Okafor|Tomas|Reyes)\b/);
});
