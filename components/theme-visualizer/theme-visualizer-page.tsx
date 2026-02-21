"use client";

import {
  ArrowRotateCounterClockwiseIcon,
  CheckIcon,
  ColorPaletteIcon,
  ContrastIcon,
  CopySimpleIcon,
  CornerRadiusIcon,
  DicesIcon,
  LockIcon,
  MoonIcon,
  SunIcon,
  TextSizeIcon,
  UnlockedIcon,
} from "blode-icons-react";
import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DEFAULT_CONTRAST_PAIRS,
  type EvaluatedContrastPair,
  evaluateContrastPairs,
  formatRatio,
  type RgbColor,
} from "@/components/theme-visualizer/contrast";
import {
  buildPreviewStyle,
  buildThemeCss,
  DEFAULT_THEME_STATE,
  getRandomThemeState,
  getThemeFontStack,
  THEME_COLOR_FAMILY_LIST,
  THEME_COLOR_SCALES,
  THEME_RADIUS_LIST,
  THEME_RADIUS_OPTIONS,
  THEME_SANS_FONT_OPTIONS,
  THEME_SERIF_FONT_OPTIONS,
  THEME_SHADE_LIST,
  type ThemeColorFamily,
  type ThemeFontFamily,
  type ThemeRadius,
  type ThemeShade,
  type ThemeState,
} from "@/components/theme-visualizer/theme-config";
import { cn, humanize } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/registry/default/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
} from "@/registry/default/ui/select";
import { Separator } from "@/registry/default/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

const FONT_PREVIEW_TEXT =
  "Write better faster Everywhere Products Use Cases Docs Blog FAQ Sign in Get started";

const RADIUS_LABELS: Record<ThemeRadius, string> = {
  none: "None",
  small: "Small",
  medium: "Medium",
  large: "Large",
  full: "Full",
};

function getSwatchColor(
  colorFamily: ThemeColorFamily,
  shade: ThemeShade
): string {
  return `var(--color-${colorFamily}-${shade}, ${THEME_COLOR_SCALES[colorFamily][shade]})`;
}

function toGoogleFontFamilyParam(fontFamily: string): string {
  return fontFamily.trim();
}

function getFontStylesheetId(fontFamily: string): string {
  return `theme-preview-font-${fontFamily
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "")}`;
}

const LOCAL_FONTS = new Set<ThemeFontFamily>(["Glide"]);

function ensureGoogleFontLoaded(fontFamily: ThemeFontFamily): void {
  if (typeof document === "undefined" || LOCAL_FONTS.has(fontFamily)) {
    return;
  }

  const stylesheetId = getFontStylesheetId(fontFamily);
  if (document.getElementById(stylesheetId)) {
    return;
  }

  const url = new URL("https://fonts.googleapis.com/css2");
  url.searchParams.set(
    "family",
    `${toGoogleFontFamilyParam(fontFamily)}:wght@400;500;600;700`
  );
  url.searchParams.set("display", "swap");
  url.searchParams.set("text", FONT_PREVIEW_TEXT);

  const stylesheet = document.createElement("link");
  stylesheet.id = stylesheetId;
  stylesheet.rel = "stylesheet";
  stylesheet.href = url.toString();
  stylesheet.dataset.themePreviewFont = fontFamily;

  document.head.appendChild(stylesheet);
}

function rgbToCssColor(rgb: RgbColor | null): string {
  if (!rgb) {
    return "transparent";
  }

  const r = Math.round(rgb.r);
  const g = Math.round(rgb.g);
  const b = Math.round(rgb.b);

  return `rgb(${r} ${g} ${b})`;
}

function Swatch({ color }: { color: string }) {
  return (
    <span
      className="size-3.5 shrink-0 rounded-full border border-black/10 dark:border-white/15"
      style={{ backgroundColor: color }}
    />
  );
}

interface IconActionButtonProps {
  active?: boolean;
  children: ReactNode;
  label: string;
  onClick: () => void;
}

