---
version: alpha
name: Blode UI
description: Neutral-first design system for the Blode UI registry. Built around Glide typography, soft radii, restrained depth, and source-first shadcn/Base UI components. Colour values mirror the deployed ui.blode.co theme.
colors:
  background: "#FFFFFF"
  foreground: "#0A0A0A"
  card: "#FFFFFF"
  card-foreground: "#0A0A0A"
  popover: "#FFFFFF"
  popover-foreground: "#0A0A0A"
  primary: "#171717"
  primary-foreground: "#FAFAFA"
  secondary: "#F5F5F5"
  secondary-foreground: "#171717"
  muted: "#F5F5F5"
  muted-foreground: "#737373"
  accent: "#F5F5F5"
  accent-foreground: "#171717"
  destructive: "#E40014"
  destructive-foreground: "#FCF3F3"
  border: "#E5E5E5"
  input: "#E5E5E5"
  ring: "#A1A1A1"
  chart-1: "#90C5FF"
  chart-2: "#3080FF"
  chart-3: "#155DFC"
  chart-4: "#1447E6"
  chart-5: "#193CB8"
  sidebar: "#FAFAFA"
  sidebar-foreground: "#0A0A0A"
  sidebar-primary: "#171717"
  sidebar-primary-foreground: "#FAFAFA"
  sidebar-accent: "#F5F5F5"
  sidebar-accent-foreground: "#171717"
  sidebar-border: "#E5E5E5"
  sidebar-ring: "#A1A1A1"
  surface: "#F8F8F8"
  surface-foreground: "#0A0A0A"
  code: "#F8F8F8"
  code-foreground: "#0A0A0A"
  code-highlight: "#F2F2F2"
  code-number: "#747474"
  selection: "#0A0A0A"
  selection-foreground: "#FFFFFF"
typography:
  display-xl:
    fontFamily: Glide
    fontSize: 72px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Glide
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Glide
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Glide
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.02em
  title-md:
    fontFamily: Glide
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Glide
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Glide
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Glide
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: Glide
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.2
  label-sm:
    fontFamily: Glide
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
  code-sm:
    fontFamily: "Geist Mono"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: 6px
  md: 8px
  lg: 10px
  xl: 14px
  2xl: 18px
  3xl: 22px
  4xl: 26px
  field: 18px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
  container-padding: 16px
  container-padding-lg: 32px
  header-height: 64px
  field-height: 48px
  field-height-sm: 40px
  field-padding-x: 16px
  field-padding-y: 12px
  textarea-min-height: 70px
  code-padding: 16px
components:
  page-surface:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    padding: "{spacing.container-padding}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    height: "{spacing.field-height-sm}"
    padding: "{spacing.md}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    height: "{spacing.field-height-sm}"
    padding: "{spacing.md}"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    height: "{spacing.field-height-sm}"
    padding: "{spacing.md}"
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    height: "{spacing.field-height-sm}"
    padding: "{spacing.md}"
  input-field:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.field}"
    height: "{spacing.field-height}"
    padding: "{spacing.field-padding-y}"
  card-default:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  popover-surface:
    backgroundColor: "{colors.popover}"
    textColor: "{colors.popover-foreground}"
    rounded: "{rounded.lg}"
    padding: "{spacing.sm}"
  dialog-surface:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
  tabs-list:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.secondary-foreground}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xs}"
  sidebar-surface:
    backgroundColor: "{colors.sidebar}"
    textColor: "{colors.sidebar-foreground}"
    padding: "{spacing.md}"
  badge-neutral:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.surface-foreground}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs}"
  text-muted:
    textColor: "{colors.muted-foreground}"
    typography: "{typography.body-sm}"
  code-block:
    backgroundColor: "{colors.code}"
    textColor: "{colors.code-foreground}"
    typography: "{typography.code-sm}"
    rounded: "{rounded.xl}"
    padding: "{spacing.code-padding}"
  code-line-highlight:
    backgroundColor: "{colors.code-highlight}"
    textColor: "{colors.code-foreground}"
    typography: "{typography.code-sm}"
    rounded: "{rounded.md}"
    padding: "{spacing.xs}"
  code-line-number:
    textColor: "{colors.code-number}"
    typography: "{typography.code-sm}"
  alert-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "#FFFFFF"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  selection-highlight:
    backgroundColor: "{colors.selection}"
    textColor: "{colors.selection-foreground}"
