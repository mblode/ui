import { renderZoneOgImage } from "@/app/og-image-shared";
import { OgLogo } from "@/app/og-logo";

/**
 * Per-doc share cards. Docs opt out of the file-convention image when they
 * declare their own `openGraph`, so content-collections points each page here
 * with title + description. Same house card as `opengraph-image.tsx`.
 *
 * `description` is still sent by content-collections and still accepted here,
 * but the card no longer draws it: `dd74fe2` replaced the badge/eyebrow/subtitle
 * chrome with the mark-and-title lockup and moved this helper to a
 * background/color/logo signature, updating `opengraph-image.tsx` but not this
 * caller. That left the build failing to type check and every docs page
 * pointing its `og:image` at a route that could not render.
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? searchParams.get("heading") ?? "Blode UI";

  return renderZoneOgImage({
    background: "#1c1c1e",
    color: "#ffffff",
    logo: <OgLogo />,
    title,
  });
}
