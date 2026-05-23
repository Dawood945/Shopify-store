import { getBundlePricing, getBundles } from "@/lib/catalog";
import { BundleCard } from "@/components/ui/BundleCard";

export const metadata = {
  title: "Bundle Deals",
};

export default async function BundlesPage() {
  const bundles = await getBundles();
  const priced = await Promise.all(
    bundles.map(async (bundle) => ({
      bundle,
      pricing: await getBundlePricing(bundle),
    })),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12 max-w-2xl">
        <p className="section-label">Save more</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight-headline sm:text-5xl">
          Bundle Discounts
        </h1>
        <p className="mt-4 text-visible-muted leading-relaxed">
          Hand-picked combinations across electronics, toys, and gears. Discounts
          apply automatically—no promo codes needed.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {priced.map(({ bundle, pricing }) => (
          <div key={bundle.id} id={bundle.slug}>
            <BundleCard bundle={bundle} pricing={pricing} />
          </div>
        ))}
      </div>
    </div>
  );
}
