# Blode UI

Component library and documentation site built with Next.js 16, React 19, Tailwind CSS v4, Base UI, and shadcn/ui patterns.

## Commands

- **Dev server**: `npm run dev` (uses Turbopack)
- **Build**: `npm run build` (runs content-collections + registry build + Next.js build)
- **Type check**: `npm run typecheck` (runs `build:docs` first, then `tsc --noEmit`)
- **Lint/format**: `npm run fix` or `npm exec -- ultracite fix`
- **Check**: `npm run check` or `npm exec -- ultracite check`
- **Build registry only**: `npm run build:registry`

## Setup

```bash
npm install  # Node >= 20.6.1 required
npm run dev
```

## Project Structure

- `registry/default/base/` — Design-system payloads emitted as `registry:base` items
- `registry/default/fonts/` — Font registry (currently empty; Glide uses `next/font/local`)
- `registry/default/ui/` — Component source files (shadcn-style registry)
- `registry/default/examples/` — Example/demo components
- `registry/default/hooks/` — Shared hooks distributed as `registry:lib`
- `registry/default/lib/` — Shared utilities (e.g., `utils.ts` with `cn()`)
- `registry/index.ts` — Main registry manifest combining base, fonts, UI, hooks, lib, and examples
- `content/docs/` — MDX documentation pages
- `scripts/build-registry.mts` — Builds JSON registry into `public/r/` using ts-morph
- `styles/globals.css` — Tailwind v4 global styles and design tokens

## Key Conventions

- **Registry pattern**: Registry items are assembled from `registry/default/base/`, `fonts/`, `ui/`, `hooks/`, `lib/`, and `examples/` via `_registry.ts` files combined by `registry/index.ts`. Run `npm run build:registry` after adding or changing registry items.
- **React 19**: Use ref as a prop directly — do NOT use `React.forwardRef`.
- **Tailwind v4**: Uses `@import "tailwindcss"` with CSS custom properties for design tokens. No `tailwind.config.js`.
- **Icons**: Use `blode-icons-react` — don't install other icon libraries.
- **Base UI primitives**: Components wrap Base UI. Preserve Base UI's accessibility patterns (proper `aria-*` attributes, keyboard navigation).
- **CVA + tailwind-merge**: Use `cva` for variant definitions and `cn()` (from `registry/default/lib/utils.ts`) for class merging. `cn` is `twMerge(clsx(...))`.
- **Content collections**: MDX docs use `@content-collections/core`. Two collections: `documents` (docs) and `pages`.

## Gotchas

- IMPORTANT: Do NOT run `tsc --noEmit` directly — it will fail without content-collections build artifacts. Use `npm run typecheck` instead, which builds docs first.
- New components must be added to the auto-generated `_registry.ts` files and follow the shadcn schema (type, files, dependencies, registryDependencies).
- The registry build filters items by type whitelist: `registry:ui`, `registry:lib`, `registry:block`, `registry:base`.
- `registry:base` items can ship without source files.
- Content-collections must be built before the Next.js build — `npm run build` handles the ordering automatically.
- Dark mode uses a custom variant: `@custom-variant dark (&:where(.dark, .dark *))` — not Tailwind's built-in dark mode.
- A `200` from `blode.co/ui/...` does not mean the path exists. Unmatched routes fall through to the docs site's HTML catch-all, so soft 404s look like successes. Check `content-type` is `application/json`.

## Authoring the `@blode/ui` design-system item

`registry/default/base/_registry.ts` is what consumers install to get Blode's tokens. It breaks in ways that fail silently in someone else's project, so treat these as hard rules.

- **Never set `config.style`.** The CLI interpolates it into the hardcoded `@shadcn` template `https://ui.shadcn.com/r/styles/{style}/{name}.json`, so a Blode-specific name 404s on `init` against a registry we don't control. Reproduced on shadcn 4.13.0.
- **`cssVars` keys are unprefixed** — `"field-height": "48px"`, not `"--field-height"`. The CLI adds the `--`.
- **`cssVars.theme` → `@theme inline`** for scalars (the `--field-*` metrics, the `--shadow-*` scale). **`cssVars.light`/`dark` → `:root`/`.dark`** for colors.
- **Color values must be literal** (`oklch(0.98 0 0)`), never `var(--foreground)` indirection. The CLI only generates the matching `@theme inline` `--color-*` entry for values it can parse as a color, so indirection silently kills the utility class.
- **Do ship the `--radius-*` scale.** Blode uses linear offsets (`calc(var(--radius) + 8px)`), not shadcn's multiplicative scale. They agree at the default radius and diverge above it, so the override has to reach consumers or their geometry drifts from the docs site.
- The registry `name` in `registry/index.ts` must stay a bare token matching the `@blode` namespace. shadcn's directory pairs the two (`7ovr` → `@7ovr`); a slashed value doesn't resolve.
- Verify a change to this item by `shadcn add`-ing it into a scratch project and grepping the resulting CSS, not by reading the emitted JSON.
- **`npm run build:registry` does not fail on a broken `_registry.ts`.** It prints `Done` and leaves stale or partial JSON in `public/r/`. A misplaced brace once nested `cssVars` inside a `css` media query, and `tsc`/`ultracite` both passed because `css` is typed as a recursive record. After editing this file, confirm the emitted shape:
  ```bash
  node -e "const j=require('./public/r/ui.json');console.log(Object.keys(j), Object.keys(j.cssVars||{}))"
  ```
  `cssVars` must list `theme`, `light`, `dark` at the top level.

## Registry directory

`@blode` is not yet listed in shadcn's directory (the PR to `shadcn-ui/ui` is open, unmerged), so `shadcn add @blode/button` cannot resolve on its own and all install docs must keep the `registry add` step. Confirm current state before changing them:

```bash
curl -s https://ui.shadcn.com/r/registries.json | grep -c blode
```

Requirements if review comes back: open source, valid schema, flat registry (`/registry.json` and `/{name}.json` at the registry root), and no `content` inlined in `registry.json`'s `files` arrays. The legacy `/r/styles/default/` mirror is the most likely objection; 77 component docs still point at it, and every one has a working flat equivalent.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
