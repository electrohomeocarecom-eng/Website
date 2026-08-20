import React from "react";
import Header from "../Header/Header";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="eh-screen">
      <Header title="About Electro Homeo" />
      <div className="eh-page">
        <div className="eh-about-hero">
          <div className="eh-about-mark">EH</div>
          <h2>Electro Homeo Care</h2>
          <p className="eh-about-tag">Pure • Safe • Effective</p>
        </div>

        <p className="eh-about-para">
          Electro Homeo Care brings you a range of homeopathic wellness
          products crafted from natural ingredients, made to care for your
          face, hair, lips, feet, body, and everyday well-being — without
          harsh chemicals or side effects.
        </p>
        <p className="eh-about-para">
          Every formula is developed with the same principle in mind: gentle,
          consistent care that works with your body, not against it. From
          everyday skincare drops to targeted relief formulas, our products
          are made to be simple, safe, and effective for the whole family.
        </p>

        <div className="eh-about-grid">
          <div className="eh-about-stat">
            <div className="eh-about-stat-num">100%</div>
            <div className="eh-about-stat-label">Natural Ingredients</div>
          </div>
          <div className="eh-about-stat">
            <div className="eh-about-stat-num">0</div>
            <div className="eh-about-stat-label">Harsh Side Effects</div>
          </div>
          <div className="eh-about-stat">
            <div className="eh-about-stat-num">6</div>
            <div className="eh-about-stat-label">Care Categories</div>
          </div>
        </div>

        <div className="eh-section-head">
          <h3>Get in Touch</h3>
        </div>
        <div className="eh-card">
          <div className="eh-address-line">support@electrohomeo.com</div>
          <div className="eh-address-line">+91 98765 43210</div>
          <div className="eh-address-line">Tirunelveli, Tamil Nadu, India</div>
        </div>
      </div>
    </div>
  );
}
