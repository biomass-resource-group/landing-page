# typescript/type-safety.md

TypeScript is the repo's correctness backstop. Keep the guarantees
strong.

## Rules

- **No `any`.** Ever. If you need an escape hatch, use `unknown` and
  narrow with a guard. If narrowing is painful, the type is wrong —
  fix the shape.
- **No non-null assertion (`!`)** unless the invariant is adjacent and
  obvious. Prefer early returns or `??`.
- **No `@ts-ignore` / `@ts-expect-error`** without a one-line reason
  comment and a GitHub issue link.
- **`strict: true`** in `tsconfig.json` is load-bearing. Don't relax it.

## Literal types + `as const`

Prefer:

```ts
export const routes = ['/', '/about/', '/platform/'] as const;
export type Route = (typeof routes)[number];
```

over:

```ts
export const routes: string[] = ['/', '/about/', '/platform/'];
export type Route = string;
```

`as const` gives you exhaustive checks for free.

## Discriminated unions

When a value can be one of several shapes, discriminate on a literal:

```ts
type Action =
  | { kind: 'primary'; href: string; label: string }
  | { kind: 'secondary'; href: string; label: string };
```

Avoid `type Action = { kind?: 'primary' | 'secondary'; href?: string; ... }` —
all fields optional is a lie.

## `Record<Route, ...>` for per-route data

Forces exhaustive coverage:

```ts
const perRouteDescription: Record<Route, string> = {
  '/': '…',
  '/about/': '…',
  '/platform/': '…',
  // TS fails if a route is missing.
};
```

## Generics

Use them when they materially help the caller. Don't use them to hide
a messy signature. If a generic takes 3+ type parameters, rethink.

## Exports

- Named exports by default.
- Default exports are fine for Astro components and page frontmatter.
- Never export "everything" (`export * from …`) — it makes the import
  graph opaque and slows `tsc`.

## `any` arrives in …

- Third-party libs without types. Wrap behind a narrow adapter file that
  localizes the `unknown` boundary.
- `JSON.parse` results. Parse with a schema (hand-written narrower or
  Zod if introduced) at the boundary.

If you see `any` anywhere in the diff, ask why before approving.
