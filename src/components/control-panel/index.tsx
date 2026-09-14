"use client";

import { useThumbnailsContext } from "@/context/ThumbnailsContext";
import { usePreviewSettingsContext } from "@/context/PreviewSettingsContext";
import { ChannelSettingsPanel } from "./ChannelSettingsPanel";
import { ThumbnailUploader } from "./ThumbnailUploader";
import { ThumbnailListItem } from "./ThumbnailListItem";
import { DeviceSelect } from "./DeviceSelect";
import { PageViewSelect } from "./PageViewSelect";
import { ThemeToggle } from "./ThemeToggle";
import { AppThemeToggle } from "./AppThemeToggle";
import { PencilIcon } from "@/components/youtube-preview/icons";

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

function DiceIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8" cy="8" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="8" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="8" cy="16" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function UndoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10h9a5 5 0 0 1 0 10h-2" />
      <path d="M7 5 3 10l4 5" />
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
    updateThumbnailImage,
    updateDescription,
    shuffleSeed,
    shuffleThumbnails,
    resetShuffle,
    isEditMode,
    toggleEditMode,
    globalChannelName,
    setGlobalChannelName,
    globalChannelAvatarUrl,
    setGlobalChannelAvatar,
    channelBannerUrl,
    setChannelBanner,
    channelSubscriberCount,
    setChannelSubscriberCount,
    channelDescription,
    setChannelDescription,
  } = useThumbnailsContext();

  const {
    theme,
    setTheme,
    device,
    setDevice,
    pageView,
    setPageView,
    appTheme,
    setAppTheme,
  } = usePreviewSettingsContext();

  return (
    <aside className="flex h-full w-full flex-col gap-4 overflow-y-auto border-b border-neutral-200 bg-white p-4 lg:border-r lg:border-b-0 dark:border-slate-600 dark:bg-slate-700">
      <div className="flex items-center justify-between gap-2">
        <span className="text-base font-semibold tracking-tight text-neutral-900 dark:text-slate-100">
          ThumbPreview
        </span>
        <div className="flex items-center gap-1">
          <AppThemeToggle appTheme={appTheme} onChange={setAppTheme} />
          <button
            type="button"
            aria-label="Ocultar painel"
            onClick={onHide}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-100"
          >
            <PanelToggleIcon />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-b border-neutral-200 pb-4 dark:border-slate-600">
        <DeviceSelect device={device} onChange={setDevice} />
        <PageViewSelect pageView={pageView} onChange={setPageView} />
        <ThemeToggle theme={theme} onChange={setTheme} />
      </div>

      <ChannelSettingsPanel
        bannerUrl={channelBannerUrl}
        onBannerChange={setChannelBanner}
        avatarUrl={globalChannelAvatarUrl}
        onAvatarChange={setGlobalChannelAvatar}
        channelName={globalChannelName}
        onChannelNameChange={setGlobalChannelName}
        subscriberCount={channelSubscriberCount}
        onSubscriberCountChange={setChannelSubscriberCount}
        description={channelDescription}
        onDescriptionChange={setChannelDescription}
      />

      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-neutral-900 dark:text-slate-100">
          Thumbnails
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Editar cards individualmente na prévia"
            title="Modo de edição por card"
            aria-pressed={isEditMode}
            onClick={toggleEditMode}
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
              isEditMode
                ? "bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-slate-400 dark:text-slate-900 dark:hover:bg-slate-300"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-100"
            }`}
          >
            <PencilIcon className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="Remover embaralhamento"
            title="Voltar à ordem original"
            onClick={resetShuffle}
            disabled={shuffleSeed === 0}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-100"
          >
            <UndoIcon />
          </button>
          <button
            type="button"
            aria-label="Embaralhar ordem das thumbnails"
            title="Embaralhar ordem"
            onClick={shuffleThumbnails}
            disabled={thumbnails.length === 0}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-100"
          >
            <DiceIcon />
          </button>
        </div>
      </div>
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
            onUpdateImage={updateThumbnailImage}
            onRemove={removeThumbnail}
          />
        ))}
      </ul>
      {thumbnails.length === 0 && (
        <p className="text-xs text-neutral-400 dark:text-slate-500">
          Nenhuma thumbnail adicionada ainda.
        </p>
      )}
    </aside>
  );
}

export default ControlPanel;
