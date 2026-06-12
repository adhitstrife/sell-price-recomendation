import type { AppSettings, Recipe } from "./types";

const STORAGE_KEY_LIST = "recipes:list";
const STORAGE_KEY_SETTINGS = "settings";

const getRecipeKey = (id: string): string => `recipes:${id}`;

const getIndex = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LIST);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
};

const setIndex = (ids: string[]): void => {
  localStorage.setItem(STORAGE_KEY_LIST, JSON.stringify(ids));
};

const saveRecipe = (recipe: Recipe): void => {
  if (!recipe.id) throw new Error("Recipe ID is required");
  try {
    const key = getRecipeKey(recipe.id);
    const existing = localStorage.getItem(key);
    localStorage.setItem(key, JSON.stringify(recipe));
    if (!existing) {
      const ids = getIndex();
      if (!ids.includes(recipe.id)) {
        ids.push(recipe.id);
        setIndex(ids);
      }
    }
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      throw new Error("Storage penuh. Hapus resep yang tidak digunakan.");
    }
    throw error;
  }
};

const loadRecipe = (id: string): Recipe | null => {
  try {
    const raw = localStorage.getItem(getRecipeKey(id));
    if (!raw) return null;
    const recipe = JSON.parse(raw) as Recipe;
    if (!recipe || !recipe.id || !recipe.name) return null;
    return recipe;
  } catch {
    return null;
  }
};

const deleteRecipe = (id: string): void => {
  localStorage.removeItem(getRecipeKey(id));
  const ids = getIndex().filter((i) => i !== id);
  setIndex(ids);
};

const getAllRecipeIds = (): string[] => {
  return getIndex();
};

const getAllRecipes = (): Recipe[] => {
  return getIndex()
    .map((id) => loadRecipe(id))
    .filter((r): r is Recipe => r !== null);
};

const recipeExists = (id: string): boolean => {
  return localStorage.getItem(getRecipeKey(id)) !== null;
};

const saveSettings = (settings: AppSettings): void => {
  localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
};

const loadSettings = (): AppSettings | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (!raw) return null;
    const settings = JSON.parse(raw) as AppSettings;
    if (!settings || !settings.language) return null;
    return settings;
  } catch {
    return null;
  }
};

export {
  STORAGE_KEY_LIST,
  STORAGE_KEY_SETTINGS,
  deleteRecipe,
  getAllRecipeIds,
  getAllRecipes,
  getRecipeKey,
  loadRecipe,
  loadSettings,
  recipeExists,
  saveRecipe,
  saveSettings,
};