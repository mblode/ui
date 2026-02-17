"use client";

import { ArrowOutOfBoxIcon, CircleCheckIcon } from "@fingertip/icons";
import { Slot } from "@radix-ui/react-slot";
import copy from "copy-to-clipboard";
import {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

type ShareProps = HTMLAttributes<HTMLButtonElement> & {
  value: string;
  valuePrefix?: string;
  displayValue?: string;
  description?: string;
  asChild?: boolean;
  onShare?: () => void;
};

const Share = forwardRef<HTMLButtonElement, ShareProps>(
  (
    {
      children,
      className,
      value,
      valuePrefix,
      displayValue,
      description,
      /**
       * Whether to remove the wrapper `button` element and use the
       * passed child element instead.
       */
      asChild = false,
      onShare,
      ...props
    }: ShareProps,
    ref,
  ) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [done, setDone] = useState(false);
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("Share");

    const handleShare = useCallback(async () => {
      setDone(true);
      onShare?.();

      let urlToShare = value ?? window.location.href;

      // Remove 'preview' query param
      const urlObj = new URL(urlToShare);
      urlToShare = urlObj.toString();

      try {
        await navigator.share({
          title: displayValue,
          url: valuePrefix && urlToShare ? undefined : urlToShare,
          text:
            valuePrefix && urlToShare
              ? `${valuePrefix} ${urlToShare}`
              : undefined,
        });
      } catch (_err: any) {}

      copy(urlToShare);
      toast.success(description || "Copied and ready to share");

      setTimeout(() => {
        setDone(false);
      }, 2000);
    }, [description, displayValue, onShare, value, valuePrefix]);

    useEffect(() => {
      if (done) {
        setText("Shared");
        return;
      }

      setTimeout(() => {
        setText("Share");
      }, 500);
    }, [done]);

    const Component = asChild ? Slot : "button";

    return (
      <TooltipProvider>
        <Tooltip defaultOpen={false} open={done || open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <Component
              ref={ref}
              aria-label="Share"
              type="button"
              className={cn("h-fit w-fit", className)}
              onClick={handleShare}
              onPointerEnter={() => setShowTooltip(true)}
              onPointerLeave={() => setShowTooltip(false)}
              {...props}
            >
              {children ? (
                children
              ) : done ? (
                <CircleCheckIcon />
              ) : (
                <ArrowOutOfBoxIcon />
              )}
            </Component>
          </TooltipTrigger>
          {showTooltip && <TooltipContent>{text}</TooltipContent>}
        </Tooltip>
      </TooltipProvider>
    );
  },
);
Share.displayName = "Share";

export { Share };
