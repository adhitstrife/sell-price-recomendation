# UI-009: Restyle IngredientInput

**Phase:** U3 - Component Restyling
**Duration:** 45 minutes
**Status:** Pending

---

## Description

Restyle the ingredient input form with ChefCost design — update focus rings, border colors, font choices, and layout for mobile.

**What will be done:**
1. **Card container**: Apply `.card-chef` styling
2. **Input fields**: 
   - Border: `border-[#e2e8f0]`
   - Focus ring: `ring-2 ring-primary` (Chef Green)
   - Border radius: 8px (`rounded-lg`)
   - Font: `font-body` with `text-data-mono` for price fields
3. **Labels**: Use `text-sm font-semibold text-secondary` style
4. **Select dropdowns**: Match input styling with custom chevron
5. **Add button**: Chef Green primary style (`bg-primary text-white`)
6. **Mobile layout**: Stack inputs vertically on small screens, 2-column grid on desktop
7. **Unit selectors**: Properly styled dropdowns matching ChefCost design
8. **Error messages**: Terracotta (`text-tertiary`) color

**Design reference (from Stitch):**
- Ingredient rows are horizontal on desktop: [Name] [Price] [Unit] [Amount] [Amount Unit]
- Clean focus states with Chef Green ring
- Data-mono font for price and quantity inputs

**Files to edit:**
- `components/IngredientInput.tsx`

**Why this matters:**
- Primary data entry form — needs to be clear and easy to use
- Consistent input styling across all forms
- Mobile-friendly input layout

---

## Dependencies

- UI-001, UI-002, UI-003 (design tokens)

## Acceptance Criteria

- [ ] Input fields have Chef Green focus ring
- [ ] Price inputs use data-mono font with tabular-nums
- [ ] All inputs have 8px border radius
- [ ] Layout stacks vertically on mobile, 2-column on desktop
- [ ] "Tambah Bahan" button is Chef Green
- [ ] Error messages display in Terracotta
- [ ] All existing functionality preserved
