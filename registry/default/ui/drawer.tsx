"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";
import * as React from "react";

import { cn } from "@/lib/utils";

function Drawer({ ...props }: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({
  asChild,
  children,
  ...props
}: DrawerPrimitive.Trigger.Props & {
  asChild?: boolean;
}) {
  if (asChild && React.isValidElement(children)) {
    return (
      <DrawerPrimitive.Trigger
        data-slot="drawer-trigger"
        render={children}
        {...props}
      />
    );
  }

  return (
    <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props}>
      {children}
    </DrawerPrimitive.Trigger>
  );
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({
  asChild,
  children,
  ...props
}: DrawerPrimitive.Close.Props & {
  asChild?: boolean;
}) {
  if (asChild && React.isValidElement(children)) {
    return (
      <DrawerPrimitive.Close
        data-slot="drawer-close"
        render={children}
        {...props}
      />
    );
  }

  return (
    <DrawerPrimitive.Close data-slot="drawer-close" {...props}>
      {children}
    </DrawerPrimitive.Close>
  );
}

function DrawerBackdrop({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      className={cn(
        "data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-overlay backdrop-blur-[10px] data-closed:animate-out data-open:animate-in data-closed:duration-300 data-open:duration-500 motion-reduce:transition-none",
        className
      )}
      data-slot="drawer-overlay"
      {...props}
    />
  );
}

const DrawerOverlay = DrawerBackdrop;

function DrawerViewport({
  className,
  ...props
}: DrawerPrimitive.Viewport.Props) {
  return (
    <DrawerPrimitive.Viewport
      className={cn("fixed inset-0 z-50 outline-none", className)}
      data-slot="drawer-viewport"
      {...props}
    />
  );
}

function DrawerPopup({ className, ...props }: DrawerPrimitive.Popup.Props) {
  return (
    <DrawerPrimitive.Popup
      className={cn(
        "group/drawer-content fixed z-50 flex h-auto flex-col bg-background shadow-lg transition ease-in-out data-closed:animate-out data-open:animate-in data-closed:duration-300 data-open:duration-500",
        "data-[swipe-direction=up]:data-closed:slide-out-to-top data-[swipe-direction=up]:data-open:slide-in-from-top data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:mb-24 data-[swipe-direction=up]:max-h-[80vh] data-[swipe-direction=up]:rounded-b-lg data-[swipe-direction=up]:border-b",
        "data-[swipe-direction=down]:data-closed:slide-out-to-bottom data-[swipe-direction=down]:data-open:slide-in-from-bottom data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:mt-24 data-[swipe-direction=down]:max-h-[80vh] data-[swipe-direction=down]:rounded-t-lg data-[swipe-direction=down]:border-t",
        "data-[swipe-direction=left]:data-closed:slide-out-to-right data-[swipe-direction=left]:data-open:slide-in-from-right data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:right-0 data-[swipe-direction=left]:w-3/4 data-[swipe-direction=left]:border-l data-[swipe-direction=left]:sm:max-w-sm",
        "data-[swipe-direction=right]:data-closed:slide-out-to-left data-[swipe-direction=right]:data-open:slide-in-from-left data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:left-0 data-[swipe-direction=right]:w-3/4 data-[swipe-direction=right]:border-r data-[swipe-direction=right]:sm:max-w-sm",
        className
      )}
      data-slot="drawer-popup"
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}: DrawerPrimitive.Popup.Props) {
  return (
    <DrawerPortal>
      <DrawerBackdrop />
      <DrawerViewport>
        <DrawerPopup className={className} {...props}>
          <DrawerPrimitive.Content
            className="flex h-full flex-col outline-none"
            data-slot="drawer-content"
          >
            {children}
          </DrawerPrimitive.Content>
        </DrawerPopup>
      </DrawerViewport>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[swipe-direction=down]/drawer-content:text-center group-data-[swipe-direction=up]/drawer-content:text-center md:gap-1.5 md:text-left",
        className
      )}
      data-slot="drawer-header"
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      data-slot="drawer-footer"
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      className={cn("font-semibold text-foreground", className)}
      data-slot="drawer-title"
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      data-slot="drawer-description"
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerBackdrop,
  DrawerPortal,
  DrawerPopup,
  DrawerOverlay,
  DrawerTrigger,
  DrawerViewport,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
