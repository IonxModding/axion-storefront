import { Check, Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProduct } from "../lib/shopify";
import type { Product, ProductVariant } from "../types";

const money = (amount: string, currency: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(Number(amount));

export function ProductPage() {
  const { handle = "" } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [variant, setVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem, loading } = useCart();

  useEffect(() => {
    getProduct(handle).then((result) => {
      setProduct(result);
      setVariant(result?.variants.nodes.find((item) => item.availableForSale) || result?.variants.nodes[0] || null);
    });
  }, [handle]);

  const options = useMemo(() => {
    if (!product) return {};
    return product.variants.nodes.reduce<Record<string, string[]>>((acc, item) => {
      item.selectedOptions.forEach((option) => {
        acc[option.name] = Array.from(new Set([...(acc[option.name] || []), option.value]));
      });
      return acc;
    }, {});
  }, [product]);

  if (!product || !variant) return <div className="loading-page">Loading Collection 001…</div>;

  function chooseOption(name: string, value: string) {
    const current = Object.fromEntries(variant!.selectedOptions.map((option) => [option.name, option.value]));
    current[name] = value;
    const match = product!.variants.nodes.find((item) =>
      item.selectedOptions.every((option) => current[option.name] === option.value)
    );
    if (match) setVariant(match);
  }

  const image = product.images?.nodes?.[0] || product.featuredImage;

  return (
    <section className="product-page">
      <div className="product-gallery">
        <div className="product-hero-image">
          {image?.url ? <img src={image.url} alt={image.altText || product.title} /> : <img src="/logo-mark.svg" alt="" />}
          <span>COLLECTION 001</span>
        </div>
      </div>
      <div className="product-details">
        <p className="eyebrow">AXION · Zenith</p>
        <h1>{product.title}</h1>
        <p className="product-price-large">{money(variant.price.amount, variant.price.currencyCode)}</p>
        <p className="product-description">{product.description}</p>

        {Object.entries(options).map(([name, values]) => (
          <fieldset className="variant-group" key={name}>
            <legend>{name}</legend>
            <div>
              {values.map((value) => {
                const selected = variant.selectedOptions.some((option) => option.name === name && option.value === value);
                return <button className={selected ? "selected" : ""} onClick={() => chooseOption(name, value)} key={value}>{value}</button>;
              })}
            </div>
          </fieldset>
        ))}

        <div className="buy-row">
          <div className="quantity-picker">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15} /></button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}><Plus size={15} /></button>
          </div>
          <button
            className="button primary add-button"
            disabled={!variant.availableForSale || loading}
            onClick={() => addItem(variant.id, quantity)}
          >
            {variant.availableForSale ? "Add to build" : "Sold out"}
          </button>
        </div>

        <div className="product-benefits">
          <p><Check size={17} /> Exclusive Collection 001 design</p>
          <p><Check size={17} /> Quality at a fair price</p>
          <p><Check size={17} /> Secure Shopify checkout</p>
        </div>

        <details open>
          <summary>Builder's note</summary>
          <p>Collection 001 marks the beginning of AXION. Every future collection starts here. Thank you for being part of the build.</p>
        </details>
        <details>
          <summary>Shipping & production</summary>
          <p>This product is made to order by AXION's production partner. Estimated delivery and final shipping costs are shown at Shopify checkout.</p>
        </details>
      </div>
    </section>
  );
}
