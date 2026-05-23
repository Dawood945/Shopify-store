import { NextResponse } from "next/server";
import { getProductBySlug, getVariantIdForSize, isShopifyEnabled } from "@/lib/catalog";
import { createShopifyCheckout } from "@/lib/shopify/cart";

export async function POST(request: Request) {
  if (!isShopifyEnabled()) {
    return NextResponse.json(
      { error: "Shopify is not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as {
      slug: string;
      size: string;
      quantity?: number;
    };

    const product = await getProductBySlug(body.slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const variantId = getVariantIdForSize(product, body.size);
    if (!variantId) {
      return NextResponse.json({ error: "Variant not found for size" }, { status: 400 });
    }

    const checkoutUrl = await createShopifyCheckout([
      { merchandiseId: variantId, quantity: body.quantity ?? 1 },
    ]);

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
