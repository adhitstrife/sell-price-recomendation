# Task 010: Comprehensive Calculator Tests

**Phase:** 2 - Business Logic  
**Duration:** 90 minutes  
**Status:** Pending

---

## Title
Write Comprehensive Unit Tests for All Calculator Functions (100% Coverage)

---

## Description

Create comprehensive test suite for all calculator functions with 100% code coverage and real-world scenarios.

**What will be done:**
1. Complete test suite for `calculateFoodCostPrice()`
2. Complete test suite for `calculateMarkupPrice()`
3. Complete test suite for `calculateMarketBased()`
4. Complete test suite for `calculateIngredientCost()`
5. Complete test suite for `getConversionFactor()`
6. Add edge case testing for all functions
7. Add integration tests (ingredients → total → pricing)
8. Verify 100% code coverage
9. Document test patterns for future

**Why this matters:**
- CLAUDE.md requirement: 100% calculator coverage
- Foundation for code reliability
- Blocks: Task 031 (integration testing) needs this
- Enables refactoring with confidence

---

## Dependencies

- Task 001: Vite setup
- Task 002: TypeScript types
- Task 004: Constants and utilities
- Task 005: Testing infrastructure
- Task 006: Unit conversion (complete)
- Task 007: Food Cost % calculator (complete)
- Task 008: Markup calculator (complete)
- Task 009: Market-Based calculator (complete)

---

## Acceptance Criteria

✓ **Test Coverage:**
- [ ] `src/lib/calculator.ts`: 100% line coverage
- [ ] `src/lib/unitConversion.ts`: 100% line coverage
- [ ] All branches covered (if/else paths)
- [ ] All error paths tested
- [ ] Coverage report generated: `npm test -- --coverage`

✓ **Test Categories:**
- [ ] Unit tests (individual functions)
- [ ] Edge cases (0, large numbers, decimals)
- [ ] Error cases (invalid inputs)
- [ ] Integration tests (ingredient → total → pricing)
- [ ] Real-world scenarios (Indonesian food prices)
- [ ] Boundary tests (min/max values)

✓ **Test Quality:**
- [ ] Descriptive test names
- [ ] Arrange-Act-Assert pattern used
- [ ] Tests are independent (no ordering dependency)
- [ ] No hardcoded magic numbers (use constants)
- [ ] Clear expected vs actual values

✓ **Real-World Test Scenarios:**
- [ ] 10+ real Indonesian food items with actual prices
- [ ] Tests for all 3 pricing methods
- [ ] Tests for all supported unit conversions
- [ ] All edge cases identified and tested

---

## Technical Notes

### Test File Structure

```
tests/lib/
├── calculator.test.ts          # Main calculator tests
├── unitConversion.test.ts      # Unit conversion tests
└── fixtures/
    └── testData.ts             # Shared test data
```

### Real-World Test Data (Indonesian Foods)

```typescript
// Typical ingredients with real prices
const testIngredients = [
  { name: 'Tepung', pricePerUnit: 15000, unit: 'kg', amountPerPortion: 200, amountUnit: 'gram' },
  { name: 'Minyak Goreng', pricePerUnit: 20000, unit: 'liter', amountPerPortion: 50, amountUnit: 'ml' },
  { name: 'Telur', pricePerUnit: 45000, unit: 'pack', packSize: 30, amountPerPortion: 2, amountUnit: 'pcs' },
  { name: 'Gula', pricePerUnit: 12000, unit: 'kg', amountPerPortion: 100, amountUnit: 'gram' },
  { name: 'Garam', pricePerUnit: 8000, unit: 'kg', amountPerPortion: 5, amountUnit: 'gram' },
  // ... more
];
```

### Test Structure Example

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import {
  calculateFoodCostPrice,
  calculateMarkupPrice,
  calculateMarketBased,
  calculateIngredientCost,
} from '@/lib/calculator';

