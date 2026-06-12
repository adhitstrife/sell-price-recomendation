# Task 006: Implement Unit Conversion System

**Phase:** 2 - Business Logic  
**Duration:** 60 minutes  
**Status:** Pending

---

## Title
Implement Unit Conversion System and Helper Functions

---

## Description

Create the unit conversion logic that underpins all ingredient cost calculations.

**What will be done:**
1. Create `src/lib/unitConversion.ts` with conversion functions
2. Implement conversion factor lookup system
3. Implement ingredient cost calculation per portion
4. Create constants for all unit pair conversions
5. Handle edge cases (same units, invalid conversions)
6. Add comprehensive JSDoc with examples
7. Verify against real-world scenarios

**Why this matters:**
- Foundation for all pricing calculations
- Blocks: Tasks 007-009 (pricing methods), 016 (ingredient input)
- Critical accuracy: Must handle kg↔gram, liter↔ml, etc.
- CLAUDE.md: Formula precision documented

---

## Dependencies

- Task 001: Vite setup
- Task 002: TypeScript types
- Task 004: Constants and project structure
- Task 005: Testing infrastructure

---

## Acceptance Criteria

✓ **Functions Implemented:**
- [ ] `getConversionFactor(fromUnit: Unit, toUnit: Unit): number`
- [ ] `convertAmount(amount: number, fromUnit: Unit, toUnit: Unit): number`
- [ ] `calculateIngredientCost(ingredient: Ingredient): number`
- [ ] All handle edge cases without errors

✓ **Supported Conversions:**
- [ ] kg ↔ gram (1000 factor)
- [ ] liter ↔ ml (1000 factor)
- [ ] pack ↔ pcs (user-configurable, default 1)
- [ ] sendok (tablespoon) ↔ gram (~15)
- [ ] gelas (cup) ↔ ml (~240)
- [ ] Same unit to itself (factor = 1)

✓ **Accuracy:**
- [ ] No floating-point errors beyond acceptable tolerance
- [ ] Tested with real-world Indonesian food prices
- [ ] Edge cases handled: 0 values, large numbers, small decimals
- [ ] All calculations reversible (A→B→A ≈ A)

✓ **Error Handling:**
- [ ] Invalid unit pairs throw descriptive errors
- [ ] Negative amounts rejected
- [ ] Zero amounts handled correctly
- [ ] Type safety: no `any` types

---

## Technical Notes

### Core Formula (from plan.md)

```
cost_per_portion = (pricePerUnit / conversion_factor) × amountPerPortion
```

Where:
- `pricePerUnit`: Price for entire unit (e.g., 15,000 Rp per kg)
- `conversion_factor`: How many small units in one large unit
  - 1 kg = 1,000 gram → factor = 1,000
  - 1 liter = 1,000 ml → factor = 1,000
  - 1 pack = X pcs → factor = X (default 1 if unspecified)
- `amountPerPortion`: Amount actually used per portion

### Example Calculations

**Example 1: Flour**
- Buy: 1 kg for Rp 15,000
- Use per portion: 200 gram
- Conversion: kg to gram = 1,000
- Cost per portion = (15,000 / 1,000) × 200 = Rp 3,000

**Example 2: Oil**
- Buy: 1 liter for Rp 20,000
- Use per portion: 50 ml
- Conversion: liter to ml = 1,000
- Cost per portion = (20,000 / 1,000) × 50 = Rp 1,000

**Example 3: Eggs (pack)**
- Buy: 1 pack for Rp 45,000
- Pack contains: 30 pcs
- Use per portion: 2 pcs
- Conversion: pack to pcs = 30
- Cost per portion = (45,000 / 30) × 2 = Rp 3,000

### Implementation Structure

```typescript
// src/lib/unitConversion.ts

interface ConversionPair {
  from: Unit;
  to: Unit;
  factor: number;
}

const UNIT_CONVERSIONS: ConversionPair[] = [
  { from: 'kg', to: 'gram', factor: 1000 },
  { from: 'gram', to: 'kg', factor: 0.001 },
  { from: 'liter', to: 'ml', factor: 1000 },
  { from: 'ml', to: 'liter', factor: 0.001 },
  { from: 'sendok', to: 'gram', factor: 15 },
  { from: 'gram', to: 'sendok', factor: 1/15 },
  { from: 'gelas', to: 'ml', factor: 240 },
  { from: 'ml', to: 'gelas', factor: 1/240 },
  // Same unit conversions (factor = 1)
  { from: 'kg', to: 'kg', factor: 1 },
  // ... etc for all units
];

export const getConversionFactor = (fromUnit: Unit, toUnit: Unit): number => {
  // Lookup conversion
  // Throw error if not found
};

export const calculateIngredientCost = (ingredient: Ingredient): number => {
  // Uses formula above
  // Returns cost per portion
};
```

---

## Testing Requirements

✓ **Unit Tests (100% coverage):**
- [ ] Test each conversion pair (kg↔gram, liter↔ml, etc.)
- [ ] Test same-unit conversion (factor = 1)
- [ ] Test invalid unit pairs (throw error)
- [ ] Test real-world examples (flour, oil, eggs, etc.)
- [ ] Test edge cases:
  - [ ] Very small amounts (0.5g)
  - [ ] Very large amounts (100kg)
  - [ ] Zero amount (should be 0)
  - [ ] Decimal values (1.5kg)

✓ **Test File:** `tests/lib/unitConversion.test.ts`

✓ **Real-World Test Cases:**
```
Flour: 15,000/kg, 200g per portion → 3,000 per portion ✓
Oil: 20,000/liter, 50ml per portion → 1,000 per portion ✓
Eggs: 45,000/pack(30pcs), 2pcs per portion → 3,000 per portion ✓
Butter: 50,000/kg, 25g per portion → 1,250 per portion ✓
Sugar: 12,000/kg, 100g per portion → 1,200 per portion ✓
```

---

## Deliverables

- [ ] `src/lib/unitConversion.ts` with all functions
- [ ] All conversion pairs defined and tested
- [ ] `tests/lib/unitConversion.test.ts` with 100% coverage
- [ ] Real-world scenarios validated
- [ ] Error handling implemented
- [ ] No TypeScript errors

---

## Code Quality Checklist

- [ ] Pure functions (no side effects)
- [ ] JSDoc comments with examples
- [ ] TypeScript strict mode compatible
- [ ] No floating-point precision issues
- [ ] Handles all Unit types
- [ ] Clear variable names
- [ ] Comprehensive error messages

---

## Notes

- Do NOT implement rounding here (Task 007-009 handle rounding)
- Keep conversion factors as constants in CLAUDE.md's `constants.ts`
- Verify conversions are mathematically reversible
- Consider precision: cents matter in Rp context
- Document any assumptions about unit conversions

---

## Next Tasks

**Unblocks:**
- Task 007: Food Cost % calculator
- Task 008: Markup Multiplier calculator
- Task 009: Market-Based calculator
- Task 010: Comprehensive tests
- Task 016: IngredientInput component
- Task 019: PricingMethodSelector

---

**End of Task 006**
