"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useDevicePreview } from "@/hooks/useDevicePreview";

type PreviewSettingsContextValue = ReturnType<typeof useTheme> &
  ReturnType<typeof useDevicePreview>;

const PreviewSettingsContext =
  createContext<PreviewSettingsContextValue | null>(null);

export function PreviewSettingsProvider({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const devicePreview = useDevicePreview();

  return (
    <PreviewSettingsContext.Provider value={{ ...theme, ...devicePreview }}>
      {children}
    </PreviewSettingsContext.Provider>
  );
}

export function usePreviewSettingsContext() {
  const context = useContext(PreviewSettingsContext);
  if (!context) {
    throw new Error(
      "usePreviewSettingsContext deve ser usado dentro de um PreviewSettingsProvider",
    );
  }
  return context;
}
