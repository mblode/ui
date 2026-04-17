---
title: Use Blode Icon Conventions
impact: MEDIUM
tags: icons, button, blode-icons-react
---

## Use Blode Icon Conventions

For Blode docs, examples, and repo code, default to `blode-icons-react`. Placement and sizing rules are part of the component language, so the package choice alone is not enough.

**Incorrect (wrong package and manual icon sizing):**

```tsx
import { SearchIcon } from "lucide-react";

<Button>
  <SearchIcon className="mr-2 size-4" />
  Search
</Button>;
```

**Correct (Blode package and component-managed sizing):**

```tsx
import { SearchIcon, ArrowRightIcon } from "blode-icons-react"

<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>

<Button variant="outline">
  Next
  <ArrowRightIcon data-icon="inline-end" />
</Button>
```

Use these icon rules:

- Default to `blode-icons-react` for Blode work in this repo
- Add `data-icon="inline-start"` or `data-icon="inline-end"` inside buttons
- Do not add `size-*`, `w-*`, or `h-*` classes to icons inside Blode components
- Pass icon components as component objects, not string keys
- If a downstream project explicitly uses another icon library, adapt there without changing Blode docs or repo examples
