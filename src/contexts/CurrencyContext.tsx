"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { CurrencyCode } from "@/lib/currency";
import { convertPrice, formatCurrency, detectCurrencyFromLocale, EXCHANGE_RATES } from "@/lib/currency";

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (amount: number, productCurrency?: CurrencyCode) => string;
  convert: (amount: number, productCurrency?: CurrencyCode) => number;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = "gearnest_currency";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("PKR");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    if (stored && stored in EXCHANGE_RATES) {
      setCurrencyState(stored);
      return;
    }
    const detected = detectCurrencyFromLocale(navigator.language);
    setCurrencyState(detected);
  }, []);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {}
  };

  const convert = (amount: number, productCurrency: CurrencyCode = "USD") =>
    convertPrice(amount, productCurrency, currency);

  const formatPrice = (amount: number, productCurrency: CurrencyCode = "USD") =>
    formatCurrency(convertPrice(amount, productCurrency, currency), currency);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
