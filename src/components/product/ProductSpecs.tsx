import type { Product } from "@/lib/types";

export function ProductSpecs({ product }: { product: Product }) {
  return (
    <section className="border-t border-border pt-6 sm:pt-10">
      <h2 className="text-xs font-medium uppercase tracking-widest text-muted sm:text-sm">
        Technical Specs
      </h2>
      <dl className="mt-4 divide-y divide-border rounded-[4px] border border-border sm:mt-6">
        {product.specs.map((spec) => (
          <div
            key={spec.label}
            className="flex justify-between gap-4 px-3 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm"
          >
            <dt className="text-muted">{spec.label}</dt>
            <dd className="text-right font-medium text-foreground">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
