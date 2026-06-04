"use client";

import { ChevronRightIcon, DotFilledIcon } from "blode-icons-react";
import { motion } from "motion/react";
import type * as React from "react";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";
import { Badge } from "@/registry/default/ui/badge";

// Self-contained shimmer for the active step label — no global CSS required.
const SHIMMER_GRADIENT =
  "linear-gradient(90deg, var(--muted-foreground) 0%, var(--muted-foreground) 35%, var(--foreground) 50%, var(--muted-foreground) 65%, var(--muted-foreground) 100%)";

function ShimmerText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span
      animate={{ backgroundPosition: ["0% 0", "100% 0"] }}
      className={cn("bg-clip-text text-transparent", className)}
      style={{ backgroundImage: SHIMMER_GRADIENT, backgroundSize: "300% 100%" }}
      transition={{ duration: 1.5, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
    >
      {children}
    </motion.span>
  );
}

// ─── ThinkingSteps (root) ───────────────────────────────────────────────────

interface ThinkingStepsProps extends Omit<
  React.ComponentProps<"div">,
  "children" | "defaultValue"
> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function ThinkingSteps({
  defaultOpen = true,
  open,
  onOpenChange,
  children,
  className,
  ref,
  ...props
}: ThinkingStepsProps) {
  const controlled = open !== undefined;

  return (
    <Accordion
      className={cn("w-80 max-w-full", className)}
      collapsible
      data-slot="thinking-steps"
      ref={ref}
      type="single"
      {...(controlled
        ? { value: open ? "thinking" : "" }
        : { defaultValue: defaultOpen ? "thinking" : "" })}
      {...(onOpenChange
        ? { onValueChange: (v: string | string[]) => onOpenChange(v === "thinking") }
        : {})}
      {...props}
    >
      <AccordionItem value="thinking">{children}</AccordionItem>
    </Accordion>
  );
}

// ─── ThinkingStepsHeader ────────────────────────────────────────────────────

