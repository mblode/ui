"use client";

import { CheckIcon } from "blode-icons-react";
import { cva } from "class-variance-authority";
import { Children, createContext, isValidElement, useContext } from "react";
import type * as React from "react";

import { cn } from "@/lib/utils";

type StepperOrientation = "horizontal" | "vertical";

// Same vocabulary as `ProgressItemState` in progress-list.tsx, exposed on the same
// `data-state` attribute, so a consumer styles both components with one selector.
type StepState = "completed" | "current" | "pending";

interface StepperContextValue {
  count: number;
  orientation: StepperOrientation;
  value: number;
}

const StepperContext = createContext<StepperContextValue | null>(null);

// A step carries only its position. Everything else about it — completed or not, last or
// not — follows from the root, so there is no second context object to keep in sync.
const StepIndexContext = createContext<number | null>(null);

const resolveState = (index: number, value: number): StepState => {
  if (index < value) {
    return "completed";
  }
  return index === value ? "current" : "pending";
};

const useStepper = (): StepperContextValue => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("Stepper parts must be used within a <Stepper>");
  }
  return context;
};

const useStep = () => {
  const { count, value } = useStepper();
  const index = useContext(StepIndexContext);

  if (index === null) {
    throw new Error("Step parts must be used within a <Step>");
  }

  return { index, isLast: index === count - 1, state: resolveState(index, value) };
};

const stateDescriptions: Record<StepState, string> = {
  completed: "completed",
  current: "current step",
  pending: "not started",
};

export interface StepperProps extends Omit<React.ComponentProps<"ol">, "children"> {
  /** The steps of the flow — one `<Step>` per step */
  children: React.ReactNode;
  /** Layout direction (default: "horizontal") */
  orientation?: StepperOrientation;
  /** Zero-based index of the active step. Steps before it are completed */
  value: number;
}

const Stepper = ({
  children,
  className,
  orientation = "horizontal",
  value,
  ...props
}: StepperProps) => {
  // oxlint-disable-next-line react/no-react-children -- index assignment only; children are never cloned or mutated
  const items = Children.toArray(children);

  return (
    // oxlint-disable-next-line react/jsx-no-constructed-context-values -- the React Compiler memoises this; a manual useMemo here trips PreserveManualMemo instead
    <StepperContext.Provider value={{ count: items.length, orientation, value }}>
      <ol
        className={cn(
          "flex w-full",
          orientation === "horizontal" ? "items-start gap-4" : "flex-col",
          className,
        )}
        data-orientation={orientation}
        data-slot="stepper"
        {...props}
      >
        {items.map((child, index) => (
          <StepIndexContext.Provider
            key={isValidElement(child) && child.key !== null ? child.key : index}
            value={index}
          >
            {child}
          </StepIndexContext.Provider>
        ))}
      </ol>
    </StepperContext.Provider>
  );
};

export interface StepProps extends React.ComponentProps<"li"> {
  /** Position of this step, when it is not a direct child of `<Stepper>` */
  index?: number;
}

const Step = ({ children, className, index: indexProp, ...props }: StepProps) => {
  const { count, orientation, value } = useStepper();
  const positionalIndex = useContext(StepIndexContext);
  const index = indexProp ?? positionalIndex ?? 0;
  const state = resolveState(index, value);

  return (
    <StepIndexContext.Provider value={index}>
      <li
        aria-current={state === "current" ? "step" : undefined}
        className={cn(
          // A bare <StepLabel> sits next to the 32px indicator, so it carries the 6px
          // offset that optically centres its 20px line on the circle. Inside
          // <StepContent> that offset is the container's padding instead.
          "group/step flex [&>[data-slot=step-label]]:mt-1.5",
          orientation === "horizontal"
            ? "min-w-0 flex-1 items-start gap-2 last:flex-none"
            : "relative gap-3 pb-6 last:pb-0",
          className,
        )}
        data-slot="step"
        data-state={state}
        {...props}
      >
        <span className="sr-only">
          Step {index + 1} of {count}, {stateDescriptions[state]}.
        </span>
        {children}
      </li>
    </StepIndexContext.Provider>
  );
};

const stepIndicatorVariants = cva(
  "flex size-8 shrink-0 items-center justify-center rounded-full border font-medium text-sm tabular-figures transition-[background-color,border-color,box-shadow,color] duration-150 ease-out [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  {
    defaultVariants: {
      state: "pending",
    },
    variants: {
      state: {
        completed: "border-primary bg-primary text-primary-foreground",
        current: "border-primary bg-background text-foreground ring-2 ring-primary/25",
        pending: "border-border bg-background text-muted-foreground",
      },
    },
  },
);

const StepIndicator = ({ children, className, ...props }: React.ComponentProps<"span">) => {
  const { index, state } = useStep();

  let content: React.ReactNode = <CheckIcon aria-hidden="true" />;
  if (children) {
    content = children;
  } else if (state !== "completed") {
    content = index + 1;
  }

  return (
    <span
      aria-hidden="true"
      className={cn(stepIndicatorVariants({ className, state }))}
      data-slot="step-indicator"
      {...props}
    >
      {content}
    </span>
  );
};

const StepContent = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    className={cn("flex min-w-0 flex-col gap-0.5 pt-1.5", className)}
    data-slot="step-content"
    {...props}
  />
);

const stepLabelVariants = cva("font-medium text-sm", {
  defaultVariants: {
    state: "pending",
  },
  variants: {
    state: {
      completed: "text-foreground",
      current: "text-foreground",
      pending: "text-muted-foreground",
    },
  },
});

const StepLabel = ({ className, ...props }: React.ComponentProps<"span">) => {
  const { state } = useStep();

  return (
    <span
      className={cn(stepLabelVariants({ className, state }))}
      data-slot="step-label"
      {...props}
    />
  );
};

const StepDescription = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    className={cn("text-muted-foreground text-xs", className)}
    data-slot="step-description"
    {...props}
  />
);

const StepSeparator = ({ className, ...props }: React.ComponentProps<"span">) => {
  const { orientation } = useStepper();
  const { isLast, state } = useStep();

  if (isLast) {
    return null;
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "bg-border transition-colors duration-150 ease-out",
        orientation === "horizontal"
          ? "mt-4 ml-2 h-px min-w-6 flex-1"
          : "-translate-x-1/2 absolute top-9 bottom-1 left-4 w-px",
        state === "completed" && "bg-primary",
        className,
      )}
      data-orientation={orientation}
      data-slot="step-separator"
      data-state={state}
      {...props}
    />
  );
};

export { Step, StepContent, StepDescription, StepIndicator, StepLabel, StepSeparator, Stepper };
