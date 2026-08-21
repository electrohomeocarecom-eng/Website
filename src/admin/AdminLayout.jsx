import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../asset/logo.png";
import brand from "../asset/brand.png";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: "▦", end: true },
  { to: "/admin/products", label: "Products", icon: "🧴" },
  { to: "/admin/banner", label: "Offer Banner", icon: "🖼" },
];

export default function AdminLayout({ children, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-mark">
            <img src={logo} alt="Electro Homeo Care logo" />
          </div>
          <div className="admin-sidebar-brand-copy">
            <img src={brand} alt="Electro Homeo Care" className="admin-sidebar-wordmark" />
            <div className="admin-sidebar-sub">Admin Panel</div>
          </div>
        </div>

        <button
          className="admin-menu-toggle"
          type="button"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          aria-label={menuOpen ? "Close admin menu" : "Open admin menu"}
          aria-expanded={menuOpen}
          aria-controls="admin-navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`admin-nav ${menuOpen ? "admin-nav--open" : ""}`}
          id="admin-navigation"
        >
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `admin-nav-item ${isActive ? "admin-nav-item--active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={`admin-sidebar-footer ${menuOpen ? "admin-sidebar-footer--open" : ""}`}>
          <Link to="/" className="admin-nav-item" onClick={() => setMenuOpen(false)}>
            <span>↩</span>
            View Storefront
          </Link>
          <button className="admin-nav-item admin-nav-item--danger" onClick={onLogout}>
            <span>⏻</span>
            Log Out
          </button>
        </div>
      </aside>

      <main className="admin-content">{children}</main>
    </div>
  );
}
