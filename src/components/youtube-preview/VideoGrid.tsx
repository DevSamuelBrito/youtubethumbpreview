"use client";

import { VideoCard } from "./VideoCard";
import { mockVideos } from "./mockVideos";
import { useThumbnailsContext } from "@/context/ThumbnailsContext";

export function VideoGrid() {
  const { thumbnails } = useThumbnailsContext();
  const slotCount = Math.max(thumbnails.length, mockVideos.length);

  const cards = Array.from({ length: slotCount }, (_, index) => {
    const thumbnail = thumbnails[index];
    const mock = mockVideos[index % mockVideos.length];

    if (!thumbnail) {
      return { key: `${mock.id}-${index}`, ...mock };
    }

    return {
      key: thumbnail.id,
      title: thumbnail.videoTitle || "Título do vídeo",
      channelName: thumbnail.channelName || "Nome do canal",
      views: mock.views,
      uploadedAt: mock.uploadedAt,
      duration: mock.duration,
      thumbnailUrl: thumbnail.imageUrl,
    };
  });

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-x-4 gap-y-8 p-6">
      {cards.map(({ key, ...video }) => (
        <VideoCard key={key} {...video} />
      ))}
    </div>
  );
}
