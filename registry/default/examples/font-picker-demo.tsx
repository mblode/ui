"use client";

import { useState } from "react";

import { basePath } from "@/config/site";

import { Field, FieldDescription, FieldLabel } from "@/registry/default/ui/field";
import { FontPicker } from "@/registry/default/ui/font-picker";

/**
 * This site's own proxy for the Google Fonts Developer API: it holds the key
 * server-side and caches the catalogue at the edge.
 *
 * `endpoint` is resolved as a plain URL rather than through the router, so this
 * site's `basePath` has to be part of it — hence the prefix, read from the same
 * constant `next.config.ts` uses rather than written out again. An app without
 * a basePath just passes "/api/google-fonts"; see the docs for the handler.
 */
export const FontPickerDemo = () => {
  const [family, setFamily] = useState("Playfair Display");

  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="font-picker-demo">Heading font</FieldLabel>
      <FontPicker
        endpoint={`${basePath}/api/google-fonts`}
        id="font-picker-demo"
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
