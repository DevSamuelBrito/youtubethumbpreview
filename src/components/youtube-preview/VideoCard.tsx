"use client";

import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { PencilIcon, PlusCircleIcon } from "./icons";

export interface VideoCardProps {
  title: string;
  channelName: string;
  channelAvatarUrl?: string;
  views: string;
  uploadedAt: string;
  duration: string;
  thumbnailUrl?: string;
  thumbnailGradient?: string;
  editable?: boolean;
  onEditTitle?: (value: string) => void;
  onEditChannelName?: (value: string) => void;
  onEditThumbnail?: (file: File) => void;
}

export function VideoCard({
  title,
  channelName,
  channelAvatarUrl,
  views,
  uploadedAt,
  duration,
  thumbnailUrl,
  thumbnailGradient,
  editable = false,
  onEditTitle,
  onEditChannelName,
  onEditThumbnail,
}: VideoCardProps) {
  const [editingField, setEditingField] = useState<
    "title" | "channelName" | null
  >(null);
  const [draft, setDraft] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function startEditing(field: "title" | "channelName", current: string) {
    setDraft(current);
    setEditingField(field);
  }

  function commitEdit() {
    if (editingField === "title") onEditTitle?.(draft);
    if (editingField === "channelName") onEditChannelName?.(draft);
    setEditingField(null);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") commitEdit();
    if (event.key === "Escape") setEditingField(null);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) onEditThumbnail?.(file);
    event.target.value = "";
  }

  return (
    <article className="flex w-full flex-col gap-3">
      <div
        className="relative w-full overflow-hidden rounded-xl bg-[var(--yt-hover)]"
        style={{
          aspectRatio: "16 / 9",
          background: thumbnailUrl ? undefined : thumbnailGradient,
        }}
      >
        {thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- imagens vêm de blob:/data: URLs locais, incompatíveis com next/image
          <img
            src={thumbnailUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : null}
        <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-xs font-medium text-white">
          {duration}
        </span>
        {editable && (
          <>
            <button
              type="button"
              aria-label="Alterar imagem da thumbnail"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 text-white backdrop-blur-[1px]"
            >
              <PlusCircleIcon className="h-8 w-8" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </>
        )}
      </div>

      <div className="flex gap-3">
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[var(--yt-border)]">
          {channelAvatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- imagem vem de blob: URL local, incompatível com next/image
            <img
              src={channelAvatarUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          {editingField === "title" ? (
            <input
              autoFocus
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onBlur={commitEdit}
              onKeyDown={handleKeyDown}
              className="rounded border border-[var(--yt-border)] bg-[var(--yt-bg)] px-1 text-sm leading-5 font-medium text-[var(--yt-text-primary)] outline-none"
            />
          ) : (
            <div className="flex items-start gap-1">
              <h3 className="min-w-0 flex-1 text-sm leading-5 font-medium text-[var(--yt-text-primary)]">
                {title}
              </h3>
              {editable && (
                <button
                  type="button"
                  aria-label="Editar título"
                  onClick={() => startEditing("title", title)}
                  className="mt-0.5 shrink-0 text-[var(--yt-text-secondary)] hover:text-[var(--yt-text-primary)]"
                >
                  <PencilIcon />
                </button>
              )}
            </div>
          )}

          {editingField === "channelName" ? (
            <input
              autoFocus
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onBlur={commitEdit}
              onKeyDown={handleKeyDown}
              className="mt-1 rounded border border-[var(--yt-border)] bg-[var(--yt-bg)] px-1 text-xs leading-[18px] text-[var(--yt-text-secondary)] outline-none"
            />
          ) : (
            <div className="flex items-center gap-1">
              <p className="min-w-0 flex-1 truncate text-xs leading-[18px] text-[var(--yt-text-secondary)]">
                {channelName}
              </p>
              {editable && (
                <button
                  type="button"
                  aria-label="Editar nome do canal"
                  onClick={() => startEditing("channelName", channelName)}
                  className="shrink-0 text-[var(--yt-text-secondary)] hover:text-[var(--yt-text-primary)]"
                >
                  <PencilIcon />
                </button>
              )}
            </div>
          )}

          <p className="truncate text-xs leading-[18px] text-[var(--yt-text-secondary)]">
            {views} · {uploadedAt}
          </p>
        </div>
      </div>
    </article>
  );
}
