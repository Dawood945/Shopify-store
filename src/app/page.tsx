import { Hero } from "@/components/home/Hero";
import { BundleDeals } from "@/components/home/BundleDeals";
import { EditorialImage } from "@/components/home/EditorialImage";
import { TrendingGrid } from "@/components/home/TrendingGrid";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { SocialProof } from "@/components/home/SocialProof";
import { getBundles, getProducts } from "@/lib/catalog";

export default async function HomePage() {
  const [products, bundleList] = await Promise.all([getProducts(), getBundles()]);

  return (
    <>
      <Hero />
      <BundleDeals bundles={bundleList} />
      <EditorialImage />
      <TrendingGrid products={products} />
      <CategoryTiles />
      <SocialProof />
    </>
  );
}
