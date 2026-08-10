import { renderZoneOgImage } from "@/app/og-image-shared";

/**
 * Per-doc share cards. Docs opt out of the file-convention image when they
 * declare their own `openGraph`, so content-collections points each page here
 * with title + description. Same house card as `opengraph-image.tsx`.
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? searchParams.get("heading") ?? "Blode UI";
  const description =
    searchParams.get("description") ??
    searchParams.get("type") ??
    "An opinionated shadcn/ui registry.";

  return renderZoneOgImage({
    badge: "UI",
    eyebrow: "blode.co/ui",
    subtitle: description,
    title,
  });
}
