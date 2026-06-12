import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, within, act } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n/config";
import IngredientInput from "../../components/IngredientInput";
import IngredientList from "../../components/IngredientList";
import OverheadInput from "../../components/OverheadInput";
import PricingMethodSelector from "../../components/PricingMethodSelector";
import MarketPriceInput from "../../components/MarketPriceInput";
import ResultDisplay from "../../components/ResultDisplay";
import type { CalculationResult, Ingredient, LaborConfig, Overhead, PricingConfig } from "../../lib/types";

const wrap = (ui: React.ReactNode) => (
  <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
);

beforeEach(() => {
  localStorage.clear();
});

describe("IngredientInput", () => {
  it("renders form fields", () => {
    render(wrap(<IngredientInput onAdd={vi.fn()} />));
    expect(screen.getByPlaceholderText(/Nama Bahan/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Harga per Unit/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Takaran/i)).toBeInTheDocument();
  });

  it("calls onAdd with valid data", () => {
    const onAdd = vi.fn();
    render(wrap(<IngredientInput onAdd={onAdd} />));
    act(() => {
      fireEvent.change(screen.getByPlaceholderText(/Nama Bahan/i), { target: { value: "Tepung" } });
    });
    act(() => {
      fireEvent.change(screen.getByPlaceholderText(/Harga per Unit/i), { target: { value: "15000" } });
    });
    act(() => {
      fireEvent.change(screen.getByPlaceholderText(/Takaran/i), { target: { value: "200" } });
    });
    act(() => {
      screen.getByRole("button", { name: /Tambah Bahan/i }).click();
    });
    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd.mock.calls[0][0]).toMatchObject({
      name: "Tepung",
      pricePerUnit: 15000,
      amountPerPortion: 200,
    });
  });

  it("clears inputs after successful add", () => {
    render(wrap(<IngredientInput onAdd={vi.fn()} />));
    act(() => {
      fireEvent.change(screen.getByPlaceholderText(/Nama Bahan/i), { target: { value: "Tepung" } });
    });
    act(() => {
      fireEvent.change(screen.getByPlaceholderText(/Harga per Unit/i), { target: { value: "15000" } });
    });
    act(() => {
      fireEvent.change(screen.getByPlaceholderText(/Takaran/i), { target: { value: "200" } });
    });
    act(() => {
      screen.getByRole("button", { name: /Tambah Bahan/i }).click();
    });
    expect((screen.getByPlaceholderText(/Nama Bahan/i) as HTMLInputElement).value).toBe("");
  });

  it("shows error when name is empty", () => {
    render(wrap(<IngredientInput onAdd={vi.fn()} />));
    fireEvent.click(screen.getByRole("button", { name: /Tambah Bahan/i }));
    expect(screen.queryByText(/required|wajib|valid|negative/i)).toBeTruthy();
  });

  it("does not call onAdd with invalid price", () => {
    const onAdd = vi.fn();
    render(wrap(<IngredientInput onAdd={onAdd} />));
    fireEvent.change(screen.getByPlaceholderText(/Nama Bahan/i), { target: { value: "X" } });
    fireEvent.change(screen.getByPlaceholderText(/Harga per Unit/i), { target: { value: "-1" } });
    fireEvent.change(screen.getByPlaceholderText(/Takaran/i), { target: { value: "1" } });
    fireEvent.click(screen.getByRole("button", { name: /Tambah Bahan/i }));
    expect(onAdd).not.toHaveBeenCalled();
  });

  it("clears inputs after successful add", () => {
    render(wrap(<IngredientInput onAdd={vi.fn()} />));
    fireEvent.change(screen.getByPlaceholderText(/Nama Bahan/i), { target: { value: "Tepung" } });
    fireEvent.change(screen.getByPlaceholderText(/Harga per Unit/i), { target: { value: "15000" } });
    fireEvent.change(screen.getByPlaceholderText(/Takaran/i), { target: { value: "200" } });
    fireEvent.click(screen.getByRole("button", { name: /Tambah Bahan/i }));
    expect((screen.getByPlaceholderText(/Nama Bahan/i) as HTMLInputElement).value).toBe("");
  });
});

describe("IngredientList", () => {
  const sample: Ingredient[] = [
    { id: "i1", name: "Tepung", pricePerUnit: 15000, unit: "kg", amountPerPortion: 200, amountUnit: "gram" },
  ];

  it("shows empty state when no ingredients", () => {
    render(wrap(<IngredientList ingredients={[]} onDelete={vi.fn()} />));
    expect(screen.getByText(/Belum ada bahan/i)).toBeInTheDocument();
  });

  it("renders ingredient rows with computed cost", () => {
    render(wrap(<IngredientList ingredients={sample} onDelete={vi.fn()} />));
    expect(screen.getAllByText("Tepung").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Rp\s*3\.000/).length).toBeGreaterThan(0);
  });

  it("calls onDelete when delete is clicked", () => {
    const onDelete = vi.fn();
    render(wrap(<IngredientList ingredients={sample} onDelete={onDelete} />));
    const buttons = screen.getAllByRole("button", { name: /Hapus Tepung/i });
    fireEvent.click(buttons[0]);
    expect(onDelete).toHaveBeenCalledWith("i1");
  });
});

