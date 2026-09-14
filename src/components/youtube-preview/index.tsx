"use client";

// react
import { useState } from "react";

// components
import { YoutubeHeader } from "./YoutubeHeader";
import { YoutubeSidebarNav } from "./YoutubeSidebarNav";
import { FilterChips } from "./FilterChips";
import { VideoGrid } from "./VideoGrid";
import { SearchFiltersBar } from "./SearchFiltersBar";
import { SearchResultsList } from "./SearchResultsList";
import { ChannelPage } from "./ChannelPage";

// context
import { usePreviewSettingsContext } from "@/context/PreviewSettingsContext";
import { useThumbnailsContext } from "@/context/ThumbnailsContext";

export function YoutubePreview() {
  const { theme, device, pageView } = usePreviewSettingsContext();
  const { globalChannelAvatarUrl } = useThumbnailsContext();
  const isMobile = device === "mobile";
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  function handleToggleSidebar() {
    if (isMobile) {
      setIsMobileNavOpen((prev) => !prev);
    } else {
      setIsSidebarCollapsed((prev) => !prev);
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        data-theme={theme}
        className={`yt-preview flex h-full flex-col overflow-hidden rounded-lg border border-[var(--yt-border)] bg-[var(--yt-bg)] text-[var(--yt-text-primary)] ${
          isMobile ? "w-105" : "w-full"
        }`}
      >
        <YoutubeHeader
          isMobile={isMobile}
          onToggleSidebar={handleToggleSidebar}
          channelAvatarUrl={globalChannelAvatarUrl}
        />
        <div className="relative flex flex-1 overflow-hidden">
          {!isMobile && <YoutubeSidebarNav collapsed={isSidebarCollapsed} />}
          <main className="flex-1 overflow-y-auto">
            {pageView === "home" && (
              <>
                <FilterChips />
                <VideoGrid />
              </>
            )}
            {pageView === "search" && (
              <>
                <SearchFiltersBar />
                <SearchResultsList isMobile={isMobile} />
              </>
            )}
            {pageView === "channel" && <ChannelPage isMobile={isMobile} />}
          </main>

          {isMobile && (
            <>
              <div
                aria-hidden
                onClick={() => setIsMobileNavOpen(false)}
                className={`absolute inset-0 z-20 bg-black/50 transition-opacity duration-200 ${
                  isMobileNavOpen
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
              />
              <div
                className={`absolute inset-y-0 left-0 z-30 w-60 shadow-xl transition-transform duration-200 ease-out ${
                  isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <YoutubeSidebarNav collapsed={false} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default YoutubePreview;
