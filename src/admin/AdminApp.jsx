import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";
import AdminProducts from "./AdminProducts";
import AdminBanner from "./AdminBanner";
import logo from "../asset/logo.png";
import "./admin.css";

// IMPORTANT: this is a soft client-side gate, not real authentication.
// Anyone who opens devtools can bypass it — it just keeps the admin
// screens out of casual reach. Swap this for real auth (a login API +
// server-verified session/token) before this app handles real customers.
const ADMIN_PASSCODE = "electro-admin";
const SESSION_KEY = "eh_admin_session";

function AdminLogin({ onSuccess }) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onSuccess();
    } else {
      setError("Incorrect passcode. Try again.");
    }
  };

  return (
    <div className="admin-login-screen">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <div className="admin-login-mark">
          <img src={logo} alt="Electro Homeo Care logo" />
        </div>
        <h1>Admin Sign In</h1>
        <p>Enter the admin passcode to manage products and the offer banner.</p>
        <input
          type="password"
          className="admin-input"
          placeholder="Passcode"
          value={passcode}
          onChange={(e) => {
            setPasscode(e.target.value);
            setError("");
          }}
          autoFocus
        />
        {error && <div className="admin-login-error">{error}</div>}
        <button type="submit" className="eh-btn eh-btn--primary">
          Sign In
        </button>
        <p className="admin-login-hint">Default passcode: electro-admin</p>
      </form>
    </div>
  );
}

export default function AdminApp() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1"
  );

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  return (
    <AdminLayout onLogout={handleLogout}>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="banner" element={<AdminBanner />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
}
