"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "blode-icons-react";
import React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?:
      | "outline"
      | "default"
      | "secondary"
      | "ghost"
      | "link"
      | "destructive";
    size?: "default" | "sm" | "lg" | "icon" | "xs";
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        {
          "border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground":
            variant === "outline",
          "h-8 w-8 p-0": size === "icon",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

interface ScrollMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  leftButtonLabel?: string;
  rightButtonLabel?: string;
  scrollAmount?: number;
  showScrollButtons?: boolean;
}

export const ScrollMenu = React.forwardRef<HTMLDivElement, ScrollMenuProps>(
  (
    {
      className,
      children,
      leftButtonLabel = "Scroll left",
      rightButtonLabel = "Scroll right",
      scrollAmount = 200,
      showScrollButtons = true,
      ...props
    },
    ref
  ) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [showLeftScroll, setShowLeftScroll] = React.useState(false);
    const [showRightScroll, setShowRightScroll] = React.useState(false);

    const handleScroll = React.useCallback(() => {
      if (!scrollContainerRef.current) {
        return;
      }

      const container = scrollContainerRef.current;
      setShowLeftScroll(container.scrollLeft > 0);
      setShowRightScroll(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 5
      );
    }, []);

    React.useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container) {
        return;
      }

      handleScroll();
      const observer = new ResizeObserver(() => {
        handleScroll();
      });

      observer.observe(container);

      return () => {
        observer.disconnect();
      };
    }, [handleScroll]);

    const scrollLeft = () => {
      if (!scrollContainerRef.current) {
        return;
      }
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    };

    const scrollRight = () => {
      if (!scrollContainerRef.current) {
        return;
      }
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    };

    return (
      <div className={cn("relative", className)} ref={ref} {...props}>
        {showScrollButtons && showLeftScroll && (
          <Button
            aria-label={leftButtonLabel}
            className="absolute top-1/2 left-0 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background shadow-sm"
            onClick={scrollLeft}
            size="icon"
            variant="secondary"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
        )}
        <div
          className="scrollbar-hide flex w-full overflow-x-auto"
          onScroll={handleScroll}
          ref={scrollContainerRef}
        >
          {children}
        </div>
        {showScrollButtons && showRightScroll && (
          <Button
            aria-label={rightButtonLabel}
            className="absolute top-1/2 right-0 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background shadow-sm"
            onClick={scrollRight}
            size="icon"
            variant="secondary"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }
);

ScrollMenu.displayName = "ScrollMenu";
