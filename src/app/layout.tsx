import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ARCHIVE — Engineered Precision",
    template: "%s | ARCHIVE",
  },
  description:
    "Premium e-commerce for the discerning individual. Intentional design, handcrafted quality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh bg-background text-foreground">
        <ThemeProvider>
          <CurrencyProvider>
            <SiteLayout>{children}</SiteLayout>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
