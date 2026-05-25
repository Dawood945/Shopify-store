"use client";

import { useCurrency } from "@/contexts/CurrencyContext";
import type { CurrencyCode } from "@/lib/currency";
import { EXCHANGE_RATES } from "@/lib/currency";

const CURRENCIES = Object.keys(EXCHANGE_RATES) as CurrencyCode[];

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
      className="h-8 rounded-[var(--radius)] border border-[var(--border-strong)] bg-surface px-2 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
      aria-label="Select currency"
    >
      {CURRENCIES.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
