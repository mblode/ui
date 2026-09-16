"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { CheckIcon, ChevronDownIcon, CrossSmallIcon, XIcon } from "blode-icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/default/ui/input-group";

const Combobox = ComboboxPrimitive.Root;

const ComboboxValue = ({ ...props }: ComboboxPrimitive.Value.Props) => (
  <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
);

const ComboboxTrigger = ({
  className,
  children,
  render,
  ...props
}: ComboboxPrimitive.Trigger.Props) => (
  <ComboboxPrimitive.Trigger
    className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
    data-slot="combobox-trigger"
    render={
      render ?? <InputGroupButton data-slot="input-group-button" size="icon-xs" variant="ghost" />
    }
    {...props}
  >
    {children ?? <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />}
  </ComboboxPrimitive.Trigger>
);

const ComboboxClear = ({ className, ...props }: ComboboxPrimitive.Clear.Props) => (
  <ComboboxPrimitive.Clear
    className={cn(className)}
    data-slot="combobox-clear"
    render={<InputGroupButton size="icon-xs" variant="ghost" />}
    {...props}
  >
    <XIcon className="pointer-events-none" />
  </ComboboxPrimitive.Clear>
);

const ComboboxInput = ({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
}) => (
  <ComboboxPrimitive.InputGroup
    render={
      <InputGroup
        className={cn("h-[var(--field-height)] w-auto rounded-[var(--field-radius)]", className)}
      />
    }
  >
    <ComboboxPrimitive.Input render={<InputGroupInput disabled={disabled} />} {...props} />
    <InputGroupAddon align="inline-end">
      {showTrigger && (
        <ComboboxTrigger
          className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
          disabled={disabled}
        />
      )}
      {showClear && <ComboboxClear disabled={disabled} />}
    </InputGroupAddon>
    {children}
  </ComboboxPrimitive.InputGroup>
);

const ComboboxContent = ({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) => (
  <ComboboxPrimitive.Portal>
    <ComboboxPrimitive.Positioner
      align={align}
      alignOffset={alignOffset}
      anchor={anchor}
      className="isolate z-50"
      side={side}
      sideOffset={sideOffset}
    >
      <ComboboxPrimitive.Popup
        className={cn(
          "data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 cn-menu-target group/combobox-content relative flex max-h-(--available-height) w-(--anchor-width) min-w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) flex-col overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-soft ring-1 ring-foreground/10 data-closed:animate-out data-open:animate-in data-closed:duration-75 data-open:duration-100 data-closed:ease-in data-open:ease-out *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none",
          className,
        )}
        data-slot="combobox-content"
        {...props}
      />
    </ComboboxPrimitive.Positioner>
  </ComboboxPrimitive.Portal>
);

interface ComboboxHighlightRect {
  height: number;
  left: number;
  top: number;
  width: number;
}

interface ComboboxHighlightState {
  /** The last row the highlight was told about; kept while it fades out. */
  rect: ComboboxHighlightRect | null;
  /** False makes the next move a jump rather than a slide. */
  travels: boolean;
  visible: boolean;
}

const HIGHLIGHT_HIDDEN: ComboboxHighlightState = {
  rect: null,
  travels: false,
  visible: false,
};

/**
 * Offsets, not client rects: the list is the items' `offsetParent`, so these
 * are already scroll-inclusive and the highlight rides the scroll without a
 * scroll listener.
 */
const sameHighlightRect = (a: ComboboxHighlightRect, b: ComboboxHighlightRect) =>
  a.height === b.height && a.left === b.left && a.top === b.top && a.width === b.width;

const readHighlightRect = (list: HTMLElement): ComboboxHighlightRect | null => {
  const item = list.querySelector<HTMLElement>('[data-slot="combobox-item"][data-highlighted]');
  if (!item) {
    return null;
  }
  return {
    height: item.offsetHeight,
    left: item.offsetLeft,
    top: item.offsetTop,
    width: item.offsetWidth,
  };
};

/**
 * One bar that slides between rows, rather than a background that blinks off
 * and on in every gap. Base UI writes `data-highlighted` for the pointer and
 * the arrow keys alike, so a single observer drives both.
 *
 * The travel is a transform on one element, so a move costs no layout. Rows
 * appearing or disappearing under a filter make the bar jump instead of slide,
 * because sliding to a row that just moved reads as a glitch. The global
 * reduced-motion stylesheet overrides the inline duration with `!important`.
 *
 * The resize observer is not optional: on open the popup paints at its content
 * width for a frame before `--anchor-width` lands, and a bar measured in that
 * frame would keep the narrow width forever, since widening the row mutates
 * neither `data-highlighted` nor the child list.
 */
const ComboboxList = ({ className, ...props }: ComboboxPrimitive.List.Props) => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = React.useState(HIGHLIGHT_HIDDEN);

  React.useEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }
    const sync = (jump: boolean) => {
      const rect = readHighlightRect(list);
      setHighlight((previous) => {
        if (!rect) {
          return previous.visible ? { ...previous, travels: false, visible: false } : previous;
        }
        if (previous.visible && previous.rect && sameHighlightRect(previous.rect, rect)) {
          return previous;
        }
        return { rect, travels: !jump && previous.visible, visible: true };
      });
    };
    sync(true);
    const observer = new MutationObserver((records) => {
      sync(records.some((record) => record.type === "childList"));
    });
    observer.observe(list, {
      attributeFilter: ["data-highlighted"],
      attributes: true,
      childList: true,
      subtree: true,
    });
    const resizeObserver = new ResizeObserver(() => sync(true));
    resizeObserver.observe(list);
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  const { rect, travels, visible } = highlight;

  return (
    <ComboboxPrimitive.List
      className={cn(
        "scroll-fade relative max-h-72 min-h-0 flex-auto scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0",
        className,
      )}
      data-slot="combobox-list"
      ref={listRef}
      render={({ children, ...listProps }) => (
        <div {...listProps}>
          {rect && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 ease-out will-change-transform"
              data-slot="combobox-highlight"
              style={{
                height: rect.height,
                transform: `translate3d(${rect.left}px, ${rect.top}px, 0)`,
                transitionDuration: travels ? "80ms" : "0ms",
                transitionProperty: "transform, width, height",
                width: rect.width,
              }}
            >
              <div
                className={cn(
                  "size-full rounded-md bg-accent transition-opacity duration-100 ease-out",
                  visible ? "opacity-100" : "opacity-0",
                )}
              />
            </div>
          )}
          {children}
        </div>
      )}
      {...props}
    />
  );
};

