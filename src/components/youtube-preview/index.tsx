"use client";

import { YoutubeHeader } from "./YoutubeHeader";
import { YoutubeSidebarNav } from "./YoutubeSidebarNav";
import { FilterChips } from "./FilterChips";
import { VideoGrid } from "./VideoGrid";
import { usePreviewSettingsContext } from "@/context/PreviewSettingsContext";

export function YoutubePreview() {
  const { theme, device } = usePreviewSettingsContext();
  const isMobile = device === "mobile";

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        data-theme={theme}
        className={`yt-preview flex h-full flex-col overflow-hidden rounded-lg border border-[var(--yt-border)] bg-[var(--yt-bg)] text-[var(--yt-text-primary)] ${
          isMobile ? "w-105" : "w-full"
        }`}
      >
        <YoutubeHeader />
        <div className="flex flex-1 overflow-hidden">
          {!isMobile && <YoutubeSidebarNav />}
          <main className="flex-1 overflow-y-auto">
            <FilterChips />
            <VideoGrid />
          </main>
        </div>
      </div>
    </div>
  );
}

export default YoutubePreview;
