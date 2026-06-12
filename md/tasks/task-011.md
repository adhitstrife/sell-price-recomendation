# Task 011: Implement localStorage Helpers

**Phase:** 3 - Storage Layer  
**Duration:** 60 minutes  
**Status:** Pending

---

## Title
Implement localStorage Helper Functions (Save/Load/Delete Recipes)

---

## Description

Create the storage layer that persists recipes and settings to browser localStorage.

**What will be done:**
1. Create `src/lib/storage.ts` with all storage functions
2. Implement `saveRecipe()` - save single recipe
3. Implement `loadRecipe()` - load recipe by ID
4. Implement `deleteRecipe()` - remove recipe
5. Implement `getAllRecipes()` - retrieve all recipe IDs
6. Implement recipe index management (recipes:list)
7. Handle localStorage quota exceeded
8. Add comprehensive error handling
9. Test serialization/deserialization

**Why this matters:**
- Enables recipe persistence (core feature)
- Blocks: Task 012-013 (other storage), Task 022-023 (pages that load recipes)
- Error handling critical (quota can be exceeded)

---

## Dependencies

- Task 001: Vite setup
- Task 002: TypeScript types (Recipe interface)
- Task 004: Constants (PERFORMANCE.STORAGE_MAX_SIZE)
- Task 005: Testing infrastructure

---

## Acceptance Criteria

✓ **Functions Implemented:**
- [ ] `saveRecipe(recipe: Recipe): void`
- [ ] `loadRecipe(id: string): Recipe`
- [ ] `deleteRecipe(id: string): void`
- [ ] `getAllRecipeIds(): string[]`
- [ ] `recipeExists(id: string): boolean`
- [ ] All throw descriptive errors on failure

✓ **Storage Behavior:**
- [ ] Recipes stored as `recipes:${id}` keys
- [ ] Index maintained in `recipes:list` key
- [ ] Serialization: JSON.stringify() on save
- [ ] Deserialization: JSON.parse() on load
- [ ] Timestamps preserved (createdAt, updatedAt)

✓ **Error Handling:**
- [ ] Catch QuotaExceededError
- [ ] Throw with user-friendly message
- [ ] Graceful handling of corrupted data
- [ ] Suggest delete old recipes when quota full

✓ **Verification:**
- [ ] Save and load return identical data
- [ ] Deleted recipes cannot be retrieved
- [ ] Index stays in sync with actual recipes
- [ ] Handles large recipes (near 5MB limit)

---

## Technical Notes

### Storage Schema

```typescript
// Key: recipes:${UUID}
// Value: JSON serialized Recipe
localStorage.setItem('recipes:abc123', JSON.stringify(recipe));

// Key: recipes:list
// Value: Array of recipe IDs for fast lookup
localStorage.setItem('recipes:list', JSON.stringify(['id1', 'id2', 'id3']));
```

### Function Signatures

```typescript
export const saveRecipe = (recipe: Recipe): void => {
  // Validate recipe
  // Check storage quota
  // Update index
  // Save recipe
};

export const loadRecipe = (id: string): Recipe => {
  // Get from storage
  // Parse JSON
  // Validate data structure
  // Return recipe
};

export const deleteRecipe = (id: string): void => {
  // Remove recipe
  // Remove from index
  // Keep index in sync
};

export const getAllRecipeIds = (): string[] => {
  // Get recipes:list
  // Return array of IDs
  // Empty array if none
};
```

### Error Handling Example

```typescript
try {
  localStorage.setItem(key, value);
} catch (error) {
  if (error instanceof QuotaExceededError) {
    throw new Error('Storage penuh. Hapus resep yang tidak digunakan.');
  }
  throw error;
}
```

---

## Testing Requirements

✓ **Unit Tests:**
- [ ] Save and load cycle preserves data
- [ ] Delete removes recipe completely
- [ ] Index stays in sync
- [ ] getAllRecipeIds returns correct IDs
- [ ] Throws on invalid recipe ID
- [ ] Handles null/undefined gracefully
- [ ] Quota exceeded error caught

✓ **Test File:** `tests/lib/storage.test.ts`

✓ **Real Scenarios:**
- [ ] Save recipe with all fields populated
- [ ] Save recipe with minimal fields
- [ ] Multiple recipes (3, 10, 50)
- [ ] Large recipe (many ingredients)
- [ ] Modify and update existing recipe

---

## Deliverables

- [ ] `src/lib/storage.ts` with all functions
- [ ] Comprehensive JSDoc comments
- [ ] Error messages appropriate for users
- [ ] `tests/lib/storage.test.ts` with test coverage
- [ ] No TypeScript errors
- [ ] All edge cases handled

---

## Code Quality Checklist

- [ ] Pure functions where possible
- [ ] Clear function names
- [ ] JSDoc with examples
- [ ] Error messages i18n-compatible
- [ ] No hardcoded strings (use i18n keys)
- [ ] Type-safe with TypeScript

---

## Notes

- Do NOT implement cloud sync (v1 is localStorage only)
- Do NOT encrypt data (v1 is client-only)
- Index prevents iterating all keys (performance)
- Migration functions (if needed) added in separate task
- Design allows future backend migration (same schema)

---

## Next Tasks

**Unblocks:**
- Task 012: Recipe list management
- Task 013: Settings storage
- Task 022: HomePage (uses load/save)
- Task 023: SavedRecipesPage (uses getAllRecipes)

---

**End of Task 011**
