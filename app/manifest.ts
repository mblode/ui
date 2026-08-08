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
        src: asset("/icon.svg"),
        type: "image/svg+xml",
      },
      {
        purpose: "maskable",
        sizes: "192x192",
        src: asset("/web-app-manifest-192x192.png"),
        type: "image/png",
      },
      {
        purpose: "maskable",
        sizes: "512x512",
        src: asset("/web-app-manifest-512x512.png"),
        type: "image/png",
      },
    ],
    name: "Blode UI",
    short_name: "Blode UI",
    start_url: basePath,
    theme_color: "#ffffff",
  };
}
