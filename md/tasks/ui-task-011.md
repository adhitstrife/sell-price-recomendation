# UI-011: Restyle OverheadInput

**Phase:** U3 - Component Restyling
**Duration:** 30 minutes
**Status:** Pending

---

## Description

Restyle the overhead/labor input section with ChefCost design — card container, radio buttons as chip-style selectors, and proper input styling.

**What will be done:**
1. **Card container**: Apply `.card-chef` styling
2. **Section title**: Plus Jakarta Sans, text-secondary
3. **Sub-section title**: "Biaya Tenaga Kerja" with border-top separator
4. **Radio buttons**: Style as chip/toggle buttons:
   - Active: Chef Green background, white text
   - Inactive: subtle outline, Earthy Slate text
5. **Number inputs**: Consistent styling with other forms (8px radius, Chef Green focus ring)
6. **Labels**: `text-sm font-semibold text-secondary`
7. **Mobile layout**: Stack inputs vertically, full width
8. **Desktop layout**: 2-column grid for input pairs

**Design reference (from Stitch):**
- Radio buttons styled as pill/toggle chips
- Clean input groups with proper labels
- Compact layout that doesn't waste vertical space

**Files to edit:**
- `components/OverheadInput.tsx`

**Why this matters:**
- Labor cost is often confusing — clean UI reduces friction
- Chip-style radio buttons are more touch-friendly than default radios

---

## Dependencies

- UI-001, UI-002, UI-003 (design tokens)

## Acceptance Criteria

- [ ] Card container with ChefCost styling
- [ ] Radio buttons styled as chip toggles (active = Chef Green)
- [ ] Input fields match rest of form system
- [ ] Mobile: full-width stacked layout
- [ ] Desktop: 2-column grid
- [ ] All existing functionality preserved
