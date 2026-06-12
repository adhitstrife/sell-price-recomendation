# UI Refresh Task Index

**Created:** 2026-06-12
**Project:** Sell Price Recommendation Calculator
**Source:** Stitch "Optimal Menu Price Calculator" (ChefCost Design System)
**Total Tasks:** 27

---

## Phase U0: Foundation & Design Tokens (UI-001 — UI-003)

- **UI-001** (20m): Add Google Fonts via next/font
- **UI-002** (30m): Update Tailwind config with ChefCost tokens
- **UI-003** (20m): Update global CSS with ChefCost base styles

**Phase U0 Total: 1h 10m** | **Blocks all subsequent phases**

---

## Phase U1: Landing Page (UI-004 — UI-005)

- **UI-004** (90m): Create Landing Page at `/`
- **UI-005** (20m): Add Landing Page i18n labels

**Phase U1 Total: 1h 50m** | **Depends on U0**

---

## Phase U2: Routing Restructure (UI-006)

- **UI-006** (30m): Move calculator to `/calculator`, update nav

**Phase U2 Total: 30m** | **Depends on U0**

---

## Phase U3: Component Restyling (UI-007 — UI-014)

- **UI-007** (60m): Restyle AppLayout (Header, Nav, Mobile Menu, Alerts)
- **UI-008** (45m): Restyle Calculator page layout
- **UI-009** (45m): Restyle IngredientInput
- **UI-010** (45m): Restyle IngredientList (mobile card layout)
- **UI-011** (30m): Restyle OverheadInput
- **UI-012** (30m): Restyle PricingMethodSelector
- **UI-013** (20m): Restyle MarketPriceInput
- **UI-014** (60m): Restyle ResultDisplay + circular progress

**Phase U3 Total: 5h 15m** | **Depends on U0, U2**

---

## Phase U4: Circular Progress Components (UI-015 — UI-018)

- **UI-015** (30m): Create CircularSpinner component
- **UI-016** (30m): Create CircularProgress component
- **UI-017** (15m): Replace loading states with CircularSpinner
- **UI-018** (15m): Add CircularProgress margin visualization to ResultDisplay

**Phase U4 Total: 1h 30m** | **Depends on U3 (UI-014)**

---

## Phase U5: Mobile Responsiveness (UI-019 — UI-022)

- **UI-019** (30m): Calculator page mobile layout
- **UI-020** (60m): All components mobile audit
- **UI-021** (15m): Saved Recipes page mobile
- **UI-022** (15m): Landing page mobile

**Phase U5 Total: 2h** | **Depends on U3, U1**

---

## Phase U6: Saved Recipes (UI-023)

- **UI-023** (45m): Restyle Saved Recipes page with ChefCost

**Phase U6 Total: 45m** | **Depends on U0**

---

## Phase U7: Verification (UI-024 — UI-027)

- **UI-024** (10m): TypeScript typecheck (`npm run typecheck`)
- **UI-025** (10m): ESLint lint (`npm run lint`)
- **UI-026** (15m): Run tests (`npm test`)
- **UI-027** (5m): Production build (`npm run build`)

**Phase U7 Total: 40m** | **Depends on all previous phases**

---

## Dependency Graph

```
U0 (UI-001 — 003)
    ├──→ U1 (UI-004 — 005) → Landing Page
    ├──→ U2 (UI-006) → Routing
    ├──→ U3 (UI-007 — 014) → Component Restyling
    │       └──→ U4 (UI-015 — 018) → Circular Progress
    ├──→ U5 (UI-019 — 022) → Mobile Audit
    └──→ U6 (UI-023) → Saved Recipes
                            └── all → U7 (UI-024 — 027) → Verification
```

---

## Total Estimate

| Metric | Value |
|--------|-------|
| Total Tasks | 27 |
| Total Est. Time | ~13h 55m |
| Shortest Task | 5m (UI-027) |
| Longest Task | 90m (UI-004) |

---

## Execution Order (Recommended)

1. **UI-001 — UI-003** (Foundation) — sequential, all three
2. **UI-004 — UI-005** (Landing Page) — sequential
3. **UI-006** (Routing) — standalone
4. **UI-007 — UI-014** (Component Restyling) — can be parallelized
5. **UI-015 — UI-018** (Circular Progress) — sequential within
6. **UI-019 — UI-022** (Mobile) — can be parallelized
7. **UI-023** (Saved Recipes) — standalone
8. **UI-024 — UI-027** (Verification) — sequential final check
