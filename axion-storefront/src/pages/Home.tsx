import { useEffect, useState } from "react";
import { ArrowRight, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Hero } from "../components/Hero";
import { ProductCard } from "../components/ProductCard";
import { getCollectionProducts } from "../lib/shopify";
import type { Product } from "../types";

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getCollectionProducts().then(setProducts);
  }, []);

  return (
    <>
      <Hero />
      <section className="manifesto">
        <p className="eyebrow">The AXION promise</p>
        <h2>Quality that feels worth every dollar.</h2>
        <p>
          We create premium setup products and apparel at a fair price—thoughtful
          in appearance, dependable in use, and designed to become part of your everyday space.
        </p>
      </section>

      <section className="collection-preview">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Collection 001</p>
            <h2>Zenith</h2>
          </div>
          <Link to="/collection/zenith">View collection <ArrowRight size={17} /></Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className="principles">
        <article>
          <ShieldCheck />
          <span>01</span>
          <h3>Worth it by design.</h3>
          <p>Products are tested against one standard: would we proudly spend our own money on it?</p>
        </article>
        <article>
          <Layers3 />
          <span>02</span>
          <h3>Made for real spaces.</h3>
          <p>Gaming room, dorm, studio, or office—AXION belongs anywhere meaningful work happens.</p>
        </article>
        <article>
          <Sparkles />
          <span>03</span>
          <h3>Details matter.</h3>
          <p>Every placement, material, message, and collection mark exists for a reason.</p>
        </article>
      </section>

      <section className="builder-feature">
        <div className="builder-visual">
          <div className="technical-lines" />
          <img src="/logo-mark.svg" alt="" />
          <span>BUILDER · 001</span>
        </div>
        <div>
          <p className="eyebrow">Builder spotlight</p>
          <h2>Your space could be next.</h2>
          <p>
            AXION celebrates the desks, studios, gaming rooms, offices, and creative
            environments built by our community.
          </p>
          <Link className="text-link" to="/contact">Submit your build <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="newsletter">
        <div>
          <p className="eyebrow">Join the Builders</p>
          <h2>Get first access to what comes next.</h2>
        </div>
        <form name="newsletter" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="newsletter" />
          <input required type="email" name="email" placeholder="Email address" aria-label="Email address" />
          <button className="button primary">Join AXION</button>
        </form>
      </section>
    </>
  );
}
