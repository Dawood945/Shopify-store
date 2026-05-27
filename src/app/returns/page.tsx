export const metadata = {
  title: "Returns",
};

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="section-label">Support</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight-headline text-foreground sm:text-5xl">
        Returns
      </h1>
      <div className="mt-8 rounded-[var(--radius)] border border-red-500/30 bg-red-500/10 p-6">
        <p className="text-base font-semibold text-red-600">
          We do not accept returns at this time.
        </p>
        <p className="mt-3 text-sm text-visible-muted leading-relaxed">
          All sales are final. Please review your order carefully before
          completing your purchase. If you receive a defective or incorrect item,
          contact us within 48 hours of delivery and we will review your case.
        </p>
      </div>
      <div className="mt-8 space-y-4 text-sm text-visible-muted leading-relaxed">
        <h2 className="font-semibold text-foreground">Damaged or defective items</h2>
        <p>
          If your order arrives damaged or with a manufacturing defect, email us
          at{" "}
          <a href="mailto:dawood.mehmood945@gmail.com" className="text-accent underline">
            dawood.mehmood945@gmail.com
          </a>{" "}
          with your order number and photos of the issue. We will respond within
          2 business days.
        </p>
        <h2 className="font-semibold text-foreground">Cancellations</h2>
        <p>
          Orders can be cancelled within 1 hour of placement. After that, the
          order has entered processing and cannot be modified.
        </p>
      </div>
    </div>
  );
}
