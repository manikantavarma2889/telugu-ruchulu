# 🍲 Telugu Ruchulu

<div align="center">

  **Authentic Telugu Cuisine E-Commerce Platform & Admin Management Dashboard**

  [![GitHub Stars](https://img.shields.io/github/stars/manikantavarma2889/telugu-ruchulu?style=for-the-badge&logo=github&color=gold)](https://github.com/manikantavarma2889/telugu-ruchulu/stargazers)
  [![GitHub Forks](https://img.shields.io/github/forks/manikantavarma2889/telugu-ruchulu?style=for-the-badge&logo=github&color=blue)](https://github.com/manikantavarma2889/telugu-ruchulu/network/members)
  [![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Webpack](https://img.shields.io/badge/Webpack-5-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black)](https://webpack.js.org/)
  [![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.12-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
  [![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?style=for-the-badge)](https://web.dev/progressive-web-apps/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  [![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge)](https://tanstack.com/query)
  [![Recharts](https://img.shields.io/badge/Recharts-2.15.4-22B5BF?style=for-the-badge)](https://recharts.org/)
  [![Playwright](https://img.shields.io/badge/Playwright-1.55-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
  [![Vitest](https://img.shields.io/badge/Vitest-2.1.9-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

</div>

---

## 📖 About The Project

**Telugu Ruchulu** is a modern Telugu cuisine e-commerce application built with React, TypeScript, Webpack, Tailwind CSS, and Supabase. It provides a complete customer shopping experience together with a protected administrative dashboard for managing food items, orders, and operational analytics.

The project combines production-focused frontend patterns with automated testing and accessibility engineering. TanStack Query is used for server-state management, Recharts powers admin data visualization, Vitest covers reusable business logic, and Playwright covers browser-level customer flows.

### Main Interfaces

- **Customer Storefront:** Browse dishes, search products, filter categories, manage the cart, authenticate, and place orders.
- **Admin Dashboard:** Manage menu inventory, update prices and availability, review customer orders, update order status, and view analytics.

---

## ✨ Key Features

### Customer Experience

- 🛒 Dynamic shopping cart with quantity controls and automatic total calculation
- 🔎 Search and category filtering for dishes
- 🔐 Customer authentication using Supabase
- 📦 Order placement and order history
- 📱 Responsive mobile-first interface
- 🎨 Modern UI with Tailwind CSS, Radix UI, and Framer Motion

### Admin Experience

- 🛡️ Protected administrator dashboard
- 🍽️ Add, edit, and delete menu items
- 💰 Update item prices and availability
- 📋 View customer orders and update order status
- 📈 Revenue and order-status analytics using Recharts
- 🔑 Role-aware navigation and authentication flow

### State Management & Application Architecture

- 🧠 **Redux Toolkit:** Owns the application cart state with a typed Redux store, slice reducers, and React Redux hooks while the existing context API remains responsible for compatibility and authentication/UI integration.
- 📦 **TanStack Query:** Manages server-state lifecycle for menu and order data with query caching, refetching, loading/error handling, and invalidation after mutations.
- 📱 **Progressive Web App (PWA):** Webpack + Workbox generates a production service worker, precaches the application shell, caches image assets, supports SPA navigation fallback, and exposes an installable web app manifest.
- 🗃️ **Supabase:** Provides authentication and the application database/backend services.
- 🧭 **React Router:** Handles customer and protected administrative navigation.
- 🧩 **Radix UI:** Provides accessible primitives for dialogs, forms, selects, toasts, and other interactive components.

### Data Management & Application Architecture

- ⚡ **TanStack Query:** Manages server-state lifecycle for menu and order data with query caching, refetching, loading/error handling, and invalidation after mutations.
- 🗃️ **Supabase:** Provides authentication and the application database/backend services.
- 🧭 **React Router:** Handles customer and protected administrative navigation.
- 🧩 **Radix UI:** Provides accessible primitives for dialogs, forms, selects, toasts, and other interactive components.

### Testing

- 🧪 **Vitest:** Unit tests for reusable order analytics/business logic, with V8 coverage support.
- 🎭 **Playwright:** Browser-based end-to-end testing for the customer storefront and critical user flows.
- 🔍 **ESLint + TypeScript:** Static code-quality and type-checking through the existing build/lint workflow.

### Accessibility Engineering

- Semantic landmarks and logical heading structure
- Skip link for keyboard and screen-reader users
- Keyboard-accessible navigation and interactive controls
- Visible focus indicators for keyboard navigation
- Descriptive accessible names for buttons, inputs, links, and images
- `aria-pressed` states for category and dashboard navigation controls
- `aria-live` announcements for dynamic cart quantities and status messages
- Accessible dialogs, forms, tables, lists, and fieldsets
- Appropriate image alternative text and decorative icon handling
- Documented accessibility test results in [`ACCESSIBILITY.md`](./ACCESSIBILITY.md)

---

## 🧪 Accessibility Testing

Primary customer and administrative flows were manually tested using **NVDA screen reader and keyboard-only navigation**.

Testing covered:

- Headings and landmarks
- Keyboard navigation and visible focus
- Images, labels, and accessible names
- Category filters and selection states
- Cart updates and dynamic announcements
- Authentication forms and dialogs
- Admin dashboard navigation and data tables
- Zoom/reflow and high-contrast behavior

**Result:** Primary tested flows passed, with no critical accessibility defects discovered during testing.

For the detailed test record and testing procedure, see [`ACCESSIBILITY.md`](./ACCESSIBILITY.md).

---

## 🛠️ Tech Stack

### Frontend

- React 18
- TypeScript 5.3
- Webpack 5
- Redux Toolkit 2.12 + React Redux 9.3
- Progressive Web App (PWA) with Workbox service worker
- Tailwind CSS 3.4
- React Router DOM 6
- Radix UI
- Framer Motion
- Lucide React
- Sonner

### Backend & Data

- Supabase
- Supabase Authentication
- Supabase database services
- TanStack Query v5 for server-state management

### Data Visualization

- Recharts 2.15.4
- Responsive admin revenue and order-status charts

### Testing & Quality

- Vitest 2.1.9
- V8 coverage via `@vitest/coverage-v8`
- Playwright 1.55
- ESLint
- TypeScript type-checking

### Accessibility

- Semantic HTML
- WCAG-oriented patterns
- ARIA states and live regions
- Keyboard navigation
- NVDA validation

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Ensure the following are installed:

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/manikantavarma2889/telugu-ruchulu.git
   cd telugu-ruchulu
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the project root:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser.

### Available Scripts

```bash
npm run dev            # Start the Webpack development server
npm run build          # Create a production Webpack bundle and PWA service worker
npm run typecheck      # Run the TypeScript compiler without emitting files
npm run lint           # Run ESLint checks
npm run test           # Run Vitest unit tests
npm run test:watch     # Run Vitest in watch mode
npm run test:coverage  # Run Vitest with V8 coverage
npm run e2e            # Run Playwright end-to-end tests
npm run e2e:ui         # Open Playwright UI mode
npm run preview        # Preview the production build locally
```

### Running Playwright Locally

After installing dependencies, install the required browser:

```bash
npx playwright install chromium
```

Then run:

```bash
npm run e2e
```

For interactive debugging:

```bash
npm run e2e:ui
```

---

## ♿ Manual Accessibility Testing

The detailed NVDA test procedure and completed test record are maintained in [`ACCESSIBILITY.md`](./ACCESSIBILITY.md).

The documented checks include keyboard navigation, screen-reader announcements, accessible forms and dialogs, admin tables, zoom/reflow, high contrast, and reduced-motion behavior.

---

## 🌐 Live Application

Experience the deployed application on Vercel:

👉 [Telugu Ruchulu Live Demo](https://telugu-ruchulu.vercel.app/)

---

## 📚 Documentation

- [Accessibility Guide and NVDA Test Record](./ACCESSIBILITY.md)
- [GitHub Repository](https://github.com/manikantavarma2889/telugu-ruchulu)

---

## 📄 License

This project is intended for learning, portfolio demonstration, and further development.
