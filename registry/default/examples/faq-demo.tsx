import { Faq, faqJsonLd } from "@/registry/default/blocks/faq";

const items = [
  {
    answer:
      "Yes. Blode UI is MIT licensed, so you can use it in personal and commercial projects without paying or asking.",
    question: "Is it free?",
  },
  {
    answer:
      "Run the add command for the component you want. The source is copied into your project, where you edit it like any other file.",
    question: "How do I install a component?",
  },
];

export default function FaqDemo() {
  return (
    <div className="w-full max-w-2xl p-6">
      <script
        // oxlint-disable-next-line react/no-danger -- JSON-LD has to be an inline script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)) }}
        type="application/ld+json"
      />
      <Faq items={items} />
    </div>
  );
}
