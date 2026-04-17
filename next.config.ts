import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    optimizeCss: true,
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
  async redirects() {
    return [
      {
        destination: "/docs/font",
        permanent: true,
        source: "/docs/typography",
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
