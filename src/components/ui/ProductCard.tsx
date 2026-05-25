"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/ui/Price";
import { useCurrency } from "@/contexts/CurrencyContext";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
  variant?: "default" | "featured";
  priority?: boolean;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-3 w-3 ${i < Math.round(rating) ? "text-yellow-500" : "text-visible-muted"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span className="ml-1 text-[10px] text-visible-muted">({rating})</span>
    </span>
  );
}

function DeliveryBadge({ category }: { category: string }) {
  const labels: Record<string, string> = {
    electronics: "Free Delivery • Ships 2-3 days",
    toys: "Free Delivery • Ships 3-5 days",
    gears: "Free Delivery • Ships 1-2 days",
  };

  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-600">
      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
      </svg>
      {labels[category] || "Free Delivery"}
    </span>
  );
}

export function ProductCard({ product, variant = "default", priority = false }: ProductCardProps) {
  const { convert } = useCurrency();
  const [wishlisted, setWishlisted] = useState(() => {
    try { return localStorage.getItem("wishlist")?.includes(product.id) ?? false; }
    catch { return false; }
  });

  const toggleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((prev) => {
      const next = !prev;
      try {
        const raw = localStorage.getItem("wishlist") || "[]";
        const list: string[] = JSON.parse(raw);
        if (next) { list.push(product.id); }
        else { const idx = list.indexOf(product.id); if (idx !== -1) list.splice(idx, 1); }
        localStorage.setItem("wishlist", JSON.stringify(list));
      } catch {}
      return next;
    });
  }, [product.id]);

  const discountPct = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const outOfStock = product.stock !== undefined && product.stock <= 0;
  const lowStock = product.stock !== undefined && product.stock > 0 && product.stock <= 5;

  return (
    <article className="group relative flex h-full flex-col">
      <div className="card-elevated relative z-0 flex h-full flex-col">
        <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-surface sm:aspect-[4/5]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-3 transition-all duration-500 group-hover:scale-105"
            loading={priority ? "eager" : "lazy"}
          />

          {/* Wishlist button */}
          <button
            type="button"
            onClick={toggleWishlist}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 text-foreground backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-background/90"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill={wishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>

          {/* Top-left badges */}
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
            {product.trending && (
              <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent-foreground)]">
                Trending
              </span>
            )}
            {discountPct > 0 && (
              <span className="rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                -{discountPct}%
              </span>
            )}
          </div>

          {/* Out of stock overlay */}
          {outOfStock && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
              <span className="rounded-full bg-foreground/90 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[var(--surface)]">
                Out of Stock
              </span>
            </div>
          )}

          {/* Quick preview / add to cart on hover (hidden when out of stock) */}
          {!outOfStock && (
            <div className="quick-add-btn absolute bottom-3 left-3 right-3 z-10 flex gap-2">
              <button
                type="button"
                className="flex-1 rounded-lg bg-foreground/90 py-2 text-center text-xs font-bold uppercase tracking-widest text-[var(--surface)] backdrop-blur-sm transition-transform hover:scale-[1.02]"
              >
                Add to Cart
              </button>
              <button
                type="button"
                aria-label="Quick view"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/90 text-[var(--surface)] backdrop-blur-sm transition-transform hover:scale-[1.02]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          )}
        </Link>

        <div className="flex flex-1 flex-col gap-2 p-5">
          {/* Category + Rating */}
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
              {product.category}
            </p>
            {product.rating && <StarRating rating={product.rating} />}
          </div>

          {/* Title */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
              {product.name}
            </h3>
          </Link>

          {/* Tagline */}
          <p className="line-clamp-1 text-sm text-visible-muted">{product.tagline}</p>

          {/* Price row */}
          <p className="mt-auto pt-2 text-lg font-bold text-foreground">
            <Price amount={product.price} currency={product.currency} compareAmount={product.comparePrice} />
          </p>

          {/* Delivery badge + stock indicator */}
          <div className="mt-1 flex items-center justify-between">
            <DeliveryBadge category={product.category} />
            {lowStock && !outOfStock && (
              <span className="text-[10px] font-semibold text-orange-500">
                Only {product.stock} left
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
