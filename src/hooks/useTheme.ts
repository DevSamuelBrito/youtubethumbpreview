import { useState } from "react";
import type { ThemeMode } from "@/types/ui";

export function useTheme(initial: ThemeMode = "light") {
  const [theme, setTheme] = useState<ThemeMode>(initial);
  return { theme, setTheme };
}
