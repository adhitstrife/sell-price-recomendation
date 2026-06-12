# UI-017: Replace Loading States with CircularSpinner

**Phase:** U4 - Circular Progress Components
**Duration:** 15 minutes
**Status:** Pending

---

## Description

Replace all text-based loading indicators with the new CircularSpinner component for a more professional user experience.

**What will be done:**
1. Import `CircularSpinner` in `app/saved-recipes/page.tsx`
2. Replace `<p className="..." role="status">Loading...</p>` with `<CircularSpinner />`
3. Wrap the spinner in a centered container div
4. Check for any other text-based loading states in the codebase:
   - `contexts/RecipeContext.tsx` (if any loading UI)
   - `components/` (any loading indicators)
5. Ensure consistent placement: centered in the content area

**Files to edit:**
- `app/saved-recipes/page.tsx`
- Any other files with text loading indicators

**Why this matters:**
- Visual loading indicators are more professional than text
- Circular spinner matches ChefCost design language
- Consistent loading experience across the app

---

## Dependencies

- UI-015 (CircularSpinner component)

## Acceptance Criteria

- [ ] All "Loading..." text replaced with CircularSpinner
- [ ] Spinner is centered in the content area
- [ ] Proper role attributes for accessibility
- [ ] Existing functionality preserved
