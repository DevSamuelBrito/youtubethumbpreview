interface NavItemDef {
  label: string;
  icon: (className: string) => React.ReactNode;
}

const mainItems: NavItemDef[] = [
  {
    label: "Início",
    icon: (c) => (
      <svg viewBox="0 0 24 24" className={c}>
        <path d="M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3z" />
      </svg>
    ),
  },
  {
    label: "Shorts",
    icon: (c) => (
      <svg viewBox="0 0 24 24" className={c}>
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3 10.7-4.5 2.6a.6.6 0 0 1-.9-.5V9.2a.6.6 0 0 1 .9-.5L15 11.3a.6.6 0 0 1 0 1.1z" />
      </svg>
    ),
  },
  {
    label: "Inscrições",
    icon: (c) => (
      <svg viewBox="0 0 24 24" className={c}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 18v-6l5 3zM20 6.4a2.5 2.5 0 0 0-1.77-1.77C16.6 4.2 12 4.2 12 4.2s-4.6 0-6.23.43A2.5 2.5 0 0 0 4 6.4 26 26 0 0 0 3.6 11a26 26 0 0 0 .4 4.6 2.5 2.5 0 0 0 1.77 1.77c1.63.43 6.23.43 6.23.43s4.6 0 6.23-.43A2.5 2.5 0 0 0 20 15.6a26 26 0 0 0 .4-4.6 26 26 0 0 0-.4-4.6z"
        />
      </svg>
    ),
  },
];

const libraryItems: NavItemDef[] = [
  {
    label: "Biblioteca",
    icon: (c) => (
      <svg viewBox="0 0 24 24" className={c}>
        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h10v2H4z" />
      </svg>
    ),
  },
  {
    label: "Histórico",
    icon: (c) => (
      <svg viewBox="0 0 24 24" className={c}>
        <path d="M12 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-2-4.9V10h5V5h-2v2.3A9 9 0 0 0 12 3zm-1 4v6l5 3 1-1.6-4.2-2.5V7z" />
      </svg>
    ),
  },
];

function NavSection({
  items,
  collapsed,
}: {
  items: NavItemDef[];
  collapsed: boolean;
}) {
  return (
    <nav className="flex flex-col gap-1 py-2">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          className={
            collapsed
              ? "flex flex-col items-center gap-1 rounded-lg px-1 py-4 text-center text-[10px] text-[var(--yt-text-primary)] hover:bg-[var(--yt-hover)]"
              : "flex items-center gap-6 rounded-lg px-3 py-2.5 text-left text-sm text-[var(--yt-text-primary)] hover:bg-[var(--yt-hover)]"
          }
        >
          {item.icon("h-6 w-6 shrink-0 fill-[var(--yt-icon)]")}
          <span className={collapsed ? "leading-tight" : undefined}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

interface YoutubeSidebarNavProps {
  collapsed: boolean;
}

export function YoutubeSidebarNav({ collapsed }: YoutubeSidebarNavProps) {
  return (
    <aside
      className={`flex shrink-0 flex-col overflow-y-auto overflow-x-hidden border-r border-[var(--yt-border)] bg-[var(--yt-bg)] transition-[width] duration-200 ease-out ${
        collapsed ? "w-18 px-1" : "w-60 px-2"
      }`}
    >
      <NavSection items={mainItems} collapsed={collapsed} />
      <div className="mx-3 my-1 border-t border-[var(--yt-border)]" />
      <NavSection items={libraryItems} collapsed={collapsed} />
    </aside>
  );
}
