/**
 * Generates shopify/import/products.csv for Shopify Admin → Products → Import
 * Run: npm run shopify:export
 */
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const products = [
  { handle: "pulse-earbuds-pro", title: "Pulse Earbuds Pro", body: "Active noise cancellation with wireless charging case.", vendor: "ARCHIVE", type: "Electronics", tags: "trending,category:electronics", price: "189.00", image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=1200&q=80", option: "Title", value: "Default Title" },
  { handle: "axis-watch", title: "Axis Watch", body: "Minimal analog with titanium case and sapphire crystal.", vendor: "ARCHIVE", type: "Electronics", tags: "trending,category:electronics", price: "520.00", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80", option: "Title", value: "Default Title" },
  { handle: "signal-backpack-24", title: "Signal Backpack 24", body: "Structured 24L carry with laptop bay.", vendor: "ARCHIVE", type: "Gears", tags: "trending,category:gears", price: "264.00", image: "https://images.unsplash.com/photo-1622267813859-85502f4e1b4d?w=1200&q=80", option: "Title", value: "Default Title" },
  { handle: "field-shell-jacket", title: "Field Shell Jacket", body: "Three-layer weather shell.", vendor: "ARCHIVE", type: "Gears", tags: "trending,category:gears", price: "428.00", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80", option: "Size", value: "M" },
  { handle: "orbit-drone-mini", title: "Orbit Drone Mini", body: "Foldable 4K drone.", vendor: "ARCHIVE", type: "Toys", tags: "trending,category:toys", price: "349.00", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80", option: "Title", value: "Default Title" },
  { handle: "modular-block-set", title: "Modular Block Set", body: "240-piece engineering set.", vendor: "ARCHIVE", type: "Toys", tags: "category:toys", price: "78.00", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&q=80", option: "Title", value: "Default Title" },
  { handle: "desk-lamp-spectrum", title: "Desk Lamp Spectrum", body: "Circadian desk lamp with USB-C.", vendor: "ARCHIVE", type: "Electronics", tags: "category:electronics", price: "124.00", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&q=80", option: "Title", value: "Default Title" },
  { handle: "meridian-runner", title: "Meridian Runner", body: "Road-to-trail hybrid runner.", vendor: "ARCHIVE", type: "Gears", tags: "category:gears", price: "198.00", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80", option: "Size", value: "9" },
];

const header = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Variant Price",
  "Variant Inventory Qty",
  "Image Src",
  "Image Position",
].join(",");

const rows = products.map((p) =>
  [
    p.handle,
    csvEscape(p.title),
    csvEscape(`<p>${p.body}</p>`),
    csvEscape(p.vendor),
    csvEscape(p.type),
    csvEscape(p.tags),
    "TRUE",
    csvEscape(p.option),
    csvEscape(p.value),
    p.price,
    "100",
    p.image,
    "1",
  ].join(","),
);

function csvEscape(value) {
  const s = String(value);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

const outDir = join(root, "shopify", "import");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "products.csv");
writeFileSync(outPath, `${header}\n${rows.join("\n")}`, "utf8");
console.log(`Wrote ${products.length} products to ${outPath}`);
