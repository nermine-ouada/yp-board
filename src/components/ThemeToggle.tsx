"use client";
import { useTheme } from "@/hooks/useTheme";
import { SunIcon, MoonIcon } from "./icons";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
