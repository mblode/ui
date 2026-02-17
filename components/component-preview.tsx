"use client";

import * as React from "react";
import Image from "next/image";
import { Index } from "@/__registry__";

import { cn } from "@/lib/utils";
import { useConfig } from "@/hooks/use-config";
import { CopyButton } from "@/components/copy-button";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/default/ui/tabs";
import { styles } from "@/registry/registry-styles";
import { Spinner } from "@/registry/default/ui/spinner";
import { OpenInV0Button } from "./open-in-v0-button";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  extractClassname?: boolean;
  extractedClassNames?: string;
  align?: "center" | "start" | "end";
  description?: string;
  hideCode?: boolean;
  type?: "block" | "component" | "example";
  preview?: boolean;
}

export function ComponentPreview({
  name,
  type,
  children,
  className,
  extractClassname,
  extractedClassNames,
  align = "center",
  description,
  hideCode = false,
  preview,
  ...props
}: ComponentPreviewProps) {
  const [config, setConfig] = useConfig();

  // Fallback to "default" if the configured style doesn't exist
  const styleExists = Index[config.style] !== undefined;
  const effectiveStyle = styleExists ? config.style : "default";

  // Reset config if style doesn't exist
  React.useEffect(() => {
    if (!styleExists && config.style !== "default") {
      setConfig({ ...config, style: "default" });
    }
  }, [styleExists, config, setConfig]);

  const index = styles.findIndex((style) => style.name === effectiveStyle);

  const Codes = React.Children.toArray(children) as React.ReactElement[];
  const Code = Codes[index];

  const Preview = React.useMemo(() => {
    const styleRegistry = Index[effectiveStyle];

    if (!styleRegistry) {
      return (
        <p className="text-sm text-muted-foreground">
          Style{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {effectiveStyle}
          </code>{" "}
          not found in registry.
        </p>
      );
    }

    const Component = styleRegistry[name]?.component;

    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name, effectiveStyle]);

  const codeString = React.useMemo(() => {
    if (
      typeof (Code as any)?.props["data-rehype-pretty-code-fragment"] !==
      "undefined"
    ) {
      const [Button] = React.Children.toArray(
        (Code as any).props.children,
      ) as React.ReactElement[];
      return (
        (Button as any)?.props?.value ||
        (Button as any)?.props?.__rawString__ ||
        null
      );
    }
  }, [Code]);

  if (type === "block") {
    return (
      <div className="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border">
        <Image
          src={`/r/styles/${effectiveStyle}/${name}-light.png`}
          alt={name}
          width={1440}
          height={900}
          className="absolute left-0 top-0 z-20 w-[970px] max-w-none bg-background dark:hidden sm:w-[1280px] md:hidden md:dark:hidden"
        />
        <Image
          src={`/r/styles/${effectiveStyle}/${name}-dark.png`}
          alt={name}
          width={1440}
          height={900}
          className="absolute left-0 top-0 z-20 hidden w-[970px] max-w-none bg-background dark:block sm:w-[1280px] md:hidden md:dark:hidden"
        />
        <div className="absolute inset-0 hidden w-[1600px] bg-background md:block">
          <iframe
            src={`/view/styles/${effectiveStyle}/${name}`}
            className="size-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          {!hideCode && (
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
          )}
        </div>
        <TabsContent value="preview" className="relative rounded-md border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <CopyButton
                value={codeString}
                variant="muted"
                className="h-7 w-7 text-foreground opacity-100 hover:bg-muted hover:text-foreground [&_svg]:h-3.5 [&_svg]:w-3.5"
              />
            </div>

            <OpenInV0Button
              url={`https://ui.fingertip.com/r/styles/default/${name.replace("-demo", "")}.json`}
            />
          </div>

          <div
            className={cn(
              "preview flex min-h-[350px] w-full justify-center p-10",
              {
                "items-center": align === "center",
                "items-start": align === "start",
                "items-end": align === "end",
              },
            )}
          >
            <React.Suspense
              fallback={
                <div className="flex w-full items-center justify-center text-sm text-muted-foreground gap-2">
                  <Spinner size={16} />
                  Loading...
                </div>
              }
            >
              {Preview}
            </React.Suspense>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              {Code}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
