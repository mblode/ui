"use client";
import { PlusLargeIcon, TagIcon } from "@fingertip/icons";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { KeyboardEvent, ReactNode, useRef, useState } from "react";

import { Badge } from "./badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "./command";
import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  partiallySelected?: string[]; // New prop for intermediate state
  onChange: (tagId: string, remove: boolean) => void;
  onCreateOption?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  label?: ReactNode;
}

export function MultiSelect({
  options,
  selected,
  partiallySelected = [], // Default to empty array
  onChange,
  onCreateOption,
  className,
  disabled = false,
  placeholder = "Add tags...",
  label = "Custom tags",
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputKeyDown = (e: KeyboardEvent) => {
    // Create new label on Enter if text exists and creation is allowed
    if (e.key === "Enter" && inputValue && onCreateOption) {
      onCreateOption(inputValue);
      setInputValue("");
      e.preventDefault();
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const hasExactMatch = filteredOptions.some(
    (option) => option.label.toLowerCase() === inputValue.toLowerCase(),
  );

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={cn("mb-4 relative text-left w-full", className)}
        ref={containerRef}
      >
        <PopoverPrimitive.Trigger asChild disabled={disabled}>
          <div>
            <div className="mb-2">
              <Label>{label}</Label>
            </div>

            <div
              className={cn(
                "flex min-h-[52px] w-full items-center rounded-2xl border border-input bg-card px-3 py-2 cursor-pointer shadow-input hover:border-input-hover focus-within:border-ring focus-within:outline-hidden",
                disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              <div className="flex flex-wrap gap-1.5">
                {selected.length > 0 || partiallySelected.length > 0 ? (
                  <>
                    {/* Fully selected tags */}
                    {selected.map((value) => {
                      const option = options.find((opt) => opt.value === value);
                      return option ? (
                        <Badge key={value} variant="default">
                          {option.label}
                        </Badge>
                      ) : null;
                    })}

                    {/* Partially selected tags */}
                    {partiallySelected.map((value) => {
                      const option = options.find((opt) => opt.value === value);
                      return option ? (
                        <Badge
                          key={value}
                          variant="default"
                          className="opacity-50"
                        >
                          {option.label}
                        </Badge>
                      ) : null;
                    })}

                    <span className="h-6 flex items-center text-muted-foreground cursor-pointer">
                      <PlusLargeIcon className="size-4" />
                    </span>
                  </>
                ) : (
                  <span className="flex items-center text-sm text-muted-foreground">
                    <TagIcon className="size-4 mr-2" />
                    Add tag
                  </span>
                )}
              </div>
            </div>
          </div>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Anchor />

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            side="bottom"
            className="popover-content relative z-110 max-h-[250px] min-w-32 translate-y-1 overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-soft animate-in fade-in-80"
            asChild
            onOpenAutoFocus={(event) => event.preventDefault()}
            onInteractOutside={(event) => {
              const target = event.target as Element | null;
              const isCombobox = target === containerRef.current;
              const inListbox = target && listboxRef.current?.contains(target);
              if (isCombobox || inListbox) {
                event.preventDefault();
              }
            }}
          >
            <div className="absolute left-0 right-0 z-50 mt-1">
              <Command>
                <CommandInput
                  disabled={disabled}
                  ref={inputRef}
                  placeholder={placeholder}
                  value={inputValue}
                  onValueChange={setInputValue}
                  onKeyDown={handleInputKeyDown}
                  className="h-9"
                  autoFocus
                />

                <CommandEmpty>
                  {!inputValue && "No results found."}
                </CommandEmpty>

                <CommandGroup className="max-h-60 overflow-auto">
                  {options
                    .filter((option) =>
                      option.label
                        .toLowerCase()
                        .includes(inputValue.toLowerCase()),
                    )
                    .map((option) => {
                      const isFullySelected = selected.includes(option.value);
                      const isPartiallySelected = partiallySelected.includes(
                        option.value,
                      );

                      return (
                        <CommandItem
                          key={option.value}
                          onSelect={() => {
                            // Toggle selection based on current state
                            onChange(option.value, isFullySelected);
                          }}
                          className="flex items-center py-1.5 px-2 cursor-pointer"
                        >
                          <div className="flex items-center w-full">
                            <div className="flex items-center mr-2">
                              <Checkbox
                                checked={
                                  isPartiallySelected
                                    ? "indeterminate"
                                    : isFullySelected
                                }
                              />
                            </div>

                            <span>{option.label}</span>
                          </div>
                        </CommandItem>
                      );
                    })}
                </CommandGroup>

                {inputValue && onCreateOption && !hasExactMatch && (
                  <div className="mx-2">
                    <CommandSeparator />
                    <Button
                      disabled={disabled}
                      type="button"
                      size="xs"
                      className="w-full my-2"
                      onClick={() => {
                        onCreateOption(inputValue);
                        setInputValue("");
                      }}
                      variant="secondary"
                    >
                      <span>Create tag: "{inputValue}"</span>
                    </Button>
                  </div>
                )}
              </Command>
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </div>
    </PopoverPrimitive.Root>
  );
}
