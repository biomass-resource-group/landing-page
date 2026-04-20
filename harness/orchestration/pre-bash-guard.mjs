#!/usr/bin/env node
// PreToolUse hook for Bash.
// Enforces the repo's hard rules mechanically by blocking dangerous or
// policy-violating shell commands before they run. Claude Code sees the
// non-zero exit and will not execute the command.

import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

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
// Also strip quotes around flag-like tokens so "--force" is caught.
const command = rawCommand
  .replace(
    /\bgit\s+((?:(?:-[cC]\s+(?:\S*'[^']*'\S*|\S*"[^"]*"\S*|\S+)|--(?:exec-path|git-dir|work-tree|namespace|config-env)\s+(?:\S*'[^']*'\S*|\S*"[^"]*"\S*|\S+)|--[a-z-]+=(?:\S*'[^']*'\S*|\S*"[^"]*"\S*|\S+)|--[a-z-]+|-[a-zA-Z])\s+)+)/g,
    'git ',
  )
  .replace(/["'](-{1,2}[a-zA-Z][a-zA-Z-]*)["']/g, '$1');

// Collapse escaped newlines (bash line continuations) before splitting.
const collapsed = command.replace(/\\\n/g, '');

// Strip single-quoted strings before extraction (single quotes prevent expansion in bash).
const forExtraction = collapsed.replace(/'[^']*'/g, "''");

// Extract command substitutions ($(...) and `...`) recursively.
// Use forExtraction (single quotes stripped) for $() and backticks.
// Use collapsed (original) for shell -c and eval which intentionally read quoted payloads.
const substitutions = [];
const extractExpansions = (text) => {
  for (const m of text.matchAll(/\$\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g)) {
    substitutions.push(m[1]);
    extractExpansions(m[1]);
  }
  for (const m of text.matchAll(/`([^`]+)`/g)) {
    substitutions.push(m[1]);
    extractExpansions(m[1]);
  }
  for (const m of text.matchAll(/[<>]\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g)) {
    substitutions.push(m[1]);
    extractExpansions(m[1]);
  }
};
extractExpansions(forExtraction);

// Shell -c and eval payloads (run on original to capture quoted args).
for (const m of collapsed.matchAll(/(?:bash|sh|zsh)\s+(?:-[a-zA-Z]*c[a-zA-Z]*)\s+(?:"([^"]+)"|'([^']+)')/g)) {
  substitutions.push(m[1] || m[2]);
}
for (const m of collapsed.matchAll(/\beval\s+(?:"([^"]+)"|'([^']+)')/g)) {
  substitutions.push(m[1] || m[2]);
}

// Strip quoted strings before splitting so separators inside quotes don't cause false splits.
// Use equal-length placeholders so indices stay aligned with `collapsed`.
const forSplitting = collapsed.replace(/"[^"]*"|'[^']*'/g, (m) => 'x'.repeat(m.length));

// Split on shell separators to get individual command segments.
const rawSegments = [];
const splitPositions = [...forSplitting.matchAll(/;|&&|\|\||\n|&|[|]/g)].map(m => m.index);
let prev = 0;
for (const pos of splitPositions) {
  rawSegments.push(collapsed.slice(prev, pos));
  prev = pos + forSplitting.slice(pos).match(/^(?:;|&&|\|\||\n|&|[|])/)[0].length;
}
rawSegments.push(collapsed.slice(prev));
rawSegments.push(...substitutions);

const stripQuotes = (s) => s.replace(/(?<=^|\s)["']([^"']+)["'](?=\s|$)/g, '$1');
const stripPrefixes = (s) => s.replace(
  /^\s*(?:case\s+\S+\s+in\s+|\S+\)\s*|(?:\S+=(?:"[^"]*"|'[^']*'|\S+)\s+)+|env\s+(?:(?:-[CuS]\s+\S+|-\S+)\s+)*(?:\S+=(?:"[^"]*"|'[^']*'|\S+)\s+)*|command\s+(?:-\S+\s+)*|exec\s+(?:-\S+\s+)*|sudo\s+(?:(?:-[uUgGhrtTpAC]\s+\S+|-\S+)\s+)*|nohup\s+|time\s+|builtin\s+|if\s+.*?;\s*then\s+|while\s+.*?;\s*do\s+|do\s+|then\s+|else\s+)*/,
  '',
).replace(/^[(){}\s!]+|[(){}]+$/g, '')
  // Normalize absolute paths and backslash escapes.
  .replace(/^\/\S*\/(\w+)/, '$1')
  .replace(/^\\(\w)/, '$1')
  .trim();
const segments = rawSegments.map(s => stripPrefixes(s)).filter(Boolean);

// Detect bare `git push` (no refspec) when on main.
let currentBranch = '';
try {
  const repoRoot = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
  currentBranch = execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
    cwd: repoRoot, encoding: 'utf8', timeout: 3000,
  }).trim();
} catch { /* not in a git repo or git not available — skip branch check */ }

const rules = [
  {
    pattern: /^git\s+push\s+(?:.*\s+)?(?:origin\s+)?\+?(?::?(?:\S*:)?(?:refs\/heads\/)?)?main(?:\s|$|[;&|><])/,
    message: 'Blocked: `git push … main`. Hard rule: never push directly to main. Branch → PR → merge.',
  },
  ...(currentBranch === 'main' ? [{
    pattern: /^git\s+push(?:\s+(?:-[a-zA-Z]+|--[a-z-]+))*(?:\s+\S+)?(?:\s+HEAD)?\s*$/,
    message: 'Blocked: bare `git push` while on main. Check out a feature branch first.',
  }] : []),
  {
    pattern: /^git\s+push\s+(?:.*\s)?(?:--force(?!-with-lease)|-[a-z]*f[a-z]*)(?:\s|$|[;&|><])/,
    message: 'Blocked: `git push --force`. Use `--force-with-lease` if you must, and never to main.',
  },
  {
    pattern: /^git\s+push\s+(?:.*\s)?\+\S/,
    message: 'Blocked: `git push +<refspec>` (force via refspec prefix). Use `--force-with-lease` if you must.',
  },
  {
    pattern: /^git\s+push\s+(?:.*\s)?(?:--all|--mirror)(?:\s|$|[;&|><])/,
    message: 'Blocked: `git push --all/--mirror`. These push all branches including main. Push specific branches.',
  },
  {
    pattern: /^git\s+reset\s+(?:\S+\s+)*--hard/,
    message: 'Blocked: `git reset --hard`. Use `git stash` + targeted `git checkout -- <file>` instead.',
  },
  {
    pattern: /^rm\s+.*(?:\b(?:src|public|scripts|harness)|\.claude)(?:\/|\s|$|[;&|><"'*?])/,
    message: 'Blocked: `rm -rf` on a protected directory. If you really mean to delete, do it through a targeted `git rm`.',
  },
  {
    pattern: /^npm\s+publish/,
    message: 'Blocked: `npm publish`. This repo is not an npm package.',
  },
  {
    pattern: /^git\s+(?:(?:commit).*(?:--no-verify|-[a-zA-Z]*n[a-zA-Z]*(?:\s|$))|(?:rebase|push|merge|cherry-pick).*--no-verify)/,
    message: 'Blocked: `--no-verify`. Fix the failing hook instead of bypassing it.',
    preprocess: (s) => s.replace(/(?:-[mMcCFt]|--(?:message|reuse-message|reedit-message|fixup|squash|file|template))[=\s]+(?:"[^"]*"|'[^']*'|\S+)/g, ''),
  },
];

for (const segment of segments) {
  for (const { pattern, message, preprocess } of rules) {
    const preprocessed = preprocess ? preprocess(segment) : segment;
    const text = stripQuotes(preprocessed);
    if (pattern.test(text)) {
      process.stderr.write(`${message}\n`);
      process.exit(2);
    }
  }
}

process.exit(0);
