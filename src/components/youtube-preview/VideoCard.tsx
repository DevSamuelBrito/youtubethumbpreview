export interface VideoCardProps {
  title: string;
  channelName: string;
  views: string;
  uploadedAt: string;
  duration: string;
  thumbnailUrl?: string;
  thumbnailGradient?: string;
}

export function VideoCard({
  title,
  channelName,
  views,
  uploadedAt,
  duration,
  thumbnailUrl,
  thumbnailGradient,
}: VideoCardProps) {
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
      </div>

      <div className="flex gap-3">
        <div className="h-9 w-9 shrink-0 rounded-full bg-[var(--yt-border)]" />
        <div className="flex min-w-0 flex-col">
          <h3 className="line-clamp-2 text-sm leading-5 font-medium text-[var(--yt-text-primary)]">
            {title}
          </h3>
          <p className="mt-1 truncate text-xs leading-[18px] text-[var(--yt-text-secondary)]">
            {channelName}
          </p>
          <p className="truncate text-xs leading-[18px] text-[var(--yt-text-secondary)]">
            {views} · {uploadedAt}
          </p>
        </div>
      </div>
    </article>
  );
}
