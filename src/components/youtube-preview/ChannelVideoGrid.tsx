"use client";

import { VideoCard, type VideoCardProps } from "./VideoCard";
import { useThumbnailsContext } from "@/context/ThumbnailsContext";
import { useShuffledPositions } from "@/hooks/useShuffledPositions";
import { useFillerVideos } from "@/hooks/useFillerVideos";

const FILLER_COUNT = 8;

interface ChannelVideoGridProps {
  featured?: boolean;
}

export function ChannelVideoGrid({ featured = false }: ChannelVideoGridProps) {
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
    updateThumbnailImage,
  } = useThumbnailsContext();

  const displayName = globalChannelName || "Nome do canal";
  const slotCount = Math.max(thumbnails.length, FILLER_COUNT);
  const positions = useShuffledPositions(slotCount, slotCount, shuffleSeed);

  const cards: (VideoCardProps & { key: string })[] = Array.from(
    { length: slotCount },
    (_, renderIndex) => {
      const index = positions[renderIndex];
      const thumbnail = thumbnails[index];
      const mock = mockVideos[index % mockVideos.length];

      if (!thumbnail) {
        const override = cardOverrides[mock.id];
        return {
          key: `${mock.id}-${index}`,
          title: override?.title ?? mock.title,
          channelName: displayName,
          channelAvatarUrl: globalChannelAvatarUrl || undefined,
          views: mock.views,
          uploadedAt: mock.uploadedAt,
          duration: mock.duration,
          thumbnailUrl: override?.thumbnailUrl ?? mock.thumbnailUrl,
          onEditTitle: (value: string) =>
            setCardOverrideText(mock.id, "title", value),
          onEditThumbnail: (file: File) =>
            setCardOverrideImage(mock.id, file),
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
        onEditTitle: (value: string) => updateVideoTitle(thumbnail.id, value),
        onEditThumbnail: (file: File) =>
          updateThumbnailImage(thumbnail.id, file),
      };
    },
  );

  function renderCard({ key, ...video }: (typeof cards)[number]) {
    return <VideoCard key={key} {...video} editable={isEditMode} />;
  }

  if (featured && cards.length > 0) {
    const [heroCard, ...restCards] = cards;

    return (
      <div className="flex flex-col gap-6 p-6">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-4">
          {renderCard(heroCard)}
        </div>
        {restCards.length > 0 && (
          <div>
            <h2 className="mb-3 text-lg font-medium text-[var(--yt-text-primary)]">
              Vídeos
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] items-start gap-x-4 gap-y-6">
              {restCards.map(renderCard)}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] items-start gap-x-4 gap-y-6 p-6">
      {cards.map(renderCard)}
    </div>
  );
}
