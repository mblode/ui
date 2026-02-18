import { Button } from "@/registry/default/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/default/ui/hover-card";

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger
        closeDelay={100}
        delay={10}
        render={<Button variant="link" />}
      >
        Hover Here
      </HoverCardTrigger>
      <HoverCardContent className="flex w-64 flex-col gap-0.5">
        <div className="font-semibold">@nextjs</div>
        <div>The React Framework – created and maintained by @vercel.</div>
        <div className="mt-1 text-muted-foreground text-xs">
          Joined December 2021
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
