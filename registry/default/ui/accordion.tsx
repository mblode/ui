"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  type Transition,
} from "motion/react";
import {
  type ComponentProps,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

interface AccordionItemContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AccordionItemContext = createContext<
  AccordionItemContextType | undefined
>(undefined);

const useAccordionItem = (): AccordionItemContextType => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error("useAccordionItem must be used within an AccordionItem");
  }
  return context;
};

type AccordionValue = string | string[];

type AccordionProps = Omit<
  ComponentProps<typeof AccordionPrimitive.Root>,
  "defaultValue" | "multiple" | "onValueChange" | "value"
> & {
  type?: "single" | "multiple";
  collapsible?: boolean;
  value?: AccordionValue;
  defaultValue?: AccordionValue;
  onValueChange?: (value: AccordionValue) => void;
};

const normalizeAccordionValue = (
  value: AccordionValue | undefined
): string[] | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value;
  }

  return value === "" ? [] : [value];
};

function Accordion({
  type = "single",
  collapsible = false,
  value,
  defaultValue,
  onValueChange,
  ...props
}: AccordionProps) {
  const multiple = type === "multiple";

  const handleValueChange = useCallback(
    (nextValue: (unknown | null)[]) => {
      if (!onValueChange) {
        return;
      }

      const nextStringValues = nextValue.filter(
        (item): item is string => typeof item === "string"
      );

      if (multiple) {
        onValueChange(nextStringValues);
        return;
      }

      const firstValue = nextStringValues[0];
      if (firstValue !== undefined) {
        onValueChange(firstValue);
        return;
      }

      if (collapsible) {
        onValueChange("");
      }
    },
    [collapsible, multiple, onValueChange]
  );

  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      defaultValue={normalizeAccordionValue(defaultValue)}
      multiple={multiple}
      onValueChange={onValueChange ? handleValueChange : undefined}
      value={normalizeAccordionValue(value)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionItemContext.Provider value={{ isOpen, setIsOpen }}>
      <AccordionPrimitive.Item
        className={cn("border-b last:border-b-0", className)}
        data-slot="accordion-item"
        {...props}
      >
        {children}
      </AccordionPrimitive.Item>
    </AccordionItemContext.Provider>
  );
}

type AccordionTriggerProps = ComponentProps<
  typeof AccordionPrimitive.Trigger
> & {
  chevron?: boolean;
  transition?: Transition;
};

function AccordionTrigger({
  ref,
  className,
  children,
  chevron = true,
  transition = { type: "spring", stiffness: 150, damping: 22 },
  ...props
}: AccordionTriggerProps) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  useImperativeHandle(ref, () => triggerRef.current as HTMLButtonElement);
  const { isOpen, setIsOpen } = useAccordionItem();

  useEffect(() => {
    const node = triggerRef.current;
    if (!node) {
      return;
    }

    const updateState = () => {
      const isExpanded =
        node.hasAttribute("data-panel-open") ||
        node.getAttribute("aria-expanded") === "true";
      setIsOpen(isExpanded);
    };

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.attributeName === "data-panel-open" ||
          mutation.attributeName === "aria-expanded"
        ) {
          updateState();
        }
      }
    });

    observer.observe(node, {
      attributes: true,
      attributeFilter: ["data-panel-open", "aria-expanded"],
    });

    updateState();

    return () => {
      observer.disconnect();
    };
  }, [setIsOpen]);

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        data-slot="accordion-trigger"
        ref={triggerRef}
        {...props}
      >
        {children}
        {chevron ? (
          <div className="relative flex h-4 w-4 shrink-0 items-center justify-center">
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              className="pointer-events-none absolute h-0.5 w-4 rounded-full bg-foreground"
              transition={transition}
            />
            <motion.div
              animate={{ rotateZ: isOpen ? 80 : 0, scale: isOpen ? 0 : 1 }}
              className="pointer-events-none absolute h-4 w-0.5 rounded-full bg-foreground"
              style={{ transformOrigin: "center" }}
              transition={transition}
            />
          </div>
        ) : null}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

type AccordionContentProps = ComponentProps<typeof AccordionPrimitive.Panel> &
  HTMLMotionProps<"div"> & {
    transition?: Transition;
  };

function AccordionContent({
  className,
  children,
  transition = { type: "spring", stiffness: 150, damping: 22 },
  ...props
}: AccordionContentProps) {
  const { isOpen } = useAccordionItem();

  return (
    <AccordionPrimitive.Panel keepMounted {...props}>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            animate={{ "--mask-stop": "100%", height: "auto", opacity: 1 }}
            className="overflow-hidden"
            data-slot="accordion-content"
            exit={{ "--mask-stop": "0%", height: 0, opacity: 0 }}
            initial={{ "--mask-stop": "0%", height: 0, opacity: 0 }}
            key="accordion-content"
            style={{
              WebkitMaskImage:
                "linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
              maskImage:
                "linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
            }}
            transition={transition}
          >
            <div className={cn("pt-0 pb-4 text-sm leading-[1.5]", className)}>
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
