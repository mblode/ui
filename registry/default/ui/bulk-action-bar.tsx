"use client";

import { CrossLargeIcon } from "blode-icons-react";
import { useEffect } from "react";
import type * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";

export interface BulkActionBarProps extends Omit<React.ComponentProps<"section">, "children"> {
  /** Accessible name for the bar itself (default: "Bulk actions") */
  "aria-label"?: string;
  /** The actions offered for the selection */
  children: React.ReactNode;
  /** Accessible label for the clear button (default: "Clear selection") */
  clearLabel?: string;
  /** How many rows are selected. The bar is hidden at zero. */
  count: number;
  /** Renders the count line. Defaults to "N selected". */
  label?: (count: number) => React.ReactNode;
  /** Called when the selection is cleared, by the button or by Escape */
  onClear: () => void;
}

const BulkActionBar = ({
  "aria-label": ariaLabel = "Bulk actions",
  children,
  className,
  clearLabel = "Clear selection",
  count,
  label,
  onClear,
  ...props
}: BulkActionBarProps) => {
  const message = label?.(count) ?? (
    <>
      <span className="font-medium text-foreground tabular-figures">{count}</span> selected
    </>
  );

  useEffect(() => {
    if (count === 0) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      // Anything nested that handles Escape itself — a dialog, a combobox — calls
      // preventDefault first, so the selection survives closing it.
      if (event.key === "Escape" && !event.defaultPrevented) {
        onClear();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [count, onClear]);

  return (
    <>
      {/* The live region outlives the bar: a region mounted at the same moment
          as its first message is not reliably announced. */}
      <output className="sr-only" data-slot="bulk-action-bar-status">
        {count > 0 ? message : null}
      </output>

      {count > 0 ? (
        <section
          aria-label={ariaLabel}
          className={cn(
            // Out of flow, so checking the first row does not shove the list down
            // under the cursor. `absolute` anchors to the list's own positioned
            // container; pass `fixed` to pin it to the viewport instead.
            // `w-max` matters: with `left-1/2` and no `right`, shrink-to-fit sizes the
            // bar to half the container and the actions wrap for no visible reason.
            "-translate-x-1/2 absolute bottom-4 left-1/2 z-20 w-max max-w-[calc(100%-2rem)]",
            "flex items-center gap-2 rounded-xl bg-popover p-1.5 pl-3",
            // A ring rather than a border: `shadow-soft` all but disappears in
            // dark mode, and the ring is what carries the edge there.
            "text-popover-foreground shadow-soft ring-1 ring-foreground/10",
            "fade-in-0 slide-in-from-bottom-2 animate-in duration-150",
            className,
          )}
          data-slot="bulk-action-bar"
          {...props}
        >
          <span
            aria-hidden="true"
            className="whitespace-nowrap text-muted-foreground text-sm"
            data-slot="bulk-action-bar-count"
          >
            {message}
          </span>

          <div className="flex flex-wrap items-center gap-1" data-slot="bulk-action-bar-actions">
            {children}
          </div>

          <Button aria-label={clearLabel} onClick={onClear} size="icon-sm" variant="ghost">
            <CrossLargeIcon />
          </Button>
        </section>
      ) : null}
    </>
  );
};

export { BulkActionBar };
