"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className={`inline-flex items-center justify-center rounded-full p-2 bg-gray-200 shadow-lg cursor-pointer ${className}`}>
        <div className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`inline-flex items-center justify-center rounded-full p-2 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer active:scale-95 ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6 text-yellow-500 hover:text-yellow-400 transition-colors" />
      ) : (
        <Moon className="h-6 w-6 text-zinc-700 hover:text-zinc-600 transition-colors" />
      )}
    </button>
  );
} 