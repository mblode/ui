"use client";
import { cva, type VariantProps } from "class-variance-authority";
import React, { ReactNode } from "react";

import { cn } from "@/lib/utils";

const glassContainerVariants = cva(
  "relative inline-flex w-max flex-nowrap items-center justify-center whitespace-nowrap p-1 border-none rounded-2xl backdrop-blur-md select-none",
  {
    variants: {
      variant: {
        default: "bg-white/20 border-white/30 shadow-lg",
        primary: "bg-primary/20 border-primary/30 shadow-lg",
        success: "bg-green-500/20 border-green-500/30 shadow-lg",
        warning: "bg-yellow-500/20 border-yellow-500/30 shadow-lg",
        destructive: "bg-red-500/20 border-red-500/30 shadow-lg",
        info: "bg-blue-500/20 border-blue-500/30 shadow-lg",
        magic:
          "bg-magic/20 border-magic/30 shadow-[0px_0px_10px_0px_rgba(91,57,227,0.25)]",
        muted: "bg-white/20 border-white/30 shadow-sm",
        purple: "bg-[#8B52F8]/20 border-[#8B52F8]/30 shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const glassContentVariants = cva(
  "flex items-center gap-1.5 rounded-xl font-semibold font-heading tracking-tight transition-colors leading-tight",
  {
    variants: {
      variant: {
        default: "bg-black text-white",
        primary: "bg-primary text-primary-foreground",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-white",
        destructive: "bg-red-500 text-white",
        info: "bg-blue-500 text-white",
        magic: "bg-magic text-primary-foreground",
        muted: "bg-white text-black",
        purple: "bg-[#8B52F8] text-white",
      },
      size: {
        xs: "px-2 py-1 text-[17px]", // ~ h5 size
        sm: "px-2.5 py-1.5 text-[18px]", // ~ h4 size
        default: "px-3 py-1.5 text-[22px]", // ~ h3 size
        lg: "px-4 py-2 text-[27px]", // ~ h2 size
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface GlassLabelProps
  extends
    VariantProps<typeof glassContainerVariants>,
    VariantProps<typeof glassContentVariants> {
  /**
   * The text content to display in the label
   */
  title: string;
  /**
   * Optional icon to show before the title
   */
  icon?: ReactNode;
  /**
   * Rotation angle in degrees (default: 30)
   */
  rotate?: number;
  /**
   * Additional class names to apply to the outer container
   */
  containerClassName?: string;
  /**
   * Additional class names to apply to the inner content
   */
  className?: string;
}

/**
 * GlassLabel component - A glass-morphism style label with optional icon and rotation
 * Suitable for heading labels with different size variants
 */
const GlassLabel = ({
  title,
  icon,
  rotate = 2,
  containerClassName,
  className,
  variant,
  size,
}: GlassLabelProps) => {
  // Make sure rotation is within bounds
  const safeRotation = Math.min(Math.max(rotate, -360), 360);

  return (
    <div
      className={cn(
        glassContainerVariants({ variant, className: containerClassName }),
      )}
      style={{
        transform: `rotate(${safeRotation}deg)`,
      }}
    >
      <div className={cn(glassContentVariants({ variant, size, className }))}>
        {icon && (
          <span className="flex items-center justify-center shrink-0">
            {icon}
          </span>
        )}
        <span className="whitespace-nowrap">{title}</span>
      </div>
    </div>
  );
};

export { GlassLabel, glassContainerVariants, glassContentVariants };
