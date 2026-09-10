import { ThumbnailsProvider } from "@/context/ThumbnailsContext";
import { PreviewSettingsProvider } from "@/context/PreviewSettingsContext";
import { ControlPanel } from "@/components/control-panel";
import { YoutubePreview } from "@/components/youtube-preview";

export default function Home() {
  return (
    <ThumbnailsProvider>
      <PreviewSettingsProvider>
        <div className="flex min-h-screen flex-col bg-app-bg lg:h-screen lg:w-screen lg:flex-row lg:overflow-hidden">
          <ControlPanel />
          <div className="flex flex-1 items-center justify-center p-6 lg:overflow-auto">
            <div className="h-150 w-full sm:h-175 lg:h-200 lg:max-w-350">
              <YoutubePreview />
            </div>
          </div>
        </div>
      </PreviewSettingsProvider>
    </ThumbnailsProvider>
  );
}
