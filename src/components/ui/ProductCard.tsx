import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/catalog";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
  variant?: "default" | "featured";
  priority?: boolean;
};

export function ProductCard({ product, variant = "default", priority = false }: ProductCardProps) {
  return (
    <article
      className={`card-elevated group flex h-full flex-col ${variant === "featured" ? "lg:min-h-full" : ""}`}
    >
      <Link href={`/products/${product.slug}`} className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading={priority ? "eager" : "lazy"}
        />
        {product.trending && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent-foreground)]">
            Trending
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
          {product.category}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-1 text-sm text-visible-muted">{product.tagline}</p>
        <p className="mt-auto pt-2 text-lg font-bold text-foreground">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
