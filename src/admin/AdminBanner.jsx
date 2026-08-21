import React, { useState } from "react";
import { useCatalog } from "../context/CatalogContext";
import { fileToDataUrl } from "../utils/fileToDataUrl";

export default function AdminBanner() {
  const { banner, updateBanner, resetBanner } = useCatalog();
  const [draft, setDraft] = useState(banner);
  const [saved, setSaved] = useState(false);

  const handleImage = async (file) => {
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setDraft((d) => ({ ...d, image: dataUrl }));
  };

  const handleSave = () => {
    updateBanner(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleReset = () => {
    resetBanner();
    setDraft({ image: null, eyebrow: "PURE • SAFE • EFFECTIVE", title: "OFFER ZONE", subtitle: "Care that comes naturally.", cta: "Shop Now" });
  };

  return (
    <div>
      <h1 className="admin-page-title">Offer Banner</h1>
      <p className="admin-page-sub">This is the hero banner shown at the top of the Home screen.</p>

      <div className="admin-banner-layout">
        <div className="admin-card admin-form-card">
          <h2>Edit Banner</h2>
          <div className="admin-form">
            <label>
              Eyebrow Text
              <input
                className="admin-input"
                value={draft.eyebrow}
                onChange={(e) => setDraft((d) => ({ ...d, eyebrow: e.target.value }))}
              />
            </label>
            <label>
              Title
              <input
                className="admin-input"
                value={draft.title}
                onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
              />
            </label>
            <label>
              Subtitle
              <input
                className="admin-input"
                value={draft.subtitle}
                onChange={(e) => setDraft((d) => ({ ...d, subtitle: e.target.value }))}
              />
            </label>
            <label>
              Button Label
              <input
                className="admin-input"
                value={draft.cta}
                onChange={(e) => setDraft((d) => ({ ...d, cta: e.target.value }))}
              />
            </label>
            <label>
              Banner Image (optional — leave empty to keep the default gradient)
              <input
                className="admin-input"
                type="file"
                accept="image/*"
                onChange={(e) => handleImage(e.target.files?.[0])}
              />
            </label>
            {draft.image && (
              <button
                type="button"
                className="admin-link"
                style={{ textAlign: "left" }}
                onClick={() => setDraft((d) => ({ ...d, image: null }))}
              >
                Remove uploaded image
              </button>
            )}

            <div className="admin-form-actions">
              <button className="eh-btn eh-btn--outline" onClick={handleReset} type="button">
                Reset to Default
              </button>
              <button className="eh-btn eh-btn--primary" onClick={handleSave} type="button">
                {saved ? "Saved ✓" : "Save Banner"}
              </button>
            </div>
          </div>
        </div>

        <div className="admin-banner-preview-wrap">
          <h2 className="admin-preview-label">Live Preview</h2>
          <div
            className={`eh-offer-banner admin-banner-preview ${draft.image ? "eh-offer-banner--has-image" : ""}`}
            style={draft.image ? { backgroundImage: `url(${draft.image})` } : undefined}
          >
            <div className="eh-offer-copy">
              <div className="eh-offer-eyebrow">{draft.eyebrow}</div>
              <h2>{draft.title}</h2>
              <p>{draft.subtitle}</p>
              <button className="eh-btn eh-btn--light" type="button">
                {draft.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
