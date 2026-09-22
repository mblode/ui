"use client";

import { useTheme } from "next-themes";
import React from "react";

import { trackDemoOpened } from "@/analytics";
import { ShowcaseGrid } from "@/components/sections/showcase-grid";
import {
  buildPreviewStyle,
  DEFAULT_THEME_STATE,
  THEME_COLOR_SCALES,
} from "@/components/theme-visualizer/theme-config";
import type { ThemeState } from "@/components/theme-visualizer/theme-config";
import { ToggleGroup, ToggleGroupItem } from "@/registry/default/ui/toggle-group";

interface WallTheme {
  /** Swatch colour for the toggle. */
  swatch: string;
  /** `null` is the shipped Blode theme: no overrides at all. */
  theme: Pick<ThemeState, "colorFamily" | "radius" | "shade"> | null;
  value: string;
  label: string;
}

const WALL_THEMES: WallTheme[] = [
  { label: "Blode", swatch: THEME_COLOR_SCALES.neutral["900"], theme: null, value: "blode" },
  {
    label: "Indigo",
    swatch: THEME_COLOR_SCALES.indigo["600"],
    theme: { colorFamily: "indigo", radius: "medium", shade: "600" },
    value: "indigo",
  },
  {
    label: "Rose",
    swatch: THEME_COLOR_SCALES.rose["600"],
    theme: { colorFamily: "rose", radius: "large", shade: "600" },
    value: "rose",
  },
  {
    label: "Teal",
    swatch: THEME_COLOR_SCALES.teal["700"],
    theme: { colorFamily: "teal", radius: "none", shade: "700" },
    value: "teal",
  },
];

/**
 * The signature moment: every component preview on one wall, restyled live by
 * a theme toggle. Each theme is a set of CSS variables scoped to the wall, the
 * same tokens a project edits after install, so the toggle shows what
 * retheming costs: one block of variables, no component changes.
 */
export function ComponentWall() {
  const { resolvedTheme } = useTheme();
  const [value, setValue] = React.useState("blode");
  const [announcement, setAnnouncement] = React.useState("");
  const opened = React.useRef(false);

  const selected = WALL_THEMES.find((item) => item.value === value) ?? WALL_THEMES[0];
  const style = React.useMemo(
    () =>
      selected.theme
        ? buildPreviewStyle({
            ...DEFAULT_THEME_STATE,
            ...selected.theme,
            darkMode: resolvedTheme === "dark",
          })
        : undefined,
    [resolvedTheme, selected.theme],
  );

  const handleChange = (next: string | string[]) => {
    const nextValue = Array.isArray(next) ? next[0] : next;
    // A single-select toggle group can be emptied by clicking the pressed
    // item; keep the current theme instead of falling back to nothing.
    if (!nextValue) {
      return;
    }
    if (!opened.current) {
      opened.current = true;
      trackDemoOpened();
    }
    setValue(nextValue);
    setAnnouncement(`${WALL_THEMES.find((item) => item.value === nextValue)?.label} theme applied`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-medium text-muted-foreground text-sm" id="wall-theme-label">
          Theme
        </span>
        <ToggleGroup
          aria-labelledby="wall-theme-label"
          className="flex-wrap"
          onValueChange={handleChange}
          size="lg"
          spacing={1}
          type="single"
          value={value}
          variant="outline"
        >
          {WALL_THEMES.map((item) => (
            <ToggleGroupItem className="gap-2 px-3" key={item.value} value={item.value}>
              <span
                aria-hidden="true"
                className="size-3 rounded-full ring-1 ring-foreground/15"
                style={{ backgroundColor: item.swatch }}
              />
              {item.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <ShowcaseGrid onAnnounce={setAnnouncement} style={style} />
      <output aria-live="polite" className="sr-only">
        {announcement}
      </output>
    </div>
  );
}
