import { ThumbnailsProvider } from "@/context/ThumbnailsContext";
import { ControlPanel } from "@/components/control-panel";
import { YoutubePreview } from "@/components/youtube-preview";

export default function Home() {
  return (
    <ThumbnailsProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-app-bg">
        <ControlPanel />
        <div className="flex flex-1 items-center justify-center overflow-auto p-6">
          <div className="h-200 w-full max-w-350">
            <YoutubePreview />
          </div>
        </div>
      </div>
    </ThumbnailsProvider>
  );
}
