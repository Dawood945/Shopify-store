import { notFound } from "next/navigation";
import { getProductBySlug, getProductSlugs } from "@/lib/catalog";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { ProductFAQ } from "@/components/product/ProductFAQ";
import { BundleUpsell } from "@/components/product/BundleUpsell";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { MobileStickyBar } from "@/components/product/MobileStickyBar";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return { title: product.name, description: product.tagline };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-7xl px-3 pt-4 sm:px-6 sm:pb-12 sm:pt-10 lg:px-8 lg:pt-12">
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-16">
        <ProductGallery product={product} />
        <PurchasePanel product={product} />
      </div>
      <div className="mt-8 max-w-2xl lg:mt-16 lg:max-w-none">
        <BundleUpsell productSlug={product.slug} />
        <ProductSpecs product={product} />
        <ProductFAQ />
      </div>
      <div className="mt-8 lg:mt-16">
        <TrustBadges />
      </div>
      <MobileStickyBar product={product} />
    </div>
  );
}
