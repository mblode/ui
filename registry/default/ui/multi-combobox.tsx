"use client";

import { ChevronDownIcon, CrossSmallIcon } from "blode-icons-react";
import {
  type UseMultipleSelectionStateChange,
  useCombobox,
  useMultipleSelection,
} from "downshift";
import snakeCase from "lodash/snakeCase";
import uniqBy from "lodash/uniqBy";
import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/registry/default/ui/popover";

import { Badge, type BadgeProps } from "./badge";

export interface MultiComboboxOption {
  description?: string;
  id?: string | number;
  label?: string;
  variant?: BadgeProps["variant"];
}

export type OnMultiChangeParams = (
  changes: UseMultipleSelectionStateChange<MultiComboboxOption>
) => void;

export interface MultiComboboxProps {
  create?: boolean;
  disabled?: boolean;
  id?: string;
  inputClassName?: string;
  maxDropdownHeight?: number;
  onChange?: OnMultiChangeParams;
  onInputChange?: (value: string) => void;
  options: MultiComboboxOption[];
  placeholder?: string;
  startOpen?: boolean;
  values?: MultiComboboxOption[];
}

export interface MultiComboboxRef {
  clearInput: () => void;
}

const getFilteredOptions = (
  options: MultiComboboxOption[],
  selectedItems: MultiComboboxOption[],
  inputValue: string
) => {
  const lowerCasedInputValue = inputValue.toLowerCase();

  return options.filter((option) => {
    return (
      !selectedItems.find(({ id }) => id === option.id) &&
      (option.label || "").toLowerCase().includes(lowerCasedInputValue)
    );
  });
};

const MultiCombobox = React.forwardRef<MultiComboboxRef, MultiComboboxProps>(
  (
    {
      options,
      values,
      onChange,
      onInputChange,
      startOpen,
      placeholder = "Filter",
      create = false,
      id,
      inputClassName,
      disabled = false,
      maxDropdownHeight = 250,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState("");
    const [selectedItems, setSelectedItems] = React.useState(values ?? []);

    React.useEffect(() => {
      setSelectedItems(values ?? []);
    }, [values]);

    const items = React.useMemo(
      () => getFilteredOptions(options, selectedItems, inputValue),
      [options, selectedItems, inputValue]
    );

    const {
      getSelectedItemProps,
      getDropdownProps,
      removeSelectedItem,
      addSelectedItem,
    } = useMultipleSelection({
      selectedItems,
      onStateChange(changes) {
        const uniqueItems = uniqBy(changes.selectedItems ?? [], ({ id }) => id);

        switch (changes.type) {
          case useMultipleSelection.stateChangeTypes
            .SelectedItemKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
          case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          case useMultipleSelection.stateChangeTypes.FunctionAddSelectedItem:
            setSelectedItems(uniqueItems);
            break;
          default:
            break;
        }

        onChange?.({
          ...changes,
          selectedItems: uniqueItems,
        });
      },
    });

    const {
      isOpen,
      getToggleButtonProps,
      getMenuProps,
      getInputProps,
      highlightedIndex,
      getItemProps,
      setInputValue: comboboxSetInputValue,
    } = useCombobox({
      labelId: id,
      items,
      itemToString(item) {
        return item?.label || "";
      },
      defaultHighlightedIndex: 0,
      selectedItem: null,
      initialIsOpen: startOpen,
      onStateChange(changes) {
        switch (changes.type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
            if (changes.selectedItem) {
              addSelectedItem(changes.selectedItem);
            }
            setInputValue("");
            comboboxSetInputValue("");
            break;
          case useCombobox.stateChangeTypes.InputChange: {
            const nextValue = changes.inputValue ?? "";
            setInputValue(nextValue);
            onInputChange?.(nextValue);
            break;
          }
          default:
            break;
        }
      },
    });

    const clearInput = React.useCallback(() => {
      setInputValue("");
      comboboxSetInputValue("");
    }, [comboboxSetInputValue]);

    React.useImperativeHandle(
      ref,
      () => ({
        clearInput,
      }),
      [clearInput]
    );

    const handleCreate = () => {
      const normalizedInput = inputValue.trim();
      if (!normalizedInput) {
        return;
      }

      addSelectedItem({
        id: snakeCase(normalizedInput),
        label: normalizedInput,
      });

      clearInput();
    };

    const shouldCreate = create && inputValue.trim().length > 0;

    return (
      <Popover defaultOpen={startOpen} open={isOpen}>
        <PopoverAnchor asChild>
          <div
            className={cn(
              "flex min-h-[52px] grow appearance-none rounded-2xl border border-input bg-card bg-clip-border text-base shadow-input focus-within:border-ring focus-within:outline-hidden hover:border-input-hover",
              inputClassName
            )}
          >
            <button
              aria-label="toggle menu"
              className="relative flex grow cursor-pointer bg-none px-3"
              disabled={disabled}
              type="button"
              {...getToggleButtonProps()}
            >
              <span className="flex min-h-[52px] grow flex-wrap items-center gap-2 bg-transparent py-1">
                {selectedItems.map((selectedItem, index) => (
                  <Badge
                    key={`${selectedItem.id}-${index}`}
                    {...getSelectedItemProps({
                      selectedItem,
                      index,
                    })}
                    variant={selectedItem.variant}
                  >
                    {selectedItem.label}
                    <span
                      aria-label={`Remove ${selectedItem.label ?? "item"}`}
                      className="cursor-pointer pl-1"
                      onClick={(event) => {
                        event.stopPropagation();
                        removeSelectedItem(selectedItem);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          event.stopPropagation();
                          removeSelectedItem(selectedItem);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <CrossSmallIcon className="size-3.5" />
                    </span>
                  </Badge>
                ))}
                <input
                  className="grow border-none bg-transparent outline-none placeholder:text-placeholder-foreground"
                  data-testid="multi-combobox-input"
                  disabled={disabled}
                  placeholder={selectedItems.length === 0 ? placeholder : ""}
                  {...getInputProps(
                    getDropdownProps({ preventKeyAction: isOpen, id })
                  )}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                />
              </span>
              <div className="flex h-full items-center">
                <ChevronDownIcon
                  className="size-4 opacity-50"
                  color="currentColor"
                />
              </div>
            </button>
          </div>
        </PopoverAnchor>

        <PopoverContent
          align="start"
          asChild
          className="popover-content fade-in-80 relative z-110 w-auto min-w-32 translate-y-1 animate-in overflow-hidden rounded-xl border border-border bg-popover p-0 text-popover-foreground shadow-soft"
          onOpenAutoFocus={(event) => event.preventDefault()}
          sideOffset={0}
        >
          <div
            className="w-full overflow-y-auto p-1"
            style={{ maxHeight: maxDropdownHeight }}
            {...getMenuProps({}, { suppressRefError: true })}
          >
            {shouldCreate ? (
              <button
                className="w-full cursor-pointer px-4 py-2 text-left"
                onClick={handleCreate}
                type="button"
              >
                Create {inputValue}
              </button>
            ) : null}

            {isOpen &&
              items.map((item, index) => (
                <div
                  className={cn("cursor-pointer rounded-lg px-4 py-2", {
                    "bg-accent text-accent-foreground":
                      highlightedIndex === index,
                  })}
                  key={`${item.id}-${index}`}
                  {...getItemProps({ item, index })}
                >
                  {item.label}
                </div>
              ))}

            {items.length === 0 ? (
              <div className="cursor-not-allowed px-4 py-3 text-center">
                <div className="text-muted-foreground">No results</div>
              </div>
            ) : null}
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiCombobox.displayName = "MultiCombobox";

export { MultiCombobox };
