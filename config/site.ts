import packageJson from "../package.json" with { type: "json" };

export const siteConfig = {
  description: "Beautifully designed landing page components built with React & Tailwind CSS.",
  keywords: ["React", "Tailwind CSS", "Motion", "Landing Page", "Components", "Next.js"],
  links: {
    author: "https://matthewblode.com",
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
      label: "Theme Visualizer",
    },
  ],
  ogImage: "https://ui.blode.co/opengraph-image",
  url: "https://ui.blode.co",
  version: packageJson.version,
};

export const META_THEME_COLORS = {
  dark: "#09090b",
  light: "#ffffff",
};

export type SiteConfig = typeof siteConfig;