function IconActionButton({
  active,
  children,
  label,
  onClick,
}: IconActionButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          aria-label={label}
          className="size-10 rounded-xl"
          onClick={onClick}
          size="icon-sm"
          variant={active ? "secondary" : "outline"}
        >
          {children}
          <span className="sr-only">{label}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export default function ThemeVisualizerPage() {
  const [theme, setTheme] = useState<ThemeState>(DEFAULT_THEME_STATE);
  const [isContrastOpen, setIsContrastOpen] = useState(false);
  const [contrastRows, setContrastRows] = useState<EvaluatedContrastPair[]>([]);
  const [hasCopiedCss, setHasCopiedCss] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  const themeCss = useMemo(() => buildThemeCss(theme), [theme]);
  const previewStyle = useMemo<CSSProperties>(
    () => ({
      ...buildPreviewStyle(theme),
      fontFamily: getThemeFontStack(theme.textFont),
    }),
    [theme]
  );

  useEffect(() => {
    ensureGoogleFontLoaded(theme.textFont);
    ensureGoogleFontLoaded(theme.headingFont);
  }, [theme.headingFont, theme.textFont]);

  useEffect(() => {
    if (!(isContrastOpen && previewRef.current)) {
      return;
    }

    const currentThemeCss = themeCss;
    const frame = window.requestAnimationFrame(() => {
      if (!(previewRef.current && currentThemeCss)) {
        return;
      }
      setContrastRows(
        evaluateContrastPairs(previewRef.current, DEFAULT_CONTRAST_PAIRS)
      );
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isContrastOpen, themeCss]);

  useEffect(() => {
    if (!hasCopiedCss) {
      return;
    }

    const timeout = window.setTimeout(() => setHasCopiedCss(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [hasCopiedCss]);

  const aaFailures = useMemo(
    () =>
      contrastRows.filter((row) => row.ratio !== null && !row.passesAA).length,
    [contrastRows]
  );

  const unresolvedCount = useMemo(
    () => contrastRows.filter((row) => row.ratio === null).length,
    [contrastRows]
  );

  const contrastSummary = useMemo(() => {
    if (unresolvedCount > 0) {
      return {
        className: "text-muted-foreground",
        text: `${unresolvedCount} pair${unresolvedCount === 1 ? "" : "s"} unresolved.`,
      };
    }

    if (aaFailures > 0) {
      return {
        className: "text-red-600",
        text: `${aaFailures} pair${aaFailures === 1 ? "" : "s"} fail AA.`,
      };
    }

    return {
      className: "text-green-600",
      text: "All pairs pass AA.",
    };
  }, [aaFailures, unresolvedCount]);

  const handleTextFontChange = useCallback((textFont: ThemeFontFamily) => {
    setTheme((current) => ({
      ...current,
      textFont,
      headingFont: current.isFontLocked ? textFont : current.headingFont,
    }));
  }, []);

  const handleHeadingFontChange = useCallback(
    (headingFont: ThemeFontFamily) => {
      setTheme((current) => ({
        ...current,
        headingFont,
      }));
    },
    []
  );

  const handleFontLockToggle = useCallback(() => {
    setTheme((current) => {
      const nextIsFontLocked = !current.isFontLocked;
      return {
        ...current,
        isFontLocked: nextIsFontLocked,
        headingFont: nextIsFontLocked ? current.textFont : current.headingFont,
      };
    });
  }, []);

  const handleRandomizeTheme = useCallback(() => {
    setTheme((current) => getRandomThemeState(current));
  }, []);

  const handleResetTheme = useCallback(() => {
    setTheme(DEFAULT_THEME_STATE);
    setContrastRows([]);
  }, []);

  const handleCopyThemeCss = useCallback(async () => {
    await navigator.clipboard.writeText(themeCss);
    setHasCopiedCss(true);
  }, [themeCss]);

  return (
    <section className="container py-8 lg:py-12">
      <div className="mx-auto w-full max-w-[1200px] space-y-6">
        <div className="space-y-2">
          <h1 className="font-semibold text-3xl tracking-tight">
            Theme Visualizer
          </h1>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-card">
          <div className="flex items-center gap-2 overflow-x-auto border-b p-3">
            <Select<ThemeColorFamily>
              items={THEME_COLOR_FAMILY_LIST.map((family) => ({
                value: family,
                label: humanize(family),
              }))}
              onValueChange={(colorFamily) =>
                setTheme((current) => ({ ...current, colorFamily }))
              }
              value={theme.colorFamily}
            >
              <SelectTrigger className="w-[11.5rem]" size="sm">
                <span className="flex items-center gap-2">
                  <ColorPaletteIcon className="size-4 text-muted-foreground" />
                  <Swatch
                    color={getSwatchColor(theme.colorFamily, theme.shade)}
                  />
                  {humanize(theme.colorFamily)}
                </span>
              </SelectTrigger>
              <SelectContent>
                {THEME_COLOR_FAMILY_LIST.map((family) => (
                  <SelectItem key={family} value={family}>
                    <span className="flex items-center gap-2">
                      <Swatch color={getSwatchColor(family, theme.shade)} />
                      {humanize(family)}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select<ThemeShade>
              items={THEME_SHADE_LIST.map((shade) => ({
                value: shade,
                label: shade,
              }))}
              onValueChange={(shade) =>
                setTheme((current) => ({ ...current, shade }))
              }
              value={theme.shade}
            >
              <SelectTrigger className="w-32" size="sm">
                <span className="flex items-center gap-2">
                  <Swatch
                    color={getSwatchColor(theme.colorFamily, theme.shade)}
                  />
                  {theme.shade}
                </span>
              </SelectTrigger>
              <SelectContent>
                {THEME_SHADE_LIST.map((shade) => (
                  <SelectItem key={shade} value={shade}>
                    <span className="flex w-full items-center gap-2">
                      <Swatch
                        color={getSwatchColor(theme.colorFamily, shade)}
                      />
                      {shade}
                      {Number(shade) <= 200 ? (
                        <MoonIcon className="ml-auto size-3.5 text-muted-foreground" />
                      ) : null}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select<ThemeRadius>
              items={THEME_RADIUS_LIST.map((radius) => ({
                value: radius,
                label: RADIUS_LABELS[radius],
              }))}
              onValueChange={(radius) =>
                setTheme((current) => ({ ...current, radius }))
              }
              value={theme.radius}
            >
              <SelectTrigger className="w-36" size="sm">
                <span className="flex items-center gap-2">
                  <CornerRadiusIcon className="size-4 text-muted-foreground" />
                  {RADIUS_LABELS[theme.radius]}
                </span>
              </SelectTrigger>
              <SelectContent>
                {THEME_RADIUS_LIST.map((radius) => (
                  <SelectItem key={radius} value={radius}>
                    <span className="flex w-full items-center justify-between gap-4">
                      <span>{RADIUS_LABELS[radius]}</span>
                      <span className="font-mono text-muted-foreground text-xs">
                        {THEME_RADIUS_OPTIONS[radius]}
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Separator
              className="mx-1 hidden h-8 sm:block"
              orientation="vertical"
            />

            <Select<ThemeFontFamily>
              items={[
                ...THEME_SANS_FONT_OPTIONS,
                ...THEME_SERIF_FONT_OPTIONS,
              ].map((font) => ({
                value: font.family,
                label: font.label,
              }))}
              onValueChange={handleTextFontChange}
              value={theme.textFont}
            >
              <SelectTrigger className="w-[13.5rem]" size="sm">
                <span className="flex items-center gap-2">
                  <TextSizeIcon className="size-4 text-muted-foreground" />
                  {theme.textFont}
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sans Serif</SelectLabel>
                  {THEME_SANS_FONT_OPTIONS.map((font) => (
                    <SelectItem key={font.family} value={font.family}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Serif</SelectLabel>
                  {THEME_SERIF_FONT_OPTIONS.map((font) => (
                    <SelectItem key={font.family} value={font.family}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label="Lock text and heading font family"
                  className="size-10 rounded-xl"
                  onClick={handleFontLockToggle}
                  size="icon-sm"
                  variant={theme.isFontLocked ? "secondary" : "outline"}
                >
                  {theme.isFontLocked ? (
                    <LockIcon className="size-4" />
                  ) : (
                    <UnlockedIcon className="size-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {theme.isFontLocked
                  ? "Unlock heading font family"
                  : "Lock text and heading font family"}
              </TooltipContent>
            </Tooltip>

            <Select<ThemeFontFamily>
              items={[
                ...THEME_SANS_FONT_OPTIONS,
                ...THEME_SERIF_FONT_OPTIONS,
              ].map((font) => ({
                value: font.family,
                label: font.label,
              }))}
              onValueChange={handleHeadingFontChange}
              value={theme.headingFont}
            >
              <SelectTrigger
                className="w-[13.5rem]"
                disabled={theme.isFontLocked}
                size="sm"
              >
                <span className="flex items-center gap-2">
                  <span className="inline-flex size-4 items-center justify-center font-semibold text-muted-foreground text-xs">
                    H
                  </span>
                  {theme.headingFont}
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sans Serif</SelectLabel>
                  {THEME_SANS_FONT_OPTIONS.map((font) => (
                    <SelectItem key={font.family} value={font.family}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Serif</SelectLabel>
                  {THEME_SERIF_FONT_OPTIONS.map((font) => (
                    <SelectItem key={font.family} value={font.family}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="ml-auto flex items-center gap-2">
              <IconActionButton
                active={theme.darkMode}
                label={
                  theme.darkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                onClick={() =>
                  setTheme((current) => ({
                    ...current,
                    darkMode: !current.darkMode,
                  }))
                }
              >
                {theme.darkMode ? (
                  <MoonIcon className="size-4" />
                ) : (
                  <SunIcon className="size-4" />
                )}
              </IconActionButton>
              <IconActionButton
                label="Randomize theme"
                onClick={handleRandomizeTheme}
              >
                <DicesIcon className="size-4" />
              </IconActionButton>
              <IconActionButton
                active={isContrastOpen}
                label="Check color contrast"
                onClick={() => setIsContrastOpen(true)}
              >
                <ContrastIcon className="size-4" />
              </IconActionButton>
              <IconActionButton
                label="Reset to defaults"
                onClick={handleResetTheme}
              >
                <ArrowRotateCounterClockwiseIcon className="size-4" />
              </IconActionButton>
              <IconActionButton
                label="Copy theme CSS"
                onClick={handleCopyThemeCss}
              >
                {hasCopiedCss ? (
                  <CheckIcon className="size-4" />
                ) : (
                  <CopySimpleIcon className="size-4" />
                )}
              </IconActionButton>
            </div>
          </div>

          <div
            className={cn(
              "overflow-hidden bg-background text-foreground",
              theme.darkMode && "dark"
            )}
            ref={previewRef}
            style={previewStyle}
          >
            <div className="flex items-center justify-between border-b px-4 py-3 lg:px-6">
              <div className="flex items-center gap-4 lg:gap-6">
                <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 font-semibold text-primary text-sm">
                  B
                </span>
                <nav className="hidden items-center gap-4 font-medium text-[0.9rem] text-muted-foreground lg:flex">
                  <span className="text-foreground">Products</span>
                  <span>Use Cases</span>
                  <span>Docs</span>
                  <span>Blog</span>
                  <span>FAQ</span>
                </nav>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  Sign in
                </Button>
                <Button size="sm">Get started</Button>
              </div>
            </div>

            <div className="grid gap-8 p-5 lg:grid-cols-2 lg:p-8">
              <div className="space-y-5">
                <div className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 font-medium text-muted-foreground text-sm">
                  <span className="mr-2 size-1.5 rounded-full bg-primary" />
                  Theme preview is live
                </div>
                <h2
                  className="text-balance font-semibold text-4xl text-foreground leading-[1.05] tracking-tight lg:text-6xl"
                  data-theme-heading
                  style={{ fontFamily: getThemeFontStack(theme.headingFont) }}
                >
                  Write better, faster.
                  <br />
                  Everywhere.
                </h2>
                <p className="max-w-[44ch] text-lg text-muted-foreground">
                  Tune color, radius, and typography in one place, then copy the
                  generated CSS variables directly into your app.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Live design token overrides
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    WCAG contrast checks in modal
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Google font previews on demand
                  </li>
                </ul>
                <div className="flex items-center gap-3 pt-1">
                  <Button>Get started</Button>
                  <Button variant="secondary">Learn more</Button>
                </div>
              </div>

              <div
                className="relative min-h-[18rem] overflow-hidden border border-border/60 bg-gradient-to-br from-primary/10 via-primary/20 to-primary/35"
                style={{
                  borderRadius: "min(calc(var(--radius) + 0.75rem), 2rem)",
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,var(--color-white,_#ffffff),transparent_45%)] opacity-45" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,var(--primary),transparent_60%)] opacity-35" />
                <div
                  className="absolute inset-6 border border-white/40 bg-white/25 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
                  style={{
                    borderRadius: "min(calc(var(--radius) + 0.5rem), 1.75rem)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog onOpenChange={setIsContrastOpen} open={isContrastOpen}>
        <DialogContent className="max-h-[85vh] overflow-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Color Contrast Check</DialogTitle>
            <DialogDescription>
              WCAG 2.x contrast ratios for the current preview.{" "}
              <span className={cn("font-medium", contrastSummary.className)}>
                {contrastSummary.text}
              </span>
            </DialogDescription>
          </DialogHeader>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pair</TableHead>
                <TableHead>Colors</TableHead>
                <TableHead>Ratio</TableHead>
                <TableHead>AA</TableHead>
                <TableHead>AAA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contrastRows.map((pair) => {
                const hasRatio = pair.ratio !== null;
                return (
                  <TableRow key={pair.id}>
                    <TableCell className="font-medium">{pair.label}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Swatch color={rgbToCssColor(pair.foregroundColor)} />
                        <Swatch color={rgbToCssColor(pair.backgroundColor)} />
                      </div>
                    </TableCell>
                    <TableCell>
                      {hasRatio ? formatRatio(pair.ratio ?? 0) : "—"}
                    </TableCell>
                    <TableCell>
                      {hasRatio ? (
                        <span
                          className={cn(
                            "font-medium",
                            pair.passesAA ? "text-green-600" : "text-red-600"
                          )}
                        >
                          {pair.passesAA ? "Pass" : "Fail"}
                        </span>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      {hasRatio ? (
                        <span
                          className={cn(
                            "font-medium",
                            pair.passesAAA ? "text-green-600" : "text-red-600"
                          )}
                        >
                          {pair.passesAAA ? "Pass" : "Fail"}
                        </span>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <p className="text-muted-foreground text-xs">
            AA requires 4.5:1 for normal text, 3:1 for large text. AAA requires
            7:1 for normal text.
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
}
