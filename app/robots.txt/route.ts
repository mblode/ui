import { siteUrl } from "@/config/site";

const ROBOTS_TXT = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /public/

Content-Signal: search=yes, ai-input=yes, ai-train=no

Sitemap: ${siteUrl}/sitemap.xml
`;

export function GET() {
  return new Response(ROBOTS_TXT, {
    headers: {
      "cache-control": "public, max-age=3600",
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
