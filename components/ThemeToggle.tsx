"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as "light" | "dark") || "light";
    setTheme(current);
  }, []);

  const onClick = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
    posthog.capture("theme_toggled", { theme: next });
  };

  return (
    <button className="theme" aria-label="Toggle theme" onClick={onClick}>
      ◐
    </button>
  );
}
