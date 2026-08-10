import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

import { basePath } from "./config/site";

const AGENT_DISCOVERY_LINKS = [
  `<${basePath}/.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"`,
  `<${basePath}/.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"`,
  `<${basePath}/docs>; rel="service-doc"; type="text/html"`,
  `<${basePath}/r/index.json>; rel="service-desc"; type="application/json"`,
  `<${basePath}/sitemap.xml>; rel="sitemap"; type="application/xml"`,
].join(", ");

// The PostHog ingestion host, set per Vercel project to our reverse proxy
// (https://r.blode.co). posthog-js lazy-loads chunks from it, so it belongs in
// script-src as well as connect-src.
const posthogOrigin = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "";

/*
 * Every relaxation below was measured against a production build in a real
 * browser, not reasoned about. Do not tighten one without reloading /ui/docs
 * and a component page and re-reading the console.
 *
 * - **`'unsafe-eval'` in production.** `components/mdx-components.tsx` renders
 *   docs through `useMDXComponent`, which compiles the MDX source into a
 *   component in the browser. That is a string eval, so every docs page throws
 *   and renders nothing without it. This is the one directive here that costs
 *   real protection; the way to drop it is to move MDX compilation to build
 *   time, not to delete the entry.
 * - `frame-src 'self'` and X-Frame-Options SAMEORIGIN, because every component
 *   demo is an iframe of this app's own /view route (components/component-preview.tsx).
 *   DENY would blank all of them.
 * - fonts.googleapis.com in style-src and fonts.gstatic.com in font-src, because
 *   the theme visualiser injects a Google Fonts stylesheet at runtime for any
 *   preview font that is not Glide.
 * - `blob:` in img-src, for the object URLs registry/default/ui/file-thumbnail.tsx
 *   creates to preview a picked file.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  // 'unsafe-inline' covers Next's bootstrap and the JSON-LD block. 'unsafe-eval'
  // is the runtime MDX compiler, so unlike the other zones it is not dev-only.
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${posthogOrigin}`,
  `connect-src 'self' ${posthogOrigin}`,
  "img-src 'self' data: blob: https://images.unsplash.com https://avatar.vercel.sh https://avatars.githubusercontent.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "frame-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  assetPrefix: basePath,
  basePath,
  cacheComponents: true,
  devIndicators: false,
  // next.config runs in Node at build time, outside any prerender, so it can
  // read the clock. The sitemap can't: Cache Components prerenders it, and
  // calling `new Date()` there would make the whole route render on demand.
  env: { BUILD_TIME: new Date().toISOString() },
  experimental: {
    // Bailing out of a prerender throws, so anything logged after the abort is
    // noise from a render that was already discarded. Drop it.
    hideLogsAfterAbort: true,
    optimizeCss: true,
    // Hold a navigation or Server Action pending through a connectivity drop
    // and retry on reconnect, instead of throwing.
    useOffline: true,
  },
  async headers() {
    // Every matching rule applies in array order and a later value wins per
    // header key, so the catch-all comes first and per-route rules after it.
    //
    // `/:path*`, not `/(.*)`. Next prefixes basePath onto the source, and
    // `/ui/(.*)` needs the separator, so it misses the zone root: the one URL
    // blode.co actually links to. `/:path*` matches `/ui` as well.
    return [
      {
        headers: securityHeaders,
        source: "/:path*",
      },
      // Machine-readable surfaces: the registry the shadcn CLI installs from,
      // the agent discovery documents, and the share cards. All are read by
      // other origins, so they opt out of the same-origin CORP above.
      ...["/r/:path*", "/.well-known/:path*", "/opengraph-image", "/twitter-image"].map(
        (source) => ({
          headers: [{ key: "Cross-Origin-Resource-Policy", value: "cross-origin" }],
          source,
        }),
      ),
      {
        headers: [
          { key: "Link", value: AGENT_DISCOVERY_LINKS },
          { key: "Vary", value: "Accept" },
        ],
        source: "/",
      },
      {
        headers: [
          { key: "Link", value: AGENT_DISCOVERY_LINKS },
          { key: "Vary", value: "Accept" },
        ],
        source: "/docs/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        protocol: "http",
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: "avatar.vercel.sh",
        protocol: "https",
      },
    ],
  },
  // No `output: "standalone"`. It is for self-hosting, and this only deploys to
  // Vercel, which builds its own output and needs the file traces that
  // standalone mode writes into `.next/standalone` instead. Under 16.3 that
  // stopped producing `.next/next-server.js.nft.json`, so every production
  // build compiled all 115 pages and then died in Vercel's onBuildComplete.
  partialPrefetching: true,
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        destination: "/api/well-known/api-catalog",
        source: "/.well-known/api-catalog",
      },
    ];
  },
  async redirects() {
    return [
      {
        basePath: false,
        destination: `https://blode.co${basePath}`,
        has: [{ type: "host" as const, value: "ui.blode.co" }],
        source: "/",
        statusCode: 301,
      },
      {
        basePath: false,
        destination: `https://blode.co${basePath}/:path*`,
        has: [{ type: "host" as const, value: "ui.blode.co" }],
        source: "/:path*",
        statusCode: 301,
      },
      // `/design` returned a 200 of the docs HTML catch-all, which reads as a
      // working page to a crawler and to anyone guessing the URL.
      {
        destination: "/design.md",
        permanent: true,
        source: "/design",
      },
      {
        destination: "/docs/font",
        permanent: true,
        source: "/docs/typography",
      },
      {
        destination: "/docs/components",
        permanent: true,
        source: "/components",
      },
      {
        destination: "/docs/components/:path*",
        permanent: true,
        source: "/components/:path*",
      },
      {
        destination: "/r/:path.json",
        permanent: true,
        source: "/r/:path([^.]*)",
      },
    ];
  },
};

export default withContentCollections(nextConfig);
