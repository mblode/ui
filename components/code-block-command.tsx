"use client";

import { CheckIcon, ClipboardIcon } from "blode-icons-react";
import React from "react";
import { copyToClipboardWithMeta } from "@/components/copy-button";
import { useConfig } from "@/hooks/use-config";
import { Button } from "@/registry/default/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/default/ui/tabs";
import type { NpmCommands } from "@/types/unist";

export function CodeBlockCommand({
  __npmCommand__,
  __yarnCommand__,
  __pnpmCommand__,
  __bunCommand__,
}: React.ComponentProps<"pre"> & NpmCommands) {
  const [config, setConfig] = useConfig();
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const packageManager = config.packageManager || "pnpm";
  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpmCommand__,
      npm: __npmCommand__,
      yarn: __yarnCommand__,
      bun: __bunCommand__,
    };
  }, [__npmCommand__, __pnpmCommand__, __yarnCommand__, __bunCommand__]);

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager];

    if (!command) {
      return;
    }

    copyToClipboardWithMeta(command);
    setHasCopied(true);
  }, [packageManager, tabs]);

  return (
    <div className="overflow-x-auto">
      <Tabs
        className="gap-0"
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
          });
        }}
        value={packageManager}
      >
        <div className="flex items-center gap-2 border-border/50 border-b px-3 py-1">
          <TabsList className="rounded-none bg-transparent p-0">
            {Object.entries(tabs).map(([key]) => {
              return (
                <TabsTrigger
                  className="h-7 border border-transparent pt-0.5 shadow-none! data-[state=active]:border-input data-[state=active]:bg-background!"
                  key={key}
                  value={key}
                >
                  {key}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => {
            return (
              <TabsContent className="mt-0 px-4 py-3.5" key={key} value={key}>
                <pre>
                  <code
                    className="relative font-mono text-sm leading-none"
                    data-language="bash"
                  >
                    {value}
                  </code>
                </pre>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
      <Button
        className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
        data-slot="copy-button"
        onClick={copyCommand}
        size="icon"
        variant="ghost"
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
      </Button>
    </div>
  );
}
