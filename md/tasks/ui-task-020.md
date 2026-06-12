# UI-020: All Components Mobile Audit

**Phase:** U5 - Mobile Responsiveness
**Duration:** 60 minutes
**Status:** Pending

---

## Description

Audit every component for mobile responsiveness and fix any issues. Ensure all components look and function well on mobile viewports (320px-767px).

**What will be done:**
1. Review each component for mobile breakpoints:
   - IngredientInput: stacked layout, full-width inputs
   - IngredientList: card-based layout on mobile (UI-010)
   - OverheadInput: stacked layout
   - PricingMethodSelector: full-width method buttons, stacked
   - MarketPriceInput: full-width inputs
   - ResultDisplay: single column, stacked cards
   - AppLayout: hamburger menu, full-width nav
   - SavedRecipes page: full-width cards, stacked actions
2. Add missing Tailwind responsive prefixes (`sm:`, `md:`, `lg:`)
3. Ensure proper spacing on small screens (reduce padding if needed)
4. Check that modals/dialogs work on mobile (SavedRecipes delete confirmation)
5. Test at 320px, 375px, 414px widths

**Checklist per component:**
- [ ] No horizontal scroll
- [ ] Inputs are full-width
- [ ] Tables → card layout (where applicable)
- [ ] Buttons are full-width or have adequate touch targets
- [ ] Text is readable (min 14px)
- [ ] Proper spacing (padding/margins scale down)
- [ ] Modals are centered and scrollable

**Files to audit/edit:**
- `components/IngredientInput.tsx`
- `components/IngredientList.tsx`
- `components/OverheadInput.tsx`
- `components/PricingMethodSelector.tsx`
- `components/MarketPriceInput.tsx`
- `components/ResultDisplay.tsx`
- `components/AppLayout.tsx`
- `app/saved-recipes/page.tsx`
- `app/calculator/page.tsx`
- `app/page.tsx`

**Why this matters:**
- Consistent mobile experience across all components
- Catches edge cases that individual task might miss
- Ensures shipping quality

---

## Dependencies

- UI-009 through UI-014 (all component restyling)
- UI-019 (calculator mobile layout)

## Acceptance Criteria

- [ ] All components render correctly at 375px width
- [ ] No horizontal scrolling on any page
- [ ] All interactive elements have adequate touch targets
- [ ] Text remains readable on small screens
- [ ] Modals work on mobile (scrollable, dismissible)
