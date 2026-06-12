# UI Refresh Plan: ChefCost Design System

**Created:** 2026-06-12
**Project:** Sell Price Recommendation Calculator
**Source:** Stitch Project "Optimal Menu Price Calculator" (ChefCost Design System)

---

## 1. Objective

Replace the current generic Tailwind theme (`#0284c7` sky blue) with the ChefCost design system — a culinary-themed palette with Chef Green, Earthy Slate, and Terracotta, along with refined typography (Plus Jakarta Sans / Public Sans) and proper spacing/elevation tokens.

---

## 2. Design System Overview (from Stitch)

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Primary (Chef Green) | `#2d6a4f` | Primary actions, success states, key financial totals |
| Secondary (Earthy Slate) | `#4a5568` | Labels, secondary icons, body text |
| Tertiary (Terracotta) | `#e67e22` | Highlights, notifications, price warnings |
| Destructive | `#ef4444` | Delete/destructive actions |
| Surface | `#f7f9fb` | Main canvas background |
| Surface Container | `#eceef0` | Container backgrounds |
| On Surface | `#191c1e` | Primary text |
| On Surface Variant | `#404943` | Secondary text |
| Outline | `#707973` | Borders, dividers |

### Typography

| Role | Font | Style |
|------|------|-------|
| Headlines | Plus Jakarta Sans | 600-700 weight, -0.02em letter-spacing |
| Body | Public Sans | 400 weight, 16-18px |
| Labels | Public Sans | 600 weight, 14px, 0.01em tracking |
| Data/Mono | Public Sans | 500 weight, tabular nums |

### Elevation

| Level | Usage | Shadow |
|-------|-------|--------|
| 0 | Canvas | None |
| 1 | Cards | `0 4px 12px rgba(45,106,79,0.05)` |
| 2 | Modals/Overlays | Stronger + 20% background blur |

### Shapes

| Token | Radius |
|-------|--------|
| sm | 4px (0.25rem) |
| DEFAULT (chef) | 8px (0.5rem) |
| lg | 16px (1rem) |
| full | 9999px (pill) |

---

## 3. Routing Architecture

| Route | Current | New |
|-------|---------|-----|
| `/` | Calculator page | **Landing Page** (marketing hero) |
| `/calculator` | — | **Calculator** (moved from `/`) |
| `/saved-recipes` | Saved recipes | Saved recipes (restyled) |

---

## 4. Phases & Tasks

### Phase U0: Foundation & Design Tokens (UI-001 — UI-003)

| ID | Task | Est. | Files |
|----|------|------|-------|
| UI-001 | Add Google Fonts via next/font | 20m | `app/layout.tsx` |
| UI-002 | Update Tailwind config with ChefCost tokens | 30m | `tailwind.config.ts` |
| UI-003 | Update global CSS with ChefCost base styles | 20m | `app/globals.css` |

### Phase U1: Landing Page (UI-004 — UI-005)

| ID | Task | Est. | Files |
|----|------|------|-------|
| UI-004 | Create Landing Page at `/` | 90m | `app/page.tsx` |
| UI-005 | Add Landing Page i18n labels | 20m | `i18n/id.json`, `i18n/en.json` |

### Phase U2: Routing Restructure (UI-006)

| ID | Task | Est. | Files |
|----|------|------|-------|
| UI-006 | Move calculator to `/calculator`, update nav | 30m | `app/calculator/page.tsx`, `components/AppLayout.tsx` |

### Phase U3: Component Restyling (UI-007 — UI-014)

| ID | Task | Est. | Files |
|----|------|------|-------|
| UI-007 | Restyle AppLayout (Header, Nav, Mobile Menu, Alerts) | 60m | `components/AppLayout.tsx` |
| UI-008 | Restyle Calculator page layout | 45m | `app/calculator/page.tsx` |
| UI-009 | Restyle IngredientInput | 45m | `components/IngredientInput.tsx` |
| UI-010 | Restyle IngredientList (mobile card layout) | 45m | `components/IngredientList.tsx` |
| UI-011 | Restyle OverheadInput | 30m | `components/OverheadInput.tsx` |
| UI-012 | Restyle PricingMethodSelector | 30m | `components/PricingMethodSelector.tsx` |
| UI-013 | Restyle MarketPriceInput | 20m | `components/MarketPriceInput.tsx` |
| UI-014 | Restyle ResultDisplay + circular progress | 60m | `components/ResultDisplay.tsx` |

### Phase U4: Circular Progress Components (UI-015 — UI-018)

| ID | Task | Est. | Files |
|----|------|------|-------|
| UI-015 | Create CircularSpinner component | 30m | `components/CircularSpinner.tsx` |
| UI-016 | Create CircularProgress component | 30m | `components/CircularProgress.tsx` |
| UI-017 | Replace loading states with CircularSpinner | 15m | `app/saved-recipes/page.tsx` |
| UI-018 | Add CircularProgress margin visualization | 15m | Integration in ResultDisplay |

