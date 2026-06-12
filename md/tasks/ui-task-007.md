# UI-007: Restyle AppLayout (Header, Nav, Mobile Menu, Alerts)

**Phase:** U3 - Component Restyling
**Duration:** 60 minutes
**Status:** Pending

---

## Description

Restyle the AppLayout component with ChefCost design — update the header/nav with Chef Green background, add mobile hamburger menu, and restyle alert toasts.

**What will be done:**
1. **Header**: Change background to Chef Green (`bg-primary`), text to white
2. **Brand/Logo**: Use Plus Jakarta Sans, white text, app title from i18n
3. **Nav links**: Add three links — Landing (`/`), Calculator (`/calculator`), Saved Recipes (`/saved-recipes`)
4. **Mobile**: Add hamburger menu button (visible on mobile), slide-down nav panel
5. **Active route**: Highlight current page nav link
6. **Alerts**: Restyle toasts with ChefCost colors (success=Chef Green, error=Terracotta, info=Earthy Slate)
7. **Main content area**: Adjust background to `bg-surface` (`#f7f9fb`)

**Design reference:**
- Chef Green header bar with white text
- Clean, minimal navigation
- Mobile: hamburger → expandable menu with full-width links
- Alert toasts: rounded cards with colored left border/accent

**Files to edit:**
- `components/AppLayout.tsx`

**Why this matters:**
- First thing users see — establishes ChefCost brand identity
- Mobile nav is essential for responsive experience
- Alert toasts communicate success/error states

---

## Dependencies

- UI-001, UI-002, UI-003 (design tokens)
- UI-006 (new routing structure)

## Acceptance Criteria

- [ ] Header has Chef Green background with white text
- [ ] Nav links for Landing, Calculator, Saved Recipes all work
- [ ] Active route is visually distinct
- [ ] Mobile hamburger menu toggles nav links
- [ ] Alert toasts use ChefCost colors (green/terracotta/slate)
- [ ] Responsive at all breakpoints
