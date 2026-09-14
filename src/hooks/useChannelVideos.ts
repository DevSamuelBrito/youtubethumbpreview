"use client";

// react
import { useEffect, useState } from "react";

// youtube-preview
import type { MockVideo } from "@/components/youtube-preview/mockVideos";
import { fetchChannelByHandle } from "@/components/youtube-preview/youtubeApi";

// hooks
import { useFillerVideos } from "./useFillerVideos";

const DEBOUNCE_MS = 800;

interface ChannelVideosResult {
  handle: string;
  videos: MockVideo[];
}

export function useChannelVideos(handle: string): MockVideo[] {
  const fallback = useFillerVideos();
  const [result, setResult] = useState<ChannelVideosResult | null>(null);
  const trimmedHandle = handle.trim();

  useEffect(() => {
    if (!trimmedHandle) return;

    let isCancelled = false;
    const timeoutId = setTimeout(() => {
      fetchChannelByHandle(trimmedHandle).then((data) => {
        if (isCancelled) return;
        setResult(
          data && data.videos.length > 0
            ? { handle: trimmedHandle, videos: data.videos }
            : null,
        );
      });
    }, DEBOUNCE_MS);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [trimmedHandle]);

  if (!trimmedHandle) return fallback;
  if (result && result.handle === trimmedHandle) return result.videos;
  return fallback;
}
