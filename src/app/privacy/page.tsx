export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="section-label">Legal</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight-headline text-foreground sm:text-5xl">
        Privacy Policy
      </h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-visible-muted">
        <p>
          Your privacy matters to us. This policy explains what information we
          collect, how we use it, and your rights.
        </p>

        <h2 className="text-base font-semibold text-foreground">Information we collect</h2>
        <p>
          When you place an order, we collect your name, email, shipping address,
          and payment details necessary to process your transaction. We do not
          store payment card numbers — all payments are processed securely by
          Shopify Payments.
        </p>

        <h2 className="text-base font-semibold text-foreground">How we use your data</h2>
        <p>
          We use your information solely to fulfil orders, provide customer
          support, and send order-related updates. We do not sell, rent, or share
          your personal data with third parties for their marketing purposes.
        </p>

        <h2 className="text-base font-semibold text-foreground">Cookies</h2>
        <p>
          Our store uses essential cookies for cart functionality and preferences.
          We also use analytics cookies to improve your shopping experience. You
          can manage cookie preferences in your browser settings.
        </p>

        <h2 className="text-base font-semibold text-foreground">Your rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal
          data at any time by contacting us. We will respond within 30 days.
        </p>

        <h2 className="text-base font-semibold text-foreground">Contact</h2>
        <p>
          For privacy-related inquiries, email{" "}
          <a href="mailto:privacy@gearnest.com" className="text-accent underline">
            privacy@gearnest.com
          </a>
          .
        </p>

        <p className="pt-4 text-xs text-visible-muted">
          Last updated: May 2026
        </p>
      </div>
    </div>
  );
}
