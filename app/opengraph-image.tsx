import { renderZoneOgImage } from "@/app/og-image-shared";
import { OgLogo } from "@/app/og-logo";

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
    background: "#1c1c1e",
    color: "#ffffff",
    logo: <OgLogo />,
    title: siteConfig.name,
  });
}
