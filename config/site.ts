export const siteConfig = {
  name: "Blode UI",
  url: "https://ui.blode.co",
  ogImage: "https://ui.blode.co/opengraph-image",
  description:
    "Beautifully designed landing page components built with React & Tailwind CSS.",
  links: {
    github: "https://github.com/mblode/blode-ui",
  },
  navItems: [
    {
      href: "/docs",
      label: "Docs",
    },
    {
      href: "/docs/components",
      label: "Components",
    },
  ],
  keywords: [
    "React",
    "Tailwind CSS",
    "Motion",
    "Landing Page",
    "Components",
    "Next.js",
  ],
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export type SiteConfig = typeof siteConfig;
