"use client";

import { useState } from "react";
import { VideoCard } from "./VideoCard";
import { ShowMoreButton } from "./ShowMoreButton";
import { mockVideos } from "./mockVideos";
import { useThumbnailsContext } from "@/context/ThumbnailsContext";
import { useShuffledPositions } from "@/hooks/useShuffledPositions";
import { DEFAULT_VISIBLE_VIDEO_COUNT } from "@/lib/constants";

export function VideoGrid() {
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

  const cards = Array.from({ length: visibleCount }, (_, renderIndex) => {
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
      thumbnailUrl: thumbnail.imageUrl,
    };
  });

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] items-start gap-x-4 gap-y-8 p-6">
        {cards.map(({ key, ...video }) => (
          <VideoCard key={key} {...video} />
        ))}
      </div>
      {!showAll && slotCount > guaranteedVisibleCount && (
        <ShowMoreButton onClick={() => setShowAll(true)} />
      )}
    </div>
  );
}
