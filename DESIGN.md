---
version: alpha
name: Blode UI
description: Neutral-first design system for the Blode UI registry. Built around Glide typography, soft radii, restrained depth, and source-first shadcn/Base UI components.
colors:
  background: "#FFFFFF"
  foreground: "#0A0A0A"
  card: "#FFFFFF"
  card-foreground: "#0A0A0A"
  primary: "#171717"
  primary-foreground: "#FAFAFA"
  secondary: "#F5F5F5"
  secondary-foreground: "#171717"
  muted: "#F5F5F5"
  muted-foreground: "#737373"
  surface: "#F8F8F8"
  surface-foreground: "#0A0A0A"
  destructive: "#E7000B"
  destructive-foreground: "#FCF3F3"
  code: "#F8F8F8"
  code-foreground: "#0A0A0A"
  code-highlight: "#F2F2F2"
  tooltip: "#111827"
  tooltip-foreground: "#FFFFFF"
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
  field: 18px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  xxxl: 48px
  container-padding: 16px
  container-padding-lg: 32px
  field-height: 48px
  field-height-sm: 40px
  field-padding-x: 16px
  field-padding-y: 12px
  code-padding: 16px
components:
  page-surface:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "{spacing.container-padding}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    height: 40px
    padding: "{spacing.md}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    height: 40px
    padding: "{spacing.md}"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    height: 40px
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
  menu-surface:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
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
  alert-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "#FFFFFF"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  text-destructive-inverse:
    textColor: "{colors.destructive-foreground}"
    typography: "{typography.body-sm}"
  tooltip-default:
    backgroundColor: "{colors.tooltip}"
    textColor: "{colors.tooltip-foreground}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.xl}"
    padding: "{spacing.sm}"
---

# Blode UI

## Overview

Blode UI should feel like an opinionated registry rather than a commodity component catalog. The system is neutral-first, crisp, slightly editorial, and intentionally restrained. It should communicate good taste, care, and craft without drifting into luxury gimmicks, noisy branding, or generic SaaS polish.

- Source code is part of the product. Interfaces should look polished, but they must still feel inspectable, forkable, and easy to own.
- Familiar shadcn patterns are the baseline. Blode-specific identity comes from better typography, calmer surfaces, softer geometry, and tighter spacing judgment.
- Open source. Open code. Default to clarity, legibility, and calm contrast over visual novelty.

## Colors

The palette is built on neutral contrast, not brand chroma. Most hierarchy comes from value shifts between page background, card surfaces, muted containers, and near-black text. Saturation is reserved for semantics, not identity.

