import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": import.meta.dirname,
    },
  },
  test: {
    environment: "node",
    exclude: ["node_modules/**", ".next/**"],
    include: ["**/*.test.ts"],
  },
});
