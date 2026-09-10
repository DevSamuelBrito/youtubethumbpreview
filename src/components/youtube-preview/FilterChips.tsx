const chips = [
  "Tudo",
  "Música",
  "Jogos",
  "Notícias",
  "Ao vivo",
  "Programação",
  "Podcasts",
  "Esportes",
  "Humor",
];

export function FilterChips() {
  return (
    <div className="sticky top-0 z-10 flex gap-3 overflow-x-auto border-b border-[var(--yt-border)] bg-[var(--yt-bg)] px-6 py-3">
      {chips.map((chip, index) => (
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
  );
}
