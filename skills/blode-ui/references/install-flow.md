# Install Flow

## Canonical Note

Blode UI is a third-party shadcn registry hosted at `ui.blode.co`. The setup flow is the same as shadcn/ui with one extra step: add the registry namespace.

## Quick Start

```bash
npx shadcn@latest init
npx shadcn@latest registry add @blode=https://ui.blode.co/r/{name}.json
npx shadcn@latest add @blode/button
```

Use this as the default answer for installation and quick-start questions.

## Step Breakdown

### Create or initialize a project

```bash
npx shadcn@latest init
```

### Add the Blode registry

```bash
npx shadcn@latest registry add @blode=https://ui.blode.co/r/{name}.json
```

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

## Notes

- Use the namespace flow for onboarding, docs, and quick starts.
- Use raw registry URLs only when the user explicitly asks for manual installation or low-level registry access.
