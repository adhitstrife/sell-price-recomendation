# Task 004: Directory Structure & Utilities

**Phase:** 1 - Foundation  
**Duration:** 30 minutes  
**Status:** Completed (2026-06-10)

---

## Title
Organize Project Directory Structure and Create Utility Functions

---

## Description

Establish canonical project directory structure and create helper utilities for validation and formatting.

**What will be done:**
1. Reorganize src/ to match CLAUDE.md structure
2. Create lib/ subdirectories
3. Create utils/ with validation and formatting functions
4. Create constants.ts for app-wide constants
5. Create helper functions for common operations
6. Verify all imports work correctly

**Why this matters:**
- Consistent file organization (CLAUDE.md requirement)
- Utility functions prevent code duplication
- Clear separation of concerns
- Blocks: All subsequent tasks depend on this structure

---

## Dependencies

- Task 001: Vite project setup
- Task 002: TypeScript types

---

## Acceptance Criteria

✓ **Directory Structure:**
- [x] `components/` exists
- [x] `contexts/` exists
- [x] `hooks/` exists
- [x] `lib/` exists (contains types.ts, constants.ts)
- [x] `lib/utils/` created
- [x] `public/` directory exists
- [x] `tests/` directory exists

✓ **Files Created:**
- [x] `lib/constants.ts` with all app constants
- [x] `lib/utils/validation.ts` with validation functions
- [x] `lib/utils/formatting.ts` with formatting functions
- [x] `.prettierrc` for code formatting
- [x] `.eslintrc.json` for linting
- [x] `lib/calculator.ts` placeholder
- [x] `lib/storage.ts` placeholder
- [x] `hooks/index.ts` placeholder
- [x] `contexts/index.ts` placeholder

✓ **Verification:**
- [x] No broken imports
- [x] All TypeScript files compile without errors (`npx tsc --noEmit`)
- [x] Build succeeds (`npm run build`)
- [x] Structure matches canonical layout

---

## Technical Notes

### Directory Structure to Create

```
src/
├── components/          # React components
├── pages/              # Page components
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── lib/
│   ├── types.ts        # TypeScript types (already exists from Task 002)
│   ├── constants.ts    # NEW - App constants
│   ├── calculator.ts   # Placeholder for Task 006
│   ├── storage.ts      # Placeholder for Task 011
│   └── migrations/     # For future data migrations
├── utils/
│   ├── validation.ts   # NEW - Input validation
│   └── formatting.ts   # NEW - Number/currency formatting
├── i18n/              # Already created in Task 003
│   ├── config.ts
│   ├── id.json
│   └── en.json
├── styles/            # Global styles
│   └── index.css      # Tailwind imports
├── main.tsx           # App entry point
├── App.tsx            # Root component
└── index.css          # Already exists

tests/
├── lib/
│   ├── calculator.test.ts    # Placeholder
│   └── storage.test.ts       # Placeholder
└── components/
    └── ResultDisplay.test.tsx # Placeholder

public/
└── favicon.svg

.prettierrc            # NEW - Prettier config
.eslintrc.json        # OPTIONAL - ESLint config
```

### Constants File (src/lib/constants.ts)

```typescript
// Unit conversion factors
export const UNIT_CONVERSION: Record<string, Record<string, number>> = {
  'kg-gram': 1000,
  'gram-kg': 0.001,
  'liter-ml': 1000,
  'ml-liter': 0.001,
  'pack-pcs': 1,  // Default, user can specify
  'sendok-gram': 15,
  'gelas-ml': 240,
};

// Validation ranges
export const VALIDATION = {
  MIN_INGREDIENT_NAME_LENGTH: 1,
  MAX_INGREDIENT_NAME_LENGTH: 100,
  MIN_PRICE: 0,
  MAX_PRICE: 1_000_000,
  MIN_FOOD_COST_PERCENT: 10,
  MAX_FOOD_COST_PERCENT: 60,
  MIN_MARKUP: 1.5,
  MAX_MARKUP: 10,
  MIN_COMPETITOR_PRICES: 2,
  MAX_COMPETITOR_PRICES: 10,
  MIN_PORTIONS: 1,
  MAX_PORTIONS: 100_000,
};

// Default values
export const DEFAULTS = {
  LANGUAGE: 'id',
  PACKAGING_COST: 0,
  OVERHEAD_COST: 0,
  LABOR_COST: 0,
  PORTIONS: 1,
  ROUNDING_BASE: 500,  // Round to nearest 500 Rp
};

// Currency
export const CURRENCY = {
  SYMBOL: 'Rp',
  LOCALE: 'id-ID',
  MIN_UNIT: 50,  // Minimum currency unit in Rp
};

// Performance
export const PERFORMANCE = {
  DEBOUNCE_DELAY: 300,
  STORAGE_MAX_SIZE: 5_000_000,  // ~5MB
};
```

### Validation Utility (src/utils/validation.ts)

```typescript
// Examples of validation functions
export const validateIngredientName = (name: string): boolean => { };
export const validatePrice = (price: number): boolean => { };
export const validatePortion = (portions: number): boolean => { };
export const validateFoodCostPercent = (percent: number): boolean => { };
export const validateMarkupMultiplier = (multiplier: number): boolean => { };
export const validateCompetitorPrices = (prices: number[]): boolean => { };

// Return validation error messages
export const getValidationError = (field: string, value: any): string | null => { };
```

### Formatting Utility (src/utils/formatting.ts)

```typescript
// Examples of formatting functions
export const formatCurrency = (amount: number, locale?: string): string => { };
export const formatNumber = (num: number, decimals?: number): string => { };
export const roundToNearestUnit = (price: number, base?: number): number => { };
export const formatUnit = (value: number, unit: string): string => { };
```

### Prettier Config (.prettierrc)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

### ESLint Config (.eslintrc.json) - Optional

```json
{
  "extends": ["react-app"],
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-types": "warn"
  }
}
```

---

## Testing Requirements

✓ **Compilation Check:**
- [ ] `npx tsc --noEmit` passes with no errors
- [ ] `npm run build` succeeds
- [ ] No unused variable warnings

✓ **Imports:**
- [ ] Can import from `@/lib/types`
- [ ] Can import from `@/utils/validation`
- [ ] Can import from `@/lib/constants`

✓ **No Automated Tests** (structure setup phase)

---

## Deliverables

- [ ] Complete directory structure as specified
- [ ] `src/lib/constants.ts` with all constants
- [ ] `src/utils/validation.ts` with validation stubs
- [ ] `src/utils/formatting.ts` with formatting stubs
- [ ] `.prettierrc` configuration
- [ ] Placeholder files for future features
- [ ] No import errors

---

## Notes

- Create placeholder files in `src/lib/` and `tests/` for future tasks
- Validation and formatting functions should have only stubs/JSDoc (full implementation in later tasks)
- Use TypeScript strict mode for all utilities
- Add JSDoc comments to all utility functions
- Keep directory organization flat (no deep nesting)

---

## Next Tasks

**Unblocks:**
- Task 005: Testing infrastructure
- Task 006-010: Business logic (uses constants, validation)
- Task 014-021: UI components (use formatting, validation)

---

**End of Task 004**
