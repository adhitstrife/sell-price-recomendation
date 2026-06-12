# Task 023: Implement Saved Recipes Page

**Phase:** 5 - Pages & Layout
**Duration:** 75 minutes
**Status:** Pending

---

## Title
Build the Saved Recipes List Page with View/Edit/Delete/Duplicate

---

## Description

Create a page that displays all saved recipes from localStorage with full CRUD capabilities — view, edit, delete, duplicate, and search/filter.

**What will be done:**
1. Create `app/saved-recipes/page.tsx` (replaces the stub from Task 001)
2. Implement recipe list from localStorage via RecipeContext
3. Add search/filter by recipe name
4. Add View action: navigates to HomePage with loaded recipe
5. Add Edit action: loads recipe into editor (redirects to HomePage)
6. Add Delete action: removes from storage with confirmation dialog
7. Add Duplicate action: clones recipe with "(Copy)" suffix
8. Handle empty state (no saved recipes)
9. Handle loading/error states
10. Navigate back to HomePage

**Why this matters:**
- Recipe persistence is a core feature (plan.md Feature 6)
- Enables recipe management for recurring users
- Blocks: Task 024 (app layout), Task 026 (RecipeList component extraction)
- User retention depends on save/load/reuse workflow

---

## Dependencies

- Task 014: RecipeContext (loadAllRecipes, deleteRecipe, loadRecipe actions)
- Task 012: Recipe list management (storage.getAllRecipes, storage.deleteRecipe)
- Task 003: i18n (labels for actions, empty state, confirmation messages)
- Task 001: Next.js project setup (page routing)

---

## Acceptance Criteria

✓ **Page Structure:**
- [ ] Page renders at /saved-recipes
- [ ] Header with "Saved Recipes" title
- [ ] Back button to return to HomePage (/)
- [ ] Search/filter input for recipe names

✓ **Recipe List:**
- [ ] All saved recipes loaded from localStorage on mount
- [ ] Each recipe shows: name, portions, created date, pricing method
- [ ] Actions per recipe: View, Edit, Delete, Duplicate
- [ ] Empty state: "Belum ada resep tersimpan" with link to create new

✓ **View Action:**
- [ ] Loads recipe into editor via RecipeContext
- [ ] Redirects to HomePage (/)
- [ ] Recipe data prefilled in the calculator

✓ **Edit Action:**
- [ ] Same as View (load into editor on HomePage)
- [ ] Updates on save (overwrite existing)

✓ **Delete Action:**
- [ ] Confirmation dialog before deletion
- [ ] Removes from localStorage
- [ ] Removes from displayed list
- [ ] Success/error feedback

✓ **Duplicate Action:**
- [ ] Clones recipe with new UUID
- [ ] Appends "(Copy)" to name suffix
- [ ] Saves immediately to localStorage
- [ ] Appears in list

✓ **Search/Filter:**
- [ ] Filters recipes by name (case-insensitive)
- [ ] Clear search button
- [ ] Shows "No results" when filter matches nothing

✓ **States:**
- [ ] Loading state while fetching recipes
- [ ] Empty state when no recipes exist
- [ ] Error state if loading fails
- [ ] Keyboard navigable (accessibility)

---

## Technical Notes

### Page Structure

```tsx
// app/saved-recipes/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useRecipe } from "@/contexts/RecipeContext";
import { formatCurrency } from "@/lib/formatting";
import type { Recipe } from "@/lib/types";

export default function SavedRecipesPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { allRecipes, isLoading, error, loadAllRecipes, loadRecipe, deleteRecipe } = useRecipe();
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadAllRecipes();
  }, []);

  const filtered = allRecipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = async (id: string): Promise<void> => {
    await loadRecipe(id);
    router.push("/");
  };

  const handleDuplicate = async (recipe: Recipe): Promise<void> => {
    const newId = crypto.randomUUID();
    const clone: Recipe = {
      ...recipe,
      id: newId,
      name: `${recipe.name} (Copy)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    // Save clone directly
    const { saveRecipe } = await import("@/lib/storage");
    saveRecipe(clone);
    await loadAllRecipes();
  };

  const handleDelete = async (id: string): Promise<void> => {
    await deleteRecipe(id);
    setDeleteConfirm(null);
  };

  // ... render UI
}
```

### Recipe Card Layout

```
┌──────────────────────────────────────────────────────┐
│ Recipe Name: Nasi Goreng                             │
│ Portions: 2 | Method: Food Cost 30%                  │
│ Created: 2026-06-10 | Updated: 2026-06-11            │
│                                                      │
│ [View] [Edit] [Delete] [Duplicate]                   │
└──────────────────────────────────────────────────────┘
```

### Confirmation Dialog

```tsx
{deleteConfirm && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
      <p className="mb-4">{t("msg.confirmDelete")}</p>
      <div className="flex justify-end gap-2">
        <button onClick={() => setDeleteConfirm(null)}>
          {t("btn.cancel")}
        </button>
        <button onClick={() => handleDelete(deleteConfirm)}
                className="bg-danger text-white px-4 py-2 rounded">
          {t("btn.delete")}
        </button>
      </div>
    </div>
  </div>
)}
```

### Empty State

```
┌─────────────────────────────────────────────────┐
│              📋 (or appropriate icon)             │
│          Belum ada resep tersimpan.              │
│    [Buat Resep Pertama →] (link to HomePage)     │
└─────────────────────────────────────────────────┘
```

---

## Testing Requirements

✓ **Component Tests:**
- [ ] Renders empty state when no recipes
- [ ] Renders recipe list when recipes exist
- [ ] Search filters by name
- [ ] Delete shows confirmation dialog
- [ ] Delete removes recipe from list
- [ ] Duplicate creates copy with "(Copy)" suffix
- [ ] View navigates to HomePage (mock router)
- [ ] Loading state during initial load
- [ ] Error state when load fails

✓ **Test File:** `tests/pages/SavedRecipesPage.test.tsx`

✓ **Test Setup:**
- [ ] Wrapped in RecipeProvider + I18nextProvider
- [ ] localStorage pre-populated with mock recipes
- [ ] Router mocked with vi.fn()

---

## Deliverables

- [ ] `app/saved-recipes/page.tsx` fully implemented (replaces stub)
- [ ] Search/filter functionality
- [ ] Confirmation dialog for delete
- [ ] Duplicate recipe action
- [ ] Loading, empty, and error states handled
- [ ] `tests/pages/SavedRecipesPage.test.tsx` with tests
- [ ] No TypeScript errors
- [ ] All UI text via i18n

---

## Code Quality Checklist

- [ ] "use client" directive at top
- [ ] useEffect with loadAllRecipes on mount
- [ ] No hardcoded strings (all through useTranslation)
- [ ] Keyboard accessible (focus management on dialog)
- [ ] Proper TypeScript types
- [ ] Card-based recipe list (consistent visual styling)
- [ ] Confirmation dialog uses fixed positioning
- [ ] Delete removes from context (auto-updates list)
- [ ] Duplicate creates unique UUID via crypto.randomUUID()

---

## Notes

- Do NOT create RecipeList component yet (Task 026 extracts list logic)
- Keep card layout simple (full styling in Task 028)
- View and Edit both load recipe and redirect to HomePage
- Confirmation dialog must be dismissible (Escape key, click outside)
- Search should be debounced (300ms) to prevent excessive filtering
- Order recipes by most recently updated first

---

## Next Tasks

**Unblocks:**
- Task 024: App layout & routing (wires pages together)
- Task 026: RecipeList component extraction
- Task 028: Styling & responsive refinement

---

**End of Task 023**
