# Sprint 1 — Customer Experience & Core Frontend

## Scope

Issue #3 covers the customer-facing storefront and its core interaction flow:
- Menu browsing and responsive food-card layout
- Search by dish name
- Category filtering
- Cart add, remove and quantity controls
- Checkout/customer delivery details
- Customer authentication and profile-backed delivery details
- Location selection/detection
- Supabase menu and order API integration
- Reusable UI components and accessible landmarks
- TypeScript, lint, unit-test and browser-test validation

## Implemented customer experience

### Menu browsing
The home page loads menu items through the store layer and renders reusable FoodCard components. Each card exposes the dish name, description, price, dietary indicator, rating and cart controls.

### Search and filtering
The storefront filters menu items by dish name and category. Category controls expose selected state through aria-pressed, while the search field is available as an accessible searchbox.

### Cart flow
Customers can add dishes directly from the menu, adjust quantities in the cart, enter delivery details and continue to payment. Empty-cart and missing-delivery-information states are handled in the UI.

### Authentication
Customer login and signup use Supabase Auth. Signup stores customer profile information, while authenticated profile data is reused for checkout and customer order history.

### Responsive and accessible UI
The storefront uses responsive Tailwind layouts, mobile cart controls, keyboard-visible focus states, a skip-to-content link, semantic landmarks and accessible labels for interactive controls.

### API integration
Supabase provides menu, profile and order persistence. TanStack Query coordinates menu/order fetch lifecycles and cache invalidation, while Supabase realtime updates keep order state synchronized.

## Validation

- npm run typecheck
- npm run lint
- npm run test
- npm run e2e

The Playwright storefront suite covers page loading/accessibility landmarks, menu search, category filtering, cart interaction, and the PWA manifest/service-worker contract.

## Issue

This document records the completed implementation for GitHub Issue #3 — Sprint 1: Customer Experience & Core Frontend.