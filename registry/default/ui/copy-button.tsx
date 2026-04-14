"use client";

import { CheckIcon, ClipboardIcon } from "blode-icons-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/registry/default/hooks/use-copy-to-clipboard";
import { Button } from "@/registry/default/ui/button";

export interface CopyButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "onClick" | "children"> {
  /** Accessible label (default: "Copy") */
  label?: string;
  /** Callback when text is copied */
  onCopy?: () => void;
  /** Timeout in ms before resetting (default: 2000) */
  timeout?: number;
  /** The text to copy to clipboard */
  value: string;
}

const CopyButton = ({
  value,
  className,
  variant = "ghost",
  size = "icon",
  onCopy,
  timeout = 2000,
  label = "Copy",
  ...props
}: CopyButtonProps) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    timeout,
    onCopy,
  });

  return (
    <Button
      aria-label={label}
      className={cn("shrink-0", className)}
      data-copied={isCopied}
      data-slot="copy-button"
      onClick={() => copyToClipboard(value)}
      size={size}
      variant={variant}
      {...props}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center"
          exit={{ opacity: 0, scale: 0.8 }}
          initial={{ opacity: 0, scale: 0.8 }}
          key={isCopied ? "check" : "copy"}
          transition={{ duration: 0.15 }}
        >
          {isCopied ? <CheckIcon /> : <ClipboardIcon />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
};

export { CopyButton };
