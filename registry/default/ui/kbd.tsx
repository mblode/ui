import {
  ArrowCornerDownLeftIcon,
  ArrowDownIcon,
  ArrowLeftXIcon,
  ArrowUpIcon,
  ArrowWall2RightIcon,
  CmdIcon,
  ShiftIcon,
} from "@fingertip/icons";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

type KbdIcon =
  | "mod"
  | "shift"
  | "enter"
  | "command"
  | "ctrl"
  | "alt"
  | "tab"
  | "backspace"
  | "up"
  | "down";

const kbdVariants = cva(
  "pointer-events-none h-5 select-none justify-center items-center gap-0.5 px-1.5 rounded-sm ring-1 ring-inset flex font-mono text-[10px] font-medium",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground ring-border",
        tooltip: "bg-gray-700 text-white ring-gray-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface KbdProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof kbdVariants> {
  children?: React.ReactNode;
  icon?: KbdIcon;
}

const iconMap: Record<KbdIcon, React.ReactNode> = {
  mod: <CmdIcon className="size-3" />,
  shift: <ShiftIcon className="size-3" />,
  enter: <ArrowCornerDownLeftIcon className="size-3" />,
  command: <CmdIcon className="size-3" />,
  ctrl: "Ctrl",
  alt: "Alt",
  tab: <ArrowWall2RightIcon className="size-3" />,
  backspace: <ArrowLeftXIcon className="size-3" />,
  up: <ArrowUpIcon className="size-3" />,
  down: <ArrowDownIcon className="size-3" />,
};

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, variant, children, icon, ...props }, ref) => {
    const content = icon ? iconMap[icon] : children;

    return (
      <kbd
        ref={ref}
        className={cn(kbdVariants({ variant, className }))}
        {...props}
      >
        {content}
      </kbd>
    );
  },
);
Kbd.displayName = "Kbd";

export { Kbd };
