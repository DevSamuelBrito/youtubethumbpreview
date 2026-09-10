import { ThumbnailsProvider } from "@/context/ThumbnailsContext";
import { PreviewSettingsProvider } from "@/context/PreviewSettingsContext";
import { ControlPanel } from "@/components/control-panel";
import { YoutubePreview } from "@/components/youtube-preview";

export default function Home() {
  return (
    <ThumbnailsProvider>
      <PreviewSettingsProvider>
        <div className="flex min-h-screen flex-col bg-app-bg lg:h-screen lg:flex-row lg:overflow-hidden">
          <ControlPanel />
          <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center p-6 lg:items-stretch lg:overflow-hidden">
            <div className="mx-auto h-150 w-full min-w-0 sm:h-175 lg:h-full lg:max-w-350">
              <YoutubePreview />
            </div>
          </div>
        </div>
      </PreviewSettingsProvider>
    </ThumbnailsProvider>
  );
}
