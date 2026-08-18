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
- `DESIGN.md` — the design direction document, published at `blode.co/ui/design.md` by `scripts/build-design-md.mjs`. Edit the root file; `public/design.md` is generated.

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

## Design-system rules that fail silently

Verified this session with fontTools and measured contrast; do not undo them without re-measuring.

- **Dark-mode semantic fills carry a near-black ink, never white.** `--destructive`, `--success`, and `--warning` all brighten in dark mode, where white scores 2.89, 2.22, and 2.10 against a 4.5 floor. The 950-weight inks give 5.60, 6.74, 7.60. Light mode is the reverse except for warning, which is near-black in both because yellow carries white at no usable saturation.
- **`tabular-nums` does nothing on Glide Sans.** It ships zero OpenType features and proportional figures (digit `1` is 353 units against `0` at 620), so counters and columns jitter. Use the `tabular-figures` utility, which borrows the genuinely monospaced Glide Mono.
- **Glide Mono is static 400.** With `font-synthesis-weight: none` set globally, `font-mono font-medium` silently renders 400. The class is inert, not subtle.
- **Reduced motion is handled once, globally**, in `styles/globals.css` and shipped via `@blode/ui`. Do not add per-component `motion-reduce:` variants; only 6 of 26 moving components ever had them, which is why it moved to the stylesheet.
- **No `transition-all`.** List the properties. Upstream shadcn uses it in eight components; Blode deliberately does not.
- **No raw Tailwind palette colours in components.** Every semantic fill and neutral resolves to a token. Only the `*Secondary` wash tints (50/100/950) still use the ramp, deliberately.
- **Paired elements share timing.** A dialog's overlay and panel both run 200ms; sheet and drawer both run 500 open / 300 close. A tooltip's arrow shares the popup's surface token, or the two desync in dark mode.

## Deliberate divergences from shadcn

Do not "fix" these back toward upstream.

- **Linear radius scale.** `calc(var(--radius) + 8px)`, not shadcn's `* 1.8`. Identical at the default radius; at `--radius: 16px` shadcn inflates `4xl` to 41.6px where Blode holds 32px. Shipped via `@blode/ui` so it overrides what the CLI writes at init.
- **A three-colour semantic set.** shadcn has only `--destructive`; Blode adds `--success` and `--warning` with foreground pairs in both themes.
- **Explicit transition property lists**, where upstream ships `transition-all`.
- **A global reduced-motion guarantee**, which upstream has none of.

## Registry directory

`@blode` is not yet listed in shadcn's directory, so `shadcn add @blode/button` cannot resolve on its own and all install docs must keep the `registry add` step. Confirm current state before changing them:

```bash
curl -s https://ui.shadcn.com/r/registries.json | grep -c blode
```

Submission history, because this has now been wrong in this file twice:

- [#10340](https://github.com/shadcn-ui/ui/pull/10340), Apr 2026. Closed by Matthew in Jul 2026, not by a maintainer: it drew no review and no objection. It also submitted the wrong name (`@blode-ui`) and the vanity host (`ui.blode.co`).
- [#11543](https://github.com/shadcn-ui/ui/pull/11543), Aug 2026. Same entry with `@blode` and `https://blode.co/ui`. #10340 could not be reopened because its fork had been deleted.

Checked Aug 2026 against the 280 live entries: every one carries a `logo`, and `author` is optional. Entries sort alphabetically, so `@blode` sits between `@blockus` and `@boldkit`.

Requirements if review comes back: open source, valid schema, and no `content` inlined in `registry.json`'s `files` arrays. Verified: `registry.json` serves 161 items with `$schema` and no inlined content. The "flat registry at the root" requirement is not enforced in practice, since neither `@7ovr` nor `@23rd` serves a root `/registry.json`. The legacy `/r/styles/default/` mirror is still the most likely objection; 77 component docs point at it, and every one has a working flat equivalent.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
