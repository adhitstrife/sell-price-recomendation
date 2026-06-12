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
import ResultDisplay from "@/components/ResultDisplay";

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
    <div className="space-y-5 sm:space-y-6">
      <div className="card-chef-lg">
        <div className="mb-3 flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-white">
            1
          </span>
          <h2 className="section-title">{t("page.step1")}</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="space-y-1.5">
            <span className="label-chef">{t("form.menuName")}</span>
            <input
              type="text"
              value={currentRecipe?.name ?? ""}
              onChange={(e) => handleMenuNameChange(e.target.value)}
              placeholder={t("form.menuName")}
              className="input-chef"
            />
          </label>
          <label className="space-y-1.5">
            <span className="label-chef">{t("form.portions")}</span>
            <input
              type="number"
              min={1}
              value={currentRecipe?.portions ?? 1}
              onChange={(e) =>
                handlePortionsChange(parseInt(e.target.value, 10) || 1)
              }
              className="input-mono"
            />
          </label>
        </div>
      </div>

      <div className="card-chef-lg">
        <div className="mb-3 flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-white">
            2
          </span>
          <h2 className="section-title">{t("page.step2")}</h2>
        </div>
        <IngredientInput onAdd={handleAddIngredient} />
        <div className="mt-4">
          <IngredientList
            ingredients={currentRecipe?.ingredients ?? []}
            onDelete={handleDeleteIngredient}
          />
        </div>
      </div>

      <div className="card-chef-lg overflow-hidden p-0">
        <button
          type="button"
          onClick={() => setOverheadOpen((prev) => !prev)}
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-surface-container-low sm:px-6"
          aria-expanded={overheadOpen}
        >
          <span className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-white">
              3
            </span>
            <span className="section-title">{t("page.step3")}</span>
          </span>
          <span
            className={`grid h-8 w-8 place-items-center rounded-full border border-outline-variant text-secondary transition ${
              overheadOpen ? "bg-secondary text-white" : "bg-white"
            }`}
            aria-hidden="true"
          >
            {overheadOpen ? "−" : "+"}
          </span>
        </button>
        {overheadOpen && (
          <div className="border-t border-surface-container-high bg-surface-container-lowest px-5 py-4 sm:px-6 sm:py-5">
            <OverheadInput
              overhead={currentRecipe?.overhead ?? EMPTY_OVERHEAD}
              laborConfig={currentRecipe?.laborConfig}
              onChange={handleOverheadChange}
              onLaborConfigChange={handleLaborConfigChange}
            />
          </div>
        )}
      </div>

      <div className="card-chef-lg">
        <div className="mb-3 flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-white">
            4
          </span>
          <h2 className="section-title">{t("page.step4")}</h2>
        </div>
        <PricingMethodSelector
          pricing={
            currentRecipe?.pricing ?? { method: "markup", markupMultiplier: 3 }
          }
          onChange={handlePricingChange}
        />
        {currentRecipe?.pricing.method === "market" && (
          <div className="mt-4">
            <MarketPriceInput
              prices={currentRecipe.pricing.competitorPrices ?? []}
              onChange={handleCompetitorPricesChange}
            />
          </div>
        )}
      </div>

      <div className="card-chef-lg">
        <h2 className="section-title mb-3">{t("page.results")}</h2>
        {result && hasIngredients ? (
          <ResultDisplay result={result} pricing={currentRecipe?.pricing} />
        ) : (
          <p className="rounded-chef border border-dashed border-outline-variant bg-surface-container-lowest px-4 py-6 text-center text-sm italic text-onSurface-variant">
            {t("page.noResults")}
          </p>
        )}
      </div>

      {error && (
        <p
          className="rounded-chef border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}

      <div className="sticky bottom-0 -mx-4 border-t border-surface-container-high bg-surface/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-chef-lg sm:border sm:px-4 sm:shadow-chef-lg">
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={!currentRecipe?.name.trim() || saving}
            className="btn-primary w-full sm:flex-1"
          >
            {t("btn.save")}
          </button>
          <button
            type="button"
            onClick={() => router.push("/saved-recipes")}
            className="btn-secondary w-full sm:w-auto"
          >
            {t("btn.savedRecipes")}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary w-full sm:w-auto"
          >
            {t("btn.reset")}
          </button>
        </div>
      </div>
    </div>
  );
}
