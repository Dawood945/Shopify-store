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
    <div className="mt-2 space-y-1 text-[9px] text-visible-muted sm:mt-4 sm:text-xs">
      {available ? (
        <>
          <p className="flex items-center gap-1">
            <svg className="h-3 w-3 text-green-500 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
            </svg>
            Available in {country}
          </p>
          <p>Delivery: {eta}</p>
        </>
      ) : (
        <p className="flex items-center gap-1 text-orange-500">
          <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
          </svg>
          Not available in your region
        </p>
      )}
    </div>
  );
}
