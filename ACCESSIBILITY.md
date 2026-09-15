# Accessibility & Assistive Technology Testing

## Project accessibility statement

Telugu Ruchulu is a React + TypeScript e-commerce application designed to follow practical WCAG 2.x AA principles. The project includes semantic HTML, keyboard-friendly controls, accessible names, status announcements, form guidance, dialog descriptions, and reduced-motion support.

## Accessibility improvements implemented

- Semantic landmarks: `header`, `nav`, `main`, `section`, `aside`, lists, tables, and fieldsets.
- Skip link for bypassing repeated header/navigation content.
- Logical heading hierarchy and descriptive section headings.
- Keyboard-accessible buttons, links, filters, dialogs, cart controls, and admin controls.
- Visible `:focus-visible` indicators.
- Descriptive accessible names for icon-only buttons and form controls.
- `aria-pressed` for category filters and dashboard navigation.
- `aria-live` and status regions for dynamic cart quantities and no-result states.
- Meaningful image alternative text; decorative icons hidden with `aria-hidden`.
- Required form fields, autocomplete hints, input types, and understandable labels.
- Dialog titles/descriptions for authentication and cart interfaces.
- Table column headers and accessible status selectors in the admin dashboard.
- Reduced-motion behavior respecting `prefers-reduced-motion`.

## Recommended test environment

- Operating system: Windows 10 or Windows 11
- Screen reader: NVDA (latest stable release)
- Browser: Microsoft Edge, Google Chrome, or Mozilla Firefox
- Zoom: 100%, 200%, and 400% where practical
- Optional additional check: Windows High Contrast/Forced Colors

## NVDA manual test procedure

### 1. Launch and page structure

1. Start NVDA.
2. Open the local or deployed Telugu Ruchulu application.
3. Press `Insert+Space` if needed to switch NVDA interaction modes.
4. Press `H` repeatedly in browse mode and confirm headings are meaningful and ordered.
5. Press `D` to move between landmarks and verify header, navigation, main content, and complementary content are identifiable.
6. Confirm the page title and current route are understandable.

### 2. Keyboard-only navigation

1. Press `Tab` through the complete page.
2. Confirm focus is visible and follows a logical order.
3. Confirm no control is skipped or trapped.
4. Use `Enter` and `Space` to activate buttons and links.
5. Use `Shift+Tab` to move backward.
6. Open and close dialogs using keyboard controls, including `Escape` where supported.

### 3. Storefront checks

- The skip link becomes available when focused and moves focus to the main content.
- Search has an understandable accessible name.
- Location choices expose the selected state.
- Category filters announce their selected/pressed state.
- Food cards expose the dish name, image alternative text, price, dietary status, rating, and add-to-cart action.
- Decorative icons are not read as meaningless content.
- Empty search/category results are announced as a status message.

### 4. Cart checks

1. Add a food item.
2. Confirm the cart button announces the item count.
3. Open the cart dialog/sheet.
4. Confirm the dialog title and description are announced.
5. Increase and decrease quantity; verify the updated quantity is announced.
6. Remove an item and verify the resulting state is understandable.
7. Verify delivery fields have labels, required states, and suitable input types.
8. Confirm the payment button communicates when required details are missing.

### 5. Authentication and forms

- Email and password fields have clear labels.
- Sign-in/sign-up mode changes have an understandable accessible name.
- Required fields are identified.
- Invalid or unsuccessful submissions provide understandable feedback.
- Loading controls expose a busy state and do not create confusing duplicate actions.

### 6. Admin dashboard checks

- Dashboard navigation exposes the active section.
- Metric cards have understandable labels.
- Tables announce column headers before cell values.
- Status selectors have unique accessible names that identify the related order.
- All actions are reachable and usable without a mouse.

### 7. Visual and reflow checks

- Test at 200% browser zoom.
- Test at 400% if possible.
- Verify text does not overlap or become unavailable.
- Verify focus indicators remain visible.
- Verify content remains usable on narrow screens.
- Enable Windows High Contrast/Forced Colors and check that controls remain distinguishable.
- Enable reduced motion in the operating system and confirm animations are minimized.

## Test record template

Copy this table for each real test session:

| Field | Value |
|---|---|
| Tester | |
| Date | |
| Application URL/route | |
| OS | Windows 10/11 |
| Browser and version | |
| NVDA version | |
| Keyboard-only test | Pass / Fail / Notes |
| Headings and landmarks | Pass / Fail / Notes |
| Images and labels | Pass / Fail / Notes |
| Filters and selection state | Pass / Fail / Notes |
| Cart and dynamic announcements | Pass / Fail / Notes |
| Authentication/forms | Pass / Fail / Notes |
| Admin dashboard | Pass / Fail / Notes |
| Zoom/reflow | Pass / Fail / Notes |
| High contrast/forced colors | Pass / Fail / Notes |
| Defects discovered | |
| Retest result | |

## Suggested resume wording

Only use this wording after you personally complete the test:

> Implemented WCAG-oriented accessibility improvements across a React e-commerce application and manually tested key user flows with NVDA, including keyboard navigation, headings/landmarks, forms, dialogs, dynamic cart announcements, and admin data tables.

Until manual testing is completed, use:

> Implemented WCAG-oriented accessibility improvements and prepared an NVDA-based assistive technology testing plan for key e-commerce user flows.
