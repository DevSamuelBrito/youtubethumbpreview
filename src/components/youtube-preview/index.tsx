import { YoutubeHeader } from "./YoutubeHeader";
import { YoutubeSidebarNav } from "./YoutubeSidebarNav";
import { VideoGrid } from "./VideoGrid";

export function YoutubePreview() {
  return (
    <div
      data-theme="light"
      className="yt-preview flex h-full w-full flex-col overflow-hidden rounded-lg border border-[var(--yt-border)] bg-[var(--yt-bg)] text-[var(--yt-text-primary)]"
    >
      <YoutubeHeader />
      <div className="flex flex-1 overflow-hidden">
        <YoutubeSidebarNav />
        <main className="flex-1 overflow-y-auto">
          <VideoGrid />
        </main>
      </div>
    </div>
  );
}

export default YoutubePreview;
