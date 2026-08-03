export type Money = {
  amount: string;
  currencyCode: string;
};

export type ProductImage = {
  url: string;
  altText?: string | null;
  width?: number;
  height?: number;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  selectedOptions: { name: string; value: string }[];
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType?: string;
  featuredImage?: ProductImage | null;
  images?: { nodes: ProductImage[] };
  variants: { nodes: ProductVariant[] };
  priceRange: { minVariantPrice: Money };
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: ProductVariant & {
    product: {
      title: string;
      handle: string;
      featuredImage?: ProductImage | null;
    };
  };
  cost: {
    totalAmount: Money;
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
  };
  lines: { nodes: CartLine[] };
};
