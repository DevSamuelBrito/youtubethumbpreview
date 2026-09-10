import { VideoCard } from "./VideoCard";
import { mockVideos } from "./mockVideos";

export function VideoGrid() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-x-4 gap-y-8 p-6">
      {mockVideos.map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </div>
  );
}
