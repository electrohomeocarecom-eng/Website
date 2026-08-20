import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { useCart } from "../../context/CartContext";
import { deliveryAddress } from "../../data/data";
import "./Checkout.css";

const PAYMENT_METHODS = ["UPI / Google Pay", "Credit / Debit Card", "Cash on Delivery"];

export default function Checkout() {
  const navigate = useNavigate();
  const { subtotal, discount, delivery, total, cartItems } = useCart();
  const [payment, setPayment] = useState(PAYMENT_METHODS[0]);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    // In a real app this would call an orders API, then route to the new order.
    navigate("/orders");
  };

  return (
    <div className="eh-screen">
      <Header title="Checkout" />
      <div className="eh-page">
        <div className="eh-section-head" style={{ marginTop: 0 }}>
          <h3>Delivery Address</h3>
          <button className="eh-link">+ Add New</button>
        </div>
        <div className="eh-address-card">
          <span className="eh-radio eh-radio--checked" />
          <div className="eh-address-info">
            <div className="eh-address-name">{deliveryAddress.name}</div>
            <div className="eh-address-line">{deliveryAddress.line1}</div>
            <div className="eh-address-line">{deliveryAddress.line2}</div>
            <div className="eh-address-line">{deliveryAddress.phone}</div>
          </div>
          <button className="eh-link">Edit</button>
        </div>

        <div className="eh-section-head">
          <h3>Payment Method</h3>
        </div>
        <div className="eh-payment-list">
          {PAYMENT_METHODS.map((m) => (
            <button
              key={m}
              className="eh-payment-row"
              onClick={() => setPayment(m)}
            >
              <span>{m}</span>
              <span className={`eh-radio ${payment === m ? "eh-radio--checked" : ""}`} />
            </button>
          ))}
        </div>

        <div className="eh-section-head">
          <h3>Order Summary</h3>
        </div>
        <div className="eh-summary-card" style={{ marginTop: 0 }}>
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
          onClick={handlePlaceOrder}
        >
          🔒 Place Order
        </button>
        <div className="eh-secure-note">🔒 100% Secure Payments</div>
      </div>
    </div>
  );
}
