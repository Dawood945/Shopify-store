import { shopifyFetch } from "./client";
import { CART_CREATE_MUTATION } from "./queries";

type CartCreateResponse = {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: { field: string[]; message: string }[];
  };
};

export async function createShopifyCheckout(
  lines: { merchandiseId: string; quantity: number }[],
) {
  const data = await shopifyFetch<CartCreateResponse>(CART_CREATE_MUTATION, {
    lines,
  });

  const errors = data.cartCreate.userErrors;
  if (errors?.length) {
    throw new Error(errors.map((e) => e.message).join(", "));
  }

  const checkoutUrl = data.cartCreate.cart?.checkoutUrl;
  if (!checkoutUrl) {
    throw new Error("Shopify did not return a checkout URL");
  }

  return checkoutUrl;
}
