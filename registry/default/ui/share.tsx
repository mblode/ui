"use client";

import { CheckIcon, ShareIcon } from "blode-icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type * as React from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/registry/default/hooks/use-copy-to-clipboard";
import { Button } from "@/registry/default/ui/button";

export interface ShareProps extends Omit<
  React.ComponentProps<typeof Button>,
  "children" | "onClick"
> {
  /** Message shown when the share sheet is unavailable and the value is copied instead */
  copyMessage?: string;
  /** Accessible label, also the visible text when `showLabel` is set (default: "Share") */
  label?: string;
  /** Callback when the value was shared or copied */
  onShare?: () => void;
  /** Render `label` as visible text beside the icon (default: false) */
  showLabel?: boolean;
  /** Body text passed to the share sheet */
  text?: string;
  /** Timeout in ms before resetting (default: 2000) */
  timeout?: number;
  /** Title passed to the share sheet */
  title?: string;
  /** The URL or text to share */
  value: string;
}

const isDismissal = (error: unknown) => {
  const name = (error as { name?: string } | null)?.name;
  return name === "AbortError" || name === "NotAllowedError";
};

const Share = ({
  className,
  copyMessage = "Link copied to clipboard",
  label = "Share",
  onShare,
  showLabel = false,
  size = showLabel ? "default" : "icon",
  text,
  timeout = 2000,
  title,
  value,
  variant = "outline",
  ...props
}: ShareProps) => {
  const [isShared, setIsShared] = useState(false);
  const { copyToClipboard, isCopied } = useCopyToClipboard({ onCopy: onShare, timeout });
  // oxlint-disable-next-line unicorn/no-useless-undefined -- React 19's useRef requires an explicit initial value
  const resetRef = useRef<number | undefined>(undefined);
  const isDone = isShared || isCopied;

  useEffect(() => () => window.clearTimeout(resetRef.current), []);

  const handleShare = async () => {
    const data: ShareData = { text, title, url: value };
    const canUseShareSheet =
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function" &&
      (typeof navigator.canShare !== "function" || navigator.canShare(data));

    if (canUseShareSheet) {
      try {
        await navigator.share(data);
        setIsShared(true);
        onShare?.();

        if (timeout !== 0) {
          window.clearTimeout(resetRef.current);
          resetRef.current = window.setTimeout(() => setIsShared(false), timeout);
        }

        return;
      } catch (error) {
        // The share sheet was dismissed, or the gesture was rejected — say nothing.
        if (isDismissal(error)) {
          return;
        }
      }
    }

    await copyToClipboard(value);
    toast.success(copyMessage);
  };

  return (
    <Button
      aria-label={showLabel ? undefined : label}
      className={cn("shrink-0", className)}
      data-shared={isDone}
      data-slot="share"
      onClick={handleShare}
      size={size}
      variant={variant}
      {...props}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center"
          data-icon={showLabel ? "inline-start" : undefined}
          exit={{ opacity: 0, scale: 0.8 }}
          initial={{ opacity: 0, scale: 0.8 }}
          key={isDone ? "check" : "share"}
          transition={{ duration: 0.15 }}
        >
          {isDone ? <CheckIcon /> : <ShareIcon />}
        </motion.span>
      </AnimatePresence>
      {showLabel ? label : null}
    </Button>
  );
};

export { Share };
