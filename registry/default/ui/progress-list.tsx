import {
  CheckFilledIcon,
  CirclePlaceholderDashedIcon,
  CirclePlaceholderOnIcon,
} from "blode-icons-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

function ProgressList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col space-y-1", className)}
      data-slot="progress-list"
      {...props}
    />
  );
}

type ProgressItemState = "completed" | "current" | "pending";

interface ProgressItemProps extends Omit<React.ComponentProps<"div">, "title"> {
  completed?: boolean;
  state?: ProgressItemState;
  title: React.ReactNode;
}

function ProgressItem({
  className,
  completed,
  state,
  title,
  ...props
}: ProgressItemProps) {
  const resolvedState = state ?? (completed ? "completed" : "pending");

  return (
    <div
      className={cn("flex flex-row items-center space-x-2", className)}
      data-slot="progress-item"
      data-state={resolvedState}
      {...props}
    >
      <div className="shrink-0" data-slot="progress-item-icon">
        {resolvedState === "completed" ? (
          <CheckFilledIcon className="size-4 shrink-0 transition-all" />
        ) : null}
        {resolvedState === "current" ? (
          <CirclePlaceholderDashedIcon className="size-4 shrink-0 animate-spin text-primary transition-all [animation-duration:2s]" />
        ) : null}
        {resolvedState === "pending" ? (
          <CirclePlaceholderOnIcon className="size-4 shrink-0 opacity-55 transition-all" />
        ) : null}
      </div>
      <div
        className={cn("flex-1 text-left text-sm transition-all", {
          "opacity-50": resolvedState === "pending",
          "text-primary opacity-100": resolvedState === "current",
        })}
        data-slot="progress-item-title"
      >
        {title}
      </div>
    </div>
  );
}

export { ProgressList, ProgressItem };
export type { ProgressItemProps, ProgressItemState };
