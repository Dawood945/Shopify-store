import { isShopifyEnabled } from "@/lib/catalog";

export function ShopifyBadge() {
  if (!isShopifyEnabled()) return null;

  return (
    <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-background/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      Connected to Shopify
    </p>
  );
}
