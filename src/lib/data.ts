import type { Bundle, Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    slug: "pulse-earbuds-pro",
    name: "Pulse Earbuds Pro",
    price: 189,
    category: "electronics",
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&q=80&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=1200&q=80&fit=crop",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200&q=80&fit=crop",
    ],
    tagline: "Spatial audio. All-day comfort.",
    description:
      "Active noise cancellation with a low-profile stem and wireless charging case tuned for focused work sessions.",
    specs: [
      { label: "Battery", value: "32h with case" },
      { label: "Driver", value: "11mm dynamic" },
      { label: "Water", value: "IPX5" },
    ],
    trending: true,
  },
  {
    id: "2",
    slug: "axis-watch",
    name: "Axis Watch",
    price: 520,
    category: "electronics",
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80",
      "https://images.pexels.com/photos/3766113/pexels-photo-3766113.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    tagline: "Titanium case. Sapphire crystal.",
    description:
      "Minimal analog with 100m resistance and a brushed titanium case designed to catch light at the edge.",
    specs: [
      { label: "Case", value: "Grade 5 titanium" },
      { label: "Crystal", value: "Sapphire" },
      { label: "Movement", value: "Swiss automatic" },
    ],
    trending: true,
  },
  {
    id: "3",
    slug: "signal-backpack-24",
    name: "Signal Backpack 24",
    price: 264,
    category: "gears",
    sizes: ["One Size"],
    image: "https://images.pexels.com/photos/593157/pexels-photo-593157.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/593157/pexels-photo-593157.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    tagline: "24L. One-handed access.",
    description:
      "Structured carry for daily commute with magnetic lid, hidden laptop bay, and water-resistant base.",
    specs: [
      { label: "Volume", value: "24L" },
      { label: "Laptop", value: "Up to 16\"" },
      { label: "Material", value: "Ballistic weave" },
    ],
    trending: true,
  },
  {
    id: "4",
    slug: "field-shell-jacket",
    name: "Field Shell Jacket",
    price: 428,
    category: "gears",
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1200&q=80",
    ],
    tagline: "Weather-sealed. Weightless carry.",
    description:
      "Three-layer shell for variable conditions with bonded seams and articulated shoulders.",
    specs: [
      { label: "Shell", value: "3L recycled nylon" },
      { label: "Rating", value: "20K / 20K" },
      { label: "Weight", value: "412g (M)" },
    ],
    trending: true,
  },
  {
    id: "5",
    slug: "orbit-drone-mini",
    name: "Orbit Drone Mini",
    price: 349,
    category: "toys",
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80",
      "https://images.pexels.com/photos/1619858/pexels-photo-1619858.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    tagline: "4K capture. Pocket scale.",
    description:
      "Foldable frame with obstacle sensing and 28-minute flight time for creators on the move.",
    specs: [
      { label: "Camera", value: "4K HDR" },
      { label: "Flight", value: "28 min" },
      { label: "Range", value: "6 km" },
    ],
    trending: true,
  },
  {
    id: "6",
    slug: "modular-block-set",
    name: "Modular Block Set",
    price: 78,
    category: "toys",
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&q=80",
    ],
    tagline: "240 pieces. Infinite builds.",
    description:
      "Matte-finish blocks with steel axle connectors for engineering play without visual clutter.",
    specs: [
      { label: "Pieces", value: "240" },
      { label: "Age", value: "8+" },
      { label: "Material", value: "ABS composite" },
    ],
    trending: false,
  },
  {
    id: "7",
    slug: "desk-lamp-spectrum",
    name: "Desk Lamp Spectrum",
    price: 124,
    category: "electronics",
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&q=80",
    ],
    tagline: "Circadian tuned. Zero flicker.",
    description:
      "Adjustable color temperature with touch dimming and a weighted base for stable desk setups.",
    specs: [
      { label: "CRI", value: "95+" },
      { label: "Modes", value: "Focus / Relax / Night" },
      { label: "Power", value: "USB-C PD" },
    ],
    trending: false,
  },
  {
    id: "8",
    slug: "meridian-runner",
    name: "Meridian Runner",
    price: 198,
    category: "gears",
    sizes: ["7", "8", "9", "10", "11", "12"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80",
    ],
    tagline: "Responsive foam. Zero excess.",
    description:
      "Road-to-trail hybrid with carbon-neutral midsole and knit upper for long sessions.",
    specs: [
      { label: "Drop", value: "8mm" },
      { label: "Upper", value: "Engineered knit" },
    ],
    trending: false,
  },
];

export const bundles: Bundle[] = [
  {
    id: "b1",
    slug: "creator-tech-pack",
    name: "Creator Tech Pack",
    tagline: "Save 20% on studio essentials",
    description:
      "Earbuds, desk lamp, and axis watch bundled for a complete creator workstation.",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=700&q=80&fit=crop",
    productSlugs: ["pulse-earbuds-pro", "desk-lamp-spectrum", "axis-watch"],
    discountPercent: 20,
  },
  {
    id: "b2",
    slug: "weekend-adventure",
    name: "Weekend Adventure",
    tagline: "Save 15% on outdoor gear",
    description:
      "Shell jacket, backpack, and runners—everything for a two-day trail escape.",
    image: "https://images.pexels.com/photos/593157/pexels-photo-593157.jpeg?auto=compress&cs=tinysrgb&w=700",
    productSlugs: ["field-shell-jacket", "signal-backpack-24", "meridian-runner"],
    discountPercent: 15,
  },
  {
    id: "b3",
    slug: "play-explore-bundle",
    name: "Play & Explore",
    tagline: "Save 18% on toys combo",
    description:
      "Drone and modular blocks paired for indoor creativity and outdoor flight.",
    image: "https://images.pexels.com/photos/5220444/pexels-photo-5220444.jpeg?auto=compress&cs=tinysrgb&w=900",
    productSlugs: ["orbit-drone-mini", "modular-block-set"],
    discountPercent: 18,
  },
];

export const categories = [
  {
    slug: "electronics" as const,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=900&q=80",
  },
  {
    slug: "toys" as const,
    name: "Toys",
    image: "https://images.pexels.com/photos/5220444/pexels-photo-5220444.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    slug: "gears" as const,
    name: "Gears",
    image: "https://images.pexels.com/photos/4993235/pexels-photo-4993235.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getBundleBySlug(slug: string) {
  return bundles.find((b) => b.slug === slug);
}

export function getBundleProducts(bundle: Bundle) {
  return bundle.productSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => Boolean(p));
}

export function getBundlePricing(bundle: Bundle) {
  const items = getBundleProducts(bundle);
  const original = items.reduce((sum, p) => sum + p.price, 0);
  const discounted = Math.round(original * (1 - bundle.discountPercent / 100));
  const savings = original - discounted;
  return { original, discounted, savings, items };
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}
