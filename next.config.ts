import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output:
    process.env.NODE_ENV === "production" ? ("standalone" as const) : undefined,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
    ],
  },
  reactStrictMode: true,
  devIndicators: false,
  experimental: {
    optimizeCss: true,
  },
  async redirects() {
    return [
      {
        source: "/docs/typography",
        destination: "/docs/font",
        permanent: true,
      },
      {
        source: "/components/:path*",
        destination: "/docs/components/:path*",
        permanent: true,
      },
      {
        source: "/r/:path([^.]*)",
        destination: "/r/:path.json",
        permanent: true,
      },
    ];
  },
};

export default withContentCollections(nextConfig);
