"use client";

import { useTranslation } from "react-i18next";
import type { PricingConfig, PricingMethod } from "@/lib/types";
import {
  DEFAULT_FOOD_COST_PERCENT,
  DEFAULT_MARKUP_MULTIPLIER,
  MAX_FOOD_COST_PERCENT,
  MAX_MARKUP_MULTIPLIER,
  MIN_FOOD_COST_PERCENT,
  MIN_MARKUP_MULTIPLIER,
} from "@/lib/constants";

interface PricingMethodSelectorProps {
  pricing: PricingConfig;
  onChange: (config: PricingConfig) => void;
}

const METHODS: PricingMethod[] = ["foodCost", "markup", "market"];

const PricingMethodSelector = ({ pricing, onChange }: PricingMethodSelectorProps) => {
  const { t } = useTranslation();

  const setMethod = (method: PricingMethod): void => {
    const next: PricingConfig = { method };
    if (method === "foodCost")
      next.targetFoodCostPercent =
        pricing.targetFoodCostPercent ?? DEFAULT_FOOD_COST_PERCENT;
    if (method === "markup")
      next.markupMultiplier =
        pricing.markupMultiplier ?? DEFAULT_MARKUP_MULTIPLIER;
    if (method === "market")
      next.competitorPrices = pricing.competitorPrices ?? [];
    onChange(next);
  };

  const methodLabelKey = (m: PricingMethod): string => {
    if (m === "foodCost") return t("calc.targetFoodCost", "Target Food Cost %");
    if (m === "markup") return t("calc.markupMultiplier", "Markup Multiplier");
    return t("calc.marketComparison", "Market Comparison");
  };

  return (
    <div className="space-y-5" data-testid="pricing-method-selector">
      <div
        className="flex gap-1 rounded-chef-lg bg-surface-container-low p-1"
        role="tablist"
        aria-label={t("calc.sectionPricing", "Pricing Strategy")}
      >
        {METHODS.map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={pricing.method === m}
            onClick={() => setMethod(m)}
            className={`flex-1 rounded-chef px-3 py-2 font-heading text-label-md transition ${
              pricing.method === m
                ? "bg-white text-primary font-bold shadow-chef-sm"
                : "text-onSurface-variant hover:text-onSurface"
            }`}
          >
            {methodLabelKey(m)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
        {pricing.method === "foodCost" && (
          <>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-onSurface">
                  {t("calc.setTargetFoodCost", "Set your target food cost percentage")}
                </span>
                <span className="text-data-mono font-bold text-primary">
                  {pricing.targetFoodCostPercent ?? DEFAULT_FOOD_COST_PERCENT}%
                </span>
              </div>
              <input
                type="range"
                min={MIN_FOOD_COST_PERCENT}
                max={MAX_FOOD_COST_PERCENT}
                value={pricing.targetFoodCostPercent ?? DEFAULT_FOOD_COST_PERCENT}
                onChange={(e) =>
                  onChange({
                    ...pricing,
                    targetFoodCostPercent: parseFloat(e.target.value),
                  })
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-container-highest accent-primary"
                aria-label={t("method.targetPercent", "Target Food Cost (%)")}
              />
              <p className="text-xs text-onSurface-variant">
                {t(
                  "msg.foodCostHelp",
                  "Most fine dining establishments aim for 28-32%. A higher target means a lower price."
                )}
              </p>
            </div>
            <div className="rounded-chef-lg border border-primary/20 bg-primary/5 p-4">
              <div className="mb-1.5 flex items-center gap-1.5">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-primary"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                <span className="font-heading text-label-md font-bold text-primary">
                  {t("calc.calculationNote", "Calculation Note")}
                </span>
              </div>
              <p className="text-xs text-onSurface-variant">
                {t("calc.calculationNoteText", "Optimal price will be adjusted automatically based on your total calculated base cost.")}
              </p>
            </div>
          </>
        )}

        {pricing.method === "markup" && (
          <>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-onSurface">
                  {t("calc.setMarkupMultiplier", "Set your markup multiplier")}
                </span>
                <span className="text-data-mono font-bold text-primary">
                  {(pricing.markupMultiplier ?? DEFAULT_MARKUP_MULTIPLIER).toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min={MIN_MARKUP_MULTIPLIER * 10}
                max={MAX_MARKUP_MULTIPLIER * 10}
                value={
                  Math.round((pricing.markupMultiplier ?? DEFAULT_MARKUP_MULTIPLIER) * 10)
                }
                onChange={(e) =>
                  onChange({
                    ...pricing,
                    markupMultiplier: parseFloat(e.target.value) / 10,
                  })
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-container-highest accent-primary"
                aria-label={t("method.multiplier", "Multiplier")}
              />
              <p className="text-xs text-onSurface-variant">
                {t(
                  "msg.markupHelp",
                  "A 3x multiplier means the selling price is 3 times the base cost."
                )}
              </p>
            </div>
            <div className="rounded-chef-lg border border-primary/20 bg-primary/5 p-4">
              <div className="mb-1.5 flex items-center gap-1.5">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-primary"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                <span className="font-heading text-label-md font-bold text-primary">
                  {t("calc.calculationNote", "Calculation Note")}
                </span>
              </div>
              <p className="text-xs text-onSurface-variant">
                {t("calc.calculationNoteText", "Optimal price will be adjusted automatically based on your total calculated base cost.")}
              </p>
            </div>
          </>
        )}

        {pricing.method === "market" && (
          <p className="rounded-chef border border-outline-variant bg-surface-container-low p-4 text-sm text-onSurface-variant md:col-span-2">
            {t(
              "calc.addCompetitorPrices",
              "Add 2-10 competitor prices to compare"
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default PricingMethodSelector;
