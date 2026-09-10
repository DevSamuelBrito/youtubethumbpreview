const filterChips = [
  "Tudo",
  "Shorts",
  "Não assistidos",
  "Assistidos",
  "Vídeos",
  "Enviados recentemente",
  "Ao vivo",
];

export function SearchFiltersBar() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[var(--yt-border)] bg-[var(--yt-bg)] px-6 py-3">
      <div className="yt-scrollbar-hide flex min-w-0 flex-1 gap-2 overflow-x-auto">
        {filterChips.map((chip, index) => (
          <button
            key={chip}
            type="button"
            className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium ${
              index === 0
                ? "bg-[var(--yt-chip-selected-bg)] text-[var(--yt-chip-selected-text)]"
                : "bg-[var(--yt-chip-bg)] text-[var(--yt-text-primary)] hover:bg-[var(--yt-border)]"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-[var(--yt-text-primary)]"
      >
        Filtros
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="var(--yt-icon)"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
          <circle cx="9" cy="6" r="2" fill="var(--yt-bg)" />
          <circle cx="15" cy="12" r="2" fill="var(--yt-bg)" />
          <circle cx="9" cy="18" r="2" fill="var(--yt-bg)" />
        </svg>
      </button>
    </div>
  );
}
