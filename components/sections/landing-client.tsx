"use client";

import Link from "next/link";
import { useEffect } from "react";

import {
  observeSectionViews,
  trackCtaClicked,
  trackFaqOpened,
  trackInstallCommandCopied,
} from "@/analytics";
import { cn } from "@/lib/utils";
import { Faq } from "@/components/marketing/faq";
import type { FaqItem } from "@/components/marketing/faq";
import { InstallCommand } from "@/components/marketing/install-command";
import type { InstallCommandItem } from "@/components/marketing/install-command";
import { buttonVariants } from "@/registry/default/ui/button";
import { Label } from "@/registry/default/ui/label";
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group";

/*
 * The landing page is a server component. These are the few pieces that need
 * the browser: the analytics callbacks the registry blocks accept, and one live
 * control for the "How it works" section.
 */

/**
 * Reports `section_viewed` for the landing sections. Each is found by its
 * heading's id, the same one the section jump links use, so the ids are stable
 * and no markup is added for tracking. The hero is left out on purpose.
 */
export function SectionViews({ ids }: { ids: string[] }) {
  useEffect(() => {
    const sections = ids.flatMap((id) => {
      const element = document.querySelector(`#${id}`)?.closest("section");
      return element ? [{ element, id }] : [];
    });
    return observeSectionViews(sections);
  }, [ids]);

  return null;
}

export function TrackedCta({
  children,
  className,
  href,
  location,
}: {
  children: string;
  className?: string;
  href: string;
  location: string;
}) {
  // The CTA points at a doc, whose body hangs off `params` and so is not in
  // the App Shell a plain prefetch pulls. Upgrading on hover carries the whole
  // page, so the landing page's one primary action lands on content, not a
  // skeleton. See the `dynamicOnHover` note in next.config.ts.
  return (
    <Link
      className={cn(buttonVariants({ size: "lg", variant: "default" }), className)}
      href={href}
      onClick={() => trackCtaClicked(location, children)}
      unstable_dynamicOnHover
    >
      {children}
    </Link>
  );
}

export function TrackedInstallCommand({
  commands,
  location,
}: {
  commands: InstallCommandItem[];
  location: string;
}) {
  return (
    <InstallCommand
      commands={commands}
      onCopy={(label) => trackInstallCommandCopied(`${location}:${label}`)}
    />
  );
}

export function TrackedFaq({ items }: { items: FaqItem[] }) {
  return <Faq items={items} onOpen={trackFaqOpened} />;
}

const DENSITIES = [
  { label: "Comfortable", value: "comfortable" },
  { label: "Default", value: "default" },
  { label: "Compact", value: "compact" },
];

/** A real Base UI radio group: Tab in, then the arrow keys move the selection. */
export function BaseUiMedia() {
  return (
    <figure className="flex min-h-48 flex-col items-center justify-center gap-5 rounded-xl border bg-muted/40 p-6">
      <RadioGroup aria-label="Density" className="w-fit" defaultValue="comfortable">
        {DENSITIES.map((density) => (
          <Label className="flex items-center gap-3 font-normal" key={density.value}>
            <RadioGroupItem value={density.value} />
            {density.label}
          </Label>
        ))}
      </RadioGroup>
      <figcaption className="text-muted-foreground text-sm">
        Live. Tab in, then use the arrow keys.
      </figcaption>
    </figure>
  );
}
