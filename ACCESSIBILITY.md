# Accessibility & Assistive Technology Testing

Telugu Ruchulu is developed with accessibility in mind and targets practical WCAG 2.x AA expectations for a React web application.

## Implemented accessibility practices

- Semantic landmarks such as header, navigation, main, sections, lists, tables, and fieldsets.
- Keyboard-accessible controls with visible `:focus-visible` indicators.
- Descriptive accessible names for buttons, icon-only controls, search, cart, forms, and navigation.
- `aria-pressed` for selectable category and dashboard navigation controls.
- `aria-live`/status announcements for dynamic cart quantities and empty/no-result states.
- Meaningful image alternative text and decorative icons hidden from assistive technology.
- Form autocomplete attributes, required states, and descriptive labels.
- Dialog descriptions and accessible names for modal interfaces.
- Skip navigation link to bypass repeated content.
- Reduced-motion support through the user's operating-system preference.

## NVDA manual test procedure

Use Windows with [NVDA](https://www.nvaccess.org/download/) and a Chromium-based browser or Firefox.

1. Start NVDA and open the application.
2. Navigate using `Tab` and `Shift+Tab`; verify every interactive element is reachable in a logical order.
3. Use `Enter`/`Space` to activate buttons, category filters, cart controls, dialogs, and navigation.
4. Use NVDA browse mode and heading navigation (`H`) to confirm meaningful heading structure.
5. Use landmark navigation (`D`) to locate the header, navigation, main content, and complementary regions.
6. Confirm images announce useful alternative text and decorative icons are not unnecessarily announced.
7. Confirm category selections announce their pressed state.
8. Add an item to the cart and verify quantity/status changes are announced.
9. Open and close the cart and authentication dialogs; verify the dialog title/description is announced and focus remains usable.
10. Submit invalid/empty forms and verify labels, required fields, and errors are understandable.
11. Test the admin dashboard with keyboard navigation and verify table headers/status controls are understandable.
12. Repeat at 200% browser zoom and with Windows high-contrast or forced-colors settings where available.

## Test record

Record the date, browser, NVDA version, tested route, result, and any issue found. Do not claim assistive-technology testing as completed until this manual procedure has actually been run on the deployed or local application.
