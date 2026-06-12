import { ROUNDING_BASE, MIN_FOOD_COST_PERCENT, MAX_FOOD_COST_PERCENT, MIN_MARKUP_MULTIPLIER, MAX_MARKUP_MULTIPLIER, MIN_COMPETITOR_PRICES, MAX_COMPETITOR_PRICES } from "./constants";
import type { CalculationResult, FoodCostResult, Ingredient, LaborConfig, MarketAnalysis, MarkupResult, Overhead, PricingConfig } from "./types";
import { calculateIngredientCost } from "./unitConversion";

const roundPrice = (price: number): number => {
  return Math.round(price / ROUNDING_BASE) * ROUNDING_BASE;
};

const calculateTotalIngredientCost = (ingredients: Ingredient[]): number => {
  return ingredients.reduce((sum, ing) => sum + calculateIngredientCost(ing), 0);
};

const calculateTotalOverhead = (overhead: Overhead): number => {
  return overhead.packagingPerPortion + overhead.overheadPerPortion + overhead.laborPerPortion;
};

const calculateLaborCost = (config: LaborConfig | undefined): number => {
  if (!config || !config.model) return 0;
  if (config.model === "modelA") {
    const { batchTimeMinutes = 0, hourlyRate = 0, portionsPerBatch = 1 } = config;
    if (portionsPerBatch <= 0) return 0;
    return (batchTimeMinutes / 60) * hourlyRate / portionsPerBatch;
  }
  const { totalMonthlySalary = 0, estimatedMonthlyPortions = 1 } = config;
  if (estimatedMonthlyPortions <= 0) return 0;
  return totalMonthlySalary / estimatedMonthlyPortions;
};

const calculateFoodCostPrice = (totalCost: number, targetFoodCostPercent: number): FoodCostResult => {
  if (totalCost < 0) throw new Error("Total cost cannot be negative");
  if (targetFoodCostPercent < MIN_FOOD_COST_PERCENT || targetFoodCostPercent > MAX_FOOD_COST_PERCENT) {
    throw new Error(`Food cost % must be between ${MIN_FOOD_COST_PERCENT}-${MAX_FOOD_COST_PERCENT}%`);
  }
  if (totalCost === 0) {
    return { sellingPrice: 0, totalCost: 0, foodCostPercent: targetFoodCostPercent, actualFoodCostPercent: 0, profitMargin: 0 };
  }
  const rawPrice = totalCost / (targetFoodCostPercent / 100);
  const sellingPrice = roundPrice(rawPrice);
  const actualFoodCostPercent = (totalCost / sellingPrice) * 100;
  const profitMargin = ((sellingPrice - totalCost) / sellingPrice) * 100;
  return { sellingPrice, totalCost, foodCostPercent: targetFoodCostPercent, actualFoodCostPercent: Math.round(actualFoodCostPercent * 10) / 10, profitMargin: Math.round(profitMargin * 10) / 10 };
};

const calculateMarkupPrice = (totalCost: number, markupMultiplier: number): MarkupResult => {
  if (totalCost < 0) throw new Error("Total cost cannot be negative");
  if (markupMultiplier < MIN_MARKUP_MULTIPLIER || markupMultiplier > MAX_MARKUP_MULTIPLIER) {
    throw new Error(`Markup multiplier must be between ${MIN_MARKUP_MULTIPLIER}x and ${MAX_MARKUP_MULTIPLIER}x`);
  }
  if (totalCost === 0) {
    return { sellingPrice: 0, totalCost: 0, markupMultiplier, profitMargin: 0 };
  }
  const rawPrice = totalCost * markupMultiplier;
  const sellingPrice = roundPrice(rawPrice);
  const profitMargin = ((sellingPrice - totalCost) / sellingPrice) * 100;
  return { sellingPrice, totalCost, markupMultiplier, profitMargin: Math.round(profitMargin * 10) / 10 };
};

const median = (sorted: number[]): number => {
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
};

