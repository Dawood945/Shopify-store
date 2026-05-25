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
    <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-[var(--border-strong)] bg-[var(--footer-bg)]/95 backdrop-blur-xl lg:hidden safe-bottom shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3">
        {/* Top Row: Product Name & Price */}
        <div className="flex items-center justify-between gap-4">
          <p className="truncate text-xs font-semibold text-foreground max-w-[65%]">{product.name}</p>
          <div className="shrink-0 text-sm font-bold text-foreground">
            <Price amount={product.price} currency={product.currency} compareAmount={product.comparePrice} />
          </div>
        </div>
        {/* Bottom Row: Both buttons side-by-side matching default mode */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goToCheckout}
            disabled={loading || outOfStock}
            className="btn-primary flex-1 disabled:opacity-60 h-10 text-xs"
          >
            {outOfStock ? "Out of Stock" : loading ? "Redirecting…" : "Add to Cart"}
          </button>
          <a
            href="/checkout"
            className="btn-pill flex-1 justify-center text-center h-10 text-xs"
          >
            Demo Checkout
          </a>
        </div>
      </div>
    </div>
  );
}
