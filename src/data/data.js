// Central mock data for the Electro Homeo Care storefront.
// Swap this out for real API calls when the backend is ready —
// every component reads through these named exports only.

export const categories = [
  { id: "face", name: "Face Care", tagline: "Natural care for glowing skin", count: 24 },
  { id: "hair", name: "Hair Care", tagline: "Strength & nourishment for beautiful hair", count: 18 },
  { id: "lip", name: "Lip Care", tagline: "Gentle care for soft, healthy lips", count: 12 },
  { id: "foot", name: "Foot Care", tagline: "Comfort & care for tired feet", count: 10 },
  { id: "body", name: "Body Care", tagline: "Complete care for your body", count: 26 }
];

export const products = [
  // Face
  { id: "rhus-tox", name: "Rhus Tox", category: "face", tag: "NEW", price: 150, desc: "Rhus Tox helps in relieving stiffness and inflammation in joints and muscles. Useful in sprains and strains." },
  { id: "natrum-mur", name: "Natrum Mur", category: "face", tag: "NEW", price: 150, desc: "Natrum Mur supports skin hydration and helps balance oily or dry skin conditions naturally." },
  { id: "arnica-montana", name: "Arnica Montana", category: "face", tag: "NEW", price: 150, desc: "Arnica Montana is known for soothing bruises, swelling and muscular soreness." },
  { id: "bhiocomb", name: "Bhiocomb", category: "face", tag: "NEW", price: 150, desc: "Bhiocomb Face Drops help even out skin tone and reduce blemishes with regular use." },
  { id: "pimplesolve", name: "Pimplesolve", category: "face", tag: "NEW", price: 150, desc: "Pimplesolve Face Drops target acne-causing bacteria and calm inflamed skin." },
  { id: "skinclear", name: "Skinclear", category: "face", tag: "NEW", price: 150, desc: "Skinclear Face Drops work gently to clear congestion and refine skin texture." },
  { id: "acne-care", name: "Acne Care", category: "face", tag: "NEW", price: 150, desc: "Acne Care Face Drops reduce breakouts and prevent future flare-ups naturally." },
  { id: "bright-skin", name: "Bright Skin", category: "face", tag: "NEW", price: 150, desc: "Bright Skin Face Drops brighten dull complexion and even out skin tone." },
  { id: "skin-glow", name: "Skin Glow", category: "face", tag: "NEW", price: 150, desc: "Skin Glow Face Drops restore natural radiance for a healthy glow." },

  // Hair (6 — matches your asset/products/hair folder)
  { id: "hair-fall-control", name: "Hair Fall Control", category: "hair", tag: "NEW", price: 150, desc: "Helps reduce hair fall and strengthens roots with regular use." },
  { id: "dandruff-care", name: "Dandruff Care", category: "hair", tag: "NEW", price: 150, desc: "Soothes an itchy, flaky scalp and helps keep dandruff under control." },
  { id: "hair-growth", name: "Hair Growth", category: "hair", tag: "NEW", price: 150, desc: "Supports healthy hair growth and improves overall scalp condition." },
  { id: "scalp-care", name: "Scalp Care", category: "hair", tag: "NEW", price: 150, desc: "Nourishes the scalp and helps maintain a healthy foundation for hair." },
  { id: "hair-shine", name: "Hair Shine", category: "hair", tag: "NEW", price: 150, desc: "Restores natural shine and softness to dull, dry hair." },
  { id: "premature-grey", name: "Premature Grey Care", category: "hair", tag: "NEW", price: 150, desc: "Traditional care aimed at slowing premature greying of hair." },

  // Lip (6 — matches your asset/products/lip folder)
  { id: "lip-repair", name: "Lip Repair", category: "lip", tag: "NEW", price: 150, desc: "Repairs dry, cracked lips and restores softness." },
  { id: "lip-tint-care", name: "Lip Tint Care", category: "lip", tag: "NEW", price: 150, desc: "Gently cares for lips while evening out natural tone." },
  { id: "lip-hydrate", name: "Lip Hydrate", category: "lip", tag: "NEW", price: 150, desc: "Deeply hydrates lips to prevent dryness through the day." },
  { id: "lip-balm-plus", name: "Lip Balm Plus", category: "lip", tag: "NEW", price: 150, desc: "A daily balm for smooth, protected lips." },
  { id: "lip-soothe", name: "Lip Soothe", category: "lip", tag: "NEW", price: 150, desc: "Calms chapped, irritated lips naturally." },
  { id: "lip-shield", name: "Lip Shield", category: "lip", tag: "NEW", price: 150, desc: "Protects lips against harsh weather and dryness." },

  // Foot
  { id: "crack-heel-care", name: "Crack Heel Care", category: "foot", tag: "NEW", price: 150, desc: "Softens rough, cracked heels with regular use." },
  { id: "foot-odour-care", name: "Foot Odour Care", category: "foot", tag: "NEW", price: 150, desc: "Helps control foot odour and keeps feet fresh." },

  // Body
  
  // Wellness
  
];

