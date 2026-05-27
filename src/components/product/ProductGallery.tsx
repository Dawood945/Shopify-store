"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import type { Product } from "@/lib/types";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = useCallback(() => setLightboxOpen(true), []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    if (lightboxOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightboxOpen, closeLightbox]);

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={openLightbox}
        className="relative aspect-square w-full overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-surface text-left sm:aspect-[4/5]"
      >
        <Image
          src={product.images[active] ?? product.image}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/80 text-[var(--surface)] opacity-0 transition-opacity hover:opacity-100">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /><path d="M11 8v6M8 11h6" />
          </svg>
        </span>
      </button>

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
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(0,0,0,0.85)] backdrop-blur-sm animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/20 text-white transition-colors hover:bg-foreground/40"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="relative h-full w-full max-h-screen max-w-5xl p-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-full w-full">
              <Image
                src={product.images[active] ?? product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {product.images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
                {product.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`h-14 w-12 overflow-hidden rounded-[4px] border-2 transition-all ${
                      active === i ? "border-white opacity-100" : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <Image src={src} alt="" fill sizes="48px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
