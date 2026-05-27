"use client";

import { useCurrency } from "@/contexts/CurrencyContext";
import type { CurrencyCode } from "@/lib/currency";

type PriceProps = {
  amount: number;
  currency?: CurrencyCode;
  className?: string;
  compareAmount?: number;
  compareCurrency?: CurrencyCode;
};

export function Price({ amount, currency = "PKR", className, compareAmount, compareCurrency }: PriceProps) {
  const { formatPrice } = useCurrency();

  return (
    <span className={className}>
      {compareAmount && (
        <span className="mr-2 text-sm font-normal text-visible-muted line-through">
          {formatPrice(compareAmount, compareCurrency || currency)}
        </span>
      )}
      {formatPrice(amount, currency)}
    </span>
  );
}
