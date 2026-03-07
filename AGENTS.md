# Blode UI

Component library and documentation site built with Next.js 16, React 19, Tailwind CSS v4, Radix UI, and shadcn/ui patterns.

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
- `registry/default/fonts/` — First-class font payloads emitted as `registry:font` items
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
- **Radix UI primitives**: Components wrap Radix UI. Preserve Radix's accessibility patterns (proper `aria-*` attributes, keyboard navigation).
- **CVA + tailwind-merge**: Use `cva` for variant definitions and `cn()` (from `registry/default/lib/utils.ts`) for class merging. `cn` is `twMerge(clsx(...))`.
- **Content collections**: MDX docs use `@content-collections/core`. Two collections: `documents` (docs) and `pages`.

## Gotchas

- IMPORTANT: Do NOT run `tsc --noEmit` directly — it will fail without content-collections build artifacts. Use `npm run typecheck` instead, which builds docs first.
- New components must be added to the auto-generated `_registry.ts` files and follow the shadcn schema (type, files, dependencies, registryDependencies).
- The registry build filters items by type whitelist: `registry:ui`, `registry:lib`, `registry:block`, `registry:base`, `registry:font`.
- `registry:base` and `registry:font` items can ship without source files. Blode publishes Google-backed `@blode/font-*` items through the registry, but the default Glide setup still uses `next/font/local`.
- Content-collections must be built before the Next.js build — `npm run build` handles the ordering automatically.
- Dark mode uses a custom variant: `@custom-variant dark (&:where(.dark, .dark *))` — not Tailwind's built-in dark mode.
