"use client";

import {
  CirclePlaceholderOnIcon,
  FilesIcon,
  MacbookAirIcon,
  MoonIcon,
  SunIcon,
} from "blode-icons-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import React from "react";

import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/registry/default/ui/command";

type CommandMenuProps = React.ComponentProps<typeof CommandDialog>;

export function CommandMenu({ ...props }: CommandMenuProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        className={cn(
          "relative h-8 w-full justify-start rounded-lg pl-3 font-normal text-foreground shadow-none hover:bg-muted/50 sm:pr-12 md:w-48 lg:w-56 xl:w-64 dark:bg-card"
        )}
        onClick={() => setOpen(true)}
        variant="outline"
        {...props}
      >
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
      </Button>
      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links">
            {docsConfig.mainNav
              .filter((navitem) => !navitem.external)
              .map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  onSelect={() => {
                    runCommand(() => router.push(navItem.href as string));
                  }}
                  value={navItem.title}
                >
                  <FilesIcon className="mr-2 size-4" />
                  {navItem.title}
                </CommandItem>
              ))}
          </CommandGroup>
          {docsConfig.sidebarNav.map((group) => (
            <CommandGroup heading={group.title} key={group.title}>
              {group.items?.map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  onSelect={() => {
                    runCommand(() => router.push(navItem.href as string));
                  }}
                  value={navItem.title}
                >
                  <div className="mr-2 flex size-4 items-center justify-center">
                    <CirclePlaceholderOnIcon className="size-3" />
                  </div>
                  {navItem.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunIcon className="mr-2 size-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <MoonIcon className="mr-2 size-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <MacbookAirIcon className="mr-2 size-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
