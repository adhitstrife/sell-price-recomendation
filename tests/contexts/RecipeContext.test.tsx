import { describe, it, expect, beforeEach } from "vitest";
import React from "react";
import { render, screen, renderHook, act } from "@testing-library/react";
import { type ReactNode } from "react";
import { RecipeProvider, useRecipe } from "../../contexts/RecipeContext";
import type { Recipe } from "../../lib/types";

const wrapper = ({ children }: { children: ReactNode }) => (
  <RecipeProvider>{children}</RecipeProvider>
);

beforeEach(() => {
  localStorage.clear();
});

describe("RecipeProvider", () => {
  it("renders children without errors", () => {
    render(
      <RecipeProvider>
        <div>test child</div>
      </RecipeProvider>
    );
    expect(screen.getByText("test child")).toBeInTheDocument();
  });

  it("starts with null currentRecipe and empty allRecipes", () => {
    const { result } = renderHook(() => useRecipe(), { wrapper });
    expect(result.current.currentRecipe).toBeNull();
    expect(result.current.allRecipes).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});

describe("useRecipe", () => {
  it("throws when used outside RecipeProvider", () => {
    expect(() => renderHook(() => useRecipe())).toThrow(
      "useRecipe must be used within a RecipeProvider"
    );
  });
});

describe("createNewRecipe", () => {
  it("initializes a new empty recipe with unique id", () => {
    const { result } = renderHook(() => useRecipe(), { wrapper });
    act(() => {
      result.current.createNewRecipe();
    });
    expect(result.current.currentRecipe).not.toBeNull();
    expect(result.current.currentRecipe!.id).toBeTruthy();
    expect(result.current.currentRecipe!.name).toBe("");
    expect(result.current.currentRecipe!.ingredients).toEqual([]);
    expect(result.current.currentRecipe!.overhead.laborPerPortion).toBe(0);
  });
});

describe("updateRecipe", () => {
  it("merges updates into current recipe", () => {
    const { result } = renderHook(() => useRecipe(), { wrapper });
    act(() => {
      result.current.createNewRecipe();
    });
    act(() => {
      result.current.updateRecipe({ name: "Updated Name", portions: 5 });
    });
    expect(result.current.currentRecipe!.name).toBe("Updated Name");
    expect(result.current.currentRecipe!.portions).toBe(5);
  });

  it("does nothing when no current recipe", () => {
    const { result } = renderHook(() => useRecipe(), { wrapper });
    act(() => {
      result.current.updateRecipe({ name: "X" });
    });
    expect(result.current.currentRecipe).toBeNull();
  });

  it("updates updatedAt timestamp", () => {
    const { result } = renderHook(() => useRecipe(), { wrapper });
    act(() => {
      result.current.createNewRecipe();
    });
    const originalUpdatedAt = result.current.currentRecipe!.updatedAt;
    act(() => {
      result.current.updateRecipe({ name: "X" });
    });
    expect(result.current.currentRecipe!.updatedAt).toBeGreaterThanOrEqual(originalUpdatedAt);
  });
});

describe("saveCurrentRecipe", () => {
  it("persists recipe to storage", async () => {
    const { result } = renderHook(() => useRecipe(), { wrapper });
    act(() => {
      result.current.createNewRecipe();
    });
    act(() => {
      result.current.updateRecipe({ name: "Test Recipe" });
    });
    await act(async () => {
      await result.current.saveCurrentRecipe();
    });
    expect(result.current.allRecipes).toHaveLength(1);
    expect(result.current.allRecipes[0].name).toBe("Test Recipe");
  });

  it("updates existing recipe in allRecipes", async () => {
    const { result } = renderHook(() => useRecipe(), { wrapper });
    act(() => {
      result.current.createNewRecipe();
    });
    act(() => {
      result.current.updateRecipe({ name: "Initial" });
    });
    await act(async () => {
      await result.current.saveCurrentRecipe();
    });
    act(() => {
      result.current.updateRecipe({ name: "Updated" });
    });
    await act(async () => {
      await result.current.saveCurrentRecipe();
    });
    expect(result.current.allRecipes).toHaveLength(1);
    expect(result.current.allRecipes[0].name).toBe("Updated");
  });

  it("sets error when no current recipe", async () => {
    const { result } = renderHook(() => useRecipe(), { wrapper });
    await act(async () => {
      await result.current.saveCurrentRecipe();
    });
    expect(result.current.error).toBeTruthy();
  });
});

describe("loadRecipe", () => {
  it("loads a recipe from storage", async () => {
    const { result } = renderHook(() => useRecipe(), { wrapper });
    const id = "test-id-1";
    const sample: Recipe = {
      id,
      name: "Loaded Recipe",
      portions: 3,
      ingredients: [],
      overhead: { packagingPerPortion: 0, overheadPerPortion: 0, laborPerPortion: 0 },
      pricing: { method: "markup" },
      createdAt: 100,
      updatedAt: 200,
    };
    localStorage.setItem(`recipes:${id}`, JSON.stringify(sample));
    await act(async () => {
      await result.current.loadRecipe(id);
    });
    expect(result.current.currentRecipe!.id).toBe(id);
    expect(result.current.currentRecipe!.name).toBe("Loaded Recipe");
  });

  it("sets error for missing recipe", async () => {
    const { result } = renderHook(() => useRecipe(), { wrapper });
    await act(async () => {
      await result.current.loadRecipe("nonexistent");
    });
    expect(result.current.error).toBeTruthy();
  });
});

describe("deleteRecipe", () => {
  it("removes from storage and allRecipes", async () => {
    const { result } = renderHook(() => useRecipe(), { wrapper });
    act(() => {
      result.current.createNewRecipe();
    });
    act(() => {
      result.current.updateRecipe({ name: "To Delete" });
    });
    await act(async () => {
      await result.current.saveCurrentRecipe();
    });
    const id = result.current.currentRecipe!.id;
    await act(async () => {
      await result.current.deleteRecipe(id);
    });
    expect(result.current.allRecipes).toHaveLength(0);
    expect(result.current.currentRecipe).toBeNull();
  });
});

describe("loadAllRecipes", () => {
  it("populates allRecipes from storage", async () => {
    const r1: Recipe = { id: "r1", name: "R1", portions: 1, ingredients: [], overhead: { packagingPerPortion: 0, overheadPerPortion: 0, laborPerPortion: 0 }, pricing: { method: "markup" }, createdAt: 0, updatedAt: 0 };
    const r2: Recipe = { id: "r2", name: "R2", portions: 1, ingredients: [], overhead: { packagingPerPortion: 0, overheadPerPortion: 0, laborPerPortion: 0 }, pricing: { method: "markup" }, createdAt: 0, updatedAt: 0 };
    localStorage.setItem("recipes:r1", JSON.stringify(r1));
    localStorage.setItem("recipes:r2", JSON.stringify(r2));
    localStorage.setItem("recipes:list", JSON.stringify(["r1", "r2"]));
    const { result } = renderHook(() => useRecipe(), { wrapper });
    await act(async () => {
      await result.current.loadAllRecipes();
    });
    expect(result.current.allRecipes).toHaveLength(2);
  });
});

describe("resetRecipe", () => {
  it("clears current recipe", () => {
    const { result } = renderHook(() => useRecipe(), { wrapper });
    act(() => {
      result.current.createNewRecipe();
    });
    act(() => {
      result.current.resetRecipe();
    });
    expect(result.current.currentRecipe).toBeNull();
  });
});