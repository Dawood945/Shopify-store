import {
  bundles as mockBundles,
  categories as mockCategories,
  formatPrice,
  getBundleBySlug as getMockBundleBySlug,
  getBundlePricing as getMockBundlePricing,
  getProductBySlug as getMockProductBySlug,
  products as mockProducts,
} from "@/lib/data";
import { getShopifyConfig } from "@/lib/shopify/config";
import {
  fetchShopifyProductByHandle,
  fetchShopifyProducts,
} from "@/lib/shopify/products";
import type { Bundle, Product } from "@/lib/types";

export { formatPrice, mockCategories as categories };

export function isShopifyEnabled() {
  return getShopifyConfig().isConfigured;
}

export async function getProducts(): Promise<Product[]> {
  if (isShopifyEnabled()) {
    try {
      const products = await fetchShopifyProducts(50);
      if (products.length > 0) return products;
    } catch (error) {
      console.error("[catalog] Shopify products fetch failed:", error);
    }
  }
  return mockProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (isShopifyEnabled()) {
    try {
      const product = await fetchShopifyProductByHandle(slug);
      if (product) return product;
    } catch (error) {
      console.error(`[catalog] Shopify product "${slug}" fetch failed:`, error);
    }
  }
  return getMockProductBySlug(slug);
}

export async function getProductSlugs(): Promise<string[]> {
  const products = await getProducts();
  return products.map((p) => p.slug);
}

/** Bundles are local until modeled as Shopify bundles/discounts */
export const bundles = mockBundles;

export async function getBundles(): Promise<Bundle[]> {
  return mockBundles;
}

export async function getBundleBySlug(slug: string): Promise<Bundle | undefined> {
  return getMockBundleBySlug(slug);
}

export async function getBundlePricing(bundle: Bundle) {
  const items = (
    await Promise.all(
      bundle.productSlugs.map((slug) => getProductBySlug(slug)),
    )
  ).filter((p): p is Product => Boolean(p));

  const original = items.reduce((sum, p) => sum + p.price, 0);
  const discounted = Math.round(original * (1 - bundle.discountPercent / 100));
  const savings = original - discounted;
  return { original, discounted, savings, items };
}

export function getVariantIdForSize(product: Product, size: string): string | undefined {
  if (!product.variants?.length) return undefined;
  return product.variants.find((v) => v.size === size)?.id;
}
