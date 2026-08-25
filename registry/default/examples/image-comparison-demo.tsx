"use client";

import { ImageComparison } from "@/registry/default/ui/image-comparison";

/** Renders a flat two-tone landscape as an inline SVG data URI, so the demo ships no binaries and hotlinks nothing. */
const ridge = (sky: string, sun: string, hills: string, ground: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><rect width="800" height="450" fill="${sky}"/><circle cx="612" cy="128" r="56" fill="${sun}"/><path d="M0 330 L206 168 L372 330 Z" fill="${hills}"/><path d="M286 344 L470 148 L708 344 Z" fill="${hills}"/><rect y="322" width="800" height="128" fill="${ground}"/></svg>`,
  )}`;

const original = ridge("#b7babe", "#d2d5d8", "#8d9297", "#6e7378");
const graded = ridge("#f6d7a8", "#ef8f4b", "#7b4a63", "#3a2a3f");

export const ImageComparisonDemo = () => (
  <div className="mx-auto w-full max-w-lg">
    <ImageComparison
      after={{
        alt: "Ridgeline at dusk after colour grading, with warm sky and deep shadows",
        src: graded,
      }}
      before={{
        alt: "Ridgeline at dusk straight out of camera, flat and desaturated",
        src: original,
      }}
    />
    <p className="mt-3 text-muted-foreground text-sm">
      Drag the handle, or focus it and use the arrow keys, to compare the original exposure with the
      graded export.
    </p>
  </div>
);
