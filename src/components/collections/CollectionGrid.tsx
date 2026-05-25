"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/lib/types";

function matchesPrice(price: number, range: string) {
  if (!range) return true;
  if (range === "0-100") return price < 100;
  if (range === "100-300") return price >= 100 && price <= 300;
  if (range === "300+") return price > 300;
  return true;
}

export function CollectionGrid({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const price = searchParams.get("price") ?? "";
  const size = searchParams.get("size") ?? "";

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (!matchesPrice(p.price, price)) return false;
      if (size && !p.sizes.includes(size)) return false;
      return true;
    });
  }, [products, category, price, size]);

  return (
    <>
      {filtered.length === 0 ? (
        <div className="rounded-[var(--radius)] border border-border bg-surface px-6 py-16 text-center">
          <p className="text-sm text-visible-muted">No products match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
