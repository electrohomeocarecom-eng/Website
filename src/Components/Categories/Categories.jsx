import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { useCatalog } from "../../context/CatalogContext";
import { getCategoryImage } from "../../utils/productImages";
import "./Categories.css";

export default function Categories() {
  const navigate = useNavigate();
  const { categories, getProductsByCategory } = useCatalog();

  return (
    <div className="eh-screen">
      <Header title="Categories" />
      <div className="eh-page">
        <div className="eh-cat-list">
          {categories.map((c) => (
            <button
              key={c.id}
              className="eh-cat-row"
              onClick={() => navigate(`/category/${c.id}`)}
            >
              <img
                className="eh-category-image"
                src={getCategoryImage(c.id)}
                alt={c.name}
              />
              <div className="eh-cat-row-info">
                <div className="eh-cat-row-name">{c.name}</div>
                <div className="eh-cat-row-tagline">{c.tagline}</div>
                <div className="eh-cat-row-count">{getProductsByCategory(c.id).length} Products</div>
              </div>
              <span className="eh-cat-row-arrow">›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