- **Background (#FFFFFF):** The default canvas. It should feel clean and bright, not tinted.
- **Foreground (#0A0A0A):** The main reading color. Use it for headings, body text, and default iconography.
- **Primary (#171717):** The strongest action color in light mode. Use it for the single most important call to action in a cluster.
- **Secondary and Muted (#F5F5F5):** Tonal separators for quiet surfaces, rails, tabs, and secondary buttons.
- **Surface (#F8F8F8):** Soft utility surface for badges, docs cards, and low-emphasis grouping.
- **Destructive (#E7000B):** One of the few saturated colors in the system. Reserve it for actual destructive or invalid states.
- **Code surfaces (#F8F8F8 / #F2F2F2):** Documentation and source previews should sit slightly off the page background so they feel inset, not boxed in.

Dark mode is a mirror of the same system, not a new visual language. When implementing dark mode, invert the neutral stack to `#0A0A0A` background, `#FAFAFA` foreground, `#171717` cards, `#161616` soft surfaces, `#262626` muted containers, and `#E5E5E5` primary actions. The relative hierarchy must remain the same.

## Typography

Typography is the main source of personality in Blode UI. Use **Glide** as the default voice across docs, marketing, and components. It should feel modern and clean, with enough weight range to carry hierarchy without needing additional display families.

- Headlines are compact, high-contrast, and slightly tight-tracked. Hero and landing-page moments can stretch to `display-xl`, but most product and docs headings should stay within `headline-lg` through `headline-sm`.
- Body copy should sit in `body-md` or `body-sm` with relaxed line height. Favor readable rhythm over dense information packing.
- Labels, buttons, tabs, and compact metadata should use medium weight. They should read as precise and intentional, not loud.
- Monospace typography is for code, tokens, commands, and data-like values only. Do not let code styling leak into general UI copy.

## Layout

Layout follows an 8px rhythm with 4px micro-adjustments. The system should feel roomy enough for documentation and app UI, but never empty for its own sake. Structure should come from spacing first, then surface changes, then borders.

- Use `8px` as the baseline step. Reach for `12px`, `16px`, `24px`, `32px`, and `48px` to define grouping and section rhythm.
- Default controls are intentionally comfortable: `48px` field height, `40px` compact controls, `16px` horizontal field padding, and `12px` inner control density.
- Marketing and registry surfaces can stretch to a `1400px` container, while the global header should stay disciplined at `4rem`.
- Marketing and demo canvases can stretch wide, but reading surfaces should remain narrower and calmer. Avoid full-width paragraph blocks in docs.
- When a layout feels flat, increase separation with spacing before introducing another background tone.

## Elevation & Depth

Blode UI is border-led and tone-led before it is shadow-led. Depth should read as polish and layering, not spectacle.

- Inputs use minimal utility shadow.
- Cards, popovers, menus, and tooltips can lift with soft diffuse shadows, but those shadows should stay quiet and broad.
- Overlays use a tinted scrim and blur to separate layers cleanly. Dialogs and sheets should feel solid and quiet, not glassy.
- Overlay motion should feel deliberate rather than snappy: around `500ms` on open, `300ms` on close for the larger sheet/dialog layer transitions.
- Focus treatments should rely on visible rings and contrast, not oversized glow or bouncing motion.

## Shapes

The shape language is soft, disciplined, and consistent. The goal is warmth without cuteness.

- The base radius is `10px`. Most controls should live between `10px` and `18px`.
- Cards and richer surfaces can open up to `14px`.
- Fields use the rounder `18px` treatment to feel tactile and current.
- Full pills are reserved for badges, chips, and tightly bounded status elements.
- Do not mix hard-cornered surfaces with soft-cornered surfaces in the same cluster unless the contrast is intentional and structural.

## Components

### Buttons

Primary buttons are near-black solids with light text. Secondary buttons are tonal fills. Ghost buttons should stay quiet and text-led.

- Hover and active states should be low-amplitude tonal changes.
- Motion should stay in the `100ms` to `150ms` range and feel immediate.
- Avoid gradients, glossy highlights, or decorative borders on core actions.

### Fields

Text inputs, selects, and grouped controls should feel roomy, rounded, and border-led.

- Default to `48px` height and the `field` radius.
- Use neutral surfaces with explicit focus rings and subtle utility shadow.
- Placeholder text should be muted, but never so faint that the field reads inactive.

### Cards And Surfaces

Cards are white or softly tinted neutral containers with gentle ring definition.

- Use `card` for primary containers and `surface` for quieter utility surfaces.
- Footer rows, muted rails, and low-emphasis groupings should lean on tonal separation instead of chroma.
- Card interiors should breathe. Dense padding should be treated as an exception.

### Overlays And Navigation

Popovers, dropdowns, dialog panels, sheets, and navigation popups should share the same quiet shell language.

- Rounded shells, restrained shadow, and clear edge definition are the default.
- Tabs and segmented controls should use muted rails with a crisp active indicator rather than heavy framing.
- Overlay layers should feel stable and intentional, not playful or floating for effect.

### Docs And Code

Documentation is part of the design system, not a separate skin.

- Headings should feel crisp and slightly editorial.
- Code blocks should feel neutral, padded, and slightly inset from the page background.
- Inline code, commands, and line highlights should use the code tokens, never novelty colors.

## Do's and Don'ts

- Do keep the system neutral-first and let type, spacing, and composition carry the personality.
- Do use Glide as the default interface voice and reserve mono for code, commands, and token-like content.
- Do prefer surface shifts, borders, and soft shadows over aggressive fills or heavy elevation.
- Do keep hover states fast, subtle, and tonal.
- Do use `blode-icons-react` and keep icon shapes simple and geometric.
- Do preserve Base UI accessibility patterns, keyboard behavior, and focus visibility.
- Don't introduce a permanent brand accent just to make the UI feel more "designed."
- Don't make dark mode a separate visual language.
- Don't crowd docs, demos, or forms. Breathing room is part of the product feel.
- Don't mix multiple icon packs, multiple sans families, or multiple corner philosophies in one view.
- Don't use glassmorphism, neon gradients, or oversized shadows unless a surface is intentionally experimental.

## Rollout Plan

### Phase 1: Baseline Alignment

- [ ] Keep `DESIGN.md` and `styles/globals.css` aligned whenever core theme variables change.
- [ ] Audit shared headings, docs titles, and hero typography against the published type scale.
- [ ] Normalize any outlier radii or shadow treatments in shared primitives.

### Phase 2: Component Coverage

- [ ] Expand `components:` tokens as more registry primitives stabilize into repeatable patterns.
- [ ] Add explicit dark-mode component variants if dark styling diverges materially from neutral inversion.
- [ ] Capture recurring docs-only surfaces such as callouts, tables, and command blocks as named component tokens once they are stable.

### Phase 3: Governance

- [ ] Add `npx @google/design.md lint DESIGN.md` to CI or pre-merge checks.
- [ ] Use `npx @google/design.md diff` during major visual refactors.
- [ ] Require agents working on UI to read `DESIGN.md` alongside `AGENTS.md` and the local Blode UI skill.
