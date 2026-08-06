# Registry Workflows

Commands for finding, adding, and updating `@blode` items in your project. These assume the `@blode` namespace is already registered; `references/install-flow.md` covers setting it up.

## Core Commands

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

`@blode/ui` is the design system and installs the same way. It is not a component, so nothing lands in `components/ui/`; it writes tokens into your stylesheet.

## Default Workflow

1. Check whether the component already exists in your project.
2. Confirm `@blode/ui` is installed by grepping your CSS for `--field-radius`. If it is missing, add it first, or the component renders unstyled.
3. Search or view the registry item if you are still deciding what to add.
4. `add` with the `@blode` namespace.
5. Reach for `--dry-run` and `--diff` before re-adding a component you have edited locally.

## Updating A Component You Have Customised

Blode components are source you own, so `add` overwrites rather than merges:

```bash
npx shadcn@latest add @blode/button --diff button.tsx   # what upstream changed
npx shadcn@latest add @blode/button --dry-run           # what would be written
```

When the diff touches code you have modified, port the upstream change in by hand instead of re-adding. An unpreviewed `add` silently discards local edits.

## Fallback To Generic shadcn Mechanics

For generic CLI behaviour, `components.json`, or non-Blode registries, use upstream shadcn knowledge as supporting context, without letting it override the Blode defaults in `SKILL.md`.
