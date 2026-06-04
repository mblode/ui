import { CheckIcon, GlobeIcon, SearchIcon } from "blode-icons-react";

import {
  ThinkingStep,
  ThinkingStepDetails,
  ThinkingSteps,
  ThinkingStepsContent,
  ThinkingStepsHeader,
} from "@/registry/default/ui/thinking-steps";

export default function ThinkingStepsDemo() {
  return (
    <ThinkingSteps>
      <ThinkingStepsHeader>Thinking</ThinkingStepsHeader>
      <ThinkingStepsContent>
        <ThinkingStep icon={SearchIcon} label="Searched the web" />
        <ThinkingStep icon={GlobeIcon} label="Read 3 sources">
          <ThinkingStepDetails
            details={["Compared three approaches", "Weighed latency against accuracy"]}
            summary="Explored 6 files"
          />
        </ThinkingStep>
        <ThinkingStep icon={CheckIcon} isLast label="Done" />
      </ThinkingStepsContent>
    </ThinkingSteps>
  );
}
