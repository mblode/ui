import { withContentCollections } from "@content-collections/next";

const nextConfig = {
  output:
    process.env.NODE_ENV === "production" ? ("standalone" as const) : undefined,
  images: {
    domains: ["localhost", "images.unsplash.com"],
  },
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  async redirects() {
    return [
      {
        source: "/components/:path*",
        destination: "/docs/components/:path*",
        permanent: true,
      },
      {
        source: "/docs/components",
        destination: "/docs/components/accordion",
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
