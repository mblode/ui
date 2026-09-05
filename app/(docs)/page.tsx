import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ShowcaseGrid } from "@/components/sections/showcase-grid";
import ShowcaseHero from "@/components/sections/showcase-hero";
import { SponsorSupport } from "@/components/sponsor-support";
import { ZoneBreadcrumb } from "@/components/zone-breadcrumb";
import { siteConfig, siteUrl } from "@/config/site";
import { constructMetadata } from "@/lib/utils";
import { zoneRootJsonLd } from "@/lib/zone-schema";

// Ranked at position 8.6 on 73 impressions for three months and earned no
// clicks at all, so the old snippet was losing the choice on the page it
// already won. "shadcn" is the word people actually search, and it is accurate:
// this is a shadcn-compatible registry. `title.absolute` opts out of the
// layout's "%s | Blode UI" template, so 55 characters is what Google renders.
const title = "Blode UI: shadcn-style React components for Tailwind v4";

export const metadata: Metadata = {
  // Read from the config rather than repeated here, because `zoneRootJsonLd`
  // renders on this same page from `siteConfig.description`. A second copy would
  // let the meta description and the WebPage node drift apart.
  ...constructMetadata({
    description: siteConfig.description,
    title,
    url: siteUrl,
  }),
  title: { absolute: title },
};

export default function Home() {
  return (
    <div className="flex min-w-0 flex-1 flex-col pb-8 text-[1.05rem] sm:text-[15px]">
      <JsonLd data={zoneRootJsonLd} />
      <div className="h-(--top-spacing) shrink-0" />
      <div className="xl:pr-(--sidebar-width)">
        <div className="mx-auto flex w-full min-w-0 max-w-[40rem] flex-col gap-6 py-6 lg:py-8">
          {/* Root page only — the docs and marketing pages have their own navigation. */}
          <ZoneBreadcrumb product="Blode UI" />
          <ShowcaseHero />
        </div>
      </div>
      <div className="pb-16">
        <ShowcaseGrid />
        <SponsorSupport />
      </div>
    </div>
  );
}
