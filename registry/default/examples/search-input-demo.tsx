"use client";

import { useState } from "react";

import { SearchInput } from "@/registry/default/ui/search-input";

export const SearchInputDemo = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full max-w-sm">
      <SearchInput onValueChange={setQuery} placeholder="Search invoices" value={query} />
    </div>
  );
};
