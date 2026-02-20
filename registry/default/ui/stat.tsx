import type * as React from "react";

import { cn } from "@/lib/utils";

interface StatProps extends Omit<React.ComponentProps<"dl">, "title"> {
  description?: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode;
}

function Stat({ className, description, title, value, ...props }: StatProps) {
  return (
    <dl
      className={cn(
        "flex flex-col rounded-3xl border border-border bg-card p-4 text-center",
        className
      )}
      data-slot="stat"
      {...props}
    >
      <dd
        className="font-semibold text-2xl tracking-tight"
        data-slot="stat-value"
      >
        {value}
      </dd>
      <dt className="truncate font-medium text-sm" data-slot="stat-title">
        {title}
      </dt>
      {description ? (
        <div
          className="text-muted-foreground text-sm"
          data-slot="stat-description"
        >
          {description}
        </div>
      ) : null}
    </dl>
  );
}

export { Stat };
export type { StatProps };
