import { ROUNDING_BASE } from "./constants";

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (num: number, decimals: number = 0): string => {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

const roundToNearest = (price: number, base: number = ROUNDING_BASE): number => {
  return Math.round(price / base) * base;
};

export { formatCurrency, formatNumber, roundToNearest };