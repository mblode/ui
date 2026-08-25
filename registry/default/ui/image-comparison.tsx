"use client";

import { ArrowExpandHorIcon, ArrowExpandVerIcon } from "blode-icons-react";
import { cva } from "class-variance-authority";
import type * as React from "react";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { AspectRatio } from "@/registry/default/ui/aspect-ratio";

const MIN_POSITION = 0;
const MAX_POSITION = 100;
const STEP = 1;
const LARGE_STEP = 10;

const clampPosition = (value: number) => Math.min(MAX_POSITION, Math.max(MIN_POSITION, value));

const imageComparisonHandleVariants = cva(
  "group/handle absolute flex touch-none items-center justify-center outline-none",
  {
    defaultVariants: {
      orientation: "horizontal",
    },
    variants: {
      orientation: {
        horizontal: "-translate-x-1/2 inset-y-0 w-10 cursor-ew-resize",
        vertical: "-translate-y-1/2 inset-x-0 h-10 cursor-ns-resize",
      },
    },
  },
);

const imageComparisonLineVariants = cva("absolute bg-primary", {
  defaultVariants: {
    orientation: "horizontal",
  },
  variants: {
    orientation: {
      horizontal: "inset-y-0 w-0.5",
      vertical: "inset-x-0 h-0.5",
    },
  },
});

export interface ImageComparisonImage {
  /** Alternative text for the image. Required — each side is distinct content. */
  alt: string;
  /** Image source. */
  src: string;
}

export interface ImageComparisonProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** The image revealed on the trailing side of the handle. */
  after: ImageComparisonImage;
  /** The image revealed on the leading side of the handle. */
  before: ImageComparisonImage;
  /** Uncontrolled starting position, 0–100 (default: 50). */
  defaultPosition?: number;
  /** Accessible name for the drag handle (default: "Comparison position"). */
  label?: string;
  /** Called with the clamped 0–100 position whenever it changes. */
  onPositionChange?: (position: number) => void;
  /** Axis the handle travels along (default: "horizontal"). */
  orientation?: "horizontal" | "vertical";
  /** Controlled position, 0–100. Pass with `onPositionChange`. */
  position?: number;
  /**
   * Width divided by height. The container reserves it so the images cannot
   * shift layout as they load (default: `16 / 9`).
   */
  ratio?: number;
}

const ImageComparison = ({
  after,
  before,
  className,
  defaultPosition = 50,
  label = "Comparison position",
  onPositionChange,
  orientation = "horizontal",
  position,
  ratio = 16 / 9,
  ...props
}: ImageComparisonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uncontrolledPosition, setUncontrolledPosition] = useState(() =>
    clampPosition(defaultPosition),
  );

  const isControlled = position !== undefined;
  const currentPosition = clampPosition(isControlled ? position : uncontrolledPosition);
  const isVertical = orientation === "vertical";

  const setPosition = (next: number) => {
    const clamped = clampPosition(next);
    if (clamped === currentPosition) {
      return;
    }
    if (!isControlled) {
      setUncontrolledPosition(clamped);
    }
    onPositionChange?.(clamped);
  };

  const updateFromPointer = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    setPosition(
      isVertical
        ? ((clientY - rect.top) / rect.height) * 100
        : ((clientX - rect.left) / rect.width) * 100,
    );
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.focus();
    setIsDragging(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }
    updateFromPointer(event.clientX, event.clientY);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const decreaseKey = isVertical ? "ArrowUp" : "ArrowLeft";
    const increaseKey = isVertical ? "ArrowDown" : "ArrowRight";
    // Page keys travel the way the arrows do. Vertically, position grows downward,
    // so PageUp has to lower it or it contradicts ArrowUp on the same handle.
    const pageDecreaseKey = isVertical ? "PageUp" : "PageDown";
    const pageIncreaseKey = isVertical ? "PageDown" : "PageUp";
    const step = event.shiftKey ? LARGE_STEP : STEP;
    let next: number | undefined;

    if (event.key === decreaseKey) {
      next = currentPosition - step;
    } else if (event.key === increaseKey) {
      next = currentPosition + step;
    } else if (event.key === pageDecreaseKey) {
      next = currentPosition - LARGE_STEP;
    } else if (event.key === pageIncreaseKey) {
      next = currentPosition + LARGE_STEP;
    } else if (event.key === "Home") {
      next = MIN_POSITION;
    } else if (event.key === "End") {
      next = MAX_POSITION;
    }

    if (next === undefined) {
      return;
    }
    event.preventDefault();
    setPosition(next);
  };

  const rounded = Math.round(currentPosition);
  const clipPath = isVertical
    ? `polygon(0% 0%, 100% 0%, 100% ${currentPosition}%, 0% ${currentPosition}%)`
    : `polygon(0% 0%, ${currentPosition}% 0%, ${currentPosition}% 100%, 0% 100%)`;
  const HandleIcon = isVertical ? ArrowExpandVerIcon : ArrowExpandHorIcon;

  return (
    <AspectRatio
      className={cn("w-full select-none overflow-hidden rounded-xl bg-muted", className)}
      data-orientation={orientation}
      data-slot="image-comparison"
      ratio={ratio}
      ref={containerRef}
      {...props}
    >
      {/* eslint-disable-next-line next/no-img-element -- caller-supplied source, may be a data/blob URL */}
      <img
        alt={after.alt}
        className="absolute inset-0 size-full select-none object-cover"
        data-slot="image-comparison-after"
        draggable={false}
        src={after.src}
      />

      <div className="absolute inset-0" data-slot="image-comparison-before" style={{ clipPath }}>
        {/* eslint-disable-next-line next/no-img-element -- caller-supplied source, may be a data/blob URL */}
        <img
          alt={before.alt}
          className="size-full select-none object-cover"
          draggable={false}
          src={before.src}
        />
      </div>

      {/* oxlint-disable jsx-a11y/prefer-tag-over-role -- role="slider" is the WAI-ARIA pattern for a drag handle; input[type=range] cannot sit between two clipped images */}
      <div
        aria-label={label}
        aria-orientation={orientation}
        aria-valuemax={MAX_POSITION}
        aria-valuemin={MIN_POSITION}
        aria-valuenow={rounded}
        aria-valuetext={`${rounded}%`}
        className={imageComparisonHandleVariants({ orientation })}
        data-dragging={isDragging || undefined}
        data-slot="image-comparison-handle"
        onKeyDown={onKeyDown}
        onPointerCancel={onPointerUp}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        role="slider"
        style={isVertical ? { top: `${currentPosition}%` } : { left: `${currentPosition}%` }}
        tabIndex={0}
      >
        <div
          className={imageComparisonLineVariants({ orientation })}
          data-slot="image-comparison-line"
        />
        <div
          className="absolute flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-[box-shadow] duration-150 ease-out group-focus-visible/handle:ring-2 group-focus-visible/handle:ring-ring/50 group-focus-visible/handle:ring-offset-2 group-focus-visible/handle:ring-offset-background"
          data-slot="image-comparison-thumb"
        >
          <HandleIcon className="size-4" />
        </div>
      </div>
      {/* oxlint-enable jsx-a11y/prefer-tag-over-role */}
    </AspectRatio>
  );
};

export { ImageComparison };
