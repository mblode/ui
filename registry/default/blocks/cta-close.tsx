import type * as React from "react";

import { cn } from "@/lib/utils";

interface CtaCloseProps extends Omit<React.ComponentProps<"section">, "title"> {
  /** The page's primary action, repeated. Pass the same one the hero uses. */
  action: React.ReactNode;
  /** Optional command or snippet the reader can take away, such as `InstallCommand`. */
  command?: React.ReactNode;
  description?: React.ReactNode;
  title: React.ReactNode;
}

/**
 * The last section on a marketing page: one heading, one line, the primary
 * action again, and the command to run. No new offer and no second action.
 */
const CtaClose = ({ action, className, command, description, title, ...props }: CtaCloseProps) => (
  <section
    className={cn("flex flex-col gap-6 border-t pt-12", className)}
    data-slot="cta-close"
    {...props}
  >
    <div className="flex max-w-xl flex-col gap-2">
      <h2 className="text-balance font-semibold text-2xl tracking-tight sm:text-3xl">{title}</h2>
      {description ? (
        <p className="text-pretty text-muted-foreground leading-relaxed">{description}</p>
      ) : null}
    </div>
    <div className="flex flex-wrap items-center gap-3">{action}</div>
    {command ? <div className="min-w-0 max-w-2xl">{command}</div> : null}
  </section>
);

export { CtaClose };
export type { CtaCloseProps };
