import { MarketingHero } from "@/registry/default/blocks/marketing-hero";
import { Button } from "@/registry/default/ui/button";

export default function MarketingHeroDemo() {
  return (
    <MarketingHero
      action={<Button size="lg">Start a free trial</Button>}
      className="w-full p-6 md:p-10"
      description="For small teams who invoice by the hour: log time in one click and send the invoice from the same screen."
      eyebrow="Timesheet"
      title="Bill every hour you work"
    />
  );
}
