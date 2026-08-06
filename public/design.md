<!-- Generated from DESIGN.md by scripts/build-design-md.mjs. Edit the source, not this file. -->

---

version: alpha
name: Blode UI
description: Neutral-first design system for the Blode UI registry. Built around Glide typography, soft radii, restrained depth, and source-first shadcn/Base UI components. Colour values mirror the deployed blode.co/ui theme.
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
destructive: "#E7000B"
destructive-foreground: "#FFFFFF"
success: "#008236"
success-foreground: "#FFFFFF"
warning: "#D08700"
warning-foreground: "#432004"
border: "#E5E5E5"
input: "#E5E5E5"
input-hover: "#D4D4D4"
placeholder-foreground: "#737373"
ring: "#A1A1A1"
chart-1: "#8EC5FF"
chart-2: "#2B7FFF"
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
overlay: "#C1C9D2B3"
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
fontFamily: "Glide Mono"
fontSize: 12px
fontWeight: 400
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
backgroundColor: "{colors.background}"
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
padding: "{spacing.field-padding-x}"
input-placeholder:
backgroundColor: "{colors.card}"
textColor: "{colors.placeholder-foreground}"
typography: "{typography.body-md}"
rounded: "{rounded.field}"
height: "{spacing.field-height}"
card-default:
backgroundColor: "{colors.card}"
textColor: "{colors.card-foreground}"
rounded: "{rounded.xl}"
padding: "{spacing.lg}"
popover-surface:
backgroundColor: "{colors.popover}"
textColor: "{colors.popover-foreground}"
rounded: "{rounded.md}"
padding: "{spacing.lg}"
dialog-surface:
backgroundColor: "{colors.background}"
textColor: "{colors.foreground}"
rounded: "{rounded.lg}"
padding: "{spacing.xl}"
tabs-list:
backgroundColor: "{colors.muted}"
rounded: "{rounded.lg}"
padding: 3px
tabs-indicator-active:
backgroundColor: "{colors.background}"
textColor: "{colors.foreground}"
typography: "{typography.label-md}"
rounded: "{rounded.md}"
sidebar-surface:
backgroundColor: "{colors.sidebar}"
textColor: "{colors.sidebar-foreground}"
menu-item-focus:
backgroundColor: "{colors.accent}"
textColor: "{colors.accent-foreground}"
typography: "{typography.body-sm}"
rounded: "{rounded.md}"
padding: 6px
sidebar-item-hover:
backgroundColor: "{colors.sidebar-accent}"
textColor: "{colors.sidebar-accent-foreground}"
typography: "{typography.body-sm}"
rounded: "{rounded.md}"
padding: "{spacing.sm}"
button-success:
backgroundColor: "{colors.success}"
textColor: "{colors.success-foreground}"
typography: "{typography.label-md}"
rounded: "{rounded.lg}"
height: "{spacing.field-height-sm}"
padding: "{spacing.md}"
button-warning:
backgroundColor: "{colors.warning}"
textColor: "{colors.warning-foreground}"
typography: "{typography.label-md}"
rounded: "{rounded.lg}"
height: "{spacing.field-height-sm}"
padding: "{spacing.md}"
badge-secondary:
backgroundColor: "{colors.secondary}"
textColor: "{colors.secondary-foreground}"
typography: "{typography.label-sm}"
rounded: "{rounded.full}"
padding: "{spacing.sm}"
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
backgroundColor: "{colors.card}"
textColor: "{colors.destructive}"
rounded: "{rounded.lg}"
padding: "{spacing.lg}"
selection-highlight:
backgroundColor: "{colors.selection}"
textColor: "{colors.selection-foreground}"
---

# Blode UI

## Overview

Blode UI is an opinionated shadcn/ui component registry built by Matthew Blode, with a focus on good taste, care, and craft. Open source. Open code.

**The thesis: quiet, near-monochrome surfaces with unusually round fields, where typography and space do the work that colour and borders do elsewhere.** If a screen built with Blode is memorable, it should be for how little is competing for attention.

Installing this registry does not make an interface good. A design system is an ingredient, not proof of quality: it guarantees the parts agree with each other, not that they were composed into something worth using. Judge the result, not the token coverage.

