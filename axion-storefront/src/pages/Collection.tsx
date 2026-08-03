import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { getCollectionProducts } from "../lib/shopify";
import type { Product } from "../types";

export function Collection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getCollectionProducts().then(setProducts);
  }, []);

  return (
    <>
      <section className="collection-hero">
        <div>
          <p className="eyebrow">AXION · Collection 001</p>
          <h1>ZENITH</h1>
          <p>Reach Your Highest Point.</p>
        </div>
        <img src="/logo-mark.svg" alt="" />
      </section>
      <section className="collection-copy">
        <p>
          Every Builder starts somewhere. Zenith represents the moment you choose
          progress, purpose, and a space you are proud to return to.
        </p>
      </section>
      <section className="collection-products">
        <div className="section-heading">
          <div><p className="eyebrow">The first chapter</p><h2>Collection 001</h2></div>
        </div>
        <div className="product-grid">
          {products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>
      </section>
    </>
  );
}
