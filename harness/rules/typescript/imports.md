# typescript/imports.md

## Order

Within any file, imports are grouped and ordered. Groups separated by
a single blank line:

1. **Framework** — `astro:*`, `node:*` built-ins.
2. **Third-party** — anything from `node_modules`.
3. **Aliased** — `@/…` paths configured in `tsconfig.json` (if any).
4. **Relative** — `./foo`, `../bar`.

Within each group, sort alphabetically by module path.

## No deep relatives

`../../../components/Foo.astro` is a code smell. Either:

- The importer belongs closer to what it imports, or
- Promote to a `@/` alias (declared in `tsconfig.json`'s `paths`).

The repo is small enough that 2 levels of `..` is the practical ceiling.

## Type-only imports

```ts
import type { Props } from './Foo.astro';
```

Not `import { Props } from '…'`. The `type` keyword lets the bundler
strip the import at build time and keeps runtime bundles smaller.

## Side-effect imports

Prefer not. When unavoidable (e.g. importing a CSS file for its side
effects), isolate at the top of the file with a comment:

```ts
import '@/styles/global.css';
```

## Re-exports

Re-export only when a barrel is genuinely helpful — e.g. `src/data/` is
the public API of the data layer. Don't barrel for barrel's sake.

## No circular imports

`tsc` catches many but not all. If you get a runtime `undefined` from a
named import, suspect a cycle first.

## Path resolution

- Astro imports via `.astro` extension required in the specifier.
- TS/JS imports omit the extension.
- Asset imports use the full extension (`.png`, `.svg`, `.woff2`).

## Dynamic imports

- Only for large optional runtime code (almost never for a static site).
- If introduced, add a comment explaining why static import won't do.
