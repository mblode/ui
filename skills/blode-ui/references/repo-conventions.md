# Repo Conventions

## Architecture

- Component source lives in `registry/default/ui/`
- Examples live in `registry/default/examples/`
- Shared utilities live in `registry/default/lib/`
- Registry assembly happens in `registry/index.ts`
- Docs live in `content/docs/`

## Implementation Defaults

- React 19: use ref as a prop directly
- Tailwind CSS v4: use the existing global CSS variables; do not introduce a `tailwind.config.js`-first workflow
- Icons: use `blode-icons-react`
- Class merging: use `cn()` from `registry/default/lib/utils.ts`
- Preserve Base UI and Radix accessibility and keyboard behavior

## Commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Type check: `npm run typecheck`
- Registry build only: `npm run build:registry`

## Gotchas

- Do not run `tsc --noEmit` directly in this repo; use `npm run typecheck`
- New registry items must fit the shadcn registry schema and auto-generated registry manifests
- The registry build only emits whitelisted registry types
- Dark mode uses the custom `@custom-variant dark` pattern already defined in the repo
