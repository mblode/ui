import type { CSSProperties } from "react";
import tailwindColors from "tailwindcss/colors";

export const THEME_COLOR_FAMILY_LIST = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "mauve",
  "olive",
  "mist",
  "taupe",
] as const;

export type ThemeColorFamily = (typeof THEME_COLOR_FAMILY_LIST)[number];

export const THEME_SHADE_LIST = [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
] as const;

export type ThemeShade = (typeof THEME_SHADE_LIST)[number];
type ThemeScaleShade = ThemeShade | "50" | "950";
export type ThemeColorScale = Record<ThemeScaleShade, string>;

export const THEME_COLOR_SCALES = {
  red: tailwindColors.red,
  orange: tailwindColors.orange,
  amber: tailwindColors.amber,
  yellow: tailwindColors.yellow,
  lime: tailwindColors.lime,
  green: tailwindColors.green,
  emerald: tailwindColors.emerald,
  teal: tailwindColors.teal,
  cyan: tailwindColors.cyan,
  sky: tailwindColors.sky,
  blue: tailwindColors.blue,
  indigo: tailwindColors.indigo,
  violet: tailwindColors.violet,
  purple: tailwindColors.purple,
  fuchsia: tailwindColors.fuchsia,
  pink: tailwindColors.pink,
  rose: tailwindColors.rose,
  slate: tailwindColors.slate,
  gray: tailwindColors.gray,
  zinc: tailwindColors.zinc,
  neutral: tailwindColors.neutral,
  stone: tailwindColors.stone,
  mauve: tailwindColors.mauve,
  olive: tailwindColors.olive,
  mist: tailwindColors.mist,
  taupe: tailwindColors.taupe,
} satisfies Record<ThemeColorFamily, ThemeColorScale>;

export const DEFAULT_THEME_COLOR_FAMILY: ThemeColorFamily = "indigo";
export const DEFAULT_THEME_SHADE: ThemeShade = "600";

export const THEME_RADIUS_LIST = [
  "none",
  "small",
  "medium",
  "large",
  "full",
] as const;

export type ThemeRadius = (typeof THEME_RADIUS_LIST)[number];

export const THEME_RADIUS_OPTIONS = {
  none: "0rem",
  small: "0.375rem",
  medium: "0.625rem",
  large: "1rem",
  full: "999rem",
} as const satisfies Record<ThemeRadius, `${number}rem`>;

export const DEFAULT_THEME_RADIUS: ThemeRadius = "medium";

export interface ThemeFontOption {
  fallback: string;
  family: string;
  label: string;
}

const SANS_FALLBACK_STACK =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const SERIF_FALLBACK_STACK =
  'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif';

export const THEME_SANS_FONT_OPTIONS = [
  { family: "Glide", label: "Glide", fallback: SANS_FALLBACK_STACK },
  { family: "Inter", label: "Inter", fallback: SANS_FALLBACK_STACK },
  { family: "DM Sans", label: "DM Sans", fallback: SANS_FALLBACK_STACK },
  {
    family: "Instrument Sans",
    label: "Instrument Sans",
    fallback: SANS_FALLBACK_STACK,
  },
  {
    family: "IBM Plex Sans",
    label: "IBM Plex Sans",
    fallback: SANS_FALLBACK_STACK,
  },
  { family: "Lato", label: "Lato", fallback: SANS_FALLBACK_STACK },
  { family: "Manrope", label: "Manrope", fallback: SANS_FALLBACK_STACK },
  {
    family: "Nunito Sans",
    label: "Nunito Sans",
    fallback: SANS_FALLBACK_STACK,
  },
  { family: "Onest", label: "Onest", fallback: SANS_FALLBACK_STACK },
  { family: "Open Sans", label: "Open Sans", fallback: SANS_FALLBACK_STACK },
  { family: "Outfit", label: "Outfit", fallback: SANS_FALLBACK_STACK },
  {
    family: "Plus Jakarta Sans",
    label: "Plus Jakarta Sans",
    fallback: SANS_FALLBACK_STACK,
  },
  { family: "Poppins", label: "Poppins", fallback: SANS_FALLBACK_STACK },
  {
    family: "Public Sans",
    label: "Public Sans",
    fallback: SANS_FALLBACK_STACK,
  },
  { family: "Roboto", label: "Roboto", fallback: SANS_FALLBACK_STACK },
  { family: "Rubik", label: "Rubik", fallback: SANS_FALLBACK_STACK },
  {
    family: "Source Sans 3",
    label: "Source Sans 3",
    fallback: SANS_FALLBACK_STACK,
  },
  {
    family: "Space Grotesk",
    label: "Space Grotesk",
    fallback: SANS_FALLBACK_STACK,
  },
] as const satisfies readonly ThemeFontOption[];

