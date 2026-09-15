# 🍲 Telugu Ruchulu

<div align="center">

  **Authentic Telugu Cuisine E-Commerce Platform & Admin Management Dashboard**

  [![GitHub Stars](https://img.shields.io/github/stars/manikantavarma2889/telugu-ruchulu?style=for-the-badge&logo=github&color=gold)](https://github.com/manikantavarma2889/telugu-ruchulu/stargazers)
  [![GitHub Forks](https://img.shields.io/github/forks/manikantavarma2889/telugu-ruchulu?style=for-the-badge&logo=github&color=blue)](https://github.com/manikantavarma2889/telugu-ruchulu/network/members)
  [![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

</div>

---

## 📖 About The Project

**Telugu Ruchulu** is a modern Telugu cuisine e-commerce application built with React, TypeScript, Vite, Tailwind CSS, and Supabase. It provides a complete customer shopping experience together with a protected administrative dashboard for managing food items and orders.

The project also includes a focused accessibility improvement layer based on WCAG-oriented practices, semantic HTML, keyboard navigation, accessible names, ARIA states, live-region announcements, and screen-reader testing preparation.

### Main Interfaces

- **Customer Storefront:** Browse dishes, search products, filter categories, manage the cart, authenticate, and place orders.
- **Admin Dashboard:** Manage menu inventory, update prices and availability, and review customer orders through protected admin routes.

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
- 📊 View order information and update order status
- 🔑 Role-aware navigation and authentication flow

### Accessibility Engineering

- Semantic landmarks and heading structure
- Skip link for keyboard and screen-reader users
- Keyboard-accessible navigation and interactive controls
- Visible focus indicators for keyboard navigation
- Descriptive accessible names for buttons, inputs, links, and images
- `aria-pressed` states for category and dashboard navigation controls
- `aria-live` announcements for dynamic cart quantities and status messages
- Accessible dialogs, forms, tables, lists, and fieldsets
- Appropriate image alternative text and decorative icon handling
- Accessibility documentation and an NVDA manual testing checklist

> Accessibility implementation details and the manual testing checklist are available in [`ACCESSIBILITY.md`](./ACCESSIBILITY.md).

---

## 🧪 Accessibility Testing Status

The application has been updated with WCAG-oriented accessibility improvements and is prepared for manual assistive-technology validation.

The repository includes a documented test plan covering:

- Keyboard-only navigation
- NVDA screen-reader navigation
- Headings and landmarks
- Forms and validation
- Dialogs and focus behavior
- Dynamic cart announcements
- Admin tables and controls
- Zoom, contrast, and reduced-motion checks

**Note:** NVDA testing should only be described as completed after the flows have been manually tested on a local Windows environment with NVDA. Until then, the project should be described as having an NVDA testing plan prepared rather than claiming completed screen-reader testing.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Animations:** Framer Motion
- **Backend and Database:** Supabase
- **Routing:** React Router DOM v6
- **Icons and Notifications:** Lucide React and Sonner
- **Accessibility Focus:** Semantic HTML, WCAG-oriented patterns, ARIA, keyboard support, and NVDA test preparation

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
npm run dev       # Start the Vite development server
npm run build     # Type-check and create a production build
npm run lint      # Run ESLint checks
npm run preview   # Preview the production build locally
```

---

## ♿ Manual Accessibility Testing

For the recommended NVDA validation process:

1. Start the application locally with `npm run dev`.
2. Launch NVDA on Windows.
3. Test keyboard navigation using `Tab`, `Shift + Tab`, `Enter`, `Space`, and arrow keys.
4. Review headings and landmarks using NVDA navigation commands.
5. Test the storefront, category filters, product cards, cart dialog, authentication modal, and admin dashboard.
6. Record results and issues using the checklist in [`ACCESSIBILITY.md`](./ACCESSIBILITY.md).

---

## 🌐 Live Application

Experience the deployed application on Vercel:

👉 [Telugu Ruchulu Live Demo](https://telugu-ruchulu.vercel.app/)

---

## 📚 Documentation

- [Accessibility Guide and NVDA Test Plan](./ACCESSIBILITY.md)

---

## 📄 License

This project is intended for learning, portfolio demonstration, and further development.
