"use client";

import {
  CheckIcon,
  ChevronGrabberVerticalIcon,
  CircleXFilledIcon,
} from "blode-icons-react";
import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Input, type InputProps } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea } from "./scroll-area";

interface CountrySelectOption {
  label: string;
  value?: RPNInput.Country;
}

interface CountrySelectProps {
  disabled?: boolean;
  onChange: (value?: RPNInput.Country) => void;
  options: CountrySelectOption[];
  value?: RPNInput.Country;
}

export type PhoneInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    clearable?: boolean;
    clearClassName?: string;
    fallbackCountry?: RPNInput.Country;
    onChange?: (value: RPNInput.Value | "") => void;
    onClear?: () => void;
  };

const PhoneInput = React.forwardRef<
  React.ComponentRef<typeof RPNInput.default>,
  PhoneInputProps
>(
  (
    {
      className,
      clearClassName,
      clearable,
      defaultCountry,
      fallbackCountry = "US",
      onChange,
      onClear,
      placeholder = "Enter phone number",
      ...props
    },
    ref
  ) => {
    const hasValue = Boolean(props.value);

    const handleChange = React.useCallback(
      (value?: RPNInput.Value) => {
        onChange?.(value ?? "");
      },
      [onChange]
    );

    const handleClear = React.useCallback(() => {
      onClear?.();

      if (!onClear) {
        onChange?.("");
      }
    }, [onClear, onChange]);

    return (
      <div className="relative">
        <RPNInput.default
          className="flex"
          countrySelectComponent={CountrySelect}
          defaultCountry={defaultCountry ?? fallbackCountry}
          flagComponent={FlagComponent}
          inputClassName={className}
          inputComponent={InputComponent}
          onChange={handleChange}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />

        {clearable && hasValue ? (
          <div className="absolute top-0 right-0 flex flex-row gap-1 pr-3">
            <button
              aria-label="clear input"
              className={cn(
                "flex h-[52px] cursor-pointer items-center justify-center p-0! text-muted-foreground",
                clearClassName
              )}
              onClick={handleClear}
              tabIndex={-1}
              type="button"
            >
              <CircleXFilledIcon className="size-5 text-muted-foreground/50" />
            </button>
          </div>
        ) : null}
      </div>
    );
  }
);
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
  HTMLInputElement,
  InputProps & { inputClassName?: string }
>(({ className, inputClassName, ...props }, ref) => {
  return (
    <Input
      className={cn("rounded-s-none!", className, inputClassName)}
      ref={ref}
      {...props}
    />
  );
});
InputComponent.displayName = "InputComponent";

function CountrySelect({
  disabled,
  onChange,
  options,
  value,
}: CountrySelectProps) {
  const selectedCountryLabel =
    options.find((option) => option.value === value)?.label ?? "Select country";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label={selectedCountryLabel}
          className="phone-input-country-select-button flex h-[52px] gap-1 rounded-s-2xl shadow-input! rounded-e-none! border-r-0 px-3"
          disabled={disabled}
          type="button"
          variant="outline"
        >
          <FlagComponent country={value} countryName={selectedCountryLabel} />
          <ChevronGrabberVerticalIcon
            className={cn(
              "-mr-2 h-4 w-4 opacity-50",
              disabled ? "hidden" : "opacity-100"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandList>
            <ScrollArea
              className="h-72"
              onWheel={(event) => event.stopPropagation()}
            >
              <CommandInput placeholder="Search country..." />
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  if (!option.value) {
                    return null;
                  }

                  return (
                    <CommandItem
                      className="gap-2"
                      key={option.value}
                      onSelect={() => onChange(option.value)}
                    >
                      <FlagComponent
                        country={option.value}
                        countryName={option.label}
                      />
                      <span className="flex-1 text-sm">{option.label}</span>
                      <span className="text-foreground/50 text-sm">
                        +{RPNInput.getCountryCallingCode(option.value)}
                      </span>
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          option.value === value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function FlagComponent({
  country,
  countryName,
}: {
  country?: RPNInput.Country;
  countryName: string;
}) {
  const Flag = country ? flags[country] : undefined;

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-xs bg-foreground/20 [&_svg]:size-full!">
      {Flag ? <Flag title={countryName} /> : null}
    </span>
  );
}

export { PhoneInput };
