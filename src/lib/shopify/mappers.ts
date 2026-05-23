import type { Category, Product, ProductVariant } from "@/lib/types";
import { HANDLE_TO_CATEGORY } from "./config";

type ShopifyMoney = { amount: string; currencyCode: string };
type ShopifyMetafield = {
  key: string;
  namespace: string;
  value: string;
  type: string;
};
type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  selectedOptions: { name: string; value: string }[];
};
type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags: string[];
  vendor?: string;
  featuredImage?: { url: string } | null;
  images: { edges: { node: { url: string } }[] };
  priceRange: { minVariantPrice: ShopifyMoney };
  collections: { edges: { node: { handle: string; title: string } }[] };
  variants: { edges: { node: ShopifyVariant }[] };
  metafields?: (ShopifyMetafield | null)[];
};

function resolveCategory(node: ShopifyProductNode): Category {
  for (const edge of node.collections.edges) {
    const handle = edge.node.handle.toLowerCase();
    if (HANDLE_TO_CATEGORY[handle]) return HANDLE_TO_CATEGORY[handle];
  }
  if (node.tags.includes("category:electronics")) return "electronics";
  if (node.tags.includes("category:toys")) return "toys";
  if (node.tags.includes("category:gears")) return "gears";
  return "electronics";
}

function getMetafield(node: ShopifyProductNode, key: string): string | undefined {
  const field = node.metafields?.find(
    (m) => m && (m.key === key) && (m.namespace === "archive" || m.namespace === "custom"),
  );
  return field?.value;
}

function parseSpecs(node: ShopifyProductNode): { label: string; value: string }[] {
  const raw = getMetafield(node, "specs");
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as { label: string; value: string }[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mapVariants(nodes: ShopifyVariant[]): ProductVariant[] {
  return nodes.map((v) => {
    const sizeOption = v.selectedOptions.find(
      (o) => o.name.toLowerCase() === "size" || o.name.toLowerCase() === "title",
    );
    const size = sizeOption?.value ?? v.title;
    return {
      id: v.id,
      size,
      price: Math.round(parseFloat(v.price.amount)),
      available: v.availableForSale,
    };
  });
}

export function mapShopifyProduct(node: ShopifyProductNode): Product {
  const variants = mapVariants(node.variants.edges.map((e) => e.node));
  const images = node.images.edges.map((e) => e.node.url);
  const image = node.featuredImage?.url ?? images[0] ?? "";
  const description = node.description?.trim() ?? "";
  const tagline =
    getMetafield(node, "tagline") ??
    (description.split(".")[0]?.trim() || node.vendor || "");

  const sizes =
    variants.length > 0
      ? variants.map((v) => v.size)
      : ["One Size"];

  const price =
    variants.length > 0
      ? Math.min(...variants.map((v) => v.price))
      : Math.round(parseFloat(node.priceRange.minVariantPrice.amount));

  return {
    id: node.id,
    slug: node.handle,
    name: node.title,
    price,
    category: resolveCategory(node),
    sizes,
    image,
    images: images.length ? images : [image],
    tagline,
    description,
    specs: parseSpecs(node),
    trending: node.tags.some((t) => t.toLowerCase() === "trending"),
    shopifyProductId: node.id,
    variants,
  };
}
