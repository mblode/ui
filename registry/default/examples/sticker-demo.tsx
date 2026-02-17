"use client";

import React from "react";
import { Sticker } from "@/registry/default/ui/sticker";

export default function StickerDemo() {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <h3 className="text-lg font-medium">Default Sticker</h3>
      <div className="relative w-full h-48 bg-muted/30 rounded-lg flex items-center justify-center">
        <Sticker>Premium</Sticker>
      </div>

      <h3 className="text-lg font-medium mt-4">Sticker Variants</h3>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 w-full">
        <div className="flex flex-col items-center gap-2">
          <Sticker variant="default">New!</Sticker>
          <span className="text-sm text-muted-foreground">Default</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Sticker variant="purple">Sale</Sticker>
          <span className="text-sm text-muted-foreground">Purple</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Sticker variant="blue">-30%</Sticker>
          <span className="text-sm text-muted-foreground">Blue</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Sticker variant="yellow">Hot!</Sticker>
          <span className="text-sm text-muted-foreground">Yellow</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Sticker variant="green">Free</Sticker>
          <span className="text-sm text-muted-foreground">Green</span>
        </div>
      </div>

      <h3 className="text-lg font-medium mt-4">Custom Content</h3>
      <div className="flex gap-6 flex-wrap justify-center">
        <Sticker variant="yellow" className="flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 17L5.5 20.5L7 13.5L2 8.5L9 7.5L12 1L15 7.5L22 8.5L17 13.5L18.5 20.5L12 17Z"
              fill="currentColor"
            />
          </svg>
          Featured
        </Sticker>

        <Sticker variant="blue" className="flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 15V3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Download
        </Sticker>
      </div>
    </div>
  );
}
