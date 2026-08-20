import React, { useState } from "react";
import Header from "../Header/Header";
import { paymentMethods } from "../../data/data";
import "./PaymentMethods.css";

const ICONS = { UPI: "📱", Card: "💳", COD: "💵" };

export default function PaymentMethods() {
  const [methodList, setMethodList] = useState(paymentMethods);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [draftMethod, setDraftMethod] = useState({ type: "UPI", detail: "" });

  const setDefault = (methodId) => {
    setMethodList((current) =>
      current.map((method) => ({ ...method, isDefault: method.id === methodId }))
    );
  };

  const updateDraft = (field, value) => {
    setDraftMethod((current) => ({ ...current, [field]: value }));
  };

  const savePaymentMethod = (event) => {
    event.preventDefault();
    const label = draftMethod.type === "COD" ? "Cash on Delivery" : draftMethod.type;
    setMethodList((current) => [
      ...current,
      {
        id: `payment-${Date.now()}`,
        type: draftMethod.type,
        label,
        detail: draftMethod.detail,
        isDefault: current.length === 0,
      },
    ]);
    setDraftMethod({ type: "UPI", detail: "" });
    setIsFormOpen(false);
  };

  return (
    <div className="eh-screen">
      <Header title="Payment Methods" />
      <div className="eh-page">
        <div className="eh-pm-list">
          {methodList.map((m) => (
            <div key={m.id} className="eh-pm-card">
              <span className="eh-pm-icon">{ICONS[m.type] ?? "💳"}</span>
              <div className="eh-pm-info">
                <div className="eh-pm-label">{m.label}</div>
                <div className="eh-pm-detail">{m.detail}</div>
              </div>
              {m.isDefault ? (
                <span className="eh-addr-default">Default</span>
              ) : (
                <button className="eh-link" onClick={() => setDefault(m.id)} type="button">
                  Set Default
                </button>
              )}
            </div>
          ))}
        </div>

        {isFormOpen && (
          <form className="eh-payment-form" onSubmit={savePaymentMethod}>
            <h2>Add Payment Method</h2>
            <label>
              Type
              <select value={draftMethod.type} onChange={(event) => updateDraft("type", event.target.value)}>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="COD">Cash on Delivery</option>
              </select>
            </label>
            <label>
              {draftMethod.type === "UPI" ? "UPI ID" : draftMethod.type === "Card" ? "Card Details" : "Instructions"}
              <input
                value={draftMethod.detail}
                onChange={(event) => updateDraft("detail", event.target.value)}
                placeholder={draftMethod.type === "UPI" ? "name@upi" : "Enter payment details"}
                required
              />
            </label>
            <div className="eh-payment-form-actions">
              <button className="eh-btn eh-btn--outline" onClick={() => setIsFormOpen(false)} type="button">
                Cancel
              </button>
              <button className="eh-btn eh-btn--primary" type="submit">
                Save Method
              </button>
            </div>
          </form>
        )}

        <button
          className="eh-btn eh-btn--outline"
          style={{ marginTop: 16 }}
          onClick={() => setIsFormOpen(true)}
          type="button"
        >
          + Add Payment Method
        </button>
      </div>
    </div>
  );
}