Source code is part of the product. An interface built with Blode should look resolved and still read as inspectable, forkable, and easy to own. Familiar shadcn patterns are the baseline. Blode's identity comes from better typography, calmer surfaces, softer geometry, and tighter spacing judgment, never from a signature colour or a decorative layer.

The tokens in the frontmatter are the canonical shape. The runtime source of truth is `styles/globals.css`, which declares the same tokens as CSS custom properties in `oklch()` for Tailwind v4. Consumers receive them by installing `@blode/ui`. The hex values above are the sRGB equivalents that ship on `blode.co/ui`, and every component figure below was read from `registry/default/ui/`.

## Deciding

When these pull against each other, protect them in this order:

1. **Accessibility.** Contrast, focus visibility, keyboard operation, and the semantics Base UI already provides.
2. **The semantic token.** A named role that exists always beats a raw value.
3. **Legibility.** Reading size, line height, measure, and numeric alignment.
4. **Hierarchy.** One dominant element per view.
5. **Restraint.** The fewest surfaces, borders, and colours that still express the structure.
6. **Polish.** Radius, shadow, and motion. These come last and never rescue a weak layout.

Every visual decision should trace to a token or to one of these six. "It looked better" is not a reason. Name which one it served.

## Build hierarchy in this order

Reach for the cheapest instrument that works and stop as soon as the structure reads:

1. **Space.** Grouping is proximity. Most flat layouts are a spacing problem wearing a border.
2. **Type.** Size, weight, and text colour carry rank.
3. **Tone.** A shift between `background`, `card`, `surface`, and `muted`.
4. **Border.** A hairline where a real edge exists.
5. **Shadow.** Only for genuine layering above the page.
6. **Colour.** Only when it carries meaning.

If a view still feels flat after space and type, the content is probably undifferentiated. Rank or cut the content before adding a box.

Two checks before shipping a screen. Squint until the text is illegible: one element should dominate and the reading path should stay obvious. Then mask the words: identity, emphasis, grouping, and progression should still read from the shapes alone. If every block carries equal weight, redesign before polishing.

## Earning a surface

The page is one continuous canvas by default. A surface, border, or shadow has to be earned by selection, interaction, elevation, or a real grouping that spacing cannot express.

- Do not wrap every section in a card. A card inside a card is a hierarchy failure.
- A border that only separates two paragraphs should be space instead.
- `surface` is for quiet utility grouping. `card` is for a real container. `muted` is for a rail or an inactive track.
- One dominant action per cluster. If two buttons both read as primary, one of them is secondary.
- Prune before styling. Delete the extra icon, the redundant separator, the third filter nobody uses, then style what survives. Styling a crowded screen makes it a well-styled crowded screen.

Restraint is not sterility. Precise hierarchy, excellent typography, and deliberate contrast are the point. Black, white, hairlines, and empty margins alone are not a design.

## Colours

Blode follows the shadcn `background` and `foreground` convention. The `background` suffix is omitted when the variable is a component's background, and every surface colour has a matching `-foreground`.

```tsx
<div className="bg-primary text-primary-foreground">Hello</div>
```

The palette is built on neutral contrast, not brand chroma. Hierarchy comes from value shifts between `background`, `card`, `surface`, `muted`, and a near-black `foreground`. Saturation is reserved for semantics.

