"use client";

import { CheckIcon, CircleAlertIcon, ClipboardIcon } from "blode-icons-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/default/ui/tabs";

interface InstallCommandItem {
  command: string;
  /** Tab label, e.g. "New project". Also passed to `onCopy`. */
  label: string;
}

interface InstallCommandProps extends Omit<React.ComponentProps<"div">, "onCopy"> {
  commands: InstallCommandItem[];
  /** Fires after a successful copy, with the active command's label. */
  onCopy?: (label: string) => void;
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

const CommandLine = ({ command }: { command: string }) => (
  <pre className="no-scrollbar min-w-0 flex-1 overflow-x-auto py-3 pl-4 font-mono text-[0.8125rem] text-foreground leading-6">
    <code>
      <span aria-hidden="true" className="select-none text-muted-foreground">
        ${" "}
      </span>
      {command}
    </code>
  </pre>
);

/**
 * A copyable install command. One command renders as a single line; several
 * render as tabs, so a reader picks their setup before copying.
 *
 * The copy button covers all three states: idle, copied, and a failed copy
 * (no clipboard permission, or an insecure context), which is announced with a
 * recovery rather than failing silently.
 */
const InstallCommand = ({ className, commands, onCopy, ...props }: InstallCommandProps) => {
  const [active, setActive] = React.useState(commands[0]?.label ?? "");
  const { copy, state } = useCopyState();
  const current = commands.find((item) => item.label === active) ?? commands[0];

  if (!current) {
    return null;
  }

  const handleCopy = async () => {
    const copied = await copy(current.command);
    if (copied) {
      onCopy?.(current.label);
    }
  };

  const copyButton = (
    <Button
      aria-label={commands.length > 1 ? `Copy ${current.label} command` : "Copy install command"}
      className="mr-1.5 shrink-0 self-center"
      data-state={state}
      onClick={handleCopy}
      size="icon-sm"
      variant="ghost"
    >
      <CopyIcon state={state} />
    </Button>
  );

  return (
    <div
      className={cn("w-full min-w-0 overflow-hidden rounded-xl border bg-code", className)}
      data-slot="install-command"
      {...props}
    >
      {commands.length > 1 ? (
        <Tabs className="gap-0" onValueChange={(value) => setActive(String(value))} value={active}>
          <div className="flex items-center border-b px-2 py-1.5">
            <TabsList className="h-8 bg-transparent" variant="default">
              {commands.map((item) => (
                <TabsTrigger
                  className="px-2.5 text-[0.8125rem]"
                  key={item.label}
                  value={item.label}
                >
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {commands.map((item) => (
            <TabsContent className="flex items-center" key={item.label} value={item.label}>
              <CommandLine command={item.command} />
              {item.label === current.label ? copyButton : null}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="flex items-center">
          <CommandLine command={current.command} />
          {copyButton}
        </div>
      )}
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
export type { InstallCommandItem, InstallCommandProps };
