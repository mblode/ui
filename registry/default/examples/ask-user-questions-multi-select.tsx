"use client";

import { useState } from "react";

import { AskUserQuestions } from "@/registry/default/ui/ask-user-questions";
import type { AskUserAnswer, AskUserQuestion } from "@/registry/default/ui/ask-user-questions";

const questions: AskUserQuestion[] = [
  {
    id: "features",
    multiSelect: true,
    nextLabel: "Continue",
    options: [
      { description: "System-aware theme switching", id: "dm", title: "Dark mode" },
      { description: "Screen-reader and keyboard support", id: "a11y", title: "Accessibility" },
      { description: "Faster initial load", id: "perf", title: "Performance" },
      { description: "Multi-language support", id: "i18n", title: "Translations" },
    ],
    title: "Which features should we prioritize?",
  },
  {
    id: "platforms",
    multiSelect: true,
    options: [
      { description: "Desktop browsers", id: "web", title: "Web" },
      { description: "iPhone and iPad", id: "ios", title: "iOS" },
      { description: "Phones and tablets", id: "android", title: "Android" },
      { description: "macOS / Windows / Linux apps", id: "desktop", title: "Native desktop" },
    ],
    title: "Which platforms do you target?",
  },
  {
    allowOther: true,
    id: "integrations",
    multiSelect: true,
    nextLabel: "Finish",
    options: [
      { description: "Notifications and approvals", id: "slack", title: "Slack" },
      { description: "PR and issue sync", id: "github", title: "GitHub" },
      { description: "Two-way ticket linking", id: "linear", title: "Linear" },
      { description: "Design hand-off", id: "figma", title: "Figma" },
    ],
    otherPlaceholder: "Anything else?",
    title: "Which integrations matter most?",
  },
];

export default function AskUserQuestionsMultiSelect() {
  const [answers, setAnswers] = useState<Record<string, AskUserAnswer> | null>(null);

  if (answers) {
    return (
      <div className="flex w-full max-w-md flex-col gap-1 rounded-xl border p-4 text-sm">
        <p className="font-medium text-foreground">Got it — thanks!</p>
        <p className="text-muted-foreground">We'll tailor the build to your selections.</p>
      </div>
    );
  }

  return <AskUserQuestions onComplete={setAnswers} questions={questions} />;
}
