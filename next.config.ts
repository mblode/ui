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
