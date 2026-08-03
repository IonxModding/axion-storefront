import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid" />
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .75 }}
      >
        <p className="eyebrow">AXION · COLLECTION 001</p>
        <h1>BUILD<br />YOUR<br /><span>SPACE.</span></h1>
        <p className="hero-intro">
          Premium apparel and desk essentials designed for Builders who value
          quality, purpose, and timeless design.
        </p>
        <div className="hero-actions">
          <Link className="button primary" to="/collection/zenith">
            Explore Zenith <ArrowRight size={17} />
          </Link>
          <Link className="button secondary" to="/story">Our story</Link>
        </div>
      </motion.div>
      <div className="hero-art">
        <img src="/logo-mark.svg" alt="AXION logo" />
        <span className="orbit orbit-one" />
        <span className="orbit orbit-two" />
        <div className="hero-art-label">
          <span>001</span>
          <strong>ZENITH</strong>
          <small>Reach Your Highest Point.</small>
        </div>
      </div>
    </section>
  );
}
