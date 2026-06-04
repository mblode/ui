import { AskUserQuestions } from "@/registry/default/ui/ask-user-questions";
import type { AskUserQuestion } from "@/registry/default/ui/ask-user-questions";

const questions: AskUserQuestion[] = [
  {
    allowOther: true,
    id: "features",
    multiSelect: true,
    options: [
      { description: "Email and password", id: "auth", title: "Authentication" },
      { description: "Stripe checkout and billing portal", id: "payments", title: "Payments" },
      { description: "Email and in-app", id: "notifications", title: "Notifications" },
      { description: "Charts and reporting", id: "analytics", title: "Analytics" },
    ],
    otherPlaceholder: "Tell us what else you need…",
    title: "Which features do you want included?",
  },
];

export default function AskUserQuestionsMultiSelect() {
  return <AskUserQuestions questions={questions} />;
}
