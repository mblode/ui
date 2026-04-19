---
title: Use Blode Field And Control Patterns
impact: HIGH
tags: forms, field, validation, toggle-group
---

## Use Blode Field And Control Patterns

Blode forms should use the registry's field, group, and validation primitives instead of generic layout wrappers. The component set already encodes the spacing and accessibility behaviour the docs expect.

**Incorrect (manual layout and improvised controls):**

```tsx
const [frequency, setFrequency] = useState("weekly")

<div className="space-y-4">
  <label htmlFor="email">Email</label>
  <Input id="email" />

  <div className="flex gap-2">
    {["daily", "weekly", "monthly"].map((option) => (
      <Button
        key={option}
        variant={frequency === option ? "default" : "outline"}
        onClick={() => setFrequency(option)}
      >
        {option}
      </Button>
    ))}
  </div>
</div>
```

**Correct (Blode form composition):**

```tsx
<FieldGroup>
  <Field data-invalid>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input id="email" aria-invalid />
    <FieldDescription>Enter a valid email address.</FieldDescription>
  </Field>

  <Field orientation="horizontal">
    <FieldTitle id="frequency-label">Digest frequency</FieldTitle>
    <ToggleGroup aria-labelledby="frequency-label" spacing={2}>
      <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
      <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
      <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
    </ToggleGroup>
  </Field>
</FieldGroup>
```

Use these defaults:

- `FieldGroup` plus `Field` for form layout
- `InputGroupInput` and `InputGroupTextarea` inside `InputGroup`
- `FieldSet` plus `FieldLegend` for grouped checkboxes or radios
- `data-invalid` on `Field` and `aria-invalid` on the invalid control
- `gap-*` spacing instead of `space-*`
