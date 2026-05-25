import type { CurrencyCode } from "./currency";

export type Category = "electronics" | "toys" | "gears";

export type ProductVariant = {
  id: string;
  size: string;
  price: number;
  available: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: Category;
  sizes: string[];
  image: string;
  images: string[];
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  trending?: boolean;
  comparePrice?: number;
  rating?: number;
  reviewCount?: number;
  stock?: number;
  currency?: CurrencyCode;
  /** Set when loaded from Shopify Storefront API */
  shopifyProductId?: string;
  variants?: ProductVariant[];
};

export type Bundle = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  productSlugs: string[];
  discountPercent: number;
};

export type CartItem = {
  productId: string;
  variantId?: string;
  size: string;
  quantity: number;
};
