"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type HTMLAttributes,
  isValidElement,
} from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";

/**
 * This component is based on the [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog) primitives.
 */
const Root = AlertDialogPrimitive.Root;

const Trigger = ({
  asChild,
  children,
  ...props
}: AlertDialogPrimitive.Trigger.Props & {
  asChild?: boolean;
}) => {
  if (asChild && isValidElement(children)) {
    return <AlertDialogPrimitive.Trigger render={children} {...props} />;
  }

  return (
    <AlertDialogPrimitive.Trigger {...props}>
      {children}
    </AlertDialogPrimitive.Trigger>
  );
};
Trigger.displayName = "Prompt.Trigger";

const Portal = ({ ...props }: AlertDialogPrimitive.Portal.Props) => {
  return <AlertDialogPrimitive.Portal {...props} />;
};
Portal.displayName = "Prompt.Portal";

const Overlay = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Backdrop>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Backdrop>
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-110 bg-overlay backdrop-blur-[10px] data-closed:opacity-0 data-open:opacity-100 motion-safe:transition-opacity motion-safe:ease-in-out motion-safe:data-closed:duration-300 motion-safe:data-open:duration-500 motion-reduce:transition-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Overlay.displayName = "Prompt.Overlay";

const Title = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Title
      className={cn("font-semibold text-lg", className)}
      ref={ref}
      {...props}
    />
  );
});
Title.displayName = "Prompt.Title";

const Content = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Popup>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Popup>
>(({ className, ...props }, ref) => {
  return (
    <Portal>
      <Overlay />
      <AlertDialogPrimitive.Popup
        className={cn(
          "data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 fixed top-[50%] left-[50%] z-110 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-2xl border bg-background p-4 shadow-lg duration-200 data-closed:animate-out data-open:animate-in md:w-full",
          className
        )}
        ref={ref}
        {...props}
      />
    </Portal>
  );
});
Content.displayName = "Prompt.Content";

const Description = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Description
      className={cn(className)}
      ref={ref}
      {...props}
    />
  );
});
Description.displayName = "Prompt.Description";

const Action = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Close>,
  Omit<ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Close>, "render">
>(({ className, children, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Close
      className={cn("w-full", className)}
      ref={ref}
      render={
        <Button className="w-full" variant="destructive">
          {children}
        </Button>
      }
      {...props}
    />
  );
});
Action.displayName = "Prompt.Action";

const Cancel = forwardRef<
  ElementRef<typeof AlertDialogPrimitive.Close>,
  Omit<ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Close>, "render">
>(({ className, children, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Close
      className={cn("w-full", className)}
      ref={ref}
      render={
        <Button className="w-full" variant="secondary">
          {children}
        </Button>
      }
      {...props}
    />
  );
});
Cancel.displayName = "Prompt.Cancel";

/**
 * This component is based on the `div` element and supports all of its props
 */
const Header = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("flex flex-col space-y-2 text-center", className)}
      {...props}
    />
  );
};
Header.displayName = "Prompt.Header";

/**
 * This component is based on the `div` element and supports all of its props
 */
const Footer = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("mt-4 flex flex-row justify-between gap-2", className)}
      {...props}
    />
  );
};
Footer.displayName = "Prompt.Footer";

const Prompt = Object.assign(Root, {
  Trigger,
  Content,
  Title,
  Description,
  Action,
  Cancel,
  Header,
  Footer,
});

export { Prompt };
