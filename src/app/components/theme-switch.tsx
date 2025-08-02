"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null; // avoid rendering on server
  
  const switchTheme: () => void = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("light");
  };

  const toggleTheme = () => {
    //@ts-ignore
    if (!document.startViewTransition) return switchTheme();

    //@ts-ignore
    document.startViewTransition(() => {
      switchTheme();
    });
  };


  return (
    <button
     type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed bottom-5 right-5 bg-[#3b82f6] w-[3rem] h-[3rem] backdrop-blur-[0.5rem]   shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all btn-primary z-50"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
