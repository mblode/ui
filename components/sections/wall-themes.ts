import type { ThemeState } from "@/components/theme-visualizer/theme-config";

export interface WallTheme {
  /** Swatch colour for the toggle. */
  swatch: string;
  /** `null` is the shipped Blode theme: no overrides at all. */
  theme: Pick<ThemeState, "colorFamily" | "radius" | "shade"> | null;
  value: string;
  label: string;
}

/*
 * The swatches are literal so the wall does not import the theme visualiser's
 * config (and every Tailwind colour scale with it) on page load. That module
 * is fetched on the first theme change. `wall-themes.test.ts` checks each
 * literal against the scale it came from.
 */
export const WALL_THEMES: WallTheme[] = [
  { label: "Blode", swatch: "oklch(20.5% 0 none)", theme: null, value: "blode" },
  {
    label: "Indigo",
    swatch: "oklch(51.1% 0.262 276.966)",
    theme: { colorFamily: "indigo", radius: "medium", shade: "600" },
    value: "indigo",
  },
  {
    label: "Rose",
    swatch: "oklch(58.6% 0.253 17.585)",
    theme: { colorFamily: "rose", radius: "large", shade: "600" },
    value: "rose",
  },
  {
    label: "Teal",
    swatch: "oklch(51.1% 0.096 186.391)",
    theme: { colorFamily: "teal", radius: "none", shade: "700" },
    value: "teal",
  },
];
