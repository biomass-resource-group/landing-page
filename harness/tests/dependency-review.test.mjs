import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const workflow = readFileSync(new URL('../../.github/workflows/dependency-review.yml', import.meta.url), 'utf8');

function stepScript(name) {
  const lines = workflow.split('\n');
  const start = lines.indexOf(`      - name: ${name}`);
  assert.notEqual(start, -1, `Missing workflow step: ${name}`);
  let run = start + 1;
  while (run < lines.length && lines[run] !== '        run: |') {
    assert.ok(!lines[run].startsWith('      - name:'), `Missing run block: ${name}`);
    run += 1;
  }
  assert.ok(run < lines.length, `Missing run block: ${name}`);
  const script = [];
  for (let index = run + 1; index < lines.length; index += 1) {
    if (lines[index] && !lines[index].startsWith('          ')) break;
    script.push(lines[index].slice(10));
  }
  return script.join('\n');
}

function runStep(name, { status = 0, stdout = '', stderr = '', missingGh = false } = {}) {
  const directory = mkdtempSync(join(tmpdir(), 'brg-dependency-review-'));
  try {
    const output = join(directory, 'outputs');
    const summary = join(directory, 'summary');
    const argumentsFile = join(directory, 'arguments');
    for (const path of [output, summary, argumentsFile]) writeFileSync(path, '');
    if (!missingGh) {
      writeFileSync(join(directory, 'gh'), '#!/bin/bash\nprintf "%s\\n" "$@" > "$ARGUMENTS_FILE"\nprintf "%s" "$FAKE_STDOUT"\nprintf "%s" "$FAKE_STDERR" >&2\nexit "$FAKE_STATUS"\n', { mode: 0o755 });
    }
    const result = spawnSync('/bin/bash', ['-c', stepScript(name)], {
      encoding: 'utf8', timeout: 5000,
      env: {
        PATH: directory,
        RUNNER_TEMP: directory,
        GITHUB_OUTPUT: output,
        GITHUB_STEP_SUMMARY: summary,
        ARGUMENTS_FILE: argumentsFile,
        REPOSITORY: 'example/site', PR_NUMBER: '42',
        BASE_SHA: 'a'.repeat(40), HEAD_SHA: 'b'.repeat(40),
        GH_TOKEN: 'offline-fixture',
        FAKE_STATUS: String(status), FAKE_STDOUT: stdout, FAKE_STDERR: stderr,
      },
    });
    return {
      ...result,
      outputs: readFileSync(output, 'utf8'),
      summary: readFileSync(summary, 'utf8'),
      arguments: readFileSync(argumentsFile, 'utf8').trim().split('\n'),
    };
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

test('classifies manifests and review policy while leaving unrelated changes alone', () => {
  for (const path of ['package.json', 'package-lock.json', '.github/workflows/dependency-review.yml']) {
    const result = runStep('Classify dependency changes', { stdout: `README.md\n${path}\n` });
    assert.equal(result.status, 0);
    assert.equal(result.outputs, 'relevant=true\n');
    assert.deepEqual(result.arguments, ['api', '--paginate', 'repos/example/site/pulls/42/files?per_page=100', '--jq', '.[].filename']);
  }
  for (const stdout of ['', 'README.md\nsrc/pages/index.astro\n']) {
    const result = runStep('Classify dependency changes', { stdout });
    assert.equal(result.status, 0);
    assert.equal(result.outputs, 'relevant=false\n');
  }
});

test('failed or missing changed-files probe never emits an irrelevant success', () => {
  for (const status of [1, 22, 124]) {
    const result = runStep('Classify dependency changes', { status, stdout: 'README.md\n', stderr: 'files probe failed' });
    assert.notEqual(result.status, 0);
    assert.equal(result.outputs, '');
    assert.match(result.stderr, /files probe failed/);
  }
  assert.notEqual(runStep('Classify dependency changes', { missingGh: true }).status, 0);
});

test('successful graph probe uses the unchanged exact endpoint and permits review', () => {
  const result = runStep('Require dependency graph', { stdout: 'private graph response' });
  assert.equal(result.status, 0);
  assert.equal(result.outputs, 'available=true\n');
  assert.deepEqual(result.arguments, ['api', `repos/example/site/dependency-graph/compare/${'a'.repeat(40)}...${'b'.repeat(40)}`, '--silent']);
  assert.match(result.summary, /running the review/);
  assert.doesNotMatch(result.stdout, /private graph response/);
});

test('all graph probe failures fail closed and preserve actual diagnostics', () => {
  for (const status of [1, 2, 22, 124, 137, 255]) {
    const result = runStep('Require dependency graph', { status, stdout: 'private graph response', stderr: `diagnostic-${status}` });
    assert.equal(result.status, 1, `probe status ${status}`);
    assert.equal(result.outputs, 'available=false\n');
    assert.match(result.stderr, new RegExp(`diagnostic-${status}`));
    assert.match(result.summary, /Dependency changes have not been reviewed/);
    assert.doesNotMatch(result.summary, /403|Enable it|review skipped/);
    assert.doesNotMatch(result.stdout, /private graph response/);
  }
  const missing = runStep('Require dependency graph', { missingGh: true });
  assert.equal(missing.status, 1);
  assert.equal(missing.outputs, 'available=false\n');
  assert.match(missing.stderr, /gh: command not found/);
});

test('review remains conditioned on relevance and successful graph admission', () => {
  assert.match(workflow, /if: steps\.changes\.outputs\.relevant == 'true' && steps\.graph\.outputs\.available == 'true'/);
  assert.match(workflow, /uses: actions\/dependency-review-action@a1d282b36b6f3519aa1f3fc636f609c47dddb294/);
  assert.match(workflow, /permissions:\n  contents: read\n  pull-requests: read/);
  assert.match(workflow, /timeout-minutes: 10/);
  assert.doesNotMatch(workflow, /continue-on-error:\s*true/);
});
