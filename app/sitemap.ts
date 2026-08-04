import { allDocs, allPages } from "content-collections";
import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/site";

// Stamped in next.config at build time. Prerendering can't read the clock.
const buildTime = process.env.BUILD_TIME;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      lastModified: buildTime,
      url: siteUrl,
    },
    {
      lastModified: buildTime,
      url: `${siteUrl}/theme-visualizer`,
    },
    ...allPages.map((post) => ({
      lastModified: buildTime,
      url: `${siteUrl}/${post.slugAsParams}`,
    })),
    ...allDocs.map((post) => ({
      lastModified: post.date,
      url: `${siteUrl}/docs${post.slugAsParams ? `/${post.slugAsParams}` : ""}`,
    })),
  ];
}
