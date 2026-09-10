"use client";

import { SearchResultItem } from "./SearchResultItem";
import { mockVideos } from "./mockVideos";
import { useThumbnailsContext } from "@/context/ThumbnailsContext";

interface SearchResultsListProps {
  isMobile: boolean;
}

export function SearchResultsList({ isMobile }: SearchResultsListProps) {
  const { thumbnails, globalChannelName, globalChannelAvatarUrl } =
    useThumbnailsContext();
  const slotCount = Math.max(thumbnails.length, mockVideos.length);

  const results = Array.from({ length: slotCount }, (_, index) => {
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
    <div className="flex max-w-4xl flex-col divide-y divide-[var(--yt-border)] px-6">
      {results.map(({ key, ...result }) => (
        <SearchResultItem key={key} isMobile={isMobile} {...result} />
      ))}
    </div>
  );
}
