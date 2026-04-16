#!/usr/bin/env node
// SessionStart hook for the BRG site harness.
// Loads recent commit history, current routes, and the UI/UX scorecard
// summary so Claude has immediate operating context.
//
// Output is consumed by Claude Code as additional context. Keep it short
// and high-signal. Anything verbose belongs in CLAUDE.md, not here.

import { execSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = process.cwd();
const lines = [];

const safeExec = (command) => {
  try {
    return execSync(command, { cwd: repoRoot, encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
};

lines.push('## BRG site session context');
lines.push('');

const branch = safeExec('git rev-parse --abbrev-ref HEAD');
const status = safeExec('git status --short');
lines.push(`- Branch: \`${branch || 'unknown'}\``);
lines.push(`- Working tree: ${status ? 'dirty' : 'clean'}`);

const recentCommits = safeExec('git log --oneline -5');
if (recentCommits) {
  lines.push('- Recent commits:');
  for (const commit of recentCommits.split('\n')) {
    lines.push(`  - ${commit}`);
  }
}

const pagesDir = join(repoRoot, 'src', 'pages');
if (existsSync(pagesDir)) {
  const routes = readdirSync(pagesDir)
    .filter((entry) => entry.endsWith('.astro') && entry !== '404.astro')
    .map((entry) => {
      const page = entry.replace(/\.astro$/, '');
      if (page === 'index') return '/';
      const route = `/${page}`.replace(/\/index$/, '');
      return route.endsWith('/') ? route : `${route}/`;
    });
  if (routes.length > 0) {
    lines.push(`- Routes in scope: ${routes.join(', ')}`);
  }
}

if (existsSync(join(repoRoot, 'dist'))) {
  lines.push('- `dist/` is present — `validate:dist` is runnable without rebuilding.');
} else {
  lines.push('- `dist/` is absent — run `npm run build` before `validate:dist`.');
}

lines.push('');
lines.push('Pipeline entrypoint: `/improve "<request>"`');
lines.push('Audit entrypoint: `/audit all`');

process.stdout.write(lines.join('\n'));
