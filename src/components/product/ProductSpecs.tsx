import type { Product } from "@/lib/types";

export function ProductSpecs({ product }: { product: Product }) {
  return (
    <section className="border-t border-border pt-10">
      <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
        Technical Specs
      </h2>
      <dl className="mt-6 divide-y divide-border rounded-[4px] border border-border">
        {product.specs.map((spec) => (
          <div
            key={spec.label}
            className="flex justify-between gap-4 px-4 py-3 text-sm sm:px-5"
          >
            <dt className="text-muted">{spec.label}</dt>
            <dd className="text-right font-medium text-foreground">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
