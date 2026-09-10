import type { ChangeEvent } from "react";
import type { Thumbnail } from "@/types/thumbnail";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface ThumbnailListItemProps {
  thumbnail: Thumbnail;
  index: number;
  onUpdateVideoTitle: (id: string, value: string) => void;
  onUpdateChannelName: (id: string, value: string) => void;
  onRemove: (id: string) => void;
}

export function ThumbnailListItem({
  thumbnail,
  index,
  onUpdateVideoTitle,
  onUpdateChannelName,
  onRemove,
}: ThumbnailListItemProps) {
  return (
    <li className="flex gap-3 rounded-lg border border-neutral-200 p-3">
      {/* eslint-disable-next-line @next/next/no-img-element -- imagem vem de blob: URL local, incompatível com next/image */}
      <img
        src={thumbnail.imageUrl}
        alt=""
        className="h-14 w-24 shrink-0 rounded-md object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-400">
            {index === 0 ? "Vídeo em destaque" : `Vídeo ${index + 1}`}
          </span>
          <Button
            variant="danger"
            className="h-6 w-6 p-0 text-base leading-none"
            aria-label="Remover thumbnail"
            onClick={() => onRemove(thumbnail.id)}
          >
            ×
          </Button>
        </div>
        <Input
          placeholder="Nome do vídeo"
          value={thumbnail.videoTitle}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onUpdateVideoTitle(thumbnail.id, event.target.value)
          }
        />
        <Input
          placeholder="Nome do canal"
          value={thumbnail.channelName}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onUpdateChannelName(thumbnail.id, event.target.value)
          }
        />
      </div>
    </li>
  );
}
