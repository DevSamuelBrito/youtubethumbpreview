import type { MockVideo } from "./mockVideos";
import {
  formatViews,
  formatDuration,
  formatRelativeTime,
  parseIsoDuration,
} from "@/lib/videoFormat";

const CACHE_KEY = "thumbpreview:real-videos-cache-v1";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

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
