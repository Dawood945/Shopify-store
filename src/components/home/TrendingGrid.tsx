import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";
import type { Product } from "@/lib/types";

export function TrendingGrid({ products }: { products: Product[] }) {
  const trending = products.filter((p) => p.trending).slice(0, 4);

  return (
    <section className="border-b border-[var(--border-strong)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-label">Curated</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight-headline text-foreground">
              Trending Now
            </h2>
          </div>
          <Link href="/collections" className="btn-pill hidden sm:inline-flex">
            View all
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
