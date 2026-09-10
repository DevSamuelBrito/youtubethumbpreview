"use client";

import { useThumbnailsContext } from "@/context/ThumbnailsContext";
import { usePreviewSettingsContext } from "@/context/PreviewSettingsContext";
import { ThumbnailUploader } from "./ThumbnailUploader";
import { ThumbnailListItem } from "./ThumbnailListItem";
import { DeviceSelect } from "./DeviceSelect";
import { ThemeToggle } from "./ThemeToggle";

export function ControlPanel() {
  const {
    thumbnails,
    addThumbnail,
    removeThumbnail,
    updateVideoTitle,
    updateChannelName,
  } = useThumbnailsContext();

  const { theme, setTheme, device, setDevice } = usePreviewSettingsContext();

  return (
    <aside className="flex max-h-100 w-full shrink-0 flex-col gap-4 overflow-y-auto border-b border-neutral-200 bg-white p-4 sm:max-h-125 lg:h-full lg:max-h-none lg:w-80 lg:border-r lg:border-b-0">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-white">
          TP
        </div>
        <span className="text-base font-semibold tracking-tight text-neutral-900">
          ThumbPreview
        </span>
      </div>

      <h2 className="text-sm font-semibold text-neutral-900">Thumbnails</h2>
      <ThumbnailUploader onAdd={addThumbnail} />
      <ul className="flex flex-col gap-3">
        {thumbnails.map((thumbnail, index) => (
          <ThumbnailListItem
            key={thumbnail.id}
            thumbnail={thumbnail}
            index={index}
            onUpdateVideoTitle={updateVideoTitle}
            onUpdateChannelName={updateChannelName}
            onRemove={removeThumbnail}
          />
        ))}
      </ul>
      {thumbnails.length === 0 && (
        <p className="text-xs text-neutral-400">
          Nenhuma thumbnail adicionada ainda.
        </p>
      )}

      <div className="flex flex-col gap-3 border-t border-neutral-200 pt-4">
        <h2 className="text-sm font-semibold text-neutral-900">Preview</h2>
        <DeviceSelect device={device} onChange={setDevice} />
        <ThemeToggle theme={theme} onChange={setTheme} />
      </div>
    </aside>
  );
}

export default ControlPanel;
