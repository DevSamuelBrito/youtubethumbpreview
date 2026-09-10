"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useThumbnails } from "@/hooks/useThumbnails";

type ThumbnailsContextValue = ReturnType<typeof useThumbnails>;

const ThumbnailsContext = createContext<ThumbnailsContextValue | null>(null);

export function ThumbnailsProvider({ children }: { children: ReactNode }) {
  const value = useThumbnails();
  return (
    <ThumbnailsContext.Provider value={value}>
      {children}
    </ThumbnailsContext.Provider>
  );
}

export function useThumbnailsContext() {
  const context = useContext(ThumbnailsContext);
  if (!context) {
    throw new Error(
      "useThumbnailsContext deve ser usado dentro de um ThumbnailsProvider",
    );
  }
  return context;
}
