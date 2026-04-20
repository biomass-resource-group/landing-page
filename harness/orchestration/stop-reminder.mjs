#!/usr/bin/env node
// Stop hook. Fires when Claude is about to stop responding.
// If watched directories have uncommitted changes, surface a one-line
// reminder so we don't end a session with unshipped work or
// unvalidated edits sitting in the working tree.

import { execSync } from 'node:child_process';

const repoRoot = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();

const safeExec = (command) => {
  try {
    return execSync(command, { cwd: repoRoot, encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
};

const status = safeExec('git status --porcelain -- src public scripts harness .claude');
if (!status) {
  process.exit(0);
}

const fileCount = status.split('\n').length;
process.stdout.write(
  [
    `Heads up: ${fileCount} file(s) have uncommitted changes.`,
    'If the work is done, run `/ship "<summary>"` to validate, commit, and PR.',
  ].join('\n'),
);
