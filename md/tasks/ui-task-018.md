# UI-018: Add CircularProgress Margin Visualization to ResultDisplay

**Phase:** U4 - Circular Progress Components
**Duration:** 15 minutes
**Status:** Pending

---

## Description

Integrate the CircularProgress component into the ResultDisplay to show profit margin vs target margin as a visual indicator.

**What will be done:**
1. Import `CircularProgress` in `components/ResultDisplay.tsx`
2. Calculate profit margin percentage from the calculation result
3. Add a circular progress section in the results area showing:
   - Profit margin % as the arc fill
   - Label below showing "Margin: X%" and "Target: Y%"
4. Color logic:
   - Actual margin ≥ target margin → Chef Green
   - Actual margin close but below → Earthy Slate
   - Actual margin significantly below → Terracotta
5. Position near the recommendation cards (top or alongside)

**Integration point:**
The `CalculationResult` interface already has profit margin data in `FoodCostResult.profitMargin` and `MarkupResult.profitMargin`. For the circular display, we extract the margin from the active pricing method.

**Files to edit:**
- `components/ResultDisplay.tsx`

**Why this matters:**
- Circular progress makes margin data instantly understandable
- Matches Stitch "Price Recommendation" screen design
- Color-coded feedback guides user action

---

## Dependencies

- UI-014 (ResultDisplay restyle)
- UI-016 (CircularProgress component)

## Acceptance Criteria

- [ ] CircularProgress visible in ResultDisplay
- [ ] Shows profit margin percentage accurately
- [ ] Color changes based on margin health (green/slate/terracotta)
- [ ] Label below shows margin details
- [ ] Responsive — scales on mobile
- [ ] All existing functionality preserved
