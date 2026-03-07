# Source Of Truth

Use this file when repo docs, examples, or habits disagree.

## Precedence

1. Product story: [content/docs/index.mdx](/Users/mblode/Code/mblode/blode-ui/content/docs/index.mdx)
2. Install flow: [content/docs/installation/index.mdx](/Users/mblode/Code/mblode/blode-ui/content/docs/installation/index.mdx)
3. Repo conventions: [AGENTS.md](/Users/mblode/Code/mblode/blode-ui/AGENTS.md)
4. Registry implementation: `registry/default/**` and `registry/index.ts`

## Defaults

- If README or a component page drifts from the main docs, prefer the main docs for product framing and onboarding
- If a component page shows a raw `https://ui.blode.co/r/...` URL, treat it as a low-level path unless the task is manual installation
- If the task is about fonts, prefer [content/docs/font.mdx](/Users/mblode/Code/mblode/blode-ui/content/docs/font.mdx) for consumer setup and verify published `@blode/font-*` items against [registry/default/fonts/_registry.ts](/Users/mblode/Code/mblode/blode-ui/registry/default/fonts/_registry.ts)
- If a repo convention conflicts with a generic shadcn habit, prefer the repo convention for work in this codebase
- If the request is generic upstream shadcn mechanics, use upstream shadcn documentation and CLI behavior as supporting context
