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

const nextConfig: NextConfig = {
  assetPrefix: basePath,
  basePath,
  devIndicators: false,
  experimental: {
    optimizeCss: true,
  },
  async headers() {
    return [
      {
        // The zone origin and the *.vercel.app aliases are non-canonical
        // hostnames inside the sc-domain:blode.co Search Console property, so
        // left open they are a crawlable duplicate of the whole site.
        //
        // Keyed off x-forwarded-host, NOT host: the multi-zone rewrite proxies
        // to the origin, so `host` is the origin for real blode.co traffic
        // too. Matching on `host` would noindex the live site.
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
        has: [
          {
            key: "x-forwarded-host",
            type: "header" as const,
            value: String.raw`.*\.zone\.blode\.co|.*\.vercel\.app`,
          },
        ],
        source: "/:path*",
      },
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
  output: process.env.NODE_ENV === "production" ? ("standalone" as const) : undefined,
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
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
        permanent: true,
        source: "/",
      },
      {
        basePath: false,
        destination: `https://blode.co${basePath}/:path*`,
        has: [{ type: "host" as const, value: "ui.blode.co" }],
        permanent: true,
        source: "/:path*",
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
