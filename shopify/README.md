# Shopify integration

ARCHIVE works as a **Shopify headless storefront** and supports **product CSV import** into Shopify Admin.

## Option A — Connect live Shopify data (recommended)

1. In **Shopify Admin**, create a custom app with **Storefront API** access.
2. Copy your store domain (`your-store.myshopify.com`) and **Storefront access token**.
3. In this project root, copy `.env.example` to `.env.local` and fill in:

   ```env
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_...
   ```

4. Create collections with handles: `electronics`, `toys`, `gears`.
5. Tag products with `trending` to appear in Trending (or use collection sort).
6. Optional metafields (namespace `archive`):
   - `tagline` (single line text)
   - `specs` (JSON list: `[{"label":"Battery","value":"32h"}]`)

7. Run the storefront:

   ```bash
   npm run dev
   ```

Products and checkout will use Shopify. Bundles remain local until you add Shopify discounts.

## Option B — Import demo products into Shopify

Export CSV from this repo:

```bash
npm run shopify:export
```

Then in Shopify Admin:

1. **Products → Import**
2. Upload `shopify/import/products.csv`
3. Assign products to collections `electronics`, `toys`, `gears`
4. Connect Option A env vars so the Next.js site reads live data

## Deploy

Deploy to Vercel (or similar) and add the same environment variables.  
Add your deployment URL under Shopify Admin → **Headless** / sales channels if using Hydrogen channel settings.

## Architecture

| Layer | Path |
|-------|------|
| Catalog (Shopify + fallback) | `src/lib/catalog.ts` |
| Storefront API | `src/lib/shopify/` |
| Checkout API | `src/app/api/shopify/checkout/route.ts` |
| Demo CSV | `shopify/import/products.csv` |

Without env vars, the site uses local mock data in `src/lib/data.ts` for development.
