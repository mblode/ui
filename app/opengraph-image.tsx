import { renderZoneOgImage } from "@/app/og-image-shared";
import { siteConfig } from "@/config/site";

export { OG_CONTENT_TYPE as contentType, OG_SIZE as size } from "@/app/og-image-shared";

export const alt = "Blode UI";

/**
 * The house card (Rule 12), replacing the Geist `createOgImage` design.
 *
 * The matching `twitter-image` is gone rather than converted: Next reuses this
 * route for `twitter:image`, and the old pair were the same design twice.
 */
export default function OpengraphImage() {
  return renderZoneOgImage({
    badge: "UI",
    eyebrow: "blode.co/ui",
    subtitle: "An opinionated shadcn/ui registry.",
    title: siteConfig.name,
  });
}
