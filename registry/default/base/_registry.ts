import type { Registry } from "shadcn/schema";

export const base: Registry["items"] = [
  {
    config: {
      iconLibrary: "blode-icons-react",
      registries: {
        "@blode": "https://blode.co/ui/r/{name}.json",
      },
      // No `style`. The CLI feeds `config.style` straight into the built-in
      // `@shadcn` registry template
      // (`https://ui.shadcn.com/r/styles/{style}/{name}.json`) and that host is
      // hardcoded, so a Blode-specific style name 404s on init against a
      // registry we do not control. Omitting it falls back to the CLI default
      // and lets the cssVars below layer Blode's tokens over that base.
      tailwind: {
        baseColor: "neutral",
        cssVariables: true,
      },
    },
    css: {
      // Shipped here rather than as per-component `motion-reduce:` variants,
      // which only 6 of the 26 moving components actually carried. Spinner
      // animates with SVG SMIL, so essential loading motion is unaffected.
      "@media (prefers-reduced-motion: reduce)": {
        "*, *::before, *::after": {
          "animation-duration": "0.01ms !important",
          "animation-iteration-count": "1 !important",
          "scroll-behavior": "auto !important",
          "transition-duration": "0.01ms !important",
        },
      },
      // Glide's figures are proportional (digit "1" is 353 units against "0" at
      // 620) and the font ships no `tnum` feature, so `font-variant-numeric:
      // tabular-nums` is inert on the sans. Glide Mono is genuinely monospaced
      // at 600 per digit, so aligned columns and counters borrow it.
      "@utility tabular-figures": {
        "font-family": "var(--font-mono)",
        "font-variant-numeric": "tabular-nums",
      },
    },
    // Blode components compile to `h-[var(--field-height)]`,
    // `rounded-[var(--field-radius)]`, `shadow-input`, `border-input-hover` and
    // friends. Without these the classes resolve to nothing and every control
    // renders unstyled, so the design-system item has to carry them.
    //
    // Keys are unprefixed per the shadcn convention; the CLI adds the `--`.
    // `--radius-2xl/3xl/4xl` are deliberately absent: shadcn's own scale
    // (`calc(var(--radius) * 1.8 / 2.2 / 2.6)`) already lands on 18/22/26px at
    // the default `--radius`, which is what Blode's `+8/12/16px` produces.
    cssVars: {
      // Literal colors, not `var(--foreground)` indirection. The CLI only
      // generates the `@theme inline` `--color-*` mapping for values it can
      // recognise as a color.
      dark: {
        code: "oklch(0.2 0 0)",
        "code-foreground": "oklch(0.708 0 0)",
        "input-hover": "oklch(1 0 0 / 25%)",
        overlay: "oklch(0.326 0.03 258.3 / 0.7)",
        "placeholder-foreground": "oklch(0.708 0 0)",
        success: "oklch(0.723 0.219 149.579)",
        "success-foreground": "oklch(0.266 0.065 152.934)",
        surface: "oklch(0.2 0 0)",
        "surface-foreground": "oklch(0.708 0 0)",
        warning: "oklch(0.795 0.184 86.047)",
        "warning-foreground": "oklch(0.286 0.066 53.813)",
      },
      light: {
        code: "oklch(0.98 0 0)",
        "code-foreground": "oklch(0.145 0 0)",
        "input-hover": "oklch(0.87 0 0)",
        overlay: "oklch(0.832 0.015 251.2 / 0.7)",
        "placeholder-foreground": "oklch(0.556 0 0)",
        success: "oklch(0.527 0.154 150.069)",
        "success-foreground": "oklch(1 0 0)",
        surface: "oklch(0.98 0 0)",
        "surface-foreground": "oklch(0.145 0 0)",
        warning: "oklch(0.681 0.162 75.834)",
        "warning-foreground": "oklch(0.286 0.066 53.813)",
      },
      theme: {
        "field-height": "48px",
        "field-height-sm": "40px",
        "field-padding-x": "1rem",
        "field-padding-y": "12px",
        "field-radius": "var(--radius-2xl)",
        // Blode's linear offsets override the multiplicative scale shadcn's CLI
        // writes at init. Identical at the default --radius; at --radius:16px
        // shadcn gives 4xl 41.6px against Blode's 32px.
        "radius-2xl": "calc(var(--radius) + 8px)",
        "radius-3xl": "calc(var(--radius) + 12px)",
        "radius-4xl": "calc(var(--radius) + 16px)",
        "radius-md": "calc(var(--radius) - 2px)",
        "radius-sm": "calc(var(--radius) - 4px)",
        "radius-xl": "calc(var(--radius) + 4px)",
        "shadow-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "shadow-lg":
          "0 0 0 1px rgba(51, 51, 51, 0.04), 0 1px 1px 0.5px rgba(51, 51, 51, 0.04), 0 3px 3px -1.5px rgba(51, 51, 51, 0.02), 0 6px 6px -3px rgba(51, 51, 51, 0.04), 0 12px 12px -6px rgba(51, 51, 51, 0.04), 0 24px 24px -12px rgba(51, 51, 51, 0.04), 0 48px 48px -24px rgba(51, 51, 51, 0.04), 0 96px 96px -32px rgba(51, 51, 51, 0.06), inset 0 -1px 1px -0.5px rgba(51, 51, 51, 0.06)",
        "shadow-md":
          "0 0 0 1px rgba(51, 51, 51, 0.04), 0 1px 1px 0.5px rgba(51, 51, 51, 0.04), 0 3px 3px -1.5px rgba(51, 51, 51, 0.02), 0 6px 6px -3px rgba(51, 51, 51, 0.04), 0 12px 12px -6px rgba(51, 51, 51, 0.04), 0 24px 24px -12px rgba(51, 51, 51, 0.04), 0 48px 48px -24px rgba(51, 51, 51, 0.04), inset 0 -1px 1px -0.5px rgba(51, 51, 51, 0.06)",
        "shadow-popover":
          "0 24px 40px -12px oklch(0.255 0.078 116.06 / 0.08), 0 16px 28px -8px oklch(0.255 0.078 116.06 / 0.04), 0 4px 6px -2px oklch(0.255 0.078 116.06 / 0.04), 0 0 2px 0 oklch(0.255 0.078 116.06 / 0.04), 0 0 0 1px oklch(0.255 0.078 116.06 / 0.04)",
        "shadow-sm":
          "0 0 0 1px rgba(51, 51, 51, 0.04), 0 16px 8px -8px rgba(51, 51, 51, 0.01), 0 12px 6px -6px rgba(51, 51, 51, 0.02), 0 5px 5px -2.5px rgba(51, 51, 51, 0.08), 0 1px 3px -1.5px rgba(51, 51, 51, 0.16), inset 0 -0.5px 0.5px rgba(51, 51, 51, 0.08)",
        "shadow-soft": "0 15px 50px 0 rgba(27, 32, 50, 0.1)",
        "shadow-xs":
          "0 0 0 1px rgba(51, 51, 51, 0.04), 0 4px 8px -2px rgba(51, 51, 51, 0.06), 0 2px 4px rgba(51, 51, 51, 0.04), 0 1px 2px rgba(51, 51, 51, 0.04), inset 0 -1px 1px -0.5px rgba(51, 51, 51, 0.06)",
        "textarea-min-height": "70px",
      },
    },
    dependencies: [
      "@base-ui/react",
      "tw-animate-css",
      "class-variance-authority",
      "blode-icons-react",
    ],
    description: "Blode UI design-system base built on Base UI.",
    name: "ui",
    registryDependencies: ["utils"],
    title: "Blode UI",
    type: "registry:base",
  },
];
