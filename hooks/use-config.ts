import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { Style } from "@/registry/registry-styles";

interface Config {
  installationType: "cli" | "manual";
  packageManager: "npm" | "yarn" | "pnpm" | "bun";
  style: Style["name"];
}

const configAtom = atomWithStorage<Config>("config", {
  installationType: "cli",
  packageManager: "npm",
  style: "default",
});

export function useConfig() {
  return useAtom(configAtom);
}
