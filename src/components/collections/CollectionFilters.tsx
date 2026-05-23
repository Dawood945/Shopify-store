"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

const categories: { value: Category | ""; label: string }[] = [
  { value: "", label: "All" },
  { value: "electronics", label: "Electronics" },
  { value: "toys", label: "Toys" },
  { value: "gears", label: "Gears" },
];

const priceRanges = [
  { value: "", label: "Any price" },
  { value: "0-100", label: "Under $100" },
  { value: "100-300", label: "$100 – $300" },
  { value: "300+", label: "$300+" },
];

const sizes = ["XS", "S", "M", "L", "XL", "One Size", "7", "8", "9", "10", "11", "12"];

export function CollectionFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/collections?${params.toString()}`, { scroll: false });
  }

  const category = searchParams.get("category") ?? "";
  const price = searchParams.get("price") ?? "";
  const size = searchParams.get("size") ?? "";

  return (
    <aside className="card-elevated space-y-8 p-5">
      <div>
        <h3 className="section-label">Category</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.value || "all"}
              type="button"
              onClick={() => update("category", c.value)}
              className={cn(
                "btn-pill h-9 px-3 text-xs",
                category === c.value && "btn-pill-active",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="section-label">Price</h3>
        <div className="mt-3 flex flex-col gap-2">
          {priceRanges.map((r) => (
            <button
              key={r.value || "any"}
              type="button"
              onClick={() => update("price", r.value)}
              className={cn(
                "rounded-[var(--radius)] border px-3 py-2 text-left text-xs transition-colors",
                price === r.value
                  ? "border-accent bg-accent-muted text-accent"
                  : "border-border text-muted hover:border-accent/30",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="section-label">Size</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => update("size", size === s ? "" : s)}
              className={cn(
                "min-w-[2.5rem] rounded-[var(--radius)] border px-2 py-1.5 text-xs transition-colors",
                size === s
                  ? "border-accent bg-accent-muted text-accent"
                  : "border-border text-muted hover:border-accent/30",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
