# UI-010: Restyle IngredientList (Mobile Card Layout)

**Phase:** U3 - Component Restyling
**Duration:** 45 minutes
**Status:** Pending

---

## Description

Restyle the ingredient list table with ChefCost design. On mobile, switch from a table layout to a card-based layout for better usability.

**What will be done:**
1. **Table header**: Clean Earthy Slate background with white text, or subtle header row
2. **Table rows**: Subtle dividers (`border-gray-100`), hover state with light green tint
3. **Cost column**: Bold Chef Green (`text-primary font-semibold`)
4. **Delete button**: Terracotta (`text-tertiary`) or outlined style
5. **Mobile (<768px)**: Transform table into card list:
   - Each ingredient becomes a card with stacked label: value pairs
   - Delete button at bottom-right of each card
   - Cost highlighted at the bottom
6. **Desktop (≥768px)**: Standard table layout with proper column alignment
7. **Empty state**: Centered message with muted styling

**Design reference (from Stitch):**
- Clean table with minimal borders
- Cost column visually prominent (green)
- Mobile: card-based per-ingredient layout
- Delete icon/cross in Terracotta

**Files to edit:**
- `components/IngredientList.tsx`

**Why this matters:**
- Ingredient list can get long — needs to be scannable
- Table is unusable on mobile without card transformation
- Cost visibility is key for user decision-making

---

## Dependencies

- UI-001, UI-002, UI-003 (design tokens)

## Acceptance Criteria

- [ ] Desktop: table with properly aligned columns
- [ ] Mobile: card-based layout with labeled fields
- [ ] Cost column uses Chef Green bold font
- [ ] Delete button/icon in Terracotta
- [ ] Empty state shows centered message
- [ ] Hover state on table rows
- [ ] All existing functionality preserved
