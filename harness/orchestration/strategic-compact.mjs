#!/usr/bin/env node
// PostToolUse hook. Tracks the number of tool calls made in the current
// session and, at ~50-call intervals, suggests running `/compact` to
// preserve context capacity.
//
// State is kept in a per-session file under /tmp. Silent unless a
// compact is due.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const sessionId = process.env.CLAUDE_SESSION_ID ?? 'local';
const stateDir = join(tmpdir(), 'brg-harness');
const stateFile = join(stateDir, `${sessionId}.json`);

if (!existsSync(stateDir)) {
  mkdirSync(stateDir, { recursive: true });
}

let state = { count: 0, lastSuggestion: 0 };
try {
  if (existsSync(stateFile)) {
    state = JSON.parse(readFileSync(stateFile, 'utf8'));
  }
} catch {
  // fresh state
}

state.count += 1;

const INTERVAL = 50;
const shouldSuggest = state.count - state.lastSuggestion >= INTERVAL;

if (shouldSuggest) {
  state.lastSuggestion = state.count;
  writeFileSync(stateFile, JSON.stringify(state));
  process.stdout.write(
    [
      `Heads up: ~${state.count} tool calls into this session.`,
      'Consider running `/compact` to preserve context capacity.',
    ].join('\n'),
  );
  process.exit(0);
}

writeFileSync(stateFile, JSON.stringify(state));
process.exit(0);