- **`background` (#FFFFFF):** Default canvas. Clean and bright, never tinted.
- **`foreground` (#0A0A0A):** Reading colour for headings, body, and default icons.
- **`primary` (#171717):** Strongest action colour in light mode. One per cluster.
- **`secondary`, `muted`, `accent` (#F5F5F5):** Tonal separators for quiet surfaces, rails, tabs, and secondary buttons. `accent` is specifically the focus and hover fill inside menus.
- **`surface` (#F8F8F8):** Soft utility surface for low-emphasis grouping.
- **`card`, `popover` (#FFFFFF):** Elevated neutral shells.
- **`destructive` (#E7000B):** Reserve for genuinely destructive or invalid states.
- **`border`, `input` (#E5E5E5):** Quiet hairlines and field edges. `input-hover` (#D4D4D4) is the field's hover edge.
- **`placeholder-foreground` (#737373):** Placeholder text. Distinct from `muted-foreground` so the two can diverge without touching every field.
- **`ring` (#A1A1A1):** Focus ring. Always visible, never a glow.
- **`code` surfaces (#F8F8F8, `code-highlight` #F2F2F2, `code-number` #747474):** Source previews sit slightly off the page background so they read as inset.
- **`selection` (#0A0A0A on #FFFFFF):** Inverts on text selection.
- **`overlay` (#C1C9D2 at 70%):** Scrim behind dialogs and sheets, paired with a 10px blur.
- **`chart-1` through `chart-5`:** Tailwind's blue ramp, #8EC5FF to #193CB8. Use sequentially. Never repurpose as brand accents. These are the only tokens with no component of their own, which is deliberate.
- **`sidebar` family:** Mirrors the main neutrals so the sidebar reads as part of the page rather than separate chrome.

### The semantic set

Blode ships three semantic colours where shadcn ships one. `--destructive`, `--success`, and `--warning` each have a `-foreground` pair and each flips in dark mode. Solid `Button` and `Badge` variants use them, so a consumer can retheme every success state by changing one token.

This is a deliberate divergence. shadcn has no success or warning role, so its variants reach for the raw Tailwind ramp, and Blode's did too until these tokens existed. Raw palette values cannot be rethemed, do not respond to a brand change, and quietly contradict the rule two paragraphs up.

**Dark-mode semantic fills always carry a near-black ink.** All three brighten in dark mode to stay visible against a dark canvas, and at that lightness white text fails on every one: 2.89:1 on destructive, 2.22:1 on success, 2.10:1 on warning. The 950-weight inks give 5.60, 6.74, and 7.60. This is the single rule to remember when adding a fourth semantic colour.

Two of the light-mode values are set by contrast rather than taste. `--success` is green-700, not the green-600 the variant used before, because white on green-600 is 3.22:1 and fails AA. `--warning-foreground` is the one that is near-black in **light** mode too, because yellow cannot carry white text at any usable saturation: white on yellow-600 measured 2.94:1, while the dark ink reaches 4.94:1.

The `*Secondary` variants still use the raw ramp for their 50/100/950 tints. Those are wash tints rather than semantic fills, and tokenising six more steps per colour would cost more than it returns. If you need a fourth semantic colour, add a real token; do not extend the raw-palette pattern.

### Adding a colour

Add it to both `:root` and `.dark` in `styles/globals.css`, bridge it in `@theme inline`, add it to this file's frontmatter, and ship it in `registry/default/base/_registry.ts` so installed projects get it too. A token that exists only in this repo is invisible to everyone who installed the registry.

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

Typography is the main source of personality in Blode. **Glide** is the default sans across docs, marketing, and components, shipped as a variable font in roman and italic with a single `wght` axis spanning 100 to 950. Apply it through `font-sans`, mapped by `--font-sans: var(--font-glide)`.

- Headlines are compact and slightly tight-tracked. Hero moments may reach `display-xl`. Most headings live between `headline-lg` and `headline-sm`.
- Body copy sits at `body-md` or `body-sm` with relaxed line height. Keep prose near 60 to 68 characters per line and rewrite before shrinking type.
- Labels, buttons, and tabs use medium weight at 14px. They should read precise, not loud.
- Monospace is Glide Mono, a static 400-weight face. It is for code, commands, paths, and token-like values only. Set the identifier in mono, never the sentence around it.
- Peers share a role. Never resize one value because its string is longer.
- Use `tabular-figures` wherever figures align in a column, not `tabular-nums`. See below.

Use 400 regular, 500 medium, 600 semibold, and 700 bold. The rest of the axis exists but carries no assigned role. Emphasis is scarce: if everything is medium weight, nothing is emphasised.

Glide Mono is static at 400. Asking it for 500 or heavier renders 400, because `font-synthesis-weight: none` is set globally to prevent faux bold. Never pair `font-mono` with `font-medium`; the class is inert.

### Aligned figures

Glide Sans has **proportional** figures. Digit `1` is 353 units wide against `0` at 620, and the font ships no OpenType features at all, so `font-variant-numeric: tabular-nums` does nothing on the sans. A counter, timer, price, or numeric column set in Glide Sans will visibly jitter as its digits change.

Use the `tabular-figures` utility instead. It borrows Glide Mono, whose digits are uniformly 600 units, which is the only mechanism these two fonts offer:

```tsx
<span className="tabular-figures">{elapsed}</span>
```

Reach for it on timestamps, counters, badge counts, meter readouts, and any table column of numbers.

## Layout and rhythm

Layout follows an 8px rhythm with 4px micro-adjustments. Structure comes from spacing first, then tone, then borders.

- Base step `8px`. Reach for `12px`, `16px`, `24px`, `32px`, and `48px` to express grouping and section rhythm.
- Controls are comfortable: `48px` fields, `40px` compact controls, `16px` horizontal field padding, `12px` vertical.
- Textareas start at `70px`. The global header is disciplined at `4rem`.
- Marketing and registry surfaces may stretch to a `1400px` container. Reading surfaces stay narrower.

Give every gap one owner. A flow, stack, or grid sets the gap and its children do not add competing margins. Within a group use 8px to 16px, between groups 24px to 32px, and at a section turn 48px. These express relationships, not one universal stack rule.

Judge the whole transition rather than the token. A large gap next to an underfilled row compounds emptiness even when the value is correct. Rebalance the layout instead of tuning one margin.

## Composition

Rhythm covers the gaps between things. This covers their arrangement.

- **Compose a layout, not a stack of cards.** The most common failure in a system this neutral is reaching for a card every time two things need separating. Sections separated by space read calmer and scan faster than sections separated by boxes.
- **One focal object per screen region.** Give it the width, weight, or contrast the others do not get. If everything is the same size, the reader has to do the ranking that the layout should have done.
- **Density is a decision, not a default.** Dashboards and tables earn tight spacing. Reading surfaces, empty states, and onboarding earn air. Do not apply one density everywhere and call it consistency.
- **Align to something.** Every element sits on a shared edge, baseline, or grid line. An element that lines up with nothing is the fastest way to make a careful system look careless.
- **Let the page end.** Close on the action or the resolution, not on a ledger, a caveat, or whitespace that reads as a loading failure.

## Shape

The shape language is soft, disciplined, and consistent. Warmth without cuteness.

- Base radius `10px`, exposed as `--radius`. The scale is linear: `calc(var(--radius) - 4px / - 2px / +0 / + 4px / + 8px / + 12px / + 16px)`, landing on 6, 8, 10, 14, 18, 22, and 26px.
- The linear offset is deliberate, and diverges from shadcn's multiplicative scale. Both agree at the default radius; they separate as soon as a consumer changes it. At `--radius: 16px` shadcn's ratios inflate `4xl` to 41.6px while Blode holds it at 32px. A restrained system should not let large surfaces balloon because fields got rounder, so `@blode/ui` ships this scale and overrides what the CLI wrote at init.
- Buttons, dialogs, alerts, and the tabs rail use `10px`.
- Menus, popovers, tabs triggers, and sidebar items use `8px`.
- Cards use `14px`.
- Fields use `18px` through `--field-radius`, which makes them the roundest thing on the page and is what marks an interface as Blode at a glance.
- Full pills are reserved for badges, chips, and tightly bounded status.

Do not mix hard and soft corners in one cluster unless the contrast is structural.

## Elevation and depth

Blode is border-led and tone-led before it is shadow-led. Shadows are declared once in `@theme inline` and applied through `shadow-*`.

| Token                    | Used by                                                  |
| ------------------------ | -------------------------------------------------------- |
| `shadow-input`           | Fields and the `input` button variant                    |
| `shadow-xs`, `shadow-sm` | Quiet chips, the active tabs indicator, floating sidebar |
| `shadow-md`              | Menus and tooltips                                       |
| `shadow-lg`              | Dialog panels                                            |
| `shadow-popover`         | The dedicated popover and dropdown stack                 |
| `shadow-soft`            | Popover content and generous marketing surfaces          |

Cards are the deliberate exception. They define their edge with `ring-1 ring-foreground/10` rather than a border or a shadow, which keeps a grid of cards from accumulating visual weight.

Overlays use `overlay` as a tinted scrim with a 10px blur. Dialogs feel solid and quiet, not glassy. Focus always relies on the visible `ring`, never an oversized glow.

## Motion

Motion confirms a state change and nothing else.

- Hover and press stay between `100ms` and `150ms` and feel immediate.
- Dialogs open and close at `200ms`. They travel almost no distance, so anything slower reads as lag, and the overlay must share the panel's timing or the scrim is still darkening after the dialog has landed.
- Sheets and drawers open at `500ms` and close at `300ms`. They earn the longer duration by sliding the full width or height of the viewport, and closing is faster because a dismissal should never feel like waiting.
- Components honour `motion-reduce`. Keep the base experience complete without animation.

No parallax, no scroll-triggered reveals, no decorative pulsing, no bounce.

## Components

Every figure below is the shipped default from `registry/default/ui/`.

### Buttons

Default size is `40px` tall with `10px` radius, `12px` horizontal padding, and 14px medium text. Sizes run `xs` 32px, `sm` 36px, `default` 40px, `lg` 44px, plus `input` at the full 48px field height and `input-sm` at 40px, both adopting the 18px field radius so a button can sit in a form row with the inputs.

Variants are `default`, `secondary`, `outline`, `ghost`, `link`, `input`, and the semantic pairs `destructive`, `success`, and `warning`, each with a quieter `*Secondary` counterpart.

- Hover and active states are low-amplitude tonal changes, usually an opacity step on the same fill.
- Icons inside buttons are sized by the host at `size-4`, dropping to `size-3.5` at `sm` and `size-3` at `xs`.
- Prefer the built-in `loading` prop over composing a spinner by hand. It keeps the label width stable and sets `aria-busy` and `disabled`.
- Never add gradients, glossy highlights, or decorative borders to a core action.

### Fields

Text inputs are `48px` tall with the `18px` field radius, an `input` border, a `card` fill, 16px horizontal and 12px vertical padding, and 16px body text.

- Hover moves the border to `input-hover`. Focus adds a 2px `ring/15` with a 1px offset, keeping the ring readable against the page rather than the field.
- Placeholders use `placeholder-foreground`, never so faint that the field reads disabled.
- Invalid states move the border to `destructive` and never rely on colour alone.

### Cards

Cards are `14px` radius on a `card` fill, `16px` padding, with a `ring-1 ring-foreground/10` edge. Header, content, and footer are separate slots; the footer carries a `muted/50` fill and a top border. A `data-size="sm"` card tightens padding and gap to 12px.

Interiors breathe. Dense padding is the exception, not the default.

### Overlays and navigation

Popovers, dropdowns, dialogs, sheets, and navigation popups share one quiet shell language.

- Popover content is `8px` radius with 16px padding and `shadow-soft`, defaulting to a 288px width.
- Dialog panels are `10px` radius with 24px padding, a border, and `shadow-lg`, capped at 512px on small screens and up.
- Menu items are `8px` radius with tight padding, and use `accent` for focus rather than a hover-only style, so keyboard and pointer land in the same place. Destructive items tint their focus fill to `destructive/10`.
- Tabs use a `muted` rail at `10px` radius with a 3px inset, and a `background` indicator at `8px` radius carrying `shadow-sm`. Inactive triggers sit at `foreground/60` and resolve to full `foreground` on hover.

### Badges

Badges are full pills with 8px horizontal padding, 12px medium text, and an `svg` at `size-3`. Variants are `default`, `secondary`, `destructive`, `outline`, and `ghost`. Use them for bounded status, never as a decorative label on ordinary metadata.

### Alerts

Alerts are `10px` radius with 16px horizontal and 12px vertical padding on a `card` fill. The destructive variant tints the text and icon to `destructive` and keeps the neutral fill. A red panel is not the Blode pattern; the colour belongs to the message, not the container.

### Sidebar

The sidebar uses the `sidebar` token family so it reads as part of the page rather than separate chrome. Menu buttons are `8px` radius with 8px padding, hovering and activating to `sidebar-accent`. The floating variant adds a `10px` radius, a `sidebar-border` edge, and `shadow-sm`.

### Docs and code

Documentation is part of the design system, not a separate skin. Code blocks use the `code` tokens at `14px` radius, slightly inset from the page. Line numbers use `code-number`, highlighted lines use `code-highlight`. Inline code and commands always use the code tokens, never a novelty colour.

### Icons

Use [`blode-icons-react`](https://blode.co/icons), a drop-in replacement for `lucide-react` with the same names and props.

```tsx
import { SearchIcon } from "blode-icons-react";

<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>;
```

- Inside Blode components, set placement with `data-icon="inline-start"` or `data-icon="inline-end"`. Do not add `size-*`, `w-*`, or `h-*` inside a component; the host owns sizing and adjusts it per button size.
- Outside components, `<SearchIcon size={24} />` is fine.
- Icons inherit `currentColor`. Recolour through the surrounding `text-*` token.
- One icon library per project.

## Dark mode

Dark mode mirrors the same system rather than introducing a second visual language. The relative hierarchy holds: background darker than card, card darker than accent, foreground near-white, destructive slightly softer.

Borders and inputs switch to alpha-white so they read consistently against varying card tones, which is the one structural difference between the themes.

```css
.dark {
  --background: oklch(0.145 0 0); /* #0A0A0A */
  --foreground: oklch(0.985 0 0); /* #FAFAFA */
  --card: oklch(0.205 0 0); /* #171717 */
  --popover: oklch(0.205 0 0); /* #171717 */
  --primary: oklch(0.922 0 0); /* #E5E5E5 */
  --primary-foreground: oklch(0.205 0 0); /* #171717 */
  --secondary: oklch(0.269 0 0); /* #262626 */
  --muted: oklch(0.269 0 0); /* #262626 */
  --muted-foreground: oklch(0.708 0 0); /* #A1A1A1 */
  --accent: oklch(0.371 0 0); /* #404040 */
  --destructive: oklch(0.704 0.191 22.216); /* #FF6467 */
  --border: oklch(1 0 0 / 10%); /* white at 10% */
  --input: oklch(1 0 0 / 15%); /* white at 15% */
  --input-hover: oklch(1 0 0 / 25%); /* white at 25% */
  --ring: oklch(0.556 0 0); /* #737373 */
  --surface: oklch(0.2 0 0); /* #161616 */
  --overlay: oklch(0.326 0.03 258.3 / 0.7); /* #2B3544 at 70% */
}
```

Check both themes before shipping. Equivalent hierarchy and contrast in each is the requirement, not identical values.

## Reject these reflexes

These are the defaults that creep in when a screen is assembled rather than designed:

- A permanent brand accent added to make the UI feel more designed.
- Every section wrapped in a card, or a card nested in a card.
- Borders used to repair hierarchy that spacing should have carried.
- Tiny muted prose used to make dense content fit.
- Arbitrary font sizes or numeric weights outside the type scale.
- Raw Tailwind colours where a semantic token exists.
- A badge or pill around ordinary metadata.
- Repeated metric boxes where one composed relationship would read faster.
- Glassmorphism, neon gradients, glows, textures, and oversized shadows.
- Mixed icon packs, mixed sans families, or mixed corner philosophies in one view.
- Dark mode designed as a separate visual language.
- Colour as the only signal for state.

## Before you ship

The exit gate. If any answer is no, the screen is not finished.

- Squint until the text blurs. Does one thing still dominate, and is the reading path obvious?
- Can any surface, border, icon, label, or divider be deleted without losing meaning or affordance?
- Does every colour that is not neutral carry meaning, with a non-colour cue beside it?
- Do hover, focus, pressed, disabled, loading, empty, and error all exist where the control can reach them?
- Do controls hold their dimensions when the label, count, or loading text changes?
- Do light and dark have equivalent hierarchy, or has one been checked and the other assumed?
- Does it still work at 320px and at 2000px without a horizontal scrollbar?
- Would this look at home beside Linear, Zed, or Mintlify rather than beside a template?

## Tooling

Lint this file with the Google Labs `design.md` CLI:

```bash
npx -p @google/design.md@latest design.md lint DESIGN.md
```

The CLI package is `@google/design.md` and the binary is `design.md`.

A clean run is `0 errors` with 15 `orphaned-tokens` warnings. Those are expected and should not be chased. The schema's component sub-tokens are only `backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, and `width`, so a token that only ever appears as a border, ring, scrim, or chart series has nowhere to be referenced from:

- `border`, `input`, `input-hover`, `ring`, `sidebar-border`, `sidebar-ring` are edge and focus colours.
- `overlay` is a scrim.
- `chart-1` through `chart-5` belong to data, not to a component.
- `sidebar-primary` and `sidebar-primary-foreground` are defined for parity with the shadcn sidebar contract and are currently unused by any Blode component.

Do not invent a component entry to silence one of these. An invented entry makes this file disagree with `registry/default/ui/`, which is the failure this file exists to prevent.
