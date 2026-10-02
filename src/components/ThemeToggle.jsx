import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
    >
      {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
      <span className="hidden sm:inline">{theme}</span>
    </button>
  );
}
