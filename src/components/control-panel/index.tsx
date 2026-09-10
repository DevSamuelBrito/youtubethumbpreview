"use client";

import { useThumbnailsContext } from "@/context/ThumbnailsContext";
import { ThumbnailUploader } from "./ThumbnailUploader";
import { ThumbnailListItem } from "./ThumbnailListItem";

export function ControlPanel() {
  const {
    thumbnails,
    addThumbnail,
    removeThumbnail,
    updateVideoTitle,
    updateChannelName,
  } = useThumbnailsContext();

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
    </aside>
  );
}

export default ControlPanel;
