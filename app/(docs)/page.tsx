import type { Metadata } from "next";
import type * as React from "react";

import { JsonLd } from "@/components/json-ld";
import { ComponentWall } from "@/components/sections/component-wall";
import { BaseUiMedia, SectionViews, TrackedFaq } from "@/components/sections/landing-client";
import ShowcaseHero from "@/components/sections/showcase-hero";
import { ZoneBreadcrumb } from "@/components/zone-breadcrumb";
import { siteConfig, siteUrl } from "@/config/site";
import { faqs, features, pointOfView, wall } from "@/lib/landing";
import { constructMetadata } from "@/lib/utils";
import { zoneRootJsonLd } from "@/lib/zone-schema";
import { faqJsonLd } from "@/components/marketing/faq";
import { FeatureRows } from "@/components/marketing/feature-rows";
import { getPagerForPath, PagerNav } from "@/components/pager";

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

// Navigations into the landing page must paint from the static shell, so
// validation turns any uncached or URL read into a dev error instead of a
// silent blocking navigation. Locked in by e2e/instant-navigation.spec.ts.
export const instant = true;

// One `@graph` for the page. The FAQPage node is built from the same `faqs`
// array the visible list renders, so the two cannot disagree.
const { "@context": _faqContext, ...faqNode } = faqJsonLd(faqs);
const pageJsonLd = {
  ...zoneRootJsonLd,
  "@graph": [
    ...zoneRootJsonLd["@graph"],
    { ...faqNode, "@id": `${siteUrl}/#faq`, isPartOf: { "@id": `${siteUrl}/#webpage` } },
  ],
};

// The `section_viewed` ids: each section's heading id, in page order. The hero
// is not one of them.
const sectionIds = ["components", "how-it-works", "faq"];

function SectionHeading({
  children,
  description,
  id,
}: {
  children: React.ReactNode;
  description?: React.ReactNode;
  id: string;
}) {
  return (
    <div className="flex max-w-2xl flex-col gap-2">
      <h2 className="scroll-m-24 text-balance font-semibold text-2xl tracking-tight" id={id}>
        {children}
      </h2>
      {description ? (
        <p className="text-pretty text-muted-foreground leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}

function CodeMedia({ lines }: { lines: React.ReactNode[] }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-code">
      <pre className="no-scrollbar overflow-x-auto p-5 font-mono text-[0.8125rem] text-code-foreground leading-7">
        <code>
          {lines.map((line, index) => (
            // Static lines that never reorder.
            // oxlint-disable-next-line react/no-array-index-key
            <span className="block" key={index}>
              {line}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

const prompt = (
  <span aria-hidden="true" className="select-none text-muted-foreground">
    ${" "}
  </span>
);
const comment = (text: string) => <span className="text-muted-foreground">{text}</span>;

const featureMedia = [
  <BaseUiMedia key="base-ui" />,
  <CodeMedia
    key="agent"
    lines={[
      <>{prompt}npx skills add mblode/ui</>,
      "",
      comment("# from blode.co/ui/design.md"),
      "Motion confirms a state change and nothing else.",
      "Focus ring. Always visible, never a glow.",
    ]}
  />,
];

// The landing page is the first entry in the docs sidebar, so it pages
// forward into the docs like any other page.
const pager = getPagerForPath("/");

export default function Home() {
  return (
    <div className="flex min-w-0 flex-1 flex-col pb-8 text-[1.05rem] sm:text-[15px]">
      <JsonLd data={pageJsonLd} />
      <SectionViews ids={sectionIds} />
      <div className="h-(--top-spacing) shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-20 px-2 py-6 sm:gap-24 md:px-4 lg:py-8">
        <div className="flex flex-col gap-8">
          {/* Root page only. The docs and marketing pages have their own navigation. */}
          <ZoneBreadcrumb product="Blode UI" />
          <ShowcaseHero />
        </div>

        <section aria-labelledby="components" className="flex flex-col gap-6">
          <SectionHeading description={wall.description} id="components">
            {wall.title}
          </SectionHeading>
          <ComponentWall />
        </section>

        <section aria-labelledby="how-it-works" className="flex flex-col gap-12">
          <SectionHeading description={pointOfView} id="how-it-works">
            How it works
          </SectionHeading>
          {/* The page's one once-only reveal. It starts well below the fold. */}
          <FeatureRows
            items={features.map((feature, index) => ({ ...feature, media: featureMedia[index] }))}
            reveal
          />
        </section>

        <section aria-labelledby="faq" className="flex flex-col gap-6">
          <SectionHeading id="faq">Questions</SectionHeading>
          <TrackedFaq items={faqs} />
        </section>

        <PagerNav next={pager?.next} prev={pager?.prev} />
      </div>
    </div>
  );
}
