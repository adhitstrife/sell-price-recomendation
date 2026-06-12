# UI-022: Landing Page Mobile

**Phase:** U5 - Mobile Responsiveness
**Duration:** 15 minutes
**Status:** Pending

---

## Description

Ensure the Landing Page is fully responsive on mobile — hero text scales down, feature cards stack, and CTA button is easily tappable.

**What will be done:**
1. Hero section:
   - Headline font size scales down on mobile (`text-3xl` or `text-2xl` vs `text-5xl`)
   - Subtitle uses appropriate size
   - CTA button: full-width on mobile
2. Feature cards: stack vertically (single column on mobile, 3-column on desktop)
3. How it works steps: stack vertically
4. Final CTA section: full-width button
5. Footer: compact on mobile
6. Reduce padding/margins on small screens for better space utilization

**Breakpoints:**
- `< 768px`: single column, reduced font sizes, full-width CTAs
- `768-1279px`: 2-column features, normal font sizes
- `≥ 1280px`: full layout as designed

**Files to edit:**
- `app/page.tsx`

**Why this matters:**
- Landing page is the first impression — must look good on all devices
- Mobile visitors may convert to users if experience is smooth

---

## Dependencies

- UI-004 (landing page created)

## Acceptance Criteria

- [ ] Hero headline readable on mobile (no overflow)
- [ ] Feature cards stack vertically on mobile
- [ ] CTA buttons full-width on mobile
- [ ] All content visible without horizontal scroll
- [ ] Proper spacing on small screens
