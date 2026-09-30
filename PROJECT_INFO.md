# Telugu Ruchulu — Project Information

## Project Overview

**Telugu Ruchulu** is a React and TypeScript food-ordering application for Telugu cuisine. The project provides two primary experiences:

- **Customer storefront:** menu browsing, search, category filtering, authentication, cart, checkout, and order history.
- **Admin dashboard:** menu management, order status management, and operational analytics.

## Technology Stack

### Frontend
- React 18
- TypeScript 5.3
- Webpack 5 and Webpack Dev Server
- React Router DOM
- Tailwind CSS
- Radix UI primitives
- Framer Motion
- Lucide React
- Sonner notifications

### State and Data
- **Redux Toolkit:** client-side cart state
- **React Context API:** authentication, customer profile, menu/order UI state, and application integration
- **TanStack Query:** server-state lifecycle, caching, and invalidation
- **Supabase:** authentication, PostgreSQL-backed application data, and realtime order updates

### Quality and Delivery
- ESLint 9
- TypeScript strict type-checking
- Vitest for unit/business-logic tests
- Playwright for browser-level tests
- Workbox for production PWA service-worker generation
- Vercel deployment configuration

## Application Architecture

The application entry point is `src/main.tsx`. The main application composition is handled by `src/App.tsx`, which wires together routing, providers, authentication UI, and notifications.

The source tree is organized by responsibility:

- `src/components/layout` — header, footer, splash screen, and general layout UI
- `src/components/menu` — menu browsing, cards, and category filtering
- `src/components/cart` — cart sheet and mobile cart experience
- `src/components/checkout` — authentication, orders, and payment flow
- `src/components/admin` — administrator authentication and menu management
- `src/components/ui` — reusable UI primitives
- `src/pages` — customer home and admin dashboard
- `src/context` — authentication, customer, menu, order, and application UI state
- `src/store` — Redux Toolkit store and cart slice
- `src/lib` — Supabase and TanStack Query clients
- `src/utils` — reusable order analytics logic
- `src/types` — shared domain types
- `src/test` and `e2e` — automated test setup and browser tests

## Key Implementation Areas

### Customer Experience

The storefront supports menu search and category filtering, responsive food cards, cart quantity controls, customer authentication, delivery information, payment flow, and customer order history.

### Administration

The admin dashboard provides menu CRUD operations, order monitoring, status updates, revenue summaries, and order-status analytics.

### Backend Integration

Supabase is used for authentication and persistence. Menu items, customer profiles, and orders are mapped between database fields and the application's TypeScript domain types. Supabase Realtime keeps order changes synchronized in the application.

### Progressive Web App

The production Webpack build uses Workbox to generate a service worker. The application also ships a web app manifest and uses SPA navigation fallback so the deployed application can behave as an installable PWA.

### Accessibility

The application uses semantic landmarks, keyboard-accessible controls, visible focus states, accessible names, ARIA states/live regions, accessible dialogs and form labels. Detailed manual accessibility procedures and the project test record are maintained in `ACCESSIBILITY.md`.

## Quality Workflow

The repository includes dedicated commands for:

- TypeScript validation
- ESLint validation
- Production Webpack builds
- Vitest unit tests
- Playwright end-to-end tests

GitHub Actions runs the validation pipeline on pushes to `main` and pull requests targeting `main`.

## Project Documentation

- `README.md` — project overview and setup guide
- `PROJECT_INFO.md` — current architecture and technology reference
- `ACCESSIBILITY.md` — accessibility guidance and manual test record
- `AGILE.md` — Agile-style development workflow
- `Attributions.md` — third-party asset/component attributions
- `supabase_schema.sql` — initial database schema and seed data
- `update_schema.sql` — schema updates for customer profiles and order ownership
