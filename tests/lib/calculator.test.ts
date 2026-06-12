import { describe, it, expect } from "vitest";
import { calculateFoodCostPrice, calculateMarkupPrice, calculateMarketBased, calculateTotalIngredientCost, calculateTotalOverhead, calculateAll, calculateLaborCost, roundPrice } from "../../lib/calculator";
import type { Ingredient, Overhead, PricingConfig, LaborConfig } from "../../lib/types";

describe("roundPrice", () => {
  it("rounds 33333 to 33500", () => expect(roundPrice(33333)).toBe(33500));
  it("rounds 30000 to 30000", () => expect(roundPrice(30000)).toBe(30000));
  it("rounds 16972.5 to 17000", () => expect(roundPrice(16972.5)).toBe(17000));
});

describe("calculateTotalIngredientCost", () => {
  const flour: Ingredient = { id: "1", name: "Tepung", pricePerUnit: 15000, unit: "kg", amountPerPortion: 200, amountUnit: "gram" };
  const oil: Ingredient = { id: "2", name: "Minyak", pricePerUnit: 20000, unit: "liter", amountPerPortion: 50, amountUnit: "ml" };
  it("sums multiple ingredients", () => expect(calculateTotalIngredientCost([flour, oil])).toBe(4000));
  it("returns 0 for empty list", () => expect(calculateTotalIngredientCost([])).toBe(0));
});

describe("calculateTotalOverhead", () => {
  const ov: Overhead = { packagingPerPortion: 1000, overheadPerPortion: 500, laborPerPortion: 2000 };
  it("sums all overhead", () => expect(calculateTotalOverhead(ov)).toBe(3500));
  it("handles zero overhead", () => {
    const empty: Overhead = { packagingPerPortion: 0, overheadPerPortion: 0, laborPerPortion: 0 };
    expect(calculateTotalOverhead(empty)).toBe(0);
  });
});

describe("calculateLaborCost", () => {
  it("returns 0 when no config", () => expect(calculateLaborCost(undefined)).toBe(0));
  it("returns 0 when no model set", () => {
    const c: LaborConfig = { model: null };
    expect(calculateLaborCost(c)).toBe(0);
  });
  it("model A: (60min / 60) * 50000 / 10 = 5000", () => {
    const c: LaborConfig = { model: "modelA", batchTimeMinutes: 60, hourlyRate: 50000, portionsPerBatch: 10 };
    expect(calculateLaborCost(c)).toBe(5000);
  });
  it("model B: 3000000 / 500 = 6000", () => {
    const c: LaborConfig = { model: "modelB", totalMonthlySalary: 3000000, estimatedMonthlyPortions: 500 };
    expect(calculateLaborCost(c)).toBe(6000);
  });
});

describe("calculateFoodCostPrice", () => {
  it("10000 cost, 30% -> 33500", () => {
    const r = calculateFoodCostPrice(10000, 30);
    expect(r.sellingPrice).toBe(33500);
    expect(r.totalCost).toBe(10000);
    expect(r.foodCostPercent).toBe(30);
  });
  it("15000 cost, 25% -> 60000", () => {
    const r = calculateFoodCostPrice(15000, 25);
    expect(r.sellingPrice).toBe(60000);
  });
  it("5000 cost, 40% -> 12500", () => {
    const r = calculateFoodCostPrice(5000, 40);
    expect(r.sellingPrice).toBe(12500);
  });
  it("handles 0 cost", () => {
    const r = calculateFoodCostPrice(0, 30);
    expect(r.sellingPrice).toBe(0);
  });
  it("rejects < 10%", () => expect(() => calculateFoodCostPrice(10000, 9)).toThrow());
  it("rejects > 60%", () => expect(() => calculateFoodCostPrice(10000, 61)).toThrow());
  it("rejects negative cost", () => expect(() => calculateFoodCostPrice(-1000, 30)).toThrow());
  it("all boundary values", () => {
    expect(calculateFoodCostPrice(10000, 10).sellingPrice).toBeGreaterThan(0);
    expect(calculateFoodCostPrice(10000, 60).sellingPrice).toBeGreaterThan(0);
  });
  it("decimal percentage", () => {
    const r = calculateFoodCostPrice(10000, 33.5);
    expect(r.sellingPrice % 500).toBe(0);
  });
});

