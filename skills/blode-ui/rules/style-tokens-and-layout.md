---
title: Style With Blode Tokens And Variants
impact: HIGH
tags: styling, tailwind, tokens, variants
---

## Style With Blode Tokens And Variants

Blode UI is opinionated about taste. Prefer semantic tokens, built-in variants, and light-touch layout classes. Do not repaint components with arbitrary Tailwind colours or typography overrides.

**Incorrect (raw colours and ad hoc overrides):**

```tsx
<Card className="bg-blue-100 text-blue-900 font-bold">
  <CardContent>
    <span className="text-emerald-600">+24%</span>
  </CardContent>
</Card>
```

**Correct (semantic tokens and built-in variants):**

```tsx
<Card className="max-w-md">
  <CardContent className="flex items-center justify-between gap-3">
    <Badge variant="secondary">+24%</Badge>
    <Button variant="outline">View details</Button>
  </CardContent>
</Card>
```

Keep these defaults:

- Use semantic utilities like `bg-background`, `text-foreground`, and `text-muted-foreground`
- Prefer built-in variants before adding custom classes
- Use `className` for layout, spacing, and sizing, not for overriding core colour or typography
- Use `gap-*` instead of `space-*`
- Use `size-*` when width and height match
- Use `cn()` for conditional classes
- Do not add manual `dark:` colour overrides or arbitrary `z-index` values to overlay components
