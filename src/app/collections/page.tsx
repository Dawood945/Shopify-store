import { Suspense } from "react";
import { CollectionFilters } from "@/components/collections/CollectionFilters";
import { CollectionGrid } from "@/components/collections/CollectionGrid";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { getProducts } from "@/lib/catalog";

export const metadata = {
  title: "Collections",
};

export default async function CollectionsPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-8">
      <header className="mb-6 max-w-2xl sm:mb-10">
        <p className="section-label">Explore</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight-headline text-foreground sm:text-5xl">
          Collections
        </h1>
        <p className="mt-3 text-sm text-visible-muted leading-relaxed sm:text-base">
          Electronics, toys, and gears — filter to find your fit.
        </p>
      </header>

      <div className="mb-4 overflow-x-auto lg:hidden">
        <Suspense fallback={null}>
          <CategoryNav />
        </Suspense>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
        <div className="hidden lg:block lg:w-64 lg:shrink-0">
          <Suspense fallback={<div className="h-48 animate-pulse rounded-[var(--radius)] bg-surface" />}>
            <CollectionFilters />
          </Suspense>
        </div>
        <div className="min-w-0 flex-1">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-[var(--radius)] bg-surface" />}>
            <CollectionGrid products={products} />
          </Suspense>
        </div>
      </div>

      <div className="mt-10 lg:mt-16">
        <TrustBadges />
      </div>
    </div>
  );
}
