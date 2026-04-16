# git-workflow.md

Rules for every commit and PR on this repo.

## Branching

- `main` is the integration branch. CI + Cloudflare Pages deploy from it.
- **Never push directly to `main`.** Always work on a feature branch.
- Feature branches: `claude/<kebab-topic>` or `fix/<kebab-topic>` or
  `feat/<kebab-topic>`. Topic is 3-5 words, kebab-case.
- Dependabot branches are managed by Dependabot — don't rename.

## Commits

- Use conventional-commit prefixes: `feat:`, `fix:`, `chore:`, `docs:`,
  `refactor:`, `test:`.
- Subject ≤ 72 chars, imperative mood ("add", not "added").
- Body explains **why**, not what. What is visible in the diff.
- Co-author trailers only if another agent / human did real work.
- Don't commit `dist/`, `.astro/`, `node_modules/`. `.gitignore` covers these.
- Don't commit secrets, `.env`, Cloudflare tokens.

## Pre-commit

Before committing, run locally:

```bash
npm run check && npm run build && npm run validate:dist
```

If any fails, fix before committing. Don't commit "WIP" unless you
immediately squash before opening the PR.

## Pushing

- `git push -u origin <branch>` on first push. `git push` thereafter.
- Retry up to 4× with exponential backoff (2s, 4s, 8s, 16s) on network
  errors. Do **not** retry on 403s — that indicates a permissions issue.
- Never `--force` to `main`. Never `--no-verify`.

## Pull requests

- Title ≤ 70 chars. Use the commit-style prefixes.
- Body structure:
  - `## Summary` — 1-3 bullets, operator-level "what and why"
  - `## Test plan` — checkbox list of local + CI checks
  - Session link trailer (added automatically when the harness opens the PR).
- Tag reviewers only if a review is actually needed. CI + Cloudflare Pages
  + auto-reviewers (Copilot, Codex) cover most changes.
- Merge via **squash** — the branch's internal commit history rarely
  matters for this repo.
- After merge, delete the branch. The repo has "Automatically delete head
  branches" on — it happens on its own.

## Responding to reviews

- Copilot / Codex bot review comments: investigate each before acting.
  Fix legitimate issues; ignore / explain when wrong.
- Don't amend published commits; add follow-up commits instead.
- Don't silently close a PR without a comment explaining the decision.
