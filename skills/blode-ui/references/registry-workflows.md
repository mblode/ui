# Registry Workflows

## Core Commands

Use `npx shadcn@latest` for all examples in this repo.

```bash
# Search the Blode registry.
npx shadcn@latest search @blode -q "button"

# View a registry item before adding it.
npx shadcn@latest view @blode/button

# Add a component.
npx shadcn@latest add @blode/button

# Preview changes before updating an installed component.
npx shadcn@latest add @blode/button --dry-run
npx shadcn@latest add @blode/button --diff button.tsx
```

The same `add` flow applies to non-component registry payloads such as `registry:base` items. `@blode/ui` is the design system and is installed the same way:

```bash
npx shadcn@latest add @blode/ui
```

## Default Workflow

1. Check whether the component already exists locally.
2. Confirm `@blode/ui` is installed by grepping the project's CSS for `--field-radius`. If it is missing, add it first.
3. Search or view the registry item if the user is deciding what to add.
4. Use `add` with the `@blode` namespace.
5. For updates, prefer `--dry-run` and `--diff` before overwriting local edits.

## Design-System Item Shape

`@blode/ui` is `type: "registry:base"` and ships its tokens as `cssVars`, following shadcn's conventions:

- Keys are **unprefixed**: `"field-height": "48px"`, not `"--field-height"`. The CLI adds the `--`.
- `cssVars.theme` → `@theme inline`. Use it for scalars: the `--field-*` metrics and the `--shadow-*` scale.
- `cssVars.light` / `cssVars.dark` → `:root` / `.dark`. Use them for colors, and give **literal** values (`oklch(0.98 0 0)`), not `var(--surface)` indirection. The CLI only generates the matching `@theme inline` `--color-*` entry for values it can recognise as a color; an indirect value silently loses its utility class.
- Do not ship `--radius-2xl` / `3xl` / `4xl`. shadcn's CLI already writes its own scale (`calc(var(--radius) * 1.8 / 2.2 / 2.6)`), which matches Blode's intended 18/22/26px.
- Do not set `config.style` to a Blode-specific name. It is interpolated into the hardcoded `@shadcn` template `https://ui.shadcn.com/r/styles/{style}/{name}.json` and will 404 on init.

## When Working Inside This Repo

- Inspect `content/docs/components/*.mdx` before inventing examples.
- Inspect `registry/default/ui/` and `registry/default/examples/` before proposing new composition patterns.
- Treat direct URL installs like `https://blode.co/ui/r/styles/default/<name>` as low-level references, not the default onboarding path.

## Fallback To Generic shadcn Mechanics

If the user asks about generic CLI behaviour, `components.json`, or non-Blode registries, use upstream shadcn knowledge as supporting context. Do not let that override Blode-specific defaults.
