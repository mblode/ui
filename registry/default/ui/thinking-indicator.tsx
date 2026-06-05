"use client";

import { AnimatePresence, motion } from "motion/react";
import type * as React from "react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

// Three SVG paths the icon morphs between: a circle, a figure-eight, and the
// same circle traced the other way. Cycling A → ∞ → B → ∞ → A reads as a calm,
// continuous "moonwalk" without ever snapping.
const circleA =
  "M 12 8 C 14.21 8 16 9.79 16 12 C 16 14.21 14.21 16 12 16 C 9.79 16 8 14.21 8 12 C 8 9.79 9.79 8 12 8 Z";
const infinity =
  "M 12 12 C 14 8.5 19 8.5 19 12 C 19 15.5 14 15.5 12 12 C 10 8.5 5 8.5 5 12 C 5 15.5 10 15.5 12 12 Z";
const circleB =
  "M 12 16 C 14.21 16 16 14.21 16 12 C 16 9.79 14.21 8 12 8 C 9.79 8 8 9.79 8 12 C 8 14.21 9.79 16 12 16 Z";

// Self-contained shimmer: a clipped gradient swept across the text via motion,
// so the component needs no global keyframe/CSS to render.
const SHIMMER_GRADIENT =
  "linear-gradient(90deg, var(--muted-foreground) 0%, var(--muted-foreground) 35%, var(--foreground) 50%, var(--muted-foreground) 65%, var(--muted-foreground) 100%)";

function ShimmerText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span
      animate={{ backgroundPosition: ["0% 0", "100% 0"] }}
      className={cn("bg-clip-text text-transparent leading-[1.22] py-1", className)}
      style={{ backgroundImage: SHIMMER_GRADIENT, backgroundSize: "300% 100%" }}
      transition={{ duration: 1.5, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
    >
      {children}
    </motion.span>
  );
}

const DEFAULT_WORDS = ["Thinking", "Moonwalking", "Planning", "Refining"];

interface ThinkingIndicatorProps extends React.ComponentProps<"div"> {
  /** Labels cycled through while thinking. Defaults to a small built-in set. */
  words?: string[];
  /** Milliseconds each label is shown before swapping. Defaults to 4000. */
  interval?: number;
}

// ─── ThinkingIndicator ──────────────────────────────────────────────────────
// An animated status row: a morphing SVG glyph paired with shimmering, cycling
// text. Drop it into a transcript while an assistant response is streaming.
function ThinkingIndicator({
  className,
  words = DEFAULT_WORDS,
  interval = 4000,
  ref,
  ...props
}: ThinkingIndicatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  // Reserve width for the longest label so the row never reflows mid-cycle.
  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b));

  return (
    <div
      className={cn("flex items-center gap-2 px-3 py-2", className)}
      data-slot="thinking-indicator"
      ref={ref}
      role="status"
      {...props}
    >
      <motion.svg
        aria-hidden
        className="shrink-0 text-muted-foreground"
        fill="none"
        height={20}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        width={20}
      >
        <motion.path
          animate={{ d: [circleA, infinity, circleB, infinity, circleA] }}
          transition={{
            d: {
              duration: 6,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              times: [0, 0.25, 0.5, 0.75, 1],
            },
          }}
        />
      </motion.svg>
      <span className="inline-grid overflow-hidden font-medium text-[13px]">
        <span aria-hidden className="invisible col-start-1 row-start-1">
          {longest}
        </span>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            animate={{
              opacity: 1,
              transition: { duration: 0.24, ease: [0.4, 0, 0.2, 1] },
              y: 0,
            }}
            className="col-start-1 row-start-1"
            exit={{
              opacity: 0,
              transition: { duration: 0.16, ease: [0.4, 0, 0.2, 1] },
              y: "-80%",
            }}
            initial={{ opacity: 0, y: "80%" }}
            key={words[index]}
          >
            <ShimmerText>{words[index]}</ShimmerText>
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

export { ThinkingIndicator };
export type { ThinkingIndicatorProps };
