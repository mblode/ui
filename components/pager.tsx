import { ChevronLeftIcon, ChevronRightIcon } from "blode-icons-react";
import type { Doc } from "content-collections";
import Link from "next/link";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/default/ui/button";
import type { NavItem, NavItemWithChildren } from "@/types";

interface DocsPagerProps {
  doc: Doc;
}

export function DocPager({ doc }: DocsPagerProps) {
  const pager = getPagerForDoc(doc);

  if (!pager) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between gap-4">
      {pager?.prev?.href && (
        <Link
          className={cn(buttonVariants({ variant: "ghost" }), "min-w-0")}
          href={pager.prev.href}
          title={pager.prev.title}
        >
          <ChevronLeftIcon aria-hidden="true" className="mr-2 size-4 shrink-0" />
          <span className="truncate">{pager.prev.title}</span>
        </Link>
      )}
      {pager?.next?.href && (
        <Link
          className={cn(buttonVariants({ variant: "ghost" }), "ml-auto min-w-0 text-right")}
          href={pager.next.href}
          title={pager.next.title}
        >
          <span className="truncate">{pager.next.title}</span>
          <ChevronRightIcon aria-hidden="true" className="ml-2 size-4 shrink-0" />
        </Link>
      )}
    </div>
  );
}

/** The Previous / Next strip at the foot of a docs page, and of the landing page. */
export function PagerNav({ next, prev }: { next?: NavItem | null; prev?: NavItem | null }) {
  if (!(prev?.href || next?.href)) {
    return null;
  }

  return (
    <nav className="flex w-full rounded-2xl bg-muted/50 p-1 text-sm" id="pagination">
      {prev?.href ? (
        <Link
          unstable_dynamicOnHover
          className="group flex items-center justify-between gap-1.5 pr-6 pl-3"
          href={prev.href}
        >
          <ChevronLeftIcon
            aria-hidden="true"
            className="size-3 text-muted-foreground/50 group-hover:text-muted-foreground"
          />
          <span className="font-medium text-muted-foreground tracking-tight group-hover:text-foreground">
            Previous
          </span>
        </Link>
      ) : null}
      {next?.href ? (
        <Link
          unstable_dynamicOnHover
          className="group ml-auto flex w-full min-w-0 flex-1"
          href={next.href}
        >
          <div className="flex flex-1 items-center justify-end rounded-xl bg-background hover:ring-1 hover:ring-border sm:h-16">
            <div className="flex min-w-0 flex-col items-end justify-center px-5">
              <span className="text-right font-semibold text-foreground/80">{next.title}</span>
            </div>
            <div className="h-8 w-px bg-border/50" />
            <div className="flex items-center gap-1.5 pr-3 pl-5">
              <span className="font-medium text-muted-foreground tracking-tight group-hover:text-foreground">
                Next
              </span>
              <ChevronRightIcon
                aria-hidden="true"
                className="size-3 text-muted-foreground/50 group-hover:text-muted-foreground"
              />
            </div>
          </div>
        </Link>
      ) : null}
    </nav>
  );
}

export function getPagerForDoc(doc: Doc) {
  const flattenedLinks = [null, ...flatten(docsConfig.sidebarNav), null];
  const activeIndex = flattenedLinks.findIndex(
    (link) =>
      doc.slug === link?.href ||
      doc.slug === `${link?.href}/index` ||
      doc.slug === `${link?.href}/`,
  );
  const prev = activeIndex === 0 ? null : flattenedLinks[activeIndex - 1];
  const next = activeIndex === flattenedLinks.length - 1 ? null : flattenedLinks[activeIndex + 1];
  return {
    next,
    prev,
  };
}

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path;
}

export function getPagerForPath(pathname: string) {
  const flattenedLinks = [null, ...flatten(docsConfig.sidebarNav), null];
  const current = normalizePath(pathname);
  const activeIndex = flattenedLinks.findIndex(
    (link) => link?.href && normalizePath(link.href) === current,
  );

  if (activeIndex === -1) {
    return null;
  }

  const prev = activeIndex > 0 ? flattenedLinks[activeIndex - 1] : null;
  const next = activeIndex < flattenedLinks.length - 1 ? flattenedLinks[activeIndex + 1] : null;
  return {
    next,
    prev,
  };
}

export function flatten(links: NavItemWithChildren[]): NavItem[] {
  return links
    .reduce<NavItem[]>((flat, link) => {
      if (link.items?.length) {
        return flat.concat(link.href ? [link, ...flatten(link.items)] : flatten(link.items));
      }
      return flat.concat(link);
    }, [])
    .filter((link) => !link?.disabled);
}
