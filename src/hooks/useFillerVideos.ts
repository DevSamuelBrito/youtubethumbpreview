"use client";

import { useEffect, useState } from "react";
import { mockVideos, type MockVideo } from "@/components/youtube-preview/mockVideos";
import { fetchRealFillerVideos } from "@/components/youtube-preview/youtubeApi";

export function useFillerVideos(): MockVideo[] {
  const [videos, setVideos] = useState<MockVideo[]>(mockVideos);

  useEffect(() => {
    let isMounted = true;
    fetchRealFillerVideos().then((real) => {
      if (isMounted && real && real.length > 0) setVideos(real);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return videos;
}
