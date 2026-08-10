import packageJson from "../package.json" with { type: "json" };

export const basePath = "/ui";

export const asset = (path: string) => `${basePath}${path}`;

export const siteUrl = `https://blode.co${basePath}`;

export const siteConfig = {
  description:
    "An open-source shadcn registry of accessible React components built on Base UI and Tailwind CSS v4. Install with one command, then own the source.",
  links: {
    author: "https://blode.co",
    github: "https://github.com/mblode/blode-ui",
  },
  name: "Blode UI",
  navItems: [
    {
      href: "/docs",
      label: "Docs",
    },
    {
      href: "/docs/components",
      label: "Components",
    },
    {
      href: "/theme-visualizer",
      label: "Theme Visualiser",
    },
  ],
  ogImage: `${siteUrl}/opengraph-image`,
  url: siteUrl,
  version: packageJson.version,
};

export const META_THEME_COLORS = {
  dark: "#09090b",
  light: "#ffffff",
};

export type SiteConfig = typeof siteConfig;
