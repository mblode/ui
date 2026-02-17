"use client";

import { useEffect, useMemo, useState } from "react";

import type { TableOfContents as TocData } from "@/lib/toc";
import { cn } from "@/lib/utils";

interface FlatItem {
  depth: number;
  title: string;
  url: string;
}

function flattenToc(toc: TocData, depth = 2): FlatItem[] {
  const result: FlatItem[] = [];

  if (!toc.items) {
    return result;
  }

  for (const item of toc.items) {
    if (item.title && item.url) {
      result.push({ title: item.title, url: item.url, depth });
    }
    if (item.items) {
      result.push(...flattenToc(item, depth + 1));
    }
  }

  return result;
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    for (const id of itemIds ?? []) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      for (const id of itemIds ?? []) {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      }
    };
  }, [itemIds]);

  return activeId;
}

interface TocProps {
  className?: string;
  toc: TocData;
}

export function TableOfContents({ toc, className }: TocProps) {
  const flatItems = useMemo(() => flattenToc(toc), [toc]);
  const itemIds = useMemo(
    () => flatItems.map((item) => item.url.replace("#", "")),
    [flatItems]
  );
  const activeHeading = useActiveItem(itemIds);

  if (!flatItems.length) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-2 p-4 pt-0 text-sm", className)}>
      <p className="sticky top-0 h-6 bg-background font-medium text-muted-foreground text-xs">
        On This Page
      </p>
      {flatItems.map((item) => (
        <a
          className="text-[0.8rem] text-muted-foreground no-underline transition-colors hover:text-foreground data-[depth=3]:pl-4 data-[depth=4]:pl-6 data-[active=true]:font-medium data-[active=true]:text-foreground"
          data-active={item.url === `#${activeHeading}`}
          data-depth={item.depth}
          href={item.url}
          key={item.url}
        >
          {item.title}
        </a>
      ))}
    </div>
  );
}
