#!/usr/bin/env node
// PreToolUse hook for Bash.
// Enforces the repo's hard rules mechanically by blocking dangerous or
// policy-violating shell commands before they run. Claude Code sees the
// non-zero exit and will not execute the command.

import { readFileSync } from 'node:fs';

let payload = {};
try {
  payload = JSON.parse(readFileSync(0, 'utf8'));
} catch {
  process.exit(0);
}

const rawCommand = payload?.tool_input?.command ?? '';
if (!rawCommand) {
  process.exit(0);
}

// Normalize: strip git global options (e.g. -c key=value, --no-pager, -C path)
// that appear between `git` and the subcommand, so rules reliably match.
// Also strip quotes around flag-like tokens so "—force" is caught.
const command = rawCommand
  .replace(
    /\bgit\s+((?:(?:-[cC]\s+(?:\S*'[^']*'\S*|\S*"[^"]*"\S*|\S+)|--[a-z-]+(?:=\S+)?|-[a-zA-Z])\s+)+)/g,
    'git ',
  )
  .replace(/["'](-{1,2}[a-zA-Z][a-zA-Z-]*)["']/g, '$1');

const rules = [
  {
    pattern: /git\s+push\s+(?:.*\s+)?(?:origin\s+)?(?:(?:\S+:)?(?:refs\/heads\/)?)?main(?:\s|$)/,
    message: 'Blocked: `git push … main`. Hard rule: never push directly to main. Branch → PR → merge.',
  },
  {
    pattern: /git\s+push\s+(?:.*\s)?(?:--force(?!-with-lease)|-[a-z]*f[a-z]*)(?:\s|$)/,
    message: 'Blocked: `git push --force`. Use `--force-with-lease` if you must, and never to main.',
  },
  {
    pattern: /git\s+push\s+(?:.*\s)?(?:--all|--mirror)(?:\s|$)/,
    message: 'Blocked: `git push --all/--mirror`. These push all branches including main. Push specific branches.',
  },
  {
    pattern: /git\s+reset\s+--hard/,
    message: 'Blocked: `git reset --hard`. Use `git stash` + targeted `git checkout -- <file>` instead.',
  },
  {
    pattern: /\brm\s+(?:(?:-[a-zA-Z]+|--[a-zA-Z-]+)\s+)*(?:--\s+)?(?:\.\/)?["']?(?:src|public|scripts|harness|\.claude)["']?(?:\/|\s|$)/,
    message: 'Blocked: `rm -rf` on a protected directory. If you really mean to delete, do it through a targeted `git rm`.',
  },
  {
    pattern: /^\s*npm\s+publish/,
    message: 'Blocked: `npm publish`. This repo is not an npm package.',
  },
  {
    pattern: /git\s+(?:commit|rebase).*--no-verify/,
    message: 'Blocked: `--no-verify`. Fix the failing hook instead of bypassing it.',
  },
];

for (const { pattern, message } of rules) {
  if (pattern.test(command)) {
    process.stderr.write(`${message}\n`);
    process.exit(2);
  }
}

process.exit(0);
