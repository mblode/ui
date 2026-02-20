import type * as React from "react";

import { cn } from "@/lib/utils";

interface BarListItemBase {
  color?: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  key?: string;
  name: string;
  target?: React.HTMLAttributeAnchorTarget;
  value: number;
}

interface BarListProps<T extends object = Record<string, never>>
  extends React.ComponentProps<"div"> {
  color?: string;
  data?: Array<T & BarListItemBase>;
  labelFormatter?: (label: string) => React.ReactNode;
  showAnimation?: boolean;
  sortOrder?: "ascending" | "descending";
  valueFormatter?: (value: number) => React.ReactNode;
}

function defaultValueFormatter(value: number): string {
  return value.toLocaleString();
}

function defaultLabelFormatter(label: string): string {
  return label;
}

function BarList<T extends object = Record<string, never>>({
  className,
  color = "hsl(var(--chart-1))",
  data = [],
  labelFormatter = defaultLabelFormatter,
  showAnimation = false,
  sortOrder = "descending",
  valueFormatter = defaultValueFormatter,
  ...props
}: BarListProps<T>) {
  const sortedData = [...data].sort((a, b) =>
    sortOrder === "ascending" ? a.value - b.value : b.value - a.value
  );

  const maxValue = sortedData.reduce(
    (currentMax, item) => Math.max(currentMax, item.value),
    0
  );

  const widths = sortedData.map((item) => {
    if (item.value === 0 || maxValue === 0) {
      return 0;
    }

    return Math.max((item.value / maxValue) * 100, 2);
  });

  const rowHeight = "h-8";

  return (
    <div
      className={cn("flex justify-between space-x-6", className)}
      data-slot="bar-list"
      data-sort={sortOrder}
      {...props}
    >
      <div className="relative w-full">
        {sortedData.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              className="group flex w-full items-center py-1"
              data-slot="bar-list-row"
              key={item.key ?? item.name}
            >
              <div
                className={cn(
                  "relative flex items-center rounded-sm transition-all",
                  rowHeight,
                  {
                    "duration-500": showAnimation,
                    "mb-0": index === sortedData.length - 1,
                  }
                )}
                style={{
                  transition: showAnimation ? "all 1s" : undefined,
                  width: `${widths[index]}%`,
                }}
              >
                <div
                  className="absolute inset-0 rounded-sm opacity-30 transition-all"
                  style={{ background: item.color ?? color }}
                />
              </div>

              <div className="absolute left-2 flex max-w-full pr-4">
                {Icon ? (
                  <Icon className="mr-2 h-5 w-5 flex-none text-muted-foreground" />
                ) : null}

                {item.href ? (
                  <a
                    className="truncate whitespace-nowrap text-foreground text-sm hover:underline"
                    href={item.href}
                    onClick={(event) => event.stopPropagation()}
                    rel="noreferrer"
                    target={item.target ?? "_blank"}
                  >
                    {labelFormatter(item.name)}
                  </a>
                ) : (
                  <p className="truncate whitespace-nowrap text-foreground text-sm">
                    {labelFormatter(item.name)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div>
        {sortedData.map((item, index) => (
          <div
            className={cn(
              "flex items-center justify-end",
              rowHeight,
              index === 0 ? "mt-1" : "my-2"
            )}
            data-slot="bar-list-value"
            key={item.key ?? item.name}
          >
            <p className="truncate whitespace-nowrap text-foreground text-sm leading-none">
              {valueFormatter(item.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { BarList };
export type { BarListProps };
