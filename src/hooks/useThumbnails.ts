import { useCallback, useState } from "react";
import type { Thumbnail } from "@/types/thumbnail";
import { generateId } from "@/lib/utils";

export function useThumbnails() {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [globalChannelName, setGlobalChannelName] = useState("");
  const [globalChannelAvatarUrl, setGlobalChannelAvatarUrl] = useState("");

  const setGlobalChannelAvatar = useCallback((file: File) => {
    setGlobalChannelAvatarUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }, []);

  const addThumbnail = useCallback((file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setThumbnails((prev) => [
      ...prev,
      {
        id: generateId(),
        imageUrl,
        videoTitle: "",
        channelName: "",
        description: "",
      },
    ]);
  }, []);

  const removeThumbnail = useCallback((id: string) => {
    setThumbnails((prev) => {
      const target = prev.find((thumbnail) => thumbnail.id === id);
      if (target) URL.revokeObjectURL(target.imageUrl);
      return prev.filter((thumbnail) => thumbnail.id !== id);
    });
  }, []);

  const updateVideoTitle = useCallback((id: string, videoTitle: string) => {
    setThumbnails((prev) =>
      prev.map((thumbnail) =>
        thumbnail.id === id ? { ...thumbnail, videoTitle } : thumbnail,
      ),
    );
  }, []);

  const updateChannelName = useCallback((id: string, channelName: string) => {
    setThumbnails((prev) =>
      prev.map((thumbnail) =>
        thumbnail.id === id ? { ...thumbnail, channelName } : thumbnail,
      ),
    );
  }, []);

  const updateDescription = useCallback((id: string, description: string) => {
    setThumbnails((prev) =>
      prev.map((thumbnail) =>
        thumbnail.id === id ? { ...thumbnail, description } : thumbnail,
      ),
    );
  }, []);

  return {
    thumbnails,
    addThumbnail,
    removeThumbnail,
    updateVideoTitle,
    updateChannelName,
    updateDescription,
    globalChannelName,
    setGlobalChannelName,
    globalChannelAvatarUrl,
    setGlobalChannelAvatar,
  };
}
