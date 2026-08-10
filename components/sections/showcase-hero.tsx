import Link from "next/link";

import { DocNavButtons } from "@/components/doc-nav-buttons";
import { getPagerForPath } from "@/components/pager";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/default/ui/button";

// Counted rather than written out, so the claim in the subhead cannot drift
// from the sidebar the reader is looking at.
const componentCount =
  docsConfig.sidebarNav.find((group) => group.title === "Components")?.items?.length ?? 0;

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
          {componentCount} React components built on Base UI and Tailwind CSS v4. Install them with
          the shadcn CLI, then own the source.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link className={cn(buttonVariants({ variant: "default" }))} href="/docs/installation">
          Install Blode UI
        </Link>
        <Link className={cn(buttonVariants({ variant: "secondary" }))} href="/docs">
          Read the docs
        </Link>
      </div>
    </section>
  );
}
