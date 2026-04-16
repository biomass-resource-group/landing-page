#!/usr/bin/env node
// SessionEnd hook. Fires when a Claude Code session ends (user exits,
// not mid-response stop).
//
// Emits a short summary of the session's material output:
//   - commits on the current branch not yet in main
//   - current branch
//   - any uncommitted files under watched paths
//
// Useful as a "did we ship what we meant to ship?" mirror at session
// close.

import { execSync } from 'node:child_process';

const repoRoot = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();

const safeExec = (command) => {
  try {
    return execSync(command, { cwd: repoRoot, encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
};

const branch = safeExec('git rev-parse --abbrev-ref HEAD');
if (!branch || branch === 'main') {
  process.exit(0);
}

const ahead = safeExec(`git log --oneline main..${branch} 2>/dev/null`);
const dirty = safeExec('git status --porcelain -- src public scripts harness .claude');

const lines = [];
lines.push('## BRG session summary');
lines.push('');
lines.push(`Branch: \`${branch}\``);

if (ahead) {
  const commitCount = ahead.split('\n').filter(Boolean).length;
  lines.push(`Commits ahead of main: ${commitCount}`);
  lines.push('```');
  lines.push(ahead);
  lines.push('```');
} else {
  lines.push('No commits ahead of main yet.');
}

if (dirty) {
  const fileCount = dirty.split('\n').filter(Boolean).length;
  lines.push('');
  lines.push(`⚠ ${fileCount} uncommitted file(s) under src/public/scripts/harness/.claude.`);
  lines.push('Consider `/ship "<summary>"` before closing the session.');
}

process.stdout.write(lines.join('\n'));
process.exit(0);
