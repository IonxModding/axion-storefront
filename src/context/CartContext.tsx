import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Cart } from "../types";
import {
  addCartLines,
  createCart,
  getCart,
  removeCartLines,
  shopifyConfigured,
  updateCartLines
} from "../lib/shopify";

type CartContextValue = {
  cart: Cart | null;
  isOpen: boolean;
  loading: boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_KEY = "axion_cart_id";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cartId = localStorage.getItem(CART_KEY);
    if (!cartId || !shopifyConfigured) return;
    getCart(cartId).then(setCart).catch(() => localStorage.removeItem(CART_KEY));
  }, []);

  async function addItem(variantId: string, quantity = 1) {
    if (!shopifyConfigured) {
      setError("Connect Shopify in .env to enable live checkout.");
      setOpen(true);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const next = cart
        ? await addCartLines(cart.id, variantId, quantity)
        : await createCart(variantId, quantity);
      setCart(next);
      localStorage.setItem(CART_KEY, next.id);
      setOpen(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not add this item.");
    } finally {
      setLoading(false);
    }
  }

  async function updateItem(lineId: string, quantity: number) {
    if (!cart) return;
    setLoading(true);
    try {
      const next = quantity <= 0
        ? await removeCartLines(cart.id, [lineId])
        : await updateCartLines(cart.id, lineId, quantity);
      setCart(next);
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(lineId: string) {
    if (!cart) return;
    setLoading(true);
    try {
      setCart(await removeCartLines(cart.id, [lineId]));
    } finally {
      setLoading(false);
    }
  }

  const value = useMemo(() => ({
    cart,
    isOpen,
    loading,
    error,
    openCart: () => setOpen(true),
    closeCart: () => setOpen(false),
    addItem,
    updateItem,
    removeItem
  }), [cart, isOpen, loading, error]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
