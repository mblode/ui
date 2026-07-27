import type { MetadataRoute } from "next";

import { asset, basePath } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#ffffff",
    description:
      "A set of beautifully designed components that you can customise, extend, and build on. Start here then make it your own.",
    display: "standalone",
    icons: [
      {
        sizes: "any",
        src: asset("/favicon.ico"),
        type: "image/x-icon",
      },
      {
        purpose: "maskable",
        sizes: "192x192",
        src: asset("/android-chrome-192x192.png"),
        type: "image/png",
      },
      {
        sizes: "256x256",
        src: asset("/android-chrome-256x256.png"),
        type: "image/png",
      },
    ],
    name: "Blode UI",
    short_name: "Blode UI",
    start_url: basePath,
    theme_color: "#ffffff",
  };
}
