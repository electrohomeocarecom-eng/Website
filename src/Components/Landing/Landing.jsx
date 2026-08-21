import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import ProductImage from "../ProductImage/ProductImage";
import { getProductImageIndex, trendingIds } from "../../data/data";
import { useCatalog } from "../../context/CatalogContext";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();
  const { products, categories, banner } = useCatalog();
  const [activeCat, setActiveCat] = useState(categories[0].id);

  const trending = trendingIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const filtered = products.filter((p) => p.category === activeCat);

  return (
    <div className="eh-screen">
      <Header variant="brand" />

      <div className="eh-page">
        <button
          className="eh-search-bar"
          onClick={() => navigate("/categories")}
        >
          <span className="eh-search-icon">🔍</span>
          <span className="eh-search-placeholder">Explore our products</span>
          <span className="eh-search-cat">▦ Categories</span>
        </button>

        <div
          className={`eh-offer-banner ${banner.image ? "eh-offer-banner--has-image" : ""}`}
          style={banner.image ? { backgroundImage: `url(${banner.image})` } : undefined}
          onClick={() => navigate("/categories")}
        >
          <div className="eh-offer-copy">
            <div className="eh-offer-eyebrow">{banner.eyebrow}</div>
            <h2>{banner.title}</h2>
            <p>{banner.subtitle}</p>
            <button className="eh-btn eh-btn--light">{banner.cta}</button>
          </div>
        </div>
        <div className="eh-dots">
          <span className="eh-dot eh-dot--active" />
          <span className="eh-dot" />
          <span className="eh-dot" />
        </div>

        <div className="eh-section-head">
          <h3>Trending ⚡</h3>
          <button className="eh-link" onClick={() => navigate("/categories")}>
            View all
          </button>
        </div>
        <div className="eh-scroll-row">
          {trending.map((p) => (
            <button
              key={p.id}
              className="eh-mini-card"
              onClick={() => navigate(`/product/${p.id}`)}
            >
              <span className="eh-tag">{p.tag}</span>
              <ProductImage category={p.category} index={getProductImageIndex(p)} src={p.image} alt={p.name} size={64} />
              <div className="eh-mini-name">{p.name}</div>
              <div className="eh-mini-price">₹{p.price}</div>
            </button>
          ))}
        </div>

        <div className="eh-cat-pill-row">
          {categories.slice(0, 5).map((c) => (
            <button
              key={c.id}
              className={`eh-cat-pill ${
                activeCat === c.id ? "eh-cat-pill--active" : ""
              }`}
              onClick={() => setActiveCat(c.id)}
            >
              {c.name.replace(" Care", "")}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="eh-empty">New products coming soon</div>
        ) : (
          <div className="eh-grid-2">
            {filtered.map((p) => (
              <button
                key={p.id}
                className="eh-mini-card eh-mini-card--grid"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <span className="eh-tag">{p.tag}</span>
                <ProductImage category={p.category} index={getProductImageIndex(p)} src={p.image} alt={p.name} size={56} />
                <div className="eh-mini-name">{p.name}</div>
                <div className="eh-mini-price">₹{p.price}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
