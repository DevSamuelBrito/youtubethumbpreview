import { useState } from "react";
import type { PageView } from "@/types/ui";

export function usePageView(initial: PageView = "home") {
  const [pageView, setPageView] = useState<PageView>(initial);
  return { pageView, setPageView };
}
