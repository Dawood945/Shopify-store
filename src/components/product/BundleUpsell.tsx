import Link from "next/link";
import { bundles, formatPrice, getBundlePricing } from "@/lib/catalog";

export async function BundleUpsell({ productSlug }: { productSlug: string }) {
  const matching = bundles.filter((b) => b.productSlugs.includes(productSlug));
  if (matching.length === 0) return null;

  const bundle = matching[0];
  const { original, discounted, savings } = await getBundlePricing(bundle);

  return (
    <div className="card-elevated mt-10 p-5">
      <p className="section-label">Bundle & save</p>
      <h3 className="mt-1 font-semibold">{bundle.name}</h3>
      <p className="mt-1 text-sm text-visible-muted">{bundle.tagline}</p>
      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-lg font-semibold text-accent">
          {formatPrice(discounted)}
        </span>
        <span className="text-sm text-visible-muted line-through">
          {formatPrice(original)}
        </span>
        <span className="text-xs font-medium text-accent">
          Save {formatPrice(savings)}
        </span>
      </div>
      <Link
        href={`/bundles#${bundle.slug}`}
        className="mt-4 inline-flex h-10 items-center justify-center rounded-full border border-accent/40 px-5 text-sm font-medium text-accent transition-colors hover:bg-accent-muted"
      >
        View bundle
      </Link>
    </div>
  );
}
