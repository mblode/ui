# Design System

Blode UI visual defaults extracted from the repo's `DESIGN.md`. Load this for theming, visual direction, or component feel.

## Overview

- Neutral-first, crisp, slightly editorial, and restrained
- Preserve the product language: good taste, care, and craft
- Keep interfaces polished but still source-first, inspectable, and easy to own

## Typography

- Default sans: `Glide` variable font, weights `400` through `900`
- Use Glide for headings, body, labels, and UI chrome
- Use monospace only for code, commands, tokens, and data-like values
- Headings should be tight-tracked and medium/bold weight; body copy should use relaxed line height

## Colors

- Use semantic neutrals: background `#FFFFFF`, foreground `#0A0A0A`, primary `#171717`, secondary/muted `#F5F5F5`, surface `#F8F8F8`
- Use destructive `#E7000B` only for real destructive or invalid states
- Dark mode mirrors the same hierarchy instead of introducing a separate accent language
- Prefer semantic utilities like `bg-background`, `text-foreground`, and `text-muted-foreground` over raw Tailwind hues

## Layout

- Use an `8px` base rhythm with `4px` micro-adjustments
- Common spacing steps: `12px`, `16px`, `24px`, `32px`, `48px`
- Default field height: `48px`; compact controls: `40px`
- Default field padding: `16px` horizontal, `12px` vertical
- Reading surfaces should stay calmer and narrower; marketing/demo surfaces can stretch to `1400px`
- Default header height: `4rem`

## Depth And Motion

- Be border-led and tone-led before shadow-led
- Inputs use utility shadow; cards, menus, popovers, and tooltips use soft diffuse shadows
- Overlays use a tinted scrim and blur
- Hover and press transitions should usually stay in the `100ms` to `150ms` range
- Sheet and dialog transitions can open around `500ms` and close around `300ms`
- Avoid neon gradients, glassmorphism, oversized shadows, and theatrical lift effects

## Shapes

- Base radius: `10px`
- Most controls should live between `10px` and `18px`
- Cards can open to `14px`
- Fields use the rounder `18px` treatment
- Reserve full pills for badges, chips, and tightly bounded status UI

## Component Defaults

- Primary buttons: near-black solid with light text
- Secondary buttons: tonal fill
- Ghost buttons: quiet and text-led
- Cards: white or soft neutral surfaces with gentle ring definition
- Tabs and segmented controls: muted rails with a crisp active indicator
- Overlays: stable shells, restrained shadow, clear edge definition
- Use `blode-icons-react` for Blode docs, examples, and repo work

## Gotchas

- Do not invent a permanent brand accent just to make the UI feel more designed
- Do not repaint components with raw Tailwind colors if a semantic token or built-in variant exists
- Do not mix multiple corner philosophies in one view
- Do not let monospace typography leak into general UI copy
- Preserve Base UI accessibility, keyboard behavior, and visible focus states
