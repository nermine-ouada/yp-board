"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const STORAGE_KEY = "ypboard:theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const syncFromSystem = () => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(mq.matches ? "dark" : "light");
      }
    };

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    } else {
      setTheme(mq.matches ? "dark" : "light");
    }

    mq.addEventListener("change", syncFromSystem);
    return () => mq.removeEventListener("change", syncFromSystem);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage blocked — theme still applies for this load */
    }
    setTheme(next);
  };

  return { theme, toggle };
}
