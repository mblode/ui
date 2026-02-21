export interface ContrastPair {
  backgroundVar: string;
  foregroundVar: string;
  id: string;
  label: string;
}

export interface RgbColor {
  b: number;
  g: number;
  r: number;
}

export interface EvaluatedContrastPair extends ContrastPair {
  backgroundColor: RgbColor | null;
  foregroundColor: RgbColor | null;
  passesAA: boolean;
  passesAAA: boolean;
  ratio: number | null;
}

export const defaultContrastPairs: ContrastPair[] = [
  {
    id: "primary",
    label: "Primary",
    foregroundVar: "--primary-foreground",
    backgroundVar: "--primary",
  },
  {
    id: "background",
    label: "Background",
    foregroundVar: "--foreground",
    backgroundVar: "--background",
  },
  {
    id: "background-muted-text",
    label: "Background / Muted Text",
    foregroundVar: "--muted-foreground",
    backgroundVar: "--background",
  },
  {
    id: "card",
    label: "Card",
    foregroundVar: "--card-foreground",
    backgroundVar: "--card",
  },
  {
    id: "popover",
    label: "Popover",
    foregroundVar: "--popover-foreground",
    backgroundVar: "--popover",
  },
  {
    id: "secondary",
    label: "Secondary",
    foregroundVar: "--secondary-foreground",
    backgroundVar: "--secondary",
  },
  {
    id: "muted",
    label: "Muted",
    foregroundVar: "--muted-foreground",
    backgroundVar: "--muted",
  },
  {
    id: "accent",
    label: "Accent",
    foregroundVar: "--accent-foreground",
    backgroundVar: "--accent",
  },
  {
    id: "destructive",
    label: "Destructive",
    foregroundVar: "--destructive-foreground",
    backgroundVar: "--destructive",
  },
  {
    id: "sidebar",
    label: "Sidebar",
    foregroundVar: "--sidebar-foreground",
    backgroundVar: "--sidebar",
  },
  {
    id: "sidebar-primary",
    label: "Sidebar Primary",
    foregroundVar: "--sidebar-primary-foreground",
    backgroundVar: "--sidebar-primary",
  },
  {
    id: "sidebar-accent",
    label: "Sidebar Accent",
    foregroundVar: "--sidebar-accent-foreground",
    backgroundVar: "--sidebar-accent",
  },
];

export const DEFAULT_CONTRAST_PAIRS = defaultContrastPairs;

const RGB_FUNCTION_REGEX = /^rgba?\(\s*(.+)\s*\)$/i;
const HEX_COLOR_REGEX = /^#([\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i;
const OKLCH_FUNCTION_REGEX = /^oklch\(\s*(.+)\s*\)$/i;
const COLOR_SRGB_FUNCTION_REGEX = /^color\(\s*srgb\s+(.+)\)$/i;
const WHITESPACE_REGEX = /\s+/;
const NUMBER_REGEX = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i;
const ANGLE_REGEX =
  /^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(deg|grad|rad|turn)?$/i;

function clampColorChannel(value: number): number {
  return Math.max(0, Math.min(255, value));
}

