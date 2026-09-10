function slugifyHandle(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "");
  return slug || "canal";
}

interface ChannelHeaderProps {
  isMobile: boolean;
  bannerUrl: string;
  avatarUrl: string;
  channelName: string;
  subscriberCount: string;
  videoCount: number;
  description: string;
}

export function ChannelHeader({
  isMobile,
  bannerUrl,
  avatarUrl,
  channelName,
  subscriberCount,
  videoCount,
  description,
}: ChannelHeaderProps) {
  const displayName = channelName || "Nome do canal";
  const avatarSizeClass = isMobile ? "h-16 w-16" : "h-24 w-24";
  const nameSizeClass = isMobile ? "text-xl" : "text-2xl";

  return (
    <div className="flex flex-col">
      <div
        style={{ aspectRatio: "6 / 1" }}
        className="w-full overflow-hidden bg-[var(--yt-hover)]"
      >
        {bannerUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- imagem vem de blob: URL local, incompatível com next/image
          <img
            src={bannerUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>

      <div
        className={
          isMobile
            ? "flex flex-col gap-3 px-4 py-4"
            : "flex items-center gap-5 px-6 py-5"
        }
      >
        <div
          className={`${avatarSizeClass} shrink-0 overflow-hidden rounded-full bg-[var(--yt-border)]`}
        >
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- imagem vem de blob: URL local, incompatível com next/image
            <img
              src={avatarUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h1
            className={`${nameSizeClass} truncate font-bold text-[var(--yt-text-primary)]`}
          >
            {displayName}
          </h1>
          <p className="truncate text-sm text-[var(--yt-text-secondary)]">
            @{slugifyHandle(displayName)} · {subscriberCount || "0 inscritos"}{" "}
            · {videoCount} {videoCount === 1 ? "vídeo" : "vídeos"}
          </p>
          {description ? (
            <p className="line-clamp-2 text-sm text-[var(--yt-text-secondary)]">
              {description}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          className="shrink-0 self-start rounded-full bg-[var(--yt-text-primary)] px-4 py-2 text-sm font-medium text-[var(--yt-bg)]"
        >
          Inscrever-se
        </button>
      </div>
    </div>
  );
}
