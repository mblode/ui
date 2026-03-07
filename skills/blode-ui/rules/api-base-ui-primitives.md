---
title: Use Base UI Primitive APIs
impact: HIGH
tags: base-ui, primitives, api
---

## Use Base UI Primitive APIs

Blode UI wraps Base UI primitives. Use the Base UI API — not Radix patterns like `asChild` or `type`.

**Incorrect (using Radix-style API):**

```tsx
<DialogTrigger asChild>
  <Button>Open</Button>
</DialogTrigger>

<ToggleGroup type="single" defaultValue="weekly">
  <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
</ToggleGroup>
```

**Correct (Base UI API):**

```tsx
<DialogTrigger render={<Button />}>Open</DialogTrigger>

<ToggleGroup spacing={2} defaultValue={["weekly"]}>
  <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
</ToggleGroup>
```

Before writing or editing examples:

- Use `render` for composition — never `asChild`
- Add `nativeButton={false}` for non-button renders when the component expects it
- Check whether value props are strings, arrays, or item objects before copying an example across components
