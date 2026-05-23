"use client";

import { useEffect, useRef, useState } from "react";
import {
  CHAT_THEMES,
  formatThemeLabel,
} from "@/lib/chat-theme";
import { IconButton } from "@/components/ui/IconButton";
import { useChatTheme } from "./ThemeProvider";

export function ThemeButton() {
  const { theme, setTheme } = useChatTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative" ref={panelRef}>
      <IconButton
        label="Change theme"
        active={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3a9 9 0 1 0 8.66 11.5M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </IconButton>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,22rem)] rounded-[var(--radius)] border border-border bg-surface p-4 shadow-glow sm:w-80">
          <div className="mb-3">
            <p className="text-sm font-medium text-foreground">Theme</p>
            <p className="text-xs text-muted">
              Synced with Chat App via <code className="text-accent">chat-theme</code>
            </p>
          </div>

          <div className="grid max-h-52 grid-cols-4 gap-2 overflow-y-auto sm:grid-cols-4">
            {CHAT_THEMES.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setTheme(name);
                  setOpen(false);
                }}
                className={`flex flex-col items-center gap-1 rounded-[4px] p-1.5 transition-colors ${
                  theme === name
                    ? "bg-accent-muted ring-1 ring-accent"
                    : "hover:bg-surface-elevated"
                }`}
              >
                <div
                  className="relative h-7 w-full overflow-hidden rounded-[4px]"
                  data-theme={name}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-0.5">
                    <div className="rounded-sm bg-primary" />
                    <div className="rounded-sm bg-secondary" />
                    <div className="rounded-sm bg-accent-swatch" />
                    <div className="rounded-sm bg-neutral" />
                  </div>
                </div>
                <span className="w-full truncate text-center text-[10px] font-medium text-muted">
                  {formatThemeLabel(name)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
