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

The project also includes a focused accessibility engineering layer based on WCAG-oriented practices, semantic HTML, keyboard navigation, accessible names, ARIA states, live-region announcements, and manual screen-reader validation.

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

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Animations:** Framer Motion
- **Backend and Database:** Supabase
- **Routing:** React Router DOM v6
- **Icons and Notifications:** Lucide React and Sonner
- **Accessibility Focus:** Semantic HTML, WCAG-oriented patterns, ARIA, keyboard support, and NVDA validation

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