const quartile = (sorted: number[], q: number): number => {
  const pos = (sorted.length - 1) * q;
  const lower = Math.floor(pos);
  const upper = Math.ceil(pos);
  return lower === upper ? sorted[lower] : sorted[lower] * (1 - (pos - lower)) + sorted[upper] * (pos - lower);
};

const calculateMarketBased = (competitorPrices: number[]): MarketAnalysis => {
  if (competitorPrices.length < MIN_COMPETITOR_PRICES) {
    throw new Error(`Need at least ${MIN_COMPETITOR_PRICES} competitor prices`);
  }
  if (competitorPrices.length > MAX_COMPETITOR_PRICES) {
    throw new Error(`Maximum ${MAX_COMPETITOR_PRICES} competitor prices allowed`);
  }
  if (competitorPrices.some((p) => p < 0)) {
    throw new Error("Competitor prices cannot be negative");
  }
  const sorted = [...competitorPrices].sort((a, b) => a - b);
  const minPrice = sorted[0];
  const maxPrice = sorted[sorted.length - 1];
  const avgPrice = sorted.reduce((s, p) => s + p, 0) / sorted.length;
  const medianPrice = median(sorted);
  const q1Price = quartile(sorted, 0.25);
  const q3Price = quartile(sorted, 0.75);
  const range10pc = avgPrice * 0.1;
  const position: "below" | "at" | "above" = avgPrice - medianPrice > range10pc ? "below" : medianPrice - avgPrice > range10pc ? "above" : "at";
  const recommendedMin = q1Price;
  const recommendedMax = q3Price;
  const recommendedMidpoint = Math.round((q1Price + q3Price) / 2);
  return { competitorCount: sorted.length, minPrice, maxPrice, avgPrice: Math.round(avgPrice), medianPrice: Math.round(medianPrice), priceRange: { min: minPrice, max: maxPrice }, q1Price, q3Price, position, recommendedMin, recommendedMax, recommendedMidpoint };
};

const calculateAll = (
  ingredients: Ingredient[],
  overhead: Overhead,
  pricing: PricingConfig,
  laborConfig?: LaborConfig
): CalculationResult => {
  const laborCostPerPortion = (laborConfig && laborConfig.model)
    ? calculateLaborCost(laborConfig)
    : overhead.laborPerPortion;
  const ingredientCostPerPortion = calculateTotalIngredientCost(ingredients);
  const totalModal = ingredientCostPerPortion + overhead.packagingPerPortion + overhead.overheadPerPortion + laborCostPerPortion;
  const result: CalculationResult = { ingredientCostPerPortion, packagingCostPerPortion: overhead.packagingPerPortion, overheadCostPerPortion: overhead.overheadPerPortion, laborCostPerPortion, totalModalPerPortion: totalModal };
  if (pricing.method === "foodCost" && pricing.targetFoodCostPercent) {
    const fc = calculateFoodCostPrice(totalModal, pricing.targetFoodCostPercent);
    result.foodCostPrice = fc.sellingPrice;
    result.profitMargin = fc.profitMargin;
    result.targetMargin = 100 - fc.foodCostPercent;
  }
  if (pricing.method === "markup" && pricing.markupMultiplier) {
    const mk = calculateMarkupPrice(totalModal, pricing.markupMultiplier);
    result.markupPrice = mk.sellingPrice;
    result.profitMargin = mk.profitMargin;
    result.targetMargin = 100 - 100 / mk.markupMultiplier;
  }
  if (pricing.method === "market" && pricing.competitorPrices && pricing.competitorPrices.length >= 2) {
    const mb = calculateMarketBased(pricing.competitorPrices);
    result.marketMin = mb.minPrice;
    result.marketMax = mb.maxPrice;
    result.marketMedian = mb.medianPrice;
    result.marketAverage = mb.avgPrice;
    result.marketPosition = mb.position;
  }
  return result;
};

export { calculateAll, calculateFoodCostPrice, calculateLaborCost, calculateMarketBased, calculateMarkupPrice, calculateTotalIngredientCost, calculateTotalOverhead, roundPrice };