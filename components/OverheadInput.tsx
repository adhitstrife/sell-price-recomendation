"use client";

import { useTranslation } from "react-i18next";
import type { LaborConfig, Overhead } from "@/lib/types";

interface OverheadInputProps {
  overhead: Overhead;
  laborConfig?: LaborConfig;
  onChange: (overhead: Overhead) => void;
  onLaborConfigChange: (config: LaborConfig | undefined) => void;
}

const OverheadInput = ({
  overhead,
  laborConfig,
  onChange,
  onLaborConfigChange,
}: OverheadInputProps) => {
  const { t } = useTranslation();

  const updateField = (
    field: keyof Omit<Overhead, "labor">,
    value: number
  ): void => {
    onChange({ ...overhead, [field]: value });
  };

  const updateLabor = (updates: Partial<LaborConfig>): void => {
    onLaborConfigChange({ ...(laborConfig ?? { model: null }), ...updates });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="space-y-1.5">
          <span className="label-chef">
            {t("form.packaging", "Kemasan per Porsi (Rp)")}
          </span>
          <input
            type="number"
            min="0"
            value={overhead.packagingPerPortion}
            onChange={(e) =>
              updateField(
                "packagingPerPortion",
                parseFloat(e.target.value) || 0
              )
            }
            className="input-mono"
          />
        </label>
        <label className="space-y-1.5">
          <span className="label-chef">
            {t("form.overheadPerPortion", "Overhead per Porsi (Rp)")}
          </span>
          <input
            type="number"
            min="0"
            value={overhead.overheadPerPortion}
            onChange={(e) =>
              updateField(
                "overheadPerPortion",
                parseFloat(e.target.value) || 0
              )
            }
            className="input-mono"
          />
        </label>
      </div>

      <div className="rounded-chef border border-surface-container-high bg-surface-container-lowest p-4 sm:p-5">
        <h4 className="font-heading text-base font-semibold text-onSurface">
          {t("form.labor", "Biaya Tenaga Kerja")}
        </h4>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => updateLabor({ model: "modelA" })}
            className={
              laborConfig?.model === "modelA" ? "chip-active" : "chip"
            }
            aria-pressed={laborConfig?.model === "modelA"}
          >
            {t("form.laborModelA", "Model A: Per-Batch")}
          </button>
          <button
            type="button"
            onClick={() => updateLabor({ model: "modelB" })}
            className={
              laborConfig?.model === "modelB" ? "chip-active" : "chip"
            }
            aria-pressed={laborConfig?.model === "modelB"}
          >
            {t("form.laborModelB", "Model B: Alokasi Bulanan")}
          </button>
        </div>

        {laborConfig?.model === "modelA" && (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <label className="space-y-1.5">
              <span className="label-chef">
                {t("form.batchTime", "Waktu Masak (menit)")}
              </span>
              <input
                type="number"
                min="0"
                value={laborConfig.batchTimeMinutes ?? 0}
                onChange={(e) =>
                  updateLabor({
                    batchTimeMinutes: parseFloat(e.target.value) || 0,
                  })
                }
                className="input-mono"
              />
            </label>
            <label className="space-y-1.5">
              <span className="label-chef">
                {t("form.hourlyRate", "Tarif per Jam (Rp)")}
              </span>
              <input
                type="number"
                min="0"
                value={laborConfig.hourlyRate ?? 0}
                onChange={(e) =>
                  updateLabor({ hourlyRate: parseFloat(e.target.value) || 0 })
                }
                className="input-mono"
              />
            </label>
            <label className="space-y-1.5">
              <span className="label-chef">
                {t("form.portionsPerBatch", "Porsi per Batch")}
              </span>
              <input
                type="number"
                min="1"
                value={laborConfig.portionsPerBatch ?? 1}
                onChange={(e) =>
                  updateLabor({
                    portionsPerBatch: parseFloat(e.target.value) || 1,
                  })
                }
                className="input-mono"
              />
            </label>
          </div>
        )}
        {laborConfig?.model === "modelB" && (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="space-y-1.5">
              <span className="label-chef">
                {t("form.monthlySalary", "Total Gaji Bulanan (Rp)")}
              </span>
              <input
                type="number"
                min="0"
                value={laborConfig.totalMonthlySalary ?? 0}
                onChange={(e) =>
                  updateLabor({
                    totalMonthlySalary: parseFloat(e.target.value) || 0,
                  })
                }
                className="input-mono"
              />
            </label>
            <label className="space-y-1.5">
              <span className="label-chef">
                {t("form.monthlyPortions", "Estimasi Porsi per Bulan")}
              </span>
              <input
                type="number"
                min="1"
                value={laborConfig.estimatedMonthlyPortions ?? 1}
                onChange={(e) =>
                  updateLabor({
                    estimatedMonthlyPortions: parseFloat(e.target.value) || 1,
                  })
                }
                className="input-mono"
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverheadInput;
