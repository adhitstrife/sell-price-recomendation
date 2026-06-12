# Task 008: Implement Markup Multiplier Calculator

**Phase:** 2 - Business Logic  
**Duration:** 30 minutes  
**Status:** Pending

---

## Title
Implement Markup Multiplier Pricing Method

---

## Description

Implement the Markup Multiplier calculator, which determines selling price by multiplying total cost by a fixed factor.

**What will be done:**
1. Create `calculateMarkupPrice()` function
2. Implement formula: `selling_price = total_modal × markup_multiplier`
3. Handle rounding to nearest 500 Rp
4. Implement validation (1.5x to 10x range)
5. Return calculation breakdown
6. Add error handling and JSDoc
7. Test with real-world scenarios

**Why this matters:**
- Core pricing method (required for MVP)
- Simplest approach for small businesses
- Blocks: Task 019 (UI), Task 010 (tests)
- Popular for food businesses (3x mark-up common)

---

## Dependencies

- Task 001: Vite setup
- Task 002: TypeScript types
- Task 004: Constants and utilities
- Task 005: Testing infrastructure
- Task 006: Unit conversion

---

## Acceptance Criteria

✓ **Function Implemented:**
- [ ] `calculateMarkupPrice(totalCost: number, markupMultiplier: number): number`
- [ ] Returns selling price as integer (Rp)
- [ ] No floating-point imprecision

✓ **Validation:**
- [ ] Accepts markup from 1.5x to 10x
- [ ] Rejects values < 1.5x or > 10x with error
- [ ] Accepts total cost ≥ 0
- [ ] Rejects negative total cost
- [ ] Handles zero cost (returns 0)

✓ **Rounding Behavior:**
- [ ] Rounds to nearest 500 Rp (per plan.md)
- [ ] Example: 30,333 → 30,500 or 30,000 (nearest 500)
- [ ] Consistent with Food Cost % rounding

✓ **Accuracy (Real-World Tests):**
- [ ] 10,000 cost × 3x multiplier → 30,000 Rp
- [ ] 5,000 cost × 2.5x multiplier → 12,500 Rp
- [ ] 15,000 cost × 4x multiplier → 60,000 Rp
- [ ] All match hand-calculated results

✓ **Return Value:**
- [ ] Returns detailed breakdown object:
  ```typescript
  {
    sellingPrice: number;
    totalCost: number;
    markupMultiplier: number;
    profitMargin: number;
  }
  ```

---

## Technical Notes

### Formula from CLAUDE.md

```
harga_jual = total_modal × markup_multiplier
```

With rounding:
```
result = Math.round(harga_jual / 500) * 500
```

### Profit Margin Calculation

```
profit_margin = (selling_price - total_cost) / selling_price × 100%
```

Or simpler:
```
profit_margin = (multiplier - 1) / multiplier × 100%
```

### Implementation Structure

```typescript
interface MarkupResult {
  sellingPrice: number;
  totalCost: number;
  markupMultiplier: number;
  profitMargin: number;
}

export const calculateMarkupPrice = (
  totalCost: number,
  markupMultiplier: number
): MarkupResult => {
  // 1. Validate inputs
  // 2. Calculate price (simple multiply)
  // 3. Round to nearest 500
  // 4. Calculate profit margin
  // 5. Return breakdown
};
```

### Examples

**Example 1: Standard 3x Mark-up (Most Common)**
- Total cost: Rp 10,000
- Markup: 3x
- Calculation: 10,000 × 3 = 30,000
- Rounded: 30,000 Rp (already rounded)
- Profit margin: (30,000 - 10,000) / 30,000 = 66.7%

**Example 2: Conservative 2.5x Mark-up**
- Total cost: Rp 5,000
- Markup: 2.5x
- Calculation: 5,000 × 2.5 = 12,500
- Rounded: 12,500 Rp
- Profit margin: (12,500 - 5,000) / 12,500 = 60%

**Example 3: High Mark-up 4x**
- Total cost: Rp 15,000
- Markup: 4x
- Calculation: 15,000 × 4 = 60,000
- Rounded: 60,000 Rp
- Profit margin: (60,000 - 15,000) / 60,000 = 75%

---

## Testing Requirements

✓ **Unit Tests (100% coverage):**
- [ ] Valid range: 1.5x, 2x, 3x, 5x, 10x
- [ ] Boundary: 1.5x (min), 10x (max)
- [ ] Invalid: 1.4x (too low), 10.1x (too high)
- [ ] Edge cases: 0 cost, very large cost
- [ ] Rounding: Test various amounts
- [ ] Decimal multipliers: 2.5x, 3.25x

✓ **Test File:** `tests/lib/calculator.test.ts` (same file as Task 007)

✓ **Test Cases:**
```typescript
describe('calculateMarkupPrice', () => {
  it('should calculate correctly for 3x markup', () => {
    const result = calculateMarkupPrice(10000, 3);
    expect(result.sellingPrice).toBe(30000);
  });

  it('should reject markup < 1.5x', () => {
    expect(() => calculateMarkupPrice(10000, 1.4)).toThrow();
  });

  it('should reject markup > 10x', () => {
    expect(() => calculateMarkupPrice(10000, 10.1)).toThrow();
  });

  it('should handle zero cost', () => {
    const result = calculateMarkupPrice(0, 3);
    expect(result.sellingPrice).toBe(0);
  });

  it('should support decimal multipliers', () => {
    const result = calculateMarkupPrice(10000, 2.5);
    expect(result.sellingPrice).toBe(25000);
  });

  it('should round to nearest 500', () => {
    const result = calculateMarkupPrice(6789, 2.5);
    // 6789 * 2.5 = 16972.5, rounded to nearest 500
    expect(result.sellingPrice % 500).toBe(0);
  });
});
```

---

## Deliverables

- [ ] `calculateMarkupPrice()` function in `src/lib/calculator.ts`
- [ ] Comprehensive JSDoc comments with examples
- [ ] Validation with descriptive errors
- [ ] Detailed result object
- [ ] Test cases in `tests/lib/calculator.test.ts`
- [ ] 100% test coverage
- [ ] No TypeScript errors

---

## Code Quality Checklist

- [ ] Pure function (no side effects)
- [ ] Immutable inputs
- [ ] Clear variable names
- [ ] JSDoc with examples
- [ ] Error messages appropriate for users
- [ ] No hardcoded magic numbers
- [ ] Consistent with CLAUDE.md

---

## Notes

- Much simpler than Food Cost % (just multiply)
- Should take ~30 minutes to implement + test
- Reuse rounding logic from Task 007
- Keep separate from other pricing methods
- Validation ranges from CLAUDE.md Feature 4

---

## Next Tasks

**Unblocks:**
- Task 009: Market-Based calculator (parallel)
- Task 010: Comprehensive tests (all calculators)
- Task 019: PricingMethodSelector component

---

**End of Task 008**
