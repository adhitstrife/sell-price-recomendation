# Task 022: Implement HomePage (Halaman Utama)

**Phase:** 5 - Pages & Layout
**Duration:** 90 minutes
**Status:** Pending

---

## Title
Build the Main Calculator Page (HomePage)

---

## Description

Combine all UI components (016-021) into a single-page calculator that guides users through the full pricing workflow.

**What will be done:**
1. Create `app/page.tsx` as the HomePage component (replaces the stub from Task 001)
2. Assemble Step 1: Menu name + portions input
3. Assemble Step 2: IngredientInput + IngredientList
4. Assemble Step 3: OverheadInput (collapsible/expandable)
5. Assemble Step 4: PricingMethodSelector + MarketPriceInput (conditional)
6. Assemble Result section: ResultDisplay
7. Add Save/Reset buttons
8. Wire all components to RecipeContext (useRecipe hook)
9. Calculate results in real-time (on every state change via useEffect)
10. Handle loading/error states from context

**Why this matters:**
- Main user-facing page of the entire application
- Orchestrates all UI components built in Phase 4
- Blocks: Task 024 (app layout wraps this), Task 028 (styling/refinement)
- Must follow plan.md Section 7 UI/UX flow exactly

---

## Dependencies

- Task 014: RecipeContext (state management)
- Task 015: SettingsContext (language settings)
- Task 016: IngredientInput component
- Task 017: IngredientList component
- Task 018: OverheadInput component
- Task 019: PricingMethodSelector component
- Task 020: MarketPriceInput component
- Task 021: ResultDisplay component
- Task 003: i18n (all labels translated)

---

## Acceptance Criteria

✓ **Page Structure:**
- [ ] Page renders without errors
- [ ] Header with app title in current language
- [ ] Navigation link to /saved-recipes
- [ ] All 4 steps visible in order

✓ **Step 1 — Menu Name & Portions:**
- [ ] Text input for menu name
- [ ] Number input for portions (min 1)
- [ ] Updates RecipeContext.currentRecipe

✓ **Step 2 — Ingredients:**
- [ ] IngredientInput form visible
- [ ] IngredientList shows all added ingredients
- [ ] Delete button removes ingredient
- [ ] Empty state shown when no ingredients

✓ **Step 3 — Non-Ingredient Costs:**
- [ ] OverheadInput component rendered (collapsible)
- [ ] Packaging, overhead, labor fields functional
- [ ] Labor model A/B selection toggles correct fields

✓ **Step 4 — Pricing Method:**
- [ ] PricingMethodSelector tabs functional
- [ ] MarketPriceInput shown only when "market" selected
- [ ] Config values update in context

✓ **Results:**
- [ ] ResultDisplay shown when recipe has data
- [ ] Results recalculate on ingredient/overhead/pricing changes
- [ ] Currency formatted correctly (Rp)

✓ **Actions:**
- [ ] Save button persists recipe to localStorage
- [ ] Save triggers success message
- [ ] Reset button clears all fields
- [ ] Error messages displayed from context

✓ **Language:**
- [ ] All UI text uses i18n (no hardcoded strings)
- [ ] Language toggle (from Phase 6) works if already added

---

## Technical Notes

### Component Composition (per plan.md Section 7)

```tsx
// app/page.tsx (HomePage)
"use client";

import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRecipe } from "@/contexts/RecipeContext";
import { calculateAll, calculateLaborCost } from "@/lib/calculator";
import IngredientInput from "@/components/IngredientInput";
import IngredientList from "@/components/IngredientList";
import OverheadInput from "@/components/OverheadInput";
import PricingMethodSelector from "@/components/PricingMethodSelector";
import MarketPriceInput from "@/components/MarketPriceInput";
import ResultDisplay from "@/components/ResultDisplay";

export default function HomePage() {
  const { t } = useTranslation();
  const {
    currentRecipe, error, isLoading,
    createNewRecipe, updateRecipe, saveCurrentRecipe,
    resetRecipe, deleteRecipe,
  } = useRecipe();

  // Initialize empty recipe on mount if none exists
  useEffect(() => {
    if (!currentRecipe) createNewRecipe();
  }, []);

  // Real-time calculation on every relevant state change
  const result = useMemo(() => {
    if (!currentRecipe || currentRecipe.ingredients.length === 0) return null;
    return calculateAll(
      currentRecipe.ingredients,
      currentRecipe.overhead,
      currentRecipe.pricing,
      currentRecipe.laborConfig
    );
  }, [
    currentRecipe?.ingredients,
    currentRecipe?.overhead,
    currentRecipe?.pricing,
    currentRecipe?.laborConfig,
  ]);

  // ... render UI
}
```

### Page Layout Structure

