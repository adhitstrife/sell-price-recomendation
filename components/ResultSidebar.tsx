"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import type { CalculationResult, PricingConfig } from "@/lib/types";
import { formatCurrency } from "@/lib/formatting";

interface ResultSidebarProps {
  result: CalculationResult | null;
  pricing?: PricingConfig;
  hasIngredients: boolean;
  onCompareClick?: () => void;
}

const PRO_TIP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCm-0IgOutARJccwtGu4w0z5wO6OKsatqbRDWyun9RgNysekBo445vtLUCkj1fDPX8FMWGeBB5znbOySN_PqaU3SPDTGoK9B9Tltht_XJ1cDm1M52bWLQNHKsMLsUtDfNyjHWIiJBTPxX3yr5au0OX9UEgcnGVHsQubECPGw8zXInPC-yd5lfBXhPaCqUvn42SIJy4VJ-6Rrg0WkU5M6R56C0GmiNNxlPpg-eTvdbq4gjlbqEkYbzBKapGmXG5b15tCsrzw0apyneI";

const ResultSidebar = ({ result, hasIngredients }: ResultSidebarProps) => {
  const { t } = useTranslation();

  const recommendedPrice = (() => {
    if (!result) return undefined;
    if (result.foodCostPrice !== undefined) return result.foodCostPrice;
    if (result.markupPrice !== undefined) return result.markupPrice;
    if (result.marketMin !== undefined && result.marketMax !== undefined) {
      return Math.round((result.marketMin + result.marketMax) / 2);
    }
    return undefined;
  })();

  const foodCostPct = result
    ? Math.min(100, (result.ingredientCostPerPortion / recommendedPrice!) * 100)
    : 0;
  const profitPct = result ? Math.max(0, 100 - foodCostPct) : 0;

  const marginValue = result?.profitMargin
    ? Math.round(result.profitMargin)
    : profitPct;

  const markupValue = result?.markupPrice
    ? `${(result.markupPrice / result.totalModalPerPortion).toFixed(1)}x`
    : "—";

  return (
    <aside className="space-y-5 lg:sticky lg:top-24">
      <div className="relative overflow-hidden rounded-chef-xl bg-primary p-6 text-white shadow-chef-overlay sm:p-7">
        <div
          className="absolute -bottom-6 -right-6 opacity-10"
          aria-hidden="true"
        >
          <svg
            width="160"
            height="160"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white"
          >
            <path d="M3.5 17.5l6-6 4 4L22 6.92 20.59 5.5l-7.09 8.09-4-4L2 16l1.5 1.5z" />
          </svg>
        </div>
        <div className="relative z-10">
          <span className="mb-1 block font-heading text-label-md uppercase tracking-widest text-white/70">
            {t("calc.optimalPrice", "Optimal Selling Price")}
          </span>
          <div className="flex items-baseline gap-1.5">
            {hasIngredients && recommendedPrice !== undefined ? (
              <span className="font-heading text-[2.5rem] font-extrabold leading-none">
                {formatCurrency(recommendedPrice)}
              </span>
            ) : (
              <span className="font-heading text-[2.5rem] font-extrabold leading-none text-white/60">
                —
              </span>
            )}
            <span className="font-heading text-label-md text-white/80">
              {t("calc.perPortion", "/ portion")}
            </span>
          </div>

          {hasIngredients && result && (
            <div className="mt-6 space-y-3">
              <div>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="opacity-80">{t("calc.foodCost", "Food Cost")}</span>
                  <span className="text-data-mono font-bold">
                    {formatCurrency(result.totalModalPerPortion)} ({foodCostPct.toFixed(1)}%)
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${foodCostPct}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="opacity-80">{t("calc.grossProfit", "Gross Profit")}</span>
                  <span className="text-data-mono font-bold">
                    {formatCurrency(
                      Math.max(0, (recommendedPrice ?? 0) - result.totalModalPerPortion)
                    )} ({profitPct.toFixed(1)}%)
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-primary-fixed-dim"
                    style={{ width: `${profitPct}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {!hasIngredients && (
            <p className="mt-4 rounded-chef-lg border border-white/20 bg-white/10 px-3 py-2.5 text-xs italic text-white/90">
              {t(
                "page.noResults",
                "Tambahkan bahan terlebih dahulu untuk melihat hasil"
              )}
            </p>
          )}
        </div>
      </div>

      <div
        className="rounded-chef-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-chef-sm"
        data-testid="result-display"
      >
        <h3 className="mb-4 font-heading text-title-md text-onSurface">
          {t("calc.marginInsights", "Margin Insights")}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div
              className="grid h-12 w-12 place-items-center rounded-full border-4 border-primary"
              style={{ borderTopColor: "transparent" }}
              aria-hidden="true"
            >
              <span className="text-xs font-bold text-primary">{marginValue}%</span>
            </div>
            <div>
              <span className="block font-heading text-label-md font-bold text-onSurface">
                {t("calc.profitMargin", "Profit Margin")}
              </span>
              <span className="text-xs text-onSurface-variant">
                {t("calc.exceedsIndustry", "Exceeds industry average")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="grid h-12 w-12 place-items-center rounded-full border-4 border-tertiary"
              aria-hidden="true"
            >
              <span className="text-xs font-bold text-tertiary">{markupValue}</span>
            </div>
            <div>
              <span className="block font-heading text-label-md font-bold text-onSurface">
                {t("calc.markupFactor", "Markup Factor")}
              </span>
              <span className="text-xs text-onSurface-variant">
                {t("calc.competitiveArea", "Competitive for your area")}
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="mt-5 w-full rounded-chef-lg border-2 border-dashed border-outline-variant py-2.5 font-heading text-label-md font-bold text-onSurface-variant transition hover:border-primary hover:text-primary"
        >
          {t("calc.compareCompetitors", "Compare with Competitors")}
        </button>
      </div>

      <div className="group relative h-40 overflow-hidden rounded-chef-xl">
        <Image
          src={PRO_TIP_IMAGE}
          alt="Chef workstation"
          fill
          sizes="(max-width: 1024px) 100vw, 400px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-x-4 bottom-4">
          <span className="font-heading text-label-md font-bold text-primary-fixed">
            {t("calc.proTip", "Pro Tip:")}
          </span>
          <p className="mt-1 text-xs leading-snug text-white">
            {t("calc.proTipText", "Reducing main ingredient portion by 10% could increase annual profit by Rp 12,400,000.")}
          </p>
        </div>
      </div>

      <div className="rounded-chef-xl border border-outline-variant bg-surface-container-highest p-5 text-center">
        <h4 className="mb-1.5 font-heading text-title-md text-onSurface">
          {t("calc.unlockFeatures", "Unlock Full Features")}
        </h4>
        <p className="mb-4 text-xs text-onSurface-variant">
          {t("calc.unlockFeaturesDesc", "Save unlimited recipes, track market trends, and export reports.")}
        </p>
        <button
          type="button"
          className="w-full rounded-chef-lg bg-primary py-2.5 font-heading text-label-md font-bold text-white shadow-md shadow-primary/10 transition hover:bg-[#26604a]"
        >
          {t("calc.createAccount", "Create Free Account")}
        </button>
      </div>
    </aside>
  );
};

export default ResultSidebar;
