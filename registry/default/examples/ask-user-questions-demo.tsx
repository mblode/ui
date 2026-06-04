"use client";

import { useState } from "react";

import { AskUserQuestions } from "@/registry/default/ui/ask-user-questions";
import type { AskUserAnswer, AskUserQuestion } from "@/registry/default/ui/ask-user-questions";

const questions: AskUserQuestion[] = [
  {
    id: "role",
    options: [
      { description: "Prototyping flows and pages", id: "design", title: "Designer" },
      { description: "Shipping production UI", id: "eng", title: "Engineer" },
      { description: "Aligning the team on patterns", id: "pm", title: "PM" },
      { description: "Bootstrapping a product", id: "founder", title: "Founder" },
    ],
    title: "How do you plan to use Blode UI?",
  },
  {
    id: "shape",
    options: [
      { description: "Soft, familiar corners", id: "rounded", title: "Rounded" },
      { description: "Fully rounded, friendly", id: "pill", title: "Pill" },
    ],
    title: "Which shape language fits your brand?",
  },
  {
    id: "components",
    multiSelect: true,
    nextLabel: "Continue",
    options: [
      { description: "Chat-style composer with attachments", id: "input", title: "Input Message" },
      { description: "Streamed reasoning steps", id: "thinking", title: "Thinking Steps" },
      { description: "Stepped question flows", id: "ask", title: "Ask User Questions" },
      { description: "Sortable, filterable rows", id: "table", title: "Table" },
    ],
    title: "Which components are you reaching for first?",
  },
  {
    allowOther: true,
    id: "drew",
    options: [
      { description: "Springs that feel alive", id: "motion", title: "Motion" },
      { description: "Pixel-level polish", id: "craft", title: "Craft" },
      { description: "Shape and elevation systems", id: "tokens", title: "Tokens" },
    ],
    otherPlaceholder: "Something else?",
    title: "What drew you to Blode UI?",
  },
  {
    id: "frameworks",
    multiSelect: true,
    options: [
      { description: "App Router projects", id: "next", title: "Next.js" },
      { description: "Full-stack apps", id: "remix", title: "Remix" },
      { description: "SPAs and dashboards", id: "vite", title: "Vite + React" },
      { description: "Content-first sites", id: "astro", title: "Astro" },
    ],
    title: "Where will you ship these components?",
  },
  {
    id: "themes",
    options: [
      { id: "light", title: "Light only" },
      { id: "dark", title: "Dark only" },
      { id: "system", title: "System-aware" },
      { id: "toggle", title: "User toggle" },
    ],
    title: "Which theme mode do you support?",
  },
  {
    allowOther: true,
    id: "missing",
    multiSelect: true,
    nextLabel: "Send feedback",
    options: [
      { description: "Date picker and range", id: "calendar", title: "Calendar" },
      { description: "Fast keyboard launcher", id: "command", title: "Command menu" },
      { description: "Drag-and-drop boards", id: "kanban", title: "Kanban" },
    ],
    otherPlaceholder: "Tell us what to build next…",
    title: "What's missing from the registry today?",
  },
  {
    id: "recommend",
    options: [
      { description: "Already have", id: "yes", title: "Yes" },
      { description: "Once it covers more ground", id: "soon", title: "Soon" },
      { description: "Still evaluating", id: "unsure", title: "Not sure yet" },
    ],
    skippable: false,
    title: "Would you recommend Blode UI to a teammate?",
  },
];

export default function AskUserQuestionsDemo() {
  const [answers, setAnswers] = useState<Record<string, AskUserAnswer> | null>(null);

  if (answers) {
    return (
      <div className="flex w-full max-w-md flex-col gap-1 rounded-xl border p-4 text-sm">
        <p className="font-medium text-foreground">Thanks — that's everything!</p>
        <p className="text-muted-foreground">We'll tailor your setup to those answers.</p>
      </div>
    );
  }

  return <AskUserQuestions onComplete={setAnswers} questions={questions} />;
}
