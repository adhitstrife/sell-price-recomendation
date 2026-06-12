"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Ingredient, Unit } from "@/lib/types";

interface IngredientInputProps {
  onAdd: (ingredient: Ingredient) => void;
}

const PURCHASE_UNITS: Unit[] = [
  "kg",
  "gram",
  "liter",
  "ml",
  "pack",
  "pcs",
  "sachet",
  "sendok",
  "gelas",
];
const PORTION_UNITS: Unit[] = [
  "gram",
  "kg",
  "ml",
  "liter",
  "pcs",
  "pack",
];

const generateUUID = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return crypto.randomUUID();
  return `ing-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const IngredientInput = ({ onAdd }: IngredientInputProps) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [unit, setUnit] = useState<Unit>("kg");
  const [amountPerPortion, setAmountPerPortion] = useState("");
  const [amountUnit, setAmountUnit] = useState<Unit>("gram");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const price = parseFloat(pricePerUnit);
    const amount = parseFloat(amountPerPortion);
    if (!name.trim()) {
      setError(t("msg.errorRequired", "Nama bahan wajib diisi"));
      return;
    }
    if (isNaN(price) || price < 0) {
      setError(t("msg.errorNegative", "Mohon masukkan harga yang valid"));
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      setError(t("msg.errorNegative", "Takaran harus lebih dari 0"));
      return;
    }
    onAdd({
      id: generateUUID(),
      name: name.trim(),
      pricePerUnit: price,
      unit,
      amountPerPortion: amount,
      amountUnit,
    });
    setName("");
    setPricePerUnit("");
    setAmountPerPortion("");
    setError(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-chef border border-surface-container-high bg-surface-container-lowest p-4 sm:p-5"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="space-y-1.5">
          <span className="label-chef">
            {t("form.ingredientName", "Nama Bahan")}
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("form.ingredientName", "Nama Bahan")}
            aria-label={t("form.ingredientName", "Nama Bahan")}
            className="input-chef"
          />
        </label>
        <label className="space-y-1.5">
          <span className="label-chef">
            {t("form.pricePerUnit", "Harga per Unit")}
          </span>
          <input
            type="number"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(e.target.value)}
            placeholder={t("form.pricePerUnit", "Harga per Unit")}
            aria-label={t("form.pricePerUnit", "Harga per Unit")}
            min="0"
            step="0.01"
            className="input-mono"
          />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="space-y-1.5">
          <span className="label-chef">{t("form.unit", "Satuan")}</span>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as Unit)}
            aria-label={t("form.unit", "Satuan")}
            className="input-chef appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%234a5568%22 stroke-width=%223%22 stroke-linecap=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-[right_0.75rem_center] bg-no-repeat pr-9"
          >
            {PURCHASE_UNITS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1.5">
          <span className="label-chef">
            {t("form.amountPerPortion", "Takaran")}
          </span>
          <input
            type="number"
            value={amountPerPortion}
            onChange={(e) => setAmountPerPortion(e.target.value)}
            placeholder={t("form.amountPerPortion", "Takaran")}
            aria-label={t("form.amountPerPortion", "Takaran per Porsi")}
            min="0"
            step="0.01"
            className="input-mono"
          />
        </label>
        <label className="space-y-1.5">
          <span className="label-chef">
            {t("form.amountUnit", "Satuan Takaran")}
          </span>
          <select
            value={amountUnit}
            onChange={(e) => setAmountUnit(e.target.value as Unit)}
            aria-label={t("form.amountUnit", "Satuan Takaran")}
            className="input-chef appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%234a5568%22 stroke-width=%223%22 stroke-linecap=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-[right_0.75rem_center] bg-no-repeat pr-9"
          >
            {PORTION_UNITS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </label>
      </div>
      {error && (
        <p
          className="rounded-chef border border-tertiary/30 bg-tertiary/5 px-3 py-2 text-sm text-tertiary"
          role="alert"
        >
          {error}
        </p>
      )}
      <button type="submit" className="btn-primary w-full sm:w-auto">
        + {t("form.addIngredient", "Tambah Bahan")}
      </button>
    </form>
  );
};

export default IngredientInput;
