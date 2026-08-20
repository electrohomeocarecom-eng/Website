import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import logo from "../../asset/logo.png";
import brand from "../../asset/brand.png";
import "./Header.css";

/**
 * Shared page header.
 * variant="brand"  -> logo + wordmark + menu icon (Home screen)
 * variant="page"    -> back arrow + title + cart icon (every other screen)
 */
export default function Header({ variant = "page", title = "" }) {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: "Account & Profile", path: "/profile" },
    { label: "Product Categories", path: "/categories" },
    { label: "Shopping & Support" },
    { label: "About & Brand Story" },
  ];

  const handleMenuNavigation = (path) => {
    setMenuOpen(false);
    if (path) {
      navigate(path);
    }
  };

  if (variant === "brand") {
    return (
      <header className="eh-header eh-header--brand">
        <div className="eh-brand">
          <div className="eh-brand-mark">
            <img src={logo} alt="Electro Homeo Care Logo" />
          </div>
          <img src={brand} alt="Electro Homeo Care" className="eh-brand-wordmark" />
        </div>
        <div className="eh-header-actions">
          <button
            className="eh-icon-btn"
            onClick={() => navigate("/cart")}
            aria-label="Cart"
          >
            🛒
            {itemCount > 0 && <span className="eh-badge">{itemCount}</span>}
          </button>
          <button
            className="eh-icon-btn"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="eh-header-menu"
          >
            ☰
          </button>
        </div>
        {menuOpen && (
          <nav className="eh-header-menu" id="eh-header-menu" aria-label="Main menu">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className="eh-header-menu-item"
                onClick={() => handleMenuNavigation(item.path)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </header>
    );
  }

  return (
    <header className="eh-header">
      <button
        className="eh-back-btn"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        &lt;
      </button>
      <h1 className="eh-header-title">{title}</h1>
      <button
        className="eh-icon-btn eh-icon-btn--dark"
        onClick={() => navigate("/cart")}
        aria-label="Cart"
      >
        🛒
        {itemCount > 0 && <span className="eh-badge">{itemCount}</span>}
      </button>
    </header>
  );
}
