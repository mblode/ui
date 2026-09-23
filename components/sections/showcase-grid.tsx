"use client";

import Link from "next/link";
import React from "react";

import { Index } from "@/__registry__";
import { trackInstallCommandCopied } from "@/analytics";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { CopyIcon, useCopyState } from "@/registry/default/blocks/install-command";
import { ui } from "@/registry/default/ui/_registry";
import { Button } from "@/registry/default/ui/button";
import { Spinner } from "@/registry/default/ui/spinner";

interface RegistryComponentEntry {
  component?: React.ComponentType;
}

interface ShowcaseItem {
  demoName: string;
  href: string;
  /** Only set when the registry publishes this slug as one installable item. */
  installCommand?: string;
  slug: string;
  title: string;
}

// Some docs pages (Date Picker, Typography) are compositions with no registry
// item of their own, so there is nothing for their card to install.
const INSTALLABLE = new Set(ui.map((item) => item.name));
const installCommandFor = (slug: string) =>
  INSTALLABLE.has(slug) ? `npx shadcn@latest add https://blode.co/ui/r/${slug}.json` : undefined;

// Components whose demos render a full-page layout that doesn't fit a grid cell.
const EXCLUDED_SLUGS = new Set(["sidebar", "typography", "data-table", "form"]);

// The hand-built showcase demos import most of the component library, and a
// card only renders its demo once it scrolls near the viewport. Loading that
// module on the first visible card keeps it out of the page's first-load bundle.
const loadShowcaseDemos = () => import("@/components/sections/showcase-demos");

interface ShowcaseDemoProps {
  /** The registry demo, used when there is no hand-built showcase for the slug. */
  fallback?: React.ComponentType;
  slug: string;
}

const ShowcaseDemo = React.lazy(async () => {
  const { showcaseDemos } = await loadShowcaseDemos();
  function LoadedShowcaseDemo({ fallback, slug }: ShowcaseDemoProps) {
    const Component = showcaseDemos[slug] ?? fallback;
    return Component ? <Component /> : null;
  }
  return { default: LoadedShowcaseDemo };
});

function getShowcaseItems(): ShowcaseItem[] {
  const registry = Index.default as Record<string, RegistryComponentEntry> | undefined;

  if (!registry) {
    return [];
  }

  const componentsGroup = docsConfig.sidebarNav.find((group) => group.title === "Components");

  return (componentsGroup?.items ?? [])
    .toSorted((a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" }))
    .flatMap((item) => {
      const slug = item.href?.split("/").pop();

      if (!(slug && item.href) || EXCLUDED_SLUGS.has(slug)) {
        return [];
      }

      const demoName = `${slug}-demo`;

      // Every hand-built showcase demo also has a registry demo, so the
      // registry alone decides which components get a card.
      if (!registry[demoName]?.component) {
        return [];
      }

      return [
        {
          demoName,
          href: item.href,
          installCommand: installCommandFor(slug),
          slug,
          title: item.title,
        },
      ];
    });
}

/**
 * Copies one component's install command. A failed copy (no clipboard access)
 * shows an alert icon and is announced through the wall's live region, so it
 * never fails silently.
 */
function CardCopyButton({
  command,
  onAnnounce,
  slug,
  title,
}: {
  command: string;
  onAnnounce?: (message: string) => void;
  slug: string;
  title: string;
}) {
  const { copy, state } = useCopyState();

  const handleCopy = async () => {
    if (await copy(command)) {
      onAnnounce?.(`Copied the install command for ${title}`);
      trackInstallCommandCopied(`component:${slug}`);
    } else {
      onAnnounce?.(`Couldn't copy. The ${title} command is on its docs page.`);
    }
  };

  return (
    <Button
      aria-label={`Copy install command for ${title}`}
      className="absolute top-2.5 right-2.5 z-10 text-muted-foreground hover:text-foreground"
      data-state={state}
      onClick={handleCopy}
      size="icon-xs"
      title={command}
      variant="ghost"
    >
      <CopyIcon state={state} />
    </Button>
  );
}

function ShowcaseCard({
  demoName,
  href,
  installCommand,
  onAnnounce,
  slug,
  title,
}: ShowcaseItem & { onAnnounce?: (message: string) => void }) {
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
  const fallback = registry[demoName]?.component;

  return (
    <li
      className="relative flex min-h-64 items-center justify-center overflow-x-hidden bg-card"
      ref={ref}
    >
      {/* Each tile opens a component doc; upgrade on hover like the sidebar. */}
      <Link
        unstable_dynamicOnHover
        className="absolute top-4 left-4 z-10 rounded-sm font-medium text-muted-foreground text-sm tracking-tight outline-none transition-[color,box-shadow] hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
        href={href}
      >
        {title}
      </Link>
      {installCommand ? (
        <CardCopyButton
          command={installCommand}
          onAnnounce={onAnnounce}
          slug={slug}
          title={title}
        />
      ) : null}
      <div className="flex w-full items-center justify-center px-6 pt-14 pb-8 isolate">
        {inView ? (
          <React.Suspense fallback={<Spinner aria-label={`Loading ${title}`} size={16} />}>
            <ShowcaseDemo fallback={fallback} slug={slug} />
          </React.Suspense>
        ) : (
          <Spinner aria-label={`Loading ${title}`} size={16} />
        )}
      </div>
    </li>
  );
}

export function ShowcaseGrid({
  className,
  onAnnounce,
  style,
}: {
  className?: string;
  /** Receives copy results, for a live region the grid's owner renders. */
  onAnnounce?: (message: string) => void;
  style?: React.CSSProperties;
}) {
  const items = React.useMemo(() => getShowcaseItems(), []);

  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
        className,
      )}
      style={style}
    >
      {items.map((item) => (
        <ShowcaseCard key={item.demoName} onAnnounce={onAnnounce} {...item} />
      ))}
    </ul>
  );
}
