"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-surface sm:aspect-[3/4]">
        <Image
          src={product.images[active] ?? product.image}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-contain p-4 sm:p-6"
        />
      </div>
      {product.images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {product.images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-[var(--radius)] border bg-surface transition-colors ${
                active === i ? "border-accent" : "border-border hover:border-accent/40"
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
