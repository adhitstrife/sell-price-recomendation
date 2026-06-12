# UI-004: Create Landing Page at `/`

**Phase:** U1 - Landing Page
**Duration:** 90 minutes
**Status:** Pending

---

## Description

Create a new Landing Page at the root route `/` that serves as the marketing entry point for the app. The current home page content moves to `/calculator`.

**What will be done:**
1. Create new `app/page.tsx` with:
   - **Hero section**: ChefCost branding with Plus Jakarta Sans headline "Kalkulator Harga Jual Optimal", subtitle explaining the tool, and prominent CTA button "Mulai Hitung →" linking to `/calculator`
   - **Features section**: 3 feature cards highlighting the pricing methods (Food Cost %, Markup, Market-Based) using ChefCost colors
   - **How it works section**: Step-by-step explanation (3-4 steps with icons/numbers)
   - **CTA section**: Final call-to-action with button to start calculating
   - **Footer**: Simple footer with app name
2. Style with ChefCost design tokens
3. Make responsive (mobile-first)

**Design reference (from Stitch ChefCost Landing Page):**
- Clean, modern hero with the app name and value proposition
- Feature cards with icons and brief descriptions
- Trust-building elements (stats, steps)
- Strong CTA using Chef Green primary button

**Files to create/edit:**
- `app/page.tsx` (rewrite)

**Why this matters:**
- Provides a professional first impression for new users
- Explains the value proposition before users start calculating
- Follows standard SaaS landing page patterns

---

## Dependencies

- UI-001, UI-002, UI-003 (design tokens and fonts)

## Acceptance Criteria

- [ ] Landing page renders at `/`
- [ ] Hero section has headline, subtitle, and CTA button
- [ ] Features section has 3 cards with method explanations
- [ ] "Mulai Hitung" CTA navigates to `/calculator`
- [ ] Page is fully responsive (mobile, tablet, desktop)
- [ ] Uses ChefCost colors and typography
- [ ] All text uses i18n keys (UI-005)
