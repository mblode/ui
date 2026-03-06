---
name: shadcn
description: Routes generic shadcn CLI and registry mechanics while deferring Blode UI work to the Blode UI skill. Covers `components.json`, registry configuration, `add --dry-run`, `--diff`, and safe upstream update workflows. Use when the request is about generic shadcn setup, CLI behavior, MCP behavior, or upstream component maintenance rather than Blode UI-specific registry usage.
---

# shadcn Compatibility

This skill is a compatibility layer.

- For Blode UI requests, switch to `skills/blode-ui/SKILL.md`.
- Stay in this skill only for generic upstream shadcn mechanics that are not specific to the `@blode` registry.

## Use This Skill For

- `components.json` structure and registry configuration
- `npx shadcn@latest info`
- `npx shadcn@latest add --dry-run`
- `npx shadcn@latest add --diff`
- upstream update/merge workflows for existing shadcn components
- shadcn MCP server concepts

## Do Not Use This Skill For

- `@blode/*` components
- `ui.blode.co`
- Blode UI install instructions
- Blode UI component composition or styling defaults
- Blode UI docs or registry authoring

## Generic shadcn Mechanics

Run all CLI commands through the project's package runner. In this repo the examples use:

```bash
npx shadcn@latest <command>
```

Check project context first:

```bash
npx shadcn@latest info
```

Preview component changes before overwriting local files:

```bash
npx shadcn@latest add <component> --dry-run
npx shadcn@latest add <component> --diff
npx shadcn@latest add <component> --diff <path>
```

Use this update workflow when the user wants upstream changes without blindly overwriting local edits:

1. Run `npx shadcn@latest add <component> --dry-run`.
2. Inspect each changed file with `npx shadcn@latest add <component> --diff <path>`.
3. Merge upstream changes into local files deliberately.
4. Only use `--overwrite` if the user explicitly asks for a full replace.

## Routing Rule

If the request mentions any of these, stop using this skill and open `skills/blode-ui/SKILL.md` instead:

- `Blode UI`
- `@blode`
- `ui.blode.co`
- `blode-icons-react`
- Blode component docs or examples
