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

## Default Workflow

1. Check whether the component already exists locally.
2. Search or view the registry item if the user is deciding what to add.
3. Use `add` with the `@blode` namespace.
4. For updates, prefer `--dry-run` and `--diff` before overwriting local edits.

## When Working Inside This Repo

- Inspect `content/docs/components/*.mdx` before inventing examples.
- Inspect `registry/default/ui/` and `registry/default/examples/` before proposing new composition patterns.
- Treat direct URL installs like `https://ui.blode.co/r/styles/default/<name>` as low-level references, not the default onboarding path.

## Fallback To Generic shadcn Mechanics

If the user asks about generic CLI behavior, `components.json`, or non-Blode registries, use the repo's `shadcn` compatibility skill as supporting context. Do not let that override Blode-specific defaults.

