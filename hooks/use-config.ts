import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { Style } from "@/registry/registry-styles";

interface Config {
  installationType: "cli" | "manual";
  packageManager: "npm" | "yarn" | "pnpm" | "bun";
  style: Style["name"];
}

const configAtom = atomWithStorage<Config>("config", {
  style: "default",
  packageManager: "npm",
  installationType: "cli",
});

export function useConfig() {
  return useAtom(configAtom);
}
