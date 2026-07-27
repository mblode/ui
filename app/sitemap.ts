import { allDocs, allPages } from "content-collections";
import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      lastModified: new Date(),
      url: siteUrl,
    },
    {
      lastModified: new Date(),
      url: `${siteUrl}/theme-visualizer`,
    },
    ...allPages.map((post) => ({
      lastModified: new Date(),
      url: `${siteUrl}/${post.slugAsParams}`,
    })),
    ...allDocs.map((post) => ({
      lastModified: post.date,
      url: `${siteUrl}/docs${post.slugAsParams ? `/${post.slugAsParams}` : ""}`,
    })),
  ];
}
