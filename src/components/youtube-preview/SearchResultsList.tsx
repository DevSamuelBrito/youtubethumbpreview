"use client";

// react
import { useState } from "react";

// components
import { SearchResultItem } from "./SearchResultItem";
import { ShowMoreButton } from "./ShowMoreButton";

// context
import { useThumbnailsContext } from "@/context/ThumbnailsContext";

// hooks
import { useShuffledPositions } from "@/hooks/useShuffledPositions";
import { useFillerVideos } from "@/hooks/useFillerVideos";

// lib
import { DEFAULT_VISIBLE_VIDEO_COUNT } from "@/lib/constants";

interface SearchResultsListProps {
  isMobile: boolean;
}

export function SearchResultsList({ isMobile }: SearchResultsListProps) {
  const mockVideos = useFillerVideos();
  const {
    // thumbnails
    thumbnails,
    globalChannelName,
    globalChannelAvatarUrl,

    // shuffle
    shuffleSeed,

    // edição por card
    isEditMode,
    cardOverrides,
    setCardOverrideText,
    setCardOverrideImage,
    updateVideoTitle,
    updateChannelName,
    updateThumbnailImage,
  } = useThumbnailsContext();
  
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
      const override = cardOverrides[mock.id];
      return {
        key: `${mock.id}-${index}`,
        title: override?.title ?? mock.title,
        channelName: override?.channelName ?? mock.channelName,
        channelAvatarUrl: mock.channelAvatarUrl,
        views: mock.views,
        uploadedAt: mock.uploadedAt,
        duration: mock.duration,
        description: mock.description,
        thumbnailUrl: override?.thumbnailUrl ?? mock.thumbnailUrl,
        onEditTitle: (value: string) =>
          setCardOverrideText(mock.id, "title", value),
        onEditChannelName: (value: string) =>
          setCardOverrideText(mock.id, "channelName", value),
        onEditThumbnail: (file: File) => setCardOverrideImage(mock.id, file),
      };
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
      onEditTitle: (value: string) => updateVideoTitle(thumbnail.id, value),
      onEditChannelName: (value: string) =>
        updateChannelName(thumbnail.id, value),
      onEditThumbnail: (file: File) =>
        updateThumbnailImage(thumbnail.id, file),
    };
  });

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col divide-y divide-[var(--yt-border)] px-6">
        {results.map(({ key, ...result }) => (
          <SearchResultItem
            key={key}
            isMobile={isMobile}
            {...result}
            editable={isEditMode}
          />
        ))}
      </div>
      {!showAll && slotCount > guaranteedVisibleCount && (
        <ShowMoreButton onClick={() => setShowAll(true)} />
      )}
    </div>
  );
}
