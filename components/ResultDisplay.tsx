"use client";

import { useTranslation } from "react-i18next";
import type { CalculationResult, PricingConfig } from "@/lib/types";
import { formatCurrency } from "@/lib/formatting";
import CircularProgress from "./CircularProgress";

interface ResultDisplayProps {
  result: CalculationResult;
  pricing?: PricingConfig;
}

const ResultDisplay = ({ result, pricing }: ResultDisplayProps) => {
  const { t } = useTranslation();

  const hasMargin =
    typeof result.profitMargin === "number" && result.profitMargin > 0;

  const recommendedPrice = (() => {
    if (result.foodCostPrice !== undefined) return result.foodCostPrice;
    if (result.markupPrice !== undefined) return result.markupPrice;
    if (
      result.marketMin !== undefined &&
      result.marketMax !== undefined
    ) {
      return Math.round((result.marketMin + result.marketMax) / 2);
    }
    return undefined;
  })();

  return (
    <div className="space-y-5" data-testid="result-display">
      {hasMargin && (
        <div className="rounded-chef-lg border border-surface-container-high bg-white p-5 shadow-chef-sm sm:p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
            <CircularProgress
              value={result.profitMargin ?? 0}
              size={112}
              strokeWidth={10}
              label={t("result.profitMargin", "Margin Keuntungan")}
            />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-heading text-lg font-semibold text-onSurface sm:text-xl">
                {t("result.profitMargin", "Margin Keuntungan")}
              </h3>
              {pricing?.method === "foodCost" &&
                typeof result.targetMargin === "number" && (
                  <p className="mt-1 text-sm text-onSurface-variant">
                    {t("result.targetMargin", "Target Margin")}:{" "}
                    <span className="font-semibold text-onSurface">
                      {result.targetMargin.toFixed(1)}%
                    </span>
                  </p>
                )}
              {pricing?.method === "markup" &&
                typeof result.targetMargin === "number" && (
                  <p className="mt-1 text-sm text-onSurface-variant">
                    {t("result.targetMargin", "Target Margin")}:{" "}
                    <span className="font-semibold text-onSurface">
                      ~{result.targetMargin.toFixed(1)}%
                    </span>
                  </p>
                )}
              {recommendedPrice !== undefined && (
                <>
                  <p className="mt-3 text-xs uppercase tracking-wider text-onSurface-variant">
                    {t("result.recommendation", "Rekomendasi Harga")}
                  </p>
                  <p className="text-data-mono text-2xl font-bold text-primary sm:text-3xl">
                    {formatCurrency(recommendedPrice)}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="section-title mb-3">
          {t("result.costBreakdown", "Rincian Biaya per Porsi")}
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <CostCard
            label={t("result.ingredientCost", "Biaya Bahan")}
            value={formatCurrency(result.ingredientCostPerPortion)}
            accent="bg-primary"
          />
          <CostCard
            label={t("result.packagingCost", "Biaya Kemasan")}
            value={formatCurrency(result.packagingCostPerPortion)}
            accent="bg-primary/80"
          />
          <CostCard
            label={t("result.overheadCost", "Biaya Overhead")}
            value={formatCurrency(result.overheadCostPerPortion)}
            accent="bg-primary/70"
          />
          <CostCard
            label={t("result.laborCost", "Biaya Tenaga Kerja")}
            value={formatCurrency(result.laborCostPerPortion)}
            accent="bg-primary/60"
          />
          <div className="relative overflow-hidden rounded-chef-lg bg-primary p-4 text-white shadow-chef">
            <span className="absolute inset-y-0 left-0 w-1 bg-tertiary" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
              {t("result.totalModal", "Total Modal")}
            </p>
            <p className="text-data-mono mt-1 text-xl font-bold sm:text-2xl">
              {formatCurrency(result.totalModalPerPortion)}
            </p>
          </div>
        </div>
      </div>

      {!hasMargin && (
        <div>
          <h3 className="section-title mb-3">
            {t("result.recommendation", "Rekomendasi Harga")}
          </h3>
          <div className="space-y-2.5">
            {result.foodCostPrice !== undefined && (
              <ResultRow
                label={t("result.foodCostResult", "Harga (Food Cost)")}
                value={formatCurrency(result.foodCostPrice)}
              />
            )}
            {result.markupPrice !== undefined && (
              <ResultRow
                label={t("result.markupResult", "Harga (Markup)")}
                value={formatCurrency(result.markupPrice)}
              />
            )}
            {result.marketMin !== undefined && (
              <div className="rounded-chef border border-surface-container-high bg-surface-container-lowest p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-onSurface-variant">
                    {t("result.marketRange", "Range Pasar")}
                  </span>
                  <span className="text-data-mono font-bold text-primary">
                    {formatCurrency(result.marketMin)} –{" "}
                    {formatCurrency(result.marketMax ?? 0)}
                  </span>
                </div>
                {result.marketMedian !== undefined && (
                  <div className="mt-1.5 flex items-center justify-between text-sm">
                    <span className="text-onSurface-variant">
                      {t("result.marketAverage", "Rata-Rata Pasar")}
                    </span>
                    <span className="text-data-mono text-onSurface">
                      {formatCurrency(result.marketMedian)}
                    </span>
                  </div>
                )}
                {result.marketPosition && (
                  <div className="mt-1.5 text-xs text-onSurface-variant">
                    {t("result.marketPosition", "Posisi Anda")}:{" "}
                    <span className="font-semibold text-onSurface">
                      {t(
                        `result.${
                          result.marketPosition === "at"
                            ? "atAverage"
                            : result.marketPosition === "below"
                              ? "belowAverage"
                              : "aboveAverage"
                        }`,
                        result.marketPosition
                      )}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface CostCardProps {
  label: string;
  value: string;
  accent: string;
}

const CostCard = ({ label, value, accent }: CostCardProps) => (
  <div className="relative overflow-hidden rounded-chef border border-surface-container-high bg-white p-4 shadow-chef-sm">
    <span
      className={`absolute inset-y-0 left-0 w-1 ${accent}`}
      aria-hidden="true"
    />
    <p className="text-xs font-semibold uppercase tracking-wider text-onSurface-variant">
      {label}
    </p>
    <p className="text-data-mono mt-1 text-base font-bold text-onSurface sm:text-lg">
      {value}
    </p>
  </div>
);

interface ResultRowProps {
  label: string;
  value: string;
}

const ResultRow = ({ label, value }: ResultRowProps) => (
  <div className="flex items-center justify-between rounded-chef border border-surface-container-high bg-white px-3 py-2.5 shadow-chef-sm">
    <span className="text-sm text-onSurface-variant">{label}</span>
    <span className="text-data-mono font-bold text-primary">{value}</span>
  </div>
);

export default ResultDisplay;
