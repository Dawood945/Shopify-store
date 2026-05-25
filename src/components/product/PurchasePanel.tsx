"use client";

import { useState } from "react";
import { Price } from "@/components/ui/Price";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PurchasePanel({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0] ?? "One Size");
  const [loading, setLoading] = useState(false);

  const outOfStock = product.stock !== undefined && product.stock <= 0;
  const lowStock = product.stock !== undefined && product.stock > 0 && product.stock <= 5;

  async function goToCheckout() {
    if (outOfStock) return;
    setLoading(true);
    try {
      const res = await fetch("/api/shopify/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug, size, quantity: 1 }),
      });
      const data = await res.json();
      if (res.ok && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
    } catch {
      /* fall through to demo checkout */
    }
    window.location.href = "/checkout";
  }

  return (
    <div className="card-elevated lg:sticky lg:top-24 lg:self-start p-5 lg:p-6">
      <p className="section-label capitalize">{product.category}</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight-headline sm:text-4xl">
        {product.name}
      </h1>
      <p className="mt-2 text-sm text-accent">{product.tagline}</p>

      <p className="mt-4 text-2xl font-semibold">
        <Price
          amount={product.price}
          currency={product.currency}
          compareAmount={product.comparePrice}
        />
      </p>

      {/* Stock indicator */}
      {outOfStock && (
        <p className="mt-2 text-sm font-semibold text-red-500">Out of Stock</p>
      )}
      {lowStock && (
        <p className="mt-2 text-sm font-medium text-orange-500">Only {product.stock} left in stock</p>
      )}
      {product.stock !== undefined && product.stock > 5 && (
        <p className="mt-2 text-xs text-visible-muted">In Stock</p>
      )}

      <p className="mt-4 text-sm text-visible-muted leading-relaxed">{product.description}</p>

      <div className="mt-8">
        <p className="section-label">Size</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={cn(
                "min-w-[2.75rem] rounded-[var(--radius)] border px-3 py-2 text-sm transition-colors",
                size === s
                  ? "border-accent bg-accent-muted text-accent"
                  : "border-border hover:border-accent/40",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={goToCheckout}
          disabled={loading || outOfStock}
          className="btn-primary flex-1 disabled:opacity-60"
        >
          {outOfStock ? "Out of Stock" : loading ? "Redirecting…" : "Add to Cart"}
        </button>
        <a href="/checkout" className="btn-pill flex-1 justify-center text-center">
          Demo Checkout
        </a>
      </div>

      <ul className="mt-6 space-y-2 text-xs text-visible-muted">
        <li>Bundle discounts available on select sets</li>
        <li>Free shipping on orders over $200</li>
        <li>30-day returns</li>
      </ul>
    </div>
  );
}
