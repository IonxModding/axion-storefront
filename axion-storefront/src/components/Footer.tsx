import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Logo />
          <h2>Build Your Space.</h2>
          <p>Quality by design. Fair by price. Built for Builders.</p>
        </div>
        <div className="footer-links">
          <div>
            <h3>Shop</h3>
            <Link to="/collection/zenith">Collection 001</Link>
            <Link to="/collection/zenith">Apparel</Link>
            <Link to="/collection/zenith">Desk</Link>
          </div>
          <div>
            <h3>AXION</h3>
            <Link to="/story">Our Story</Link>
            <Link to="/journal">Journal</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h3>Support</h3>
            <a href="mailto:support@yourdomain.com">Support</a>
            <Link to="/contact">Shipping & Returns</Link>
            <Link to="/contact">Sizing</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} AXION</span>
        <span>COLLECTION 001 · ZENITH</span>
        <span>BUILT FOR BUILDERS.</span>
      </div>
    </footer>
  );
}
