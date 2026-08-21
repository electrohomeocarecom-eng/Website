import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import ProductImage from "../ProductImage/ProductImage";
import { getProductImageIndex } from "../../data/data";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

export default function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    subtotal,
    discount,
    delivery,
    total,
    updateQty,
    removeFromCart,
    applyCoupon,
    coupon,
  } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState("");

  const handleApply = () => {
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    setCouponMsg(ok ? "Coupon applied!" : "Invalid coupon code.");
  };

  return (
    <div className="eh-screen">
      <Header title="My Cart" />
      <div className="eh-page">
        {cartItems.length === 0 ? (
          <div className="eh-empty">
            Your cart is empty.
            <div style={{ marginTop: 16 }}>
              <button className="eh-btn eh-btn--primary" onClick={() => navigate("/categories")}>
                Browse Products
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="eh-cart-list">
              {cartItems.map(({ product, qty }) => (
                <div key={product.id} className="eh-cart-row">
                  <ProductImage category={product.category} index={getProductImageIndex(product)} src={product.image} alt={product.name} size={54} />
                  <div className="eh-cart-row-info">
                    <div className="eh-cart-row-name">{product.name}</div>
                    <div className="eh-cart-row-sub">Face Drops</div>
                    <div className="eh-cart-row-price">₹{product.price}</div>
                  </div>
                  <div className="eh-cart-row-actions">
                    <button
                      className="eh-cart-remove"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => removeFromCart(product.id)}
                    >
                      🗑
                    </button>
                    <div className="eh-qty-stepper eh-qty-stepper--sm">
                      <button onClick={() => updateQty(product.id, qty - 1)}>−</button>
                      <span>{qty}</span>
                      <button onClick={() => updateQty(product.id, qty + 1)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="eh-coupon-row">
              <input
                className="eh-input"
                placeholder="Add coupon code"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <button className="eh-btn eh-btn--outline eh-btn--sm" onClick={handleApply}>
                Apply
              </button>
            </div>
            {couponMsg && <div className="eh-coupon-msg">{couponMsg}</div>}
            {coupon && (
              <div className="eh-coupon-msg eh-coupon-msg--active">
                {coupon.code} applied — {coupon.percent}% off
              </div>
            )}

            <div className="eh-summary-card">
              <div className="eh-summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="eh-summary-row">
                <span>Discount</span>
                <span>- ₹{discount}</span>
              </div>
              <div className="eh-summary-row">
                <span>Delivery</span>
                <span>₹{delivery}</span>
              </div>
              <div className="eh-summary-row eh-summary-row--total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              className="eh-btn eh-btn--primary"
              style={{ marginTop: 16 }}
              onClick={() => navigate("/checkout")}
            >
              🛒 Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
