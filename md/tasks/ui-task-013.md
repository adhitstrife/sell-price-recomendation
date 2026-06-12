# UI-013: Restyle MarketPriceInput

**Phase:** U3 - Component Restyling
**Duration:** 20 minutes
**Status:** Pending

---

## Description

Restyle the competitor price input section with ChefCost design — card container, input rows, and add/remove buttons.

**What will be done:**
1. **Card container**: Apply `.card-chef` styling
2. **Section title**: Plus Jakarta Sans, text-secondary
3. **Input rows**: Each competitor price as a horizontal row:
   - Number label (1, 2, 3...) in muted text
   - Price input with data-mono font, Chef Green focus ring
   - Remove button in Terracotta (`text-tertiary`)
4. **Add button**: Earthy Slate outline style (`border border-secondary text-secondary`)
5. **Warning text**: Minimum competitors message in Terracotta
6. **Mobile layout**: Full-width inputs, buttons below
7. **Desktop layout**: Inline row with remove button

**Design reference (from Stitch):**
- List of competitor prices with clear numbering
- Add button as secondary/outline style
- Remove buttons in warning color

**Files to edit:**
- `components/MarketPriceInput.tsx`

**Why this matters:**
- Market-based pricing is an advanced feature — needs clean presentation
- Consistent with rest of form system

---

## Dependencies

- UI-001, UI-002, UI-003 (design tokens)

## Acceptance Criteria

- [ ] Card container with ChefCost styling
- [ ] Input fields match rest of form system
- [ ] Remove button in Terracotta
- [ ] Add button as outline/secondary style
- [ ] All existing functionality preserved
