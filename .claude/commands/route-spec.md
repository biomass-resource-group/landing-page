---
description: Generate a fresh acceptance-criteria spec for a single route — useful when planning a redesign before any implementation.
argument-hint: "<route path e.g. /about/>"
allowed-tools: Agent, Read, Glob, Grep
---

You produce a clean spec for a single route. No code changes.

## Steps

1. Read the route source: `src/pages/<slug>.astro`.
2. Read the corresponding data sections in `src/data/site.ts`.
3. Read shared components in `src/components/` referenced by the route.
4. Dispatch `site-planner` with the brief: "Produce a baseline acceptance
   spec for the existing $ARGUMENTS route, then list the most likely
   improvement opportunities ordered by user impact."
5. Hand the spec to the user.

The user can then run `/improve "<request>"` referencing this spec.
