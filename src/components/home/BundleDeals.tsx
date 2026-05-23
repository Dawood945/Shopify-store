import Link from "next/link";
import { getBundlePricing } from "@/lib/catalog";
import { BundleCard } from "@/components/ui/BundleCard";
import type { Bundle } from "@/lib/types";

export async function BundleDeals({ bundles }: { bundles: Bundle[] }) {
  const priced = await Promise.all(
    bundles.map(async (bundle) => ({
      bundle,
      pricing: await getBundlePricing(bundle),
    })),
  );

  return (
    <section className="section-alt border-b border-[var(--border-strong)] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-label">Limited Offers</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight-headline text-foreground sm:text-3xl">
              Bundle Discounts
            </h2>
            <p className="mt-2 max-w-md text-sm text-visible-muted">
              Curated sets with automatic savings. No codes required.
            </p>
          </div>
          <Link href="/bundles" className="btn-pill shrink-0 self-start text-xs sm:self-auto">
            All bundles →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {priced.map(({ bundle, pricing }) => (
            <BundleCard key={bundle.id} bundle={bundle} pricing={pricing} />
          ))}
        </div>
      </div>
    </section>
  );
}
