"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useRecipe } from "@/contexts/RecipeContext";
import { useAlert } from "@/contexts/AlertContext";
import { saveRecipe as storageSaveRecipe } from "@/lib/storage";
import type { Recipe } from "@/lib/types";
import CircularSpinner from "@/components/CircularSpinner";

const generateUUID = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return crypto.randomUUID();
  return `recipe-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const methodLabel = (
  method: Recipe["pricing"]["method"],
  t: (key: string, fallback: string) => string
): string => {
  if (method === "foodCost") return t("method.foodCost", "Food Cost %");
  if (method === "markup") return t("method.markup", "Markup");
  return t("method.market", "Market");
};

const formatDate = (ts: number, locale: "id" | "en" = "id"): string => {
  try {
    return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(ts));
  } catch {
    return new Date(ts).toISOString().slice(0, 10);
  }
};

export default function SavedRecipesPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { allRecipes, isLoading, error, loadAllRecipes, loadRecipe, deleteRecipe } =
    useRecipe();
  const { showSuccess, showError } = useAlert();
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    loadAllRecipes();
  }, [loadAllRecipes]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return [...allRecipes]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .filter((r) => r.name.toLowerCase().includes(q));
  }, [allRecipes, search]);

  const handleView = async (id: string): Promise<void> => {
    try {
      await loadRecipe(id);
      router.push("/calculator");
    } catch (e) {
      showError(e instanceof Error ? e.message : t("msg.errorGeneric"));
    }
  };

  const handleDuplicate = async (recipe: Recipe): Promise<void> => {
    try {
      setBusyId(recipe.id);
      const clone: Recipe = {
        ...recipe,
        id: generateUUID(),
        name: `${recipe.name} (Copy)`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      storageSaveRecipe(clone);
      await loadAllRecipes();
      showSuccess(t("msg.duplicateSuccess"));
    } catch (e) {
      showError(e instanceof Error ? e.message : t("msg.errorGeneric"));
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      setBusyId(id);
      await deleteRecipe(id);
      setDeleteConfirm(null);
      showSuccess(t("msg.deleteSuccess"));
    } catch (e) {
      showError(e instanceof Error ? e.message : t("msg.errorGeneric"));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="card-chef-lg flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
            {t("page.savedRecipes")}
          </h1>
          <p className="mt-1 text-sm text-onSurface-variant">
            {allRecipes.length > 0
              ? `${allRecipes.length} ${t("page.savedRecipes").toLowerCase()}`
              : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/calculator")}
          className="btn-primary w-full sm:w-auto"
        >
          + {t("page.createNew")}
        </button>
      </div>

      {allRecipes.length > 0 && (
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("form.menuName")}
            aria-label={t("form.menuName")}
            className="input-chef pl-10"
          />
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-onSurface-variant"
            aria-hidden="true"
          >
            🔎
          </span>
        </div>
      )}

      {isLoading && (
        <div
          className="flex items-center justify-center py-12"
          role="status"
        >
          <CircularSpinner size={40} label="Loading recipes" />
        </div>
      )}

      {error && (
        <p
          className="rounded-chef border border-tertiary/30 bg-tertiary/5 px-3 py-2 text-sm text-tertiary"
          role="alert"
        >
          {error}
        </p>
      )}

      {!isLoading && allRecipes.length === 0 && (
        <div className="card-chef-lg text-center">
          <span
            className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-surface-container-low text-2xl"
            aria-hidden="true"
          >
            📋
          </span>
          <p className="text-onSurface-variant">{t("msg.noSavedRecipes")}</p>
          <button
            type="button"
            onClick={() => router.push("/calculator")}
            className="btn-primary mt-4 w-full sm:w-auto"
          >
            + {t("page.createNew")}
          </button>
        </div>
      )}

      {!isLoading && allRecipes.length > 0 && filtered.length === 0 && (
        <p className="rounded-chef border border-dashed border-outline-variant bg-surface-container-lowest px-4 py-6 text-center text-sm italic text-onSurface-variant">
          {t("msg.noSavedRecipes")}
        </p>
      )}

      <ul className="grid gap-3 sm:grid-cols-2">
        {filtered.map((recipe) => (
          <li
            key={recipe.id}
            className="rounded-chef-lg border border-surface-container-high bg-white p-4 shadow-chef-sm transition hover:shadow-chef sm:p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-heading text-lg font-semibold text-onSurface">
                  {recipe.name}
                </h3>
                <p className="mt-0.5 text-sm text-onSurface-variant">
                  {t("form.portions")}: {recipe.portions} ·{" "}
                  {methodLabel(recipe.pricing.method, t)}
                </p>
                <p className="mt-1 text-xs text-onSurface-variant/80">
                  {t("msg.updated")}:{" "}
                  {formatDate(
                    recipe.updatedAt,
                    (i18n.language as "id" | "en") || "id"
                  )}
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 border-t border-surface-container-high pt-3">
              <button
                type="button"
                onClick={() => handleView(recipe.id)}
                className="btn-primary flex-1 py-1.5 text-xs sm:flex-none sm:px-3"
              >
                {t("btn.edit")}
              </button>
              <button
                type="button"
                onClick={() => handleDuplicate(recipe)}
                disabled={busyId === recipe.id}
                className="btn-secondary flex-1 py-1.5 text-xs sm:flex-none sm:px-3"
              >
                {t("btn.duplicate")}
              </button>
              <button
                type="button"
                onClick={() => setDeleteConfirm(recipe.id)}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-chef border border-transparent bg-tertiary/10 px-3 py-1.5 text-xs font-semibold text-tertiary transition hover:border-tertiary/30 hover:bg-tertiary/15 disabled:opacity-50 sm:flex-none"
              >
                {t("btn.delete")}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {deleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-onSurface/50 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-chef-lg bg-white p-6 shadow-chef-overlay">
            <h2 className="font-heading text-lg font-semibold text-onSurface">
              {t("btn.delete")}
            </h2>
            <p className="mt-2 text-sm text-onSurface-variant">
              {t("msg.confirmDelete")}
            </p>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="btn-secondary w-full sm:w-auto"
              >
                {t("btn.cancel")}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirm)}
                disabled={busyId === deleteConfirm}
                className="btn-danger w-full sm:w-auto"
              >
                {t("btn.delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
