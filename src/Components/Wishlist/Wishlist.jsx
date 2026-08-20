import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import ProductImage from "../ProductImage/ProductImage";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { getProductImageIndex } from "../../data/data";
import "./Wishlist.css";

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="eh-screen">
        <Header title="Wishlist" />
        <div className="eh-empty">
          Your wishlist is empty.
          <div style={{ marginTop: 16 }}>
            <button className="eh-btn eh-btn--primary" onClick={() => navigate("/categories")}>
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="eh-screen">
      <Header title="Wishlist" />
      <div className="eh-page">
        <div className="eh-wish-list">
          {wishlistItems.map((p) => (
            <div key={p.id} className="eh-wish-row">
              <button
                className="eh-wish-thumb"
                onClick={() => navigate(`/product/${p.id}`)}
                aria-label={p.name}
              >
                <ProductImage category={p.category} index={getProductImageIndex(p)} alt={p.name} size={54} />
              </button>
              <div className="eh-wish-info">
                <div className="eh-cart-row-name">{p.name}</div>
                <div className="eh-cart-row-price">₹{p.price}</div>
              </div>
              <div className="eh-wish-actions">
                <button
                  className="eh-cart-remove"
                  aria-label={`Remove ${p.name} from wishlist`}
                  onClick={() => toggleWishlist(p.id)}
                >
                  ♥
                </button>
                <button
                  className="eh-btn eh-btn--sm eh-btn--primary"
                  onClick={() => addToCart(p.id, 1)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
