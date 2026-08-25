"use client";

import { MagnifyingGlassIcon } from "blode-icons-react";
import { useState } from "react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/registry/default/ui/item";
import { SearchInput } from "@/registry/default/ui/search-input";

const TEAMMATES = [
  { email: "ada@example.com", id: "ada", name: "Ada Lovelace", role: "Engineering" },
  { email: "grace@example.com", id: "grace", name: "Grace Hopper", role: "Engineering" },
  { email: "katherine@example.com", id: "katherine", name: "Katherine Johnson", role: "Research" },
  { email: "mary@example.com", id: "mary", name: "Mary Jackson", role: "Operations" },
];

export const SearchInputWithResults = () => {
  const [query, setQuery] = useState("");

  const normalised = query.trim().toLowerCase();
  const results = normalised
    ? TEAMMATES.filter(
        (teammate) =>
          teammate.name.toLowerCase().includes(normalised) ||
          teammate.role.toLowerCase().includes(normalised),
      )
    : TEAMMATES;

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <SearchInput onValueChange={setQuery} placeholder="Search teammates" value={query} />

      <output aria-live="polite" className="sr-only">
        {results.length} of {TEAMMATES.length} teammates match.
      </output>

      {results.length > 0 ? (
        <ul className="flex flex-col gap-1">
          {results.map((teammate) => (
            <li key={teammate.id}>
              <Item>
                <ItemContent>
                  <ItemTitle>{teammate.name}</ItemTitle>
                  <ItemDescription>
                    {teammate.role} · {teammate.email}
                  </ItemDescription>
                </ItemContent>
              </Item>
            </li>
          ))}
        </ul>
      ) : (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MagnifyingGlassIcon />
            </EmptyMedia>
            <EmptyTitle>No teammates found</EmptyTitle>
            <EmptyDescription>
              Nothing matches &ldquo;{query.trim()}&rdquo;. Try a name or a team.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </div>
  );
};
