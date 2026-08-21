import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products as baseProducts, categories } from "../data/data";

// NOTE ON PERSISTENCE: this app has no backend, so admin edits (new
// products, price changes, uploaded images, the offer banner) are saved to
// the browser's localStorage instead of a database. That means:
//   - Changes persist across reloads on the SAME browser/device.
//   - They are NOT shared across devices or visitors — this is a
//     prototype/demo persistence layer, not multi-user storage.
// When you're ready to wire up a real backend, replace the localStorage
// read/write below with API calls and this context's public shape
// (products, banner, addProduct, updateProduct, deleteProduct,
// updateBanner) can stay the same for the rest of the app.

const PRODUCTS_KEY = "eh_admin_products_v1";
const BANNER_KEY = "eh_admin_banner_v1";

export const DEFAULT_BANNER = {
  image: null, // data URL when an admin uploads a custom banner image
  eyebrow: "PURE • SAFE • EFFECTIVE",
  title: "OFFER ZONE",
  subtitle: "Care that comes naturally.",
  cta: "Shop Now",
};

function loadProducts() {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch (err) {
    console.warn("Could not read saved products, falling back to defaults.", err);
  }
  return baseProducts;
}

function loadBanner() {
  try {
    const raw = localStorage.getItem(BANNER_KEY);
    if (raw) return { ...DEFAULT_BANNER, ...JSON.parse(raw) };
  } catch (err) {
    console.warn("Could not read saved banner, falling back to default.", err);
  }
  return DEFAULT_BANNER;
}

const slugify = (name) =>
  (name || "product")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "product";

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const [products, setProducts] = useState(loadProducts);
  const [banner, setBanner] = useState(loadBanner);

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch (err) {
      console.warn("Could not save products (storage may be full).", err);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(BANNER_KEY, JSON.stringify(banner));
    } catch (err) {
      console.warn("Could not save banner (storage may be full).", err);
    }
  }, [banner]);

  const addProduct = ({ name, category, price, tag, desc, image }) => {
    const base = slugify(name);
    let id = base;
    let n = 1;
    setProducts((prev) => {
      while (prev.some((p) => p.id === id)) id = `${base}-${n++}`;
      const newProduct = {
        id,
        name: (name || "Untitled Product").trim(),
        category,
        price: Number(price) || 0,
        tag: (tag || "NEW").trim(),
        desc: (desc || "").trim(),
        image: image || null,
      };
      return [...prev, newProduct];
    });
  };

  const updateProduct = (id, updates) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateBanner = (updates) => {
    setBanner((prev) => ({ ...prev, ...updates }));
  };

  const resetBanner = () => setBanner(DEFAULT_BANNER);

  const getProduct = (id) => products.find((p) => p.id === id);
  const getProductsByCategory = (catId) => products.filter((p) => p.category === catId);
  const getCategory = (id) => categories.find((c) => c.id === id);

  const value = useMemo(
    () => ({
      products,
      categories,
      banner,
      addProduct,
      updateProduct,
      deleteProduct,
      updateBanner,
      resetBanner,
      getProduct,
      getProductsByCategory,
      getCategory,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [products, banner]
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within a CatalogProvider");
  return ctx;
}
