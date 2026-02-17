"use client";

import type { UseMultipleSelectionStateChange } from "downshift";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { type Control, useController, useForm } from "react-hook-form";

import {
  MultiCombobox,
  type MultiComboboxOption,
  type MultiComboboxRef,
  type OnMultiChangeParams,
} from "@/registry/default/ui/multi-combobox";

const frameworks: MultiComboboxOption[] = [
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

interface MultiComboboxFormValues {
  frameworks: string[];
}

interface MultiComboboxFieldProps {
  caption?: ReactNode;
  control: Control<MultiComboboxFormValues>;
  create?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  name: "frameworks";
  onChange?: OnMultiChangeParams;
  onInputChange?: (value: string) => void;
  options: MultiComboboxOption[];
  placeholder?: string;
  startOpen?: boolean;
  values?: MultiComboboxOption[] | undefined;
}

function MultiComboboxField({
  name,
  label,
  caption,
  options,
  control,
  onInputChange,
  onChange,
  ...props
}: MultiComboboxFieldProps) {
  const [items, setItems] = useState<MultiComboboxOption[]>(options);
  const { field, fieldState } = useController({
    control,
    name,
  });
  const multiComboboxRef = useRef<MultiComboboxRef>(null);

  const handleInputChange = useCallback(
    (value: string) => {
      const lowerCasedInputValue = value.toLowerCase();
      setItems(
        options.filter(
          (option) =>
            !value ||
            (option.label || "").toLowerCase().includes(lowerCasedInputValue)
        )
      );

      onInputChange?.(value);
    },
    [options, onInputChange]
  );

  const handleChange = useCallback(
    (changes: UseMultipleSelectionStateChange<MultiComboboxOption>) => {
      field.onBlur();
      field.onChange(
        (changes.selectedItems ?? [])
          .map((item) => item.id)
          .filter((item): item is string => typeof item === "string")
      );
      onChange?.(changes);
      multiComboboxRef.current?.clearInput();
    },
    [field, onChange]
  );

  useEffect(() => {
    setItems(options);
  }, [options]);

  const values = useMemo(() => {
    const fieldValues = field.value ?? [];

    if (!Array.isArray(fieldValues) || fieldValues.length === 0) {
      return undefined;
    }

    return fieldValues.map((value) => {
      const existingOption = options.find((option) => option.id === value);

      if (existingOption) {
        return existingOption;
      }

      return {
        id: value,
        label: String(value),
      };
    });
  }, [field.value, options]);

  return (
    <div className="space-y-2">
      {label ? <p className="font-medium text-sm">{label}</p> : null}
      <MultiCombobox
        ref={multiComboboxRef}
        {...props}
        id={name}
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={items}
        values={values}
      />
      {caption ? (
        <p className="text-muted-foreground text-sm">{caption}</p>
      ) : null}
      {fieldState.error?.message ? (
        <p className="text-destructive text-sm">{fieldState.error.message}</p>
      ) : null}
    </div>
  );
}

export default function MultiComboboxDemo() {
  const { control } = useForm<MultiComboboxFormValues>({
    defaultValues: {
      frameworks: [],
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <MultiComboboxField
        caption="Choose one or more frameworks"
        control={control}
        label="Select Frameworks"
        name="frameworks"
        options={frameworks}
        placeholder="Select frameworks..."
      />

      <div className="text-muted-foreground text-sm">
        Multi-select combobox with form integration using react-hook-form.
      </div>
    </div>
  );
}
