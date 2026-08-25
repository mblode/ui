import { Button } from "@/registry/default/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";

/**
 * A tokenised line illustration: fills use the muted token and strokes use the
 * border token, so it tracks light and dark mode without a second asset.
 */
const ReportIllustration = () => (
  <svg
    aria-hidden="true"
    className="h-auto w-40"
    fill="none"
    focusable="false"
    viewBox="0 0 160 112"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g className="text-muted" fill="currentColor">
      <rect height="80" rx="6" transform="rotate(-8 44 24)" width="60" x="44" y="24" />
      <rect height="80" rx="6" width="60" x="62" y="20" />
    </g>
    <g
      className="text-border"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <rect height="80" rx="6" transform="rotate(-8 44 24)" width="60" x="44" y="24" />
      <rect height="80" rx="6" width="60" x="62" y="20" />
      <path d="M74 34h24" />
      <path d="M74 44h36" />
      <path d="M74 88h36" />
      <path d="M78 76V62" />
      <path d="M92 76V56" />
      <path d="M106 76V66" />
    </g>
  </svg>
);

export const EmptyIllustration = () => (
  <Empty className="border">
    <EmptyHeader>
      <EmptyMedia>
        <ReportIllustration />
      </EmptyMedia>
      <EmptyTitle>No reports yet</EmptyTitle>
      <EmptyDescription>
        Build a report to track revenue, churn, and activation over time. Start from a template or a
        blank canvas.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent className="flex-row justify-center gap-2">
      <Button>New report</Button>
      <Button variant="outline">Browse templates</Button>
    </EmptyContent>
  </Empty>
);
