"use client";

import { VideoCard, type VideoCardProps } from "./VideoCard";
import { mockVideos } from "./mockVideos";
import { useThumbnailsContext } from "@/context/ThumbnailsContext";

const FILLER_COUNT = 8;

interface ChannelVideoGridProps {
  featured?: boolean;
}

export function ChannelVideoGrid({ featured = false }: ChannelVideoGridProps) {
  const { thumbnails, globalChannelName, globalChannelAvatarUrl } =
    useThumbnailsContext();

  const displayName = globalChannelName || "Nome do canal";
  const slotCount = Math.max(thumbnails.length, FILLER_COUNT);

  const cards: (VideoCardProps & { key: string })[] = Array.from(
    { length: slotCount },
    (_, index) => {
      const thumbnail = thumbnails[index];
      const mock = mockVideos[index % mockVideos.length];

      if (!thumbnail) {
        return {
          key: `${mock.id}-${index}`,
          title: mock.title,
          channelName: displayName,
          channelAvatarUrl: globalChannelAvatarUrl || undefined,
          views: mock.views,
          uploadedAt: mock.uploadedAt,
          duration: mock.duration,
          thumbnailGradient: mock.thumbnailGradient,
        };
      }

      return {
        key: thumbnail.id,
        title: thumbnail.videoTitle || "Título do vídeo",
        channelName: displayName,
        channelAvatarUrl: globalChannelAvatarUrl || undefined,
        views: mock.views,
        uploadedAt: mock.uploadedAt,
        duration: mock.duration,
        thumbnailUrl: thumbnail.imageUrl,
      };
    },
  );

  if (featured && cards.length > 0) {
    const [{ key: heroKey, ...heroProps }, ...restCards] = cards;

    return (
      <div className="flex flex-col gap-6 p-6">
        <div className="max-w-2xl">
          <VideoCard key={heroKey} {...heroProps} />
        </div>
        {restCards.length > 0 && (
          <div>
            <h2 className="mb-3 text-lg font-medium text-[var(--yt-text-primary)]">
              Vídeos
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] items-start gap-x-4 gap-y-6">
              {restCards.map(({ key, ...video }) => (
                <VideoCard key={key} {...video} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] items-start gap-x-4 gap-y-6 p-6">
      {cards.map(({ key, ...video }) => (
        <VideoCard key={key} {...video} />
      ))}
    </div>
  );
}
