"use client";

import { useState } from "react";
import { ChannelHeader } from "./ChannelHeader";
import { ChannelTabs, type ChannelTab } from "./ChannelTabs";
import { ChannelVideoGrid } from "./ChannelVideoGrid";
import { useThumbnailsContext } from "@/context/ThumbnailsContext";
import { useChannelVideos } from "@/hooks/useChannelVideos";
import { MAX_CHANNEL_FILLER_COUNT } from "@/lib/constants";

interface ChannelPageProps {
  isMobile: boolean;
}

export function ChannelPage({ isMobile }: ChannelPageProps) {
  const {
    thumbnails,
    globalChannelName,
    globalChannelAvatarUrl,
    channelBannerUrl,
    channelSubscriberCount,
    channelDescription,
    channelHandle,
  } = useThumbnailsContext();
  const mockVideos = useChannelVideos(channelHandle);
  const fillerCount = Math.min(mockVideos.length, MAX_CHANNEL_FILLER_COUNT);
  const [activeTab, setActiveTab] = useState<ChannelTab>("home");

  return (
    <div className="flex flex-col">
      <ChannelHeader
        isMobile={isMobile}
        bannerUrl={channelBannerUrl}
        avatarUrl={globalChannelAvatarUrl}
        channelName={globalChannelName}
        subscriberCount={channelSubscriberCount}
        videoCount={thumbnails.length + fillerCount}
        description={channelDescription}
      />
      <ChannelTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "videos" && (
        <div className="flex items-center gap-1.5 px-6 pt-4 text-sm font-medium text-[var(--yt-text-primary)]">
          Ordenar por: mais recentes
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      )}

      <ChannelVideoGrid featured={activeTab === "home"} />
    </div>
  );
}
