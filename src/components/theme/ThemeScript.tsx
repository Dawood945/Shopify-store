import { CHAT_THEME_DEFAULT, CHAT_THEME_STORAGE_KEY } from "@/lib/chat-theme";

export function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem("${CHAT_THEME_STORAGE_KEY}")||"${CHAT_THEME_DEFAULT}";document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
