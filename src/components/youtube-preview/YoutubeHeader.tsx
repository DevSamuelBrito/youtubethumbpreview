interface YoutubeHeaderProps {
  isMobile: boolean;
  onToggleSidebar: () => void;
}

export function YoutubeHeader({ isMobile, onToggleSidebar }: YoutubeHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-[var(--yt-border)] bg-[var(--yt-header-bg)] px-4">
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          aria-label="Menu"
          onClick={onToggleSidebar}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-[var(--yt-hover)]"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[var(--yt-icon)]">
            <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
          </svg>
        </button>
        <span className="text-lg font-semibold tracking-tight text-[var(--yt-text-primary)]">
          ThumbPreview
        </span>
      </div>

      {!isMobile && (
        <div className="flex min-w-0 max-w-120 flex-1 items-center gap-3">
          <div className="flex min-w-0 flex-1 items-center">
            <div className="flex h-9 min-w-0 flex-1 items-center rounded-l-full border border-[var(--yt-search-border)] bg-[var(--yt-search-bg)] pl-3.5">
              <input
                type="text"
                placeholder="Pesquisar"
                className="h-full w-full min-w-0 bg-transparent text-sm text-[var(--yt-text-primary)] placeholder:text-[var(--yt-text-secondary)] focus:outline-none"
              />
            </div>
            <button
              type="button"
              aria-label="Pesquisar"
              className="flex h-9 w-12 shrink-0 items-center justify-center rounded-r-full border border-l-0 border-[var(--yt-search-border)] bg-[var(--yt-hover)]"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-[var(--yt-icon)]">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 5L20.49 19zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14" />
              </svg>
            </button>
          </div>
          <button
            type="button"
            aria-label="Pesquisar por voz"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--yt-hover)]"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-[var(--yt-icon)]">
              <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-2.08A7 7 0 0 0 19 12z" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex shrink-0 items-center gap-2">
        {isMobile && (
          <button
            type="button"
            aria-label="Pesquisar"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-[var(--yt-hover)]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[var(--yt-icon)]">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 5L20.49 19zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14" />
            </svg>
          </button>
        )}
        <button
          type="button"
          aria-label="Criar"
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[var(--yt-hover)]"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path
              d="M12 5v14M5 12h14"
              stroke="var(--yt-icon)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Notificações"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-[var(--yt-hover)]"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[var(--yt-icon)]">
            <path d="M12 22a2.2 2.2 0 0 0 2.2-2.2h-4.4A2.2 2.2 0 0 0 12 22zm7-6v-5a7 7 0 0 0-5.5-6.84V3a1.5 1.5 0 0 0-3 0v1.16A7 7 0 0 0 5 11v5l-2 2v1h18v-1z" />
          </svg>
        </button>
        <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-[var(--yt-hover)] to-[var(--yt-border)]" />
      </div>
    </header>
  );
}
