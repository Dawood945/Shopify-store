import Image from "next/image";

export function EditorialImage() {
  return (
    <section className="relative h-[80vh] min-h-[480px] overflow-hidden border-b border-[var(--border-strong)]">
      <Image
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=85"
        alt="Editorial lifestyle — curated space"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/10" />
      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg">
          <p className="section-label">Editorial</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight-headline text-foreground sm:text-4xl">
            Designed for the daily
          </h2>
          <p className="mt-4 text-base leading-relaxed text-visible-muted">
            Every piece is built to earn its place in your routine — form, finish, and function, considered equally.
          </p>
        </div>
      </div>
    </section>
  );
}
