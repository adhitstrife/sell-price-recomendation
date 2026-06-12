# UI-023: Restyle Saved Recipes Page with ChefCost

**Phase:** U6 - Saved Recipes
**Duration:** 45 minutes
**Status:** Pending

---

## Description

Restyle the Saved Recipes page with ChefCost design system — update recipe cards, search input, action buttons, and delete confirmation modal.

**What will be done:**
1. **Page header**: "Resep Tersimpan" in Plus Jakarta Sans, Chef Green
2. **Recipe cards**: ChefCost Level 1 card styling
   - White background, 8px radius, soft green shadow
   - Recipe name in Plus Jakarta Sans
   - Recipe details (portions, method) in Public Sans, Earthy Slate
   - Date in muted text
3. **Search input**: Consistent styling (8px radius, Chef Green focus ring)
4. **Action buttons**:
   - Edit: Chef Green (`bg-primary text-white`)
   - Duplicate: Earthy Slate outline
   - Delete: Terracotta (`bg-tertiary text-white`)
5. **Delete confirmation modal**: ChefCost styled
   - Dialog with card styling
   - Cancel button: Earthy Slate outline
   - Delete button: Terracotta
6. **Empty state**: Centered card with icon and CTA button
7. **Loading state**: Show CircularSpinner instead of text

**Design reference (from Stitch):**
- Recipe cards with clear actions
- Consistent with rest of the app design system
- Modal dialogs with proper ChefCost colors

**Files to edit:**
- `app/saved-recipes/page.tsx`

**Why this matters:**
- Saved recipes is a key feature for returning users
- Consistent design across all pages strengthens brand identity

---

## Dependencies

- UI-001, UI-002, UI-003 (design tokens)
- UI-015 (CircularSpinner for loading state)
- UI-006 (routing structure)

## Acceptance Criteria

- [ ] Recipe cards use ChefCost styling (card-chef)
- [ ] Action buttons use ChefCost colors (green/slate/terracotta)
- [ ] Search input matches form system
- [ ] Delete modal uses ChefCost theming
- [ ] Empty state has CTA button styled correctly
- [ ] Loading state shows CircularSpinner
- [ ] All existing functionality preserved
