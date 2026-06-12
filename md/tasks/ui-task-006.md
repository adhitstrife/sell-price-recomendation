# UI-006: Move Calculator to `/calculator`, Update Nav

**Phase:** U2 - Routing Restructure
**Duration:** 30 minutes
**Status:** Pending

---

## Description

Move the current calculator page content from `/` to `/calculator` and update the navigation to reflect the new routing structure.

**What will be done:**
1. Create `app/calculator/page.tsx` with the content from current `app/page.tsx`
2. Rewrite `app/page.tsx` as Landing Page (UI-004)
3. Update `components/AppLayout.tsx` navigation:
   - Add link to `/` (Beranda/Landing)
   - Add link to `/calculator` (Kalkulator)
   - Keep link to `/saved-recipes` (Resep Tersimpan)
   - Mobile hamburger menu for nav links
4. Update any hardcoded "/" references in the codebase to use `/calculator` where appropriate

**Files to edit:**
- `app/calculator/page.tsx` (new, from `app/page.tsx`)
- `app/page.tsx` (becomes landing page)
- `components/AppLayout.tsx` (nav links update)
- `app/saved-recipes/page.tsx` (if it navigates to "/")

**Why this matters:**
- Separates marketing (landing) from utility (calculator)
- Cleaner URL structure
- Enables proper navigation between all pages

---

## Dependencies

- UI-004 (landing page replaces old `/`)

## Acceptance Criteria

- [ ] Calculator renders at `/calculator` with all existing functionality
- [ ] Landing page renders at `/`
- [ ] Nav has links to Landing, Calculator, and Saved Recipes
- [ ] "Back" navigation in calculator/saved-recipes works correctly
- [ ] All existing tests pass
