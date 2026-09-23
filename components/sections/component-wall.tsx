"use client";

import { useTheme } from "next-themes";
import React from "react";

import { trackDemoOpened } from "@/analytics";
import { ShowcaseGrid } from "@/components/sections/showcase-grid";
import { WALL_THEMES } from "@/components/sections/wall-themes";
import { ToggleGroup, ToggleGroupItem } from "@/registry/default/ui/toggle-group";

type ThemeConfig = typeof import("@/components/theme-visualizer/theme-config");

// The theme config carries every Tailwind colour scale. Nothing needs it until
// a reader picks a theme, so it stays out of the page's first-load bundle.
const loadThemeConfig = () => import("@/components/theme-visualizer/theme-config");

/**
 * The signature moment: every component preview on one wall, restyled live by
 * a theme toggle. Each theme is a set of CSS variables scoped to the wall, the
 * same tokens a project edits after install, so the toggle shows what
 * retheming costs: one block of variables, no component changes.
 */
export function ComponentWall() {
  const { resolvedTheme } = useTheme();
  const [value, setValue] = React.useState("blode");
  const [config, setConfig] = React.useState<ThemeConfig | null>(null);
  const [announcement, setAnnouncement] = React.useState("");
  const opened = React.useRef(false);

  const selected = WALL_THEMES.find((item) => item.value === value) ?? WALL_THEMES[0];
  const style = React.useMemo(
    () =>
      selected.theme && config
        ? config.buildPreviewStyle({
            ...config.DEFAULT_THEME_STATE,
            ...selected.theme,
            darkMode: resolvedTheme === "dark",
          })
        : undefined,
    [config, resolvedTheme, selected.theme],
  );

  const ensureConfig = () => {
    if (!config) {
      loadThemeConfig()
        .then(setConfig)
        .catch(() => {
          // The wall stays on the Blode theme if the chunk cannot load.
        });
    }
  };

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
    ensureConfig();
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
          onFocus={ensureConfig}
          onPointerEnter={ensureConfig}
          onValueChange={handleChange}
          size="lg"
          spacing={1}
          type="single"
          value={value}
          variant="outline"
        >
          {WALL_THEMES.map((item) => (
            <ToggleGroupItem
              className="gap-2 px-3 pointer-coarse:h-11"
              key={item.value}
              value={item.value}
            >
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
