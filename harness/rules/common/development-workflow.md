# development-workflow.md

The default flow for changes. Deviate only with a reason.

## Inbound types

Most changes arrive in one of three shapes:

1. **Stakeholder feedback** — Julie or someone else sends qualitative
   notes (WhatsApp, email, Slack).
2. **Bug / regression** — something broke on the live site.
3. **Dependency / infrastructure bump** — Dependabot, Astro patch,
   security advisory.

## Flow by type

### Stakeholder feedback

```
/incorporate-feedback "<paste>"
  └─ feedback-translator → numbered, prioritized acceptance list
/improve
  └─ site-planner → spec
     visual-designer (optional) → CSS proposal
     astro-implementer → diff
     parallel(ux-reviewer, accessibility-auditor) → scores
     dist-validator → build gate
     git-shipper → commit, push main or PR branch
```

For PR branches, a human reviews the PR + Cloudflare preview and merges when
ready. For direct `main` ships, CI and the production Cloudflare deployment run
from the pushed commit.

### Bug / regression

- Reproduce locally first. If the live site shows the regression but
  `main` builds clean, check the CDN cache + headers before assuming
  code bug.
- For a type / build error, delegate to `build-error-resolver`.
- For a runtime / rendering issue, delegate to `astro-implementer` with
  a tight reproducer.

### Dependency bump

- Patch / minor: auto-merge after CI green (Dependabot).
- Major: pause. Read release notes. Delegate to `architect` if the
  change surface is large. Never merge an Astro major without a full
  audit via `/audit all`.

## Planning altitude

- For a 1-file typo fix, skip planning.
- For anything touching ≥ 2 components or 1 page + 1 data file, start
  with `site-planner` (feedback-driven) or `planner` (open-ended).
- For IA / route structure changes, start with `architect`.

## Shipping cadence

- Small changes: ship as landed.
- Feedback batches: group related items into one PR. Don't fragment —
  review context gets lost.
- Weekly dependency bumps land as one squash-merge if possible.

## Exit conditions

A session ends cleanly when:

- Working tree is clean OR the `stop-reminder` hook has told you to
  `/ship`.
- All watched validations are green or explicitly deferred.
- No half-finished edits (no `TODO:` in shipped code).
