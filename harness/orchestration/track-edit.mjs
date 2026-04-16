#!/usr/bin/env node
// PostToolUse hook for Edit/Write.
// Reads the structured tool input from stdin and tracks whether
// validation needs to be re-run because a watched file changed.
//
// Output is silent unless a watched path changed, in which case we
// remind Claude that validation is now pending.

import { readFileSync } from 'node:fs';

const watched = [
  /^src\//,
  /^public\//,
  /^scripts\//,
  /^astro\.config\./,
  /^package(-lock)?\.json$/,
];

let payload = {};
try {
  payload = JSON.parse(readFileSync(0, 'utf8'));
} catch {
  process.exit(0);
}

const path = payload?.tool_input?.file_path ?? '';
if (!path) {
  process.exit(0);
}

const repoRoot = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const relative = path.startsWith(repoRoot)
  ? path.slice(repoRoot.length + 1)
  : path;

const isWatched = watched.some((pattern) => pattern.test(relative));
if (!isWatched) {
  process.exit(0);
}

process.stdout.write(
  [
    `Edited \`${relative}\`. Validation is now pending — run before declaring done:`,
    '',
    '  npm run check && npm run build && npm run validate:dist',
  ].join('\n'),
);
