"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex size-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square size-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    value: string;
    noColor?: boolean;
  }
>(({ className, noColor, value, ...props }, ref) => {
  const colors = [
    "#FA2C37",
    "#FF6900",
    "#FD9A00",
    "#EFB100",
    "#7CCE00",
    "#00C950",
    "#00BC7D",
    "#00BBA7",
    "#00B8DB",
    "#00A6F5",
    "#615FFF",
    "#8D51FF",
    "#AD47FF",
    "#E12BFB",
    "#F7339A",
    "#FF1F57",
  ];

  const colorIndex = value ? value.charCodeAt(0) % colors.length : 0;

  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex size-full items-center justify-center rounded-full text-sm font-semibold uppercase",
        className,
        {
          "bg-gray-50 dark:bg-muted text-muted-foreground border border-border":
            noColor,
          "text-white": !noColor,
        },
      )}
      {...props}
      style={{ backgroundColor: !noColor ? colors[colorIndex] : undefined }}
    >
      {value}
    </AvatarPrimitive.Fallback>
  );
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
