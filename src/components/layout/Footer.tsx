import Link from "next/link";
import { MAIN_NAV } from "@/lib/navigation";
import { ShopifyBadge } from "@/components/shopify/ShopifyBadge";

const footerLinks = {
  Shop: [
    { href: "/collections", label: "All Collections" },
    { href: "/collections?category=electronics", label: "Electronics" },
    { href: "/collections?category=toys", label: "Toys" },
    { href: "/collections?category=gears", label: "Gears" },
    { href: "/bundles", label: "Bundle Deals" },
  ],
  Support: [
    { href: "#", label: "Shipping" },
    { href: "#", label: "Returns" },
    { href: "#", label: "Contact" },
  ],
};

export function Footer() {
  return (
    <footer className="relative z-30 mt-16 border-t border-[var(--border-strong)] bg-[var(--footer-bg)] lg:mt-24">
      <div className="accent-line" aria-hidden />
      <div className="footer-clearance mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:pb-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius)] bg-accent text-base font-bold text-[var(--accent-foreground)] shadow-glow">
                G
              </span>
              <div>
                <p className="text-lg font-bold tracking-tight-headline uppercase text-foreground">
                  GearNest
                </p>
                <p className="text-xs text-visible-muted">Engineered Precision</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-visible-muted">
              Electronics, toys, and gears—with bundle discounts built in. Shop
              smarter, save more.
            </p>
            <ShopifyBadge />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Navigate</h3>
            <ul className="mt-4 space-y-2.5">
              {MAIN_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-visible-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-visible-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--border-strong)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-visible-muted">
            &copy; {new Date().getFullYear()} GearNest. All rights reserved.
          </p>
          <p className="text-sm font-medium text-accent">
            Bundle discounts up to 20% · Free returns 30 days
          </p>
        </div>
      </div>
    </footer>
  );
}
