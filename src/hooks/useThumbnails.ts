// react
import { useCallback, useState } from "react";

// types
import type { CardOverride, Thumbnail } from "@/types/thumbnail";

// lib
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

  const setGlobalChannelAvatarFromUrl = useCallback((url: string) => {
    setGlobalChannelAvatarUrl((prev) => {
      if (prev.startsWith("blob:")) URL.revokeObjectURL(prev);
      return url;
    });
  }, []);

  const [channelBannerUrl, setChannelBannerUrl] = useState("");
  const [channelSubscriberCount, setChannelSubscriberCount] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [channelHandle, setChannelHandle] = useState("");

  const setChannelBanner = useCallback((file: File) => {
    setChannelBannerUrl((prev) => {
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

  const updateThumbnailImage = useCallback((id: string, file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setThumbnails((prev) =>
      prev.map((thumbnail) => {
        if (thumbnail.id !== id) return thumbnail;
        URL.revokeObjectURL(thumbnail.imageUrl);
        return { ...thumbnail, imageUrl };
      }),
    );
  }, []);

  const updateDescription = useCallback((id: string, description: string) => {
    setThumbnails((prev) =>
      prev.map((thumbnail) =>
        thumbnail.id === id ? { ...thumbnail, description } : thumbnail,
      ),
    );
  }, []);

  const [shuffleSeed, setShuffleSeed] = useState(0);

  const shuffleThumbnails = useCallback(() => {
    setShuffleSeed((seed) => seed + 1);
  }, []);

  const resetShuffle = useCallback(() => {
    setShuffleSeed(0);
  }, []);

  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
  }, []);

  const [cardOverrides, setCardOverrides] = useState<
    Record<string, CardOverride>
  >({});

  const setCardOverrideText = useCallback(
    (id: string, field: "title" | "channelName", value: string) => {
      setCardOverrides((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }));
    },
    [],
  );

  const setCardOverrideImage = useCallback((id: string, file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setCardOverrides((prev) => {
      const previousUrl = prev[id]?.thumbnailUrl;
      if (previousUrl) URL.revokeObjectURL(previousUrl);
      return { ...prev, [id]: { ...prev[id], thumbnailUrl: imageUrl } };
    });
  }, []);

  const clearCardOverrides = useCallback(() => {
    setCardOverrides((prev) => {
      Object.values(prev).forEach((override) => {
        if (override.thumbnailUrl) URL.revokeObjectURL(override.thumbnailUrl);
      });
      return {};
    });
  }, []);

  return {
    // thumbnails (CRUD)
    thumbnails,
    addThumbnail,
    removeThumbnail,
    updateVideoTitle,
    updateChannelName,
    updateThumbnailImage,
    updateDescription,

    // shuffle
    shuffleSeed,
    shuffleThumbnails,
    resetShuffle,

    // edição por card (modo de edição da prévia)
    isEditMode,
    toggleEditMode,
    cardOverrides,
    setCardOverrideText,
    setCardOverrideImage,
    clearCardOverrides,

    // identidade do canal
    globalChannelName,
    setGlobalChannelName,
    globalChannelAvatarUrl,
    setGlobalChannelAvatar,
    setGlobalChannelAvatarFromUrl,
    channelBannerUrl,
    setChannelBanner,
    channelSubscriberCount,
    setChannelSubscriberCount,
    channelDescription,
    setChannelDescription,
    channelHandle,
    setChannelHandle,
  };
}
