import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";

export function CategoryTiles() {
  return (
    <section className="section-alt border-b border-[var(--border-strong)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="section-label">Browse</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight-headline text-foreground">
          Shop by Category
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/collections?category=${cat.slug}`}
              className="card-elevated group relative min-h-[240px] sm:min-h-[300px]"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-background/10" />
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-2xl font-bold tracking-tight-headline text-foreground">
                  {cat.name}
                </h3>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Explore
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