function clampUnitInterval(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function parseNumberToken(token: string): number | null {
  const value = token.trim().toLowerCase();
  if (!NUMBER_REGEX.test(value)) {
    return null;
  }

  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return parsed;
}

function parsePercentageOrNumberToken(
  token: string
): { isPercent: boolean; value: number } | null {
  const value = token.trim();
  if (!value) {
    return null;
  }

  if (value.endsWith("%")) {
    const percent = parseNumberToken(value.slice(0, -1));
    if (percent === null) {
      return null;
    }

    return { value: percent, isPercent: true };
  }

  const numericValue = parseNumberToken(value);
  if (numericValue === null) {
    return null;
  }

  return { value: numericValue, isPercent: false };
}

function parseRgbChannel(token: string): number | null {
  const parsed = parsePercentageOrNumberToken(token);
  if (!parsed) {
    return null;
  }

  if (parsed.isPercent) {
    return clampColorChannel((parsed.value / 100) * 255);
  }

  return clampColorChannel(parsed.value);
}

function parseSrgbFunctionChannel(token: string): number | null {
  const parsed = parsePercentageOrNumberToken(token);
  if (!parsed) {
    return null;
  }

  if (parsed.isPercent) {
    return clampUnitInterval(parsed.value / 100);
  }

  return clampUnitInterval(parsed.value);
}

function parseOklchLightness(token: string): number | null {
  const parsed = parsePercentageOrNumberToken(token);
  if (!parsed) {
    return null;
  }

  if (parsed.isPercent) {
    return clampUnitInterval(parsed.value / 100);
  }

  if (parsed.value > 1 && parsed.value <= 100) {
    return clampUnitInterval(parsed.value / 100);
  }

  return clampUnitInterval(parsed.value);
}

function parseOklchChroma(token: string): number | null {
  const parsed = parsePercentageOrNumberToken(token);
  if (!parsed) {
    return null;
  }

  if (parsed.isPercent) {
    return Math.max(0, parsed.value / 100);
  }

  return Math.max(0, parsed.value);
}

function parseHueAngle(token: string): number | null {
  const value = token.trim().toLowerCase();
  if (!value) {
    return null;
  }

  if (value === "none") {
    return 0;
  }

  const match = ANGLE_REGEX.exec(value);
  if (!match) {
    return null;
  }

  const amount = parseNumberToken(match[1]);
  if (amount === null) {
    return null;
  }

  const unit = match[2] ?? "deg";
  let degrees = amount;

  if (unit === "grad") {
    degrees = amount * 0.9;
  } else if (unit === "rad") {
    degrees = (amount * 180) / Math.PI;
  } else if (unit === "turn") {
    degrees = amount * 360;
  }

  const normalized = degrees % 360;
  return normalized < 0 ? normalized + 360 : normalized;
}

function srgbEncode(linear: number): number {
  const bounded = clampUnitInterval(linear);
  if (bounded <= 0.003_130_8) {
    return 12.92 * bounded;
  }
  return 1.055 * bounded ** (1 / 2.4) - 0.055;
}

function parseRgbFunctionColor(input: string): RgbColor | null {
  const match = RGB_FUNCTION_REGEX.exec(input);
  if (!match) {
    return null;
  }

  const args = match[1].trim();
  let channels: string[] = [];

  if (args.includes(",")) {
    channels = args.split(",").map((part) => part.trim());
    if (channels.length >= 3 && channels[2].includes("/")) {
      const [blueWithoutAlpha] = channels[2].split("/");
      channels[2] = blueWithoutAlpha.trim();
    }
  } else {
    const [rgbPart] = args.split("/");
    channels = rgbPart
      .trim()
      .split(WHITESPACE_REGEX)
      .map((part) => part.trim())
      .filter(Boolean);
  }

  if (channels.length < 3) {
    return null;
  }

  const r = parseRgbChannel(channels[0]);
  const g = parseRgbChannel(channels[1]);
  const b = parseRgbChannel(channels[2]);

  if (r === null || g === null || b === null) {
    return null;
  }

  return { r, g, b };
}

function parseHexColor(input: string): RgbColor | null {
  const match = HEX_COLOR_REGEX.exec(input.trim());
  if (!match) {
    return null;
  }

  const hex = match[1];
  const normalized =
    hex.length === 3 || hex.length === 4
      ? hex
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : hex;

  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return null;
  }

  return { r, g, b };
}

function parseColorSrgbFunction(input: string): RgbColor | null {
  const match = COLOR_SRGB_FUNCTION_REGEX.exec(input);
  if (!match) {
    return null;
  }

  const [srgbPart] = match[1].split("/");
  const channels = srgbPart
    .trim()
    .split(WHITESPACE_REGEX)
    .map((part) => part.trim())
    .filter(Boolean);

  if (channels.length < 3) {
    return null;
  }

  const r = parseSrgbFunctionChannel(channels[0]);
  const g = parseSrgbFunctionChannel(channels[1]);
  const b = parseSrgbFunctionChannel(channels[2]);

  if (r === null || g === null || b === null) {
    return null;
  }

  return {
    r: clampColorChannel(r * 255),
    g: clampColorChannel(g * 255),
    b: clampColorChannel(b * 255),
  };
}

