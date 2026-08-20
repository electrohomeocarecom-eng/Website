import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import ProductImage from "../ProductImage/ProductImage";
import { getProductImageIndex } from "../../data/data";
import { useCart } from "../../context/CartContext";
import { getCategory, getProductsByCategory } from "../../data/data";
import "./CategoryProducts.css";

export default function CategoryProducts() {
  const { catId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const category = getCategory(catId);
  const items = getProductsByCategory(catId);

  return (
    <div className="eh-screen">
      <Header title={category ? category.name : "Category"} />
      <div className="eh-page">
        <div className="eh-filter-bar">
          <button className="eh-filter-btn">⏷ Filter</button>
          <button className="eh-filter-btn">⇅ Sort</button>
          <span className="eh-filter-count">{category?.count ?? items.length} Products</span>
        </div>

        {items.length === 0 ? (
          <div className="eh-empty">No products in this category yet.</div>
        ) : (
          <div className="eh-grid-2" style={{ marginTop: 16 }}>
            {items.map((p) => (
              <div key={p.id} className="eh-product-card">
                <button
                  className="eh-heart-btn"
                  aria-label="Add to wishlist"
                  onClick={(e) => e.stopPropagation()}
                >
                  ♡
                </button>
                <button
                  className="eh-product-card-top"
                  onClick={() => navigate(`/product/${p.id}`)}
                >
                  <span className="eh-tag" style={{ position: "absolute", top: 10, left: 10 }}>
                    {p.tag}
                  </span>
                  <ProductImage category={p.category} index={getProductImageIndex(p)} alt={p.name} size={70} />
                </button>
                <button
                  className="eh-product-name-wrap"
                  onClick={() => navigate(`/product/${p.id}`)}
                  style={{ background: "none", border: "none", padding: 0 }}
                >
                  <div className="eh-product-name">{p.name}</div>
                  <div className="eh-product-sub">Face Drops</div>
                </button>
                <div className="eh-product-bottom">
                  <span className="eh-price">₹{p.price}</span>
                  <button
                    className="eh-round-add"
                    aria-label={`Add ${p.name} to cart`}
                    onClick={() => addToCart(p.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
