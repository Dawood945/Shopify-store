"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CHAT_THEME_DEFAULT,
  CHAT_THEME_STORAGE_KEY,
  type ChatTheme,
  getStoredChatTheme,
  setStoredChatTheme,
} from "@/lib/chat-theme";

type ThemeContextValue = {
  theme: ChatTheme;
  setTheme: (theme: ChatTheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ChatTheme>(CHAT_THEME_DEFAULT);

  useEffect(() => {
    setThemeState(getStoredChatTheme());
  }, []);

  const setTheme = useCallback((next: ChatTheme) => {
    setStoredChatTheme(next);
    setThemeState(next);
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === CHAT_THEME_STORAGE_KEY && e.newValue) {
        const stored = getStoredChatTheme();
        setThemeState(stored);
        document.documentElement.setAttribute("data-theme", stored);
      }
    };

    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent<{ theme: ChatTheme }>).detail;
      if (detail?.theme) setThemeState(detail.theme);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("chat-theme-change", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("chat-theme-change", onCustom);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useChatTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useChatTheme must be used within ThemeProvider");
  }
  return ctx;
}
