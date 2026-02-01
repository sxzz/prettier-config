# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Shareable Prettier config (`@sxzz/prettier-config`). Single-file ESM package — no build step. The entire config lives in `index.js` and ships directly to npm alongside `index.d.ts`.

## Commands

- `pnpm lint` — ESLint with caching
- `pnpm format` — Prettier format all files
- `pnpm typecheck` — Type-check via `tsgo --noEmit`
- `pnpm release` — Version bump via `bumpp`

There is no build (`pnpm build` is a no-op) and no test suite.

## Architecture

**`index.js`** — The entire config. Exports a `Config` object with:

- Core rules: no semicolons, single quotes, trailing commas, 2-space indent (Prettier default)
- `overrides` array to skip formatting generated/vendored files via `requirePragma`
- `plugins` array built dynamically — always includes `@prettier/plugin-oxc`, conditionally adds framework-specific plugins via auto-detection

**Auto-detection pattern**: `tryResolve(pkg)` attempts `import.meta.resolve()` for a framework package (e.g., `astro`). If the framework is found in the consumer's project, the corresponding prettier plugin is added to the plugins array. The plugins themselves are listed as `dependencies` so they ship with the package.

**Plugin resolution**: Uses `fileURLToPath(import.meta.resolve('...'))` to resolve plugin paths. Do not pass imported module objects directly — the path-based approach is intentional.

## Publishing

- Only `index.js` and `index.d.ts` are published (see `files` in package.json)
- Scoped package published publicly (`publishConfig.access: "public"`)
- Release workflow triggers on tag push via GitHub Actions using `sxzz/workflows`
- Renovate auto-updates non-major dependencies
