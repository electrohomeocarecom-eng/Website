import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { profile } from "../../data/data";
import brand from "../../asset/brand.png";
import "./Profile.css";

const MENU = [
  { label: "My Orders", icon: "orders", to: "/orders" },
  { label: "My Addresses", icon: "address", to: "/addresses" },
  { label: "Payment Methods", icon: "payment", to: "/payment-methods" },
  { label: "Wishlist", icon: "wishlist", to: "/wishlist" },
  { label: "Notifications", icon: "notifications", to: "/notifications" },
  { label: "Help & Support", icon: "help", to: "/help-support" },
  { label: "About Electro Homeo", icon: "about", to: "/about" },
  { label: "Logout", icon: "logout", danger: true },
];

const ICON_PATHS = {
  orders: "M5 4h14v16H5z M8 8h8 M8 12h8 M8 16h5",
  address: "M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z M12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  payment: "M3 6h18v12H3z M3 10h18 M7 15h4",
  wishlist: "M20.8 8.6c0 5.4-8.8 10.4-8.8 10.4S3.2 14 3.2 8.6A4.6 4.6 0 0 1 12 6.4a4.6 4.6 0 0 1 8.8 2.2z",
  notifications: "M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9 M10 21h4",
  help: "M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-1.1 1-1.7 1.4-1.7 3.2 M12 18h.01",
  about: "M12 17v-5 M12 8h.01 M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z",
  logout: "M9 5H5v14h4 M14 8l4 4-4 4 M18 12H9",
};

function MenuIcon({ name }) {
  return (
    <svg className="eh-menu-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

const HEADER_MENU = [
  { label: "Account & Profile", path: "/profile" },
  { label: "Product Categories", path: "/categories" },
  { label: "Shopping Cart", path: "/cart" },
  { label: "My Orders", path: "/orders" },
  { label: "Help & Support", path: "/help-support" },
];

export default function Profile() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useState(profile);
  const [draftProfile, setDraftProfile] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  const openEditor = () => {
    setDraftProfile(profileDetails);
    setIsEditing(true);
  };

  const closeEditor = () => setIsEditing(false);

  const saveProfile = (event) => {
    event.preventDefault();
    setProfileDetails(draftProfile);
    setIsEditing(false);
  };

  const updateDraft = (field, value) => {
    setDraftProfile((current) => ({ ...current, [field]: value }));
  };

  const toggleMenu = () => setMenuOpen((isOpen) => !isOpen);

  const handleMenuNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="eh-screen">
      <div className="eh-profile-header">
        <button className="eh-back-btn eh-back-btn--light" onClick={() => navigate(-1)}>
          &lt;
        </button>
        <img className="eh-profile-brand" src={brand} alt="Electro Homeo Care" />
        <button
          className="eh-icon-btn"
          onClick={toggleMenu}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="eh-profile-menu"
          type="button"
        >
          ☰
        </button>
        {menuOpen && (
          <nav className="eh-profile-menu" id="eh-profile-menu" aria-label="Profile menu">
            {HEADER_MENU.map((item) => (
              <button
                key={item.label}
                className="eh-profile-menu-item"
                onClick={() => handleMenuNavigation(item.path)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
      <div className="eh-profile-card">
        <div className="eh-profile-avatar">AK</div>
        <div className="eh-profile-info">
          <div className="eh-profile-name">{profileDetails.name}</div>
          <div className="eh-profile-detail">{profileDetails.phone}</div>
          <div className="eh-profile-detail">{profileDetails.email}</div>
        </div>
        <button
          className="eh-link"
          style={{ color: "var(--eh-white)" }}
          onClick={openEditor}
          type="button"
        >
          {isEditing ? "Editing" : "Edit Profile"}
        </button>
      </div>

      <div className="eh-page" style={{ paddingTop: 8 }}>
        {isEditing && (
          <form className="eh-profile-edit" onSubmit={saveProfile}>
            <label>
              Name
              <input
                value={draftProfile.name}
                onChange={(event) => updateDraft("name", event.target.value)}
                required
              />
            </label>
            <label>
              Phone
              <input
                value={draftProfile.phone}
                onChange={(event) => updateDraft("phone", event.target.value)}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={draftProfile.email}
                onChange={(event) => updateDraft("email", event.target.value)}
                required
              />
            </label>
            <div className="eh-profile-edit-actions">
              <button className="eh-btn eh-btn--outline eh-btn--sm" type="button" onClick={closeEditor}>
                Cancel
              </button>
              <button className="eh-btn eh-btn--primary eh-btn--sm" type="submit">
                Save Profile
              </button>
            </div>
          </form>
        )}
        <div className="eh-menu-list">
          {MENU.map((item) => (
            <button
              key={item.label}
              className={`eh-menu-row ${item.danger ? "eh-menu-row--danger" : ""}`}
              onClick={() => item.to && navigate(item.to)}
            >
              <span className="eh-menu-icon">
                <MenuIcon name={item.icon} />
              </span>
              <span className="eh-menu-label">{item.label}</span>
              {!item.danger && <span className="eh-cat-row-arrow">›</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
