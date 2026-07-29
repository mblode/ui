import { basePath, siteUrl } from "@/config/site";

// AI-open on purpose: crawl, index, ground and train are all permitted, so a
// single `*` group states the whole policy. No `Content-Signal:` line: signals
// are a reservation mechanism, so silence already means no restriction is
// expressed, and an all-yes signal only adds an unknown-directive warning in
// Search Console.
//
// Only `/api/` is excluded, and it carries `basePath`: robots.txt paths always
// resolve from the domain root and this app is served at `blode.co${basePath}`
// (and under the same prefix on its own origin, since `basePath` applies there
// too), so a bare `/api/` matched a URL that does not exist.
//
// `/_next/` used to be excluded as well, which blocked the JS and CSS that
// Googlebot and every rendering AI crawler need to see the page as a reader
// does. `/public/` was inert: Next serves that directory at the root, so no URL
// ever starts with `/public/`.
const ROBOTS_TXT = `User-agent: *
Allow: /
Disallow: ${basePath}/api/

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
