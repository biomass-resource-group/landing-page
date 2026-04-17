#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const guard = resolve(dirname(fileURLToPath(import.meta.url)), '../orchestration/pre-bash-guard.mjs');

const tests = [
  ['git push' + ' -f origin feat/thing', 2, 'short -f blocked'],
  ['git push' + ' -fu origin feat/thing', 2, 'grouped -fu blocked'],
  ['git push --force-with-lease origin feat/thing', 0, '--force-with-lease allowed'],
  ['rm -f' + ' -r src', 2, 'split flags blocked'],
  ['rm -fr public/', 2, 'rm -fr blocked'],
  ['rm --recursive --force "src"', 2, 'long-option rm blocked'],
  ['rm src/', 2, 'bare rm of protected dir blocked'],
  ['rm -rf src-old', 0, 'src-old not blocked'],
  ['git push origin main-fix', 0, 'main-fix not blocked'],
  ['git push origin HEAD:main', 2, 'refspec HEAD:main blocked'],
  ['git push origin HEAD:refs/heads/main', 2, 'refspec refs/heads/main blocked'],
];

let failed = 0;
for (const [cmd, expected, desc] of tests) {
  const r = spawnSync('node', [guard], {
    input: JSON.stringify({ tool_input: { command: cmd } }),
    encoding: 'utf8',
  });
  const ok = r.status === expected;
  console.log(ok ? '  PASS' : '  FAIL', desc, `(exit: ${r.status}, expected: ${expected})`);
  if (!ok) failed++;
}
console.log(`\n${tests.length - failed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
