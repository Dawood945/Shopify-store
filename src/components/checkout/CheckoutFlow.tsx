"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";

const steps = ["Information", "Shipping", "Payment"] as const;
type Step = (typeof steps)[number];

export function CheckoutFlow() {
  const { items, updateQuantity, removeItem, itemCount } = useCart();
  const { formatPrice } = useCurrency();
  const [step, setStep] = useState<Step>("Information");

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const stepIndex = steps.indexOf(step);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg className="h-16 w-16 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
        </svg>
        <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-sm text-muted">Add some items to get started.</p>
        <a href="/collections" className="btn-primary mt-6">Browse Collections</a>
      </div>
    );
  }

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
                <p className="text-xs text-muted">Free on orders over Rs 28,000</p>
              </div>
              <span className="ml-auto text-sm font-medium">Free</span>
            </label>
            <label className="flex cursor-pointer items-center gap-4 rounded-[4px] border border-border bg-surface p-4">
              <input type="radio" name="shipping" className="accent-accent" />
              <div>
                <p className="text-sm font-medium">Express — 1–2 business days</p>
                <p className="text-xs text-muted">Priority handling</p>
              </div>
              <span className="ml-auto text-sm font-medium">Rs 2,500</span>
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
              const checkoutUrl = process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_URL || "/collections";
              window.location.href = checkoutUrl;
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
            Order Summary ({itemCount} items)
          </h2>
          <div className="mt-6 space-y-4 border-b border-border pb-6">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex gap-4">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-[4px] bg-surface-elevated">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted">{item.size}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <select
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.productId, item.size, Number(e.target.value))}
                      className="rounded-[4px] border border-border bg-surface px-2 py-1 text-xs outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.size)}
                      className="text-xs text-muted hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="text-sm font-medium shrink-0">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
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
