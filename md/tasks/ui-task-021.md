# UI-021: Saved Recipes Page Mobile

**Phase:** U5 - Mobile Responsiveness
**Duration:** 15 minutes
**Status:** Pending

---

## Description

Ensure the Saved Recipes page is fully responsive on mobile — full-width recipe cards, stacked action buttons, and proper search input sizing.

**What will be done:**
1. Recipe cards: full-width on mobile (`w-full`)
2. Action buttons: stack below the recipe info on mobile
3. Search input: full-width
4. "Create New" button: full-width on mobile
5. Empty state: centered, full-width with proper padding
6. Delete confirmation modal: proper mobile styling (full-width dialog, easy-to-tap buttons)
7. Back button: visible and touch-friendly

**Files to edit:**
- `app/saved-recipes/page.tsx`

**Why this matters:**
- Users often check saved recipes on the go
- Full-width elements prevent layout issues on small screens

---

## Dependencies

- UI-023 (saved recipes restyle)

## Acceptance Criteria

- [ ] Recipe cards are full-width on mobile
- [ ] Action buttons stack below content
- [ ] Search input is full-width
- [ ] Delete modal is properly sized on mobile
- [ ] No horizontal scrolling
