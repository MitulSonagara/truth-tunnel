"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = resolvedTheme === "dark";

  return (
    <div
      className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
        isDarkMode ? "bg-blue-800" : "bg-blue-500"
      }`}
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
    >
      <div
        className={`absolute top-1 left-1 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
          isDarkMode ? "translate-x-6 bg-indigo-400" : "bg-orange-400"
        }`}
      >
        {isDarkMode ? (
          <Moon className="text-white w-5 h-5" />
        ) : (
          <Sun className="text-white w-5 h-5" />
        )}
      </div>
    </div>
  );
}
