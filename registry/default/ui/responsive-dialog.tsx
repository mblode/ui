"use client";

import type * as React from "react";
import { createContext, useContext, useState } from "react";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/registry/default/hooks/use-mobile";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/default/ui/drawer";

const ResponsiveDialogContext = createContext<boolean | null>(null);

/**
 * Reads the layout decided by the nearest `ResponsiveDialog`, so every part
 * renders against the same primitive without calling `useIsMobile` again.
 */
const useResponsiveDialogLayout = () => {
  const isMobile = useContext(ResponsiveDialogContext);

  if (isMobile === null) {
    throw new Error("ResponsiveDialog parts must be rendered inside <ResponsiveDialog>.");
  }

  return isMobile;
};

export interface ResponsiveDialogProps {
  /** The dialog parts. */
  children?: React.ReactNode;
  /** Whether the dialog is open on first render, for uncontrolled usage. */
  defaultOpen?: boolean;
  /** Whether the dialog traps focus and locks page scroll while open. */
  modal?: boolean | "trap-focus";
  /** Called when the dialog opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Whether the dialog is open, for controlled usage. */
  open?: boolean;
}

const ResponsiveDialog = ({
  children,
  defaultOpen,
  onOpenChange,
  open,
  ...props
}: ResponsiveDialogProps) => {
  // The layout always tracks the viewport, including while the dialog is open.
  // Crossing 768px unmounts one tree and mounts the other, so focus and any
  // uncontrolled input state inside are lost — see the demo, which lifts its
  // field state above this component. Holding the primitive until close would
  // avoid that, at the cost of rendering a drawer at desktop widths, where
  // every `sm:`/`md:` class a caller wrote for the dialog now applies to the
  // drawer instead. That mismatch is visible on every resize; the state loss
  // is not, and callers can prevent it.
  const isMobile = useIsMobile();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen ?? false);

  const handleOpenChange = (next: boolean) => {
    setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  // The swapped-in root has no memory of the other tree's open state, so an
  // uncontrolled dialog has to be told it is open across the boundary.
  const isOpen = open ?? uncontrolledOpen;
  const Root = isMobile ? Drawer : Dialog;

  return (
    <ResponsiveDialogContext.Provider value={isMobile}>
      <Root onOpenChange={handleOpenChange} open={isOpen} {...props}>
        {children}
      </Root>
    </ResponsiveDialogContext.Provider>
  );
};

export interface ResponsiveDialogTriggerProps extends React.ComponentProps<"button"> {
  /** Render the single child element as the trigger instead of a button. */
  asChild?: boolean;
}

const ResponsiveDialogTrigger = ({ asChild, ...props }: ResponsiveDialogTriggerProps) => {
  const isMobile = useResponsiveDialogLayout();
  const Trigger = isMobile ? DrawerTrigger : DialogTrigger;

  return <Trigger asChild={asChild} data-slot="responsive-dialog-trigger" {...props} />;
};

export interface ResponsiveDialogContentProps extends React.ComponentProps<"div"> {
  /** Show the corner close button. Desktop only — the drawer closes by swipe. */
  showCloseButton?: boolean;
}

const ResponsiveDialogContent = ({
  children,
  className,
  showCloseButton = true,
  ...props
}: ResponsiveDialogContentProps) => {
  const isMobile = useResponsiveDialogLayout();

  // `data-layout` is the styling hook, not a breakpoint. Which primitive is
  // mounted is the thing that varies, and a viewport query only approximates
  // it: `md:` happens to line up with the 768px swap, `sm:` does not, so
  // `sm:max-w-*` written for the dialog also clamps the drawer between 640 and
  // 767px. Style the content root with `data-[layout=dialog]:*` and anything
  // below it with `group-data-[layout=drawer]/responsive-dialog:*`, and the
  // condition is the rendered primitive exactly.
  if (isMobile) {
    return (
      <DrawerContent
        className={cn("group/responsive-dialog", className)}
        data-layout="drawer"
        data-slot="responsive-dialog-content"
        {...props}
      >
        {children}
      </DrawerContent>
    );
  }

  return (
    <DialogContent
      className={cn("group/responsive-dialog", className)}
      data-layout="dialog"
      data-slot="responsive-dialog-content"
      showCloseButton={showCloseButton}
      {...props}
    >
      {children}
    </DialogContent>
  );
};

const ResponsiveDialogHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
  const isMobile = useResponsiveDialogLayout();
  const Header = isMobile ? DrawerHeader : DialogHeader;

  return <Header className={className} data-slot="responsive-dialog-header" {...props} />;
};

const ResponsiveDialogFooter = ({ className, ...props }: React.ComponentProps<"div">) => {
  const isMobile = useResponsiveDialogLayout();

  if (isMobile) {
    return <DrawerFooter className={className} data-slot="responsive-dialog-footer" {...props} />;
  }

  return <DialogFooter className={className} data-slot="responsive-dialog-footer" {...props} />;
};

const ResponsiveDialogTitle = ({ className, ...props }: React.ComponentProps<"h2">) => {
  const isMobile = useResponsiveDialogLayout();

  if (isMobile) {
    return (
      <DrawerTitle
        className={cn("text-lg leading-none", className)}
        data-slot="responsive-dialog-title"
        {...props}
      />
    );
  }

  return <DialogTitle className={className} data-slot="responsive-dialog-title" {...props} />;
};

const ResponsiveDialogDescription = ({ className, ...props }: React.ComponentProps<"p">) => {
  const isMobile = useResponsiveDialogLayout();
  const Description = isMobile ? DrawerDescription : DialogDescription;

  return <Description className={className} data-slot="responsive-dialog-description" {...props} />;
};

export interface ResponsiveDialogCloseProps extends React.ComponentProps<"button"> {
  /** Render the single child element as the close control instead of a button. */
  asChild?: boolean;
}

const ResponsiveDialogClose = ({ asChild, ...props }: ResponsiveDialogCloseProps) => {
  const isMobile = useResponsiveDialogLayout();
  const Close = isMobile ? DrawerClose : DialogClose;

  return <Close asChild={asChild} data-slot="responsive-dialog-close" {...props} />;
};

export {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
};
