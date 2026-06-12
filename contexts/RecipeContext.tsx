"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Recipe } from "@/lib/types";
import {
  deleteRecipe as storageDeleteRecipe,
  getAllRecipes as storageGetAllRecipes,
  loadRecipe as storageLoadRecipe,
  saveRecipe as storageSaveRecipe,
} from "@/lib/storage";

interface RecipeContextType {
  currentRecipe: Recipe | null;
  allRecipes: Recipe[];
  isLoading: boolean;
  error: string | null;
  createNewRecipe: () => void;
  loadRecipe: (id: string) => Promise<void>;
  saveCurrentRecipe: () => Promise<void>;
  updateRecipe: (updates: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => Promise<void>;
  loadAllRecipes: () => Promise<void>;
  resetRecipe: () => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

const generateUUID = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `recipe-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const createEmptyRecipe = (): Recipe => ({
  id: generateUUID(),
  name: "",
  portions: 1,
  ingredients: [],
  overhead: { packagingPerPortion: 0, overheadPerPortion: 0, laborPerPortion: 0 },
  pricing: { method: "markup", markupMultiplier: 3 },
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

interface RecipeProviderProps {
  children: ReactNode;
}

const RecipeProvider = ({ children }: RecipeProviderProps) => {
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNewRecipe = useCallback((): void => {
    setCurrentRecipe(createEmptyRecipe());
    setError(null);
  }, []);

  const loadRecipe = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const recipe = storageLoadRecipe(id);
      if (!recipe) {
        setError("Resep tidak ditemukan");
        return;
      }
      setCurrentRecipe(recipe);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal memuat resep");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveCurrentRecipe = useCallback(async (): Promise<void> => {
    if (!currentRecipe) {
      setError("Tidak ada resep yang sedang diedit");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const updated: Recipe = { ...currentRecipe, updatedAt: Date.now() };
      storageSaveRecipe(updated);
      setCurrentRecipe(updated);
      setAllRecipes((prev) => {
        const exists = prev.some((r) => r.id === updated.id);
        if (exists) {
          return prev.map((r) => (r.id === updated.id ? updated : r));
        }
        return [...prev, updated];
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal menyimpan resep");
    } finally {
      setIsLoading(false);
    }
  }, [currentRecipe]);

  const updateRecipe = useCallback((updates: Partial<Recipe>): void => {
    setCurrentRecipe((prev) => {
      if (!prev) return prev;
      return { ...prev, ...updates, updatedAt: Date.now() };
    });
  }, []);

  const deleteRecipe = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      storageDeleteRecipe(id);
      setAllRecipes((prev) => prev.filter((r) => r.id !== id));
      setCurrentRecipe((prev) => (prev && prev.id === id ? null : prev));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal menghapus resep");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadAllRecipes = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const recipes = storageGetAllRecipes();
      setAllRecipes(recipes);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal memuat daftar resep");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetRecipe = useCallback((): void => {
    setCurrentRecipe(null);
    setError(null);
  }, []);

  const value: RecipeContextType = {
    currentRecipe,
    allRecipes,
    isLoading,
    error,
    createNewRecipe,
    loadRecipe,
    saveCurrentRecipe,
    updateRecipe,
    deleteRecipe,
    loadAllRecipes,
    resetRecipe,
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
};

const useRecipe = (): RecipeContextType => {
  const ctx = useContext(RecipeContext);
  if (!ctx) {
    throw new Error("useRecipe must be used within a RecipeProvider");
  }
  return ctx;
};

export { RecipeContext, RecipeProvider, useRecipe };