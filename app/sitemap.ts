import { allDocs, allPages } from "content-collections";
import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/site";
import { lastModifiedFromGit } from "@/lib/content-dates";

// `lastModified` comes from the content: the last git commit that touched the
// page's source, or its frontmatter `date`, whichever is later. It used to be
// the build time on every URL, which tells a crawler everything changed on
// every deploy, so it learns to ignore the field. Where neither date is known
// the field is left out rather than guessed.

const latest = (...dates: (string | undefined)[]) => {
  const known = dates.filter((date): date is string => Boolean(date));
  if (known.length === 0) {
    return undefined;
  }
  return known.reduce((a, b) => (Date.parse(b) > Date.parse(a) ? b : a));
};

const entry = (url: string, lastModified: string | undefined): MetadataRoute.Sitemap[number] =>
  lastModified ? { lastModified, url } : { url };

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry(
      siteUrl,
      lastModifiedFromGit(
        "app/(docs)/page.tsx",
        "lib/landing.ts",
        "components/sections/showcase-hero.tsx",
      ),
    ),
    entry(
      `${siteUrl}/theme-visualizer`,
      lastModifiedFromGit(
        "app/(marketing)/theme-visualizer/page.tsx",
        "components/theme-visualizer/theme-visualizer-page.tsx",
      ),
    ),
    ...allPages.map((page) =>
      entry(
        `${siteUrl}/${page.slugAsParams}`,
        lastModifiedFromGit(`content/pages/${page._meta.filePath}`),
      ),
    ),
    ...allDocs
      .filter((doc) => doc.published)
      .map((doc) =>
        entry(
          `${siteUrl}/docs${doc.slugAsParams ? `/${doc.slugAsParams}` : ""}`,
          latest(doc.date, lastModifiedFromGit(`content/docs/${doc._meta.filePath}`)),
        ),
      ),
  ];
}
