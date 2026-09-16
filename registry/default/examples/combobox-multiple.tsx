"use client";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
} from "@/registry/default/ui/combobox";

const languages = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Rust",
  "Go",
  "Swift",
  "Ruby",
  "Elixir",
] as const;

export default function ComboboxMultiple() {
  return (
    <Combobox items={languages} multiple={true}>
      <ComboboxChips className="w-72" placeholder="Select languages">
        {(value: string[]) =>
          value.map((language) => (
            <ComboboxChip aria-label={language} key={language}>
              {language}
            </ComboboxChip>
          ))
        }
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxEmpty>No languages found.</ComboboxEmpty>
        <ComboboxList>
          {(language: string) => (
            <ComboboxItem key={language} value={language}>
              {language}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
