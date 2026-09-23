"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionTocItem {
  /** The `id` of the section element to jump to, without `#`. */
  id: string;
  label: string;
}

interface SectionTocProps extends React.ComponentProps<"nav"> {
  items: SectionTocItem[];
  /** Visible heading above the links. */
  title?: string;
}

const useActiveSection = (ids: string[]) => {
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    const elements = ids
      .map((id) => document.querySelector<HTMLElement>(`#${CSS.escape(id)}`))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    // A section is current once its top passes the upper fifth of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%" },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [ids]);

  return active;
};

/**
 * Jump links for a long page, with the section in view marked as current.
 * The links are plain anchors, so they work before hydration and without
 * JavaScript; the current-section marker is the only part that needs it.
 */
const SectionToc = ({ className, items, title = "On this page", ...props }: SectionTocProps) => {
  const ids = React.useMemo(() => items.map((item) => item.id), [items]);
  const active = useActiveSection(ids);
  const headingId = React.useId();

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-labelledby={headingId}
      className={cn("flex flex-col gap-3 text-sm", className)}
      data-slot="section-toc"
      {...props}
    >
      <p className="font-medium text-muted-foreground text-xs" id={headingId}>
        {title}
      </p>
      <ol className="flex flex-col gap-2 border-l">
        {items.map((item) => (
          <li className="-ml-px" key={item.id}>
            <a
              aria-current={active === item.id ? "location" : undefined}
              className="-my-0.5 block border-transparent border-l py-0.5 pl-3 text-[0.8125rem] text-muted-foreground outline-none transition-[color,border-color] hover:text-foreground focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-[current=location]:border-foreground aria-[current=location]:font-medium aria-[current=location]:text-foreground"
              href={`#${item.id}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export { SectionToc };
export type { SectionTocItem, SectionTocProps };
