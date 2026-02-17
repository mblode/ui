"use client";

import React, { useState } from "react";
import {
  AlignmentCenterIcon,
  AlignmentLeftIcon,
  AlignmentRightIcon,
  BoldIcon,
  ItalicIcon,
  Group1Icon,
  Text1Icon,
  StrikeThroughIcon,
  UnderlineIcon,
  Email1Icon,
  Images1Icon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@fingertip/icons";
import { Toolbar } from "@/registry/default/ui/toolbar";

export default function ToolbarDemo() {
  const [textAlignment, setTextAlignment] = useState<
    "left" | "center" | "right"
  >("left");
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  });

  const toggleFormat = (format: keyof typeof formatting) => {
    setFormatting((prev) => ({
      ...prev,
      [format]: !prev[format],
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-medium">
          Horizontal Toolbar (Text Editor)
        </h3>
        <div className="w-full border rounded-lg p-4 space-y-4">
          <Toolbar.Wrapper>
            <Toolbar.Button
              active={formatting.bold}
              onClick={() => toggleFormat("bold")}
              tooltip="Bold"
              tooltipShortcut={["⌘", "B"]}
            >
              <BoldIcon className="size-4" />
            </Toolbar.Button>
            <Toolbar.Button
              active={formatting.italic}
              onClick={() => toggleFormat("italic")}
              tooltip="Italic"
              tooltipShortcut={["⌘", "I"]}
            >
              <ItalicIcon className="size-4" />
            </Toolbar.Button>
            <Toolbar.Button
              active={formatting.underline}
              onClick={() => toggleFormat("underline")}
              tooltip="Underline"
              tooltipShortcut={["⌘", "U"]}
            >
              <UnderlineIcon className="size-4" />
            </Toolbar.Button>
            <Toolbar.Button
              active={formatting.strikethrough}
              onClick={() => toggleFormat("strikethrough")}
              tooltip="Strikethrough"
            >
              <StrikeThroughIcon className="size-4" />
            </Toolbar.Button>

            <Toolbar.Divider />

            <Toolbar.Button
              active={textAlignment === "left"}
              onClick={() => setTextAlignment("left")}
              tooltip="Align Left"
            >
              <AlignmentLeftIcon className="size-4" />
            </Toolbar.Button>
            <Toolbar.Button
              active={textAlignment === "center"}
              onClick={() => setTextAlignment("center")}
              tooltip="Align Center"
            >
              <AlignmentCenterIcon className="size-4" />
            </Toolbar.Button>
            <Toolbar.Button
              active={textAlignment === "right"}
              onClick={() => setTextAlignment("right")}
              tooltip="Align Right"
            >
              <AlignmentRightIcon className="size-4" />
            </Toolbar.Button>

            <Toolbar.Divider />

            <Toolbar.Button tooltip="Bullet List">
              <Group1Icon className="size-4" />
            </Toolbar.Button>
            <Toolbar.Button tooltip="Numbered List">
              <Text1Icon className="size-4" />
            </Toolbar.Button>

            <Toolbar.Divider />

            <Toolbar.Button tooltip="Insert Link">
              <Email1Icon className="size-4" />
            </Toolbar.Button>
            <Toolbar.Button tooltip="Insert Image">
              <Images1Icon className="size-4" />
            </Toolbar.Button>
          </Toolbar.Wrapper>

          <div
            className="min-h-24 border rounded-md p-3"
            style={{
              textAlign: textAlignment,
              fontWeight: formatting.bold ? "bold" : "normal",
              fontStyle: formatting.italic ? "italic" : "normal",
              textDecoration: [
                formatting.underline && "underline",
                formatting.strikethrough && "line-through",
              ]
                .filter(Boolean)
                .join(" "),
            }}
            contentEditable
            suppressContentEditableWarning
          >
            Type your text here...
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="mb-4 text-sm font-medium">Vertical Toolbar</h3>
          <div className="border rounded-lg p-4 flex">
            <Toolbar.Wrapper isVertical className="mr-4">
              <Toolbar.Button tooltip="Bold">
                <BoldIcon className="size-4" />
              </Toolbar.Button>
              <Toolbar.Button tooltip="Italic">
                <ItalicIcon className="size-4" />
              </Toolbar.Button>
              <Toolbar.Divider horizontal />
              <Toolbar.Button tooltip="Undo">
                <ArrowLeftIcon className="size-4" />
              </Toolbar.Button>
              <Toolbar.Button tooltip="Redo">
                <ArrowRightIcon className="size-4" />
              </Toolbar.Button>
            </Toolbar.Wrapper>
            <div className="border rounded-md p-3 flex-1 min-h-32">
              Content area
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-medium">Simple Toolbar</h3>
          <Toolbar.Wrapper>
            <Toolbar.Button variant="secondary">Cut</Toolbar.Button>
            <Toolbar.Button variant="secondary">Copy</Toolbar.Button>
            <Toolbar.Button variant="secondary">Paste</Toolbar.Button>
            <Toolbar.Divider />
            <Toolbar.Button variant="default">Save</Toolbar.Button>
          </Toolbar.Wrapper>
        </div>
      </div>
    </div>
  );
}
