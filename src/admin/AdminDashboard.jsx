import React from "react";
import { Link } from "react-router-dom";
import { useCatalog } from "../context/CatalogContext";

export default function AdminDashboard() {
  const { products, categories, banner } = useCatalog();

  const countByCategory = categories.map((c) => ({
    ...c,
    count: products.filter((p) => p.category === c.id).length,
  }));

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-sub">A quick look at your catalog.</p>

      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-num">{products.length}</div>
          <div className="admin-stat-label">Total Products</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-num">{categories.length}</div>
          <div className="admin-stat-label">Categories</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-num">{banner.image ? "Custom" : "Default"}</div>
          <div className="admin-stat-label">Offer Banner</div>
        </div>
      </div>

      <div className="admin-section-head">
        <h2>Products by Category</h2>
        <Link to="/admin/products" className="admin-link">
          Manage Products →
        </Link>
      </div>
      <div className="admin-card">
        {countByCategory.map((c) => (
          <div key={c.id} className="admin-cat-row">
            <span>{c.name}</span>
            <span className="admin-cat-count">{c.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
