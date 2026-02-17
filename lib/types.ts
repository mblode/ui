export interface SiteConfig {
  avatar?: string;
  nav: Array<{ label: string; href: string }>;
  siteDescription: string;
  siteName: string;
  siteThumbnail: string;
  siteUrl: string;
  social?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface MDXFrontMatter {
  date: string;
  description?: string;
  slug: string;
  tags?: string[];
  title: string;
}