describe("calculateMarkupPrice", () => {
  it("10000 cost, 3x -> 30000", () => {
    const r = calculateMarkupPrice(10000, 3);
    expect(r.sellingPrice).toBe(30000);
    expect(r.profitMargin).toBe(66.7);
  });
  it("5000 cost, 2.5x -> 12500", () => {
    const r = calculateMarkupPrice(5000, 2.5);
    expect(r.sellingPrice).toBe(12500);
  });
  it("15000 cost, 4x -> 60000", () => {
    const r = calculateMarkupPrice(15000, 4);
    expect(r.sellingPrice).toBe(60000);
  });
  it("handles 0 cost", () => {
    const r = calculateMarkupPrice(0, 3);
    expect(r.sellingPrice).toBe(0);
  });
  it("rejects < 1.5x", () => expect(() => calculateMarkupPrice(10000, 1.4)).toThrow());
  it("rejects > 10x", () => expect(() => calculateMarkupPrice(10000, 10.1)).toThrow());
  it("rejects negative cost", () => expect(() => calculateMarkupPrice(-1000, 3)).toThrow());
  it("supports decimal multipliers", () => {
    const r = calculateMarkupPrice(10000, 2.5);
    expect(r.sellingPrice).toBe(25000);
  });
  it("rounds to nearest 500", () => {
    const r = calculateMarkupPrice(6789, 2.5);
    expect(r.sellingPrice % 500).toBe(0);
  });
  it("boundary values", () => {
    expect(calculateMarkupPrice(10000, 1.5).sellingPrice).toBeGreaterThan(0);
    expect(calculateMarkupPrice(10000, 10).sellingPrice).toBeGreaterThan(0);
  });
});

describe("calculateMarketBased", () => {
  const fivePrices = [25000, 30000, 35000, 40000, 45000];
  const scattered = [20000, 22000, 35000, 38000, 40000, 45000];
  const tight = [95000, 100000, 105000, 110000];
  const evenPrices = [20000, 30000, 40000, 50000];

  it("5 prices -> correct stats", () => {
    const r = calculateMarketBased(fivePrices);
    expect(r.medianPrice).toBe(35000);
    expect(r.avgPrice).toBe(35000);
    expect(r.minPrice).toBe(25000);
    expect(r.maxPrice).toBe(45000);
    expect(r.competitorCount).toBe(5);
  });
  it("unsorted input gives same result as sorted", () => {
    const unsorted = [40000, 25000, 45000, 30000, 35000];
    expect(calculateMarketBased(unsorted).medianPrice).toBe(35000);
  });
  it("even count median = average of two middle", () => {
    const r = calculateMarketBased(evenPrices);
    expect(r.medianPrice).toBe(35000);
  });
  it("rejects < 2 prices", () => expect(() => calculateMarketBased([30000])).toThrow());
  it("rejects > 10 prices", () => expect(() => calculateMarketBased(Array(11).fill(30000))).toThrow());
  it("rejects negative prices", () => expect(() => calculateMarketBased([20000, -5000])).toThrow());
  it("position = 'at' when price is at average", () => {
    expect(calculateMarketBased(evenPrices).position).toBe("at");
  });
  it("scattered market stats", () => {
    const r = calculateMarketBased(scattered);
    expect(r.minPrice).toBe(20000);
    expect(r.maxPrice).toBe(45000);
    expect(r.medianPrice).toBeGreaterThan(0);
  });
  it("tight market stats", () => {
    const r = calculateMarketBased(tight);
    expect(r.medianPrice).toBe(102500);
    expect(r.avgPrice).toBe(102500);
  });
  it("duplicate prices", () => {
    const r = calculateMarketBased([30000, 30000, 30000]);
    expect(r.medianPrice).toBe(30000);
    expect(r.minPrice).toBe(30000);
    expect(r.maxPrice).toBe(30000);
  });
});

describe("calculateAll (integration)", () => {
  const ingredients: Ingredient[] = [
    { id: "1", name: "Tepung", pricePerUnit: 15000, unit: "kg", amountPerPortion: 200, amountUnit: "gram" },
    { id: "2", name: "Minyak", pricePerUnit: 20000, unit: "liter", amountPerPortion: 50, amountUnit: "ml" },
  ];
  const overhead: Overhead = { packagingPerPortion: 1000, overheadPerPortion: 500, laborPerPortion: 2000 };

  it("food cost method", () => {
    const pricing: PricingConfig = { method: "foodCost", targetFoodCostPercent: 30 };
    const r = calculateAll(ingredients, overhead, pricing);
    expect(r.totalModalPerPortion).toBe(7500);
    expect(r.foodCostPrice).toBe(25000);
  });
  it("markup method", () => {
    const pricing: PricingConfig = { method: "markup", markupMultiplier: 3 };
    const r = calculateAll(ingredients, overhead, pricing);
    expect(r.totalModalPerPortion).toBe(7500);
    expect(r.markupPrice).toBe(22500);
  });
  it("market method", () => {
    const pricing: PricingConfig = { method: "market", competitorPrices: [20000, 25000, 30000, 35000] };
    const r = calculateAll(ingredients, overhead, pricing);
    expect(r.marketMedian).toBeGreaterThan(0);
    expect(r.marketAverage).toBeGreaterThan(0);
  });
  it("labor cost from laborConfig", () => {
    const overheadNoLabor: Overhead = { packagingPerPortion: 0, overheadPerPortion: 0, laborPerPortion: 0 };
    const pricing: PricingConfig = { method: "foodCost", targetFoodCostPercent: 30 };
    const laborConfig: LaborConfig = { model: "modelA", batchTimeMinutes: 60, hourlyRate: 50000, portionsPerBatch: 10 };
    const r = calculateAll(ingredients, overheadNoLabor, pricing, laborConfig);
    expect(r.laborCostPerPortion).toBe(5000);
    expect(r.totalModalPerPortion).toBe(5000 + 3000 + 1000);
  });
});