import { SegmentedToggle } from "@/components/ui/SegmentedToggle";
import type { PageView } from "@/types/ui";

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9h12v-9" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ChannelIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
    </svg>
  );
}

interface PageViewSelectProps {
  pageView: PageView;
  onChange: (pageView: PageView) => void;
}

export function PageViewSelect({ pageView, onChange }: PageViewSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-neutral-600 dark:text-slate-400">Página</span>
      <SegmentedToggle
        value={pageView}
        onChange={onChange}
        options={[
          { value: "home", label: "Início", icon: <HomeIcon /> },
          { value: "search", label: "Busca", icon: <SearchIcon /> },
          { value: "channel", label: "Canal", icon: <ChannelIcon /> },
        ]}
      />
    </div>
  );
}
