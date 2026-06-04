import Link from "next/link";

import { DocNavButtons } from "@/components/doc-nav-buttons";
import { getPagerForPath } from "@/components/pager";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/default/ui/button";

export default function ShowcaseHero() {
  const pager = getPagerForPath("/");

  return (
    <section className="flex flex-col gap-6" id="hero">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between md:items-start">
          <h1 className="scroll-m-24 font-semibold text-3xl tracking-tight sm:text-3xl">
            Blode UI
          </h1>
          <div className="docs-nav flex items-center gap-2">
            <DocNavButtons next={pager?.next} prev={pager?.prev} />
          </div>
        </div>
        <p className="text-[1.05rem] text-muted-foreground sm:text-balance sm:text-base md:max-w-[80%]">
          A registry of accessible, themeable React components. Browse every component live below.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link className={cn(buttonVariants({ variant: "default" }))} href="/docs">
          Get started
        </Link>
        <Link className={cn(buttonVariants({ variant: "secondary" }))} href="/docs/components">
          Browse components
        </Link>
      </div>
    </section>
  );
}
