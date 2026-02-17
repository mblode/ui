"use client";

import { copyToClipboardWithMeta } from "@/components/copy-button";
import { Button } from "@/registry/default/ui//button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/default/ui//tabs";
import { useConfig } from "@/hooks/use-config";
import { useMounted } from "@/hooks/use-mounted";
import { NpmCommands } from "@/types/unist";
import { CheckIcon, ClipboardIcon } from "@fingertip/icons";
import * as React from "react";

export function CodeBlockCommand({
  __npmCommand__,
  __yarnCommand__,
  __pnpmCommand__,
  __bunCommand__,
}: React.ComponentProps<"pre"> & NpmCommands) {
  const [config, setConfig] = useConfig();
  const [hasCopied, setHasCopied] = React.useState(false);
  const mounted = useMounted();

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

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative w-full mt-6 max-h-[650px] overflow-hidden rounded-xl border border-gray-800 bg-gray-950 dark:bg-gray-900">
      <Tabs
        className="w-full"
        defaultValue={packageManager}
        onValueChange={(value) => {
          console.log("value", value, packageManager);
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
          });
        }}
      >
        <div className="flex items-start justify-between border-b border-gray-800 bg-gray-900 px-3 pt-2.5 w-full">
          <TabsList>
            {Object.entries(tabs).map(([key]) => {
              return (
                <TabsTrigger key={key} value={key}>
                  {key}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
        {Object.entries(tabs).map(([key, value]) => {
          return (
            <TabsContent key={key} value={key} className="mt-0">
              <pre className="px-4 py-5 overflow-x-auto">
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
      </Tabs>
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2.5 top-2 z-10 h-6 w-6 text-gray-50 hover:bg-gray-700 hover:text-gray-50 [&_svg]:h-3 [&_svg]:w-3"
        onClick={copyCommand}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
      </Button>
    </div>
  );
}
