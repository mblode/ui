import { siteConfig, siteUrl } from "@/config/site";

/**
 * Structured data for this zone. The contract lives in
 * `blode-co/apps/web/.claude/knowledge/zone-conventions.md`.
 *
 * blode.co/ui is a path on blode.co, not a site of its own, so nothing here
 * defines a Person, WebSite or Organization. It references the ones blode.co
 * already publishes, by `@id`. A second `#person` on the same domain splits the
 * entity: search engines see two people rather than one.
 */
const host = "https://blode.co";

export const personId = `${host}/#person`;
export const websiteId = `${host}/#website`;
export const orgId = `${host}/#organization`;

const softwareId = `${siteUrl}/#software`;
const webPageId = `${siteUrl}/#webpage`;
const breadcrumbId = `${siteUrl}/#breadcrumb`;

/** Emitted on the zone root only, where the WebPage and breadcrumb are true. */
export const zoneRootJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": webPageId,
      "@type": "WebPage",
      about: { "@id": softwareId },
      breadcrumb: { "@id": breadcrumbId },
      description: siteConfig.description,
      inLanguage: "en-US",
      isPartOf: { "@id": websiteId },
      name: siteConfig.name,
      url: siteUrl,
    },
    {
      "@id": softwareId,
      "@type": "SoftwareSourceCode",
      author: { "@id": personId },
      codeRepository: siteConfig.links.github,
      description: siteConfig.description,
      name: siteConfig.name,
      programmingLanguage: "TypeScript",
      publisher: { "@id": orgId },
      url: siteUrl,
    },
    {
      "@id": breadcrumbId,
      "@type": "BreadcrumbList",
      itemListElement: [
        // Named for the person, not "Home", and matching the visible trail in
        // `components/zone-breadcrumb.tsx` exactly — Google treats a mismatch
        // between the two as a markup error.
        { "@type": "ListItem", item: `${host}/`, name: "Matthew Blode", position: 1 },
        {
          "@type": "ListItem",
          item: `${host}/projects`,
          name: "Projects",
          position: 2,
        },
        {
          "@type": "ListItem",
          item: siteUrl,
          name: siteConfig.name,
          position: 3,
        },
      ],
    },
  ],
};

/**
 * Emitted on every docs page.
 *
 * `TechArticle` rather than `WebPage`: these are technical how-to documents, and
 * that is the type Google matches to developer-documentation intent.
 *
 * No `BreadcrumbList`, deliberately. The rule on `zoneRootJsonLd` above applies
 * here in the negative: docs pages render no visible trail (`ZoneBreadcrumb` is
 * root-only, see `app/(docs)/page.tsx`), and a breadcrumb in markup that no
 * reader can see is exactly the mismatch Google treats as a markup error.
 *
 * Person, Organization and WebSite are referenced by `@id` and never redefined,
 * for the same reason the zone root does it: blode.co owns those nodes, and a
 * second copy on the same domain splits the entity.
 */
export const docJsonLd = ({
  description,
  title,
  url,
}: {
  description: string;
  title: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@id": `${url}#article`,
  "@type": "TechArticle",
  author: { "@id": personId },
  description,
  headline: title,
  inLanguage: "en-US",
  isPartOf: { "@id": websiteId },
  name: title,
  publisher: { "@id": orgId },
  url,
});
