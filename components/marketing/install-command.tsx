"use client";

import { CheckIcon, CircleAlertIcon, ClipboardIcon } from "blode-icons-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";

interface InstallCommandProps extends Omit<React.ComponentProps<"div">, "onCopy"> {
  command: string;
  /** Fires after a successful copy. */
  onCopy?: () => void;
}

type CopyState = "idle" | "copied" | "error";

const RESET_MS = 2000;

const STATUS_TEXT: Record<CopyState, string> = {
  copied: "Command copied",
  error: "Couldn't copy. Select the command and copy it by hand.",
  idle: "",
};

const useCopyState = () => {
  const [state, setState] = React.useState<CopyState>("idle");
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    },
    [],
  );

  const copy = React.useCallback(async (value: string) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard unavailable");
      }
      await navigator.clipboard.writeText(value);
      setState("copied");
      return true;
    } catch {
      setState("error");
      return false;
    } finally {
      timer.current = setTimeout(() => setState("idle"), RESET_MS);
    }
  }, []);

  return { copy, state };
};

const CopyIcon = ({ state }: { state: CopyState }) => {
  if (state === "copied") {
    return <CheckIcon aria-hidden="true" />;
  }
  if (state === "error") {
    return <CircleAlertIcon aria-hidden="true" />;
  }
  return <ClipboardIcon aria-hidden="true" />;
};

/**
 * A copyable install command.
 *
 * The copy button covers all three states: idle, copied, and a failed copy
 * (no clipboard permission, or an insecure context), which is announced with a
 * recovery rather than failing silently.
 */
const InstallCommand = ({ className, command, onCopy, ...props }: InstallCommandProps) => {
  const { copy, state } = useCopyState();

  const handleCopy = async () => {
    if (await copy(command)) {
      onCopy?.();
    }
  };

  return (
    <div
      className={cn("w-full min-w-0 overflow-hidden rounded-xl border bg-code", className)}
      data-slot="install-command"
      {...props}
    >
      <div className="flex items-center">
        <pre className="no-scrollbar min-w-0 flex-1 overflow-x-auto py-3 pl-4 font-mono text-[0.8125rem] text-foreground leading-6">
          <code>
            <span aria-hidden="true" className="select-none text-muted-foreground">
              ${" "}
            </span>
            {command}
          </code>
        </pre>
        <Button
          aria-label="Copy install command"
          className="mr-1.5 shrink-0 self-center"
          data-state={state}
          onClick={handleCopy}
          size="icon-sm"
          variant="ghost"
        >
          <CopyIcon state={state} />
        </Button>
      </div>
      <output
        aria-live="polite"
        className={cn(
          state === "error" ? "block border-t px-4 py-2 text-muted-foreground text-xs" : "sr-only",
        )}
      >
        {STATUS_TEXT[state]}
      </output>
    </div>
  );
};

export { CopyIcon, InstallCommand, useCopyState };
export type { InstallCommandProps };
