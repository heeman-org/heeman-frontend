# Heeman Storefront

This is the customer-facing e-commerce storefront for Heeman. It provides a seamless, immersive, and responsive shopping experience allowing users to browse products, manage wishlists, discover categories, and submit custom inquiries.

## Features

- **Dynamic Catalog:** Browse products across multiple categories with details on size, color, materials, and extended features.
- **User Accounts:** Seamless sign-up and login using `better-auth`.
- **Wishlist:** Users can seamlessly add and track their favorite items.
- **Coupons System:** Support for real-time validation of public, private, and global promos dynamically fetched from the backend.
- **Custom Inquiries:** Allows customers to effortlessly reach out regarding product customizations, complete with image support.
- **Responsive Animations:** Polished framer-motion micro-interactions for a premium shopping experience.

## Tech Stack

- **Framework:** [React 19](https://react.dev) + [Vite](https://vitejs.dev/)
- **Routing:** `react-router-dom`
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://motion.dev/)
- **Icons:** `lucide-react`
- **Authentication:** `better-auth`
- **Language:** TypeScript

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Make sure to configure your backend API URLs. Replace or configure the `.env` attributes accordingly.

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The site will be running at [http://localhost:5173](http://localhost:5173) by default.

4. **Build for Production:**
   ```bash
   npm run build
   ```
