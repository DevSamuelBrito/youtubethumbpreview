import type { MockVideo } from "./mockVideos";
import {
  formatViews,
  formatSubscribers,
  formatDuration,
  formatRelativeTime,
  parseIsoDuration,
} from "@/lib/videoFormat";

const CACHE_KEY = "thumbpreview:real-videos-cache-v1";
const CHANNEL_CACHE_PREFIX = "thumbpreview:channel-data-cache-v2:";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const MAX_CHANNEL_VIDEOS = 10;

interface YoutubeVideoItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    channelId: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      medium?: { url: string };
      high?: { url: string };
    };
  };
  statistics: { viewCount?: string };
  contentDetails: { duration: string };
}

interface YoutubeChannelItem {
  id: string;
  snippet: { thumbnails: { default?: { url: string } } };
}

interface YoutubeChannelByHandleItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: { default?: { url: string } };
  };
  statistics: { subscriberCount?: string };
  contentDetails: { relatedPlaylists: { uploads: string } };
}

interface YoutubePlaylistItem {
  snippet: {
    title: string;
    publishedAt: string;
    resourceId: { videoId: string };
    thumbnails: {
      medium?: { url: string };
      high?: { url: string };
    };
  };
}

interface YoutubeVideoStatsItem {
  id: string;
  statistics: { viewCount?: string };
  contentDetails: { duration: string };
}

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`YouTube API respondeu ${response.status}`);
  }
  return response.json();
}

function readCache(): MockVideo[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { fetchedAt: number; videos: MockVideo[] };
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
    return parsed.videos;
  } catch {
    return null;
  }
}

function writeCache(videos: MockVideo[]): void {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ fetchedAt: Date.now(), videos }),
    );
  } catch {
    // localStorage indisponível (modo privado, cota, etc.) — segue sem cache
  }
}

export async function fetchRealFillerVideos(): Promise<MockVideo[] | null> {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  if (!apiKey) return null;

  const cached = readCache();
  if (cached) return cached;

  try {
    const videosUrl =
      "https://www.googleapis.com/youtube/v3/videos" +
      "?part=snippet,statistics,contentDetails" +
      "&chart=mostPopular&regionCode=BR&maxResults=50" +
      `&key=${apiKey}`;
    const videosData = (await fetchJson(videosUrl)) as {
      items?: YoutubeVideoItem[];
    };
    const items = videosData.items ?? [];
    if (items.length === 0) return null;

    const channelIds = [
      ...new Set(items.map((item) => item.snippet.channelId)),
    ];
    const channelsUrl =
      "https://www.googleapis.com/youtube/v3/channels" +
      `?part=snippet&id=${channelIds.join(",")}` +
      `&key=${apiKey}`;
    const channelsData = (await fetchJson(channelsUrl)) as {
      items?: YoutubeChannelItem[];
    };
    const avatarByChannelId = new Map<string, string>();
    (channelsData.items ?? []).forEach((channel) => {
      const url = channel.snippet.thumbnails?.default?.url;
      if (url) avatarByChannelId.set(channel.id, url);
    });

    const videos: MockVideo[] = items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      channelName: item.snippet.channelTitle,
      channelAvatarUrl: avatarByChannelId.get(item.snippet.channelId) ?? "",
      views: formatViews(Number(item.statistics.viewCount ?? 0)),
      uploadedAt: formatRelativeTime(new Date(item.snippet.publishedAt)),
      duration: formatDuration(parseIsoDuration(item.contentDetails.duration)),
      thumbnailUrl:
        item.snippet.thumbnails.high?.url ??
        item.snippet.thumbnails.medium?.url ??
        "",
      description: item.snippet.description,
    }));

    writeCache(videos);
    return videos;
  } catch {
    return null;
  }
}

export interface ChannelApiData {
  channelName: string;
  channelAvatarUrl: string;
  subscriberCount: string;
  description: string;
  videos: MockVideo[];
}

