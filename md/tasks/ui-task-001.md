# UI-001: Add Google Fonts via next/font

**Phase:** U0 - Foundation & Design Tokens
**Duration:** 20 minutes
**Status:** Pending

---

## Description

Add Plus Jakarta Sans (headings) and Public Sans (body) fonts to the Next.js app using `next/font` for zero-layout-shift font loading.

**What will be done:**
1. Import `Plus_Jakarta_Sans` and `Public_Sans` from `next/font/google` in `app/layout.tsx`
2. Configure with proper weights (Plus Jakarta Sans: 400, 600, 700; Public Sans: 400, 500, 600)
3. Apply CSS variables `--font-heading` and `--font-body` via Tailwind
4. Set `display: "swap"` for performance
5. Add `preconnect` hints for Google Fonts origin

**Files to edit:**
- `app/layout.tsx`

**Why this matters:**
- Establishes ChefCost typography foundation
- next/font ensures no layout shift (CLS = 0)
- CSS variables enable Tailwind integration in UI-002

---

## Dependencies

- None

## Relevant Design System Values

- Headline font: Plus Jakarta Sans (weights 400, 600, 700)
- Body font: Public Sans (weights 400, 500, 600)

## Acceptance Criteria

- [ ] Fonts load with zero layout shift
- [ ] CSS variables `--font-heading` and `--font-body` are available globally
- [ ] No FOUT (Flash of Unstyled Text) on subsequent page loads
