import React from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./MobileNav.css";

const TABS = [
  { to: "/", label: "Home", icon: "⌂", end: true },
  { to: "/categories", label: "Categories", icon: "▦" },
  { to: "/cart", label: "Cart", icon: "🛒", showBadge: true },
  { to: "/orders", label: "Orders", icon: "▤" },
  { to: "/profile", label: "Profile", icon: "◎" },
];

export default function MobileNav() {
  const { itemCount } = useCart();

  return (
    <nav className="eh-nav">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            `eh-nav-item ${isActive ? "eh-nav-item--active" : ""}`
          }
        >
          <span className="eh-nav-icon">
            {tab.icon}
            {tab.showBadge && itemCount > 0 && (
              <span className="eh-nav-badge">{itemCount}</span>
            )}
          </span>
          <span className="eh-nav-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
