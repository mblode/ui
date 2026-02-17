import { Style } from "@/registry/registry-styles";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type Config = {
  style: Style["name"];
  packageManager: "npm" | "yarn" | "pnpm" | "bun";
  installationType: "cli" | "manual";
};

const configAtom = atomWithStorage<Config>("config", {
  style: "default",
  packageManager: "npm",
  installationType: "cli",
});

export function useConfig() {
  return useAtom(configAtom);
}
