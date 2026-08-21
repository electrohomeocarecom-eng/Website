import React from "react";
import { getProductImage } from "../../utils/productImages";
import "./ProductImage.css";

/**
 * Drop-in replacement for BottleIcon.
 * Pass `category` + `index` (position of this product within its category,
 * matching the numbered files: 0 -> 001.jpg, 1 -> 002.jpg, ...).
 * Pass `src` to force a specific image (used for admin-uploaded product/
 * banner images) — it takes priority over the category/index lookup.
 */
export default function ProductImage({ category, index = 0, src, alt = "", size = 64, className = "" }) {
  const resolved = src || getProductImage(category, index);

  if (!resolved) {
    return (
      <div
        className={`product-img-wrap product-img-wrap--empty ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="product-img-soon">New products
coming soon</span>
      </div>
    );
  }

  return (
    <div className={`product-img-wrap ${className}`} style={{ width: size, height: size }}>
      <img src={resolved} alt={alt} className="product-img" />
    </div>
  );
}
