"use client";

import { useState } from "react";

import { SearchInput } from "@/registry/default/ui/search-input";

// Hoisted so the array identity is stable across renders.
const PLACEHOLDERS = [
  "Search invoices",
  "Search customers",
  "Search subscriptions",
  "Search payouts",
];

export const SearchInputCycling = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full max-w-sm">
      <SearchInput
        onValueChange={setQuery}
        placeholder="Search your workspace"
        placeholders={PLACEHOLDERS}
        value={query}
      />
    </div>
  );
};
