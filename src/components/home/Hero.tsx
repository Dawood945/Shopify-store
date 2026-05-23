"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    src: "https://images.pexels.com/photos/7858743/pexels-photo-7858743.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85",
    alt: "Gaming PC setup",
  },
  {
    src: "https://images.pexels.com/photos/33402765/pexels-photo-33402765.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85",
    alt: "High-performance motherboard",
  },
  {
    src: "https://images.pexels.com/photos/10558582/pexels-photo-10558582.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85",
    alt: "Graphics card — GPU hardware",
  },
  {
    src: "https://images.pexels.com/photos/5220444/pexels-photo-5220444.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85",
    alt: "Beyblades — spinning top toys",
  },
  {
    src: "https://images.pexels.com/photos/31854234/pexels-photo-31854234.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85",
    alt: "PC hardware components",
  },
  {
    src: "https://images.pexels.com/photos/5257405/pexels-photo-5257405.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85",
    alt: "Toy guns — blaster action",
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    if (index === current || intervalRef.current === null) return;
    setLeaving(current);
    setCurrent(index);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => {
        setLeaving(c);
        return (c + 1) % slides.length;
      });
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (leaving !== null) {
      const id = setTimeout(() => setLeaving(null), 700);
      return () => clearTimeout(id);
    }
  }, [leaving]);

  return (
    <section className="relative min-h-[90vh] overflow-hidden border-b border-[var(--border-strong)] gradient-mesh">
      {leaving !== null && (
        <div
          className="absolute inset-0 z-10"
          style={{ animation: "slide-out-left 0.7s ease-in-out forwards" }}
        >
          <Image
            src={slides[leaving].src}
            alt={slides[leaving].alt}
            fill
            className="object-cover saturate-[1.1] opacity-50"
            sizes="100vw"
          />
        </div>
      )}
      <div
        className="absolute inset-0"
        style={{
          animation:
            leaving !== null
              ? "slide-in-right 0.7s ease-in-out forwards"
              : undefined,
        }}
      >
        <Image
          src={slides[current].src}
          alt={slides[current].alt}
          fill
          priority
          className="object-cover saturate-[1.1] opacity-50"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/20" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-end px-4 pb-28 pt-28 sm:px-6 sm:pb-24 lg:px-8 lg:pb-32 lg:pt-32">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border-strong)] bg-surface/80 px-4 py-1.5 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
          <span className="section-label !text-[10px]">Spring 2026 · Bundle Sale</span>
        </div>
        <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight-headline text-foreground sm:text-6xl lg:text-7xl">
          Shop smarter.
          <span className="mt-1 block bg-gradient-to-r from-accent to-[color-mix(in_oklab,var(--accent)_60%,white)] bg-clip-text text-transparent">
            Bundle & save.
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-visible-muted sm:text-lg">
          Electronics, toys, and gears—curated sets with up to{" "}
          <strong className="font-semibold text-accent">20% off</strong> when you
          buy together.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/collections" className="btn-primary">
            Shop Collections
          </Link>
          <Link href="/bundles" className="btn-pill">
            View Bundle Deals
          </Link>
        </div>
        <div className="mt-8 flex items-center gap-2 max-sm:gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "h-2 w-8 bg-accent sm:h-1.5"
                  : "h-2 w-2 bg-foreground/30 hover:bg-foreground/50 sm:h-1.5"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
