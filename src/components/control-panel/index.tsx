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

  const { theme, toggleTheme, device, setDevice } =
    usePreviewSettingsContext();

  return (
    <aside className="flex w-80 shrink-0 flex-col gap-4 overflow-y-auto border-r border-neutral-200 bg-white p-4">
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
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
    </aside>
  );
}

export default ControlPanel;
