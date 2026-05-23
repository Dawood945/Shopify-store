import { shopifyFetch } from "./client";
import { mapShopifyProduct } from "./mappers";
import {
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCTS_QUERY,
} from "./queries";

type ProductsResponse = {
  products: {
    edges: { node: Parameters<typeof mapShopifyProduct>[0] }[];
  };
};

type ProductByHandleResponse = {
  product: Parameters<typeof mapShopifyProduct>[0] | null;
};

export async function fetchShopifyProducts(limit = 50) {
  const data = await shopifyFetch<ProductsResponse>(PRODUCTS_QUERY, {
    first: limit,
  });
  return data.products.edges.map((edge) => mapShopifyProduct(edge.node));
}

export async function fetchShopifyProductByHandle(handle: string) {
  const data = await shopifyFetch<ProductByHandleResponse>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
  );
  if (!data.product) return undefined;
  return mapShopifyProduct(data.product);
}
