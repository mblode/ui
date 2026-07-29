import { siteUrl } from "@/config/site";

// AI-open on purpose: crawl, index, ground and train are all permitted, so a
// single `*` group states the whole policy. No `Content-Signal:` line: signals
// are a reservation mechanism, so silence already means no restriction is
// expressed, and an all-yes signal only adds an unknown-directive warning in
// Search Console.
//
// Only `/api/` is excluded. `/_next/` used to be too, which blocked the JS and
// CSS that Googlebot and every rendering AI crawler need to see the page as a
// reader does. `/public/` was inert: Next serves that directory at the root, so
// no URL ever starts with `/public/`.
const ROBOTS_TXT = `User-agent: *
Allow: /
Disallow: /api/

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
