# Electro Homeo Care — E-commerce Frontend

A complete React implementation of the mobile UI/UX design: Home, Categories,
Category Products, Product Details, Cart, Checkout, My Orders, Order Details,
and Profile — with working add-to-cart, quantity steppers, coupon field, and
routing between every screen.

## Run it standalone

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:5173`).
It's a normal Vite + React app, so `npm run build` produces a static
`dist/` folder you can deploy anywhere.

## Folder structure

Mirrors the pattern from your other project — one folder per component,
each with its own `.jsx` and `.css`:

```
src/
  Components/
    Header/            top bar (brand variant on Home, back+cart on others)
    MobileNav/          bottom tab bar
    BottleIcon/         shared placeholder product illustration
    Landing/            Home screen
    Categories/         category list
    CategoryProducts/   products within a category (filter/sort + grid)
    ProductDetails/      single product page
    Cart/                cart, coupon, order summary
    Checkout/            address, payment method, place order
    Orders/              order history with status filters
    OrderDetails/        single order breakdown
    Profile/             account menu
  context/
    CartContext.jsx      global cart state (add/update/remove/coupon/totals)
  data/
    data.js              mock products, categories, orders — swap for your API
  theme.css              design tokens (colors, radii, shadows, font)
  common.css              shared classes reused across screens (cards, buttons, grids)
  App.jsx                 routes
  main.jsx                 entry point
```

## Wiring up to a real backend

Everything reads from `src/data/data.js` and `src/context/CartContext.jsx`.
To connect real data:

1. Replace the arrays in `data.js` with API calls (e.g. React Query or a
   simple `fetch` in `useEffect`) — every component already imports through
   `getProduct`, `getCategory`, `getProductsByCategory`, etc., so you can
   keep those function names and just change what's inside them.
2. In `CartContext.jsx`, swap the in-memory `lines` state for calls to your
   cart/order API inside `addToCart`, `updateQty`, `removeFromCart`.
3. `Checkout.jsx`'s `handlePlaceOrder` is where you'd POST the order before
   navigating to `/orders`.
4. `BottleIcon` is a placeholder illustration — swap it for `<img src={product.image} />`
   once you have real product photography.

## Notes

- Routing uses `HashRouter` so it works without any server config; switch to
  `BrowserRouter` if your host supports client-side routing rewrites.
- The whole shell is capped at 480px (`--eh-app` in `common.css`) to match the
  mobile mockups — remove that constraint if you want a responsive desktop
  layout too.
- A `SAVE10` coupon code is wired up in `CartContext.jsx` as a working example.
