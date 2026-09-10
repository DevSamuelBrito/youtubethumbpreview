"use client";

import { useState } from "react";
import { ThumbnailsProvider } from "@/context/ThumbnailsContext";
import { PreviewSettingsProvider } from "@/context/PreviewSettingsContext";
import { ControlPanel } from "@/components/control-panel";
import { YoutubePreview } from "@/components/youtube-preview";

function PanelToggleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 4v16" />
    </svg>
  );
}

export default function Home() {
  const [isPanelVisible, setIsPanelVisible] = useState(true);

  return (
    <ThumbnailsProvider>
      <PreviewSettingsProvider>
        <div className="flex min-h-screen flex-col bg-app-bg lg:h-screen lg:flex-row lg:overflow-hidden">
          <div
            className={`shrink-0 overflow-x-hidden overflow-y-auto transition-[max-height,width,opacity] duration-300 ease-in-out lg:h-full ${
              isPanelVisible
                ? "max-h-100 w-full opacity-100 sm:max-h-125 lg:max-h-none lg:w-80"
                : "max-h-0 w-full opacity-0 lg:w-0"
            }`}
          >
            <ControlPanel onHide={() => setIsPanelVisible(false)} />
          </div>
          {!isPanelVisible && (
            <button
              type="button"
              aria-label="Mostrar painel"
              onClick={() => setIsPanelVisible(true)}
              className="fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg hover:bg-neutral-700"
            >
              <PanelToggleIcon />
            </button>
          )}
          <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center p-6 lg:items-stretch lg:overflow-hidden">
            <div className="mx-auto h-150 w-full min-w-0 sm:h-175 lg:h-full lg:max-w-350">
              <YoutubePreview />
            </div>
          </div>
        </div>
      </PreviewSettingsProvider>
    </ThumbnailsProvider>
  );
}
