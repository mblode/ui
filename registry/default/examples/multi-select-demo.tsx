"use client";

import { useState } from "react";
import { MultiSelect } from "@/registry/default/ui/multi-select";

export default function MultiSelectDemo() {
  const [selected, setSelected] = useState<string[]>([]);
  const [partiallySelected, setPartiallySelected] = useState<string[]>([]);

  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "next", label: "Next.js" },
    { value: "nuxt", label: "Nuxt.js" },
    { value: "gatsby", label: "Gatsby" },
    { value: "remix", label: "Remix" },
  ];

  const handleChange = (value: string, remove: boolean) => {
    if (remove) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const handleCreateOption = (value: string) => {
    const newOption = {
      value: value.toLowerCase(),
      label: value,
    };
    options.push(newOption);
    setSelected([...selected, newOption.value]);
  };

  return (
    <MultiSelect
      options={options}
      selected={selected}
      partiallySelected={partiallySelected}
      onChange={handleChange}
      onCreateOption={handleCreateOption}
      placeholder="Select frameworks..."
      label="Frameworks"
    />
  );
}
