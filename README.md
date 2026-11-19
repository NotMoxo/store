# Flowersta 🌸

A simple, responsive flower shop website built with **HTML, CSS, and vanilla JavaScript**. Flowersta allows users to browse flower products, view product details, choose available options, and manage a shopping cart.

🔗 **Live Demo:** [flowersta.vercel.app](https://flowersta.vercel.app/)

## Features

- **Product Catalog** – Browse available flowers and plants with images, descriptions, and prices.
- **Product Details** – View individual products and their available options.
- **Shopping Cart** – Add products, update quantities, and remove items.
- **Cart Persistence** – Cart contents are saved using the browser's `localStorage`.
- **Dynamic Cart Summary** – Automatically calculates item totals and the subtotal.
- **Responsive Design** – Layout adapts to different screen sizes.
- **Simple Navigation** – Dedicated pages for the shop, products, and shopping cart.
- **Legal Pages** – Includes Privacy Policy and Terms & Conditions.

## Built With

- **HTML5** – Page structure and content.
- **CSS3** – Styling, responsive layouts, and animations.
- **JavaScript (Vanilla)** – Product rendering, cart functionality, and local storage.
- **Vercel** – Deployment and hosting.

## Project Structure

```text
store/
├── images/          # Product and website images
├── index.html       # Main shop page
├── product.html     # Individual product page
├── cart.html        # Shopping cart page
├── privacy.html     # Privacy policy
├── terms.html       # Terms and conditions
├── styles.css       # Website styling
├── app.js           # Main application logic
├── products.js      # Store configuration and product data
└── favicon.svg      # Website favicon
```

## Getting Started

You can run Flowersta locally without installing any dependencies.

1. Clone the repository:

   ```bash
   git clone https://github.com/NotMoxo/store.git
   ```

2. Navigate to the project directory:

   ```bash
   cd store
   ```

3. Open `index.html` in your browser.

   Alternatively, use the **Live Server** extension in VS Code for a local development server.

## Customization

You can manage the store's name, currency, shipping note, and product information in `products.js`.

Each product supports the following properties:

- `id` – Unique product identifier.
- `name` – Product name.
- `price` – Product price.
- `image` – Product image path.
- `description` – Product description.
- `variants` – Available product options.

## Current Limitations

Flowersta is currently a **front-end demonstration project**.

- Checkout is a placeholder and does not process real orders.
- No backend, database, or user authentication is implemented.
- No real payment transactions are supported.
- Cart data is stored locally in the user's browser.

## Future Improvements

- Integrate a secure backend and database.
- Implement real checkout and payment gateway integration.
- Add order management and customer accounts.
- Improve product filtering and search functionality.

## Author

**Mahmoud Mosad**

- GitHub: [@NotMoxo](https://github.com/NotMoxo)
- Live Project: [Flowersta](https://flowersta.vercel.app/)

---

*Built as a personal web development project to practice front-end development and JavaScript application logic.*