describe("OverheadInput", () => {
  const overhead: Overhead = { packagingPerPortion: 0, overheadPerPortion: 0, laborPerPortion: 0 };
  const noLabor: LaborConfig = { model: null };

  it("renders overhead fields", () => {
    render(wrap(<OverheadInput overhead={overhead} laborConfig={noLabor} onChange={vi.fn()} onLaborConfigChange={vi.fn()} />));
    expect(screen.getByText(/Kemasan/i)).toBeInTheDocument();
    expect(screen.getByText(/Overhead/i)).toBeInTheDocument();
  });

  it("calls onChange when packaging updated", () => {
    const onChange = vi.fn();
    render(wrap(<OverheadInput overhead={overhead} laborConfig={noLabor} onChange={onChange} onLaborConfigChange={vi.fn()} />));
    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "500" } });
    expect(onChange).toHaveBeenCalledWith({ ...overhead, packagingPerPortion: 500 });
  });

  it("shows Model A inputs when modelA selected", () => {
    const modelA: LaborConfig = { model: "modelA" };
    render(wrap(<OverheadInput overhead={overhead} laborConfig={modelA} onChange={vi.fn()} onLaborConfigChange={vi.fn()} />));
    expect(screen.getByText(/Waktu Masak/i)).toBeInTheDocument();
    expect(screen.getByText(/Tarif per Jam/i)).toBeInTheDocument();
  });
});

describe("PricingMethodSelector", () => {
  it("renders all 3 method buttons", () => {
    const pricing: PricingConfig = { method: "markup" };
    render(wrap(<PricingMethodSelector pricing={pricing} onChange={vi.fn()} />));
    expect(screen.getByRole("button", { name: /Food Cost/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Markup/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Market/i })).toBeInTheDocument();
  });

  it("calls onChange when method clicked", () => {
    const onChange = vi.fn();
    const pricing: PricingConfig = { method: "markup" };
    render(wrap(<PricingMethodSelector pricing={pricing} onChange={onChange} />));
    fireEvent.click(screen.getByRole("button", { name: /Food Cost/i }));
    expect(onChange).toHaveBeenCalled();
    const calledConfig = onChange.mock.calls[0][0] as PricingConfig;
    expect(calledConfig.method).toBe("foodCost");
  });

  it("shows food cost input when method is foodCost", () => {
    const pricing: PricingConfig = { method: "foodCost", targetFoodCostPercent: 30 };
    render(wrap(<PricingMethodSelector pricing={pricing} onChange={vi.fn()} />));
    expect(screen.getByText(/Target Food Cost/i)).toBeInTheDocument();
  });
});

describe("MarketPriceInput", () => {
  it("shows warning when below minimum", () => {
    render(wrap(<MarketPriceInput prices={[10000]} onChange={vi.fn()} />));
    expect(screen.getByText(/Minimal 2/i)).toBeInTheDocument();
  });

  it("calls onChange to add price", () => {
    const onChange = vi.fn();
    render(wrap(<MarketPriceInput prices={[10000, 20000]} onChange={onChange} />));
    fireEvent.click(screen.getByRole("button", { name: /Tambah/i }));
    expect(onChange).toHaveBeenCalledWith([10000, 20000, 0]);
  });

  it("calls onChange to remove price", () => {
    const onChange = vi.fn();
    render(wrap(<MarketPriceInput prices={[10000, 20000]} onChange={onChange} />));
    const removeButtons = screen.getAllByLabelText(/Remove price/);
    fireEvent.click(removeButtons[0]);
    expect(onChange).toHaveBeenCalledWith([20000]);
  });

  it("disables add when at max", () => {
    const many = Array(10).fill(10000);
    render(wrap(<MarketPriceInput prices={many} onChange={vi.fn()} />));
    const addBtn = screen.getByRole("button", { name: /Tambah/i }) as HTMLButtonElement;
    expect(addBtn.disabled).toBe(true);
  });
});

describe("ResultDisplay", () => {
  const result: CalculationResult = {
    ingredientCostPerPortion: 3000,
    packagingCostPerPortion: 500,
    overheadCostPerPortion: 200,
    laborCostPerPortion: 800,
    totalModalPerPortion: 4500,
    foodCostPrice: 15000,
  };

  it("renders all cost breakdown items", () => {
    render(wrap(<ResultDisplay result={result} />));
    expect(screen.getByTestId("result-display")).toBeInTheDocument();
    expect(screen.getByText(/Biaya Bahan/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Modal/i)).toBeInTheDocument();
  });

  it("formats all currency values", () => {
    render(wrap(<ResultDisplay result={result} />));
    const display = screen.getByTestId("result-display");
    expect(within(display).getByText(/Rp\s*4\.500/)).toBeInTheDocument();
  });

  it("shows food cost price when provided", () => {
    render(wrap(<ResultDisplay result={result} />));
    expect(screen.getByText(/Harga \(Food Cost\)/i)).toBeInTheDocument();
  });

  it("shows market range when provided", () => {
    const withMarket: CalculationResult = {
      ...result,
      marketMin: 10000,
      marketMax: 20000,
      marketMedian: 15000,
      marketPosition: "at",
    };
    render(wrap(<ResultDisplay result={withMarket} />));
    expect(screen.getByText(/Range Pasar/i)).toBeInTheDocument();
  });
});