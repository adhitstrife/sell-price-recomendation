/** Satuan pembelian dan takaran bahan */
type Unit = "gram" | "kg" | "ml" | "liter" | "pcs" | "pack" | "sachet" | "sendok" | "gelas";

/** Data satu bahan dengan harga dan takaran */
interface Ingredient {
  id: string;
  name: string;
  pricePerUnit: number;
  unit: Unit;
  amountPerPortion: number;
  amountUnit: Unit;
}

/** Model perhitungan biaya tenaga kerja */
type LaborModel = "modelA" | "modelB";

/** Konfigurasi input untuk perhitungan tenaga kerja */
interface LaborConfig {
  model: LaborModel | null;
  batchTimeMinutes?: number;
  hourlyRate?: number;
  portionsPerBatch?: number;
  totalMonthlySalary?: number;
  estimatedMonthlyPortions?: number;
}

/** Biaya non-bahan per porsi */
interface Overhead {
  packagingPerPortion: number;
  overheadPerPortion: number;
  laborPerPortion: number;
}

/** Metode kalkulasi harga */
type PricingMethod = "foodCost" | "markup" | "market";

/** Konfigurasi metode pricing yang dipilih user */
interface PricingConfig {
  method: PricingMethod;
  targetFoodCostPercent?: number;
  markupMultiplier?: number;
  competitorPrices?: number[];
}

/** Data lengkap satu resep */
interface Recipe {
  id: string;
  name: string;
  portions: number;
  ingredients: Ingredient[];
  overhead: Overhead;
  laborConfig?: LaborConfig;
  pricing: PricingConfig;
  createdAt: number;
  updatedAt: number;
}

/** Hasil kalkulasi yang ditampilkan ke user */
interface CalculationResult {
  ingredientCostPerPortion: number;
  packagingCostPerPortion: number;
  overheadCostPerPortion: number;
  laborCostPerPortion: number;
  totalModalPerPortion: number;
  foodCostPrice?: number;
  markupPrice?: number;
  marketMin?: number;
  marketMax?: number;
  marketMedian?: number;
  marketAverage?: number;
  marketPosition?: string;
  profitMargin?: number;
  targetMargin?: number;
}

/** Hasil kalkulasi metode Food Cost % */
interface FoodCostResult {
  sellingPrice: number;
  totalCost: number;
  foodCostPercent: number;
  actualFoodCostPercent: number;
  profitMargin: number;
}

/** Hasil kalkulasi metode Markup */
interface MarkupResult {
  sellingPrice: number;
  totalCost: number;
  markupMultiplier: number;
  profitMargin: number;
}

/** Hasil analisis pasar dari metode Market-Based */
interface MarketAnalysis {
  competitorCount: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  medianPrice: number;
  priceRange: { min: number; max: number };
  q1Price: number;
  q3Price: number;
  position: "below" | "at" | "above";
  recommendedMin: number;
  recommendedMax: number;
  recommendedMidpoint: number;
}

/** Pengaturan aplikasi yang dipersist di localStorage */
interface AppSettings {
  language: "id" | "en";
  lastRecipeId?: string;
}

/** Recipe yang disimpan di localStorage (dengan versioning) */
interface StoredRecipe extends Recipe {
  version: number;
}

export type {
  AppSettings,
  CalculationResult,
  FoodCostResult,
  Ingredient,
  LaborConfig,
  LaborModel,
  MarketAnalysis,
  MarkupResult,
  Overhead,
  PricingConfig,
  PricingMethod,
  Recipe,
  StoredRecipe,
  Unit,
};
