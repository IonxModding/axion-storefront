# AXION Headless Storefront

A custom Netlify-ready React storefront using Shopify as the commerce backend.

## Included

- Custom AXION visual system
- Home page
- Collection 001 — Zenith page
- Dynamic Shopify product pages
- Variant selection
- Shopify cart and hosted checkout
- Cart drawer
- Our Story, Journal, and Contact pages
- Netlify Forms for contact and newsletter
- Responsive mobile design
- Demo fallback products when Shopify is not configured

## 1. Install and preview locally

```bash
npm install
cp .env.example .env
npm run dev
```

The site will run with demo products until Shopify variables are added.

## 2. Connect Shopify

In Shopify Admin:

1. Install or open Shopify's **Headless** sales channel.
2. Create a storefront.
3. Copy the **public Storefront API access token**.
4. Confirm your products are published to the Headless sales channel.
5. Create a manual collection and note its URL handle.

Create `.env`:

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_public_storefront_access_token
VITE_SHOPIFY_API_VERSION=2026-07
VITE_SHOPIFY_COLLECTION_HANDLE=collection-001-zenith
```

Restart the development server after changing environment variables.

## 3. Product setup

Recommended Shopify handles:

- `zenith-heavyweight-hoodie`
- `zenith-heavyweight-tee`
- `zenith-desk-mat`
- `zenith-sticker-pack`

The code will work with other handles automatically after products are loaded from your chosen collection.

## 4. Deploy to Netlify

1. Upload this project to GitHub.
2. In Netlify, choose **Add new project → Import an existing project**.
3. Select the repository.
4. Netlify reads `netlify.toml` automatically.
5. Add the four environment variables under:
   **Project configuration → Environment variables**
6. Deploy.

Build command: `npm run build`  
Publish directory: `dist`

## 5. Domain

Point your AXION domain to Netlify. Keep the Shopify `myshopify.com` address for administration and checkout infrastructure.

## 6. Checkout behavior

The storefront creates a Shopify cart through the Storefront API. The **Secure checkout** button sends the Builder to the Shopify-hosted checkout URL, where Shopify handles payments, tax, shipping, discounts, and order creation.

## 7. Replace demo image assets

The demo mode references these paths:

```text
/public/products/hoodie-black.png
/public/products/tee-black.png
/public/products/desk-mat.png
/public/products/stickers.png
```

They are optional once Shopify is connected because live Shopify product images are used.

## 8. Important launch checks

- Publish every product to the Headless sales channel
- Verify every variant can be added to cart
- Complete a real test order
- Test mobile navigation and checkout
- Add real support email addresses
- Replace policy placeholders with your Shopify policies
- Confirm Printful fulfillment and shipping profiles
