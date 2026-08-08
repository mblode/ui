import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  extends: [ultracite],
  // public/design.md is generated from DESIGN.md by scripts/build-design-md.mjs.
  // The provenance comment sits above the `---`, so oxfmt reads the file as
  // plain Markdown, strips the indentation out of the YAML front matter and
  // breaks it for anyone parsing the published artifact. Leave generated
  // output alone; format the source instead.
  ignorePatterns: ["public/design.md"],
});
