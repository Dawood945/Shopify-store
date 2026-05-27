export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="section-label">Support</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight-headline text-foreground sm:text-5xl">
        Contact Us
      </h1>
      <p className="mt-4 text-sm text-visible-muted leading-relaxed">
        Have a question or need help? Reach out and we will get back to you
        within 24 hours.
      </p>
      <div className="mt-10 space-y-6">
        <div className="card-elevated p-6">
          <h2 className="text-sm font-semibold text-foreground">Email</h2>
          <a
            href="mailto:dawood.mehmood945@gmail.com"
            className="mt-2 block text-sm text-accent underline"
          >
            dawood.mehmood945@gmail.com
          </a>
        </div>
        <div className="card-elevated p-6">
          <h2 className="text-sm font-semibold text-foreground">Response time</h2>
          <p className="mt-2 text-sm text-visible-muted">
            We aim to reply within 24 hours on business days. For urgent order
            issues, include your order number in the subject line.
          </p>
        </div>
        <div className="card-elevated p-6">
          <h2 className="text-sm font-semibold text-foreground">Location</h2>
          <p className="mt-2 text-sm text-visible-muted">
            Lahore, Pakistan
          </p>
        </div>
      </div>
    </div>
  );
}
