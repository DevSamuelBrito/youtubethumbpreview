export type ChannelTab = "home" | "videos";

interface ChannelTabsProps {
  activeTab: ChannelTab;
  onChange: (tab: ChannelTab) => void;
}

const tabs: { value: ChannelTab; label: string }[] = [
  { value: "home", label: "Início" },
  { value: "videos", label: "Vídeos" },
];

export function ChannelTabs({ activeTab, onChange }: ChannelTabsProps) {
  return (
    <div className="sticky top-0 z-10 flex gap-6 border-b border-[var(--yt-border)] bg-[var(--yt-bg)] px-6">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={`border-b-2 px-1 py-3 text-sm font-medium ${
            activeTab === tab.value
              ? "border-[var(--yt-text-primary)] text-[var(--yt-text-primary)]"
              : "border-transparent text-[var(--yt-text-secondary)] hover:text-[var(--yt-text-primary)]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
