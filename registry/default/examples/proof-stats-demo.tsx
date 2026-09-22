import { docsConfig } from "@/config/docs";
import { ProofStats, ProofStatsSkeleton } from "@/registry/default/blocks/proof-stats";

// A real number: the components listed in this site's sidebar.
const componentCount =
  docsConfig.sidebarNav.find((group) => group.title === "Components")?.items?.length ?? null;

export default function ProofStatsDemo() {
  return (
    <div className="flex w-full flex-col gap-10 p-6">
      <ProofStats
        stats={[
          { href: "/ui/docs/components", label: "Components", value: componentCount },
          // A fetch that failed. The stat is dropped rather than shown as 0.
          { label: "GitHub stars", value: null },
        ]}
      />
      <ProofStatsSkeleton />
    </div>
  );
}