export const THEME_SERIF_FONT_OPTIONS = [
  { family: "Bitter", label: "Bitter", fallback: SERIF_FALLBACK_STACK },
  {
    family: "DM Serif Display",
    label: "DM Serif Display",
    fallback: SERIF_FALLBACK_STACK,
  },
  {
    family: "Libre Baskerville",
    label: "Libre Baskerville",
    fallback: SERIF_FALLBACK_STACK,
  },
  { family: "Lora", label: "Lora", fallback: SERIF_FALLBACK_STACK },
  {
    family: "Merriweather",
    label: "Merriweather",
    fallback: SERIF_FALLBACK_STACK,
  },
  {
    family: "Source Serif 4",
    label: "Source Serif 4",
    fallback: SERIF_FALLBACK_STACK,
  },
  {
    family: "Playfair Display",
    label: "Playfair Display",
    fallback: SERIF_FALLBACK_STACK,
  },
] as const satisfies readonly ThemeFontOption[];

export const THEME_FONT_OPTIONS = [
  ...THEME_SANS_FONT_OPTIONS,
  ...THEME_SERIF_FONT_OPTIONS,
] as const;

export type ThemeFontFamily = (typeof THEME_FONT_OPTIONS)[number]["family"];

export const DEFAULT_THEME_TEXT_FONT: ThemeFontFamily = "Glide";
export const DEFAULT_THEME_HEADING_FONT: ThemeFontFamily = "Glide";
export const DEFAULT_THEME_IS_FONT_LOCKED = true;
export const DEFAULT_THEME_DARK_MODE = false;

export interface ThemeState {
  colorFamily: ThemeColorFamily;
  darkMode: boolean;
  headingFont: ThemeFontFamily;
  isFontLocked: boolean;
  radius: ThemeRadius;
  shade: ThemeShade;
  textFont: ThemeFontFamily;
}

export const DEFAULT_THEME_STATE: ThemeState = {
  colorFamily: DEFAULT_THEME_COLOR_FAMILY,
  shade: DEFAULT_THEME_SHADE,
  radius: DEFAULT_THEME_RADIUS,
  textFont: DEFAULT_THEME_TEXT_FONT,
  headingFont: DEFAULT_THEME_HEADING_FONT,
  isFontLocked: DEFAULT_THEME_IS_FONT_LOCKED,
  darkMode: DEFAULT_THEME_DARK_MODE,
};

type ThemeVariableRecord = Record<`--${string}`, string>;

const NEUTRAL_COLOR_FAMILY_LIST = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "mauve",
  "olive",
  "mist",
  "taupe",
] as const;

type NeutralColorFamily = (typeof NEUTRAL_COLOR_FAMILY_LIST)[number];
const THEME_BOOLEAN_LIST = [false, true] as const;
const WHITE_COLOR_FALLBACK = tailwindColors.white;
const SHADE_INDEX_MAP: Record<ThemeShade, number> = {
  "100": 0,
  "200": 1,
  "300": 2,
  "400": 3,
  "500": 4,
  "600": 5,
  "700": 6,
  "800": 7,
  "900": 8,
};

function isNeutralColorFamily(
  colorFamily: ThemeColorFamily
): colorFamily is NeutralColorFamily {
  return NEUTRAL_COLOR_FAMILY_LIST.includes(colorFamily as NeutralColorFamily);
}

function shiftShade(shade: ThemeShade, offset: number): ThemeShade {
  const nextIndex = Math.min(
    Math.max(SHADE_INDEX_MAP[shade] + offset, 0),
    THEME_SHADE_LIST.length - 1
  );
  return THEME_SHADE_LIST[nextIndex];
}

function getColorVar(colorFamily: ThemeColorFamily, shade: ThemeShade): string {
  return `var(--color-${colorFamily}-${shade}, ${THEME_COLOR_SCALES[colorFamily][shade]})`;
}

function isDarkShade(shade: ThemeShade): boolean {
  return Number(shade) >= 500;
}

function getFontOption(fontFamily: ThemeFontFamily) {
  const option = THEME_FONT_OPTIONS.find((font) => font.family === fontFamily);
  if (!option) {
    throw new Error(`Unknown theme font family: ${fontFamily}`);
  }
  return option;
}

