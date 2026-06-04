import { AskUserQuestions } from "@/registry/default/ui/ask-user-questions";
import type { AskUserQuestion } from "@/registry/default/ui/ask-user-questions";

const questions: AskUserQuestion[] = [
  {
    id: "framework",
    options: [
      { description: "App Router, RSC, file-based routing", id: "next", title: "Next.js" },
      { description: "Fast dev server, SPA-first", id: "vite", title: "Vite" },
      { description: "Nested routes, loaders, actions", id: "remix", title: "Remix" },
    ],
    title: "Which framework should we scaffold with?",
  },
];

export default function AskUserQuestionsDemo() {
  return <AskUserQuestions questions={questions} />;
}
