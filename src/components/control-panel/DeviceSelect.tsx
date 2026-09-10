import { SegmentedToggle } from "@/components/ui/SegmentedToggle";
import type { DeviceMode } from "@/types/ui";

function MonitorIcon() {
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
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}

function SmartphoneIcon() {
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
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

interface DeviceSelectProps {
  device: DeviceMode;
  onChange: (device: DeviceMode) => void;
}

export function DeviceSelect({ device, onChange }: DeviceSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-neutral-600">
        Visualização
      </span>
      <SegmentedToggle
        value={device}
        onChange={onChange}
        options={[
          { value: "pc", label: "PC", icon: <MonitorIcon /> },
          { value: "mobile", label: "Mobile", icon: <SmartphoneIcon /> },
        ]}
      />
    </div>
  );
}
