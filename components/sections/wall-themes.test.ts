import { describe, expect, it } from "vitest";

import { THEME_COLOR_SCALES } from "@/components/theme-visualizer/theme-config";

import { WALL_THEMES } from "./wall-themes";

describe("WALL_THEMES", () => {
  it("uses the scale colour each theme applies as its swatch", () => {
    for (const item of WALL_THEMES) {
      const family = item.theme?.colorFamily ?? "neutral";
      const shade = item.theme?.shade ?? "900";
      expect(item.swatch).toBe(THEME_COLOR_SCALES[family][shade]);
    }
  });
});
