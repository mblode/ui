"use client";

import Link from "next/link";
import React from "react";

import { Index } from "@/__registry__";
import { showcaseDemos } from "@/components/sections/showcase-demos";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { Spinner } from "@/registry/default/ui/spinner";

interface RegistryComponentEntry {
  component?: React.ComponentType;
}

interface ShowcaseItem {
  demoName: string;
  href: string;
  slug: string;
  title: string;
}

// Components whose demos render a full-page layout that doesn't fit a grid cell.
const EXCLUDED_SLUGS = new Set(["sidebar", "typography", "data-table", "form"]);

function getShowcaseItems(): ShowcaseItem[] {
  const registry = Index.default as Record<string, RegistryComponentEntry> | undefined;

  if (!registry) {
    return [];
  }

  const componentsGroup = docsConfig.sidebarNav.find((group) => group.title === "Components");

  return (componentsGroup?.items ?? [])
    .toSorted((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }))
    .flatMap((item) => {
      const slug = item.href?.split("/").pop();

      if (!(slug && item.href) || EXCLUDED_SLUGS.has(slug)) {
        return [];
      }

      const demoName = `${slug}-demo`;

      if (!(showcaseDemos[slug] || registry[demoName]?.component)) {
        return [];
      }

      return [{ demoName, href: item.href, slug, title: item.title }];
    });
}

function ShowcaseCard({ demoName, href, slug, title }: ShowcaseItem) {
  const ref = React.useRef<HTMLLIElement>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;

    if (!node || inView) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView]);

  const registry = Index.default as Record<string, RegistryComponentEntry>;
  const Component = showcaseDemos[slug] ?? registry[demoName]?.component;

  return (
    <li
      className="relative flex min-h-64 items-center justify-center overflow-x-hidden bg-card"
      ref={ref}
    >
      <Link
        className="absolute top-4 left-4 z-10 font-medium text-muted-foreground text-sm tracking-tight transition-colors hover:text-foreground"
        href={href}
      >
        {title}
      </Link>
      <div className="flex w-full items-center justify-center px-6 pt-14 pb-8 isolate">
        {inView && Component ? (
          <React.Suspense fallback={<Spinner aria-label={`Loading ${title}`} size={16} />}>
            <Component />
          </React.Suspense>
        ) : (
          <Spinner aria-label={`Loading ${title}`} size={16} />
        )}
      </div>
    </li>
  );
}

export function ShowcaseGrid({ className }: { className?: string }) {
  const items = React.useMemo(() => getShowcaseItems(), []);

  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
        className,
      )}
    >
      {items.map((item) => (
        <ShowcaseCard key={item.demoName} {...item} />
      ))}
    </ul>
  );
}
