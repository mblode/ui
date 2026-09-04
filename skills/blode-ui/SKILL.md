---
name: blode-ui
description: Installs and builds with Blode UI, the opinionated shadcn/ui component registry at blode.co/ui. Covers the @blode install flow, the design system that makes components render correctly, registry commands for adding and updating components, and Blode's composition, form, styling, Base UI, and icon conventions. Use when adding @blode components to a project, or asking "install Blode UI", "add a Blode button", "why is my Blode component unstyled", "update a Blode component without losing my edits", or "make this feel like Blode UI".
---

# Blode UI

Blode UI is an opinionated shadcn/ui component registry built by Matthew Blode, with a focus on good taste, care, and craft. Components install as source you own and edit.

- **IS:** installing `@blode` components into a project and writing code with them.
- **IS NOT:** maintaining the Blode registry itself (that lives in the `mblode/blode-ui` repo's own instructions), scaffolding a whole Next.js app (use `scaffold-nextjs`), or visual direction for a non-Blode product (use `ui-design`).

## Before Adding Anything

Two things have to be true, and both fail quietly:

- The `@blode` namespace is registered in `components.json`. It is not in shadcn's registry directory, so the CLI cannot resolve it unaided.
- `@blode/ui` is installed. Grep the project's CSS for `--field-radius`; if it is absent, the design system was never added and every component will render unstyled.

`references/install-flow.md` has the commands for both.

## Reference Files

Load only what the task needs.

| File                               | Read when                                                         |
| ---------------------------------- | ----------------------------------------------------------------- |
| `references/install-flow.md`       | Setting up `@blode` in a project, or a component renders unstyled |
| `references/registry-workflows.md` | Searching, viewing, adding, or updating components                |
| `references/design-system.md`      | Choosing color, typography, spacing, radius, elevation, or motion |

## Rules

Load the matching rule file before writing component code. `rules/_sections.md` has the category map.

| Priority | Category                      | Impact   | Prefix   | Rules |
| -------- | ----------------------------- | -------- | -------- | ----- |
| 1        | Composition and accessibility | CRITICAL | `comp-`  | 1     |
| 2        | Forms and validation          | HIGH     | `form-`  | 1     |
| 3        | Styling and tokens            | HIGH     | `style-` | 1     |
| 4        | Base UI Primitive APIs        | HIGH     | `api-`   | 1     |
| 5        | Icons                         | MEDIUM   | `icon-`  | 1     |

## Gotchas

- `@blode` is not in shadcn's registry directory, so a bare `npx shadcn@latest add @blode/button` cannot resolve. Register the namespace first, or point `init` at `https://blode.co/ui/r/ui.json`. Never hand someone the bare form.
- An unstyled Blode component is a missing `@blode/ui` install until proven otherwise. Chasing it as a specificity or class-merge problem produces cosmetic patches on a component that was never styled at all.
- Blode wraps Base UI, not Radix. `asChild` does not exist here; composition goes through `render`. Radix habits are the most common source of broken Blode code.
- `add` overwrites a customised component with no warning. Preview with `--diff` first.
- The design system already settles accents, radii, motion, and surface treatments. Inventing new ones is how Blode work drifts into generic SaaS styling.
- Compose installed Blode components before hand-rolling markup that duplicates one.
- No icon pack other than `blode-icons-react`.
- Generic `@shadcn/*` examples are the wrong answer to a Blode request unless the user asked about upstream shadcn/ui.

## Related Skills

- `scaffold-nextjs` for standing up a new Next.js repo, which installs Blode UI as one step of a larger flow
- `ui-design` for visual direction on products that are not Blode
- `blode-icons-react` for the icon package itself rather than its use in components
