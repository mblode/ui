import type { Metadata } from "next";
import ThemeVisualizerPage from "@/components/theme-visualizer/theme-visualizer-page";
import { absoluteUrl, constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  description:
    "Preview Blode UI components against a live colour theme, tune the tokens, and copy the CSS variables straight into your project.",
  title: "Theme Visualiser: preview Blode UI colour themes",
  url: absoluteUrl("/theme-visualizer"),
});

export default async function ThemeVisualizerRoute() {
  return <ThemeVisualizerPage />;
}
