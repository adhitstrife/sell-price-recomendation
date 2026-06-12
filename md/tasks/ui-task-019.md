# UI-019: Calculator Page Mobile Layout

**Phase:** U5 - Mobile Responsiveness
**Duration:** 30 minutes
**Status:** Pending

---

## Description

Ensure the Calculator page is fully responsive on mobile devices with proper touch targets, single-column layout, and accessible interactions.

**What will be done:**
1. **Section cards**: Full width on mobile, max-width constrained
2. **Form inputs**: Full-width (`w-full`) on mobile, `< 768px` breakpoint
3. **Grid layouts**: Convert 2-column grids to single column
4. **Sticky bottom bar**: Full-width buttons stacked vertically on mobile:
   - Save button full width
   - Reset button full width below
5. **Collapsible sections**: Step 3 (Overhead) remains accordion-style, touch-friendly toggle
6. **Touch targets**: All buttons min 44x44px
7. **Font sizes**: Maintain readability — no text smaller than 14px on mobile

**Key breakpoint adjustments:**
- `< 768px` (mobile): single column, full-width inputs, stacked buttons
- `768-1279px` (tablet): 2-column grids, horizontal nav
- `≥ 1280px` (desktop): wider layout, side-by-side sections where appropriate

**Files to edit:**
- `app/calculator/page.tsx`

**Why this matters:**
- Many users access from mobile phones
- Full-width inputs prevent zoom/focus issues
- Touch-friendly targets prevent mis-taps

---

## Dependencies

- UI-008 (calculator page restyle)

## Acceptance Criteria

- [ ] All sections full-width on mobile
- [ ] Form inputs full-width on screens < 768px
- [ ] Sticky bar buttons stack vertically on mobile
- [ ] Touch targets ≥ 44x44px
- [ ] No horizontal scrolling
- [ ] Readable font sizes on small screens
