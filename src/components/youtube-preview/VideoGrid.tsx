"use client";

import { useState } from "react";
import { VideoCard } from "./VideoCard";
import { ShowMoreButton } from "./ShowMoreButton";
import { useThumbnailsContext } from "@/context/ThumbnailsContext";
import { useShuffledPositions } from "@/hooks/useShuffledPositions";
import { useFillerVideos } from "@/hooks/useFillerVideos";
import { DEFAULT_VISIBLE_VIDEO_COUNT } from "@/lib/constants";

export function VideoGrid() {
  const mockVideos = useFillerVideos();
  const {
    thumbnails,
    globalChannelName,
    globalChannelAvatarUrl,
    shuffleSeed,
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

  const cards = Array.from({ length: visibleCount }, (_, renderIndex) => {
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
      thumbnailUrl: thumbnail.imageUrl,
      onEditTitle: (value: string) => updateVideoTitle(thumbnail.id, value),
      onEditChannelName: (value: string) =>
        updateChannelName(thumbnail.id, value),
      onEditThumbnail: (file: File) =>
        updateThumbnailImage(thumbnail.id, file),
    };
  });

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] items-start gap-x-4 gap-y-8 p-6">
        {cards.map(({ key, ...video }) => (
          <VideoCard key={key} {...video} editable={isEditMode} />
        ))}
      </div>
      {!showAll && slotCount > guaranteedVisibleCount && (
        <ShowMoreButton onClick={() => setShowAll(true)} />
      )}
    </div>
  );
}
