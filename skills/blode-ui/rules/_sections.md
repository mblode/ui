# Sections

This file defines the Blode UI rule categories, their ordering, impact levels, and filename prefixes.

---

## 1. Composition and Accessibility (comp)

**Impact:** CRITICAL
**Description:** Blode UI components depend on complete composition patterns and required accessibility subcomponents.

## 2. Forms and Validation (form)

**Impact:** HIGH
**Description:** Forms should use the registry's purpose-built field and control patterns instead of ad hoc wrappers.

## 3. Styling and Tokens (style)

**Impact:** HIGH
**Description:** Blode UI relies on semantic tokens, built-in variants, and disciplined Tailwind usage rather than raw color classes.

## 4. Base vs Radix APIs (api)

**Impact:** HIGH
**Description:** Primitive API differences must be checked before using `asChild`, `render`, or value-shape props.

## 5. Icons (icon)

**Impact:** MEDIUM
**Description:** Imports, placement, and sizing rules keep Blode examples visually consistent and avoid subtle component regressions.
