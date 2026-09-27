"use client";

import { CheckIcon, ClipboardIcon } from "blode-icons-react";
import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu";

type DropdownMenuTriggerProps = React.ComponentProps<typeof DropdownMenuTrigger>;

export function copyToClipboardWithMeta(value: string) {
  navigator.clipboard.writeText(value);
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string;
  src?: string;
}) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  return (
    <Button
      className={cn(
        "absolute top-3 right-2 z-10 size-7 bg-code hover:opacity-100 focus-visible:opacity-100",
        className,
      )}
      data-copied={hasCopied}
      data-slot="copy-button"
      onClick={() => {
        copyToClipboardWithMeta(value);
        setHasCopied(true);
      }}
      size="icon"
      variant={variant}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  );
}

interface CopyWithClassNamesProps extends DropdownMenuTriggerProps {
  className?: string;
  classNames: string;
  value: string;
}

export function CopyWithClassNames({
  value,
  classNames,
  className,
  ...props
}: CopyWithClassNamesProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const copyToClipboard = React.useCallback((value: string) => {
    copyToClipboardWithMeta(value);
    setHasCopied(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild {...props}>
        <Button
          className={cn(
            "relative z-10 size-7 bg-code hover:opacity-100 focus-visible:opacity-100",
            className,
          )}
          size="icon"
          variant="ghost"
        >
          {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
          <span className="sr-only">Copy</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => copyToClipboard(value)}>Component</DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyToClipboard(classNames)}>Classname</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
