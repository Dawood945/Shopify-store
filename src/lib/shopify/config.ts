import type { Category } from "@/lib/types";

export const SHOPIFY_API_VERSION = "2025-01";

/** Map ARCHIVE categories to Shopify collection handles */
export const COLLECTION_HANDLE_MAP: Record<Category, string> = {
  electronics: "electronics",
  toys: "toys",
  gears: "gears",
};

export const HANDLE_TO_CATEGORY: Record<string, Category> = {
  electronics: "electronics",
  toys: "toys",
  gears: "gears",
  gear: "gears",
};

export function getShopifyConfig() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();

  return {
    storeDomain,
    storefrontToken,
    isConfigured: Boolean(storeDomain && storefrontToken),
  };
}

export function getStorefrontApiUrl() {
  const { storeDomain } = getShopifyConfig();
  if (!storeDomain) return null;
  const host = storeDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `https://${host}/api/${SHOPIFY_API_VERSION}/graphql.json`;
}
