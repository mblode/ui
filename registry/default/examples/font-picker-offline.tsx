"use client";

import { useState } from "react";

import type { GoogleFont } from "@/registry/default/lib/google-fonts";
import { Field, FieldDescription, FieldLabel } from "@/registry/default/ui/field";
import { FontPicker } from "@/registry/default/ui/font-picker";

// `fonts` skips the network entirely, so this picker needs no key, no proxy,
// and no connection.
const SAMPLE_FONTS: GoogleFont[] = [
  { category: "sans-serif", family: "Inter", subsets: ["latin"], variants: ["regular"] },
  { category: "sans-serif", family: "Roboto", subsets: ["latin"], variants: ["regular"] },
  { category: "sans-serif", family: "Open Sans", subsets: ["latin"], variants: ["regular"] },
  { category: "sans-serif", family: "Work Sans", subsets: ["latin"], variants: ["regular"] },
  { category: "serif", family: "Playfair Display", subsets: ["latin"], variants: ["regular"] },
  { category: "serif", family: "Merriweather", subsets: ["latin"], variants: ["regular"] },
  { category: "serif", family: "Lora", subsets: ["latin"], variants: ["regular"] },
  { category: "display", family: "Bebas Neue", subsets: ["latin"], variants: ["regular"] },
  { category: "display", family: "Abril Fatface", subsets: ["latin"], variants: ["regular"] },
  { category: "handwriting", family: "Caveat", subsets: ["latin"], variants: ["regular"] },
  { category: "monospace", family: "JetBrains Mono", subsets: ["latin"], variants: ["regular"] },
  { category: "monospace", family: "IBM Plex Mono", subsets: ["latin"], variants: ["regular"] },
];

export const FontPickerOffline = () => {
  const [family, setFamily] = useState("Bebas Neue");

  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="font-picker-offline">Display font</FieldLabel>
      <FontPicker
        fonts={SAMPLE_FONTS}
        id="font-picker-offline"
        onValueChange={setFamily}
        value={family}
      />
      <FieldDescription>
        <span style={{ fontFamily: `"${family}", var(--font-sans, ui-sans-serif), sans-serif` }}>
          The quick brown fox jumps over the lazy dog.
        </span>
      </FieldDescription>
    </Field>
  );
};
