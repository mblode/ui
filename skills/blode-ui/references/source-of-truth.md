# Source Of Truth

Use this file when repo docs, examples, or habits disagree.

## Precedence

1. Visual system and component feel: [DESIGN.md](/Users/mblode/Code/mblode/blode-ui/DESIGN.md)
2. Product story: [content/docs/index.mdx](/Users/mblode/Code/mblode/blode-ui/content/docs/index.mdx)
3. Install flow: [content/docs/installation/index.mdx](/Users/mblode/Code/mblode/blode-ui/content/docs/installation/index.mdx)
4. Repo conventions: [AGENTS.md](/Users/mblode/Code/mblode/blode-ui/AGENTS.md)
5. Registry implementation: `registry/default/**` and `registry/index.ts`

## Defaults

- If README or a component page drifts from the main docs, prefer the main docs for product framing and onboarding
- If examples or ad hoc styling drift from the published design system, prefer [DESIGN.md](/Users/mblode/Code/mblode/blode-ui/DESIGN.md) for colors, typography, spacing, radius, motion, and component feel
- If a component page shows a raw `https://ui.blode.co/r/...` URL, treat it as a low-level path unless the task is manual installation
- If the task is about fonts, prefer [content/docs/font.mdx](/Users/mblode/Code/mblode/blode-ui/content/docs/font.mdx) for Glide setup instructions
- If a repo convention conflicts with a generic shadcn habit, prefer the repo convention for work in this codebase
- If the request is generic upstream shadcn mechanics, use upstream shadcn documentation and CLI behaviour as supporting context
