export type CurrencyCode = "USD" | "PKR" | "EUR" | "GBP" | "INR" | "AED" | "CAD" | "AUD" | "JPY" | "CNY";

export const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  PKR: 280,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83,
  AED: 3.67,
  CAD: 1.36,
  AUD: 1.53,
  JPY: 150,
  CNY: 7.24,
};

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  PKR: "Rs",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  AED: "د.إ",
  CAD: "CA$",
  AUD: "A$",
  JPY: "¥",
  CNY: "¥",
};

const LOCALE_MAP: Record<string, CurrencyCode> = {
  "en-US": "USD",
  "en-PK": "PKR",
  "ur-PK": "PKR",
  "en-GB": "GBP",
  "en-IN": "INR",
  "en-AE": "AED",
  "en-CA": "CAD",
  "en-AU": "AUD",
  "ja-JP": "JPY",
  "zh-CN": "CNY",
  "de-DE": "EUR",
  "fr-FR": "EUR",
};

export function detectCurrencyFromLocale(locale: string): CurrencyCode {
  const match = LOCALE_MAP[locale];
  if (match) return match;
  return "USD";
}

export function convertPrice(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
): number {
  if (from === to) return amount;
  const inUsd = amount / EXCHANGE_RATES[from];
  return Math.round(inUsd * EXCHANGE_RATES[to]);
}

export function formatCurrency(
  amount: number,
  currency: CurrencyCode,
): string {
  const symbol = CURRENCY_SYMBOLS[currency];
  if (currency === "PKR") {
    return `${symbol} ${amount.toLocaleString("en-PK")}`;
  }
  if (currency === "JPY") {
    return `${symbol}${amount.toLocaleString("ja-JP")}`;
  }
  return `${symbol}${amount.toLocaleString("en-US")}`;
}
