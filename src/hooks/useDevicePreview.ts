import { useState } from "react";
import type { DeviceMode } from "@/types/ui";

export function useDevicePreview(initial: DeviceMode = "pc") {
  const [device, setDevice] = useState<DeviceMode>(initial);
  return { device, setDevice };
}
