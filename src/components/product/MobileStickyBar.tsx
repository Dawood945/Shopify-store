"use client";

import { Price } from "@/components/ui/Price";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/lib/types";

export function MobileStickyBar({ product }: { product: Product }) {
  const { addItem } = useCart();
  const outOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-[var(--border-strong)] bg-background/95 backdrop-blur-xl lg:hidden shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2.5">
        <div className="min-w-0 shrink">
          <p className="truncate text-xs font-medium text-visible-muted">{product.name}</p>
          <p className="text-sm font-bold text-foreground">
            <Price amount={product.price} currency={product.currency} compareAmount={product.comparePrice} />
          </p>
        </div>
        <button
          type="button"
          onClick={() => addItem(product)}
          disabled={outOfStock}
          className="btn-primary shrink-0 px-6 h-10 text-xs whitespace-nowrap disabled:opacity-60"
        >
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
