interface ShowMoreButtonProps {
  onClick: () => void;
}

export function ShowMoreButton({ onClick }: ShowMoreButtonProps) {
  return (
    <div className="flex justify-center py-6">
      <button
        type="button"
        onClick={onClick}
        className="rounded-full bg-[var(--yt-chip-bg)] px-5 py-2 text-sm font-medium text-[var(--yt-text-primary)] hover:bg-[var(--yt-border)]"
      >
        Mostrar mais
      </button>
    </div>
  );
}
