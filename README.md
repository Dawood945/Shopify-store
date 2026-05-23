# ARCHIVE

Premium headless Shopify storefront. Dark editorial aesthetic, cyan accents, Geist typography.

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

### Quick connect

1. Create a `.env.local` with your Shopify store credentials:

```
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-public-token
```

2. Create Shopify collections: `electronics`, `toys`, `gears`
3. Import demo products:

```bash
npm run shopify:export
```

Upload `shopify/import/products.csv` via **Shopify Admin → Products → Import**.

### Hydrogen (headless) setup (optional)

```bash
npx @shopify/cli@latest init
```

## Routes

| Route | Screen |
|-------|--------|
| `/` | Homepage (hero, bundles, trending, categories) |
| `/collections` | Product grid + filters (sidebar) |
| `/products/[slug]` | Product detail (gallery, specs, FAQ, upsell) |
| `/bundles` | Bundle deals |
| `/checkout` | Demo checkout |

## Architecture

| Layer | Purpose |
|-------|---------|
| `src/lib/data.ts` | 8 demo products + 3 bundles (local fallback) |
| `src/lib/shopify/` | Storefront API client, mappers, cart queries |
| `src/app/api/shopify/checkout` | Create Shopify checkout URL |
| `scripts/generate-shopify-csv.mjs` | Generate product CSV for Shopify Admin import |
