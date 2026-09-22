import type * as React from "react";

import { cn } from "@/lib/utils";

interface ProofStat {
  /** Optional source link, so a reader can check the number. */
  href?: string;
  label: string;
  /** A live number, or `null` when it could not be fetched. Nulls are hidden. */
  value: number | null;
}

interface ProofStatsProps extends React.ComponentProps<"dl"> {
  /** Formats each value. Defaults to a grouped integer in the reader's locale. */
  format?: (value: number) => string;
  stats: ProofStat[];
}

const numberFormat = new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 });
const defaultFormat = (value: number) => numberFormat.format(value);

const gridClassName = "grid grid-cols-2 gap-x-8 gap-y-6 sm:flex sm:flex-wrap sm:gap-x-16";

/**
 * A strip of live numbers: stars, downloads, counts. Proof only works when it
 * is true, so a stat whose value is `null` is dropped, and the whole strip
 * renders nothing when every value is missing. Never pass a placeholder number.
 *
 * Figures use `tabular-figures`, so a count that changes on revalidation does
 * not shift its neighbours.
 */
const ProofStats = ({ className, format = defaultFormat, stats, ...props }: ProofStatsProps) => {
  const visible = stats.filter(
    (stat): stat is ProofStat & { value: number } => stat.value !== null,
  );

  if (visible.length === 0) {
    return null;
  }

  return (
    <dl className={cn(gridClassName, className)} data-slot="proof-stats" {...props}>
      {visible.map((stat) => (
        <div className="flex flex-col gap-1" key={stat.label}>
          <dt className="text-muted-foreground text-sm">{stat.label}</dt>
          <dd className="order-first font-medium text-3xl text-foreground tracking-tight">
            {stat.href ? (
              <a
                className="tabular-figures rounded-sm outline-none underline-offset-4 transition-[color,text-decoration-color] hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50"
                href={stat.href}
              >
                {format(stat.value)}
              </a>
            ) : (
              <span className="tabular-figures">{format(stat.value)}</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
};

/** A placeholder of the same footprint, for a `Suspense` fallback while stats load. */
const ProofStatsSkeleton = ({
  className,
  count = 2,
  ...props
}: React.ComponentProps<"output"> & { count?: number }) => (
  <output
    aria-busy="true"
    aria-label="Loading stats"
    className={cn(gridClassName, className)}
    data-slot="proof-stats-skeleton"
    {...props}
  >
    {Array.from({ length: count }, (_, index) => (
      // Identical placeholders that never reorder.
      // oxlint-disable-next-line react/no-array-index-key
      <span className="flex flex-col gap-2" key={index}>
        <span className="block h-9 w-20 animate-pulse rounded-md bg-muted" />
        <span className="block h-4 w-24 animate-pulse rounded-md bg-muted" />
      </span>
    ))}
  </output>
);

export { ProofStats, ProofStatsSkeleton };
export type { ProofStat, ProofStatsProps };
