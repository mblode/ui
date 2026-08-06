// Publishes DESIGN.md at `${basePath}/design.md`.
//
// Copied into `public/` rather than served from a route handler that reads the
// repo root at request time. Under Cache Components a GET handler runs at
// request time by default, and a runtime `fs` read of a file outside the app
// directory is exactly the kind of thing Vercel's output tracing drops, which
// would fail in production while passing locally. A static asset is traced
// because it is already build output.
//
// DESIGN.md at the repo root stays the single source of truth; this file is
// generated, and `npm run build` regenerates it.
//
// Zero dependencies, Node built-ins only, matching build-well-known-skills.mjs.

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const APP_ROOT = path.join(import.meta.dirname, "..");
const SOURCE = path.join(APP_ROOT, "DESIGN.md");
const OUTPUT = path.join(APP_ROOT, "public", "design.md");

try {
  const source = readFileSync(SOURCE, "utf-8");

  // A bare copy would drift silently if someone edited the generated file, so
  // stamp the provenance in a comment the Markdown renderer will not show.
  const banner =
    "<!-- Generated from DESIGN.md by scripts/build-design-md.mjs. Edit the source, not this file. -->\n";
  writeFileSync(OUTPUT, banner + source);

  const lines = source.split("\n").length;
  console.log(`📐 Published design.md (${lines} lines) -> public/design.md`);
} catch (error) {
  console.error("Failed to publish DESIGN.md:", error);
  process.exit(1);
}
