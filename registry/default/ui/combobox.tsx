"use client";

import { ChevronDownIcon } from "blode-icons-react";
import { type UseComboboxStateChange, useCombobox } from "downshift";
import {
  forwardRef,
  type ReactNode,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";

import { cn } from "@/lib/utils";
import { Input, type InputProps } from "@/registry/default/ui/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/registry/default/ui/popover";

export interface ComboboxOption {
  description?: string;
  id?: string | number;
  label?: string;
}

export type OnChangeParams =
  | ((changes: UseComboboxStateChange<ComboboxOption>) => void)
  | undefined;

export interface ComboboxProps extends Omit<InputProps, "value" | "onChange"> {
  children?: ReactNode;
  clearable?: boolean;
  clearInputValue?: () => void;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  noResults?: ReactNode;
  onChange?: OnChangeParams;
  onInputChange?: OnChangeParams;
  options: ComboboxOption[] | undefined;
  startOpen?: boolean;
  value?: ComboboxOption | undefined;
}

export interface ComboboxRef {
  clearInput: () => void;
  closeMenu: () => void;
  focus: () => void;
  inputValue: string;
  selectItem: (option: ComboboxOption) => void;
}

export const Combobox = forwardRef<ComboboxRef, ComboboxProps>(
  (
    {
      options,
      value,
      onChange,
      onInputChange,
      startOpen = false,
      onClear,
      leftIcon,
      clearable = false,
      noResults,
      children,
      ...inputProps
    },
    ref
  ) => {
    const {
      isOpen,
      getInputProps,
      getMenuProps,
      highlightedIndex,
      getItemProps,
      selectItem,
      inputValue,
      setInputValue,
      closeMenu,
    } = useCombobox({
      items: options || [],
      itemToString: (item: ComboboxOption | null) => item?.label || "",
      initialSelectedItem: value,
      onInputValueChange: onInputChange,
      onSelectedItemChange: onChange,
      initialIsOpen: startOpen,
      defaultHighlightedIndex: 0,
    });

    const comboboxRef = useRef<HTMLInputElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);

    const clearInput = useCallback(() => {
      setInputValue("");
      onClear?.();
    }, [onClear, setInputValue]);

    useImperativeHandle(
      ref,
      () => ({
        clearInput,
        closeMenu,
        selectItem,
        inputValue,
        focus: () => {
          comboboxRef.current?.focus();
        },
      }),
      [clearInput, closeMenu, inputValue, selectItem]
    );

    return (
      <Popover defaultOpen={startOpen} open={isOpen}>
        <PopoverAnchor asChild>
          <div className="relative w-full">
            <Input
              className={cn({
                "pl-10": !!leftIcon,
              })}
              clearable={clearable}
              onClear={() => {
                selectItem({});
                onClear?.();
              }}
              ref={comboboxRef}
              {...getInputProps({}, { suppressRefError: true })}
              {...inputProps}
            />

            <div className="absolute top-4.5 right-3">
              {((clearable && inputValue.length === 0) || !clearable) && (
                <ChevronDownIcon className="size-4 opacity-50" />
              )}
            </div>

            <div className="absolute top-4 left-3">{leftIcon}</div>
          </div>
        </PopoverAnchor>

        <PopoverContent
          align="start"
          asChild
          className="popover-content fade-in-80 relative z-110 max-h-[250px] w-auto min-w-32 translate-y-1 animate-in overflow-hidden rounded-xl border border-border bg-popover p-0 text-popover-foreground shadow-soft"
          onInteractOutside={(event) => {
            const target = event.target as Element | null;
            const isCombobox = target === comboboxRef.current;
            const inListbox = target && listboxRef.current?.contains(target);

            if (isCombobox || inListbox) {
              event.preventDefault();
            }
          }}
          onOpenAutoFocus={(event) => event.preventDefault()}
          sideOffset={0}
        >
          <div
            className="w-full overflow-y-auto p-1"
            ref={listboxRef}
            {...getMenuProps({}, { suppressRefError: true })}
          >
            {children}

            {(options || []).map((item, index) => {
              const escapeRegExp = (string: string) => {
                return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
              };

              const labelParts = item.label?.split(
                new RegExp(`(${escapeRegExp(inputValue)})`, "gi")
              );

              return (
                <div
                  className={cn("cursor-pointer rounded-lg px-4 py-2", {
                    "bg-accent text-accent-foreground":
                      highlightedIndex === index,
                  })}
                  key={`${item.id}${index}`}
                  {...getItemProps({
                    item,
                    index,
                  })}
                >
                  <div>
                    {labelParts?.map((part, i) =>
                      part.toLowerCase() === inputValue.toLowerCase() ? (
                        <strong key={i}>{part}</strong>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </div>

                  {item.description && (
                    <div className="text-muted-foreground text-sm">
                      {item.description}
                    </div>
                  )}
                </div>
              );
            })}

            {(options || []).length === 0 &&
              (noResults ? (
                noResults
              ) : (
                <div className="cursor-not-allowed px-4 py-3 text-center">
                  <div className="text-muted-foreground">No results</div>
                </div>
              ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);

Combobox.displayName = "Combobox";
