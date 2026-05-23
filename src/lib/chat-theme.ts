/** Shared with https://chat-app-black-tau.vercel.app/settings (Chatty app) */
export const CHAT_THEME_STORAGE_KEY = "chat-theme";
export const CHAT_THEME_DEFAULT = "coffee";
/** Same theme list as the chat app settings page */
export const CHAT_THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
] as const;

export type ChatTheme = (typeof CHAT_THEMES)[number];

export function isChatTheme(value: string): value is ChatTheme {
  return (CHAT_THEMES as readonly string[]).includes(value);
}

export function getStoredChatTheme(): ChatTheme {
  if (typeof window === "undefined") return CHAT_THEME_DEFAULT;
  try {
    const stored = localStorage.getItem(CHAT_THEME_STORAGE_KEY);
    if (stored && isChatTheme(stored)) return stored;
  } catch {
    /* ignore */
  }
  return CHAT_THEME_DEFAULT;
}

export function setStoredChatTheme(theme: ChatTheme) {
  localStorage.setItem(CHAT_THEME_STORAGE_KEY, theme);
  document.documentElement.setAttribute("data-theme", theme);
  window.dispatchEvent(
    new CustomEvent("chat-theme-change", { detail: { theme } }),
  );
}

export function formatThemeLabel(theme: string) {
  return theme.charAt(0).toUpperCase() + theme.slice(1);
}
