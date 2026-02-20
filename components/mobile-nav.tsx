"use client";

import Link from "next/link";
import { type ReactNode, useState } from "react";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const EXTERNAL_HREF_PATTERN = /^(https?:)?\/\//;

function isExternalHref(href: string) {
  return EXTERNAL_HREF_PATTERN.test(href);
}

export function MobileNav({
  items,
  className,
}: {
  items: { href: string; label: string }[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "extend-touch-target !p-0 h-8 touch-manipulation items-center justify-start gap-2.5 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
            className
          )}
          variant="ghost"
        >
          <div className="relative flex h-8 w-4 items-center justify-center">
            <div className="relative size-4">
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                  open ? "top-[0.4rem] -rotate-45" : "top-1"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                  open ? "top-[0.4rem] rotate-45" : "top-2.5"
                )}
              />
            </div>
            <span className="sr-only">Toggle Menu</span>
          </div>
          <span className="flex h-8 items-center font-medium text-lg leading-none">
            Menu
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        alignOffset={-16}
        className="no-scrollbar h-(--available-height) w-(--available-width) overflow-y-auto rounded-none border-none bg-background/90 p-0 shadow-none backdrop-blur duration-100 data-open:animate-none!"
        side="bottom"
        sideOffset={14}
      >
        <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
          <div className="flex flex-col gap-4">
            <div className="font-medium text-muted-foreground text-sm">
              Menu
            </div>
            <div className="flex flex-col gap-3">
              <MobileLink href="/" onOpenChange={setOpen}>
                Home
              </MobileLink>
              {items.map((item) => (
                <MobileLink
                  href={item.href}
                  key={item.href}
                  onOpenChange={setOpen}
                >
                  {item.label}
                </MobileLink>
              ))}
            </div>
          </div>
          {docsConfig.sidebarNav.map((group) => (
            <div className="flex flex-col gap-4" key={group.title}>
              <div className="font-medium text-muted-foreground text-sm">
                {group.title}
              </div>
              <div className="flex flex-col gap-3">
                {group.items?.map((item) => {
                  if (!item.href) {
                    return null;
                  }
                  const isExternal = item.external || isExternalHref(item.href);
                  return (
                    <MobileLink
                      className="flex items-center gap-2"
                      href={item.href}
                      key={item.href}
                      onOpenChange={setOpen}
                      rel={isExternal ? "noreferrer" : undefined}
                      target={isExternal ? "_blank" : undefined}
                    >
                      {item.title}
                    </MobileLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  onClick,
  ...props
}: React.ComponentProps<typeof Link> & {
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      className={cn("flex items-center gap-2 font-medium text-2xl", className)}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        onOpenChange?.(false);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
