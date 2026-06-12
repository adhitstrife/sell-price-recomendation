# UI-012: Restyle PricingMethodSelector

**Phase:** U3 - Component Restyling
**Duration:** 30 minutes
**Status:** Pending

---

## Description

Restyle the pricing method selector with ChefCost design — method buttons as styled chips/cards, input fields matching the design system.

**What will be done:**
1. **Card container**: Apply `.card-chef` styling
2. **Method buttons**: Style as selectable chips:
   - Active: Chef Green (`bg-primary text-white`)
   - Inactive: subtle outline (`border border-secondary text-secondary`)
   - Hover: light green background for inactive
3. **Method name**: Use Plus Jakarta Sans for the heading
4. **Method-specific inputs**:
   - Food Cost % input: Chef Green focus ring, data-mono font
   - Markup multiplier input: same styling
   - Market description: secondary text color
5. **Mobile layout**: Stack method buttons vertically (full width)
6. **Desktop layout**: Horizontal button row with proper spacing

**Design reference (from Stitch):**
- 3 method pills/buttons in a row
- Active method clearly highlighted in Chef Green
- Input field appears below the selected method

**Files to edit:**
- `components/PricingMethodSelector.tsx`

**Why this matters:**
- Core interaction — user chooses how to calculate prices
- Clear visual distinction between methods reduces confusion

---

## Dependencies

- UI-001, UI-002, UI-003 (design tokens)

## Acceptance Criteria

- [ ] Method buttons styled as chips (active=green, inactive=outline)
- [ ] Active method clearly distinguishable
- [ ] Input fields match ChefCost style
- [ ] Mobile: full-width stacked buttons
- [ ] Desktop: horizontal button row
- [ ] All existing functionality preserved
