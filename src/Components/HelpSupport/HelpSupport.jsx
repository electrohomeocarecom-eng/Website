import React, { useState } from "react";
import Header from "../Header/Header";
import { faqs } from "../../data/data";
import "./HelpSupport.css";

export default function HelpSupport() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <div className="eh-screen">
      <Header title="Help & Support" />
      <div className="eh-page">
        <div className="eh-contact-grid">
          <a className="eh-contact-card" href="tel:+919876543210">
            <span className="eh-contact-icon">📞</span>
            <div>
              <div className="eh-contact-label">Call Us</div>
              <div className="eh-contact-value">+91 98765 43210</div>
            </div>
          </a>
          <a className="eh-contact-card" href="mailto:support@electrohomeo.com">
            <span className="eh-contact-icon">✉️</span>
            <div>
              <div className="eh-contact-label">Email Us</div>
              <div className="eh-contact-value">support@electrohomeo.com</div>
            </div>
          </a>
        </div>

        <div className="eh-section-head">
          <h3>Frequently Asked Questions</h3>
        </div>
        <div className="eh-faq-list">
          {faqs.map((f, i) => (
            <div key={f.q} className="eh-faq-item">
              <button className="eh-faq-question" onClick={() => toggle(i)}>
                <span>{f.q}</span>
                <span className="eh-faq-chevron">{openIndex === i ? "−" : "+"}</span>
              </button>
              {openIndex === i && <div className="eh-faq-answer">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
