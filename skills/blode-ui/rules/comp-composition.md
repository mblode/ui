---
title: Compose Blode Components Completely
impact: CRITICAL
tags: composition, accessibility, dialog, card
---

## Compose Blode Components Completely

Blode UI components assume their companion pieces are present. Missing titles, groups, or fallbacks often means the component renders but behaves incorrectly or fails accessibility checks.

**Incorrect (missing required structure):**

```tsx
<DialogContent>
  <div className="text-lg font-semibold">Edit profile</div>
  <Avatar>
    <AvatarImage src="/avatar.png" alt="Matthew" />
  </Avatar>
</DialogContent>

<SelectContent>
  <SelectItem value="starter">Starter</SelectItem>
  <SelectItem value="pro">Pro</SelectItem>
</SelectContent>
```

**Correct (complete Blode composition):**

```tsx
<DialogContent>
  <DialogHeader>
    <DialogTitle>Edit profile</DialogTitle>
    <DialogDescription>Update your public details.</DialogDescription>
  </DialogHeader>

  <Avatar>
    <AvatarImage src="/avatar.png" alt="Matthew" />
    <AvatarFallback>MB</AvatarFallback>
  </Avatar>
</DialogContent>

<SelectContent>
  <SelectGroup>
    <SelectItem value="starter">Starter</SelectItem>
    <SelectItem value="pro">Pro</SelectItem>
  </SelectGroup>
</SelectContent>
```

Use these defaults:

- `DialogTitle`, `SheetTitle`, and `DrawerTitle` are required
- Item components stay inside their matching `*Group`
- Use full `CardHeader` / `CardTitle` / `CardDescription` / `CardContent` / `CardFooter` composition
- Use `Alert`, `Empty`, `Separator`, `Skeleton`, and `Badge` instead of rebuilding those patterns with custom markup
- Compose loading buttons with `Spinner`, `data-icon`, and `disabled`; do not invent `isLoading` or `isPending` props
