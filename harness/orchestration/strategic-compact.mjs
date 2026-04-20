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

const rawId = process.env.CLAUDE_SESSION_ID ?? 'local';
const sessionId = rawId.replace(/[^A-Za-z0-9_-]/g, '_');
const stateDir = join(tmpdir(), 'brg-harness');
const stateFile = join(stateDir, `${sessionId}.json`);

if (!existsSync(stateDir)) {
  mkdirSync(stateDir, { recursive: true });
}

const defaultState = { count: 0, lastSuggestion: 0 };
let state = { ...defaultState };
try {
  if (existsSync(stateFile)) {
    const parsed = JSON.parse(readFileSync(stateFile, 'utf8'));
    if (parsed && typeof parsed.count === 'number' && typeof parsed.lastSuggestion === 'number') {
      state = parsed;
    }
  }
} catch {
  // fresh state
}

state.count += 1;

const isOvernight = process.env.BRG_OVERNIGHT === '1';
const INTERVAL = isOvernight ? 30 : 50;
const shouldSuggest = state.count - state.lastSuggestion >= INTERVAL;

if (shouldSuggest) {
  state.lastSuggestion = state.count;
  writeFileSync(stateFile, JSON.stringify(state));
  const urgency = state.count > 150
    ? 'URGENT: Context is likely running low.'
    : 'Heads up:';
  process.stdout.write(
    [
      `${urgency} ~${state.count} tool calls into this session.`,
      isOvernight
        ? 'Persist state to harness/.overnight-state.json, then run `/compact` immediately.'
        : 'Consider running `/compact` to preserve context capacity.',
    ].join('\n'),
  );
  process.exit(0);
}

writeFileSync(stateFile, JSON.stringify(state));
process.exit(0);
