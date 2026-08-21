import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { CatalogProvider } from "./context/CatalogContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import MobileNav from "./Components/MobileNav/MobileNav";

import Landing from "./Components/Landing/Landing";
import Categories from "./Components/Categories/Categories";
import CategoryProducts from "./Components/CategoryProducts/CategoryProducts";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Cart from "./Components/Cart/Cart";
import Checkout from "./Components/Checkout/Checkout";
import Orders from "./Components/Orders/Orders";
import OrderDetails from "./Components/OrderDetails/OrderDetails";
import Profile from "./Components/Profile/Profile";
import Addresses from "./Components/Addresses/Addresses";
import PaymentMethods from "./Components/PaymentMethods/PaymentMethods";
import Wishlist from "./Components/Wishlist/Wishlist";
import Notifications from "./Components/Notifications/Notifications";
import HelpSupport from "./Components/HelpSupport/HelpSupport";
import AboutUs from "./Components/AboutUs/AboutUs";

import AdminApp from "./admin/AdminApp";

import "./theme.css";
import "./common.css";

// The customer-facing storefront: the capped-width mobile shell + bottom
// nav, wrapping every "/*" route except "/admin/*".
function StorefrontApp() {
  return (
    <div className="eh-app">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:catId" element={<CategoryProducts />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <MobileNav />
    </div>
  );
}

export default function App() {
  return (
    <CatalogProvider>
      <CartProvider>
        <WishlistProvider>
          <HashRouter>
            <Routes>
              {/* Admin gets its own full-width layout, no bottom nav */}
              <Route path="/admin/*" element={<AdminApp />} />
              <Route path="/*" element={<StorefrontApp />} />
            </Routes>
          </HashRouter>
        </WishlistProvider>
      </CartProvider>
    </CatalogProvider>
  );
}
