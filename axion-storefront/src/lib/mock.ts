import type { Product } from "../types";

export const mockProducts: Product[] = [
  {
    id: "mock-hoodie",
    handle: "zenith-heavyweight-hoodie",
    title: "Zenith Heavyweight Hoodie",
    description: "Collection 001 — Zenith. A premium hoodie made for Builders who value comfort, purpose, and timeless design.",
    productType: "Hoodie",
    featuredImage: { url: "/products/hoodie-black.png", altText: "Black Zenith hoodie" },
    images: { nodes: [{ url: "/products/hoodie-black.png", altText: "Black Zenith hoodie" }] },
    variants: {
      nodes: [{
        id: "mock-hoodie-variant",
        title: "Default",
        availableForSale: true,
        price: { amount: "49.99", currencyCode: "USD" },
        selectedOptions: []
      }]
    },
    priceRange: { minVariantPrice: { amount: "49.99", currencyCode: "USD" } }
  },
  {
    id: "mock-tee",
    handle: "zenith-heavyweight-tee",
    title: "Zenith Heavyweight Tee",
    description: "Collection 001 — Zenith. Clean, comfortable, and designed to become part of your everyday space.",
    productType: "T-Shirt",
    featuredImage: { url: "/products/tee-black.png", altText: "Black Zenith tee" },
    images: { nodes: [{ url: "/products/tee-black.png", altText: "Black Zenith tee" }] },
    variants: {
      nodes: [{
        id: "mock-tee-variant",
        title: "Default",
        availableForSale: true,
        price: { amount: "34.99", currencyCode: "USD" },
        selectedOptions: []
      }]
    },
    priceRange: { minVariantPrice: { amount: "34.99", currencyCode: "USD" } }
  },
  {
    id: "mock-mat",
    handle: "zenith-desk-mat",
    title: "Zenith Desk Mat",
    description: "The foundation of your setup. A smooth, anti-slip desk mat created for work, gaming, and everything in between.",
    productType: "Desk Mat",
    featuredImage: { url: "/products/desk-mat.png", altText: "Zenith desk mat" },
    images: { nodes: [{ url: "/products/desk-mat.png", altText: "Zenith desk mat" }] },
    variants: {
      nodes: [{
        id: "mock-mat-variant",
        title: "16 × 32",
        availableForSale: true,
        price: { amount: "29.99", currencyCode: "USD" },
        selectedOptions: [{ name: "Size", value: "16 × 32" }]
      }]
    },
    priceRange: { minVariantPrice: { amount: "29.99", currencyCode: "USD" } }
  },
  {
    id: "mock-stickers",
    handle: "zenith-sticker-pack",
    title: "Zenith Sticker Pack",
    description: "Five collectible designs from Collection 001, created to leave your mark wherever you build.",
    productType: "Stickers",
    featuredImage: { url: "/products/stickers.png", altText: "Zenith sticker pack" },
    images: { nodes: [{ url: "/products/stickers.png", altText: "Zenith sticker pack" }] },
    variants: {
      nodes: [{
        id: "mock-stickers-variant",
        title: "Default",
        availableForSale: true,
        price: { amount: "9.99", currencyCode: "USD" },
        selectedOptions: []
      }]
    },
    priceRange: { minVariantPrice: { amount: "9.99", currencyCode: "USD" } }
  }
];
