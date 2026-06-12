# Task 002: Define TypeScript Types

**Phase:** 1 - Foundation  
**Duration:** 30 minutes  
**Status:** Completed (2026-06-10)

---

## Title
Define All TypeScript Types and Interfaces

---

## Description

Create the complete data model as TypeScript interfaces. This establishes the contract for all business logic and UI components.

**What will be done:**
1. Create `src/lib/types.ts` with all interfaces
2. Define Unit types (kg, gram, liter, ml, pcs, pack, etc.)
3. Define Ingredient interface
4. Define Overhead interface
5. Define PricingConfig interface
6. Define Recipe interface
7. Define AppSettings interface
8. Add JSDoc comments for clarity
9. Export all types

**Why this matters:**
- Single source of truth for data structure
- TypeScript catches type errors at compile time
- Blocks: 006-010 (calculators), 014-021 (components), 011-013 (storage)

---

## Dependencies

- Task 001: Vite project setup
- TypeScript compiler (included in Vite setup)

---

## Acceptance Criteria

✓ **File Created:**
- [x] `src/lib/types.ts` exists
- [x] File is executable without errors: `npx tsc --noEmit`

✓ **All Types Defined:**
- [x] `Unit` type (9 variants: gram, kg, ml, liter, pcs, pack, sachet, sendok, gelas)
- [x] `Ingredient` interface with all fields
- [x] `Overhead` interface with all fields
- [x] `PricingMethod` type (foodCost | markup | market)
- [x] `PricingConfig` interface with optional method-specific fields
- [x] `Recipe` interface with all fields
- [x] `AppSettings` interface with language and preferences
- [x] `LaborModel` type (modelA | modelB) for overhead

✓ **Quality:**
- [x] All fields have proper TypeScript types
- [x] JSDoc comments on every interface
- [x] No `any` types
- [x] Nullable fields use `| null` or optional (`?`)
- [x] README-style comments for complex fields

---

## Technical Notes

### File Location
`src/lib/types.ts`

### Required Types Structure

**Unit type** (Union of supported units):
- gram, kg (weight)
- ml, liter (volume)
- pcs, pack (count)
- sachet, sendok, gelas (common kitchen measurements)

**Ingredient interface** (per-ingredient data):
- id: UUID string
- name: ingredient name
- pricePerUnit: cost in Rp
- unit: purchase unit
- amountPerPortion: quantity used per portion
- amountUnit: unit for portion amount

**Overhead interface** (non-ingredient costs):
- packagingPerPortion: cost per portion
- overheadPerPortion: allocated overhead cost
- laborPerPortion: calculated or manual labor cost

**PricingConfig interface** (pricing methodology):
- method: which pricing method to use
- targetFoodCostPercent?: for food cost method
- markupMultiplier?: for markup method
- competitorPrices?: array for market method

**Recipe interface** (complete recipe data):
- id: UUID
- name: recipe/dish name
- portions: number of portions produced
- ingredients: array of Ingredient
- overhead: Overhead object
- pricing: PricingConfig object
- createdAt: timestamp
- updatedAt: timestamp

**AppSettings interface** (user preferences):
- language: 'id' | 'en'
- lastRecipeId?: optional resume state
- theme?: optional for future use

---

## Validation Rules (Document in Comments)

Add validation rules as JSDoc comments:

**Ingredient:**
```
name: non-empty string, required
pricePerUnit: number, ≥ 0, ≤ 1,000,000
amountPerPortion: number, > 0, ≤ 100,000
```

**Overhead:**
```
All fields: number, ≥ 0, defaults to 0
```

**PricingConfig:**
```
targetFoodCostPercent: 10-60 (if method='foodCost')
markupMultiplier: 1.5-10 (if method='markup')
competitorPrices: array of 2-10 prices (if method='market')
```

---

## Testing Requirements

✓ **TypeScript Compilation:**
- [x] No errors: `npx tsc --noEmit`
- [x] File imports correctly in other modules

✓ **No Automated Tests** (type definitions phase)

---

## Deliverables

- [x] `src/lib/types.ts` with all interfaces
- [x] All types exported for use in other files
- [x] Comprehensive JSDoc comments
- [x] Validation rules documented in comments

---

## Code Example

```typescript
// Example structure (see full file in src/lib/types.ts)
export type Unit = 'gram' | 'kg' | 'ml' | ... ;

export interface Ingredient {
  /** Unique identifier (UUID) */
  id: string;
  /** Ingredient name (e.g., "Flour", "Butter") */
  name: string;
  // ... rest of fields
}

export interface Recipe {
  // ... fields
}
```

---

## Notes

- Do NOT implement calculation logic (will come in Task 006)
- Do NOT create components yet (Task 014+)
- Types are read-only until data model changes
- Keep this file focused on data structures only
- Comment on any business logic implied by the structure

---

## Next Tasks

**Unblocks:**
- Task 003: i18n setup (uses PricingMethod for keys)
- Task 006-010: Calculator logic (depends on types)
- Task 011-013: Storage layer (depends on types)
- Task 014-021: UI components (all depend on types)

---

**End of Task 002**
