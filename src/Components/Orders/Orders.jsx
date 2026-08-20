import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { orders } from "../../data/data";
import "./Orders.css";

const FILTERS = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

const statusClass = (status) => `eh-status eh-status--${status.toLowerCase()}`;

export default function Orders() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  const visible =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="eh-screen">
      <Header title="My Orders" />
      <div className="eh-page">
        <div className="eh-order-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`eh-filter-chip ${filter === f ? "eh-filter-chip--active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="eh-order-list">
          {visible.map((o) => (
            <div key={o.id} className="eh-order-row">
              <div className="eh-order-row-top">
                <span className="eh-order-id">Order ID #{o.id}</span>
                <span className={statusClass(o.status)}>{o.status}</span>
              </div>
              <div className="eh-order-meta">
                {o.date} • {o.itemCount} {o.itemCount === 1 ? "Item" : "Items"}
              </div>
              <div className="eh-order-row-bottom">
                <span className="eh-order-total">₹{o.total}</span>
                <button
                  className="eh-link"
                  onClick={() => navigate(`/orders/${o.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
          {visible.length === 0 && (
            <div className="eh-empty">No {filter.toLowerCase()} orders.</div>
          )}
        </div>
      </div>
    </div>
  );
}
