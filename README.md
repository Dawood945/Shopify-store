# ARCHIVE

Premium e-commerce storefront with **Shopify headless** support. Dark editorial aesthetic, Electric Cyan accents, Geist typography.

## Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** + DaisyUI themes
- **Shopify Storefront API** (optional live catalog + checkout)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without Shopify env vars, the site uses local demo products in `src/lib/data.ts`.

## Shopify integration

See **[shopify/README.md](shopify/README.md)** for full setup.

### Quick connect

1. Copy `.env.example` → `.env.local`
2. Add `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
3. Create Shopify collections: `electronics`, `toys`, `gears`
4. Import demo products: `npm run shopify:export` → upload `shopify/import/products.csv`

### Import products into Shopify Admin

```bash
npm run shopify:export
```

Upload `shopify/import/products.csv` via **Shopify Admin → Products → Import**.

## Routes

| Route | Screen |
|-------|--------|
| `/` | Homepage |
| `/collections` | Product grid + filters |
| `/products/[slug]` | Product detail |
| `/bundles` | Bundle discounts |
| `/checkout` | Demo checkout (fallback) |

## Architecture

| Layer | Purpose |
|-------|---------|
| `src/lib/catalog.ts` | Products from Shopify or mock fallback |
| `src/lib/shopify/` | Storefront API client, mappers, cart |
| `src/app/api/shopify/checkout` | Create Shopify checkout URL |
| `shopify/import/` | CSV for Shopify Admin import |
