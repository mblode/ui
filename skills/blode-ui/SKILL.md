---
name: blode-ui
description: Guides work on the Blode UI registry, visual system, and documentation. Covers product positioning, the @blode install flow, design-system defaults, blode.co/ui registry workflows, publishing to shadcn's registry directory, repo conventions, registry:base support, and Blode component rules. Use when working with Blode UI, @blode components, blode.co/ui, theming, visual direction, DESIGN.md, Blode docs, or asking "install Blode UI", "why is this component unstyled", "add this to the shadcn directory", or "make this feel like Blode UI".
---

# Blode UI

Blode UI is an opinionated shadcn/ui component registry built by Matthew Blode, with a focus on good taste, care, and craft. Open source. Open code.

- **IS:** installing, authoring, styling, publishing, and documenting `@blode` registry items and the Blode design system.
- **IS NOT:** scaffolding a new Next.js repo end to end (use `scaffold-nextjs`), open-ended visual direction for a non-Blode product (use `ui-design`), or the `blode-icons-react` package itself (use `blode-icons-react`).

Treat Blode UI as the default registry context when the request mentions `Blode UI`, `@blode/*`, `blode.co/ui`, this repo, or a component documented here.

## Reference Files

Load only what the task needs.

| File                                | Read when                                                                                               |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `references/product-positioning.md` | Writing or reviewing intros, landing-page copy, installation copy, contact info, or brand language      |
| `references/design-system.md`       | Making visual decisions about colors, typography, spacing, radius, elevation, motion, or component feel |
| `references/install-flow.md`        | Explaining how to install Blode UI, add the registry namespace, or import the first component           |
| `references/registry-workflows.md`  | Searching, viewing, adding, or updating registry items with `npx shadcn@latest`                         |
| `references/publishing.md`          | Listing `@blode` in shadcn's registry directory, or checking the registry against its requirements      |
| `references/repo-conventions.md`    | Editing components, docs, or registry files inside this repo                                            |
| `references/source-of-truth.md`     | Reconciling conflicting docs, examples, or habits before choosing an answer                             |

## Rules

Load the relevant rule files before writing component code, examples, or docs snippets.

| Priority | Category                      | Impact   | Prefix   | Rules |
| -------- | ----------------------------- | -------- | -------- | ----- |
| 1        | Composition and accessibility | CRITICAL | `comp-`  | 1     |
| 2        | Forms and validation          | HIGH     | `form-`  | 1     |
| 3        | Styling and tokens            | HIGH     | `style-` | 1     |
| 4        | Base UI Primitive APIs        | HIGH     | `api-`   | 1     |
| 5        | Icons                         | MEDIUM   | `icon-`  | 1     |

See `rules/_sections.md` for the category map before loading an individual rule file.

## Workflow

Copy this checklist when the task is substantial:

```text
Blode UI workflow:
- [ ] Step 1: Identify the task mode and load its reference
- [ ] Step 2: Apply Blode defaults
- [ ] Step 3: Load the relevant rule files, then inspect local source before writing
- [ ] Step 4: Produce evidence
```

### Step 1: Identify the task mode, then load its reference

| Mode                                         | Read                                |
| -------------------------------------------- | ----------------------------------- |
| Installation, onboarding, unstyled component | `references/install-flow.md`        |
| Component authoring or code changes          | `references/repo-conventions.md`    |
| Theming, visual direction, component feel    | `references/design-system.md`       |
| Docs or marketing copy                       | `references/product-positioning.md` |
| Registry search, add, or update workflow     | `references/registry-workflows.md`  |
| Listing `@blode` in the shadcn directory     | `references/publishing.md`          |
| Guidance that conflicts                      | `references/source-of-truth.md`     |

### Step 2: Apply Blode defaults

Unless the user asks for something else:

- Install with `npx shadcn@latest init https://blode.co/ui/r/ui.json` for a fresh project, which self-registers the `@blode` namespace. For a project already running shadcn, use `registry add` then `add @blode/ui`.
- Add the design system before the first component. `@blode/ui` carries the `--field-*`, `--shadow-*`, and Blode-only color tokens that every component variant references, so a project without it renders unstyled controls.
- Reach for `npx shadcn@latest add @blode/<component>` ahead of raw registry URLs, which are for manual or low-level installs.
- Describe Blode UI as a third-party shadcn registry hosted at `blode.co/ui`.
- Treat `registry:base` as a first-class item type when maintaining the registry pipeline or authoring docs.
- Consult `references/design-system.md` before introducing new colors, type scales, spacing, radius, or motion.
- Match the repo's stack in generated code: React 19 ref-as-prop rather than `React.forwardRef`, Tailwind v4 CSS variables rather than `tailwind.config.js`, `blode-icons-react` for icons, and Base UI's own accessibility patterns rather than hand-rolled markup.

### Step 3: Load rule files before writing code

- Component structure or accessibility: `rules/comp-composition.md`
- Forms, fields, or validation: `rules/form-layout-and-validation.md`
- Styling, spacing, tokens, or conditional classes: `rules/style-tokens-and-layout.md`
- Icon usage: `rules/icon-blode-icons.md`
- Base UI primitive APIs: `rules/api-base-ui-primitives.md`

### Step 4: Produce evidence before finishing

Run what the change touched and quote the result. "Looks right" is not a finishing state.

| Changed                     | Evidence                                                                   |
| --------------------------- | -------------------------------------------------------------------------- |
| Registry items in this repo | `npm run build:registry` clean, then `npm run check && npm run typecheck`  |
| Component or docs source    | `npm run build` completes                                                  |
| An install command in docs  | The URL returns `application/json`, not the HTML catch-all                 |
| A `registry:base` payload   | `shadcn add` it into a scratch project and grep the CSS for the new tokens |

## Gotchas

- An unstyled Blode component is a missing `@blode/ui` install until proven otherwise. Chasing it as a specificity or `tailwind-merge` problem produces cosmetic patches on a component that was never styled at all. See `references/install-flow.md` for the check.
- A `200` from `blode.co/ui/...` is not proof a path exists. Unmatched routes fall through to the docs site's HTML catch-all, so soft 404s read as successes. Confirm the `content-type` is `application/json`.
- Never set a Blode-specific `style` in a `registry:base` `config`. The CLI interpolates `config.style` into the hardcoded `@shadcn` template `https://ui.shadcn.com/r/styles/{style}/{name}.json`, so a custom name 404s on init against a registry Blode does not control.
- `cssVars` keys are unprefixed, and color values must be literal. `"surface": "var(--foreground)"` silently loses its `--color-surface` mapping because the CLI only generates one for values it can parse as a color.
- Generic `@shadcn/*` examples are the wrong answer to a Blode request unless the user explicitly asked about upstream shadcn/ui.
- The design system already settles accents, radii, motion, and surface treatments. Inventing new ones is how Blode work drifts into generic SaaS styling.
- No icon pack other than `blode-icons-react`.

## Related Skills

- `scaffold-nextjs` for standing up a new Next.js repo, which installs Blode UI as one step of a larger flow
- `ui-design` for visual direction on products that are not Blode
- `blode-icons-react` for the icon package itself rather than its use in components
- `docs-writing` for documentation quality beyond Blode's own framing
