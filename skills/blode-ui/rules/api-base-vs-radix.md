---
title: Match The Underlying Primitive API
impact: HIGH
tags: base-ui, radix-ui, primitives, api
---

## Match The Underlying Primitive API

Blode UI wraps both Radix-style and Base-style primitives. The correct API depends on the actual component implementation. Check the local component source or docs before reaching for `asChild`, `render`, `type`, or `multiple`.

**Incorrect (guessing the primitive family):**

```tsx
<DialogTrigger render={<Button />}>Open</DialogTrigger>

<ToggleGroup type="single" defaultValue="weekly">
  <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
</ToggleGroup>
```

**Correct (match the component's real API):**

```tsx
<DialogTrigger asChild>
  <Button>Open</Button>
</DialogTrigger>

<ToggleGroup spacing={2} defaultValue={["weekly"]}>
  <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
</ToggleGroup>
```

Before writing or editing examples:

- Confirm whether the component is implemented with Radix or Base primitives
- Use `asChild` for Radix-style composition and `render` for Base-style composition
- Add `nativeButton={false}` for Base-style non-button renders when the component expects it
- Check whether value props are strings, arrays, or item objects before copying an example across components
