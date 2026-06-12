import { UNIT_CONVERSION_MAP } from "./constants";
import type { Ingredient, Unit } from "./types";

const getConversionFactor = (fromUnit: Unit, toUnit: Unit): number => {
  if (fromUnit === toUnit) return 1;
  const fromConversions = UNIT_CONVERSION_MAP[fromUnit];
  if (!fromConversions) {
    throw new Error(`No conversions defined for unit: ${fromUnit}`);
  }
  const factor = fromConversions[toUnit];
  if (factor === undefined) {
    throw new Error(
      `Conversion from ${fromUnit} to ${toUnit} is not supported`
    );
  }
  return factor;
};

const convertAmount = (
  amount: number,
  fromUnit: Unit,
  toUnit: Unit
): number => {
  if (amount < 0) {
    throw new Error("Amount cannot be negative");
  }
  const factor = getConversionFactor(fromUnit, toUnit);
  return amount * factor;
};

const calculateIngredientCost = (ingredient: Ingredient): number => {
  if (ingredient.pricePerUnit < 0) {
    throw new Error("Price per unit cannot be negative");
  }
  if (ingredient.amountPerPortion < 0) {
    throw new Error("Amount per portion cannot be negative");
  }
  const costPerUnit =
    ingredient.pricePerUnit /
    getConversionFactor(ingredient.unit, ingredient.amountUnit);
  return costPerUnit * ingredient.amountPerPortion;
};

export { calculateIngredientCost, convertAmount, getConversionFactor };