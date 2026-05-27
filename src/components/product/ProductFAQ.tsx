"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is your shipping timeline?",
    a: "Orders ship within 1–2 business days. Express delivery is available at checkout for most regions.",
  },
  {
    q: "How do returns work?",
    a: "Unworn items in original packaging may be returned within 30 days. We provide a prepaid label for domestic orders.",
  },
  {
    q: "Is this compatible with layering systems?",
    a: "Yes. Our apparel is designed with articulated fits and low-profile seams to integrate with base and mid layers.",
  },
];

export function ProductFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-border pt-6 sm:pt-10">
      <h2 className="text-xs font-medium uppercase tracking-widest text-muted sm:text-sm">FAQ</h2>
      <div className="mt-4 space-y-1.5 sm:mt-6 sm:space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={faq.q}
            className="overflow-hidden rounded-[4px] border border-border bg-surface"
          >
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-xs font-medium sm:gap-4 sm:px-4 sm:py-3 sm:text-sm"
            >
              {faq.q}
              <span className="text-accent shrink-0">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <p className="border-t border-border px-3 py-2.5 text-xs text-muted leading-relaxed sm:px-4 sm:py-3 sm:text-sm">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
