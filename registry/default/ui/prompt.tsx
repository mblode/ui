"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { isValidElement } from "react";
import type { ComponentProps, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";

/**
 * This component is based on the [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog) primitives.
 */
const { Root } = AlertDialogPrimitive;

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

  return <AlertDialogPrimitive.Trigger {...props}>{children}</AlertDialogPrimitive.Trigger>;
};

const Portal = ({ ...props }: AlertDialogPrimitive.Portal.Props) => (
  <AlertDialogPrimitive.Portal {...props} />
);

const Overlay = ({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Backdrop>) => (
  <AlertDialogPrimitive.Backdrop
    className={cn(
      "data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-110 bg-overlay backdrop-blur-[10px] data-closed:animate-out data-open:animate-in data-closed:duration-300 data-open:duration-500 motion-reduce:transition-none",
      className,
    )}
    {...props}
  />
);

const Title = ({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Title>) => (
  <AlertDialogPrimitive.Title className={cn("font-semibold text-lg", className)} {...props} />
);

const Content = ({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Popup>) => (
  <Portal>
    <Overlay />
    <AlertDialogPrimitive.Popup
      className={cn(
        "data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 fixed top-[50%] left-[50%] z-110 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-2xl border bg-background p-4 shadow-lg duration-200 data-closed:animate-out data-open:animate-in md:w-full",
        className,
      )}
      {...props}
    />
  </Portal>
);

const Description = ({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Description>) => (
  <AlertDialogPrimitive.Description className={cn(className)} {...props} />
);

const Action = ({
  className,
  children,
  ...props
}: Omit<ComponentProps<typeof AlertDialogPrimitive.Close>, "render">) => (
  <AlertDialogPrimitive.Close
    className={cn(className)}
    render={<Button variant="destructive">{children}</Button>}
    {...props}
  />
);

const Cancel = ({
  className,
  children,
  ...props
}: Omit<ComponentProps<typeof AlertDialogPrimitive.Close>, "render">) => (
  <AlertDialogPrimitive.Close
    className={cn(className)}
    render={<Button variant="secondary">{children}</Button>}
    {...props}
  />
);

/**
 * This component is based on the `div` element and supports all of its props
 */
const Header = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center", className)} {...props} />
);

/**
 * This component is based on the `div` element and supports all of its props
 */
const Footer = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
    {...props}
  />
);

const Prompt = Object.assign(Root, {
  Action,
  Cancel,
  Content,
  Description,
  Footer,
  Header,
  Title,
  Trigger,
});

export { Prompt };
