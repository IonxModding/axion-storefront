import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../types";

const money = (amount: string, currency: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(Number(amount));

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const price = product.priceRange.minVariantPrice;
  return (
    <Link className="product-card" to={`/products/${product.handle}`}>
      <div className="product-image">
        {product.featuredImage?.url ? (
          <img src={product.featuredImage.url} alt={product.featuredImage.altText || product.title} />
        ) : (
          <div className="image-placeholder"><img src="/logo-mark.svg" alt="" /></div>
        )}
        <span className="product-index">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="product-meta">
        <div>
          <p>{product.productType || "Collection 001"}</p>
          <h3>{product.title}</h3>
        </div>
        <div className="product-price">
          <strong>{money(price.amount, price.currencyCode)}</strong>
          <ArrowUpRight size={18} />
        </div>
      </div>
    </Link>
  );
}
