import React from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import ProductImage from "../ProductImage/ProductImage";
import { getProductImageIndex, deliveryAddress, getOrder } from "../../data/data";
import { useCatalog } from "../../context/CatalogContext";
import "./OrderDetails.css";

const statusClass = (status) => `eh-status eh-status--${status.toLowerCase()}`;

export default function OrderDetails() {
  const { orderId } = useParams();
  const { getProduct } = useCatalog();
  const order = getOrder(orderId);

  if (!order) {
    return (
      <div className="eh-screen">
        <Header title="Order Details" />
        <div className="eh-empty">Order not found.</div>
      </div>
    );
  }

  return (
    <div className="eh-screen">
      <Header title="Order Details" />
      <div className="eh-page">
        <div className="eh-card">
          <div className="eh-order-row-top">
            <span className="eh-order-id">Order ID #{order.id}</span>
            <span className={statusClass(order.status)}>{order.status}</span>
          </div>
          <div className="eh-order-meta" style={{ marginBottom: 0 }}>
            {order.date}
            {order.time ? ` at ${order.time}` : ""}
          </div>
        </div>

        <div className="eh-section-head">
          <h3>Delivery Address</h3>
        </div>
        <div className="eh-card">
          <div className="eh-address-name">{deliveryAddress.name}</div>
          <div className="eh-address-line">{deliveryAddress.line1}</div>
          <div className="eh-address-line">{deliveryAddress.line2}</div>
          <div className="eh-address-line">{deliveryAddress.phone}</div>
        </div>

        <div className="eh-section-head">
          <h3>Order Items</h3>
        </div>
        <div className="eh-order-items-list">
          {order.items.map((line) => {
            const product = getProduct(line.id);
            if (!product) return null;
            return (
              <div key={line.id} className="eh-order-item-row">
                <ProductImage category={product.category} index={getProductImageIndex(product)} src={product.image} alt={product.name} size={46} />
                <div className="eh-order-item-info">
                  <div className="eh-cart-row-name">{product.name}</div>
                  <div className="eh-cart-row-sub">Face Drops</div>
                </div>
                <div className="eh-order-item-price">₹{product.price}</div>
                <div className="eh-order-item-qty">Qty: {line.qty}</div>
              </div>
            );
          })}
        </div>

        <div className="eh-summary-card">
          <div className="eh-summary-row">
            <span>Subtotal</span>
            <span>₹{order.subtotal}</span>
          </div>
          <div className="eh-summary-row">
            <span>Delivery</span>
            <span>₹{order.delivery}</span>
          </div>
          <div className="eh-summary-row eh-summary-row--total">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
