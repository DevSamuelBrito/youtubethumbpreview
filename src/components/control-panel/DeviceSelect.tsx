import { Select } from "@/components/ui/Select";
import type { DeviceMode } from "@/types/ui";

interface DeviceSelectProps {
  device: DeviceMode;
  onChange: (device: DeviceMode) => void;
}

export function DeviceSelect({ device, onChange }: DeviceSelectProps) {
  return (
    <Select
      label="Visualização"
      value={device}
      onChange={(event) => onChange(event.target.value as DeviceMode)}
      options={[
        { value: "pc", label: "PC" },
        { value: "mobile", label: "Mobile" },
      ]}
    />
  );
}
