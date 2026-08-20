import React, { useState } from "react";
import Header from "../Header/Header";
import { addresses } from "../../data/data";
import "./Addresses.css";

export default function Addresses() {
  const [addressList, setAddressList] = useState(addresses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [draftAddress, setDraftAddress] = useState({
    label: "Home",
    name: "",
    line1: "",
    line2: "",
    phone: "",
  });

  const openAddForm = () => {
    setEditingId(null);
    setDraftAddress({ label: "Home", name: "", line1: "", line2: "", phone: "" });
    setIsFormOpen(true);
  };

  const openEditForm = (address) => {
    setEditingId(address.id);
    setDraftAddress({
      label: address.label,
      name: address.name,
      line1: address.line1,
      line2: address.line2,
      phone: address.phone,
    });
    setIsFormOpen(true);
  };

  const closeForm = () => setIsFormOpen(false);

  const updateDraft = (field, value) => {
    setDraftAddress((current) => ({ ...current, [field]: value }));
  };

  const saveAddress = (event) => {
    event.preventDefault();

    if (editingId) {
      setAddressList((current) =>
        current.map((address) =>
          address.id === editingId ? { ...address, ...draftAddress } : address
        )
      );
    } else {
      setAddressList((current) => [
        ...current,
        {
          ...draftAddress,
          id: `address-${Date.now()}`,
          isDefault: current.length === 0,
        },
      ]);
    }

    closeForm();
  };

  const removeAddress = (addressId) => {
    setAddressList((current) => {
      const remaining = current.filter((address) => address.id !== addressId);
      if (remaining.length > 0 && !remaining.some((address) => address.isDefault)) {
        remaining[0] = { ...remaining[0], isDefault: true };
      }
      return remaining;
    });
  };

  return (
    <div className="eh-screen">
      <Header title="My Addresses" />
      <div className="eh-page">
        <div className="eh-addr-list">
          {addressList.map((a) => (
            <div key={a.id} className="eh-addr-card">
              <div className="eh-addr-card-top">
                <span className="eh-addr-label">{a.label}</span>
                {a.isDefault && <span className="eh-addr-default">Default</span>}
              </div>
              <div className="eh-address-name">{a.name}</div>
              <div className="eh-address-line">{a.line1}</div>
              <div className="eh-address-line">{a.line2}</div>
              <div className="eh-address-line">{a.phone}</div>
              <div className="eh-addr-actions">
                <button className="eh-link" onClick={() => openEditForm(a)} type="button">
                  Edit
                </button>
                <button
                  className="eh-link eh-link--danger"
                  onClick={() => removeAddress(a.id)}
                  type="button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {isFormOpen && (
          <form className="eh-address-form" onSubmit={saveAddress}>
            <h2>{editingId ? "Edit Address" : "Add New Address"}</h2>
            <label>
              Label
              <input
                value={draftAddress.label}
                onChange={(event) => updateDraft("label", event.target.value)}
                placeholder="Home or Work"
                required
              />
            </label>
            <label>
              Full Name
              <input
                value={draftAddress.name}
                onChange={(event) => updateDraft("name", event.target.value)}
                required
              />
            </label>
            <label>
              Address Line 1
              <input
                value={draftAddress.line1}
                onChange={(event) => updateDraft("line1", event.target.value)}
                required
              />
            </label>
            <label>
              Address Line 2
              <input
                value={draftAddress.line2}
                onChange={(event) => updateDraft("line2", event.target.value)}
                required
              />
            </label>
            <label>
              Phone
              <input
                value={draftAddress.phone}
                onChange={(event) => updateDraft("phone", event.target.value)}
                required
              />
            </label>
            <div className="eh-address-form-actions">
              <button className="eh-btn eh-btn--outline" onClick={closeForm} type="button">
                Cancel
              </button>
              <button className="eh-btn eh-btn--primary" type="submit">
                Save Address
              </button>
            </div>
          </form>
        )}

        <button className="eh-btn eh-btn--outline" style={{ marginTop: 16 }} onClick={openAddForm} type="button">
          + Add New Address
        </button>
      </div>
    </div>
  );
}
