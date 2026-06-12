import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n/config";
import { RecipeProvider } from "../../contexts/RecipeContext";
import { AlertProvider } from "../../contexts/AlertContext";
import SavedRecipesPage from "../../app/saved-recipes/page";
import type { Recipe } from "../../lib/types";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => "/saved-recipes",
}));

const wrap = (ui: React.ReactNode) => (
  <I18nextProvider i18n={i18n}>
    <AlertProvider>
      <RecipeProvider>{ui}</RecipeProvider>
    </AlertProvider>
  </I18nextProvider>
);

const sampleRecipe = (overrides: Partial<Recipe> = {}): Recipe => ({
  id: "r1",
  name: "Nasi Goreng",
  portions: 2,
  ingredients: [],
  overhead: { packagingPerPortion: 0, overheadPerPortion: 0, laborPerPortion: 0 },
  pricing: { method: "markup", markupMultiplier: 3 },
  createdAt: 1000,
  updatedAt: 5000,
  ...overrides,
});

beforeEach(() => {
  localStorage.clear();
  pushMock.mockReset();
});

describe("SavedRecipesPage", () => {
  it("renders empty state when no recipes exist", async () => {
    render(wrap(<SavedRecipesPage />));
    await waitFor(() => {
      expect(screen.getByText(/Belum ada resep|No saved recipes/i)).toBeInTheDocument();
    });
  });

  it("renders recipe cards when recipes exist", async () => {
    localStorage.setItem("recipes:r1", JSON.stringify(sampleRecipe()));
    localStorage.setItem("recipes:list", JSON.stringify(["r1"]));
    render(wrap(<SavedRecipesPage />));
    await waitFor(() => {
      expect(screen.getByText("Nasi Goreng")).toBeInTheDocument();
    });
  });

  it("search filters recipes by name", async () => {
    localStorage.setItem("recipes:r1", JSON.stringify(sampleRecipe({ id: "r1", name: "Nasi Goreng" })));
    localStorage.setItem("recipes:r2", JSON.stringify(sampleRecipe({ id: "r2", name: "Mie Goreng" })));
    localStorage.setItem("recipes:list", JSON.stringify(["r1", "r2"]));
    render(wrap(<SavedRecipesPage />));
    await waitFor(() => {
      expect(screen.getByText("Nasi Goreng")).toBeInTheDocument();
    });
    const search = screen.getByLabelText(/Nama Menu|Menu Name/i);
    fireEvent.change(search, { target: { value: "Mie" } });
    await waitFor(() => {
      expect(screen.queryByText("Nasi Goreng")).not.toBeInTheDocument();
      expect(screen.getByText("Mie Goreng")).toBeInTheDocument();
    });
  });

  it("clicking edit navigates to calculator and loads recipe", async () => {
    localStorage.setItem("recipes:r1", JSON.stringify(sampleRecipe()));
    localStorage.setItem("recipes:list", JSON.stringify(["r1"]));
    render(wrap(<SavedRecipesPage />));
    await waitFor(() => {
      expect(screen.getByText("Nasi Goreng")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("button", { name: /^Edit$/i }));
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/calculator");
    });
  });

  it("clicking delete shows confirmation dialog", async () => {
    localStorage.setItem("recipes:r1", JSON.stringify(sampleRecipe()));
    localStorage.setItem("recipes:list", JSON.stringify(["r1"]));
    render(wrap(<SavedRecipesPage />));
    await waitFor(() => {
      expect(screen.getByText("Nasi Goreng")).toBeInTheDocument();
    });
    const deleteBtn = screen.getByRole("button", { name: /^Hapus$|^Delete$/i });
    fireEvent.click(deleteBtn);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("confirming delete removes recipe", async () => {
    localStorage.setItem("recipes:r1", JSON.stringify(sampleRecipe()));
    localStorage.setItem("recipes:list", JSON.stringify(["r1"]));
    render(wrap(<SavedRecipesPage />));
    await waitFor(() => {
      expect(screen.getByText("Nasi Goreng")).toBeInTheDocument();
    });
    const deleteBtn = screen.getByRole("button", { name: /^Hapus$|^Delete$/i });
    fireEvent.click(deleteBtn);
    const confirmBtn = screen.getAllByRole("button", { name: /^Hapus$|^Delete$/i })[1];
    fireEvent.click(confirmBtn);
    await waitFor(() => {
      expect(screen.queryByText("Nasi Goreng")).not.toBeInTheDocument();
    });
  });

  it("cancelling delete keeps recipe", async () => {
    localStorage.setItem("recipes:r1", JSON.stringify(sampleRecipe()));
    localStorage.setItem("recipes:list", JSON.stringify(["r1"]));
    render(wrap(<SavedRecipesPage />));
    await waitFor(() => {
      expect(screen.getByText("Nasi Goreng")).toBeInTheDocument();
    });
    const deleteBtn = screen.getByRole("button", { name: /^Hapus$|^Delete$/i });
    fireEvent.click(deleteBtn);
    fireEvent.click(screen.getByRole("button", { name: /Batal|Cancel/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByText("Nasi Goreng")).toBeInTheDocument();
  });

  it("clicking duplicate creates a copy with (Copy) suffix", async () => {
    localStorage.setItem("recipes:r1", JSON.stringify(sampleRecipe()));
    localStorage.setItem("recipes:list", JSON.stringify(["r1"]));
    render(wrap(<SavedRecipesPage />));
    await waitFor(() => {
      expect(screen.getByText("Nasi Goreng")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("button", { name: /Duplikat|Duplicate/i }));
    await waitFor(() => {
      expect(screen.getByText("Nasi Goreng (Copy)")).toBeInTheDocument();
    });
  });
});
