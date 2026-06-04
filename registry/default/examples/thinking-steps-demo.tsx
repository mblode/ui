import { GlobeIcon, SearchIcon, SparkleIcon } from "blode-icons-react";

import {
  ThinkingStep,
  ThinkingStepDetails,
  ThinkingStepSource,
  ThinkingStepSources,
  ThinkingSteps,
  ThinkingStepsContent,
  ThinkingStepsHeader,
} from "@/registry/default/ui/thinking-steps";

export default function ThinkingStepsDemo() {
  return (
    <ThinkingSteps>
      <ThinkingStepsHeader>Thinking</ThinkingStepsHeader>
      <ThinkingStepsContent>
        <ThinkingStep
          description="Looking for recent benchmarks"
          icon={SearchIcon}
          label="Searching the web"
        />
        <ThinkingStep icon={GlobeIcon} label="Reading sources">
          <ThinkingStepSources>
            <ThinkingStepSource color="blue">arxiv.org</ThinkingStepSource>
            <ThinkingStepSource color="green" delay={0.05}>
              github.com
            </ThinkingStepSource>
          </ThinkingStepSources>
        </ThinkingStep>
        <ThinkingStep icon={SparkleIcon} isLast label="Synthesizing an answer" status="active">
          <ThinkingStepDetails
            details={["Compared three approaches", "Weighed latency against accuracy"]}
            summary="Show reasoning"
          />
        </ThinkingStep>
      </ThinkingStepsContent>
    </ThinkingSteps>
  );
}
