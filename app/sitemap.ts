import { allDocs, allPages } from "content-collections";
import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const domain = headersList.get("host") as string;
  const protocol = "https";

  return [
    {
      lastModified: new Date(),
      url: `${protocol}://${domain}`,
    },
    ...allPages.map((post) => ({
      lastModified: new Date(),
      url: `${protocol}://${domain}/${post.slugAsParams}`,
    })),
    ...allDocs.map((post) => ({
      lastModified: post.date,
      url: `${protocol}://${domain}/docs/${post.slugAsParams}`,
    })),
  ];
}