---

# Blode UI

## Overview

Blode UI is an opinionated shadcn/ui component registry built by Matthew Blode, with a focus on good taste, care, and craft. Open source. Open code.

- Source code is part of the product. Interfaces should look polished, but still feel inspectable, forkable, and easy to own.
- Familiar shadcn patterns are the baseline. Blode-specific identity comes from better typography, calmer surfaces, softer geometry, and tighter spacing judgment.
- Neutral-first, crisp, slightly editorial, and restrained. Default to clarity, legibility, and calm contrast over visual novelty.

The tokens above are the canonical shape. The **runtime source of truth is `styles/globals.css`**, which declares these same tokens as CSS custom properties in `oklch()` for Tailwind v4; the hex values in the frontmatter are the sRGB equivalents that ship on `ui.blode.co`.

## Colors

Blode UI follows the shadcn `background` / `foreground` convention. The `background` suffix is omitted when the variable is the background colour of a component. For every surface colour there is a matching `-foreground`.

```tsx
<div className="bg-primary text-primary-foreground">Hello</div>
```

The palette is built on neutral contrast, not brand chroma. Most hierarchy comes from value shifts between `background`, `card`, `surface`, `muted`, and near-black `foreground`. Saturation is reserved for semantics, not identity.

- **`background` (#FFFFFF):** Default canvas. Clean and bright, not tinted.
- **`foreground` (#0A0A0A):** Main reading colour. Headings, body text, default iconography.
- **`primary` (#171717):** Strongest action colour in light mode. One per cluster.
- **`secondary` / `muted` / `accent` (#F5F5F5):** Tonal separators for quiet surfaces, rails, tabs, and secondary buttons.
- **`surface` (#F8F8F8):** Soft utility surface for badges, docs cards, and low-emphasis grouping.
- **`card` / `popover` (#FFFFFF):** Elevated neutral shells.
- **`destructive` (#E40014):** One of the few saturated colours in the system. Reserve for real destructive or invalid states.
- **`border` / `input` (#E5E5E5):** Quiet hairlines and field edges.
- **`ring` (#A1A1A1):** Focus ring. Always visible, never glowing.
- **`code` surfaces (#F8F8F8 / `code-highlight` #F2F2F2 / `code-number` #747474):** Documentation and source previews sit slightly off the page background so they feel inset.
- **`selection` (#0A0A0A on #FFFFFF):** Inverts when text is selected.
- **`chart-1`…`chart-5`:** Tailwind's blue ramp (`#90C5FF` → `#193CB8`) for data viz. Use sequentially; do not repurpose as brand accents.
- **`sidebar` family:** Mirrors the main neutrals so the sidebar reads as part of the page, not a separate chrome.
- **`overlay`:** Scrim colour for dialogs and sheets (`rgba(193,201,210,0.7)` light / `rgba(43,53,68,0.7)` dark).

### Adding new colours

If a new semantic role is needed, add it to both `:root` and `.dark` in `styles/globals.css`, bridge it in `@theme inline`, and add the same token to this file's frontmatter.

```css
:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}
.dark {
  --warning: oklch(0.41 0.11 46);
  --warning-foreground: oklch(0.99 0.02 95);
}
@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

## Typography

Typography is the main source of personality in Blode UI. Use **Glide** as the default sans across docs, marketing, and components. Glide is a variable font shipped as two files (roman + italic), covering weights 400 through 900.

- Apply Glide via Tailwind's `font-sans` utility. It's mapped through `--font-sans: var(--font-glide)` in `@theme inline`.
- Headlines are compact, high-contrast, and slightly tight-tracked. Hero moments can stretch to `display-xl`; most product and docs headings stay within `headline-lg` through `headline-sm`.
- Body copy sits in `body-md` or `body-sm` with relaxed line height. Favour readable rhythm over dense information packing.
- Labels, buttons, tabs, and compact metadata use medium weight. Read as precise and intentional, not loud.
- Monospace (`code-sm`) is for code, tokens, commands, and data-like values only. Do not let code styling leak into general UI copy.

Weights: 400 regular · 500 medium · 600 semibold · 700 bold · 800 extrabold · 900 black. Italic variants exist across the full range.

## Layout

Layout follows an 8px rhythm with 4px micro-adjustments. Structure comes from spacing first, then surface changes, then borders.

- Base step `8px`. Reach for `12px`, `16px`, `24px`, `32px`, and `48px` to define grouping and section rhythm.
- Default controls are comfortable: `48px` (`field-height`) for primary fields, `40px` (`field-height-sm`) for compact controls, `16px` horizontal field padding, `12px` inner density.
- Textareas start at `70px` (`textarea-min-height`).
- Global header is disciplined at `4rem` (`header-height`).
- Marketing and registry surfaces may stretch to a `1400px` container; reading surfaces stay narrower and calmer. Avoid full-width paragraph blocks in docs.
- When a layout feels flat, increase separation with spacing before introducing another background tone.

## Elevation & Depth

Blode UI is border-led and tone-led before it is shadow-led. Depth reads as polish and layering, not spectacle. Shadows are defined once in `@theme inline` and used via `shadow-*` utilities.

- `shadow-input`: minimal 1px utility shadow for fields.
- `shadow-xs` / `shadow-sm`: quiet cards, popovers, chips.
- `shadow-md` / `shadow-lg`: menus, tooltips, stacked cards. Broad and diffuse, never tight.
- `shadow-popover`: specialised stack for popovers and dropdowns.
- `shadow-soft`: long, generous marketing shadow for hero surfaces.

```tsx
<div className="shadow-sm" />
<div className="shadow-popover" />
```

Overlays use `overlay` as a tinted scrim plus blur. Dialogs and sheets feel solid and quiet, not glassy. Overlay motion is deliberate: around `500ms` on open, `300ms` on close for dialog and sheet transitions. Focus treatments rely on the visible `ring` colour (`#A1A1A1` light, `#737373` dark), not oversized glow.

## Shapes

The shape language is soft, disciplined, and consistent. Warmth without cuteness.

- Base radius: `10px` (`rounded.lg`, exposed as `--radius`). Most controls live between `10px` and `18px`.
- Cards and richer surfaces open to `14px` (`rounded.xl`) or `18px` (`rounded.2xl`).
- Fields use the rounder `18px` treatment (`rounded.field` = `rounded.2xl`) to feel tactile and current.
- Full pills (`rounded.full`) are reserved for badges, chips, and tightly bounded status elements.
- Do not mix hard-cornered and soft-cornered surfaces in the same cluster unless the contrast is structural.

## Components

### Buttons

Primary buttons are near-black solids with light text. Secondary buttons are tonal fills. Ghost buttons stay quiet and text-led. Destructive buttons use `destructive` for real danger only.

- Hover and active states are low-amplitude tonal changes.
- Motion stays in the `100ms`–`150ms` range and feels immediate.
- Avoid gradients, glossy highlights, or decorative borders on core actions.
- Loading state composes `Spinner` with the button's own sizing and `disabled`. Prefer the built-in `loading` prop on `Button` over ad-hoc wrappers.

### Fields

Text inputs, selects, and grouped controls feel roomy, rounded, and border-led.

- Default to `48px` height and `rounded.field` (`18px`).
- Use `card` surfaces with explicit `ring` focus and `shadow-input`.
- Placeholder text is `muted-foreground`, never so faint that the field reads inactive.

### Cards And Surfaces

Cards are white or softly tinted neutral containers with gentle ring definition.

- Use `card` for primary containers and `surface` for quieter utility surfaces.
- Footer rows, muted rails, and low-emphasis groupings lean on tonal separation, not chroma.
- Interiors breathe. Dense padding is an exception.

### Overlays And Navigation

Popovers, dropdowns, dialog panels, sheets, and navigation popups share the same quiet shell language.

- Rounded shells, restrained shadow, clear edge definition.
- Tabs and segmented controls use muted rails with a crisp active indicator rather than heavy framing.
- Overlay layers feel stable and intentional, not playful or floating.

### Sidebar

Sidebar tokens (`sidebar`, `sidebar-foreground`, `sidebar-primary`, `sidebar-accent`, `sidebar-border`, `sidebar-ring`) mirror the main neutrals. Sidebars should read as part of the page, not as a separate chrome.

### Docs And Code

Documentation is part of the design system, not a separate skin.

- Headings feel crisp and slightly editorial.
- Code blocks use the `code` tokens, padded, slightly inset from the page background.
- Line numbers use `code-number`; highlighted lines use `code-highlight`.
- Inline code, commands, and line highlights always use the code tokens, never novelty colours.

### Icons

Use [`blode-icons-react`](https://icons.blode.co) — a drop-in replacement for `lucide-react` with the same names and props.

```tsx
import { SearchIcon } from "blode-icons-react";

<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>
```

- Inside Blode components, set placement with `data-icon="inline-start"` or `data-icon="inline-end"`. Don't add `size-*`, `w-*`, or `h-*` classes inside components — the host manages sizing.
- Outside components, `<SearchIcon size={24} />` is fine.
- Icons inherit `currentColor` by default; recolour through the surrounding `text-*` token.
- Do not mix icon libraries in one project.

## Dark Mode

Dark mode is a mirror of the same system, not a new visual language. The relative hierarchy — background darker than card, card darker than accent, foreground near-white, destructive a slightly softer red — is preserved.

The deployed `.dark` token values:

```yaml
dark-colors:
  background: "#0A0A0A"
  foreground: "#FAFAFA"
  card: "#171717"
  card-foreground: "#FAFAFA"
  popover: "#171717"
  popover-foreground: "#FAFAFA"
  primary: "#E5E5E5"
  primary-foreground: "#171717"
  secondary: "#262626"
  secondary-foreground: "#FAFAFA"
  muted: "#262626"
  muted-foreground: "#A1A1A1"
  accent: "#404040"
  accent-foreground: "#FAFAFA"
  destructive: "#FF6568"
  destructive-foreground: "#DF2225"
  border: "#FFFFFF1A"          # 10% white
  input: "#FFFFFF26"           # 15% white
  ring: "#737373"
  sidebar: "#171717"
  sidebar-foreground: "#FAFAFA"
  sidebar-primary: "#1447E6"
  sidebar-primary-foreground: "#FAFAFA"
  sidebar-accent: "#262626"
  sidebar-accent-foreground: "#FAFAFA"
  sidebar-border: "#FFFFFF1A"
  sidebar-ring: "#525252"
  surface: "#161616"
  surface-foreground: "#A1A1A1"
  code-highlight: "#262626"
  code-number: "#A4A4A4"
  selection: "#E5E5E5"
  selection-foreground: "#171717"
  overlay: "#2B3544B3"         # rgba(43, 53, 68, 0.7)
```

Borders and inputs use alpha-white in dark mode so they read consistently against varying card tones.

## Do's and Don'ts

- Do keep the system neutral-first and let type, spacing, and composition carry the personality.
- Do use Glide as the default interface voice and reserve mono for code, commands, and token-like content.
- Do prefer surface shifts, borders, and soft shadows over aggressive fills or heavy elevation.
- Do keep hover states fast, subtle, and tonal.
- Do use `blode-icons-react` and keep icon shapes simple and geometric.
- Do preserve Base UI accessibility patterns, keyboard behaviour, and visible focus.
- Don't introduce a permanent brand accent just to make the UI feel more "designed."
- Don't make dark mode a separate visual language.
- Don't crowd docs, demos, or forms. Breathing room is part of the product feel.
- Don't mix multiple icon packs, multiple sans families, or multiple corner philosophies in one view.
- Don't use glassmorphism, neon gradients, or oversized shadows unless the surface is intentionally experimental.
- Don't repaint components with raw Tailwind colours (`bg-blue-500`, `text-emerald-600`) when a semantic token exists.

## Tooling

Lint this file with the Google Labs `design.md` CLI:

```bash
npx -p @google/design.md@latest design.md lint DESIGN.md
```

The CLI package is `@google/design.md`; the binary is `design.md`.
