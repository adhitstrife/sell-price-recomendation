"use client";

import { useTranslation } from "react-i18next";
import { MAX_COMPETITOR_PRICES, MIN_COMPETITOR_PRICES } from "@/lib/constants";

interface MarketPriceInputProps {
  prices: number[];
  onChange: (prices: number[]) => void;
}

const MarketPriceInput = ({ prices, onChange }: MarketPriceInputProps) => {
  const { t } = useTranslation();

  const addPrice = (): void => {
    if (prices.length >= MAX_COMPETITOR_PRICES) return;
    onChange([...prices, 0]);
  };

  const updatePrice = (index: number, value: number): void => {
    const next = [...prices];
    next[index] = value;
    onChange(next);
  };

  const removePrice = (index: number): void => {
    onChange(prices.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3 rounded-chef border border-surface-container-high bg-surface-container-lowest p-4 sm:p-5">
      <h3 className="font-heading text-base font-semibold text-onSurface">
        {t("method.market", "Harga Kompetitor")}
      </h3>
      {prices.length < MIN_COMPETITOR_PRICES && (
        <p
          className="rounded-chef border border-tertiary/30 bg-tertiary/5 px-3 py-2 text-sm text-tertiary"
          role="alert"
        >
          {t("method.minCompetitors", "Minimal 2 harga kompetitor")}
        </p>
      )}
      <div className="space-y-2">
        {prices.map((price, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-chef bg-surface-container-low text-sm font-bold text-secondary">
              {i + 1}
            </span>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => updatePrice(i, parseFloat(e.target.value) || 0)}
              placeholder={t("method.competitorPrice", "Harga Kompetitor (Rp)")}
              aria-label={`${t("method.competitorPrice", "Harga Kompetitor")} ${i + 1}`}
              className="input-mono flex-1"
            />
            <button
              type="button"
              onClick={() => removePrice(i)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-chef text-tertiary transition hover:bg-tertiary/10"
              aria-label={`Remove price ${i + 1}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addPrice}
        disabled={prices.length >= MAX_COMPETITOR_PRICES}
        className="btn-secondary w-full sm:w-auto"
      >
        + {t("method.addCompetitor", "Tambah Harga Kompetitor")}
      </button>
    </div>
  );
};

export default MarketPriceInput;
