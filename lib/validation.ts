import {
  MAX_FOOD_COST_PERCENT,
  MAX_INGREDIENT_NAME_LENGTH,
  MAX_MARKUP_MULTIPLIER,
  MAX_PORTIONS,
  MAX_PRICE,
  MIN_FOOD_COST_PERCENT,
  MIN_INGREDIENT_NAME_LENGTH,
  MIN_MARKUP_MULTIPLIER,
  MIN_PORTIONS,
  MIN_PRICE,
} from "./constants";

const validateIngredientName = (name: string): boolean => {
  return (
    name.length >= MIN_INGREDIENT_NAME_LENGTH &&
    name.length <= MAX_INGREDIENT_NAME_LENGTH
  );
};

const validatePrice = (price: number): boolean => {
  return !isNaN(price) && price >= MIN_PRICE && price <= MAX_PRICE;
};

const validatePortion = (portions: number): boolean => {
  return Number.isInteger(portions) && portions >= MIN_PORTIONS && portions <= MAX_PORTIONS;
};

const validateFoodCostPercent = (percent: number): boolean => {
  return !isNaN(percent) && percent >= MIN_FOOD_COST_PERCENT && percent <= MAX_FOOD_COST_PERCENT;
};

const validateMarkupMultiplier = (multiplier: number): boolean => {
  return !isNaN(multiplier) && multiplier >= MIN_MARKUP_MULTIPLIER && multiplier <= MAX_MARKUP_MULTIPLIER;
};

const validateCompetitorPrices = (prices: number[]): boolean => {
  if (prices.length < 2) return false;
  return prices.every((p) => !isNaN(p) && p >= 0);
};

export {
  validateCompetitorPrices,
  validateFoodCostPercent,
  validateIngredientName,
  validateMarkupMultiplier,
  validatePortion,
  validatePrice,
};