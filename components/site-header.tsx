import Link from "next/link";
import { CommandMenu } from "@/components/command-menu";
import { GitHubLink } from "@/components/github-link";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeSwitcher } from "@/components/mode-switcher";
import { siteConfig } from "@/config/site";
import { Button } from "@/registry/default/ui/button";
import { Separator } from "@/registry/default/ui/separator";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container-wrapper px-6">
        <div className="**:data-[slot=separator]:!h-4 flex h-(--header-height) items-center">
          <MobileNav className="flex lg:hidden" items={siteConfig.navItems} />
          <Button
            asChild
            className="hidden h-8 px-2 font-semibold tracking-tight lg:flex"
            size="sm"
            variant="ghost"
          >
            <Link href="/">{siteConfig.name}</Link>
          </Button>
          <MainNav className="hidden lg:flex" items={siteConfig.navItems} />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              <CommandMenu />
            </div>
            <Separator
              className="ml-2 hidden lg:block"
              orientation="vertical"
            />
            <GitHubLink />
            <Separator orientation="vertical" />
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
