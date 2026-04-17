import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      disallow: ["/api/", "/_next/", "/public/"],
      userAgent: "*",
    },
    sitemap: "https://ui.blode.co/sitemap.xml",
  };
}
