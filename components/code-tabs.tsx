"use client";

import React from "react";

import { useConfig } from "@/hooks/use-config";
import { Tabs } from "@/registry/default/ui/tabs";

export function CodeTabs({ children }: React.ComponentProps<typeof Tabs>) {
  const [config, setConfig] = useConfig();

  const installationType = React.useMemo(() => {
    return config.installationType || "cli";
  }, [config]);

  return (
    <Tabs
      className="relative mt-6 w-full *:data-[slot=tabs-list]:gap-6"
      onValueChange={(value) =>
        setConfig({ ...config, installationType: value as "cli" | "manual" })
      }
      value={installationType}
    >
      {children}
    </Tabs>
  );
}
