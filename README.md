# E-commerce storefront starter

A plain HTML, CSS and JavaScript store for a physical-products client. No build step. Open `index.html` in a browser to preview it.

## Files

| File                         | Purpose                                                                     |
| ---------------------------- | --------------------------------------------------------------------------- |
| `index.html`                 | Home page and product grid                                                  |
| `product.html`               | Product detail page (reads `?id=` from the URL)                             |
| `cart.html`                  | Cart, quantities, subtotal                                                  |
| `privacy.html`, `terms.html` | Legal page outlines, must be completed before launch                        |
| `products.js`                | Store name, currency, and the product list. Edit this to change the catalog |
| `app.js`                     | Rendering and cart logic (cart is stored in the browser)                    |
| `styles.css`                 | All styling. Colors are variables at the top                                |
| `favicon.svg`                | Placeholder icon, replace with the client's logo                            |
| `images/`                    | Put product photos here, named to match `products.js`                       |

## Step 1: Client intake (ask before building further)

- Business name, logo, brand colors
- Product list with real photos, descriptions, prices, and options (size, color)
- Where they ship, shipping rates, and return policy
- Payment provider they will use (Stripe is the usual choice)
- Domain name they own or want to buy
- Contact email and business address (needed for the legal pages)

## Step 2: Fill in the content

1. Edit `STORE` and `PRODUCTS` in `products.js`.
2. Add real photos to `images/` (square crops work best).
3. Replace the placeholder headline, subtext, and meta description in `index.html`. Write them about the actual products. Do not use invented reviews, sales numbers, or customer counts.
4. Set the brand colors in `:root` in `styles.css`.

## Step 3: Wiring up checkout

The Checkout button currently shows a placeholder message. Real payments need a server-side piece, because prices must never be trusted from the browser. Options, easiest first:

1. **Stripe Payment Links** (no server). Create one link per product in the Stripe dashboard and replace the cart with a direct "Buy" button on each product page. Simple, but no multi-item cart.
2. **Stripe Checkout with a small serverless function** (Netlify Functions, Vercel, or Cloudflare Workers). The function receives product ids and quantities, looks up prices on the server, and creates a Checkout Session. Then change `startCheckout()` in `app.js` to call it and redirect.
3. **Hosted platform** (Shopify, WooCommerce) if the client needs inventory management, tax handling, and order admin without custom code.

Never put secret API keys in these files. Only publishable keys belong in front-end code.

## Step 4: Deploy

Any static host works: Netlify, Vercel, Cloudflare Pages, or GitHub Pages. Drag the folder in, or connect a repository.

## Launch checklist

The site is not ready to launch until all of these are done:

- [✅] Custom domain connected, with HTTPS working
- [✅] Privacy policy page completed (`privacy.html`)
- [✅] Terms and conditions page completed (`terms.html`)
- [ ] Real checkout connected and tested with a test payment
- [ ] All placeholder text and `TODO` notes removed
- [ ] Tested on a phone and on a desktop browser
- [ ] Client has approved the final content
