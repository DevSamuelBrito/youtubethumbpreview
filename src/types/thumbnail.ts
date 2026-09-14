export interface Thumbnail {
  id: string;
  imageUrl: string;
  videoTitle: string;
  channelName: string;
  description: string;
}

export interface CardOverride {
  title?: string;
  channelName?: string;
  thumbnailUrl?: string;
}