describe('Calculator Functions', () => {
  describe('calculateFoodCostPrice', () => {
    describe('valid inputs', () => {
      it('should calculate correctly for typical case', () => {
        const result = calculateFoodCostPrice(10000, 30);
        expect(result.sellingPrice).toBe(33500);
        expect(result.foodCostPercent).toBe(30);
      });

      it('should handle all valid percentages', () => {
        [10, 20, 30, 40, 50, 60].forEach(percent => {
          const result = calculateFoodCostPrice(10000, percent);
          expect(result.sellingPrice).toBeGreaterThan(0);
          expect(result.foodCostPercent).toBe(percent);
        });
      });
    });

    describe('edge cases', () => {
      it('should handle zero cost', () => {
        const result = calculateFoodCostPrice(0, 30);
        expect(result.sellingPrice).toBe(0);
      });

      it('should handle very large cost', () => {
        const result = calculateFoodCostPrice(1_000_000, 30);
        expect(result.sellingPrice).toBeGreaterThan(0);
      });

      it('should handle decimal percentages', () => {
        const result = calculateFoodCostPrice(10000, 30.5);
        expect(result.foodCostPercent).toBe(30.5);
      });
    });

    describe('error handling', () => {
      it('should reject food cost < 10%', () => {
        expect(() => calculateFoodCostPrice(10000, 9)).toThrow();
      });

      it('should reject food cost > 60%', () => {
        expect(() => calculateFoodCostPrice(10000, 61)).toThrow();
      });

      it('should reject negative cost', () => {
        expect(() => calculateFoodCostPrice(-1000, 30)).toThrow();
      });
    });

    describe('rounding', () => {
      it('should round to nearest 500', () => {
        const testCases = [
          { cost: 10000, percent: 33, expected: 30500 },
          { cost: 6789, percent: 30, expected: 22500 },
          { cost: 15555, percent: 40, expected: 39000 },
        ];
        testCases.forEach(({ cost, percent, expected }) => {
          const result = calculateFoodCostPrice(cost, percent);
          expect(result.sellingPrice).toBe(expected);
        });
      });
    });
  });

  describe('calculateMarkupPrice', () => {
    // Similar structure: valid, edge cases, error, rounding
  });

  describe('calculateMarketBased', () => {
    // Statistical tests, median, quartiles, position
  });

  describe('Integration Tests', () => {
    it('should calculate full recipe with all costs', () => {
      // Create mock recipe with multiple ingredients
      // Calculate total cost
      // Apply all 3 pricing methods
      // Verify results make sense together
    });

    it('should maintain consistency across methods', () => {
      // Same input cost should produce different (but valid) prices
      // All prices should be positive
      // Profit margins should be reasonable
    });
  });
});
```

---

## Testing Requirements

✓ **Automated Test Execution:**
- [ ] `npm test` runs all tests and passes
- [ ] `npm test -- --coverage` shows 100% coverage
- [ ] `npm test -- --watch` works for TDD

✓ **Coverage Report:**
- [ ] Generate HTML coverage report
- [ ] No uncovered lines or branches
- [ ] All error paths covered

✓ **Manual Verification:**
- [ ] All test descriptions are clear
- [ ] Test output is readable
- [ ] Each test tests ONE thing
- [ ] No interdependent tests

---

## Deliverables

- [ ] `tests/lib/calculator.test.ts` with all calculator tests
- [ ] `tests/lib/unitConversion.test.ts` with conversion tests
- [ ] `tests/lib/fixtures/testData.ts` with real-world test data
- [ ] 100% code coverage report
- [ ] All tests passing (green)
- [ ] No TypeScript errors

---

## Test Organization

| Component | Test Cases | Est. Coverage |
|-----------|-----------|--------------|
| calculateFoodCostPrice | 15 | 100% |
| calculateMarkupPrice | 12 | 100% |
| calculateMarketBased | 18 | 100% |
| calculateIngredientCost | 12 | 100% |
| getConversionFactor | 15 | 100% |
| Integration | 10 | 100% |
| **Total** | **82** | **100%** |

---

## Code Quality Checklist

- [ ] Test names describe what is being tested
- [ ] Arrange-Act-Assert pattern consistent
- [ ] No test interdependencies
- [ ] No hardcoded values (use constants/fixtures)
- [ ] Clear assertions with descriptive messages
- [ ] Comprehensive edge case coverage
- [ ] Real-world scenarios included

---

## Notes

- Tests are documentation (someone learning codebase should read tests)
- Each test should be runnable in any order
- Use beforeEach() for common setup
- Mock data should be realistic (Indonesian food industry)
- Aim for clarity over conciseness
- Comments only on "why", not "what"

---

## Next Tasks

**Unblocks:**
- Task 019: PricingMethodSelector (uses all 3 calculators)
- Task 021: ResultDisplay (displays calculator results)
- Task 031: Integration testing (builds on unit tests)

---

**End of Task 010**
