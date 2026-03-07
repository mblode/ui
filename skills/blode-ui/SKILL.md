---
name: blode-ui
description: Guides work on the Blode UI registry and documentation. Covers product positioning, @blode installation flow, ui.blode.co registry workflows, repo conventions, registry:base support, and Blode component rules. Use when working with Blode UI, @blode components, ui.blode.co, Blode registry installs, Blode docs, or component authoring and customization in this repo.
---

# Blode UI

Blode UI is an opinionated shadcn/ui component registry built by Matthew Blode, with a focus on good taste, care, and craft. Open source. Open code. Treat Blode UI as the default registry context when the request mentions `Blode UI`, `@blode/*`, `ui.blode.co`, this repo, or a component documented here.

Use generic shadcn knowledge only for CLI mechanics that are not overridden by this skill.

## Reference Files

Load only what the task needs.

| File | Read when |
| --- | --- |
| `references/product-positioning.md` | Writing or reviewing intros, landing-page copy, installation copy, contact info, or brand language |
| `references/install-flow.md` | Explaining how to install Blode UI, add the registry namespace, or import the first component |
| `references/registry-workflows.md` | Searching, viewing, adding, or updating registry items with `npx shadcn@latest` |
| `references/repo-conventions.md` | Editing components, docs, or registry files inside this repo |
| `references/source-of-truth.md` | Reconciling conflicting docs, examples, or habits before choosing an answer |

## Rules

Load the relevant rule files before writing component code, examples, or docs snippets.

| Priority | Category | Impact | Prefix | Rules |
| --- | --- | --- | --- | --- |
| 1 | Composition and accessibility | CRITICAL | `comp-` | 1 |
| 2 | Forms and validation | HIGH | `form-` | 1 |
| 3 | Styling and tokens | HIGH | `style-` | 1 |
| 4 | Base vs Radix APIs | HIGH | `api-` | 1 |
| 5 | Icons | MEDIUM | `icon-` | 1 |

See `rules/_sections.md` for the category map before loading an individual rule file.

## Source Of Truth

Use `references/source-of-truth.md` when guidance conflicts.

## Workflow

Copy this checklist when the task is substantial:

```text
Blode UI workflow:
- [ ] Step 1: Identify the task mode
- [ ] Step 2: Load the matching reference files
- [ ] Step 3: Inspect the local component/docs/registry source
- [ ] Step 4: Apply Blode defaults and relevant rule files
- [ ] Step 5: Validate commands, examples, and repo conventions
```

### Step 1: Identify the task mode

Sort the task into one of these modes:

- Installation or usage help
- Component authoring or code changes
- Docs or marketing copy
- Registry maintenance or update workflow

### Step 2: Load the matching references

- Installation or onboarding: read `references/install-flow.md`
- Copy or docs work: read `references/product-positioning.md`
- Registry commands or update workflows: read `references/registry-workflows.md`
- Repo implementation work: read `references/repo-conventions.md`
- Conflicting guidance: read `references/source-of-truth.md`

### Step 3: Apply Blode defaults

Unless the user explicitly asks for something else:

- Prefer `npx shadcn@latest init` followed by `npx shadcn@latest registry add @blode=https://ui.blode.co/r/{name}.json`
- Prefer `npx shadcn@latest add @blode/<component>` over raw registry URLs for onboarding
- Describe Blode UI as a third-party shadcn registry hosted at `ui.blode.co`
- Treat `registry:base` as a first-class registry item type when maintaining the registry pipeline or authoring docs
- Use `blode-icons-react` in repo examples and component source for this project
- Follow React 19 ref-as-prop patterns; do not introduce `React.forwardRef`
- Follow Tailwind CSS v4 conventions and existing CSS-variable tokens
- Preserve Radix and Base UI accessibility patterns instead of replacing them with custom markup

Use raw `https://ui.blode.co/r/...` URLs only for low-level or manual-install contexts.

### Step 4: Load rule files before writing code

- Component structure or accessibility: `rules/comp-composition.md`
- Forms, fields, or validation: `rules/form-layout-and-validation.md`
- Styling, spacing, tokens, or conditional classes: `rules/style-tokens-and-layout.md`
- Icon usage: `rules/icon-blode-icons.md`
- Base vs Radix API differences: `rules/api-base-vs-radix.md`

### Step 5: Validate before finishing

- Commands use `npx shadcn@latest`
- Install examples prefer the `@blode` namespace flow
- Product copy keeps the Blode UI framing intact
- Repo guidance matches React 19, Tailwind v4, `blode-icons-react`, and current registry structure
- Code examples use existing components before custom markup

## Guardrails

- Do not answer Blode-specific requests with generic `@shadcn/*` examples unless the user explicitly asks for upstream shadcn/ui.
- Do not introduce other icon packs in this repo.
- Do not treat Tailwind v3 or `tailwind.config.js` as the default path here.
- Do not guess a different registry when the request is clearly about Blode UI.