function parseOklchColor(input: string): RgbColor | null {
  const match = OKLCH_FUNCTION_REGEX.exec(input);
  if (!match) {
    return null;
  }

  const [oklchPart] = match[1].split("/");
  const channels = oklchPart
    .replace(/,/g, " ")
    .split(WHITESPACE_REGEX)
    .map((part) => part.trim())
    .filter(Boolean);

  if (channels.length < 3) {
    return null;
  }

  const lightness = parseOklchLightness(channels[0]);
  const chroma = parseOklchChroma(channels[1]);
  const hue = parseHueAngle(channels[2]);

  if (lightness === null || chroma === null || hue === null) {
    return null;
  }

  const hueRadians = (hue * Math.PI) / 180;
  const a = chroma * Math.cos(hueRadians);
  const b = chroma * Math.sin(hueRadians);

  // OKLCH -> OKLab -> linear sRGB conversion.
  const lComponent = lightness + 0.396_337_777_4 * a + 0.215_803_757_3 * b;
  const mComponent = lightness - 0.105_561_345_8 * a - 0.063_854_172_8 * b;
  const sComponent = lightness - 0.089_484_177_5 * a - 1.291_485_548 * b;

  const lLinear = lComponent ** 3;
  const mLinear = mComponent ** 3;
  const sLinear = sComponent ** 3;

  const rLinear =
    4.076_741_662_1 * lLinear -
    3.307_711_591_3 * mLinear +
    0.230_969_929_2 * sLinear;
  const gLinear =
    -1.268_438_004_6 * lLinear +
    2.609_757_401_1 * mLinear -
    0.341_319_396_5 * sLinear;
  const bLinear =
    -0.004_196_086_3 * lLinear -
    0.703_418_614_7 * mLinear +
    1.707_614_701 * sLinear;

  return {
    r: clampColorChannel(srgbEncode(rLinear) * 255),
    g: clampColorChannel(srgbEncode(gLinear) * 255),
    b: clampColorChannel(srgbEncode(bLinear) * 255),
  };
}

export function parseRgbColor(input: string): RgbColor | null {
  const normalized = input.trim();
  if (!normalized) {
    return null;
  }

  return (
    parseRgbFunctionColor(normalized) ??
    parseHexColor(normalized) ??
    parseOklchColor(normalized) ??
    parseColorSrgbFunction(normalized)
  );
}

export function relativeLuminance(rgb: RgbColor): number {
  const toLinear = (channel: number) => {
    const normalized = channel / 255;
    if (normalized <= 0.039_28) {
      return normalized / 12.92;
    }
    return ((normalized + 0.055) / 1.055) ** 2.4;
  };

  const r = toLinear(rgb.r);
  const g = toLinear(rgb.g);
  const b = toLinear(rgb.b);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(
  foregroundRgb: RgbColor,
  backgroundRgb: RgbColor
): number {
  const foregroundLuminance = relativeLuminance(foregroundRgb);
  const backgroundLuminance = relativeLuminance(backgroundRgb);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

export function passesAA(ratio: number): boolean {
  return ratio >= 4.5;
}

export function passesAAA(ratio: number): boolean {
  return ratio >= 7;
}

export function formatRatio(ratio: number): string {
  if (!Number.isFinite(ratio)) {
    return "0.0:1";
  }
  return `${ratio.toFixed(1)}:1`;
}

function normalizeCssVariableName(cssVariableName: string): string {
  if (cssVariableName.startsWith("--")) {
    return cssVariableName;
  }
  return `--${cssVariableName}`;
}

export function resolveCssVariableColor(
  scopeEl: HTMLElement,
  cssVariableName: string
): RgbColor | null {
  if (typeof window === "undefined" || !scopeEl) {
    return null;
  }

  const doc = scopeEl.ownerDocument;
  const view = doc.defaultView ?? window;
  if (!(doc && view)) {
    return null;
  }

  const probe = doc.createElement("span");
  probe.style.color = `var(${normalizeCssVariableName(cssVariableName)})`;
  probe.style.position = "absolute";
  probe.style.pointerEvents = "none";
  probe.style.opacity = "0";
  probe.style.fontSize = "0";
  probe.style.lineHeight = "0";

  scopeEl.appendChild(probe);

  try {
    const resolvedColor = view.getComputedStyle(probe).color;
    return parseRgbColor(resolvedColor);
  } finally {
    probe.remove();
  }
}

export function evaluateContrastPairs(
  scopeEl: HTMLElement,
  pairs: ContrastPair[] = defaultContrastPairs
): EvaluatedContrastPair[] {
  return pairs.map((pair) => {
    const foregroundColor = resolveCssVariableColor(
      scopeEl,
      pair.foregroundVar
    );
    const backgroundColor = resolveCssVariableColor(
      scopeEl,
      pair.backgroundVar
    );

    if (!(foregroundColor && backgroundColor)) {
      return {
        ...pair,
        foregroundColor,
        backgroundColor,
        ratio: null,
        passesAA: false,
        passesAAA: false,
      };
    }

    const ratio = contrastRatio(foregroundColor, backgroundColor);
    return {
      ...pair,
      foregroundColor,
      backgroundColor,
      ratio,
      passesAA: passesAA(ratio),
      passesAAA: passesAAA(ratio),
    };
  });
}
