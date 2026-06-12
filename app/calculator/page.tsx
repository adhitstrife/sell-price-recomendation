"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useRecipe } from "@/contexts/RecipeContext";
import { useAlert } from "@/contexts/AlertContext";
import { calculateAll, calculateLaborCost } from "@/lib/calculator";
import type {
  CalculationResult,
  Ingredient,
  LaborConfig,
  Overhead,
  PricingConfig,
} from "@/lib/types";
import IngredientInput from "@/components/IngredientInput";
import IngredientList from "@/components/IngredientList";
import OverheadInput from "@/components/OverheadInput";
import PricingMethodSelector from "@/components/PricingMethodSelector";
import MarketPriceInput from "@/components/MarketPriceInput";
import ResultSidebar from "@/components/ResultSidebar";
import GuestModeBanner from "@/components/GuestModeBanner";

const EMPTY_OVERHEAD: Overhead = {
  packagingPerPortion: 0,
  overheadPerPortion: 0,
  laborPerPortion: 0,
};

export default function CalculatorPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { showSuccess, showError } = useAlert();
  const {
    currentRecipe,
    error,
    createNewRecipe,
    updateRecipe,
    saveCurrentRecipe,
    resetRecipe,
  } = useRecipe();
  const [overheadOpen, setOverheadOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!currentRecipe) {
      createNewRecipe();
    }
  }, [currentRecipe, createNewRecipe]);

  const hasIngredients = (currentRecipe?.ingredients.length ?? 0) > 0;

  const result: CalculationResult | null = useMemo(() => {
    if (!currentRecipe) return null;
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

  const handleAddIngredient = (ingredient: Ingredient): void => {
    if (!currentRecipe) return;
    updateRecipe({
      ingredients: [...currentRecipe.ingredients, ingredient],
    });
  };

  const handleDeleteIngredient = (id: string): void => {
    if (!currentRecipe) return;
    updateRecipe({
      ingredients: currentRecipe.ingredients.filter((i) => i.id !== id),
    });
  };

  const handleOverheadChange = (overhead: Overhead): void => {
    updateRecipe({ overhead });
  };

  const handleLaborConfigChange = (
    config: LaborConfig | undefined
  ): void => {
    const laborPerPortion = config ? calculateLaborCost(config) : 0;
    const currentOverhead = currentRecipe?.overhead ?? EMPTY_OVERHEAD;
    updateRecipe({
      laborConfig: config,
      overhead: { ...currentOverhead, laborPerPortion },
    });
  };

  const handlePricingChange = (pricing: PricingConfig): void => {
    updateRecipe({ pricing });
  };

  const handleMenuNameChange = (name: string): void => {
    updateRecipe({ name });
  };

  const handlePortionsChange = (portions: number): void => {
    updateRecipe({ portions });
  };

  const handleSave = async (): Promise<void> => {
    if (!currentRecipe || !currentRecipe.name.trim()) {
      showError(t("page.saveConfirm"));
      return;
    }
    try {
      setSaving(true);
      await saveCurrentRecipe();
      showSuccess(t("msg.saveSuccess"));
    } catch (e) {
      showError(e instanceof Error ? e.message : t("msg.errorGeneric"));
    } finally {
      setSaving(false);
    }
  };

  const handleReset = (): void => {
    resetRecipe();
    setOverheadOpen(false);
    createNewRecipe();
  };

  const handleCompetitorPricesChange = (prices: number[]): void => {
    if (!currentRecipe) return;
    updateRecipe({
      pricing: { ...currentRecipe.pricing, competitorPrices: prices },
    });
  };

  return (
    <div className="space-y-6">
      <GuestModeBanner />

      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <nav
            className="mb-1 flex items-center gap-1 font-heading text-label-md text-onSurface-variant"
            aria-label="Breadcrumb"
          >
            <span>{t("calc.crumbDashboard", "Dashboard")}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
            <span className="font-bold text-primary">
              {t("calc.crumbNew", "New Recipe")}
            </span>
          </nav>
          <h1 className="font-heading text-2xl font-bold text-onSurface sm:text-3xl">
            {t("calc.pageTitle", "Recipe Cost Calculator")}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-chef-lg border border-outline px-3 py-2 font-heading text-label-md font-bold text-onSurface transition hover:bg-surface-container-low"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zM12 9a3 3 0 110 6 3 3 0 010-6z" />
            </svg>
            {t("calc.preview", "Preview")}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!currentRecipe?.name.trim() || saving}
            className="inline-flex items-center gap-1.5 rounded-chef-lg bg-primary px-4 py-2 font-heading text-label-md font-bold text-white shadow-chef-sm transition hover:bg-[#26604a] disabled:opacity-50"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-9 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15 8H9V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2z" />
            </svg>
            {t("calc.loginToSave", "Login to Save")}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <section className="overflow-hidden rounded-chef-xl border border-outline-variant bg-surface-container-lowest shadow-chef-sm">
            <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-low px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-white">
                  1
                </span>
                <div>
                  <p className="font-heading text-label-md font-semibold uppercase tracking-wider text-primary">
                    {t("page.step1", "Step 1: Menu Name & Portions")}
                  </p>
                  <h2 className="font-heading text-title-md text-onSurface">
                    {t("form.menuName", "Menu Name")} &amp; {t("form.portions", "Portions")}
                  </h2>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="font-heading text-label-md font-semibold text-onSurface-variant">
                    {t("form.menuName", "Menu Name")}
                  </span>
                  <input
                    type="text"
                    value={currentRecipe?.name ?? ""}
                    onChange={(e) => handleMenuNameChange(e.target.value)}
                    placeholder={t("form.menuName", "Menu Name")}
                    className="w-full rounded-chef-lg border border-outline-variant bg-surface-container-low px-3 py-2.5 text-sm text-onSurface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="font-heading text-label-md font-semibold text-onSurface-variant">
                    {t("form.portions", "Number of Portions")}
                  </span>
                  <input
                    type="number"
                    min={1}
                    value={currentRecipe?.portions ?? 1}
                    onChange={(e) =>
                      handlePortionsChange(parseInt(e.target.value, 10) || 1)
                    }
                    className="text-data-mono w-full rounded-chef-lg border border-outline-variant bg-surface-container-low px-3 py-2.5 text-sm text-onSurface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </label>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-chef-xl border border-outline-variant bg-surface-container-lowest shadow-chef-sm">
            <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-low px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-white">
                  2
                </span>
                <div>
                  <p className="font-heading text-label-md font-semibold uppercase tracking-wider text-primary">
                    {t("page.step2", "Step 2: Ingredients")}
                  </p>
                  <h2 className="font-heading text-title-md text-onSurface">
                    {t("calc.sectionIngredients", "Primary Ingredients")}
                  </h2>
                </div>
              </div>
              <span className="font-heading text-label-md text-onSurface-variant">
                {t("calc.dragToReorder", "Drag to reorder")}
              </span>
            </div>
            <div className="space-y-4 p-5">
              <IngredientInput onAdd={handleAddIngredient} />
              {hasIngredients ? (
                <IngredientList
                  ingredients={currentRecipe?.ingredients ?? []}
                  onDelete={handleDeleteIngredient}
                />
              ) : (
                <p className="rounded-chef-lg border border-dashed border-outline-variant bg-surface-container-lowest px-4 py-6 text-center text-sm italic text-onSurface-variant">
                  {t(
                    "form.noIngredients",
                    "Belum ada bahan. Tambahkan bahan di atas."
                  )}
                </p>
              )}
            </div>
          </section>

          <section className="overflow-hidden rounded-chef-xl border border-outline-variant bg-surface-container-lowest shadow-chef-sm">
            <button
              type="button"
              onClick={() => setOverheadOpen((prev) => !prev)}
              className="flex w-full items-center justify-between gap-3 border-b border-outline-variant bg-surface-container-low px-5 py-4 text-left transition hover:bg-surface-container-high"
              aria-expanded={overheadOpen}
            >
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-white">
                  3
                </span>
                <div>
                  <p className="font-heading text-label-md font-semibold uppercase tracking-wider text-primary">
                    {t("page.step3", "Step 3: Non-Ingredient Costs")}
                  </p>
                  <h2 className="font-heading text-title-md text-onSurface">
                    {t("calc.sectionOverhead", "Operating & Labor Costs")}
                  </h2>
                </div>
              </div>
              <span
                className={`grid h-8 w-8 place-items-center rounded-full border border-outline-variant transition ${
                  overheadOpen
                    ? "bg-secondary text-white"
                    : "bg-white text-secondary"
                }`}
                aria-hidden="true"
              >
                {overheadOpen ? "−" : "+"}
              </span>
            </button>
            {overheadOpen && (
              <div className="p-5">
                <OverheadInput
                  overhead={currentRecipe?.overhead ?? EMPTY_OVERHEAD}
                  laborConfig={currentRecipe?.laborConfig}
                  onChange={handleOverheadChange}
                  onLaborConfigChange={handleLaborConfigChange}
                />
              </div>
            )}
          </section>

          <section className="overflow-hidden rounded-chef-xl border border-outline-variant bg-surface-container-lowest shadow-chef-sm">
            <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-low px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-white">
                  4
                </span>
                <div>
                  <p className="font-heading text-label-md font-semibold uppercase tracking-wider text-primary">
                    {t("page.step4", "Step 4: Select Pricing Method")}
                  </p>
                  <h2 className="font-heading text-title-md text-onSurface">
                    {t("calc.sectionPricing", "Pricing Strategy")}
                  </h2>
                </div>
              </div>
            </div>
            <div className="p-5">
              <PricingMethodSelector
                pricing={
                  currentRecipe?.pricing ?? { method: "markup", markupMultiplier: 3 }
                }
                onChange={handlePricingChange}
              />
              {currentRecipe?.pricing.method === "market" && (
                <div className="mt-5">
                  <MarketPriceInput
                    prices={currentRecipe.pricing.competitorPrices ?? []}
                    onChange={handleCompetitorPricesChange}
                  />
                </div>
              )}
            </div>
          </section>

          {error && (
            <p
              className="rounded-chef-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
              role="alert"
            >
              {error}
            </p>
          )}

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <button
              type="button"
              onClick={() => router.push("/saved-recipes")}
              className="inline-flex w-full items-center justify-center rounded-chef-lg border border-outline bg-white px-4 py-2.5 font-heading text-label-md font-bold text-onSurface transition hover:bg-surface-container-low sm:w-auto"
            >
              {t("btn.savedRecipes", "Saved Recipes")}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex w-full items-center justify-center rounded-chef-lg border border-outline bg-white px-4 py-2.5 font-heading text-label-md font-bold text-onSurface transition hover:bg-surface-container-low sm:w-auto"
            >
              {t("btn.reset", "Reset")}
            </button>
          </div>
        </div>

        <div className="lg:col-span-4">
          <ResultSidebar
            result={result}
            pricing={currentRecipe?.pricing}
            hasIngredients={hasIngredients}
          />
        </div>
      </div>
    </div>
  );
}
