#!/usr/bin/env node
// Smoke tests for harness hook scripts.
// Run with: node harness/tests/hooks.test.mjs
//
// Tests verify each hook is syntactically valid and runs without error
// under normal conditions (clean repo, no stdin payload).

import { execSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');
const orchestrationDir = join(repoRoot, 'harness', 'orchestration');

const hooks = [
  { name: 'session-context', file: 'session-context.mjs', expectsStdin: false },
  { name: 'stop-reminder', file: 'stop-reminder.mjs', expectsStdin: false },
  { name: 'track-edit', file: 'track-edit.mjs', expectsStdin: true },
  { name: 'pre-bash-guard', file: 'pre-bash-guard.mjs', expectsStdin: true },
  { name: 'strategic-compact', file: 'strategic-compact.mjs', expectsStdin: false },
  { name: 'session-end', file: 'session-end.mjs', expectsStdin: false },
];

let passed = 0;
let failed = 0;

for (const hook of hooks) {
  const scriptPath = join(orchestrationDir, hook.file);
  const stdinPayload = hook.expectsStdin ? '{}' : '';
  const env = {
    ...process.env,
    CLAUDE_PROJECT_DIR: repoRoot,
    CLAUDE_SESSION_ID: 'test-session',
  };

  try {
    execSync(`echo '${stdinPayload}' | node "${scriptPath}"`, {
      cwd: repoRoot,
      env,
      encoding: 'utf8',
      timeout: 10_000,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    console.log(`  PASS  ${hook.name}`);
    passed++;
  } catch (error) {
    if (error.status === 2 && hook.name === 'pre-bash-guard') {
      console.log(`  PASS  ${hook.name} (exit 2 = blocked, expected for empty input)`);
      passed++;
    } else if (error.status === 0) {
      console.log(`  PASS  ${hook.name}`);
      passed++;
    } else {
      console.log(`  FAIL  ${hook.name}: exit ${error.status}`);
      if (error.stderr) console.log(`        stderr: ${error.stderr.slice(0, 200)}`);
      failed++;
    }
  }
}

console.log(`\n${passed} passed, ${failed} failed, ${hooks.length} total`);
process.exit(failed > 0 ? 1 : 0);
