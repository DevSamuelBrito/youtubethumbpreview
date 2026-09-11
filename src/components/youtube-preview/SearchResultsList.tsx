"use client";

import { useState } from "react";
import { SearchResultItem } from "./SearchResultItem";
import { ShowMoreButton } from "./ShowMoreButton";
import { mockVideos } from "./mockVideos";
import { useThumbnailsContext } from "@/context/ThumbnailsContext";
import { useShuffledPositions } from "@/hooks/useShuffledPositions";
import { DEFAULT_VISIBLE_VIDEO_COUNT } from "@/lib/constants";

interface SearchResultsListProps {
  isMobile: boolean;
}

export function SearchResultsList({ isMobile }: SearchResultsListProps) {
  const { thumbnails, globalChannelName, globalChannelAvatarUrl, shuffleSeed } =
    useThumbnailsContext();
  const slotCount = Math.max(thumbnails.length, mockVideos.length);
  const guaranteedVisibleCount = Math.min(
    Math.max(thumbnails.length, DEFAULT_VISIBLE_VIDEO_COUNT),
    slotCount,
  );
  const positions = useShuffledPositions(
    slotCount,
    guaranteedVisibleCount,
    shuffleSeed,
  );
  const [showAll, setShowAll] = useState(false);
  const [lastSeed, setLastSeed] = useState(shuffleSeed);

  if (shuffleSeed !== lastSeed) {
    setLastSeed(shuffleSeed);
    setShowAll(false);
  }

  const visibleCount = showAll ? slotCount : guaranteedVisibleCount;

  const results = Array.from({ length: visibleCount }, (_, renderIndex) => {
    const index = positions[renderIndex];
    const thumbnail = thumbnails[index];
    const mock = mockVideos[index % mockVideos.length];

    if (!thumbnail) {
      return { key: `${mock.id}-${index}`, ...mock };
    }

    return {
      key: thumbnail.id,
      title: thumbnail.videoTitle || "Título do vídeo",
      channelName:
        thumbnail.channelName || globalChannelName || "Nome do canal",
      channelAvatarUrl: globalChannelAvatarUrl || undefined,
      views: mock.views,
      uploadedAt: mock.uploadedAt,
      duration: mock.duration,
      description: thumbnail.description || mock.description,
      thumbnailUrl: thumbnail.imageUrl,
    };
  });

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col divide-y divide-[var(--yt-border)] px-6">
        {results.map(({ key, ...result }) => (
          <SearchResultItem key={key} isMobile={isMobile} {...result} />
        ))}
      </div>
      {!showAll && slotCount > guaranteedVisibleCount && (
        <ShowMoreButton onClick={() => setShowAll(true)} />
      )}
    </div>
  );
}
