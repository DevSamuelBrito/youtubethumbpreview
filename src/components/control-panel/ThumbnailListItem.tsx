import { useRef, type ChangeEvent } from "react";
import type { Thumbnail } from "@/types/thumbnail";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PencilIcon } from "@/components/youtube-preview/icons";
import { generateLoremText } from "@/lib/utils";

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z" />
      <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z" />
    </svg>
  );
}

interface ThumbnailListItemProps {
  thumbnail: Thumbnail;
  index: number;
  channelNamePlaceholder: string;
  onUpdateVideoTitle: (id: string, value: string) => void;
  onUpdateChannelName: (id: string, value: string) => void;
  onUpdateDescription: (id: string, value: string) => void;
  onUpdateImage: (id: string, file: File) => void;
  onRemove: (id: string) => void;
}

export function ThumbnailListItem({
  thumbnail,
  index,
  channelNamePlaceholder,
  onUpdateVideoTitle,
  onUpdateChannelName,
  onUpdateDescription,
  onUpdateImage,
  onRemove,
}: ThumbnailListItemProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) onUpdateImage(thumbnail.id, file);
    event.target.value = "";
  }

  return (
    <li className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-3 dark:border-slate-600">
      <div className="relative w-full overflow-hidden rounded-md bg-neutral-100 dark:bg-slate-600">
        {/* eslint-disable-next-line @next/next/no-img-element -- imagem vem de blob: URL local, incompatível com next/image */}
        <img
          src={thumbnail.imageUrl}
          alt=""
          className="aspect-video w-full object-cover"
        />
        <button
          type="button"
          aria-label="Trocar imagem da thumbnail"
          title="Trocar imagem"
          onClick={() => fileInputRef.current?.click()}
          className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-opacity hover:bg-black/40 hover:opacity-100"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-400 dark:text-slate-500">
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
        placeholder={channelNamePlaceholder}
        value={thumbnail.channelName}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onUpdateChannelName(thumbnail.id, event.target.value)
        }
      />
      <div className="relative">
        <Input
          placeholder="Descrição do vídeo"
          value={thumbnail.description}
          style={{ paddingRight: "2.25rem" }}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onUpdateDescription(thumbnail.id, event.target.value)
          }
        />
        <button
          type="button"
          aria-label="Preencher descrição com texto de exemplo"
          onClick={() =>
            onUpdateDescription(thumbnail.id, generateLoremText())
          }
          className="absolute top-1/2 right-1.5 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-neutral-500 hover:bg-neutral-300 hover:text-neutral-900 dark:text-slate-400 dark:hover:bg-slate-500 dark:hover:text-slate-100"
        >
          <SparkleIcon />
        </button>
      </div>
    </li>
  );
}
