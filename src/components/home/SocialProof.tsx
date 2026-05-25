const testimonials = [
  {
    quote:
      "The bundle pricing alone saved me over $120 on my first order. Everything feels premium.",
    author: "Jordan M.",
    role: "Product Designer",
  },
  {
    quote:
      "Finally a store that groups electronics, toys, and gear without feeling cluttered.",
    author: "Elena R.",
    role: "Creative Director",
  },
  {
    quote:
      "Mobile nav is fast, search is instant. Checkout took under two minutes.",
    author: "Marcus T.",
    role: "Founder",
  },
];

export function SocialProof() {
  return (
    <section className="py-14 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="section-label">Trusted</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight-headline text-foreground">
            What people say
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote key={t.author} className="card-elevated p-7">
              <div className="mb-4 text-accent" aria-hidden>
                ★★★★★
              </div>
              <p className="text-base leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-[var(--border)] pt-5">
                <cite className="not-italic text-sm font-semibold text-foreground">
                  {t.author}
                </cite>
                <p className="text-xs text-visible-muted">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 rounded-[var(--radius)] border border-[var(--border-strong)] bg-surface px-6 py-5 text-xs font-bold uppercase tracking-widest text-visible-muted">
          <span>4.9 avg rating</span>
          <span className="hidden h-4 w-px bg-[var(--border-strong)] sm:block" />
          <span className="text-accent">Bundle savings up to 20%</span>
          <span className="hidden h-4 w-px bg-[var(--border-strong)] sm:block" />
          <span>Free returns 30 days</span>
        </div>
      </div>
    </section>
  );
}