function getFontStack(fontFamily: ThemeFontFamily): string {
  const option = getFontOption(fontFamily);
  return `"${option.family}", ${option.fallback}`;
}

export function getThemeFontStack(fontFamily: ThemeFontFamily): string {
  return getFontStack(fontFamily);
}

function pickRandom<T>(values: readonly T[], exclude?: T): T {
  if (values.length === 0) {
    throw new Error("Cannot pick a random value from an empty list.");
  }

  if (exclude === undefined || values.length === 1) {
    return values[Math.floor(Math.random() * values.length)];
  }

  const filteredValues = values.filter((value) => value !== exclude);
  if (filteredValues.length === 0) {
    return values[Math.floor(Math.random() * values.length)];
  }

  return filteredValues[Math.floor(Math.random() * filteredValues.length)];
}

function buildCssBlock(
  selector: string,
  variables: ThemeVariableRecord
): string {
  const declarations = Object.entries(variables)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");

  return `${selector} {\n${declarations}\n}`;
}

export function getThemeVariables(state: ThemeState = DEFAULT_THEME_STATE): {
  root: ThemeVariableRecord;
  dark: ThemeVariableRecord;
} {
  const neutralFamily: ThemeColorFamily = isNeutralColorFamily(
    state.colorFamily
  )
    ? state.colorFamily
    : "slate";
  const primaryShade = state.shade;
  const darkPrimaryShade = shiftShade(state.shade, -2);
  const primaryForeground = isDarkShade(primaryShade)
    ? `var(--color-white, ${WHITE_COLOR_FALLBACK})`
    : getColorVar(neutralFamily, "900");
  const darkPrimaryForeground = isDarkShade(darkPrimaryShade)
    ? `var(--color-white, ${WHITE_COLOR_FALLBACK})`
    : getColorVar(neutralFamily, "900");

  const root: ThemeVariableRecord = {
    "--background": getColorVar(neutralFamily, "100"),
    "--foreground": getColorVar(neutralFamily, "900"),
    "--card": `var(--color-white, ${WHITE_COLOR_FALLBACK})`,
    "--card-foreground": getColorVar(neutralFamily, "900"),
    "--popover": `var(--color-white, ${WHITE_COLOR_FALLBACK})`,
    "--popover-foreground": getColorVar(neutralFamily, "900"),
    "--primary": getColorVar(state.colorFamily, primaryShade),
    "--primary-foreground": primaryForeground,
    "--secondary": getColorVar(state.colorFamily, shiftShade(primaryShade, -4)),
    "--secondary-foreground": getColorVar(neutralFamily, "900"),
    "--muted": getColorVar(neutralFamily, "200"),
    "--muted-foreground": getColorVar(neutralFamily, "700"),
    "--accent": getColorVar(state.colorFamily, shiftShade(primaryShade, -3)),
    "--accent-foreground": getColorVar(neutralFamily, "900"),
    "--destructive": `var(--color-red-600, ${THEME_COLOR_SCALES.red["600"]})`,
    "--destructive-foreground": `var(--color-white, ${WHITE_COLOR_FALLBACK})`,
    "--border": getColorVar(neutralFamily, "300"),
    "--input": getColorVar(neutralFamily, "300"),
    "--ring": getColorVar(state.colorFamily, shiftShade(primaryShade, -1)),
    "--sidebar": getColorVar(neutralFamily, "100"),
    "--sidebar-foreground": getColorVar(neutralFamily, "900"),
    "--sidebar-primary": getColorVar(state.colorFamily, primaryShade),
    "--sidebar-primary-foreground": primaryForeground,
    "--sidebar-accent": getColorVar(
      state.colorFamily,
      shiftShade(primaryShade, -4)
    ),
    "--sidebar-accent-foreground": getColorVar(neutralFamily, "900"),
    "--sidebar-border": getColorVar(neutralFamily, "300"),
    "--sidebar-ring": getColorVar(
      state.colorFamily,
      shiftShade(primaryShade, -1)
    ),
    "--chart-1": getColorVar(state.colorFamily, shiftShade(primaryShade, -2)),
    "--chart-2": getColorVar(state.colorFamily, shiftShade(primaryShade, -1)),
    "--chart-3": getColorVar(state.colorFamily, primaryShade),
    "--chart-4": getColorVar(state.colorFamily, shiftShade(primaryShade, 1)),
    "--chart-5": getColorVar(state.colorFamily, shiftShade(primaryShade, 2)),
    "--radius": THEME_RADIUS_OPTIONS[state.radius],
    "--font-glide": getFontStack(state.textFont),
    "--theme-heading-font": getFontStack(state.headingFont),
  };

  const dark: ThemeVariableRecord = {
    "--background": getColorVar(neutralFamily, "900"),
    "--foreground": getColorVar(neutralFamily, "100"),
    "--card": getColorVar(neutralFamily, "800"),
    "--card-foreground": getColorVar(neutralFamily, "100"),
    "--popover": getColorVar(neutralFamily, "800"),
    "--popover-foreground": getColorVar(neutralFamily, "100"),
    "--primary": getColorVar(state.colorFamily, darkPrimaryShade),
    "--primary-foreground": darkPrimaryForeground,
    "--secondary": getColorVar(neutralFamily, "800"),
    "--secondary-foreground": getColorVar(neutralFamily, "100"),
    "--muted": getColorVar(neutralFamily, "800"),
    "--muted-foreground": getColorVar(neutralFamily, "300"),
    "--accent": getColorVar(state.colorFamily, shiftShade(primaryShade, -1)),
    "--accent-foreground": getColorVar(neutralFamily, "100"),
    "--destructive": `var(--color-red-500, ${THEME_COLOR_SCALES.red["500"]})`,
    "--destructive-foreground": `var(--color-white, ${WHITE_COLOR_FALLBACK})`,
    "--border": getColorVar(neutralFamily, "700"),
    "--input": getColorVar(neutralFamily, "700"),
    "--ring": getColorVar(state.colorFamily, shiftShade(primaryShade, -2)),
    "--sidebar": getColorVar(neutralFamily, "900"),
    "--sidebar-foreground": getColorVar(neutralFamily, "100"),
    "--sidebar-primary": getColorVar(state.colorFamily, darkPrimaryShade),
    "--sidebar-primary-foreground": darkPrimaryForeground,
    "--sidebar-accent": getColorVar(neutralFamily, "800"),
    "--sidebar-accent-foreground": getColorVar(neutralFamily, "100"),
    "--sidebar-border": getColorVar(neutralFamily, "700"),
    "--sidebar-ring": getColorVar(
      state.colorFamily,
      shiftShade(primaryShade, -2)
    ),
    "--chart-1": getColorVar(state.colorFamily, shiftShade(primaryShade, -4)),
    "--chart-2": getColorVar(state.colorFamily, shiftShade(primaryShade, -3)),
    "--chart-3": getColorVar(state.colorFamily, shiftShade(primaryShade, -2)),
    "--chart-4": getColorVar(state.colorFamily, shiftShade(primaryShade, -1)),
    "--chart-5": getColorVar(state.colorFamily, primaryShade),
  };

  return { root, dark };
}

