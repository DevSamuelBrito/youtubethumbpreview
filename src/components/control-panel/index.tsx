"use client";

import { useThumbnailsContext } from "@/context/ThumbnailsContext";
import { usePreviewSettingsContext } from "@/context/PreviewSettingsContext";
import { Input } from "@/components/ui/Input";
import { ChannelAvatarUploader } from "./ChannelAvatarUploader";
import { ThumbnailUploader } from "./ThumbnailUploader";
import { ThumbnailListItem } from "./ThumbnailListItem";
import { DeviceSelect } from "./DeviceSelect";
import { PageViewSelect } from "./PageViewSelect";
import { ThemeToggle } from "./ThemeToggle";

function PanelToggleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4.5 w-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 4v16" />
    </svg>
  );
}

interface ControlPanelProps {
  onHide: () => void;
}

export function ControlPanel({ onHide }: ControlPanelProps) {
  const {
    thumbnails,
    addThumbnail,
    removeThumbnail,
    updateVideoTitle,
    updateChannelName,
    updateDescription,
    globalChannelName,
    setGlobalChannelName,
    globalChannelAvatarUrl,
    setGlobalChannelAvatar,
  } = useThumbnailsContext();

  const { theme, setTheme, device, setDevice, pageView, setPageView } =
    usePreviewSettingsContext();

  return (
    <aside className="flex h-full w-full flex-col gap-4 overflow-y-auto border-b border-neutral-200 bg-white p-4 lg:border-r lg:border-b-0">
      <div className="flex items-center justify-between gap-2">
        <span className="text-base font-semibold tracking-tight text-neutral-900">
          ThumbPreview
        </span>
        <button
          type="button"
          aria-label="Ocultar painel"
          onClick={onHide}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
        >
          <PanelToggleIcon />
        </button>
      </div>

      <div className="flex flex-col gap-3 border-b border-neutral-200 pb-4">
        <ChannelAvatarUploader
          avatarUrl={globalChannelAvatarUrl}
          onChange={setGlobalChannelAvatar}
        />
        <Input
          label="Nome do canal (padrão para todas)"
          placeholder="Nome do canal"
          value={globalChannelName}
          onChange={(event) => setGlobalChannelName(event.target.value)}
        />
        <DeviceSelect device={device} onChange={setDevice} />
        <PageViewSelect pageView={pageView} onChange={setPageView} />
        <ThemeToggle theme={theme} onChange={setTheme} />
      </div>

      <h2 className="text-sm font-semibold text-neutral-900">Thumbnails</h2>
      <ThumbnailUploader onAdd={addThumbnail} />

      <ul className="flex flex-col gap-3">
        {thumbnails.map((thumbnail, index) => (
          <ThumbnailListItem
            key={thumbnail.id}
            thumbnail={thumbnail}
            index={index}
            channelNamePlaceholder={globalChannelName || "Nome do canal"}
            onUpdateVideoTitle={updateVideoTitle}
            onUpdateChannelName={updateChannelName}
            onUpdateDescription={updateDescription}
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
