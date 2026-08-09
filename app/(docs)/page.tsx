import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ShowcaseGrid } from "@/components/sections/showcase-grid";
import ShowcaseHero from "@/components/sections/showcase-hero";
import { siteUrl } from "@/config/site";
import { constructMetadata } from "@/lib/utils";
import { zoneRootJsonLd } from "@/lib/zone-schema";

const title = "Blode UI: React and Tailwind CSS component registry";

export const metadata: Metadata = {
  ...constructMetadata({
    description:
      "An open source registry of accessible React components built with Tailwind CSS v4 and Base UI. Copy the source, own the code.",
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
          <ShowcaseHero />
        </div>
      </div>
      <div className="px-4 pb-16 md:px-0">
        <ShowcaseGrid />
      </div>
    </div>
  );
}
