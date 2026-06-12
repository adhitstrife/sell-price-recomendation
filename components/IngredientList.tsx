"use client";

import { useTranslation } from "react-i18next";
import type { Ingredient } from "@/lib/types";
import { formatCurrency } from "@/lib/formatting";
import { calculateIngredientCost } from "@/lib/unitConversion";

interface IngredientListProps {
  ingredients: Ingredient[];
  onDelete: (id: string) => void;
}

const IngredientList = ({ ingredients, onDelete }: IngredientListProps) => {
  const { t } = useTranslation();

  if (ingredients.length === 0) {
    return (
      <div className="rounded-chef border border-dashed border-outline-variant bg-surface-container-lowest px-4 py-6 text-center text-sm italic text-onSurface-variant">
        {t("form.noIngredients", "Belum ada bahan. Tambahkan bahan di atas.")}
      </div>
    );
  }

  return (
    <>
      {/* Desktop: table */}
      <div className="hidden overflow-hidden rounded-chef border border-surface-container-high bg-white shadow-chef-sm md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-secondary">
                {t("form.ingredientName", "Nama Bahan")}
              </th>
              <th className="px-4 py-3 text-right font-semibold text-secondary">
                {t("form.pricePerUnit", "Harga/Unit")}
              </th>
              <th className="px-4 py-3 text-center font-semibold text-secondary">
                {t("form.unit", "Satuan")}
              </th>
              <th className="px-4 py-3 text-right font-semibold text-secondary">
                {t("form.amountPerPortion", "Takaran")}
              </th>
              <th className="px-4 py-3 text-center font-semibold text-secondary">
                {t("form.amountUnit", "Satuan Takaran")}
              </th>
              <th className="px-4 py-3 text-right font-semibold text-secondary">
                Cost
              </th>
              <th className="px-4 py-3 text-center font-semibold text-secondary">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-high">
            {ingredients.map((ing) => (
              <tr key={ing.id} className="transition hover:bg-surface-container-low">
                <td className="px-4 py-3 font-medium text-onSurface">
                  {ing.name}
                </td>
                <td className="text-data-mono px-4 py-3 text-right text-onSurface">
                  {formatCurrency(ing.pricePerUnit)}
                </td>
                <td className="px-4 py-3 text-center text-onSurface-variant">
                  {ing.unit}
                </td>
                <td className="text-data-mono px-4 py-3 text-right text-onSurface">
                  {ing.amountPerPortion}
                </td>
                <td className="px-4 py-3 text-center text-onSurface-variant">
                  {ing.amountUnit}
                </td>
                <td className="text-data-mono px-4 py-3 text-right font-semibold text-primary">
                  {formatCurrency(calculateIngredientCost(ing))}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => onDelete(ing.id)}
                    aria-label={`${t("form.deleteIngredient", "Hapus")} ${ing.name}`}
                    className="rounded-chef border border-transparent px-2.5 py-1 text-xs font-semibold text-tertiary transition hover:border-tertiary/30 hover:bg-tertiary/5"
                  >
                    {t("form.deleteIngredient", "Hapus")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: card list */}
      <ul className="space-y-2.5 md:hidden">
        {ingredients.map((ing) => (
          <li
            key={ing.id}
            className="rounded-chef border border-surface-container-high bg-white p-3.5 shadow-chef-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-semibold text-onSurface">{ing.name}</h4>
              <button
                type="button"
                onClick={() => onDelete(ing.id)}
                aria-label={`${t("form.deleteIngredient", "Hapus")} ${ing.name}`}
                className="grid h-7 w-7 place-items-center rounded-full text-tertiary transition hover:bg-tertiary/10"
              >
                ✕
              </button>
            </div>
            <dl className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div>
                <dt className="text-onSurface-variant">
                  {t("form.pricePerUnit", "Harga/Unit")}
                </dt>
                <dd className="text-data-mono font-medium text-onSurface">
                  {formatCurrency(ing.pricePerUnit)} / {ing.unit}
                </dd>
              </div>
              <div>
                <dt className="text-onSurface-variant">
                  {t("form.amountPerPortion", "Takaran")}
                </dt>
                <dd className="text-data-mono font-medium text-onSurface">
                  {ing.amountPerPortion} {ing.amountUnit}
                </dd>
              </div>
            </dl>
            <div className="mt-2.5 flex items-center justify-between rounded-chef bg-surface-container-low px-3 py-2">
              <span className="text-xs font-semibold text-onSurface-variant">
                Cost
              </span>
              <span className="text-data-mono text-sm font-bold text-primary">
                {formatCurrency(calculateIngredientCost(ing))}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default IngredientList;
