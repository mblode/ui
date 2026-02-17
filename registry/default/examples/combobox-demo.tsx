"use client";

import { UseComboboxStateChange } from "downshift";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { useForm, useController } from "react-hook-form";

import { Combobox, ComboboxOption, OnChangeParams } from "../ui/combobox";
import { FormControl } from "../ui/form-control";

// Mock translation function for demo purposes
const useTranslation = () => ({ t: (key: string) => key });

const frameworks = [
  {
    id: "next.js",
    label: "Next.js",
  },
  {
    id: "sveltekit",
    label: "SvelteKit",
  },
  {
    id: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    id: "remix",
    label: "Remix",
  },
  {
    id: "astro",
    label: "Astro",
  },
];

interface ComboboxFieldProps {
  name: string;
  label?: ReactNode;
  caption?: ReactNode;
  control: any;
  ariaLabel?: string;
  className?: string;
  placeholder?: string;
  options: ComboboxOption[];
  isLoading?: boolean;
  value?: ComboboxOption | undefined;
  onChange?: OnChangeParams;
  onInputChange?: OnChangeParams;
  clearable?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  error?: boolean;
  positive?: boolean;
  startOpen?: boolean;
  autoFocus?: boolean;
  maxDropdownHeight?: number;
  labelClassName?: string;
}

const ComboboxField = ({
  name,
  label,
  caption,
  options,
  control,
  onInputChange,
  onChange,
  ...props
}: ComboboxFieldProps) => {
  const [items, setItems] = useState<ComboboxOption[]>(options);
  const { field, fieldState } = useController({ name, control });
  const hasError = fieldState.error;

  const handleInputChange = useCallback(
    (input: UseComboboxStateChange<ComboboxOption>) => {
      const lowerCasedInputValue = (input?.inputValue || "").toLowerCase();

      setItems(
        (options || []).filter(
          (option) =>
            !input?.inputValue ||
            (option.label || "").toLowerCase().includes(lowerCasedInputValue),
        ),
      );
    },
    [options],
  );

  const handleClear = useCallback(() => {
    setItems(options);
  }, [options]);

  useEffect(() => {
    setItems(options);
  }, [options]);

  const getSelectValue = useCallback(
    (
      fieldValue: string | number,
      options: ComboboxOption[],
    ): ComboboxOption | undefined => {
      if (!fieldValue) return undefined;

      // value exists in options, render the option itself
      const existingOption = options.find(
        (option) => option && option.id === fieldValue,
      );

      if (existingOption) {
        return existingOption;
      }

      return {
        id: fieldValue,
        label: String(fieldValue),
      };
    },
    [],
  );

  const value = getSelectValue(field.value, options);

  return (
    <FormControl
      label={label}
      caption={caption}
      error={hasError ? fieldState.error?.message : null}
      name={name}
    >
      <Combobox
        {...field}
        {...props}
        id={name}
        options={items}
        value={value}
        onClear={handleClear}
        onInputChange={onInputChange ? onInputChange : handleInputChange}
        onChange={(input) => {
          field.onBlur();
          field.onChange(input?.selectedItem ? input.selectedItem.id : null);
          onChange?.(input);
        }}
      />
    </FormControl>
  );
};

export default function ComboboxDemo() {
  const { control } = useForm({
    defaultValues: {
      framework: "",
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <ComboboxField
        name="framework"
        label="Select Framework"
        caption="Choose your preferred framework"
        options={frameworks}
        control={control}
        placeholder="Select a framework..."
        clearable
      />

      <div className="text-sm text-muted-foreground">
        Simple combobox with form integration using react-hook-form
      </div>
    </div>
  );
}
