export interface SearchResultItemProps {
  title: string;
  channelName: string;
  channelAvatarUrl?: string;
  views: string;
  uploadedAt: string;
  duration: string;
  description: string;
  thumbnailUrl?: string;
  thumbnailGradient?: string;
  isMobile: boolean;
}

export function SearchResultItem({
  title,
  channelName,
  channelAvatarUrl,
  views,
  uploadedAt,
  duration,
  description,
  thumbnailUrl,
  thumbnailGradient,
  isMobile,
}: SearchResultItemProps) {
  return (
    <article
      className={
        isMobile ? "flex flex-col gap-2 py-3" : "flex gap-4 py-4"
      }
    >
      <div
        className={
          isMobile
            ? "relative w-full shrink-0 overflow-hidden rounded-xl bg-[var(--yt-hover)]"
            : "relative w-90 shrink-0 overflow-hidden rounded-xl bg-[var(--yt-hover)]"
        }
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

      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="text-base leading-6 font-medium text-[var(--yt-text-primary)]">
          {title}
        </h3>
        <p className="text-xs text-[var(--yt-text-secondary)]">
          {views} · {uploadedAt}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full bg-[var(--yt-border)]">
            {channelAvatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- imagem vem de blob: URL local, incompatível com next/image
              <img
                src={channelAvatarUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
          <span className="truncate text-xs text-[var(--yt-text-secondary)]">
            {channelName}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-[var(--yt-text-secondary)]">
          {description}
        </p>
      </div>
    </article>
  );
}