### Phase U5: Mobile Responsiveness (UI-019 — UI-022)

| ID | Task | Est. | Files |
|----|------|------|-------|
| UI-019 | Calculator page mobile layout | 30m | `app/calculator/page.tsx` |
| UI-020 | All components mobile audit | 60m | All component files |
| UI-021 | Saved Recipes page mobile | 15m | `app/saved-recipes/page.tsx` |
| UI-022 | Landing page mobile | 15m | `app/page.tsx` |

### Phase U6: Saved Recipes (UI-023)

| ID | Task | Est. | Files |
|----|------|------|-------|
| UI-023 | Restyle Saved Recipes page with ChefCost | 45m | `app/saved-recipes/page.tsx` |

### Phase U7: Verification (UI-024 — UI-027)

| ID | Task | Est. | Details |
|----|------|------|---------|
| UI-024 | TypeScript typecheck | 10m | `npm run typecheck` |
| UI-025 | ESLint lint | 10m | `npm run lint` |
| UI-026 | Run tests | 15m | `npm test` |
| UI-027 | Production build | 5m | `npm run build` |

---

## 5. Files Changed Summary

| File | Action |
|------|--------|
| `app/page.tsx` | **Rewrite** → Landing Page |
| `app/calculator/page.tsx` | **New** (moved from `/`) |
| `app/layout.tsx` | **Edit** — add next/font imports |
| `app/globals.css` | **Edit** — font families, elevation classes |
| `tailwind.config.ts` | **Edit** — colors, fonts, radii |
| `components/AppLayout.tsx` | **Edit** — nav, mobile menu, colors, alerts |
| `components/IngredientInput.tsx` | **Edit** — ChefCost styling, mobile layout |
| `components/IngredientList.tsx` | **Edit** — ChefCost styling, mobile card layout |
| `components/OverheadInput.tsx` | **Edit** — ChefCost styling |
| `components/PricingMethodSelector.tsx` | **Edit** — ChefCost styling |
| `components/MarketPriceInput.tsx` | **Edit** — ChefCost styling |
| `components/ResultDisplay.tsx` | **Edit** — major restyle + circular progress |
| `components/CircularSpinner.tsx` | **New** |
| `components/CircularProgress.tsx` | **New** |
| `app/saved-recipes/page.tsx` | **Edit** — ChefCost styling, loading spinner |
| `i18n/id.json` | **Edit** — add landing page labels |
| `i18n/en.json` | **Edit** — add landing page labels |

---

## 6. Design Principles

1. **No business logic changes** — calculator.ts, unitConversion.ts, contexts, and types remain untouched. Visual only.
2. **Mobile-first** — all components designed mobile-first with Tailwind breakpoints (`sm:`, `md:`, `lg:`).
3. **Zero new dependencies** — except Google Fonts via next/font (built-in).
4. **ChefCost identity** — use Chef Green for primary actions and financial highlights, Terracotta for warnings, Earthy Slate for neutral elements.
5. **Circular progress** — SVG-based circular indicators for loading spinners and margin visualization (no chart library needed).

---

## 7. Dependency Graph

```
Phase U0 (UI-001 — UI-003) — Foundation
    ↓
Phase U1 (UI-004 — UI-005) — Landing Page
    ↓
Phase U2 (UI-006) — Routing
    ↓
Phase U3 (UI-007 — UI-014) — Component Restyling
    ↓
Phase U4 (UI-015 — UI-018) — Circular Progress
    ↓
Phase U5 (UI-019 — UI-022) — Mobile Audit    Phase U6 (UI-023) — Saved Recipes
    ↓                                           ↓
Phase U7 (UI-024 — UI-027) — Verification
```

Phases U0 and U4-U5 can run in parallel. U3 must follow U0. U6 is independent.

---

## 8. Total Estimate

| Phase | Tasks | Est. Time |
|-------|-------|-----------|
| U0: Foundation | 3 | 1h 10m |
| U1: Landing Page | 2 | 1h 50m |
| U2: Routing | 1 | 30m |
| U3: Component Restyling | 8 | 5h 15m |
| U4: Circular Progress | 4 | 1h 30m |
| U5: Mobile Responsiveness | 4 | 2h |
| U6: Saved Recipes | 1 | 45m |
| U7: Verification | 4 | 40m |
| **Total** | **27** | **~14h** |

---

## 9. Success Criteria

- [ ] Landing page renders with ChefCost branding and CTA
- [ ] Calculator works at `/calculator` with all existing functionality
- [ ] All components use ChefCost color palette
- [ ] Typography uses Plus Jakarta Sans (headings) and Public Sans (body)
- [ ] Circular spinners shown during all loading states
- [ ] Circular progress indicators in ResultDisplay for margin visualization
- [ ] All pages fully responsive (mobile, tablet, desktop)
- [ ] TypeScript compiles with zero errors
- [ ] All existing tests pass
- [ ] Production build succeeds
