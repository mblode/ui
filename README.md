<div align="center">

# [Blode UI](https://blode.co/ui)

**80 React components built on [Base UI](https://base-ui.com) and Tailwind CSS v4, installed with the shadcn CLI**

Add the `@blode` registry to a shadcn project, then pull components in as source you own and edit.

</div>

## Demo

Every component rendered, with its source beside it.

<p>
<a href="https://blode.co/ui">
<img alt="Browse components" src=".github/assets/demo.svg" width="200" />
</a>
</p>

## Install

Point `init` at the design system. It registers the `@blode` namespace for you, sets the icon library, and writes Blode's tokens into your CSS:

```bash
npx shadcn@latest init https://blode.co/ui/r/ui.json
npx shadcn@latest add @blode/button
```

Already running shadcn? Register the namespace and add the design system yourself:

```bash
npx shadcn@latest registry add @blode=https://blode.co/ui/r/{name}.json
npx shadcn@latest add @blode/ui
```

Type `{name}` literally. It is the registry's URL template, and the shadcn CLI substitutes the component name per request.

`@blode/ui` is the design system. It writes Blode's tokens into your CSS, and component variants reference them directly (`rounded-[var(--field-radius)]`, `h-[var(--field-height)]`). Skip it and components install but render unstyled.

## Quickstart

```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function SaveButton() {
  const [saving, setSaving] = useState(false);

  return (
    <Button loading={saving} onClick={() => setSaving(true)} size="input">
      Save changes
    </Button>
  );
}
```

`loading` swaps the label for a spinner without changing the button's width, and sets `aria-busy` and `disabled` for you.

## Design system

What `@blode/ui` writes into your project:

- **Fields:** a 48px control height, a `--radius-2xl` corner, and one shared padding scale across input, select, and button.
- **Shadows:** layered `--shadow-xs` through `--shadow-lg`, plus a dedicated `--shadow-popover`, instead of a flat border.
- **Icons:** [blode-icons-react](https://github.com/mblode/blode-icons) is set as the project icon library, so generated code reaches for it.
- **Dark mode:** a `.dark` class variant, not Tailwind's built-in media strategy.

## Agent skills

Teach your coding agent the registry, the install flow, and the visual defaults:

```bash
npx skills add mblode/blode-ui
```

- **[blode-ui](./skills/blode-ui/SKILL.md)**: install flow, registry commands, design-system defaults, and Blode component rules.

Full documentation lives at [blode.co/ui/docs](https://blode.co/ui/docs).

## License

MIT

---

Crafted by [<img src="https://blode.co/avatar-circle.png" width="20" align="top" />](https://blode.co) [Matthew Blode](https://blode.co)
