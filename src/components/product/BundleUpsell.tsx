import Link from "next/link";
import { bundles, formatPrice, getBundlePricing } from "@/lib/catalog";

export async function BundleUpsell({ productSlug }: { productSlug: string }) {
  const matching = bundles.filter((b) => b.productSlugs.includes(productSlug));
  if (matching.length === 0) return null;

  const bundle = matching[0];
  const { original, discounted, savings } = await getBundlePricing(bundle);

  return (
    <div className="card-elevated mt-5 p-4 sm:mt-10 sm:p-5">
      <p className="section-label">Bundle & save</p>
      <h3 className="mt-1 text-sm font-semibold sm:text-base">{bundle.name}</h3>
      <p className="mt-1 text-xs text-visible-muted sm:text-sm">{bundle.tagline}</p>
      <div className="mt-3 flex items-baseline gap-2 sm:mt-4 sm:gap-3">
        <span className="text-base font-semibold text-accent sm:text-lg">
          {formatPrice(discounted)}
        </span>
        <span className="text-xs text-visible-muted line-through sm:text-sm">
          {formatPrice(original)}
        </span>
        <span className="text-[10px] font-medium text-accent sm:text-xs">
          Save {formatPrice(savings)}
        </span>
      </div>
      <Link
        href={`/bundles#${bundle.slug}`}
        className="mt-3 inline-flex h-9 items-center justify-center rounded-full border border-accent/40 px-4 text-xs font-medium text-accent transition-colors hover:bg-accent-muted sm:mt-4 sm:h-10 sm:px-5 sm:text-sm"
      >
        View bundle
      </Link>
    </div>
  );
}
