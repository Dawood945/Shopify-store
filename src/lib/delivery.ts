export type CountryCode = "PK" | "US" | "UK" | "AE" | "CA" | "AU" | "IN" | "DE" | "FR";

export const COUNTRY_LABELS: Record<CountryCode, string> = {
  PK: "Pakistan",
  US: "United States",
  UK: "United Kingdom",
  AE: "UAE",
  CA: "Canada",
  AU: "Australia",
  IN: "India",
  DE: "Germany",
  FR: "France",
};

const DELIVERY_ESTIMATES: Record<CountryCode, string> = {
  PK: "2–4 business days",
  US: "5–8 business days",
  UK: "6–9 business days",
  AE: "3–5 business days",
  CA: "5–8 business days",
  AU: "7–10 business days",
  IN: "4–7 business days",
  DE: "6–9 business days",
  FR: "6–9 business days",
};

const LOCALE_TO_COUNTRY: Record<string, CountryCode> = {
  "en-PK": "PK",
  "ur-PK": "PK",
  "en-US": "US",
  "en-GB": "UK",
  "en-AE": "AE",
  "en-CA": "CA",
  "en-AU": "AU",
  "en-IN": "IN",
  "de-DE": "DE",
  "fr-FR": "FR",
};

export function detectCountry(locale: string): CountryCode {
  return LOCALE_TO_COUNTRY[locale] ?? "US";
}

export function getDeliveryEstimate(country: CountryCode): string {
  return DELIVERY_ESTIMATES[country] ?? "5–10 business days";
}

export function isProductAvailableForCountry(
  availableCountries: string[] | undefined,
  country: CountryCode,
): boolean {
  if (!availableCountries || availableCountries.length === 0) return true;
  return availableCountries.includes(country);
}
