"use client";

import { useCurrency } from "@/contexts/CurrencyContext";
import { detectCountry, getDeliveryEstimate, isProductAvailableForCountry } from "@/lib/delivery";
import type { Product } from "@/lib/types";

export function DeliveryInfo({ product }: { product: Product }) {
  const { locale } = useCurrency();
  const country = detectCountry(locale);

  const available = isProductAvailableForCountry(product.availableCountries, country);
  const eta = getDeliveryEstimate(country);

  return (
    <div className="mt-4 space-y-1 text-xs text-visible-muted">
      {available ? (
        <>
          <p className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
            </svg>
            Available in {country}
          </p>
          <p>Delivery estimate: {eta}</p>
        </>
      ) : (
        <p className="flex items-center gap-1.5 text-orange-500">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
          </svg>
          Currently not available in your region
        </p>
      )}
    </div>
  );
}
