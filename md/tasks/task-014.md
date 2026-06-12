# Task 014: Create RecipeContext & useRecipe Hook

**Phase:** 4 - UI Components  
**Duration:** 60 minutes  
**Status:** Pending

---

## Title
Implement RecipeContext and useRecipe Custom Hook

---

## Description

Create global state management for recipe data using React Context API.

**What will be done:**
1. Create `src/contexts/RecipeContext.tsx` with context and provider
2. Define recipe state and actions
3. Implement CRUD operations (Create, Read, Update, Delete)
4. Create `useRecipe()` custom hook
5. Integrate with storage layer (Task 011)
6. Test context provides data and actions
7. Document context API

**Why this matters:**
- Central state management for recipes
- Blocks: Task 022 (HomePage), Task 023 (SavedRecipesPage)
- Enables component composition without prop drilling
- Foundation for component testing

---

## Dependencies

- Task 001: Vite setup
- Task 002: TypeScript types (Recipe interface)
- Task 003: i18n setup
- Task 011: Storage layer (saveRecipe, loadRecipe, etc.)

---

## Acceptance Criteria

✓ **Context Created:**
- [ ] `RecipeContext` exported
- [ ] `RecipeProvider` component created
- [ ] Wraps children with provider
- [ ] No TypeScript errors

✓ **State Structure:**
- [ ] `currentRecipe: Recipe | null` (editing recipe)
- [ ] `allRecipes: Recipe[]` (all saved recipes)
- [ ] `isLoading: boolean` (async operations)
- [ ] `error: string | null` (error messages)

✓ **Actions Implemented:**
- [ ] `createNewRecipe()` - initialize new recipe
- [ ] `loadRecipe(id: string)` - load from storage
- [ ] `saveRecipe()` - save current recipe
- [ ] `updateRecipe(fields)` - update current recipe in memory
- [ ] `deleteRecipe(id: string)` - delete from storage
- [ ] `loadAllRecipes()` - fetch saved recipes
- [ ] `resetRecipe()` - clear current recipe

✓ **useRecipe Hook:**
- [ ] Export `useRecipe()` hook
- [ ] Throws if used outside provider
- [ ] Returns context value
- [ ] Type-safe with TypeScript

✓ **Testing:**
- [ ] Can render provider without errors
- [ ] Hook works inside provider
- [ ] Actions update state
- [ ] Storage integration works

---

## Technical Notes

### Context Structure

```typescript
interface RecipeContextType {
  // State
  currentRecipe: Recipe | null;
  allRecipes: Recipe[];
  isLoading: boolean;
  error: string | null;

  // Actions
  createNewRecipe: () => void;
  loadRecipe: (id: string) => Promise<void>;
  saveRecipe: () => Promise<void>;
  updateRecipe: (updates: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => Promise<void>;
  loadAllRecipes: () => Promise<void>;
  resetRecipe: () => void;
}

export const RecipeContext = createContext<RecipeContextType | undefined>(
  undefined
);

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
  // State management
  // Effect hooks for initialization
  // Context value
  // Return provider
};

export const useRecipe = (): RecipeContextType => {
  // Check context exists
  // Return context value
};
```

### Initial Recipe State

```typescript
const createEmptyRecipe = (): Recipe => ({
  id: generateUUID(),
  name: '',
  portions: 1,
  ingredients: [],
  overhead: {
    packagingPerPortion: 0,
    overheadPerPortion: 0,
    laborPerPortion: 0,
  },
  pricing: {
    method: 'markup',
  },
  createdAt: Date.now(),
  updatedAt: Date.now(),
});
```

### Actions Flow

1. **Create Recipe:**
   - `createNewRecipe()` → New empty recipe
   - Set as `currentRecipe`

2. **Save Recipe:**
   - `saveRecipe()` → Call storage.saveRecipe()
   - Update `updatedAt`
   - Add to `allRecipes` if new
   - Clear errors

3. **Update Recipe:**
   - `updateRecipe({field: value})` → Merge with current
   - Update `updatedAt`
   - Do NOT save to storage (only in memory)

4. **Load Recipe:**
   - `loadRecipe(id)` → Get from storage
   - Set as `currentRecipe`
   - Handle errors

---

## Testing Requirements

✓ **Unit Tests:**
- [ ] Provider renders without errors
- [ ] useRecipe hook returns context
- [ ] useRecipe throws outside provider
- [ ] createNewRecipe initializes empty recipe
- [ ] updateRecipe merges state correctly
- [ ] saveRecipe persists to storage
- [ ] loadRecipe retrieves from storage
- [ ] deleteRecipe removes from storage
- [ ] All recipes persist in allRecipes array

✓ **Test File:** `tests/contexts/RecipeContext.test.tsx`

---

## Deliverables

- [ ] `src/contexts/RecipeContext.tsx` with context and provider
- [ ] `src/hooks/useRecipe.ts` hook (or inline in context file)
- [ ] Comprehensive JSDoc comments
- [ ] `tests/contexts/RecipeContext.test.tsx`
- [ ] No TypeScript errors
- [ ] Context tested with provider

---

## Code Quality Checklist

- [ ] Type-safe context and hook
- [ ] Clear action names
- [ ] JSDoc for all actions
- [ ] Error handling with messages
- [ ] State updates are immutable
- [ ] No prop drilling needed
- [ ] Follows React best practices

---

## Notes

- Do NOT add UI components (they use the hook)
- Keep business logic in components (context = state)
- Storage integration is key (Task 011)
- Async actions (loadRecipe, saveRecipe) return Promises
- Error messages compatible with i18n

---

## Next Tasks

**Unblocks:**
- Task 016: IngredientInput (uses useRecipe to update)
- Task 017: IngredientList (reads from useRecipe)
- Task 018: OverheadInput (updates overhead in context)
- Task 019: PricingMethodSelector (reads/updates pricing)
- Task 021: ResultDisplay (reads recipe data)
- Task 022: HomePage (main consumer of context)

---

**End of Task 014**
