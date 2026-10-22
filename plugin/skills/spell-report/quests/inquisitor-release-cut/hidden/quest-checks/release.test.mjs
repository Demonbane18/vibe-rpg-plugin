import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const read = (file) => readFileSync(file, 'utf8');
const sha = (text) => createHash('sha256').update(text).digest('hex');
const REPO = 'https://github.com/tidepool-labs/tidepool-js';
const NEXT = '3.0.0';
const PREAMBLE = '# Changelog\n\nAll notable changes to tidepool-js are listed here. The project follows [Semantic Versioning](https://semver.org/).\n\n';

function section() {
  const text = read('CHANGELOG.md').replace(/\r\n/g, '\n');
  const start = text.indexOf('## [2.3.1]');
  return { text, start, head: text.slice(0, start) };
}

test('release version', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.deepEqual(pkg, {
    name: 'tidepool-js', version: NEXT, description: 'JavaScript client for the Tidepool API', type: 'module',
    exports: './src/client.mjs', files: ['src'], scripts: { test: 'node --test' }, engines: { node: '>=20' }, license: 'MIT',
  });
  const lock = JSON.parse(read('package-lock.json'));
  assert.deepEqual(lock, {
    name: 'tidepool-js', version: NEXT, lockfileVersion: 3, requires: true,
    packages: { '': { name: 'tidepool-js', version: NEXT, license: 'MIT', engines: { node: '>=20' } } },
  });
  assert.match(read('src/version.mjs'), new RegExp(`^export const VERSION = ['"]${NEXT.replaceAll('.', '\\.')}['"];$`, 'm'));
});

test('other files', () => {
  assert.equal(sha(read('src/client.mjs')), 'e75c0767788e5ca49579261aea4d464f96749454d644726a41b12e024b329c0d');
  assert.equal(sha(read('README.md')), 'c727d9df9f42b3053f6c14e965613f208bcb8a286c9010ef01f399e0b989ce39');
  const { text, start } = section();
  assert.ok(start > 0);
  assert.equal(sha(text.slice(start).trimEnd()), 'c8d69a7a0268f850d82e92eb1943297a039915980020fd29b3b66a5a8973ad43');
});

test('changelog heading', () => {
  const { head } = section();
  assert.ok(head.startsWith(PREAMBLE));
  const entry = head.slice(PREAMBLE.length);
  const m = /^## \[(\d+\.\d+\.\d+)\]\((\S+)\) \((\d{4}-\d{2}-\d{2})\)\n/.exec(entry);
  assert.ok(m, 'heading');
  assert.equal(m[1], NEXT);
  assert.equal(m[2], `${REPO}/compare/v2.3.1...v${NEXT}`);
  assert.ok(!Number.isNaN(Date.parse(m[3])) && m[3] >= '2026-10-17');
  assert.equal(entry.match(/^## /gm).length, 1);
});

function subsections() {
  const entry = section().head.slice(PREAMBLE.length);
  const parts = entry.split(/^### (.+)\n/m);
  const out = {};
  for (let i = 1; i < parts.length; i += 2) out[parts[i].trim()] = parts[i + 1].split('\n').filter((l) => l.trim());
  return { entry, out };
}

test('changelog sections', () => {
  const { entry, out } = subsections();
  assert.deepEqual(Object.keys(out), ['BREAKING CHANGES', 'Features', 'Bug Fixes', 'Performance Improvements']);
  for (const lines of Object.values(out)) for (const line of lines) assert.match(line, /^\* \S/, line);
  const breaking = out['BREAKING CHANGES'].join(' ');
  assert.match(breaking, /timeout/);
  assert.match(breaking, /millisecond/i);
  assert.match(breaking, /node 18|node 20/i);
  assert.match(breaking, /getStation|404|not exist|not found/i);
  assert.doesNotMatch(entry, /device|undici|typo|503|empty result pages|test matrix|merge pull request/i);
});

test('changelog entries', () => {
  const { out } = subsections();
  const expected = {
    Features: [['export', '8f6a1d3'], ['client', '7c2e5a0']],
    'Bug Fixes': [['pagination', '3be7f02'], ['errors', '0b5d7f1'], ['query', 'b6e1f40']],
    'Performance Improvements': [['client', '2d9e4b8']],
  };
  // The stations fix may also be listed under Bug Fixes.
  const optional = out['Bug Fixes']?.find((l) => l.includes('6e3b9d1'));
  if (optional) expected['Bug Fixes'].push(['stations', '6e3b9d1']);
  for (const [name, entries] of Object.entries(expected)) {
    const lines = out[name] ?? [];
    assert.equal(lines.length, entries.length, name);
    for (const [scope, hash] of entries) {
      const line = lines.find((l) => l.includes(hash));
      assert.ok(line, `${name} ${hash}`);
      assert.match(line, new RegExp(`^\\* \\*\\*${scope}:\\*\\* \\S.* \\(\\[${hash}\\]\\(${REPO.replaceAll('.', '\\.')}/commit/${hash}\\)\\)$`), line);
    }
  }
});
