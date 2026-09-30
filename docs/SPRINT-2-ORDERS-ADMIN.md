# Sprint 2 — Orders, Admin & State Management

Issue: #4

## Implemented workflows

### Customer orders
- Customer order history is loaded from Supabase for the signed-in customer.
- Active orders are separated from delivered order history.
- Order status is displayed with customer-friendly labels.
- Supabase realtime updates refresh the status of existing customer orders.
- Loading and empty states are displayed while order data is unavailable.

### Admin order management
- Admin dashboard lists recent orders.
- Orders expose customer, items, total, and current status.
- Admins can update an order through the supported status flow: pending → preparing → ready → delivered.
- New-order notifications are tracked and can be marked as read.

### Admin menu management
- Admins can add, edit, and delete menu items.
- Menu changes are persisted through Supabase.
- TanStack Query invalidation is used after menu mutations.

### State management
- Redux Toolkit owns the application cart state.
- Typed Redux hooks are used by the cart context.
- Cart behavior covers add, quantity increment/decrement, remove, and clear operations.
- The existing StoreContext continues to manage authentication, menu, order, and UI state.

### Server state and analytics
- TanStack Query manages menu and order query lifecycles and cache invalidation.
- Admin analytics expose revenue by date and order counts by status.
- Analytics transformations are covered by Vitest unit tests.

## Validation

Automated coverage includes:
- Redux cart reducer tests
- Order analytics unit tests
- Playwright storefront tests
- TypeScript type-checking
- ESLint
- Production Webpack build

The Sprint 2 implementation is kept on the feature branch and is intended to be reviewed through a pull request before merge.