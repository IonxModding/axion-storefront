import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const money = (amount?: string, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(Number(amount || 0));

export function CartDrawer() {
  const { cart, isOpen, closeCart, loading, error, updateItem, removeItem } = useCart();

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onMouseDown={closeCart}>
      <aside className="cart-drawer" onMouseDown={(event) => event.stopPropagation()}>
        <div className="cart-header">
          <div>
            <p className="eyebrow">Your build</p>
            <h2>Cart <span>({cart?.totalQuantity || 0})</span></h2>
          </div>
          <button className="icon-button" onClick={closeCart}><X /></button>
        </div>

        {error && <div className="cart-error">{error}</div>}

        {!cart?.lines.nodes.length ? (
          <div className="empty-cart">
            <img src="/logo-mark.svg" alt="" />
            <h3>Your space is waiting.</h3>
            <p>Add something from Collection 001 to begin your build.</p>
            <button className="button primary" onClick={closeCart}>Continue shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {cart.lines.nodes.map((line) => (
                <article className="cart-line" key={line.id}>
                  <img
                    src={line.merchandise.product.featuredImage?.url || "/logo-mark.svg"}
                    alt={line.merchandise.product.title}
                  />
                  <div>
                    <h3>{line.merchandise.product.title}</h3>
                    <p>{line.merchandise.title !== "Default Title" ? line.merchandise.title : "Collection 001"}</p>
                    <strong>{money(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}</strong>
                    <div className="quantity-controls">
                      <button disabled={loading} onClick={() => updateItem(line.id, line.quantity - 1)}><Minus size={14} /></button>
                      <span>{line.quantity}</span>
                      <button disabled={loading} onClick={() => updateItem(line.id, line.quantity + 1)}><Plus size={14} /></button>
                      <button className="remove" disabled={loading} onClick={() => removeItem(line.id)}><Trash2 size={15} /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="cart-footer">
              <div><span>Subtotal</span><strong>{money(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}</strong></div>
              <p>Shipping and taxes are calculated securely by Shopify at checkout.</p>
              <a className="button primary checkout" href={cart.checkoutUrl}>Secure checkout</a>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
