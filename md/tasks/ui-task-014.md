# UI-014: Restyle ResultDisplay + Circular Progress

**Phase:** U3 - Component Restyling
**Duration:** 60 minutes
**Status:** Pending

---

## Description

Major restyle of the ResultDisplay component to match the ChefCost "Price Recommendation" screen. Add circular progress indicator for margin visualization.

**What will be done:**
1. **Title**: "Hasil Perhitungan" in Plus Jakarta Sans
2. **Cost Breakdown section**: 
   - 5 vertical cards with a Chef Green accent bar on the left side
   - Each card shows: label, value, and icon
   - Cards: Ingredient Cost, Packaging Cost, Overhead Cost, Labor Cost, Total Modal
   - Total Modal card: Chef Green background (`bg-primary text-white`), larger font
3. **Recommendation section**:
   - Food Cost result: card with blue/green left accent
   - Markup result: card with accent
   - Market range: card with competitor data
4. **Margin Circular Progress**:
   - Add `<CircularProgress>` component showing profit margin %
   - Green arc if margin ≥ target, Terracotta if below
   - Label below the circle showing actual vs target margin
5. **Mobile layout**: Single column, full-width cards
6. **Desktop layout**: Grid layout for cost breakdown, side-by-side results

**Design reference (from Stitch Price Recommendation screen):**
- Cost breakdown as a series of metric cards
- Circular progress for margin vs target
- Clean data display with proper typography hierarchy

**Files to edit:**
- `components/ResultDisplay.tsx`

**Why this matters:**
- The most important screen — users come here to see their price recommendation
- Circular margin visualization makes the data instantly understandable
- Professional look builds trust in the calculation

---

## Dependencies

- UI-001, UI-002, UI-003 (design tokens)
- UI-016 (CircularProgress component needed for integration)

## Acceptance Criteria

- [ ] Cost breakdown shown as 5 metric cards with Chef Green accents
- [ ] Total Modal card highlighted with Chef Green background
- [ ] Recommendation results properly formatted
- [ ] Circular progress indicator shows margin %
- [ ] Green arc for healthy margin, Terracotta for below-target
- [ ] Mobile: single column layout
- [ ] Desktop: grid/card layout
- [ ] All existing functionality preserved
