export const MAIN_NAV = [
  { href: "/collections", label: "Collections" },
  { href: "/collections?category=electronics", label: "Electronics" },
  { href: "/collections?category=toys", label: "Toys" },
  { href: "/collections?category=gears", label: "Gears" },
  { href: "/about", label: "About" },
] as const;

export const CATEGORY_NAV = MAIN_NAV.filter((item) => item.label !== "About");
