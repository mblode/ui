"use client";

import { motion, useReducedMotion } from "motion/react";
import type * as React from "react";

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

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const Row = ({ item, index, reveal }: { index: number; item: FeatureRowItem; reveal: boolean }) => {
  const reduceMotion = useReducedMotion();
  const content = (
    <>
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
    </>
  );
  const className =
    "grid items-center gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12 md:even:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]";

  if (!reveal) {
    return (
      <li className={className} data-slot="feature-rows-item">
        {content}
      </li>
    );
  }

  return (
    <motion.li
      className={className}
      data-slot="feature-rows-item"
      initial={{ opacity: 0, y: 16 }}
      // The server cannot read the media query, so the row always starts hidden
      // and reduced motion shows it at once rather than skipping the element.
      transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: EASE_OUT }}
      viewport={{ amount: 0.3, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {content}
    </motion.li>
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
