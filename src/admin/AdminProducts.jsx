import React, { useMemo, useState } from "react";
import ProductImage from "../Components/ProductImage/ProductImage";
import { useCatalog } from "../context/CatalogContext";
import { getProductImageIndex } from "../data/data";
import { fileToDataUrl } from "../utils/fileToDataUrl";

const EMPTY_FORM = { name: "", category: "", price: "", tag: "NEW", desc: "" };

export default function AdminProducts() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useCatalog();
  const [filterCat, setFilterCat] = useState("all");
  const [priceDrafts, setPriceDrafts] = useState({});
  const [savedId, setSavedId] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [formImage, setFormImage] = useState(null);
  const [formError, setFormError] = useState("");

  const visibleProducts = useMemo(
    () => (filterCat === "all" ? products : products.filter((p) => p.category === filterCat)),
    [products, filterCat]
  );

  const priceFor = (p) => (priceDrafts[p.id] !== undefined ? priceDrafts[p.id] : String(p.price));

  const handlePriceChange = (id, value) => {
    setPriceDrafts((prev) => ({ ...prev, [id]: value }));
  };

  const savePrice = (id) => {
    const value = Number(priceDrafts[id]);
    if (Number.isNaN(value) || value < 0) return;
    updateProduct(id, { price: value });
    setPriceDrafts((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setSavedId(id);
    setTimeout(() => setSavedId((cur) => (cur === id ? null : cur)), 1500);
  };

  const handleImageUpload = async (id, file) => {
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    updateProduct(id, { image: dataUrl });
  };

  const handleFormImage = async (file) => {
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setFormImage(dataUrl);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setFormError("Product name is required.");
    if (!form.category) return setFormError("Pick a category.");
    if (form.price === "" || Number(form.price) < 0) return setFormError("Enter a valid price.");

    addProduct({ ...form, image: formImage });
    setForm(EMPTY_FORM);
    setFormImage(null);
    setFormError("");
  };

  return (
    <div>
      <h1 className="admin-page-title">Products</h1>
      <p className="admin-page-sub">Update prices, swap images, or add new products. Changes appear on the storefront immediately.</p>

      <div className="admin-card admin-form-card">
        <h2>Add New Product</h2>
        <form className="admin-form" onSubmit={handleAddProduct}>
          <div className="admin-form-row">
            <label>
              Name
              <input
                className="admin-input"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Hair Fall Control"
              />
            </label>
            <label>
              Category
              <select
                className="admin-input"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="admin-form-row">
            <label>
              Price (₹)
              <input
                className="admin-input"
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                placeholder="150"
              />
            </label>
            <label>
              Tag
              <input
                className="admin-input"
                value={form.tag}
                onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
                placeholder="NEW"
              />
            </label>
          </div>

          <label>
            Description
            <textarea
              className="admin-input"
              rows={3}
              value={form.desc}
              onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
              placeholder="What this product does…"
            />
          </label>

          <label>
            Product Image (optional — falls back to "coming soon" placeholder)
            <input
              className="admin-input"
              type="file"
              accept="image/*"
              onChange={(e) => handleFormImage(e.target.files?.[0])}
            />
          </label>

          {formImage && (
            <div className="admin-form-preview">
              <ProductImage src={formImage} alt="Preview" size={64} />
              <span>Image selected</span>
            </div>
          )}

          {formError && <div className="admin-form-error">{formError}</div>}

          <button type="submit" className="eh-btn eh-btn--primary" style={{ width: "auto", padding: "12px 28px" }}>
            + Add Product
          </button>
        </form>
      </div>

      <div className="admin-section-head">
        <h2>All Products ({visibleProducts.length})</h2>
        <select
          className="admin-input admin-filter-select"
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-product-table">
        {visibleProducts.map((p) => (
          <div key={p.id} className="admin-product-row">
            <ProductImage
              category={p.category}
              index={getProductImageIndex(p)}
              src={p.image}
              alt={p.name}
              size={56}
            />
            <div className="admin-product-info">
              <div className="admin-product-name">{p.name}</div>
              <div className="admin-product-cat">{p.category}</div>
            </div>

            <div className="admin-product-price-edit">
              <span>₹</span>
              <input
                type="number"
                min="0"
                className="admin-input admin-price-input"
                value={priceFor(p)}
                onChange={(e) => handlePriceChange(p.id, e.target.value)}
              />
              <button
                className="eh-btn eh-btn--outline eh-btn--sm"
                onClick={() => savePrice(p.id)}
                disabled={priceDrafts[p.id] === undefined}
              >
                {savedId === p.id ? "Saved ✓" : "Save"}
              </button>
            </div>

            <label className="admin-upload-btn">
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(p.id, e.target.files?.[0])}
                hidden
              />
            </label>

            <button
              className="admin-icon-btn admin-icon-btn--danger"
              aria-label={`Delete ${p.name}`}
              onClick={() => {
                if (window.confirm(`Delete "${p.name}"? This can't be undone.`)) {
                  deleteProduct(p.id);
                }
              }}
            >
              🗑
            </button>
          </div>
        ))}
        {visibleProducts.length === 0 && (
          <div className="eh-empty">No products in this category yet.</div>
        )}
      </div>
    </div>
  );
}
