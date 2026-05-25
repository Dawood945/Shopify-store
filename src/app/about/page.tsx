import Link from "next/link";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="section-label">Our story</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight-headline text-foreground sm:text-5xl">
        Engineered for how you shop
      </h1>
      <div className="mt-8 space-y-6 text-base leading-relaxed text-visible-muted">
        <p>
          GearNest is a modern storefront built around three pillars—electronics,
          toys, and gears—with bundle discounts that reward buying complete
          setups instead of single items.
        </p>
        <p>
          We believe shopping should feel intentional: clear categories, icon-led
          navigation on mobile, and transparent pricing with savings shown
          upfront on every bundle.
        </p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Categories", value: "3" },
          { label: "Bundle savings", value: "Up to 20%" },
          { label: "Avg. rating", value: "4.9" },
        ].map((stat) => (
          <div key={stat.label} className="card-elevated p-6 text-center">
            <p className="text-3xl font-bold text-accent">{stat.value}</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-visible-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/collections" className="btn-primary">
          Start shopping
        </Link>
        <Link href="/bundles" className="btn-pill">
          View bundles
        </Link>
      </div>
    </div>
  );
}
