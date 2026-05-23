"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { IconButton } from "@/components/ui/IconButton";

export function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/catalog/products")
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));
  }, []);

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()),
      )
    : products.slice(0, 4);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      window.addEventListener("keydown", onKey);
      document.addEventListener("mousedown", onClick);
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <>
      <IconButton label="Search" onClick={() => setOpen(true)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </IconButton>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-background/80 p-4 pt-20 backdrop-blur-sm sm:pt-28">
          <div
            ref={panelRef}
            className="w-full max-w-xl overflow-hidden rounded-[var(--radius)] border border-border bg-surface shadow-glow"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-muted" aria-hidden>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-visible-muted"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-icon h-8 w-8"
                aria-label="Close search"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2">
              {results.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-visible-muted">No results found</li>
              ) : (
                results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-[var(--radius)] px-3 py-2.5 text-sm transition-colors hover:bg-accent-muted hover:text-accent"
                    >
                      <span>{p.name}</span>
                      <span className="text-xs text-visible-muted capitalize">{p.category}</span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
            <div className="border-t border-border px-4 py-3">
              <Link
                href="/collections"
                onClick={() => setOpen(false)}
                className="text-xs font-medium text-accent hover:underline"
              >
                Browse all collections →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
