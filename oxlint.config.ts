import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";

// Relaxations for the docs site and tooling code. These follow the shadcn/docs
// conventions used across app/, components/, content/, and scripts/.
const relaxed = {
  "consistent-type-imports": "off",
  complexity: "off",
  "func-style": "off",
  "import/first": "off",
  "import/no-named-as-default": "off",
  "jsdoc/check-tag-names": "off",
  "no-await-in-loop": "off",
  "no-empty-function": "off",
  "no-inline-comments": "off",
  "no-negated-condition": "off",
  "no-nested-ternary": "off",
  "unicorn/no-nested-ternary": "off",
  "no-param-reassign": "off",
  "no-plusplus": "off",
  "no-promise-executor-return": "off",
  "no-shadow": "off",
  "no-unused-vars": "off",
  "no-use-before-define": "off",
  "no-warning-comments": "off",
  "prefer-destructuring": "off",
  "prefer-template": "off",
  "promise/avoid-new": "off",
  "promise/prefer-await-to-callbacks": "off",
  "promise/prefer-await-to-then": "off",
  "promise/prefer-catch": "off",
  "require-await": "off",
  "sort-keys": "off",
  "typescript/ban-ts-comment": "off",
  "typescript/no-empty-interface": "off",
  "typescript/no-empty-object-type": "off",
  "unicorn/consistent-function-scoping": "off",
  "unicorn/no-array-for-each": "off",
  "unicorn/no-array-reduce": "off",
  "unicorn/no-document-cookie": "off",
  "unicorn/prefer-logical-operator-over-ternary": "off",
  "unicorn/no-useless-undefined": "off",
  "unicorn/prefer-dom-node-dataset": "off",
  "unicorn/prefer-module": "off",
  "unicorn/prefer-spread": "off",
} as const;

// Registry items are shipped verbatim into consumer projects, which lint them
// with the strict default Ultracite ruleset. Enforce that same ruleset here so
// shipped components never lint-error after install (and regressions are caught).
const strictForRegistry = Object.fromEntries(
  Object.keys(relaxed).map((rule) => [rule, "error"]),
) as unknown as typeof relaxed;

export default defineConfig({
  extends: [core, next, react],
  rules: relaxed,
  overrides: [
    {
      files: ["registry/**"],
      rules: strictForRegistry,
    },
  ],
});
