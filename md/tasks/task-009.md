# Task 009: Implement Market-Based Calculator

**Phase:** 2 - Business Logic  
**Duration:** 60 minutes  
**Status:** Pending

---

## Title
Implement Market-Based Pricing Method (Competitor Analysis)

---

## Description

Implement the Market-Based calculator, which analyzes competitor prices to recommend a strategic selling price.

**What will be done:**
1. Create `calculateMarketBased()` function
2. Calculate market statistics: min, max, median, average
3. Determine pricing position relative to market
4. Generate recommendation range
5. Implement validation (2-10 competitor prices)
6. Return detailed market analysis
7. Add error handling and JSDoc
8. Test with realistic competitor scenarios

**Why this matters:**
- Unique differentiator vs simple calculators
- Enables competitive positioning
- Blocks: Task 019 (UI), Task 020 (market input component)
- Provides market intelligence to business owners

---

## Dependencies

- Task 001: Vite setup
- Task 002: TypeScript types
- Task 004: Constants and utilities
- Task 005: Testing infrastructure

---

## Acceptance Criteria

✓ **Function Implemented:**
- [ ] `calculateMarketBased(competitorPrices: number[]): MarketAnalysis`
- [ ] Calculates all market statistics
- [ ] No floating-point imprecision

✓ **Input Validation:**
- [ ] Accepts 2-10 competitor prices
- [ ] Rejects < 2 or > 10 prices with error
- [ ] Rejects negative prices
- [ ] Rejects zero or unrealistic prices with warning
- [ ] Accepts prices in any order (not required to be sorted)

✓ **Market Statistics Calculated:**
- [ ] Minimum price
- [ ] Maximum price
- [ ] Median price
- [ ] Average price
- [ ] Price range (min-max)
- [ ] Standard deviation (optional for v1)

✓ **Positioning Analysis:**
- [ ] Position relative to average: "below" | "at" | "above"
- [ ] Tolerance for "at average": ±10%
- [ ] Quartile analysis (Q1, Q2, Q3)
- [ ] Market segments identified

✓ **Recommendation Range:**
- [ ] Suggested minimum: typically Q1 (25th percentile)
- [ ] Suggested maximum: typically Q3 (75th percentile)
- [ ] Or 70-90% of max price (configurable)

✓ **Return Value:**
- [ ] Detailed MarketAnalysis object with all statistics

---

## Technical Notes

### Market Analysis Output Structure

```typescript
interface MarketAnalysis {
  competitorCount: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  medianPrice: number;
  priceRange: { min: number; max: number };
  q1Price: number;      // 25th percentile
  q3Price: number;      // 75th percentile
  position: 'below' | 'at' | 'above';  // Relative to average
  recommendedMin: number;
  recommendedMax: number;
  recommendedMidpoint: number;
}
```

### Formulas from CLAUDE.md

```
median_kompetitor = median(competitor_prices)
range_rekomendasi = [min_kompetitor, max_kompetitor]
posisi_user_vs_market = "di bawah rata-rata" | "sejajar" | "di atas rata-rata"
```

### Examples

**Example 1: Market with 5 Competitors**
- Prices: [25,000, 30,000, 35,000, 40,000, 45,000]
- Min: 25,000
- Max: 45,000
- Median: 35,000
- Average: 35,000
- Q1: 27,500
- Q3: 42,500
- Recommended range: [27,500 - 42,500]

**Example 2: Scattered Market**
- Prices: [20,000, 22,000, 35,000, 38,000, 40,000, 45,000]
- Min: 20,000
- Max: 45,000
- Median: 36,500
- Average: 33,333
- Q1: 28,000
- Q3: 41,500
- Recommended range: [28,000 - 41,500]

**Example 3: Tight Market (Premium)**
- Prices: [95,000, 100,000, 105,000, 110,000]
- Min: 95,000
- Max: 110,000
- Median: 102,500
- Average: 102,500
- Q1: 97,500
- Q3: 107,500
- Recommended range: [97,500 - 107,500]

---

## Testing Requirements

✓ **Unit Tests (100% coverage):**
- [ ] Valid input: 2, 5, 10 prices
- [ ] Boundary: 2 (min), 10 (max)
- [ ] Invalid: 1 (too few), 11 (too many)
- [ ] Sorted vs unsorted prices (should give same result)
- [ ] Duplicate prices (all same, all different)
- [ ] Edge cases: 0, very large numbers, decimals
- [ ] Outliers: Wide price ranges
- [ ] Median calculation: even vs odd number of prices

✓ **Test File:** `tests/lib/calculator.test.ts`

✓ **Test Cases:**
```typescript
describe('calculateMarketBased', () => {
  it('should calculate correctly for 5 prices', () => {
    const prices = [25000, 30000, 35000, 40000, 45000];
    const result = calculateMarketBased(prices);
    expect(result.medianPrice).toBe(35000);
    expect(result.avgPrice).toBe(35000);
    expect(result.minPrice).toBe(25000);
    expect(result.maxPrice).toBe(45000);
  });

  it('should reject < 2 prices', () => {
    expect(() => calculateMarketBased([30000])).toThrow();
  });

  it('should reject > 10 prices', () => {
    const prices = Array(11).fill(30000);
    expect(() => calculateMarketBased(prices)).toThrow();
  });

  it('should handle unsorted prices', () => {
    const sorted = [25000, 30000, 35000, 40000, 45000];
    const unsorted = [40000, 25000, 45000, 30000, 35000];
    const r1 = calculateMarketBased(sorted);
    const r2 = calculateMarketBased(unsorted);
    expect(r1.medianPrice).toBe(r2.medianPrice);
  });

  it('should calculate median correctly for even count', () => {
    const prices = [20000, 30000, 40000, 50000];
    const result = calculateMarketBased(prices);
    expect(result.medianPrice).toBe(35000);  // (30000 + 40000) / 2
  });

  it('should determine position relative to average', () => {
    const prices = [20000, 30000, 40000, 50000];
    const result = calculateMarketBased(prices);
    expect(result.position).toBe('at');  // 35000 is average
  });
});
```

---

## Deliverables

- [ ] `calculateMarketBased()` function in `src/lib/calculator.ts`
- [ ] Complete MarketAnalysis interface
- [ ] All statistics calculations correct
- [ ] Comprehensive JSDoc with examples
- [ ] Validation with descriptive errors
- [ ] Test cases in `tests/lib/calculator.test.ts`
- [ ] 100% test coverage
- [ ] No TypeScript errors

---

## Code Quality Checklist

- [ ] Pure function (no side effects)
- [ ] Handles statistical calculations correctly
- [ ] Median calculation correct for even/odd
- [ ] Quartile calculations accurate
- [ ] Clear variable names
- [ ] JSDoc with examples
- [ ] Error messages user-friendly
- [ ] Consistent with CLAUDE.md

---

## Statistical Notes

- **Median:** Middle value (for even count: average of two middle)
- **Q1:** 25th percentile (lower quartile)
- **Q3:** 75th percentile (upper quartile)
- Position determination: within ±10% of average = "at"

---

## Notes

- Most complex calculator (statistical analysis)
- Do NOT implement UI component (Task 020)
- Research typical market price ranges for validation tests
- Consider Indonesian food industry price distributions
- Quartile calculation: use percentile method

---

## Next Tasks

**Unblocks:**
- Task 010: Comprehensive calculator tests (all 3 methods)
- Task 020: MarketPriceInput component
- Task 019: PricingMethodSelector (depends on all 3 calculators)

---

**End of Task 009**
