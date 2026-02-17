"use client";

import Image from "next/image";
import React from "react";
import { Index } from "@/__registry__";
import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { Spinner } from "@/registry/default/ui/spinner";
import { styles } from "@/registry/registry-styles";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start" | "end";
  chromeLessOnMobile?: boolean;
  description?: string;
  hideCode?: boolean;
  name: string;
  previewClassName?: string;
  type?: "block" | "component" | "example";
}

interface RegistryComponentEntry {
  component?: React.ComponentType;
}

export function ComponentPreview({
  name,
  type,
  children,
  className,
  align = "center",
  description,
  hideCode = false,
  previewClassName,
  chromeLessOnMobile = false,
  ...props
}: ComponentPreviewProps) {
  const [config, setConfig] = useConfig();
  const [isMobileCodeVisible, setIsMobileCodeVisible] = React.useState(false);

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
    const styleRegistry = Index[effectiveStyle] as
      | Record<string, RegistryComponentEntry>
      | undefined;

    if (!styleRegistry) {
      return (
        <p className="text-muted-foreground text-sm">
          Style{" "}
          <code className="relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {effectiveStyle}
          </code>{" "}
          not found in registry.
        </p>
      );
    }

    const Component = styleRegistry[name]?.component;

    if (!Component) {
      return (
        <p className="text-muted-foreground text-sm">
          Component{" "}
          <code className="relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name, effectiveStyle]);

  if (type === "block") {
    return (
      <div className="relative mt-6 aspect-[4/2.5] w-full overflow-hidden rounded-xl border md:-mx-1">
        <Image
          alt={name}
          className="absolute top-0 left-0 z-20 w-[970px] max-w-none bg-background sm:w-[1280px] md:hidden dark:hidden md:dark:hidden"
          height={900}
          src={`/r/styles/${effectiveStyle}/${name}-light.png`}
          width={1440}
        />
        <Image
          alt={name}
          className="absolute top-0 left-0 z-20 hidden w-[970px] max-w-none bg-background sm:w-[1280px] md:hidden dark:block md:dark:hidden"
          height={900}
          src={`/r/styles/${effectiveStyle}/${name}-dark.png`}
          width={1440}
        />
        <div className="absolute inset-0 hidden w-[1600px] bg-background md:block">
          <iframe
            className="size-full"
            src={`/view/styles/${effectiveStyle}/${name}`}
            title={`${name} preview`}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative mt-4 mb-12 flex flex-col overflow-hidden rounded-xl border",
        className
      )}
      data-slot="component-preview"
      {...props}
    >
      <div data-slot="preview" dir="ltr">
        <div
          className={cn(
            // biome-ignore lint/nursery/useSortedClasses: keep class order identical to shadcn-ui v4
            "preview relative flex h-72 w-full justify-center p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start data-[chromeless=true]:h-auto data-[chromeless=true]:p-0",
            previewClassName
          )}
          data-align={align}
          data-chromeless={chromeLessOnMobile}
        >
          <React.Suspense
            fallback={
              <div className="flex w-full items-center justify-center gap-2 text-muted-foreground text-sm">
                <Spinner size={16} />
                Loading...
              </div>
            }
          >
            {Preview}
          </React.Suspense>
        </div>
      </div>
      {!hideCode && (
        <div
          className="[&_[data-rehype-pretty-code-figure]]:!m-0 relative overflow-hidden data-[mobile-code-visible=true]:**:data-[slot=copy-button]:flex **:data-[slot=copy-button]:right-4 **:data-[slot=copy-button]:hidden [&_[data-rehype-pretty-code-figure]]:rounded-t-none [&_[data-rehype-pretty-code-figure]]:border-t [&_pre]:max-h-72"
          data-mobile-code-visible={isMobileCodeVisible}
          data-slot="code"
        >
          {isMobileCodeVisible ? (
            Code
          ) : (
            <div className="relative">
              <div className="[&_[data-rehype-pretty-code-figure]]:!m-0 [&_[data-rehype-pretty-code-figure]]:rounded-t-none [&_[data-rehype-pretty-code-figure]]:border-t [&_pre]:max-h-20 [&_pre]:overflow-hidden">
                {Code}
              </div>
              <div className="absolute inset-0 flex items-center justify-center pb-4">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, var(--color-code), color-mix(in oklab, var(--color-code) 60%, transparent), transparent)",
                  }}
                />
                <Button
                  className="relative z-10 rounded-lg bg-background text-foreground shadow-none hover:bg-muted dark:bg-background dark:text-foreground dark:hover:bg-muted"
                  onClick={() => {
                    setIsMobileCodeVisible(true);
                  }}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  View Code
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
