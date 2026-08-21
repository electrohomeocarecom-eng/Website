import React, { createContext, useContext, useMemo, useState } from "react";
import { useCatalog } from "./CatalogContext";

const CartContext = createContext(null);

const DELIVERY_FEE = 40;

export function CartProvider({ children }) {
  const { getProduct } = useCatalog();

  // lines: [{ productId, qty }]
  const [lines, setLines] = useState([
    { productId: "rhus-tox", qty: 1 },
    { productId: "natrum-mur", qty: 1 },
    { productId: "arnica-montana", qty: 1 },
  ]);
  const [coupon, setCoupon] = useState(null);

  const addToCart = (productId, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId ? { ...l, qty: l.qty + qty } : l
        );
      }
      return [...prev, { productId, qty }];
    });
  };

  const updateQty = (productId, qty) => {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((l) => l.productId !== productId);
      return prev.map((l) => (l.productId === productId ? { ...l, qty } : l));
    });
  };

  const removeFromCart = (productId) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  };

  const applyCoupon = (code) => {
    // Placeholder coupon logic — wire up to a real promo API later.
    if (code.trim().toUpperCase() === "SAVE10") {
      setCoupon({ code: "SAVE10", percent: 10 });
      return true;
    }
    setCoupon(null);
    return false;
  };

  const cartItems = useMemo(
    () =>
      lines
        .map((l) => ({ ...l, product: getProduct(l.productId) }))
        .filter((l) => l.product),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lines, getProduct]
  );

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty, 0),
    [lines]
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, l) => sum + l.product.price * l.qty, 0),
    [cartItems]
  );

  const discount = coupon ? Math.round((subtotal * coupon.percent) / 100) : 0;
  const delivery = cartItems.length ? DELIVERY_FEE : 0;
  const total = subtotal - discount + delivery;

  const value = {
    cartItems,
    itemCount,
    subtotal,
    discount,
    delivery,
    total,
    coupon,
    addToCart,
    updateQty,
    removeFromCart,
    applyCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
