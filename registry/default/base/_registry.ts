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
        overlay: "oklch(0.38 0.03 259 / 0.7)",
        "placeholder-foreground": "oklch(0.708 0 0)",
        surface: "oklch(0.2 0 0)",
        "surface-foreground": "oklch(0.708 0 0)",
      },
      light: {
        code: "oklch(0.98 0 0)",
        "code-foreground": "oklch(0.145 0 0)",
        "input-hover": "oklch(0.87 0 0)",
        overlay: "oklch(0.83 0.02 251 / 0.7)",
        "placeholder-foreground": "oklch(0.556 0 0)",
        surface: "oklch(0.98 0 0)",
        "surface-foreground": "oklch(0.145 0 0)",
      },
      theme: {
        "field-height": "48px",
        "field-height-sm": "40px",
        "field-padding-x": "1rem",
        "field-padding-y": "12px",
        "field-radius": "var(--radius-2xl)",
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
