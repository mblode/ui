import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";
import { Separator } from "@/registry/default/ui/separator";

const ItemGroup = ({ className, ...props }: React.ComponentProps<"ul">) => (
  <ul
    className={cn("group/item-group flex flex-col", className)}
    data-slot="item-group"
    {...props}
  />
);

const ItemSeparator = ({ className, ...props }: React.ComponentProps<typeof Separator>) => (
  <Separator
    className={cn("my-0", className)}
    data-slot="item-separator"
    orientation="horizontal"
    {...props}
  />
);

const itemVariants = cva(
  "group/item flex flex-wrap items-center rounded-md border border-transparent text-sm outline-none transition-colors duration-100 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-accent/50",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "gap-4 p-4",
        sm: "gap-2.5 px-4 py-3",
      },
      variant: {
        default: "bg-transparent",
        muted: "bg-muted/50",
        outline: "border-border",
      },
    },
  },
);

const Item = ({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemVariants> & { asChild?: boolean }) =>
  useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(itemVariants({ className, size, variant })),
      },
      asChild ? props : { ...props, children },
    ),
    render: asChild ? (children as React.ReactElement) : undefined,
    state: {
      size,
      slot: "item",
      variant,
    },
  });

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 rounded-sm border bg-muted [&_svg:not([class*='size-'])]:size-4",
        image: "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover",
      },
    },
  },
);

const ItemMedia = ({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) => (
  <div
    className={cn(itemMediaVariants({ className, variant }))}
    data-slot="item-media"
    data-variant={variant}
    {...props}
  />
);

const ItemContent = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn("flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none", className)}
    data-slot="item-content"
    {...props}
  />
);

const ItemTitle = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn("flex w-fit items-center gap-2 font-medium text-sm leading-snug", className)}
    data-slot="item-title"
    {...props}
  />
);

const ItemDescription = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p
    className={cn(
      "line-clamp-2 text-balance font-normal text-muted-foreground text-sm leading-normal",
      "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
      className,
    )}
    data-slot="item-description"
    {...props}
  />
);

const ItemActions = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("flex items-center gap-2", className)} data-slot="item-actions" {...props} />
);

const ItemHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn("flex basis-full items-center justify-between gap-2", className)}
    data-slot="item-header"
    {...props}
  />
);

const ItemFooter = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn("flex basis-full items-center justify-between gap-2", className)}
    data-slot="item-footer"
    {...props}
  />
);

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
};
