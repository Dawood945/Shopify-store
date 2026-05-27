"use client";

import { useState } from "react";
import { Price } from "@/components/ui/Price";
import { useCart } from "@/contexts/CartContext";
import { DeliveryInfo } from "@/components/product/DeliveryInfo";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PurchasePanel({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0] ?? "One Size");
  const { addItem } = useCart();

  const outOfStock = product.stock !== undefined && product.stock <= 0;
  const lowStock = product.stock !== undefined && product.stock > 0 && product.stock <= 5;

  return (
    <div className="card-elevated lg:sticky lg:top-24 lg:self-start p-4 lg:p-6">
      <p className="section-label capitalize">{product.category}</p>
      <h1 className="mt-1 text-lg font-semibold tracking-tight-headline sm:mt-2 sm:text-4xl">
        {product.name}
      </h1>
      <p className="mt-1 text-xs text-accent sm:mt-2 sm:text-sm">{product.tagline}</p>

      <p className="mt-2 text-xl font-semibold sm:mt-4 sm:text-2xl">
        <Price
          amount={product.price}
          currency={product.currency}
          compareAmount={product.comparePrice}
        />
      </p>

      {/* Stock indicator */}
      {outOfStock && (
        <p className="mt-1 text-xs font-semibold text-red-500 sm:mt-2 sm:text-sm">Out of Stock</p>
      )}
      {lowStock && (
        <p className="mt-1 text-xs font-medium text-orange-500 sm:mt-2 sm:text-sm">Only {product.stock} left in stock</p>
      )}
      {product.stock !== undefined && product.stock > 5 && (
        <p className="mt-1 text-[10px] text-visible-muted sm:mt-2 sm:text-xs">In Stock</p>
      )}

      <p className="mt-2 text-xs text-visible-muted leading-relaxed sm:mt-4 sm:text-sm">{product.description}</p>

      <div className="mt-4 sm:mt-8">
        <p className="section-label">Size</p>
        <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={cn(
                "min-w-[2.5rem] rounded-[var(--radius)] border px-2 py-1.5 text-xs transition-colors sm:min-w-[2.75rem] sm:px-3 sm:py-2 sm:text-sm",
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

      <div className="mt-3 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:gap-3">
        <button
          type="button"
          onClick={() => addItem(product, size)}
          disabled={outOfStock}
          className="btn-primary flex-1 disabled:opacity-60"
        >
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
        <a href="/checkout" className="btn-pill flex-1 justify-center text-center">
          Buy Now
        </a>
      </div>

      <DeliveryInfo product={product} />

      <ul className="mt-4 space-y-1.5 text-[10px] text-visible-muted sm:mt-6 sm:space-y-2 sm:text-xs">
        <li>Bundle discounts available on select sets</li>
        <li>Free shipping on orders over $200</li>
        <li>30-day returns</li>
      </ul>
    </div>
  );
}
