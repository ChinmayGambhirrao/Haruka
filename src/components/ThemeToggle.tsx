"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed top-4 right-4 w-10 h-10 rounded-none 
        border border-gray-200 dark:border-gray-800 
        bg-gray-900 dark:bg-transparent
        text-white dark:text-gray-100
        hover:bg-black dark:hover:bg-gray-100
        hover:text-white dark:hover:text-gray-900
        hover:border-gray-900 dark:hover:border-gray-100 
        cursor-pointer transition-all duration-300"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}