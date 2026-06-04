import { ArrowLeftIcon, ArrowRightIcon } from "blode-icons-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import type { NavItem } from "@/types";

interface DocNavButtonsProps {
  className?: string;
  next?: NavItem | null;
  prev?: NavItem | null;
}

const NAV_BUTTON_CLASS = "extend-touch-target size-8 shadow-none md:size-7";

export function DocNavButtons({ className, next, prev }: DocNavButtonsProps) {
  if (!(prev?.href || next?.href)) {
    return null;
  }

  return (
    <div className={cn("flex gap-2", className)}>
      {prev?.href && (
        <Button asChild className={NAV_BUTTON_CLASS} size="icon" variant="secondary">
          <Link href={prev.href} title={prev.title}>
            <ArrowLeftIcon />
            <span className="sr-only">Previous</span>
          </Link>
        </Button>
      )}
      {next?.href && (
        <Button asChild className={NAV_BUTTON_CLASS} size="icon" variant="secondary">
          <Link href={next.href} title={next.title}>
            <span className="sr-only">Next</span>
            <ArrowRightIcon />
          </Link>
        </Button>
      )}
    </div>
  );
}
