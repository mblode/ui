# Blode UI

Component library and documentation site built with Next.js 16, React 19, Tailwind CSS v4, Base UI, and shadcn/ui patterns.

## Commands

Node 22.12 or later (vitest and oxlint's floor; Next 16 alone needs 20.9); verified on Node 24.

- `npm install`: also installs the lefthook pre-commit hook
- `npm run dev`: Turbopack dev server through portless. It prints the URL; in a git worktree the host is prefixed with the branch (`https://<branch>.blode-ui.localhost:1355/ui`)
- `npm run build`: content-collections, registry deps check, registry build, well-known skills, `public/design.md`, then the Next.js build
- `npm run typecheck`: runs `build:docs` first, then `tsc --noEmit`
- `npm run check`: registry dependency check, then `ultracite check`
- `npm run fix`: `ultracite fix` over the whole repo; the pre-commit hook already formats staged files
- `npm test`: vitest (`npx vitest run <file> --reporter=dot` for one file)
- `npm run test:instant`: Playwright instant-navigation checks against a production build on port 3200
- `npm run build:registry`: rebuild `public/r/` and `__registry__/` only

## Verification

- `.github/workflows/ci.yml` runs `check`, `typecheck`, `test`, `build`, `test:instant` (Playwright) and `knip` on every push and PR to `main`. `vercel.json`'s `ignoreCommand` still skips every preview build, so the production deploy from `main` remains the first place a broken build renders, but CI now catches it earlier.
- Prove a change with `npm run check && npm run typecheck && npm test && npm run build`. All passed on 27 Sep 2026 (25 vitest tests). Add `npm run test:instant` for pages, navigation or layout (5 Playwright tests passed), and for a change to the `@blode/ui` item, run both checks under Authoring (the emitted-JSON shape, then `shadcn add` into a scratch project).
- `npm run knip` is clean (zero findings) and is a CI gate; keep it that way — don't reintroduce `ignoreFiles` for `content-collections.ts` (use `entry` instead, or its own imports go blind) and don't delete a file or export without grepping for its references first, including `.mdx` code fences and `registry/**/_registry.ts`.
- Gaps: no `verify` script (the chain above is the de facto one), no `doctor` script and no feature map.

## Project Structure

- `registry/default/base/`: design-system payloads emitted as `registry:base` items
- `registry/default/fonts/`: font registry (currently empty; Inter and Geist Mono use `next/font/google`)
- `registry/default/ui/`: component source files (shadcn-style registry)
- `registry/default/examples/`: example and demo components
- `registry/default/hooks/`: shared hooks distributed as `registry:lib`
- `registry/default/lib/`: shared utilities (e.g., `utils.ts` with `cn()`)
- `registry/index.ts`: main registry manifest combining base, fonts, UI, hooks, lib, and examples
- `content/docs/`: MDX documentation pages
- `scripts/build-registry.mts`: builds the JSON registry into `public/r/` using ts-morph
- `styles/globals.css`: Tailwind v4 global styles and design tokens
- `DESIGN.md`: the design direction document, published at `blode.co/ui/design.md` by `scripts/build-design-md.mjs`. Edit the root file; `public/design.md` is generated.

## Key Conventions

- **Registry pattern**: Registry items are assembled from `registry/default/base/`, `fonts/`, `ui/`, `hooks/`, `lib/`, and `examples/` via `_registry.ts` files combined by `registry/index.ts`. Run `npm run build:registry` after adding or changing registry items.
- **React 19**: pass `ref` as a prop. Do NOT use `React.forwardRef`.
- **Tailwind v4**: Uses `@import "tailwindcss"` with CSS custom properties for design tokens. No `tailwind.config.js`.
- **Icons**: use `blode-icons-react`; don't install other icon libraries.
- **Base UI primitives**: Components wrap Base UI. Preserve Base UI's accessibility patterns (proper `aria-*` attributes, keyboard navigation).
- **CVA + cn**: Use `cva` for variant definitions and `cn()` (from `registry/default/lib/utils.ts`) for class merging. `cn` is re-exported from the [`cn`](https://github.com/shadcn-ui/cn) package, which does clsx-style joining and Tailwind conflict resolution in one call. `clsx` and `tailwind-merge` are no longer direct dependencies; don't reintroduce them.
- **Content collections**: MDX docs use `@content-collections/core`. Two collections: `documents` (docs) and `pages`.

## Gotchas

- IMPORTANT: Do NOT run `tsc --noEmit` (or `npm run check:types`) directly: it fails without content-collections build artifacts. Use `npm run typecheck`, which builds docs first.
- New components must be added by hand to the matching `registry/default/<kind>/_registry.ts` and follow the shadcn schema (type, files, dependencies, registryDependencies). A commit that stages anything under `registry/` makes the pre-commit hook rebuild and stage `public/r` and `__registry__`.
- The registry build filters items by type whitelist: `registry:ui`, `registry:lib`, `registry:block`, `registry:base`.
- `registry:base` items can ship without source files.
- Dark mode uses a custom variant, `@custom-variant dark (&:is(.dark *));` in `styles/globals.css`, not Tailwind's built-in dark mode.
- **Never put a `max-h-*` on `SelectContent`.** In its default `item-aligned` mode Base UI sizes the _positioner_ and sets the popup to `height: 100%`; a popup `max-height` clamps it against the top of that positioner, so the list detaches from the trigger and pins to the top of the viewport. Base UI ignores the popup's `max-height` when it computes the anchor. Cap the height only with `position="popper"`, which turns item alignment off.

## Authoring the `@blode/ui` design-system item

`registry/default/base/_registry.ts` is what consumers install to get Blode's tokens. It breaks in ways that fail silently in someone else's project, so treat these as hard rules.

- **Never set `config.style`.** The CLI interpolates it into the hardcoded `@shadcn` template `https://ui.shadcn.com/r/styles/{style}/{name}.json`, so a Blode-specific name 404s on `init` against a registry we don't control. Reproduced on shadcn 4.13.0.
- **`cssVars` keys are unprefixed**: `"field-height": "48px"`, not `"--field-height"`. The CLI adds the `--`.
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

Verified with fontTools and measured contrast; do not undo them without re-measuring.

- **Dark-mode semantic fills carry a near-black ink, never white.** `--destructive`, `--success`, and `--warning` all brighten in dark mode, where white scores 2.89, 2.22, and 2.10 against a 4.5 floor. The 950-weight inks give 5.60, 6.74, 7.60. Light mode is the reverse except for warning, which is near-black in both because yellow carries white at no usable saturation.
- **Use `tabular-figures`, not `tabular-nums`, for aligned columns.** It borrows the monospaced Geist Mono so counters and columns never jitter, regardless of the sans face's own numeral support.
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

`@blode` has been in shadcn's directory since [#11543](https://github.com/shadcn-ui/ui/pull/11543) merged in Aug 2026, so `npx shadcn@latest add @blode/<item>` resolves with no `registry add` step. Checked on 27 Sep 2026 in a scratch Next app with shadcn 4.0.0, 4.13.0 and 4.21.0. The install docs, README, landing FAQ and `skills/blode-ui` lead with the bare form and keep `registry add` as the fallback for an older CLI; keep them in step. If the listing ever lapses, revert them. Check it with:

```bash
curl -s https://ui.shadcn.com/r/registries.json | grep -c blode
```

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
