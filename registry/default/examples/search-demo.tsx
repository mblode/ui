"use client";

import { useState } from "react";
import { Search } from "@/registry/default/ui/search";

export default function SearchDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Search
        label="Search"
        value={value}
        onSearch={setValue}
        placeholder="Search products..."
        placeholderSuggestions={[
          "Search for products...",
          "Find what you need...",
          "Looking for something specific?",
          "Search our catalog...",
        ]}
      />

      {value && (
        <div className="mt-2 rounded-md border p-4">
          <p className="text-sm">Search term: {value}</p>
        </div>
      )}
    </div>
  );
}
