import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Logo } from "./Logo";

const links = [
  ["/collection/zenith", "Collection 001"],
  ["/story", "Our Story"],
  ["/journal", "Journal"],
  ["/contact", "Contact"]
];

export function Header() {
  const [mobile, setMobile] = useState(false);
  const { cart, openCart } = useCart();

  return (
    <>
      <div className="announcement">COLLECTION 001 — ZENITH · BUILD YOUR SPACE.</div>
      <header className="site-header">
        <Logo />
        <nav className="desktop-nav">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to}>{label}</NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button cart-button" onClick={openCart} aria-label="Open cart">
            <ShoppingBag size={20} />
            {(cart?.totalQuantity || 0) > 0 && <span>{cart?.totalQuantity}</span>}
          </button>
          <button className="icon-button mobile-toggle" onClick={() => setMobile(!mobile)} aria-label="Open menu">
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {mobile && (
        <nav className="mobile-nav">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setMobile(false)}>{label}</NavLink>
          ))}
        </nav>
      )}
    </>
  );
}
