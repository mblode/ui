"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface FeatureRowItem {
  description: string;
  /** Real product output: a live component, a screenshot, or code. */
  media: React.ReactNode;
  title: string;
}

interface FeatureRowsProps extends React.ComponentProps<"div"> {
  items: FeatureRowItem[];
  /**
   * Fade each row up once as it first scrolls into view. Off by default.
   * Only turn it on when the rows sit below the fold: a marketing page gets at
   * most two once-only reveals, and nothing above the fold animates on mount.
   */
  reveal?: boolean;
}

type RevealPhase = "static" | "waiting" | "shown";

/**
 * A once-only reveal with no animation library. The row renders visible on the
 * server and without script. At hydration it stays put when it is already on
 * screen or the reader prefers reduced motion; otherwise it hides, and fades
 * and lifts in the first time it scrolls into view.
 */
const useRevealOnce = (ref: React.RefObject<HTMLLIElement | null>, enabled: boolean) => {
  const [phase, setPhase] = React.useState<RevealPhase>("static");

  React.useEffect(() => {
    const node = ref.current;
    if (
      !(enabled && node) ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      node.getBoundingClientRect().top < window.innerHeight
    ) {
      return;
    }
    setPhase("waiting");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPhase("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, ref]);

  return phase;
};

const Row = ({ item, index, reveal }: { index: number; item: FeatureRowItem; reveal: boolean }) => {
  const ref = React.useRef<HTMLLIElement>(null);
  const phase = useRevealOnce(ref, reveal);

  return (
    <li
      className={cn(
        "grid items-center gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12 md:even:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]",
        "data-[phase=waiting]:translate-y-4 data-[phase=waiting]:opacity-0",
        "data-[phase=shown]:transition-[opacity,translate] data-[phase=shown]:duration-500 data-[phase=shown]:ease-[cubic-bezier(0.22,1,0.36,1)]",
      )}
      data-phase={reveal ? phase : undefined}
      data-slot="feature-rows-item"
      ref={ref}
    >
      <div className="flex flex-col gap-2 md:max-w-sm">
        <h3 className="text-balance font-semibold text-xl tracking-tight">{item.title}</h3>
        <p className="text-pretty text-muted-foreground leading-relaxed">{item.description}</p>
      </div>
      <div
        className={cn("min-w-0", index % 2 === 1 && "md:order-first")}
        data-slot="feature-rows-media"
      >
        {item.media}
      </div>
    </li>
  );
};

/**
 * Alternating text and product media, one idea per row. No cards: rows are
 * separated by space alone, and the media carries the proof.
 */
const FeatureRows = ({ className, items, reveal = false, ...props }: FeatureRowsProps) => (
  <div className={cn("w-full", className)} data-slot="feature-rows" {...props}>
    <ul className="flex flex-col gap-16 md:gap-20">
      {items.map((item, index) => (
        <Row index={index} item={item} key={item.title} reveal={reveal} />
      ))}
    </ul>
  </div>
);

export { FeatureRows };
export type { FeatureRowItem, FeatureRowsProps };
