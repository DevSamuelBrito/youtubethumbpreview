"use client";

// react
import { createContext, useContext, type ReactNode } from "react";

// hooks
import { useTheme } from "@/hooks/useTheme";
import { useDevicePreview } from "@/hooks/useDevicePreview";
import { usePageView } from "@/hooks/usePageView";
import { useAppTheme } from "@/hooks/useAppTheme";

type PreviewSettingsContextValue = ReturnType<typeof useTheme> &
  ReturnType<typeof useDevicePreview> &
  ReturnType<typeof usePageView> &
  ReturnType<typeof useAppTheme>;

const PreviewSettingsContext =
  createContext<PreviewSettingsContextValue | null>(null);

export function PreviewSettingsProvider({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const devicePreview = useDevicePreview();
  const pageView = usePageView();
  const appTheme = useAppTheme();

  return (
    <PreviewSettingsContext.Provider
      value={{ ...theme, ...devicePreview, ...pageView, ...appTheme }}
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
