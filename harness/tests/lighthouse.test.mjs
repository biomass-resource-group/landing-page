import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const validator = new URL('../../scripts/validate-lighthouse.mjs', import.meta.url);
const categories = ['performance', 'accessibility', 'best-practices', 'seo'];
const report = () => ({ categories: Object.fromEntries(categories.map((key) => [key, { score: 1 }])) });

function run(reports, raw = false) {
  const directory = mkdtempSync(join(tmpdir(), 'brg-lighthouse-'));
  try {
    const paths = reports.map((value, index) => {
      const path = join(directory, `${index}.json`);
      writeFileSync(path, raw ? value : JSON.stringify(value));
      return path;
    });
    return spawnSync(process.execPath, [validator.pathname, ...paths], {
      encoding: 'utf8', timeout: 5000,
    });
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

test('preserves the inclusive performance threshold and one noisy sample', () => {
  const reports = [report(), report(), report()];
  [0.1, 0.9, 1].forEach((score, index) => { reports[index].categories.performance.score = score; });
  assert.equal(run(reports).status, 0);
});

test('rejects two low performance samples', () => {
  const reports = [report(), report(), report()];
  reports[0].categories.performance.score = 0.89;
  reports[2].categories.performance.score = 0.89;
  assert.equal(run(reports).status, 1);
});

test('requires every compliance sample to meet the unchanged threshold', () => {
  for (const category of categories.slice(1)) {
    for (let index = 0; index < 3; index += 1) {
      const reports = [report(), report(), report()];
      reports[index].categories[category].score = 0.99;
      assert.equal(run(reports).status, 1, `${category} report ${index}`);
    }
  }
});

test('rejects malformed scores in every category and report position', () => {
  for (const category of categories) {
    for (let index = 0; index < 3; index += 1) {
      for (const value of [undefined, null, '1', 'not-a-number', true, {}, [], -0.1, 1.1]) {
        const reports = [report(), report(), report()];
        reports[index].categories[category].score = value;
        const result = run(reports);
        assert.equal(result.status, 1, `${category} report ${index}: ${JSON.stringify(value)}`);
        assert.match(result.stderr, /finite numeric score/);
      }
    }
  }
});

test('rejects missing categories, missing category maps and runtime errors', () => {
  for (let index = 0; index < 3; index += 1) {
    for (const category of categories) {
      const reports = [report(), report(), report()];
      delete reports[index].categories[category];
      assert.equal(run(reports).status, 1);
    }
    for (const value of [null, [], {}, { runtimeError: { code: 'NO_FCP' } }]) {
      const reports = [report(), report(), report()];
      reports[index] = value;
      assert.equal(run(reports).status, 1);
    }
    const reports = [report(), report(), report()];
    reports[index].runtimeError = { code: 'NO_FCP' };
    assert.equal(run(reports).status, 1);
  }
});

test('rejects nonfinite JSON numbers and incomplete report sets', () => {
  for (const value of ['1e999', '-1e999']) {
    for (const category of categories) {
      const serialized = JSON.stringify(report());
      const malformed = serialized.replace(`"${category}":{"score":1}`, `"${category}":{"score":${value}}`);
      for (let index = 0; index < 3; index += 1) {
        const reports = [serialized, serialized, serialized];
        reports[index] = malformed;
        assert.equal(run(reports, true).status, 1);
      }
    }
  }
  for (const count of [0, 1, 2, 4]) {
    assert.equal(run(Array.from({ length: count }, report)).status, 1);
  }
  assert.equal(run(['{', '{}', '{}'], true).status, 1);
});
