import { CheckIcon } from "blode-icons-react";

import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

interface PricingSectionProps {
  checkoutUrl: string;
  docsUrl?: string;
  priceLabel: string;
  testMode?: boolean;
}

const freeFeatures = ["All base components", "Tailwind v4 tokens", "Community updates"];
const proFeatures = ["Premium production blocks", "Lifetime block updates", "Unlimited projects"];

const FeatureList = ({ features }: { features: string[] }) => (
  <ul className="flex flex-col gap-3 text-sm">
    {features.map((feature) => (
      <li className="flex items-center gap-2" key={feature}>
        <CheckIcon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
        {feature}
      </li>
    ))}
  </ul>
);

export const PricingSection = ({
  checkoutUrl,
  docsUrl = "/ui/docs",
  priceLabel,
  testMode = false,
}: PricingSectionProps) => (
  <section aria-labelledby="pricing-heading" className="mx-auto w-full max-w-5xl px-6 py-16">
    <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-3 text-center">
      {testMode ? <Badge variant="warning">Test mode</Badge> : null}
      <h1 className="text-balance font-semibold text-4xl tracking-tight" id="pricing-heading">
        Keep the foundation free. Pay for complete screens.
      </h1>
      <p className="text-balance text-muted-foreground leading-relaxed">
        Start with the open component registry, then add polished blocks when you need to move from
        parts to a finished product.
      </p>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Blode UI</CardTitle>
          <CardDescription>Open source components for every project.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-6">
          <p className="font-semibold text-3xl tracking-tight">Free</p>
          <FeatureList features={freeFeatures} />
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full" variant="outline">
            <a href={docsUrl}>Browse components</a>
          </Button>
        </CardFooter>
      </Card>

      <Card className="ring-foreground/25">
        <CardHeader>
          <CardTitle>Blode UI Pro</CardTitle>
          <CardDescription>Complete blocks with the same design language.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-6">
          <div className="flex items-baseline gap-2">
            <p className="tabular-figures font-semibold text-3xl tracking-tight">{priceLabel}</p>
            <span className="text-muted-foreground text-sm">one time</span>
          </div>
          <FeatureList features={proFeatures} />
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-2">
          <Button asChild className="w-full">
            <a href={checkoutUrl}>{testMode ? "Open test checkout" : "Get Blode UI Pro"}</a>
          </Button>
          {testMode ? (
            <p className="text-center text-muted-foreground text-xs">
              Lemon Squeezy test checkout. Use test details only.
            </p>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  </section>
);
