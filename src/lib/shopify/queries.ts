export const PRODUCTS_QUERY = `
  query GearNestProducts($first: Int!) {
    products(first: $first, sortKey: UPDATED_AT, reverse: true) {
      edges {
        node {
          id
          handle
          title
          productType
          description
          tags
          vendor
          featuredImage {
            url
          }
          images(first: 8) {
            edges {
              node {
                url
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          collections(first: 6) {
            edges {
              node {
                handle
                title
              }
            }
          }
          variants(first: 25) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          metafields(
            identifiers: [
              { namespace: "archive", key: "tagline" }
              { namespace: "archive", key: "specs" }
              { namespace: "custom", key: "tagline" }
            ]
          ) {
            key
            namespace
            value
            type
          }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GearNestProductByHandle($handle: String!) {
      product(handle: $handle) {
      id
      handle
      title
      productType
      description
      tags
      vendor
      featuredImage {
        url
      }
      images(first: 8) {
        edges {
          node {
            url
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      collections(first: 6) {
        edges {
          node {
            handle
            title
          }
        }
      }
      variants(first: 25) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      metafields(
        identifiers: [
          { namespace: "archive", key: "tagline" }
          { namespace: "archive", key: "specs" }
          { namespace: "custom", key: "tagline" }
        ]
      ) {
        key
        namespace
        value
        type
      }
    }
  }
`;

export const CART_CREATE_MUTATION = `
  mutation GearNestCartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;
