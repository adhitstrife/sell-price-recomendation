# Task 007: Implement Food Cost % Calculator

**Phase:** 2 - Business Logic  
**Duration:** 45 minutes  
**Status:** Pending

---

## Title
Implement Food Cost Percentage Pricing Method

---

## Description

Implement the Food Cost % calculator, which determines selling price based on a target food cost percentage.

**What will be done:**
1. Create `calculateFoodCostPrice()` function
2. Implement formula: `selling_price = total_modal / (target_food_cost_percent / 100)`
3. Handle rounding (round to nearest 500 Rp)
4. Implement input validation (10-60%)
5. Return calculation breakdown
6. Add error handling and JSDoc
7. Test with real-world scenarios

**Why this matters:**
- Core pricing method (required for MVP)
- Blocks: Task 019 (UI component), Task 010 (tests)
- Industry-standard approach (CLAUDE.md requirement)
- Most common pricing strategy for food businesses

---

## Dependencies

- Task 001: Vite setup
- Task 002: TypeScript types
- Task 004: Constants and utilities
- Task 005: Testing infrastructure
- Task 006: Unit conversion (provides total cost calculation)

---

## Acceptance Criteria

✓ **Function Implemented:**
- [ ] `calculateFoodCostPrice(totalCost: number, targetFoodCostPercent: number): number`
- [ ] Returns selling price as integer (Rp)
- [ ] No floating-point imprecision

✓ **Validation:**
- [ ] Accepts food cost % from 10% to 60%
- [ ] Rejects values < 10% or > 60% with error
- [ ] Accepts total cost ≥ 0
- [ ] Rejects negative total cost with error
- [ ] Handles zero total cost (returns 0)

✓ **Rounding Behavior:**
- [ ] Rounds to nearest 500 Rp (per plan.md)
- [ ] Example: 33,333 → 33,500 or 33,000 (nearest 500)
- [ ] Consistent rounding algorithm

✓ **Accuracy (Real-World Tests):**
- [ ] 10,000 cost + 30% food cost → ~33,333 Rp
- [ ] 5,000 cost + 25% food cost → 20,000 Rp
- [ ] 15,000 cost + 40% food cost → 37,500 Rp
- [ ] All match hand-calculated results

✓ **Return Value:**
- [ ] Returns detailed breakdown object:
  ```typescript
  {
    sellingPrice: number;
    totalCost: number;
    foodCostPercent: number;
    profitMargin: number;
  }
  ```

---

## Technical Notes

### Formula from CLAUDE.md

```
harga_jual = total_modal / (target_food_cost_percent / 100)
```

With rounding to nearest 500 Rp:
```
result = Math.round(harga_jual / 500) * 500
```

### Profit Margin Calculation

```
profit_margin = (selling_price - total_cost) / selling_price × 100%
```

### Implementation Structure

```typescript
interface FoodCostResult {
  sellingPrice: number;
  totalCost: number;
  foodCostPercent: number;
  actualFoodCostPercent: number; // Recalculated from result
  profitMargin: number;
}

export const calculateFoodCostPrice = (
  totalCost: number,
  targetFoodCostPercent: number
): FoodCostResult => {
  // 1. Validate inputs
  // 2. Calculate raw price
  // 3. Round to nearest 500
  // 4. Calculate profit margin
  // 5. Return detailed breakdown
};
```

### Examples

**Example 1: Typical Food Business**
- Total cost: Rp 10,000
- Target food cost: 30%
- Calculation: 10,000 / (30 / 100) = 10,000 / 0.30 = 33,333.33
- Rounded: 33,500 Rp
- Profit margin: (33,500 - 10,000) / 33,500 = 70.1%

**Example 2: Premium Item**
- Total cost: Rp 15,000
- Target food cost: 25%
- Calculation: 15,000 / (25 / 100) = 60,000
- Rounded: 60,000 Rp (already rounded)
- Profit margin: (60,000 - 15,000) / 60,000 = 75%

**Example 3: Budget Item**
- Total cost: Rp 5,000
- Target food cost: 40%
- Calculation: 5,000 / (40 / 100) = 12,500
- Rounded: 12,500 Rp
- Profit margin: (12,500 - 5,000) / 12,500 = 60%

---

## Testing Requirements

✓ **Unit Tests (100% coverage):**
- [ ] Valid range: 10%, 25%, 50%, 60%
- [ ] Boundary: 10% (min), 60% (max)
- [ ] Invalid: 9% (too low), 61% (too high)
- [ ] Edge cases: 0 cost, very large cost (1,000,000)
- [ ] Rounding: Test various amounts that need rounding
- [ ] Profit margin calculation verification

✓ **Test File:** `tests/lib/calculator.test.ts`

✓ **Test Cases:**
```typescript
describe('calculateFoodCostPrice', () => {
  it('should calculate correctly for typical case', () => {
    const result = calculateFoodCostPrice(10000, 30);
    expect(result.sellingPrice).toBe(33500);
  });

  it('should reject food cost < 10%', () => {
    expect(() => calculateFoodCostPrice(10000, 9)).toThrow();
  });

  it('should reject food cost > 60%', () => {
    expect(() => calculateFoodCostPrice(10000, 61)).toThrow();
  });

  it('should handle zero cost', () => {
    const result = calculateFoodCostPrice(0, 30);
    expect(result.sellingPrice).toBe(0);
  });

  it('should round to nearest 500', () => {
    const result = calculateFoodCostPrice(10000, 33);
    // 10000 / 0.33 ≈ 30303, rounded to nearest 500
    expect(result.sellingPrice % 500).toBe(0);
  });
});
```

---

## Deliverables

- [ ] `src/lib/calculator.ts` with `calculateFoodCostPrice()` function
- [ ] Comprehensive JSDoc comments with examples
- [ ] Validation with descriptive error messages
- [ ] Detailed result object returned
- [ ] `tests/lib/calculator.test.ts` with all test cases
- [ ] 100% test coverage for this function
- [ ] No TypeScript errors

---

## Code Quality Checklist

- [ ] Pure function (no side effects)
- [ ] Immutable inputs
- [ ] Clear variable names
- [ ] JSDoc with @param, @returns, @example
- [ ] Error messages user-friendly (not for developers)
- [ ] No hardcoded magic numbers (use constants)
- [ ] Consistent with CLAUDE.md requirements

---

## Notes

- Do NOT implement UI component (Task 019)
- Do NOT combine with other pricing methods (separate task each)
- Rounding: Use DEFAULTS.ROUNDING_BASE from constants
- Error messages should match i18n keys when possible
- Keep calculation logic separate from validation

---

## Next Tasks

**Unblocks:**
- Task 008: Markup Multiplier calculator (parallel)
- Task 009: Market-Based calculator (parallel)
- Task 010: Comprehensive calculator tests
- Task 019: PricingMethodSelector component

---

**End of Task 007**
