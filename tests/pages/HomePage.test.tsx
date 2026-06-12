import { describe, it, expect, beforeEach } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n/config";
import { RecipeProvider } from "../../contexts/RecipeContext";
import { AlertProvider } from "../../contexts/AlertContext";
import CalculatorPage from "../../app/calculator/page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/calculator",
}));

const wrap = (ui: React.ReactNode) => (
  <I18nextProvider i18n={i18n}>
    <AlertProvider>
      <RecipeProvider>{ui}</RecipeProvider>
    </AlertProvider>
  </I18nextProvider>
);

beforeEach(() => {
  localStorage.clear();
});

describe("CalculatorPage", () => {
  it("renders all 4 steps", () => {
    render(wrap(<CalculatorPage />));
    expect(screen.getByText(/Step 1|Langkah 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 2|Langkah 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 3|Langkah 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 4|Langkah 4/i)).toBeInTheDocument();
  });

  it("renders an empty recipe on mount", () => {
    render(wrap(<CalculatorPage />));
    expect(screen.getByPlaceholderText(/Nama Menu|Menu Name/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(1)).toBeInTheDocument();
  });

  it("shows no-results message when no ingredients", () => {
    render(wrap(<CalculatorPage />));
    expect(screen.getByText(/Tambahkan bahan terlebih dahulu|Add ingredients to see/i)).toBeInTheDocument();
  });

  it("updates menu name when typed", () => {
    render(wrap(<CalculatorPage />));
    const nameInput = screen.getByPlaceholderText(/Nama Menu|Menu Name/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Nasi Goreng" } });
    expect(nameInput.value).toBe("Nasi Goreng");
  });

  it("updates portions when changed", () => {
    render(wrap(<CalculatorPage />));
    const portionsInput = screen.getByDisplayValue(1) as HTMLInputElement;
    fireEvent.change(portionsInput, { target: { value: "5" } });
    expect(portionsInput.value).toBe("5");
  });

  it("toggles overhead section when clicked", () => {
    render(wrap(<CalculatorPage />));
    const toggle = screen.getByRole("button", { name: /Step 3|Langkah 3/i });
    fireEvent.click(toggle);
    expect(screen.getByText(/Kemasan per Porsi|Packaging per Portion/i)).toBeInTheDocument();
  });

  it("save button is disabled when name is empty", () => {
    render(wrap(<CalculatorPage />));
    const saveBtn = screen.getByRole("button", { name: /Simpan Resep|Save Recipe/i }) as HTMLButtonElement;
    expect(saveBtn.disabled).toBe(true);
  });

  it("renders PricingMethodSelector with 3 method buttons", () => {
    render(wrap(<CalculatorPage />));
    expect(screen.getByRole("button", { name: /Food Cost/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Markup/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Market/i })).toBeInTheDocument();
  });

  it("shows MarketPriceInput when market method selected", () => {
    render(wrap(<CalculatorPage />));
    const marketBtn = screen.getByRole("button", { name: /Market/i });
    fireEvent.click(marketBtn);
    expect(screen.getByText(/Tambah Harga Kompetitor|Add Competitor Price/i)).toBeInTheDocument();
  });

  it("renders Save and Reset buttons", () => {
    render(wrap(<CalculatorPage />));
    expect(screen.getByRole("button", { name: /Simpan Resep|Save Recipe/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset/i })).toBeInTheDocument();
  });
});
