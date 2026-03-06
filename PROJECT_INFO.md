# Professional Experience: Telugu Ruchulu Project

## Position
**Frontend Developer (React/TypeScript)**

## Project Overview
**Telugu Ruchulu** is a modern web application dedicated to showcasing and delivering authentic Telugu cuisine. The platform features a dual-interface system: a public-facing e-commerce store for customers to browse and order food, and a secure administrative dashboard for business owners to manage inventory and operations.

## Tech Stack
-   **Core:** React 18, TypeScript, Vite
-   **State Management:** React Context API (Store & Cart Contexts)
-   **Styling:** Tailwind CSS, Radix UI (Headless Components)
-   **Animations:** Framer Motion
-   **Routing:** React Router DOM
-   **Icons:** Lucide React
-   **Notifications:** Sonner

## Daily Tasks & Responsibilities
-   **Component Development:** Architected and built reusable UI components (e.g., Cards, Modals, Forms) using React and TypeScript, ensuring type safety and maintainability.
-   **State Management:** Implemented robust global state solutions using the Context API to handle complex data flows like Shopping Cart operations (`CartContext`) and User Authentication/Role Management (`StoreContext`).
-   **UI/UX Implementation:** Translated design requirements into responsive, pixel-perfect interfaces using Tailwind CSS. Integrated `framer-motion` to add fluid animations and micro-interactions for an enhanced user experience.
-   **Admin Dashboard:** Developed a protected Admin Dashboard (`AdminDashboard.tsx`) enabling content management functions such as adding/editing dishes and modifying pricing.
-   **Routing & Navigation:** Configured client-side routing using `react-router-dom` to manage navigation between the Public Home, Cart, and Admin interfaces.
-   **Code Quality:** Maintained high code standards using ESLint and TypeScript strict mode to catch errors early in the development cycle.

## Key Accomplishments
-   **Role-Based Access Control (RBAC):** Successfully implemented a secure authentication flow that differentiates between regular users and administrators, protecting sensitive admin routes.
-   **Dynamic Cart System:** Built a fully functional shopping cart experience with real-time updates for adding items, adjusting quantities, and calculating totals.
-   **Modern & Accessible UI:** Leveraged Radix UI primitives to ensure all interactive components (Dialogs, Dropdowns, Toast notifications) are accessible and keyboard-navigable.
-   **Performance Optimization:** Utilized Vite for lightning-fast hot module replacement (HMR) and optimized build output, ensuring quick load times for end-users.

## SEO & Accessibility (ADA) Standards

### Accessibility (ADA/WCAG) Compliance
*   **Semantic HTML Architecture:** strictly adhered to semantic markup (using `<main>`, `<header>`, `<article>`, `<nav>`) to ensure content is machine-readable and navigable by screen readers.
*   **Radix UI Primitives:** Implemented **Radix UI** (Headless UI) for complex interactive components like Modals, Dropdowns, and Dialogs. These unstyled primitives guarantee fully accessible keyboard navigation, focus management, and correct ARIA attribute handling out-of-the-box.
*   **Robust Image Handling:** Designed a custom `ImageWithFallback` component to strictly enforce `alt` text presence and handle broken image links gracefully, ensuring a seamless experience for visually impaired users.
*   **Keyboard Navigation:** Ensured all interactive elements (buttons, form inputs, filters) are focusable and navigable via keyboard, with visible focus states for accessibility.

### SEO (Search Engine Optimization)
*   **Performance-First Architecture:** Leveraged **Vite** for optimized code splitting and tree-shaking, resulting in minimal bundle sizes and faster Time-to-Interactive (TTI), which is a crucial Core Web Vital ranking factor.
*   **Responsive & Mobile-First:** Adopted a mobile-first design strategy using **Tailwind CSS**, ensuring the site is fully responsive and google-mobile-friendly compliant.
*   **Meta Tag Management:** Integrated essential meta tags for viewport control and character encoding in the document head to ensure proper indexing across devices.
