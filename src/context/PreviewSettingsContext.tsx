"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useDevicePreview } from "@/hooks/useDevicePreview";
import { usePageView } from "@/hooks/usePageView";

type PreviewSettingsContextValue = ReturnType<typeof useTheme> &
  ReturnType<typeof useDevicePreview> &
  ReturnType<typeof usePageView>;

const PreviewSettingsContext =
  createContext<PreviewSettingsContextValue | null>(null);

export function PreviewSettingsProvider({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const devicePreview = useDevicePreview();
  const pageView = usePageView();

  return (
    <PreviewSettingsContext.Provider
      value={{ ...theme, ...devicePreview, ...pageView }}
    >
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
