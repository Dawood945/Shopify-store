"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CATEGORY_NAV } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function CategoryNav({ compact }: { compact?: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  return (
    <nav
      className={cn(
        "flex gap-2",
        compact ? "flex-col" : "flex-wrap items-center justify-center lg:justify-start",
      )}
      aria-label="Shop categories"
    >
      {CATEGORY_NAV.map((item) => {
        const isCollections = item.href === "/collections";
        const category = isCollections ? null : item.href.split("category=")[1];
        const isActive =
          pathname === "/collections" &&
          (isCollections ? !activeCategory : activeCategory === category);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "btn-pill",
              compact && "w-full justify-center",
              isActive && "btn-pill-active",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