```
┌──────────────────────────────────────────────┐
│ Header: App Title        [Saved Recipes →]   │
├──────────────────────────────────────────────┤
│ Step 1: Menu Name & Portions                 │
│ [Menu Name: ________]  [Portions: _2_]       │
├──────────────────────────────────────────────┤
│ Step 2: Bahan-Bahan                          │
│ ┌─IngredientInput (form to add ingredient)─┐ │
│ └──────────────────────────────────────────┘ │
│ ┌─IngredientList (table of ingredients)────┐ │
│ │ Nama | Harga | Unit | Takaran | Cost | ✕ │ │
│ │ ...  │ ...   │ ...  │ ...     │ ...  │   │ │
│ └──────────────────────────────────────────┘ │
├──────────────────────────────────────────────┤
│ Step 3: Biaya Non-Bahan (collapsible)        │
│ ┌─OverheadInput────────────────────────────┐ │
│ │ Packaging: [500]  Overhead: [200]         │ │
│ │ Labor: ○ Model A ● Model B                │ │
│ └──────────────────────────────────────────┘ │
├──────────────────────────────────────────────┤
│ Step 4: Metode Harga                         │
│ ┌─PricingMethodSelector────────────────────┐ │
│ │ [Food Cost] [Markup] [Market]             │ │
│ │ Target %: [30]                            │ │
│ └──────────────────────────────────────────┘ │
│ ┌─MarketPriceInput (if market)─────────────┐ │
│ └──────────────────────────────────────────┘ │
├──────────────────────────────────────────────┤
│ ───── HASIL ─────                             │
│ ┌─ResultDisplay────────────────────────────┐ │
│ │ Cost Breakdown | Pricing Recommendations  │ │
│ └──────────────────────────────────────────┘ │
├──────────────────────────────────────────────┤
│             [Simpan]  [Reset]                 │
└──────────────────────────────────────────────┘
```

### State Wiring

```typescript
// Adding an ingredient
const handleAddIngredient = (ingredient: Ingredient): void => {
  if (!currentRecipe) return;
  updateRecipe({
    ingredients: [...currentRecipe.ingredients, ingredient],
  });
};

// Updating overhead
const handleOverheadChange = (overhead: Overhead): void => {
  updateRecipe({ overhead });
};

// Updating labor config
const handleLaborConfigChange = (config: LaborConfig | undefined): void => {
  const laborPerPortion = config ? calculateLaborCost(config) : 0;
  updateRecipe({
    laborConfig: config,
    overhead: {
      ...(currentRecipe?.overhead ?? { packagingPerPortion: 0, overheadPerPortion: 0, laborPerPortion: 0 }),
      laborPerPortion,
    },
  });
};

// Save with success feedback
const handleSave = async (): Promise<void> => {
  await saveCurrentRecipe();
  // Show success toast/alert
};
```

---

## Testing Requirements

✓ **Component Render Tests:**
- [ ] Page renders all 4 steps
- [ ] Empty state shown when no ingredients
- [ ] ResultDisplay hidden when no recipe data
- [ ] Save button calls saveCurrentRecipe
- [ ] Reset button clears all fields

✓ **Integration Tests:**
- [ ] Adding ingredient → appears in list → result recalculates
- [ ] Changing pricing method → result updates
- [ ] Adding labor config → labor cost included in result
- [ ] Save → data persists in localStorage

✓ **Test File:** `tests/pages/HomePage.test.tsx`

✓ **Test Setup:**
- [ ] Wrapped in RecipeProvider + SettingsProvider + I18nextProvider
- [ ] localStorage mocked
- [ ] All i18n keys available

---

## Deliverables

- [ ] `app/page.tsx` fully implemented (replaces stub)
- [ ] All components wired together via RecipeContext
- [ ] Real-time calculation with useMemo
- [ ] Save/Reset buttons functional
- [ ] `tests/pages/HomePage.test.tsx` with integration tests
- [ ] No TypeScript errors
- [ ] Build succeeds

---

## Code Quality Checklist

- [ ] "use client" directive at top
- [ ] No hardcoded text (all via useTranslation)
- [ ] useMemo for expensive calculations
- [ ] useEffect only for initialization
- [ ] Proper TypeScript types on all handlers
- [ ] Components imported from @/components/*
- [ ] Contexts imported from @/contexts/*
- [ ] Structured per plan.md UI/UX flow (steps in order)
- [ ] Responsive layout (basic — full styling in Task 028)

---

## Notes

- Do NOT implement search/filter here (that's for SavedRecipes page)
- Do NOT implement LanguageToggle here (Task 025)
- Basic responsive layout is fine (full mobile polish in Task 028)
- Keep the page focused: calculator workflow, nothing else
- Save button should show success/error feedback
- Reset should confirm if recipe has unsaved changes

---

## Next Tasks

**Unblocks:**
- Task 023: SavedRecipesPage (can view/modify saved recipes)
- Task 024: App layout & routing (wraps this page with layout)
- Task 028: Styling & responsive refinement

---

**End of Task 022**