export const trendingIds = ["rhus-tox", "natrum-mur", "arnica-montana"];

export const getProduct = (id) => products.find((p) => p.id === id);
export const getProductsByCategory = (catId) => products.filter((p) => p.category === catId);
export const getCategory = (id) => categories.find((c) => c.id === id);

export const badges = ["Pure & Natural", "No Side Effects", "Safe & Effective"];

export const orders = [
  {
    id: "EH12345",
    date: "May 20, 2024",
    time: "10:30 AM",
    itemCount: 3,
    total: 490,
    status: "Delivered",
    items: [
      { id: "rhus-tox", qty: 1 },
      { id: "natrum-mur", qty: 1 },
      { id: "arnica-montana", qty: 1 },
    ],
    subtotal: 450,
    delivery: 40,
  },
  {
    id: "EH12344",
    date: "May 16, 2024",
    itemCount: 2,
    total: 300,
    status: "Processing",
    items: [
      { id: "bhiocomb", qty: 1 },
      { id: "pimplesolve", qty: 1 },
    ],
    subtotal: 300,
    delivery: 0,
  },
  {
    id: "EH12343",
    date: "May 15, 2024",
    itemCount: 1,
    total: 150,
    status: "Shipped",
    items: [{ id: "skinclear", qty: 1 }],
    subtotal: 150,
    delivery: 0,
  },
  {
    id: "EH12342",
    date: "May 10, 2024",
    itemCount: 2,
    total: 300,
    status: "Cancelled",
    items: [
      { id: "acne-care", qty: 1 },
      { id: "bright-skin", qty: 1 },
    ],
    subtotal: 300,
    delivery: 0,
  },
];

export const getOrder = (id) => orders.find((o) => o.id === id);

export const deliveryAddress = {
  name: "Anandha Kumar",
  line1: "123, Main Street, Tirunelveli",
  line2: "Tamil Nadu - 627001",
  phone: "+91 98765 43210",
};

export const profile = {
  name: "Anandha Kumar",
  phone: "+91 98765 43210",
  email: "anandha@gmail.com",
};

export const addresses = [
  {
    id: "home",
    label: "Home",
    name: "Anandha Kumar",
    line1: "123, Main Street, Tirunelveli",
    line2: "Tamil Nadu - 627001",
    phone: "+91 98765 43210",
    isDefault: true,
  },
];

export const paymentMethods = [
  { id: "upi-1", type: "UPI", label: "UPI", detail: "anandha@upi", isDefault: true },
  { id: "cod-1", type: "COD", label: "Cash on Delivery", detail: "Pay when your order arrives", isDefault: false },
];

export const notifications = [
  {
    id: "welcome",
    title: "Welcome to Electro Homeo Care",
    body: "Discover natural care for your everyday wellness.",
    time: "Today",
    read: false,
  },
  {
    id: "order-update",
    title: "Your order is on its way",
    body: "Order EH12345 has been shipped.",
    time: "Yesterday",
    read: true,
  },
];

export const faqs = [
  {
    q: "How can I track my order?",
    a: "Open My Orders from your profile to view the latest order status.",
  },
  {
    q: "What payment methods are available?",
    a: "You can pay using UPI, cards, or Cash on Delivery where available.",
  },
  {
    q: "How do I contact support?",
    a: "Call or email our support team using the contact options on this page.",
  },
];

// Position of a product within its own category's product list —
// used to match it to the Nth image file in that category's folder.
export const getProductImageIndex = (product) =>
  getProductsByCategory(product.category).findIndex((p) => p.id === product.id);