function ThinkingStepsHeader({
  children = "Thinking",
  className,
  ...props
}: React.ComponentProps<typeof AccordionTrigger>) {
  return (
    <div className="w-fit">
      <AccordionTrigger
        chevron={false}
        className={cn(
          "w-auto gap-1.5 [&>span:first-child]:flex-none [&[data-panel-open]_[data-chevron]]:rotate-90",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronRightIcon
          className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200"
          data-chevron
        />
      </AccordionTrigger>
    </div>
  );
}

// ─── ThinkingStepsContent ───────────────────────────────────────────────────

function ThinkingStepsContent({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <AccordionContent>
      <div className={cn("flex flex-col", className)} {...props}>
        {children}
      </div>
    </AccordionContent>
  );
}

// ─── ThinkingStep ───────────────────────────────────────────────────────────

type StepStatus = "complete" | "active" | "pending";

interface ThinkingStepProps {
  /** Icon component (from blode-icons-react) shown in the marker column. */
  icon?: React.ElementType;
  showIcon?: boolean;
  label: string;
  description?: string;
  status?: StepStatus;
  /** Removes the connector line below the last step. */
  isLast?: boolean;
  children?: React.ReactNode;
  className?: string;
}

function ThinkingStep({
  icon: Icon = DotFilledIcon,
  showIcon = true,
  label,
  description,
  status = "complete",
  isLast = false,
  children,
  className,
}: ThinkingStepProps) {
  if (status === "pending") {
    return null;
  }

  const isActive = status === "active";

  return (
    // Outer animates height so space opens smoothly as steps stream in.
    <motion.div
      animate={{ height: "auto" }}
      className={cn("relative z-10 overflow-hidden", className)}
      initial={{ height: 0 }}
      transition={{ bounce: 0.15, duration: 0.24, type: "spring" }}
    >
      {/* Inner fades content in once the space starts opening. */}
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.08, duration: 0.24, ease: "easeOut" }}
      >
        <div className="flex gap-2.5 rounded-lg px-2 py-1.5">
          {/* Marker column with continuous connector line. */}
          <div className="flex w-[14px] shrink-0 flex-col items-center">
            <div className="pt-0.5">
              {showIcon ? (
                <Icon className="size-[14px] text-muted-foreground" />
              ) : (
                <div className="flex size-[14px] items-center justify-center">
                  <div className="size-1.5 rounded-full bg-muted-foreground/60" />
                </div>
              )}
            </div>
            {!isLast && <div className="mt-1 w-px flex-1 bg-border/60" />}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            {isActive ? (
              <ShimmerText className="font-medium text-[13px] leading-tight">{label}…</ShimmerText>
            ) : (
              <span className="font-medium text-[13px] text-foreground leading-tight">{label}</span>
            )}
            {description && (
              <span className="text-[13px] text-muted-foreground leading-snug">{description}</span>
            )}
            {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── ThinkingStepDetails (nested accordion) ─────────────────────────────────

interface ThinkingStepDetailsProps {
  summary: string;
  details?: string[];
  defaultOpen?: boolean;
  children?: React.ReactNode;
  className?: string;
}

function ThinkingStepDetails({
  summary,
  details,
  defaultOpen = false,
  children,
  className,
}: ThinkingStepDetailsProps) {
  return (
    <Accordion
      className={cn("-ml-3 mt-1", className)}
      collapsible
      defaultValue={defaultOpen ? "details" : ""}
      type="single"
    >
      <AccordionItem value="details">
        <div className="w-fit">
          <AccordionTrigger
            chevron={false}
            className="w-auto gap-1.5 rounded-lg px-3 py-1 text-muted-foreground [&>span:first-child]:flex-none [&[data-panel-open]_[data-chevron]]:rotate-90"
          >
            {summary}
            <ChevronRightIcon
              className="size-3.5 shrink-0 transition-transform duration-200"
              data-chevron
            />
          </AccordionTrigger>
        </div>
        <AccordionContent>
          <div className="flex flex-col gap-0.5 pt-0.5">
            {details?.map((item) => (
              <span className="text-[12px] text-muted-foreground leading-snug" key={item}>
                {item}
              </span>
            ))}
            {children}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// ─── ThinkingStepSources ────────────────────────────────────────────────────

function ThinkingStepSources({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("mt-1 flex flex-wrap gap-1.5", className)} {...props}>
      {children}
    </div>
  );
}

// ─── ThinkingStepSource ─────────────────────────────────────────────────────

type SourceColor = "gray" | "blue" | "green" | "yellow" | "red";

const SOURCE_VARIANT: Record<SourceColor, React.ComponentProps<typeof Badge>["variant"]> = {
  blue: "default",
  gray: "secondary",
  green: "success",
  red: "destructive",
  yellow: "warning",
};

interface ThinkingStepSourceProps {
  color?: SourceColor;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

function ThinkingStepSource({
  color = "gray",
  delay = 0,
  children,
  className,
}: ThinkingStepSourceProps) {
  return (
    <motion.span
      animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
      initial={{ filter: "blur(4px)", opacity: 0, scale: 0.85 }}
      transition={{
        bounce: 0.15,
        delay,
        duration: 0.16,
        filter: { delay, duration: 0.12 },
        type: "spring",
      }}
    >
      <Badge className={className} variant={SOURCE_VARIANT[color]}>
        {children}
      </Badge>
    </motion.span>
  );
}

// ─── ThinkingStepImage ──────────────────────────────────────────────────────

interface ThinkingStepImageProps {
  src: string;
  alt?: string;
  caption?: string;
  delay?: number;
  className?: string;
}

function ThinkingStepImage({
  src,
  alt = "",
  caption,
  delay = 0,
  className,
}: ThinkingStepImageProps) {
  return (
    <motion.div
      animate={{ filter: "blur(0px)", opacity: 1 }}
      className={cn("mt-1.5", className)}
      initial={{ filter: "blur(4px)", opacity: 0 }}
      transition={{
        filter: { delay, duration: 0.15 },
        opacity: { delay, duration: 0.2, ease: "easeOut" },
      }}
    >
      {/* eslint-disable-next-line next/no-img-element -- caller-supplied source, may be a data/blob URL */}
      <img alt={alt} className="w-full max-w-[200px] rounded-xl object-cover" src={src} />
      {caption && <span className="mt-1 block text-[11px] text-muted-foreground">{caption}</span>}
    </motion.div>
  );
}

export {
  ThinkingSteps,
  ThinkingStepsHeader,
  ThinkingStepsContent,
  ThinkingStep,
  ThinkingStepDetails,
  ThinkingStepSources,
  ThinkingStepSource,
  ThinkingStepImage,
};
export type {
  ThinkingStepsProps,
  ThinkingStepProps,
  ThinkingStepDetailsProps,
  ThinkingStepSourceProps,
  ThinkingStepImageProps,
  StepStatus,
  SourceColor,
};
