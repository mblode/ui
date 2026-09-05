import type { Metadata } from "next";
import { getProPreviewConfig } from "@/lib/pro-config";
import { PricingSection } from "@/registry/pro/blocks/pricing-section";

export const metadata: Metadata = {
  description: "Test-only pricing and checkout preview for Blode UI Pro.",
  robots: { follow: false, index: false },
  title: "Blode UI Pro preview",
};

export default function ProPreviewPage() {
  const config = getProPreviewConfig();
  return (
    <PricingSection
      checkoutUrl={config.checkoutUrl}
      founderLimit={config.founderLimit}
      priceLabel={config.priceLabel}
      testMode
    />
  );
}
