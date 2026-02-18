"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

/**
 * FaqAccordion - Accessible accordion that displays a list of FAQ items with expand/collapse.
 *
 * @component
 * @example
 * ```tsx
 * <FaqAccordion items={[{ question: "Why?", answer: "Because." }]} />
 * ```
 */
export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-pearl-400">
      {items.map((item, index) => (
        <div key={index}>
          <button
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
            className="flex w-full items-center justify-between py-5 text-left"
            id={`faq-button-${index}`}
            aria-expanded={openIndex === index}
            aria-controls={`faq-panel-${index}`}
          >
            <span className="pr-4 font-heading text-lg font-medium text-charcoal">
              {item.question}
            </span>
            <ChevronDown
              className={clsx(
                "h-5 w-5 shrink-0 text-sky-500 transition-transform",
                openIndex === index && "rotate-180"
              )}
            />
          </button>
          <div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-button-${index}`}
            className={clsx(
              "overflow-hidden transition-all",
              openIndex === index
                ? "max-h-96 pb-5 opacity-100"
                : "max-h-0 opacity-0"
            )}
          >
            <p className="text-pearl-600 leading-relaxed">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
