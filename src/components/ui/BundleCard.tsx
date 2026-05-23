import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/catalog";
import type { Bundle, Product } from "@/lib/types";

type BundlePricing = {
  original: number;
  discounted: number;
  savings: number;
  items: Product[];
};

type BundleCardProps = {
  bundle: Bundle;
  pricing: BundlePricing;
};

export function BundleCard({ bundle, pricing }: BundleCardProps) {
  const { original, discounted, savings, items } = pricing;

  return (
    <article className="card-elevated group flex h-full flex-col">
      <Link href={`/bundles#${bundle.slug}`} className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={bundle.image}
          alt={bundle.name}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-[var(--accent-foreground)] shadow-glow">
          Save {bundle.discountPercent}%
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <p className="section-label">Bundle</p>
          <Link href={`/bundles#${bundle.slug}`}>
            <h3 className="mt-2 text-xl font-bold tracking-tight-headline text-foreground transition-colors group-hover:text-accent">
              {bundle.name}
            </h3>
          </Link>
          <p className="mt-2 text-sm text-visible-muted">{bundle.tagline}</p>
        </div>
        <ul className="space-y-2 rounded-[var(--radius)] border border-[var(--border)] bg-background/50 p-3 text-xs">
          {items.map((p) => (
            <li key={p.id} className="flex justify-between gap-2 text-visible-muted">
              <span className="truncate text-foreground">{p.name}</span>
              <span className="shrink-0">{formatPrice(p.price)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-[var(--border)] pt-5">
          <div>
            <p className="text-sm text-visible-muted line-through">{formatPrice(original)}</p>
            <p className="text-2xl font-bold text-accent">{formatPrice(discounted)}</p>
            <p className="text-xs font-medium text-accent">You save {formatPrice(savings)}</p>
          </div>
          <Link href="/checkout" className="btn-primary !h-10 !px-5 !text-xs">
            Add Bundle
          </Link>
        </div>
      </div>
    </article>
  );
}
