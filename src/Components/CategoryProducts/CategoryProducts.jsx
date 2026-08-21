import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import ProductImage from "../ProductImage/ProductImage";
import { getProductImageIndex } from "../../data/data";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCatalog } from "../../context/CatalogContext";
import "./CategoryProducts.css";

export default function CategoryProducts() {
  const { catId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { getCategory, getProductsByCategory } = useCatalog();
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  const category = getCategory(catId);
  const items = getProductsByCategory(catId);
  const displayedItems = useMemo(() => {
    const filteredItems = showNewOnly ? items.filter((item) => item.tag === "NEW") : items;
    return [...filteredItems].sort((left, right) => {
      if (sortBy === "name") return left.name.localeCompare(right.name);
      if (sortBy === "price-low") return left.price - right.price || left.name.localeCompare(right.name);
      if (sortBy === "price-high") return right.price - left.price || left.name.localeCompare(right.name);
      return 0;
    });
  }, [items, showNewOnly, sortBy]);

  const cycleSort = () => {
    const sortOptions = ["default", "name", "price-low", "price-high"];
    const nextIndex = (sortOptions.indexOf(sortBy) + 1) % sortOptions.length;
    setSortBy(sortOptions[nextIndex]);
  };

  const sortLabel = {
    default: "Sort",
    name: "Name",
    "price-low": "Price: Low",
    "price-high": "Price: High",
  }[sortBy];

  return (
    <div className="eh-screen">
      <Header title={category ? category.name : "Category"} />
      <div className="eh-page">
        <div className="eh-filter-bar">
          <button
            className={`eh-filter-btn ${showNewOnly ? "eh-filter-btn--active" : ""}`}
            onClick={() => setShowNewOnly((isActive) => !isActive)}
            aria-pressed={showNewOnly}
          >
            ⏷ {showNewOnly ? "New Only" : "Filter"}
          </button>
          <button className="eh-filter-btn" onClick={cycleSort}>
            ⇅ {sortLabel}
          </button>
          <span className="eh-filter-count">{displayedItems.length} Products</span>
        </div>

        {displayedItems.length === 0 ? (
          <div className="eh-empty">No products in this category yet.</div>
        ) : (
          <div className="eh-grid-2" style={{ marginTop: 16 }}>
            {displayedItems.map((p) => (
              <div key={p.id} className="eh-product-card">
                <button
                  className="eh-heart-btn"
                  aria-label={`${wishlistItems.some((item) => item.id === p.id) ? "Remove" : "Add"} ${p.name} ${wishlistItems.some((item) => item.id === p.id) ? "from" : "to"} wishlist`}
                  aria-pressed={wishlistItems.some((item) => item.id === p.id)}
                  onClick={() => toggleWishlist(p.id)}
                >
                  {wishlistItems.some((item) => item.id === p.id) ? "♥" : "♡"}
                </button>
                <button
                  className="eh-product-card-top"
                  onClick={() => navigate(`/product/${p.id}`)}
                >
                  <span className="eh-tag" style={{ position: "absolute", top: 10, left: 10 }}>
                    {p.tag}
                  </span>
                  <ProductImage category={p.category} index={getProductImageIndex(p)} src={p.image} alt={p.name} size={70} />
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
