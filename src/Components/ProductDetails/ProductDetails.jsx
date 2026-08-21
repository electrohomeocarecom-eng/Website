import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import ProductImage from "../ProductImage/ProductImage";
import { getProductImageIndex } from "../../data/data";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCatalog } from "../../context/CatalogContext";
import { badges } from "../../data/data";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { getProduct } = useCatalog();
  const [qty, setQty] = useState(1);

  const product = getProduct(productId);

  if (!product) {
    return (
      <div className="eh-screen">
        <Header title="Product" />
        <div className="eh-empty">Product not found.</div>
      </div>
    );
  }

  const liked = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = () => addToCart(product.id, qty);
  const handleBuyNow = () => {
    addToCart(product.id, qty);
    navigate("/cart");
  };

  return (
    <div className="eh-screen">
      <Header title="Product Details" />
      <div className="eh-page">
        <div className="eh-pd-hero">
          <span className="eh-tag">{product.tag}</span>
          <button
            className="eh-pd-like"
            onClick={() => toggleWishlist(product.id)}
            aria-label="Toggle wishlist"
            aria-pressed={liked}
          >
            {liked ? "♥" : "♡"}
          </button>
          <ProductImage
            category={product.category}
            index={getProductImageIndex(product)}
            src={product.image}
            alt={product.name}
            size={280}
            className="eh-pd-product-image"
          />
        </div>

        <div className="eh-pd-title-row">
          <div>
            <h2 className="eh-pd-name">{product.name}</h2>
            <div className="eh-pd-sub">Face Drops</div>
          </div>
          <button className="eh-pd-share" aria-label="Share">
            ⇗
          </button>
        </div>

        <div className="eh-pd-price">₹{product.price}</div>
        <p className="eh-pd-desc">{product.desc}</p>

        <div className="eh-pd-badges">
          {badges.map((b) => (
            <span key={b} className="eh-pd-badge">
              ✓ {b}
            </span>
          ))}
        </div>

        <div className="eh-pd-qty-row">
          <span>Quantity</span>
          <div className="eh-qty-stepper">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)}>+</button>
          </div>
        </div>

        <div className="eh-pd-actions">
          <button className="eh-btn eh-btn--primary" onClick={handleAddToCart}>
            🛒 Add to Cart
          </button>
          <button className="eh-btn eh-btn--outline" onClick={handleBuyNow}>
            ⚡ Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
