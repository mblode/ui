"use client";

import { useMemo, useState } from "react";

import { Combobox, type ComboboxOption } from "@/registry/default/ui/combobox";

const frameworks: ComboboxOption[] = [
  {
    id: "next.js",
    label: "Next.js",
    description: "React framework for full-stack web apps.",
  },
  {
    id: "sveltekit",
    label: "SvelteKit",
    description: "Svelte's app framework for routing and SSR.",
  },
  {
    id: "nuxt.js",
    label: "Nuxt.js",
    description: "The Vue framework for universal applications.",
  },
  {
    id: "remix",
    label: "Remix",
    description: "React framework focused on web platform primitives.",
  },
  {
    id: "astro",
    label: "Astro",
    description: "Content-focused framework with island architecture.",
  },
];

export default function ComboboxDemo() {
  const [search, setSearch] = useState("");
  const [selectedFramework, setSelectedFramework] = useState("");

  const options = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return frameworks;
    }

    return frameworks.filter((framework) =>
      (framework.label || "").toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <div className="w-[320px]">
      <Combobox
        aria-label="Framework"
        clearable
        noResults={
          <div className="cursor-not-allowed px-4 py-3 text-center">
            <div className="text-muted-foreground">No framework found.</div>
          </div>
        }
        onChange={({ selectedItem }) => {
          setSelectedFramework(selectedItem?.label ?? "");
        }}
        onClear={() => {
          setSelectedFramework("");
          setSearch("");
        }}
        onInputChange={({ inputValue }) => {
          setSearch(inputValue ?? "");
        }}
        options={options}
        placeholder="Search framework..."
      />

      <p className="mt-2 text-muted-foreground text-sm">
        {selectedFramework
          ? `Selected: ${selectedFramework}`
          : "Select a framework from the list."}
      </p>
    </div>
  );
}
