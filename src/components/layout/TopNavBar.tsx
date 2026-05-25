"use client";

import Link from "next/link";
import { Suspense } from "react";
import { ThemeButton } from "@/components/theme/ThemeButton";
import { CurrencySelector } from "@/components/ui/CurrencySelector";
import { SearchButton } from "./SearchButton";
import { CartButton } from "./CartButton";
import { CategoryNav } from "./CategoryNav";

export function TopNavBar() {
  return (
    <>
      <header className="glass-nav sticky top-0 z-40 border-b border-[var(--border-strong)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 text-foreground transition-opacity hover:opacity-80"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius)] bg-accent text-sm font-bold text-[var(--accent-foreground)] shadow-glow">
                  G
                </span>
                <span className="hidden text-sm font-semibold tracking-tight-headline uppercase sm:inline">
                  GearNest
                </span>
              </Link>
            </div>

            <div className="hidden flex-1 justify-center lg:flex">
              <Suspense fallback={<div className="h-10 w-96 animate-pulse rounded-full bg-surface" />}>
                <CategoryNav />
              </Suspense>
            </div>

            <div className="flex items-center gap-2">
              <CurrencySelector />
              <SearchButton />
              <ThemeButton />
              <CartButton />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
