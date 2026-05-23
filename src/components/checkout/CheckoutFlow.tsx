"use client";

import { useState } from "react";
import { formatPrice, products } from "@/lib/data";

const steps = ["Information", "Shipping", "Payment"] as const;
type Step = (typeof steps)[number];

const sampleItem = products.find((p) => p.slug === "pulse-earbuds-pro") ?? products[0];

export function CheckoutFlow() {
  const [step, setStep] = useState<Step>("Information");
  const subtotal = sampleItem.price;
  const shipping = 0;
  const total = subtotal + shipping;

  const stepIndex = steps.indexOf(step);

  return (
    <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
      <div className="lg:col-span-3">
        <nav aria-label="Checkout progress" className="mb-10 flex gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-[4px] text-xs font-medium ${
                  i <= stepIndex
                    ? "bg-accent text-background"
                    : "border border-border text-muted"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`hidden text-sm sm:inline ${
                  i <= stepIndex ? "text-foreground" : "text-muted"
                }`}
              >
                {s}
              </span>
              {i < steps.length - 1 && (
                <span className="mx-2 hidden h-px w-8 bg-border sm:block" />
              )}
            </div>
          ))}
        </nav>

        {step === "Information" && (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setStep("Shipping");
            }}
          >
            <h2 className="text-lg font-semibold tracking-tight-headline">
              Contact
            </h2>
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full rounded-[4px] border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
            />
            <h2 className="pt-4 text-lg font-semibold tracking-tight-headline">
              Shipping address
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                required
                placeholder="First name"
                className="rounded-[4px] border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
              />
              <input
                type="text"
                required
                placeholder="Last name"
                className="rounded-[4px] border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
              />
            </div>
            <input
              type="text"
              required
              placeholder="Address"
              className="w-full rounded-[4px] border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
            />
            <div className="grid gap-4 sm:grid-cols-3">
              <input
                type="text"
                required
                placeholder="City"
                className="rounded-[4px] border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
              />
              <input
                type="text"
                required
                placeholder="State"
                className="rounded-[4px] border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
              />
              <input
                type="text"
                required
                placeholder="ZIP"
                className="rounded-[4px] border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
              />
            </div>
            <button
              type="submit"
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-[4px] bg-accent text-sm font-medium text-background hover:opacity-90 sm:w-auto sm:px-8"
            >
              Continue to Shipping
            </button>
          </form>
        )}

        {step === "Shipping" && (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setStep("Payment");
            }}
          >
            <h2 className="text-lg font-semibold tracking-tight-headline">
              Delivery method
            </h2>
            <label className="flex cursor-pointer items-center gap-4 rounded-[4px] border border-accent bg-accent-muted p-4">
              <input type="radio" name="shipping" defaultChecked className="accent-accent" />
              <div>
                <p className="text-sm font-medium">Standard — 3–5 business days</p>
                <p className="text-xs text-muted">Free on orders over $200</p>
              </div>
              <span className="ml-auto text-sm font-medium">Free</span>
            </label>
            <label className="flex cursor-pointer items-center gap-4 rounded-[4px] border border-border bg-surface p-4">
              <input type="radio" name="shipping" className="accent-accent" />
              <div>
                <p className="text-sm font-medium">Express — 1–2 business days</p>
                <p className="text-xs text-muted">Priority handling</p>
              </div>
              <span className="ml-auto text-sm font-medium">$18</span>
            </label>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep("Information")}
                className="inline-flex h-11 items-center justify-center rounded-[4px] border border-border px-6 text-sm hover:border-accent/40"
              >
                Back
              </button>
              <button
                type="submit"
                className="inline-flex h-11 flex-1 items-center justify-center rounded-[4px] bg-accent text-sm font-medium text-background hover:opacity-90 sm:flex-none sm:px-8"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        )}

        {step === "Payment" && (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Order placed — demo checkout complete.");
            }}
          >
            <div className="flex items-center gap-2 rounded-[4px] border border-border bg-surface px-4 py-3 text-xs text-muted">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 3l7 4v5c0 4.4-2.9 8.5-7 9.5C7.9 20.5 5 16.4 5 12V7l7-4z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span>Secure SSL encrypted checkout</span>
            </div>
            <h2 className="text-lg font-semibold tracking-tight-headline">Payment</h2>
            <input
              type="text"
              required
              placeholder="Card number"
              className="w-full rounded-[4px] border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                required
                placeholder="MM / YY"
                className="rounded-[4px] border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
              />
              <input
                type="text"
                required
                placeholder="CVC"
                className="rounded-[4px] border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep("Shipping")}
                className="inline-flex h-11 items-center justify-center rounded-[4px] border border-border px-6 text-sm hover:border-accent/40"
              >
                Back
              </button>
              <button
                type="submit"
                className="inline-flex h-11 flex-1 items-center justify-center rounded-[4px] bg-accent text-sm font-medium text-background hover:opacity-90 sm:flex-none sm:px-8"
              >
                Place Order
              </button>
            </div>
          </form>
        )}
      </div>

      <aside className="lg:col-span-2">
        <div className="rounded-[4px] border border-border bg-surface p-6 lg:sticky lg:top-20">
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
            Order Summary
          </h2>
          <div className="mt-6 flex gap-4 border-b border-border pb-6">
            <div
              className="h-16 w-14 shrink-0 rounded-[4px] bg-surface-elevated bg-cover bg-center"
              style={{ backgroundImage: `url(${sampleItem.image})` }}
            />
            <div>
              <p className="text-sm font-medium">{sampleItem.name}</p>
              <p className="text-xs text-muted">Size M · Qty 1</p>
              <p className="mt-1 text-sm">{formatPrice(sampleItem.price)}</p>
            </div>
          </div>
          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-4 text-base font-medium">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>
  );
}