export function buildThemeCss(state: ThemeState = DEFAULT_THEME_STATE): string {
  const { root, dark } = getThemeVariables(state);
  return `${buildCssBlock(":root", root)}\n\n${buildCssBlock(".dark", dark)}`;
}

export function buildPreviewStyle(
  state: ThemeState = DEFAULT_THEME_STATE
): CSSProperties {
  const { root, dark } = getThemeVariables(state);
  const activeVariables = state.darkMode ? { ...root, ...dark } : root;
  return activeVariables as CSSProperties;
}

export function getRandomThemeState(current?: ThemeState): ThemeState {
  const colorFamily = pickRandom(THEME_COLOR_FAMILY_LIST, current?.colorFamily);
  const shade = pickRandom(THEME_SHADE_LIST, current?.shade);
  const radius = pickRandom(THEME_RADIUS_LIST, current?.radius);
  const isFontLocked = pickRandom(THEME_BOOLEAN_LIST, current?.isFontLocked);
  const darkMode = pickRandom(THEME_BOOLEAN_LIST, current?.darkMode);

  const currentTextFont = current ? getFontOption(current.textFont) : undefined;
  const currentHeadingFont = current
    ? getFontOption(current.headingFont)
    : undefined;
  const textFont = pickRandom(THEME_FONT_OPTIONS, currentTextFont).family;
  const headingFont = isFontLocked
    ? textFont
    : pickRandom(THEME_FONT_OPTIONS, currentHeadingFont).family;

  return {
    colorFamily,
    shade,
    radius,
    textFont,
    headingFont,
    isFontLocked,
    darkMode,
  };
}
