"use client";

import { useRouter } from "next/navigation";
import { IconButton } from "@/components/ui/IconButton";

export function CartButton() {
  const router = useRouter();
  const itemCount = 1;

  return (
    <IconButton
      label="Cart"
      badge={itemCount}
      onClick={() => router.push("/checkout")}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6 6h15l-1.5 9h-12L6 6zM9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M6 6L5 3H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </IconButton>
  );
}