function readChannelCache(handle: string): ChannelApiData | null {
  try {
    const raw = localStorage.getItem(CHANNEL_CACHE_PREFIX + handle);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      fetchedAt: number;
      data: ChannelApiData;
    };
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeChannelCache(handle: string, data: ChannelApiData): void {
  try {
    localStorage.setItem(
      CHANNEL_CACHE_PREFIX + handle,
      JSON.stringify({ fetchedAt: Date.now(), data }),
    );
  } catch {
    // localStorage indisponível — segue sem cache
  }
}

export async function fetchChannelByHandle(
  rawHandle: string,
): Promise<ChannelApiData | null> {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  if (!apiKey) return null;

  const handleWithoutAt = rawHandle.trim().replace(/^@/, "");
  if (!handleWithoutAt) return null;
  const handle = `@${handleWithoutAt}`;

  const cached = readChannelCache(handle);
  if (cached) return cached;

  try {
    const channelUrl =
      "https://www.googleapis.com/youtube/v3/channels" +
      "?part=snippet,statistics,contentDetails" +
      `&forHandle=${encodeURIComponent(handle)}` +
      `&key=${apiKey}`;
    const channelData = (await fetchJson(channelUrl)) as {
      items?: YoutubeChannelByHandleItem[];
    };
    const channel = channelData.items?.[0];
    if (!channel) return null;

    const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;
    const channelName = channel.snippet.title;
    const channelAvatarUrl = channel.snippet.thumbnails?.default?.url ?? "";
    const subscriberCount = formatSubscribers(
      Number(channel.statistics.subscriberCount ?? 0),
    );
    const description = channel.snippet.description;

    const playlistUrl =
      "https://www.googleapis.com/youtube/v3/playlistItems" +
      `?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50` +
      `&key=${apiKey}`;
    const playlistData = (await fetchJson(playlistUrl)) as {
      items?: YoutubePlaylistItem[];
    };
    const allItems = playlistData.items ?? [];
    if (allItems.length === 0) {
      const data: ChannelApiData = {
        channelName,
        channelAvatarUrl,
        subscriberCount,
        description,
        videos: [],
      };
      writeChannelCache(handle, data);
      return data;
    }

    // A playlist de uploads nem sempre vem ordenada do mais novo pro mais
    // antigo — ordenamos aqui pra garantir que pegamos os últimos vídeos.
    const sortedItems = [...allItems].sort(
      (a, b) =>
        new Date(b.snippet.publishedAt).getTime() -
        new Date(a.snippet.publishedAt).getTime(),
    );
    const latestItems = sortedItems.slice(0, MAX_CHANNEL_VIDEOS);

    const videoIds = latestItems.map(
      (item) => item.snippet.resourceId.videoId,
    );
    const videosUrl =
      "https://www.googleapis.com/youtube/v3/videos" +
      `?part=statistics,contentDetails&id=${videoIds.join(",")}` +
      `&key=${apiKey}`;
    const videosData = (await fetchJson(videosUrl)) as {
      items?: YoutubeVideoStatsItem[];
    };
    const statsByVideoId = new Map(
      (videosData.items ?? []).map((item) => [item.id, item]),
    );

    const videos: MockVideo[] = latestItems.map((item) => {
      const videoId = item.snippet.resourceId.videoId;
      const stats = statsByVideoId.get(videoId);
      return {
        id: videoId,
        title: item.snippet.title,
        channelName,
        channelAvatarUrl,
        views: formatViews(Number(stats?.statistics.viewCount ?? 0)),
        uploadedAt: formatRelativeTime(new Date(item.snippet.publishedAt)),
        duration: formatDuration(
          parseIsoDuration(stats?.contentDetails.duration ?? "PT0S"),
        ),
        thumbnailUrl:
          item.snippet.thumbnails.high?.url ??
          item.snippet.thumbnails.medium?.url ??
          "",
        description: "",
      };
    });

    const data: ChannelApiData = {
      channelName,
      channelAvatarUrl,
      subscriberCount,
      description,
      videos,
    };
    writeChannelCache(handle, data);
    return data;
  } catch {
    return null;
  }
}
