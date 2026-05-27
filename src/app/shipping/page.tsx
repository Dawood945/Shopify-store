export const metadata = {
  title: "Shipping",
};

const shippingInfo = [
  { region: "Pakistan", estimate: "2–4 business days", detail: "Delivered via TCX, Leopards, or Call Courier. Free on orders over Rs 15,000." },
  { region: "United States", estimate: "5–8 business days", detail: "Shipped via DHL Express. Duties and taxes may apply." },
  { region: "Europe", estimate: "6–10 business days", detail: "Shipped via DHL Express. VAT and duties collected at checkout." },
  { region: "Middle East", estimate: "4–7 business days", detail: "Shipped via Aramex or DHL. Free on orders over $200." },
  { region: "Asia Pacific", estimate: "5–9 business days", detail: "Shipped via DHL Express. Local customs may apply." },
  { region: "Rest of World", estimate: "7–14 business days", detail: "Shipped via DHL Express. Delivery times vary by destination." },
];

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="section-label">Support</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight-headline text-foreground sm:text-5xl">
        Shipping
      </h1>
      <p className="mt-4 text-sm text-visible-muted leading-relaxed">
        We ship worldwide from our fulfillment centres. Estimated delivery times
        are calculated from the date of dispatch.
      </p>
      <div className="mt-10 space-y-4">
        {shippingInfo.map((s) => (
          <div key={s.region} className="card-elevated p-5">
            <div className="flex items-start justify-between gap-4">
              <p className="font-semibold text-foreground">{s.region}</p>
              <span className="shrink-0 rounded-full bg-accent-muted px-3 py-0.5 text-xs font-medium text-accent">
                {s.estimate}
              </span>
            </div>
            <p className="mt-2 text-sm text-visible-muted">{s.detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-[var(--radius)] border border-[var(--border-strong)] bg-surface p-5 text-sm text-visible-muted">
        <p className="font-semibold text-foreground">Order processing</p>
        <p className="mt-2">
          Orders are processed within 1 business day after payment confirmation.
          You will receive a tracking link once your order ships.
        </p>
      </div>
    </div>
  );
}
