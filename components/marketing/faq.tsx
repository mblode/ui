import type * as React from "react";

import { cn } from "@/lib/utils";

interface FaqItem {
  /** Plain text. Open with a direct answer of 60 words or fewer. */
  answer: string;
  question: string;
}

interface FaqProps extends Omit<React.ComponentProps<"div">, "onOpen"> {
  items: FaqItem[];
  /** Fires with the question each time an item opens. Pass it from a client component. */
  onOpen?: (question: string) => void;
}

/**
 * Questions and answers as native disclosure widgets. Render
 * `faqJsonLd(items)` from the same array, so the structured data can never
 * claim an answer the page does not show.
 *
 * `<details>` rather than an animated accordion, deliberately: every answer is
 * in the server HTML whether or not it is open, which is what search engines
 * and answer engines read, and it opens from the keyboard with no JavaScript.
 *
 * Works from a server component. `onOpen` is the one prop that needs a client
 * parent, since a function cannot cross the server boundary.
 */
const Faq = ({ className, items, onOpen, ...props }: FaqProps) => (
  <div className={cn("w-full divide-y border-y", className)} data-slot="faq" {...props}>
    {items.map((item) => (
      <details
        className="group"
        data-slot="faq-item"
        key={item.question}
        onToggle={
          onOpen
            ? (event) => {
                if (event.currentTarget.open) {
                  onOpen(item.question);
                }
              }
            : undefined
        }
      >
        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded-md py-5 font-medium text-base outline-none transition-[color,box-shadow] hover:text-foreground/80 focus-visible:ring-[3px] focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
          <h3 className="text-pretty">{item.question}</h3>
          {/* A plus that loses its vertical bar when open. */}
          <span aria-hidden="true" className="relative mt-1.5 size-[11px] shrink-0">
            <span className="absolute top-[5px] left-0 h-px w-[11px] rounded-full bg-foreground" />
            <span className="absolute top-0 left-[5px] h-[11px] w-px rounded-full bg-foreground transition-transform duration-200 group-open:scale-y-0" />
          </span>
        </summary>
        <p className="max-w-2xl pb-5 text-pretty text-muted-foreground leading-relaxed">
          {item.answer}
        </p>
      </details>
    ))}
  </div>
);

/**
 * `FAQPage` structured data for the same items the accordion renders. Returns a
 * standalone JSON-LD object; drop `@context` to nest it in an `@graph`.
 */
const faqJsonLd = (items: FaqItem[]) =>
  ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      acceptedAnswer: { "@type": "Answer", text: item.answer },
      name: item.question,
    })),
  }) as const;

export { Faq, faqJsonLd };
export type { FaqItem, FaqProps };
