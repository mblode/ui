"use client";

import React from "react";
import { CopyButton, CopyWithClassNames } from "@/components/copy-button";
import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/default/ui/tabs";

interface ComponentExampleProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start" | "end";
  extractClassname?: boolean;
  extractedClassNames?: string;
  src?: string;
}

interface CodeBlockProps {
  children?: React.ReactNode;
  "data-rehype-pretty-code-fragment"?: unknown;
}

interface CopyButtonDataProps {
  __rawString__?: string;
  value?: string;
}

export function ComponentExample({
  children,
  className,
  extractClassname,
  extractedClassNames,
  align = "center",
  src: _,
  ...props
}: ComponentExampleProps) {
  const [Example, Code, ...Children] = React.Children.toArray(
    children
  ) as React.ReactElement[];

  const codeString = React.useMemo(() => {
    const codeElement = Code as React.ReactElement<CodeBlockProps>;
    if (
      typeof codeElement?.props["data-rehype-pretty-code-fragment"] !==
      "undefined"
    ) {
      const [, Button] = React.Children.toArray(
        codeElement.props.children
      ) as React.ReactElement<CopyButtonDataProps>[];
      return Button?.props?.value ?? Button?.props?.__rawString__ ?? null;
    }
    return null;
  }, [Code]);

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs className="relative mr-auto w-full" defaultValue="preview">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          {extractedClassNames ? (
            <CopyWithClassNames
              className="absolute top-20 right-4"
              classNames={extractedClassNames}
              value={codeString ?? ""}
            />
          ) : (
            codeString && (
              <CopyButton
                className="absolute top-20 right-4"
                value={codeString}
              />
            )
          )}
        </div>
        <TabsContent className="rounded-md border" value="preview">
          <div
            className={cn("flex min-h-[350px] justify-center p-10", {
              "items-center": align === "center",
              "items-start": align === "start",
              "items-end": align === "end",
            })}
          >
            {Example}
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_button]:hidden [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              {Code}
            </div>
            {Children?.length ? (
              <div className="rounded-md [&_button]:hidden [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
                {Children}
              </div>
            ) : null}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
