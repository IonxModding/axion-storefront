import type { Cart, Product } from "../types";
import { mockProducts } from "./mock";

const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const version = import.meta.env.VITE_SHOPIFY_API_VERSION || "2026-07";
const collectionHandle = import.meta.env.VITE_SHOPIFY_COLLECTION_HANDLE || "collection-001-zenith";

export const shopifyConfigured = Boolean(domain && token);

async function storefrontFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!shopifyConfigured) throw new Error("Shopify is not configured.");

  const response = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token
    },
    body: JSON.stringify({ query, variables })
  });

  const payload = await response.json();
  if (!response.ok || payload.errors) {
    throw new Error(payload.errors?.[0]?.message || `Shopify request failed (${response.status})`);
  }
  return payload.data as T;
}

const PRODUCT_FRAGMENT = `
  fragment ProductCard on Product {
    id
    handle
    title
    description
    productType
    featuredImage { url altText width height }
    images(first: 8) { nodes { url altText width height } }
    priceRange { minVariantPrice { amount currencyCode } }
    variants(first: 100) {
      nodes {
        id
        title
        availableForSale
        price { amount currencyCode }
        selectedOptions { name value }
      }
    }
  }
`;

export async function getCollectionProducts(): Promise<Product[]> {
  if (!shopifyConfigured) return mockProducts;

  const data = await storefrontFetch<{
    collection: { products: { nodes: Product[] } } | null;
  }>(`
    ${PRODUCT_FRAGMENT}
    query CollectionProducts($handle: String!) {
      collection(handle: $handle) {
        products(first: 50) { nodes { ...ProductCard } }
      }
    }
  `, { handle: collectionHandle });

  return data.collection?.products.nodes?.length ? data.collection.products.nodes : mockProducts;
}

export async function getProduct(handle: string): Promise<Product | null> {
  if (!shopifyConfigured) return mockProducts.find((product) => product.handle === handle) || null;

  const data = await storefrontFetch<{ product: Product | null }>(`
    ${PRODUCT_FRAGMENT}
    query ProductByHandle($handle: String!) {
      product(handle: $handle) { ...ProductCard }
    }
  `, { handle });

  return data.product;
}

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        cost { totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            availableForSale
            price { amount currencyCode }
            selectedOptions { name value }
            product {
              title
              handle
              featuredImage { url altText width height }
            }
          }
        }
      }
    }
  }
`;

export async function createCart(merchandiseId: string, quantity = 1): Promise<Cart> {
  const data = await storefrontFetch<{ cartCreate: { cart: Cart; userErrors: { message: string }[] } }>(`
    ${CART_FRAGMENT}
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { ...CartFields }
        userErrors { message }
      }
    }
  `, { input: { lines: [{ merchandiseId, quantity }] } });

  const error = data.cartCreate.userErrors?.[0];
  if (error) throw new Error(error.message);
  return data.cartCreate.cart;
}

export async function addCartLines(cartId: string, merchandiseId: string, quantity = 1): Promise<Cart> {
  const data = await storefrontFetch<{ cartLinesAdd: { cart: Cart; userErrors: { message: string }[] } }>(`
    ${CART_FRAGMENT}
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { message }
      }
    }
  `, { cartId, lines: [{ merchandiseId, quantity }] });

  const error = data.cartLinesAdd.userErrors?.[0];
  if (error) throw new Error(error.message);
  return data.cartLinesAdd.cart;
}

export async function updateCartLines(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const data = await storefrontFetch<{ cartLinesUpdate: { cart: Cart; userErrors: { message: string }[] } }>(`
    ${CART_FRAGMENT}
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { message }
      }
    }
  `, { cartId, lines: [{ id: lineId, quantity }] });

  const error = data.cartLinesUpdate.userErrors?.[0];
  if (error) throw new Error(error.message);
  return data.cartLinesUpdate.cart;
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await storefrontFetch<{ cartLinesRemove: { cart: Cart; userErrors: { message: string }[] } }>(`
    ${CART_FRAGMENT}
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
        userErrors { message }
      }
    }
  `, { cartId, lineIds });

  const error = data.cartLinesRemove.userErrors?.[0];
  if (error) throw new Error(error.message);
  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await storefrontFetch<{ cart: Cart | null }>(`
    ${CART_FRAGMENT}
    query Cart($id: ID!) { cart(id: $id) { ...CartFields } }
  `, { id: cartId });

  return data.cart;
}
