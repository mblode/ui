"use client";

import React, { useState } from "react";
import { Copy } from "@/registry/default/ui/copy";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/default/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Label } from "@/registry/default/ui/label";
import { Input } from "@/registry/default/ui/input";
import { Button } from "@/registry/default/ui/button";

export default function CopyDemo() {
  const [textToCopy, setTextToCopy] = useState(
    "This is sample text that will be copied to clipboard.",
  );
  const [htmlToCopy, setHtmlToCopy] = useState(
    "<h1>Formatted HTML</h1><p>This is <strong>bold</strong> and <em>italic</em> text.</p>",
  );

  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">Plain Text</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Copy Plain Text</CardTitle>
              <CardDescription>
                Copy text to clipboard with visual feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="text-to-copy">Text to copy</Label>
                <div className="flex w-full items-center space-x-2">
                  <Input
                    id="text-to-copy"
                    value={textToCopy}
                    onChange={(e) => setTextToCopy(e.target.value)}
                  />
                  <Copy
                    content={textToCopy}
                    onCopy={() => console.log("Copied text to clipboard!")}
                    className="h-8 w-8 p-1 border rounded-md hover:bg-muted"
                  />
                </div>
              </div>

              <div className="rounded-md bg-muted p-4 relative">
                <div className="absolute right-2 top-2">
                  <Copy
                    content={textToCopy}
                    className="h-8 w-8 p-1 rounded-md hover:bg-background"
                  />
                </div>
                <p className="font-mono text-sm">{textToCopy}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="html" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Copy HTML</CardTitle>
              <CardDescription>
                Copy HTML content and strip tags when pasting as plain text
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="html-to-copy">HTML to copy</Label>
                <div className="flex w-full items-center space-x-2">
                  <Input
                    id="html-to-copy"
                    value={htmlToCopy}
                    onChange={(e) => setHtmlToCopy(e.target.value)}
                  />
                  <Copy
                    content={htmlToCopy}
                    copyMode="HTML"
                    onCopy={() => console.log("Copied HTML to clipboard!")}
                    className="h-8 w-8 p-1 border rounded-md hover:bg-muted"
                  />
                </div>
              </div>

              <div className="rounded-md bg-muted p-4 relative">
                <div className="absolute right-2 top-2">
                  <Copy
                    content={htmlToCopy}
                    copyMode="HTML"
                    className="h-8 w-8 p-1 rounded-md hover:bg-background"
                  />
                </div>
                <div className="font-mono text-sm overflow-x-auto">
                  {htmlToCopy.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Preview of HTML</h3>
                  <Copy
                    content={htmlToCopy}
                    className="h-6 w-6 p-0.5 rounded-md hover:bg-muted"
                  />
                </div>
                <div
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: htmlToCopy }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="rounded-md border p-4">
        <h3 className="font-medium mb-2">Custom Button Implementation</h3>
        <div className="flex space-x-4">
          <Button asChild variant="secondary" size="sm">
            <Copy
              content="Copied from button"
              onCopy={() => console.log("Button copy clicked")}
            >
              Copy as Button
            </Copy>
          </Button>

          <Copy content="Custom element with asChild={true}" asChild>
            <Button variant="secondary" size="sm">
              Copy with asChild
            </Button>
          </Copy>
        </div>
      </div>
    </div>
  );
}
