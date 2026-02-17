"use client";

import React, { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Bar<T> = T & {
  key?: string;
  value: number;
  name: string;
  icon?: React.JSXElementConstructor<any>;
  href?: string;
  target?: string;
  color?: string;
};

export interface BarListProps<
  T = any,
> extends React.HTMLAttributes<HTMLDivElement> {
  data: Bar<T>[];
  valueFormatter?: (value: number) => string;
  labelFormatter?: (label: string) => ReactNode;
  color?: string;
  showAnimation?: boolean;
  sortOrder?: "ascending" | "descending";
}

function BarListInner<T>(
  props: BarListProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    data = [],
    color = "hsl(var(--chart-1))",
    valueFormatter = defaultValueFormatter,
    labelFormatter = defaultLabelFormatter,
    showAnimation = false,
    sortOrder = "descending",
    className,
    ...other
  } = props;

  const sortedData = React.useMemo(() => {
    if (sortOrder) {
      return [...data].sort((a, b) => {
        return sortOrder === "ascending"
          ? a.value - b.value
          : b.value - a.value;
      });
    }
    return data;
  }, [data, sortOrder]);

  const widths = React.useMemo(() => {
    const maxValue = Math.max(...sortedData.map((item) => item.value), 0);
    return sortedData.map((item) =>
      item.value === 0 ? 0 : Math.max((item.value / maxValue) * 100, 2),
    );
  }, [sortedData]);

  const rowHeight = "h-8";

  return (
    <div
      ref={ref}
      className={cn("flex justify-between space-x-6", className)}
      aria-sort={sortOrder}
      {...other}
    >
      <div className="relative w-full">
        {sortedData.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key ?? item.name}
              className="group w-full flex items-center py-1"
            >
              <div
                className={cn(
                  "relative flex items-center rounded-sm transition-all",
                  rowHeight,
                  {
                    "mb-0": index === sortedData.length - 1,
                    "duration-500": showAnimation,
                  },
                )}
                style={{
                  width: `${widths[index]}%`,
                  transition: showAnimation ? "all 1s" : "",
                }}
              >
                <div
                  className="inset-0 absolute rounded-sm transition-all opacity-30"
                  style={{
                    background: color,
                  }}
                />
              </div>

              <div className="absolute left-2 pr-4 flex max-w-full">
                {Icon ? (
                  <Icon className="flex-none h-5 w-5 mr-2 text-muted-foreground" />
                ) : null}
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.target ?? "_blank"}
                    rel="noreferrer"
                    className="whitespace-nowrap hover:underline truncate text-sm text-foreground"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {labelFormatter(item.name)}
                  </a>
                ) : (
                  <p className="whitespace-nowrap truncate text-sm text-foreground">
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
            key={item.key ?? item.name}
            className={cn(
              "flex justify-end items-center",
              rowHeight,
              index === 0 ? "mt-1" : "my-2",
            )}
          >
            <p className="whitespace-nowrap leading-none truncate text-sm text-foreground">
              {valueFormatter(item.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

BarListInner.displayName = "BarList";

export const BarList = React.forwardRef(BarListInner) as <T>(
  p: BarListProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => ReturnType<typeof BarListInner>;

function defaultValueFormatter(value: number): string {
  return value.toLocaleString();
}

function defaultLabelFormatter(label: string): string {
  return label;
}
