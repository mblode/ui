# Source Of Truth

Use this file when repo docs, examples, or habits disagree.

## Precedence

1. Bundled visual-system and product-framing guidance in this skill
2. Bundled install and registry workflow guidance in this skill
3. Bundled repo conventions for work inside this codebase
4. Local repo implementation when editing this codebase: `registry/default/**` and `registry/index.ts`

## Defaults

- If product copy drifts, prefer the bundled product framing in this skill
- If quick starts or install snippets drift, prefer the bundled install flow in this skill
- If examples or ad hoc styling drift, prefer the bundled design-system summary for colors, typography, spacing, radius, motion, and component feel
- If a component page shows a raw `https://ui.blode.co/r/...` URL, treat it as a low-level path unless the task is manual installation
- If a repo convention conflicts with a generic shadcn habit, prefer the repo convention for work in this codebase
- If the repo root has a `DESIGN.md`, treat it as the detailed visual source of truth and keep the bundled summary aligned with it
- If the request is generic upstream shadcn mechanics, use upstream shadcn documentation and CLI behaviour as supporting context
