"use client";

import { useState } from "react";
import { Price } from "@/components/ui/Price";
import type { Product } from "@/lib/types";

export function MobileStickyBar({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);

  const outOfStock = product.stock !== undefined && product.stock <= 0;

  async function goToCheckout() {
    if (outOfStock) return;
    setLoading(true);
    try {
      const res = await fetch("/api/shopify/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: product.slug,
          size: product.sizes[0] ?? "One Size",
          quantity: 1,
        }),
      });
      const data = await res.json();
      if (res.ok && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
    } catch {}
    window.location.href = "/checkout";
  }

  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-[var(--border-strong)] bg-[var(--footer-bg)]/95 backdrop-blur-xl lg:hidden safe-bottom">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <div className="min-w-0 shrink-0">
          <p className="truncate text-xs font-medium text-visible-muted">{product.name}</p>
          <p className="text-base font-bold text-foreground">
            <Price amount={product.price} currency={product.currency} compareAmount={product.comparePrice} />
          </p>
        </div>
        <button
          type="button"
          onClick={goToCheckout}
          disabled={loading || outOfStock}
          className="btn-primary shrink-0 px-8 disabled:opacity-60"
        >
          {outOfStock ? "Out of Stock" : loading ? "Redirecting…" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
