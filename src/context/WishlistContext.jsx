import React, { createContext, useContext, useMemo, useState } from "react";
import { useCatalog } from "./CatalogContext";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { getProduct } = useCatalog();
  const [wishlistIds, setWishlistIds] = useState([]);

  const toggleWishlist = (productId) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isWishlisted = (productId) => wishlistIds.includes(productId);

  const wishlistItems = useMemo(
    () => wishlistIds.map((id) => getProduct(id)).filter(Boolean),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wishlistIds, getProduct]
  );

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
}
