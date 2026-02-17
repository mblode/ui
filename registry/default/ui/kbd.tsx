import {
  ArrowCornerDownLeftIcon,
  ArrowDownIcon,
  ArrowLeftXIcon,
  ArrowUpIcon,
  ArrowWall2RightIcon,
  CmdIcon,
  ControlIcon,
  OptIcon,
  ShiftIcon,
} from "blode-icons-react";
import { cva, type VariantProps } from "class-variance-authority";
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
  "pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm px-1.5 font-medium font-sans text-xs ring-1 ring-inset [&_svg:not([class*='size-'])]:size-3",
  {
    variants: {
      variant: {
        default:
          "bg-muted text-muted-foreground ring-border [[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background [[data-slot=tooltip-content]_&]:ring-background/20 dark:[[data-slot=tooltip-content]_&]:bg-background/10 dark:[[data-slot=tooltip-content]_&]:ring-background/10",
        tooltip:
          "bg-background/20 text-background ring-background/20 dark:bg-background/10 dark:ring-background/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface KbdProps
  extends React.ComponentPropsWithoutRef<"kbd">,
    VariantProps<typeof kbdVariants> {
  icon?: KbdIcon;
}

const iconMap: Record<KbdIcon, React.ReactNode> = {
  mod: <CmdIcon className="size-3" />,
  shift: <ShiftIcon className="size-3" />,
  enter: <ArrowCornerDownLeftIcon className="size-3" />,
  command: <CmdIcon className="size-3" />,
  ctrl: <ControlIcon className="size-3" />,
  alt: <OptIcon className="size-3" />,
  tab: <ArrowWall2RightIcon className="size-3" />,
  backspace: <ArrowLeftXIcon className="size-3" />,
  up: <ArrowUpIcon className="size-3" />,
  down: <ArrowDownIcon className="size-3" />,
};

const Kbd = React.forwardRef<React.ElementRef<"kbd">, KbdProps>(
  ({ className, variant, children, icon, ...props }, ref) => {
    const content = icon ? iconMap[icon] : children;

    return (
      <kbd
        className={cn(kbdVariants({ variant }), className)}
        data-slot="kbd"
        ref={ref}
        {...props}
      >
        {content}
      </kbd>
    );
  }
);
Kbd.displayName = "Kbd";

const KbdGroup = React.forwardRef<
  React.ElementRef<"kbd">,
  React.ComponentPropsWithoutRef<"kbd">
>(({ className, ...props }, ref) => {
  return (
    <kbd
      className={cn("inline-flex items-center gap-1", className)}
      data-slot="kbd-group"
      ref={ref}
      {...props}
    />
  );
});
KbdGroup.displayName = "KbdGroup";

export { Kbd, KbdGroup };
