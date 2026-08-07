import Link from "next/link";

import { asset, siteConfig } from "@/config/site";

export const SiteFooter = () => (
  <footer className="flex flex-col items-center justify-center gap-2 pt-16 pb-8 text-muted-foreground text-sm">
    {/*
      These three pages exist in `content/pages` and are listed in the sitemap
      but had no link anywhere on the site, so the 28 Jul crawl reported them as
      orphans. next/link, not a raw anchor: only Link prefixes the /ui basePath.
    */}
    <div className="flex items-center gap-4">
      <Link className="transition-colors hover:text-foreground" href="/home">
        Previews
      </Link>
      <Link className="transition-colors hover:text-foreground" href="/privacy">
        Privacy
      </Link>
      <Link className="transition-colors hover:text-foreground" href="/terms">
        Terms
      </Link>
    </div>
    {/*
      blode.co and blode.co/projects are this same origin behind a rewrite, so
      both are internal links: same tab, and no rel="noopener noreferrer", which
      only means something cross-origin. The projects link is the edge back to
      the hub, without which this zone is a dead end for crawlers and readers.
      See blode-co/apps/web/.claude/knowledge/zone-conventions.md.
    */}
    <div className="flex items-center gap-1">
      Crafted by
      <a
        className="flex items-center gap-2 rounded-full py-1.5 pr-2.5 pl-1.5 transition-colors hover:text-foreground"
        href={siteConfig.links.author}
        rel="author"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- self-hosted 20px avatar, plain img avoids next/image overhead */}
        <img
          alt="Matthew Blode"
          className="rounded-full"
          height={20}
          loading="lazy"
          src={asset("/avatar-sm.png")}
          width={20}
        />
        Matthew Blode
      </a>
    </div>
    <div className="flex items-center gap-2 text-muted-foreground/30">
      <span className="text-muted-foreground">v{siteConfig.version}</span>
      <span aria-hidden="true">·</span>
      <a
        className="text-muted-foreground transition-colors hover:text-foreground"
        href="https://blode.co/projects"
      >
        All projects
      </a>
      <span aria-hidden="true">·</span>
      <a
        className="text-muted-foreground transition-colors hover:text-foreground"
        href={siteConfig.links.github}
        rel="noopener noreferrer"
        target="_blank"
      >
        GitHub
      </a>
    </div>
  </footer>
);
