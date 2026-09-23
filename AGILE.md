# Agile Development Workflow

This repository uses an **Agile-style iterative workflow going forward**. This document describes the development process used for future iterations; it does not retroactively change the original development history.

## Sprint cadence

Work is organized into short iterations with a clear goal, a small set of tasks, implementation, testing, review, and retrospective.

### Sprint 1 — Customer Experience & Core Frontend
- Menu browsing, search, filtering
- Reusable UI components
- Cart and checkout flow
- Authentication and API integration
- Responsive frontend behavior

### Sprint 2 — Orders, Admin & State Management
- Order history and status
- Admin menu and order management
- Redux Toolkit client state
- TanStack Query server state
- Loading/error handling and analytics

### Sprint 3 — Quality, PWA & Release
- Vitest and Playwright validation
- Accessibility verification
- Workbox/PWA behavior
- Build and performance validation
- Bug fixing and Vercel release verification

## Working agreement

1. Create a GitHub Issue for each meaningful task or bug.
2. Select work for the current sprint.
3. Create a focused feature/fix branch.
4. Implement and test the change.
5. Open a Pull Request describing the change.
6. Review the change and verify CI checks.
7. Merge the Pull Request after acceptance.
8. Close the related Issue.
9. Review completed work and record improvements for the next sprint.

## Definition of Done

A task is considered complete when the implementation works, relevant tests/checks pass, the change has been reviewed through a Pull Request, and the documentation is updated when necessary.

## Sprint artifacts

- GitHub Issues for backlog and sprint work
- Feature/fix branches
- Pull Requests for review
- CI/test results
- Sprint review and retrospective notes
