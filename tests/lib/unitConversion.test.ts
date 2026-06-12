import { describe, it, expect } from "vitest";
import {
  getConversionFactor,
  convertAmount,
  calculateIngredientCost,
} from "../../lib/unitConversion";
import type { Ingredient } from "../../lib/types";

describe("getConversionFactor", () => {
  it("kg to gram should be 1000", () => {
    expect(getConversionFactor("kg", "gram")).toBe(1000);
  });

  it("gram to kg should be 0.001", () => {
    expect(getConversionFactor("gram", "kg")).toBe(0.001);
  });

  it("liter to ml should be 1000", () => {
    expect(getConversionFactor("liter", "ml")).toBe(1000);
  });

  it("ml to liter should be 0.001", () => {
    expect(getConversionFactor("ml", "liter")).toBe(0.001);
  });

  it("pack to pcs should default to 1", () => {
    expect(getConversionFactor("pack", "pcs")).toBe(1);
  });

  it("sendok to gram should be 15", () => {
    expect(getConversionFactor("sendok", "gram")).toBe(15);
  });

  it("gelas to ml should be 240", () => {
    expect(getConversionFactor("gelas", "ml")).toBe(240);
  });

  it("same unit should return 1", () => {
    expect(getConversionFactor("kg", "kg")).toBe(1);
    expect(getConversionFactor("gram", "gram")).toBe(1);
    expect(getConversionFactor("pcs", "pcs")).toBe(1);
  });

  it("throws for invalid unit pair", () => {
    expect(() => getConversionFactor("kg", "pcs")).toThrow();
  });

  it("throws for undefined source unit", () => {
    expect(() => getConversionFactor("sachet" as any, "gram")).toThrow();
  });
});

describe("convertAmount", () => {
  it("converts kg to gram", () => {
    expect(convertAmount(2, "kg", "gram")).toBe(2000);
  });

  it("converts liter to ml", () => {
    expect(convertAmount(0.5, "liter", "ml")).toBe(500);
  });

  it("converts sendok to gram", () => {
    expect(convertAmount(3, "sendok", "gram")).toBe(45);
  });

  it("converts gelas to ml", () => {
    expect(convertAmount(2, "gelas", "ml")).toBe(480);
  });

  it("same unit returns same amount", () => {
    expect(convertAmount(100, "gram", "gram")).toBe(100);
  });

  it("zero amount returns zero", () => {
    expect(convertAmount(0, "kg", "gram")).toBe(0);
  });

  it("throws on negative amount", () => {
    expect(() => convertAmount(-1, "kg", "gram")).toThrow();
  });
});

describe("calculateIngredientCost", () => {
  it("calculates flour cost: 15000/kg, 200g per portion = 3000", () => {
    const flour: Ingredient = {
      id: "1",
      name: "Tepung",
      pricePerUnit: 15000,
      unit: "kg",
      amountPerPortion: 200,
      amountUnit: "gram",
    };
    expect(calculateIngredientCost(flour)).toBe(3000);
  });

  it("calculates oil cost: 20000/liter, 50ml per portion = 1000", () => {
    const oil: Ingredient = {
      id: "2",
      name: "Minyak Goreng",
      pricePerUnit: 20000,
      unit: "liter",
      amountPerPortion: 50,
      amountUnit: "ml",
    };
    expect(calculateIngredientCost(oil)).toBe(1000);
  });

  it("calculates sugar cost: 12000/kg, 100g per portion = 1200", () => {
    const sugar: Ingredient = {
      id: "3",
      name: "Gula",
      pricePerUnit: 12000,
      unit: "kg",
      amountPerPortion: 100,
      amountUnit: "gram",
    };
    expect(calculateIngredientCost(sugar)).toBe(1200);
  });

  it("handles same unit conversion", () => {
    const item: Ingredient = {
      id: "4",
      name: "Telur",
      pricePerUnit: 2000,
      unit: "pcs",
      amountPerPortion: 3,
      amountUnit: "pcs",
    };
    expect(calculateIngredientCost(item)).toBe(6000);
  });

  it("throws on negative price", () => {
    const bad: Ingredient = {
      id: "5",
      name: "Test",
      pricePerUnit: -1000,
      unit: "kg",
      amountPerPortion: 100,
      amountUnit: "gram",
    };
    expect(() => calculateIngredientCost(bad)).toThrow();
  });

  it("throws on negative amount", () => {
    const bad: Ingredient = {
      id: "6",
      name: "Test",
      pricePerUnit: 10000,
      unit: "kg",
      amountPerPortion: -100,
      amountUnit: "gram",
    };
    expect(() => calculateIngredientCost(bad)).toThrow();
  });

  it("handles zero price", () => {
    const free: Ingredient = {
      id: "7",
      name: "Free",
      pricePerUnit: 0,
      unit: "kg",
      amountPerPortion: 100,
      amountUnit: "gram",
    };
    expect(calculateIngredientCost(free)).toBe(0);
  });
});