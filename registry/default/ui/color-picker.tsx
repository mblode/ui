"use client";

import { CheckIcon, ChevronDownIcon } from "@fingertip/icons";
import React, { useCallback, useState } from "react";

import { Button } from "./button";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const calendarColorSwatches = [
  { hex: "#AD1457", title: "Beetroot" },
  { hex: "#F4511E", title: "Tangerine" },
  { hex: "#E4C441", title: "Citron" },
  { hex: "#0B8043", title: "Basil" },
  { hex: "#3F51B5", title: "Blueberry" },
  { hex: "#8E24AA", title: "Grape" },
  { hex: "#D81B60", title: "Cherry" },
  { hex: "#EF6C00", title: "Pumpkin" },
  { hex: "#C0CA33", title: "Avocado" },
  { hex: "#009688", title: "Eucalyptus" },
  { hex: "#7986CB", title: "Lavender" },
  { hex: "#795548", title: "Cocoa" },
  { hex: "#D50000", title: "Tomato" },
  { hex: "#F09300", title: "Mango" },
  { hex: "#7CB342", title: "Pistachio" },
  { hex: "#039BE5", title: "Peacock" },
  { hex: "#B39DDB", title: "Wisteria" },
  { hex: "#616161", title: "Graphite" },
  { hex: "#E67C73", title: "Flamingo" },
  { hex: "#F6BF26", title: "Banana" },
  { hex: "#33B679", title: "Sage" },
  { hex: "#4285F4", title: "Cobalt" },
  { hex: "#9E69AF", title: "Amethyst" },
  { hex: "#A79B8E", title: "Birch" },
];

type Props = {
  color: string;
  onSelectAction: (color: string) => void;
  label?: string;
};

export const ColorPicker = ({
  color,
  onSelectAction,
  label = "Colour",
}: Props) => {
  const [open, setOpen] = useState(false);

  const onSelectColor = useCallback(
    (value: string) => {
      onSelectAction(value);
      setOpen(false);
    },
    [onSelectAction],
  );

  return (
    <Popover
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
      }}
    >
      <PopoverTrigger
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        className="flex items-center space-x-1"
      >
        <div
          className="size-5 max-h-5 min-w-5"
          id="color-picker-swatch"
          style={{
            backgroundColor: color,
          }}
        />

        <ChevronDownIcon className="size-4" />
      </PopoverTrigger>

      <PopoverContent className="w-full p-2" align="center">
        <div className="mb-2">
          <Label>{label}</Label>
        </div>

        <div className="grid grid-cols-6 grid-rows-4 gap-2">
          {calendarColorSwatches.map((item, index) => {
            return (
              <Button
                type="button"
                onClick={() => onSelectColor(item.hex)}
                variant="ghost"
                className="relative h-6 p-0!"
                key={index}
              >
                <div
                  className="size-6 max-h-6 min-w-6 rounded-full"
                  style={{ backgroundColor: item.hex }}
                />
                {item.hex === color && (
                  <CheckIcon className="size-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
                )}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
