"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import * as React from "react";

import { cn } from "@/lib/utils";

type PopoverInteractOutsideEvent = Event & {
  preventDefault: () => void;
};

interface PopoverContextType {
  anchor: HTMLElement | null;
  setAnchor: (anchor: HTMLElement | null) => void;
  setOnInteractOutside: (
    handler?: (event: PopoverInteractOutsideEvent) => void
  ) => void;
}

const PopoverContext = React.createContext<PopoverContextType | undefined>(
  undefined
);

const usePopoverContext = () => React.useContext(PopoverContext);

function setRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref && "current" in ref) {
    ref.current = value;
  }
}

function Popover({
  onOpenChange,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const onInteractOutsideRef = React.useRef<
    ((event: PopoverInteractOutsideEvent) => void) | undefined
  >(undefined);

  const handleOpenChange = React.useCallback<
    NonNullable<
      React.ComponentProps<typeof PopoverPrimitive.Root>["onOpenChange"]
    >
  >(
    (open, eventDetails) => {
      if (!open && eventDetails.reason === "outside-press") {
        const interactHandler = onInteractOutsideRef.current;

        if (interactHandler) {
          const wrappedEvent = Object.create(
            eventDetails.event
          ) as PopoverInteractOutsideEvent;
          wrappedEvent.preventDefault = () => eventDetails.cancel();
          interactHandler(wrappedEvent);
        }
      }

      onOpenChange?.(open, eventDetails);
    },
    [onOpenChange]
  );

  return (
    <PopoverContext.Provider
      value={{
        anchor,
        setAnchor,
        setOnInteractOutside: (handler) => {
          onInteractOutsideRef.current = handler;
        },
      }}
    >
      <PopoverPrimitive.Root
        data-slot="popover"
        onOpenChange={handleOpenChange}
        {...props}
      />
    </PopoverContext.Provider>
  );
}

function PopoverTrigger({
  asChild = false,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger> & {
  asChild?: boolean;
}) {
  const render =
    asChild && React.isValidElement(children)
      ? (children as React.ReactElement)
      : undefined;

  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      render={render}
      {...props}
    >
      {asChild ? null : children}
    </PopoverPrimitive.Trigger>
  );
}

type PopoverContentProps = React.ComponentProps<typeof PopoverPrimitive.Popup> &
  Pick<
    React.ComponentProps<typeof PopoverPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    asChild?: boolean;
    onInteractOutside?: (event: PopoverInteractOutsideEvent) => void;
    onOpenAutoFocus?: (event: Event) => void;
  };

function PopoverContent({
  asChild = false,
  children,
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  initialFocus,
  onInteractOutside,
  onOpenAutoFocus,
  ...props
}: PopoverContentProps) {
  const popoverContext = usePopoverContext();

  React.useEffect(() => {
    popoverContext?.setOnInteractOutside(onInteractOutside);

    return () => {
      popoverContext?.setOnInteractOutside(undefined);
    };
  }, [onInteractOutside, popoverContext]);

  React.useEffect(() => {
    if (!onOpenAutoFocus) {
      return;
    }

    const event = new Event("openAutoFocus", { cancelable: true });
    onOpenAutoFocus(event);
  }, [onOpenAutoFocus]);

  const render =
    asChild && React.isValidElement(children)
      ? (children as React.ReactElement)
      : undefined;

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={popoverContext?.anchor}
        className="isolate z-50"
        side={side}
        sideOffset={sideOffset}
      >
        <PopoverPrimitive.Popup
          className={cn(
            "data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-soft outline-hidden data-closed:animate-out data-open:animate-in",
            className
          )}
          data-slot="popover-content"
          initialFocus={onOpenAutoFocus ? false : initialFocus}
          render={render}
          {...props}
        >
          {asChild ? null : children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({
  asChild = false,
  children,
  ref,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  const popoverContext = usePopoverContext();

  const handleRef = React.useCallback(
    (node: HTMLElement | null) => {
      popoverContext?.setAnchor(node);
      setRef(ref as React.Ref<HTMLElement> | undefined, node);
    },
    [popoverContext, ref]
  );

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      ref?: React.Ref<HTMLElement>;
      [key: string]: unknown;
    }>;

    return React.cloneElement(child, {
      ...props,
      ref: (node: HTMLElement | null) => {
        setRef(child.props.ref, node);
        handleRef(node);
      },
    });
  }

  return (
    <div data-slot="popover-anchor" ref={handleRef} {...props}>
      {children}
    </div>
  );
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1 text-sm", className)}
      data-slot="popover-header"
      {...props}
    />
  );
}

function PopoverTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <div
      className={cn("font-medium", className)}
      data-slot="popover-title"
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-muted-foreground", className)}
      data-slot="popover-description"
      {...props}
    />
  );
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
};
