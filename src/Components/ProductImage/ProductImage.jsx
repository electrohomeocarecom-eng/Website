import React from "react";
import { getProductImage } from "../../utils/productImages";
import "./ProductImage.css";

/**
 * Drop-in replacement for BottleIcon.
 * Pass `category` + `index` (position of this product within its category,
 * matching the numbered files: 0 -> 001.jpg, 1 -> 002.jpg, ...).
 */
export default function ProductImage({ category, index = 0, alt = "", size = 64, className = "" }) {
  const src = getProductImage(category, index);

  if (!src) {
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
      <img src={src} alt={alt} className="product-img" />
    </div>
  );
}