"use client";

import { UseMultipleSelectionStateChange } from "downshift";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm, useController } from "react-hook-form";

import { FormControl } from "@/registry/default/ui/form-control";
import {
  MultiCombobox,
  MultiComboboxOption,
  OnMultiChangeParams,
} from "@/registry/default/ui/multi-combobox";

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
  {
    id: "vue",
    label: "Vue",
  },
  {
    id: "react",
    label: "React",
  },
  {
    id: "angular",
    label: "Angular",
  },
];

interface MultiComboboxFieldProps {
  name: string;
  label?: ReactNode;
  caption?: ReactNode;
  control: any;
  ariaLabel?: string;
  className?: string;
  placeholder?: string;
  options: MultiComboboxOption[];
  isLoading?: boolean;
  values?: MultiComboboxOption[] | undefined;
  onChange?: OnMultiChangeParams;
  onInputChange?: (value: string) => void;
  clearable?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  error?: boolean;
  positive?: boolean;
  startOpen?: boolean;
  autoFocus?: boolean;
  maxDropdownHeight?: number;
  labelClassName?: string;
  create?: boolean;
}

const MultiComboboxField = ({
  name,
  label,
  caption,
  options,
  control,
  onInputChange,
  onChange,
  ...props
}: MultiComboboxFieldProps) => {
  const [items, setItems] = useState<MultiComboboxOption[]>(options);
  const { field, fieldState } = useController({ name, control });
  const hasError = fieldState.error;
  const multiComboboxRef = useRef<{ clearInput: () => void }>(null);

  const handleInputChange = useCallback(
    (value: string) => {
      const lowerCasedInputValue = (value || "").toLowerCase();
      setItems(
        (options || []).filter(
          (option) =>
            !value ||
            (option.label || "").toLowerCase().includes(lowerCasedInputValue),
        ),
      );

      if (onInputChange) {
        onInputChange(value);
      }
    },
    [options, onInputChange],
  );

  const handleChange = useCallback(
    (changes: UseMultipleSelectionStateChange<MultiComboboxOption>) => {
      field.onBlur();
      field.onChange(
        changes?.selectedItems
          ? changes.selectedItems.map((item) => item.id)
          : null,
      );
      onChange?.(changes);
      multiComboboxRef?.current?.clearInput();
    },
    [field, onChange],
  );

  useEffect(() => {
    setItems(options);
  }, [options]);

  const getSelectValues = useCallback(
    (
      fieldValue: any,
      options: MultiComboboxOption[],
    ): MultiComboboxOption[] | undefined => {
      if (!fieldValue) return undefined;

      // Convert to array if not already
      const valueArray = Array.isArray(fieldValue) ? fieldValue : [fieldValue];
      if (valueArray.length === 0) return undefined;

      return valueArray.map((value) => {
        // Check if the value exists in options
        const existingOption = options.find(
          (option) => option && option.id === value,
        );
        if (existingOption) {
          return existingOption;
        }
        // If not found in options, create a new option
        return {
          id: value,
          label: String(value),
        };
      });
    },
    [],
  );

  const values = getSelectValues(field.value, options);

  return (
    <FormControl
      label={label}
      caption={caption}
      error={hasError ? fieldState.error?.message : null}
      name={name}
    >
      <MultiCombobox
        ref={multiComboboxRef}
        {...props}
        id={name}
        options={items}
        values={values}
        onInputChange={(value) => handleInputChange(value)}
        onChange={handleChange}
      />
    </FormControl>
  );
};

export default function MultiComboboxDemo() {
  const { control } = useForm({
    defaultValues: {
      frameworks: [],
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <MultiComboboxField
        name="frameworks"
        label="Select Frameworks"
        caption="Choose one or more frameworks"
        options={frameworks}
        control={control}
        placeholder="Select frameworks..."
      />

      <div className="text-sm text-muted-foreground">
        Multi-select combobox with form integration using react-hook-form
      </div>
    </div>
  );
}
