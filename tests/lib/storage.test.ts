import { describe, it, expect, beforeEach } from "vitest";
import {
  saveRecipe,
  loadRecipe,
  deleteRecipe,
  getAllRecipeIds,
  getAllRecipes,
  recipeExists,
  saveSettings,
  loadSettings,
  STORAGE_KEY_LIST,
} from "../../lib/storage";
import type { Recipe, AppSettings } from "../../lib/types";

beforeEach(() => {
  localStorage.clear();
});

const mockRecipe = (overrides: Partial<Recipe> = {}): Recipe => ({
  id: "test-id-1",
  name: "Nasi Goreng",
  portions: 2,
  ingredients: [
    { id: "ing-1", name: "Nasi", pricePerUnit: 10000, unit: "kg", amountPerPortion: 300, amountUnit: "gram" },
  ],
  overhead: { packagingPerPortion: 500, overheadPerPortion: 0, laborPerPortion: 0 },
  pricing: { method: "markup", markupMultiplier: 3 },
  createdAt: 1000000,
  updatedAt: 1000000,
  ...overrides,
});

describe("saveRecipe / loadRecipe", () => {
  it("saves and loads a recipe correctly", () => {
    const recipe = mockRecipe();
    saveRecipe(recipe);
    const loaded = loadRecipe("test-id-1");
    expect(loaded).not.toBeNull();
    expect(loaded!.name).toBe("Nasi Goreng");
    expect(loaded!.portions).toBe(2);
  });

  it("loadRecipe returns null for missing id", () => {
    expect(loadRecipe("nonexistent")).toBeNull();
  });

  it("updates existing recipe without duplicating index", () => {
    const recipe = mockRecipe();
    saveRecipe(recipe);
    const updated = mockRecipe({ name: "Nasi Goreng Spesial" });
    saveRecipe(updated);
    expect(getAllRecipeIds()).toHaveLength(1);
    expect(loadRecipe("test-id-1")!.name).toBe("Nasi Goreng Spesial");
  });

  it("throws on missing id", () => {
    expect(() => saveRecipe(mockRecipe({ id: "" }))).toThrow();
  });

  it("preserves timestamps", () => {
    const recipe = mockRecipe({ createdAt: 5000, updatedAt: 6000 });
    saveRecipe(recipe);
    const loaded = loadRecipe("test-id-1");
    expect(loaded!.createdAt).toBe(5000);
    expect(loaded!.updatedAt).toBe(6000);
  });

  it("loadRecipe returns null for corrupted JSON", () => {
    const key = `recipes:test-id-1`;
    (localStorage as any).setItem(key, "{invalid json}");
    expect(loadRecipe("test-id-1")).toBeNull();
  });
});

describe("deleteRecipe", () => {
  it("removes recipe and index entry", () => {
    saveRecipe(mockRecipe());
    deleteRecipe("test-id-1");
    expect(loadRecipe("test-id-1")).toBeNull();
    expect(getAllRecipeIds()).toHaveLength(0);
  });

  it("does nothing for nonexistent id", () => {
    deleteRecipe("nonexistent");
    expect(getAllRecipeIds()).toHaveLength(0);
  });
});

describe("getAllRecipeIds / getAllRecipes", () => {
  it("returns empty for no recipes", () => {
    expect(getAllRecipeIds()).toEqual([]);
    expect(getAllRecipes()).toEqual([]);
  });

  it("returns all saved recipe IDs", () => {
    saveRecipe(mockRecipe({ id: "r1", name: "Recipe 1" }));
    saveRecipe(mockRecipe({ id: "r2", name: "Recipe 2" }));
    saveRecipe(mockRecipe({ id: "r3", name: "Recipe 3" }));
    const ids = getAllRecipeIds();
    expect(ids).toHaveLength(3);
    expect(ids).toContain("r1");
    expect(ids).toContain("r2");
    expect(ids).toContain("r3");
  });

  it("returns all recipe objects from getAllRecipes", () => {
    saveRecipe(mockRecipe({ id: "r1", name: "Recipe 1" }));
    saveRecipe(mockRecipe({ id: "r2", name: "Recipe 2" }));
    const recipes = getAllRecipes();
    expect(recipes).toHaveLength(2);
    expect(recipes.map((r) => r.name).sort()).toEqual(["Recipe 1", "Recipe 2"]);
  });

  it("skips corrupted recipes in getAllRecipes", () => {
    saveRecipe(mockRecipe({ id: "r1", name: "Recipe 1" }));
    (localStorage as any).setItem("recipes:r2", "{bad}");
    const raw = JSON.parse((localStorage as any).getItem(STORAGE_KEY_LIST) || "[]");
    raw.push("r2");
    (localStorage as any).setItem(STORAGE_KEY_LIST, JSON.stringify(raw));
    const recipes = getAllRecipes();
    expect(recipes).toHaveLength(1);
  });
});

describe("recipeExists", () => {
  it("returns true for existing recipe", () => {
    saveRecipe(mockRecipe());
    expect(recipeExists("test-id-1")).toBe(true);
  });

  it("returns false for missing recipe", () => {
    expect(recipeExists("nonexistent")).toBe(false);
  });
});

describe("settings storage", () => {
  const settings: AppSettings = { language: "en", lastRecipeId: "r1" };

  it("saves and loads settings", () => {
    saveSettings(settings);
    const loaded = loadSettings();
    expect(loaded).not.toBeNull();
    expect(loaded!.language).toBe("en");
    expect(loaded!.lastRecipeId).toBe("r1");
  });

  it("loadSettings returns null when no settings saved", () => {
    expect(loadSettings()).toBeNull();
  });

  it("loadSettings returns null for corrupted data", () => {
    (localStorage as any).setItem("settings", "{bad}");
    expect(loadSettings()).toBeNull();
  });
});