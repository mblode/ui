import type { Metadata } from "next";
import ThemeVisualizerPage from "@/components/theme-visualizer/theme-visualizer-page";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: {
    canonical: absoluteUrl("/theme-visualizer"),
  },
};

export default async function ThemeVisualizerRoute() {
  return <ThemeVisualizerPage />;
}
