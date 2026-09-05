import { GithubIcon, HeartDonationIcon } from "blode-icons-react";

import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

export function SponsorSupport() {
  return (
    <Card className="mx-auto mt-6 w-full max-w-[40rem]">
      <CardHeader>
        <HeartDonationIcon aria-hidden="true" className="mb-2 size-5 text-muted-foreground" />
        <CardTitle>Support Blode UI</CardTitle>
        <CardDescription>
          Help fund the open component library and the care that goes into maintaining it.
        </CardDescription>
        <CardAction>
          <Button asChild size="sm" variant="outline">
            <a href="https://github.com/sponsors/mblode" rel="noopener noreferrer" target="_blank">
              <GithubIcon data-icon="inline-start" />
              Sponsor on GitHub
            </a>
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
