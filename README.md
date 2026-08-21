# Electro Homeo Care

## Run it

```bash
npm install
npm run dev
```

## Admin Portal

Go to **`/admin`** (e.g. `http://localhost:5173/#/admin`). Default passcode:

```
electro-admin
```

Change it in `src/admin/AdminApp.jsx` (`ADMIN_PASSCODE`).

**⚠️ This is a soft client-side gate, not real authentication.** Anyone who
opens devtools/localStorage can see or bypass it. It's meant to keep the
admin screens out of casual reach during development — swap it for real
auth (a login API + server-verified session) before this handles real
customers or inventory.

### What you can do from `/admin`

- **Dashboard** (`/admin`) — product & category counts, banner status.
- **Products** (`/admin/products`) — add a new product (name, category,
  price, tag, description, optional image), edit any existing product's
  price inline, swap a product's image, or delete a product.
- **Offer Banner** (`/admin/banner`) — edit the Home screen's hero banner
  text and optionally upload a custom background image, with a live
  preview before saving.

Every change here shows up on the storefront immediately — Products,
Categories, Cart, Product Details, etc. all read from the same shared
catalog.

### How it persists

There's no backend yet, so admin edits are saved to the browser's
**localStorage** (`eh_admin_products_v1` and `eh_admin_banner_v1`). That
means:

- Changes survive page reloads on the same browser/device.
- They are **not** shared across devices or visitors — this is a
  prototype persistence layer, not a database.
- Uploaded images are stored as base64 data URLs. Fine for a handful of
  product photos; for a lot of large images you'll want real file
  storage (S3, Cloudinary, etc.) before going live.

To clear all admin changes and go back to the defaults in `src/data/data.js`,
clear those two localStorage keys (devtools → Application → Local Storage)
or run this in the browser console:

```js
localStorage.removeItem("eh_admin_products_v1");
localStorage.removeItem("eh_admin_banner_v1");
```

### Wiring up a real backend later

All admin state lives behind `src/context/CatalogContext.jsx`. Its public
shape (`products`, `banner`, `addProduct`, `updateProduct`, `deleteProduct`,
`updateBanner`) is what the rest of the app depends on — swap the
localStorage read/write inside that file for real API calls and nothing
else in the app needs to change. Same idea for auth: replace the
`ADMIN_PASSCODE` check in `src/admin/AdminApp.jsx` with a real login call.
