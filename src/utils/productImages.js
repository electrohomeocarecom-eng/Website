// Auto-discovers every image under src/asset/products/<category>/*
// and exposes it by category + position, so filenames/extensions don't matter.
const imageModules = import.meta.glob(
  "../asset/products/*/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp}",
  { eager: true, import: "default" }
);

const categoryImageModules = import.meta.glob(
  "../asset/Categories/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp}",
  { eager: true, import: "default", query: "?url" }
);

const imagesByCategory = {};

Object.entries(imageModules).forEach(([path, url]) => {
  const match = path.match(/asset\/products\/([^/]+)\/([^/]+)\.[a-zA-Z]+$/);
  if (!match) return;
  const [, category, filename] = match;
  if (!imagesByCategory[category]) imagesByCategory[category] = [];
  imagesByCategory[category].push({ filename, url });
});

// Sort so 001, 002, 003... line up in order regardless of extension.
Object.values(imagesByCategory).forEach((list) =>
  list.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }))
);

/** Returns the image URL for the nth product (0-indexed) in a category, or null. */
export function getProductImage(category, index = 0) {
  const list = imagesByCategory[category];
  if (!list || !list[index]) return null;
  return list[index].url;
}

/** Returns the category's first image (used as a category thumbnail), or null. */
export function getCategoryThumbnail(category) {
  return getProductImage(category, 0);
}

export function hasCategoryImages(category) {
  return Boolean(imagesByCategory[category]?.length);
}

export function getCategoryImage(category) {
  const filename = `${category}_care`;
  const match = Object.entries(categoryImageModules).find(([path]) =>
    path.split("/").pop().split(".")[0] === filename
  );
  return match ? match[1] : null;
}