import type * as React from "react";

import { cn } from "@/lib/utils";

interface MarketingHeroProps extends Omit<React.ComponentProps<"section">, "title"> {
  /** One primary action. Pass a single button or link. */
  action: React.ReactNode;
  /** One sentence: who it is for and what changes. */
  description: React.ReactNode;
  /** The brand or product name, shown above the headline. */
  eyebrow?: React.ReactNode;
  /** Optional supporting action, such as an install command. */
  secondary?: React.ReactNode;
  /** The headline. Rendered as the page's only `h1`. */
  title: React.ReactNode;
}

/**
 * The first viewport of a marketing page: brand, headline, subhead, one action.
 *
 * Nothing here animates. The hero is above the fold, so it paints in its final
 * state; reveals belong further down the page. `children` is the slot for the
 * page's signature moment, rendered under the text column.
 */
const MarketingHero = ({
  action,
  children,
  className,
  description,
  eyebrow,
  secondary,
  title,
  ...props
}: MarketingHeroProps) => (
  <section className={cn("flex flex-col gap-10", className)} data-slot="marketing-hero" {...props}>
    <div className="flex max-w-2xl flex-col gap-6">
      <div className="flex flex-col gap-3">
        {eyebrow ? (
          <p
            className="font-medium text-muted-foreground text-sm"
            data-slot="marketing-hero-eyebrow"
          >
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-balance font-semibold text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.05] tracking-[-0.035em]">
          {title}
        </h1>
        <p className="max-w-xl text-pretty text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex flex-col gap-4" data-slot="marketing-hero-actions">
        <div className="flex flex-wrap items-center gap-3">{action}</div>
        {secondary ? <div className="min-w-0">{secondary}</div> : null}
      </div>
    </div>
    {children}
  </section>
);

export { MarketingHero };
export type { MarketingHeroProps };
