# Install Flow

## Canonical Note

Blode UI is a third-party shadcn registry hosted at `blode.co/ui`. The setup flow is the same as shadcn/ui with two extra steps: add the registry namespace, then add the design system.

`@blode` is not in shadcn's registry directory, so the CLI cannot resolve the namespace by itself. Every flow below establishes it first, either with `registry add` or by pointing `init` at the design system's URL. A bare `npx shadcn@latest add @blode/button` fails with an unknown-registry error, so never open a quick start with it.

## Quick Start

For a project that has not been initialised with shadcn yet, point `init` at the design system directly. It self-registers the `@blode` namespace from the item's own `config.registries`, sets `blode-icons-react` as the icon library, and writes Blode's tokens into the stylesheet:

```bash
npx shadcn@latest init https://blode.co/ui/r/ui.json
npx shadcn@latest add @blode/button
```

For a project that already runs shadcn, use the namespace flow:

```bash
npx shadcn@latest registry add @blode=https://blode.co/ui/r/{name}.json
npx shadcn@latest add @blode/ui
npx shadcn@latest add @blode/button
```

Pick based on whether the project already has a `components.json`.

## Step Breakdown

### Create or initialise a project

```bash
npx shadcn@latest init
```

### Add the Blode registry

```bash
npx shadcn@latest registry add @blode=https://blode.co/ui/r/{name}.json
```

### Add the design system

```bash
npx shadcn@latest add @blode/ui
```

`@blode/ui` is the design system, not a component. Nothing lands in `components/ui/`; it writes tokens into your stylesheet: the `--field-*` metrics, the `--shadow-*` scale, and the `--surface`, `--code`, `--overlay`, `--input-hover`, and `--placeholder-foreground` colors.

**Never skip this step.** Blode component variants compile to `rounded-[var(--field-radius)]`, `h-[var(--field-height-sm)]`, `px-[var(--field-padding-x)]`. An undefined custom property resolves to nothing, so without the base every control renders with square corners and the wrong height and padding, which reads as a component bug rather than a missing install step.

### Add a component

```bash
npx shadcn@latest add @blode/button
```

### Import component

The command above will add the `Button` component to your project. You can then import it like this:

```tsx
import { Button } from "@/components/ui/button";

export default function Home() {
  return <Button>Click me</Button>;
}
```

## Diagnosing An Unstyled Component

If a Blode component renders but looks wrong (square where it should be round, short where it should be tall), check for the tokens before touching the component:

1. Inspect the element and look for `border-radius: var(--field-radius)` resolving to nothing.
2. Grep the project's CSS for `--field-radius`. If it is absent, `@blode/ui` was never installed.
3. Fix it by running the install step, not by hardcoding values into the component.

Do not chase this as a CSS-specificity or Tailwind-merge problem. A missing design-system install is by far the more common cause, and cosmetic patches applied on top of it are wasted work.

## Notes

- Use the namespace flow for onboarding, docs, and quick starts.
- Use raw registry URLs only when the user explicitly asks for manual installation or low-level registry access.
