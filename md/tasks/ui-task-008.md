# UI-008: Restyle Calculator Page Layout

**Phase:** U3 - Component Restyling
**Duration:** 45 minutes
**Status:** Pending

---

## Description

Restyle the Calculator page (`/calculator`) to use ChefCost cards, section headers, and spacing. Wrap each section in Level 1 cards with proper ChefCost styling.

**What will be done:**
1. Wrap each step section in `.card-chef` class (white bg, soft green shadow, 8px radius, 16px padding)
2. Section titles use Plus Jakarta Sans, Chef Green or Earthy Slate color
3. Sticky bottom bar for Save/Reset buttons:
   - Save: `bg-primary text-white` Chef Green
   - Reset: `bg-secondary text-white` Earthy Slate outline
4. Consistent spacing between sections using `space-y-6`
5. Error/save message styling with ChefCost colors (success=green, error=terracotta)
6. Responsive max-width container

**Current structure (maintain):**
- Step 1: Menu Name & Portions
- Step 2: Ingredients (Input + List)
- Step 3: Overhead (collapsible)
- Step 4: Pricing Method
- Results section
- Save / Reset buttons

**Files to edit:**
- `app/calculator/page.tsx`

**Why this matters:**
- Primary user interface — must look professional and trustworthy
- Card-based layout improves readability and visual hierarchy
- Sticky save bar ensures users don't lose work

---

## Dependencies

- UI-001, UI-002, UI-003 (design tokens)
- UI-006 (calculator moved to `/calculator`)

## Acceptance Criteria

- [ ] Each section is wrapped in ChefCost card styling
- [ ] Section headers use Plus Jakarta Sans
- [ ] Cards have 8px border radius, proper padding, and green-tinted shadow
- [ ] Sticky bottom bar has Chef Green save button and Earthy Slate reset button
- [ ] Error messages appear in Terracotta
- [ ] All existing functionality preserved
