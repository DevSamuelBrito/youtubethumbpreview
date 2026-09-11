import { useState } from "react";
import type { ThemeMode } from "@/types/ui";

export function useAppTheme(initial: ThemeMode = "light") {
  const [appTheme, setAppTheme] = useState<ThemeMode>(initial);
  return { appTheme, setAppTheme };
}
