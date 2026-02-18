"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/registry/default/ui/sidebar";
import type { SidebarNavItem } from "@/types";

const MENU_BUTTON_CLASS =
  "data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md";

function stripTrailingSlash(path: string) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path;
}

function isItemActive(pathname: string, item: SidebarNavItem) {
  if (!item.href || item.external) {
    return false;
  }

  const currentPath = stripTrailingSlash(pathname);
  const itemPath = stripTrailingSlash(item.href);

  if (itemPath === "/docs") {
    return currentPath === itemPath;
  }

  if (currentPath === itemPath) {
    return true;
  }

  return item.items?.length ? currentPath.startsWith(`${itemPath}/`) : false;
}

export function DocsSidebar({
  items,
  ...props
}: React.ComponentProps<typeof Sidebar> & { items: SidebarNavItem[] }) {
  const pathname = usePathname();

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+0.6rem)] z-30 hidden h-[calc(100svh-10rem)] overscroll-none bg-transparent [--sidebar-menu-width:--spacing(56)] lg:flex"
      collapsible="none"
      {...props}
    >
      <div className="h-9" />
      <div className="absolute top-8 z-10 h-8 w-(--sidebar-menu-width) shrink-0 bg-gradient-to-b from-background via-background/80 to-background/50 blur-xs" />
      <div className="absolute top-12 right-2 bottom-0 hidden h-full w-px bg-gradient-to-b from-transparent via-border to-transparent lg:flex" />
      <SidebarContent className="no-scrollbar mx-auto w-(--sidebar-menu-width) overflow-x-hidden px-2">
        {items.map((group, index) => (
          <SidebarGroup className={index === 0 ? "pt-6" : undefined} key={group.title}>
            <SidebarGroupLabel className="font-medium text-muted-foreground">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className={index === 0 ? undefined : "gap-0.5"}>
                {(group.title === "Components"
                  ? [...(group.items ?? [])].sort((a, b) =>
                      a.title.localeCompare(b.title, undefined, {
                        sensitivity: "base",
                      })
                    )
                  : (group.items ?? [])
                ).map((item) => {
                  if (!item.href) {
                    return null;
                  }

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        className={MENU_BUTTON_CLASS}
                        isActive={isItemActive(pathname, item)}
                      >
                        <Link
                          href={item.href}
                          rel={item.external ? "noreferrer" : ""}
                          target={item.external ? "_blank" : ""}
                        >
                          <span className="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent" />
                          {item.title}
                          {item.label && (
                            <span
                              className="flex size-2 rounded-full bg-blue-500"
                              title={item.label}
                            />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <div className="sticky -bottom-1 z-10 h-16 shrink-0 bg-gradient-to-t from-background via-background/80 to-background/50 blur-xs" />
      </SidebarContent>
    </Sidebar>
  );
}
