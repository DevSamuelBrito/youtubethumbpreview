"use client";

import { useEffect, useRef, useState } from "react";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function updateScrollState() {
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }

    updateScrollState();
    el.addEventListener("scroll", updateScrollState);

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, []);

  function scrollByDirection(direction: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="sticky top-0 z-10 border-b border-[var(--yt-border)] bg-[var(--yt-bg)]">
      <div className="relative flex items-center">
        {canScrollLeft && (
          <div className="absolute inset-y-0 left-0 z-10 flex items-center bg-gradient-to-r from-[var(--yt-bg)] via-[var(--yt-bg)] to-transparent py-2 pr-6 pl-1">
            <button
              type="button"
              aria-label="Rolar categorias para a esquerda"
              onClick={() => scrollByDirection(-1)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--yt-border)] bg-[var(--yt-bg)] shadow-sm"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[var(--yt-icon)]">
                <path d="M15.5 4.5 8 12l7.5 7.5 1.4-1.4L10.8 12l6.1-6.1z" />
              </svg>
            </button>
          </div>
        )}

        <div
          ref={scrollRef}
          className="yt-scrollbar-hide flex flex-1 gap-3 overflow-x-auto scroll-smooth px-6 py-3"
        >
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

        {canScrollRight && (
          <div className="absolute inset-y-0 right-0 z-10 flex items-center bg-gradient-to-l from-[var(--yt-bg)] via-[var(--yt-bg)] to-transparent py-2 pr-1 pl-6">
            <button
              type="button"
              aria-label="Rolar categorias para a direita"
              onClick={() => scrollByDirection(1)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--yt-border)] bg-[var(--yt-bg)] shadow-sm"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[var(--yt-icon)]">
                <path d="m8.5 4.5 7.5 7.5-7.5 7.5L7.1 18.1 13.2 12 7.1 5.9z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
