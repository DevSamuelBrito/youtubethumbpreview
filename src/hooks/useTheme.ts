import { useCallback, useState } from "react";
import type { ThemeMode } from "@/types/ui";

export function useTheme(initial: ThemeMode = "light") {
  const [theme, setTheme] = useState<ThemeMode>(initial);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return { theme, setTheme, toggleTheme };
}
