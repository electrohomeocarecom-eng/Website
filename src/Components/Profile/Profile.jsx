import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { profile } from "../../data/data";
import brand from "../../asset/brand.png";
import "./Profile.css";

const MENU = [
  { label: "My Orders", icon: "▤", to: "/orders" },
  { label: "My Addresses", icon: "📍", to: "/addresses" },
  { label: "Payment Methods", icon: "💳", to: "/payment-methods" },
  { label: "Wishlist", icon: "♡", to: "/wishlist" },
  { label: "Notifications", icon: "🔔", to: "/notifications" },
  { label: "Help & Support", icon: "❔", to: "/help-support" },
  { label: "About Electro Homeo", icon: "ℹ", to: "/about" },
  { label: "Logout", icon: "⏻", danger: true },
];

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
          &gt;
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
              <span className="eh-menu-icon">{item.icon}</span>
              <span className="eh-menu-label">{item.label}</span>
              {!item.danger && <span className="eh-cat-row-arrow">›</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
