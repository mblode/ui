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
        { "@type": "ListItem", item: `${host}/`, name: "Home", position: 1 },
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
