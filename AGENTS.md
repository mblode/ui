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

- `registry/default/ui/` — Component source files (shadcn-style registry)
- `registry/default/examples/` — Example/demo components
- `registry/default/lib/` — Shared utilities (e.g., `utils.ts` with `cn()`)
- `registry/index.ts` — Main registry manifest combining UI, examples, and lib
- `content/docs/` — MDX documentation pages
- `scripts/build-registry.mts` — Builds JSON registry into `public/r/` using ts-morph
- `styles/globals.css` — Tailwind v4 global styles and design tokens

## Key Conventions

- **Registry pattern**: Components live in `registry/default/ui/`. Auto-generated `_registry.ts` files in `ui/`, `examples/`, and `lib/` directories are combined by `registry/index.ts`. Run `npm run build:registry` after adding or changing components.
- **React 19**: Use ref as a prop directly — do NOT use `React.forwardRef`.
- **Tailwind v4**: Uses `@import "tailwindcss"` with CSS custom properties for design tokens. No `tailwind.config.js`.
- **Icons**: Use `blode-icons-react` — don't install other icon libraries.
- **Radix UI primitives**: Components wrap Radix UI. Preserve Radix's accessibility patterns (proper `aria-*` attributes, keyboard navigation).
- **CVA + tailwind-merge**: Use `cva` for variant definitions and `cn()` (from `registry/default/lib/utils.ts`) for class merging. `cn` is `twMerge(clsx(...))`.
- **Content collections**: MDX docs use `@content-collections/core`. Two collections: `documents` (docs) and `pages`.

## Gotchas

- IMPORTANT: Do NOT run `tsc --noEmit` directly — it will fail without content-collections build artifacts. Use `npm run typecheck` instead, which builds docs first.
- New components must be added to the auto-generated `_registry.ts` files and follow the shadcn schema (type, files, dependencies, registryDependencies).
- The registry build filters items by type whitelist: `registry:ui`, `registry:lib`, `registry:block`. Other types are excluded from output.
- Content-collections must be built before the Next.js build — `npm run build` handles the ordering automatically.
- Dark mode uses a custom variant: `@custom-variant dark (&:where(.dark, .dark *))` — not Tailwind's built-in dark mode.