const ComboboxItem = ({ className, children, ...props }: ComboboxPrimitive.Item.Props) => (
  <ComboboxPrimitive.Item
    className={cn(
      "relative flex w-full cursor-default select-none items-center gap-2 rounded-md py-1.5 pr-8 pl-2 text-sm outline-hidden data-disabled:pointer-events-none data-highlighted:text-accent-foreground data-disabled:opacity-50 not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      className,
    )}
    data-slot="combobox-item"
    {...props}
  >
    {children}
    <ComboboxPrimitive.ItemIndicator
      render={
        <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center transition-[opacity,transform] duration-100 ease-out data-ending-style:scale-75 data-starting-style:scale-75 data-ending-style:opacity-0 data-starting-style:opacity-0" />
      }
    >
      <CheckIcon className="pointer-events-none" />
    </ComboboxPrimitive.ItemIndicator>
  </ComboboxPrimitive.Item>
);

const ComboboxGroup = ({ className, ...props }: ComboboxPrimitive.Group.Props) => (
  <ComboboxPrimitive.Group className={cn(className)} data-slot="combobox-group" {...props} />
);

const ComboboxLabel = ({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) => (
  <ComboboxPrimitive.GroupLabel
    className={cn("px-2 py-1.5 text-muted-foreground text-xs", className)}
    data-slot="combobox-label"
    {...props}
  />
);

const ComboboxCollection = ({ ...props }: ComboboxPrimitive.Collection.Props) => (
  <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
);

const ComboboxEmpty = ({ className, ...props }: ComboboxPrimitive.Empty.Props) => (
  <ComboboxPrimitive.Empty
    className={cn("px-3 text-center text-muted-foreground text-sm [&:not(:empty)]:py-6", className)}
    data-slot="combobox-empty"
    {...props}
  />
);

const ComboboxSeparator = ({ className, ...props }: ComboboxPrimitive.Separator.Props) => (
  <ComboboxPrimitive.Separator
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    data-slot="combobox-separator"
    {...props}
  />
);

const ComboboxChipsInput = ({ className, ...props }: ComboboxPrimitive.Input.Props) => (
  <ComboboxPrimitive.Input
    className={cn("min-w-16 flex-1 outline-none", className)}
    data-slot="combobox-chip-input"
    {...props}
  />
);

/**
 * The fast tier of the motion scale `ask-user-questions` already keeps: a chip
 * is a small thing, so it moves quickly, and it leaves a step quicker than it
 * arrives, so a removal reads as final rather than as the entrance in reverse.
 */
const CHIP_SPRING = { bounce: 0, duration: 0.08, type: "spring" as const };
const CHIP_EXIT = { duration: 0.06 };
const NO_MOTION = { duration: 0 };

type ComboboxChipsProps<Value> = Omit<ComboboxPrimitive.Chips.Props, "children"> & {
  /**
   * Renders one keyed `ComboboxChip` per selected value. The array, not a
   * fragment: `AnimatePresence` only tracks children it can see.
   */
  children: (value: Value) => React.ReactElement[];
  placeholder?: string;
};

/**
 * The chips and the input are rendered here rather than by the consumer for
 * two reasons: an exit animation needs `AnimatePresence` to be the chips'
 * direct parent, and the placeholder has to know whether anything is selected.
 *
 * `mode="popLayout"` lifts a leaving chip out of the flow at once, so the row
 * closes the gap while it fades instead of after it, and `layout` on each
 * wrapper slides the survivors into their new slots. The motion wrapper sits
 * outside `ComboboxChip` so that the elements `AnimatePresence` measures are
 * motion components it can take a ref to.
 *
 * The horizontal padding stays `--field-padding-x` in both states. Tightening
 * it once a chip exists moves the row's leading edge, so the placeholder and
 * the first chip start at different offsets and the field shifts under the
 * cursor as the last chip goes.
 */
const ComboboxChips = <Value,>({
  className,
  children,
  placeholder,
  ...props
}: ComboboxChipsProps<Value>) => {
  const reduceMotion = useReducedMotion();

  return (
    <ComboboxPrimitive.InputGroup
      className={cn(
        "flex min-h-[var(--field-height)] cursor-text flex-wrap items-center gap-1 rounded-[var(--field-radius)] border border-input bg-transparent bg-clip-padding px-[var(--field-padding-x)] py-1 text-sm transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40",
        className,
      )}
    >
      <ComboboxPrimitive.Chips
        className="relative flex w-full flex-wrap items-center gap-1"
        data-slot="combobox-chips"
        {...props}
      >
        <ComboboxPrimitive.Value>
          {(value: Value) => (
            <>
              <AnimatePresence initial={false} mode="popLayout">
                {children(value).map((chip) => (
                  <motion.span
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex max-w-full shrink-0"
                    exit={{
                      opacity: 0,
                      pointerEvents: "none",
                      scale: 0.9,
                      transition: reduceMotion ? NO_MOTION : CHIP_EXIT,
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    key={chip.key}
                    layout={!reduceMotion}
                    transition={reduceMotion ? NO_MOTION : CHIP_SPRING}
                  >
                    {chip}
                  </motion.span>
                ))}
              </AnimatePresence>
              <ComboboxChipsInput
                placeholder={Array.isArray(value) && value.length > 0 ? undefined : placeholder}
              />
            </>
          )}
        </ComboboxPrimitive.Value>
      </ComboboxPrimitive.Chips>
    </ComboboxPrimitive.InputGroup>
  );
};

/**
 * The chip carries no animation of its own: `ComboboxChips` wraps each one in
 * the motion element that enters, leaves, and slides between slots.
 */
const ComboboxChip = ({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
}) => (
  <ComboboxPrimitive.Chip
    className={cn(
      "flex h-6 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-sm bg-muted px-1.5 font-medium text-foreground text-xs has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-data-[slot=combobox-chip-remove]:pr-0.5 has-disabled:opacity-50",
      className,
    )}
    data-slot="combobox-chip"
    {...props}
  >
    {children}
    {showRemove && (
      <ComboboxPrimitive.ChipRemove
        className="-ml-1 opacity-50 hover:opacity-100"
        data-slot="combobox-chip-remove"
        /* `icon-xs` is a 32px button, which overhangs a 24px chip on every
           side; the override keeps the hover wash inside it. */
        render={<Button className="size-5 rounded-sm" size="icon-xs" variant="ghost" />}
      >
        <CrossSmallIcon className="pointer-events-none" />
      </ComboboxPrimitive.ChipRemove>
    )}
  </ComboboxPrimitive.Chip>
);

const useComboboxAnchor = () => React.useRef<HTMLDivElement | null>(null);

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
};
